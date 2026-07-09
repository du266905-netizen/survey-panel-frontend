import { AlertTriangle, ArrowRight, Clock3, RefreshCcw, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { getSurveyWall, startSurvey } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import PageHeader from '../components/PageHeader';
import ProxyActivationModal from '../components/ProxyActivationModal';
import { useAuth } from '../components/AuthContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { isAdminRole } from '../utils/roles';

function friendlyStartError(error) {
  const code = error.response?.data?.code || error.response?.data?.error;
  if (code === 'SURVEY_PARTNER_NOT_CPX' || code === 'CPX_SURVEY_NOT_FOUND' || code === 'CPX_API_NON_SUCCESS') {
    return 'No surveys available right now.';
  }
  return error.response?.data?.message || error.message || 'Unable to start this survey right now.';
}

export default function SurveyPartners() {
  const { user } = useAuth();
  const isAdmin = isAdminRole(user?.role);
  const { data, loading, error } = useAsyncData(getSurveyWall, []);
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [startingId, setStartingId] = useState('');
  const [startError, setStartError] = useState('');
  const surveys = data || [];
  const surveyGridClass = 'grid w-full gap-4 lg:grid-cols-2 2xl:grid-cols-3 [@media(min-width:2100px)]:grid-cols-4';

  const handleStart = async (survey) => {
    if (isAdmin) {
      setActiveSurvey(survey);
      return;
    }

    setStartingId(survey.id);
    setStartError('');
    try {
      const response = await startSurvey({
        surveyId: survey.surveyId || survey.id,
        linkType: 'direct',
      });
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
      <PageHeader title="Survey Wall" description="Choose an available survey. Coins are credited after partner validation." />

      {(error || startError) && (
        <div className="mb-5 flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          <AlertTriangle size={16} />
          {startError || 'No surveys available right now.'}
        </div>
      )}

      {loading ? (
        <div className={surveyGridClass}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-44 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      ) : !surveys.length ? (
        <div className="flex min-h-44 w-full items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-sm text-slate-500">
          No surveys available right now.
        </div>
      ) : (
        <div className={surveyGridClass}>
          {surveys.map((survey) => (
            <section
              key={survey.id}
              className="group overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-cyan-200 hover:shadow-md"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wide text-cyan-600">Earn</span>
                    <div className="mt-1 break-words text-2xl font-extrabold leading-tight text-cyan-600">
                      <CoinAmount value={survey.reward} />
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-1 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
                    <Clock3 size={14} />
                    {survey.loi || '-'} min
                  </span>
                </div>
              </div>

              <div className="px-5 py-4">
                <h2 className="text-lg font-bold text-slate-950">{survey.displayName}</h2>
                <div className="mt-3 flex min-w-0 flex-wrap items-center gap-2">
                  <span className="break-all text-sm font-semibold text-slate-400">{survey.publicSurveyCode}</span>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700">
                    <Sparkles size={13} />
                    Available
                  </span>
                </div>

                <button
                  className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
                  type="button"
                  disabled={startingId === survey.id}
                  onClick={() => handleStart(survey)}
                  aria-label={`Start ${survey.displayName}`}
                >
                  {startingId === survey.id ? <RefreshCcw className="animate-spin" size={18} /> : <ArrowRight size={18} />}
                  Start
                </button>
              </div>
            </section>
          ))}
        </div>
      )}

      {isAdmin && <ProxyActivationModal survey={activeSurvey} onClose={() => setActiveSurvey(null)} />}
    </>
  );
}
