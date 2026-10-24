import { useLanguage } from '../components/LanguageContext';
import HomeFilmSection from '../components/HomeFilmSection';
import './About.css';

/* About GuanyiSearch —— 2026-10-25 合并页。

   原先 /about 与 /our-approach 两页各自太短，现在合成一页，顺序是：
   理念标语 → 关于文案（含人物扣图）→ 影片 → 理念长文 → 三个要点。
   字阶按行业页那一套收小：标题 48、分节 38、首句 22、正文 16、标签 11。
   /our-approach 保留为重定向，旧链接不会断。 */

const copy = {
  'en-US': {
    eyebrow: 'About us',
    theme: 'Your opinions shape the world.',
    whoEyebrow: 'Who we are',
    humanEyebrow: 'Human first',
    body: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
    storyTitle: 'Rooted in China, connected to the world.',
    points: [
      { num: '01', title: 'A Chinese foundation', body: 'The team has focused on market research for years and has built a stable community and research network in China, reaching real, verifiable local samples.' },
      { num: '02', title: 'Regional partners', body: 'Across Greater China, Asia-Pacific, the Middle East, Europe and North America we work with local research partners, so each market is run by people who know it.' },
      { num: '03', title: 'Always extending', body: 'As studies require, we keep extending partner and participant coverage in major markets — starting from a particular place and connecting to a wider view.' },
    ],
  },
  'en-GB': {
    eyebrow: 'About us',
    theme: 'Your opinions shape the world.',
    whoEyebrow: 'Who we are',
    humanEyebrow: 'Human first',
    body: 'We are a cross-regional insight and research company, building an open, interconnected and sustainable research community. We connect participants, research commissioners and organisations across business, culture, everyday life and public questions, turning real voices into clear judgements — for better decisions, and for a better world.',
    storyTitle: 'Rooted in China, connected to the world.',
    points: [
      { num: '01', title: 'A Chinese foundation', body: 'The team has focused on market research for years and has built a stable community and research network in China, reaching real, verifiable local samples.' },
      { num: '02', title: 'Regional partners', body: 'Across Greater China, Asia-Pacific, the Middle East, Europe and North America we work with local research partners, so each market is run by people who know it.' },
      { num: '03', title: 'Always extending', body: 'As studies require, we keep extending partner and participant coverage in major markets — starting from a particular place and connecting to a wider view.' },
    ],
  },
  'zh-CN': {
    eyebrow: '关于我们',
    theme: '你的观点影响世界。',
    whoEyebrow: '我们是谁',
    humanEyebrow: '以人为本',
    body: '我们是一家跨区域的信息洞察研究公司，致力于打造开放、共生、可持续的生态社区。我们连接参与者、研究发起人与组织，围绕商业、文化、日常生活与公共议题，让真实的声音转化为清晰的判断——为更好的决策，也为更好的世界。',
    storyTitle: '立足中国，连接世界',
    points: [
      { num: '01', title: '中国根基', body: '团队长期专注市场研究，在中国建立了稳定的社区与调研网络，能够触达真实、可验证的样本。' },
      { num: '02', title: '区域伙伴', body: '在大中华区、亚太、中东、欧洲与北美，我们与当地研究伙伴长期协作，让每个市场都由熟悉当地的人执行。' },
      { num: '03', title: '持续拓展', body: '根据研究需要，我们持续拓展主要市场的伙伴与参与者覆盖；从一个具体的地方出发，连接更广的研究视野。' },
    ],
  },
  'zh-Hant': {
    eyebrow: '關於我們',
    theme: '你的觀點影響世界。',
    whoEyebrow: '我們是誰',
    humanEyebrow: '以人為本',
    body: '我們是一家跨區域的資訊洞察研究公司，致力於打造開放、共生、可持續的生態社區。我們連結參與者、研究發起人與組織，圍繞商業、文化、日常生活與公共議題，讓真實的聲音轉化為清晰的判斷——為更好的決策，也為更好的世界。',
    storyTitle: '立足中國，連接世界',
    points: [
      { num: '01', title: '中國根基', body: '團隊長期專注市場研究，在中國建立了穩定的社區與調研網絡，能夠觸達真實、可驗證的樣本。' },
      { num: '02', title: '區域伙伴', body: '在大中華區、亞太、中東、歐洲與北美，我們與當地研究伙伴長期協作，讓每個市場都由熟悉當地的人執行。' },
      { num: '03', title: '持續拓展', body: '根據研究需要，我們持續拓展主要市場的伙伴與參與者覆蓋；從一個具體的地方出發，連接更廣的研究視野。' },
    ],
  },
};

export default function About() {
  const { language, publicCopy } = useLanguage();
  const text = copy[language] || copy['en-US'];
  const approach = publicCopy.approach;
  const manifesto = [approach.deck, approach.lede, approach.voicesBody, approach.technologyBody, approach.principleBody]
    .filter(Boolean)
    .join(language.startsWith('zh') ? '' : ' ');

  return (
    <main className="about-page">
      {/* The film opens the page, full bleed; then the document block, then the
          China story across the full width. */}
      <section className="ab-film" aria-label="Film">
        <HomeFilmSection />
      </section>

      <section className="ab-doc" aria-labelledby="ab-title">
        <div className="ab-head">
          <p className="ab-eyebrow">{text.eyebrow}</p>
          <h1 id="ab-title" className="ab-theme">{text.theme}</h1>
        </div>

        <div className="ab-two">
          <div className="ab-block">
            <p className="ab-eyebrow">{text.whoEyebrow}</p>
            <p className="ab-body">{text.body}</p>
          </div>
          <div className="ab-block">
            <p className="ab-eyebrow">{text.humanEyebrow}</p>
            <p className="ab-body">{manifesto}</p>
          </div>
        </div>
      </section>

      <section className="ab-story" aria-labelledby="ab-story-title">
        <h2 id="ab-story-title" className="ab-section-title">{text.storyTitle}</h2>
        <ol className="ab-points">
          {text.points.map((point) => (
            <li key={point.num}>
              <span>{point.num}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
