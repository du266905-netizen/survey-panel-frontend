import { useState } from 'react';
import { Play } from 'lucide-react';
import HomeEntry from './HomeEntry';
import { useLanguage } from './LanguageContext';
import poster from '../assets/home/participant-portrait-poster.jpg';
import './HomeChoiceSection.css';

/* Homepage, second screen: a portrait film frame on the left, the account
   chooser on the right. The poster is a still from the participant film; the
   embed code will replace it when it arrives. */

export default function HomeChoiceSection({ headingLevel = 2 }) {
  const [audience, setAudience] = useState('participant');
  const { publicCopy } = useLanguage();
  const text = publicCopy.pages.access;
  // On the home page this is a section heading; when the block is mounted as
  // a page (the /access entry) it is the page's one h1.
  const Heading = headingLevel === 1 ? 'h1' : 'h2';

  return (
    <section className="home-choice" aria-label="Join as a participant or run research">
      <div className="home-choice-inner">
        <figure className="home-choice-film">
          <img src={poster} alt="" loading="lazy" decoding="async" />
          <button className="home-choice-play" type="button" aria-label="Play the participant film">
            <Play size={22} strokeWidth={2} fill="currentColor" aria-hidden="true" />
          </button>
        </figure>

        <div className="home-choice-entry">
          <Heading className="home-choice-title">{text.title}</Heading>
          <p className="home-choice-note">{text.note}</p>
          <div className="home-choice-card">
            <HomeEntry audience={audience} onAudienceChange={setAudience} />
          </div>
        </div>
      </div>
    </section>
  );
}
