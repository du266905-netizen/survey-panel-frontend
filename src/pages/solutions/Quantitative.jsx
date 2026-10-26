import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ClipboardList, ClipboardPenLine, ChartSpline } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import heroImage from '../../assets/home/crosswalk.jpg';
import QuantitativePlans from './QuantitativePlans';
import './Quantitative.css';

/* 解决方案 · 定量研究 —— 2026-10-27。

   首屏按业主给的参考稿：左边眉标 + 56 大字 + 一段小字 + 邮箱框 + 按钮，
   右边一张图；下面三段是商定的梯子（自助与代投 / 定制问卷 / 品牌追踪），
   案头研究按业主的话砍掉。
   文案来源：
     · 眉标、大字、小字 = 业主 2026-10-27 亲口给的
     · 三段的正文 = 上一轮我写的，等业主改
   图片是占位（home/crosswalk.jpg），业主给了自己的图就换这一行。 */

const copy = {
  'en-US': {
    eyebrow: 'Choose the quantitative track that fits you',
    statement: ['Gather the evidence, then decide. Ask the right question, reach the right sample, and the data reads as a decision.'],
    title: 'Every decision, backed by evidence.',
    lede: 'From a self-serve research platform, to a comprehensive survey run with our researchers, to an expert-led custom study — we fit the format to your needs and your budget.',
    placeholder: 'Your work email',
    submit: 'Book a demo',
    note: 'After you submit, you will receive news, tips and events from GuanyiSearch. Read our',
    privacy: 'privacy policy',
    noteEnd: 'You can unsubscribe at any time.',
    plansLink: 'See plans and pricing',
    done: 'Received. We will be in touch shortly.',
    error: 'Could not send. Please try again.',
    sections: [
      {
        id: 'self-serve', icon: ClipboardList, kicker: '01 · Self-serve and fielding',
        title: 'You write the questionnaire. We field it.',
        body: 'Send the questionnaire and the audience definition; we put it to the community and hand back the data. Preliminary data within 48 hours, and the report is ours to write too.',
        points: ['Preliminary data in 48 hours', 'Community sample, not bought traffic', 'The report comes from us'],
      },
      {
        id: 'custom', icon: ClipboardPenLine, kicker: '02 · Custom survey',
        title: 'The questionnaire is designed around the decision.',
        body: 'Agree what has to be answered first, then the audience, the cities and the questions. Design, fieldwork and the report are one piece of work.',
        points: ['Questions follow from the decision', 'Sample and quality control in one plan', 'A report the team can use directly'],
      },
      {
        id: 'tracker', icon: ChartSpline, kicker: '03 · Brand tracker',
        title: 'A fixed questionnaire, run in waves.',
        body: 'Awareness, consideration, usage and advertising recall, on the same questions at a fixed interval. What you read is the trend between waves; not a daily index, and no sector benchmarks.',
        points: ['Waves by month or by quarter', 'Same questions, so the trend holds', 'Custom to your category, not a syndicated index'],
      },
    ],
  },
  'en-GB': {
    eyebrow: 'Choose the quantitative track that fits you',
    statement: ['Gather the evidence, then decide. Ask the right question, reach the right sample, and the data reads as a decision.'],
    title: 'Every decision, backed by evidence.',
    lede: 'From a self-serve research platform, to a comprehensive survey run with our researchers, to an expert-led custom study — we fit the format to your needs and your budget.',
    placeholder: 'Your work email',
    submit: 'Book a demo',
    note: 'After you submit, you will receive news, tips and events from GuanyiSearch. Read our',
    privacy: 'privacy policy',
    noteEnd: 'You can unsubscribe at any time.',
    plansLink: 'See plans and pricing',
    done: 'Received. We will be in touch shortly.',
    error: 'Could not send. Please try again.',
    sections: [
      {
        id: 'self-serve', icon: ClipboardList, kicker: '01 · Self-serve and fielding',
        title: 'You write the questionnaire. We field it.',
        body: 'Send the questionnaire and the audience definition; we put it to the community and hand back the data. Preliminary data within 48 hours, and the report is ours to write too.',
        points: ['Preliminary data in 48 hours', 'Community sample, not bought traffic', 'The report comes from us'],
      },
      {
        id: 'custom', icon: ClipboardPenLine, kicker: '02 · Custom survey',
        title: 'The questionnaire is designed around the decision.',
        body: 'Agree what has to be answered first, then the audience, the cities and the questions. Design, fieldwork and the report are one piece of work.',
        points: ['Questions follow from the decision', 'Sample and quality control in one plan', 'A report the team can use directly'],
      },
      {
        id: 'tracker', icon: ChartSpline, kicker: '03 · Brand tracker',
        title: 'A fixed questionnaire, run in waves.',
        body: 'Awareness, consideration, usage and advertising recall, on the same questions at a fixed interval. What you read is the trend between waves; not a daily index, and no sector benchmarks.',
        points: ['Waves by month or by quarter', 'Same questions, so the trend holds', 'Custom to your category, not a syndicated index'],
      },
    ],
    closing: ['Tell us what you have in mind,', 'and we will work out the next step together.'],
    free: 'Start for free',
    action: 'Contact sales',
  },
  'zh-CN': {
    eyebrow: '选择专属于您的定量研究方案',
    statement: ['聚数成据，据以决断。把问题问对，把样本找对，把数据读成一份能上会的判断。'],
    title: '让每一次决策都有事实依据。',
    lede: '从自助式调研平台，到与研究人员协作开展的综合调查，再到专家主导的定制项目，我们按您的需求和预算来配。',
    placeholder: '输入公司邮箱',
    submit: '预约演示',
    note: '提交后，你会收到来自 GuanyiSearch 的资讯、技巧与活动。了解详情请参阅',
    privacy: '隐私政策',
    noteEnd: '你可以随时退订。',
    plansLink: '查看方案与价格',
    done: '已收到，我们会尽快联系你。',
    error: '提交失败，请稍后再试。',
    sections: [
      {
        id: 'self-serve', icon: ClipboardList, kicker: '01 · 自助与代投',
        title: '问卷你自己出，样本我们来投。',
        body: '把问卷和人群条件发过来，我们投到社群，把数据交回去。初步数据最快 48 小时；报告也由我们出，定价跟定制一样。',
        points: ['最快 48 小时看到初步数据', '样本来自社群，不是买来的流量', '报告同样由我们写'],
      },
      {
        id: 'custom', icon: ClipboardPenLine, kicker: '02 · 定制问卷',
        title: '问卷按那个决定来设计。',
        body: '先确认要回答什么，再定人群、城市和题目。设计、执行和报告是一件事，不拆开卖。',
        points: ['题目从决定倒推', '样本和质检在同一份方案里定', '交回能直接上会的报告'],
      },
      {
        id: 'tracker', icon: ChartSpline, kicker: '03 · 品牌追踪',
        title: '固定题组，按波次跑。',
        body: '认知、考虑、使用与广告认知，同一套题、固定间隔反复测。看的是波次之间的趋势；不是日更指数，也不做行业基准。',
        points: ['按月或按季度开波次', '题不变，趋势才可比', '按你的品类定制，不做行业指数'],
      },
    ],
  },
};

