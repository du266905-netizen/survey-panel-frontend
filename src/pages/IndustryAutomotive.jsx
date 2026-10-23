import { Link } from 'react-router-dom';
import roadImage from '../assets/industries/automotive-road.jpg';
import './IndustryAutomotive.css';

/* 行业页——汽车与交通。2026-10-24。

   结构：满屏图 → 一段"我们怎么想"的阅读块（过渡）→ 四个阶段 → 方法 → 页末 CTA。
   文案按专业调研的写法：先写这个阶段要支撑什么决定，再写研究怎么做；
   不写形容词，不写无法核实的数字（交付周期、样本库规模、国家数量一律不出现）。 */

const stages = [
  {
    n: '01',
    name: 'Concept and configuration',
    frame: 'What the product should be, and what each feature is worth.',
    cards: [
      {
        title: 'Feature validation',
        body: 'Interior layout, HMI and driver-assistance features tested with owners and considerers before tooling — monadic and paired comparisons, run in the price context that makes a preference mean something.',
        methods: 'Concept and A/B testing · owners and considerers',
      },
      {
        title: 'Pricing and configuration',
        body: 'Price sensitivity and trade-off models that show what each feature is worth and which package carries the price — reported as a corridor, not a single number.',
        methods: 'Willingness-to-pay and conjoint models · CATI',
      },
    ],
  },
  {
    n: '02',
    name: 'Launch and communication',
    frame: 'Whether the claim lands before the media spend commits.',
    cards: [
      {
        title: 'Pre-launch message testing',
        body: 'Which proposition is understood, believed and remembered by the buyers the launch depends on — tested before the campaign, not after.',
        methods: 'Online survey and CATI · target buyers',
      },
      {
        title: 'Campaign and asset pre-testing',
        body: 'Creative, dealer promotions and digital assets tested for recall and intent before media is committed.',
        methods: 'Concept and A/B testing · media assets',
      },
    ],
  },
  {
    n: '03',
    name: 'In market and channel',
    frame: 'Whether the network can sell, hand over and keep the buyer.',
    cards: [
      {
        title: 'Dealer and channel performance',
        body: 'Satisfaction, standards and training take-up across the network, and the points where a sale is lost at the counter.',
        methods: 'CATI · dealer and distributor interviews',
      },
      {
        title: 'Online to forecourt',
        body: 'The path from first search to test drive, and where consideration drops before the visit.',
        methods: 'Online survey · recent buyers and considerers',
      },
    ],
  },
  {
    n: '04',
    name: 'Electrification',
    frame: 'What opens and what blocks the move to electric.',
    cards: [
      {
        title: 'EV adoption and charging',
        body: 'Readiness, range anxiety and charging access by market — with private buyers and fleet total-cost decisions kept apart.',
        methods: 'Online and CATI · owners, considerers, fleet managers',
      },
    ],
  },
];

/* 方法一栏：每条给一个判断和它的边界，不写词典释义。 */
const methods = [
  ['CATI', 'Reaches a named list at scale — dealer principals, fleet managers — with quotas enforced city by city so regions stay comparable. Slow to set up, fast once live.'],
  ['In-depth interviews', 'Forty-five minutes with the person who owns the decision. Ten of these explain a survey; a hundred of them do not scale.'],
  ['Concept and A/B testing', 'Two cells, one variable. If you cannot name the single thing that differs, it is not a test — it is an opinion with a sample size.'],
  ['Dealer and trade audits', 'What the network actually does, not what it reports: price executed, stock held, training used, checked outlet by outlet.'],
  ['B2B panels', 'Decision-makers screened by company size, sector and role. Incidence is low, so the sample gets planned before the questionnaire does.'],
];

export default function IndustryAutomotive() {
  return (
    <main className="industry-page industry-page--automotive">
      {/* 满屏图，和首页同一套：图压在导航下、铺满整屏，文字落在左下。 */}
      <section className="ind-hero">
        <img src={roadImage} alt="" decoding="async" />
        <div className="ind-hero-copy">
          <p className="ind-kicker ind-kicker--light">Industries</p>
          <h1>Automotive &amp; transportation</h1>
          <p className="ind-hero-lead">Concept, pricing, launch and channel studies for vehicle makers, importers and dealer groups.</p>
        </div>
      </section>

      {/* 过渡：先讲这一类研究为什么这样做，再进分类。阅读栏 680，和站内长文一致。 */}
      <section className="ind-intro">
        <div className="ind-container">
          <p className="ind-kicker">How we work</p>
          <div className="ind-reading">
            <p className="ind-standfirst">A vehicle programme commits years before the market answers. Our work is to shorten that gap with evidence a team can defend.</p>
            <p>Category, powertrain and channel have fragmented at once: more nameplates, more price points, and a purchase that begins online and ends with a dealer who may not have the car. A single tracker no longer covers it.</p>
            <p>Each study is built around the decision it has to support — which features earn their cost, how a price corridor holds, whether the network can sell what marketing promises, and what makes a buyer choose electric. Design, sample and reporting follow from that question, not from a preferred method.</p>
            <p>What comes back is meant to be used: cross-tabs with weights stated, verbatims that explain the numbers, and a clear line between what the data supports and what it does not.</p>
          </div>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container">
          <p className="ind-kicker">What we study</p>
          <div className="ind-stages">
            {stages.map(({ n, name, frame, cards }) => (
              <div className="ind-stage" key={n}>
                <div className="ind-stage-head">
                  <h2><span className="ind-stage-n">{n}</span>{name}</h2>
                  <p className="ind-stage-frame">{frame}</p>
                </div>
                <div className="ind-stage-cards">
                  {cards.map(({ title, body, methods: cardMethods }) => (
                    <article key={title}>
                      <h3>{title}</h3>
                      <p>{body}</p>
                      <p className="ind-proof">{cardMethods}</p>
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
          <p className="ind-kicker ind-kicker--center">Methods</p>
          <p className="ind-methods-lead">What each method buys you, and where it stops.</p>
          <div className="ind-methods">
            {methods.map(([term, meaning]) => (
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
          <h2>Tell us the decision you have to defend.</h2>
          <p>We will come back with a design, a sample frame and a cost.</p>
          <div className="ind-cta-actions">
            <Link className="ind-cta-button" to="/business/access">Talk to the research team</Link>
            <Link className="ind-cta-button ind-cta-button--quiet" to="/join">Join us</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
