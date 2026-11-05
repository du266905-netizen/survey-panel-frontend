import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Info, Lock, Wallet } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessQuote.css';

/* Step three: what the study costs and how it is paid.
 *
 * The number is computed in the page for now, with the same shape the pricing
 * service will return: a per-complete price derived from incidence and length,
 * times completes, plus the payment fee. It is labelled as an estimate because
 * the service does not exist yet — when it does, this page swaps the local
 * calculation for the response and the markup stays.
 *
 * Fixed rules shown to the customer: the price holds for seven days, unfilled
 * completes are refunded, and replacements for bad data are free. */

const FIXED_COST = 20;
const PAYMENT_FEE = 0.03;
const MARGIN = 0.45;
const WHOLESALE_BASE = 1.2;

const copy = {
  'zh-CN': {
    back: '返回项目', flow: '流程',
    stepAudience: '受众', stepQuestions: '问卷构建', stepQuote: '报价与付款', stepLaunch: '发布投放',
    title: '报价与付款', intro: '价格按份数、人群难度和问卷时长算。签下来就是最终价。',
    briefTitle: '本次研究', completes: '份有效回答', minutes: '分钟问卷', questions: '道题',
    incidence: '预计符合比例', incidenceHint: '条件越多，符合的人越少，单价越高。',
    breakdown: '价格构成', unit: '单份价格', count: '份数', sample: '样本费用',
    fee: '支付手续费', total: '合计', estimateNote: '示意价：签约时用同一公式重算一次并锁定，不另出报价单。',
    guarantees: '我们的承诺', g1: '收不满按实际完成收费', g2: '数据有问题免费补', g3: '价格锁定 7 天',
    balance: '账户余额', pay: '去付款', notEnough: '余额不足，先去充值', topUp: '充值',
    lockLine: '这个价格锁到 {date}，期间不会变。',
    locked: '项目已送审，报价不能再改。',
  },
  en: {
    back: 'Back to project', flow: 'Flow',
    stepAudience: 'Audience', stepQuestions: 'Build', stepQuote: 'Quote and payment', stepLaunch: 'Launch',
    title: 'Quote and payment', intro: 'Priced by completes, how hard the audience is, and how long the questionnaire runs. What you sign is the final price.',
    briefTitle: 'This study', completes: 'completes', minutes: 'minute questionnaire', questions: 'questions',
    incidence: 'Estimated incidence', incidenceHint: 'More conditions mean fewer eligible people, and a higher price per complete.',
    breakdown: 'Breakdown', unit: 'Price per complete', count: 'Completes', sample: 'Sample',
    fee: 'Payment fee', total: 'Total', estimateNote: 'Estimate: the same formula is recalculated and locked when you sign — no separate quote document.',
    guarantees: 'What we commit to', g1: 'Pay for completes delivered', g2: 'Free replacements for bad data', g3: 'Price locked for seven days',
    balance: 'Account balance', pay: 'Pay', notEnough: 'Not enough balance — top up first', topUp: 'Top up',
    lockLine: 'This price holds until {date}.',
    locked: 'The project is no longer a draft, so the quote cannot change.',
  },
};

const lockUntil = () => {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return date;
};

const money = (value, language) => new Intl.NumberFormat(language === 'en' ? 'en-US' : 'zh-CN', {
  style: 'currency', currency: 'USD', maximumFractionDigits: 2,
}).format(value);

