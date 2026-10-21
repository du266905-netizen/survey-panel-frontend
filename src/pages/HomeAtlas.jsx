import { useMemo, useState } from 'react';
import { ArrowUpRight, LoaderCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createSupportTicket } from '../api/supportApi';
import CommunityHub from './CommunityHub';
import HomeFilmSection from '../components/HomeFilmSection';
import HomeLegacySections from '../components/HomeLegacySections';
import { useLanguage } from '../components/LanguageContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import HomeEntry from '../components/HomeEntry';
import communityIllustration from '../assets/home/community-illustration.png';
import businessHandshake from '../assets/illustrations/business-handshake.jpg';
import newsWallIllustration from '../assets/home/news-wall-illustration.png';
import surveyParticipationIllustration from '../assets/home/survey-participation-illustration.png';
import { countryFlag, countryLabel, countryOptions, phoneCountryOptions } from '../constants/panelProfileOptions';
import './HomeAtlas.css';

function AtlasNode({ name, className, to, eyebrow, title, image, onActive, onInactive, soon = false }) {
  const content = (
    <>
      <span className="atlas-node-image">
        <img src={image} alt="" />
      </span>
      <span className="atlas-node-copy">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
        {soon && <em>Coming soon</em>}
      </span>
    </>
  );

  if (!to) {
    return <article className={`atlas-node atlas-node--static ${className}`} aria-label={title}>{content}</article>;
  }

  return (
    <Link
      className={`atlas-node ${className}`}
      to={to}
      onMouseEnter={() => onActive(name)}
      onMouseLeave={onInactive}
      onFocus={() => onActive(name)}
      onBlur={onInactive}
    >
      {content}
    </Link>
  );
}

export default function HomeAtlas() {
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.home;
  const [heroLead, ...heroRest] = publicCopy.hero.lines;
  const heroLines = [heroLead, heroRest.join(['zh-CN', 'zh-Hant', 'ja', 'ko'].includes(language) ? '' : ' ')].filter(Boolean);
  const regionNames = useMemo(() => {
    try { return new Intl.DisplayNames([language], { type: 'region' }); } catch { return null; }
  }, [language]);
  const localizedCountry = (country) => regionNames?.of(country.value) || country.label;
  const [activeNode, setActiveNode] = useState('');
  const [audience, setAudience] = useState('participant');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phoneCountry: 'US',
    phone: '',
    region: 'US',
    subject: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const updateContactField = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
  };

  const submitContactForm = async (event) => {
    event.preventDefault();
    if (isSubmittingContact) return;

    const name = contactForm.name.trim();
    const email = contactForm.email.trim();
    const phone = contactForm.phone.trim();
    const phonePrefix = phoneCountryOptions.find((option) => option.value === contactForm.phoneCountry)?.dialCode || '';
    const subject = contactForm.subject.trim();
    const message = contactForm.message.trim();

    if (!name || !email || !subject || !message) return;

    setContactStatus('');
    setIsSubmittingContact(true);
    try {
      await createSupportTicket({
        source: 'PUBLIC_HOME_CONTACT',
        category: 'OTHER',
        subject,
        messages: [{
          role: 'user',
          content: `${message}${phone ? `\n\nContact number: ${phonePrefix} ${phone}` : ''}\nRegion: ${countryLabel(contactForm.region)}`,
        }],
        contactName: name,
        contactEmail: email,
      });
      setContactForm({ name: '', email: '', phoneCountry: 'US', phone: '', region: 'US', subject: '', message: '' });
      setContactStatus(copy.received);
    } catch (caughtError) {
      setContactStatus(caughtError.response?.data?.message || copy.sendError);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <main className={`home-atlas ${activeNode ? `is-${activeNode}` : ''}`}>
      <div className="home-atlas-frame" aria-hidden="true" />
      <PublicSiteHeader />

      <section className="video-hero-section" aria-labelledby="video-hero-title">
        <div className="video-hero">
          <div className="video-hero-content">
            <div className="video-hero-head">
              <p className="video-hero-eyebrow">{publicCopy.hero.eyebrow}</p>
              <h1 id="video-hero-title">{heroLines.map((line) => <span key={line}>{line}</span>)}</h1>
            </div>
            <div className="video-hero-foot">
              <p className="video-hero-description">{publicCopy.hero.description}</p>
              <div className="home-hero-media">
                <HomeFilmSection />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Account switch + sign-in form, extracted from the hero. */}
      <HomeEntry audience={audience} onAudienceChange={setAudience} />

      {/* 人物/地球长文：保留内容，去掉整块彩色底，改为骨白 + 发丝线。 */}
      <CommunityHub />

      <section id="atlas-contact" className="atlas-stage" aria-labelledby="atlas-contact-title">
        <div className="atlas-contact-panel">
          <div className="atlas-contact-copy">
          <h2 id="atlas-contact-title">{copy.contactTitle}</h2>
          <p className="atlas-contact-intro">{copy.contactIntro}</p>
          </div>

          <form className="atlas-contact-form" onSubmit={submitContactForm}>
            <label className="atlas-contact-field--name">
              <span>{copy.name}</span>
              <input name="name" value={contactForm.name} onChange={updateContactField} autoComplete="name" maxLength={80} required />
            </label>
            <label className="atlas-contact-field--email">
              <span>{copy.email}</span>
              <input name="email" type="email" value={contactForm.email} onChange={updateContactField} autoComplete="email" maxLength={254} required />
            </label>
            <label className="atlas-contact-field--phone">
              <span>{copy.contactNumber} <em>{copy.optional}</em></span>
              <span className="atlas-phone-input"><select name="phoneCountry" value={contactForm.phoneCountry} onChange={updateContactField} aria-label={copy.country}>{phoneCountryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {localizedCountry(country)} ({country.dialCode})</option>)}</select><input name="phone" type="tel" inputMode="tel" value={contactForm.phone} onChange={updateContactField} autoComplete="tel-national" placeholder={copy.phonePlaceholder} maxLength={32} /></span>
            </label>
            <label className="atlas-contact-field--region">
              <span>{copy.country}</span>
              <select name="region" value={contactForm.region} onChange={updateContactField} autoComplete="country">{countryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {localizedCountry(country)}</option>)}</select>
            </label>
            <label className="atlas-contact-field--subject">
              <span>{copy.subject}</span>
              <input name="subject" value={contactForm.subject} onChange={updateContactField} maxLength={140} required />
            </label>
            <label className="atlas-contact-field--message">
              <span>{copy.message}</span>
              <textarea name="message" value={contactForm.message} onChange={updateContactField} maxLength={1800} required />
            </label>
            <button className="atlas-contact-submit" type="submit" disabled={isSubmittingContact}>
              {isSubmittingContact ? <LoaderCircle size={17} className="atlas-contact-spinner" /> : <Send size={17} />}
              {isSubmittingContact ? copy.sending : copy.send}
              {!isSubmittingContact && <ArrowUpRight size={17} />}
            </button>
            {contactStatus && <p className={`atlas-contact-status ${contactStatus.startsWith('Thank') ? 'is-success' : 'is-error'}`} role="status">{contactStatus}</p>}
          </form>
        </div>

      </section>

      <HomeLegacySections />
    </main>
  );
}
