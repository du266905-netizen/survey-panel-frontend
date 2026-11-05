import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getPublicBusinessQuestionnaire, submitPublicBusinessQuestionnaire } from '../api/realApi';
import TurnstileWidget from '../components/TurnstileWidget';
import Logo from '../components/Logo';
import './PublicBusinessQuestionnaire.css';

function questionIsVisible(question, questions, answers) {
  const logic = question.logic;
  if (!logic?.sourcePosition || !logic?.value) return true;
  const source = questions[logic.sourcePosition - 1];
  const answer = source ? answers[source.id] : null;
  return Array.isArray(answer) ? answer.includes(logic.value) : answer === logic.value;
}

function QuestionField({ question, value, onChange }) {
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const settings = question.settings || {};
  const displayChoices = useMemo(() => settings.randomizeChoices ? [...choices].sort(() => Math.random() - .5) : choices, [question.id, question.choices, settings.randomizeChoices]);
  if (question.type === 'LONG_TEXT') return <textarea value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'SHORT_TEXT') return <input value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'NUMBER') return <input type="number" inputMode="decimal" value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'RANKING') return <div className="public-question-ranking">{displayChoices.map((choice) => <label key={choice}><span>{Array.isArray(value) ? value.indexOf(choice) + 1 || '—' : '—'}</span><input type="checkbox" checked={Array.isArray(value) && value.includes(choice)} onChange={(event) => onChange(event.target.checked ? [...(Array.isArray(value) ? value : []), choice] : (Array.isArray(value) ? value.filter((item) => item !== choice) : []))} /> {choice}</label>)}<small>Select each option in the order you prefer it.</small></div>;
  if (question.type === 'MULTIPLE_CHOICE') { const other = Array.isArray(value) ? value.find((item) => item.startsWith('Other: ')) : ''; return <div className="public-question-options">{displayChoices.map((choice) => <label key={choice}><input type="checkbox" checked={Array.isArray(value) && value.includes(choice)} onChange={(event) => { const next = event.target.checked ? [...(Array.isArray(value) ? value : []), choice] : (Array.isArray(value) ? value.filter((item) => item !== choice) : []); if (!settings.maxSelections || next.length <= settings.maxSelections) onChange(next); }} /> {choice}</label>)}{settings.allowOther && <label className="public-question-other"><input type="checkbox" checked={Boolean(other)} onChange={(event) => onChange(event.target.checked ? [...(Array.isArray(value) ? value : []), 'Other: details'] : (Array.isArray(value) ? value.filter((item) => !item.startsWith('Other: ')) : []))} /> Other {other && <input aria-label="Other answer" value={other.replace(/^Other:\s*/, '')} onChange={(event) => onChange((Array.isArray(value) ? value : []).map((item) => item.startsWith('Other: ') ? `Other: ${event.target.value}` : item))} />}</label>}</div>; }
  const other = typeof value === 'string' && value.startsWith('Other: ') ? value : '';
  return <div className="public-question-options">{displayChoices.map((choice) => <label key={choice}><input type="radio" name={question.id} checked={value === choice} onChange={() => onChange(choice)} /> {choice}</label>)}{settings.allowOther && <label className="public-question-other"><input type="radio" name={question.id} checked={Boolean(other)} onChange={() => onChange('Other: details')} /> Other {other && <input aria-label="Other answer" value={other.replace(/^Other:\s*/, '')} onChange={(event) => onChange(`Other: ${event.target.value}`)} />}</label>}{question.type === 'RATING' && (settings.scaleLowLabel || settings.scaleHighLabel) && <small className="public-rating-labels"><span>{settings.scaleLowLabel}</span><span>{settings.scaleHighLabel}</span></small>}</div>;
}

function hasAnswer(value) {
  if (Array.isArray(value)) return value.length > 0;
  return String(value ?? '').trim().length > 0;
}

