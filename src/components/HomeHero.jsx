import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from './LanguageContext';
import heroImage from '../assets/home/hero-window.jpg';
import './HomeHero.css';

/* Homepage hero, first frame.

   2026-11-12: the statement is centred and set at the page step (56px), with a
   sans note underneath and the same Learn more button. The earlier bottom-left
   layout is gone; the second frame uses the same geometry so the two frames do
   not jump when they cross-fade. */
export default function HomeHero({ title = '', note = '', ctaLabel = 'Learn more' }) {
  const { language } = useLanguage();

  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <img className="home-hero-image" src={heroImage} alt="" fetchPriority="high" decoding="async" />
      <div className="home-hero-scrim" aria-hidden="true" />
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <h1 className="home-hero-title" id="home-hero-title">{title}</h1>
          {note ? <p className="home-hero-note">{note}</p> : null}
        </div>
        <Link className="home-hero-cta" to={withLanguage('/about', language)}>{ctaLabel}</Link>
      </div>
    </section>
  );
}
