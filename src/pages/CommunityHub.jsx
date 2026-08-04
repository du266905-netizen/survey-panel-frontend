import { useState } from 'react';
import { ArrowUpRight, BookOpen, Building2, FileText, MessageCircle, Newspaper, Users } from 'lucide-react';
import communityResearchTable from '../assets/community/community-research-table.jpg';
import communitySubmissionDesk from '../assets/community/community-submission-desk.jpg';

const communityAreas = [
  {
    id: 'channels',
    number: '01',
    label: 'Channels',
    title: 'Follow the conversations you care about.',
    description: 'Join a focused channel and return to the questions, experiences, and updates that matter to you.',
    detail: 'Channels give every topic a home before it becomes a survey or report.',
    action: 'Explore channels',
    icon: Users,
  },
  {
    id: 'research-rooms',
    number: '02',
    label: 'Research rooms',
    title: 'Give open questions room to develop.',
    description: 'Research rooms turn a broad issue into a considered brief, with space for context before a question is written.',
    detail: 'A room is for listening first — never a rushed verdict.',
    action: 'View research rooms',
    icon: BookOpen,
  },
  {
    id: 'submission-desk',
    number: '03',
    label: 'Submission desk',
    title: 'Bring forward a question worth studying.',
    description: 'Members will be able to propose local stories, lived experience, and research questions for editorial review.',
    detail: 'The desk will make every proposed topic traceable from idea to published outcome.',
    action: 'Open submission desk',
    icon: FileText,
  },
  {
    id: 'local-partners',
    number: '04',
    label: 'Local partners',
    title: 'Connect research to the places it describes.',
    description: 'Local groups and independent researchers can help shape relevant questions and bring findings back to their communities.',
    detail: 'Partnerships will be introduced with clear roles and a shared research purpose.',
    action: 'Meet local partners',
    icon: Building2,
  },
  {
    id: 'reports-updates',
    number: '05',
    label: 'Reports & updates',
    title: 'See what is moving, and what was learned.',
    description: 'Follow new research calls, published community findings, and the next steps behind every open topic.',
    detail: 'Reports will always distinguish community input from wider population research.',
    action: 'Read research updates',
    icon: Newspaper,
  },
];

export default function CommunityHub() {
  const [selectedAreaId, setSelectedAreaId] = useState(communityAreas[0].id);
  const selectedArea = communityAreas.find((area) => area.id === selectedAreaId) || communityAreas[0];
  const SelectedIcon = selectedArea.icon;

  return (
    <section className="community-hub" aria-labelledby="community-hub-title">
      <div className="community-hub-stage">
        <img className="community-hub-stage-image" src={communityResearchTable} alt="Community members working together around a shared table" />
        <div className="community-hub-stage-wash" aria-hidden="true" />
        <div className="community-hub-corners" aria-hidden="true" />

        <header className="community-hub-intro">
          <p>Community research</p>
          <h1 id="community-hub-title">Start with the questions worth staying with.</h1>
          <span>Five ways to turn lived experience, local context, and careful listening into work the community can return to.</span>
        </header>

        <aside className="community-hub-detail" aria-live="polite">
          <div className="community-hub-detail-icon"><SelectedIcon size={21} strokeWidth={1.7} /></div>
          <p>{selectedArea.number} · {selectedArea.label}</p>
          <h2>{selectedArea.title}</h2>
          <span>{selectedArea.description}</span>
          <div className="community-hub-detail-note">
            <MessageCircle size={15} strokeWidth={1.7} />
            <small>{selectedArea.detail}</small>
          </div>
          <div className="community-hub-detail-action">
            {selectedArea.action} <ArrowUpRight size={15} />
          </div>
          <img className="community-hub-detail-image" src={communitySubmissionDesk} alt="A community member writing down a research question" />
        </aside>

        <div className="community-hub-areas" role="tablist" aria-label="Community areas">
          {communityAreas.map((area) => {
            const AreaIcon = area.icon;
            const isSelected = area.id === selectedAreaId;
            return (
              <button
                key={area.id}
                className={`community-hub-area ${isSelected ? 'is-selected' : ''}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedAreaId(area.id)}
              >
                <span>{area.number}</span>
                <AreaIcon size={18} strokeWidth={1.7} />
                <strong>{area.label}</strong>
              </button>
            );
          })}
        </div>

        <p className="community-hub-footnote">The community workspace is being shaped in stages. This guide introduces the areas that will open next.</p>
      </div>
    </section>
  );
}
