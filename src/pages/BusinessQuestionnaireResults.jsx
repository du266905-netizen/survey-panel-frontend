import { useEffect, useMemo, useState } from 'react';
import { Download, LockKeyhole, TriangleAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessProject, getBusinessQuestionnaireResponses } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import BusinessPageLoader from '../components/BusinessPageLoader';
import BusinessWorkspaceShell from '../components/BusinessWorkspaceShell';
import './BusinessResults.css';

/* 结果页。
 * 版式照 HDFC / Typeform 的结果面板：每题一张卡，左边是均值或最高占比，
 * 右边是分布条；上面一排数字卡，页面浅灰底。 */

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
  const rows = [...counts.entries()].map(([label, count]) => ({ label, count, percent: answered ? Math.round((count / answered) * 100) : 0 })).sort((a, b) => b.count - a.count);
  return { answered, rows };
}

function scaleStats(question, responses) {
  const values = responses.map((response) => Number(response.answers?.[question.id])).filter((value) => Number.isFinite(value) && value > 0);
  if (!values.length) return null;
  const counts = new Map();
  values.forEach((value) => counts.set(value, (counts.get(value) || 0) + 1));
  const rows = [...counts.entries()].sort((a, b) => b[0] - a[0]).map(([value, count]) => ({ label: String(value), count, percent: Math.round((count / values.length) * 100) }));
  return { answered: values.length, average: values.reduce((total, value) => total + value, 0) / values.length, rows };
}

export default function BusinessQuestionnaireResults() {
  const { projectId } = useParams();
  const { language } = useLanguage();
  const zh = language.startsWith('zh');
  const [project, setProject] = useState(null);
  const [data, setData] = useState({ questions: [], responses: [] });
  const [loading, setLoading] = useState(true);
  const [onlyUsable, setOnlyUsable] = useState(false);

  useEffect(() => {
    let alive = true;
    Promise.all([getBusinessProject(projectId), getBusinessQuestionnaireResponses(projectId)])
      .then(([projectResponse, response]) => {
        if (!alive) return;
        setProject(projectResponse.data.project);
        setData(response.data);
      })
      .catch(() => {})
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [projectId]);

  const responses = data.responses || [];
  const usable = responses.filter((response) => !response.qualityFlag);
  const pool = onlyUsable ? usable : responses;
  const locked = project?.questionnaire?.status !== 'PUBLISHED' || !responses.length;

  const median = useMemo(() => {
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
    <BusinessWorkspaceShell activeView="results">
      <div className="br-wrap">
        <Link className="br-back" to={withLanguage('/business/workspace?view=projects', language)}>{zh ? '← 项目' : '← Projects'}</Link>

        <header className="br-head">
          <div>
            <h1>{project?.questionnaire?.title || project?.title || (zh ? '结果' : 'Results')}</h1>
            <p>{zh ? '每题一张卡，长文本单独一块；原始答卷可导出。' : 'One card per question; raw answers export as CSV.'}</p>
          </div>
          <button type="button" className="br-export" onClick={exportCsv} disabled={!responses.length}><Download size={14} /> {zh ? '导出 CSV' : 'Export CSV'}</button>
        </header>

        {locked ? (
          <div className="br-locked"><LockKeyhole size={18} /><p>{zh ? '问卷发布并收到答卷之后，这里才会出现结果。' : 'Results appear once the questionnaire is live.'}</p></div>
        ) : (
          <>
            <div className="br-kpis">
              <article><span>{zh ? '回收' : 'Responses'}</span><strong>{responses.length}</strong></article>
              <article><span>{zh ? '有效' : 'Usable'}</span><strong>{usable.length}</strong></article>
              <article><span>{zh ? '待复核' : 'Flagged'}</span><strong>{responses.length - usable.length}</strong></article>
              <article><span>{zh ? '中位时长' : 'Median time'}</span><strong>{median != null ? `${median}′` : '—'}</strong></article>
            </div>

            <div className="br-filters">
              <button type="button" className={!onlyUsable ? 'is-active' : ''} onClick={() => setOnlyUsable(false)}>{zh ? '全部答卷' : 'All'}</button>
              <button type="button" className={onlyUsable ? 'is-active' : ''} onClick={() => setOnlyUsable(true)}>{zh ? '只看有效' : 'Usable only'}</button>
              {responses.length - usable.length > 0 ? <span><TriangleAlert size={13} /> {zh ? `${responses.length - usable.length} 份偏快` : `${responses.length - usable.length} flagged`}</span> : null}
            </div>

            <div className="br-grid">
              {data.questions.map((question) => {
                const choice = tally(question, pool);
                const scale = isScale(question.type) ? scaleStats(question, pool) : null;
                const texts = !isChoice(question.type) && !scale
                  ? pool.filter((response) => response.answers?.[question.id] !== undefined && response.answers?.[question.id] !== '')
                  : [];
                const headline = scale ? scale.average.toFixed(1) : choice.rows[0]?.percent ?? 0;
                const headlineLabel = scale ? (zh ? '平均分' : 'average') : (zh ? '最高占比' : 'top share');

                return (
                  <article key={question.id} className={`br-card${texts.length ? ' is-wide' : ''}`}>
                    <h2>{question.prompt}</h2>

                    {texts.length ? (
                      <ul className="br-texts">
                        {texts.slice(0, 8).map((response) => <li key={response.id}>{labelOf(response.answers[question.id])}</li>)}
                      </ul>
                    ) : (
                      <div className="br-body">
                        <div className="br-lead">
                          <strong>{headline}{scale ? '' : '%'}</strong>
                          <span>{headlineLabel}</span>
                        </div>
                        <ul className="br-bars">
                          {(scale ? scale.rows : choice.rows).map((row) => (
                            <li key={row.label}>
                              <span>{row.label}</span>
                              <i><b style={{ width: `${row.percent}%` }} /></i>
                              <em>{row.percent}%</em>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <footer>{zh ? `${scale ? scale.answered : texts.length || choice.answered} 人作答` : `${scale ? scale.answered : texts.length || choice.answered} answered`}</footer>
                  </article>
                );
              })}
            </div>
          </>
        )}
      </div>
    </BusinessWorkspaceShell>
  );
}
