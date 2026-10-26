import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import consumerImage from '../assets/industries/consumer-hero.jpg';
import './IndustryPage.css';

/* 行业页——零售与快消品。2026-10-25。

   从原来的"消费品与零售"改：线上购物者、篮子、平台那部分已移到"电商与购物者"，
   这一页只留品类、包装与价格、货架与门店、品牌与复购。
   依据：饮料 CLT、包装面粉 10 天留置、护肤品月度追踪、电商追踪（仅作品类背景）。
   口径：无数字、不点名岗位、不与其他方法比较、每卡一到两句、拒绝俏皮话。 */

export default function IndustryConsumer() {
  const { publicCopy } = useLanguage();
  const c = publicCopy.pages.industries.consumer;
  usePageTitle(c.title);

  return (
    <main className="industry-page industry-page--consumer">
      <section className="ind-hero ind-hero--consumer">
        <img src={consumerImage} alt="" decoding="async" />
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
