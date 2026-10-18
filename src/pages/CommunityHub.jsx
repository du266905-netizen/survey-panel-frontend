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
      eyebrow: 'Local evidence, not a global template',
      title: 'One global panel fits no market.',
      description: 'A large panel can reach people almost anywhere. It cannot tell you which questions a market is actually answering. We design and run each study inside the market you are entering — locally recruited samples, the language people think in, and a method that holds up when your board asks how you know.',
      supporting: 'Fieldwork across Greater China, Asia-Pacific, the Middle East, Europe and North America, with scientific sample design, mixed qualitative and quantitative methods, and documented research ethics.',
      clientProblemsLabel: 'What a panel cannot give you',
      clientProblemsTitle: 'Where the advantage comes from',
      clientProblems: [
        { title: 'A sample that matches the market', description: 'Quotas, screening and recruitment built for this population — not borrowed from a global template and relabelled.' },
        { title: 'Language people actually use', description: 'Local moderators and meaning-checked translation, so a question lands the way you intended it.' },
        { title: 'Evidence you can defend', description: 'Method, limits and provenance written down, so the finding survives the meeting where the budget is decided.' },
      ],
      action: 'Discuss your market question',
    },
  },
  'zh-CN': {
    research: {
      eyebrow: '本地证据，不是全球模板',
      title: '一个全球样本库，套不住任何一个市场。',
      description: '大样本库几乎能触达任何地方的人，却无法告诉你这个市场真正在回答什么问题。我们在你要进入的市场内部设计与执行研究：当地招募的样本、人们真正使用的语言，以及经得起追问的方法。',
      supporting: '研究覆盖大中华区、亚太、中东、欧洲与北美；科学抽样设计、定性与定量结合，研究伦理有据可查。',
      clientProblemsLabel: '样本库给不了你的',
      clientProblemsTitle: '优势从哪里来',
      clientProblems: [
        { title: '与市场匹配的样本', description: '配额、甄别与招募都为这个人群单独设计，而不是套用全球模板再改个名字。' },
        { title: '人们真正在用的语言', description: '本地主持人，加上经过语义校验的翻译，让一个问题被理解成你想问的意思。' },
        { title: '经得起追问的证据', description: '方法、边界与来源都写清楚，结论才撑得住决定预算的那场会。' },
      ],
      action: '讨论你的市场问题',
    },
  },
  'zh-Hant': {
    research: {
      eyebrow: '本地證據，不是全球模板',
      title: '一個全球樣本庫，套不住任何一個市場。',
      description: '大樣本庫幾乎能觸達任何地方的人，卻無法告訴你這個市場真正在回答什麼問題。我們在你要進入的市場內部設計與執行研究：當地招募的樣本、人們真正使用的語言，以及經得起追問的方法。',
      supporting: '研究覆蓋大中華區、亞太、中東、歐洲與北美；科學抽樣設計、定性與定量結合，研究倫理有據可查。',
      clientProblemsLabel: '樣本庫給不了你的',
      clientProblemsTitle: '優勢從哪裡來',
      clientProblems: [
        { title: '與市場匹配的樣本', description: '配額、甄別與招募都為這個人群單獨設計，而不是套用全球模板再改個名字。' },
        { title: '人們真正在用的語言', description: '本地主持人，加上經過語意校驗的翻譯，讓一個問題被理解成你想問的意思。' },
        { title: '經得起追問的證據', description: '方法、邊界與來源都寫清楚，結論才撐得住決定預算的那場會。' },
      ],
      action: '討論你的市場問題',
    },
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
