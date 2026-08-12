import { ArrowRight, BriefcaseBusiness, CircleUserRound, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomeFooter } from '../components/HomeLegacySections';
import PublicSiteHeader from '../components/PublicSiteHeader';
import './Business.css';

export default function JoinChoice() {
  return (
    <main className="business-public-page join-choice-page">
      <PublicSiteHeader />
      <section className="join-choice-hero">
        <div className="business-container">
          <p className="business-eyebrow">ONE PLATFORM, TWO CLEAR PATHS</p>
          <h1>Choose how you want to take part.</h1>
          <p className="business-lede">Whether you are sharing a perspective or starting a study, you will always know what happens next.</p>
          <div className="join-choice-grid">
            <article className="join-choice-card join-choice-card--participant">
              <span className="join-choice-icon"><CircleUserRound size={26} strokeWidth={1.6} /></span>
              <p>FOR INDIVIDUALS</p>
              <h2>Join as a participant</h2>
              <p>Discover real opportunities, decide what feels right for you, and earn clear rewards for your time.</p>
              <ul><li>Browse suitable opportunities</li><li>See time, requirements, and reward first</li><li>Keep your information private</li></ul>
              <Link to="/register" className="business-button business-button--dark">Join as a participant <ArrowRight size={17} /></Link>
            </article>
            <article className="join-choice-card join-choice-card--business">
              <span className="join-choice-icon"><BriefcaseBusiness size={26} strokeWidth={1.6} /></span>
              <p>FOR ORGANIZATIONS &amp; RESEARCHERS</p>
              <h2>Run research with us</h2>
              <p>Bring a real question. Build a clear project brief and receive a tailored research proposal from our team.</p>
              <ul><li>Custom surveys, interviews, and group discussions</li><li>Human review and tailored proposal</li><li>Projects, status, and delivery in one workspace</li></ul>
              <Link to="/business" className="business-button">Run research with us <ArrowRight size={17} /></Link>
            </article>
          </div>
          <p className="join-choice-note"><ShieldCheck size={16} /> Participant information is never presented as a product. Research projects are reviewed before recruitment begins.</p>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
