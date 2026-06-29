import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  const [cpxData, setCpxData] = useState({ hash: '', userId: '' });
  const partners = data || [];
  const isAdmin = isAdminRole(user?.role);

  useEffect(() => {
    const fetchCpxHash = async () => {
      try {
        const response = await apiClient.get('/api/cpx/hash');
        setCpxData(response.data);
      } catch (error) {
        console.error('Failed to fetch CPX hash:', error);
      }
    };

    if (user) {
      fetchCpxHash();
    }
  }, [user]);

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
                  onClick={() => setShowCPX(true)}
                >
                  Start Surveys
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

      {showCPX && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-2xl h-[80vh] bg-white rounded-xl overflow-hidden shadow-2xl">
            <button
              className="absolute top-3 right-3 z-10 text-slate-500 hover:text-slate-900"
              onClick={() => setShowCPX(false)}
            >
              ✕
            </button>
            <iframe
              width="100%"
              frameBorder="0"
              height="100%"
              src={`https://offers.cpx-research.com/index.php?app_id=33724&ext_user_id=${cpxData.userId}&secure_hash=${cpxData.hash}`}
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation"
            />
          </div>
        </div>
      )}
    </>
  );
}
