import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from './LanguageContext';
import heroImage from '../assets/home/hero-window.jpg';
import './HomeHero.css';

/* Homepage hero — the photograph the owner supplied (2026-10-22).

   The statement sits on the photograph, bottom-left, at the size of the
   research workspace greeting (Inter, light, one step for the whole
   paragraph). The first sentence is the emphasis: same size, heavier
   weight. One white button sits to the right of the paragraph. */
export default function HomeHero({ lead = '', rest = '', body = '', ctaLabel = 'Learn more' }) {
  const { language } = useLanguage();

  return (
    <section className="home-hero" aria-labelledby="home-hero-statement">
      <img className="home-hero-image" src={heroImage} alt="" fetchPriority="high" decoding="async" />
      <div className="home-hero-scrim" aria-hidden="true" />
      <div className="home-hero-inner">
        <p className="home-hero-statement" id="home-hero-statement">
          <strong>{lead}{rest ? <><br />{rest}</> : null}</strong>{' '}
          <span>{body}</span>
        </p>
        <Link className="home-hero-cta" to={withLanguage('/about', language)}>{ctaLabel}</Link>
      </div>
    </section>
  );
}
