import { ArrowRight, BellRing, CheckCircle2, Clock3, Compass, Gift, LoaderCircle, Send, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useProfileSurvey } from '../components/ProfileSurveyContext';
import { useAuth } from '../components/AuthContext';
import { useLanguage } from '../components/LanguageContext';
import { isPanelistRole } from '../utils/roles';
import { interpolate } from '../utils/interpolate';
import { formatCoinNumber } from '../utils/formatters';
import { applyToResearchOpportunity, getResearchOpportunities } from '../api/realApi';

/* Values are language-library keys; the object keys are backend status
   enums and must stay as they are. */
const applicationLabels = {
  APPLIED: 'statusApplied',
  SELECTED: 'statusSelected',
  NOT_SELECTED: 'statusNotSelected',
  COMPLETED: 'statusCompleted',
};

function formatDeadline(value, language) {
  if (!value) return null;
  const deadline = new Date(value);
  if (Number.isNaN(deadline.getTime())) return null;
  return new Intl.DateTimeFormat(language, { month: 'short', day: 'numeric', year: 'numeric' }).format(deadline);
}

function OpportunityCard({ opportunity, onApply, applying, copy, language }) {
  const application = opportunity.application;
  const applicationLabelKey = applicationLabels[application?.status] || null;
  const deadline = formatDeadline(opportunity.deadline, language);

  return (
    <article className="research-opportunity-card">
      <div className="research-opportunity-card-heading">
        <span>{opportunity.format}</span>
        {opportunity.topic && <small><Tag size={12} /> {opportunity.topic}</small>}
      </div>
      <h3>{opportunity.title}</h3>
      <p>{opportunity.summary}</p>
      <dl className="research-opportunity-details">
        {opportunity.estimatedMinutes && <div><dt><Clock3 size={14} /> {copy.detailTime}</dt><dd>{opportunity.estimatedMinutes} {copy.minuteUnit}</dd></div>}
        <div><dt><Gift size={14} /> {copy.detailReward}</dt><dd>{opportunity.rewardDescription}</dd></div>
        {deadline && <div><dt>{copy.detailDeadline}</dt><dd>{deadline}</dd></div>}
      </dl>
      {opportunity.requirements && <p className="research-opportunity-requirements">{opportunity.requirements}</p>}
      {application ? (
        <div className={`research-opportunity-status is-${application.status.toLowerCase()}`}>
          <CheckCircle2 size={16} />
          <span>{applicationLabelKey ? copy[applicationLabelKey] : null}</span>
        </div>
      ) : (
        <button className="action-injection research-opportunity-apply" type="button" onClick={() => onApply(opportunity.id)} disabled={applying || !opportunity.isOpen}>
          {applying ? <LoaderCircle className="animate-spin" size={16} /> : <Send size={16} />}
          {opportunity.isOpen ? copy.applyToParticipate : copy.closed}
        </button>
      )}
    </article>
  );
}

export default function ResearchActivities() {
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy?.panelistUi?.research || {};
  const { user } = useAuth();
  const { panelProfile, rewardCoins, loading } = useProfileSurvey();
  const isPanelist = isPanelistRole(user?.role);
  const isComplete = Boolean(panelProfile?.isComplete);
  const started = Boolean(panelProfile?.profileStartedAt);
  const [opportunities, setOpportunities] = useState([]);
  const [opportunitiesLoading, setOpportunitiesLoading] = useState(true);
  const [opportunitiesError, setOpportunitiesError] = useState('');
  const [applyingToId, setApplyingToId] = useState('');

  /* "count + word" pair: pick the plural form the interface language wants,
     and fall back to the plural for zero (Russian/Portuguese need it). */
  const matchWord = (count) => {
    if (!count) return copy.matchPlural;
    const category = new Intl.PluralRules(language).select(count);
    if (category === 'one') return copy.matchSingular;
    if (category === 'few') return copy.matchFew;
    return copy.matchPlural;
  };

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
      setOpportunitiesError(caughtError.response?.data?.message || copy.applyError);
    } finally {
      setApplyingToId('');
    }
  };

  return (
    <section className="research-activities-page">
      <PageHeader title={copy.title} description={copy.description} />

      {isPanelist ? (
        <>
          <section aria-label={copy.tasksAriaLabel}>
            <div className="mb-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6e8573]">{copy.yourTasks}</p>
            </div>

            <article className="research-profile-task-card">
              <div className="research-profile-task-art" aria-hidden="true">
                <img src="/panel-profile/horizon-oil.jpg" alt="" />
                <span><Compass size={25} /></span>
              </div>
              <div className="research-profile-task-content">
                <p>{copy.profileKicker}</p>
                <h3>{copy.profileTitle}</h3>
                <span>
                  {isComplete
                    ? copy.profileReady
                    : copy.profilePrompt}
                </span>
                {!loading && !isComplete && <strong>{interpolate(copy.profileReward, { coins: formatCoinNumber(rewardCoins) })}</strong>}
                {!loading && (
                  isComplete ? (
                    <button type="button" disabled><CheckCircle2 size={16} /> {copy.statusCompleted}</button>
                  ) : (
                    <Link className="action-injection" to="/panel-profile">{started ? copy.continueProfile : copy.completeProfile} <ArrowRight size={16} /></Link>
                  )
                )}
              </div>
            </article>
          </section>

          <section className="research-opportunities-section" aria-labelledby="matched-opportunities-title">
            <div className="research-opportunities-section-heading">
              <div>
                <p>{copy.matchedForYou}</p>
                <h2 id="matched-opportunities-title">{copy.opportunitiesTitle}</h2>
              </div>
              {!opportunitiesLoading && opportunities.length > 0 && <span>{opportunities.length} {matchWord(opportunities.length)}</span>}
            </div>
            {opportunitiesLoading ? (
              <div className="research-opportunities-grid" aria-label={copy.loadingAriaLabel}>
                {Array.from({ length: 3 }).map((_, index) => <div key={index} className="research-opportunity-skeleton" />)}
              </div>
            ) : opportunities.length ? (
              <div className="research-opportunities-grid">
                {opportunities.map((opportunity) => <OpportunityCard key={opportunity.id} opportunity={opportunity} applying={applyingToId === opportunity.id} onApply={applyToOpportunity} copy={copy} language={language} />)}
              </div>
            ) : (
              <div className="research-opportunities-empty">
                <span>{copy.emptyState}</span>
              </div>
            )}
            {opportunitiesError && <p className="research-opportunities-error" role="alert">{opportunitiesError}</p>}
          </section>

          {opportunities.length > 0 && (
            <aside className="research-activities-notice">
              <BellRing size={19} />
              <p>{copy.applyNotice}</p>
            </aside>
          )}
        </>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white px-5 py-5 text-sm text-slate-500">
          {copy.membersOnly}
        </div>
      )}
    </section>
  );
}
