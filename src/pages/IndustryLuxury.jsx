import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import luxuryImage from '../assets/industries/luxury-hero.jpg';
import './IndustryPage.css';

/* 行业页——奢侈品与高端生活方式。2026-10-24。

   与汽车页同一套壳与字号：满屏图 → 说明段 → 四个阶段 → 方法 → 页末 CTA。
   主线不同：汽车按产品生命周期，这里按客群决策路径（客群 → 品牌 → 传播 → 体验）。

   口径同汽车页：只用陈述句；不写数字与交付承诺；不点名具体岗位；
   不与其他方法比较；每张卡一到两句，只写范围与产出。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Luxury & lifestyle',
    lead: 'Research for luxury brands, premium retail and travel: who the buyer is, how the brand is considered, and what keeps them.',
    introKicker: 'How we work',
    intro: [
      'Affluent demand is uneven across markets and moves with travel, currency and occasion.',
      'We study the buyer at the point of decision: what enters the consideration set, what is rejected, what the price is expected to include, and what the experience owes them afterwards.',
      'Each study is designed around the decision it has to support — whether to enter a market, how to position a line, which message carries, where the experience loses the customer. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Customer and motive',
        frame: 'Who the buyer is, and what the purchase is for.',
        cards: [
          {
            title: 'Affluent segmentation',
            body: 'Segment the affluent audience by wealth, spend and market, and size each group before the brand invests in it.',
            methods: 'Online survey · CATI · affluent samples',
          },
          {
            title: 'Motivation and occasion',
            body: 'Understand why the purchase happens — self-reward, gifting, travel, status — and how the occasion changes the shortlist.',
            methods: 'In-depth interviews · online survey',
          },
        ],
      },
      {
        n: '02',
        name: 'Brand and consideration',
        frame: 'Whether the brand is in the consideration set, and on what terms.',
        cards: [
          {
            title: 'Brand health tracking',
            body: 'Track awareness, imagery, consideration and recommendation over time, against the brands the buyer actually compares.',
            methods: 'Online tracking · fixed measures',
          },
          {
            title: 'Accessible and true luxury',
            body: 'Test where the brand sits between accessible and true luxury, and which associations pull it up or down.',
            methods: 'Online survey · attribution analysis',
          },
        ],
      },
      {
        n: '03',
        name: 'Reach and message',
        frame: 'Which message reaches the buyer, and through whom.',
        cards: [
          {
            title: 'Message testing',
            body: 'Test which proposition is understood and believed by the affluent buyer before the campaign runs.',
            methods: 'Concept and A/B testing · target buyers',
          },
          {
            title: 'Content and influencer effect',
            body: 'Measure the effect of content and influencer work on consideration, using samples matched to the exposed audience.',
            methods: 'Online survey · matched samples',
          },
        ],
      },
      {
        n: '04',
        name: 'Experience and return',
        frame: 'What the experience delivers after the purchase or the trip.',
        cards: [
          {
            title: 'Retail and service experience',
            body: 'Assess the purchase experience, the service and the after-sales contact, and where the experience falls short of the price.',
            methods: 'In-depth interviews · customer survey',
          },
          {
            title: 'Trip decisions and destination',
            body: 'Follow the trip from destination shortlist to booking and stay, and where the destination loses the traveller.',
            methods: 'Online survey · recent travellers',
          },
          {
            title: 'Loyalty and advocacy',
            body: 'Measure repeat purchase, advocacy and the reasons a customer leaves.',
            methods: 'Tracking · CATI · online survey',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['CATI', 'Scripted telephone interviews, with quotas set by market, category spend or buyer segment. Used where the list is defined and the sample is large.'],
      ['In-depth interviews', 'Depth interviews of 45 to 60 minutes, run one to one by the research team.'],
      ['Online tracking', 'Monthly or quarterly tracking on fixed measures, so movement can be read against the same base.'],
      ['Concept and A/B testing', 'Two or more executions tested on comparable samples, with one variable changed at a time.'],
      ['Affluent sample recruitment', 'Samples recruited through verified wealth panels and referral, for audiences that general population samples do not reach.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '奢侈品与高端生活方式',
    lead: '面向奢侈品牌、高端零售与旅游：客群是谁、品牌如何进入备选、什么留得住人。',
    introKicker: '我们如何做',
    intro: [
      '高端消费在不同市场并不均匀，随出行、汇率与场合变化。',
      '我们研究的是决策发生的那一刻：什么进了备选、什么被排除、这个价格该包含什么，以及事后体验欠了他什么。',
      '每项研究都围绕它要支撑的决定来设计：要不要进一个市场、一条线怎么定位、哪句话能到人、体验在哪一步丢客。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '客群与动机',
        frame: '这批人是谁，这钱为什么花。',
        cards: [
          {
            title: '高净值客群分层',
            body: '按财富、消费额与市场划分高端客群，并在品牌投入之前把每一群的规模算清。',
            methods: '线上问卷 · 电话访问 · 高端样本',
          },
          {
            title: '消费动机与场合',
            body: '弄清购买为什么发生（自我奖励、送礼、出行、身份），以及场合如何改变他的备选。',
            methods: '深度访谈 · 线上问卷',
          },
        ],
      },
      {
        n: '02',
        name: '品牌与考虑',
        frame: '有没有进备选，以什么身份进。',
        cards: [
          {
            title: '品牌健康追踪',
            body: '持续追踪认知、形象、考虑与推荐，对标的是买家真正会比较的那几个品牌。',
            methods: '在线追踪 · 指标固定',
          },
          {
            title: '高端与轻奢的边界',
            body: '测试品牌落在「轻奢」与「真奢」之间的哪个位置，以及哪些联想在抬它、哪些在拉它。',
            methods: '线上问卷 · 联想归因',
          },
        ],
      },
      {
        n: '03',
        name: '传播与触达',
        frame: '哪句话到人，通过谁到。',
        cards: [
          {
            title: '传播信息测试',
            body: '在投放之前，测试哪一句主张被高端买家听懂并相信。',
            methods: '概念与 A/B 测试 · 目标买家',
          },
          {
            title: '内容与达人效果',
            body: '衡量内容与达人合作对「考虑」的影响，样本与曝光人群匹配。',
            methods: '线上问卷 · 匹配样本',
          },
        ],
      },
      {
        n: '04',
        name: '体验与复购',
        frame: '买完、走完之后，他还回不回来。',
        cards: [
          {
            title: '零售与服务体验',
            body: '评估购买体验、服务与售后接触，以及体验在哪个环节配不上这个价格。',
            methods: '深度访谈 · 客户问卷',
          },
          {
            title: '旅行决策与目的地',
            body: '跟着一次出行走：从目的地备选到预订与停留，看目的地在哪一步失去旅行者。',
            methods: '线上问卷 · 近期旅行者',
          },
          {
            title: '忠诚与推荐',
            body: '衡量复购、推荐，以及客户离开的原因。',
            methods: '追踪 · 电话访问 · 线上问卷',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['电话访问（CATI）', '按脚本执行电话访问，配额按市场、品类消费额或客群设定。用于名单明确、样本量大的项目。'],
      ['深度访谈', '由研究人员一对一进行 45–60 分钟的深度访谈。'],
      ['在线追踪', '按月或按季的在线追踪，指标固定，变化可对照同一套基数来读。'],
      ['概念与 A/B 测试', '把两个或多个方案放在可比样本上测试，每次只改变一个变量。'],
      ['高端样本招募', '通过核实过的高净值样本库与转介绍招募，覆盖一般人口样本触达不到的人群。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '奢侈品與高端生活方式',
    lead: '面向奢侈品牌、高端零售與旅遊：客群是誰、品牌如何進入備選、什麼留得住人。',
    introKicker: '我們如何做',
    intro: [
      '高端消費在不同市場並不均勻，隨出行、匯率與場合變化。',
      '我們研究的是決策發生的那一刻：什麼進了備選、什麼被排除、這個價格該包含什麼，以及事後體驗欠了他什麼。',
      '每項研究都圍繞它要支撐的決定來設計：要不要進一個市場、一條線怎麼定位、哪句話能到人、體驗在哪一步丟客。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '客群與動機',
        frame: '這批人是誰，這筆錢為什麼花。',
        cards: [
          {
            title: '高淨值客群分層',
            body: '按財富、消費額與市場劃分高端客群，並在品牌投入之前把每一群的規模算清。',
            methods: '線上問卷 · 電話訪問 · 高端樣本',
          },
          {
            title: '消費動機與場合',
            body: '弄清購買為什麼發生（自我獎勵、送禮、出行、身份），以及場合如何改變他的備選。',
            methods: '深度訪談 · 線上問卷',
          },
        ],
      },
      {
        n: '02',
        name: '品牌與考慮',
        frame: '有沒有進備選，以什麼身份進。',
        cards: [
          {
            title: '品牌健康追蹤',
            body: '持續追蹤認知、形象、考慮與推薦，對標的是買家真正會比較的那幾個品牌。',
            methods: '線上追蹤 · 指標固定',
          },
          {
            title: '高端與輕奢的邊界',
            body: '測試品牌落在「輕奢」與「真奢」之間的位置，以及哪些聯想在抬它、哪些在拉它。',
            methods: '線上問卷 · 聯想歸因',
          },
        ],
      },
      {
        n: '03',
        name: '傳播與觸達',
        frame: '哪句話到人，通過誰到。',
        cards: [
          {
            title: '傳播訊息測試',
            body: '在投放之前，測試哪一句主張被高端買家聽懂並相信。',
            methods: '概念與 A/B 測試 · 目標買家',
          },
          {
            title: '內容與達人效果',
            body: '衡量內容與達人合作對「考慮」的影響，樣本與曝光人群匹配。',
            methods: '線上問卷 · 匹配樣本',
          },
        ],
      },
      {
        n: '04',
        name: '體驗與復購',
        frame: '買完、走完之後，他還回不回來。',
        cards: [
          {
            title: '零售與服務體驗',
            body: '評估購買體驗、服務與售後接觸，以及體驗在哪個環節配不上這個價格。',
            methods: '深度訪談 · 客戶問卷',
          },
          {
            title: '旅行決策與目的地',
            body: '跟著一次出行走：從目的地備選到預訂與停留，看目的地在哪一步失去旅行者。',
            methods: '線上問卷 · 近期旅行者',
          },
          {
            title: '忠誠與推薦',
            body: '衡量復購、推薦，以及客戶離開的原因。',
            methods: '追蹤 · 電話訪問 · 線上問卷',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['電話訪問（CATI）', '按腳本執行電話訪問，配額按市場、品類消費額或客群設定。用於名單明確、樣本量大的專案。'],
      ['深度訪談', '由研究人員一對一進行 45–60 分鐘的深度訪談。'],
      ['線上追蹤', '按月或按季的線上追蹤，指標固定，變化可對照同一套基數來讀。'],
      ['概念與 A/B 測試', '把兩個或多個方案放在可比樣本上測試，每次只改變一個變數。'],
      ['高端樣本招募', '透過核實過的高淨值樣本庫與轉介紹招募，覆蓋一般人口樣本觸達不到的人群。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryLuxury() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--luxury">
      <section className="ind-hero ind-hero--luxury">
        <img src={luxuryImage} alt="" decoding="async" />
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
