import PageHeader from '../components/PageHeader';

export default function Settings() {
  return (
    <>
      <PageHeader title="Settings" description="Operational preferences for survey launching." />
      <section className="card max-w-2xl p-5">
        <div className="space-y-4">
          <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
            <span>
              <span className="block text-sm font-bold text-slate-950">Auto validate proxy format</span>
              <span className="text-sm text-slate-500">Check host, port, user, and password before launch.</span>
            </span>
            <input className="h-5 w-5 accent-primary" type="checkbox" defaultChecked />
          </label>
          <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
            <span>
              <span className="block text-sm font-bold text-slate-950">Show only available quota</span>
              <span className="text-sm text-slate-500">Hide surveys once quotas have been filled.</span>
            </span>
            <input className="h-5 w-5 accent-primary" type="checkbox" defaultChecked />
          </label>
        </div>
      </section>
    </>
  );
}
