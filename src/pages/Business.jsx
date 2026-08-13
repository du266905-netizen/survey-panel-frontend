import { ArrowRight, CheckCircle2, ClipboardPenLine, FileCheck2, UsersRound } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { HomeFooter } from '../components/HomeLegacySections';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { ResearchBriefArt } from '../components/ResearchLineArt';
import './Business.css';

const services = [
  ['Custom surveys', 'Collect clear feedback around a focused question.'],
  ['Interviews & usability', 'Talk with relevant people and learn how they actually decide.'],
  ['Community & social research', 'Plan respectful research with groups, nonprofits, and public-interest teams.'],
];

export default function Business() {
  const { user } = useAuth();
  if (user?.role === 'business') return <Navigate to="/business/workspace" replace />;

  return (
    <main className="business-public-page">
      <PublicSiteHeader />
      <section className="business-hero">
        <div className="business-container business-hero-layout">
          <div>
            <p className="business-eyebrow">BUSINESS RESEARCH</p>
            <h1>Start with the people who can move your question forward.</h1>
            <p className="business-lede">Tell us what you need to learn. We help shape the study, reach suitable participants, and keep the work clear from brief to delivery.</p>
            <div className="business-hero-actions"><Link className="business-button" to="/business/access">Start a project <ArrowRight size={17} /></Link><a className="business-text-link" href="#how-it-works">How it works</a></div>
          </div>
          <aside className="business-hero-visual" aria-label="Illustration of research collaboration">
            <ResearchBriefArt />
            <div className="business-brief-preview">
              <p>PROJECT BRIEF</p><strong>What should we learn before we move?</strong>
              <div><span>Audience</span><b>People relevant to your question</b></div>
              <div><span>Method</span><b>Survey, interview, or group discussion</b></div>
              <div><span>Next step</span><b>Human review &amp; tailored proposal</b></div>
            </div>
          </aside>
        </div>
      </section>
      <section id="how-it-works" className="business-section">
        <div className="business-container"><p className="business-eyebrow">A REAL STARTING POINT</p><h2>Not another abstract research promise.</h2><div className="business-steps">
          <article><ClipboardPenLine /><span>01</span><h3>Describe the question</h3><p>Create a brief with your goals, audience, format, timeline, and budget context.</p></article>
          <article><FileCheck2 /><span>02</span><h3>Receive a proposal</h3><p>We review the brief and clarify feasibility, scope, recruitment approach, and pricing.</p></article>
          <article><UsersRound /><span>03</span><h3>Run a clear project</h3><p>Approved work moves into a project workspace with visible progress and delivery steps.</p></article>
        </div></div>
      </section>
      <section className="business-section business-section--soft"><div className="business-container"><p className="business-eyebrow">WHAT WE CAN HELP WITH NOW</p><div className="business-service-grid">{services.map(([title, copy]) => <article key={title}><CheckCircle2 size={19} /><h3>{title}</h3><p>{copy}</p></article>)}</div></div></section>
      <section className="business-cta"><div className="business-container"><div><p className="business-eyebrow">READY WHEN THE QUESTION IS</p><h2>Bring the question. We’ll make the next step clear.</h2></div><Link className="business-button" to="/business/access">Start a project <ArrowRight size={17} /></Link></div></section>
      <HomeFooter />
    </main>
  );
}
