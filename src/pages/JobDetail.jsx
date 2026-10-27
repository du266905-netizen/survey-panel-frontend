import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin } from 'lucide-react';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import { careersCopy } from './Careers';
import skyImage from '../assets/careers/sky.jpg';
import './JobDetail.css';

/* Job detail — template, 2026-10-28.

   Structure follows the owner's reference: a photograph band with one line on
   it, then back link, role name, location and the apply action. The body — the
   description itself — has no copy yet, so it is not rendered; the slot is
   noted in the code where it goes. */

const chrome = {
  'zh-CN': {
    line: '平等、包容、开放创新的高效性组织',
    back: '返回职位列表',
    apply: '申请该职位',
  },
  'zh-Hant': {
    line: '平等、包容、開放創新的高效性組織',
    back: '返回職位列表',
    apply: '申請該職位',
  },
  'en-US': {
    line: 'An equal, inclusive, and innovative high-performing organization.',
    back: 'Back to jobs',
    apply: 'Apply for this role',
  },
  'en-GB': {
    line: 'An equal, inclusive, and innovative high-performing organization.',
    back: 'Back to jobs',
    apply: 'Apply for this role',
  },
};


/* Per-role body copy. Only the account manager exists; the shape is the same for
   every role: a mission paragraph, then duties and requirements as lists. */
const jobContent = {
  'account-manager': {
    'zh-CN': {
      missionTitle: '团队使命',
      mission: '你是我们与客户之间的核心枢纽，也是决定客户体验的关键角色。在这里，你不只是执行者，更是客户的战略伙伴。你深入理解他们的痛点，调动内部资源，确保高质量交付。我们期待你用极高的共情力与专业度，把一次性的合作转化为长期的信任。',
      dutiesTitle: '岗位职责',
      duties: [
        ['客户对接与关系维护（Client Engagement）', '作为海外客户的核心接口人，通过高质量的服务建立长期信任，深入了解并挖掘客户的调研需求。'],
        ['项目全流程管理（Project Management）', '统筹调研项目，包括需求沟通、方案撰写（Proposal）、项目执行跟进、数据回收及最终交付，确保项目按时按质完成。'],
        ['跨团队/跨时区协作（Cross-functional Coordination）', '协调内部（技术/研究团队）与外部（海外供应商网络），解决项目执行中的突发问题。'],
        ['商业洞察与提案（Insight & Proposal）', '协助将调研数据转化为有价值的商业洞察，并能向客户进行清晰的汇报（Storytelling）。'],
      ],
      requirementsTitle: '岗位要求',
      requirements: [
        ['学历与经验', '本科及以上学历。具备 1–3 年（或 3 年以上）B2B 客户管理、市场调研、咨询或相关海外业务经验。'],
        ['语言能力', '熟练掌握英语（书面及口语），能够无障碍地与海外客户进行全英文邮件沟通及线上会议，撰写纯英文提案及报告。'],
        ['专业技能', '具备良好的项目管理能力、逻辑分析能力；熟悉市场调研基本流程者优先（但如果有极强的项目管理能力，我们也愿意培养）。'],
        ['综合素质', '具备极强的自我驱动力、抗压能力和沟通共情力。愿意在早期出海团队中接受挑战，具备解决复杂问题的灵活度。'],
      ],
    },
    'zh-Hant': {
      missionTitle: '團隊使命',
      mission: '你是我們與客戶之間的核心樞紐，也是決定客戶體驗的關鍵角色。在這裡，你不只是執行者，更是客戶的策略夥伴。你深入理解他們的痛點，調動內部資源，確保高品質交付。我們期待你用極高的同理心與專業度，把一次性的合作轉化為長期的信任。',
      dutiesTitle: '崗位職責',
      duties: [
        ['客戶對接與關係維護（Client Engagement）', '作為海外客戶的核心接口人，透過高品質的服務建立長期信任，深入了解並挖掘客戶的調研需求。'],
        ['專案全流程管理（Project Management）', '統籌調研專案，包括需求溝通、方案撰寫（Proposal）、專案執行跟進、資料回收及最終交付，確保專案按時按質完成。'],
        ['跨團隊／跨時區協作（Cross-functional Coordination）', '協調內部（技術／研究團隊）與外部（海外供應商網絡），解決專案執行中的突發問題。'],
        ['商業洞察與提案（Insight & Proposal）', '協助將調研資料轉化為有價值的商業洞察，並能向客戶進行清晰的匯報（Storytelling）。'],
      ],
      requirementsTitle: '崗位要求',
      requirements: [
        ['學歷與經驗', '本科及以上學歷。具備 1–3 年（或 3 年以上）B2B 客戶管理、市場調研、顧問或相關海外業務經驗。'],
        ['語言能力', '熟練掌握英語（書面及口語），能夠無障礙地與海外客戶進行全英文郵件溝通及線上會議，撰寫純英文提案及報告。'],
        ['專業技能', '具備良好的專案管理能力、邏輯分析能力；熟悉市場調研基本流程者優先（但如果有極強的專案管理能力，我們也願意培養）。'],
        ['綜合素質', '具備極強的自我驅動力、抗壓能力和溝通同理心。願意在早期出海團隊中接受挑戰，具備解決複雜問題的靈活度。'],
      ],
    },
    'en-US': {
      missionTitle: 'The mission',
      mission: 'You are the hinge between us and the client, and the role that decides what the relationship feels like. Here you are not an executor; you are the client’s strategic partner. You learn where it hurts, bring the right people in, and make sure the work lands at the level promised. We are looking for the empathy and the discipline that turn a single project into long-term trust.',
      dutiesTitle: 'What you will do',
      duties: [
        ['Client engagement', 'Own the day-to-day relationship with overseas clients: be the person they call, build trust through the quality of the work, and find the research need behind the brief.'],
        ['Project management', 'Run the study end to end — scoping, proposal, fieldwork follow-up, data collection, final delivery — on time and at the standard promised.'],
        ['Cross-functional coordination', 'Work across internal teams (technology, research) and external suppliers overseas, and solve what goes wrong mid-project.'],
        ['Insight and proposal', 'Help turn data into an argument a client can act on, and present it clearly.'],
      ],
      requirementsTitle: 'What you will bring',
      requirements: [
        ['Education and experience', 'Bachelor’s degree or above. One to three years (or more) in B2B account management, market research, consulting or a related overseas-facing role.'],
        ['Languages', 'Fluent written and spoken English: email threads and calls with overseas clients, proposals and reports written in English.'],
        ['Professional skills', 'Project management and structured analysis. Familiarity with the research process is a plus; strong project management can be taught the research side.'],
        ['Personal qualities', 'Self-directed, calm under pressure, good with people. Comfortable in an early-stage team going overseas, and flexible when a problem has no clean answer.'],
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
  const lang = jobContent[slug]?.[language] ? language : 'en-US';
  const body = jobContent[slug]?.[lang];

  usePageTitle(role ? role.name : copy.roles.title);

  return (
    <main className="careers-page job-detail-page">
      <PublicSiteHeader />

      <section className="job-hero">
        <img src={skyImage} alt="" decoding="async" />
        <p className="job-hero-line">{t.line}</p>
      </section>

      <section className="job-head">
        <div className="careers-container">
          <Link className="job-back" to={withLanguage('/careers', language)}>
            <ArrowLeft size={15} strokeWidth={1.7} aria-hidden="true" />
            {t.back}
          </Link>

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
      </section>

      {body && (
        <section className="job-body">
          <div className="careers-container">
            <div className="job-body-inner">
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
