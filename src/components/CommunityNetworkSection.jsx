/* 办公室那一段（原首页轮播的第二个画面）单独抽成组件，供其它落地页复用。
   自带深绿面板与白卡，放进任何页面都不会依赖首页的版面；目前未在任何路由挂载，
   用户后续决定放置位置。 */
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import officeImage from '../assets/community/community-cross-market-office-web.jpg';
import './CommunityNetworkSection.css';

const copy = {
  en: {
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
  'zh-CN': {
    eyebrow: '围绕真实决策构建的本地研究',
    title: '用本地证据，做出下一步市场决策。',
    description: 'GuanyiSearch 汇集本地参与者、研究设计与项目支持，帮助团队把市场问题转化为聚焦的研究项目，而不是泛泛的数据收集。',
    action: '讨论一个市场问题',
    detail: {
      eyebrow: '面向市场进入与增长',
      title: '怎样让这个产品在这里成立？',
      description: '在投入上市预算之前，先评估需求、信息与渠道的现实情况。我们帮助界定要验证什么、该听谁、以及结果如何影响下一步。',
      points: ['按当前决策筛选的人群', '覆盖信息与渠道的本地语境', '从简报到结论的聚焦路径'],
    },
  },
  'zh-Hant': {
    eyebrow: '圍繞真實決策建構的本地研究',
    title: '用本地證據，做出下一步市場決策。',
    description: 'GuanyiSearch 匯集本地參與者、研究設計與專案支持，幫助團隊把市場問題轉化為聚焦的研究專案，而不是泛泛的資料收集。',
    action: '討論一個市場問題',
    detail: {
      eyebrow: '面向市場進入與成長',
      title: '怎樣讓這個產品在這裡成立？',
      description: '在投入上市預算之前，先評估需求、訊息與渠道的現實情況。我們幫助界定要驗證什麼、該聽誰、以及結果如何影響下一步。',
      points: ['按當前決策篩選的人群', '覆蓋訊息與渠道的本地語境', '從簡報到結論的聚焦路徑'],
    },
  },
};

export default function CommunityNetworkSection({ className = '' }) {
  const { language } = useLanguage();
  const text = copy[language] || copy.en;
  return (
    <section className={`community-network ${className}`.trim()} aria-labelledby="community-network-title">
      <div className="community-network-panel">
        <figure className="community-network-media">
          <img src={officeImage} alt="" loading="lazy" decoding="async" />
        </figure>
        <div className="community-network-copy">
          <p className="community-network-eyebrow">{text.eyebrow}</p>
          <h2 id="community-network-title">{text.title}</h2>
          <p className="community-network-description">{text.description}</p>
          <div className="community-network-detail">
            <p>{text.detail.eyebrow}</p>
            <h3>{text.detail.title}</h3>
            <span>{text.detail.description}</span>
            <ul>{text.detail.points.map((point) => <li key={point}><MapPin size={13} strokeWidth={1.8} aria-hidden="true" />{point}</li>)}</ul>
          </div>
          <Link className="community-network-action" to={withLanguage('#atlas-contact', language)}>{text.action}<ArrowUpRight size={18} strokeWidth={1.8} /></Link>
        </div>
      </div>
    </section>
  );
}
