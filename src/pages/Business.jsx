import { ArrowRight, CheckCircle2, ClipboardPenLine, FileCheck2, UsersRound } from 'lucide-react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { HomeFooter } from '../components/HomeLegacySections';
import PublicSiteHeader from '../components/PublicSiteHeader';
import researchCollaboration from '../assets/illustrations/research-collaboration.jpg';
import { isBusinessRole } from '../utils/roles';
import './Business.css';

const services = [
  ['Custom questionnaires', 'A focused questionnaire with clear question formats, respondent flow, and a review before fieldwork.'],
  ['Tailored research', 'Interviews, usability sessions, or group discussion scoped around the decision you need to make.'],
  ['Research planning', 'A practical route from objective to method, audience, timing, and an agreed next step.'],
];

export default function Business() {
  const { user } = useAuth();
  if (isBusinessRole(user?.role)) return <Navigate to="/business/workspace" replace />;

  return (
    <main className="business-public-page">
      <PublicSiteHeader />
      <section className="business-hero">
        <div className="business-container business-hero-layout">
          <div>
            <p className="business-eyebrow">BUSINESS RESEARCH</p>
            <h1>Custom questionnaires and research, built around your next decision.</h1>
            <p className="business-lede">Choose a structured questionnaire or a tailored study. We review the objective, method, and practical scope with you before work begins.</p>
            <div className="business-hero-actions"><Link className="business-button" to="/business/access">Open research workspace <ArrowRight size={17} /></Link><a className="business-text-link" href="#how-it-works">Our approach</a></div>
          </div>
          <aside className="business-hero-visual" aria-label="Illustration of research collaboration">
            <div className="business-brief-preview">
              <p>RESEARCH REQUEST</p><strong>Choose the right format for the decision ahead.</strong>
              <div><span>Option one</span><b>Custom questionnaire</b></div>
              <div><span>Option two</span><b>Tailored research study</b></div>
              <div><span>Next step</span><b>Scope review and clear plan</b></div>
            </div>
          </aside>
        </div>
      </section>
      <section id="how-it-works" className="business-section">
        <div className="business-container"><p className="business-eyebrow">HOW WORK BEGINS</p><h2>Pick the format. Make the scope clear.</h2><div className="business-steps">
          <article><ClipboardPenLine /><span>01</span><h3>Choose a route</h3><p>Start a custom questionnaire for structured feedback, or a tailored study for deeper qualitative work.</p></article>
          <article><FileCheck2 /><span>02</span><h3>Define the brief</h3><p>Set the decision, audience, timing, regions, and any practical constraints in one request.</p></article>
          <article><UsersRound /><span>03</span><h3>Review the plan</h3><p>We confirm the workable method and scope before the project progresses in your workspace.</p></article>
        </div></div>
      </section>
      <section className="business-section business-section--soft"><div className="business-container"><p className="business-eyebrow">WHAT WE CAN HELP WITH NOW</p><div className="business-service-grid">{services.map(([title, copy]) => <article key={title}><CheckCircle2 size={19} /><h3>{title}</h3><p>{copy}</p></article>)}</div><figure className="business-editorial-illustration"><img src={researchCollaboration} alt="Two people discussing research feedback" loading="lazy" decoding="async" /><figcaption><span>START WITH A CONVERSATION</span><strong>Good research begins with a clear question and the people who can answer it.</strong></figcaption></figure></div></section>
      <section className="business-cta"><div className="business-container"><div><p className="business-eyebrow">START A PROJECT</p><h2>Choose a questionnaire or a tailored study.</h2></div><Link className="business-button" to="/business/access">Open research workspace <ArrowRight size={17} /></Link></div></section>
      <HomeFooter />
    </main>
  );
}
