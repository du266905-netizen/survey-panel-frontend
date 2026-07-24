import { ArrowRight, ClipboardCheck, Settings2, UsersRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function TrafficConsole() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Advanced Maintenance"
        description="Daily member operations have been moved to focused pages. This area intentionally does not expose task routing, manual outcomes, or sensitive runtime configuration."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Link className="card block p-6 transition hover:-translate-y-0.5 hover:shadow-md" to="/workers">
          <div className="flex items-start justify-between gap-4">
            <div>
              <UsersRound className="text-cyan-600" size={24} />
              <h2 className="mt-4 text-lg font-bold text-slate-950">Orbit Operations</h2>
              <p className="mt-2 text-sm text-slate-500">Check readiness, manage member devices, and bind work environments.</p>
            </div>
            <ArrowRight className="text-slate-400" size={20} />
          </div>
        </Link>
        <Link className="card block p-6 transition hover:-translate-y-0.5 hover:shadow-md" to="/orbit/settlement">
          <div className="flex items-start justify-between gap-4">
            <div>
              <ClipboardCheck className="text-violet-600" size={24} />
              <h2 className="mt-4 text-lg font-bold text-slate-950">Settlement Review</h2>
              <p className="mt-2 text-sm text-slate-500">Review controlled evidence states without changing task results or balances.</p>
            </div>
            <ArrowRight className="text-slate-400" size={20} />
          </div>
        </Link>
      </div>

      <section className="card p-6">
        <Settings2 className="text-slate-500" size={22} />
        <h2 className="mt-4 text-lg font-bold text-slate-950">Maintenance boundary</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Browser setup, source configuration, task imports, and technical diagnostics remain restricted maintenance work. They are not part of the standard internal-member workflow.
        </p>
      </section>
    </div>
  );
}
