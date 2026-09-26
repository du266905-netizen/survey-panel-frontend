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
      label: 'A local question can have a wider view',
      title: 'Where can a local question take you?',
      intro: 'Our market-research team works from a China community and survey network built for local context.',
      body: 'Alongside research partners in Greater China, Asia-Pacific, the Middle East, Europe and North America, we extend coverage around each brief—not through a one-size-fits-all panel, but through the context the decision requires.',
      conclusion: 'One team to frame the question. A connected network to listen closer.',
      action: 'Start with your question',
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
      label: '一个本地问题，也能拥有更广的视野',
      title: '一个本地问题，能带你走多远？',
      intro: '我们的市场研究团队，以中国社区与调研网络为本地起点。',
      body: '我们与大中华区、亚太、中东、欧洲及北美的研究伙伴协作，围绕每一份研究需求拓展相应覆盖——不是千篇一律的样本池，而是决策所需要的真实语境。',
      conclusion: '一个团队定义问题，一张网络让倾听更接近答案。',
      action: '从你的问题开始',
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
      label: '一個在地問題，也能擁有更廣的視野',
      title: '一個在地問題，能帶你走多遠？',
      intro: '我們的市場研究團隊，以中國社群與調研網絡為在地起點。',
      body: '我們與大中華區、亞太、中東、歐洲及北美的研究夥伴協作，圍繞每一份研究需求拓展相應覆蓋——不是千篇一律的樣本池，而是決策所需要的真實語境。',
      conclusion: '一個團隊定義問題，一張網絡讓傾聽更接近答案。',
      action: '從你的問題開始',
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
