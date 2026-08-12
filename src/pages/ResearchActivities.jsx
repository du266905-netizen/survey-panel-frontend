import { ArrowRight, BellRing, CheckCircle2, Clock3, Compass, Gift, LoaderCircle, Send, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useProfileSurvey } from '../components/ProfileSurveyContext';
import { useAuth } from '../components/AuthContext';
import { isPanelistRole } from '../utils/roles';
import { applyToResearchOpportunity, getResearchOpportunities } from '../api/realApi';

const applicationLabels = {
  APPLIED: 'Applied',
  SELECTED: 'Selected',
  NOT_SELECTED: 'Not selected',
  COMPLETED: 'Completed',
};

function formatDeadline(value) {
  if (!value) return null;
  const deadline = new Date(value);
  if (Number.isNaN(deadline.getTime())) return null;
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(deadline);
}

function OpportunityCard({ opportunity, onApply, applying }) {
  const application = opportunity.application;
  const applicationLabel = applicationLabels[application?.status] || null;
  const deadline = formatDeadline(opportunity.deadline);

  return (
    <article className="research-opportunity-card">
      <div className="research-opportunity-card-heading">
        <span>{opportunity.format}</span>
        {opportunity.topic && <small><Tag size={12} /> {opportunity.topic}</small>}
      </div>
      <h3>{opportunity.title}</h3>
      <p>{opportunity.summary}</p>
      <dl className="research-opportunity-details">
        {opportunity.estimatedMinutes && <div><dt><Clock3 size={14} /> Time</dt><dd>{opportunity.estimatedMinutes} min</dd></div>}
        <div><dt><Gift size={14} /> Reward</dt><dd>{opportunity.rewardDescription}</dd></div>
        {deadline && <div><dt>Deadline</dt><dd>{deadline}</dd></div>}
      </dl>
      {opportunity.requirements && <p className="research-opportunity-requirements">{opportunity.requirements}</p>}
      {application ? (
        <div className={`research-opportunity-status is-${application.status.toLowerCase()}`}>
          <CheckCircle2 size={16} />
          <span>{applicationLabel}</span>
        </div>
      ) : (
        <button className="action-injection research-opportunity-apply" type="button" onClick={() => onApply(opportunity.id)} disabled={applying || !opportunity.isOpen}>
          {applying ? <LoaderCircle className="animate-spin" size={16} /> : <Send size={16} />}
          {opportunity.isOpen ? 'Apply to participate' : 'Closed'}
        </button>
      )}
    </article>
  );
}

export default function ResearchActivities() {
  const { user } = useAuth();
  const { panelProfile, rewardCoins, loading } = useProfileSurvey();
  const isPanelist = isPanelistRole(user?.role);
  const isComplete = Boolean(panelProfile?.isComplete);
  const started = Boolean(panelProfile?.profileStartedAt);
  const [opportunities, setOpportunities] = useState([]);
  const [opportunitiesLoading, setOpportunitiesLoading] = useState(true);
  const [opportunitiesError, setOpportunitiesError] = useState('');
  const [applyingToId, setApplyingToId] = useState('');

  useEffect(() => {
    let active = true;
    if (!isPanelist) {
      setOpportunities([]);
      setOpportunitiesLoading(false);
      return undefined;
    }

    const loadOpportunities = async () => {
      setOpportunitiesLoading(true);
      setOpportunitiesError('');
      try {
        const response = await getResearchOpportunities();
        if (active) setOpportunities(response.data.opportunities || []);
      } catch {
        if (active) {
          setOpportunities([]);
          setOpportunitiesError('');
        }
      } finally {
        if (active) setOpportunitiesLoading(false);
      }
    };

    loadOpportunities();
    return () => { active = false; };
  }, [isPanelist, isComplete]);

  const applyToOpportunity = async (opportunityId) => {
    if (!opportunityId || applyingToId) return;
    setApplyingToId(opportunityId);
    setOpportunitiesError('');
    try {
      const response = await applyToResearchOpportunity({ opportunityId });
      const updated = response.data.opportunity;
      setOpportunities((current) => current.map((opportunity) => (opportunity.id === updated.id ? updated : opportunity)));
    } catch (caughtError) {
      setOpportunitiesError(caughtError.response?.data?.message || 'Unable to submit your application right now.');
    } finally {
      setApplyingToId('');
    }
  };

  return (
    <section className="research-activities-page">
      <PageHeader title="Research and activities" description="See platform research that fits your profile and keep track of your applications." />

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

          <section className="research-opportunities-section" aria-labelledby="matched-opportunities-title">
            <div className="research-opportunities-section-heading">
              <div>
                <p>Matched for you</p>
                <h2 id="matched-opportunities-title">Research opportunities</h2>
              </div>
              {!opportunitiesLoading && opportunities.length > 0 && <span>{opportunities.length} {opportunities.length === 1 ? 'match' : 'matches'}</span>}
            </div>
            {opportunitiesLoading ? (
              <div className="research-opportunities-grid" aria-label="Loading research opportunities">
                {Array.from({ length: 3 }).map((_, index) => <div key={index} className="research-opportunity-skeleton" />)}
              </div>
            ) : opportunities.length ? (
              <div className="research-opportunities-grid">
                {opportunities.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} applying={applyingToId === opportunity.id} onApply={applyToOpportunity} />)}
              </div>
            ) : (
              <div className="research-opportunities-empty">
                When we find research that fits you, we’ll let you know right away.
              </div>
            )}
            {opportunitiesError && <p className="research-opportunities-error" role="alert">{opportunitiesError}</p>}
          </section>

          {opportunities.length > 0 && (
            <aside className="research-activities-notice">
              <BellRing size={19} />
              <p>Applying does not guarantee selection.</p>
            </aside>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-5 text-sm text-slate-500">
          Research and activities are available to member accounts after sign-in.
        </div>
      )}
    </section>
  );
}
