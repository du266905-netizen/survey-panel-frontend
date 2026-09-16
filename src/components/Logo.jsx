export default function Logo({ size = 'md', variant = 'dark', className = '' }) {
  const sizes = {
    sm: { width: 142, height: 22 },
    md: { width: 178, height: 27 },
    lg: { width: 226, height: 35 },
  };
  const s = sizes[size];

  return (
    <img
      src="/guanyisearch-wordmark.png"
      alt=""
      width={s.width}
      height={s.height}
      className={`block h-auto select-none ${variant === 'light' ? 'brightness-0 invert' : ''} ${className}`}
      draggable="false"
      translate="no"
    />
  );
}
