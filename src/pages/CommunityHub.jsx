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
      title: 'Another city, another answer.',
      description: 'A panel can fill a few hundred completes in a day. It will not tell you that this word means something else there, or that people in that district do not buy this way.',
      supporting: 'That part only happens on the ground: recruiting, interviewing, translating, and the notes a board will ask for.',
      clientProblemsTitle: 'The extra steps we take',
      clientProblems: [
        { title: 'A sample built here', description: 'Quotas, screening and recruiting redone for this city, not a global template with a new label.' },
        { title: 'Asked in local words', description: 'Local moderators use the words people use. Translation checks meaning, not vocabulary.' },
        { title: 'Notes you can hand over', description: 'Where the sample came from, what it cannot answer, and where the limits sit.' },
      ],
      action: 'Discuss your market question',
    },
  },
  'zh-CN': {
    research: {
      title: '换个城市，答案就变了。',
      description: '样本库一天能收满几百份问卷。它不会告诉你：这个词在那边是另一个意思，或者这个区的人根本不这样买东西。',
      supporting: '这部分只能在地上做：招募、访谈、翻译，还有董事会会追问的那些记录。',
      clientProblemsTitle: '我们多做的那几步',
      clientProblems: [
        { title: '按这座城市配样本', description: '配额、甄别、招募都在这里重做一遍，不是把全球模板换个名字。' },
        { title: '用当地的说法问', description: '本地主持人用当地人自己的说法；翻译校的是意思，不是词。' },
        { title: '能交出去的记录', description: '样本从哪来、哪些答不了、边界在哪，都写下来。' },
      ],
      action: '讨论你的市场问题',
    },
  },
  'zh-Hant': {
    research: {
      title: '換個城市，答案就變了。',
      description: '樣本庫一天能收滿幾百份問卷。它不會告訴你：這個詞在那边是另一個意思，或者這個區的人根本不這樣買東西。',
      supporting: '這部分只能在地上做：招募、訪談、翻譯，還有董事會會追問的那些記錄。',
      clientProblemsTitle: '我們多做的那幾步',
      clientProblems: [
        { title: '按這座城市配樣本', description: '配額、甄別、招募都在這裡重做一遍，不是把全球模板換個名字。' },
        { title: '用當地的說法問', description: '本地主持人用當地人自己的說法；翻譯校的是意思，不是詞。' },
        { title: '能交出去的記錄', description: '樣本從哪來、哪些答不了、邊界在哪，都寫下來。' },
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
          <h3>{research.clientProblemsTitle}</h3>
          <ol>
            {research.clientProblems.map((problem) => (
              <li key={problem.title}>
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
