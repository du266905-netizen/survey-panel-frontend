export default function DashboardChecklistIllustration() {
  return (
    <div className="dashboard-checklist-illustration" aria-hidden="true">
      <svg viewBox="0 0 380 250" fill="none">
        <g className="dashboard-notebook">
          <path
            className="dashboard-notebook-outline"
            d="M91 28h142c16 0 29 13 29 29v121c0 16-13 29-29 29H91c-16 0-29-13-29-29V57c0-16 13-29 29-29Z"
          />
          <path className="dashboard-notebook-spine" d="M90 32v170" />
          <path className="dashboard-notebook-ring" d="M64 54c-14 0-19 13-4 18 12 4 24 4 31-2 7-6 1-16-11-16" />
          <path className="dashboard-notebook-ring" d="M64 85c-14 0-19 13-4 18 12 4 24 4 31-2 7-6 1-16-11-16" />
          <path className="dashboard-notebook-ring" d="M64 116c-14 0-19 13-4 18 12 4 24 4 31-2 7-6 1-16-11-16" />
          <path className="dashboard-notebook-ring" d="M64 147c-14 0-19 13-4 18 12 4 24 4 31-2 7-6 1-16-11-16" />
          <path className="dashboard-notebook-ring" d="M64 178c-14 0-19 13-4 18 12 4 24 4 31-2 7-6 1-16-11-16" />

          <rect className="dashboard-notebook-check-fill" x="116" y="68" width="26" height="26" rx="5" />
          <path className="dashboard-notebook-check" d="m122 80 6 6 15-17" />
          <path className="dashboard-notebook-line" d="M160 81h68" />

          <rect className="dashboard-notebook-check-fill is-sage" x="116" y="109" width="26" height="26" rx="5" />
          <path className="dashboard-notebook-check dashboard-notebook-check-delayed" d="m122 121 6 6 15-17" />
          <path className="dashboard-notebook-line" d="M160 122h75" />

          <rect className="dashboard-notebook-box" x="116" y="150" width="26" height="26" rx="5" />
          <path className="dashboard-notebook-line" d="M160 163h61" />
        </g>

        <g className="dashboard-notebook-pen">
          <path className="dashboard-notebook-pen-cap" d="m288 48 16 8-7 22-16-8 7-22Z" />
          <path className="dashboard-notebook-pen-body" d="m281 70 16 8-44 104-19 21 4-29 43-104Z" />
          <path className="dashboard-notebook-pen-detail" d="m266 94 16 8M239 174l14 8" />
          <path className="dashboard-notebook-pen-tip" d="m234 203 8-19 11 6-19 13Z" />
        </g>

        <path className="dashboard-notebook-ground" d="M48 222c59 11 180 11 260 0" />
      </svg>
    </div>
  );
}
