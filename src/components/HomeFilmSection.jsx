import './HomeFilmSection.css';

/* 2026-11-12: the About page's frame now plays the owner's film. The frame is
   16:9 (960 wide) and the embed is 16:9 too, so the player fills it exactly —
   no bars, no crop, and the frame's size is untouched. The iframe is lazy, so
   the film only loads when the reader reaches it. */
const VIDEO_EMBED_URL = 'https://player.mediadelivery.net/embed/806488/caed4186-c98b-4a0c-8b8f-ce154a236b72?autoplay=true&loop=false&muted=true&preload=true&responsive=true';

export default function HomeFilmSection() {
  return (
    <section className="home-film" aria-label="Film">
      <figure className="home-film-frame">
        <iframe
          src={VIDEO_EMBED_URL}
          title="GuanyiSearch film"
          loading="lazy"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </figure>
    </section>
  );
}
