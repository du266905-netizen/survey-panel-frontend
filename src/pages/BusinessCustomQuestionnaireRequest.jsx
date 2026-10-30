import { useState } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import heroImage from '../assets/business/custom-questionnaire-hero.jpg';
import './BusinessCustomQuestionnaire.css';

const initialRequest = {
  title: '', researchGoal: '', audienceDescription: '', countries: '', languages: '',
  estimatedMinutes: '', targetParticipants: '', timeline: '', additionalContext: '',
};

export default function BusinessCustomQuestionnaireRequest() {
  const { language, publicCopy } = useLanguage();
  const requests = publicCopy?.workspace?.business?.customRequest || {};
  const copy = requests[language] || requests['en-US'] || {};
  const navigate = useNavigate();
  const location = useLocation();
  const preparedRequest = location.state?.preparedRequest;
  const [request, setRequest] = useState(() => ({ ...initialRequest, ...(preparedRequest || {}) }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const update = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));
  const goWorkspace = () => navigate(withLanguage('/business/workspace?view=projects', language));

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    if (request.title.trim().length < 3 || request.researchGoal.trim().length < 20 || request.audienceDescription.trim().length < 10) {
      setError(copy.stepOneError || copy.error);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await createBusinessProject({
        ...request,
        studyFormat: 'SURVEY',
        serviceCategory: 'CUSTOM_RESEARCH',
        targetParticipants: request.targetParticipants ? Number(request.targetParticipants) : undefined,
        estimatedMinutes: request.estimatedMinutes ? Number(request.estimatedMinutes) : undefined,
        incentiveBudget: 'NEED_GUIDANCE',
        selfServiceQuestionnaire: false,
      });
      navigate(withLanguage('/business/workspace?view=projects', language), { state: { message: copy.saved } });
    } catch {
      setError(copy.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="business-custom-page">
      <header className="business-custom-topbar">
        <button type="button" onClick={goWorkspace}>
          <ArrowLeft size={16} /> {copy.back}
        </button>
        <span>{copy.eyebrow}</span>
      </header>

      <section className="business-custom-hero">
        <img src={heroImage} alt="" decoding="async" />
        <div className="business-custom-hero-copy">
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
      </section>

      <section className="business-custom-body">
        <div className="business-custom-intro">
          <h2>{copy.modalTitle}</h2>
          <p>{copy.modalBody}</p>
        </div>

        <form id="business-custom-questionnaire-form" className="business-custom-form" onSubmit={submit}>
          <section className="business-custom-section">
            <div className="business-custom-grid">
              <label className="is-full">
                {copy.project}
                <input name="title" value={request.title} onChange={update} placeholder={copy.projectHint} required />
              </label>
              <label className="is-full">
                {copy.decision}
                <textarea name="researchGoal" value={request.researchGoal} onChange={update} placeholder={copy.decisionHint} required />
              </label>
              <label className="is-full">
                {copy.audience}
                <textarea name="audienceDescription" value={request.audienceDescription} onChange={update} placeholder={copy.audienceHint} required />
              </label>
              <label>
                {copy.market}
                <input name="countries" value={request.countries} onChange={update} placeholder={copy.marketHint} />
              </label>
              <label>
                {copy.language}
                <input name="languages" value={request.languages} onChange={update} placeholder={copy.languageHint} />
              </label>
            </div>
          </section>

          <section className="business-custom-section business-custom-section--scope">
            <div className="business-custom-section-head">
              <h2>{copy.stepTwoTitle}</h2>
              <p>{copy.stepTwoIntro}</p>
            </div>
            <div className="business-custom-grid business-custom-grid--three">
              <label>
                {copy.minutes}
                <input name="estimatedMinutes" type="number" min="1" value={request.estimatedMinutes} onChange={update} />
              </label>
              <label>
                {copy.sample}
                <input name="targetParticipants" type="number" min="1" value={request.targetParticipants} onChange={update} />
                <small>{copy.sampleHint}</small>
              </label>
              <label>
                {copy.timing}
                <input name="timeline" value={request.timeline} onChange={update} placeholder={copy.timingHint} />
              </label>
              <label className="is-full">
                {copy.context}
                <textarea name="additionalContext" value={request.additionalContext} onChange={update} placeholder={copy.contextHint} />
              </label>
            </div>
          </section>

          {error && <p className="business-custom-error" role="alert">{error}</p>}

          <footer className="business-custom-actions">
            <button type="submit" className="business-custom-submit" disabled={submitting}>
              {submitting ? <LoaderCircle className="animate-spin" size={16} /> : copy.submit}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
