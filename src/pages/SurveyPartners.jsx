import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { apiClient } from '../api/client';
import { useAuth } from '../components/AuthContext';
import PageHeader from '../components/PageHeader';

export default function SurveyPartners() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const partners = [
    {
      id: 'cpx-research',
      name: 'CPX Research',
      slug: 'cpx-research',
      description: 'Premium surveys with high conversion rates.',
      channelLetter: 'C',
      activeSurveys: '50+',
      conversion: 'Very High'
    },
    {
      id: 'theoremreach',
      name: 'TheoremReach',
      slug: 'theoremreach',
      description: 'Wide range of surveys from global brands.',
      channelLetter: 'T',
      activeSurveys: '30+',
      conversion: 'High'
    }
  ];

  const handleStartRouter = async (partnerId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.post('/api/survey/start', {
        partnerId,
        userId: user?.id
      });

      if (response.data.success && response.data.redirectUrl) {
        // 强制跳转，无 fallback
        window.location.href = response.data.redirectUrl;
      } else {
        throw new Error(response.data.message || 'Failed to get survey link');
      }
    } catch (err) {
      console.error('Router error:', err);
      setError(err.message || 'System is currently busy. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader title="Survey Partners" description="Select a partner to start your survey journey. All surveys are routed through our secure system." />
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium">
          {error}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {partners.map((partner) => (
          <section key={partner.id} className="card p-5 border border-slate-200 hover:border-green-300 transition-all">
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-green-100 bg-green-50 text-lg font-bold text-green-700">
                {partner.channelLetter}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-950">{partner.name}</h2>
                <p className="text-sm text-slate-500">{partner.activeSurveys} active surveys</p>
              </div>
            </div>
            
            <p className="mb-5 text-sm text-slate-600">
              {partner.description}
            </p>

            <div className="mb-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
              Current conversion rate <span className="font-bold text-slate-950">{partner.conversion}</span>
            </div>

            <button 
              className="btn-primary w-full flex items-center justify-center gap-2" 
              type="button"
              onClick={() => handleStartRouter(partner.slug)}
              disabled={loading}
            >
              {loading ? 'Routing...' : 'Start Surveys'}
              <ArrowRight size={16} />
            </button>
          </section>
        ))}
      </div>

      <div className="mt-10 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-2 uppercase tracking-wider">System Notice</h3>
        <p className="text-sm text-slate-500 leading-relaxed">
          Our system automatically selects the highest-paying and most relevant surveys for you. 
          Direct links and third-party iframes are disabled to ensure secure data tracking and guaranteed payouts.
        </p>
      </div>
    </>
  );
}
