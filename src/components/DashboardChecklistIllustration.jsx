export default function DashboardChecklistIllustration() {
  return (
    <div className="dashboard-checklist-illustration" aria-hidden="true">
      <svg viewBox="0 0 460 300" fill="none">
        <g className="dashboard-checklist-accent">
          <circle className="dashboard-checklist-orb" cx="370" cy="77" r="19" />
          <circle className="dashboard-checklist-dot" cx="386" cy="59" r="4" />
        </g>
        <path className="dashboard-checklist-orbit" d="M330 151c4-40 50-63 78-38 20 18 2 51-28 61" />
        <path className="dashboard-checklist-paper" d="M88 48c7-22 29-34 54-31 59 8 145 1 205-1 31-1 54 21 54 52v113c0 34-28 61-63 61-82 0-139 7-201-6-36-8-48-32-43-65 7-44-1-86-6-123Z" />
        <path className="dashboard-checklist-outline" d="M88 48c7-22 29-34 54-31 59 8 145 1 205-1 31-1 54 21 54 52v113c0 34-28 61-63 61-82 0-139 7-201-6-36-8-48-32-43-65 7-44-1-86-6-123Z" />
        <path className="dashboard-checklist-outline" d="M89 50c17-5 31-3 43 4 9 6 6 27 3 37-8 11-25 8-42 13" />
        <rect className="dashboard-checklist-outline dashboard-checklist-box is-complete" x="152" y="91" width="30" height="30" rx="6" />
        <path className="dashboard-checklist-complete-mark" d="m159 105 8 8 20-23" />
        <path className="dashboard-checklist-detail" d="M207 106h109" />
        <rect className="dashboard-checklist-outline dashboard-checklist-box" x="152" y="142" width="30" height="30" rx="6" />
        <path className="dashboard-checklist-detail" d="M207 157h116" />
        <rect className="dashboard-checklist-outline dashboard-checklist-box" x="152" y="193" width="30" height="30" rx="6" />
        <path className="dashboard-checklist-detail" d="M207 208h108" />
        <g className="dashboard-checklist-stamp-mark">
          <circle className="dashboard-checklist-stamp" cx="350" cy="207" r="27" />
          <path className="dashboard-checklist-detail" d="m350 189 5 13 13 5-13 5-5 14-5-14-13-5 13-5 5-13Z" />
        </g>
        <path className="dashboard-checklist-ground" d="M92 258c72 13 186 13 257 0" />
      </svg>
    </div>
  );
}
