import { AlertTriangle, ArrowRight, Clock3, RefreshCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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

export default function SurveyPartners() {
  const { user } = useAuth();
  const isPanelist = isPanelistRole(user?.role);
  const loadSurveyWall = user ? getSurveyWall : () => Promise.resolve({ data: { sections: publicSurveySections } });
  const { data, loading, error } = useAsyncData(loadSurveyWall, [user?.id || 'guest']);
  const [startingId, setStartingId] = useState('');
  const [startError, setStartError] = useState('');
  const sections = data?.sections || publicSurveySections;
  const surveyGridClass = 'grid w-full gap-4 lg:grid-cols-2 2xl:grid-cols-3 [@media(min-width:2100px)]:grid-cols-4';

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

      <div className="space-y-12">
        {sections.map((section, sectionIndex) => (
          <section key={section.id} className={sectionIndex ? 'border-t border-slate-200 pt-10' : ''}>
            <div className="mb-5 max-w-2xl">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">{section.title}</h2>
              {section.subtitle && <p className="mt-2 text-sm leading-6 text-slate-500">{section.subtitle}</p>}
            </div>

            {loading && user && section.id === 'surveys' ? (
              <div className={surveyGridClass}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="h-44 animate-pulse rounded-lg bg-slate-100" />
                ))}
              </div>
            ) : !section.items?.length ? (
              <div className="flex min-h-40 w-full items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                {user ? 'No surveys are available right now. Check back soon.' : <Link className="font-bold text-cyan-700 hover:text-cyan-600" to="/login">Sign in to view surveys matched for you.</Link>}
              </div>
            ) : (
              <div className={surveyGridClass}>
                {section.items.map((item) =>
                  item.kind === 'entry' ? (
                    <section key={item.id} className="group flex min-h-44 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wide text-cyan-600">Explore</span>
                        <h3 className="mt-2 text-xl font-bold text-slate-950">{item.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                      </div>
                      {!user ? (
                        <Link className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-cyan-600" to="/login">
                          Sign in to explore <ArrowRight size={18} />
                        </Link>
                      ) : (
                        <button
                          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                          type="button"
                          disabled={!isPanelist || startingId === item.id}
                          onClick={() => handleStart(item)}
                          aria-label={isPanelist ? item.ctaLabel : `Preview ${item.title}`}
                        >
                          {isPanelist && (startingId === item.id ? <RefreshCcw className="animate-spin" size={18} /> : <ArrowRight size={18} />)}
                          {isPanelist ? item.ctaLabel : 'Preview only'}
                        </button>
                      )}
                    </section>
                  ) : (
                    <section
                      key={item.id}
                      className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md"
                    >
                      <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <span className="text-xs font-bold uppercase tracking-wide text-cyan-600">Earn</span>
                            <div className="mt-1 break-words text-2xl font-extrabold leading-tight text-cyan-600">
                              <CoinAmount value={item.reward} />
                            </div>
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                            <Clock3 size={14} />
                            {item.loi || '-'} min
                          </span>
                        </div>
                      </div>

                      <div className="px-5 py-4">
                        <h3 className="text-lg font-bold text-slate-950">{item.displayName}</h3>
                        <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
                          <span className="break-all text-sm font-semibold text-slate-400">{item.publicSurveyCode}</span>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700">
                            <Sparkles size={13} />
                            Available
                          </span>
                        </div>

                        <button
                          className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                          type="button"
                          disabled={!isPanelist || startingId === item.id}
                          onClick={() => handleStart(item)}
                          aria-label={isPanelist ? `Start ${item.displayName}` : `Preview ${item.displayName}`}
                        >
                          {isPanelist && (startingId === item.id ? <RefreshCcw className="animate-spin" size={18} /> : <ArrowRight size={18} />)}
                          {isPanelist ? 'Start' : 'Preview only'}
                        </button>
                      </div>
                    </section>
                  )
                )}
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
