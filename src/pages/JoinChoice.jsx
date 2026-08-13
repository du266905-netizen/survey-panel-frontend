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
          <h1>Make your next insight count.</h1>
          <p className="business-lede">Share your perspective in studies that suit you, or bring us a question worth answering.</p>
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
              <p>Start with a concise enquiry for a custom questionnaire or a tailored study, built around the decision your team needs to make.</p>
              <ul><li>Custom questionnaires, interviews, and usability sessions</li><li>Research shaped around your decision and audience</li><li>One workspace for project planning and progress</li></ul>
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
