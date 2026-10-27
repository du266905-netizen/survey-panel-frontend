import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import { solutionNavCopy } from '../../constants/solutionNavCopy';
import usePageTitle from '../../hooks/usePageTitle';
import './BrandComms.css';

/* 解决方案 · 品牌与传播 —— 2026-10-27。

   导航 note：品牌健康、广告与传播。四段：品牌健康、广告与传播、追踪怎么跑、
   我们的定量追踪（这一段才是「我们」，其余三段讲这类研究怎么做）。

   前三段的依据是公开专业来源，第四段来自站内定量页的品牌追踪卡；
   逐条见 docs/COPY-2026-10-27-brand-comms.md。 */

import { solutionPageCopy } from '../../constants/solutionPageCopy';

const copy = solutionPageCopy.brandComms;

export default function BrandComms() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['brand-comms'];
  const local = solutionNavCopy[language]?.['brand-comms'];
  const t = { group: entry?.title || local?.title || 'Brand & communications', title: entry?.note || local?.note || 'Brand health, advertising and campaigns' };
  usePageTitle(t.group);

  const actions = (
    <div className="bc-actions">
      <Link className="bc-action bc-action--primary" to={withLanguage('/business/register', language)}>
        {base.free}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
      <Link className="bc-action bc-action--quiet" to={withLanguage('/business/access', language)}>
        {base.action}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="brand-comms-page">
      <section className="bc-hero">
        <p className="bc-eyebrow">{t.group}</p>
        <h1 className="bc-title">{t.title}</h1>
        {actions}
      </section>

      <section className="bc-sections" aria-label={t.group}>
        <ol className="bc-section-list">
          {base.sections.map((section) => (
            <li key={section.n}>
              <span className="bc-num">{section.n}</span>
              <h2>{section.title}</h2>
              <div className="bc-lines">
                {section.lines.map((line) => <p key={line}>{line}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="bc-contact" aria-labelledby="bc-contact-title">
        <h2 id="bc-contact-title" className="bc-contact-title">
          {base.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        {actions}
      </section>
    </main>
  );
}
