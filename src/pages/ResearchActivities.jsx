import { ArrowRight, BellRing, CheckCircle2, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useProfileSurvey } from '../components/ProfileSurveyContext';
import { useAuth } from '../components/AuthContext';
import { isPanelistRole } from '../utils/roles';

export default function ResearchActivities() {
  const { user } = useAuth();
  const { panelProfile, rewardCoins, loading } = useProfileSurvey();
  const isPanelist = isPanelistRole(user?.role);
  const isComplete = Boolean(panelProfile?.isComplete);
  const started = Boolean(panelProfile?.profileStartedAt);

  return (
    <section className="research-activities-page">
      <PageHeader title="Research and activities" description="Complete your profile so we can introduce research and activities that fit you." />

      {isPanelist ? (
        <>
          <section aria-label="Research tasks">
            <div className="mb-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6e8573]">Your tasks</p>
            </div>

            <article className="research-profile-task-card">
              <div className="research-profile-task-art" aria-hidden="true">
                <img src="/panel-profile/horizon-oil.jpg" alt="" />
                <span><Compass size={25} /></span>
              </div>
              <div className="research-profile-task-content">
                <p>Research profile</p>
                <h3>Complete your participant profile.</h3>
                <span>
                  {isComplete
                    ? 'Your profile is ready for matching.'
                    : 'Tell us a little about yourself so we can find research that fits you.'}
                </span>
                {!loading && !isComplete && <strong>Complete it once to receive {rewardCoins} Coins.</strong>}
                {!loading && (
                  isComplete ? (
                    <button type="button" disabled><CheckCircle2 size={16} /> Completed</button>
                  ) : (
                    <Link className="action-injection" to="/panel-profile">{started ? 'Continue profile' : 'Complete profile'} <ArrowRight size={16} /></Link>
                  )
                )}
              </div>
            </article>
          </section>

          <aside className="research-activities-notice">
            <BellRing size={19} />
            <p>When a survey, research study, or activity matches you, we will let you know right away.</p>
          </aside>
        </>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-5 text-sm text-slate-500">
          Research and activities are available to member accounts after sign-in.
        </div>
      )}
    </section>
  );
}
