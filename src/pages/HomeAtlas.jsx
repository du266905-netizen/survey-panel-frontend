import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, LoaderCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createSupportTicket } from '../api/supportApi';
import CommunityHub from './CommunityHub';
import HomeLegacySections, { HomeGlobalSection } from '../components/HomeLegacySections';
import { useAuth } from '../components/AuthContext';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import communityIllustration from '../assets/home/community-illustration.png';
import businessHandshake from '../assets/illustrations/business-handshake.jpg';
import newsWallIllustration from '../assets/home/news-wall-illustration.png';
import surveyParticipationIllustration from '../assets/home/survey-participation-illustration.png';
import heroCommunity from '../assets/home/hero-community.png';
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

function AtlasTypewriter({ prompts, begin }) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activePrompt = prompts[promptIndex];

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let delay = 52;
    let update;

    if (!isDeleting && characterCount < activePrompt.length) {
      update = () => setCharacterCount((currentCount) => currentCount + 1);
    } else if (!isDeleting) {
      delay = 1800;
      update = () => setIsDeleting(true);
    } else if (characterCount > 0) {
      delay = 30;
      update = () => setCharacterCount((currentCount) => currentCount - 1);
    } else {
      delay = 260;
      update = () => {
        setPromptIndex((currentIndex) => (currentIndex + 1) % prompts.length);
        setIsDeleting(false);
      };
    }

    const timeoutId = window.setTimeout(update, delay);
    return () => window.clearTimeout(timeoutId);
  }, [activePrompt.length, characterCount, isDeleting, prefersReducedMotion]);

  const visiblePrompt = prefersReducedMotion ? activePrompt : activePrompt.slice(0, characterCount);

  return (
    <div className="atlas-map-typewriter" aria-label={`${begin} ${activePrompt}`}>
      <span>{begin}</span>
      <strong>{visiblePrompt}</strong>
      <i aria-hidden="true" />
    </div>
  );
}


export default function HomeAtlas() {
  const { user } = useAuth();
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.home;
  const [heroLead, ...heroRest] = publicCopy.hero.lines;
  const heroLines = [heroLead, heroRest.join(['zh-CN', 'zh-Hant', 'ja', 'ko'].includes(language) ? '' : ' ')].filter(Boolean);
  const regionNames = useMemo(() => {
    try { return new Intl.DisplayNames([language], { type: 'region' }); } catch { return null; }
  }, [language]);
  const localizedCountry = (country) => regionNames?.of(country.value) || country.label;
  const [activeNode, setActiveNode] = useState('');
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
      <PublicSiteHeader heroOverlay />

      <section className="video-hero-section" aria-labelledby="video-hero-title">
        <div className="video-hero">
          <div className="video-hero-content">
            <div className="video-hero-copy">
              <p className="video-hero-eyebrow">{publicCopy.hero.eyebrow}</p>
              <h1 id="video-hero-title">{heroLines.map((line) => <span key={line}>{line}</span>)}</h1>
              <p className="video-hero-description">{publicCopy.hero.description}</p>
              <p className="video-hero-supporting">{publicCopy.hero.supporting}</p>
              {/* two ways in, as the prototype has it: one entry for people who
                  want to take part, one for teams commissioning research */}
              <div className="video-hero-actions">
                <Link className="atlas-primary-link video-hero-cta" to={withLanguage(user ? '/dashboard' : '/join', language)}>
                  {publicCopy.navigation.meetCommunity}
                  <ArrowUpRight size={19} strokeWidth={1.8} />
                </Link>
                <Link className="video-hero-cta video-hero-cta--outline" to={withLanguage('/business', language)}>
                  {publicCopy.navigation.runResearch}
                  <ArrowUpRight size={19} strokeWidth={1.8} />
                </Link>
              </div>
            </div>
            <div className="video-hero-media" aria-hidden="true">
              <span className="video-hero-shape" />
              <img className="video-hero-cutout" src={heroCommunity} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="atlas-evidence" aria-label={publicCopy.navigation.about}>
        <div className="atlas-evidence-frame">
          <div className="atlas-evidence-video">
            <div style={{ position: 'relative', paddingTop: '56.25%' }}>
              <iframe
                src="https://player.mediadelivery.net/embed/763269/6a8340b7-c25b-4425-8ea0-96103d8312b5?autoplay=true&loop=false&muted=true&preload=true&responsive=true"
                title={publicCopy.hero.eyebrow}
                loading="lazy"
                style={{ border: 0, position: 'absolute', top: 0, height: '100%', width: '100%' }}
                allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen;"
                allowFullScreen
              />
            </div>
          </div>
          <div className="atlas-evidence-copy">
            <p>{copy.evidence}</p>
            <p className="atlas-evidence-statement">{copy.evidenceStatement}</p>
            <Link className="atlas-evidence-action" to={withLanguage('/our-approach', language)}>
              {publicCopy.navigation.about}
              <ArrowUpRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <CommunityHub />
      <HomeGlobalSection />

      <section id="atlas-contact" className="atlas-stage" aria-labelledby="atlas-contact-title">
        <div className="atlas-contact-panel">
          <p className="atlas-contact-kicker">{copy.contactKicker}</p>
          <h2 id="atlas-contact-title">{copy.contactTitle}</h2>
          <p className="atlas-contact-intro">{copy.contactIntro}</p>

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

        {/* The constellation that used to live here — two orbit rings, three
            signal dots, four connecting wires and the four AtlasNode cards —
            is replaced by one photograph. The AtlasNode component itself is
            kept further up this file, unused, because the animations are
            wanted again for the report wall; see handoff §12. */}
        <div className="atlas-map">
          <AtlasTypewriter prompts={copy.prompts} begin={copy.begin} />
        </div>
      </section>

      <HomeLegacySections />
    </main>
  );
}
