import { useLanguage } from '../components/LanguageContext';
import peopleImage from '../assets/community/community-research-collage-web.webp';
import './About.css';

/* About GuanyiSearch — one reading page, one statement, one portrait.
   The body is the approved short description, the same text the footer uses.
   The copy lives here for now (en / zh-CN / zh-Hant); the language-library
   pass will move it into LanguageContext with the other page copy. */

const aboutCopy = {
  'en-US': {
    eyebrow: 'About GuanyiSearch',
    title: 'About GuanyiSearch',
    body: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
  },
  'en-GB': {
    eyebrow: 'About GuanyiSearch',
    title: 'About GuanyiSearch',
    body: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
  },
  'zh-CN': {
    eyebrow: '关于 GuanyiSearch',
    title: '关于 GuanyiSearch',
    body: '我们是一家跨区域的信息洞察研究公司，致力于打造开放、共生、可持续的生态社区。我们连接参与者、研究发起人与组织，围绕商业、文化、日常生活与公共议题，让真实的声音转化为清晰的判断——为更好的决策，也为更好的世界。',
  },
  'zh-Hant': {
    eyebrow: '關於 GuanyiSearch',
    title: '關於 GuanyiSearch',
    body: '我們是一家跨區域的資訊洞察研究公司，致力於打造開放、共生、可持續的生態社區。我們連結參與者、研究發起人與組織，圍繞商業、文化、日常生活與公共議題，讓真實的聲音轉化為清晰的判斷——為更好的決策，也為更好的世界。',
  },
};

export default function About() {
  const { language } = useLanguage();
  const text = aboutCopy[language] || aboutCopy['en-US'];

  return (
    <main className="about-page">
      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <h1 id="about-title">{text.title}</h1>
          <p className="about-lead">{text.body}</p>
        </div>
        <figure className="about-portrait">
          <img src={peopleImage} alt="" loading="lazy" decoding="async" />
        </figure>
      </section>
    </main>
  );
}
