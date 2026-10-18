import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';
/* 人物图用完整版：透明通道已用周围的模糊色补上，所以照片是整块的，
   不再有一道横线压在她的额头上；扣图原版仍保留在同一个目录。 */
import peopleImage from '../assets/community/community-research-portrait.jpg';

/* 首页的「人物页」：一句主张 + 一段说明 + 大画面，没有别的层级。
   文案直接取视频那段（publicCopy.home.evidenceStatement / evidence），不另写。
   办公室那一段已抽到 components/CommunityNetworkSection.jsx，等用户决定放哪。 */

const copy = {
  en: { action: 'Discuss your market question' },
  'zh-CN': { action: '讨论你的市场问题' },
  'zh-Hant': { action: '討論你的市場問題' },
};

export default function CommunityHub() {
  const { language, publicCopy } = useLanguage();
  const text = copy[language] || copy.en;

  /* 一句主张放在顶部（整段最有辨识度的一句），下面才是说明、人物和地球页。
     人物图用两层同一张图：照片那层裁到照片自身的矩形并带圆角，
     头那一层保持完整，所以她仍然是「探出照片上沿」的。 */
  return (
    <section className="community-hub" aria-labelledby="community-hub-title">
      <div className="community-hub-panel">
        <h2 className="community-hub-statement" id="community-hub-title">{publicCopy.home.evidenceStatement}</h2>

        <div className="community-hub-top">
          <div className="community-hub-copy">
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
      </div>
    </section>
  );
}
