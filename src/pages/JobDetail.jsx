import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import { careersCopy } from './Careers';
import skyImage from '../assets/careers/sky.jpg';
import './JobDetail.css';

/* Job detail — 2026-10-28, second pass.

   No navigation bar on this page: the photograph runs to the top, the way back
   sits on the photograph, and everything below lives in one 820 column — title,
   location and apply on the same line as the copy.

   The copy is written for the public page. Nothing here names internal systems,
   supplier arrangements, team structures or commercial mechanics: duties are
   described in terms of what the person does for the client. */

const chrome = {
  'zh-CN': { line: '平等、包容、开放创新的高效性组织', back: '返回职位列表', apply: '申请该职位' },
  'zh-Hant': { line: '平等、包容、開放創新的高效性組織', back: '返回職位列表', apply: '申請該職位' },
  'en-US': { line: 'An equal, inclusive, and innovative high-performing organization.', back: 'Back to jobs', apply: 'Apply for this role' },
  'en-GB': { line: 'An equal, inclusive, and innovative high-performing organization.', back: 'Back to jobs', apply: 'Apply for this role' },
};

/* The general introduction sits on every job page, above the team mission. It
   used to live on the careers page; the owner moved it here. */
const generalIntro = {
  'zh-CN': '我们深知，优秀的人才是观一（GUANYISEARCH）最宝贵的财富，也是我们连接全球商业、打破信息壁垒的核心动力。作为一家面向全球的市场调研平台，我们致力于用技术与严谨的方法论重塑行业标准。在这里，你的声音将被倾听，你的能力将被放大，我们期待与你一起，在充满不确定性的全球市场中，共同寻找确定的价值。',
  'zh-Hant': '我們深知，優秀的人才是觀一（GUANYISEARCH）最寶貴的財富，也是我們連接全球商業、打破資訊壁壘的核心動力。作為一家面向全球的市場調研平台，我們致力於用技術與嚴謹的方法論重塑行業標準。在這裡，你的聲音將被傾聽，你的能力將被放大，我們期待與你一起，在充滿不確定性的全球市場中，共同尋找確定的價值。',
  'en-US': 'We know that good people are GuanyiSearch’s real asset — the force that connects us to business around the world and takes down the walls between information and decision. As a global research platform, we set out to raise the standard of the work with technology and a strict method. Here your voice is heard and your ability is put to use. We are looking for people to join us in reading this uncertain world and finding what can be relied on.',
  'en-GB': 'We know that good people are GuanyiSearch’s real asset — the force that connects us to business around the world and takes down the walls between information and decision. As a global research platform, we set out to raise the standard of the work with technology and a strict method. Here your voice is heard and your ability is put to use. We are looking for people to join us in reading this uncertain world and finding what can be relied on.',
};

