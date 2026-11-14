import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessAiPrompt from '../components/BusinessAiPrompt';
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
      detail: pick(language, '先听真实用户怎么描述一个新品类、一次传播或一个市场假设，再决定下一步。', 'Hear how real people describe a new category, a campaign or a market assumption before deciding the next move.', '先聽真實用戶怎麼描述一個新品類、一次傳播或一個市場假設，再決定下一步。'),
      meta: pick(language, '深度访谈 · 在线社区 · 主题分析', 'In-depth interviews · online community · thematic analysis', '深度訪談 · 在線社區 · 主題分析'),
    },
    {
      id: 'product',
      title: pick(language, '产品、定价与概念测试', 'Product, pricing & concept testing', '產品、定價與概念測試'),
      body: pick(language, '比较概念、包装、价格与组合的市场接受度。', 'Test concepts, packs, prices and bundles.', '比較概念、包裝、價格與組合的市場接受度。'),
      detail: pick(language, '在投入生产或发布前，把不同方案与价格点放在一起比较，找出最有把握的方向。', 'Compare routes and price points before production or launch, then choose the direction with the strongest support.', '在投入生產或發佈前，把不同方案與價格點放在一起比較，找出最有把握的方向。'),
      meta: pick(language, '概念测试 · 价格敏感度 · 方案对比', 'Concept testing · price sensitivity · concept comparison', '概念測試 · 價格敏感度 · 方案對比'),
    },
    {
      id: 'brand',
      title: pick(language, '品牌与传播', 'Brand & communications', '品牌與傳播'),
      body: pick(language, '评估品牌认知、传播效果与 campaign 方向。', 'Measure brand perception, campaign effect and direction.', '評估品牌認知、傳播效果與 campaign 方向。'),
      detail: pick(language, '看品牌在真实受众心里的位置，以及一次传播究竟改变了什么。', 'See where the brand sits in real audiences, and what a campaign actually changed.', '看品牌在真實受眾心裡的位置，以及一次傳播究竟改變了什麼。'),
      meta: pick(language, '品牌认知 · 传播诊断 · 态度变化', 'Brand perception · communication diagnosis · attitude shift', '品牌認知 · 傳播診斷 · 態度變化'),
    },
    {
      id: 'cx',
      title: pick(language, '客户体验', 'Customer experience', '客戶體驗'),
      body: pick(language, '沿着真实旅程找摩擦点、断点与改进优先级。', 'Find friction, drop-off and priorities across the real journey.', '沿著真實旅程找摩擦點、斷點與改進優先級。'),
      detail: pick(language, '从第一次接触到复购或流失，按真实路径还原体验，而不是只看满意度分数。', 'Reconstruct the experience from first touch to repeat or churn, not just a satisfaction score.', '從第一次接觸到復購或流失，按真實路徑還原體驗，而不是只看滿意度分數。'),
      meta: pick(language, '旅程地图 · 摩擦点 · 优先级', 'Journey map · friction points · priorities', '旅程地圖 · 摩擦點 · 優先級'),
    },
    {
      id: 'cati',
      title: pick(language, 'CATI 电话访问', 'CATI telephone interviewing', 'CATI 電話訪問'),
      body: pick(language, '通过计算机辅助电话访问触达难触达人群。', 'Reach harder-to-reach audiences through computer-assisted telephone interviewing.', '透過電腦輔助電話訪問觸達難觸達人群。'),
      detail: pick(language, '需要电话覆盖、固定样本或特定地区人群时，由访员按结构化问卷执行访问。', 'When a study needs telephone coverage, a fixed sample or a specific region, interviewers run a structured questionnaire.', '需要電話覆蓋、固定樣本或特定地區人群時，由訪員按結構化問卷執行訪問。'),
      meta: pick(language, '电话访问 · 结构化问卷 · 访员执行', 'Telephone interviews · structured questionnaire · interviewer-led', '電話訪問 · 結構化問卷 · 訪員執行'),
    },
    {
      id: 'qual',
      title: pick(language, '定性研究', 'Qualitative research', '定性研究'),
      body: pick(language, '用深度访谈、焦点小组和可用性测试解释“为什么”。', 'Explain the “why” through interviews, groups and usability work.', '用深度訪談、焦點小組和可用性測試解釋「為什麼」。'),
      detail: pick(language, '数字说明发生了什么，访谈和焦点小组解释为什么发生、还有哪些可能。', 'Numbers show what happened; interviews and focus groups explain why and what else is possible.', '數字說明發生了什麼，訪談和焦點小組解釋為什麼發生、還有哪些可能。'),
      meta: pick(language, '深度访谈 · 焦点小组 · 可用性测试', 'In-depth interviews · focus groups · usability tests', '深度訪談 · 焦點小組 · 可用性測試'),
    },
    {
      id: 'b2b',
      title: pick(language, 'B2B 与专家研究', 'B2B & expert research', 'B2B 與專家研究'),
      body: pick(language, '访谈商业决策者、专家与渠道伙伴。', 'Interview business decision-makers, experts and channel partners.', '訪談商業決策者、專家與渠道夥伴。'),
      detail: pick(language, '面向企业、机构与渠道的决策链，弄清采购标准、预算和真正的采用障碍。', 'Work through the decision chain across businesses, institutions and channels to find buying criteria, budgets and real adoption barriers.', '面向企業、機構與渠道的決策鏈，弄清採購標準、預算和真正的採用障礙。'),
      meta: pick(language, '决策者 · 专家 · 渠道伙伴', 'Decision-makers · experts · channel partners', '決策者 · 專家 · 渠道夥伴'),
    },
    {
      id: 'health',
      title: pick(language, '医疗健康与生命科学', 'Healthcare & life sciences', '醫療健康與生命科學'),
      body: pick(language, '面向患者、照护者与临床团队的研究设计。', 'Research with patients, caregivers and clinical teams.', '面向患者、照護者與臨床團隊的研究設計。'),
      detail: pick(language, '在合规与伦理边界内，理解患者路径、治疗体验和临床沟通。', 'Understand patient pathways, treatment experience and clinical communication within ethical and regulatory boundaries.', '在合規與倫理邊界內，理解患者路徑、治療體驗與臨床溝通。'),
      meta: pick(language, '患者 · 照护者 · 临床团队', 'Patients · caregivers · clinical teams', '患者 · 照護者 · 臨床團隊'),
    },
    {
      id: 'academic',
      title: pick(language, '学术与公共政策研究', 'Academic & public policy research', '學術與公共政策研究'),
      body: pick(language, '为学术、公共政策与社会议题提供可引用证据。', 'Evidence for academic, public-policy and social questions.', '為學術、公共政策與社會議題提供可引用證據。'),
      detail: pick(language, '为需要严谨样本、可复核方法和可引用结论的学术或公共议题提供证据。', 'Evidence for academic or public questions that need rigorous sampling, reviewable methods and citable conclusions.', '為需要嚴謹樣本、可複核方法和可引用結論的學術或公共議題提供證據。'),
      meta: pick(language, '严谨抽样 · 可复核方法 · 可引用结论', 'Rigorous sampling · reviewable methods · citable conclusions', '嚴謹抽樣 · 可複核方法 · 可引用結論'),
    },
    {
      id: 'advertising',
      title: pick(language, '广告效果测试', 'Advertising effectiveness', '廣告效果測試'),
      body: pick(language, '测量广告记忆、说服力与投放后的行为变化。', 'Measure ad recall, persuasion and post-campaign behaviour.', '測量廣告記憶、說服力與投放後的行為變化。'),
      detail: pick(language, '在投放前筛选方向，或在投放后判断广告是否真的改变了认知与行为。', 'Screen directions before launch, or judge whether a campaign actually changed perception and behaviour.', '在投放前篩選方向，或在投放後判斷廣告是否真的改變了認知與行為。'),
      meta: pick(language, '前测 · 记忆 · 说服力', 'Pre-testing · recall · persuasion', '前測 · 記憶 · 說服力'),
    },
    {
      id: 'sample',
      title: pick(language, '样本与招募', 'Sample & recruitment', '樣本與招募'),
      body: pick(language, '按人群、地区与条件招募真实受访者。', 'Recruit real respondents by audience, geography and criteria.', '按人群、地區與條件招募真實受訪者。'),
      detail: pick(language, '按人群、地区与配额招募受访者，从普通消费者到难触达的专业人群。', 'Recruit respondents by audience, geography and quota, from general consumers to hard-to-reach professionals.', '按人群、地區與配額招募受訪者，從普通消費者到難觸達的專業人群。'),
      meta: pick(language, '人群 · 地区 · 配额', 'Audience · geography · quotas', '人群 · 地區 · 配額'),
    },
    {
      id: 'longitudinal',
      title: pick(language, '纵向追踪与再访', 'Longitudinal & re-contact research', '縱向追蹤與再訪'),
      body: pick(language, '对同一批人重复访问，观察随时间的变化。', 'Return to the same people over time to see what changes.', '對同一批人重複訪問，觀察隨時間的變化。'),
      detail: pick(language, '对同一批人重复访问，看认知、行为或关系随时间怎么变。', 'Return to the same people over time to see how perception, behaviour or relationships change.', '對同一批人重複訪問，看認知、行為或關係隨時間怎麼變。'),
      meta: pick(language, '固定样本 · 波次对比 · 再访', 'Fixed sample · wave comparison · re-contact', '固定樣本 · 波次對比 · 再訪'),
    },
  ];

  return (
    <main className="business-research">
      <BusinessTopNav activeId="research" />
      <div className="business-research-inner">
        <h1 className="business-research-sr-only">{pick(language, '研究服务', 'Research services', '研究服務')}</h1>
        <section className="business-research-services">
          <div className="business-research-grid">
            {services.map((service, index) => (
              <button key={service.id} type="button" className="business-research-card" onClick={() => setActive(service)} aria-haspopup="dialog">
                <span className="business-research-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="business-research-card-copy">
                  <h3>{service.title}</h3>
                  <p>{service.body}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="business-research-ai">
          <BusinessAiPrompt />
        </div>
      </div>

      {active && (
        <div className="business-research-modal" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setActive(null); }}>
          <section className="business-research-dialog" role="dialog" aria-modal="true" aria-labelledby="business-research-dialog-title">
            <button type="button" className="business-research-close" onClick={() => setActive(null)} aria-label={pick(language, '关闭', 'Close', '關閉')}>
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <h2 id="business-research-dialog-title">{active.title}</h2>
            <p className="business-research-dialog-lede">{active.detail}</p>
            <p className="business-research-dialog-meta">{active.meta}</p>
            <div className="business-research-dialog-actions">
              <button type="button" onClick={() => go('/business/custom-questionnaire')}>{pick(language, '定制研究', 'Custom research', '定製研究')}</button>
              <button type="button" className="is-solid" onClick={() => go('/business/workspace?view=questionnaires')}>{pick(language, '调查 × 24h', 'Survey × 24h', '調查 × 24h')}</button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
