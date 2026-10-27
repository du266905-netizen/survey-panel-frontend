import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './ProductPricing.css';

/* 解决方案 · 产品与定价 —— 2026-10-27 重写。

   导航 note 讲的是客户的产品（概念、包装、价格点），不是我们的价目表。
   三段各写三件事：定什么、怎么设计、结果怎么读。

   内容依据（公开专业来源，逐条见 docs/COPY-2026-10-27-product-pricing.md）：
   - Quirk's《Best practices to improve new product concept testing》
   - Quirk's Glossary: Packaging testing / Pricing research / Van Westendorp PSM
   中文是按来源原文改写的，不是站内文案。 */

import { solutionPageCopy } from '../../constants/solutionPageCopy';

const copy = solutionPageCopy.productPricing;

export default function ProductPricing() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['product-pricing'];
  const t = { ...base, group: entry?.title || 'Product & pricing', title: entry?.note || 'Concepts, packs and price points' };
  usePageTitle(t.group);

  const actions = (
    <div className="pp-actions">
      <Link className="pp-action pp-action--primary" to={withLanguage('/business/register', language)}>
        {base.free}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
      <Link className="pp-action pp-action--quiet" to={withLanguage('/business/access', language)}>
        {base.action}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="product-pricing-page">
      <section className="pp-hero">
        <p className="pp-eyebrow">{t.group}</p>
        <h1 className="pp-title">{t.title}</h1>
        {actions}
      </section>

      <section className="pp-sections" aria-labelledby="pp-sections-label">
        <p className="pp-eyebrow pp-eyebrow--light" id="pp-sections-label">{base.sectionLabel}</p>
        <ol className="pp-section-list">
          {base.sections.map((section) => (
            <li key={section.n}>
              <span className="pp-num">{section.n}</span>
              <h2>{section.title}</h2>
              <div className="pp-lines">
                {section.lines.map((line) => <p key={line}>{line}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="pp-contact" aria-labelledby="pp-contact-title">
        <h2 id="pp-contact-title" className="pp-contact-title">
          {base.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        {actions}
      </section>
    </main>
  );
}
