import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HumanManifesto } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import guanyiBrandMarkLight from '../assets/home/guanyi-brand-mark-light.png';
import './OurApproach.css';

const approachCopy = {
  en: {
    question: {
      label: 'A better question comes first',
      title: 'What is a response worth?',
      intro: 'More than a completed form. It is a moment of local experience, offered when the question is clear and the invitation feels worth accepting.',
      body: 'That is why we begin with the decision a team must make, find the people who live closest to it, and make room for a considered answer.',
      conclusion: 'The right question earns the right response.',
    },
    network: {
      label: 'A connected research network',
      title: 'Built in China. Connected across markets.',
      intro: 'GuanyiSearch is led by a dedicated market-research team, working from a quality China community and survey network.',
      body: 'We collaborate with local research partners in Greater China, Asia-Pacific, the Middle East, Europe and North America—and continue to expand relevant partner and participant coverage across major markets as each study requires.',
      conclusion: 'Local context, connected research.',
      action: 'Explore research services',
    },
  },
  'zh-CN': {
    question: {
      label: '好问题，先于一切',
      title: '一份回应，究竟有多重要？',
      intro: '它不只是完成的一张问卷，而是一段真实的本地经验——当问题足够清楚、邀请值得接受时，才会被认真分享。',
      body: '所以我们从团队必须做出的决策开始，找到与之最相关的人群，并为审慎、真实的表达留出空间。',
      conclusion: '好问题，才配得上好回应。',
    },
    network: {
      label: '连接本地与全球的研究网络',
      title: '立足中国，连接多元市场',
      intro: 'GuanyiSearch 由专注市场研究的团队运营，并以优质的中国社区与调研网络为本地基础。',
      body: '我们与大中华区、亚太、中东、欧洲及北美的本地研究伙伴协作；同时根据研究需要，持续在主要市场拓展伙伴与调研参与者覆盖。',
      conclusion: '从本地语境出发，连接更广的研究视野。',
      action: '了解研究服务',
    },
  },
  'zh-Hant': {
    question: {
      label: '好問題，先於一切',
      title: '一份回應，究竟有多重要？',
      intro: '它不只是完成的一張問卷，而是一段真實的在地經驗——當問題足夠清楚、邀請值得接受時，才會被認真分享。',
      body: '所以我們從團隊必須做出的決策開始，找到與之最相關的人群，並為審慎、真實的表達留出空間。',
      conclusion: '好問題，才配得上好回應。',
    },
    network: {
      label: '連接在地與全球的研究網絡',
      title: '立足中國，連接多元市場',
      intro: 'GuanyiSearch 由專注市場研究的團隊營運，並以優質的中國社群與調研網絡為在地基礎。',
      body: '我們與大中華區、亞太、中東、歐洲及北美的在地研究夥伴協作；同時根據研究需要，持續在主要市場拓展夥伴與調研參與者覆蓋。',
      conclusion: '從在地語境出發，連接更廣的研究視野。',
      action: '了解研究服務',
    },
  },
};

function ResearchQuestion({ copy }) {
  return <section className="approach-question" aria-labelledby="approach-question-title"><div className="approach-container"><header className="approach-question-heading"><p>{copy.label}</p><h1 id="approach-question-title">{copy.title}</h1></header><div className="approach-question-dialogue"><p>{copy.intro}</p><span>{copy.body}</span><strong><CheckCircle2 size={19} aria-hidden="true" />{copy.conclusion}</strong></div></div></section>;
}

function ResearchNetwork({ copy, language }) {
  return <section className="approach-network" aria-labelledby="approach-network-title"><div className="approach-container approach-network-layout"><div className="approach-network-mark" aria-hidden="true"><img src={guanyiBrandMarkLight} alt="" decoding="async" /></div><div className="approach-network-copy"><p>{copy.label}</p><h2 id="approach-network-title">{copy.title}</h2><strong>{copy.intro}</strong><span>{copy.body}</span><em>{copy.conclusion}</em><Link to={withLanguage('/business', language)}>{copy.action}<ArrowUpRight size={18} strokeWidth={1.8} /></Link></div></div></section>;
}

export default function OurApproach() {
  const { language } = useLanguage();
  const copy = approachCopy[language] || approachCopy.en;
  return <main className="home-continuation approach-page"><ResearchQuestion copy={copy.question} /><ResearchNetwork copy={copy.network} language={language} /><HumanManifesto headingLevel="h2" /></main>;
}
