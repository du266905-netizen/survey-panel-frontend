/* 原来嵌在人物页里的影片，单独成段，放在地球页原来的位置。
   注意：这个 mediadelivery 地址目前返回 404（provider 侧 asset 不可用），
   所以默认只显示封面，点了才挂 iframe；换一个能播的 embed 只改这一行。 */
import { useState } from 'react';
import { Play } from 'lucide-react';
import videoPoster from '../assets/community/community-video-poster.jpg';
import './HomeFilmSection.css';

const VIDEO_EMBED_URL = 'https://player.mediadelivery.net/embed/763269/6a8340b7-c25b-4425-8ea0-96103d8312b5?autoplay=false&loop=false&muted=true&preload=true&responsive=true';

/* `poster` lets a page use its own cover; the About page passes the city
   photograph, the homepage keeps the community still. */
export default function HomeFilmSection({ poster = videoPoster }) {
  const [open, setOpen] = useState(false);
  return (
    <section className="home-film" aria-label="Film">
      <figure className="home-film-frame">
        {open ? (
          <iframe
            src={VIDEO_EMBED_URL}
            title="GuanyiSearch film"
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
            allowFullScreen
          />
        ) : (
          <button className="home-film-poster" type="button" onClick={() => setOpen(true)} aria-label="Play the film">
            <img src={poster} alt="" loading="lazy" decoding="async" />
            <span className="home-film-play" aria-hidden="true"><Play size={22} strokeWidth={2} fill="currentColor" /></span>
          </button>
        )}
      </figure>
    </section>
  );
}
