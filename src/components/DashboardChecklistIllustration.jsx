export default function DashboardChecklistIllustration() {
  return (
    <div className="dashboard-checklist-illustration" aria-hidden="true">
      <svg viewBox="0 0 260 190" fill="none">
        <g className="dashboard-checklist-sheet">
          <path className="dashboard-checklist-outline" d="M59 24c4-12 15-18 29-17 31 4 75 1 107 0 16-1 28 11 28 27v80c0 18-15 33-34 33-42 0-73 4-105-3-19-4-26-17-23-35 4-25 0-50-2-85Z" />
          <path className="dashboard-checklist-outline" d="M59 25c9-3 17-2 24 3 5 4 4 15 2 21-5 6-14 5-24 8" />
          <rect className="dashboard-checklist-outline dashboard-checklist-box" x="89" y="62" width="20" height="20" rx="4" />
          <path className="dashboard-checklist-detail" d="m94 71 5 5 13-15" />
          <path className="dashboard-checklist-detail" d="M126 72h60" />
          <rect className="dashboard-checklist-outline dashboard-checklist-box" x="89" y="96" width="20" height="20" rx="4" />
          <path className="dashboard-checklist-detail" d="M126 106h64" />
          <rect className="dashboard-checklist-outline dashboard-checklist-box" x="89" y="130" width="20" height="20" rx="4" />
          <path className="dashboard-checklist-detail" d="M126 140h57" />
        </g>
        <g className="dashboard-checklist-spark">
          <path className="dashboard-checklist-detail" d="m211 116 4 10 10 4-10 4-4 11-4-11-10-4 10-4 4-10Z" />
          <path className="dashboard-checklist-detail is-faint" d="M221 79v8M217 83h8" />
        </g>
        <path className="dashboard-checklist-ground" d="M61 165c38 7 98 7 136 0" />
      </svg>
    </div>
  );
}