export default function Quantitative() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['en-US'];
  const entry = publicCopy.chrome?.items?.['quantitative'];
  const t = { ...base, group: entry?.title || '定量研究' };
  usePageTitle(t.group);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // 预约演示 = 研究端注册页（业主 2026-10-27 定）；邮箱带过去，注册那页会自动填上。
  const submit = (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!value) return;
    navigate(`${withLanguage('/business/register', language)}&email=${encodeURIComponent(value)}`);
  };

  return (
    <main className="quant-page">
      <section className="qn-hero">
        <div className="qn-hero-copy">
          <p className="qn-eyebrow">{t.eyebrow}</p>
          <h1 className="qn-title">{t.title}</h1>
          <p className="qn-lede">{t.lede}</p>

          <form className="qn-demo" onSubmit={submit}>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
            />
            <button type="submit">{t.submit}</button>
          </form>

          <p className="qn-note">
            {t.note}{' '}
            <Link to={withLanguage('/privacy', language)}>{t.privacy}</Link>。{t.noteEnd}
          </p>

        </div>

        <figure className="qn-hero-visual">
          <img src={heroImage} alt="" />
        </figure>
      </section>

      <QuantitativePlans />

      <section className="qn-contact" aria-labelledby="qn-contact-title">
        <h2 id="qn-contact-title" className="qn-contact-title">
          {(t.closing || ['告诉我们你的想法，', '我们讨论下一步怎么走。']).map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h2>
        <div className="qn-actions">
          <Link className="qn-action qn-action--primary" to={withLanguage('/business/register', language)}>
            {t.free || '免费开始'}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="qn-action qn-action--quiet" to={withLanguage('/contact', language)}>
            {t.action || '联系销售'}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
