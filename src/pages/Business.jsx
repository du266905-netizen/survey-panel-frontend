import { ArrowRight, ClipboardList, UsersRound } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { isBusinessRole } from '../utils/roles';
import researchJourney from '../assets/business/research-journey.jpg';
import './Business.css';

const businessCopy = {
  'en-US': {
    eyebrow: 'RESEARCH FOR TEAMS', title: 'Turn a decision into research.', lede: 'Tell us what you need to understand. We help shape the questionnaire, research plan, and next practical step.', contact: 'Contact sales', signIn: 'Client sign in', imageAlt: 'A journey beginning along an open road', imageKicker: 'YOUR RESEARCH', imageTitle: 'A clear brief is where good research begins.',
    help: 'HOW WE CAN HELP', services: [['Questionnaire design', 'Bring the decision and the people who matter. We prepare a focused questionnaire for the project.', 'Discuss a questionnaire'], ['Custom research', 'Plan a study with the right format, participant approach, timing, and agreed research deliverables.', 'Contact sales'], ['One project workspace', 'Keep your briefs, confirmed proposals, progress, and next steps together after you become a client.', 'Client sign in']],
  },
  'zh-CN': {
    eyebrow: '面向团队的研究', title: '把一个决策，变成一项研究。', lede: '告诉我们你希望了解什么。我们会协助梳理问卷、研究计划和下一步可执行的方案。', contact: '联系销售团队', signIn: '客户登录', imageAlt: '一段从开放道路开始的旅程', imageKicker: '你的研究', imageTitle: '清晰的需求，是好研究的起点。',
    help: '我们如何协助', services: [['问卷设计', '带来你的决策和重要的人群。我们为项目准备聚焦的问卷。', '讨论一份问卷'], ['定制研究', '规划合适形式、参与者方式、时间安排和已确认交付物的研究。', '联系销售团队'], ['统一项目工作区', '成为客户后，将需求、确认的方案、进度和下一步集中在一个工作区。', '客户登录']],
  },
  'zh-Hant': {
    eyebrow: '面向團隊的研究', title: '把一個決策，變成一項研究。', lede: '告訴我們你希望了解什麼。我們會協助梳理問卷、研究計畫和下一步可執行的方案。', contact: '聯絡銷售團隊', signIn: '客戶登入', imageAlt: '一段從開放道路開始的旅程', imageKicker: '你的研究', imageTitle: '清晰的需求，是好研究的起點。',
    help: '我們如何協助', services: [['問卷設計', '帶來你的決策和重要的人群。我們為專案準備聚焦的問卷。', '討論一份問卷'], ['客製研究', '規劃合適形式、參與者方式、時間安排和已確認交付物的研究。', '聯絡銷售團隊'], ['統一專案工作區', '成為客戶後，將需求、確認的方案、進度和下一步集中在一個工作區。', '客戶登入']],
  },
};

function businessFallbackCopy(home) {
  const footer = home.footer;
  return {
    eyebrow: footer.organisations,
    title: home.nodes.business[0],
    lede: home.nodes.business[1],
    contact: footer.contact,
    signIn: footer.wallet,
    imageAlt: home.nodes.business[1],
    imageKicker: footer.organisations,
    imageTitle: home.evidenceStatement,
    help: footer.explore,
    services: [
      [footer.questionnaires, home.nodes.business[1], footer.contact],
      [footer.studies, home.globalBody, footer.contact],
      [footer.wallet, home.rewardsBody, footer.wallet],
    ],
  };
}

export default function Business() {
  const { user } = useAuth();
  const { language, publicCopy } = useLanguage();
  const copy = businessCopy[language] || businessFallbackCopy(publicCopy.home);
  if (isBusinessRole(user?.role)) return <Navigate to="/business/workspace" replace />;

  return (
    <main className="business-public-page">
      <PublicSiteHeader />
      <section className="business-hero">
        <div className="business-container business-hero-layout">
          <div>
            <p className="business-eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="business-lede">{copy.lede}</p>
            <div className="business-hero-actions">
              <Link className="business-button" to={withLanguage('/business/access', language)}>{copy.contact} <ArrowRight size={17} /></Link>
              <Link className="business-text-link" to={withLanguage('/business/login', language)}>{copy.signIn}</Link>
            </div>
          </div>
          <div className="business-hero-visual">
            <img src={researchJourney} alt={copy.imageAlt} decoding="async" />
            <div className="business-hero-visual-copy"><p>{copy.imageKicker}</p><strong>{copy.imageTitle}</strong></div>
          </div>
        </div>
      </section>
      <section className="business-section business-section--soft">
        <div className="business-container">
          <p className="business-eyebrow">{copy.help}</p>
          <div className="business-service-grid">
            {copy.services.map(([title, body, action], index) => {
              const Icon = [ClipboardList, UsersRound, ArrowRight][index];
              const destination = index === 2 ? '/business/login' : '/business/access';
              return <article key={title}><Icon size={24} /><h3>{title}</h3><p>{body}</p><Link className="business-text-link" to={withLanguage(destination, language)}>{action} <ArrowRight size={15} /></Link></article>;
            })}
          </div>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
