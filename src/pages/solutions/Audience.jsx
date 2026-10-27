import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import { solutionNavCopy } from '../../constants/solutionNavCopy';
import usePageTitle from '../../hooks/usePageTitle';
import './Audience.css';

/* 解决方案 · 了解受众 —— 2026-10-27 第二张，节奏与进入市场那张一致：
   灰首屏 → 方法三栏 → 深一档的灰（受众方案）→ 黑收尾。

   这一页没有一句新写的话。逐句出处见 docs/COPY-2026-10-27-audience.md：
   眉标与 H1 用导航译文，说明句和「受众方案」五格用受众方案页的表单原文
   （researchTranslations.js 的 audiencePlan 块），收尾句沿用进入市场页。
   上一轮在定量页编句子的教训（ERRORS-FRONTEND.md FE-2026-10-27-01）。 */

import { solutionPageCopy } from '../../constants/solutionPageCopy';

const copy = solutionPageCopy.audience;

export default function Audience() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  // 眉标用导航译文；H1 就是那条 note，和下拉菜单里看到的是同一句话。
  const entry = publicCopy.chrome?.items?.['audience'];
  const local = solutionNavCopy[language]?.['audience'];
  const t = { ...base, group: entry?.title || local?.title || 'Audience understanding', title: entry?.note || local?.note || base.title };
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
