import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import communityCrossMarketOffice from '../assets/community/community-cross-market-office.jpg';
import communityResearchCollage from '../assets/community/community-research-collage.png';

const rotationDelay = 9000;

const platformFeatures = [
  {
    id: 'research-routes',
    eyebrow: 'Before you enter a new market',
    title: 'Validate before you enter.',
    description: 'Test what local consumers value, what channel partners see, and where your offer needs to change before launch.',
    supporting: 'Focused local research gives product, growth and market-entry teams evidence they can use.',
    image: communityResearchCollage,
    variant: 'research',
    action: { type: 'link', label: 'Plan a study', to: '/business' },
  },
  {
    id: 'cross-market-network',
    eyebrow: 'A cross-market insight network',
    title: 'Local evidence for market decisions.',
    description: 'GuanyiSearch connects participants, research initiators and organisations around questions that need a local answer.',
    image: communityCrossMarketOffice,
    action: { type: 'anchor', label: 'Book a demo', to: '#atlas-contact' },
    detail: {
      eyebrow: 'Built for market entry',
      title: 'Will people buy it here?',
      description: 'Test local demand, channel reality and the expression that makes sense before a decision travels to a new market.',
      points: ['Consumers with local context', 'Channel and market signals', 'Clearer go-to-market decisions'],
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
