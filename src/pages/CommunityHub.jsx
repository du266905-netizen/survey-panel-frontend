import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import communityCrossMarketOffice from '../assets/community/community-cross-market-office.jpg';
import communityResearchCollage from '../assets/community/community-research-collage.png';

const rotationDelay = 9000;

const platformFeatures = [
  {
    id: 'research-routes',
    eyebrow: 'Research for market-entry teams',
    title: 'Know what needs to change before launch.',
    description: 'When a new-market decision carries real cost, assumptions about demand, language and channels are not enough. We design focused local studies around the questions that determine whether your offer is ready.',
    supporting: 'GuanyiSearch gives product, growth and market-entry teams a clear route from a live decision to usable local evidence.',
    clientProblems: [
      {
        title: 'Demand and proposition fit',
        description: 'Which customer need matters most, and what would make the offer more relevant locally?',
      },
      {
        title: 'Message and channel fit',
        description: 'Which language, creative and route to market will make sense to the people you need to reach?',
      },
      {
        title: 'A decision you can act on',
        description: 'What should be adapted, tested next or held back before more budget is committed?',
      },
    ],
    image: communityResearchCollage,
    variant: 'research',
    action: { type: 'link', label: 'Discuss your market question', to: '/business' },
  },
  {
    id: 'cross-market-network',
    eyebrow: 'Local research, built around a real decision',
    title: 'Make the next market move with local evidence.',
    description: 'GuanyiSearch brings together local participants, research design and hands-on project support so teams can turn a market question into a focused study—not a generic data exercise.',
    image: communityCrossMarketOffice,
    action: { type: 'anchor', label: 'Discuss a market question', to: '#atlas-contact' },
    detail: {
      eyebrow: 'For market entry and growth',
      title: 'What will make this offer work here?',
      description: 'Assess demand, message and channel realities before committing launch spend. We help define what to test, who to hear from and how the result informs the next move.',
      points: ['People selected for the decision at hand', 'Local context across message and channels', 'A focused route from brief to readout'],
    },
  },
];

function FeatureAction({ action, language }) {
  if (action.type === 'anchor') {
    return <a className="community-hub-primary-action" href={action.to}>{action.label}<ArrowUpRight size={19} strokeWidth={1.8} /></a>;
  }

  return <Link className="community-hub-primary-action" to={withLanguage(action.to, language)}>{action.label}<ArrowUpRight size={19} strokeWidth={1.8} /></Link>;
}

export default function CommunityHub() {
  const { language } = useLanguage();
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const selectedArea = platformFeatures[activeAreaIndex];

  const selectArea = useCallback((index) => {
    setActiveAreaIndex((index + platformFeatures.length) % platformFeatures.length);
  }, []);

  const goPrevious = useCallback(() => selectArea(activeAreaIndex - 1), [activeAreaIndex, selectArea]);
  const goNext = useCallback(() => selectArea(activeAreaIndex + 1), [activeAreaIndex, selectArea]);

  useEffect(() => {
    const rotation = window.setTimeout(goNext, rotationDelay);
    return () => window.clearTimeout(rotation);
  }, [activeAreaIndex, goNext]);

  return (
    <section className="community-hub" aria-labelledby="community-hub-title">
      <div className={`community-hub-stage${selectedArea.variant ? ` community-hub-stage--${selectedArea.variant}` : ''}`}>
        {selectedArea.variant !== 'research' && (
          <div className="community-hub-stage-media" aria-hidden="true">
            <img className="community-hub-stage-image is-active" src={selectedArea.image} alt="" loading="eager" decoding="async" />
          </div>
        )}
        <div className="community-hub-stage-wash" aria-hidden="true" />
        <div className="community-hub-corners" aria-hidden="true" />

        <header className="community-hub-intro">
          <p>{selectedArea.eyebrow}</p>
          <h1 id="community-hub-title">{selectedArea.title}</h1>
          <span>{selectedArea.description}</span>
          {selectedArea.supporting && <strong className="community-hub-supporting-copy">{selectedArea.supporting}</strong>}
          {selectedArea.clientProblems && (
            <div className="community-hub-client-problems" aria-label="Questions GuanyiSearch helps clients resolve">
              <p>What we help you resolve</p>
              <ul>
                {selectedArea.clientProblems.map((problem) => (
                  <li key={problem.title}>
                    <CheckCircle2 size={15} strokeWidth={1.9} aria-hidden="true" />
                    <span><strong>{problem.title}</strong>{problem.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <FeatureAction action={selectedArea.action} language={language} />
        </header>

        {selectedArea.variant === 'research' ? (
          <div className="community-hub-research-visual" aria-hidden="true">
            <div className="community-hub-research-photo-frame">
              <img src={selectedArea.image} alt="" decoding="async" />
            </div>
          </div>
        ) : (
          <aside className="community-hub-detail" aria-live="polite">
            <p>{selectedArea.detail.eyebrow}</p>
            <h2>{selectedArea.detail.title}</h2>
            <span>{selectedArea.detail.description}</span>
            <ul>
              {selectedArea.detail.points.map((point) => <li key={point}><MapPin size={13} strokeWidth={1.8} />{point}</li>)}
            </ul>
          </aside>
        )}

        <div className="community-hub-controls" aria-label="Platform feature controls">
          <button type="button" onClick={goPrevious} aria-label="Show the previous platform feature">
            <ArrowLeft size={17} strokeWidth={1.8} />
          </button>
          <button type="button" onClick={goNext} aria-label="Show the next platform feature">
            <ArrowRight size={17} strokeWidth={1.8} />
          </button>
        </div>

      </div>
    </section>
  );
}
