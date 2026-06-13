import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../components/AuthContext';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');

  const fields = [
    ['Member ID', user?.id],
    ['Group', user?.group],
    ['Team', user?.team],
    ['Login IP', user?.loginIp],
    ['Login Region', user?.loginRegion],
    ['Email', user?.email],
  ];

  return (
    <>
      <PageHeader title="Profile" description="Member identity and account settings." />
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="card p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-950">Member Information</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {fields.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                <p className="mt-2 text-sm font-bold text-slate-950">{value}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="card p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-950">Settings</h2>
          <label className="space-y-2">
            <span className="text-sm font-semibold text-slate-700">Change Display Name</span>
            <input className="field" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          </label>
          <button className="btn-primary mt-4 w-full" type="button" onClick={() => setUser({ ...user, displayName, username: displayName })}>
            Change
          </button>
        </section>
      </div>
    </>
  );
}
