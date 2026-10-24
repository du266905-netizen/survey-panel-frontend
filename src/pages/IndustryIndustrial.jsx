import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import industrialImage from '../assets/industries/industrial-hero.jpg';
import './IndustryPage.css';

/* 行业页——工业与建材。2026-10-24。

   壳与字号同前六页；主线按这门生意的双轨走：
   品类与规格 → 渠道与经销 → 项目与工程 → 复购与服务。
   依据见 docs/INDUSTRY-BRIEF-2026-10-24-industrial.md 与 COPY-SOURCES 表。
   口径同前六页：无数字、不点名受访岗位、不与其他方法比较、每卡一到两句。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Industrial & building products',
    lead: 'Research for building material brands, industrial equipment makers and their distribution networks: what dealers push, what specifiers write, and what the site actually uses.',
    introKicker: 'How we work',
    intro: [
      'Building products are sold twice: once into a distribution network, and once into a project. The same brand runs both, with different prices, policies and customers.',
      'We study each side of that chain: the dealer who decides whether to stock it, the specifier who decides whether to write it, and the crew that decides whether to use it.',
      'Each study is designed around the decision it has to support — which specification to push, which region to open, why a dealer drops the line. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Product and specification',
        frame: 'What is sold, at what price, against whom.',
        cards: [
          {
            title: 'Price tiers and specification',
            body: 'Test specifications and price points against the products they meet on the same shelf or in the same tender.',
            methods: 'CATI · dealer interviews',
          },
          {
            title: 'New products and substitution',
            body: 'Establish whether a new product replaces an existing one, or adds a line nobody asked for.',
            methods: 'In-depth interviews · product tests',
          },
        ],
      },
      {
        n: '02',
        name: 'Channel and dealers',
        frame: 'Why a dealer pushes one brand and shelves another.',
        cards: [
          {
            title: 'Voice of the dealer',
            body: 'Satisfaction, rebates, payment terms, and the point at which a dealer stops recommending the brand.',
            methods: 'CATI census · in-depth interviews',
          },
          {
            title: 'Coverage and sell-out',
            body: 'Map where the brand is stocked, and how much of it actually leaves the store.',
            methods: 'CATI · dealer-reported sell-out',
          },
        ],
      },
      {
        n: '03',
        name: 'Projects and specification',
        frame: 'Who writes the brand into the job.',
        cards: [
          {
            title: 'The specification journey',
            body: 'Follow a product from first awareness to being written into the drawings, and the point where it drops out.',
            methods: 'Specifier interviews',
          },
          {
            title: 'Tendering and contractors',
            body: 'Understand what the contractor weighs at tender, and where price overrides the specification.',
            methods: 'In-depth interviews · CATI',
          },
        ],
      },
      {
        n: '04',
        name: 'Repeat and service',
        frame: 'Why the next order goes elsewhere.',
        cards: [
          {
            title: 'Delivery and after-sales',
            body: 'Measure delivery reliability, after-sales response, and the failures that trigger a switch.',
            methods: 'CATI · dealer interviews',
          },
          {
            title: 'Terms and loyalty',
            body: 'Establish how payment terms and rebates hold a dealer, and for how long.',
            methods: 'CATI census',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Dealer network census', 'A telephone census of the dealer and distributor network, covering stocking, sell-out, terms and satisfaction.'],
      ['Contractor and crew interviews', 'Face-to-face interviews with contractors and applicators, where the product is actually used.'],
      ['Specifier interviews', 'Interviews with the architects and engineers who write products into specifications.'],
      ['Homeowner survey', 'Online survey of homeowners and renovators, with quotas by city and project type.'],
      ['Product and sample tests', 'Product and sample tests with the people who apply the material.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '工业与建材',
    lead: '面向建材品牌、工业设备制造商及其分销网络：经销商推什么、设计方写什么、工地实际用什么。',
    introKicker: '我们如何做',
    intro: [
      '建材卖两次：一次卖进分销网络，一次卖进一个项目。同一个品牌两条线都走，价格、政策与客户都不同。',
      '我们研究这条链条上的每一环：决定要不要进货的经销商、决定要不要上图的设计方，以及决定用不用的施工班组。',
      '每项研究都围绕它要支撑的决定来设计：主推哪个规格、开哪个区域、经销商为什么放弃这条线。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '品类与规格',
        frame: '卖什么、什么价、和谁抢。',
        cards: [
          {
            title: '价格带与规格',
            body: '在同一排货架或同一个标里，测试规格与价格点对上的那些竞品。',
            methods: '电话访问 · 经销商访谈',
          },
          {
            title: '新品与替代',
            body: '弄清一个新品是替换了现有产品，还是多了一条没人要的线。',
            methods: '深度访谈 · 产品测试',
          },
        ],
      },
      {
        n: '02',
        name: '渠道与经销',
        frame: '经销商为什么推一个品牌、又为什么把你的货压住。',
        cards: [
          {
            title: '经销商之声',
            body: '满意度、返利、账期，以及经销商从哪一步开始不再推荐这个品牌。',
            methods: '电话普查 · 深度访谈',
          },
          {
            title: '覆盖与动销',
            body: '弄清品牌在哪些店有货，以及有多少真正从店里卖出去。',
            methods: '电话访问 · 经销商动销数据',
          },
        ],
      },
      {
        n: '03',
        name: '项目与工程',
        frame: '谁把品牌写进这个工程。',
        cards: [
          {
            title: '上图旅程',
            body: '跟着一个产品走：从第一次认知到被写进图纸，以及在哪一步掉出局。',
            methods: '设计方访谈',
          },
          {
            title: '招投标与总包',
            body: '弄清总包在投标时权衡什么，以及价格在哪一步压过了规格。',
            methods: '深度访谈 · 电话访问',
          },
        ],
      },
      {
        n: '04',
        name: '复购与服务',
        frame: '下一单为什么给了别人。',
        cards: [
          {
            title: '交付与售后',
            body: '测量交付可靠性、售后响应，以及哪些失败会直接触发换品牌。',
            methods: '电话访问 · 经销商访谈',
          },
          {
            title: '账期与忠诚',
            body: '弄清账期与返利能留住一个经销商多久。',
            methods: '电话普查',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['经销商网络普查', '对经销商与分销商网络做电话普查，覆盖备货、动销、账期与满意度。'],
      ['承包商与施工人员面访', '在材料实际使用的地方，与承包商和施工人员面对面访谈。'],
      ['设计方访谈', '与把产品写进规格的建筑师和工程师访谈。'],
      ['业主问卷', '面向业主与装修者的线上问卷，配额按城市与项目类型设定。'],
      ['产品与样品测试', '在真正施工的人手里测产品与样品。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '工業與建材',
    lead: '面向建材品牌、工業設備製造商及其分銷網絡：經銷商推什麼、設計方寫什麼、工地實際用什麼。',
    introKicker: '我們如何做',
    intro: [
      '建材賣兩次：一次賣進分銷網絡，一次賣進一個專案。同一個品牌兩條線都走，價格、政策與客戶都不同。',
      '我們研究這條鏈條上的每一環：決定要不要進貨的經銷商、決定要不要上圖的設計方，以及決定用不用的施工班組。',
      '每項研究都圍繞它要支撐的決定來設計：主推哪個規格、開哪個區域、經銷商為什麼放棄這條線。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '品類與規格',
        frame: '賣什麼、什麼價、和誰搶。',
        cards: [
          {
            title: '價格帶與規格',
            body: '在同一排貨架或同一個標裡，測試規格與價格點對上的那些競品。',
            methods: '電話訪問 · 經銷商訪談',
          },
          {
            title: '新品與替代',
            body: '弄清一個新品是替換了現有產品，還是多了一條沒人要的線。',
            methods: '深度訪談 · 產品測試',
          },
        ],
      },
      {
        n: '02',
        name: '渠道與經銷',
        frame: '經銷商為什麼推一個品牌、又為什麼把你的貨壓住。',
        cards: [
          {
            title: '經銷商之聲',
            body: '滿意度、返利、帳期，以及經銷商從哪一步開始不再推薦這個品牌。',
            methods: '電話普查 · 深度訪談',
          },
          {
            title: '覆蓋與動銷',
            body: '弄清品牌在哪些店有貨，以及有多少真正從店裡賣出去。',
            methods: '電話訪問 · 經銷商動銷資料',
          },
        ],
      },
      {
        n: '03',
        name: '專案與工程',
        frame: '誰把品牌寫進這個工程。',
        cards: [
          {
            title: '上圖旅程',
            body: '跟著一個產品走：從第一次認知到被寫進圖紙，以及在哪一步掉出局。',
            methods: '設計方訪談',
          },
          {
            title: '招投標與總包',
            body: '弄清總包在投標時權衡什麼，以及價格在哪一步壓過了規格。',
            methods: '深度訪談 · 電話訪問',
          },
        ],
      },
      {
        n: '04',
        name: '複購與服務',
        frame: '下一單為什麼給了別人。',
        cards: [
          {
            title: '交付與售後',
            body: '測量交付可靠性、售後回應，以及哪些失敗會直接觸發換品牌。',
            methods: '電話訪問 · 經銷商訪談',
          },
          {
            title: '帳期與忠誠',
            body: '弄清帳期與返利能留住一個經銷商多久。',
            methods: '電話普查',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['經銷商網絡普查', '對經銷商與分銷商網絡做電話普查，涵蓋備貨、動銷、帳期與滿意度。'],
      ['承包商與施工人員面訪', '在材料實際使用的地方，與承包商和施工人員面對面訪談。'],
      ['設計方訪談', '與把產品寫進規格的建築師和工程師訪談。'],
      ['業主問卷', '面向業主與裝修者的線上問卷，配額按城市與專案類型設定。'],
      ['產品與樣品測試', '在真正施工的人手裡測產品與樣品。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryIndustrial() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--industrial">
      <section className="ind-hero ind-hero--industrial">
        <img src={industrialImage} alt="" decoding="async" />
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
