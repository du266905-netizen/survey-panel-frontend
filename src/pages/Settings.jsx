import PageHeader from '../components/PageHeader';
import { useAuth } from '../components/AuthContext';
import { isAdminRole } from '../utils/roles';

export default function Settings() {
  const { user } = useAuth();
  const isAdmin = isAdminRole(user?.role);

  return (
    <>
      <PageHeader title="Settings" description="Operational preferences for survey launching." />
      <div className="grid max-w-5xl gap-6 xl:grid-cols-2">
        <section className="card p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-950">Launch Controls</h2>
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

        {isAdmin && (
          <section className="card p-5">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Partner Management</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
                <span>
                  <span className="block text-sm font-bold text-slate-950">Show real partner identities</span>
                  <span className="text-sm text-slate-500">Admins can audit named supply channels and logos.</span>
                </span>
                <input className="h-5 w-5 accent-primary" type="checkbox" defaultChecked />
              </label>
              <label className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
                <span>
                  <span className="block text-sm font-bold text-slate-950">Enable partner sync</span>
                  <span className="text-sm text-slate-500">Pull latest surveys from active partner APIs.</span>
                </span>
                <input className="h-5 w-5 accent-primary" type="checkbox" defaultChecked />
              </label>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
