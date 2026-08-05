import { AlertTriangle, ArrowRight, CheckCircle2, Clock3, Compass, RefreshCcw, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser, getSurveyOutcome, getSurveyWall, startSurvey } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import PageHeader from '../components/PageHeader';
import { useProfileSurvey } from '../components/ProfileSurveyContext';
import SurveyResultModal from '../components/SurveyResultModal';
import { useAuth } from '../components/AuthContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { isPanelistRole } from '../utils/roles';

const activeSurveyStorageKey = 'guanyi-active-survey';
const dismissedSurveyStoragePrefix = 'guanyi-dismissed-surveys';

function friendlyStartError(error) {
  if (error.response?.status === 503) return 'No surveys are available right now.';
  if (error.response) return 'Unable to open this survey. Please choose another opportunity or try again shortly.';
  return 'Unable to open this survey. Please try again.';
}

function readStoredValue(key, fallback) {
  try {
    const value = window.sessionStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredValue(key, value) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

function removeStoredValue(key) {
  try {
    window.sessionStorage.removeItem(key);
  } catch {}
}

function resultNoticeFor(outcome) {
  const coins = Math.max(0, Number(outcome.coins) || 0);
  if (outcome.status === 'COMPLETED') return { type: 'completed', coins };
  if (coins > 0) return { type: 'participation', coins };
  if (['SCREEN_OUT', 'QUOTA_FULL'].includes(outcome.status)) return { type: 'unavailable', coins: 0 };
  return { type: 'interrupted', coins: 0 };
}

function SurveyCard({ item, isPanelist, isStarting, hasActiveSurvey, onStart }) {
  return (
    <section className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-700">Estimated reward</span>
          <div className="mt-0.5 text-xl font-extrabold leading-tight text-cyan-700"><CoinAmount value={item.reward} /></div>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2 py-1 text-[11px] font-bold text-slate-600 ring-1 ring-slate-200">
          <Clock3 size={13} />
          {item.loi || '-'} min
        </span>
      </div>

      <div className="px-4 py-3.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-slate-950">{item.displayName}</h3>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cyan-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-cyan-700">
            <Sparkles size={12} />
            Available
          </span>
        </div>
        <p className="mt-1.5 truncate text-xs font-semibold text-slate-400">{item.publicSurveyCode}</p>

        <button
          className="mt-3.5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          disabled={!isPanelist || isStarting || hasActiveSurvey}
          onClick={onStart}
          aria-label={isPanelist ? `Start ${item.displayName}` : `Preview ${item.displayName}`}
        >
          {isPanelist && isStarting ? <RefreshCcw className="animate-spin" size={16} /> : <ArrowRight size={16} />}
          {isPanelist ? (hasActiveSurvey ? 'Survey open' : 'Start survey') : 'Preview only'}
        </button>
      </div>
    </section>
  );
}

function ResearchProfileCard({ profile, rewardCoins, profileLoading }) {
  const isComplete = Boolean(profile?.isComplete);
  const started = Boolean(profile?.profileStartedAt);

  return (
    <article className="overflow-hidden rounded-2xl border border-[#bac7b9] bg-[#f8faf5] shadow-[0_18px_38px_rgba(43,66,48,.09)] sm:grid sm:grid-cols-[minmax(220px,.72fr)_minmax(0,1fr)]">
      <div className="min-h-[190px] overflow-hidden bg-[#dce5d9] sm:min-h-full">
        <img className="h-full w-full object-cover" src="/panel-profile/horizon-oil.jpg" alt="A painted horizon" />
      </div>
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#51715a]">
            <Compass size={14} /> Research profile
          </span>
          {profileLoading ? (
            <span className="h-6 w-20 animate-pulse rounded-full bg-[#e0e7df]" aria-label="Loading profile status" />
          ) : null}
        </div>
        <h3 className="mt-4 font-[var(--font-reading)] text-3xl font-bold tracking-[-0.035em] text-[#1d3224]">Complete your research profile.</h3>
        <p className="mt-3 max-w-xl text-sm font-medium leading-6 text-[#607166]">
          {isComplete
            ? 'Your profile is ready. When we find research that fits you, we will let you know.'
            : 'A few short answers help us find research that is more relevant to you.'}
        </p>
        {!profileLoading && !isComplete && <p className="mt-3 text-xs font-bold text-[#8a6c2c]">Complete it once to receive {rewardCoins} Coins.</p>}
        {!profileLoading && (
          isComplete ? (
            <button className="mt-5 inline-flex h-10 cursor-default items-center justify-center gap-2 rounded-lg border border-[#b9d2bd] bg-[#e7f1e8] px-4 text-sm font-bold text-[#2d6540]" type="button" disabled>
              <CheckCircle2 size={16} /> Completed
            </button>
          ) : (
            <Link
              className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-[#1f4a30] px-4 text-sm font-bold text-white transition hover:bg-[#153c26]"
              to="/panel-profile"
            >
              {started ? 'Continue profile' : 'Complete profile'} <ArrowRight size={16} />
            </Link>
          )
        )}
      </div>
    </article>
  );
}

export default function SurveyPartners() {
  const { user, setUser } = useAuth();
  const { panelProfile, rewardCoins, loading: profileLoading } = useProfileSurvey();
  const location = useLocation();
  const isPanelist = isPanelistRole(user?.role);
  const [wallRefreshKey, setWallRefreshKey] = useState(0);
  const [startingId, setStartingId] = useState('');
  const [startError, setStartError] = useState('');
  const [showAllSurveys, setShowAllSurveys] = useState(false);
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [dismissedSurveyIds, setDismissedSurveyIds] = useState([]);
  const [resultNotice, setResultNotice] = useState(null);
  const [resultRecommendations, setResultRecommendations] = useState(null);
  const loadSurveyWall = user ? getSurveyWall : () => Promise.resolve({ data: { sections: [{ id: 'surveys', title: 'Online surveys', subtitle: 'Choose from available online surveys.', items: [] }] } });
  const { data, loading, error } = useAsyncData(loadSurveyWall, [user?.id || 'guest', wallRefreshKey]);
  const sections = data?.sections || [];
  const surveySection = sections.find((section) => section.id === 'surveys') || { id: 'surveys', title: 'Online surveys', subtitle: 'Choose from available online surveys.', items: [] };
  const allSurveyItems = surveySection.items || [];
  const surveyItems = useMemo(
    () => allSurveyItems.filter((item) => !dismissedSurveyIds.includes(item.id)),
    [allSurveyItems, dismissedSurveyIds]
  );
  const displayedSurveyItems = showAllSurveys ? surveyItems : surveyItems.slice(0, 6);
  const hiddenSurveyCount = Math.max(0, surveyItems.length - displayedSurveyItems.length);
  const recommendations = surveyItems.slice(0, 2);
  const surveyGridClass = 'grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
  const hasActiveSurvey = Boolean(activeSurvey?.recordId);

  const refreshSurveyWall = () => setWallRefreshKey((value) => value + 1);

  const rememberDismissedSurvey = (surveyId) => {
    const next = [...new Set([...dismissedSurveyIds, surveyId])].slice(-100);
    setDismissedSurveyIds(next);
    if (user?.id) writeStoredValue(`${dismissedSurveyStoragePrefix}:${user.id}`, next);
  };

  const refreshUserWallet = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data.user);
    } catch {}
  };

  const checkActiveSurvey = async () => {
    if (!activeSurvey?.recordId) return;

    try {
      const response = await getSurveyOutcome(activeSurvey.recordId);
      const outcome = response.data;
      if (!outcome?.isFinal) return;

      let refreshedRecommendations = [];
      try {
        const refreshedWall = await getSurveyWall();
        const refreshedSection = (refreshedWall.data.sections || []).find((section) => section.id === 'surveys');
        refreshedRecommendations = (refreshedSection?.items || [])
          .filter((item) => item.id !== activeSurvey.itemId && !dismissedSurveyIds.includes(item.id))
          .slice(0, 2);
      } catch {}

      setResultRecommendations(refreshedRecommendations);
      setResultNotice(resultNoticeFor(outcome));
      setActiveSurvey(null);
      removeStoredValue(activeSurveyStorageKey);
      refreshSurveyWall();
      await refreshUserWallet();
    } catch (caughtError) {
      if (caughtError.response?.status === 404) {
        setActiveSurvey(null);
        removeStoredValue(activeSurveyStorageKey);
      }
    }
  };

  useEffect(() => {
    if (!user?.id) {
      setActiveSurvey(null);
      setDismissedSurveyIds([]);
      return;
    }

    const storedActiveSurvey = readStoredValue(activeSurveyStorageKey, null);
    if (storedActiveSurvey?.recordId) setActiveSurvey(storedActiveSurvey);
    setDismissedSurveyIds(readStoredValue(`${dismissedSurveyStoragePrefix}:${user.id}`, []));
  }, [user?.id]);

  useEffect(() => {
    const targetId = location.hash.slice(1);
    if (!targetId) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  useEffect(() => {
    if (!activeSurvey?.recordId) return undefined;

    const checkWhenVisible = () => {
      if (document.visibilityState === 'visible') void checkActiveSurvey();
    };
    const interval = window.setInterval(() => void checkActiveSurvey(), 15000);
    window.addEventListener('focus', checkWhenVisible);
    document.addEventListener('visibilitychange', checkWhenVisible);
    void checkActiveSurvey();

    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', checkWhenVisible);
      document.removeEventListener('visibilitychange', checkWhenVisible);
    };
  }, [activeSurvey?.recordId]);

  const handleStart = async (item) => {
    if (hasActiveSurvey) {
      setStartError('You already have a survey open. Finish that survey before starting another one.');
      return;
    }

    const surveyWindow = window.open('', '_blank');
    if (!surveyWindow) {
      setStartError('Please allow this site to open the survey in a new tab.');
      return;
    }

    setStartingId(item.id);
    setStartError('');
    try {
      const response = await startSurvey({
        surveyId: item.surveyId || item.id,
        partnerId: item.partnerSlug || item.partnerId,
        linkType: 'direct',
      });
      const redirectUrl = response.data.redirectUrl;
      const recordId = response.data.record?.id;
      if (!redirectUrl || !recordId) throw new Error('No survey is available right now.');

      const nextActiveSurvey = { recordId, itemId: item.id };
      surveyWindow.opener = null;
      surveyWindow.location.replace(redirectUrl);
      setActiveSurvey(nextActiveSurvey);
      writeStoredValue(activeSurveyStorageKey, nextActiveSurvey);
      rememberDismissedSurvey(item.id);
      setResultNotice(null);
      setResultRecommendations(null);
      refreshSurveyWall();
    } catch (caughtError) {
      surveyWindow.close();
      setStartError(friendlyStartError(caughtError));
    } finally {
      setStartingId('');
    }
  };

  return (
    <>
      <PageHeader title="Online surveys" description="Choose an available online survey. It opens in a new tab while your GuanyiSearch task centre stays here." />

      {(error || startError) && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          <AlertTriangle size={16} />
          {startError || 'No surveys are available right now.'}
        </div>
      )}

      <section id={surveySection.id} className="scroll-mt-28">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">{surveySection.title}</h2>
            {surveySection.subtitle && <p className="mt-1.5 text-sm leading-6 text-slate-500">{surveySection.subtitle}</p>}
          </div>
          {surveyItems.length > 0 && <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-500">{surveyItems.length} available</span>}
        </div>

        {loading && user ? (
          <div className={surveyGridClass}>
            {Array.from({ length: 6 }).map((_, index) => <div key={index} className="h-36 animate-pulse rounded-xl bg-slate-100" />)}
          </div>
        ) : !surveyItems.length ? (
          <div className="flex min-h-0 items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-5 text-sm text-slate-500">
            <span>{user ? 'New opportunities are updating. Please check back shortly.' : 'Sign in to view surveys matched for you.'}</span>
            {!user && <Link className="shrink-0 font-bold text-cyan-700 hover:text-cyan-600" to="/login">Sign in</Link>}
          </div>
        ) : (
          <>
            <div className={surveyGridClass}>
              {displayedSurveyItems.map((item) => (
                <SurveyCard
                  key={item.id}
                  item={item}
                  isPanelist={isPanelist}
                  isStarting={startingId === item.id}
                  hasActiveSurvey={hasActiveSurvey}
                  onStart={() => handleStart(item)}
                />
              ))}
            </div>
            {hiddenSurveyCount > 0 && (
              <button className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" type="button" onClick={() => setShowAllSurveys(true)}>
                View {hiddenSurveyCount} more surveys
              </button>
            )}
          </>
        )}
      </section>

      <section id="research" className="mt-12 scroll-mt-28 border-t border-slate-200 pt-10" aria-labelledby="research-title">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#6e8573]">Research</p>
            <h2 id="research-title" className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950">Research and activities</h2>
            <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">Your completed profile helps us introduce research and activities that fit you.</p>
          </div>
        </div>
        {isPanelist ? (
          <ResearchProfileCard profile={panelProfile} rewardCoins={rewardCoins} profileLoading={profileLoading} />
        ) : (
          <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-5 text-sm text-slate-500">
            <span>Sign in to complete your research profile and see relevant opportunities.</span>
            <Link className="shrink-0 font-bold text-cyan-700 hover:text-cyan-600" to="/login">Sign in</Link>
          </div>
        )}
      </section>

      <SurveyResultModal
        notice={resultNotice}
        recommendations={resultRecommendations || recommendations}
        startingId={startingId}
        onClose={() => {
          setResultNotice(null);
          setResultRecommendations(null);
        }}
        onStart={handleStart}
      />
    </>
  );
}
