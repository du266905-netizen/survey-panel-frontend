export default function StatCard({ label, value, helper, icon: Icon }) {
  return (
    <section className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
          {helper && <p className="mt-2 text-xs text-slate-500">{helper}</p>}
        </div>
        {Icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-green-600">
            <Icon size={20} />
          </div>
        )}
      </div>
    </section>
  );
}
