import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';
/* 人物图垫了一层比页面略深的鼠尾草底，四面都能吃到 18px 圆角；
   原来的透明版仍是 community-research-collage-web.webp（出框版留着备用）。 */
import peopleImage from '../assets/community/community-research-portrait.jpg';
import videoPoster from '../assets/community/community-video-poster.jpg';

/* 首页的「人物页」：一句主张 + 一段说明 + 大画面，没有别的层级。
   文案直接取视频那段（publicCopy.home.evidenceStatement / evidence），不另写。
   办公室那一段已抽到 components/CommunityNetworkSection.jsx，等用户决定放哪。 */

/* 视频放在人物下面。注意：这个 mediadelivery 地址目前返回 404（provider 侧 asset 不可用），
   页面上会显示播放器的 404 页。换一个能播的 embed 只改这一行。 */
const VIDEO_EMBED_URL = 'https://player.mediadelivery.net/embed/763269/6a8340b7-c25b-4425-8ea0-96103d8312b5?autoplay=false&loop=false&muted=true&preload=true&responsive=true';

const copy = {
  en: { action: 'Discuss your market question' },
  'zh-CN': { action: '讨论你的市场问题' },
  'zh-Hant': { action: '討論你的市場問題' },
};

export default function CommunityHub() {
  const { language, publicCopy } = useLanguage();
  const text = copy[language] || copy.en;
  const [videoOpen, setVideoOpen] = useState(false);

  /* 只用视频页自己的文案：一句主张 + 一段说明，然后是大画面。
     不再另写卖点、不再叠小标题。 */
  return (
    <section className="community-hub" aria-labelledby="community-hub-title">
      <div className="community-hub-inner">
        <div className="community-hub-top">
          <div className="community-hub-copy">
            <h2 id="community-hub-title">{publicCopy.home.evidenceStatement}</h2>
            <p className="community-hub-lede">{publicCopy.home.evidence}</p>
            <div className="community-hub-actions">
              <Link className="community-hub-primary-action" to={withLanguage('/business', language)}>
                {text.action}
                <ArrowUpRight size={18} strokeWidth={1.8} aria-hidden="true" />
              </Link>
              <Link className="community-hub-text-action" to={withLanguage('/our-approach', language)}>
                {publicCopy.navigation.about}
                <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <figure className="community-hub-portrait">
            <img src={peopleImage} alt="" loading="lazy" decoding="async" />
          </figure>
        </div>

        <figure className="community-hub-video-frame">
          {videoOpen ? (
            <iframe
              src={VIDEO_EMBED_URL}
              title={publicCopy.navigation.about}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
              allowFullScreen
            />
          ) : (
            <button className="community-hub-video-poster" type="button" onClick={() => setVideoOpen(true)} aria-label={publicCopy.navigation.about}>
              <img src={videoPoster} alt="" loading="lazy" decoding="async" />
              <span className="community-hub-video-play" aria-hidden="true"><Play size={22} strokeWidth={2} fill="currentColor" /></span>
            </button>
          )}
        </figure>
      </div>
    </section>
  );
}
