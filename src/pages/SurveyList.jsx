import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Play } from 'lucide-react';
import { getSurveysByPartner } from '../api/mockApi';
import DataTable from '../components/DataTable';
import PageHeader from '../components/PageHeader';
import ProxyActivationModal from '../components/ProxyActivationModal';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatMoney } from '../utils/formatters';

export default function SurveyList() {
  const { partnerId } = useParams();
  const { data, loading } = useAsyncData(() => getSurveysByPartner(partnerId), [partnerId]);
  const surveys = data || [];
  const [search, setSearch] = useState('');
  const [country, setCountry] = useState('All');
  const [activeSurvey, setActiveSurvey] = useState(null);

  const countries = useMemo(() => ['All', ...new Set(surveys.map((survey) => survey.country))], [surveys]);
  const filteredSurveys = surveys.filter((survey) => {
    const matchesSearch = `${survey.surveyId} ${survey.surveyName} ${survey.pid}`.toLowerCase().includes(search.toLowerCase());
    const matchesCountry = country === 'All' || survey.country === country;
    return matchesSearch && matchesCountry;
  });

  const columns = [
    { key: 'pid', header: 'PID' },
    { key: 'surveyId', header: 'Survey ID' },
    { key: 'surveyName', header: 'Survey Name' },
    { key: 'country', header: 'Country' },
    { key: 'loi', header: 'LOI', render: (row) => `${row.loi} min` },
    { key: 'ir', header: 'IR %', render: (row) => `${row.ir}%` },
    { key: 'clicks', header: 'Clicks' },
    { key: 'completes', header: 'Completes' },
    { key: 'quota', header: 'Quota' },
    { key: 'reward', header: 'Reward', render: (row) => formatMoney(row.reward) },
    {
      key: 'start',
      header: 'Start',
      render: (row) => (
        <button className="btn-primary px-3 py-2" type="button" onClick={() => setActiveSurvey(row)}>
          <Play size={14} />
          Start
        </button>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Survey List" description="Filter surveys and start proxy activation for a selected offer." />
      <section className="card mb-5 grid gap-4 p-4 md:grid-cols-[1fr_220px]">
        <input
          className="field"
          placeholder="Search PID, survey ID, or survey name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select className="field" value={country} onChange={(event) => setCountry(event.target.value)}>
          {countries.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </section>
      <DataTable columns={columns} rows={filteredSurveys} loading={loading} emptyMessage="No surveys match your filters." />
      <ProxyActivationModal survey={activeSurvey} onClose={() => setActiveSurvey(null)} />
    </>
  );
}
