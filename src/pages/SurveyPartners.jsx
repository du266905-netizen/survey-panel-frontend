import { ArrowRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPartners } from '../api/realApi';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../components/AuthContext';
import { useAsyncData } from '../hooks/useAsyncData';
import { isAdminRole } from '../utils/roles';

const descriptions = {
  gwss: 'Global survey network.',
  'za-survey': 'Asia Pacific research.',
  wwi: 'B2B professional surveys.',
  opx: 'Opinion exchange platform.',
  mr: 'Market research hub.',
  bitlabs: 'European survey specialists.',
  'cpx-research': 'Performance survey network.',
  theoremreach: 'Performance survey network.',
};

const headerStrips = ['#16a34a', '#059669', '#0d9488', '#0891b2', '#2563eb', '#14b8a6', '#22c55e'];

export default function SurveyPartners() {
  const { user } = useAuth();
  const isAdmin = isAdminRole(user?.role);
  const { data, loading } = useAsyncData(getPartners, []);
  const [search, setSearch] = useState('');
  const partners = data || [];
  const filteredPartners = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return partners;

    return partners.filter((partner) => {
      const visibleName = partner.name || '';
      const codeName = partner.codeName || '';
      const adminName = isAdmin ? partner.displayName || '' : '';
      return [visibleName, codeName, adminName].some((value) => value.toLowerCase().includes(query));
    });
  }, [partners, search, isAdmin]);

  return (
    <>
      <PageHeader title="Survey Partners" description={isAdmin ? 'Manage named partner channels and live supply.' : 'Choose an available survey channel.'} />
      <section className="card mb-5 p-4">
        <label className="block">
          <span className="sr-only">Search partners</span>
          <input
            className="field focus:border-green-500 focus:ring-2 focus:ring-green-100"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search partner or channel code"
          />
        </label>
      </section>
      {loading ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-56 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : !filteredPartners.length ? (
        <div className="card flex min-h-44 items-center justify-center p-8 text-sm text-slate-500">No survey partners found.</div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredPartners.map((partner, index) => (
            <section key={partner.id} className="card interactive-card cursor-pointer overflow-hidden p-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
              <div className="h-1.5" style={{ backgroundColor: headerStrips[index % headerStrips.length] }} />
              <div className="p-6">
              <div className="mb-5 flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-xl text-lg font-bold text-white shadow-sm"
                  style={{ backgroundColor: isAdmin ? headerStrips[index % headerStrips.length] : partner.channelColor }}
                >
                  {isAdmin ? partner.displayName.slice(0, 2) : partner.channelLetter}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950">
                    {isAdmin ? partner.name : (partner.codeName || partner.channelLetter)}
                  </h2>
                  <p className="text-sm text-slate-500">
                    {isAdmin ? descriptions[partner.slug] || 'Specialized survey supply.' : 'Independent research channel.'}
                  </p>
                </div>
              </div>
              <p className="mb-5 text-sm font-medium text-slate-500">{partner.activeSurveys} active surveys</p>
              <div className="mb-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                Channel status <span className="font-bold text-slate-950">{partner.conversion}</span>
              </div>
              {partner.isSynthetic ? (
                <button className="btn-secondary w-full" type="button" disabled>
                  No Surveys
                </button>
              ) : partner.slug === 'theoremreach' ? (
                <button
                  className="btn-secondary w-full rounded-xl"
                  type="button"
                  disabled
                  title="Backend API missing for Theorem Reach launch."
                >
                  Backend API Missing
                </button>
              ) : (
                <Link className="btn-primary w-full rounded-xl" to={`/partners/${partner.id}/surveys`}>
                  View Surveys
                  <ArrowRight size={16} />
                </Link>
              )}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
