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
            <h1>Research built around a decision.</h1>
            <p className="business-lede">Custom questionnaires and tailored studies for teams that need credible evidence before they act. Start with a concise enquiry; scope and next steps are reviewed with you.</p>
            <div className="business-hero-actions"><Link className="business-button" to="/business/access">Discuss a project <ArrowRight size={17} /></Link><a className="business-text-link" href="#how-it-works">How it works</a></div>
          </div>
          <aside className="business-hero-visual" aria-label="Illustration of research collaboration">
            <div className="business-brief-preview">
              <p>RESEARCH OUTLINE</p><strong>Evidence before the next decision.</strong>
              <div><span>Service</span><b>Custom questionnaire or tailored study</b></div>
              <div><span>Scope</span><b>Audience, method, and timing</b></div>
              <div><span>Next step</span><b>Review the right approach together</b></div>
            </div>
          </aside>
        </div>
      </section>
      <section id="how-it-works" className="business-section">
        <div className="business-container"><p className="business-eyebrow">HOW IT STARTS</p><h2>A practical route from question to research plan.</h2><div className="business-steps">
          <article><ClipboardPenLine /><span>01</span><h3>Share the decision</h3><p>Outline the decision, audience, region, and evidence you need to move forward.</p></article>
          <article><FileCheck2 /><span>02</span><h3>Scope the right method</h3><p>We review whether a questionnaire, interview, usability session, or discussion fits the work.</p></article>
          <article><UsersRound /><span>03</span><h3>Manage the project</h3><p>Once agreed, project status and the next confirmed step are visible in one workspace.</p></article>
        </div></div>
      </section>
      <section className="business-section business-section--soft"><div className="business-container"><p className="business-eyebrow">SERVICES</p><div className="business-service-grid">{services.map(([title, copy]) => <article key={title}><CheckCircle2 size={19} /><h3>{title}</h3><p>{copy}</p></article>)}</div><figure className="business-editorial-illustration"><img src={researchCollaboration} alt="Two people discussing research feedback" loading="lazy" decoding="async" /><figcaption><span>START WITH A CONVERSATION</span><strong>Good research begins with a clear decision and the people who can inform it.</strong></figcaption></figure></div></section>
      <section className="business-cta"><div className="business-container"><div><p className="business-eyebrow">START A CONVERSATION</p><h2>Tell us the decision. We’ll help define the research.</h2></div><Link className="business-button" to="/business/access">Discuss a project <ArrowRight size={17} /></Link></div></section>
      <HomeFooter />
    </main>
  );
}
