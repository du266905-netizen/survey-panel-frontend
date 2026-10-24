import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import techImage from '../assets/industries/tech-hero.jpg';
import './IndustryPage.css';

/* 行业页——科技。2026-10-24。

   主线按科技产品的节奏：产品与路线图 → 定价与订阅 → 品牌与竞争 → 采用与留存。
   依据：CIO 技术投资（B2B 科技样本库）、品牌安全、手游品牌健康、智能家居概念/A-B 测试。
   口径同前七页：无数字、不点名受访岗位（买家/用户为人群类别）、不与其他方法比较。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Technology',
    lead: 'Research for software, platform and device companies: what the roadmap should hold, what it should cost, and why users leave.',
    introKicker: 'How we work',
    intro: [
      'A technology product is decided before it ships: which features make the roadmap, which tier carries the price, and what the first weeks of use have to prove.',
      'We study buyers and users separately — the technical decision-maker who signs, and the person who has to use it — and the point where the two disagree.',
      'Each study is designed around the decision it has to support: what to build next, how to package it, why adoption stalls. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Product and roadmap',
        frame: 'What to build next, and what to leave out.',
        cards: [
          {
            title: 'Feature prioritisation',
            body: 'Establish which features would change a buying or usage decision, before they enter the roadmap.',
            methods: 'Concept tests · B2B sample',
          },
          {
            title: 'Concept validation',
            body: 'Test a concept with the buyers and users it is aimed at, before engineering time is committed.',
            methods: 'Concept and A/B testing',
          },
        ],
      },
      {
        n: '02',
        name: 'Pricing and subscription',
        frame: 'How it is packaged, and what each tier carries.',
        cards: [
          {
            title: 'Pricing and tiers',
            body: 'Test price points and tier boundaries against what buyers are willing to pay.',
            methods: 'Price tests · B2B sample',
          },
          {
            title: 'Packaging and usage',
            body: 'Establish whether seats, usage or features should carry the price.',
            methods: 'In-depth interviews · price tests',
          },
        ],
      },
      {
        n: '03',
        name: 'Brand and competition',
        frame: 'Whether the product is in the shortlist, and what it is known for.',
        cards: [
          {
            title: 'Brand and share of voice',
            body: 'Track awareness, consideration and recommendation against the platforms buyers actually compare.',
            methods: 'Online tracking · fixed measures',
          },
          {
            title: 'Competitive set',
            body: 'Map who is actually compared in a buying decision, which is rarely the list the category assumes.',
            methods: 'B2B survey · in-depth interviews',
          },
        ],
      },
      {
        n: '04',
        name: 'Adoption and retention',
        frame: 'Why users start, and why they stop.',
        cards: [
          {
            title: 'Onboarding and activation',
            body: 'Study the first weeks of use, and where new users fail to reach the value.',
            methods: 'User survey · in-depth interviews',
          },
          {
            title: 'Churn and retention',
            body: 'Establish why accounts leave, and which signals precede it.',
            methods: 'Tracking · CATI',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Technology buyer sample', 'Decision-makers in IT, product and procurement, screened by role, company size and technology stack.'],
      ['Concept testing', 'Concepts and features tested on comparable samples, with one variable changed at a time.'],
      ['Online survey', 'Survey of users or buyers, with quotas by role, company size and market.'],
      ['In-depth interviews', 'Depth interviews of 45 to 60 minutes with buyers or users, run one to one by the research team.'],
      ['Price tests', 'Price points and packaging tested against willingness to pay, reported with the assumptions stated.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '科技',
    lead: '面向软件、平台与设备厂商：路线图该放什么、该卖多少钱、用户为什么走。',
    introKicker: '我们怎么做',
    intro: [
      '科技产品在发布之前就已经被决定：哪些功能进路线图、哪一档承载价格、头几周的使用要证明什么。',
      '我们把买家和用户分开研究：签字的技术决策者，和必须每天用它的人，以及两者判断不一致的地方。',
      '每项研究都围绕它要支撑的决定来设计：下一步做什么、怎么打包、采用为什么卡住。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '产品与路线图',
        frame: '下一步做什么，以及不做什么。',
        cards: [
          {
            title: '功能优先级',
            body: '在功能进入路线图之前，弄清哪些会真正改变购买或使用决定。',
            methods: '概念测试 · 企业买家样本',
          },
          {
            title: '概念验证',
            body: '在投入工程资源之前，把概念拿给它的目标买家与用户测试。',
            methods: '概念与 A/B 测试',
          },
        ],
      },
      {
        n: '02',
        name: '定价与订阅',
        frame: '怎么打包，每一档装什么。',
        cards: [
          {
            title: '定价与档位',
            body: '用买家实际愿意付的价格，测试价格点与档位边界。',
            methods: '价格测试 · 企业买家样本',
          },
          {
            title: '打包与用量',
            body: '弄清价格应该由席位、用量还是功能来承载。',
            methods: '深度访谈 · 价格测试',
          },
        ],
      },
      {
        n: '03',
        name: '品牌与竞争',
        frame: '有没有进备选，别人怎么记住你。',
        cards: [
          {
            title: '品牌与声量',
            body: '追踪认知、考虑与推荐，对标的是买家真正会比较的那些平台。',
            methods: '在线追踪 · 指标固定',
          },
          {
            title: '竞争集合',
            body: '弄清一次采购里真正被比较的是谁，这通常不是品类自己以为的那几家。',
            methods: '企业问卷 · 深度访谈',
          },
        ],
      },
      {
        n: '04',
        name: '采用与留存',
        frame: '用户为什么开始，又为什么停。',
        cards: [
          {
            title: '上手与激活',
            body: '研究使用的头几周，以及新用户在哪一步没能走到价值。',
            methods: '用户问卷 · 深度访谈',
          },
          {
            title: '流失与留存',
            body: '弄清账户为什么离开，以及离开之前有哪些信号。',
            methods: '追踪 · 电话访问',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['技术买家样本', '按职位、公司规模与技术栈筛选的 IT、产品与采购决策者。'],
      ['概念测试', '把概念与功能放在可比样本上测试，每次只改变一个变量。'],
      ['线上问卷', '面向用户或买家的问卷，配额按职位、公司规模与市场设定。'],
      ['深度访谈', '由研究人员一对一进行 45–60 分钟的买家或用户访谈。'],
      ['价格测试', '用支付意愿测试价格点与打包方式，结果连同假设一并呈现。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '科技',
    lead: '面向軟體、平台與設備廠商：路線圖該放什麼、該賣多少錢、用戶為什麼走。',
    introKicker: '我們怎麼做',
    intro: [
      '科技產品在發布之前就已經被決定：哪些功能進路線圖、哪一檔承載價格、頭幾週的使用要證明什麼。',
      '我們把買家和用戶分開研究：簽字的技術決策者，和必須每天用它的人，以及兩者判斷不一致的地方。',
      '每項研究都圍繞它要支撐的決定來設計：下一步做什麼、怎麼打包、採用為什麼卡住。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '產品與路線圖',
        frame: '下一步做什麼，以及不做什麼。',
        cards: [
          {
            title: '功能優先級',
            body: '在功能進入路線圖之前，弄清哪些會真正改變購買或使用決定。',
            methods: '概念測試 · 企業買家樣本',
          },
          {
            title: '概念驗證',
            body: '在投入工程資源之前，把概念拿給它的目標買家與用戶測試。',
            methods: '概念與 A/B 測試',
          },
        ],
      },
      {
        n: '02',
        name: '定價與訂閱',
        frame: '怎麼打包，每一檔裝什麼。',
        cards: [
          {
            title: '定價與檔位',
            body: '用買家實際願意付的價格，測試價格點與檔位邊界。',
            methods: '價格測試 · 企業買家樣本',
          },
          {
            title: '打包與用量',
            body: '弄清價格應該由席位、用量還是功能來承載。',
            methods: '深度訪談 · 價格測試',
          },
        ],
      },
      {
        n: '03',
        name: '品牌與競爭',
        frame: '有沒有進備選，別人怎麼記住你。',
        cards: [
          {
            title: '品牌與聲量',
            body: '追蹤認知、考慮與推薦，對標的是買家真正會比較的那些平台。',
            methods: '線上追蹤 · 指標固定',
          },
          {
            title: '競爭集合',
            body: '弄清一次採購裡真正被比較的是誰，這通常不是品類自己以為的那幾家。',
            methods: '企業問卷 · 深度訪談',
          },
        ],
      },
      {
        n: '04',
        name: '採用與留存',
        frame: '用戶為什麼開始，又為什麼停。',
        cards: [
          {
            title: '上手與啟用',
            body: '研究使用的頭幾週，以及新用戶在哪一步沒能走到價值。',
            methods: '用戶問卷 · 深度訪談',
          },
          {
            title: '流失與留存',
            body: '弄清帳戶為什麼離開，以及離開之前有哪些訊號。',
            methods: '追蹤 · 電話訪問',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['技術買家樣本', '按職位、公司規模與技術棧篩選的 IT、產品與採購決策者。'],
      ['概念測試', '把概念與功能放在可比樣本上測試，每次只改變一個變數。'],
      ['線上問卷', '面向用戶或買家的問卷，配額按職位、公司規模與市場設定。'],
      ['深度訪談', '由研究人員一對一進行 45–60 分鐘的買家或用戶訪談。'],
      ['價格測試', '用支付意願測試價格點與打包方式，結果連同假設一併呈現。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryTech() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--tech">
      <section className="ind-hero ind-hero--tech">
        <img src={techImage} alt="" decoding="async" />
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
