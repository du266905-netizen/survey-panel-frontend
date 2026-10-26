import { Link } from 'react-router-dom';
import {
  ArrowRight, ClipboardPenLine, FilePenLine, Sparkles, Route, LayoutDashboard,
} from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './MarketEntry.css';

/* 解决方案 · 进入市场 —— 2026-10-27 第一张，故意做短。

   文案全部来自已有的东西：眉标和标题来自 Solutions 导航，说明句就是那条
   note（Size, audience and route to market）的中文，按钮和三个方法名也都在
   站里出现过。没有新写的判断句、没有数字、没有案例——数据和案例等业主给，
   到了往 me-methods 后面加段就行。

   版式按业主定的：灰屏 → 更深一档的灰 → 黑。首屏 80 字，整屏就一句。 */

/* 十个行业，绕着首屏那句大字转。名字和链接取行业页自己的文案。
   轨道不是正圆：每条卡自己的半径、起始角、周期都不一样，看起来是散着的，
   但半径都落在文字框之外，转到哪儿都不会压到标题。 */
const industryKeys = ['automotive', 'travel', 'consumer', 'healthcare', 'finance', 'social', 'industrial', 'tech', 'media', 'ecommerce'];



const copy = {
  'en-US': {
    group: 'Market entry',
    title: 'A clear brief is where good research starts.',
    lede: 'Size, audience and route to market.',
    free: 'Start for free',
    action: 'Contact sales',
    platformLabel: 'The platform',
    platformTitle: 'One set of tools, from question to report.',
    platform: [
      { icon: ClipboardPenLine, title: 'Questionnaire design', body: 'Bring the decision and the people who matter; we prepare a focused questionnaire.' },
      { icon: FilePenLine, title: 'Questionnaire editor', body: 'Edit questions, add logic and preview in the editor; a revision is not a meeting.' },
      { icon: Sparkles, title: 'AI assist', body: 'Draft with AI and check the logic; the judgement stays with people.' },
      { icon: Route, title: 'Custom research', body: 'Agree the format, participants, timing and deliverables before the work starts.' },
      { icon: LayoutDashboard, title: 'One workspace', body: 'The brief, the confirmed plan, progress and next steps stay in one place.' },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/solutions/qualitative' },
      { label: 'Quantitative', to: '/solutions/quantitative' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
  },
  'en-GB': {
    group: 'Market entry',
    title: 'A clear brief is where good research starts.',
    lede: 'Size, audience and route to market.',
    free: 'Start for free',
    action: 'Contact sales',
    platformLabel: 'The platform',
    platformTitle: 'One set of tools, from question to report.',
    platform: [
      { icon: ClipboardPenLine, title: 'Questionnaire design', body: 'Bring the decision and the people who matter; we prepare a focused questionnaire.' },
      { icon: FilePenLine, title: 'Questionnaire editor', body: 'Edit questions, add logic and preview in the editor; a revision is not a meeting.' },
      { icon: Sparkles, title: 'AI assist', body: 'Draft with AI and check the logic; the judgement stays with people.' },
      { icon: Route, title: 'Custom research', body: 'Agree the format, participants, timing and deliverables before the work starts.' },
      { icon: LayoutDashboard, title: 'One workspace', body: 'The brief, the confirmed plan, progress and next steps stay in one place.' },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/solutions/qualitative' },
      { label: 'Quantitative', to: '/solutions/quantitative' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
  },
  'zh-CN': {
    group: '进入市场',
    title: '清晰的需求，是好研究的起点。',
    lede: '规模、受众与进入路径。',
    free: '免费开始',
    action: '联系销售',
    platformLabel: '研究平台',
    platformTitle: '一套工具，从问题到报告。',
    platform: [
      { icon: ClipboardPenLine, title: '问卷设计', body: '带来你的决策和重要的人群，我们为项目准备聚焦的问卷。' },
      { icon: FilePenLine, title: '问卷编辑器', body: '在编辑器里改题、加逻辑、预览，改一版不用等一次会议。' },
      { icon: Sparkles, title: 'AI 辅助', body: '用 AI 起草初稿、检查逻辑，判断留给人。' },
      { icon: Route, title: '定制研究', body: '先定形式、参与者、时间与交付物，再开工。' },
      { icon: LayoutDashboard, title: '统一工作区', body: '需求、确认的方案、进度和下一步，都在一个工作区里。' },
    ],
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/solutions/qualitative' },
      { label: '定量', to: '/solutions/quantitative' },
      { label: '混合', to: '/how-it-works' },
    ],
  },
  'zh-Hant': {
    group: '進入市場',
    title: '清晰的需求，是好研究的起點。',
    lede: '規模、受眾與進入路徑。',
    free: '免費開始',
    action: '聯繫銷售',
    platformLabel: '研究平台',
    platformTitle: '一套工具，從問題到報告。',
    platform: [
      { icon: ClipboardPenLine, title: '問卷設計', body: '帶來你的決策和重要的人群，我們為專案準備聚焦的問卷。' },
      { icon: FilePenLine, title: '問卷編輯器', body: '在編輯器裡改題、加邏輯、預覽，改一版不用等一次會議。' },
      { icon: Sparkles, title: 'AI 輔助', body: '用 AI 起草初稿、檢查邏輯，判斷留給人。' },
      { icon: Route, title: '定製研究', body: '先定形式、參與者、時間與交付物，再開工。' },
      { icon: LayoutDashboard, title: '統一工作區', body: '需求、確認的方案、進度與下一步，都在一個工作區裡。' },
    ],
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/solutions/qualitative' },
      { label: '定量', to: '/solutions/quantitative' },
      { label: '混合', to: '/how-it-works' },
    ],
  },
};

export default function MarketEntry() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  // 标题和说明句跟导航面板用同一份译文（chromeCopy.items['market-entry']），
  // 改一处两边一起改，不会再出现「受众 / 人群」这种对不上的情况。
  const entry = publicCopy.chrome?.items?.['market-entry'];
  const t = { ...base, group: entry?.title || base.group, lede: entry?.note || base.lede };
  usePageTitle(t.group);

  return (
    <main className="market-entry-page">
      <section className="me-hero">
        <p className="me-eyebrow">{t.group}</p>
        <h1 className="me-title">{t.title}</h1>
        <p className="me-lede">{t.lede}</p>
        <div className="me-actions">
          <Link className="me-action me-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="me-action me-action--quiet" to={withLanguage('/contact', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>

      </section>

      <section className="me-methods" aria-labelledby="me-methods-title">
        <p className="me-eyebrow me-eyebrow--light" id="me-methods-title">{t.methodsLabel}</p>
        <ul>
          {t.methods.map((method) => (
            <li key={method.label}>
              <Link to={withLanguage(method.to, language)}>
                {method.label}
                <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="me-platform" aria-labelledby="me-platform-title">
        <p className="me-eyebrow me-eyebrow--light">{t.platformLabel}</p>
        <h2 id="me-platform-title" className="me-platform-title">{t.platformTitle}</h2>
        <ul className="me-platform-grid">
          {t.platform.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Icon size={23} strokeWidth={1.65} aria-hidden="true" />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="me-contact" aria-labelledby="me-contact-title">
        <h2 id="me-contact-title" className="me-contact-title">
          {t.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        <div className="me-actions">
          <Link className="me-action me-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="me-action me-action--quiet" to={withLanguage('/contact', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
