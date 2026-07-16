import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, CircleAlert, Clock3, ShieldAlert, Trophy, XCircle } from 'lucide-react';

const statusCopy = {
  success: {
    icon: Trophy,
    tone: 'success',
    eyebrow: 'Survey completed',
    title: 'Congratulations — your survey was completed.',
    description: 'Your reward will be credited after partner validation. Most rewards appear automatically once the callback is confirmed.',
  },
  partial: {
    icon: Clock3,
    tone: 'pending',
    eyebrow: 'Partial completion',
    title: 'Thanks — your session was partially completed.',
    description: 'The partner may still review this session. If a partial reward is approved, it will appear in your wallet automatically.',
  },
  disqualified: {
    icon: XCircle,
    tone: 'neutral',
    eyebrow: 'Not a match',
    title: 'You did not qualify for this survey.',
    description: 'That happens sometimes when quotas or screening answers do not match. Return to the survey wall to look for another available survey.',
  },
  quota_full: {
    icon: CircleAlert,
    tone: 'neutral',
    eyebrow: 'Quota full',
    title: 'This survey is already full.',
    description: 'The partner reached the target number of responses. New opportunities refresh throughout the day.',
  },
  security: {
    icon: ShieldAlert,
    tone: 'warning',
    eyebrow: 'Session ended',
    title: 'This survey session ended for security reasons.',
    description: 'No reward was issued for this session. Please return to the survey wall and choose another available opportunity.',
  },
  default: {
    icon: CheckCircle2,
    tone: 'neutral',
    eyebrow: 'Survey session closed',
    title: 'Your survey session has ended.',
    description: 'If the partner approves the completion, your reward will be credited automatically. You can return to the survey wall now.',
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
