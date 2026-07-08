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
        <div className="max-w-3xl space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-24 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      ) : !surveys.length ? (
        <div className="flex min-h-44 max-w-3xl items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-sm text-slate-500">
          No surveys available right now.
        </div>
      ) : (
        <div className="max-w-3xl space-y-3">
          {surveys.map((survey) => (
            <section
              key={survey.id}
              className="group grid grid-cols-[9.5rem_1fr_auto] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md max-sm:grid-cols-1"
            >
              <div className="flex flex-col justify-center bg-slate-50 px-5 py-4 max-sm:border-b max-sm:border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wide text-blue-600">Earn</span>
                <span className="mt-1 text-2xl font-extrabold text-blue-600">
                  <CoinAmount value={survey.reward} />
                </span>
              </div>

              <div className="flex min-w-0 flex-col justify-center px-5 py-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-base font-bold text-slate-950">{survey.displayName}</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                    <Clock3 size={14} />
                    {survey.loi || '-'} min
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="text-sm font-semibold text-slate-400">{survey.publicSurveyCode}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700">
                    <Sparkles size={13} />
                    Available
                  </span>
                </div>
              </div>

              <button
                className="flex w-20 items-center justify-center border-l border-slate-100 text-slate-400 transition hover:bg-slate-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-60 max-sm:h-12 max-sm:w-full max-sm:border-l-0 max-sm:border-t"
                type="button"
                disabled={startingId === survey.id}
                onClick={() => handleStart(survey)}
                aria-label={`Start ${survey.displayName}`}
              >
                {startingId === survey.id ? <RefreshCcw className="animate-spin" size={20} /> : <ArrowRight size={24} />}
              </button>
            </section>
          ))}
        </div>
      )}

      {isAdmin && <ProxyActivationModal survey={activeSurvey} onClose={() => setActiveSurvey(null)} />}
    </>
  );
}
