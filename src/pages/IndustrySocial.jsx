import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import socialImage from '../assets/industries/social-hero.jpg';
import './IndustryPage.css';

/* 行业页——社会与教育。2026-10-24。

   壳与字号同前五页；主线按项目周期：议题与人群 → 项目设计 → 交付与覆盖 → 影响与说服。
   依据见 docs/COPY-SOURCES-2026-10-24-industries.md：
   供应商两个案例（基金会委托的女性创业研究、印度教培市场研究）。
   口径同前五页：无数字、不点名受访岗位、不与其他方法比较、每卡一到两句。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Social & education',
    lead: 'Research for foundations, non-profits and education providers: who the audience is, what the programme changes, and how to show it.',
    introKicker: 'How we work',
    intro: [
      'Public programmes and education are judged on outcomes that take years to appear, and on audiences that are rarely in one place.',
      'We study the people a programme is meant to reach: what they need, whether they receive it, and what changed for them. The same design covers the funder, the delivery team and the public a report has to convince.',
      'Each study is designed around the decision it has to support — whether to start or stop a programme, how to target it, and what evidence the funder will accept. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Issue and audience',
        frame: 'Who is affected, and what the need actually is.',
        cards: [
          {
            title: 'Public and audience research',
            body: 'Survey a population or a defined audience to establish what the issue looks like before a programme is designed.',
            methods: 'Representative survey · online',
          },
          {
            title: 'Need and access',
            body: 'Establish who needs the service, and what currently keeps them from it.',
            methods: 'In-depth interviews · survey',
          },
        ],
      },
      {
        n: '02',
        name: 'Programme design',
        frame: 'What the intervention should be, and whether it works before scale.',
        cards: [
          {
            title: 'Programme testing',
            body: 'Test a model or a message with the people it is meant for, before it is scaled.',
            methods: 'Concept testing · focus groups',
          },
          {
            title: 'Donor and supporter research',
            body: 'Understand what supporters believe about the cause, and what they will fund.',
            methods: 'Online survey · in-depth interviews',
          },
        ],
      },
      {
        n: '03',
        name: 'Delivery and reach',
        frame: 'Who actually receives it, and where it drops.',
        cards: [
          {
            title: 'Delivery and reach',
            body: 'Map who is reached and who is missed, and the operational points where delivery fails.',
            methods: 'In-depth interviews · survey',
          },
          {
            title: 'Participant experience',
            body: 'Study the experience of the people inside the programme, and what makes them stay or drop out.',
            methods: 'Survey · focus groups',
          },
        ],
      },
      {
        n: '04',
        name: 'Evidence and influence',
        frame: 'What changed, and how to present it.',
        cards: [
          {
            title: 'Change against a baseline',
            body: 'Measure change against a baseline, and state clearly what the data can and cannot attribute to the programme.',
            methods: 'Survey · interviews',
          },
          {
            title: 'Evidence and reporting',
            body: 'Turn findings into a report the funder, ministry or public will accept.',
            methods: 'Survey · interviews · desk research',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Representative survey', 'Nationally or regionally representative samples, with quotas set to the population the programme serves.'],
      ['Multi-stakeholder survey', 'Beneficiaries, delivery staff and funders surveyed in one design, so the same questions reach every side of the programme.'],
      ['In-depth interviews', 'Depth interviews of 45 to 60 minutes, run one to one by the research team.'],
      ['Focus groups', 'Group discussions of about 90 minutes, for how a topic is talked about among peers.'],
      ['Face-to-face fieldwork (CAPI)', 'Structured interviews conducted in person, where the population is not reachable by telephone or online.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '社会与教育',
    lead: '面向基金会、非营利组织与教育机构：受众是谁、项目改变了什么、怎么证明。',
    introKicker: '我们如何做',
    intro: [
      '公益项目和教育项目的成效，往往要几年才看得见，而受众又很少集中在同一个地方。',
      '我们研究项目想触达的那批人：他们需要什么、有没有拿到、有什么因此改变。同一套设计也覆盖资助方、执行团队，以及报告要说服的公众。',
      '每项研究都围绕它要支撑的决定来设计：项目要不要开始或停下、往哪里投、资助方会接受什么证据。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '议题与人群',
        frame: '谁受影响，需要到底是什么。',
        cards: [
          {
            title: '公众与受众研究',
            body: '在设计项目之前，用调查弄清这个问题在一群人或一个地区里是什么样。',
            methods: '代表性抽样 · 线上问卷',
          },
          {
            title: '需求与可及',
            body: '弄清谁需要这项服务，以及现在是什么挡住了他们。',
            methods: '深度访谈 · 问卷',
          },
        ],
      },
      {
        n: '02',
        name: '项目设计',
        frame: '该做什么，以及放大之前能不能站住。',
        cards: [
          {
            title: '方案测试',
            body: '在放大之前，把模式或信息拿给它真正要服务的人测一遍。',
            methods: '概念测试 · 焦点小组',
          },
          {
            title: '捐赠者与支持者研究',
            body: '了解支持者如何看待这个议题，以及他们愿意为什么出钱。',
            methods: '线上问卷 · 深度访谈',
          },
        ],
      },
      {
        n: '03',
        name: '交付与覆盖',
        frame: '谁真正拿到了，在哪一步漏掉。',
        cards: [
          {
            title: '交付与覆盖',
            body: '弄清谁被覆盖、谁被漏掉，以及交付在执行环节的哪一步断掉。',
            methods: '深度访谈 · 问卷',
          },
          {
            title: '参与者体验',
            body: '研究项目里的人的体验，以及什么让他们留下来或退出。',
            methods: '问卷 · 焦点小组',
          },
        ],
      },
      {
        n: '04',
        name: '影响与说服',
        frame: '改变了什么，怎么讲出来。',
        cards: [
          {
            title: '对照基线的变化',
            body: '对照基线测量变化，并明确说明哪些能归因于项目、哪些不能。',
            methods: '问卷 · 访谈',
          },
          {
            title: '证据与呈现',
            body: '把结论做成资助方、主管部门或公众愿意接受的报告。',
            methods: '问卷 · 访谈 · 桌面研究',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['代表性抽样调查', '全国或区域代表性样本，配额按项目服务的人群设定。'],
      ['多利益相关方调查', '把受益方、执行人员与资助方放进同一套设计，同一组问题问到每一方。'],
      ['深度访谈', '由研究人员一对一进行 45–60 分钟的深度访谈。'],
      ['焦点小组', '约 90 分钟的小组讨论，用来看一个话题在同伴之间是怎么被谈起的。'],
      ['面访（CAPI）', '面对面进行的结构访问，用于电话与线上触达不到的人群。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '社會與教育',
    lead: '面向基金會、非營利組織與教育機構：受眾是誰、專案改變了什麼、怎麼證明。',
    introKicker: '我們如何做',
    intro: [
      '公益專案和教育專案的成效，往往要好幾年才看得見，而受眾又很少集中在同一個地方。',
      '我們研究專案想觸達的那批人：他們需要什麼、有沒有拿到、有什麼因此改變。同一套設計也涵蓋資助方、執行團隊，以及報告要說服的公眾。',
      '每項研究都圍繞它要支撐的決定來設計：專案要不要開始或停下、往哪裡投、資助方會接受什麼證據。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '議題與人群',
        frame: '誰受影響，需要到底是什麼。',
        cards: [
          {
            title: '公眾與受眾研究',
            body: '在設計專案之前，用調查弄清這個問題在一群人或一個地區裡是什麼樣。',
            methods: '代表性抽樣 · 線上問卷',
          },
          {
            title: '需求與可及',
            body: '弄清誰需要這項服務，以及現在是什麼擋住了他們。',
            methods: '深度訪談 · 問卷',
          },
        ],
      },
      {
        n: '02',
        name: '專案設計',
        frame: '該做什麼，以及放大之前能不能站住。',
        cards: [
          {
            title: '方案測試',
            body: '在放大之前，把模式或訊息拿給它真正要服務的人測一遍。',
            methods: '概念測試 · 焦點小組',
          },
          {
            title: '捐贈者與支持者研究',
            body: '了解支持者如何看待這個議題，以及他們願意為什麼出錢。',
            methods: '線上問卷 · 深度訪談',
          },
        ],
      },
      {
        n: '03',
        name: '交付與覆蓋',
        frame: '誰真正拿到了，在哪一步漏掉。',
        cards: [
          {
            title: '交付與覆蓋',
            body: '弄清誰被覆蓋、誰被漏掉，以及交付在執行環節的哪一步斷掉。',
            methods: '深度訪談 · 問卷',
          },
          {
            title: '參與者體驗',
            body: '研究專案裡的人的體驗，以及什麼讓他們留下來或退出。',
            methods: '問卷 · 焦點小組',
          },
        ],
      },
      {
        n: '04',
        name: '影響與說服',
        frame: '改變了什麼，怎麼講出來。',
        cards: [
          {
            title: '對照基線的變化',
            body: '對照基線測量變化，並明確說明哪些能歸因於專案、哪些不能。',
            methods: '問卷 · 訪談',
          },
          {
            title: '證據與呈現',
            body: '把結論做成資助方、主管部門或公眾願意接受的報告。',
            methods: '問卷 · 訪談 · 桌面研究',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['代表性抽樣調查', '全國或區域代表性樣本，配額按專案服務的人群設定。'],
      ['多利益相關方調查', '把受益方、執行人員與資助方放進同一套設計，同一組問題問到每一方。'],
      ['深度訪談', '由研究人員一對一進行 45–60 分鐘的深度訪談。'],
      ['焦點小組', '約 90 分鐘的小組討論，用來看一個話題在同伴之間是怎麼被談起的。'],
      ['面訪（CAPI）', '面對面進行的結構訪問，用於電話與線上觸達不到的人群。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustrySocial() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--social">
      <section className="ind-hero ind-hero--social">
        <img src={socialImage} alt="" decoding="async" />
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