const jobContent = {
  'account-manager': {
    'zh-CN': {
      missionTitle: '团队使命',
      mission: '你是我们与客户之间的核心枢纽，也是决定客户体验的关键角色。在这里，你不只是执行者，更是客户的战略伙伴：理解他们要解决的问题，协调团队把方案落地，确保交付达到承诺的水准。我们期待你用共情与专业，把一次次的合作变成长期的信任。',
      dutiesTitle: '岗位职责',
      duties: [
        ['客户对接与关系维护（Client Engagement）', '作为海外客户的主要接口人，建立并维护长期信任，持续识别客户下一阶段真正要回答的问题。'],
        ['项目全流程管理（Project Management）', '从需求沟通、方案撰写、执行跟进到结果交付，把项目按时按质地推进完成。'],
        ['跨团队协作（Cross-functional Coordination）', '协调内部研究与技术团队，处理跨时区协作中的节奏差异和突发问题。'],
        ['商业沟通与提案（Insight & Proposal）', '把研究结果整理成客户能直接使用的结论，并清楚地讲给客户听。'],
        ['续约与长期合作（Account Growth）', '跟进项目结束后的反馈与续约，让一次合作有机会走成长期关系。'],
      ],
      requirementsTitle: '岗位要求',
      requirements: [
        ['学历与经验', '本科及以上学历。1–3 年（或 3 年以上）B2B 客户管理、市场调研、咨询或相关海外业务经验。'],
        ['语言能力', '英语书面与口语流利，能独立用英文开会、写提案与报告；中文流利，能与团队顺畅协作。'],
        ['项目管理', '能同时推进多个项目，分清优先级，在时间压力下仍把细节守住。'],
        ['分析与表达', '具备基本的逻辑分析能力，能把数据讲成一个有结论的故事；熟练使用文档与表格工具。'],
        ['综合素质', '自我驱动，抗压，善于沟通。愿意在早期团队中承担不确定性，遇到没有标准答案的问题也能往前走。'],
      ],
    },
    'zh-Hant': {
      missionTitle: '團隊使命',
      mission: '你是我們與客戶之間的核心樞紐，也是決定客戶體驗的關鍵角色。在這裡，你不只是執行者，更是客戶的策略夥伴：理解他們要解決的問題，協調團隊把方案落地，確保交付達到承諾的水準。我們期待你用同理心與專業，把一次次合作變成長期的信任。',
      dutiesTitle: '崗位職責',
      duties: [
        ['客戶對接與關係維護（Client Engagement）', '作為海外客戶的主要接口人，建立並維護長期信任，持續辨識客戶下一階段真正要回答的問題。'],
        ['專案全流程管理（Project Management）', '從需求溝通、方案撰寫、執行跟進到結果交付，把專案按時按質地推進完成。'],
        ['跨團隊協作（Cross-functional Coordination）', '協調內部研究與技術團隊，處理跨時區協作中的節奏差異和突發問題。'],
        ['商業溝通與提案（Insight & Proposal）', '把研究結果整理成客戶能直接使用的結論，並清楚地講給客戶聽。'],
        ['續約與長期合作（Account Growth）', '跟進專案結束後的回饋與續約，讓一次合作有機會走成長期關係。'],
      ],
      requirementsTitle: '崗位要求',
      requirements: [
        ['學歷與經驗', '本科及以上學歷。1–3 年（或 3 年以上）B2B 客戶管理、市場調研、顧問或相關海外業務經驗。'],
        ['語言能力', '英語書面與口語流利，能獨立用英文開會、寫提案與報告；中文流利，能與團隊順暢協作。'],
        ['專案管理', '能同時推進多個專案，分清優先順序，在時間壓力下仍把細節守住。'],
        ['分析與表達', '具備基本的邏輯分析能力，能把資料講成一個有結論的故事；熟練使用文件與表格工具。'],
        ['綜合素質', '自我驅動，抗壓，善於溝通。願意在早期團隊中承擔不確定性，遇到沒有標準答案的問題也能往前走。'],
      ],
    },
    'en-US': {
      missionTitle: 'The mission',
      mission: 'You are the hinge between us and the client, and the role that decides what the relationship feels like. Here you are not an executor; you are the client’s strategic partner: you learn what they are trying to settle, bring the team together to make the plan real, and see that the work lands at the level promised. We are looking for the empathy and the discipline that turn one project into long-term trust.',
      dutiesTitle: 'What you will do',
      duties: [
        ['Client engagement', 'Be the client’s main point of contact overseas, build trust that lasts, and keep finding the question they will need answered next.'],
        ['Project management', 'Take the work from first conversation through the proposal, the fieldwork and the final delivery, on time and at the standard promised.'],
        ['Working across teams', 'Bring research and technical colleagues together, and hold the rhythm when time zones and priorities pull apart.'],
        ['Insight and proposal', 'Turn the findings into a conclusion a client can act on, and say it clearly in the room.'],
        ['The longer relationship', 'Follow up after delivery and take the renewal conversation seriously — a project is a chance at a relationship.'],
      ],
      requirementsTitle: 'What you will bring',
      requirements: [
        ['Education and experience', 'Bachelor’s degree or above. One to three years (or more) in B2B account management, market research, consulting or a related overseas-facing role.'],
        ['Languages', 'Fluent written and spoken English — meetings, proposals and reports. Fluent Chinese for working with the team.'],
        ['Project management', 'Several projects at once, priorities kept straight, and the details held even when time is short.'],
        ['Analysis and expression', 'Enough structure to turn data into an argument with a conclusion; comfortable with the usual document and spreadsheet tools.'],
        ['Personal qualities', 'Self-directed, calm under pressure, good with people. Willing to carry uncertainty in an early-stage team, and to move forward when there is no clean answer.'],
      ],
    },
    'en-GB': {
      missionTitle: 'The mission',
      mission: 'You are the hinge between us and the client, and the role that decides what the relationship feels like. Here you are not an executor; you are the client’s strategic partner: you learn what they are trying to settle, bring the team together to make the plan real, and see that the work lands at the level promised. We are looking for the empathy and the discipline that turn one project into long-term trust.',
      dutiesTitle: 'What you will do',
      duties: [
        ['Client engagement', 'Be the client’s main point of contact overseas, build trust that lasts, and keep finding the question they will need answered next.'],
        ['Project management', 'Take the work from first conversation through the proposal, the fieldwork and the final delivery, on time and at the standard promised.'],
        ['Working across teams', 'Bring research and technical colleagues together, and hold the rhythm when time zones and priorities pull apart.'],
        ['Insight and proposal', 'Turn the findings into a conclusion a client can act on, and say it clearly in the room.'],
        ['The longer relationship', 'Follow up after delivery and take the renewal conversation seriously — a project is a chance at a relationship.'],
      ],
      requirementsTitle: 'What you will bring',
      requirements: [
        ['Education and experience', 'Bachelor’s degree or above. One to three years (or more) in B2B account management, market research, consulting or a related overseas-facing role.'],
        ['Languages', 'Fluent written and spoken English — meetings, proposals and reports. Fluent Chinese for working with the team.'],
        ['Project management', 'Several projects at once, priorities kept straight, and the details held even when time is short.'],
        ['Analysis and expression', 'Enough structure to turn data into an argument with a conclusion; comfortable with the usual document and spreadsheet tools.'],
        ['Personal qualities', 'Self-directed, calm under pressure, good with people. Willing to carry uncertainty in an early-stage team, and to move forward when there is no clean answer.'],
      ],
    },
  },
};

