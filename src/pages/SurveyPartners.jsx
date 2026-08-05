import { AlertTriangle, ArrowRight, Clock3, Compass, RefreshCcw, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getCurrentUser, getSurveyOutcome, getSurveyWall, startSurvey } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import PageHeader from '../components/PageHeader';
import SurveyResultModal from '../components/SurveyResultModal';
import { useAuth } from '../components/AuthContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { isPanelistRole } from '../utils/roles';

const activeSurveyStoragePrefix = 'guanyi-active-survey';
const dismissedSurveyStoragePrefix = 'guanyi-dismissed-surveys';
const onlineSurveyProviderSlugs = new Set(['cpx-research']);

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

function activeSurveyStorageKey(userId) {
  return `${activeSurveyStoragePrefix}:${userId}`;
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
          className="action-injection action-injection-dark mt-3.5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
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

export default function SurveyPartners() {
  const { user, setUser } = useAuth();
  const location = useLocation();
  const isPanelist = isPanelistRole(user?.role);
  const [wallRefreshKey, setWallRefreshKey] = useState(0);
  const [startingId, setStartingId] = useState('');
  const [startError, setStartError] = useState('');
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [dismissedSurveyIds, setDismissedSurveyIds] = useState([]);
  const [resultNotice, setResultNotice] = useState(null);
  const [resultRecommendations, setResultRecommendations] = useState(null);
  const loadSurveyWall = user
    ? () => getSurveyWall({ forceRefresh: wallRefreshKey > 0 })
    : () => Promise.resolve({ data: { sections: [{ id: 'surveys', title: 'Online surveys', subtitle: 'Choose from available online surveys.', items: [] }] } });
  const { data, loading, error } = useAsyncData(loadSurveyWall, [user?.id || 'guest', wallRefreshKey]);
  const sections = data?.sections || [];
  const surveySection = sections.find((section) => section.id === 'surveys') || { id: 'surveys', title: 'Online surveys', subtitle: 'Choose from available online surveys.', items: [] };
  const moreSurveySection = sections.find((section) => section.id === 'more-opportunities');
  const moreSurveyEntry = moreSurveySection?.items?.find((item) => item.kind === 'entry');
  const allSurveyItems = (surveySection.items || []).filter((item) => onlineSurveyProviderSlugs.has(item.partnerSlug));
  const surveyItems = useMemo(
    () => allSurveyItems.filter((item) => !dismissedSurveyIds.includes(item.id)),
    [allSurveyItems, dismissedSurveyIds]
  );
  const displayedSurveyItems = surveyItems;
  const recommendations = surveyItems.slice(0, 2);
  const surveyGridClass = 'grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  const hasActiveSurvey = Boolean(activeSurvey?.recordId);

  const refreshSurveyWall = useCallback(() => setWallRefreshKey((value) => value + 1), []);

  const rememberDismissedSurvey = useCallback((surveyId) => {
    if (!surveyId) return;
    setDismissedSurveyIds((current) => {
      const next = [...new Set([...current, surveyId])].slice(-100);
      if (user?.id) writeStoredValue(`${dismissedSurveyStoragePrefix}:${user.id}`, next);
      return next;
    });
  }, [user?.id]);

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
        const refreshedWall = await getSurveyWall({ forceRefresh: true });
        const refreshedSection = (refreshedWall.data.sections || []).find((section) => section.id === 'surveys');
        refreshedRecommendations = (refreshedSection?.items || [])
          .filter((item) => item.id !== activeSurvey.itemId && !dismissedSurveyIds.includes(item.id))
          .slice(0, 2);
      } catch {}

      setResultRecommendations(refreshedRecommendations);
      setResultNotice(resultNoticeFor(outcome));
      rememberDismissedSurvey(activeSurvey.itemId);
      setActiveSurvey(null);
      removeStoredValue(activeSurveyStorageKey(user?.id));
      refreshSurveyWall();
      await refreshUserWallet();
    } catch (caughtError) {
      if (caughtError.response?.status === 404) {
        setActiveSurvey(null);
        removeStoredValue(activeSurveyStorageKey(user?.id));
        refreshSurveyWall();
      }
    }
  };

  useEffect(() => {
    if (!user?.id) {
      setActiveSurvey(null);
      setDismissedSurveyIds([]);
      return;
    }

    const storedActiveSurvey = readStoredValue(activeSurveyStorageKey(user.id), null);
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
      if (document.visibilityState === 'visible') {
        refreshSurveyWall();
        void checkActiveSurvey();
      }
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
        opportunityId: item.opportunityId,
        partnerId: item.partnerSlug || item.partnerId,
        linkType: 'direct',
      });
      const redirectUrl = response.data.redirectUrl;
      const recordId = response.data.record?.id;
      const isEntry = item.kind === 'entry';
      if (!redirectUrl || (!recordId && !isEntry)) throw new Error('No survey is available right now.');

      surveyWindow.opener = null;
      surveyWindow.location.replace(redirectUrl);
      if (isEntry) return;

      const nextActiveSurvey = { recordId, itemId: item.id };
      setActiveSurvey(nextActiveSurvey);
      writeStoredValue(activeSurveyStorageKey(user.id), nextActiveSurvey);
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
      <PageHeader
        title="Online surveys"
        description="Choose an available online survey. It opens in a new tab while your GuanyiSearch task centre stays here."
        action={
          moreSurveyEntry && (
            <button
              className="action-injection inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#1f4a30] px-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#153c26] disabled:cursor-not-allowed disabled:opacity-60"
              type="button"
              disabled={!isPanelist || startingId === moreSurveyEntry.id}
              onClick={() => handleStart(moreSurveyEntry)}
            >
              {startingId === moreSurveyEntry.id ? <RefreshCcw className="animate-spin" size={16} /> : <Compass size={16} />}
              More surveys <ArrowRight size={16} />
            </button>
          )
        }
      />

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
          </>
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
