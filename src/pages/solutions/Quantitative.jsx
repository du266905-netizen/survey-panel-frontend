import { Link } from 'react-router-dom';
import { ArrowRight, ClipboardList, ClipboardPenLine, ChartSpline, Table2 } from 'lucide-react';
import { useLanguage, withLanguage } from '../../components/LanguageContext';
import usePageTitle from '../../hooks/usePageTitle';
import './Quantitative.css';

/* 解决方案 · 定量研究 —— 2026-10-27 第三张，一页四段。

   锚点顺序按业主 2026-10-27 定的梯子：客户自己出问卷（自助 + 代投合并）→
   我们出问卷（定制）→ 追踪 → 案头。
   来源：
     · 眉标、说明句 = 导航里的定量条目（publicPageCopy.js:20974）
     · 「初步数据最快 48 小时」= China 页 walk 段（publicPageCopy.js 里那句）
     · 四段的名字与其余短句 = 这一轮新写，等业主改 */

const copy = {
  'en-US': {
    group: 'Quantitative research',
    title: 'Numbers that answer a decision, not a spreadsheet.',
    lede: 'Surveys, trackers and sizing.',
    nav: [
      { id: 'self-serve', label: 'Self-serve & fielding' },
      { id: 'custom', label: 'Custom survey' },
      { id: 'tracker', label: 'Brand tracker' },
      { id: 'desk', label: 'Desk research' },
    ],
    sections: [
      {
        id: 'self-serve', icon: ClipboardList, kicker: '01 · Self-serve & fielding',
        title: 'You write the questionnaire. We field it.',
        body: 'Send us the questionnaire and the audience; we put it to the community and bring back the data. Preliminary data within 48 hours, the report from us as well.',
        points: ['48 hours to preliminary data', 'Community supply, not bought traffic', 'Reporting stays with us'],
      },
      {
        id: 'custom', icon: ClipboardPenLine, kicker: '02 · Custom survey',
        title: 'We design the questionnaire around the decision.',
        body: 'Start from what has to be decided, then choose the audience, the cities and the questions. Design, fieldwork and the report are one piece of work.',
        points: ['Questionnaire designed to the decision', 'Sample and quality control in one plan', 'A report the team can use directly'],
      },
      {
        id: 'tracker', icon: ChartSpline, kicker: '03 · Brand tracker',
        title: 'A fixed questionnaire, run in waves.',
        body: 'Awareness, consideration, usage and advertising recall, measured on the same questions at a fixed interval. Trend over waves; not a daily index, and no sector benchmarks.',
        points: ['Waves by month or by quarter', 'Same questions, so the trend is comparable', 'Custom to your category, not a syndicated index'],
      },
      {
        id: 'desk', icon: Table2, kicker: '04 · Desk research',
        title: 'Size and structure, from material that already exists.',
        body: 'Public data, filings and industry material, read and reconciled. No fieldwork; useful when the question is how big a market is and how it is split.',
        points: ['Market size and structure', 'Public data and filings', 'No sample needed'],
      },
    ],
    contactTitle: ['Tell us what you have in mind, ', 'and we will work out the next step together.'],
    free: 'Start for free',
    action: 'Contact sales',
  },
  'zh-CN': {
    group: '定量研究',
    title: '数字要回答一个决定，不是填满一张表。',
    lede: '问卷、追踪与规模测算。',
    nav: [
      { id: 'self-serve', label: '自助与代投' },
      { id: 'custom', label: '定制问卷' },
      { id: 'tracker', label: '品牌追踪' },
      { id: 'desk', label: '案头研究' },
    ],
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
      {
        id: 'desk', icon: Table2, kicker: '04 · 案头研究',
        title: '规模和结构，从已有的材料里读出来。',
        body: '公开数据、财报和行业资料，读下来、对一遍。不下场发问卷，适合回答「这个市场多大、怎么分」这类问题。',
        points: ['市场规模与结构', '公开数据、财报与行业资料', '不需要样本'],
      },
    ],
    contactTitle: ['告诉我们你的想法，', '我们讨论下一步怎么走。'],
    free: '免费开始',
    action: '联系销售',
  },
  'zh-Hant': {
    group: '定量研究',
    title: '數字要回答一個決定，不是填滿一張表。',
    lede: '問卷、追蹤與規模測算。',
    nav: [
      { id: 'self-serve', label: '自助與代投' },
      { id: 'custom', label: '定製問卷' },
      { id: 'tracker', label: '品牌追蹤' },
      { id: 'desk', label: '案頭研究' },
    ],
    sections: [
      {
        id: 'self-serve', icon: ClipboardList, kicker: '01 · 自助與代投',
        title: '問卷你自己出，樣本我們來投。',
        body: '把問卷和人群條件發過來，我們投到社群，把資料交回去。初步資料最快 48 小時；報告也由我們出，定價跟定製一樣。',
        points: ['最快 48 小時看到初步資料', '樣本來自社群，不是買來的流量', '報告同樣由我們寫'],
      },
      {
        id: 'custom', icon: ClipboardPenLine, kicker: '02 · 定製問卷',
        title: '問卷按那個決定來設計。',
        body: '先確認要回答什麼，再定人群、城市和題目。設計、執行和報告是一件事，不拆開賣。',
        points: ['題目從決定倒推', '樣本和質檢在同一份方案裡定', '交回能直接上會的報告'],
      },
      {
        id: 'tracker', icon: ChartSpline, kicker: '03 · 品牌追蹤',
        title: '固定題組，按波次跑。',
        body: '認知、考慮、使用與廣告認知，同一套題、固定間隔反覆測。看的是波次之間的趨勢；不是日更指數，也不做行業基準。',
        points: ['按月或按季開波次', '題不變，趨勢才可比', '按你的品類定製，不做行業指數'],
      },
      {
        id: 'desk', icon: Table2, kicker: '04 · 案頭研究',
        title: '規模和結構，從已有的材料裡讀出來。',
        body: '公開資料、財報和行業資料，讀下來、對一遍。不下場發問卷，適合回答「這個市場多大、怎麼分」這類問題。',
        points: ['市場規模與結構', '公開資料、財報與行業資料', '不需要樣本'],
      },
    ],
    contactTitle: ['告訴我們你的想法，', '我們討論下一步怎麼走。'],
    free: '免費開始',
    action: '聯繫銷售',
  },
};

