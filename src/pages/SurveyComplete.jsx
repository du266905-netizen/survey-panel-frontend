import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, CircleAlert, Clock3, ShieldAlert, Trophy, XCircle } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

/* Outer keys match the ?status= values; icon/tone stay local (component
   reference and className tone). eyebrow/title/description are keys of the
   surveyComplete section in the language library. */
const statusCopy = {
  success: {
    icon: Trophy,
    tone: 'success',
    eyebrow: 'eyebrowFinished',
    title: 'titleSessionEnded',
    description: 'descriptionReturn',
  },
  partial: {
    icon: Clock3,
    tone: 'pending',
    eyebrow: 'eyebrowFinished',
    title: 'titleSessionEnded',
    description: 'descriptionReturn',
  },
  disqualified: {
    icon: XCircle,
    tone: 'neutral',
    eyebrow: 'eyebrowNewOpportunities',
    title: 'titleThisSessionEnded',
    description: 'descriptionNewOpportunities',
  },
  quota_full: {
    icon: CircleAlert,
    tone: 'neutral',
    eyebrow: 'eyebrowNewOpportunities',
    title: 'titleThisSessionEnded',
    description: 'descriptionNewOpportunities',
  },
  security: {
    icon: ShieldAlert,
    tone: 'warning',
    eyebrow: 'eyebrowReady',
    title: 'titleNotCompleted',
    description: 'descriptionReturnAnytime',
  },
  default: {
    icon: CheckCircle2,
    tone: 'neutral',
    eyebrow: 'eyebrowSessionClosed',
    title: 'titleSessionEnded',
    description: 'descriptionReturn',
  },
};

export default function SurveyComplete() {
  const { publicCopy } = useLanguage();
  const copy = publicCopy?.panelistUi?.surveyComplete || {};
  const [searchParams] = useSearchParams();
  const status = String(searchParams.get('status') || 'default').toLowerCase();
  const statusConfig = statusCopy[status] || statusCopy.default;
  const Icon = statusConfig.icon;

  return (
    <main className="survey-complete-page">
      <section className={`survey-complete-card is-${statusConfig.tone}`}>
        <div className="survey-complete-icon">
          <Icon size={30} aria-hidden="true" />
        </div>
        <p className="survey-complete-eyebrow">{copy[statusConfig.eyebrow]}</p>
        <h1>{copy[statusConfig.title]}</h1>
        <p>{copy[statusConfig.description]}</p>
        <Link className="btn-primary survey-complete-action" to="/partners">
          {copy.returnToSurveyWall}
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
