import { useLanguage } from '../components/LanguageContext';
import HomeFilmSection from '../components/HomeFilmSection';
import './About.css';

/* About GuanyiSearch —— 2026-10-25 合并页。

   原先 /about 与 /our-approach 两页各自太短，现在合成一页，顺序是：
   理念标语 → 关于文案（含人物扣图）→ 影片 → 理念长文 → 三个要点。
   字阶按行业页那一套收小：标题 48、分节 38、首句 22、正文 16、标签 11。
   /our-approach 保留为重定向，旧链接不会断。 */

export default function About() {
  const { language, publicCopy } = useLanguage();
  const text = publicCopy.pages.about;
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
