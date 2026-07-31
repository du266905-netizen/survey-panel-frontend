import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, CircleAlert, Clock3, ShieldAlert, Trophy, XCircle } from 'lucide-react';

const statusCopy = {
  success: {
    icon: Trophy,
    tone: 'success',
    eyebrow: 'Survey finished',
    title: 'Your survey session has ended.',
    description: 'Return to GuanyiSearch to explore your next opportunity.',
  },
  partial: {
    icon: Clock3,
    tone: 'pending',
    eyebrow: 'Survey finished',
    title: 'Your survey session has ended.',
    description: 'Return to GuanyiSearch to explore your next opportunity.',
  },
  disqualified: {
    icon: XCircle,
    tone: 'neutral',
    eyebrow: 'New opportunities',
    title: 'This survey session has ended.',
    description: 'Fresh research opportunities are ready for you to explore.',
  },
  quota_full: {
    icon: CircleAlert,
    tone: 'neutral',
    eyebrow: 'New opportunities',
    title: 'This survey session has ended.',
    description: 'Fresh research opportunities are ready for you to explore.',
  },
  security: {
    icon: ShieldAlert,
    tone: 'warning',
    eyebrow: 'Ready when you are',
    title: 'This survey was not completed.',
    description: 'You can return anytime to explore another opportunity.',
  },
  default: {
    icon: CheckCircle2,
    tone: 'neutral',
    eyebrow: 'Survey session closed',
    title: 'Your survey session has ended.',
    description: 'Return to GuanyiSearch to explore your next opportunity.',
  },
};

export default function SurveyComplete() {
  const [searchParams] = useSearchParams();
  const status = String(searchParams.get('status') || 'default').toLowerCase();
  const copy = statusCopy[status] || statusCopy.default;
  const Icon = copy.icon;

  return (
    <main className="survey-complete-page">
      <section className={`survey-complete-card is-${copy.tone}`}>
        <div className="survey-complete-icon">
          <Icon size={30} aria-hidden="true" />
        </div>
        <p className="survey-complete-eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.description}</p>
        <Link className="btn-primary survey-complete-action" to="/partners">
          Return to Survey Wall
          <ArrowRight size={17} />
        </Link>
      </section>
    </main>
  );
}
