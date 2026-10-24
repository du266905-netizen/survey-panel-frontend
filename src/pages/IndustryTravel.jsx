import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import travelImage from '../assets/industries/luxury-hero.jpg';
import './IndustryPage.css';

/* 行业页——旅游与交通。2026-10-25。

   由原来的"奢侈品与高端生活方式"改为旅游与交通：
   目的地、出行决策、到达与停留、口碑与复访。
   依据：Visit Britain（225 份问卷 + 10 个深访）、Visit Ireland（125 份问卷，含第二套房人群）。
   交通一段（航空、铁路、租车）供应商没有案例，标待核实，不写成做过。
   口径：无数字、不点名岗位、不与其他方法比较、每卡一到两句、拒绝俏皮话。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Travel & transportation',
    lead: 'Research for destination organisations, hotel groups, transport operators and travel retail: who travels, how the trip is decided, and what brings them back.',
    introKicker: 'How we work',
    intro: [
      'A trip is decided in stages, and each stage belongs to a different party: the destination, the carrier, the hotel, the agent.',
      'We study the traveller across those stages: what puts a destination on the shortlist, what decides the booking, what happens on arrival, and what is said afterwards.',
      'Each study is designed around the decision it has to support: which source market to open, which segment to target, and where the journey loses the traveller. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Destination and audience',
        frame: 'Who travels, why, and from where.',
        cards: [
          {
            title: 'Source markets and segments',
            body: 'Segment travellers by origin market, purpose and spend, and size each group before a market is opened.',
            methods: 'Online survey · CATI',
          },
          {
            title: 'Destination perception',
            body: 'Establish what the destination is known for, and what keeps it off the shortlist.',
            methods: 'Online survey · in-depth interviews',
          },
        ],
      },
      {
        n: '02',
        name: 'Decision and booking',
        frame: 'How the shortlist becomes a booking.',
        cards: [
          {
            title: 'Trip decisions',
            body: 'Follow the trip from destination shortlist to booking, and the points where a destination or operator drops out.',
            methods: 'Online survey · in-depth interviews',
          },
          {
            title: 'Price and season',
            body: 'Test price expectations and seasonality against the destinations that compete for the same trip.',
            methods: 'Price tests · online survey',
          },
        ],
      },
      {
        n: '03',
        name: 'Arrival and stay',
        frame: 'What happens once the traveller arrives.',
        cards: [
          {
            title: 'Transport and arrival',
            body: 'Study how travellers choose to get there, and what that choice does to the rest of the trip.',
            methods: 'Online survey · in-depth interviews',
          },
          {
            title: 'Experience and stay',
            body: 'Assess the stay, the service and the local experience against what the destination promised.',
            methods: 'In-depth interviews · online survey',
          },
        ],
      },
      {
        n: '04',
        name: 'Advocacy and return',
        frame: 'Whether they come back, and whether they recommend it.',
        cards: [
          {
            title: 'Recommendation and repeat',
            body: 'Measure advocacy and repeat visits, and establish why travellers do not return.',
            methods: 'Tracking · online survey',
          },
          {
            title: 'Traveller profile over time',
            body: 'Track how the traveller profile changes by market and by season.',
            methods: 'Tracking · CATI',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Traveller survey', 'Survey of past or intended travellers, with quotas by source market, purpose and spend.'],
      ['Destination interviews', 'Depth interviews of 45 to 60 minutes with travellers and trade partners, run one to one by the research team.'],
      ['Online tracking', 'Monthly or quarterly tracking on fixed measures, so movement can be read against the same base.'],
      ['CATI', 'Scripted telephone interviews, with quotas set by market, segment or trip type.'],
      ['Price tests', 'Price expectations and seasonality tested against the destinations competing for the same trip.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '旅游与交通',
    lead: '面向目的地机构、酒店集团、交通运营方与旅游零售：谁会来、一趟行程如何被决定、又是什么让人再来。',
    introKicker: '我们如何做',
    intro: [
      '一趟行程分几步决定，每一步属于不同的一方：目的地、承运方、酒店、代理。',
      '我们沿着这几步研究旅行者：什么让一个目的地进入备选、什么决定了预订、抵达之后发生什么、回去之后怎么说。',
      '每项研究都围绕它要支撑的决定来设计：开哪个客源市场、瞄准哪类客群、行程在哪一步失去旅行者。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '目的地与客群',
        frame: '谁会来、为什么来、从哪里来。',
        cards: [
          {
            title: '客源市场与客群',
            body: '按客源市场、出行目的与消费水平划分旅行者，并在开市场之前把每一群的规模算清。',
            methods: '线上问卷 · 电话访问',
          },
          {
            title: '目的地认知',
            body: '确定目的地以什么被记住，又是什么让它进不了备选。',
            methods: '线上问卷 · 深度访谈',
          },
        ],
      },
      {
        n: '02',
        name: '决策与预订',
        frame: '从备选到下单，中间经过哪几步。',
        cards: [
          {
            title: '出行决策',
            body: '跟着一趟行程走：从目的地备选到预订，以及目的地或运营商在哪一步掉出局。',
            methods: '线上问卷 · 深度访谈',
          },
          {
            title: '价格与季节',
            body: '对照争夺同一趟行程的其他目的地，测试价格预期与季节波动。',
            methods: '价格测试 · 线上问卷',
          },
        ],
      },
      {
        n: '03',
        name: '到达与停留',
        frame: '抵达之后，实际发生什么。',
        cards: [
          {
            title: '交通与到达',
            body: '研究旅行者如何选择到达方式，以及这个选择如何影响整趟行程。',
            methods: '线上问卷 · 深度访谈',
          },
          {
            title: '体验与住宿',
            body: '对照目的地所做的承诺，评估住宿、服务与当地体验。',
            methods: '深度访谈 · 线上问卷',
          },
        ],
      },
      {
        n: '04',
        name: '口碑与复访',
        frame: '会不会再来，会不会推荐。',
        cards: [
          {
            title: '推荐与复访',
            body: '测量推荐意愿与复访，并确定旅行者不再回来的原因。',
            methods: '追踪 · 线上问卷',
          },
          {
            title: '客群结构变化',
            body: '追踪旅行者结构如何随市场与季节变化。',
            methods: '追踪 · 电话访问',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['旅行者问卷', '面向曾到访或计划到访的旅行者的问卷，配额按客源市场、出行目的与消费水平设定。'],
      ['目的地深度访谈', '与旅行者及同业伙伴进行 45–60 分钟的一对一访谈，由研究人员执行。'],
      ['在线追踪', '按月或按季的追踪，指标固定，变化可对照同一套基数来读。'],
      ['电话访问（CATI）', '按脚本执行电话访问，配额按市场、客群或行程类型设定。'],
      ['价格测试', '对照争夺同一趟行程的目的地，测试价格预期与季节波动。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '旅遊與交通',
    lead: '面向目的地機構、酒店集團、交通營運方與旅遊零售：誰會來、一趟行程如何被決定、又是什麼讓人再來。',
    introKicker: '我們如何做',
    intro: [
      '一趟行程分幾步決定，每一步屬於不同的一方：目的地、承運方、酒店、代理。',
      '我們沿著這幾步研究旅行者：什麼讓一個目的地進入備選、什麼決定了預訂、抵達之後發生什麼、回去之後怎麼說。',
      '每項研究都圍繞它要支撐的決定來設計：開哪個客源市場、瞄準哪類客群、行程在哪一步失去旅行者。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '目的地與客群',
        frame: '誰會來、為什麼來、從哪裡來。',
        cards: [
          {
            title: '客源市場與客群',
            body: '按客源市場、出行目的與消費水準劃分旅行者，並在開市場之前把每一群的規模算清。',
            methods: '線上問卷 · 電話訪問',
          },
          {
            title: '目的地認知',
            body: '確定目的地以什麼被記住，又是什麼讓它進不了備選。',
            methods: '線上問卷 · 深度訪談',
          },
        ],
      },
      {
        n: '02',
        name: '決策與預訂',
        frame: '從備選到下單，中間經過哪幾步。',
        cards: [
          {
            title: '出行決策',
            body: '跟著一趟行程走：從目的地備選到預訂，以及目的地或營運商在哪一步掉出局。',
            methods: '線上問卷 · 深度訪談',
          },
          {
            title: '價格與季節',
            body: '對照爭奪同一趟行程的其他目的地，測試價格預期與季節波動。',
            methods: '價格測試 · 線上問卷',
          },
        ],
      },
      {
        n: '03',
        name: '到達與停留',
        frame: '抵達之後，實際發生什麼。',
        cards: [
          {
            title: '交通與到達',
            body: '研究旅行者如何選擇到達方式，以及這個選擇如何影響整趟行程。',
            methods: '線上問卷 · 深度訪談',
          },
          {
            title: '體驗與住宿',
            body: '對照目的地所做的承諾，評估住宿、服務與當地體驗。',
            methods: '深度訪談 · 線上問卷',
          },
        ],
      },
      {
        n: '04',
        name: '口碑與復訪',
        frame: '會不會再來，會不會推薦。',
        cards: [
          {
            title: '推薦與復訪',
            body: '測量推薦意願與復訪，並確定旅行者不再回來的原因。',
            methods: '追蹤 · 線上問卷',
          },
          {
            title: '客群結構變化',
            body: '追蹤旅行者結構如何隨市場與季節變化。',
            methods: '追蹤 · 電話訪問',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['旅行者問卷', '面向曾到訪或計劃到訪的旅行者的問卷，配額按客源市場、出行目的與消費水準設定。'],
      ['目的地深度訪談', '與旅行者及同業夥伴進行 45–60 分鐘的一對一訪談，由研究人員執行。'],
      ['線上追蹤', '按月或按季的追蹤，指標固定，變化可對照同一套基數來讀。'],
      ['電話訪問（CATI）', '按腳本執行電話訪問，配額按市場、客群或行程類型設定。'],
      ['價格測試', '對照爭奪同一趟行程的目的地，測試價格預期與季節波動。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryTravel() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--travel">
      <section className="ind-hero ind-hero--travel">
        <img src={travelImage} alt="" decoding="async" />
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
          <p className="ind-kicker ind-kicker--center">{c.methodsKicker}</p>
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
