import { ArrowRight, BriefcaseBusiness, CircleUserRound, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import './Business.css';

const joinCopy = {
  'en-US': {
    title: 'Make your next insight count.',
    lede: 'Share your perspective in studies that suit you, or bring us a question worth answering.',
    participantLabel: 'FOR INDIVIDUALS', participantTitle: 'Join as a participant', participantBody: 'Discover real opportunities, decide what feels right for you, and earn clear rewards for your time.',
    participantPoints: ['Browse suitable opportunities', 'See time, requirements, and reward first', 'Keep your information private'], participantAction: 'Join as a participant',
    organisationLabel: 'FOR ORGANIZATIONS & RESEARCHERS', organisationTitle: 'Run research with us', organisationBody: 'Start with a concise enquiry for a custom questionnaire or a tailored study, built around the decision your team needs to make.',
    organisationPoints: ['Custom questionnaires, interviews, and usability sessions', 'Research shaped around your decision and audience', 'One workspace for project planning and progress'], organisationAction: 'Run research with us',
    note: 'Participant information is never presented as a product.',
  },
  'zh-CN': {
    title: '让下一次洞察更有意义。',
    lede: '参与适合你的研究，分享你的观点；也可以把值得回答的问题带给我们。',
    participantLabel: '面向个人', participantTitle: '以参与者身份加入', participantBody: '发现真实机会，按自己的意愿做出选择，并为投入的时间获得清晰回馈。',
    participantPoints: ['浏览适合你的研究机会', '先了解时长、要求和奖励', '保护你的个人信息'], participantAction: '以参与者身份加入',
    organisationLabel: '面向组织与研究者', organisationTitle: '与我们一起开展研究', organisationBody: '从一份简明需求开始，为团队需要做出的决策量身设计问卷或研究项目。',
    organisationPoints: ['定制问卷、访谈与可用性研究', '围绕你的决策与受众开展研究', '在同一工作区规划项目并跟进进度'], organisationAction: '与我们一起开展研究',
    note: '参与者信息绝不会被当作产品出售或呈现。',
  },
  'zh-Hant': {
    title: '讓下一次洞察更有意義。',
    lede: '參與適合你的研究，分享你的觀點；也可以把值得回答的問題帶給我們。',
    participantLabel: '面向個人', participantTitle: '以參與者身分加入', participantBody: '發現真實機會，依自己的意願做出選擇，並為投入的時間獲得清晰回饋。',
    participantPoints: ['瀏覽適合你的研究機會', '先了解時長、要求和獎勵', '保護你的個人資料'], participantAction: '以參與者身分加入',
    organisationLabel: '面向組織與研究者', organisationTitle: '與我們一起開展研究', organisationBody: '從一份簡明需求開始，為團隊需要做出的決策量身設計問卷或研究專案。',
    organisationPoints: ['客製問卷、訪談與可用性研究', '圍繞你的決策與受眾開展研究', '在同一工作區規劃專案並追蹤進度'], organisationAction: '與我們一起開展研究',
    note: '參與者資料絕不會被當作產品出售或呈現。',
  },
};

export default function JoinChoice() {
  const { language } = useLanguage();
  const copy = joinCopy[language] || joinCopy['en-US'];

  return (
    <main className="business-public-page join-choice-page">
      <PublicSiteHeader />
      <section className="join-choice-hero">
        <div className="business-container">
          <h1>{copy.title}</h1>
          <p className="business-lede">{copy.lede}</p>
          <div className="join-choice-grid">
            <article className="join-choice-card join-choice-card--participant">
              <span className="join-choice-icon"><CircleUserRound size={26} strokeWidth={1.6} /></span>
              <p>{copy.participantLabel}</p>
              <h2>{copy.participantTitle}</h2>
              <p>{copy.participantBody}</p>
              <ul>{copy.participantPoints.map((point) => <li key={point}>{point}</li>)}</ul>
              <Link to={withLanguage('/register', language)} className="business-button business-button--dark">{copy.participantAction} <ArrowRight size={17} /></Link>
            </article>
            <article className="join-choice-card join-choice-card--business">
              <span className="join-choice-icon"><BriefcaseBusiness size={26} strokeWidth={1.6} /></span>
              <p>{copy.organisationLabel}</p>
              <h2>{copy.organisationTitle}</h2>
              <p>{copy.organisationBody}</p>
              <ul>{copy.organisationPoints.map((point) => <li key={point}>{point}</li>)}</ul>
              <Link to={withLanguage('/business', language)} className="business-button">{copy.organisationAction} <ArrowRight size={17} /></Link>
            </article>
          </div>
          <p className="join-choice-note"><ShieldCheck size={16} /> {copy.note}</p>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
