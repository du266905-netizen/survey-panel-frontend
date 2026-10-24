import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import mediaImage from '../assets/industries/media-hero.jpg';
import './IndustryPage.css';

/* 行业页——媒体与娱乐。2026-10-25。

   主线按内容生意的节奏：受众与内容 → 内容测试与发布 → 品牌与广告 → 订阅与留存。
   依据：手游品牌健康（11 城 1,000 人）、品牌安全与信息效果（美欧 1,000 位营销决策者）。
   与"科技与数字"的边界：那边管产品（路线图、定价、留存），这边管内容与注意力。
   口径同前八页：无数字、不点名岗位、不与其他方法比较、每卡一到两句。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Media & entertainment',
    lead: 'Research for broadcasters, platforms, publishers and game studios: who the audience is, what they will watch or play, and what keeps them paying.',
    introKicker: 'How we work',
    intro: [
      'Media is bought on attention and judged on retention: a title has one launch window, and the audience decides inside it.',
      'We study both sides of that trade: the audience that chooses what to watch or play, and the advertisers who need to know what their spend sits beside.',
      'Each study is designed around the decision it has to support: which title to commission, how to position a launch, whether the ad environment is safe, and why subscribers leave. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Audience and content',
        frame: 'Who is watching or playing, and what they choose.',
        cards: [
          {
            title: 'Audience and content preference',
            body: 'Segment the audience by platform, genre and viewing or play behaviour, and test which content they would choose.',
            methods: 'Online survey · CATI',
          },
          {
            title: 'Content concept testing',
            body: 'Test titles, formats and trailers with the audience before the launch window.',
            methods: 'Concept and A/B testing',
          },
        ],
      },
      {
        n: '02',
        name: 'Launch and scheduling',
        frame: 'Whether it lands inside the first window.',
        cards: [
          {
            title: 'Pre-launch testing',
            body: 'Test positioning and the cut before release, and record what the audience understood from it.',
            methods: 'Concept testing · in-depth interviews',
          },
          {
            title: 'Platform and window',
            body: 'Establish where the audience expects to find the title, and what they will pay for early access.',
            methods: 'Online survey · in-depth interviews',
          },
        ],
      },
      {
        n: '03',
        name: 'Brand and advertising',
        frame: 'Which content the advertising runs in, and what that does to the brand.',
        cards: [
          {
            title: 'Brand safety',
            body: 'Test how advertising is judged in different content environments, and what damages trust in the brand.',
            methods: 'Advertiser survey · message testing',
          },
          {
            title: 'Advertising effectiveness',
            body: 'Measure recall and purchase intent against the content the advertising ran in.',
            methods: 'Online survey · ad testing',
          },
        ],
      },
      {
        n: '04',
        name: 'Subscription and retention',
        frame: 'Why subscribers stay, and why they cancel.',
        cards: [
          {
            title: 'Subscription and churn',
            body: 'Track subscriber behaviour and the reasons for cancellation.',
            methods: 'Tracking · online survey',
          },
          {
            title: 'Brand health',
            body: 'Track awareness, consideration and recommendation against the platforms actually compared.',
            methods: 'Tracking · fixed measures',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Audience survey', 'Survey of viewers or players, with quotas by platform, genre and market.'],
      ['Content and ad testing', 'Titles, trailers and creative tested on comparable samples, with one variable changed at a time.'],
      ['Advertiser survey', 'Survey of marketing and media decision-makers, screened by spend and category.'],
      ['Brand tracking', 'Monthly or quarterly tracking on fixed measures, so movement can be read against the same base.'],
      ['In-depth interviews', 'Depth interviews of 45 to 60 minutes, run one to one by the research team.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '媒体与娱乐',
    lead: '面向电视台与流媒体、平台、出版机构与游戏工作室：受众是谁、他们会选择什么内容、又为何持续付费。',
    introKicker: '我们如何做',
    intro: [
      '媒体生意买的是注意力，最终看的是留存：一部作品只有一个上线档期，受众的决定就在那段时间里完成。',
      '我们把交易的两端分开研究：一端是选择内容的受众，另一端是需要判断广告环境是否安全的广告主。',
      '每项研究都围绕它要支撑的决定来设计：立项哪部作品、上线如何定位、广告环境是否安全、订阅用户为何离开。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '受众与内容',
        frame: '受众是谁，他们会选择哪类内容。',
        cards: [
          {
            title: '受众与内容偏好',
            body: '按平台、类型与观看或游玩行为划分受众，并测试他们会选择哪类内容。',
            methods: '线上问卷 · 电话访问',
          },
          {
            title: '内容概念测试',
            body: '在上线之前，用受众测试片名、形式与预告片。',
            methods: '概念与 A/B 测试',
          },
        ],
      },
      {
        n: '02',
        name: '内容测试与发布',
        frame: '上线之前，内容与定位是否成立。',
        cards: [
          {
            title: '发布前测试',
            body: '在发布之前测试定位与成片剪辑，并记录受众从中理解到了什么。',
            methods: '概念测试 · 深度访谈',
          },
          {
            title: '平台与窗口',
            body: '确定受众预期在哪里看到这部作品，以及愿意为提前观看付多少。',
            methods: '线上问卷 · 深度访谈',
          },
        ],
      },
      {
        n: '03',
        name: '品牌与广告',
        frame: '广告所处的媒介环境是否安全、是否有效。',
        cards: [
          {
            title: '品牌安全',
            body: '测试广告在不同内容环境中的评价，以及哪些环境会损害品牌信任。',
            methods: '广告主问卷 · 信息测试',
          },
          {
            title: '广告效果',
            body: '对照广告所投放的内容，测量记忆度与购买意向。',
            methods: '线上问卷 · 广告测试',
          },
        ],
      },
      {
        n: '04',
        name: '订阅与留存',
        frame: '订阅用户为何留存，又为何流失。',
        cards: [
          {
            title: '订阅与流失',
            body: '追踪订阅行为，以及用户取消的原因。',
            methods: '追踪 · 线上问卷',
          },
          {
            title: '品牌健康',
            body: '追踪认知、考虑与推荐，对标的是受众真正会比较的那些平台。',
            methods: '追踪 · 指标固定',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['受众问卷', '面向观众或玩家的问卷，配额按平台、类型与市场设定。'],
      ['内容与广告测试', '把片名、预告与创意放在可比样本上测试，每次只改变一个变量。'],
      ['广告主问卷', '面向营销与媒介决策者的问卷，按预算规模与品类筛选。'],
      ['品牌追踪', '按月或按季的追踪，指标固定，变化可对照同一套基数来读。'],
      ['深度访谈', '由研究人员一对一进行 45–60 分钟的深度访谈。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '媒體與娛樂',
    lead: '面向電視台與串流、平台、出版機構與遊戲工作室：受眾是誰、他們會選擇什麼內容、又為何持續付費。',
    introKicker: '我們如何做',
    intro: [
      '媒體生意買的是注意力，最終看的是留存：一部作品只有一個上線檔期，受眾的決定就在那段時間裡完成。',
      '我們把交易的兩端分開研究：一端是選擇內容的受眾，另一端是需要判斷廣告環境是否安全的廣告主。',
      '每項研究都圍繞它要支撐的決定來設計：立項哪部作品、上線如何定位、廣告環境是否安全、訂閱用戶為何離開。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '受眾與內容',
        frame: '受眾是誰，他們會選擇哪類內容。',
        cards: [
          {
            title: '受眾與內容偏好',
            body: '按平台、類型與觀看或遊玩行為劃分受眾，並測試他們會選擇哪類內容。',
            methods: '線上問卷 · 電話訪問',
          },
          {
            title: '內容概念測試',
            body: '在上線之前，用受眾測試片名、形式與預告片。',
            methods: '概念與 A/B 測試',
          },
        ],
      },
      {
        n: '02',
        name: '內容測試與發佈',
        frame: '上線之前，內容與定位是否成立。',
        cards: [
          {
            title: '發佈前測試',
            body: '在發佈之前測試定位與成片剪輯，並記錄受眾從中理解到了什麼。',
            methods: '概念測試 · 深度訪談',
          },
          {
            title: '平台與窗口',
            body: '確定受眾預期在哪裡看到這部作品，以及願意為提前觀看付多少。',
            methods: '線上問卷 · 深度訪談',
          },
        ],
      },
      {
        n: '03',
        name: '品牌與廣告',
        frame: '廣告所處的媒介環境是否安全、是否有效。',
        cards: [
          {
            title: '品牌安全',
            body: '測試廣告在不同內容環境中的評價，以及哪些環境會損害品牌信任。',
            methods: '廣告主問卷 · 訊息測試',
          },
          {
            title: '廣告效果',
            body: '對照廣告所投放的內容，測量記憶度與購買意願。',
            methods: '線上問卷 · 廣告測試',
          },
        ],
      },
      {
        n: '04',
        name: '訂閱與留存',
        frame: '訂閱用戶為何留存，又為何流失。',
        cards: [
          {
            title: '訂閱與流失',
            body: '追蹤訂閱行為，以及用戶取消的原因。',
            methods: '追蹤 · 線上問卷',
          },
          {
            title: '品牌健康',
            body: '追蹤認知、考慮與推薦，對標的是受眾真正會比較的那些平台。',
            methods: '追蹤 · 指標固定',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['受眾問卷', '面向觀眾或玩家的問卷，配額按平台、類型與市場設定。'],
      ['內容與廣告測試', '把片名、預告與創意放在可比樣本上測試，每次只改變一個變數。'],
      ['廣告主問卷', '面向行銷與媒介決策者的問卷，按預算規模與品類篩選。'],
      ['品牌追蹤', '按月或按季的追蹤，指標固定，變化可對照同一套基數來讀。'],
      ['深度訪談', '由研究人員一對一進行 45–60 分鐘的深度訪談。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryMedia() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--media">
      <section className="ind-hero ind-hero--media">
        <img src={mediaImage} alt="" decoding="async" />
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
