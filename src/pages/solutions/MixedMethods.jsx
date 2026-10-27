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

const copy = {
  'en-US': {
    sections: [
      {
        n: '01',
        title: 'When it is worth it',
        lines: [
          'What it decides: one question split in two, one half asking why, the other asking how many.',
          'Qualitative work alone cannot give you a share. Quantitative work alone cannot give you the reason.',
        ],
      },
      {
        n: '02',
        title: 'The seam',
        lines: [
          'The second stage draws its people from the first instead of recruiting again.',
          'Respondents who answered one way in the survey go on to the interview. The first stage decides who the second talks to.',
        ],
      },
      {
        n: '03',
        title: 'The order',
        lines: [
          'Qualitative first, then quantitative: find the hypotheses, then size them.',
          'Quantitative first, then qualitative: find the group that behaves unexpectedly, then ask why.',
          'Both at once: the second stage starts while the first is still fielding.',
        ],
      },
      {
        n: '04',
        title: 'Not by default',
        lines: [
          'The industry does not agree on what "mixed" means.',
          'There is one test: did the second stage use the sample or the findings of the first? If not, it is two projects stapled together.',
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
        title: 'When it is worth it',
        lines: [
          'What it decides: one question split in two, one half asking why, the other asking how many.',
          'Qualitative work alone cannot give you a share. Quantitative work alone cannot give you the reason.',
        ],
      },
      {
        n: '02',
        title: 'The seam',
        lines: [
          'The second stage draws its people from the first instead of recruiting again.',
          'Respondents who answered one way in the survey go on to the interview. The first stage decides who the second talks to.',
        ],
      },
      {
        n: '03',
        title: 'The order',
        lines: [
          'Qualitative first, then quantitative: find the hypotheses, then size them.',
          'Quantitative first, then qualitative: find the group that behaves unexpectedly, then ask why.',
          'Both at once: the second stage starts while the first is still fielding.',
        ],
      },
      {
        n: '04',
        title: 'Not by default',
        lines: [
          'The industry does not agree on what "mixed" means.',
          'There is one test: did the second stage use the sample or the findings of the first? If not, it is two projects stapled together.',
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
        title: '什么时候值得',
        lines: [
          '定什么：一个问题分成两半，一半问为什么，一半问有多大。',
          '只做定性，答不出比例；只做定量，答不出原因。',
        ],
      },
      {
        n: '02',
        title: '接缝',
        lines: [
          '后一段的人从前一段里挑，不重新招。',
          '问卷里回答是某一种的人，接着进访谈。前一段决定后一段去问谁。',
        ],
      },
      {
        n: '03',
        title: '顺序',
        lines: [
          '先定性后定量：先把假设挖出来，再验证范围。',
          '先定量后定性：先找出行为异常的那一群，再回头问为什么。',
          '两段同时跑：前一段还在收数据，后一段已经开始。',
        ],
      },
      {
        n: '04',
        title: '别默认混合',
        lines: [
          '行业里对「混合」的定义本身就不统一。',
          '判断只有一条：后一段有没有用上前一段的样本或发现。用不上，就是两个项目拼在一起。',
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
        title: '什麼時候值得',
        lines: [
          '定什麼：一個問題分成兩半，一半問為什麼，一半問有多大。',
          '只做定性，答不出比例；只做定量，答不出原因。',
        ],
      },
      {
        n: '02',
        title: '接縫',
        lines: [
          '後一段的人從前一段裡挑，不重新招。',
          '問卷裡回答是某一種的人，接著進訪談。前一段決定後一段去問誰。',
        ],
      },
      {
        n: '03',
        title: '順序',
        lines: [
          '先定性後定量：先把假設挖出來，再驗證範圍。',
          '先定量後定性：先找出行為異常的那一群，再回頭問為什麼。',
          '兩段同時跑：前一段還在收資料，後一段已經開始。',
        ],
      },
      {
        n: '04',
        title: '別預設混合',
        lines: [
          '行業裡對「混合」的定義本身就不統一。',
          '判斷只有一條：後一段有沒有用上前一段的樣本或發現。用不上，就是兩個專案拼在一起。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
};

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
