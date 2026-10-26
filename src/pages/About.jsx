import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import HomeFilmSection from '../components/HomeFilmSection';
import { HomeCommunityCta } from '../components/HomeLegacySections';
import cityRiver from '../assets/about/city-river-view.jpg';
import './About.css';

/* About GuanyiSearch —— 2026-10-27 重排。

   页序改为：眉标 + 主题句（80）→ 说明 → 两个按钮 → 影片（大框，不全屏）
   → 以人为本 → 立足中国 → 十个行业。
   主题句、说明、以人为本、立足中国全部沿用 aboutCopy 里的原文；
   行业卡片用 industryCopy 里各行业自己的 title / lead，一个新句子都没写。
   新增的只有按钮标签和行业段的眉标/标题（下面 heroUi，四条语言，其余回落英文）。
   /our-approach 保留为重定向，旧链接不会断。 */

const heroUi = {
  'en-US': {
    join: 'Join us', contact: 'Contact sales', industries: 'Industries',
    industriesTitle: 'Choose the field you are interested in.',
    signIn: 'Sign in', signUp: 'Sign up',
    policyEyebrow: 'Policies and terms', privacy: 'Privacy Policy', terms: 'Terms of Service', researcherTerms: 'Business researcher terms',
  },
  'en-GB': {
    join: 'Join us', contact: 'Contact sales', industries: 'Industries',
    industriesTitle: 'Choose the field you are interested in.',
    signIn: 'Sign in', signUp: 'Sign up',
    policyEyebrow: 'Policies and terms', privacy: 'Privacy Policy', terms: 'Terms of Service', researcherTerms: 'Business researcher terms',
  },
  'zh-CN': {
    join: '加入我们', contact: '联系销售', industries: '行业',
    industriesTitle: '选择你感兴趣的领域。',
    signIn: '登录', signUp: '报名',
    policyEyebrow: '阅读政策与条款', privacy: '隐私政策', terms: '服务条款', researcherTerms: '商业研究者条款',
  },
  'zh-Hant': {
    join: '加入我們', contact: '聯絡銷售', industries: '行業',
    industriesTitle: '選擇你感興趣的領域。',
    signIn: '登入', signUp: '報名',
    policyEyebrow: '閱讀政策與條款', privacy: '隱私政策', terms: '服務條款', researcherTerms: '商業研究者條款',
  },
};

/* Ten industry pages, in the order the copy library and the router carry them.
   The slug is the router path; everything shown comes from that industry's own
   copy, so a card cannot drift from the page it opens. */
const industryKeys = ['automotive', 'travel', 'consumer', 'healthcare', 'finance', 'social', 'industrial', 'tech', 'media', 'ecommerce'];

export default function About() {
  const { language, publicCopy } = useLanguage();
  const text = publicCopy.pages.about;
  usePageTitle(text.eyebrow);
  const approach = publicCopy.approach;
  const ui = heroUi[language] || heroUi['en-US'];
  // The human-first paragraph has its own one-piece translation in the
  // library; where it is missing (the four languages that already carry the
  // approach section) the five sentences are joined as before.
  const manifesto = text.humanBody || [approach.deck, approach.lede, approach.voicesBody, approach.technologyBody, approach.principleBody]
    .filter(Boolean)
    .join(language.startsWith('zh') ? '' : ' ');

  return (
    <main className="about-page">
      {/* Statement first, at the top of the page; the film follows it. */}
      <section className="ab-hero">
        <p className="ab-eyebrow">{text.eyebrow}</p>
        <h1 className="ab-theme">{text.theme}</h1>
        <p className="ab-lede">{text.body}</p>
        <div className="ab-actions">
          <Link className="ab-button" to={withLanguage('/access', language)}>{ui.join}</Link>
          <Link className="ab-button ab-button--ghost" to={withLanguage('/contact', language)}>{ui.contact}</Link>
        </div>
      </section>

      <section className="ab-film" aria-label="Film">
        <HomeFilmSection poster={cityRiver} />
      </section>

      <section className="ab-manifesto" aria-labelledby="ab-human">
        <p className="ab-eyebrow ab-human-label" id="ab-human">{text.humanEyebrow}</p>
        <p className="ab-eyebrow ab-policy-label" id="ab-policy-title">{ui.policyEyebrow}</p>
        <p className="ab-body">{manifesto}</p>
        <ul className="ab-policy" aria-labelledby="ab-policy-title">
          {[
            { to: '/privacy', label: ui.privacy },
            { to: '/terms', label: ui.terms },
            { to: '/business/terms', label: ui.researcherTerms },
          ].map((doc) => (
            <li key={doc.to}>
              <Link to={withLanguage(doc.to, language)}>
                <span>{doc.label}</span>
                <ArrowRight className="ab-policy-arrow" size={16} strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="ab-story" aria-labelledby="ab-story-title">
        <h2 id="ab-story-title" className="ab-section-title">{text.storyTitle}</h2>
        <ol className="ab-points">
          {text.points.map((point) => (
            <li key={point.num}>
              <span>{point.num}</span>
              <h3>{point.title}</h3>
              <p>{point.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="ab-industries" aria-labelledby="ab-ind-title">
        <div className="ab-ind-head">
          <p className="ab-eyebrow">{ui.industries}</p>
          <h2 id="ab-ind-title" className="ab-ind-title">{ui.industriesTitle}</h2>
        </div>
        <div className="ab-ind-grid">
          {industryKeys.map((key, index) => {
            const item = publicCopy.pages.industries[key];
            if (!item) return null;
            return (
              <Link key={key} className="ab-ind-card" to={withLanguage(`/industries/${key}`, language)}>
                <span className="ab-ind-top">
                  <span className="ab-ind-num">{String(index + 1).padStart(2, '0')}</span>
                  <ArrowRight className="ab-ind-arrow" size={18} strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.lead}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 页末黑块：复用首页那一段和它的打字机，只把两个动作换成登录 / 报名。 */}
      <HomeCommunityCta
        copy={publicCopy.home}
        navigation={publicCopy.navigation}
        language={language}
        id={undefined}
        ariaLabel="Sign in or sign up"
        actions={[
          { label: ui.signIn, to: '/login', primary: false, arrow: false },
          { label: ui.signUp, to: '/register', primary: true, arrow: false },
        ]}
      />
    </main>
  );
}
