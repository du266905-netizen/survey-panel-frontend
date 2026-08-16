import { ArrowRight, ClipboardList, UsersRound } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { HomeFooter } from '../components/HomeLegacySections';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { isBusinessRole } from '../utils/roles';
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
            <h1>Build a questionnaire. Share it. Learn from it.</h1>
            <p className="business-lede">Create a questionnaire for your own audience, or talk with us about respondent sourcing and tailored research.</p>
            <div className="business-hero-actions">
              <Link className="business-button" to="/business/register">Create a questionnaire <ArrowRight size={17} /></Link>
              <Link className="business-text-link" to="/business/access">Contact sales</Link>
            </div>
          </div>
          <div className="business-hero-visual" aria-hidden="true">
            <div className="business-brief-preview"><p>YOUR RESEARCH</p><strong>Clear questions. Useful answers.</strong><div><span>Build</span><b>Questionnaire editor</b></div><div><span>Share</span><b>A direct response link</b></div><div><span>Extend</span><b>Audience sourcing &amp; research support</b></div></div>
          </div>
        </div>
      </section>
      <section className="business-section business-section--soft">
        <div className="business-container">
          <p className="business-eyebrow">TWO WAYS TO START</p>
          <div className="business-service-grid">
            <article><ClipboardList size={24} /><h3>Create and share</h3><p>Build your questionnaire, publish it when ready, and send the link to people you already know.</p><Link className="business-text-link" to="/business/register">Create a questionnaire <ArrowRight size={15} /></Link></article>
            <article><UsersRound size={24} /><h3>Plan with a specialist</h3><p>Talk through respondent sourcing, research design, interviews, usability sessions, or a focused study.</p><Link className="business-text-link" to="/business/access">Contact sales <ArrowRight size={15} /></Link></article>
            <article><ArrowRight size={24} /><h3>Keep it in one place</h3><p>Use your workspace to keep questionnaires, links, response counts, and research projects together.</p></article>
          </div>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
