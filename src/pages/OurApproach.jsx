import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HumanManifesto } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import guanyiBrandMarkLight from '../assets/home/guanyi-brand-mark-light.png';
import './OurApproach.css';

const approachCopy = {
  en: {
    question: {
      label: 'The question behind every questionnaire',
      title: 'What makes a survey worth answering—and worth acting on?',
      intro: 'More questions do not automatically create better insight. A useful study starts with a decision, reaches people with relevant context, and gives every participant a clear reason to take part.',
      principles: [
        { title: 'A decision before a questionnaire', body: 'Start with the choice a team needs to make, then design only the questions that can move it forward.' },
        { title: 'Relevant people, in local context', body: 'Match participation to the audience, market and lived experience the research needs to understand.' },
        { title: 'Respectful participation, usable responses', body: 'Make the experience clear and considerate so people can give the thoughtful responses a decision deserves.' },
      ],
      conclusion: 'We design the question, the audience and the participant experience together—so a study is built for action, not just collection.',
    },
    network: {
      label: 'How we connect local research',
      title: 'Built in China. Connected across markets.',
      intro: 'GuanyiSearch combines a dedicated market-research team with a growing collaboration network, helping organisations turn local questions into well-scoped research.',
      body: 'Our China community and survey network give studies a local foundation. We work with research partners across Greater China, Asia-Pacific, the Middle East, Europe and North America, developing coverage around each study’s needs.',
      points: [
        { title: 'Research expertise', body: 'Practical design and project support shaped around the decision at hand.' },
        { title: 'China community and survey network', body: 'Local participation and context for questions that need a China-based view.' },
        { title: 'Cross-market collaboration', body: 'Partner-led local coverage across key regions, extended according to study needs.' },
      ],
      action: 'Discuss a research need',
    },
  },
  'zh-CN': {
    question: {
      label: '每一份问卷背后，都有一个更重要的问题',
      title: '什么让一项调研既值得回答，也值得用于决策？',
      intro: '问题更多，并不等于洞察更好。一项真正可用的研究，要从明确的决策出发，触达与问题相关的人群，并让每位参与者清楚知道自己为何参与。',
      principles: [
        { title: '先明确决策，再设计问卷', body: '从团队真正需要做出的选择开始，只设计能够推动下一步的问题。' },
        { title: '匹配人群，也理解本地语境', body: '让参与者与研究所需理解的受众、市场和真实生活经验真正相关。' },
        { title: '尊重参与，获得可用回应', body: '以清晰、审慎的体验帮助参与者认真表达，也让结果经得起正确解读。' },
      ],
      conclusion: '我们把研究问题、目标人群与参与体验一起设计，让研究为行动服务，而不只是收集数据。',
    },
    network: {
      label: '我们如何连接本地研究',
      title: '立足中国，连接多元市场。',
      intro: 'GuanyiSearch 将专注市场研究的团队与持续发展的协作网络结合，帮助组织把本地市场问题转化为范围清晰的研究项目。',
      body: '中国的社区与调研网络构成研究的本地基础。我们与大中华区、亚太、中东、欧洲及北美的研究伙伴开展协作，并根据每项研究的实际需求发展相应覆盖。',
      points: [
        { title: '研究专业能力', body: '围绕当前决策，提供务实的研究设计与项目支持。' },
        { title: '中国社区与调研网络', body: '为需要中国本地视角的问题提供参与者与本地语境。' },
        { title: '跨市场协作', body: '通过关键区域的本地伙伴协作，并按研究需求扩展覆盖。' },
      ],
      action: '讨论研究需求',
    },
  },
  'zh-Hant': {
    question: {
      label: '每一份問卷背後，都有一個更重要的問題',
      title: '什麼讓一項調研既值得回答，也值得用於決策？',
      intro: '問題更多，並不等於洞察更好。一項真正可用的研究，要從明確的決策出發，觸達與問題相關的人群，並讓每位參與者清楚知道自己為何參與。',
      principles: [
        { title: '先明確決策，再設計問卷', body: '從團隊真正需要做出的選擇開始，只設計能夠推動下一步的問題。' },
        { title: '匹配人群，也理解在地語境', body: '讓參與者與研究所需理解的受眾、市場和真實生活經驗真正相關。' },
        { title: '尊重參與，獲得可用回應', body: '以清晰、審慎的體驗幫助參與者認真表達，也讓結果經得起正確解讀。' },
      ],
      conclusion: '我們把研究問題、目標人群與參與體驗一起設計，讓研究為行動服務，而不只是收集資料。',
    },
    network: {
      label: '我們如何連接在地研究',
      title: '立足中國，連接多元市場。',
      intro: 'GuanyiSearch 將專注市場研究的團隊與持續發展的協作網絡結合，協助組織把本地市場問題轉化為範圍清晰的研究專案。',
      body: '中國的社群與調研網絡構成研究的本地基礎。我們與大中華區、亞太、中東、歐洲及北美的研究夥伴開展協作，並根據每項研究的實際需求發展相應覆蓋。',
      points: [
        { title: '研究專業能力', body: '圍繞當前決策，提供務實的研究設計與專案支援。' },
        { title: '中國社群與調研網絡', body: '為需要中國本地視角的問題提供參與者與本地語境。' },
        { title: '跨市場協作', body: '透過關鍵區域的本地夥伴協作，並按研究需求擴展覆蓋。' },
      ],
      action: '討論研究需求',
    },
  },
};

function ResearchQuestion({ copy }) {
  return <section className="approach-question" aria-labelledby="approach-question-title"><div className="approach-container"><header className="approach-question-heading"><p>{copy.label}</p><h1 id="approach-question-title">{copy.title}</h1><span>{copy.intro}</span></header><div className="approach-question-principles">{copy.principles.map((principle, index) => <article key={principle.title}><b>{String(index + 1).padStart(2, '0')}</b><div><h2>{principle.title}</h2><p>{principle.body}</p></div></article>)}</div><p className="approach-question-conclusion"><CheckCircle2 size={19} aria-hidden="true" />{copy.conclusion}</p></div></section>;
}

function ResearchNetwork({ copy, language }) {
  return <section className="approach-network" aria-labelledby="approach-network-title"><div className="approach-container approach-network-layout"><div className="approach-network-mark" aria-hidden="true"><img src={guanyiBrandMarkLight} alt="" decoding="async" /></div><div className="approach-network-copy"><p>{copy.label}</p><h2 id="approach-network-title">{copy.title}</h2><strong>{copy.intro}</strong><span>{copy.body}</span><ul>{copy.points.map((point) => <li key={point.title}><CheckCircle2 size={16} aria-hidden="true" /><div><b>{point.title}</b><small>{point.body}</small></div></li>)}</ul><Link to={withLanguage('/business', language)}>{copy.action}<ArrowUpRight size={18} strokeWidth={1.8} /></Link></div></div></section>;
}

export default function OurApproach() {
  const { language } = useLanguage();
  const copy = approachCopy[language] || approachCopy.en;
  return <main className="home-continuation approach-page"><ResearchQuestion copy={copy.question} /><ResearchNetwork copy={copy.network} language={language} /><HumanManifesto headingLevel="h2" /></main>;
}
