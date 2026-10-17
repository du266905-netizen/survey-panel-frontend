import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import peopleImage from '../assets/community/community-research-collage-web.webp';
import videoPoster from '../assets/community/community-video-poster.jpg';

/* 首页的「人物页」：原来是 9 秒一轮的轮播，切换时现拉 8.9MB 的原图，实测会卡；
   而且文案本来就长，一屏放不下。现在单独做成一屏装不完的上下长页：
   大字标题 → 多个入口 → 「我们能帮你厘清什么」三张卡 → 主行动。
   办公室那一段已抽到 components/CommunityNetworkSection.jsx，等用户决定放哪。 */

/* 视频放在人物下面。注意：这个 mediadelivery 地址目前返回 404（provider 侧 asset 不可用），
   页面上会显示播放器的 404 页。换一个能播的 embed 只改这一行。 */
const VIDEO_EMBED_URL = 'https://player.mediadelivery.net/embed/763269/6a8340b7-c25b-4425-8ea0-96103d8312b5?autoplay=false&loop=false&muted=true&preload=true&responsive=true';

const copy = {
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
    entriesLabel: 'Ways into GuanyiSearch',
    entries: [
      { label: 'Research services', to: '/business' },
      { label: 'How it works', to: '/how-it-works' },
      { label: 'Our approach', to: '/our-approach' },
      { label: 'China market insights', to: '/china-market-insights' },
      { label: 'Community and partners', to: '/partners' },
      { label: 'Talk to our team', to: '/business/access' },
    ],
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
    entriesLabel: '进入 GuanyiSearch 的几种方式',
    entries: [
      { label: '研究服务', to: '/business' },
      { label: '合作方式', to: '/how-it-works' },
      { label: '我们的方法', to: '/our-approach' },
      { label: '中国市场洞察', to: '/china-market-insights' },
      { label: '社群与伙伴', to: '/partners' },
      { label: '联系我们', to: '/business/access' },
    ],
  },
  'zh-Hant': {
    research: {
      eyebrow: '面向市場進入團隊的研究',
      title: '在上線前，明確什麼需要改變。',
      description: '當進入新市場意味著真實成本時，僅憑對需求、語言和渠道的假設並不足夠。我們圍繞決定產品是否準備就緒的關鍵問題，設計聚焦的本地研究。',
      supporting: 'GuanyiSearch 幫助產品、成長和市場進入團隊，將當下的商業決策轉化為可直接使用的本地證據。',
      clientProblemsLabel: 'GuanyiSearch 幫助客戶釐清的問題',
      clientProblemsTitle: '我們幫助你釐清的問題',
      clientProblems: [
        { title: '需求與價值主張是否匹配', description: '哪一種客戶需求最重要？怎樣讓產品在當地更具相關性？' },
        { title: '訊息與渠道是否匹配', description: '什麼樣的語言、創意與市場路徑，才能真正觸達目標人群？' },
        { title: '可執行的下一步', description: '在投入更多預算之前，哪些需要調整、繼續測試，或暫緩推進？' },
      ],
      action: '討論你的市場問題',
    },
    entriesLabel: '進入 GuanyiSearch 的幾種方式',
    entries: [
      { label: '研究服務', to: '/business' },
      { label: '合作方式', to: '/how-it-works' },
      { label: '我們的方法', to: '/our-approach' },
      { label: '中國市場洞察', to: '/china-market-insights' },
      { label: '社群與夥伴', to: '/partners' },
      { label: '聯絡我們', to: '/business/access' },
    ],
  },
};

export default function CommunityHub() {
  const { language, publicCopy } = useLanguage();
  const text = copy[language] || copy.en;
  const research = text.research;
  /* 视频默认显示封面，点了才载入 embed —— 目前那个地址返回 404，
     不点就不会把 404 播到页面上；换成能播的地址后直接可用。 */
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section className="community-hub" aria-labelledby="community-hub-title">
      <div className="community-hub-inner">
        <div className="community-hub-top">
          <div className="community-hub-intro">
            <p className="community-hub-eyebrow"><span>01</span>{research.eyebrow}</p>
            <h2 id="community-hub-title">{research.title}</h2>
            <p className="community-hub-lede">{research.description}</p>
            <p className="community-hub-supporting">{research.supporting}</p>
          </div>
          <figure className="community-hub-portrait">
            <img src={peopleImage} alt="" loading="lazy" decoding="async" />
          </figure>
        </div>

        {/* 原来单独一屏的「视频 + 证据」并到这里，放在人物下面，色调统一成淡鼠尾草绿。 */}
        <div className="community-hub-video">
          <figure className="community-hub-video-frame">
            {videoOpen ? (
              <iframe
                src={VIDEO_EMBED_URL}
                title={publicCopy.navigation.about}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
                allowFullScreen
              />
            ) : (
              <button className="community-hub-video-poster" type="button" onClick={() => setVideoOpen(true)} aria-label={publicCopy.navigation.about}>
                <img src={videoPoster} alt="" loading="lazy" decoding="async" />
                <span className="community-hub-video-play" aria-hidden="true"><Play size={22} strokeWidth={2} fill="currentColor" /></span>
              </button>
            )}
          </figure>
          <div className="community-hub-video-copy">
            <p>{publicCopy.home.evidence}</p>
            <p className="community-hub-video-statement">{publicCopy.home.evidenceStatement}</p>
            <Link className="community-hub-video-action" to={withLanguage('/our-approach', language)}>
              {publicCopy.navigation.about}
              <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="community-hub-resolve">
          <p className="community-hub-resolve-label">{research.clientProblemsLabel}</p>
          <h3>{research.clientProblemsTitle}</h3>
          <ol>
            {research.clientProblems.map((problem, index) => (
              <li key={problem.title}>
                <span className="community-hub-resolve-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{problem.title}</strong>
                  <span>{problem.description}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="community-hub-foot">
          <Link className="community-hub-primary-action" to={withLanguage('/business', language)}>
            {research.action}
            <ArrowUpRight size={19} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
