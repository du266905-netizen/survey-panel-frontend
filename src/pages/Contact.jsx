import { useLanguage } from '../components/LanguageContext';
import HomeContactSection from '../components/HomeContactSection';
import './Contact.css';

/* Contact us — the homepage form, moved to its own public page under
   Participants. The section's own heading is hidden; the page owns the h1. */

const contactTitles = {
  'zh-CN': '联系我们',
  'zh-Hant': '聯絡我們',
  en: 'Contact us',
};

export default function Contact() {
  const { language, publicCopy } = useLanguage();
  const title = contactTitles[language] || contactTitles.en;
  return (
    <main className="contact-page">
      <section className="contact-hero" aria-labelledby="contact-title">
        <h1 id="contact-title">{title}</h1>
        <p>{publicCopy.home.contactIntro}</p>
      </section>
      <HomeContactSection hideHeading />
    </main>
  );
}
