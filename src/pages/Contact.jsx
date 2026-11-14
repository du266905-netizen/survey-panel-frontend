import { useLanguage } from '../components/LanguageContext';
import HomeContactSection from '../components/HomeContactSection';
import { pick } from '../content/projectStatus';
import './Contact.css';

/* Contact us: one centred form on a quiet, blurred backdrop.
   The old split layout put an editorial column beside the form; it is gone.
   The sentence above the fields is the form's only heading. */
export default function Contact() {
  const { language } = useLanguage();
  const title = pick(
    language,
    '分享你的问题或想法。我们会通过你提供的联系方式跟进。',
    'Share your question or idea. We will follow up using the contact details you provide.',
    '分享你的問題或想法。我們會透過你提供的聯絡方式跟進。',
  );

  return (
    <main className="contact-page">
      <div className="contact-shell">
        <section className="contact-card" aria-labelledby="contact-title">
          <h1 id="contact-title">{title}</h1>
          <HomeContactSection hideHeading />
        </section>
      </div>
    </main>
  );
}
