export default function Logo({ size = 'md', variant = 'dark', tone = 'ink', className = '' }) {
  const sizes = {
    sm: { width: 142, height: 22 },
    md: { width: 178, height: 27 },
    lg: { width: 226, height: 35 },
  };
  const s = sizes[size];
  const isBrand = tone === 'brand';

  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap: `${Math.round(s.height * 0.34)}px` }}>
      <img
        src="/brand-mark-warm.png"
        alt=""
        style={{ height: `${Math.round(s.height * 1.3)}px`, width: 'auto' }}
        className="block select-none"
        draggable="false"
      />
      <img
        src={isBrand ? '/guanyisearch-wordmark-sage.png' : '/guanyisearch-wordmark.png'}
        alt=""
        width={s.width}
        height={s.height}
        className={`block h-auto select-none ${!isBrand && variant === 'light' ? 'brightness-0 invert' : ''}`}
        draggable="false"
        translate="no"
      />
    </span>
  );
}
