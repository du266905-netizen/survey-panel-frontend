import { AlertTriangle, Clock3, Coins, Play, RefreshCcw } from 'lucide-react';
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
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-44 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      ) : !surveys.length ? (
        <div className="flex min-h-44 items-center justify-center rounded-lg border border-slate-200 bg-white p-8 text-sm text-slate-500">
          No surveys available right now.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {surveys.map((survey) => (
            <section key={survey.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{survey.displayName}</h2>
                  <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-1 rounded-lg bg-slate-50 px-2.5 py-1 font-semibold">
                      <Clock3 size={15} />
                      {survey.loi || '-'} min
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 font-semibold text-amber-800">
                      <Coins size={15} />
                      <CoinAmount value={survey.reward} />
                    </span>
                  </div>
                </div>
                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">Available</span>
              </div>
              <button className="btn-primary mt-5 w-full" type="button" disabled={startingId === survey.id} onClick={() => handleStart(survey)}>
                {startingId === survey.id ? <RefreshCcw className="animate-spin" size={16} /> : <Play size={16} />}
                Start
              </button>
            </section>
          ))}
        </div>
      )}

      {isAdmin && <ProxyActivationModal survey={activeSurvey} onClose={() => setActiveSurvey(null)} />}
    </>
  );
}
