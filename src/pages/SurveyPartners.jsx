import { ArrowRight, Clock, Coins, Star } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getPartners } from '../api/mockApi';
import { useAuth } from '../components/AuthContext';
import PageHeader from '../components/PageHeader';
import { useAsyncData } from '../hooks/useAsyncData';
import { isAdminRole } from '../utils/roles';
import { apiClient } from '../api/client';

export default function SurveyPartners() {
  const { user } = useAuth();
  const { data, loading } = useAsyncData(getPartners, []);
  const [showTheoremReach, setShowTheoremReach] = useState(false);
  const [showCPX, setShowCPX] = useState(false);
  const [cpxSurveys, setCpxSurveys] = useState([]);
  const [loadingCpx, setLoadingCpx] = useState(false);
  
  const partners = data || [];
  const isAdmin = isAdminRole(user?.role);

  const fetchCpxSurveys = async () => {
    setLoadingCpx(true);
    try {
      const response = await apiClient.get('/api/cpx/surveys');
      setCpxSurveys(response.data.surveys || []);
      setShowCPX(true);
    } catch (error) {
      console.error('Failed to fetch CPX surveys:', error);
      alert('Failed to load surveys. Please try again later.');
    } finally {
      setLoadingCpx(false);
    }
  };

  const handleStartSurvey = async (survey) => {
    try {
      const response = await apiClient.post('/api/survey/start', {
        surveyId: survey.id,
        partnerId: 'cpx-research',
        cpi: survey.payout_publisher_usd || 0,
        redirectUrl: survey.href,
        country: null, // Targeting not provided by CPX API in simple call
        targeting: null
      });

      if (response.data.success) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error('Failed to start survey:', error);
      // Fallback: direct jump if API fails
      window.location.href = survey.href;
    }
  };

  return (
    <>
      <PageHeader title="Survey Partners" description="Choose a partner platform to browse available surveys." />
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-48 animate-pulse rounded-lg bg-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {partners.map((partner) => (
            <section key={partner.id} className="card p-5">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-green-100 bg-green-50 text-lg font-bold text-green-700">
                  {isAdmin ? partner.name.slice(0, 2) : partner.channelLetter}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{isAdmin ? partner.name : (partner.codeName || `Channel ${partner.channelLetter}`)}</h2>
                  <p className="text-sm text-slate-500">{partner.activeSurveys} active surveys</p>
                </div>
              </div>
              <div className="mb-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                Current conversion rate <span className="font-bold text-slate-950">{partner.conversion}</span>
              </div>
              {partner.slug === 'theoremreach' ? (
                <button 
                  className="btn-primary w-full" 
                  type="button"
                  onClick={() => setShowTheoremReach(true)}
                >
                  Start Surveys
                  <ArrowRight size={16} />
                </button>
              ) : partner.slug === 'cpx-research' ? (
                <button 
                  className="btn-primary w-full" 
                  type="button"
                  onClick={fetchCpxSurveys}
                  disabled={loadingCpx}
                >
                  {loadingCpx ? 'Loading...' : 'Start Surveys'}
                  <ArrowRight size={16} />
                </button>
              ) : (
                <Link className="btn-primary w-full" to={`/partners/${partner.id}/surveys`}>
                  View Surveys
                  <ArrowRight size={16} />
                </Link>
              )}
            </section>
          ))}
        </div>
      )}

      {/* TheoremReach Modal */}
      {showTheoremReach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-2xl h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            <button 
              className="absolute top-3 right-3 z-10 text-slate-500 hover:text-slate-900"
              onClick={() => setShowTheoremReach(false)}
            >
              ✕
            </button>
            <iframe
              src={`https://theoremreach.com/respondent_entry/direct?api_key=6d98ed501f6be1cc271234146bdd&user_id=${user?.id}&transaction_id=${Date.now()}`}
              className="w-full h-full border-0"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
            />
          </div>
        </div>
      )}

      {/* CPX Surveys Modal */}
      {showCPX && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 border-b flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-900">CPX Research Surveys</h3>
                <p className="text-xs text-slate-500">Available surveys for you</p>
              </div>
              <button
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                onClick={() => setShowCPX(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 bg-slate-50/50">
              {cpxSurveys.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {cpxSurveys.map((survey, index) => (
                    <div key={index} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-green-300 transition-all group">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-1.5 text-green-600 bg-green-50 px-2 py-1 rounded-md">
                          <Coins size={14} className="font-bold" />
                          <span className="text-sm font-bold">{survey.payout} Coins</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-400 text-xs">
                          <Star size={12} className="fill-yellow-400 text-yellow-400" />
                          <span>{survey.conversion_rate}%</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 text-slate-600 mb-4">
                        <Clock size={14} />
                        <span className="text-sm">{survey.loi} minutes</span>
                      </div>
                      
                      <button
                        onClick={() => handleStartSurvey(survey)}
                        className="block w-full text-center py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors"
                      >
                        Start Survey
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-500">No surveys available at the moment.</p>
                </div>
              )}
            </div>
            
            <div className="p-3 border-t bg-white text-center">
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Powered by CPX Research</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
