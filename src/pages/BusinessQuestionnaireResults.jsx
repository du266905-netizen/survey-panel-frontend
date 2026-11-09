import { useEffect, useMemo, useState } from 'react';
import { Download, LockKeyhole, TriangleAlert } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getBusinessProject, getBusinessQuestionnaireResponses } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import BusinessPageLoader from '../components/BusinessPageLoader';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import './BusinessResults.css';

/* 结果页。
 *
 * 排法照 SurveyMonkey / Qualtrics 的 Summary：上面四个数，下面每题一张卡，
 * 每张卡自带图，一屏能扫完；文本题单独占宽。导出 CSV 由浏览器自己生成。
 */

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
  const values = responses.map((response) => Number(response.answers?.[question.id])).filter((value) => Number.isFinite(value));
  if (!values.length) return null;
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  return {
    answered: values.length,
    average: values.reduce((total, value) => total + value, 0) / values.length,
    rows: [...counts.entries()].sort((a, b) => a[0] - b[0]).map(([value, count]) => ({ label: String(value), count, percent: Math.round((count / values.length) * 100) })),
  };
}

export default function BusinessQuestionnaireResults() {
  const { projectId } = useParams();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const zh = language.startsWith('zh');

  const [project, setProject] = useState(null);
  const [data, setData] = useState({ questions: [], responses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [onlyUsable, setOnlyUsable] = useState(false);

  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    if (id === 'projects') { navigate(withLanguage('/business/workspace?view=projects', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  useEffect(() => {
    let alive = true;
    Promise.all([getBusinessProject(projectId), getBusinessQuestionnaireResponses(projectId)])
      .then(([projectResponse, response]) => {
        if (!alive) return;
        setProject(projectResponse.data.project);
        setData(response.data);
      })
      .catch(() => { if (alive) setError(zh ? '结果没能加载，刷新再试。' : 'Results could not be loaded.'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [projectId, zh]);

  const responses = data.responses || [];
  const usable = responses.filter((response) => !response.qualityFlag);
  const pool = onlyUsable ? usable : responses;
  const locked = project?.questionnaire?.status !== 'PUBLISHED' || !responses.length;

  const medianMinutes = useMemo(() => {
    const values = responses.map((response) => Number(response.durationSeconds)).filter((value) => Number.isFinite(value) && value > 0).sort((a, b) => a - b);
    return values.length ? Math.round(values[Math.floor(values.length / 2)] / 60) : null;
  }, [responses]);

  const exportCsv = () => {
    const header = ['提交时间', '有效', ...data.questions.map((item) => item.prompt)];
    const rows = responses.map((response) => [response.submittedAt ? new Date(response.submittedAt).toISOString() : '', response.qualityFlag ? '否' : '是', ...data.questions.map((item) => labelOf(response.answers?.[item.id]))]);
    const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const url = URL.createObjectURL(new Blob([`\ufeff${csv}`], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${project?.title || 'results'}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <BusinessPageLoader />;

  return (
    <main className="business-account-page">
      <BusinessRail activeId="results" onSelect={handleRailSelect} />
      <div className="business-account-pane">
        <header><NotificationBell /></header>

        <section className="brp-shell">
          <div className="brp-top">
            <div>
              <Link className="brp-back" to={withLanguage('/business/workspace?view=projects', language)}>← {zh ? '项目' : 'Projects'}</Link>
              <h1>{project?.questionnaire?.title || project?.title || (zh ? '结果' : 'Results')}</h1>
              <p>{zh ? '每题一张卡，横向能扫完；原始答卷可以导出。' : 'One card per question; raw answers export as CSV.'}</p>
            </div>
            <button type="button" className="brp-export" onClick={exportCsv} disabled={!responses.length}><Download size={14} /> {zh ? '导出 CSV' : 'Export CSV'}</button>
          </div>

          {error ? <p className="brp-error">{error}</p> : null}

          {locked ? (
            <div className="brp-locked"><LockKeyhole size={18} /><p>{zh ? '问卷发布并收到答卷之后，这里才会出现结果。' : 'Results appear once the questionnaire is live.'}</p></div>
          ) : (
            <>
              <div className="brp-tiles">
                <div><span>{zh ? '回收' : 'Responses'}</span><strong>{responses.length}</strong></div>
                <div><span>{zh ? '有效' : 'Usable'}</span><strong>{usable.length}</strong></div>
                <div><span>{zh ? '待复核' : 'Flagged'}</span><strong>{responses.length - usable.length}</strong></div>
                <div><span>{zh ? '中位时长' : 'Median'}</span><strong>{medianMinutes != null ? `${medianMinutes}′` : '—'}</strong></div>
              </div>

              <div className="brp-filters">
                <button type="button" className={!onlyUsable ? 'is-active' : ''} onClick={() => setOnlyUsable(false)}>{zh ? '全部答卷' : 'All'}</button>
                <button type="button" className={onlyUsable ? 'is-active' : ''} onClick={() => setOnlyUsable(true)}>{zh ? '只看有效' : 'Usable only'}</button>
                {responses.length - usable.length > 0 ? <span><TriangleAlert size={13} /> {zh ? `${responses.length - usable.length} 份偏快` : `${responses.length - usable.length} flagged`}</span> : null}
              </div>

              <div className="brp-grid">
                {data.questions.map((question) => {
                  const choice = tally(question, pool);
                  const scale = isScale(question.type) ? scaleStats(question, pool) : null;
                  const texts = !isChoice(question.type) && !isScale(question.type)
                    ? pool.filter((response) => response.answers?.[question.id] !== undefined && response.answers?.[question.id] !== '')
                    : [];
                  return (
                    <article key={question.id} className={`brp-card${texts.length ? ' is-wide' : ''}`}>
                      <header>
                        <h2>{question.prompt}</h2>
                        <span className="brp-answered">{isChoice(question.type) ? choice.answered : scale ? scale.answered : texts.length} {zh ? '人作答' : 'answered'}</span>
                      </header>

                      {isChoice(question.type) ? (
                        <div className="brp-bars">
                          {choice.rows.map((row) => (
                            <div key={row.label}>
                              <div><strong>{row.label}</strong><span>{row.count} · {row.percent}%</span></div>
                              <i><b style={{ width: `${row.percent}%` }} /></i>
                            </div>
                          ))}
                        </div>
                      ) : scale ? (
                        <div className="brp-scale">
                          <strong>{scale.average.toFixed(1)}</strong>
                          <div className="brp-bars">
                            {scale.rows.map((row) => (
                              <div key={row.label}>
                                <div><strong>{row.label}</strong><span>{row.count} · {row.percent}%</span></div>
                                <i><b style={{ width: `${row.percent}%` }} /></i>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <ul className="brp-texts">
                          {texts.length ? texts.slice(0, 8).map((response) => <li key={response.id}>{labelOf(response.answers[question.id])}</li>) : <li className="is-empty">{zh ? '还没有作答。' : 'No answers yet.'}</li>}
                        </ul>
                      )}


                    </article>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
