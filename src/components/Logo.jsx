export default function Logo({ size = 'md', variant = 'dark', className = '' }) {
  const sizes = {
    sm: { width: 146, height: 30 },
    md: { width: 174, height: 36 },
    lg: { width: 222, height: 46 },
  };
  const s = sizes[size];
  const src = variant === 'light' ? '/guanyisearch-logo-white.svg' : '/guanyisearch-logo.svg';

  return (
    <img
      src={src}
      alt="GUANYISEARCH"
      width={s.width}
      height={s.height}
      className={`block h-auto select-none ${className}`}
      draggable="false"
      translate="no"
    />
  );
}
