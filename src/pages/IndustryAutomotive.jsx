import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import roadImage from '../assets/industries/automotive-road.jpg';
import './IndustryAutomotive.css';

/* 行业页——汽车与交通。2026-10-24。

   结构：满屏图 → 一段"我们怎么做"的阅读块（过渡）→ 四个阶段 → 方法 → 页末 CTA。

   文案口径：只用陈述句，不写比喻、反问、对仗；每张卡一到两句，只写范围与产出，
   执行细节留给方法一栏。不写无法核实的数字（交付周期、样本库规模、国家数量）。

   语言：en-US 为源语言，zh-CN / zh-Hant 在本文件内维护，其余语言回落英文。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Automotive & transportation',
    lead: 'Research for car and two-wheeler manufacturers, importers and dealer groups: concept, pricing, launch and channel studies.',
    introKicker: 'How we work',
    intro: [
      'A vehicle programme commits investment years before market response is known. Our work is to reduce that uncertainty with evidence that can be presented to a board.',
      'Category, powertrain and channel have fragmented at the same time. There are more nameplates and more price points, and the purchase often begins online and completes at a dealer that does not hold the model in stock. A single tracker no longer covers the category.',
      'Each study is designed around the decision it has to support: which features justify their cost, what price range is sustainable, whether the network can deliver what the launch promises, and what conditions would make a buyer choose electric. Design, sample and reporting are set by that question.',
      'Deliverables are built to be used: cross-tabs with weights stated, verbatims that explain the numbers, and a clear separation between what the data supports and what it does not.',
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
            body: 'Interior layout, HMI and driver-assistance features are tested with owners and considerers before tooling, within a defined price context.',
            methods: 'Concept and A/B testing · owners and considerers',
          },
          {
            title: 'Pricing and configuration',
            body: 'Price sensitivity and trade-off models establish what each feature is worth and which configuration supports the intended price.',
            methods: 'Willingness-to-pay and conjoint models · CATI',
          },
        ],
      },
      {
        n: '02',
        name: 'Launch and communication',
        frame: 'Whether the message is understood before media spend is committed.',
        cards: [
          {
            title: 'Pre-launch message testing',
            body: 'Which proposition is understood, believed and remembered by the buyers the launch depends on, tested before the campaign is produced.',
            methods: 'Online survey and CATI · target buyers',
          },
          {
            title: 'Campaign and asset pre-testing',
            body: 'Creative, dealer promotions and digital assets tested for recall and purchase intent before media is committed.',
            methods: 'Concept and A/B testing · media assets',
          },
        ],
      },
      {
        n: '03',
        name: 'In market and channel',
        frame: 'Whether the network can sell, deliver and retain the buyer.',
        cards: [
          {
            title: 'Dealer and channel performance',
            body: 'Satisfaction, standards and training take-up across the network, and where a sale is lost at the counter.',
            methods: 'CATI · dealer and distributor interviews',
          },
          {
            title: 'Online to forecourt',
            body: 'The path from first search to test drive, and where consideration is lost before the visit.',
            methods: 'Online survey · recent buyers and considerers',
          },
          {
            title: 'Two-wheeler networks',
            body: 'Coverage, parts availability and service standards in scooter and motorcycle channels, checked outlet by outlet.',
            methods: 'CATI and field visits · dealers, service points',
          },
        ],
      },
      {
        n: '04',
        name: 'Electrification',
        frame: 'Cars and two-wheelers face different barriers, and are studied separately.',
        cards: [
          {
            title: 'Cars: adoption and charging',
            body: 'Private buyers on range, charging access and price; fleets on total cost of ownership. Reported by market.',
            methods: 'Online and CATI · owners, considerers, fleet managers',
          },
          {
            title: 'Two-wheelers: electrification and the network',
            body: 'Purchase price against running cost, home charging versus battery swapping, and service coverage for the products sold.',
            methods: 'Online and CATI · riders, dealers, fleet operators',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method produces, and when we use it.',
    methods: [
      ['CATI', 'Scripted telephone interviews with quotas by city, dealer type or buyer segment. Reaches named lists at volume and returns comparable numbers by region.'],
      ['In-depth interviews', '45 to 60 minute one-to-one interviews with dealer principals, fleet managers and senior marketers. The output is verbatim evidence, not percentages.'],
      ['Concept and A/B testing', 'Two or more executions tested on comparable samples, one variable at a time. Shows which version to take forward, before tooling or media spend.'],
      ['Dealer and trade audits', 'Coverage, stock, price execution and training take-up, checked outlet by outlet by telephone census or in person.'],
      ['B2B panels', 'Pre-recruited fleet, procurement and IT decision-makers, screened by company size, sector and role.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '汽车与交通',
    lead: '面向汽车与两轮车整车厂、进口商与经销商集团，提供概念、定价、上市与渠道研究。',
    introKicker: '我们怎么做',
    intro: [
      '一个车型项目在了解市场反应之前，就已经投入数年。我们的工作是用可以拿到会上陈述的证据，降低这段时间的不确定性。',
      '品类、动力形式与渠道同时碎片化：车系更多、价格带更多，购买往往从线上开始，最后完成于一家没有现车的经销商。一份追踪研究已经覆盖不了整个品类。',
      '每项研究都围绕它要支撑的决定来设计：哪些配置能证明自己的成本、什么价格区间站得住、渠道能不能交付上市承诺、什么条件下买家会选择电动。设计、样本与报告由这个问题决定。',
      '交付物以可用为标准：标明权重的交叉表、能解释数字的原话，并明确区分数据支持与不支持的结论。',
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
            body: '在开模之前，用车主与潜在买家测试内饰布局、车机交互与驾驶辅助功能，并在明确的价格条件下进行。',
            methods: '概念与 A/B 测试 · 车主与考虑者',
          },
          {
            title: '定价与配置',
            body: '价格敏感度与权衡模型确定每项配置值多少、哪种配置组合支撑得住目标价格。',
            methods: '支付意愿与联合分析模型 · 电话访问',
          },
        ],
      },
      {
        n: '02',
        name: '上市与传播',
        frame: '在媒介预算花出去之前，信息是否被理解。',
        cards: [
          {
            title: '上市信息测试',
            body: '测试上市所依赖的买家是否理解、相信并记住某个主张，在广告制作之前完成。',
            methods: '线上问卷与电话访问 · 目标买家',
          },
          {
            title: '广告与素材前测',
            body: '在媒介投放之前，测试创意、促销物料与数字素材的记忆度与购买意向。',
            methods: '概念与 A/B 测试 · 媒介素材',
          },
        ],
      },
      {
        n: '03',
        name: '在售与渠道',
        frame: '渠道能不能卖出去、交付出去、留得住买家。',
        cards: [
          {
            title: '经销商与渠道效能',
            body: '整个网络的满意度、标准执行与培训落地，以及一笔生意丢在柜台的哪一步。',
            methods: '电话访问 · 经销商与分销商访谈',
          },
          {
            title: '从线上到展厅',
            body: '从第一次搜索到试驾的路径，以及到店之前意向在哪一步流失。',
            methods: '线上问卷 · 近期买家与考虑者',
          },
          {
            title: '两轮车渠道',
            body: '两轮车渠道的覆盖、配件可得性与服务标准，按网点逐个核对。',
            methods: '电话访问与实地走访 · 经销商、服务点',
          },
        ],
      },
      {
        n: '04',
        name: '电动化',
        frame: '汽车和两轮车面对的阻力不同，分开研究。',
        cards: [
          {
            title: '汽车：采用与充电',
            body: '私人买家看续航、充电条件与价格；车队看总持有成本。按市场分别报告。',
            methods: '线上与电话访问 · 车主、考虑者、车队管理者',
          },
          {
            title: '两轮车：电动化与网络',
            body: '购车价对使用成本、在家充电还是门店换电，以及所售产品的服务覆盖。',
            methods: '线上与电话访问 · 骑手、经销商、车队运营方',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法产出什么，什么情况下用它。',
    methods: [
      ['电话访问（CATI）', '按脚本执行的电话访问，配额按城市、门店类型或买家群体控制；适合名单制、大批量，产出各地可比的数字。'],
      ['深度访谈', '与问卷够不到的人做 45–60 分钟一对一访谈：经销商老板、车队管理者、资深市场负责人。产出是原话证据。'],
      ['概念与 A/B 测试', '把两个或多个方案放在可比样本上测试，每次只变一个变量，在开模或投放之前给出结论。'],
      ['经销商与渠道普查', '覆盖、库存、价格执行与培训落地，按网点逐个核对，用电话普查或实地走访。'],
      ['企业决策者样本', '预先招募的车队、采购与 IT 决策者，按公司规模、行业和职位筛选。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '汽車與交通',
    lead: '面向汽車與兩輪車車廠、進口商與經銷商集團，提供概念、定價、上市與渠道研究。',
    introKicker: '我們怎麼做',
    intro: [
      '一個車型專案在了解市場反應之前，就已經投入數年。我們的工作是用可以拿到會上陳述的證據，降低這段時間的不確定性。',
      '品類、動力形式與渠道同時碎片化：車系更多、價格帶更多，購買往往從線上開始，最後完成於一家沒有現車的經銷商。一份追蹤研究已經覆蓋不了整個品類。',
      '每項研究都圍繞它要支撐的決定來設計：哪些配置能證明自己的成本、什麼價格區間站得住、渠道能不能交付上市承諾、什麼條件下買家會選擇電動。設計、樣本與報告由這個問題決定。',
      '交付物以可用為標準：標明權重的交叉表、能解釋數字的話，並明確區分資料支持與不支持的結論。',
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
            body: '在開模之前，用車主與潛在買家測試內飾佈局、車機互動與駕駛輔助功能，並在明確的價格條件下進行。',
            methods: '概念與 A/B 測試 · 車主與考慮者',
          },
          {
            title: '定價與配置',
            body: '價格敏感度與權衡模型確定每項配置值多少、哪種配置組合支撐得住目標價格。',
            methods: '支付意願與聯合分析模型 · 電話訪問',
          },
        ],
      },
      {
        n: '02',
        name: '上市與傳播',
        frame: '在媒介預算花出去之前，訊息是否被理解。',
        cards: [
          {
            title: '上市訊息測試',
            body: '測試上市所依賴的買家是否理解、相信並記住某個主張，在廣告製作之前完成。',
            methods: '線上問卷與電話訪問 · 目標買家',
          },
          {
            title: '廣告與素材前測',
            body: '在媒介投放之前，測試創意、促銷物料與數位素材的記憶度與購買意願。',
            methods: '概念與 A/B 測試 · 媒介素材',
          },
        ],
      },
      {
        n: '03',
        name: '在售與渠道',
        frame: '渠道能不能賣出去、交付出去、留得住買家。',
        cards: [
          {
            title: '經銷商與渠道效能',
            body: '整個網絡的滿意度、標準執行與培訓落地，以及一筆生意丟在櫃台的哪一步。',
            methods: '電話訪問 · 經銷商與分銷商訪談',
          },
          {
            title: '從線上到展廳',
            body: '從第一次搜尋到試駕的路徑，以及到店之前意願在哪一步流失。',
            methods: '線上問卷 · 近期買家與考慮者',
          },
          {
            title: '兩輪車渠道',
            body: '兩輪車渠道的覆蓋、配件可得性與服務標準，按網點逐個核對。',
            methods: '電話訪問與實地走訪 · 經銷商、服務點',
          },
        ],
      },
      {
        n: '04',
        name: '電動化',
        frame: '汽車和兩輪車面對的阻力不同，分開研究。',
        cards: [
          {
            title: '汽車：採用與充電',
            body: '私人買家看續航、充電條件與價格；車隊看總持有成本。按市場分別報告。',
            methods: '線上與電話訪問 · 車主、考慮者、車隊管理者',
          },
          {
            title: '兩輪車：電動化與網絡',
            body: '購車價對使用成本、在家充電還是門店換電，以及所售產品的服務覆蓋。',
            methods: '線上與電話訪問 · 騎手、經銷商、車隊營運方',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法產出什麼，什麼情況下用它。',
    methods: [
      ['電話訪問（CATI）', '按腳本執行的電話訪問，配額按城市、門店類型或買家群體控制；適合名單制、大批量，產出各地可比的數字。'],
      ['深度訪談', '與問卷夠不到的人做 45–60 分鐘一對一訪談：經銷商老闆、車隊管理者、資深市場負責人。產出是原話證據。'],
      ['概念與 A/B 測試', '把兩個或多個方案放在可比樣本上測試，每次只變一個變數，在開模或投放之前給出結論。'],
      ['經銷商與渠道普查', '覆蓋、庫存、價格執行與培訓落地，按網點逐個核對，用電話普查或實地走訪。'],
      ['企業決策者樣本', '預先招募的車隊、採購與 IT 決策者，按公司規模、行業和職位篩選。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
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
