export default function DashboardChecklistIllustration() {
  return (
    <div className="dashboard-checklist-illustration" aria-hidden="true">
      <svg viewBox="0 0 420 270" fill="none">
        <g className="dashboard-notebook-sheet">
          <path
            className="dashboard-notebook-page"
            d="M96 31h145c19 0 34 15 34 34v117c0 19-15 34-34 34H96c-19 0-34-15-34-34V65c0-19 15-34 34-34Z"
          />
          <path className="dashboard-notebook-spine" d="M94 38v170" />

          <path className="dashboard-notebook-ring" d="M67 59c-17 0-23 18-7 24 13 5 29 5 37-3 8-8 1-21-12-21" />
          <path className="dashboard-notebook-ring" d="M67 96c-17 0-23 18-7 24 13 5 29 5 37-3 8-8 1-21-12-21" />
          <path className="dashboard-notebook-ring" d="M67 133c-17 0-23 18-7 24 13 5 29 5 37-3 8-8 1-21-12-21" />
          <path className="dashboard-notebook-ring" d="M67 170c-17 0-23 18-7 24 13 5 29 5 37-3 8-8 1-21-12-21" />

          <rect className="dashboard-notebook-status is-gold" x="124" y="76" width="28" height="28" rx="6" />
          <path className="dashboard-notebook-status-check" d="m131 89 7 7 17-19" />
          <path className="dashboard-notebook-copy-line" d="M172 90h58" />

          <rect className="dashboard-notebook-status is-moss" x="124" y="119" width="28" height="28" rx="6" />
          <path className="dashboard-notebook-status-check" d="m131 132 7 7 17-19" />
          <path className="dashboard-notebook-copy-line" d="M172 133h72" />

          <rect className="dashboard-notebook-empty-status" x="124" y="162" width="28" height="28" rx="6" />
          <path className="dashboard-notebook-copy-line is-short" d="M172 176h52" />
        </g>

        <g className="dashboard-notebook-pen">
          <path className="dashboard-notebook-pen-cap" d="m299 43 20 10-9 27-20-10 9-27Z" />
          <path className="dashboard-notebook-pen-body" d="m290 70 20 10-49 119-24 25 5-34 48-120Z" />
          <path className="dashboard-notebook-pen-band" d="m281 92 20 10M246 183l18 9" />
          <path className="dashboard-notebook-pen-tip" d="m237 224 9-25 18 9-27 16Z" />
        </g>

        <path className="dashboard-notebook-baseline" d="M57 235c69 11 183 11 274 0" />
      </svg>
    </div>
  );
}
