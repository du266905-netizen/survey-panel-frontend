import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './MixedMethods.css';

/* 解决方案 · 混合研究 —— 2026-10-27。

   导航 note：两种方法放在一个设计里。四段：什么时候用、接缝、顺序、
   别默认混合。依据 Quirk's《What is hybrid quant/qual anyway?》：
   docs/COPY-2026-10-27-mixed-methods.md

   这一页的重点不是「两种方法都会做」，而是两段之间那条接缝：
   后一段的人从前一段里挑，前一段的发现决定后一段问谁。 */

import { solutionPageCopy } from '../../constants/solutionPageCopy';

const copy = solutionPageCopy.mixedMethods;

export default function MixedMethods() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['mixed'];
  const t = { group: entry?.title || 'Mixed methods', title: entry?.note || 'Both, in one design' };
  usePageTitle(t.group);

  const actions = (
    <div className="mm-actions">
      <Link className="mm-action mm-action--primary" to={withLanguage('/business/register', language)}>
        {base.free}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
      <Link className="mm-action mm-action--quiet" to={withLanguage('/business/access', language)}>
        {base.action}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="mixed-methods-page">
      <section className="mm-hero">
        <p className="mm-eyebrow">{t.group}</p>
        <h1 className="mm-title">{t.title}</h1>
        {actions}
      </section>

      <section className="mm-sections" aria-label={t.group}>
        <ol className="mm-section-list">
          {base.sections.map((section) => (
            <li key={section.n}>
              <span className="mm-num">{section.n}</span>
              <h2>{section.title}</h2>
              <div className="mm-lines">
                {section.lines.map((line) => <p key={line}>{line}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mm-contact" aria-labelledby="mm-contact-title">
        <h2 id="mm-contact-title" className="mm-contact-title">
          {base.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        {actions}
      </section>
    </main>
  );
}
