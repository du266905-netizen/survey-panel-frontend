import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getPartners } from '../api/mockApi';
import PageHeader from '../components/PageHeader';
import { useAsyncData } from '../hooks/useAsyncData';

export default function SurveyPartners() {
  const { data, loading } = useAsyncData(getPartners, []);
  const partners = data || [];

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
                  {partner.name.slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-950">{partner.name}</h2>
                  <p className="text-sm text-slate-500">{partner.activeSurveys} active surveys</p>
                </div>
              </div>
              <div className="mb-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">
                Current conversion rate <span className="font-bold text-slate-950">{partner.conversion}</span>
              </div>
              <Link className="btn-primary w-full" to={`/partners/${partner.id}/surveys`}>
                View Surveys
                <ArrowRight size={16} />
              </Link>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
