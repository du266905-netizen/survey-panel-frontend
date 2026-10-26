import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquareText, ClipboardPenLine, UsersRound, Eye } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './Qualitative.css';

/* 解决方案 · 定性研究 —— 2026-10-27 第二张。

   版式沿用进入市场：灰 → 深灰 → 黑 → 灰收尾，无图无视频，主按钮用荧光黄。
   文案来源（逐条可查）：
     · 眉标、说明句 = 导航里的定性条目（publicPageCopy.js:20974）
     · 三个做法 = 同一条 note 的三个词（深访 / 座谈会 / 观察）
     · 四步骨架 = MMI 案例文档的四段结构（Objective → Methodology → Sample → Outcome）
     · 其余短句是这一轮新写的，业主没点头的不算数 */

const copy = {
  'en-US': {
    group: 'Qualitative research',
    title: 'Find out why first, then decide what to do.',
    lede: 'Interviews, groups and observation.',
    free: 'Start for free',
    action: 'Contact sales',
    methodsLabel: 'What we run',
    methods: [
      { icon: MessageSquareText, title: 'Interviews', body: 'One to one, in person, by phone or online. Hard-to-reach people come through the community and referrals.' },
      { icon: UsersRound, title: 'Groups', body: 'A small group around one topic, so views can be tested against each other.' },
      { icon: Eye, title: 'Observation', body: 'At home, in store or on site: what people actually do, not what they say they do.' },
    ],
    processLabel: 'How a study runs',
    process: [
      { k: '01', title: 'The decision', body: 'Name the decision the study has to support.' },
      { k: '02', title: 'The method', body: 'Pick the format and the sessions for that question, not from a template.' },
      { k: '03', title: 'The sample', body: 'Fix who is asked, in which cities, and how many.' },
      { k: '04', title: 'The output', body: 'Hand back the judgement and the quotes that support it.' },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'en-GB': {
    group: 'Qualitative research',
    title: 'Find out why first, then decide what to do.',
    lede: 'Interviews, groups and observation.',
    free: 'Start for free',
    action: 'Contact sales',
    methodsLabel: 'What we run',
    methods: [
      { icon: MessageSquareText, title: 'Interviews', body: 'One to one, in person, by phone or online. Hard-to-reach people come through the community and referrals.' },
      { icon: UsersRound, title: 'Groups', body: 'A small group around one topic, so views can be tested against each other.' },
      { icon: Eye, title: 'Observation', body: 'At home, in store or on site: what people actually do, not what they say they do.' },
    ],
    processLabel: 'How a study runs',
    process: [
      { k: '01', title: 'The decision', body: 'Name the decision the study has to support.' },
      { k: '02', title: 'The method', body: 'Pick the format and the sessions for that question, not from a template.' },
      { k: '03', title: 'The sample', body: 'Fix who is asked, in which cities, and how many.' },
      { k: '04', title: 'The output', body: 'Hand back the judgement and the quotes that support it.' },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
  },
  'zh-CN': {
    group: '定性研究',
    title: '先弄清楚为什么，再决定做什么。',
    lede: '深访、座谈会与观察。',
    free: '免费开始',
    action: '联系销售',
    methodsLabel: '我们怎么做',
    methods: [
      { icon: MessageSquareText, title: '深访', body: '一对一，面访、电话或线上。难约的人通过社群和转介绍去找。' },
      { icon: UsersRound, title: '座谈会', body: '一组人围着一个话题谈，让观点互相碰。' },
      { icon: Eye, title: '观察', body: '到家里、店里或工地，看人实际怎么做，而不是他们说自己怎么做。' },
    ],
    processLabel: '一项研究怎么跑',
    process: [
      { k: '01', title: '目的', body: '先说清这项研究要支撑哪个决定。' },
      { k: '02', title: '方法', body: '按这个问题选做法和场次，不套模板。' },
      { k: '03', title: '样本', body: '定清楚问谁、在哪些城市、多少人。' },
      { k: '04', title: '产出', body: '交回能直接上会的判断，和支撑它的原话。' },
    ],
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
  },
  'zh-Hant': {
    group: '定性研究',
    title: '先弄清楚為什麼，再決定做什麼。',
    lede: '深訪、座談會與觀察。',
    free: '免費開始',
    action: '聯繫銷售',
    methodsLabel: '我們怎麼做',
    methods: [
      { icon: MessageSquareText, title: '深訪', body: '一對一，面訪、電話或線上。難約的人透過社群和轉介紹去找。' },
      { icon: UsersRound, title: '座談會', body: '一群人圍著一個話題談，讓觀點互相碰。' },
      { icon: Eye, title: '觀察', body: '到家裡、店裡或工地，看人實際怎麼做，而不是他們說自己怎麼做。' },
    ],
    processLabel: '一項研究怎麼跑',
    process: [
      { k: '01', title: '目的', body: '先說清這項研究要支撐哪個決定。' },
      { k: '02', title: '方法', body: '按這個問題選做法和場次，不套模板。' },
      { k: '03', title: '樣本', body: '定清楚問誰、在哪些城市、多少人。' },
      { k: '04', title: '產出', body: '交回能直接上會的判斷，和支撐它的原話。' },
    ],
    contactTitle: ['告訴我們你的想法，', '我們討論下一步怎麼走。'],
  },
};

export default function Qualitative() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['qualitative'];
  const t = { ...base, group: entry?.title || base.group, lede: entry?.note || base.lede };
  usePageTitle(t.group);

  return (
    <main className="qual-page">
      <section className="qu-hero">
        <p className="qu-eyebrow">{t.group}</p>
        <h1 className="qu-title">{t.title}</h1>
        <p className="qu-lede">{t.lede}</p>
        <div className="qu-actions">
          <Link className="qu-action qu-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="qu-action qu-action--quiet" to={withLanguage('/contact', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="qu-methods" aria-labelledby="qu-methods-title">
        <p className="qu-eyebrow" id="qu-methods-title">{t.methodsLabel}</p>
        <ul>
          {t.methods.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Icon size={23} strokeWidth={1.65} aria-hidden="true" />
                <h2>{item.title}</h2>
                <p>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="qu-process" aria-labelledby="qu-process-title">
        <p className="qu-eyebrow qu-eyebrow--light" id="qu-process-title">{t.processLabel}</p>
        <ol>
          {t.process.map((step) => (
            <li key={step.k}>
              <span>{step.k}</span>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="qu-contact" aria-labelledby="qu-contact-title">
        <h2 id="qu-contact-title" className="qu-contact-title">
          {t.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        <div className="qu-actions">
          <Link className="qu-action qu-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="qu-action qu-action--quiet" to={withLanguage('/contact', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
