import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './ChannelRetail.css';

/* 解决方案 · 渠道与零售 —— 2026-10-27。

   导航 note：Shelf, listing and price execution。三段：铺货与可得性、
   货架与价格、门店执行。不用站内产品文案，依据是 Quirk's 的
   distribution check 与 mystery shopping 两个词条：
   docs/COPY-2026-10-27-channel-retail.md */

import { solutionPageCopy } from '../../constants/solutionPageCopy';

const copy = solutionPageCopy.channelRetail;

export default function ChannelRetail() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['channel-retail'];
  const t = { group: entry?.title || 'Channel & retail', title: entry?.note || 'Shelf, listing and price execution' };
  usePageTitle(t.group);

  const actions = (
    <div className="cr-actions">
      <Link className="cr-action cr-action--primary" to={withLanguage('/business/register', language)}>
        {base.free}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
      <Link className="cr-action cr-action--quiet" to={withLanguage('/business/access', language)}>
        {base.action}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
    </div>
  );

  return (
    <main className="channel-retail-page">
      <section className="cr-hero">
        <p className="cr-eyebrow">{t.group}</p>
        <h1 className="cr-title">{t.title}</h1>
        {actions}
      </section>

      <section className="cr-sections" aria-label={t.group}>
        <ol className="cr-section-list">
          {base.sections.map((section) => (
            <li key={section.n}>
              <span className="cr-num">{section.n}</span>
              <h2>{section.title}</h2>
              <div className="cr-lines">
                {section.lines.map((line) => <p key={line}>{line}</p>)}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="cr-contact" aria-labelledby="cr-contact-title">
        <h2 id="cr-contact-title" className="cr-contact-title">
          {base.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        {actions}
      </section>
    </main>
  );
}
