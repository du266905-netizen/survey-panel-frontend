import PublicSiteHeader from '../components/PublicSiteHeader';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage } from '../components/LanguageContext';
import usePageTitle from '../hooks/usePageTitle';
import './Careers.css';

/* Careers — first screen (2026-10-28).

   Owner's copy, Chinese as written; English and Traditional Chinese are a
   straight translation of it, kept in the same paragraph order. The opening
   paragraph sits flush at the container edge at the 38 step, the way the China
   capability page opens. The jobs list comes later; this page stops after the
   intro for now. */

const careersCopy = {
  'zh-CN': {
    eyebrow: '招聘',
    title: '在 GuanyiSearch 工作',
    paragraphs: [
      '我们深知，员工是我们最大的财富。是我们能够不断突破、迈向更美好未来的核心引擎。',
      '我们相信，只有让每一位员工在工作中找到成就感与归属感，我们才能共同创造出真正有价值的成果。',
      '我们提供的是一个开放、包容、充满活力的舞台，在guanyi，你可以尽情的发展你的才华。我们提供远程和现场办公两种职位，因此您可以选择在家办公，也可以选择在我们不断扩建的办公中心之一工作。',
    ],
  },
  'zh-Hant': {
    eyebrow: '招聘',
    title: '在 GuanyiSearch 工作',
    paragraphs: [
      '我們深知，員工是我們最大的財富。是我們能夠不斷突破、邁向更美好未來的核心引擎。',
      '我們相信，只有讓每一位員工在工作中找到成就感與歸屬感，我們才能共同創造出真正有價值的成果。',
      '我們提供的是一個開放、包容、充滿活力的舞台，在guanyi，你可以盡情的發展你的才華。我們提供遠端與現場辦公兩種職位，因此您可以選擇在家辦公，也可以選擇在我們不斷擴建的辦公中心之一工作。',
    ],
  },
  'en-US': {
    eyebrow: 'Careers',
    title: 'Work at GuanyiSearch',
    paragraphs: [
      'We know that people are our greatest asset, and the engine behind every step forward we take.',
      'We believe good work comes from people who find a sense of achievement and belonging in what they do. That is what makes results worth having.',
      'What we offer is an open, inclusive and energetic stage. At Guanyi, you can develop your craft fully. Roles are either remote or on site, so you can work from home or from one of our growing offices.',
    ],
  },
  'en-GB': {
    eyebrow: 'Careers',
    title: 'Work at GuanyiSearch',
    paragraphs: [
      'We know that people are our greatest asset, and the engine behind every step forward we take.',
      'We believe good work comes from people who find a sense of achievement and belonging in what they do. That is what makes results worth having.',
      'What we offer is an open, inclusive and energetic stage. At Guanyi, you can develop your craft fully. Roles are either remote or on site, so you can work from home or from one of our growing offices.',
    ],
  },
};

export default function Careers() {
  const { language } = useLanguage();
  const t = careersCopy[language] || careersCopy['en-US'];
  usePageTitle(t.eyebrow);

  return (
    <main className="careers-page">
      <PublicSiteHeader />
      <section className="careers-intro">
        <div className="careers-container">
          <p className="careers-eyebrow">{t.eyebrow}</p>
          <h1 className="careers-title">{t.title}</h1>
          {t.paragraphs.map((paragraph) => (
            <p className="careers-body" key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
