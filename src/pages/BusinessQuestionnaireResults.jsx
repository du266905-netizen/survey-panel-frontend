import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Download, LoaderCircle, LockKeyhole, TriangleAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessProject, getBusinessQuestionnaireResponses } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import BusinessPageLoader from '../components/BusinessPageLoader';
import './BusinessResults.css';

const labelOf = (value) => (Array.isArray(value) ? value.join('、') : String(value ?? '—'));

const isChoice = (type) => ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'DROPDOWN', 'RANKING'].includes(type);
const isScale = (type) => ['RATING', 'NPS'].includes(type);

function tally(question, responses) {
  const counts = new Map((question.choices || []).map((choice) => [choice, 0]));
  let answered = 0;
  responses.forEach((response) => {
    const value = response.answers?.[question.id];
    if (value === undefined || value === '') return;
    answered += 1;
    (Array.isArray(value) ? value : [value]).forEach((choice) => counts.set(choice, (counts.get(choice) || 0) + 1));
  });
  const rows = [...counts.entries()]
    .map(([label, count]) => ({ label, count, percent: answered ? Math.round((count / answered) * 100) : 0 }))
    .sort((a, b) => b.count - a.count);
  return { answered, rows };
}

function scaleStats(question, responses) {
  const values = responses
    .map((response) => Number(response.answers?.[question.id]))
    .filter((value) => Number.isFinite(value));
  if (!values.length) return null;
  const sum = values.reduce((total, value) => total + value, 0);
  const average = sum / values.length;
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  const rows = [...counts.entries()].sort((a, b) => a[0] - b[0])
    .map(([value, count]) => ({ label: String(value), count, percent: Math.round((count / values.length) * 100) }));
  return { answered: values.length, average, rows };
}

