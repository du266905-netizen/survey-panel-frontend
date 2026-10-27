import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './BrandComms.css';

/* 解决方案 · 品牌与传播 —— 2026-10-27。

   导航 note：品牌健康、广告与传播。四段：品牌健康、广告与传播、追踪怎么跑、
   我们的定量追踪（这一段才是「我们」，其余三段讲这类研究怎么做）。

   前三段的依据是公开专业来源，第四段来自站内定量页的品牌追踪卡；
   逐条见 docs/COPY-2026-10-27-brand-comms.md。 */

const copy = {
  'en-US': {
    sections: [
      {
        n: '01',
        title: 'Brand health',
        lines: [
          'What it decides: whether the brand is gaining or losing ground, and where it stands against the brands it actually competes with.',
          'Tracking is a longitudinal study: the same metrics repeated wave by wave, read as change over time rather than as a single score.',
          'The usual metrics: unaided and aided awareness, consideration, usage, recommendation.',
        ],
      },
      {
        n: '02',
        title: 'Advertising and campaigns',
        lines: [
          'What it decides: whether this piece of work can run.',
          'Before launch, copy testing shows how the target audience responds to the text and the visuals, and whether the message is understood and remembered.',
          'After the campaign, the brand metrics are read against the pre-campaign wave.',
        ],
      },
      {
        n: '03',
        title: 'Running the tracker',
        lines: [
          'Continuous tracking reads the market before, during and after an event. Pulse waves suit moments you can predict, such as a launch.',
          'Keep the question wording and the sample stable. Changing the wording adds variance; changing the provider changes the sample.',
        ],
      },
      {
        n: '04',
        title: 'Our tracker',
        lines: [
          'Quarterly or biannual waves, a fixed question set, pre- and post-campaign comparison, and trends across waves.',
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
        title: 'Brand health',
        lines: [
          'What it decides: whether the brand is gaining or losing ground, and where it stands against the brands it actually competes with.',
          'Tracking is a longitudinal study: the same metrics repeated wave by wave, read as change over time rather than as a single score.',
          'The usual metrics: unaided and aided awareness, consideration, usage, recommendation.',
        ],
      },
      {
        n: '02',
        title: 'Advertising and campaigns',
        lines: [
          'What it decides: whether this piece of work can run.',
          'Before launch, copy testing shows how the target audience responds to the text and the visuals, and whether the message is understood and remembered.',
          'After the campaign, the brand metrics are read against the pre-campaign wave.',
        ],
      },
      {
        n: '03',
        title: 'Running the tracker',
        lines: [
          'Continuous tracking reads the market before, during and after an event. Pulse waves suit moments you can predict, such as a launch.',
          'Keep the question wording and the sample stable. Changing the wording adds variance; changing the provider changes the sample.',
        ],
      },
      {
        n: '04',
        title: 'Our tracker',
        lines: [
          'Quarterly or biannual waves, a fixed question set, pre- and post-campaign comparison, and trends across waves.',
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
        title: '品牌健康',
        lines: [
          '定什么：品牌在变强还是变弱，和真正竞争的那几个牌子比站在哪。',
          '追踪是纵向研究：同一套指标按波次重复，看的是变化，不是单次分数。',
          '常用指标：未提示与提示认知、考虑、使用、推荐。',
        ],
      },
      {
        n: '02',
        title: '广告与传播',
        lines: [
          '定什么：这一版能不能投。',
          '投放前测：目标人群对文案与画面的反应，信息是否被理解、被记住。',
          '投放后：品牌指标与投放前那一波对比。',
        ],
      },
      {
        n: '03',
        title: '追踪怎么跑',
        lines: [
          '连续追踪能读到事件之前、期间和之后；脉冲波次适合可预期的节点，比如上市。',
          '题目和样本要稳定。改题干会引入波动；换执行方会换掉样本。',
        ],
      },
      {
        n: '04',
        title: '我们的定量追踪',
        lines: [
          '按季度或半年一波，固定题组，投放前后对比，跨期可比。',
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
        title: '品牌健康',
        lines: [
          '定什麼：品牌在變強還是變弱，和真正競爭的那幾個牌子比站在哪。',
          '追蹤是縱向研究：同一套指標按波次重複，看的是變化，不是單次分數。',
          '常用指標：未提示與提示認知、考慮、使用、推薦。',
        ],
      },
      {
        n: '02',
        title: '廣告與傳播',
        lines: [
          '定什麼：這一版能不能投。',
          '投放前測：目標人群對文案與畫面的反應，訊息是否被理解、被記住。',
          '投放後：品牌指標與投放前那一波對比。',
        ],
      },
      {
        n: '03',
        title: '追蹤怎麼跑',
        lines: [
          '連續追蹤能讀到事件之前、期間和之後；脈衝波次適合可預期的節點，比如上市。',
          '題目和樣本要穩定。改題幹會引入波動；換執行方會換掉樣本。',
        ],
      },
      {
        n: '04',
        title: '我們的定量追蹤',
        lines: [
          '按季度或半年一波，固定題組，投放前後對比，跨期可比。',
        ],
      },
    ],
    free: '免費開始',
    action: '聯繫銷售',
    contactTitle: ['告訴我們的想法，', '我們討論下一步怎麼走。'],
  },
};

export default function BrandComms() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['brand-comms'];
  const t = { group: entry?.title || 'Brand & communications', title: entry?.note || 'Brand health, advertising and campaigns' };
  usePageTitle(t.group);

  const actions = (
    <div className="bc-actions">
      <Link className="bc-action bc-action--primary" to={withLanguage('/business/register', language)}>
        {base.free}
        <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
      </Link>
      <Link className="bc-action bc-action--quiet" to={withLanguage('/contact', language)}>
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
