import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from './LanguageContext';
import heroImage from '../assets/home/hero-window.jpg';
import './HomeHero.css';

/* Homepage hero — the photograph the owner supplied (2026-10-22).

   2026-10-27：业主把首屏改成「大标题居中，十个行业绕着它转」。照片退回背景，
   标题和那句说明都居中；十张行业卡沿一条椭圆缓慢绕行，文字始终朝上。
   卡片名称和链接取行业页自己的文案，不新写。手机上没有绕行，只有标题。 */

const industryKeys = ['automotive', 'travel', 'consumer', 'healthcare', 'finance', 'social', 'industrial', 'tech', 'media', 'ecommerce'];
export default function HomeHero({ lead = '', rest = '', body = '', ctaLabel = 'Learn more' }) {
  const { language, publicCopy } = useLanguage();

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

      <ul className="home-hero-orbit" aria-label="Industries">
        {industryKeys.map((key, index) => {
          const industry = publicCopy.pages.industries[key];
          if (!industry) return null;
          return (
            <li key={key} style={{ '--from': `${index * 10}%` }}>
              <Link to={withLanguage(`/industries/${key}`, language)}>{industry.title}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
