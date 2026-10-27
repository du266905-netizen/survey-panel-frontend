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

const copy = {
  'en-US': {
    sectionLabel: 'Three decisions',
    sections: [
      {
        n: '01',
        title: 'Concept',
        lines: [
          'The decision: whether the product is worth building.',
          'Monadic tests show each respondent one concept, so concepts do not affect each other’s scores.',
          'Purchase intent is asked before price, then price expectations; that gives a demand curve.',
          'Unique concepts tend to score lower on purchase intent. Read the two numbers together.',
        ],
      },
      {
        n: '02',
        title: 'Pack',
        lines: [
          'The decision: which design to run, and whether the information on the pack is understood.',
          'Test it on a shelf: what is seen first, whether the information is understood, how it handles in the hand.',
          'Virtual shelves, physical shelves and eye-tracking are the usual set-ups.',
        ],
      },
      {
        n: '03',
        title: 'Price',
        lines: [
          'The decision: where to set the price, and how wide the acceptable range is.',
          'PSM asks four prices - too expensive to consider, expensive but still worth it, a bargain, so cheap that quality is doubted - and gives the acceptable range and the optimal point.',
          'A Gabor-Granger ladder gives the demand curve.',
          'Conjoint weighs features and price together.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    sectionLabel: 'Three decisions',
    sections: [
      {
        n: '01',
        title: 'Concept',
        lines: [
          'The decision: whether the product is worth building.',
          'Monadic tests show each respondent one concept, so concepts do not affect each other’s scores.',
          'Purchase intent is asked before price, then price expectations; that gives a demand curve.',
          'Unique concepts tend to score lower on purchase intent. Read the two numbers together.',
        ],
      },
      {
        n: '02',
        title: 'Pack',
        lines: [
          'The decision: which design to run, and whether the information on the pack is understood.',
          'Test it on a shelf: what is seen first, whether the information is understood, how it handles in the hand.',
          'Virtual shelves, physical shelves and eye-tracking are the usual set-ups.',
        ],
      },
      {
        n: '03',
        title: 'Price',
        lines: [
          'The decision: where to set the price, and how wide the acceptable range is.',
          'PSM asks four prices - too expensive to consider, expensive but still worth it, a bargain, so cheap that quality is doubted - and gives the acceptable range and the optimal point.',
          'A Gabor-Granger ladder gives the demand curve.',
          'Conjoint weighs features and price together.',
        ],
      },
    ],
    free: 'Start for free',
    action: 'Contact sales',
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    sectionLabel: '三个决定',
    sections: [
      {
        n: '01',
        title: '概念',
        lines: [
          '定什么：这个产品值不值得做。',
          '单组测试，每人只看一个概念，概念之间不会互相拉分。',
          '先问购买意向，再问价格预期，才能得到需求曲线。',
          '独特性高的概念，购买意向偏低。两个数要一起看。',
        ],
      },
      {
        n: '02',
        title: '包装',
        lines: [
          '定什么：上哪一版设计，包装上的信息看不看得懂。',
          '放回货架环境里测：能不能被先看到，信息是否被理解，拿在手里好不好用。',
          '虚拟货架、实体货架、眼动，都是常用手段。',
        ],
      },
      {
        n: '03',
        title: '价格',
        lines: [
          '定什么：价格定在哪，可接受区间有多宽。',
          'PSM 问四个价：太贵不会考虑、贵但还值、划算、便宜到怀疑质量。由此得出可接受区间和最优价。',
          '要整条需求曲线，用 Gabor-Granger 的价格阶梯。',
          '要素和价格要一起权衡，用联合分析。',
        ],
      },
    ],
    free: '免费开始',
    action: '联系销售',
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    sectionLabel: '三個決定',
    sections: [
      {
        n: '01',
        title: '概念',
        lines: [
          '定什麼：這個產品值不值得做。',
          '單組測試，每人只看一個概念，概念之間不會互相拉分。',
          '先問購買意願，再問價格預期，才能得到需求曲線。',
          '獨特性高的概念，購買意願偏低。兩個數要一起看。',
        ],
      },
      {
        n: '02',
        title: '包裝',
        lines: [
          '定什麼：上哪一版設計，包裝上的訊息看不看得懂。',
          '放回貨架環境裡測：能不能被先看到，訊息是否被理解，拿在手裡好不好用。',
          '虛擬貨架、實體貨架、眼動，都是常用手段。',
        ],
      },
      {
        n: '03',
        title: '價格',
        lines: [
          '定什麼：價格定在哪，可接受區間有多寬。',
          'PSM 問四個價：太貴不會考慮、貴但還值、划算、便宜到懷疑品質。由此得出可接受區間和最優價。',
          '要整條需求曲線，用 Gabor-Granger 的價格階梯。',
          '要素和價格要一起權衡，用聯合分析。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
};

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
