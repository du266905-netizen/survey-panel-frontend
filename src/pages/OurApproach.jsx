import { useLanguage } from '../components/LanguageContext';
import HomeFilmSection from '../components/HomeFilmSection';
import './OurApproach.css';

/* Our approach — slogan, film frame, then the human manifesto as one reading
   page: a plain painting, the title, and one paragraph that carries all of the
   manifesto copy. The two sections that used to open this page (ResearchQuestion,
   ResearchNetwork) were moved to src/_archive/our-approach on 22 Oct 2026. */

const slogans = {
  'zh-CN': '你的观点影响世界。',
  'zh-Hant': '你的觀點影響世界。',
  en: 'Your opinions shape the world.',
};

const sloganNotes = {
  'zh-CN': '真实的声音，值得被认真听见。',
  'zh-Hant': '真實的聲音，值得被認真聽見。',
  en: 'Real voices deserve to be heard.',
};

export default function OurApproach() {
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.approach;
  const slogan = slogans[language] || slogans.en;
  const sloganNote = sloganNotes[language] || sloganNotes.en;
  const paragraph = [copy.deck, copy.lede, copy.voicesBody, copy.technologyBody, copy.principleBody]
    .filter(Boolean)
    .join(language.startsWith('zh') ? '' : ' ');

  return (
    <main className="home-continuation approach-page">
      <section className="approach-slogan" aria-labelledby="approach-slogan-title">
        <h1 id="approach-slogan-title">{slogan}</h1>
        <p className="approach-slogan-note">{sloganNote}</p>
      </section>

      <HomeFilmSection />

      <section className="approach-manifesto" aria-labelledby="approach-manifesto-title">
        <h2 id="approach-manifesto-title">{copy.title}</h2>
        <p>{paragraph}</p>
      </section>
    </main>
  );
}
