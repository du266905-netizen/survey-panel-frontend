export function ConnectionLineArt({ className = '' }) {
  return (
    <svg className={`research-line-art ${className}`} viewBox="0 0 720 440" fill="none" aria-hidden="true">
      <path className="research-line-art-path" d="M-10 128C106 42 180 48 240 146c39 64 58 69 108 13 63-72 104-79 158-14 47 57 72 92 126 9 26-40 62-70 114-60" />
      <path className="research-line-art-path research-line-art-path--soft" d="M128 205c49-13 80 4 102 49 23 46 40 52 68 16 31-41 67-22 56 23-11 46 48 91 90 68" />
      <g className="research-line-art-hand">
        <path d="M280 207c12-13 30-19 48-15l50 13 40 41-14 35-32-16-17 31-20-12-15 25-21-13-10 20-34-20-8-68 33-21Z" />
        <path d="m378 205 33 16 21 37m-60 7 12 9m-49 0 13 10m-35 0 12 10" />
      </g>
      <circle className="research-line-art-node" cx="242" cy="146" r="8" />
      <circle className="research-line-art-node research-line-art-node--soft" cx="506" cy="145" r="7" />
      <path className="research-line-art-spark" d="m584 76 5 12 12 5-12 5-5 12-5-12-12-5 12-5 5-12Z" />
      <path className="research-line-art-spark research-line-art-spark--small" d="m156 84 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" />
    </svg>
  );
}

export function VerificationLineArt({ className = '' }) {
  return (
    <svg className={`research-verification-art ${className}`} viewBox="0 0 300 250" fill="none" aria-hidden="true">
      <rect x="82" y="30" width="132" height="180" rx="22" />
      <path d="M118 73h58M118 98h45M118 123h54" />
      <circle className="research-verification-art-accent" cx="151" cy="160" r="29" />
      <path d="m137 160 10 10 19-23" />
      <path className="research-verification-art-frame" d="M42 67V39h28M258 67V39h-28M42 183v28h28M258 183v28h-28" />
      <path className="research-verification-art-spark" d="m67 112 4 10 10 4-10 4-4 10-4-10-10-4 10-4 4-10Z" />
    </svg>
  );
}

export function ResearchBriefArt({ className = '' }) {
  return (
    <svg className={`research-brief-art ${className}`} viewBox="0 0 520 420" fill="none" aria-hidden="true">
      <path className="research-brief-art-orbit" d="M68 108C123 27 248 31 308 105c49 61 109 67 162 8" />
      <rect className="research-brief-art-paper" x="132" y="74" width="235" height="272" rx="18" />
      <rect x="170" y="114" width="75" height="14" rx="7" />
      <path d="M170 161h147M170 196h112M170 231h126" />
      <rect className="research-brief-art-check" x="169" y="260" width="28" height="28" rx="7" />
      <path d="m176 274 7 7 13-15" />
      <path d="M215 274h96" />
      <circle className="research-brief-art-node" cx="338" cy="89" r="18" />
      <path d="m330 89 6 6 11-13" />
      <path className="research-brief-art-spark" d="m91 244 5 12 12 5-12 5-5 12-5-12-12-5 12-5 5-12Z" />
      <path className="research-brief-art-spark research-brief-art-spark--small" d="m420 210 3 8 8 3-8 3-3 8-3-8-8-3 8-3 3-8Z" />
      <circle className="research-brief-art-dot" cx="406" cy="295" r="7" />
    </svg>
  );
}
