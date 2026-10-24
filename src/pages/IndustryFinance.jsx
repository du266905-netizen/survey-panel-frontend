import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import financeImage from '../assets/industries/finance-hero.jpg';
import './IndustryPage.css';

/* 行业页——金融与财富管理。2026-10-24。

   壳与字号同前四页；主线按客户决策链：客群与资产 → 顾问与渠道 → 产品与定价 → 体验与留存。
   依据见 docs/COPY-SOURCES-2026-10-24-industries.md：供应商三个财富类案例 + 行业术语
   （share of wallet、willingness-to-pay / price-sensitivity 模型）。
   口径同前四页：无数字、不点名受访岗位、不与其他方法比较、每卡一到两句。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Financial services & wealth',
    lead: 'Research for banks, wealth managers and fintechs: what clients trust, what they will pay for, and why they leave.',
    introKicker: 'How we work',
    intro: [
      'Trust in financial services is built slowly and lost in a single interaction: a fee that was not explained, a transfer that failed, a call that was not answered.',
      'We study the client and the advisor separately: how investors compare and decide, what they will pay for, what advisors recommend and why, and where the experience breaks.',
      'Each study is designed around the decision it has to support — whether to enter a segment, how to price a product, which channel carries growth, and why clients leave. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Customer and assets',
        frame: 'Who the client is, and where the assets sit.',
        cards: [
          {
            title: 'Affluent segmentation',
            body: 'Segment clients by investable assets, product holding and market, and size each group before the proposition is built.',
            methods: 'HNW sample · online survey',
          },
          {
            title: 'Investment behaviour and trust',
            body: 'Understand how investors decide, what they trust, and how a recommendation is followed or ignored.',
            methods: 'In-depth interviews · CATI',
          },
        ],
      },
      {
        n: '02',
        name: 'Advisors and distribution',
        frame: 'Who recommends, and through which platform.',
        cards: [
          {
            title: 'Advisor ecosystem',
            body: 'How advisors and distribution partners use platforms, and where digital tools change what they recommend.',
            methods: 'Advisor in-depth interviews',
          },
          {
            title: 'Share of wallet',
            body: 'Establish how much of a client’s assets sit with one provider, and what moves the rest.',
            methods: 'HNW survey · advisor interviews',
          },
        ],
      },
      {
        n: '03',
        name: 'Product and pricing',
        frame: 'What it costs, and what it is worth.',
        cards: [
          {
            title: 'Pricing and fees',
            body: 'Test fee structures and price points against willingness to pay, before the proposition is launched.',
            methods: 'Price sensitivity models · HNW survey',
          },
          {
            title: 'Product and feature testing',
            body: 'Test propositions and platform features with the clients they are built for.',
            methods: 'Concept and A/B testing',
          },
        ],
      },
      {
        n: '04',
        name: 'Experience and retention',
        frame: 'Whether the client stays, and why not.',
        cards: [
          {
            title: 'Client experience',
            body: 'Measure the client experience and the drivers of switching among wealth clients.',
            methods: 'Online survey · in-depth interviews',
          },
          {
            title: 'Retention and churn',
            body: 'Track retention, share of wallet and the reasons clients leave.',
            methods: 'Tracking · CATI',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['HNW sample', 'Clients recruited through verified wealth panels and referral, screened by investable assets, product holding and market.'],
      ['Advisor in-depth interviews', 'Interviews of 45 to 60 minutes with advisors, family office and platform staff, run one to one by the research team.'],
      ['Online survey', 'Survey of clients or prospects, with quotas by assets, product holding and market.'],
      ['CATI', 'Scripted telephone interviews, with quotas set by market, product holding or client segment. Used where the list is defined.'],
      ['Price sensitivity models', 'Willingness-to-pay and price-sensitivity models, reported as a range with the assumptions stated.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '金融与财富管理',
    lead: '面向银行、财富管理机构与金融科技：客户信什么、愿意为什么付钱、又为什么离开。',
    introKicker: '我们怎么做',
    intro: [
      '金融里的信任建得很慢，丢起来只在一瞬间：一笔没讲清的费用、一次没到账的转账、一个没人接的电话。',
      '我们把客户和顾问分开研究：投资者怎么比较、怎么决定、愿意为什么付钱，顾问推荐什么、为什么推荐，以及体验在哪一步断掉。',
      '每项研究都围绕它要支撑的决定来设计：要不要进一个客群、产品怎么定价、哪个渠道带来增长、客户为什么离开。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '客群与资产',
        frame: '客户是谁，资产在哪里。',
        cards: [
          {
            title: '高净值客群分层',
            body: '按可投资资产、持有产品与市场划分客群，并在产品设计之前把每一群的规模算清。',
            methods: '高净值样本 · 线上问卷',
          },
          {
            title: '投资行为与信任',
            body: '了解投资者如何决定、相信什么，以及一条建议是被采纳还是被忽略。',
            methods: '深度访谈 · 电话访问',
          },
        ],
      },
      {
        n: '02',
        name: '顾问与渠道',
        frame: '谁在推荐，通过什么平台。',
        cards: [
          {
            title: '顾问生态',
            body: '顾问与分销伙伴如何使用平台，数字化工具又在哪一步改变了他们的推荐。',
            methods: '顾问深度访谈',
          },
          {
            title: '钱包份额',
            body: '弄清一位客户的资产有多少放在同一家机构，什么能让其余部分转过来。',
            methods: '高净值问卷 · 顾问访谈',
          },
        ],
      },
      {
        n: '03',
        name: '产品与定价',
        frame: '收多少，值不值。',
        cards: [
          {
            title: '定价与费用',
            body: '在产品上线之前，用支付意愿测试费用结构与价格点。',
            methods: '价格敏感度模型 · 高净值问卷',
          },
          {
            title: '产品与功能测试',
            body: '用产品真正服务的那批客户，测试方案与平台功能。',
            methods: '概念与 A/B 测试',
          },
        ],
      },
      {
        n: '04',
        name: '体验与留存',
        frame: '客户留不留得住，为什么走。',
        cards: [
          {
            title: '客户体验',
            body: '测量财富客户的体验，以及促使他们换机构的原因。',
            methods: '线上问卷 · 深度访谈',
          },
          {
            title: '留存与流失',
            body: '追踪留存、钱包份额，以及客户离开的原因。',
            methods: '追踪 · 电话访问',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['高净值样本', '通过核实过的高净值样本库与转介绍招募，按可投资资产、持有产品与市场筛选。'],
      ['顾问深度访谈', '与顾问、家族办公室及平台人员做 45–60 分钟一对一访谈，由研究人员执行。'],
      ['线上问卷', '面向客户或潜在客户的问卷，配额按资产、持有产品与市场设定。'],
      ['电话访问（CATI）', '按脚本执行电话访问，配额按市场、持有产品或客群设定。用于名单明确的项目。'],
      ['价格敏感度模型', '支付意愿与价格敏感度模型，结果以价格区间呈现，并写明所依据的假设。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '金融與財富管理',
    lead: '面向銀行、財富管理機構與金融科技：客戶信什麼、願意為什麼付錢、又為什麼離開。',
    introKicker: '我們怎麼做',
    intro: [
      '金融裡的信任建得很慢，丟起來只在一瞬間：一筆沒講清的費用、一次沒到帳的轉帳、一個沒人接的電話。',
      '我們把客戶和顧問分開研究：投資者怎麼比較、怎麼決定、願意為什麼付錢，顧問推薦什麼、為什麼推薦，以及體驗在哪一步斷掉。',
      '每項研究都圍繞它要支撐的決定來設計：要不要進一個客群、產品怎麼定價、哪個渠道帶來增長、客戶為什麼離開。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '客群與資產',
        frame: '客戶是誰，資產在哪裡。',
        cards: [
          {
            title: '高淨值客群分層',
            body: '按可投資資產、持有產品與市場劃分客群，並在產品設計之前把每一群的規模算清。',
            methods: '高淨值樣本 · 線上問卷',
          },
          {
            title: '投資行為與信任',
            body: '了解投資者如何決定、相信什麼，以及一條建議是被採納還是被忽略。',
            methods: '深度訪談 · 電話訪問',
          },
        ],
      },
      {
        n: '02',
        name: '顧問與渠道',
        frame: '誰在推薦，透過什麼平台。',
        cards: [
          {
            title: '顧問生態',
            body: '顧問與分銷夥伴如何使用平台，數位工具又在哪一步改變了他們的推薦。',
            methods: '顧問深度訪談',
          },
          {
            title: '錢包份額',
            body: '弄清一位客戶的資產有多少放在同一家機構，什麼能讓其餘部分轉過來。',
            methods: '高淨值問卷 · 顧問訪談',
          },
        ],
      },
      {
        n: '03',
        name: '產品與定價',
        frame: '收多少，值不值。',
        cards: [
          {
            title: '定價與費用',
            body: '在產品上線之前，用支付意願測試費用結構與價格點。',
            methods: '價格敏感度模型 · 高淨值問卷',
          },
          {
            title: '產品與功能測試',
            body: '用產品真正服務的那批客戶，測試方案與平台功能。',
            methods: '概念與 A/B 測試',
          },
        ],
      },
      {
        n: '04',
        name: '體驗與留存',
        frame: '客戶留不留得住，為什麼走。',
        cards: [
          {
            title: '客戶體驗',
            body: '測量財富客戶的體驗，以及促使他們換機構的原因。',
            methods: '線上問卷 · 深度訪談',
          },
          {
            title: '留存與流失',
            body: '追蹤留存、錢包份額，以及客戶離開的原因。',
            methods: '追蹤 · 電話訪問',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['高淨值樣本', '透過核實過的高淨值樣本庫與轉介紹招募，按可投資資產、持有產品與市場篩選。'],
      ['顧問深度訪談', '與顧問、家族辦公室及平台人員做 45–60 分鐘一對一訪談，由研究人員執行。'],
      ['線上問卷', '面向客戶或潛在客戶的問卷，配額按資產、持有產品與市場設定。'],
      ['電話訪問（CATI）', '按腳本執行電話訪問，配額按市場、持有產品或客群設定。用於名單明確的專案。'],
      ['價格敏感度模型', '支付意願與價格敏感度模型，結果以價格區間呈現，並寫明所依據的假設。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryFinance() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

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
