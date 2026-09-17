import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BarChart3, CheckCircle2, LoaderCircle, MessageSquareText, TriangleAlert } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { getBusinessProject, getBusinessQuestionnaireResponses } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessQuestionnaire.css';

const answerLabel = (value) => Array.isArray(value) ? value.join(', ') : String(value || '—');

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
  const { language } = useLanguage();
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
      .catch((caughtError) => { if (active) setError(caughtError.response?.data?.message || 'We could not load this result view. Please try again.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [projectId]);

  const activeQuestion = useMemo(() => data.questions.find((question) => question.id === activeQuestionId) || data.questions[0], [activeQuestionId, data.questions]);
  const responses = data.responses || [];
  const usableResponses = responses.filter((response) => !response.qualityFlag);
  const flaggedResponses = responses.filter((response) => response.qualityFlag);
  const summary = activeQuestion && ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING'].includes(activeQuestion.type) ? choiceSummary(activeQuestion, usableResponses) : null;

  if (loading) return <main className="business-builder-loading"><LoaderCircle className="animate-spin" /> Loading results</main>;
  if (error) return <main className="business-builder-loading"><strong>{error}</strong><Link to={withLanguage('/business/workspace', language)}>Back to projects</Link></main>;

  return <main className="business-results-page">
    <header className="business-results-header"><Link to={withLanguage('/business/workspace', language)}><ArrowLeft size={17} /> Projects</Link><Link to={withLanguage(`/business/projects/${projectId}`, language)}>Open questionnaire</Link></header>
    <section className="business-results-intro"><div><p className="business-eyebrow">QUESTIONNAIRE RESULTS</p><h1>{project?.questionnaire?.title || project?.title}</h1><p>Review only the responses received for this questionnaire. Percentages and summaries update from submitted answers; no sample data is shown.</p></div><dl><div><dt>Responses received</dt><dd>{responses.length}</dd></div><div><dt>Usable for summary</dt><dd>{usableResponses.length}</dd></div><div><dt>Needs review</dt><dd>{flaggedResponses.length}</dd></div></dl></section>

    {!responses.length ? <section className="business-results-empty"><MessageSquareText size={30} /><h2>No responses yet.</h2><p>When this questionnaire receives responses, this page will show question summaries and individual answers. Until then, there is no result to interpret.</p><Link className="business-button" to={withLanguage(`/business/projects/${projectId}`, language)}>Open questionnaire <ArrowLeft size={16} /></Link></section> : <div className="business-results-layout"><aside className="business-results-questions"><p>QUESTIONS</p>{data.questions.map((question, index) => <button key={question.id} type="button" className={activeQuestion?.id === question.id ? 'is-active' : ''} onClick={() => setActiveQuestionId(question.id)}><span>{String(index + 1).padStart(2, '0')}</span><strong>{question.prompt}</strong></button>)}</aside><section className="business-results-main">{activeQuestion && <><header><p>QUESTION SUMMARY</p><h2>{activeQuestion.prompt}</h2><span>{summary ? `${summary.answered} of ${usableResponses.length} usable responses answered this question.` : 'Read individual responses below.'}</span></header>{summary ? <div className="business-results-distribution">{summary.rows.map((row) => <article key={row.label}><div><strong>{row.label}</strong><span>{row.count} responses · {row.percent}%</span></div><i><b style={{ width: `${row.percent}%` }} /></i></article>)}</div> : <div className="business-results-text-responses">{usableResponses.filter((response) => response.answers?.[activeQuestion.id] !== undefined).map((response) => <article key={response.id}><time>{new Date(response.submittedAt).toLocaleDateString()}</time><p>{answerLabel(response.answers[activeQuestion.id])}</p></article>)}{!usableResponses.some((response) => response.answers?.[activeQuestion.id] !== undefined) && <p className="business-results-none">No usable response has answered this question yet.</p>}</div>}</>}</section></div>}

    {responses.length > 0 && <section className="business-results-records"><header><div><p>RESPONSE RECORD</p><h2>Individual answers</h2></div><span>Recorded answers are shown only to this project workspace.</span></header><div>{responses.map((response) => <article key={response.id}><header><div><CheckCircle2 size={16} /><span>Submitted {new Date(response.submittedAt).toLocaleString()}</span></div>{response.qualityFlag && <em><TriangleAlert size={14} /> Review: completed unusually quickly</em>}</header>{data.questions.map((question) => response.answers?.[question.id] !== undefined && <dl key={question.id}><dt>{question.prompt}</dt><dd>{answerLabel(response.answers[question.id])}</dd></dl>)}</article>)}</div></section>}
  </main>;
}
