import { Link } from 'react-router-dom';
import { ArrowRight, Check, ClipboardList, UsersRound, ChartSpline } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './QuantitativePlans.css';

/* 解决方案 · 定量研究 · 方案与计价 —— 2026-10-27。

   三张卡，业主定的口径：
     01 自助服务   眉标「基于平台的问卷建设」，从 $200 起，按钮「获取演示」
     02 定制研究   眉标与小字取研究端「申请研究支持」弹窗里的原文，按范围
     03 品牌追踪   眉标与小字用前面商定的那句，按范围
   后两张卡的按钮是「联系我们」。 */

const copy = {
  'en-US': {
    group: 'Plans and pricing',
    title: 'Choose your plan.',
    lede: 'Three ways to work, matched to the research question and its scale.',
    plans: [
      {
        icon: ClipboardList,
        kicker: 'Platform questionnaire',
        name: 'Self-serve',
        body: 'Build the questionnaire in the editor, or send us yours and we field it.',
        price: 'From US$200',
        priceNote: 'per study',
        points: ['Targeted by profile', 'Real respondents, checked by hand', 'Preliminary data in 48 hours', 'Results in the dashboard', 'Several studies in one workspace'],
        action: 'Book a demo',
        to: '/business/register',
        primary: true,
      },
      {
        icon: UsersRound,
        kicker: 'Custom questionnaire',
        name: 'Custom survey',
        body: 'Questionnaire designed to the research objective, with sampling, fieldwork and delivery handled as one piece of work.',
        price: 'Based on scope',
        priceNote: 'quoted per project',
        points: ['Designed around the objective', 'Scope and quote agreed first', 'Research expert support', 'Real respondents, checked by hand', 'Quota and sample structure', 'Progress in one workspace'],
        action: 'Contact us',
        to: '/contact',
        primary: false,
      },
      {
        icon: ChartSpline,
        kicker: 'Brand tracker',
        name: 'Brand tracking',
        body: 'Brand health measured on a fixed questionnaire, wave by wave, with comparable trend output across periods.',
        price: 'Based on scope',
        priceNote: 'quoted per wave plan',
        points: ['Quarterly or biannual waves', 'Unaided and aided awareness', 'Consideration, usage and NPS', 'Real respondents, checked by hand', 'Research expert support', 'Pre- and post-campaign comparison', 'Trend across waves'],
        action: 'Contact us',
        to: '/contact',
        primary: false,
      },
    ],
  },
  'en-GB': {
    group: 'Plans and pricing',
    title: 'Choose your plan.',
    lede: 'Three ways to work, matched to the research question and its scale.',
    plans: [
      {
        icon: ClipboardList,
        kicker: 'Platform questionnaire',
        name: 'Self-serve',
        body: 'Build the questionnaire in the editor, or send us yours and we field it.',
        price: 'From US$200',
        priceNote: 'per study',
        points: ['Targeted by profile', 'Real respondents, checked by hand', 'Preliminary data in 48 hours', 'Results in the dashboard', 'Several studies in one workspace'],
        action: 'Book a demo',
        to: '/business/register',
        primary: true,
      },
      {
        icon: UsersRound,
        kicker: 'Custom questionnaire',
        name: 'Custom survey',
        body: 'Questionnaire designed to the research objective, with sampling, fieldwork and delivery handled as one piece of work.',
        price: 'Based on scope',
        priceNote: 'quoted per project',
        points: ['Designed around the objective', 'Scope and quote agreed first', 'Research expert support', 'Real respondents, checked by hand', 'Quota and sample structure', 'Progress in one workspace'],
        action: 'Contact us',
        to: '/contact',
        primary: false,
      },
      {
        icon: ChartSpline,
        kicker: 'Brand tracker',
        name: 'Brand tracking',
        body: 'Brand health measured on a fixed questionnaire, wave by wave, with comparable trend output across periods.',
        price: 'Based on scope',
        priceNote: 'quoted per wave plan',
        points: ['Quarterly or biannual waves', 'Unaided and aided awareness', 'Consideration, usage and NPS', 'Real respondents, checked by hand', 'Research expert support', 'Pre- and post-campaign comparison', 'Trend across waves'],
        action: 'Contact us',
        to: '/contact',
        primary: false,
      },
    ],
  },
  'zh-CN': {
    group: '方案与价格',
    title: '选择你的方案。',
    lede: '三种做法，按研究目标与规模来选。',
    plans: [
      {
        icon: ClipboardList,
        kicker: '基于平台的问卷建设',
        name: '自助服务',
        body: '使用问卷编辑器创建问卷，或向我们发送您的问卷。',
        price: '从 $200 起',
        priceNote: '单项研究',
        points: ['按画像定向投放', '真人样本，人工核验', '48 小时见初步数据', '仪表盘里看结果', '同一工作区管理多项研究'],
        action: '获取演示',
        to: '/business/register',
        primary: true,
      },
      {
        icon: UsersRound,
        kicker: '定制问卷',
        name: '定制问卷服务',
        body: '从研究目标出发设计问卷，抽样、执行与交付作为一件事完成。',
        price: '基于项目范围',
        priceNote: '按项目报价',
        points: ['按研究目标设计问卷', '方案与报价先确认', '研究专家支持', '真人样本，人工核验', '配额与样本结构', '执行进度同工作区'],
        action: '联系我们',
        to: '/contact',
        primary: false,
      },
      {
        icon: ChartSpline,
        kicker: '品牌追踪',
        name: '定制品牌追踪',
        body: '以固定题组按波次追踪品牌健康指标，输出跨期可比的趋势。',
        price: '基于项目范围',
        priceNote: '按波次方案报价',
        points: ['季度或半年一波', '未提示与提示认知', '考虑、使用与推荐意愿', '真人样本，人工核验', '研究专家支持', '投放前后对比', '跨期趋势'],
        action: '联系我们',
        to: '/contact',
        primary: false,
      },
    ],
  },
  'zh-Hant': {
    group: '方案與價格',
    title: '選擇你的方案。',
    lede: '三種做法，按研究目標與規模來選。',
    plans: [
      {
        icon: ClipboardList,
        kicker: '基於平台的問卷建設',
        name: '自助服務',
        body: '使用問卷編輯器創建問卷，或向我們發送您的問卷。',
        price: '從 $200 起',
        priceNote: '單項研究',
        points: ['按畫像定向投放', '真人樣本，人工核驗', '48 小時見初步資料', '儀表盤裡看結果', '同一工作區管理多項研究'],
        action: '獲取演示',
        to: '/business/register',
        primary: true,
      },
      {
        icon: UsersRound,
        kicker: '定製問卷',
        name: '定製問卷服務',
        body: '從研究目標出發設計問卷，抽樣、執行與交付作為一件事完成。',
        price: '基於專案範圍',
        priceNote: '按專案報價',
        points: ['按研究目標設計問卷', '方案與報價先確認', '研究專家支持', '真人樣本，人工核驗', '配額與樣本結構', '執行進度同工作區'],
        action: '聯繫我們',
        to: '/contact',
        primary: false,
      },
      {
        icon: ChartSpline,
        kicker: '品牌追蹤',
        name: '定製品牌追蹤',
        body: '以固定題組按波次追蹤品牌健康指標，輸出跨期可比的趨勢。',
        price: '基於專案範圍',
        priceNote: '按波次方案報價',
        points: ['季度或半年一波', '未提示與提示認知', '考慮、使用與推薦意願', '真人樣本，人工核驗', '研究專家支持', '投放前後對比', '跨期趨勢'],
        action: '聯繫我們',
        to: '/contact',
        primary: false,
      },
    ],
  },
};

