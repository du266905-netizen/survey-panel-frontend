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

const copy = {
  'en-US': {
    sections: [
      {
        n: '01',
        title: 'Distribution and availability',
        lines: [
          'What it decides: where the product is actually on sale, and where it is missing.',
          'A distribution check counts the stores that carry the listed products, and reads availability store by store rather than from the sales report.',
        ],
      },
      {
        n: '02',
        title: 'Shelf and price',
        lines: [
          'What it decides: whether the shelf position and the price hold up in the store.',
          'The same visit records facings, special displays and the price on the shelf, including the promoted price.',
        ],
      },
      {
        n: '03',
        title: 'Store execution',
        lines: [
          'What it decides: whether what was agreed is what happens at the counter.',
          'Mystery shopping sends a person in as an ordinary customer, against a fixed checklist: service, product knowledge, availability, the state of the store.',
          'Applied on a regular cycle, the same checklist shows whether a standard is holding across stores.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    sections: [
      {
        n: '01',
        title: 'Distribution and availability',
        lines: [
          'What it decides: where the product is actually on sale, and where it is missing.',
          'A distribution check counts the stores that carry the listed products, and reads availability store by store rather than from the sales report.',
        ],
      },
      {
        n: '02',
        title: 'Shelf and price',
        lines: [
          'What it decides: whether the shelf position and the price hold up in the store.',
          'The same visit records facings, special displays and the price on the shelf, including the promoted price.',
        ],
      },
      {
        n: '03',
        title: 'Store execution',
        lines: [
          'What it decides: whether what was agreed is what happens at the counter.',
          'Mystery shopping sends a person in as an ordinary customer, against a fixed checklist: service, product knowledge, availability, the state of the store.',
          'Applied on a regular cycle, the same checklist shows whether a standard is holding across stores.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    sections: [
      {
        n: '01',
        title: '铺货与可得性',
        lines: [
          '定什么：产品到底在哪些门店有售，哪里缺。',
          '铺货核查统计有多少门店在卖指定产品，逐店看有没有断货，而不是只看销售报表。',
        ],
      },
      {
        n: '02',
        title: '货架与价格',
        lines: [
          '定什么：排面位置和价格在店里站不站得住。',
          '同一次到店记录排面数、特殊陈列，以及货架上的价格，包括促销价。',
        ],
      },
      {
        n: '03',
        title: '门店执行',
        lines: [
          '定什么：谈好的东西，到了柜台是不是那样做。',
          '神秘顾客以普通顾客身份进店，按固定清单核查：服务、产品知识、是否有货、门店状态。',
          '按固定周期重复，同一张清单能看出标准在各店守不守得住。',
        ],
      },
    ],
    free: '免费开始',
    action: '联系销售',
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    sections: [
      {
        n: '01',
        title: '鋪貨與可得性',
        lines: [
          '定什麼：產品到底在哪些門市有售，哪裡缺。',
          '鋪貨核查統計有多少門市在賣指定產品，逐店看有沒有斷貨，而不是只看銷售報表。',
        ],
      },
      {
        n: '02',
        title: '貨架與價格',
        lines: [
          '定什麼：排面位置和價格在店裡站不站得住。',
          '同一次到店記錄排面數、特殊陳列，以及貨架上的價格，包括促銷價。',
        ],
      },
      {
        n: '03',
        title: '門市執行',
        lines: [
          '定什麼：談好的東西，到了櫃台是不是那樣做。',
          '神秘顧客以普通顧客身分進店，按固定清單核查：服務、產品知識、是否有貨、門市狀態。',
          '按固定週期重複，同一張清單能看出標準在各店守不守得住。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
};

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
      <Link className="cr-action cr-action--quiet" to={withLanguage('/contact', language)}>
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