export default function BusinessQuestionnaireResults() {
  const { projectId } = useParams();
  const { language } = useLanguage();
  const zh = language.startsWith('zh');

  const [project, setProject] = useState(null);
  const [data, setData] = useState({ questions: [], responses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeId, setActiveId] = useState('');
  const [onlyUsable, setOnlyUsable] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([getBusinessProject(projectId), getBusinessQuestionnaireResponses(projectId)])
      .then(([projectResponse, response]) => {
        if (!alive) return;
        setProject(projectResponse.data.project);
        setData(response.data);
        setActiveId(response.data.questions?.[0]?.id || '');
      })
      .catch(() => { if (alive) setError(zh ? '结果没能加载，刷新再试。' : 'Results could not be loaded.'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [projectId, zh]);

  const responses = data.responses || [];
  const usable = responses.filter((response) => !response.qualityFlag);
  const pool = onlyUsable ? usable : responses;
  const question = useMemo(() => data.questions.find((item) => item.id === activeId) || data.questions[0], [activeId, data.questions]);
  const locked = project?.questionnaire?.status !== 'PUBLISHED' || !responses.length;

  const medianSeconds = useMemo(() => {
    const values = responses.map((response) => Number(response.durationSeconds)).filter((value) => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
    if (!values.length) return null;
    return values[Math.floor(values.length / 2)];
  }, [responses]);

  const exportCsv = () => {
    const header = ['提交时间', '有效', ...data.questions.map((item) => item.prompt)];
    const rows = responses.map((response) => [
      response.submittedAt ? new Date(response.submittedAt).toISOString() : '',
      response.qualityFlag ? '否' : '是',
      ...data.questions.map((item) => labelOf(response.answers?.[item.id])),
    ]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project?.title || 'results'}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <BusinessPageLoader />;

  return (
    <main className="business-results-page">
      <header className="brs-head">
        <Link className="brs-back" to={withLanguage('/business/workspace?view=projects', language)}>
          <ArrowLeft size={15} /> {zh ? '返回项目' : 'Back to projects'}
        </Link>
        <div className="brs-title">
          <div>
            <h1>{project?.questionnaire?.title || project?.title || (zh ? '结果' : 'Results')}</h1>
            <p>{zh ? '每道题的分布都在这一页，原始答卷可以导出。' : 'Every question with its distribution; raw answers export as CSV.'}</p>
          </div>
          <button type="button" className="brs-export" onClick={exportCsv} disabled={!responses.length}>
            <Download size={14} /> {zh ? '导出 CSV' : 'Export CSV'}
          </button>
        </div>

        <div className="brs-figures">
          <div><span>{zh ? '回收' : 'Responses'}</span><strong>{responses.length}</strong></div>
          <div><span>{zh ? '有效' : 'Usable'}</span><strong>{usable.length}</strong></div>
          <div><span>{zh ? '待复核' : 'Flagged'}</span><strong>{responses.length - usable.length}</strong></div>
          <div><span>{zh ? '中位时长' : 'Median time'}</span><strong>{medianSeconds ? `${Math.round(medianSeconds / 60)}′` : '—'}</strong></div>
        </div>
      </header>

      {error ? <p className="brs-error">{error}</p> : null}

      {locked ? (
        <div className="brs-locked">
          <LockKeyhole size={18} />
          <p>{zh ? '问卷发布并收到答卷之后，这里才会出现结果。' : 'Results appear once the questionnaire is published and collecting.'}</p>
        </div>
      ) : (
        <>
          <div className="brs-filters">
            <button type="button" className={!onlyUsable ? 'is-active' : ''} onClick={() => setOnlyUsable(false)}>{zh ? '全部答卷' : 'All'}</button>
            <button type="button" className={onlyUsable ? 'is-active' : ''} onClick={() => setOnlyUsable(true)}>{zh ? '只看有效' : 'Usable only'}</button>
            {responses.length - usable.length > 0 && (
              <span className="brs-flag-note"><TriangleAlert size={13} /> {zh ? `${responses.length - usable.length} 份被标记为过快` : `${responses.length - usable.length} flagged`}</span>
            )}
          </div>

          <div className="brs-layout">
            <aside className="brs-nav">
              {data.questions.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={item.id === question?.id ? 'is-active' : ''}
                  onClick={() => setActiveId(item.id)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.prompt}</strong>
                </button>
              ))}
            </aside>

            <section className="brs-main">
              {question ? (
                <>
                  <header>
                    <h2>{question.prompt}</h2>
                    <p>
                      {zh ? `${pool.filter((response) => response.answers?.[question.id] !== undefined && response.answers?.[question.id] !== '').length} 人作答` : 'answered'}
                      {question.type === 'MULTIPLE_CHOICE' ? (zh ? ' · 多选，合计超过 100%' : ' · multi-select, sums over 100%') : ''}
                    </p>
                  </header>

                  {isChoice(question.type) ? (
                    <div className="brs-bars">
                      {tally(question, pool).rows.map((row) => (
                        <div key={row.label} className="brs-bar">
                          <div><strong>{row.label}</strong><span>{row.count} · {row.percent}%</span></div>
                          <i><b style={{ width: `${row.percent}%` }} /></i>
                        </div>
                      ))}
                    </div>
                  ) : isScale(question.type) ? (
                    (() => {
                      const stats = scaleStats(question, pool);
                      if (!stats) return <p className="brs-empty">{zh ? '还没有作答。' : 'No answers yet.'}</p>;
                      return (
                        <div className="brs-scale">
                          <div className="brs-scale-score">
                            <strong>{stats.average.toFixed(1)}</strong>
                            <span>{zh ? '平均分' : 'average'}</span>
                          </div>
                          <div className="brs-bars">
                            {stats.rows.map((row) => (
                              <div key={row.label} className="brs-bar">
                                <div><strong>{row.label}</strong><span>{row.count} · {row.percent}%</span></div>
                                <i><b style={{ width: `${row.percent}%` }} /></i>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })()
                  ) : (
                    <div className="brs-texts">
                      {pool.filter((response) => response.answers?.[question.id] !== undefined && response.answers?.[question.id] !== '').map((response) => (
                        <article key={response.id}>
                          <time>{response.submittedAt ? new Date(response.submittedAt).toLocaleDateString(language) : ''}</time>
                          <p>{labelOf(response.answers[question.id])}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </>
              ) : null}
            </section>
          </div>
        </>
      )}
    </main>
  );
}
