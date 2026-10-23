import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import roadImage from '../assets/industries/automotive-road.jpg';
import './IndustryAutomotive.css';

/* 行业页——汽车与交通。2026-10-24。

   结构：满屏图 → 一段"我们怎么想"的阅读块（过渡）→ 四个阶段 → 方法 → 页末 CTA。
   文案按专业调研的写法：先写这个阶段要支撑什么决定，再写研究怎么做；
   不写形容词，不写无法核实的数字（交付周期、样本库规模、国家数量一律不出现）。

   语言：en-US 为源语言，zh-CN / zh-Hant 跟站内其它页一样在本文件内维护；
   其余语言回落到英文，等语言库那一批再挪。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Automotive & transportation',
    lead: 'Concept, pricing, launch and channel studies for car and two-wheeler makers, importers and dealer groups.',
    introKicker: 'How we work',
    intro: [
      'A vehicle programme commits years before the market answers. Our work is to shorten that gap with evidence a team can defend.',
      'Category, powertrain and channel have fragmented at once: more nameplates, more price points, and a purchase that begins online and ends with a dealer who may not have the car. A single tracker no longer covers it.',
      'Each study is built around the decision it has to support — which features earn their cost, how a price corridor holds, whether the network can sell what marketing promises, and what makes a buyer choose electric. Design, sample and reporting follow from that question, not from a preferred method.',
      'What comes back is meant to be used: cross-tabs with weights stated, verbatims that explain the numbers, and a clear line between what the data supports and what it does not.',
    ],
    stagesKicker: 'What we study',
    stages: [
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
          {
            title: 'Two-wheelers and micromobility',
            body: 'Scooters and motorcycles moving electric — rider economics, charging and battery-swap expectations, and the dealer network that has to service them.',
            methods: 'Online and CATI · riders, dealers, fleet operators',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method buys you, and where it stops.',
    methods: [
      ['CATI', 'Reaches a named list at scale — dealer principals, fleet managers — with quotas enforced city by city so regions stay comparable. Slow to set up, fast once live.'],
      ['In-depth interviews', 'Forty-five minutes with the person who owns the decision. Ten of these explain a survey; a hundred of them do not scale.'],
      ['Concept and A/B testing', 'Two cells, one variable. If you cannot name the single thing that differs, it is not a test — it is an opinion with a sample size.'],
      ['Dealer and trade audits', 'What the network actually does, not what it reports: price executed, stock held, training used, checked outlet by outlet.'],
      ['B2B panels', 'Decision-makers screened by company size, sector and role. Incidence is low, so the sample gets planned before the questionnaire does.'],
    ],
    ctaTitle: 'Tell us the decision you have to defend.',
    ctaBody: 'You get an answer you can use — the finding, the evidence, and what to do next.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '汽车与交通',
    lead: '面向汽车与两轮车整车厂、进口商与经销商集团的概念、定价、上市与渠道研究。',
    introKicker: '我们怎么做',
    intro: [
      '一个车型项目在市场上给出答案之前，往往已经投入数年。我们要做的，是用团队敢拿去拍板的证据，把这个间隔缩短。',
      '品类、动力形式和渠道同时碎片化：车系更多、价格带更多，购买从线上开始，最后却落在一个可能没有现车的经销商手里。一份追踪研究覆盖不了这些。',
      '每一项研究都围绕它要支撑的那个决定来设计——哪些配置值这个成本、价格区间能不能站住、渠道能不能卖出营销承诺的东西、什么让人愿意选择电动。设计、样本与报告都跟着问题走，不跟着我们惯用的方法走。',
      '交付的东西是要用的：标明权重的交叉表、能解释数字的原话，以及一条清楚的界线——数据支持什么，不支持什么。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '概念与配置',
        frame: '产品应该是什么样，以及每一项配置值多少钱。',
        cards: [
          {
            title: '功能验证',
            body: '在开模之前，把内饰布局、车机交互和驾驶辅助功能摆到车主与潜在买家面前——单组测试与配对比较，并放进真实的价格语境，偏好才有意义。',
            methods: '概念与 A/B 测试 · 车主与考虑者',
          },
          {
            title: '定价与配置',
            body: '价格敏感度与权衡模型，算出每项配置值多少、哪个配置组合撑得起这个价——给的是一个价格区间，不是一个数字。',
            methods: '支付意愿与联合分析模型 · 电话访问',
          },
        ],
      },
      {
        n: '02',
        name: '上市与传播',
        frame: '在媒介预算花出去之前，这句话到底立不立得住。',
        cards: [
          {
            title: '上市信息测试',
            body: '上市要依赖的那批买家，究竟听懂、相信并记住了哪个说法——在投放之前测，不是之后。',
            methods: '线上问卷与电话访问 · 目标买家',
          },
          {
            title: '广告与素材前测',
            body: '创意、经销商促销物料和数字素材，在投放前测记忆度与购买意向。',
            methods: '概念与 A/B 测试 · 媒介素材',
          },
        ],
      },
      {
        n: '03',
        name: '在售与渠道',
        frame: '渠道能不能卖出去、交得出去、留得住人。',
        cards: [
          {
            title: '经销商与渠道效能',
            body: '整个网络的满意度、标准执行与培训落地情况，以及一笔生意丢在柜台前的哪一步。',
            methods: '电话访问 · 经销商与分销商访谈',
          },
          {
            title: '从线上到展厅',
            body: '从第一次搜索到试驾的路径，以及到店之前意向在哪一步流失。',
            methods: '线上问卷 · 近期买家与考虑者',
          },
        ],
      },
      {
        n: '04',
        name: '电动化',
        frame: '是什么让人愿意换电，又是什么拦住了他。',
        cards: [
          {
            title: '电动车采用与充电',
            body: '分市场看准备度、续航焦虑与充电条件——把私人买家和算总持有成本的车队分开看。',
            methods: '线上与电话访问 · 车主、考虑者、车队管理者',
          },
          {
            title: '两轮车与微出行',
            body: '踏板车与摩托车的电动化——骑手的经济账、充电与换电预期，以及必须把它们修好的经销网络。',
            methods: '线上与电话访问 · 骑手、经销商、车队运营方',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法能换来什么，以及它到哪儿为止。',
    methods: [
      ['电话访问（CATI）', '能按名单大规模触达——经销商老板、车队管理者——并按城市控制配额，让各地可比。搭建慢，跑起来快。'],
      ['深度访谈', '跟真正拍板的人聊四十五分钟。十来个能解释一份问卷，一百个就撑不住。'],
      ['概念与 A/B 测试', '两组，只变一个变量。说不出差在哪一项，那就不是测试，只是一个有样本量的意见。'],
      ['经销商与渠道普查', '看渠道实际怎么做，而不是它汇报怎么做：价格执行、库存、培训有没有用，一个点一个点核。'],
      ['企业决策者样本', '按公司规模、行业、职位筛出的决策者。合格率低，所以先定样本，再写问卷。'],
    ],
    ctaTitle: '告诉我们，你要拿去拍板的那个决定。',
    ctaBody: '你会拿到一份能直接用的答卷——结论、依据，以及下一步怎么走。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '汽車與交通',
    lead: '面向汽車與兩輪車車廠、進口商與經銷商集團的概念、定價、上市與渠道研究。',
    introKicker: '我們怎麼做',
    intro: [
      '一個車型專案在市場上給出答案之前，往往已經投入數年。我們要做的，是用團隊敢拿去拍板的證據，把這個間隔縮短。',
      '品類、動力形式和渠道同時碎片化：車系更多、價格帶更多，購買從線上開始，最後卻落在一個可能沒有現車的經銷商手裡。一份追蹤研究覆蓋不了這些。',
      '每一項研究都圍繞它要支撐的那個決定來設計——哪些配置值這個成本、價格區間能不能站住、渠道能不能賣出營銷承諾的東西、什麼讓人願意選擇電動。設計、樣本與報告都跟著問題走，不跟著我們慣用的方法走。',
      '交付的東西是要用的：標明權重的交叉表、能解釋數字的話，以及一條清楚的界線——資料支持什麼，不支持什麼。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '概念與配置',
        frame: '產品應該是什麼樣，以及每一項配置值多少錢。',
        cards: [
          {
            title: '功能驗證',
            body: '在開模之前，把內飾佈局、車機互動和駕駛輔助功能擺到車主與潛在買家面前——單組測試與配對比較，並放進真實的價格語境，偏好才有意義。',
            methods: '概念與 A/B 測試 · 車主與考慮者',
          },
          {
            title: '定價與配置',
            body: '價格敏感度與權衡模型，算出每項配置值多少、哪個配置組合撐得起這個價——給的是一個價格區間，不是一個數字。',
            methods: '支付意願與聯合分析模型 · 電話訪問',
          },
        ],
      },
      {
        n: '02',
        name: '上市與傳播',
        frame: '在媒介預算花出去之前，這句話到底立不立得住。',
        cards: [
          {
            title: '上市訊息測試',
            body: '上市要依賴的那批買家，究竟聽懂、相信並記住了哪個說法——在投放之前測，不是之後。',
            methods: '線上問卷與電話訪問 · 目標買家',
          },
          {
            title: '廣告與素材前測',
            body: '創意、經銷商促銷物料和數位素材，在投放前測記憶度與購買意願。',
            methods: '概念與 A/B 測試 · 媒介素材',
          },
        ],
      },
      {
        n: '03',
        name: '在售與渠道',
        frame: '渠道能不能賣出去、交得出去、留得住人。',
        cards: [
          {
            title: '經銷商與渠道效能',
            body: '整個網絡的滿意度、標準執行與培訓落地情況，以及一筆生意丟在櫃台前的哪一步。',
            methods: '電話訪問 · 經銷商與分銷商訪談',
          },
          {
            title: '從線上到展廳',
            body: '從第一次搜尋到試駕的路徑，以及到店之前意願在哪一步流失。',
            methods: '線上問卷 · 近期買家與考慮者',
          },
        ],
      },
      {
        n: '04',
        name: '電動化',
        frame: '是什麼讓人願意換電，又是什麼攔住了他。',
        cards: [
          {
            title: '電動車採用與充電',
            body: '分市場看準備度、續航焦慮與充電條件——把私人買家和算總持有成本的車隊分開看。',
            methods: '線上與電話訪問 · 車主、考慮者、車隊管理者',
          },
          {
            title: '兩輪車與微出行',
            body: '踏板車與摩托車的電動化——騎手的經濟帳、充電與換電預期，以及必須把它們修好的經銷網絡。',
            methods: '線上與電話訪問 · 騎手、經銷商、車隊營運方',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法能換來什麼，以及它到哪兒為止。',
    methods: [
      ['電話訪問（CATI）', '能按名單大規模觸達——經銷商老闆、車隊管理者——並按城市控制配額，讓各地可比。搭建慢，跑起來快。'],
      ['深度訪談', '跟真正拍板的人聊四十五分鐘。十來個能解釋一份問卷，一百個就撐不住。'],
      ['概念與 A/B 測試', '兩組，只變一個變數。說不出差在哪一項，那就不是測試，只是一個有樣本量的意見。'],
      ['經銷商與渠道普查', '看渠道實際怎麼做，而不是它匯報怎麼做：價格執行、庫存、培訓有沒有用，一個點一個點核。'],
      ['企業決策者樣本', '按公司規模、行業、職位篩出的決策者。合格率低，所以先定樣本，再寫問卷。'],
    ],
    ctaTitle: '告訴我們，你要拿去拍板的那個決定。',
    ctaBody: '你會拿到一份能直接用的答卷——結論、依據，以及下一步怎麼走。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryAutomotive() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--automotive">
      {/* 满屏图，和首页同一套：图压在导航下、铺满整屏，文字落在左下。 */}
      <section className="ind-hero">
        <img src={roadImage} alt="" decoding="async" />
        <div className="ind-hero-copy">
          <p className="ind-kicker ind-kicker--light">{c.kicker}</p>
          <h1>{c.title}</h1>
          <p className="ind-hero-lead">{c.lead}</p>
        </div>
      </section>

      {/* 过渡：先讲这一类研究为什么这样做，再进分类。阅读栏 680。 */}
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
