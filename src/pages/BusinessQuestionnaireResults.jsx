import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BarChart3, CheckCircle2, LoaderCircle, MessageSquareText, TriangleAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessProject, getBusinessQuestionnaireResponses } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessQuestionnaire.css';

const answerLabel = (value) => Array.isArray(value) ? value.join(', ') : String(value || '—');
const interpolate = (template, values) => Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{${key}}`, String(value)), template);

function choiceSummary(question, responses) {
  const counts = new Map((question.choices || []).map((choice) => [choice, 0]));
  let answered = 0;
  responses.forEach((response) => {
    const value = response.answers?.[question.id];
    if (value === undefined || value === '') return;
    answered += 1;
    (Array.isArray(value) ? value : [value]).forEach((choice) => counts.set(choice, (counts.get(choice) || 0) + 1));
  });
  return { answered, rows: [...counts.entries()].map(([label, count]) => ({ label, count, percent: answered ? Math.round((count / answered) * 100) : 0 })) };
}

export default function BusinessQuestionnaireResults() {
  const { projectId } = useParams();
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.workspace.business.results.detail;
  const [project, setProject] = useState(null);
  const [data, setData] = useState({ questions: [], responses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeQuestionId, setActiveQuestionId] = useState('');

  useEffect(() => {
    let active = true;
    Promise.all([getBusinessProject(projectId), getBusinessQuestionnaireResponses(projectId)])
      .then(([projectResponse, responsesResponse]) => {
        if (!active) return;
        setProject(projectResponse.data.project);
        const nextData = responsesResponse.data;
        setData(nextData);
        setActiveQuestionId(nextData.questions?.[0]?.id || '');
      })
      .catch(() => { if (active) setError(copy.loadError); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [projectId, copy.loadError]);

  const activeQuestion = useMemo(() => data.questions.find((question) => question.id === activeQuestionId) || data.questions[0], [activeQuestionId, data.questions]);
  const responses = data.responses || [];
  const usableResponses = responses.filter((response) => !response.qualityFlag);
  const flaggedResponses = responses.filter((response) => response.qualityFlag);
  const summary = activeQuestion && ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING'].includes(activeQuestion.type) ? choiceSummary(activeQuestion, usableResponses) : null;

  if (loading) return <main className="business-builder-loading"><LoaderCircle className="animate-spin" /> {copy.loading}</main>;
  if (error) return <main className="business-builder-loading"><strong>{error}</strong><Link to={withLanguage('/business/workspace', language)}>{copy.backToProjects}</Link></main>;

  return <main className="business-results-page">
    <header className="business-results-header"><Link to={withLanguage('/business/workspace', language)}><ArrowLeft size={17} /> {copy.projects}</Link><Link to={withLanguage(`/business/projects/${projectId}`, language)}>{copy.openQuestionnaire}</Link></header>
    <section className="business-results-intro"><div><p className="business-eyebrow">{publicCopy.workspace.business.results.eyebrow}</p><h1>{project?.questionnaire?.title || project?.title}</h1><p>{copy.intro}</p></div><dl><div><dt>{copy.responsesReceived}</dt><dd>{responses.length}</dd></div><div><dt>{copy.usable}</dt><dd>{usableResponses.length}</dd></div><div><dt>{copy.needsReview}</dt><dd>{flaggedResponses.length}</dd></div></dl></section>

    {!responses.length ? <section className="business-results-empty"><MessageSquareText size={30} /><h2>{copy.noResponsesTitle}</h2><p>{copy.noResponsesBody}</p><Link className="business-button" to={withLanguage(`/business/projects/${projectId}`, language)}>{copy.openQuestionnaire} <ArrowLeft size={16} /></Link></section> : <div className="business-results-layout"><aside className="business-results-questions"><p>{copy.questions}</p>{data.questions.map((question, index) => <button key={question.id} type="button" className={activeQuestion?.id === question.id ? 'is-active' : ''} onClick={() => setActiveQuestionId(question.id)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{question.prompt}</strong></button>)}</aside><section className="business-results-main">{activeQuestion && <><header><p>{copy.summary}</p><h2>{activeQuestion.prompt}</h2><span>{summary ? interpolate(copy.answered, { answered: summary.answered, usable: usableResponses.length }) : copy.individual}</span></header>{summary ? <div className="business-results-distribution">{summary.rows.map((row) => <article key={row.label}><div><strong>{row.label}</strong><span>{interpolate(copy.responseBreakdown, { count: row.count, percent: row.percent })}</span></div><i><b style={{ width: `${row.percent}%` }} /></i></article>)}</div> : <div className="business-results-text-responses">{usableResponses.filter((response) => response.answers?.[activeQuestion.id] !== undefined).map((response) => <article key={response.id}><time>{new Date(response.submittedAt).toLocaleDateString(language)}</time><p>{answerLabel(response.answers[activeQuestion.id])}</p></article>)}{!usableResponses.some((response) => response.answers?.[activeQuestion.id] !== undefined) && <p className="business-results-none">{copy.noUsable}</p>}</div>}</>}</section></div>}

    {responses.length > 0 && <section className="business-results-records"><header><div><p>{copy.records}</p><h2>{copy.individualAnswers}</h2></div><span>{copy.recordsNote}</span></header><div>{responses.map((response) => <article key={response.id}><header><div><CheckCircle2 size={16} /><span>{interpolate(copy.submitted, { date: new Date(response.submittedAt).toLocaleString(language) })}</span></div>{response.qualityFlag && <em><TriangleAlert size={14} /> {copy.fastReview}</em>}</header>{data.questions.map((question) => response.answers?.[question.id] !== undefined && <dl key={question.id}><dt>{question.prompt}</dt><dd>{answerLabel(response.answers[question.id])}</dd></dl>)}</article>)}</div></section>}
  </main>;
}
