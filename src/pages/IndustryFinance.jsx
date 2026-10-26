import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import financeImage from '../assets/industries/finance-hero.jpg';
import './IndustryPage.css';

/* 行业页——金融与财富管理。2026-10-24。

   壳与字号同前四页；主线按客户决策链：客群与资产 → 顾问与渠道 → 产品与定价 → 体验与留存。
   依据见 docs/COPY-SOURCES-2026-10-24-industries.md：供应商三个财富类案例 + 行业术语
   （share of wallet、willingness-to-pay / price-sensitivity 模型）。
   口径同前四页：无数字、不点名受访岗位、不与其他方法比较、每卡一到两句。 */

export default function IndustryFinance() {
  const { publicCopy } = useLanguage();
  const c = publicCopy.pages.industries.finance;
  usePageTitle(c.title);

  return (
    <main className="industry-page industry-page--finance">
      <section className="ind-hero ind-hero--finance">
        <img src={financeImage} alt="" decoding="async" />
        <div className="ind-hero-copy">
          <p className="ind-kicker ind-kicker--light">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p className="ind-hero-lead">{c.lead}</p>
        </div>
      </section>

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