export default function QuantitativePlans() {
  const { language } = useLanguage();
  const t = copy[language] || copy['en-US'];
  usePageTitle(`${t.group} · ${t.title}`);

  return (
    <section className="plans-page" aria-labelledby="plans-title">
      <section className="pl-hero">
        <p className="pl-eyebrow">{t.group}</p>
        <h2 id="plans-title" className="pl-title">{t.title}</h2>
        <p className="pl-lede">{t.lede}</p>
      </section>

      <section className="pl-grid" aria-label={t.title}>
        {t.plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <article key={plan.name} className={`pl-card${plan.primary ? ' pl-card--lead' : ''}`}>
              <Icon size={23} strokeWidth={1.65} aria-hidden="true" />
              <p className="pl-kicker">{plan.kicker}</p>
              <h2>{plan.name}</h2>
              <p className="pl-body">{plan.body}</p>
              <p className="pl-price">{plan.price}</p>
              <p className="pl-price-note">{plan.priceNote}</p>
              <ul className="pl-points">
                {plan.points.map((point) => (
                  <li key={point}>
                    <Check size={14} strokeWidth={2} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link
                className={`pl-action${plan.primary ? ' pl-action--solid' : ' pl-action--quiet'}`}
                to={withLanguage(plan.to, language)}
              >
                {plan.action}
                <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
              </Link>
            </article>
          );
        })}
      </section>
    </section>
  );
}
