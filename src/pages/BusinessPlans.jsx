import { useEffect, useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchAiCredits } from '../components/AiCredits';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessPlans.css';

/* Four plans, described by what a person is trying to do rather than by a
   feature matrix. The middle one is the intended choice; the last one is for
   teams that need seats and invoices. */

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: { 'zh-CN': '先把一份问卷做出来', en: 'Get one questionnaire made' },
    price: { 'zh-CN': '$0', en: '$0' },
    cycle: { 'zh-CN': '永久免费', en: 'free forever' },
    cta: { 'zh-CN': '免费开始', en: 'Start free' },
    features: {
      'zh-CN': ['20 次 AI 辅助', '3 份进行中的问卷', '自有名单回收 100 份', 'CSV 导出'],
      en: ['20 AI credits', '3 active questionnaires', '100 responses from your own list', 'CSV export'],
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    tagline: { 'zh-CN': '一个人做研究，够用', en: 'One researcher, enough room' },
    price: { 'zh-CN': '$19', en: '$19' },
    cycle: { 'zh-CN': '每月 · 可随时取消', en: 'per month · cancel anytime' },
    cta: { 'zh-CN': '开始用 Starter', en: 'Choose Starter' },
    features: {
      'zh-CN': ['每月 300 次 AI 辅助', '10 份进行中的问卷', '自有名单回收 1,000 份', '外部样本（按研究报价）', '问卷带上你的 Logo'],
      en: ['300 AI credits a month', '10 active questionnaires', '1,000 responses a month', 'External sample, quoted per study', 'Your logo on the questionnaire'],
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: { 'zh-CN': '一年十几份研究，配额和团队都能用', en: 'A dozen studies a year, quotas and a team' },
    price: { 'zh-CN': '$49', en: '$49' },
    cycle: { 'zh-CN': '每月 · 推荐', en: 'per month · recommended' },
    cta: { 'zh-CN': '升级到 Pro', en: 'Choose Pro' },
    features: {
      'zh-CN': ['每月 1,000 次 AI 辅助', '问卷数量不限', '自有名单回收 5,000 份', '配额控制与质量校验', '5 个席位'],
      en: ['1,000 AI credits a month', 'Unlimited questionnaires', '5,000 responses a month', 'Quotas and quality checks', '5 seats'],
    },
  },
  {
    id: 'team',
    name: 'Team',
    tagline: { 'zh-CN': '给研究团队用：席位、发票、审批', en: 'For research teams: seats, invoices, approvals' },
    price: { 'zh-CN': '$149', en: '$149' },
    cycle: { 'zh-CN': '每月 · 含团队管理', en: 'per month · with team controls' },
    cta: { 'zh-CN': '联系我们开通', en: 'Talk to us' },
    features: {
      'zh-CN': ['每月 4,000 次 AI 辅助', '自有名单回收 20,000 份', '10 个席位与角色权限', '发票、PO、月结', '数据导出与品牌定制'],
      en: ['4,000 AI credits a month', '20,000 responses a month', '10 seats with roles', 'Invoices, POs, monthly billing', 'Exports and branding'],
    },
  },
];

const copy = {
  'zh-CN': {
    back: '返回', title: '与你的研究一起成长的套餐', intro: '按你一年做多少研究来选，不用先算清楚需要多少次。',
    current: '当前套餐', monthly: '月付', yearly: '按年付 · 省 17%', note: '外部样本按研究单独报价，不含在订阅里。',
  },
  en: {
    back: 'Back', title: 'Plans that grow with your research', intro: 'Pick by how many studies you run a year, not by how many credits you think you need.',
    current: 'Current plan', monthly: 'Monthly', yearly: 'Yearly · save 17%', note: 'External sample is quoted per study and is not part of the subscription.',
  },
};

export default function BusinessPlans() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;
  const [current, setCurrent] = useState('free');

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
          <span className="is-active">{text.monthly}</span>
          <span>{text.yearly}</span>
        </div>

        <div className="pl-grid">
          {PLANS.map((plan) => (
            <article className={`pl-card${plan.id === 'pro' ? ' is-featured' : ''}`} key={plan.id}>
              <header>
                <strong>{plan.name}</strong>
                <span>{plan.tagline[language] || plan.tagline.en}</span>
              </header>
              <p className="pl-price">
                {plan.price[language] || plan.price.en}
                <small>{plan.cycle[language] || plan.cycle.en}</small>
              </p>
              <button
                type="button"
                className={plan.id === 'pro' ? 'pl-cta is-primary' : 'pl-cta'}
                disabled={plan.id === current}
              >
                {plan.id === current ? text.current : (plan.cta[language] || plan.cta.en)}
              </button>
              <ul>
                {(plan.features[language] || plan.features.en).map((feature) => (
                  <li key={feature}><Check size={14} aria-hidden="true" /> {feature}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="pl-note">{text.note}</p>
      </section>
    </main>
  );
}
