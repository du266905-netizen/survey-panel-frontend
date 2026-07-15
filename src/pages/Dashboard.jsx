import { CheckCircle2, Clock3, XCircle } from 'lucide-react';
import { getDashboard } from '../api/realApi';
import CoinAmount from '../components/CoinAmount';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { useAsyncData } from '../hooks/useAsyncData';

export default function Dashboard() {
  const { data } = useAsyncData(getDashboard, []);

  return (
    <>
      <PageHeader title="Dashboard" description="A concise view of your most recent survey activity." />
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Completed Offers"
          value={data?.stats.completedOffers ?? '-'}
          icon={CheckCircle2}
          helper="Approved conversions"
          className="border-l-4 border-l-cyan-500"
          iconClassName="bg-cyan-100 text-cyan-600"
        />
        <StatCard
          label="Pending Coins"
          value={<CoinAmount value={data?.stats.pendingEarnings} />}
          icon={Clock3}
          helper="Awaiting audit"
          className="border-l-4 border-l-blue-500"
          iconClassName="bg-blue-100 text-blue-600"
        />
        <StatCard
          label="Failed Coins"
          value={<CoinAmount value={data?.stats.failedEarnings} />}
          icon={XCircle}
          helper="Rejected or expired"
          className="border-l-4 border-l-red-500"
          iconClassName="bg-red-100 text-red-600"
        />
      </div>
    </>
  );
}
