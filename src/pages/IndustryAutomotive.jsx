import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import roadImage from '../assets/industries/automotive-road.jpg';
import './IndustryPage.css';

/* 行业页——汽车与交通。2026-10-24。

   结构：满屏图 → 一段"我们怎么做"的阅读块（过渡）→ 四个阶段 → 方法 → 页末 CTA。

   文案口径：只用陈述句，不写比喻、反问、对仗；每张卡一到两句，只写范围与产出，
   执行细节留给方法一栏。不写无法核实的数字（交付周期、样本库规模、国家数量）。

   语言：文案在 src/constants/publicPageCopy.js；en-US 为源语言，其余语言回落英文。 */

export default function IndustryAutomotive() {
  const { publicCopy } = useLanguage();
  const c = publicCopy.pages.industries.automotive;
  usePageTitle(c.title);

  return (
    <main className="industry-page industry-page--automotive">
      {/* 满屏图，和首页同一套：图压在导航下、铺满整屏，文字落在左下。 */}
      <section className="ind-hero">
        <img src={roadImage} alt="" decoding="async" />
        <div className="ind-hero-copy">
          <p className="ind-kicker ind-kicker--light">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p className="ind-hero-lead">{c.lead}</p>
        </div>
      </section>

      {/* 过渡：先讲这一类研究为什么这样做，再进分类。阅读栏 680。 */}
      <section className="ind-intro">
        <div className="ind-container">
          <p className="ind-kicker">{c.introKicker}</p>
          <div className="ind-reading">
            {c.intro.map((paragraph, index) => (
              <p key={paragraph.slice(0, 12)} className={index === 0 ? 'ind-standfirst' : undefined}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container">
          <p className="ind-kicker">{c.stagesKicker}</p>
          <div className="ind-stages">
            {c.stages.map(({ n, name, frame, cards }) => (
              <div className="ind-stage" key={n}>
                <div className="ind-stage-head">
                  <h2><span className="ind-stage-n">{n}</span>{name}</h2>
                  <p className="ind-stage-frame">{frame}</p>
                </div>
                <div className="ind-stage-cards">
                  {cards.map((card) => (
                    <article key={card.title}>
                      <h3>{card.title}</h3>
                      <p>{card.body}</p>
                      <p className="ind-proof">{card.methods}</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section ind-section--methods">
        <div className="ind-container">
          <p className="ind-kicker">{c.methodsKicker}</p>
          <p className="ind-methods-lead">{c.methodsLead}</p>
          <div className="ind-methods">
            {c.methods.map(([term, meaning]) => (
              <article key={term}>
                <h3>{term}</h3>
                <p>{meaning}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-cta">
        <div className="ind-container">
          <h2>{c.ctaTitle}</h2>
          <p>{c.ctaBody}</p>
          <div className="ind-cta-actions">
            <Link className="ind-cta-button" to="/business/access">{c.ctaPrimary}</Link>
            <Link className="ind-cta-button ind-cta-button--quiet" to="/join">{c.ctaSecondary}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
