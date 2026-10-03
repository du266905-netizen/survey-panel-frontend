import { useState } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle, UsersRound } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';

const emptyPlan = { title: '', researchGoal: '', audienceDescription: '', countries: '', languages: '', targetParticipants: '', timeline: '', additionalContext: '' };

export default function BusinessAudiencePlan() {
  const { language, publicCopy } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [plan, setPlan] = useState(() => ({ ...emptyPlan, ...(location.state?.preparedPlan || {}) }));
  const [step, setStep] = useState(1); const [saving, setSaving] = useState(false); const [error, setError] = useState('');
  // Copy comes from the language library; this page used to keep its own
  // zh/en wording inline, so the other 16 languages fell back to English.
  const plans = publicCopy?.workspace?.business?.audiencePlan || {};
  const c = plans[language] || plans['en-US'] || {};;
  const update = (event) => setPlan((current) => ({ ...current, [event.target.name]: event.target.value }));
  const valid = plan.title.trim().length >= 3 && plan.researchGoal.trim().length >= 20 && plan.audienceDescription.trim().length >= 10;
  const go = (target) => navigate(withLanguage(target, language));
  const next = () => { if (!valid) { setError(c.invalid); return; } setError(''); setStep(2); };
  const create = async (event) => { event.preventDefault(); if (!valid || saving) { if (!valid) setError(c.invalid); return; } setSaving(true); setError(''); try { const sample = Number.parseInt(String(plan.targetParticipants).replaceAll(/[^0-9]/g, ''), 10); const response = await createBusinessProject({ ...plan, studyFormat: 'SURVEY', targetParticipants: Number.isFinite(sample) ? sample : undefined, incentiveBudget: 'NEED_GUIDANCE', selfServiceQuestionnaire: true }); go(`/business/projects/${response.data.project.id}`); } catch { setError(c.failed); } finally { setSaving(false); } };
  const field = (label, name, hint, textarea = false) => <label>{label}{textarea ? <textarea name={name} value={plan[name]} onChange={update} placeholder={hint} /> : <input name={name} value={plan[name]} onChange={update} placeholder={hint} />}</label>;
  return <main className="business-custom-request-page business-audience-plan-page"><div className="business-custom-request-shell"><section className="business-custom-request-surface"><header><button type="button" onClick={() => go('/business/workspace')}><ArrowLeft size={16} /> {c.back}</button><div><span>{c.rail}</span>{step === 1 ? <button className="business-button business-custom-request-next" type="button" onClick={next}>{c.next} <ArrowRight size={16} /></button> : <><button className="business-custom-request-quiet" type="button" onClick={() => setStep(1)}>{c.previous}</button><button className="business-button" type="submit" form="business-audience-plan" disabled={saving}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : c.create} {!saving && <ArrowRight size={16} />}</button></>}</div></header><form id="business-audience-plan" className="business-custom-request-form" onSubmit={create}><div className="business-custom-request-heading"><p>{c.step[step - 1]}</p><h1>{c.title[step - 1]}</h1><span>{c.intro[step - 1]}</span></div>{step === 1 ? <section className="business-custom-request-fields">{field(c.fields[0], 'title', c.hints[0])}{field(c.fields[1], 'researchGoal', c.hints[1], true)}{field(c.fields[2], 'audienceDescription', c.hints[2], true)}</section> : <section className="business-custom-request-fields"><div className="business-custom-request-grid">{field(c.fields[3], 'countries', c.hints[3])}{field(c.fields[4], 'languages', c.hints[4])}{field(c.fields[5], 'targetParticipants', c.hints[5])}{field(c.fields[6], 'timeline', c.hints[6])}</div>{field(c.fields[7], 'additionalContext', c.hints[7], true)}<aside className="business-audience-plan-note"><UsersRound size={18} /><span>{c.note}</span></aside></section>}{error && <p className="business-custom-request-error" role="alert">{error}</p>}</form></section></div></main>;
}
