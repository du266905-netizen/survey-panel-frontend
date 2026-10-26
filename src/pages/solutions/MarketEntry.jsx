import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HomeCommunityCta } from '../../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './MarketEntry.css';

/* 解决方案 · 进入市场 —— 2026-10-27 第一张，故意做短。

   文案全部来自已有的东西：眉标和标题来自 Solutions 导航，说明句就是那条
   note（Size, audience and route to market）的中文，按钮和三个方法名也都在
   站里出现过。没有新写的判断句、没有数字、没有案例——数据和案例等业主给，
   到了往 me-methods 后面加段就行。

   版式按业主定的：灰屏 → 更深一档的灰 → 黑。首屏 80 字，整屏就一句。 */

const copy = {
  'en-US': {
    group: 'Solutions',
    title: 'Market entry',
    lede: 'Size, audience and route to market.',
    action: 'Contact sales',
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/how-it-works' },
      { label: 'Quantitative', to: '/how-it-works' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
  },
  'en-GB': {
    group: 'Solutions',
    title: 'Market entry',
    lede: 'Size, audience and route to market.',
    action: 'Contact sales',
    methodsLabel: 'Methods',
    methods: [
      { label: 'Qualitative', to: '/how-it-works' },
      { label: 'Quantitative', to: '/how-it-works' },
      { label: 'Mixed methods', to: '/how-it-works' },
    ],
  },
  'zh-CN': {
    group: '解决方案',
    title: '进入市场',
    lede: '规模、人群与进入路径。',
    action: '联系销售',
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/how-it-works' },
      { label: '定量', to: '/how-it-works' },
      { label: '混合', to: '/how-it-works' },
    ],
  },
  'zh-Hant': {
    group: '解決方案',
    title: '進入市場',
    lede: '規模、人群與進入路徑。',
    action: '聯繫銷售',
    methodsLabel: '方法',
    methods: [
      { label: '定性', to: '/how-it-works' },
      { label: '定量', to: '/how-it-works' },
      { label: '混合', to: '/how-it-works' },
    ],
  },
};

export default function MarketEntry() {
  const { language, publicCopy } = useLanguage();
  const t = copy[language] || copy['en-US'];
  usePageTitle(t.title);

  return (
    <main className="market-entry-page">
      <section className="me-hero">
        <p className="me-eyebrow">{t.group}</p>
        <h1 className="me-title">{t.title}</h1>
        <p className="me-lede">{t.lede}</p>
        <Link className="me-action" to={withLanguage('/contact', language)}>
          {t.action}
          <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
        </Link>
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

      <HomeCommunityCta
        copy={publicCopy.home}
        navigation={publicCopy.navigation}
        language={language}
        id={undefined}
        ariaLabel={t.action}
        actions={[{ label: t.action, to: '/contact', primary: true, arrow: false }]}
      />
    </main>
  );
}
