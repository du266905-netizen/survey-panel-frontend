import { ArrowRight, BadgeCheck, ShieldCheck, UserRoundCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const standards = [
  ['Clear eligibility', 'A transparent start helps people understand how participation begins and what comes next.', BadgeCheck],
  ['Respectful privacy', 'Information is collected only when it has a clear purpose in the research experience.', ShieldCheck],
  ['Visible records', 'Participation, rewards, and account progress stay easy to understand at every step.', UserRoundCheck],
];

const panelistSteps = [
  ['01', 'Create your account', 'Use Google or your email, then verify the account and accept the platform terms.'],
  ['02', 'Complete your profile', 'Tell us the basics so available research can be matched more thoughtfully.'],
  ['03', 'Track your rewards', 'Keep wallet activity, records, and redemption requests in one place.'],
];

export default function HowItWorks() {
  return (
    <main className="how-page">
      <style>{`
        .how-page { min-width: 320px; background: #171716; color: #efede7; font-family: var(--font-sans); }
        .how-shell { overflow: hidden; background: radial-gradient(circle at 78% 8%, rgba(255,255,255,.035), transparent 24%), linear-gradient(180deg, #1a1a19 0%, #151514 72%, #121211 100%); }
        .how-container { width: min(100% - 48px, 1240px); margin: 0 auto; }
        .how-nav { display: flex; align-items: center; justify-content: space-between; gap: 26px; border-bottom: 1px solid rgba(244,241,232,.13); padding: 26px 0; }
        .how-nav-brand { display: inline-flex; }
        .how-nav-links { display: flex; align-items: center; justify-content: flex-end; gap: 22px; }
        .how-nav-links a { color: rgba(239,237,231,.62); font-size: 13px; font-weight: 780; text-decoration: none; }
        .how-nav-links a:hover, .how-nav-links a.is-active { color: #fff; }
        .how-nav-links .how-nav-cta { border: 1px solid rgba(244,241,232,.23); border-radius: 999px; color: #fff; padding: 9px 14px; }
        .how-hero { display: grid; grid-template-columns: minmax(0,1.05fr) minmax(280px,.65fr); gap: clamp(38px, 9vw, 130px); align-items: end; min-height: 510px; padding: clamp(70px, 9vw, 132px) 0 clamp(76px, 8vw, 110px); }
        .how-kicker { margin: 0; color: #beb5a5; font-size: 11px; font-weight: 900; letter-spacing: .18em; text-transform: uppercase; }
        .how-hero h1 { max-width: 760px; margin: 17px 0 0; color: var(--color-paper); font-family: var(--font-serif); font-size: clamp(53px, 6.4vw, 92px); font-weight: 800; letter-spacing: -.06em; line-height: .94; }
        .how-hero > p { max-width: 420px; margin: 0 0 5px; color: rgba(236,233,226,.66); font-size: 17px; line-height: 1.86; }
        .how-platform { border-top: 1px solid rgba(244,241,232,.15); background: #181817; padding: clamp(72px, 8vw, 120px) 0; }
        .how-platform-head { display: grid; grid-template-columns: minmax(0,.9fr) minmax(0,1.1fr); gap: clamp(42px, 9vw, 138px); align-items: start; }
        .how-platform-head h2, .how-panelist-head h2 { max-width: 620px; margin: 15px 0 0; color: var(--color-paper); font-family: var(--font-serif); font-size: clamp(38px, 4.7vw, 67px); font-weight: 800; letter-spacing: -.048em; line-height: 1.0; }
        .how-platform-head > p, .how-panelist-head > p { max-width: 545px; margin: 8px 0 0; color: rgba(236,233,226,.66); font-size: 16px; line-height: 1.87; }
        .how-photo-grid { display: grid; grid-template-columns: 1.08fr .92fr; gap: 16px; margin-top: clamp(46px, 6vw, 82px); }
        .how-photo { position: relative; min-height: 350px; overflow: hidden; border-radius: 22px; background: #222220; }
        .how-photo.is-wide { grid-column: 1 / -1; min-height: 380px; }
        .how-photo img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: transform .8s cubic-bezier(.2,.7,.2,1); }
        .how-photo:hover img { transform: scale(1.035); }
        .how-photo:after { position: absolute; inset: 0; background: linear-gradient(180deg, transparent 42%, rgba(18,18,17,.86) 100%); content: ''; }
        .how-photo-caption { position: absolute; z-index: 1; right: 22px; bottom: 22px; left: 22px; }
        .how-photo-caption p { margin: 0; color: #cfc3a5; font-size: 10px; font-weight: 900; letter-spacing: .16em; text-transform: uppercase; }
        .how-photo-caption strong { display: block; max-width: 580px; margin-top: 7px; color: #fff; font-size: clamp(18px, 2vw, 25px); line-height: 1.2; }
        .how-standards { background: #1d1d1c; border-top: 1px solid rgba(244,241,232,.12); border-bottom: 1px solid rgba(244,241,232,.12); padding: clamp(76px, 8vw, 124px) 0; }
        .how-standards-grid { display: grid; grid-template-columns: minmax(0,.8fr) minmax(0,1.2fr); gap: clamp(42px, 9vw, 130px); }
        .how-standards-copy h2 { max-width: 515px; margin: 14px 0 0; color: var(--color-paper); font-family: var(--font-serif); font-size: clamp(37px, 4.3vw, 61px); font-weight: 800; letter-spacing: -.045em; line-height: 1.03; }
        .how-standards-copy > p { max-width: 465px; color: rgba(236,233,226,.66); font-size: 16px; line-height: 1.85; }
        .how-standard-list { display: grid; border-top: 1px solid rgba(244,241,232,.2); }
        .how-standard { display: grid; grid-template-columns: 48px 1fr; gap: 18px; border-bottom: 1px solid rgba(244,241,232,.2); padding: 25px 0; }
        .how-standard-icon { display: grid; width: 40px; height: 40px; place-items: center; border: 1px solid rgba(244,241,232,.24); border-radius: 50%; color: #efede7; }
        .how-standard h3 { margin: 1px 0 0; color: #fff; font-size: 18px; }
        .how-standard p { max-width: 500px; margin: 8px 0 0; color: rgba(236,233,226,.63); font-size: 14px; line-height: 1.72; }
        .how-panelists { background: #171716; padding: clamp(76px, 9vw, 132px) 0; }
        .how-panelist-head { max-width: 680px; }
        .how-panelist-head > p { margin-top: 18px; }
        .how-steps { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 16px; margin-top: 54px; }
        .how-step { min-height: 220px; border: 1px solid rgba(244,241,232,.14); border-radius: 19px; background: linear-gradient(145deg, #232321, #1c1c1b); padding: 25px; }
        .how-step > span { color: #beb5a5; font-size: 12px; font-weight: 900; letter-spacing: .12em; }
        .how-step h3 { margin: 49px 0 0; color: #fff; font-size: 19px; }
        .how-step p { margin: 10px 0 0; color: rgba(236,233,226,.63); font-size: 14px; line-height: 1.72; }
        .how-reward { position: relative; min-height: 405px; overflow: hidden; border-radius: 24px; background: #1d1d1c; margin-top: 70px; }
        .how-reward img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .52; }
        .how-reward:after { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(20,20,19,.94), rgba(20,20,19,.3)); content: ''; }
        .how-reward-copy { position: relative; z-index: 1; max-width: 560px; padding: clamp(38px, 6vw, 78px); }
        .how-reward-copy h2 { margin: 14px 0 0; color: #fff; font-family: var(--font-serif); font-size: clamp(35px, 4.3vw, 58px); font-weight: 800; letter-spacing: -.045em; line-height: 1.02; }
        .how-reward-copy > p { color: rgba(238,235,228,.69); font-size: 16px; line-height: 1.82; }
        .how-reward-copy a { display: inline-flex; align-items: center; gap: 8px; border: 1px solid rgba(244,241,232,.22); border-radius: 999px; background: #f3efe4; color: #111; font-size: 14px; font-weight: 850; text-decoration: none; padding: 13px 18px; }
        .how-footer { border-top: 1px solid rgba(244,241,232,.12); padding: 30px 0; }
        .how-footer-row { display: flex; align-items: center; justify-content: space-between; gap: 20px; }
        .how-footer-row p { margin: 0; color: rgba(235,232,225,.48); font-size: 12px; }
        .how-footer-row a { color: rgba(238,235,228,.64); font-size: 12px; font-weight: 800; text-decoration: none; }
        @media (max-width: 760px) { .how-container { width: min(100% - 40px, 1240px); } .how-nav { align-items: flex-start; flex-direction: column; gap: 18px; } .how-nav-links { width: 100%; justify-content: flex-start; gap: 15px; } .how-nav-links a { font-size: 12px; } .how-nav-links .how-nav-cta { margin-left: auto; } .how-hero, .how-platform-head, .how-standards-grid { grid-template-columns: 1fr; gap: 28px; } .how-hero { min-height: 0; padding: 76px 0; } .how-hero h1 { font-size: clamp(48px, 14vw, 68px); } .how-hero > p { margin: 0; font-size: 15px; } .how-photo-grid { grid-template-columns: 1fr; } .how-photo, .how-photo.is-wide { grid-column: auto; min-height: 320px; } .how-steps { grid-template-columns: 1fr; gap: 12px; margin-top: 38px; } .how-step { min-height: 0; } .how-step h3 { margin-top: 26px; } .how-reward { min-height: 490px; margin-top: 46px; } .how-reward-copy { padding: 44px 28px; } .how-footer-row { align-items: flex-start; flex-direction: column; } }
      `}</style>

      <section className="how-shell">
        <header className="how-container how-nav">
          <Link className="how-nav-brand" to="/" aria-label="GuanyiSearch home"><Logo size="md" variant="light" /></Link>
          <nav className="how-nav-links" aria-label="Public navigation">
            <Link to="/">Home</Link>
            <Link to="/news">News Wall</Link>
            <Link className="is-active" to="/how-it-works">How it works</Link>
            <Link className="how-nav-cta" to="/register">Create account</Link>
          </nav>
        </header>

        <section className="how-container how-hero">
          <div><p className="how-kicker">GuanyiSearch / How it works</p><h1>From a verified account to a clear reward record.</h1></div>
          <p>A considered path for account creation, profile completion, research participation, and visible records—built without exposing internal provider operations to members.</p>
        </section>
      </section>

      <section className="how-platform">
        <div className="how-container">
          <div className="how-platform-head"><div><p className="how-kicker">One operating foundation</p><h2>Thoughtful systems start with clear human context.</h2></div><p>Panelists get a focused journey for registration, profile completion, surveys, records, and wallet activity. Operations teams get the context they need to diagnose delivery without exposing internal provider details to members.</p></div>
          <div className="how-photo-grid">
            <article className="how-photo"><img src="/research-operations.jpg" alt="Research team collaborating around a planning board" /><div className="how-photo-caption"><p>Research operations</p><strong>Understand the people and signals behind every program.</strong></div></article>
            <article className="how-photo"><img src="/panelist-mobile.jpg" alt="Person using a smartphone beside a tablet" /><div className="how-photo-caption"><p>Panelist reality</p><strong>Designed around people, not faceless traffic.</strong></div></article>
            <article className="how-photo is-wide"><img src="/global-audience.jpg" alt="People walking through a city intersection" /><div className="how-photo-caption"><p>Global perspective</p><strong>Research begins with different lives, places, and points of view.</strong></div></article>
          </div>
        </div>
      </section>

      <section className="how-standards">
        <div className="how-container how-standards-grid">
          <div className="how-standards-copy"><p className="how-kicker">Research standards</p><h2>Research works better when people know where they stand.</h2><p>The experience is built around clear eligibility, respectful privacy, and visible records—so every person can take part with confidence.</p></div>
          <div className="how-standard-list">{standards.map(([title, body, Icon]) => <article key={title} className="how-standard"><span className="how-standard-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{body}</p></div></article>)}</div>
        </div>
      </section>

      <section className="how-container how-panelists">
        <div className="how-panelist-head"><p className="how-kicker">For panelists</p><h2>A simple journey with a visible record of value.</h2><p>There is no need to navigate a maze of disconnected tools. Your account, verification, profile, participation history, and rewards all begin in one place.</p></div>
        <div className="how-steps">{panelistSteps.map(([number, title, body]) => <article key={number} className="how-step"><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
        <article className="how-reward"><img src="/rewards-wallet.jpg" alt="Rewards and digital participation" /><div className="how-reward-copy"><p className="how-kicker">Reward infrastructure</p><h2>Your wallet should be understandable at a glance.</h2><p>Follow coins, transactions, and redemption requests in a single place as the reward system expands.</p><Link to="/register">Create your account <ArrowRight size={17} /></Link></div></article>
      </section>

      <footer className="how-footer"><div className="how-container how-footer-row"><p>© 2026 GuanyiSearch. All rights reserved.</p><Link to="/">Back to home <ArrowRight size={14} /></Link></div></footer>
    </main>
  );
}
