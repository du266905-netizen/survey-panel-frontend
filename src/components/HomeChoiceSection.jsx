import { useState } from 'react';
import { Play } from 'lucide-react';
import HomeEntry from './HomeEntry';
import poster from '../assets/home/participant-portrait-poster.jpg';
import './HomeChoiceSection.css';

/* Homepage, second screen: a portrait film frame on the left, the account
   chooser on the right. The poster is a still from the participant film; the
   embed code will replace it when it arrives. */

export default function HomeChoiceSection() {
  const [audience, setAudience] = useState('participant');

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
          <HomeEntry audience={audience} onAudienceChange={setAudience} />
        </div>
      </div>
    </section>
  );
}
