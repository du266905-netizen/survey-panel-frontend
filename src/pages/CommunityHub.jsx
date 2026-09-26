import { useCallback, useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import communityCrossMarketOffice from '../assets/community/community-cross-market-office.jpg';
import communityResearchCollage from '../assets/community/community-research-collage.png';

const rotationDelay = 9000;

const communityCopy = {
  en: {
    research: {
      eyebrow: 'Research for market-entry teams',
      title: 'Know what needs to change before launch.',
      description: 'When a new-market decision carries real cost, assumptions about demand, language and channels are not enough. We design focused local studies around the questions that determine whether your offer is ready.',
      supporting: 'GuanyiSearch gives product, growth and market-entry teams a clear route from a live decision to usable local evidence.',
      clientProblemsLabel: 'Questions GuanyiSearch helps clients resolve',
      clientProblemsTitle: 'What we help you resolve',
      clientProblems: [
        { title: 'Demand and proposition fit', description: 'Which customer need matters most, and what would make the offer more relevant locally?' },
        { title: 'Message and channel fit', description: 'Which language, creative and route to market will make sense to the people you need to reach?' },
        { title: 'A decision you can act on', description: 'What should be adapted, tested next or held back before more budget is committed?' },
      ],
      action: 'Discuss your market question',
    },
    network: {
      eyebrow: 'Local research, built around a real decision',
      title: 'Make the next market move with local evidence.',
      description: 'GuanyiSearch brings together local participants, research design and hands-on project support so teams can turn a market question into a focused study—not a generic data exercise.',
      action: 'Discuss a market question',
      detail: {
        eyebrow: 'For market entry and growth',
        title: 'What will make this offer work here?',
        description: 'Assess demand, message and channel realities before committing launch spend. We help define what to test, who to hear from and how the result informs the next move.',
        points: ['People selected for the decision at hand', 'Local context across message and channels', 'A focused route from brief to readout'],
      },
    },
    controls: { label: 'Platform feature controls', previous: 'Show the previous platform feature', next: 'Show the next platform feature' },
  },
  'zh-CN': {
    research: {
      eyebrow: '面向市场进入团队的研究',
      title: '在上线前，明确什么需要改变。',
      description: '当进入新市场意味着真实成本时，仅凭对需求、语言和渠道的假设并不够。我们围绕决定产品是否准备就绪的关键问题，设计聚焦的本地研究。',
      supporting: 'GuanyiSearch 帮助产品、增长和市场进入团队，将当下的商业决策转化为可直接使用的本地证据。',
      clientProblemsLabel: 'GuanyiSearch 帮助客户厘清的问题',
      clientProblemsTitle: '我们帮助你厘清的问题',
      clientProblems: [
        { title: '需求与价值主张是否匹配', description: '哪一种客户需求最重要？怎样让产品在当地更具相关性？' },
        { title: '信息与渠道是否匹配', description: '什么样的语言、创意与市场路径，才能真正触达目标人群？' },
        { title: '可执行的下一步', description: '在投入更多预算之前，哪些需要调整、继续测试，或暂缓推进？' },
      ],
      action: '讨论你的市场问题',
    },
    network: {
      eyebrow: '围绕真实决策构建的本地研究',
      title: '用本地证据，做出下一步市场决策。',
      description: 'GuanyiSearch 汇集本地参与者、研究设计与项目支持，帮助团队把市场问题转化为聚焦的研究项目，而不是泛泛的数据收集。',
      action: '讨论一个市场问题',
      detail: {
        eyebrow: '面向市场进入与增长团队',
        title: '怎样才能让这个产品在这里真正成立？',
        description: '在投入上市预算前，评估需求、传播信息与渠道的真实情况。我们协助明确该测试什么、该听谁的意见，以及研究结果如何指导下一步。',
        points: ['为当前决策匹配合适的人群', '理解信息与渠道背后的本地语境', '从需求梳理到结果回收的聚焦研究路径'],
      },
    },
    controls: { label: '平台功能轮播控制', previous: '显示上一项平台功能', next: '显示下一项平台功能' },
  },
  'zh-Hant': {
    research: {
      eyebrow: '面向市場進入團隊的研究',
      title: '在上線前，釐清什麼需要改變。',
      description: '當進入新市場意味著真實成本時，僅憑對需求、語言和渠道的假設並不夠。我們圍繞決定產品是否準備就緒的關鍵問題，設計聚焦的本地研究。',
      supporting: 'GuanyiSearch 協助產品、成長和市場進入團隊，將當下的商業決策轉化為可直接使用的本地證據。',
      clientProblemsLabel: 'GuanyiSearch 協助客戶釐清的問題',
      clientProblemsTitle: '我們協助你釐清的問題',
      clientProblems: [
        { title: '需求與價值主張是否匹配', description: '哪一種客戶需求最重要？怎樣讓產品在當地更具相關性？' },
        { title: '訊息與渠道是否匹配', description: '什麼樣的語言、創意與市場路徑，才能真正觸達目標人群？' },
        { title: '可執行的下一步', description: '在投入更多預算之前，哪些需要調整、繼續測試，或暫緩推進？' },
      ],
      action: '討論你的市場問題',
    },
    network: {
      eyebrow: '圍繞真實決策構建的本地研究',
      title: '用本地證據，做出下一步市場決策。',
      description: 'GuanyiSearch 匯集本地參與者、研究設計與專案支援，協助團隊把市場問題轉化為聚焦的研究專案，而不是泛泛的資料收集。',
      action: '討論一個市場問題',
      detail: {
        eyebrow: '面向市場進入與成長團隊',
        title: '怎樣才能讓這個產品在這裡真正成立？',
        description: '在投入上市預算前，評估需求、傳播訊息與渠道的真實情況。我們協助明確該測試什麼、該聽誰的意見，以及研究結果如何指引下一步。',
        points: ['為當前決策匹配合適的人群', '理解訊息與渠道背後的本地語境', '從需求梳理到結果回收的聚焦研究路徑'],
      },
    },
    controls: { label: '平台功能輪播控制', previous: '顯示上一項平台功能', next: '顯示下一項平台功能' },
  },
};

function createPlatformFeatures(copy) {
  return [
    {
      id: 'research-routes',
      ...copy.research,
      image: communityResearchCollage,
      variant: 'research',
      action: { type: 'link', label: copy.research.action, to: '/business' },
    },
    {
      id: 'cross-market-network',
      ...copy.network,
      image: communityCrossMarketOffice,
      action: { type: 'anchor', label: copy.network.action, to: '#atlas-contact' },
    },
  ];
}

function FeatureAction({ action, language }) {
  if (action.type === 'anchor') {
    return <a className="community-hub-primary-action" href={action.to}>{action.label}<ArrowUpRight size={19} strokeWidth={1.8} /></a>;
  }

  return <Link className="community-hub-primary-action" to={withLanguage(action.to, language)}>{action.label}<ArrowUpRight size={19} strokeWidth={1.8} /></Link>;
}

export default function CommunityHub() {
  const { language } = useLanguage();
  const copy = communityCopy[language] || communityCopy.en;
  const platformFeatures = createPlatformFeatures(copy);
  const [activeAreaIndex, setActiveAreaIndex] = useState(0);
  const selectedArea = platformFeatures[activeAreaIndex];

  const selectArea = useCallback((index) => {
    setActiveAreaIndex((index + platformFeatures.length) % platformFeatures.length);
  }, []);

  const goPrevious = useCallback(() => selectArea(activeAreaIndex - 1), [activeAreaIndex, selectArea]);
  const goNext = useCallback(() => selectArea(activeAreaIndex + 1), [activeAreaIndex, selectArea]);

  useEffect(() => {
    const rotation = window.setTimeout(goNext, rotationDelay);
    return () => window.clearTimeout(rotation);
  }, [activeAreaIndex, goNext]);

  return (
    <section className="community-hub" aria-labelledby="community-hub-title">
      <div className={`community-hub-stage${selectedArea.variant ? ` community-hub-stage--${selectedArea.variant}` : ''}`}>
        {selectedArea.variant !== 'research' && (
          <div className="community-hub-stage-media" aria-hidden="true">
            <img className="community-hub-stage-image is-active" src={selectedArea.image} alt="" loading="eager" decoding="async" />
          </div>
        )}
        <div className="community-hub-stage-wash" aria-hidden="true" />
        <div className="community-hub-corners" aria-hidden="true" />

        <header className="community-hub-intro">
          <p>{selectedArea.eyebrow}</p>
          <h1 id="community-hub-title">{selectedArea.title}</h1>
          <span>{selectedArea.description}</span>
          {selectedArea.supporting && <strong className="community-hub-supporting-copy">{selectedArea.supporting}</strong>}
          {selectedArea.clientProblems && (
            <div className="community-hub-client-problems" aria-label={selectedArea.clientProblemsLabel}>
              <p>{selectedArea.clientProblemsTitle}</p>
              <ul>
                {selectedArea.clientProblems.map((problem) => (
                  <li key={problem.title}>
                    <CheckCircle2 size={15} strokeWidth={1.9} aria-hidden="true" />
                    <span><strong>{problem.title}</strong>{problem.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <FeatureAction action={selectedArea.action} language={language} />
        </header>

        {selectedArea.variant === 'research' ? (
          <div className="community-hub-research-visual" aria-hidden="true">
            <div className="community-hub-research-photo-frame">
              <img src={selectedArea.image} alt="" decoding="async" />
            </div>
          </div>
        ) : (
          <aside className="community-hub-detail" aria-live="polite">
            <p>{selectedArea.detail.eyebrow}</p>
            <h2>{selectedArea.detail.title}</h2>
            <span>{selectedArea.detail.description}</span>
            <ul>
              {selectedArea.detail.points.map((point) => <li key={point}><MapPin size={13} strokeWidth={1.8} />{point}</li>)}
            </ul>
          </aside>
        )}

        <div className="community-hub-controls" aria-label={copy.controls.label}>
          <button type="button" onClick={goPrevious} aria-label={copy.controls.previous}>
            <ArrowLeft size={17} strokeWidth={1.8} />
          </button>
          <button type="button" onClick={goNext} aria-label={copy.controls.next}>
            <ArrowRight size={17} strokeWidth={1.8} />
          </button>
        </div>

      </div>
    </section>
  );
}
