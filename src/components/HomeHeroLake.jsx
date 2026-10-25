import lakeImage from '../assets/home/lake-boathouse.jpg';
import './HomeHeroLake.css';

/* Homepage hero, second frame (2026-10-26).

   The owner asked for the boathouse photograph as the second rotating frame,
   with the community button. Same geometry as the first frame: the line sits
   bottom-left on the water, one white action to its right. */
export default function HomeHeroLake({ line = '', note = '', cta = 'Meet our community' }) {
  // The Chinese line carries its own pause after the comma; render each half
  // on its own line instead of letting the last two characters wrap.
  const parts = String(line).split('，');
  return (
    <section className="home-hero home-hero--lake" aria-labelledby="home-lake-line">
      <img className="home-hero-image" src={lakeImage} alt="" loading="lazy" decoding="async" />
      <div className="home-hero-scrim home-hero-scrim--lake" aria-hidden="true" />
      <div className="home-hero-inner home-hero-inner--lake">
        <div className="home-lake-copy">
          <p className="home-lake-line" id="home-lake-line">
            {parts.map((part, index) => (
              <span key={part}>{part}{index < parts.length - 1 ? '，' : ''}</span>
            ))}
          </p>
          {note ? <p className="home-lake-note">{note}</p> : null}
        </div>
        <a className="home-hero-cta" href="#community">{cta}</a>
      </div>
    </section>
  );
}
