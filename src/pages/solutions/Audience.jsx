import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './Audience.css';

/* 解决方案 · 了解受众 —— 2026-10-27 第二张，节奏与进入市场那张一致：
   灰首屏 → 方法三栏 → 深一档的灰（受众方案）→ 黑收尾。

   这一页没有一句新写的话。逐句出处见 docs/COPY-2026-10-27-audience.md：
   眉标与 H1 用导航译文，说明句和「受众方案」五格用受众方案页的表单原文
   （researchTranslations.js 的 audiencePlan 块），收尾句沿用进入市场页。
   上一轮在定量页编句子的教训（ERRORS-FRONTEND.md FE-2026-10-27-01）。 */

const copy = {
  'en-US': {
    title: 'Who buys, why, and how they split.',
    lede: 'A target audience is a research condition, not a contact list.',
    free: 'Start for free',
    action: 'Contact sales',
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/solutions/qualitative' },
      { label: 'Quantitative', to: '/solutions/quantitative' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
    schemeLabel: 'Audience plan',
    schemeTitle: 'Define whose voice matters first.',
    scheme: [
      'What decision should this research support?',
      'Whose perspective do you need?',
      'Market or region · Questionnaire language or local-expression needs',
      'Planned completed responses · Preferred timing',
      'Screening conditions, industry, or context to include',
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    title: 'Who buys, why, and how they split.',
    lede: 'A target audience is a research condition, not a contact list.',
    free: 'Start for free',
    action: 'Contact sales',
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/solutions/qualitative' },
      { label: 'Quantitative', to: '/solutions/quantitative' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
    schemeLabel: 'Audience plan',
    schemeTitle: 'Define whose voice matters first.',
    scheme: [
      'What decision should this research support?',
      'Whose perspective do you need?',
      'Market or region · Questionnaire language or local-expression needs',
      'Planned completed responses · Preferred timing',
      'Screening conditions, industry, or context to include',
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    title: '谁在买、为什么、怎么分群。',
    lede: '目标受众是研究条件，不是联系人名单。',
    free: '免费开始',
    action: '联系销售',
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/solutions/qualitative' },
      { label: '定量', to: '/solutions/quantitative' },
      { label: '混合', to: '/how-it-works' },
    ],
    schemeLabel: '受众方案',
    schemeTitle: '先定义要听谁的声音。',
    scheme: [
      '这项研究要支持什么决策？',
      '你希望听到哪些人的看法？',
      '市场或地区 · 问卷语言或本地表达需求',
      '计划的有效样本数 · 希望的完成时间',
      '需要纳入的筛选条件、行业或背景',
    ],
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    title: '誰在買、為什麼、如何分群。',
    lede: '目標對象是一項研究條件，而非聯絡人名單。',
    free: '免費開始',
    action: '聯繫銷售',
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/solutions/qualitative' },
      { label: '定量', to: '/solutions/quantitative' },
      { label: '混合', to: '/how-it-works' },
    ],
    schemeLabel: '受眾方案',
    schemeTitle: '先界定誰的意見最重要。',
    scheme: [
      '這項研究應支持哪一項決策？',
      '你需要誰的觀點？',
      '市場或地區 · 問卷語言或在地用語需求',
      '預計完成回覆數 · 希望時程',
      '要納入的篩選條件、產業或背景資訊',
    ],
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
};

export default function Audience() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  // 眉标用导航译文；H1 就是那条 note，和下拉菜单里看到的是同一句话。
  const entry = publicCopy.chrome?.items?.['audience'];
  const t = { ...base, group: entry?.title || 'Audience understanding', title: entry?.note || base.title };
  usePageTitle(t.group);

  const actions = (
    <div className="au-actions">
      <Link className="au-action au-action--primary" to={withLanguage('/business/register', language)}>
        {base.free}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
      <Link className="au-action au-action--quiet" to={withLanguage('/business/access', language)}>
        {base.action}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="audience-page">
      <section className="au-hero">
        <p className="au-eyebrow">{t.group}</p>
        <h1 className="au-title">{t.title}</h1>
        <p className="au-lede">{base.lede}</p>
        {actions}
      </section>

      <section className="au-methods" aria-labelledby="au-methods-title">
        <p className="au-eyebrow au-eyebrow--light" id="au-methods-title">{base.methodsLabel}</p>
        <ul>
          {base.methods.map((method) => (
            <li key={method.label}>
              <Link to={withLanguage(method.to, language)}>
                {method.label}
                <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="au-scheme" aria-labelledby="au-scheme-title">
        <p className="au-eyebrow au-eyebrow--light">{base.schemeLabel}</p>
        <h2 id="au-scheme-title" className="au-scheme-title">{base.schemeTitle}</h2>
        <ol className="au-scheme-list">
          {base.scheme.map((item, index) => (
            <li key={item}>
              <span className="au-scheme-index">{String(index + 1).padStart(2, '0')}</span>
              <p>{item}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="au-contact" aria-labelledby="au-contact-title">
        <h2 id="au-contact-title" className="au-contact-title">
          {base.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        {actions}
      </section>
    </main>
  );
}
