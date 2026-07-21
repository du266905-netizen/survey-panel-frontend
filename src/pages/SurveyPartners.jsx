import { AlertTriangle, ArrowRight, Clock3, RefreshCcw, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getSurveyWall, startSurvey } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../components/AuthContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { isPanelistRole } from '../utils/roles';

function friendlyStartError(error) {
  if (error.response?.status === 503) {
    return 'No surveys available right now.';
  }

  if (error.response) {
    return 'Unable to open this survey. Please choose another opportunity or try again shortly.';
  }

  return 'Unable to open this survey. Please try again.';
}

const publicSurveySections = [
  {
    id: 'surveys',
    title: 'Surveys',
    subtitle: 'Choose from currently available surveys.',
    items: [],
  },
  {
    id: 'more-opportunities',
    title: 'More Survey Opportunities',
    subtitle: 'Explore additional survey opportunities and earn rewards when you complete them.',
    items: [
      {
        id: 'more-surveys',
        kind: 'entry',
        title: 'Explore more surveys',
        description: 'Browse additional survey opportunities and earn rewards for completed activities.',
        ctaLabel: 'Explore',
      },
    ],
  },
];

function SurveyCard({ item, isPanelist, isStarting, onStart }) {
  return (
    <section className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 bg-slate-50 px-4 py-3">
        <div className="min-w-0">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-700">Earn</span>
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
          disabled={!isPanelist || isStarting}
          onClick={onStart}
          aria-label={isPanelist ? `Start ${item.displayName}` : `Preview ${item.displayName}`}
        >
          {isPanelist && (isStarting ? <RefreshCcw className="animate-spin" size={16} /> : <ArrowRight size={16} />)}
          {isPanelist ? 'Start survey' : 'Preview only'}
        </button>
      </div>
    </section>
  );
}

function OpportunityCard({ item, user, isPanelist, isStarting, onStart }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-700">Explore</span>
      <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-950">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
      {!user ? (
        <Link className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-bold text-white transition hover:bg-cyan-600" to="/login">
          Sign in to explore <ArrowRight size={16} />
        </Link>
      ) : (
        <button
          className="mt-5 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          disabled={!isPanelist || isStarting}
          onClick={onStart}
          aria-label={isPanelist ? item.ctaLabel : `Preview ${item.title}`}
        >
          {isPanelist && (isStarting ? <RefreshCcw className="animate-spin" size={16} /> : <ArrowRight size={16} />)}
          {isPanelist ? item.ctaLabel : 'Preview only'}
        </button>
      )}
    </section>
  );
}

export default function SurveyPartners() {
  const { user } = useAuth();
  const location = useLocation();
  const isPanelist = isPanelistRole(user?.role);
  const loadSurveyWall = user ? getSurveyWall : () => Promise.resolve({ data: { sections: publicSurveySections } });
  const { data, loading, error } = useAsyncData(loadSurveyWall, [user?.id || 'guest']);
  const [startingId, setStartingId] = useState('');
  const [startError, setStartError] = useState('');
  const [showAllSurveys, setShowAllSurveys] = useState(false);
  const sections = data?.sections || publicSurveySections;
  const surveySection = sections.find((section) => section.id === 'surveys') || publicSurveySections[0];
  const opportunitySection = sections.find((section) => section.id === 'more-opportunities') || publicSurveySections[1];
  const additionalSections = sections.filter((section) => !['surveys', 'more-opportunities'].includes(section.id));
  const surveyItems = surveySection.items || [];
  const displayedSurveyItems = showAllSurveys ? surveyItems : surveyItems.slice(0, 6);
  const hiddenSurveyCount = Math.max(0, surveyItems.length - displayedSurveyItems.length);
  const surveyGridClass = 'grid w-full gap-3 sm:grid-cols-2 2xl:grid-cols-3';

  useEffect(() => {
    const targetId = location.hash.slice(1);
    if (!targetId) return undefined;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash]);

  const handleStart = async (item) => {
    setStartingId(item.id);
    setStartError('');
    try {
      const response = await startSurvey(
        item.kind === 'entry'
          ? { opportunityId: item.opportunityId, linkType: 'direct' }
          : { surveyId: item.surveyId || item.id, partnerId: item.partnerSlug || item.partnerId, linkType: 'direct' }
      );
      const redirectUrl = response.data.redirectUrl;
      if (!redirectUrl) throw new Error('No surveys available right now.');
      window.location.assign(redirectUrl);
    } catch (caughtError) {
      setStartError(friendlyStartError(caughtError));
    } finally {
      setStartingId('');
    }
  };

  return (
    <>
      <PageHeader title="Survey Wall" description="Choose an available survey. Coins are credited after completion is confirmed." />

      {(error || startError) && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          <AlertTriangle size={16} />
          {startError || 'No surveys available right now.'}
        </div>
      )}

      <div className="grid items-start gap-8 2xl:grid-cols-[minmax(0,1fr)_minmax(290px,340px)]">
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
              <span>{user ? 'No surveys are available right now. Check back soon.' : 'Sign in to view surveys matched for you.'}</span>
              {!user && <Link className="shrink-0 font-bold text-cyan-700 hover:text-cyan-600" to="/login">Sign in</Link>}
            </div>
          ) : (
            <>
              <div className={surveyGridClass}>
                {displayedSurveyItems.map((item) => <SurveyCard key={item.id} item={item} isPanelist={isPanelist} isStarting={startingId === item.id} onStart={() => handleStart(item)} />)}
              </div>
              {hiddenSurveyCount > 0 && (
                <button className="mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50" type="button" onClick={() => setShowAllSurveys(true)}>
                  View {hiddenSurveyCount} more surveys
                </button>
              )}
            </>
          )}
        </section>

        <aside id={opportunitySection.id} className="scroll-mt-28 2xl:sticky 2xl:top-8">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">{opportunitySection.title}</h2>
            {opportunitySection.subtitle && <p className="mt-1.5 text-sm leading-6 text-slate-500">{opportunitySection.subtitle}</p>}
          </div>
          <div className="mt-4 space-y-3">
            {(opportunitySection.items || []).map((item) => <OpportunityCard key={item.id} item={item} user={user} isPanelist={isPanelist} isStarting={startingId === item.id} onStart={() => handleStart(item)} />)}
          </div>
        </aside>
      </div>

      {additionalSections.length > 0 && (
        <div className="mt-10 space-y-8">
          {additionalSections.map((section) => (
            <section id={section.id} key={section.id} className="scroll-mt-28 border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">{section.title}</h2>
              {section.subtitle && <p className="mt-1.5 text-sm leading-6 text-slate-500">{section.subtitle}</p>}
            </section>
          ))}
        </div>
      )}
    </>
  );
}
