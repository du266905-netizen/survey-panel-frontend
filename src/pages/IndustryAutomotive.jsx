import './IndustryAutomotive.css';

/* 行业页——汽车与出行。2026-10-24。

   当前状态：只有结构，没有自撰文案。
   · 首屏：用户提供的照片，满屏，与首页同一套处理；标题的说明句留空。
   · 主线：四个阶段（概念与配置 → 上市与传播 → 在售与渠道 → 电动化），
     每个阶段下面挂研究产品，只写标题与执行方式，不写形容句。
   · 页面不出现：交付周期、样本库规模、国家数量、客户名、任何供应商的数字
     （2026-10-24 定：等有我们自己的交付记录再上）。
   · 文案待用户确认后再填，占位处用 COPY PENDING 标出。 */

import roadImage from '../assets/industries/automotive-road.jpg';

/* 四个阶段。stage 名与卡片标题是结构标签，methods 只写执行方式，不写判断。 */
const stages = [
  {
    n: '01',
    name: 'Concept and configuration',
    cards: [
      { title: 'Feature validation', methods: 'Concept and A/B testing · owners and considerers' },
      { title: 'Pricing and configuration', methods: 'Willingness-to-pay modelling · CATI and interviews' },
    ],
  },
  {
    n: '02',
    name: 'Launch and communication',
    cards: [
      { title: 'Pre-launch message testing', methods: 'Online survey and CATI · target buyers' },
      { title: 'Campaign and asset pre-testing', methods: 'Concept and A/B testing · media assets' },
    ],
  },
  {
    n: '03',
    name: 'In market and channel',
    cards: [
      { title: 'Dealer and channel performance', methods: 'CATI · dealer and distributor interviews' },
      { title: 'Online to forecourt', methods: 'Online survey · recent buyers and considerers' },
    ],
  },
  {
    n: '04',
    name: 'Electrification',
    cards: [
      { title: 'EV adoption and charging', methods: 'Online and CATI · owners, considerers, fleet managers' },
    ],
  },
];

const methods = ['CATI', 'In-depth interviews', 'Concept and A/B testing', 'Dealer and trade audits', 'B2B panels'];

export default function IndustryAutomotive() {
  return (
    <main className="industry-page industry-page--automotive">
      {/* 满屏图，和首页同一套：图压满导航以下的整屏，白色衬线标题落在左下。 */}
      <section className="ind-hero-bleed">
        <img src={roadImage} alt="" decoding="async" />
        <div className="ind-hero-bleed-copy">
          <p className="ind-kicker ind-kicker--on-image">Industries</p>
          <h1>Automotive &amp; mobility</h1>
          <p className="ind-slot ind-slot--on-image">COPY PENDING — introduction</p>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container">
          <p className="ind-kicker">What we study</p>
          <div className="ind-stages">
            {stages.map(({ n, name, cards }) => (
              <div className="ind-stage" key={n}>
                <div className="ind-stage-head">
                  <h3><span className="ind-stage-n">{n}</span>{name}</h3>
                </div>
                <div className="ind-stage-cards">
                  {cards.map(({ title, methods: cardMethods }) => (
                    <article key={title}>
                      <h4>{title}</h4>
                      <p className="ind-proof">{cardMethods}</p>
                    </article>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container">
          <p className="ind-kicker">Methods</p>
          <ul className="ind-methods">
            {methods.map((method) => <li key={method}>{method}</li>)}
          </ul>
        </div>
      </section>

      <section className="ind-section">
        <div className="ind-container">
          <p className="ind-slot">COPY PENDING — closing call to action</p>
        </div>
      </section>
    </main>
  );
}
