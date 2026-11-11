import { useState } from 'react';
import HomeEntry from './HomeEntry';
import { useLanguage } from './LanguageContext';
import './HomeChoiceSection.css';

/* Homepage, second screen: a portrait film frame on the left, the account
   chooser on the right. The poster is a still from the participant film; the
   embed code will replace it when it arrives. */

export default function HomeChoiceSection({ headingLevel = 2 }) {
  const [audience, setAudience] = useState('participant');
  const { language, publicCopy } = useLanguage();
  const isChinese = /^(zh|ja|ko)/i.test(language || '');
  const text = publicCopy.pages.access;
  /* 2026-11-12: the card opens with the idea, then the action, on two lines. */
  // On the home page this is a section heading; when the block is mounted as
  // a page (the /access entry) it is the page's one h1.
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <section className="home-choice" aria-label="Join as a participant or run research">
      <div className="home-choice-inner">
        <figure className="home-choice-film">
          {/* 2026-11-12: the owner's film, in its own 16:9 frame. */}
          <div className="home-choice-embed">
            <iframe
              src="https://player.mediadelivery.net/embed/806488/b0011748-5475-48cf-bd26-569e680483fc?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
              title="GuanyiSearch participant film"
              loading="lazy"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
        </figure>

        <div className="home-choice-entry">
          <Heading className="home-choice-title">
            {isChinese ? (<>独立思考<br />明辨是非</>) : 'Independent thinking.'}
          </Heading>
          <p className="home-choice-note">{isChinese ? '下一步，从这里开始。' : 'Your next step starts here.'}</p>
          <div className="home-choice-card">
            <HomeEntry audience={audience} onAudienceChange={setAudience} />
          </div>
        </div>
      </div>
    </section>
  );
}
