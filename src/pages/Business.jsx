import { ArrowRight, ClipboardList, UsersRound } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { HomeFooter } from '../components/HomeLegacySections';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { isBusinessRole } from '../utils/roles';
import researchJourney from '../assets/business/research-journey.jpg';
import './Business.css';

export default function Business() {
  const { user } = useAuth();
  if (isBusinessRole(user?.role)) return <Navigate to="/business/workspace" replace />;

  return (
    <main className="business-public-page">
      <PublicSiteHeader />
      <section className="business-hero">
        <div className="business-container business-hero-layout">
          <div>
            <p className="business-eyebrow">RESEARCH FOR TEAMS</p>
            <h1>Turn a decision into research.</h1>
            <p className="business-lede">Tell us what you need to understand. We help shape the questionnaire, research plan, and next practical step.</p>
            <div className="business-hero-actions">
              <Link className="business-button" to="/business/access">Contact sales <ArrowRight size={17} /></Link>
              <Link className="business-text-link" to="/business/login">Client sign in</Link>
            </div>
          </div>
          <div className="business-hero-visual">
            <img src={researchJourney} alt="A journey beginning along an open road" decoding="async" />
            <div className="business-hero-visual-copy"><p>YOUR RESEARCH</p><strong>A clear brief is where good research begins.</strong></div>
          </div>
        </div>
      </section>
      <section className="business-section business-section--soft">
        <div className="business-container">
          <p className="business-eyebrow">HOW WE CAN HELP</p>
          <div className="business-service-grid">
            <article><ClipboardList size={24} /><h3>Questionnaire design</h3><p>Bring the decision and the people who matter. We prepare a focused questionnaire for the project.</p><Link className="business-text-link" to="/business/access">Discuss a questionnaire <ArrowRight size={15} /></Link></article>
            <article><UsersRound size={24} /><h3>Custom research</h3><p>Plan a study with the right format, participant approach, timing, and agreed research deliverables.</p><Link className="business-text-link" to="/business/access">Contact sales <ArrowRight size={15} /></Link></article>
            <article><ArrowRight size={24} /><h3>One project workspace</h3><p>Keep your briefs, confirmed proposals, progress, and next steps together after you become a client.</p><Link className="business-text-link" to="/business/login">Client sign in <ArrowRight size={15} /></Link></article>
          </div>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
