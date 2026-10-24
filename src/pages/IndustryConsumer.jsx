import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import consumerImage from '../assets/industries/consumer-hero.jpg';
import './IndustryPage.css';

/* 行业页——零售与快消品。2026-10-25。

   从原来的"消费品与零售"改：线上购物者、篮子、平台那部分已移到"电商与购物者"，
   这一页只留品类、包装与价格、货架与门店、品牌与复购。
   依据：饮料 CLT、包装面粉 10 天留置、护肤品月度追踪、电商追踪（仅作品类背景）。
   口径：无数字、不点名岗位、不与其他方法比较、每卡一到两句、拒绝俏皮话。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Retail & FMCG',
    lead: 'Research for retailers and for food, drink and household brands: how the category is changing, what the pack has to do, and what happens on the shelf.',
    introKicker: 'How we work',
    intro: [
      'Retail and fast-moving goods meet in the same aisle: the brand decides the pack and the price, the retailer decides the space and the position.',
      'We study the category, the pack and the shelf separately, because each is decided by a different team and on a different timetable.',
      'Each study is designed around the decision it has to support: which pack to launch, what price the shelf will carry, and how the brand holds its place. Design, sample and reporting follow from that question.',
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
            body: 'Size the category and the adjacent ones, and establish where demand comes from and what it replaces.',
            methods: 'Online survey · CATI',
          },
          {
            title: 'Price tiers and pack',
            body: 'Test price tiers and pack formats before the listing negotiation.',
            methods: 'Pack tests · price tests',
          },
        ],
      },
      {
        n: '02',
        name: 'Pack and price',
        frame: 'What the pack has to do, and whether the price holds.',
        cards: [
          {
            title: 'Pack testing',
            body: 'Test pack design and on-pack claims with the shoppers who have to find it.',
            methods: 'Central location tests · pack stimuli',
          },
          {
            title: 'Pricing and promotion',
            body: 'Test price points and promotion mechanics against what shoppers will pay.',
            methods: 'Price tests · online survey',
          },
        ],
      },
      {
        n: '03',
        name: 'Shelf and store',
        frame: 'How the product is seen in the aisle.',
        cards: [
          {
            title: 'Shelf visibility',
            body: 'Test facings, blocking and shelf layout in a controlled shelf, and record what shoppers find first.',
            methods: 'Central location tests',
          },
          {
            title: 'In-store experience',
            body: 'Study the store visit: how the shopper moves through the aisle, and what interrupts the purchase.',
            methods: 'In-depth interviews · CAPI',
          },
        ],
      },
      {
        n: '04',
        name: 'Brand and repeat',
        frame: 'Whether the brand holds, and whether the buyer returns.',
        cards: [
          {
            title: 'Brand health',
            body: 'Track awareness, consideration and recommendation against the brands actually compared.',
            methods: 'Online tracking · fixed measures',
          },
          {
            title: 'Repeat and churn',
            body: 'Track repeat purchase and the reasons a buyer stops.',
            methods: 'Tracking · CATI',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Central location tests', 'Pack and shelf tests run at a central location, with shelf layouts built for the category.'],
      ['Product and pack tests', 'Product and pack tests, run at a central location or in the home.'],
      ['Consumer face-to-face (CAPI)', 'Structured interviews at a central location or in store, for shoppers who are difficult to reach online.'],
      ['Online survey', 'Survey of shoppers, with quotas by channel, city and category spend.'],
      ['CATI', 'Scripted telephone interviews, with quotas set by city, channel or customer type.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '零售与快消品',
    lead: '面向零售商与食品、饮料、日化品牌：品类如何变化、包装要完成什么、货架上实际发生什么。',
    introKicker: '我们如何做',
    intro: [
      '零售与快消在同一条货架前相遇：品牌决定包装与价格，零售商决定排面与位置。',
      '我们把品类、包装与货架分开研究，因为这三件事由不同团队决定，节奏也不同。',
      '每项研究都围绕它要支撑的决定来设计：上哪个包装、这个价格货架能不能承受、品牌如何守住位置。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '品类与需求',
        frame: '需求从哪来，替代了什么。',
        cards: [
          {
            title: '品类机会',
            body: '把品类及相邻品类算清规模，确定需求来源与替代关系。',
            methods: '线上问卷 · 电话访问',
          },
          {
            title: '价格带与包装',
            body: '在进场谈判之前，测试价格带与包装规格。',
            methods: '包装测试 · 价格测试',
          },
        ],
      },
      {
        n: '02',
        name: '包装与价格',
        frame: '包装要完成什么，价格守不守得住。',
        cards: [
          {
            title: '包装测试',
            body: '用必须在货架上找到它的购物者，测试包装设计与包装上的信息。',
            methods: '中心地点测试 · 包装素材',
          },
          {
            title: '定价与促销',
            body: '以购物者的支付意愿为基准，测试价格点与促销机制。',
            methods: '价格测试 · 线上问卷',
          },
        ],
      },
      {
        n: '03',
        name: '货架与门店',
        frame: '在货架前，它如何被看见。',
        cards: [
          {
            title: '货架可见性',
            body: '在受控的货架布局中测试排面、陈列与位置，记录购物者第一眼找到的是什么。',
            methods: '中心地点测试',
          },
          {
            title: '店内体验',
            body: '研究一次到店：购物者如何在货架前移动，什么打断了购买。',
            methods: '深度访谈 · 消费者面访',
          },
        ],
      },
      {
        n: '04',
        name: '品牌与复购',
        frame: '品牌站不站得住，买家回不回来。',
        cards: [
          {
            title: '品牌健康',
            body: '追踪认知、考虑与推荐，对标的是买家真正会比较的品牌。',
            methods: '在线追踪 · 指标固定',
          },
          {
            title: '复购与流失',
            body: '追踪复购，以及买家不再购买的原因。',
            methods: '追踪 · 电话访问',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['中心地点测试', '在中心地点进行的包装与货架测试，货架布局按品类搭建。'],
      ['产品与包装测试', '在中心地点或消费者家中，测试产品与包装。'],
      ['消费者面访（CAPI）', '在中心地点或门店内进行的面对面结构访问，用于线上难以触达的购物者。'],
      ['线上问卷', '面向购物者的问卷，配额按渠道、城市与品类消费设定。'],
      ['电话访问（CATI）', '按脚本执行电话访问，配额按城市、渠道或客户类型设定。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '零售與快消品',
    lead: '面向零售商與食品、飲料、日化品牌：品類如何變化、包裝要完成什麼、貨架上實際發生什麼。',
    introKicker: '我們如何做',
    intro: [
      '零售與快消在同一條貨架前相遇：品牌決定包裝與價格，零售商決定排面與位置。',
      '我們把品類、包裝與貨架分開研究，因為這三件事由不同團隊決定，節奏也不同。',
      '每項研究都圍繞它要支撐的決定來設計：上哪個包裝、這個價格貨架能不能承受、品牌如何守住位置。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '品類與需求',
        frame: '需求從哪來，替代了什麼。',
        cards: [
          {
            title: '品類機會',
            body: '把品類及相鄰品類算清規模，確定需求來源與替代關係。',
            methods: '線上問卷 · 電話訪問',
          },
          {
            title: '價格帶與包裝',
            body: '在進場談判之前，測試價格帶與包裝規格。',
            methods: '包裝測試 · 價格測試',
          },
        ],
      },
      {
        n: '02',
        name: '包裝與價格',
        frame: '包裝要完成什麼，價格守不守得住。',
        cards: [
          {
            title: '包裝測試',
            body: '用必須在貨架上找到它的購物者，測試包裝設計與包裝上的訊息。',
            methods: '中心地點測試 · 包裝素材',
          },
          {
            title: '定價與促銷',
            body: '以購物者的支付意願為基準，測試價格點與促銷機制。',
            methods: '價格測試 · 線上問卷',
          },
        ],
      },
      {
        n: '03',
        name: '貨架與門店',
        frame: '在貨架前，它如何被看見。',
        cards: [
          {
            title: '貨架可見性',
            body: '在受控的貨架佈局中測試排面、陳列與位置，記錄購物者第一眼找到的是什麼。',
            methods: '中心地點測試',
          },
          {
            title: '店內體驗',
            body: '研究一次到店：購物者如何在貨架前移動，什麼打斷了購買。',
            methods: '深度訪談 · 消費者面訪',
          },
        ],
      },
      {
        n: '04',
        name: '品牌與複購',
        frame: '品牌站不站得住，買家回不回來。',
        cards: [
          {
            title: '品牌健康',
            body: '追蹤認知、考慮與推薦，對標的是買家真正會比較的品牌。',
            methods: '線上追蹤 · 指標固定',
          },
          {
            title: '複購與流失',
            body: '追蹤複購，以及買家不再購買的原因。',
            methods: '追蹤 · 電話訪問',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['中心地點測試', '在中心地點進行的包裝與貨架測試，貨架佈局按品類搭建。'],
      ['產品與包裝測試', '在中心地點或消費者家中，測試產品與包裝。'],
      ['消費者面訪（CAPI）', '在中心地點或門店內進行的面對面結構訪問，用於線上難以觸達的購物者。'],
      ['線上問卷', '面向購物者的問卷，配額按渠道、城市與品類消費設定。'],
      ['電話訪問（CATI）', '按腳本執行電話訪問，配額按城市、渠道或客戶類型設定。'],
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
