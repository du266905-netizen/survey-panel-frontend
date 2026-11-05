import { useEffect, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchAiCredits } from '../components/AiCredits';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessPlans.css';

/* Four plans. Each card lists only what that plan adds; inheritance is one line
   ("含 Starter 全部") instead of repeating the tier below, so a higher plan can
   never look like it lost something.

   Prices are monthly list prices. Yearly is 20% off — the number in
   BACKEND §16.5, not a percentage borrowed from someone else's page. */

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: { 'zh-CN': '先跑通方法，不花钱', en: 'Try the method, at no cost' },
    monthly: 0,
    yearly: 0,
    cycle: { 'zh-CN': '永久免费', en: 'free forever' },
    cta: { 'zh-CN': '免费开始', en: 'Start free' },
    inherit: { 'zh-CN': '包含：', en: 'Includes:' },
    features: {
      'zh-CN': ['20 次 AI 辅助', '3 份进行中的问卷', '自有名单回收 100 份', 'CSV 导出', '11 种题型与跳转逻辑'],
      en: ['20 AI credits', '3 active questionnaires', '100 responses from your own list', 'CSV export', '11 question types with logic'],
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: { 'zh-CN': '一个人的研究，一套工具', en: 'One researcher, one tool' },
    monthly: 19,
    yearly: 182,
    cycle: { 'zh-CN': '每月 · 可随时取消', en: 'per month · cancel anytime' },
    cta: { 'zh-CN': '开始用 Starter', en: 'Choose Starter' },
    inherit: { 'zh-CN': '含 Free 全部，另加：', en: 'Everything in Free, and:' },
    features: {
      'zh-CN': ['每月 300 次 AI 辅助', '10 份进行中的问卷', '自有名单回收 1,000 份 / 月', '外部样本（按研究报价）', '问卷带你的 Logo · 2 个席位'],
      en: ['300 AI credits a month', '10 active questionnaires', '1,000 responses a month', 'External sample, quoted per study', 'Your logo · 2 seats'],
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: { 'zh-CN': '项目多少都不限，按年做', en: 'Unlimited studies, run all year' },
    monthly: 49,
    yearly: 470,
    featured: true,
    cycle: { 'zh-CN': '每月 · 推荐', en: 'per month · recommended' },
    cta: { 'zh-CN': '升级到 Pro', en: 'Choose Pro' },
    inherit: { 'zh-CN': '含 Starter 全部，另加：', en: 'Everything in Starter, and:' },
    features: {
      'zh-CN': ['每月 1,000 次 AI 辅助', '问卷数量不限', '自有名单回收 5,000 份 / 月', '配额控制与质量校验', '5 个席位与月度预算'],
      en: ['1,000 AI credits a month', 'Unlimited questionnaires', '5,000 responses a month', 'Quotas and quality checks', '5 seats and monthly budgets'],
    },
  },
  {
    id: 'team',
    name: 'Team',
    tagline: { 'zh-CN': '能报销、能审批、能分权', en: 'Invoice, approve, and split by role' },
    monthly: 149,
    yearly: 1430,
    cycle: { 'zh-CN': '每月 · 含团队管理', en: 'per month · with team controls' },
    cta: { 'zh-CN': '联系我们开通', en: 'Talk to us' },
    inherit: { 'zh-CN': '含 Pro 全部，另加：', en: 'Everything in Pro, and:' },
    features: {
      'zh-CN': ['每月 4,000 次 AI 辅助', '自有名单回收 20,000 份 / 月', '10 个席位与角色权限', '发票、PO、月结', '团队预算与品牌定制'],
      en: ['4,000 AI credits a month', '20,000 responses a month', '10 seats with roles', 'Invoices, POs, monthly billing', 'Team budgets and branding'],
    },
  },
];

const copy = {
  'zh-CN': {
    back: '返回', title: '与你的研究一起成长的套餐', intro: '按你一年做多少研究来选，不用先算清楚需要多少次。',
    current: '当前套餐', monthly: '月付', yearly: '按年付 · 省 20%', perMonth: '每月', perYear: '每年，一次付清',
    credits: 'AI 次数当月用不完，结转到下月，最多留一个月的量；加购的次数 12 个月内有效。',
    note: '外部样本按研究单独报价，不含在订阅里。',
  },
  en: {
    back: 'Back', title: 'Plans that grow with your research', intro: 'Pick by how many studies you run a year, not by how many credits you think you need.',
    current: 'Current plan', monthly: 'Monthly', yearly: 'Yearly · save 20%', perMonth: 'per month', perYear: 'per year, billed once',
    credits: 'Unused AI credits carry over to the next month, up to one month of allowance. Purchased credits stay valid for 12 months.',
    note: 'External sample is quoted per study and is not part of the subscription.',
  },
};

export default function BusinessPlans() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;
  const [current, setCurrent] = useState('free');
  const [yearly, setYearly] = useState(false);

  useEffect(() => {
    fetchAiCredits().then((data) => {
      const plan = String(data?.plan || '').toLowerCase();
      if (plan) setCurrent(plan);
    }).catch(() => {});
  }, []);

  return (
    <main className="pl-page">
      <header className="pl-top">
        <button type="button" className="pl-back" onClick={() => navigate(withLanguage('/business/ai-brief', language))} aria-label={text.back}>
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
      </header>

      <section className="pl-shell">
        <h1>{text.title}</h1>
        <p className="pl-intro">{text.intro}</p>

        <div className="pl-toggle" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={!yearly}
            className={yearly ? '' : 'is-active'}
            onClick={() => setYearly(false)}
          >
            {text.monthly}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={yearly}
            className={yearly ? 'is-active' : ''}
            onClick={() => setYearly(true)}
          >
            {text.yearly}
          </button>
        </div>

        <div className="pl-grid">
          {PLANS.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <article className={`pl-card${plan.featured ? ' is-featured' : ''}`} key={plan.id}>
                <header>
                  <div className="pl-card-name">
                    <strong>{plan.name}</strong>
                    {plan.featured ? <span className="pl-badge">{language === 'zh-CN' ? '推荐' : 'Recommended'}</span> : null}
                  </div>
                  <p>{plan.tagline[language] || plan.tagline.en}</p>
                </header>
                <p className="pl-price">
                  ${price.toLocaleString('en-US')}
                  <small>{price === 0 ? (plan.cycle[language] || plan.cycle.en) : (yearly ? text.perYear : text.perMonth)}</small>
                </p>
                <button
                  type="button"
                  className={plan.featured ? 'pl-cta is-primary' : 'pl-cta'}
                  disabled={plan.id === current}
                >
                  {plan.id === current ? text.current : (plan.cta[language] || plan.cta.en)}
                </button>
                <p className="pl-inherit">{plan.inherit[language] || plan.inherit.en}</p>
                <ul>
                  {(plan.features[language] || plan.features.en).map((feature) => (
                    <li key={feature}><Check size={14} aria-hidden="true" /> {feature}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        <footer className="pl-foot">
          <p className="pl-credits">{text.credits}</p>
          <p className="pl-note">{text.note}</p>
        </footer>
      </section>
    </main>
  );
}