export default function Quantitative() {
  const { language, publicCopy } = useLanguage();
  const base = copy[language] || copy['zh-CN'];
  const entry = publicCopy.chrome?.items?.['quantitative'];
  const t = { ...base, group: entry?.title || base.group, lede: entry?.note || base.lede };
  usePageTitle(t.group);

  return (
    <main className="quant-page">
      <section className="qn-hero">
        <p className="qn-eyebrow">{t.group}</p>
        <h1 className="qn-title">{t.title}</h1>
        <p className="qn-lede">{t.lede}</p>
        <div className="qn-actions">
          <Link className="qn-action qn-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="qn-action qn-action--quiet" to={withLanguage('/contact', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>

      <nav className="qn-jump" aria-label={t.group}>
        <ul>
          {t.nav.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      {t.sections.map((section, index) => {
        const Icon = section.icon;
        return (
          <section
            key={section.id}
            id={section.id}
            className={`qn-section${index % 2 ? ' qn-section--deep' : ''}`}
            aria-labelledby={`${section.id}-title`}
          >
            <div className="qn-section-inner">
              <p className="qn-eyebrow">{section.kicker}</p>
              <h2 id={`${section.id}-title`} className="qn-section-title">{section.title}</h2>
              <div className="qn-section-body">
                <Icon size={23} strokeWidth={1.65} aria-hidden="true" />
                <p>{section.body}</p>
                <ul>
                  {section.points.map((point) => <li key={point}>{point}</li>)}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section className="qn-contact" aria-labelledby="qn-contact-title">
        <h2 id="qn-contact-title" className="qn-contact-title">
          {t.contactTitle.map((line) => <span key={line}>{line}</span>)}
        </h2>
        <div className="qn-actions">
          <Link className="qn-action qn-action--primary" to={withLanguage('/business/register', language)}>
            {t.free}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
          <Link className="qn-action qn-action--quiet" to={withLanguage('/contact', language)}>
            {t.action}
            <ArrowRight size={17} strokeWidth={1.65} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