export default function JobDetail() {
  const { language } = useLanguage();
  const { slug } = useParams();
  const copy = careersCopy[language] || careersCopy['en-US'];
  const t = chrome[language] || chrome['en-US'];
  const role = copy.roles.items.find((item) => item.slug === slug);
  const body = jobContent[slug]?.[language] || jobContent[slug]?.['en-US'];

  usePageTitle(role ? role.name : copy.roles.title);

  return (
    <main className="careers-page job-detail-page">
      <section className="job-hero">
        <img src={skyImage} alt="" decoding="async" />
        <p className="job-hero-line">{t.line}</p>
        <Link className="job-back" to={withLanguage('/careers', language)}>
          <ArrowLeft size={15} strokeWidth={1.7} aria-hidden="true" />
          {t.back}
        </Link>
      </section>

      <section className="job-head">
        <div className="careers-container">
          <div className="job-column">
            <div className="job-head-row">
              <div>
                <h1 className="job-title">{role ? role.name : copy.roles.title}</h1>
                {role && (
                  <p className="job-meta">
                    <MapPin size={16} strokeWidth={1.7} aria-hidden="true" />
                    {role.meta}
                  </p>
                )}
              </div>
              {role && (
                <a className="job-apply" href={`mailto:careers@guanyi-media.com?subject=${encodeURIComponent(role.name)}`}>
                  {t.apply}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {body && (
        <section className="job-body">
          <div className="careers-container">
            <div className="job-column">
              <p className="job-intro">{generalIntro[language] || generalIntro['en-US']}</p>

              <section className="job-block">
                <h2>{body.missionTitle}</h2>
                <p>{body.mission}</p>
              </section>

              <section className="job-block">
                <h2>{body.dutiesTitle}</h2>
                <ol className="job-list">
                  {body.duties.map(([title, text]) => (
                    <li key={title}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="job-block">
                <h2>{body.requirementsTitle}</h2>
                <ol className="job-list">
                  {body.requirements.map(([title, text]) => (
                    <li key={title}>
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </li>
                  ))}
                </ol>
              </section>
            </div>
          </div>
        </section>
      )}

      <HomeFooter />
    </main>
  );
}
