import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import ecommerceImage from '../assets/industries/ecommerce-hero.jpg';
import './IndustryPage.css';

/* 行业页——电商与购物者。2026-10-25。

   从"消费品与零售"里拆出的渠道与购物者侧：平台、发现、购物篮、复购。
   品类与品牌侧仍在"零售与快消品"页。
   依据：全球电商购物者追踪（8 国、按年 12,000 人）、购物篮与免邮门槛发现。
   口径同前九页：无数字、不点名岗位、不与其他方法比较、每卡一到两句。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'E-commerce & shopper',
    lead: 'Research for marketplaces, brands and retailers selling online: where the shopper finds the product, what is in the basket, and why they come back to one platform.',
    introKicker: 'How we work',
    intro: [
      'Online, the shelf is a search result, and the shopper compares more listings in less time than any store allows.',
      'We study the path as it happens: how a product is found, what the listing communicates, what enters the basket, and where the purchase stops.',
      'Each study is designed around the decision it has to support: which platform to prioritise, how to price against the listing beside it, and what makes a shopper return. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Platform and category',
        frame: 'Where the category is bought, and against what.',
        cards: [
          {
            title: 'Platform choice',
            body: 'Establish where the category is bought, and how platform choice shifts by market and by buyer.',
            methods: 'Shopper tracker · online survey',
          },
          {
            title: 'Category and price',
            body: 'Test price tiers and pack sizes against the listings they appear beside.',
            methods: 'Online survey · price tests',
          },
        ],
      },
      {
        n: '02',
        name: 'Discovery and listing',
        frame: 'How the product is found, and what the listing says.',
        cards: [
          {
            title: 'Search and discovery',
            body: 'Study how shoppers find the product — search, listing order, recommendation — and what they pass over.',
            methods: 'Online survey · in-depth interviews',
          },
          {
            title: 'Listing and imagery',
            body: 'Test product pages, images and reviews for what they communicate before the click.',
            methods: 'Concept and A/B testing',
          },
        ],
      },
      {
        n: '03',
        name: 'Basket and checkout',
        frame: 'What goes in, and where the purchase stops.',
        cards: [
          {
            title: 'Basket and abandonment',
            body: 'Measure what enters the basket, what is abandoned, and at which step.',
            methods: 'Shopper tracker · online survey',
          },
          {
            title: 'Delivery and returns',
            body: 'Establish what delivery cost, timing and returns policy do to completion.',
            methods: 'Online survey · A/B testing',
          },
        ],
      },
      {
        n: '04',
        name: 'Repeat and loyalty',
        frame: 'Why the shopper returns to one platform.',
        cards: [
          {
            title: 'Repeat purchase',
            body: 'Track repeat purchase and the reasons a shopper returns to the same platform.',
            methods: 'Tracker · CATI',
          },
          {
            title: 'Promotions and membership',
            body: 'Test how promotions and membership change basket size and purchase frequency.',
            methods: 'Tracker · online survey',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Shopper tracker', 'Monthly or quarterly tracking on fixed measures, so movement can be read against the same base.'],
      ['Online survey', 'Survey of online shoppers, with quotas by platform, category and market.'],
      ['In-depth interviews', 'Depth interviews of 45 to 60 minutes with shoppers, run one to one by the research team.'],
      ['Concept and A/B testing', 'Listings, images and checkout steps tested on comparable samples, one variable at a time.'],
      ['Price tests', 'Price points and delivery thresholds tested against willingness to pay.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '电商与购物者',
    lead: '面向平台、品牌与线上零售商：购物者如何找到商品、篮子里放了什么、又为何回到同一个平台。',
    introKicker: '我们如何做',
    intro: [
      '线上没有货架，只有搜索结果：购物者在更短的时间里，比较比任何一家门店都多的商品。',
      '我们按路径的顺序研究：商品如何被发现、页面传达了什么、什么进了篮子、又在哪里停止下单。',
      '每项研究都围绕它要支撑的决定来设计：该优先哪个平台、如何对着旁边的商品定价、什么让购物者回头。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '平台与品类',
        frame: '这个品类在哪里买，与哪些商品并列展示。',
        cards: [
          {
            title: '平台选择',
            body: '确定品类在哪些平台成交，以及平台选择如何随市场与买家变化。',
            methods: '购物者追踪 · 线上问卷',
          },
          {
            title: '品类与价格',
            body: '对照与它并排展示的商品，测试价格带与规格。',
            methods: '线上问卷 · 价格测试',
          },
        ],
      },
      {
        n: '02',
        name: '发现与页面',
        frame: '商品如何被找到，页面说了什么。',
        cards: [
          {
            title: '搜索与发现',
            body: '研究购物者如何找到商品——搜索、排序、推荐——以及他们忽视了哪些信息。',
            methods: '线上问卷 · 深度访谈',
          },
          {
            title: '页面与图片',
            body: '测试商品页、图片与评价在点击之前传达了哪些信息。',
            methods: '概念与 A/B 测试',
          },
        ],
      },
      {
        n: '03',
        name: '购物篮与结算',
        frame: '什么进了篮子，下单在哪个环节中断。',
        cards: [
          {
            title: '购物篮与放弃',
            body: '测量什么进入购物篮、什么被放弃，以及发生在哪一步。',
            methods: '购物者追踪 · 线上问卷',
          },
          {
            title: '配送与退货',
            body: '确定运费、时效与退货政策对完成下单的影响。',
            methods: '线上问卷 · A/B 测试',
          },
        ],
      },
      {
        n: '04',
        name: '复购与忠诚',
        frame: '购物者为何回到同一个平台。',
        cards: [
          {
            title: '复购行为',
            body: '追踪复购，以及购物者回到同一平台的原因。',
            methods: '追踪 · 电话访问',
          },
          {
            title: '促销与会员',
            body: '测试促销与会员机制如何改变篮子大小与购买频次。',
            methods: '追踪 · 线上问卷',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['购物者追踪', '按月或按季的追踪，指标固定，变化可对照同一套基数来读。'],
      ['线上问卷', '面向线上购物者的问卷，配额按平台、品类与市场设定。'],
      ['深度访谈', '由研究人员一对一进行 45–60 分钟的购物者访谈。'],
      ['概念与 A/B 测试', '把商品页、图片与结算步骤放在可比样本上测试，每次只改变一个变量。'],
      ['价格测试', '用支付意愿测试价格点与免邮门槛。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '電商與購物者',
    lead: '面向平台、品牌與線上零售商：購物者如何找到商品、籃子裡放了什麼、又為何回到同一個平台。',
    introKicker: '我們如何做',
    intro: [
      '線上沒有貨架，只有搜尋結果：購物者在更短的時間裡，比較比任何一家門店都多的商品。',
      '我們按路徑的順序研究：商品如何被發現、頁面傳達了什麼、什麼進了籃子、又在哪裡停止下單。',
      '每項研究都圍繞它要支撐的決定來設計：該優先哪個平台、如何對著旁邊的商品定價、什麼讓購物者回頭。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '平台與品類',
        frame: '這個品類在哪裡買，與哪些商品並列展示。',
        cards: [
          {
            title: '平台選擇',
            body: '確定品類在哪些平台成交，以及平台選擇如何隨市場與買家變化。',
            methods: '購物者追蹤 · 線上問卷',
          },
          {
            title: '品類與價格',
            body: '對照與它並排展示的商品，測試價格帶與規格。',
            methods: '線上問卷 · 價格測試',
          },
        ],
      },
      {
        n: '02',
        name: '發現與頁面',
        frame: '商品如何被找到，頁面說了什麼。',
        cards: [
          {
            title: '搜尋與發現',
            body: '研究購物者如何找到商品——搜尋、排序、推薦——以及他們略過了什麼。',
            methods: '線上問卷 · 深度訪談',
          },
          {
            title: '頁面與圖片',
            body: '測試商品頁、圖片與評價在點擊之前傳達了哪些訊息。',
            methods: '概念與 A/B 測試',
          },
        ],
      },
      {
        n: '03',
        name: '購物籃與結帳',
        frame: '什麼進了籃子，下單在哪個環節中斷。',
        cards: [
          {
            title: '購物籃與放棄',
            body: '測量什麼進入購物籃、什麼被放棄，以及發生在哪一步。',
            methods: '購物者追蹤 · 線上問卷',
          },
          {
            title: '配送與退貨',
            body: '確定運費、時效與退貨政策對完成下單的影響。',
            methods: '線上問卷 · A/B 測試',
          },
        ],
      },
      {
        n: '04',
        name: '複購與忠誠',
        frame: '購物者為何回到同一個平台。',
        cards: [
          {
            title: '複購行為',
            body: '追蹤複購，以及購物者回到同一平台的原因。',
            methods: '追蹤 · 電話訪問',
          },
          {
            title: '促銷與會員',
            body: '測試促銷與會員機制如何改變籃子大小與購買頻次。',
            methods: '追蹤 · 線上問卷',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['購物者追蹤', '按月或按季的追蹤，指標固定，變化可對照同一套基數來讀。'],
      ['線上問卷', '面向線上購物者的問卷，配額按平台、品類與市場設定。'],
      ['深度訪談', '由研究人員一對一進行 45–60 分鐘的購物者訪談。'],
      ['概念與 A/B 測試', '把商品頁、圖片與結帳步驟放在可比樣本上測試，每次只改變一個變數。'],
      ['價格測試', '用支付意願測試價格點與免運門檻。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryEcommerce() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--ecommerce">
      <section className="ind-hero ind-hero--ecommerce">
        <img src={ecommerceImage} alt="" decoding="async" />
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
