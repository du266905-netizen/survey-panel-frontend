import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './CustomerExperience.css';

/* 解决方案 · 客户体验 —— 2026-10-27。

   导航 note：Why customers leave, and what keeps them。三段：满意度、
   流失、留存的指标。依据是 Quirk's 的 customer satisfaction research 与
   churn analysis 两个词条：docs/COPY-2026-10-27-customer-experience.md */

import { solutionPageCopy } from '../../constants/solutionPageCopy';

const copy = solutionPageCopy.customerExperience;

export default function CustomerExperience() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['customer-experience'];
  const t = { group: entry?.title || 'Customer experience', title: entry?.note || 'Why customers leave, and what keeps them' };
  usePageTitle(t.group);

  const actions = (
    <div className="cx-actions">
      <Link className="cx-action cx-action--primary" to={withLanguage('/business/register', language)}>
        {base.free}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
      <Link className="cx-action cx-action--quiet" to={withLanguage('/business/access', language)}>
        {base.action}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="customer-experience-page">
      <section className="cx-hero">
        <p className="cx-eyebrow">{t.group}</p>
        <h1 className="cx-title">{t.title}</h1>
        {actions}
      </section>

      <section className="cx-sections" aria-label={t.group}>
        <ol className="cx-section-list">
          {base.sections.map((section) => (
            <li key={section.n}>
              <span className="cx-num">{section.n}</span>
              <h2>{section.title}</h2>
              <div className="cx-lines">
                {section.lines.map((line) => <p key={line}>{line}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cx-contact" aria-labelledby="cx-contact-title">
        <h2 id="cx-contact-title" className="cx-contact-title">
          {base.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        {actions}
      </section>
    </main>
  );
}
