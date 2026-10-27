import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './CustomerExperience.css';

/* 解决方案 · 客户体验 —— 2026-10-27。

   导航 note：Why customers leave, and what keeps them。三段：满意度、
   流失、留存的指标。依据是 Quirk's 的 customer satisfaction research 与
   churn analysis 两个词条：docs/COPY-2026-10-27-customer-experience.md */

const copy = {
  'en-US': {
    sections: [
      {
        n: '01',
        title: 'Satisfaction',
        lines: [
          'What it decides: which part of the experience is costing you customers.',
          'Ask for overall satisfaction and for satisfaction with each part of the product or service; the gap between the two says where the problem sits.',
        ],
      },
      {
        n: '02',
        title: 'Why customers leave',
        lines: [
          'What it decides: who is about to leave, and why.',
          'Churn analysis reads behaviour, transactions and survey feedback together, and asks the people who have already left what ended it.',
        ],
      },
      {
        n: '03',
        title: 'Where it breaks',
        lines: [
          'What it decides: the step where customers get stuck.',
          'Journey mapping lays the touchpoints, the interactions and the feelings out in order, and marks the friction and the drop-offs.',
          'Real journeys are rarely a straight line: they loop, they re-enter, they stop.',
        ],
      },
      {
        n: '04',
        title: 'What keeps them',
        lines: [
          'What it decides: whether retention is improving or just holding.',
          'Retention rate and customer lifetime value are the two numbers to keep on the page; everything else is a reason for these two.',
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
        title: 'Satisfaction',
        lines: [
          'What it decides: which part of the experience is costing you customers.',
          'Ask for overall satisfaction and for satisfaction with each part of the product or service; the gap between the two says where the problem sits.',
        ],
      },
      {
        n: '02',
        title: 'Why customers leave',
        lines: [
          'What it decides: who is about to leave, and why.',
          'Churn analysis reads behaviour, transactions and survey feedback together, and asks the people who have already left what ended it.',
        ],
      },
      {
        n: '03',
        title: 'Where it breaks',
        lines: [
          'What it decides: the step where customers get stuck.',
          'Journey mapping lays the touchpoints, the interactions and the feelings out in order, and marks the friction and the drop-offs.',
          'Real journeys are rarely a straight line: they loop, they re-enter, they stop.',
        ],
      },
      {
        n: '04',
        title: 'What keeps them',
        lines: [
          'What it decides: whether retention is improving or just holding.',
          'Retention rate and customer lifetime value are the two numbers to keep on the page; everything else is a reason for these two.',
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
        title: '满意度',
        lines: [
          '定什么：体验里哪一段在让你丢客户。',
          '整体满意度和分项满意度一起问：产品、服务各环节各打一分。两个数的落差说明问题在哪。',
        ],
      },
      {
        n: '02',
        title: '为什么走',
        lines: [
          '定什么：谁要走，为什么走。',
          '流失分析把行为、交易与问卷反馈放在一起看，并去问已经走掉的人：是什么让他们停下的。',
        ],
      },
      {
        n: '03',
        title: '在哪一步断',
        lines: [
          '定什么：客户卡在哪一步。',
          '旅程把触点、互动和情绪按顺序排出来，标出摩擦点和断点。',
          '真实旅程很少是一条直线：会回头，会重新进入，也会中途停下。',
        ],
      },
      {
        n: '04',
        title: '靠什么留下',
        lines: [
          '定什么：留存是在变好，还是只是没变差。',
          '留存率与客户终身价值是留在页面上的两个数，其余都是这两个数的原因。',
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
        title: '滿意度',
        lines: [
          '定什麼：體驗裡哪一段在讓你流失客戶。',
          '整體滿意度和分項滿意度一起問：產品、服務各環節各打一分。兩個數的落差說明問題在哪。',
        ],
      },
      {
        n: '02',
        title: '為什麼走',
        lines: [
          '定什麼：誰要走，為什麼走。',
          '流失分析把行為、交易與問卷回饋放在一起看，並去問已經走掉的人：是什麼讓他們停下的。',
        ],
      },
      {
        n: '03',
        title: '在哪一步斷',
        lines: [
          '定什麼：客戶卡在哪一步。',
          '旅程把觸點、互動和情緒按順序排出來，標出摩擦點和斷點。',
          '真實旅程很少是一條直線：會回頭，會重新進入，也會中途停下。',
        ],
      },
      {
        n: '04',
        title: '靠什麼留下',
        lines: [
          '定什麼：留存是在變好，還是只是沒變差。',
          '留存率與客戶終身價值是留在頁面上的兩個數，其餘都是這兩個數的原因。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
};

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
