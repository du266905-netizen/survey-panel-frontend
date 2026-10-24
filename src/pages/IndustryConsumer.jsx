import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import consumerImage from '../assets/industries/consumer-hero.jpg';
import './IndustryPage.css';

/* 行业页——消费品与零售。2026-10-24。

   同一个壳与字号；主线按"品类 → 货架 → 路径 → 复购"走，
   与汽车页（产品生命周期）、奢侈品页（客群决策路径）区分开。

   口径同前两页：只用陈述句；不写数字与交付承诺；不点名岗位；
   不与其他方法比较；每张卡一到两句，只写范围与产出。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Consumer & retail',
    lead: 'Research for consumer brands and retailers: what the category is doing, what happens on the shelf, and why the basket changes.',
    introKicker: 'How we work',
    intro: [
      'Categories move faster than annual plans. Pack sizes, price tiers and channels change within a year, and the shopper compares across all three.',
      'We study the decision where it happens: at the shelf, in the basket, and in the repeat purchase that follows.',
      'Each study is designed around the decision it has to support — whether to list a pack, how to price it, which channel carries the volume, and why the buyer does not come back. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Category and demand',
        frame: 'Where the demand comes from, and what it replaces.',
        cards: [
          {
            title: 'Category opportunity',
            body: 'Size the category and the adjacent ones, and test where demand comes from and what it substitutes.',
            methods: 'Online survey · CATI',
          },
          {
            title: 'Price tiers and pack',
            body: 'Test price points and pack formats before the listing negotiation.',
            methods: 'Concept and pack tests · in-context pricing',
          },
        ],
      },
      {
        n: '02',
        name: 'Brand and shelf',
        frame: 'What the shopper sees, and what the shelf says.',
        cards: [
          {
            title: 'Shelf and display',
            body: 'Test facings, layout and signage in a real shelf context, and record what the shopper notices first.',
            methods: 'Store checks · in-context tests',
          },
          {
            title: 'Promotion and price response',
            body: 'Measure the response to price and promotion, and how much of the lift remains afterwards.',
            methods: 'Store checks · online survey',
          },
        ],
      },
      {
        n: '03',
        name: 'Shopper journey',
        frame: 'Where the trip starts, and where the basket is decided.',
        cards: [
          {
            title: 'Online and in store',
            body: 'Follow the path from search and browse to basket, across retail and e-commerce.',
            methods: 'Online survey · in-depth interviews',
          },
          {
            title: 'Basket and bundling',
            body: 'Establish what is bought together, and which items drive the trip.',
            methods: 'Basket analysis · online survey',
          },
        ],
      },
      {
        n: '04',
        name: 'Repeat and loyalty',
        frame: 'Whether the buyer comes back, and why not.',
        cards: [
          {
            title: 'Repeat purchase and churn',
            body: 'Track repeat purchase and the reasons a buyer stops.',
            methods: 'Tracking · CATI',
          },
          {
            title: 'Brand health',
            body: 'Track awareness, consideration and recommendation against the brands actually compared.',
            methods: 'Online tracking · fixed measures',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Store checks and display audits', 'Visits to a defined store sample, recording display, facings, price and stock against the plan.'],
      ['Product and pack tests', 'Tests of the product, the pack and the price, run at a central location or in the home.'],
      ['Online survey', 'Survey of target shoppers, with quotas set by channel, city or category spend. Used where the sample is large and turnaround matters.'],
      ['CATI', 'Scripted telephone interviews, with quotas set by city, channel or customer type. Used where the list is defined.'],
      ['In-depth interviews', 'Depth interviews of 45 to 60 minutes, run one to one by the research team.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '消费品与零售',
    lead: '面向消费品品牌与零售商：品类在发生什么、货架上发生了什么、购物篮为什么变。',
    introKicker: '我们怎么做',
    intro: [
      '品类的变化快过年度计划。包装规格、价格带与渠道一年之内就会变，购物者会在三者之间来回比较。',
      '我们研究决策发生的地方：货架前、购物篮里，以及之后的复购。',
      '每项研究都围绕它要支撑的决定来设计：要不要上一个规格、定什么价、哪个渠道走量、买家为什么不回来。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '品类与需求',
        frame: '需求从哪来，替代了什么。',
        cards: [
          {
            title: '品类机会与替代',
            body: '把品类及相邻品类算清规模，测试需求从哪来、替代了什么。',
            methods: '线上问卷 · 电话访问',
          },
          {
            title: '价格带与包装',
            body: '在进场谈判之前，测试价格点与包装规格。',
            methods: '概念与包装测试 · 带价格的场景测试',
          },
        ],
      },
      {
        n: '02',
        name: '品牌与货架',
        frame: '购物者看到什么，货架说了什么。',
        cards: [
          {
            title: '货架与陈列',
            body: '在真实货架语境里测试排面、布局与标识，并记录购物者第一眼看的是什么。',
            methods: '门店走访 · 场景测试',
          },
          {
            title: '促销与价格反应',
            body: '测量对价格与促销的反应，以及促销结束后还留下多少。',
            methods: '门店走访 · 线上问卷',
          },
        ],
      },
      {
        n: '03',
        name: '购物者路径',
        frame: '这一趟从哪开始，购物篮在哪一步定下来。',
        cards: [
          {
            title: '线上与线下',
            body: '从搜索、浏览到放进购物篮，跨零售与电商跟一遍。',
            methods: '线上问卷 · 深度访谈',
          },
          {
            title: '购物篮与搭配',
            body: '弄清什么被一起买走，哪些商品决定了这一趟。',
            methods: '购物篮分析 · 线上问卷',
          },
        ],
      },
      {
        n: '04',
        name: '复购与忠诚',
        frame: '买家回不回来，不回来是为什么。',
        cards: [
          {
            title: '复购与流失',
            body: '追踪复购，以及买家停止购买的原因。',
            methods: '追踪 · 电话访问',
          },
          {
            title: '品牌健康',
            body: '追踪认知、考虑与推荐，对标的是买家真正会比较的品牌。',
            methods: '在线追踪 · 指标固定',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['门店走访与陈列核查', '按设定的门店样本实地走访，记录陈列、排面、价格与库存是否按计划执行。'],
      ['产品与包装测试', '在中心地点或消费者家中，测试产品、包装与价格。'],
      ['线上问卷', '面向目标购物者的在线问卷，配额按渠道、城市或品类消费设定。用于样本量大、回收节奏紧的项目。'],
      ['电话访问（CATI）', '按脚本执行电话访问，配额按城市、渠道或客户类型设定。用于名单明确的项目。'],
      ['深度访谈', '由研究人员一对一进行 45–60 分钟的深度访谈。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '消費品與零售',
    lead: '面向消費品品牌與零售商：品類在發生什麼、貨架上發生了什麼、購物籃為什麼變。',
    introKicker: '我們怎麼做',
    intro: [
      '品類的變化快過年度計畫。包裝規格、價格帶與渠道一年之內就會變，購物者會在三者之間來回比較。',
      '我們研究決策發生的地方：貨架前、購物籃裡，以及之後的複購。',
      '每項研究都圍繞它要支撐的決定來設計：要不要上一個規格、定什麼價、哪個渠道走量、買家為什麼不回來。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '品類與需求',
        frame: '需求從哪來，替代了什麼。',
        cards: [
          {
            title: '品類機會與替代',
            body: '把品類及相鄰品類算清規模，測試需求從哪來、替代了什麼。',
            methods: '線上問卷 · 電話訪問',
          },
          {
            title: '價格帶與包裝',
            body: '在進場談判之前，測試價格點與包裝規格。',
            methods: '概念與包裝測試 · 帶價格的場景測試',
          },
        ],
      },
      {
        n: '02',
        name: '品牌與貨架',
        frame: '購物者看到什麼，貨架說了什麼。',
        cards: [
          {
            title: '貨架與陳列',
            body: '在真實貨架語境裡測試排面、佈局與標識，並記錄購物者第一眼看的是什麼。',
            methods: '門店走訪 · 場景測試',
          },
          {
            title: '促銷與價格反應',
            body: '測量對價格與促銷的反應，以及促銷結束後還留下多少。',
            methods: '門店走訪 · 線上問卷',
          },
        ],
      },
      {
        n: '03',
        name: '購物者路徑',
        frame: '這一趟從哪開始，購物籃在哪一步定下來。',
        cards: [
          {
            title: '線上與線下',
            body: '從搜尋、瀏覽到放進購物籃，跨零售與電商跟一遍。',
            methods: '線上問卷 · 深度訪談',
          },
          {
            title: '購物籃與搭配',
            body: '弄清什麼被一起買走，哪些商品決定了這一趟。',
            methods: '購物籃分析 · 線上問卷',
          },
        ],
      },
      {
        n: '04',
        name: '複購與忠誠',
        frame: '買家回不回來，不回來是為什麼。',
        cards: [
          {
            title: '複購與流失',
            body: '追蹤複購，以及買家停止購買的原因。',
            methods: '追蹤 · 電話訪問',
          },
          {
            title: '品牌健康',
            body: '追蹤認知、考慮與推薦，對標的是買家真正會比較的品牌。',
            methods: '線上追蹤 · 指標固定',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['門店走訪與陳列核查', '按設定的門店樣本實地走訪，記錄陳列、排面、價格與庫存是否按計畫執行。'],
      ['產品與包裝測試', '在中心地點或消費者家中，測試產品、包裝與價格。'],
      ['線上問卷', '面向目標購物者的線上問卷，配額按渠道、城市或品類消費設定。用於樣本量大、回收節奏緊的專案。'],
      ['電話訪問（CATI）', '按腳本執行電話訪問，配額按城市、渠道或客戶類型設定。用於名單明確的專案。'],
      ['深度訪談', '由研究人員一對一進行 45–60 分鐘的深度訪談。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryConsumer() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

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
