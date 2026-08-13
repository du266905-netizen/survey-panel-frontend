import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import GlobalGlobe from './GlobalGlobe';
import Logo from './Logo';
import './HomeLegacySections.css';

const footerGroups = [
  {
    label: 'About us',
    links: [
      { label: 'How it works', to: '/how-it-works' },
      { label: 'Our approach', to: '/our-approach' },
    ],
  },
  {
    label: 'Explore',
    links: [
      { label: 'News Wall', to: '/news' },
    ],
  },
  {
    label: 'Participate',
    links: [
      { label: 'Find surveys', to: '/partners' },
      { label: 'Rewards & wallet', to: '/wallet' },
      { label: 'Invite program', to: '/referrals' },
    ],
  },
  {
    label: 'For organisations',
    links: [
      { label: 'Custom questionnaires', to: '/business' },
      { label: 'Tailored research', to: '/business' },
    ],
  },
  {
    label: 'Standards',
    links: [
      { label: 'Privacy', to: '/privacy' },
      { label: 'Terms', to: '/terms' },
    ],
  },
];

const socialLinks = [
  { id: 'x', label: 'X / Twitter', href: 'https://x.com/GUANYISEARCH' },
  { id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61591672089947' },
  { id: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/guanyisearch_/' },
  { id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/guanyisearch/' },
];

function SocialGlyph({ id }) {
  if (id === 'instagram') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.2" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2.2" /><circle cx="17.25" cy="6.75" r="1.35" fill="currentColor" /></svg>;
  }

  if (id === 'facebook') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M14.1 8.65h3.15V4h-3.72C9.4 4 7 6.46 7 10.1v2.4H4v4.38h3V23h4.85v-6.12h3.74l.7-4.38h-4.44v-1.95c0-1.26.62-1.9 2.25-1.9Z" /></svg>;
  }

  if (id === 'linkedin') {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M5.15 7.25A2.6 2.6 0 1 1 5.18 2a2.6 2.6 0 0 1-.03 5.25ZM2.78 22V9.22h4.78V22H2.78Zm7.12 0V9.22h4.58v1.75h.06c.64-1.12 2.08-2.14 4.17-2.14 4.1 0 5.02 2.7 5.02 6.2V22h-4.78v-6.25c0-1.5-.03-3.43-2.1-3.43-2.1 0-2.18 1.67-2.18 3.34V22H9.9Z" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" /></svg>;
}

function ManifestoSprout() {
  return (
    <div className="home-continuation-sprout" aria-hidden="true">
      <svg viewBox="0 0 220 220" fill="none">
        <circle className="home-sprout-sun" cx="155" cy="67" r="41" />
        <path className="home-sprout-line home-sprout-ground" d="M34 173c27-10 111-10 148 0" />
        <path className="home-sprout-line home-sprout-stem" d="M104 170c2-28 3-56-2-86" />
        <path className="home-sprout-leaf home-sprout-leaf-left" d="M101 116C71 108 57 84 64 58c28 4 44 25 38 58Z" />
        <path className="home-sprout-leaf home-sprout-leaf-right" d="M105 92c12-29 36-42 65-31-5 30-29 45-65 31Z" />
        <path className="home-sprout-line home-sprout-vein-left" d="M99 112 69 66" />
        <path className="home-sprout-line home-sprout-vein-right" d="m109 89 53-23" />
        <path className="home-sprout-line home-sprout-root" d="M104 169c-14-1-25 3-34 10M105 169c12 0 24 4 35 10" />
      </svg>
    </div>
  );
}

function GiftSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <g className="home-gift-sparkles"><path d="M48 72v18M39 81h18M172 77v14M165 84h14" /><path d="m64 51 5 9 9 5-9 5-5 9-5-9-9-5 9-5 5-9Z" /></g>
        <path className="home-gift-fill" d="M65 94h94v58H65z" />
        <path className="home-sketch-line" d="M65 93h94v59H65zM111 94v58" />
        <g className="home-gift-lid"><path className="home-gift-lid-fill" d="M57 79h110v19H57z" /><path className="home-sketch-line" d="M57 79h110v19H57zM111 79v19" /><path className="home-sketch-line" d="M109 79c-19-2-31-13-28-25 16-2 27 6 30 25Zm4 0c19-2 31-13 28-25-16-2-27 6-30 25Z" /></g>
        <path className="home-sketch-line" d="M65 98h94M111 98v54" />
        <path className="home-gift-shadow" d="M50 160c31 8 88 8 120 0" />
      </svg>
    </div>
  );
}

function TokenSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <path className="home-token-orbit" d="M48 118c12-43 93-72 133-34 28 26-2 61-43 70" />
        <g className="home-token-dot"><circle cx="166" cy="69" r="8" /></g>
        <g className="home-token-coin"><ellipse className="home-token-fill" cx="111" cy="110" rx="43" ry="25" /><path className="home-sketch-line" d="M68 110v18c0 14 86 14 86 0v-18M68 110c0 14 86 14 86 0s-86-14-86 0Z" /><path className="home-sketch-line home-token-mark" d="M95 108h32M111 95v26" /></g>
      </svg>
    </div>
  );
}