export default function BusinessQuote() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  const [project, setProject] = useState(null);
  const lockDate = lockUntil().toLocaleDateString(language === 'en' ? 'en-GB' : 'zh-CN', { month: 'long', day: 'numeric' });

  useEffect(() => {
    getBusinessProject(projectId).then((response) => setProject(response.data.project)).catch(() => {});
  }, [projectId]);

  const criteria = useMemo(() => {
    const targeting = project?.targeting || {};
    const named = ['age', 'industry', 'urbanity'].reduce((sum, key) => sum + (Array.isArray(targeting[key]) ? targeting[key].length : 0), 0);
    const filters = Object.values(targeting.filters || {}).reduce((sum, values) => sum + (Array.isArray(values) ? values.length : 0), 0);
    return named + filters;
  }, [project]);

  const completes = Number(project?.targeting?.completes || project?.targetParticipants || 500);
  const minutes = Number(project?.estimatedMinutes || 8);
  const questions = Array.isArray(project?.questionnaire?.questions) ? project.questionnaire.questions.length : 0;

  /* Incidence falls as criteria accumulate; the price per complete rises with
     it. Same shape as the pricing service, kept here so the page is usable. */
  const incidence = Math.max(0.05, 0.6 * (0.82 ** criteria));
  const lengthFactor = 1 + Math.max(0, minutes - 8) * 0.05;
  const supplierCost = (WHOLESALE_BASE / incidence) * lengthFactor;
  const unitPrice = (supplierCost + FIXED_COST / completes) / (1 - PAYMENT_FEE - MARGIN);
  const sampleCost = completes * unitPrice;
  const fee = sampleCost * PAYMENT_FEE;
  const total = sampleCost + fee;

  const status = project?.status || 'DRAFT';
  const locked = !['DRAFT', 'QUOTE_REQUIRED'].includes(status);

  return (
    <main className="sq-page bq-page">
      <header className="sq-top">
        <button type="button" className="sq-icon" onClick={() => navigate(withLanguage(`/business/projects/${projectId}`, language))} aria-label={text.back}>
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
        <div className="sq-title">
          <strong>{project?.title || '—'}</strong>
          <span className="sq-status">{text.title}</span>
        </div>
      </header>

      <div className="sq-shell">
        <nav className="sq-nav" aria-label={text.flow}>
          <a href={withLanguage(`/business/projects/${projectId}/audience`, language)}>
            <span className="bq-step-n">1</span> {text.stepAudience}
          </a>
          <a href={withLanguage(`/business/projects/${projectId}`, language)}>
            <span className="bq-step-n">2</span> {text.stepQuestions}
          </a>
          <span className="is-active"><span className="bq-step-n">3</span> {text.stepQuote}</span>
          <span className="is-todo"><span className="bq-step-n">4</span> {text.stepLaunch}</span>
        </nav>

        <section className="bq-canvas">
          <h1>{text.title}</h1>
          <p className="bq-intro">{text.intro}</p>

          <section className="bq-summary">
            <h2>{text.briefTitle}</h2>
            <dl>
              <div><dt>{project?.title || '—'}</dt><dd>{completes} {text.completes}</dd></div>
              <div><dt>{questions} {text.questions}</dt><dd>{minutes} {text.minutes}</dd></div>
            </dl>
            <p className="bq-incidence">
              {text.incidence} <strong>{Math.round(incidence * 100)}%</strong>
              <span>{text.incidenceHint}</span>
            </p>
          </section>

          <section className="bq-breakdown">
            <h2>{text.breakdown}</h2>
            <dl>
              <div><dt>{text.unit}</dt><dd>{money(unitPrice, language)}</dd></div>
              <div><dt>{text.count}</dt><dd>{completes.toLocaleString(language === 'en' ? 'en-US' : 'zh-CN')}</dd></div>
              <div><dt>{text.sample}</dt><dd>{money(sampleCost, language)}</dd></div>
              <div><dt>{text.fee}</dt><dd>{money(fee, language)}</dd></div>
              <div className="is-total"><dt>{text.total}</dt><dd>{money(total, language)}</dd></div>
            </dl>
            <p className="bq-note"><Info size={13} aria-hidden="true" /> {text.estimateNote}</p>
          </section>

          <section className="bq-guarantees">
            <h2>{text.guarantees}</h2>
            <ul>
              <li><Check size={14} aria-hidden="true" /> {text.g1}</li>
              <li><Check size={14} aria-hidden="true" /> {text.g2}</li>
              <li><Lock size={14} aria-hidden="true" /> {text.g3}</li>
            </ul>
          </section>
        </section>

        <aside className="bq-side">
          <section className="bq-side-block">
            <h2>{text.total}</h2>
            <strong className="bq-total">{money(total, language)}</strong>
            {locked ? <p className="bq-locked">{text.locked}</p> : null}
            <button
              type="button"
              className="sq-btn is-primary bq-pay"
              onClick={() => navigate(withLanguage('/business/add-funds', language))}
            >
              <Wallet size={15} aria-hidden="true" /> {text.pay} <ArrowRight size={15} aria-hidden="true" />
            </button>
            <p className="bq-note-small">{text.lockLine.replace('{date}', lockDate)}</p>
          </section>

          <section className="bq-side-block">
            <h2>{text.balance}</h2>
            <p className="bq-balance">—</p>
            <button type="button" className="sq-btn" onClick={() => navigate(withLanguage('/business/add-funds', language))}>
              {text.topUp}
            </button>
          </section>
        </aside>
      </div>
    </main>
  );
}
