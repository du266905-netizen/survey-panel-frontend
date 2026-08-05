import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, FileText, MessageCircle, Newspaper, Users } from 'lucide-react';
import communityActivity from '../assets/community/community-activity.jpg';
import communityLatestBrief from '../assets/community/community-latest-brief.jpg';
import communityResearchReview from '../assets/community/community-research-review.jpg';
import communityResearchTable from '../assets/community/community-research-table.jpg';
import communitySubmissionDesk from '../assets/community/community-submission-desk.jpg';

const rotationDelay = 7000;

const communityAreas = [
  {
    id: 'latest-brief',
    number: '01',
    label: 'Latest brief',
    title: 'A read on what matters now.',
    description: 'News signals and community updates stay clearly labeled by source, so you know what is reported and what is being explored.',
    detail: 'Signals set research priorities — not a verdict on what is true.',
    action: 'Read the latest brief',
    icon: Newspaper,
    image: communityLatestBrief,
    imageAlt: 'A close look at a person’s eye',
  },
  {
    id: 'activities',
    number: '02',
    label: 'Join an activity',
    title: 'Take part when a live opportunity opens.',
    description: 'Surveys, quick questions, and future sessions will show their purpose, timing, and reward before you decide to join.',
    detail: 'Your time and the intended use of each response should always be clear.',
    action: 'See live activities',
    icon: Users,
    image: communityActivity,
    imageAlt: 'A person sharing feedback on a small screen',
  },
  {
    id: 'discussion',
    number: '03',
    label: 'Discussion',
    title: 'Share perspective, not a binary verdict.',
    description: 'Join a published prompt with the context needed for a useful conversation — no forced right-or-wrong answer.',
    detail: 'Careful responses can help turn a broad issue into a stronger study.',
    action: 'Open the discussion',
    icon: MessageCircle,
    image: communityResearchTable,
    imageAlt: 'People gathered around laptops and a shared table',
  },
  {
    id: 'propose-topic',
    number: '04',
    label: 'Propose a topic',
    title: 'Tell us what deserves a closer look.',
    description: 'Share a lived experience, local change, or unresolved question. The editorial team can decide whether it becomes a discussion or study.',
    detail: 'You suggest the issue; we shape the research question with care.',
    action: 'Propose a topic',
    icon: FileText,
    image: communitySubmissionDesk,
    imageAlt: 'A person writing a note at a desk',
  },
  {
    id: 'research-review',
    number: '05',
    label: 'Research review',
    title: 'Return to what the community learned.',
    description: 'Completed work will explain why it was run, what was heard, and what can happen next without exposing individual responses.',
    detail: 'A clear record keeps participation connected to a real outcome.',
    action: 'Read research reviews',
    icon: BookOpen,
    image: communityResearchReview,
    imageAlt: 'A research team working together in a sunlit office',
  },
];

export default function CommunityHub() {
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const selectedArea = communityAreas[activeAreaIndex];
  const SelectedIcon = selectedArea.icon;

  const selectArea = useCallback((index) => {
    setActiveAreaIndex((index + communityAreas.length) % communityAreas.length);
  }, []);

  const goPrevious = useCallback(() => selectArea(activeAreaIndex - 1), [activeAreaIndex, selectArea]);
  const goNext = useCallback(() => selectArea(activeAreaIndex + 1), [activeAreaIndex, selectArea]);

  useEffect(() => {
    if (isPaused) return undefined;

    const rotation = window.setTimeout(goNext, rotationDelay);
    return () => window.clearTimeout(rotation);
  }, [activeAreaIndex, goNext, isPaused]);

  return (
    <section className="community-hub" aria-labelledby="community-hub-title">
      <div
        className="community-hub-stage"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocusCapture={() => setIsPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
        }}
      >
        <img
          key={selectedArea.id}
          className="community-hub-stage-image"
          src={selectedArea.image}
          alt={selectedArea.imageAlt}
        />
        <div className="community-hub-stage-wash" aria-hidden="true" />
        <div className="community-hub-corners" aria-hidden="true" />

        <header className="community-hub-intro">
          <p>Community workspace</p>
          <h1 id="community-hub-title">Listen closer.<br />Build better questions.</h1>
          <span>A practical place for news signals, shared perspective, and research the community can return to.</span>
        </header>

        <aside className="community-hub-detail" aria-live="polite">
          <div className="community-hub-detail-icon"><SelectedIcon size={19} strokeWidth={1.7} /></div>
          <p>{selectedArea.number} · {selectedArea.label}</p>
          <h2>{selectedArea.title}</h2>
          <span>{selectedArea.description}</span>
          <div className="community-hub-detail-note">
            <MessageCircle size={14} strokeWidth={1.7} />
            <small>{selectedArea.detail}</small>
          </div>
          <div className="community-hub-detail-action">{selectedArea.action}</div>
        </aside>

        <div className="community-hub-controls" aria-label="Community guide controls">
          <button type="button" onClick={goPrevious} aria-label="Show the previous community area">
            <ArrowLeft size={17} strokeWidth={1.8} />
          </button>
          <span><strong>{selectedArea.number}</strong> / {String(communityAreas.length).padStart(2, '0')}</span>
          <button type="button" onClick={goNext} aria-label="Show the next community area">
            <ArrowRight size={17} strokeWidth={1.8} />
          </button>
        </div>

        <div className="community-hub-areas" role="tablist" aria-label="Community areas">
          {communityAreas.map((area, index) => {
            const AreaIcon = area.icon;
            const isSelected = index === activeAreaIndex;

            return (
              <button
                key={area.id}
                className={`community-hub-area ${isSelected ? 'is-selected' : ''}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => selectArea(index)}
              >
                <span>{area.number}</span>
                <AreaIcon size={17} strokeWidth={1.7} />
                <strong>{area.label}</strong>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