function CartSketch() {
  return (
    <div className="home-reward-sketch" aria-hidden="true">
      <svg viewBox="0 0 220 190" fill="none">
        <g className="home-cart-breeze"><path d="M14 76h31c9 0 15 4 19 11" /><path d="M8 97h39c9 0 15 4 19 11" /><path d="M19 118h28c9 0 15 4 19 11" /></g>
        <g className="home-cart-motion"><circle className="home-cart-accent" cx="165" cy="61" r="25" /><path className="home-cart-line" d="M63 56h27c8 0 13 5 15 15l15 68c3 13 10 20 24 20h39c14 0 22-6 25-20l13-57H105" /><path className="home-cart-line" d="M108 139h76" /><path className="home-cart-line home-cart-handle" d="M42 56h21" /><g className="home-cart-wheel"><circle className="home-cart-line" cx="127" cy="177" r="13" /><path className="home-cart-spoke" d="M114 177h26M127 164v26" /></g><g className="home-cart-wheel home-cart-wheel-right"><circle className="home-cart-line" cx="181" cy="177" r="13" /><path className="home-cart-spoke" d="M168 177h26M181 164v26" /></g><path className="home-cart-ground" d="M83 187c36 5 90 5 126 0" /></g>
      </svg>
    </div>
  );
}

export function HumanManifesto() {
  return (
    <section id="human-manifesto" className="home-manifesto" aria-labelledby="home-manifesto-title">
      <div className="home-continuation-container">
        <div className="home-manifesto-masthead">
          <div>
            <p className="home-section-label">OUR PRINCIPLE</p>
            <h1 id="home-manifesto-title">Human First</h1>
            <p className="home-manifesto-deck">We believe that real people will always be the starting point for research.</p>
          </div>
          <div className="home-manifesto-mark"><ManifestoSprout /><div><strong>REAL PEOPLE<br />REAL INSIGHT</strong><p>One real response at a time, a more trustworthy picture can grow.</p></div></div>
        </div>

        <div className="home-manifesto-spread">
          <figure className="home-manifesto-art"><img src="/human-manifesto/shoreline-painting.jpg" alt="Impressionist shoreline landscape" loading="lazy" decoding="async" /><figcaption><strong>Real voices deserve to be heard with care.</strong></figcaption></figure>
          <div className="home-manifesto-copy">
            <p className="home-manifesto-lede">AI can generate endless content that appears real. But it can never recreate a particular person, in a particular moment, expressing what they truly think.</p>
            <div className="home-manifesto-card-grid"><article className="home-manifesto-card home-manifesto-card--voices"><span>Real voices</span><p>Behind every survey result is a person who chose to share a perspective. Those individual voices make insight worth trusting.</p></article><article className="home-manifesto-card home-manifesto-card--technology"><span>Technology, in service</span><p>We use matching and real-time data to respect your time, show your impact, and keep every reward rule clear and fair.</p></article></div>
            <p className="home-manifesto-principle"><span>Our principle</span>Human-centered does not mean rejecting technology. It means making technology serve people.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-continuation-container home-footer-main">
        <div className="home-footer-brand"><div className="home-footer-identity"><img className="home-footer-logo-mark" src="/guanyisearch-brand-mark.png" alt="" aria-hidden="true" /><Logo size="lg" variant="light" className="home-footer-wordmark" /></div><p>A considered research space for participants and organisations: clear opportunities, credible input, and practical next steps.</p><a href="mailto:heguanyi@guanyi-media.com">Contact the team <ArrowRight size={16} /></a><nav className="home-social-links" aria-label="GuanyiSearch social links">{socialLinks.map((social) => <a key={social.id} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}><SocialGlyph id={social.id} /></a>)}</nav></div>
        <nav className="home-footer-nav" aria-label="Footer navigation">{footerGroups.map((group) => <section key={group.label}><p>{group.label}</p>{group.links.map((item) => item.href ? <a key={item.label} href={item.href}>{item.label}</a> : <Link key={item.label} to={item.to}>{item.label}</Link>)}</section>)}</nav>
      </div>
      <div className="home-continuation-container home-footer-bottom"><p>© 2026 GuanyiSearch. All rights reserved.</p><div><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link></div></div>
    </footer>
  );
}

export default function HomeLegacySections() {
  return (
    <div className="home-continuation">

      <section className="home-global-section" aria-labelledby="home-global-title">
        <div className="home-continuation-container home-global-layout">
          <div className="home-global-visual"><div className="home-globe-frame"><GlobalGlobe /></div></div>
          <div className="home-global-copy"><p className="home-section-label">GLOBAL PERSPECTIVE</p><h2 id="home-global-title">Research begins with people, in every context.</h2><p>A global view reminds us that every response comes from a different life, place, and point of view. The platform keeps each participation journey clear and considered from the first step to reward.</p></div>
        </div>
      </section>

      <section className="home-rewards-section" aria-labelledby="home-rewards-title">
        <div className="home-continuation-container home-rewards-layout">
          <div className="home-rewards-heading"><p className="home-section-label">REWARDS &amp; PANEL</p><h2 id="home-rewards-title">A little more to look forward to.</h2><p>Join the panel for surveys that value your time, special tasks, and clear reward opportunities.</p></div>
          <div className="home-reward-grid">
            <article className="home-reward-card home-reward-gift"><GiftSketch /><div><span>For everyday moments</span><h3>Gift cards</h3><p>Complete eligible surveys, build your Coins balance, and choose from selected gift-card rewards.</p></div></article>
            <article className="home-reward-card home-reward-token"><TokenSketch /><div><span>Where available</span><h3>Tokens</h3><p>In supported regions, selected token reward options can be part of your next redemption choice.</p></div></article>
            <article className="home-reward-card home-reward-panel"><CartSketch /><div><span>Inside the panel</span><h3>Special tasks</h3><p>From time to time, eligible members can receive an additional task and another way to earn Coins.</p></div></article>
          </div>
        </div>
      </section>

      <HomeFooter />
    </div>
  );
}
