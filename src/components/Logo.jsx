export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: { box: 24, font: 'text-sm' },
    md: { box: 32, font: 'text-lg' },
    lg: { box: 40, font: 'text-2xl' },
  };
  const s = sizes[size];
  return (
    <div className="flex items-center gap-2">
      <div
        style={{ width: s.box, height: s.box }}
        className="rounded-lg bg-green-600 flex items-center justify-center shadow-sm"
      >
        <svg width={s.box * 0.55} height={s.box * 0.55} viewBox="0 0 18 18" fill="none">
          <path d="M2 13 L5.5 8 L8.5 10.5 L12 5 L16 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="16" cy="9" r="1.5" fill="white"/>
        </svg>
      </div>
      <span className={`font-bold text-slate-800 ${s.font} tracking-tight`}>
        Guanyi<span className="text-green-600">Media</span>
      </span>
    </div>
  );
}
