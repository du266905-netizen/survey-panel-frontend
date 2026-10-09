import { useState } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import serviceImage from '../assets/business/custom-questionnaire-service.jpg';
// The rail's own sheet must follow Business.css: the base sheet pins several
// rail properties with !important, and only a later !important of equal
// specificity wins. Same order as BusinessWorkspace.jsx.
import './Business.css';
import '../components/BusinessRail.css';
import BusinessRail from '../components/BusinessRail';
import './BusinessWorkspaceTheme.css';

const initialRequest = {
  title: '', researchGoal: '', audienceDescription: '', countries: '', languages: '',
  estimatedMinutes: '', targetParticipants: '', timeline: '', additionalContext: '',
};

export default function BusinessCustomQuestionnaireRequest() {
  const { language, publicCopy } = useLanguage();
  // Copy comes from the language library; this page used to keep its own
  // en/zh pair, so the other 16 languages fell back to English here.
  const requests = publicCopy?.workspace?.business?.customRequest || {};
  const copy = requests[language] || requests['en-US'] || {};
  const navigate = useNavigate();
  const location = useLocation();
  const preparedRequest = location.state?.preparedRequest;
  const [request, setRequest] = useState(() => ({ ...initialRequest, ...(preparedRequest || {}) }));
  const [step, setStep] = useState(1);
  const [showIntro, setShowIntro] = useState(() => !preparedRequest);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const update = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));
  const goWorkspace = (view = '') => navigate(withLanguage(`/business/workspace${view ? `?view=${view}` : ''}`, language));
  // The shared rail (components/BusinessRail) replaces this page's own icon
  // strip — the third copy of that markup, and the one still on the old
  // 74px strip. Every entry keeps the destination it had here.
  const handleRailSelect = (id) => {
    if (id === 'projects') return;
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    goWorkspace(id === 'home' ? '' : id);
  };
  const goNext = () => { if (request.title.trim().length < 3 || request.researchGoal.trim().length < 20 || request.audienceDescription.trim().length < 10) { setError(copy.stepOneError || copy.error); return; } setError(''); setStep(2); };

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true); setError('');
    try {
      await createBusinessProject({
        ...request,
        studyFormat: 'SURVEY',
        targetParticipants: request.targetParticipants ? Number(request.targetParticipants) : undefined,
        estimatedMinutes: request.estimatedMinutes ? Number(request.estimatedMinutes) : undefined,
        incentiveBudget: 'NEED_GUIDANCE',
        selfServiceQuestionnaire: false,
      });
      navigate(withLanguage('/business/workspace?view=projects', language), { state: { message: copy.saved } });
    } catch {
      setError(copy.error);
    } finally { setSubmitting(false); }
  };

  return <main className="business-custom-request-page">
    <div className="business-custom-request-shell">
      <BusinessRail activeId="projects" onSelect={handleRailSelect} />
      <section className="business-custom-request-surface">
        <header><button type="button" onClick={() => goWorkspace()}><ArrowLeft size={16} /> {copy.back}</button><div><span>{copy.eyebrow}</span>{step === 1 ? <button type="button" className="business-button business-custom-request-next" onClick={goNext}>{copy.continue} <ArrowRight size={16} /></button> : <><button type="button" className="business-custom-request-quiet" onClick={() => { setError(''); setStep(1); }}>{copy.previous}</button><button className="business-button" type="submit" form="business-custom-questionnaire-form" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : copy.submit} {!submitting && <ArrowRight size={16} />}</button></>}</div></header>
        <form id="business-custom-questionnaire-form" className="business-custom-request-form" onSubmit={submit}>
          <div className="business-custom-request-heading"><p>{step === 1 ? copy.stepOne : copy.stepTwo}</p><h1>{step === 1 ? copy.stepOneTitle : copy.stepTwoTitle}{language === 'zh-CN' && step === 1 && <i className="business-custom-request-question-mark">？</i>}</h1><span>{step === 1 ? copy.stepOneIntro : copy.stepTwoIntro}</span></div>
          {step === 1 ? <section className="business-custom-request-fields"><label>{copy.project}<input name="title" value={request.title} onChange={update} placeholder={copy.projectHint} required /></label><label>{copy.decision}<textarea name="researchGoal" value={request.researchGoal} onChange={update} placeholder={copy.decisionHint} required /></label><label>{copy.audience}<textarea name="audienceDescription" value={request.audienceDescription} onChange={update} placeholder={copy.audienceHint} required /></label><div className="business-custom-request-grid"><label>{copy.market}<input name="countries" value={request.countries} onChange={update} placeholder={copy.marketHint} /></label><label>{copy.language}<input name="languages" value={request.languages} onChange={update} placeholder={copy.languageHint} /></label></div></section> : <section className="business-custom-request-fields"><div className="business-custom-request-grid"><label>{copy.minutes}<input name="estimatedMinutes" type="number" min="1" value={request.estimatedMinutes} onChange={update} /></label><label>{copy.sample}<input name="targetParticipants" type="number" min="1" value={request.targetParticipants} onChange={update} /><small>{copy.sampleHint}</small></label><label>{copy.timing}<input name="timeline" value={request.timeline} onChange={update} placeholder={copy.timingHint} /></label></div><label>{copy.context}<textarea name="additionalContext" value={request.additionalContext} onChange={update} placeholder={copy.contextHint} /></label></section>}
          {error && <p className="business-custom-request-error" role="alert">{error}</p>}
        </form>
      </section>
    </div>
    {showIntro && <div className="business-custom-intro-modal" role="dialog" aria-modal="true" aria-labelledby="custom-questionnaire-intro-title"><section><button className="business-custom-intro-close" type="button" onClick={() => setShowIntro(false)} aria-label={copy.closeIntro}><X size={20} /></button><div className="business-custom-intro-copy"><p>{copy.modalEyebrow}</p><h2 id="custom-questionnaire-intro-title">{copy.modalTitle}</h2><span>{copy.modalBody}</span><ol>{copy.modalSteps.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</li>)}</ol><div><button className="business-button business-custom-intro-continue" type="button" onClick={() => setShowIntro(false)}>{copy.start} <ArrowRight size={16} /></button><button type="button" onClick={() => goWorkspace()}>{copy.later}</button></div></div><figure><img src={serviceImage} alt="" /></figure></section></div>}
  </main>;
}
