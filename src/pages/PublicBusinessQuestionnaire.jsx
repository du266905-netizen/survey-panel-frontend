import { useEffect, useRef, useState } from 'react';
import { Check, LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { getPublicBusinessQuestionnaire, submitPublicBusinessQuestionnaire } from '../api/realApi';
import TurnstileWidget from '../components/TurnstileWidget';
import './PublicBusinessQuestionnaire.css';

function QuestionField({ question, value, onChange }) {
  if (question.type === 'LONG_TEXT') return <textarea value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'SHORT_TEXT') return <input value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'MULTIPLE_CHOICE') return <div className="public-question-options">{question.choices.map((choice) => <label key={choice}><input type="checkbox" checked={Array.isArray(value) && value.includes(choice)} onChange={(event) => onChange(event.target.checked ? [...(Array.isArray(value) ? value : []), choice] : (Array.isArray(value) ? value.filter((item) => item !== choice) : []))} /> {choice}</label>)}</div>;
  return <div className="public-question-options">{question.choices.map((choice) => <label key={choice}><input type="radio" name={question.id} checked={value === choice} onChange={() => onChange(choice)} /> {choice}</label>)}</div>;
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

  useEffect(() => {
    let active = true;
    getPublicBusinessQuestionnaire(publicId)
      .then((response) => { if (active) { setQuestionnaire(response.data.questionnaire); startedAtRef.current = Date.now(); } })
      .catch((caughtError) => { if (active) setError(caughtError.response?.data?.message || 'This questionnaire is not available.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [publicId]);

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
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
      <header><img src="/guanyisearch-project-mark.png" alt="GuanyiSearch" /><span>GUANYISEARCH</span></header>
      <form onSubmit={submit}>
        <p>QUESTIONNAIRE</p>
        <h1>{questionnaire.title}</h1>
        <span className="public-questionnaire-intro">Created by {questionnaire.creatorName}. Your responses will be provided to this creator for the stated research purpose.</span>
        {questionnaire.coverDescription && <p className="public-questionnaire-cover">{questionnaire.coverDescription}</p>}
        <div className="public-questionnaire-questions">
          {questionnaire.questions.map((question, index) => <label className="public-question" key={question.id}><span>{index + 1}. {question.prompt} {question.required && <em>Required</em>}</span><QuestionField question={question} value={answers[question.id]} onChange={(value) => setAnswers((current) => ({ ...current, [question.id]: value }))} /></label>)}
        </div>
        {error && <p className="public-questionnaire-error">{error}</p>}
        <div className="public-questionnaire-consent"><TurnstileWidget onVerify={setTurnstileToken} onExpire={() => setTurnstileToken('')} onError={() => setTurnstileToken('')} /><span>By submitting, you agree to the <a href="/privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and understand that this response is shared with the questionnaire creator.</span></div>
        <button type="submit" disabled={submitting || !turnstileToken}>{submitting ? <LoaderCircle className="animate-spin" size={17} /> : 'Submit response'}</button>
      </form>
    </main>
  );
}
