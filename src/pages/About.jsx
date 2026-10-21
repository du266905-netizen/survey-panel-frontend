import { useLanguage } from '../components/LanguageContext';
import peopleImage from '../assets/community/community-research-collage-web.webp';
import './About.css';

/* About GuanyiSearch — one reading page:
   title + lead, the cut-out portrait at a moderate size, then the
   China / partner story as three points. The copy lives here for now; the
   language-library pass will move it into LanguageContext. */

const aboutCopy = {
  'en-US': {
    eyebrow: 'About GuanyiSearch',
    title: 'About GuanyiSearch',
    body: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
    storyTitle: 'Rooted in China, connected to many markets',
    points: [
      { num: '01', title: 'A Chinese foundation', body: 'The team has focused on market research for years and has built a stable community and research network in China, reaching real, verifiable local samples.' },
      { num: '02', title: 'Regional partners', body: 'Across Greater China, Asia-Pacific, the Middle East, Europe and North America we work with local research partners, so each market is run by people who know it.' },
      { num: '03', title: 'Always extending', body: 'As studies require, we keep extending partner and participant coverage in major markets — starting from a particular place and connecting to a wider view.' },
    ],
  },
  'en-GB': {
    eyebrow: 'About GuanyiSearch',
    title: 'About GuanyiSearch',
    body: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
    storyTitle: 'Rooted in China, connected to many markets',
    points: [
      { num: '01', title: 'A Chinese foundation', body: 'The team has focused on market research for years and has built a stable community and research network in China, reaching real, verifiable local samples.' },
      { num: '02', title: 'Regional partners', body: 'Across Greater China, Asia-Pacific, the Middle East, Europe and North America we work with local research partners, so each market is run by people who know it.' },
      { num: '03', title: 'Always extending', body: 'As studies require, we keep extending partner and participant coverage in major markets — starting from a particular place and connecting to a wider view.' },
    ],
  },
  'zh-CN': {
    eyebrow: '关于 GuanyiSearch',
    title: '关于 GuanyiSearch',
    body: '我们是一家跨区域的信息洞察研究公司，致力于打造开放、共生、可持续的生态社区。我们连接参与者、研究发起人与组织，围绕商业、文化、日常生活与公共议题，让真实的声音转化为清晰的判断——为更好的决策，也为更好的世界。',
    storyTitle: '立足中国，连接多元市场',
    points: [
      { num: '01', title: '中国根基', body: '团队长期专注市场研究，在中国建立了稳定的社区与调研网络，能够触达真实、可验证的样本。' },
      { num: '02', title: '区域伙伴', body: '在大中华区、亚太、中东、欧洲与北美，我们与当地研究伙伴长期协作，让每个市场都由熟悉当地的人执行。' },
      { num: '03', title: '持续拓展', body: '根据研究需要，我们持续拓展主要市场的伙伴与参与者覆盖；从一个具体的地方出发，连接更广的研究视野。' },
    ],
  },
  'zh-Hant': {
    eyebrow: '關於 GuanyiSearch',
    title: '關於 GuanyiSearch',
    body: '我們是一家跨區域的資訊洞察研究公司，致力於打造開放、共生、可持續的生態社區。我們連結參與者、研究發起人與組織，圍繞商業、文化、日常生活與公共議題，讓真實的聲音轉化為清晰的判斷——為更好的決策，也為更好的世界。',
    storyTitle: '立足中國，連接多元市場',
    points: [
      { num: '01', title: '中國根基', body: '團隊長期專注市場研究，在中國建立了穩定的社區與調研網絡，能夠觸達真實、可驗證的樣本。' },
      { num: '02', title: '區域伙伴', body: '在大中華區、亞太、中東、歐洲與北美，我們與當地研究伙伴長期協作，讓每個市場都由熟悉當地的人執行。' },
      { num: '03', title: '持續拓展', body: '根據研究需要，我們持續拓展主要市場的伙伴與參與者覆蓋；從一個具體的地方出發，連接更廣的研究視野。' },
    ],
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

      <section className="about-story" aria-labelledby="about-story-title">
        <h2 id="about-story-title">{text.storyTitle}</h2>
        <div className="about-points">
          {text.points.map((point) => (
            <article className="about-point" key={point.num}>
              <span>{point.num}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
