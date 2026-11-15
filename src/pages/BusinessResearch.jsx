import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sceneConsumer from '../assets/research/scene-consumer.webp';
import sceneProduct from '../assets/research/scene-product.webp';
import sceneBrand from '../assets/research/scene-brand.webp';
import sceneExperience from '../assets/research/scene-experience.webp';
import sceneCati from '../assets/research/scene-cati.webp';
import sceneQual from '../assets/research/scene-qual.webp';
import sceneB2b from '../assets/research/scene-b2b.webp';
import sceneHealth from '../assets/research/scene-health.webp';
import sceneAcademic from '../assets/research/scene-academic.webp';
import sceneAdvertising from '../assets/research/scene-advertising.webp';
import sceneSample from '../assets/research/scene-sample.webp';
import sceneLongitudinal from '../assets/research/scene-longitudinal.webp';
import BusinessAiPrompt from '../components/BusinessAiPrompt';
import BusinessContactBand from '../components/BusinessContactBand';
import BusinessTopNav from '../components/BusinessTopNav';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { pick } from '../content/projectStatus';
import './BusinessResearch.css';

/* Research catalogue. Four quiet function cards, a text-only service index,
   and one modal carrying the two ways in. No icons or buttons on the cards. */

export default function BusinessResearch() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [active, setActive] = useState(null);
  const go = (path) => navigate(withLanguage(path, language));

  useEffect(() => {
    if (!active) return undefined;
    const onKey = (event) => { if (event.key === 'Escape') setActive(null); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active]);

  const services = [
    {
      id: 'consumer',
      title: pick(language, '消费者与市场反应', 'Consumer & market response', '消費者與市場反應'),
      body: pick(language, '理解人们对产品、品牌与传播的真实反应。', 'What people actually think, feel and do.', '理解人們對產品、品牌與傳播的真實反應。'),
      image: sceneConsumer,
      story: [
        pick(language, '了解并追踪消费者对产品、品牌与传播的真实反应。',
          'Understand and track how consumers actually respond to your product, brand and communications.',
          '了解並追蹤消費者對產品、品牌與傳播的真實反應。'),
        pick(language, '从品类与使用态度调查，到品牌与广告效果追踪，再到概念与价格测试，我们帮你在花钱之前先把反应看清楚。',
          'From category and usage-and-attitude surveys, to brand and ad tracking, to concept and price testing, the response is clear before the money is spent.',
          '從品類與使用態度調查，到品牌與廣告效果追蹤，再到概念與價格測試，我們幫你在花錢之前先把反應看清楚。'),
      ],
      detail: pick(language, '先听真实用户怎么描述一个新品类、一次传播或一个市场假设，再决定下一步。', 'Hear how real people describe a new category, a campaign or a market assumption before deciding the next move.', '先聽真實用戶怎麼描述一個新品類、一次傳播或一個市場假設，再決定下一步。'),
      meta: pick(language, 'U&A 调查 · 品牌追踪 · 广告前测 等', 'U&A survey · Brand tracking · Ad testing', 'U&A 調查 · 品牌追蹤 · 廣告前測 等'),
    },
    {
      id: 'product',
      image: sceneProduct,
      title: pick(language, '产品、定价与概念测试', 'Product, pricing & concept testing', '產品、定價與概念測試'),
      body: pick(language, '比较概念、包装、价格与组合的市场接受度。', 'Test concepts, packs, prices and bundles.', '比較概念、包裝、價格與組合的市場接受度。'),
      story: [
        pick(language, '在上线前验证产品、概念与价格是否站得住。',
          'Know whether the product, concept and price will hold before launch.',
          '在上線前驗證產品、概念與價格是否站得住。'),
        pick(language, '从概念筛选与单概念测试，到价格区间与联合分析，再到上市后的偏好与复购追踪，我们把判断做在投入之前。',
          'From concept screening and monadic testing, to price ranges and conjoint analysis, to post-launch preference and repeat tracking, the call is made before the investment.',
          '從概念篩選與單概念測試，到價格區間與聯合分析，再到上市後的偏好與復購追蹤，我們把判斷做在投入之前。'),
      ],
      detail: pick(language, '在投入生产或发布前，把不同方案与价格点放在一起比较，找出最有把握的方向。', 'Compare routes and price points before production or launch, then choose the direction with the strongest support.', '在投入生產或發佈前，把不同方案與價格點放在一起比較，找出最有把握的方向。'),
      meta: pick(language, '概念测试 · 价格敏感度 · 联合分析 等', 'Concept testing · Price sensitivity · Conjoint', '概念測試 · 價格敏感度 · 聯合分析 等'),
    },
    {
      id: 'brand',
      image: sceneBrand,
      title: pick(language, '品牌与传播', 'Brand & communications', '品牌與傳播'),
      body: pick(language, '评估品牌认知、传播效果与 campaign 方向。', 'Measure brand perception, campaign effect and direction.', '評估品牌認知、傳播效果與 campaign 方向。'),
      story: [
        pick(language, '看清品牌在真实人群心里的位置，以及一次传播到底改变了什么。',
          'See where the brand actually sits with real audiences, and what a campaign really changed.',
          '看清品牌在真實人群心裡的位置，以及一次傳播到底改變了什麼。'),
        pick(language, '从品牌认知、考虑与购买意向的追踪，到广告记忆与说服力测试，再到传播前后与竞品的对照，我们把「有没有用」说清楚。',
          'From tracking awareness, consideration and purchase intent, to ad recall and persuasion testing, to before-and-after comparison against competitors, whether it worked is answered plainly.',
          '從品牌認知、考慮與購買意向的追蹤，到廣告記憶與說服力測試，再到傳播前後與競品的對照，我們把「有沒有用」說清楚。'),
      ],
      detail: pick(language, '看品牌在真实受众心里的位置，以及一次传播究竟改变了什么。', 'See where the brand sits in real audiences, and what a campaign actually changed.', '看品牌在真實受眾心裡的位置，以及一次傳播究竟改變了什麼。'),
      meta: pick(language, '品牌追踪 · 广告前测 · 传播效果评估 等', 'Brand tracking · Ad pre-testing · Campaign evaluation', '品牌追蹤 · 廣告前測 · 傳播效果評估 等'),
    },
    {
      id: 'cx',
      image: sceneExperience,
      title: pick(language, '客户体验', 'Customer experience', '客戶體驗'),
      body: pick(language, '沿着真实旅程找摩擦点、断点与改进优先级。', 'Find friction, drop-off and priorities across the real journey.', '沿著真實旅程找摩擦點、斷點與改進優先級。'),
      story: [
        pick(language, '看清客户从第一次接触、下单到复购或流失，究竟卡在哪一步。',
          'See where customers actually stall, from first contact and purchase to repeat or churn.',
          '看清客戶從第一次接觸、下單到復購或流失，究竟卡在哪一步。'),
        pick(language, '从旅程梳理与触点诊断，到满意度、NPS 与流失原因，再到改进优先级的排序，我们把「先修哪一段」说清楚。',
          'From journey mapping and touchpoint diagnosis, to satisfaction, NPS and churn reasons, to a ranked list of what to fix first, the next repair is named.',
          '從旅程梳理與觸點診斷，到滿意度、NPS 與流失原因，再到改進優先級的排序，我們把「先修哪一段」說清楚。'),
      ],
      detail: pick(language, '从第一次接触到复购或流失，按真实路径还原体验，而不是只看满意度分数。', 'Reconstruct the experience from first touch to repeat or churn, not just a satisfaction score.', '從第一次接觸到復購或流失，按真實路徑還原體驗，而不是只看滿意度分數。'),
      meta: pick(language, '旅程研究 · 触点诊断 · 满意度与 NPS 等', 'Journey research · Touchpoint diagnosis · NPS', '旅程研究 · 觸點診斷 · 滿意度與 NPS 等'),
    },
    {
      id: 'cati',
      image: sceneCati,
      title: pick(language, 'CATI 电话访问', 'CATI telephone interviewing', 'CATI 電話訪問'),
      body: pick(language, '通过计算机辅助电话访问触达难触达人群。', 'Reach harder-to-reach audiences through computer-assisted telephone interviewing.', '透過電腦輔助電話訪問觸達難觸達人群。'),
      story: [
        pick(language, '用电话触达线上样本覆盖不到的人。', 'Reach the people online panels miss.', '用電話觸達線上樣本覆蓋不到的人。'),
        pick(language, '从按地区与人群抽号，到访员按结构化问卷执行，再到完成率与质量的逐条核查，电话这一路补齐的是「人找不到」的部分。', 'From drawing numbers by region and audience, to interviewers running a structured questionnaire, to checking completion and quality case by case, the telephone route covers the people who cannot be found online.', '從按地區與人群抽號，到訪員按結構化問卷執行，再到完成率與質量的逐條核查，電話這一路補齊的是「人找不到」的部分。'),
      ],
      meta: pick(language, '电话访问 · 结构化问卷 · 配额抽样 等', 'Telephone interviews · Structured questionnaire · Quota sampling', '電話訪問 · 結構化問卷 · 配額抽樣 等'),

    },
    {
      id: 'qual',
      image: sceneQual,
      title: pick(language, '定性研究', 'Qualitative research', '定性研究'),
      body: pick(language, '用深度访谈、焦点小组和可用性测试解释“为什么”。', 'Explain the “why” through interviews, groups and usability work.', '用深度訪談、焦點小組和可用性測試解釋「為什麼」。'),
      story: [
        pick(language, '在数字解释不了的地方，用对话把原因问出来。', 'Where numbers stop explaining, ask people directly.', '在數字解釋不了的地方，用對話把原因問出來。'),
        pick(language, '从一对一的深度访谈，到小组讨论，再到可用性测试里看人怎么操作，我们把「为什么」补齐。', 'From one-to-one interviews, to group discussions, to watching how people actually use something in usability sessions, the why gets filled in.', '從一對一的深度訪談，到小組討論，再到可用性測試裡看人怎麼操作，我們把「為什麼」補齊。'),
      ],
      meta: pick(language, '深度访谈 · 焦点小组 · 可用性测试 等', 'In-depth interviews · Focus groups · Usability tests', '深度訪談 · 焦點小組 · 可用性測試 等'),

    },
    {
      id: 'b2b',
      image: sceneB2b,
      title: pick(language, 'B2B 与专家研究', 'B2B & expert research', 'B2B 與專家研究'),
      body: pick(language, '访谈商业决策者、专家与渠道伙伴。', 'Interview business decision-makers, experts and channel partners.', '訪談商業決策者、專家與渠道夥伴。'),
      story: [
        pick(language, '走进企业、机构与渠道，问清采购与采用是怎么决定的。', 'Find out how businesses, institutions and channels actually decide.', '走進企業、機構與渠道，問清採購與採用是怎麼決定的。'),
        pick(language, '从决策链上的角色分工，到采购标准与预算，再到渠道与落地的障碍，我们把企业侧的判断问清楚。', 'From who does what along the decision chain, to buying criteria and budgets, to channel and adoption barriers, the business-side judgement is made explicit.', '從決策鏈上的角色分工，到採購標準與預算，再到渠道與落地的障礙，我們把企業側的判斷問清楚。'),
      ],
      meta: pick(language, '决策者研究 · 专家访谈 · 渠道研究 等', 'Decision-maker research · Expert interviews · Channel research', '決策者研究 · 專家訪談 · 渠道研究 等'),

    },
    {
      id: 'health',
      image: sceneHealth,
      title: pick(language, '医疗健康与生命科学', 'Healthcare & life sciences', '醫療健康與生命科學'),
      body: pick(language, '面向患者、照护者与临床团队的研究设计。', 'Research with patients, caregivers and clinical teams.', '面向患者、照護者與臨床團隊的研究設計。'),
      story: [
        pick(language, '面向患者、照护者与临床团队做研究设计。', 'Research designed around patients, caregivers and clinical teams.', '面向患者、照護者與臨床團隊做研究設計。'),
        pick(language, '从患者路径与治疗体验，到合规边界内的问卷执行，再到结果的可复核性，这一行的特殊性我们照顾到。', 'From patient pathways and treatment experience, to fieldwork inside ethical and regulatory limits, to results that can be reviewed, the specifics of this field are built in.', '從患者路徑與治療體驗，到合規邊界內的問卷執行，再到結果的可複核性，這一行的特殊性我們照顧到。'),
      ],
      meta: pick(language, '患者研究 · 临床团队调查 · 合规抽样 等', 'Patient research · Clinical team surveys · Compliant sampling', '患者研究 · 臨床團隊調查 · 合規抽樣 等'),

    },
    {
      id: 'academic',
      image: sceneAcademic,
      title: pick(language, '学术与公共政策研究', 'Academic & public policy research', '學術與公共政策研究'),
      body: pick(language, '为学术、公共政策与社会议题提供可引用证据。', 'Evidence for academic, public-policy and social questions.', '為學術、公共政策與社會議題提供可引用證據。'),
      story: [
        pick(language, '为学术、公共政策与社会议题提供可引用的证据。', 'Citable evidence for academic, public-policy and social questions.', '為學術、公共政策與社會議題提供可引用的證據。'),
        pick(language, '从抽样与配额设计，到可复核的问卷与数据说明，再到能被引用的结论，方法写清楚，别人才敢引。', 'From sampling and quota design, to reviewable questionnaires and data notes, to conclusions others can cite, the method is written down so it can be checked.', '從抽樣與配額設計，到可複核的問卷與數據說明，再到能被引用的結論，方法寫清楚，別人才敢引。'),
      ],
      meta: pick(language, '抽样设计 · 可复核方法 · 数据说明 等', 'Sampling design · Reviewable methods · Data notes', '抽樣設計 · 可複核方法 · 數據說明 等'),

    },
    {
      id: 'advertising',
      image: sceneAdvertising,
      title: pick(language, '广告效果测试', 'Advertising effectiveness', '廣告效果測試'),
      body: pick(language, '测量广告记忆、说服力与投放后的行为变化。', 'Measure ad recall, persuasion and post-campaign behaviour.', '測量廣告記憶、說服力與投放後的行為變化。'),
      story: [
        pick(language, '测量广告记忆、说服力与投放后的变化。', 'Measure ad recall, persuasion and what changed after launch.', '測量廣告記憶、說服力與投放後的變化。'),
        pick(language, '从投放前的创意筛选，到投放中的记忆与态度，再到投放后与竞品的对照，我们把「有没有用」量出来。', 'From creative screening before launch, to recall and attitude during the campaign, to the comparison against competitors afterwards, whether it worked is measured.', '從投放前的創意篩選，到投放中的記憶與態度，再到投放後與競品的對照，我們把「有沒有用」量出來。'),
      ],
      meta: pick(language, '广告前测 · 记忆与说服力 · 品牌提升 等', 'Ad pre-testing · Recall and persuasion · Brand lift', '廣告前測 · 記憶與說服力 · 品牌提升 等'),

    },
    {
      id: 'sample',
      image: sceneSample,
      title: pick(language, '样本与招募', 'Sample & recruitment', '樣本與招募'),
      body: pick(language, '按人群、地区与条件招募真实受访者。', 'Recruit real respondents by audience, geography and criteria.', '按人群、地區與條件招募真實受訪者。'),
      story: [
        pick(language, '按人群、地区与条件招募真实受访者。', 'Recruit real respondents by audience, region and criteria.', '按人群、地區與條件招募真實受訪者。'),
        pick(language, '从配额设计，到多渠道招募与身份核查，再到超发与拒付的验收口径，样本这一层做实。', 'From quota design, to multi-channel recruitment and identity checks, to the acceptance rules for over-quota and rejected interviews, the sample is held to a standard.', '從配額設計，到多渠道招募與身份核查，再到超發與拒付的驗收口徑，樣本這一層做實。'),
      ],
      meta: pick(language, '配额抽样 · 多渠道招募 · 质量核查 等', 'Quota sampling · Multi-channel recruitment · Quality checks', '配額抽樣 · 多渠道招募 · 質量核查 等'),

    },
    {
      id: 'longitudinal',
      image: sceneLongitudinal,
      title: pick(language, '纵向追踪与再访', 'Longitudinal & re-contact research', '縱向追蹤與再訪'),
      body: pick(language, '对同一批人重复访问，观察随时间的变化。', 'Return to the same people over time to see what changes.', '對同一批人重複訪問，觀察隨時間的變化。'),
      story: [
        pick(language, '对同一批人重复访问，看时间带来的变化。', 'Return to the same people over time and see what moves.', '對同一批人重複訪問，看時間帶來的變化。'),
        pick(language, '从固定样本的建立，到分波复访与流失控制，再到跨波次的可比口径，我们把「变了多少」量出来。', 'From building a fixed sample, to wave-by-wave re-contact and attrition control, to a comparable measure across waves, how much changed is quantified.', '從固定樣本的建立，到分波複訪與流失控制，再到跨波次的可比口徑，我們把「變了多少」量出來。'),
      ],
      meta: pick(language, '固定样本 · 波次复访 · 追踪分析 等', 'Fixed sample · Wave re-contact · Tracking analysis', '固定樣本 · 波次複訪 · 追蹤分析 等'),

    },
  ];

  return (
    <main className="business-research business-workspace">
      <BusinessTopNav activeId="research" />
      <div className="business-research-inner">
        <h1 className="business-research-title">{pick(language, '探索场景', 'Explore scenarios', '探索場景')}</h1>
        <section className="business-research-services">
          <div className="business-research-grid">
            {services.map((service) => (
              <button key={service.id} type="button" className="business-research-card" onClick={() => setActive(service)} aria-haspopup="dialog">
                <div className="business-research-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </div>
                <span className="business-research-card-meta">{service.meta}</span>
              </button>
            ))}
          </div>
        </section>

        <div className="business-research-ai">
          <BusinessAiPrompt />
        </div>

        <BusinessContactBand />
      </div>

      {active && (
        <div className="business-research-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <section className="business-research-dialog" role="dialog" aria-modal="true" aria-labelledby="business-research-dialog-title">
            <button type="button" className="business-research-close" onClick={() => setActive(null)} aria-label={pick(language, '关闭', 'Close', '關閉')}>
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            {active.image && (
              <figure className="business-research-dialog-figure">
                <img src={active.image} alt="" loading="lazy" decoding="async" />
              </figure>
            )}
            <div className="business-research-dialog-body">
              <h2 id="business-research-dialog-title">{active.title}</h2>
              {(active.story || [active.detail]).map((paragraph) => (
                <p key={paragraph} className="business-research-dialog-lede">{paragraph}</p>
              ))}
              <p className="business-research-dialog-meta">
                <span>{pick(language, '方法论', 'Methodology', '方法論')}</span>
                {active.meta}
              </p>
              <div className="business-research-dialog-actions">
                <button
                  type="button"
                  className="is-solid"
                  onClick={() => { setActive(null); navigate(withLanguage('/business/workspace?new=1', language)); }}
                >
                  {pick(language, '开展研究', 'Start a study', '開展研究')}
                </button>
                <button type="button" onClick={() => { setActive(null); go('/business/access'); }}>
                  {pick(language, '联系我们', 'Contact us', '聯絡我們')}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
