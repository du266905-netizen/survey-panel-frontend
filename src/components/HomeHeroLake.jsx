import heroImage from '../assets/home/hero-stars.jpg';
import './HomeHero.css';

/* Homepage hero, second frame.

   2026-11-12: the photograph is the night sky over the cloud sea (the owner
   supplied it), and the layout matches the first frame — centred 56px line, a
   sans note, one white action. */
export default function HomeHeroLake({ title = '', note = '', cta = 'Meet our community' }) {
  return (
    <section className="home-hero home-hero--night" aria-labelledby="home-lake-title">
      <img className="home-hero-image" src={heroImage} alt="" loading="lazy" decoding="async" />
      <div className="home-hero-scrim home-hero-scrim--night" aria-hidden="true" />
      <div className="home-hero-inner">
        <div className="home-hero-copy">
          <h1 className="home-hero-title" id="home-lake-title">{title}</h1>
          {note ? <p className="home-hero-note">{note}</p> : null}
        </div>
        <a className="home-hero-cta" href="#community">{cta}</a>
      </div>
    </section>
  );
}
