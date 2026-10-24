import { Link } from 'react-router-dom';
import { useLanguage } from '../components/LanguageContext';
import healthcareImage from '../assets/industries/healthcare-hero.jpg';
import './IndustryPage.css';

/* 行业页——医疗健康与生命科学。2026-10-24。

   壳与字号同前三页；主线按医疗决策链：患者路径 → 医生与处方 → 可及性与支付 → 上市与准入。
   四段的小字就是这家客户真正在问的问题，不再另设"问题清单"区块。

   口径同前三页：无数字、不点名岗位（专科医生是人群类别，不是职位列表）、
   不与其他方法比较、每卡一到两句。 */

const copy = {
  'en-US': {
    kicker: 'Industries',
    title: 'Healthcare & life sciences',
    lead: 'Research for pharmaceutical, medtech and care providers: the patient pathway, what clinicians decide, and what limits access.',
    introKicker: 'How we work',
    intro: [
      'Care is decided in more than one place: in the clinic, at the payer, and at home, where the patient decides whether to continue.',
      'We study each of them: how a patient moves from symptom to diagnosis, what a clinician weighs when choosing a treatment, and what cost, distance or stigma does to access.',
      'Each study is designed around the decision it has to support — whether to enter a market, how to frame the evidence, which specialist group to approach first. Design, sample and reporting follow from that question.',
    ],
    stagesKicker: 'What we study',
    stages: [
      {
        n: '01',
        name: 'Patient pathway',
        frame: 'Where the pathway stalls, from symptom to diagnosis to treatment.',
        cards: [
          {
            title: 'Diagnosis journey',
            body: 'Map the route from first symptom to confirmed diagnosis, and the points where patients are delayed or lost.',
            methods: 'In-depth interviews · patient survey',
          },
          {
            title: 'Treatment and adherence',
            body: 'Follow what happens after prescription: who continues, who stops, and why.',
            methods: 'Patient survey · CATI',
          },
        ],
      },
      {
        n: '02',
        name: 'Clinicians and prescribing',
        frame: 'What a clinician weighs when choosing a treatment, and what they will not accept.',
        cards: [
          {
            title: 'Perception and prescribing',
            body: 'Understand how specialists perceive the condition, the options, and the evidence behind them.',
            methods: 'Physician in-depth interviews',
          },
          {
            title: 'Specialist sample',
            body: 'Specialists are screened on subspecialty, practice setting and case volume, and their credentials verified before the interview.',
            methods: 'Credential-verified HCP sample',
          },
        ],
      },
      {
        n: '03',
        name: 'Access and payment',
        frame: 'Cost, coverage, distance and stigma, and which one stops treatment.',
        cards: [
          {
            title: 'Cost and affordability',
            body: 'Establish what patients pay, what is covered, and where cost ends treatment.',
            methods: 'Patient survey · in-depth interviews',
          },
          {
            title: 'Stigma and care-seeking',
            body: 'Study when people delay care, and who they turn to first.',
            methods: 'Patient survey · in-depth interviews',
          },
        ],
      },
      {
        n: '04',
        name: 'Launch and market access',
        frame: 'How the evidence is framed, and who adopts first.',
        cards: [
          {
            title: 'Evidence and message testing',
            body: 'Test how clinical evidence is understood by the specialists and payers who act on it.',
            methods: 'Message testing · specialist interviews',
          },
          {
            title: 'Early adoption',
            body: 'Identify which centres and clinicians adopt first, and what they need before they do.',
            methods: 'In-depth interviews · CATI',
          },
        ],
      },
    ],
    methodsKicker: 'Methods',
    methodsLead: 'What each method is, and when we use it.',
    methods: [
      ['Physician in-depth interviews', 'Interviews of 45 to 60 minutes with specialists, with credentials verified before fieldwork.'],
      ['Specialist sample', 'Specialists are screened on specialty and subspecialty, practice setting, case volume and prescribing authority, with credentials verified before the interview.'],
      ['Patient survey', 'Patients are surveyed online or by telephone, with quotas by condition, treatment stage, severity and market. Rare conditions are recruited through patient communities.'],
      ['CATI', 'Scripted telephone interviews, with quotas set by specialty, setting or market. Used where the list is defined.'],
      ['Online tracking', 'Monthly or quarterly tracking on fixed measures, so movement can be read against the same base.'],
    ],
    ctaTitle: 'Tell us the decision this research has to support.',
    ctaBody: 'You receive the findings, the evidence behind them, and the recommended next step.',
    ctaPrimary: 'Talk to the research team',
    ctaSecondary: 'Join us',
  },

  'zh-CN': {
    kicker: '行业',
    title: '医疗健康与生命科学',
    lead: '面向药企、器械与医疗服务机构：患者路径、医生如何决策，以及什么限制了可及。',
    introKicker: '我们怎么做',
    intro: [
      '医疗决策同时发生在几个地方：诊室里、支付方那里，以及患者家里——他决定要不要继续。',
      '我们分别研究：患者从症状到确诊怎么走、医生在选择治疗方案时权衡什么、以及费用、距离与污名如何影响可及。',
      '每项研究都围绕它要支撑的决定来设计：要不要进一个市场、证据怎么讲、先接触哪一类专科医生。设计、样本与报告由这个问题决定。',
    ],
    stagesKicker: '我们研究什么',
    stages: [
      {
        n: '01',
        name: '患者路径',
        frame: '从症状到确诊到治疗，卡在哪一步。',
        cards: [
          {
            title: '就诊与确诊',
            body: '梳理从首次症状到确诊的路径，以及患者在哪些环节被延误或流失。',
            methods: '深度访谈 · 患者问卷',
          },
          {
            title: '治疗与依从',
            body: '追踪处方之后发生的事：谁在用、谁停了、为什么。',
            methods: '患者问卷 · 电话访问',
          },
        ],
      },
      {
        n: '02',
        name: '医生与处方',
        frame: '医生在选择治疗方案时权衡什么，又不接受什么。',
        cards: [
          {
            title: '认知与处方',
            body: '了解专科医生如何看待这个疾病、可选方案，以及背后的证据。',
            methods: '医生深度访谈',
          },
          {
            title: '专科医生样本',
            body: '按亚专科、执业机构与病例量筛选专科医生，并在访谈前核验资质。',
            methods: '资质核验后的医生样本',
          },
        ],
      },
      {
        n: '03',
        name: '可及性与支付',
        frame: '费用、覆盖、距离与污名，哪一项终止了治疗。',
        cards: [
          {
            title: '支付与可负担',
            body: '弄清患者实际付多少、哪些被覆盖，以及费用在哪一步终止了治疗。',
            methods: '患者问卷 · 深度访谈',
          },
          {
            title: '污名与求医',
            body: '研究人们何时延迟就医，以及最先求助的是谁。',
            methods: '患者问卷 · 深度访谈',
          },
        ],
      },
      {
        n: '04',
        name: '上市与准入',
        frame: '证据怎么讲，谁先用。',
        cards: [
          {
            title: '证据与信息测试',
            body: '测试专科医生与支付方如何理解临床证据。',
            methods: '信息测试 · 专科医生访谈',
          },
          {
            title: '早期采用',
            body: '找出哪些中心与医生会先采用，以及采用前需要什么。',
            methods: '深度访谈 · 电话访问',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每种方法是什么，什么情况下用它。',
    methods: [
      ['医生深度访谈', '与专科医生进行 45–60 分钟访谈，执行前核验资质。'],
      ['专科医生样本', '按专科与亚专科、执业机构、月均病例量与处方权限筛选专科医生，并在访谈前核验资质。'],
      ['患者问卷', '通过线上或电话访问患者，配额按病种、治疗阶段、严重程度与市场设定；罕见病通过患者社群招募。'],
      ['电话访问（CATI）', '按脚本执行电话访问，配额按专科、执业机构或市场设定。用于名单明确的项目。'],
      ['在线追踪', '按月或按季的在线追踪，指标固定，变化可对照同一套基数来读。'],
    ],
    ctaTitle: '告诉我们，这项研究要支撑的那个决定。',
    ctaBody: '你会拿到结论、支撑结论的证据，以及建议的下一步。',
    ctaPrimary: '联系研究团队',
    ctaSecondary: '加入我们',
  },

  'zh-Hant': {
    kicker: '產業',
    title: '醫療健康與生命科學',
    lead: '面向藥廠、器械與醫療服務機構：患者路徑、醫生如何決策，以及什麼限制了可及。',
    introKicker: '我們怎麼做',
    intro: [
      '醫療決策同時發生在幾個地方：診間裡、支付方那裡，以及患者家裡——他決定要不要繼續。',
      '我們分別研究：患者從症狀到確診歷經哪些環節、醫生在選擇治療方案時權衡什麼、以及費用、距離與污名如何影響可及。',
      '每項研究都圍繞它要支撐的決定來設計：要不要進一個市場、證據怎麼講、先接觸哪一類專科醫生。設計、樣本與報告由這個問題決定。',
    ],
    stagesKicker: '我們研究什麼',
    stages: [
      {
        n: '01',
        name: '患者路徑',
        frame: '從症狀到確診到治療，卡在哪一步。',
        cards: [
          {
            title: '就診與確診',
            body: '梳理從首次症狀到確診的路徑，以及患者在哪些環節被延誤或流失。',
            methods: '深度訪談 · 患者問卷',
          },
          {
            title: '治療與依從',
            body: '追蹤處方之後發生的事：誰在用、誰停了、為什麼。',
            methods: '患者問卷 · 電話訪問',
          },
        ],
      },
      {
        n: '02',
        name: '醫生與處方',
        frame: '醫生在選擇治療方案時權衡什麼，又不接受什麼。',
        cards: [
          {
            title: '認知與處方',
            body: '了解專科醫生如何看待這個疾病、可選方案，以及背後的證據。',
            methods: '醫生深度訪談',
          },
          {
            title: '專科醫生樣本',
            body: '按亞專科、執業機構與病例量篩選專科醫生，並在訪談前核驗資質。',
            methods: '資質核驗後的醫生樣本',
          },
        ],
      },
      {
        n: '03',
        name: '可及性與支付',
        frame: '費用、覆蓋、距離與污名，哪一項終止了治療。',
        cards: [
          {
            title: '支付與可負擔',
            body: '弄清患者實際付多少、哪些被覆蓋，以及費用在哪一步終止了治療。',
            methods: '患者問卷 · 深度訪談',
          },
          {
            title: '污名與求醫',
            body: '研究人們何時延遲就醫，以及最先求助的是誰。',
            methods: '患者問卷 · 深度訪談',
          },
        ],
      },
      {
        n: '04',
        name: '上市與准入',
        frame: '證據怎麼講，誰先用。',
        cards: [
          {
            title: '證據與訊息測試',
            body: '測試專科醫生與支付方如何理解臨床證據。',
            methods: '訊息測試 · 專科醫生訪談',
          },
          {
            title: '早期採用',
            body: '找出哪些中心與醫生會先採用，以及採用前需要什麼。',
            methods: '深度訪談 · 電話訪問',
          },
        ],
      },
    ],
    methodsKicker: '方法',
    methodsLead: '每種方法是什麼，什麼情況下用它。',
    methods: [
      ['醫生深度訪談', '與專科醫生進行 45–60 分鐘訪談，執行前核驗資質。'],
      ['專科醫生樣本', '按專科與亞專科、執業機構、月均病例量與處方權限篩選專科醫生，並在訪談前核驗資質。'],
      ['患者問卷', '透過線上或電話訪問患者，配額按病種、治療階段、嚴重程度與市場設定；罕見病透過患者社群招募。'],
      ['電話訪問（CATI）', '按腳本執行電話訪問，配額按專科、執業機構或市場設定。用於名單明確的專案。'],
      ['線上追蹤', '按月或按季的線上追蹤，指標固定，變化可對照同一套基數來讀。'],
    ],
    ctaTitle: '告訴我們，這項研究要支撐的那個決定。',
    ctaBody: '你會拿到結論、支撐結論的證據，以及建議的下一步。',
    ctaPrimary: '聯絡研究團隊',
    ctaSecondary: '加入我們',
  },
};

export default function IndustryHealthcare() {
  const { language } = useLanguage();
  const c = copy[language] || copy['en-US'];

  return (
    <main className="industry-page industry-page--healthcare">
      <section className="ind-hero ind-hero--healthcare">
        <img src={healthcareImage} alt="" decoding="async" />
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
