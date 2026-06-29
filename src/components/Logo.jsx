export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { box: 'w-6 h-6', font: 'text-sm' },
    md: { box: 'w-8 h-8', font: 'text-lg' },
    lg: { box: 'w-10 h-10', font: 'text-2xl' },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2">
      <div className={`${s.box} rounded-lg bg-green-600 flex items-center justify-center shadow-sm`}>
        <span className="text-white font-bold text-sm">G</span>
      </div>
      <span className={`font-bold text-slate-800 ${s.font} tracking-tight`}>
        Guanyi<span className="text-green-600">Search</span>
      </span>
    </div>
  );
}