export default function PublicBusinessQuestionnaire() {
  const { publicId } = useParams();
  const [questionnaire, setQuestionnaire] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [turnstileToken, setTurnstileToken] = useState('');
  const startedAtRef = useRef(Date.now());
  const questions = Array.isArray(questionnaire?.questions) ? questionnaire.questions : [];
  const visibleQuestions = questions.filter((question) => questionIsVisible(question, questions, answers));

  /* One page per section, in the order the section list defines. A section that
     has no visible question (all hidden by logic) does not produce a page. */
  const pages = useMemo(() => {
    const order = ['SCREENING', 'CORE', 'PROFILE', 'CLOSING'];
    const grouped = order
      .map((section) => ({ section, items: visibleQuestions.filter((question) => (question.section || 'CORE') === section) }))
      .filter((group) => group.items.length);
    const loose = visibleQuestions.filter((question) => !order.includes(question.section || 'CORE'));
    if (loose.length) grouped.push({ section: 'OTHER', items: loose });
    return grouped;
  }, [visibleQuestions]);

  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page > pages.length - 1) setPage(Math.max(0, pages.length - 1));
  }, [page, pages.length]);

  const currentPage = pages[page] || { items: [] };
  const lastPage = page >= pages.length - 1;

  useEffect(() => {
    let active = true;
    getPublicBusinessQuestionnaire(publicId)
      .then((response) => { if (active) { setQuestionnaire(response.data.questionnaire); startedAtRef.current = Date.now(); } })
      .catch((caughtError) => { if (active) setError(caughtError.response?.data?.message || 'This questionnaire is not available.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [publicId]);

  const missingOn = (items) => items.filter((question) => question.required && !hasAnswer(answers[question.id]));

  const goNext = () => {
    const missing = missingOn(currentPage.items);
    if (missing.length) {
      setError('Please answer every required question on this page.');
      document.getElementById(`question-${missing[0].id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setError('');
    setPage((current) => Math.min(current + 1, pages.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    setError('');
    setPage((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async (event) => {
    event.preventDefault();
    if (submitting || !questionnaire) return;
    const missingQuestion = visibleQuestions.find((question) => question.required && !hasAnswer(answers[question.id]));
    if (missingQuestion) {
      const missingPage = pages.findIndex((group) => group.items.some((question) => question.id === missingQuestion.id));
      if (missingPage >= 0) setPage(missingPage);
      setError('Please answer every required question before submitting.');
      window.setTimeout(() => {
        document.getElementById(`question-${missingQuestion.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 60);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const storageKey = 'guanyi-questionnaire-response-device';
      let respondentKey = window.localStorage.getItem(storageKey);
      if (!respondentKey) {
        respondentKey = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
        window.localStorage.setItem(storageKey, respondentKey);
      }
      const response = await submitPublicBusinessQuestionnaire(publicId, {
        answers,
        turnstileToken,
        respondentKey,
        durationSeconds: Math.floor((Date.now() - startedAtRef.current) / 1000),
      });
      setMessage(response.data.message || 'Response received.');
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'We could not submit your response. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <main className="public-questionnaire-state"><LoaderCircle className="animate-spin" /> Loading questionnaire</main>;
  if (error && !questionnaire) return <main className="public-questionnaire-state"><strong>{error}</strong></main>;
  if (message) return <main className="public-questionnaire-state"><span className="public-questionnaire-check"><Check size={29} /></span><h1>Thank you.</h1><p>{message}</p></main>;

  return (
    <main className="public-questionnaire-page">
      <header><img className="public-questionnaire-mark" src="/guanyisearch-project-mark.png" alt="" /><Logo size="sm" /></header>
      <form onSubmit={submit}>
        <p>QUESTIONNAIRE</p>
        <h1>{questionnaire.title}</h1>
        <span className="public-questionnaire-intro">Created by {questionnaire.creatorName}. Your responses will be provided to this creator for the stated research purpose.</span>
        {questionnaire.coverDescription && <p className="public-questionnaire-cover">{questionnaire.coverDescription}</p>}

        {pages.length > 1 ? (
          <div className="public-questionnaire-progress" aria-live="polite">
            <div><span style={{ width: `${((page + 1) / pages.length) * 100}%` }} /></div>
            <small>Step {page + 1} of {pages.length}</small>
          </div>
        ) : null}

        <div className="public-questionnaire-questions">
          {currentPage.items.map((question) => {
            const index = visibleQuestions.indexOf(question);
            return (
              <fieldset className="public-question" id={`question-${question.id}`} key={question.id}>
                <legend>{index + 1}. {question.prompt} {question.required && <em>Required</em>}</legend>
                <QuestionField question={question} value={answers[question.id]} onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))} />
              </fieldset>
            );
          })}
        </div>

        {error && <p className="public-questionnaire-error">{error}</p>}

        {lastPage ? (
          <>
            <div className="public-questionnaire-consent"><TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken('')} onError={() => setTurnstileToken('')} /><span>By submitting, you agree to the <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and understand that this response is shared with the questionnaire creator.</span></div>
            <div className="public-questionnaire-nav">
              {pages.length > 1 ? (
                <button type="button" className="is-ghost" onClick={goBack}>
                  <ArrowLeft size={16} aria-hidden="true" /> Back
                </button>
              ) : null}
              <button type="submit" disabled={submitting || !turnstileToken}>
                {submitting ? <LoaderCircle className="animate-spin" size={17} /> : 'Submit response'}
              </button>
            </div>
          </>
        ) : (
          <div className="public-questionnaire-nav">
            {page > 0 ? (
              <button type="button" className="is-ghost" onClick={goBack}>
                <ArrowLeft size={16} aria-hidden="true" /> Back
              </button>
            ) : <span />}
            <button type="button" onClick={goNext}>
              Next <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        )}
      </form>
    </main>
  );
}
