import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, FileText, MessageCircle, Newspaper, Users } from 'lucide-react';
import communityActivity from '../assets/community/community-activity.jpg';
import communityLatestBrief from '../assets/community/community-latest-brief.jpg';
import communityResearchReview from '../assets/community/community-research-review.jpg';
import communityResearchTable from '../assets/community/community-research-table.jpg';
import communitySubmissionDesk from '../assets/community/community-submission-desk.jpg';

const rotationDelay = 8000;

const communityAreas = [
  {
    id: 'latest-brief',
    number: '01',
    label: 'Latest brief',
    title: 'See today’s updates.',
    description: 'Read short updates about current news, new surveys, and new community discussions.',
    action: 'Read updates',
    icon: Newspaper,
    image: communityLatestBrief,
    imageAlt: 'A close look at a person’s eye',
  },
  {
    id: 'activities',
    number: '02',
    label: 'Join an activity',
    title: 'Take a survey or join a session.',
    description: 'Before you start, you will see the topic, estimated time, and reward.',
    action: 'View activities',
    icon: Users,
    image: communityActivity,
    imageAlt: 'A person sharing feedback on a small screen',
  },
  {
    id: 'discussion',
    number: '03',
    label: 'Discussion',
    title: 'Share what you think.',
    description: 'Read a question, then leave a comment. There is no forced right-or-wrong answer.',
    action: 'Join a discussion',
    icon: MessageCircle,
    image: communityResearchTable,
    imageAlt: 'People gathered around laptops and a shared table',
  },
  {
    id: 'propose-topic',
    number: '04',
    label: 'Propose a topic',
    title: 'Tell us what you want to understand.',
    description: 'Send us a local story, a problem you noticed, or a question you want people to answer.',
    action: 'Suggest a topic',
    icon: FileText,
    image: communitySubmissionDesk,
    imageAlt: 'A person writing a note at a desk',
  },
  {
    id: 'research-review',
    number: '05',
    label: 'Research review',
    title: 'See what people said.',
    description: 'Read a short summary of completed community research and what happens next.',
    action: 'View results',
    icon: BookOpen,
    image: communityResearchReview,
    imageAlt: 'A research team working together in a sunlit office',
  },
];

export default function CommunityHub() {
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const selectedArea = communityAreas[activeAreaIndex];
  const SelectedIcon = selectedArea.icon;

  const selectArea = useCallback((index) => {
    setActiveAreaIndex((index + communityAreas.length) % communityAreas.length);
  }, []);

  const goPrevious = useCallback(() => selectArea(activeAreaIndex - 1), [activeAreaIndex, selectArea]);
  const goNext = useCallback(() => selectArea(activeAreaIndex + 1), [activeAreaIndex, selectArea]);

  useEffect(() => {
    const preloadedImages = communityAreas.map((area) => {
      const image = new Image();
      image.src = area.image;
      image.decode?.().catch(() => {});
      return image;
    });

    return () => {
      preloadedImages.forEach((image) => image.removeAttribute('src'));
    };
  }, []);

  useEffect(() => {
    const rotation = window.setTimeout(goNext, rotationDelay);
    return () => window.clearTimeout(rotation);
  }, [activeAreaIndex, goNext]);

  return (
    <section className="community-hub" aria-labelledby="community-hub-title">
      <div className="community-hub-stage">
        <img
          key={selectedArea.id}
          className="community-hub-stage-image"
          src={selectedArea.image}
          alt={selectedArea.imageAlt}
        />
        <div className="community-hub-stage-wash" aria-hidden="true" />
        <div className="community-hub-corners" aria-hidden="true" />

        <header className="community-hub-intro">
          <p>Community</p>
          <h1 id="community-hub-title">Listen closer.<br />Build better questions.</h1>
          <span>Read updates, take part in activities, and share what matters to you.</span>
        </header>

        <aside key={selectedArea.id} className="community-hub-detail" aria-live="polite">
          <div className="community-hub-detail-icon"><SelectedIcon size={19} strokeWidth={1.7} /></div>
          <p>{selectedArea.number} · {selectedArea.label}</p>
          <h2>{selectedArea.title}</h2>
          <span>{selectedArea.description}</span>
          <div className="community-hub-detail-action">{selectedArea.action}</div>
        </aside>

        <div className="community-hub-controls" aria-label="Community guide controls">
          <button type="button" onClick={goPrevious} aria-label="Show the previous community area">
            <ArrowLeft size={17} strokeWidth={1.8} />
          </button>
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
