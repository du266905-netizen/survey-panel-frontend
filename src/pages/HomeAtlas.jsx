import { useEffect, useState } from 'react';
import { ArrowUpRight, LoaderCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createSupportTicket } from '../api/supportApi';
import HomeLegacySections from '../components/HomeLegacySections';
import CookieConsentBanner from '../components/CookieConsentBanner';
import { useAuth } from '../components/AuthContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import communityIllustration from '../assets/home/community-illustration.png';
import businessHandshake from '../assets/illustrations/business-handshake.jpg';
import newsWallIllustration from '../assets/home/news-wall-illustration.png';
import surveyParticipationIllustration from '../assets/home/survey-participation-illustration.png';
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
    return <article className={`atlas-node atlas-node--static ${className}`} aria-label={`${title}. Coming soon.`}>{content}</article>;
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

const atlasPrompts = ['Read the latest news', 'Join a survey', 'Share your view', 'Bring a research question'];

function AtlasTypewriter() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [characterCount, setCharacterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const activePrompt = atlasPrompts[promptIndex];

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
        setPromptIndex((currentIndex) => (currentIndex + 1) % atlasPrompts.length);
        setIsDeleting(false);
      };
    }

    const timeoutId = window.setTimeout(update, delay);
    return () => window.clearTimeout(timeoutId);
  }, [activePrompt.length, characterCount, isDeleting, prefersReducedMotion]);

  const visiblePrompt = prefersReducedMotion ? activePrompt : activePrompt.slice(0, characterCount);

  return (
    <div className="atlas-map-typewriter" aria-label={`Let’s begin: ${activePrompt}`}>
      <span>Let’s begin:</span>
      <strong>{visiblePrompt}</strong>
      <i aria-hidden="true" />
    </div>
  );
}

export default function HomeAtlas() {
  const { user } = useAuth();
  const [activeNode, setActiveNode] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
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
          content: phone ? `${message}\n\nContact number: ${phone}` : message,
        }],
        contactName: name,
        contactEmail: email,
      });
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
      setContactStatus('Thank you. Your message has been received.');
    } catch (caughtError) {
      setContactStatus(caughtError.response?.data?.message || 'We could not send your message. Please try again.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <main className={`home-atlas ${activeNode ? `is-${activeNode}` : ''}`}>
      <PublicSiteHeader heroOverlay />

      <section className="video-hero-section" aria-labelledby="video-hero-title">
        <div className="video-hero">
          <div className="video-hero-media" aria-hidden="true">
            <iframe
              className="video-hero-player"
              src="https://player.mediadelivery.net/embed/719414/d40516f5-d9e6-4eec-9c46-730d9d58ade3?autoplay=true&loop=true&muted=true&preload=true&responsive=true"
              title=""
              loading="eager"
              tabIndex={-1}
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </div>
          <div className="video-hero-scrim" aria-hidden="true" />
          <div className="video-hero-content">
            <p className="video-hero-eyebrow">Every voice leaves an echo.</p>
            <h1 id="video-hero-title">Your opinion<br />shapes the world.</h1>
            <p className="video-hero-description">Discover global perspectives, share what you think, and earn rewards by taking surveys.</p>
            <Link className="atlas-primary-link video-hero-cta" to={user ? '/dashboard' : '/join'}>
              Join us
              <ArrowUpRight size={19} strokeWidth={1.8} />
            </Link>
          </div>
        </div>
      </section>

      <section className="atlas-stage" aria-labelledby="atlas-contact-title">
        <div className="atlas-contact-panel">
          <p className="atlas-contact-kicker">GET IN TOUCH</p>
          <h2 id="atlas-contact-title">Tell us what matters to you.</h2>
          <p className="atlas-contact-intro">Share your question or idea. We will follow up using the details you provide.</p>

          <form className="atlas-contact-form" onSubmit={submitContactForm}>
            <label>
              <span>Your name</span>
              <input name="name" value={contactForm.name} onChange={updateContactField} autoComplete="name" maxLength={80} required />
            </label>
            <label>
              <span>Your email</span>
              <input name="email" type="email" value={contactForm.email} onChange={updateContactField} autoComplete="email" maxLength={254} required />
            </label>
            <label>
              <span>Contact number <em>Optional</em></span>
              <input name="phone" type="tel" value={contactForm.phone} onChange={updateContactField} autoComplete="tel" maxLength={40} />
            </label>
            <label>
              <span>Subject</span>
              <input name="subject" value={contactForm.subject} onChange={updateContactField} maxLength={140} required />
            </label>
            <label>
              <span>Message</span>
              <textarea name="message" value={contactForm.message} onChange={updateContactField} maxLength={1800} required />
            </label>
            <button className="atlas-contact-submit" type="submit" disabled={isSubmittingContact}>
              {isSubmittingContact ? <LoaderCircle size={17} className="atlas-contact-spinner" /> : <Send size={17} />}
              {isSubmittingContact ? 'Sending' : 'Send message'}
              {!isSubmittingContact && <ArrowUpRight size={17} />}
            </button>
            {contactStatus && <p className={`atlas-contact-status ${contactStatus.startsWith('Thank') ? 'is-success' : 'is-error'}`} role="status">{contactStatus}</p>}
          </form>
        </div>

        <div className="atlas-map" aria-label="Ways to explore GuanyiSearch">
          <span className="atlas-orbit atlas-orbit--one" aria-hidden="true" />
          <span className="atlas-orbit atlas-orbit--two" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--one" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--two" aria-hidden="true" />
          <span className="atlas-signal atlas-signal--three" aria-hidden="true" />
          <svg className="atlas-wires" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
            <path className="atlas-wire atlas-wire--news" d="M 605 338 C 499 258 449 184 236 174" />
            <path className="atlas-wire atlas-wire--survey" d="M 603 340 C 722 430 827 487 1004 506" />
            <path className="atlas-wire atlas-wire--community" d="M 603 340 C 521 457 421 533 255 570" />
            <path className="atlas-wire atlas-wire--business" d="M 605 338 C 714 257 818 180 1000 164" />
          </svg>
          <AtlasTypewriter />

          <AtlasNode
            name="news"
            className="atlas-node--news"
            to="/news"
            eyebrow="NEWS WALL"
            title="See the world's perspective. Stay up to date."
            image={newsWallIllustration}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="survey"
            className="atlas-node--survey"
            to="/partners"
            eyebrow="SURVEYS"
            title="Take surveys and earn gift cards and more."
            image={surveyParticipationIllustration}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="community"
            className="atlas-node--community"
            to={user ? '/community' : '/register'}
            eyebrow="COMMUNITY"
            title="Join the community."
            image={communityIllustration}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />

          <AtlasNode
            name="business"
            className="atlas-node--business"
            to="/business"
            eyebrow="BUSINESS"
            title="Custom questionnaires and tailored studies."
            image={businessHandshake}
            onActive={setActiveNode}
            onInactive={() => setActiveNode('')}
          />
        </div>
      </section>
      <HomeLegacySections />
      <CookieConsentBanner />
    </main>
  );
}
