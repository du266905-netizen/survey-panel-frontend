export default function LanguageGlobe({ size = 20, strokeWidth = 1.8, className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3.1 3.3 3.1 14.7 0 18M12 3c-3.1 3.3-3.1 14.7 0 18" />
      <path d="M4.8 7.5c4.6 2 9.8 2 14.4 0M4.8 16.5c4.6-2 9.8-2 14.4 0" />
    </svg>
  );
}
