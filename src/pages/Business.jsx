import { ArrowRight, ClipboardList, UsersRound } from 'lucide-react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { isBusinessRole } from '../utils/roles';
import researchJourney from '../assets/business/research-journey.jpg';
import './Business.css';

function businessFallbackCopy(home) {
  const footer = home.footer;
  return {
    eyebrow: footer.organisations,
    title: home.nodes.business[0],
    lede: home.nodes.business[1],
    contact: footer.contact,
    signIn: footer.wallet,
    imageAlt: home.nodes.business[1],
    imageKicker: footer.organisations,
    imageTitle: home.evidenceStatement,
    help: footer.explore,
    services: [
      [footer.questionnaires, home.nodes.business[1], footer.contact],
      [footer.studies, home.globalBody, footer.contact],
      [footer.wallet, home.rewardsBody, footer.wallet],
    ],
  };
}

export default function Business() {
  const { user } = useAuth();
  const { language, publicCopy } = useLanguage();
  // Copy comes from the language library; the page-local map only covered
  // en-US / zh-CN / zh-Hant, so every other language fell back to the
  // public-home blurb.
  const landing = publicCopy?.workspace?.business?.businessLanding || {};
  const copy = landing[language] || landing['en-US'] || businessFallbackCopy(publicCopy.home);
  if (isBusinessRole(user?.role)) return <Navigate to="/business/workspace" replace />;

  return (
    <main className="business-public-page">
      <PublicSiteHeader />
      <section className="business-hero">
        <div className="business-container business-hero-layout">
          <div>
            <p className="business-eyebrow">{copy.eyebrow}</p>
            <h1>{copy.title}</h1>
            <p className="business-lede">{copy.lede}</p>
            <div className="business-hero-actions">
              <Link className="business-button" to={withLanguage('/business/access', language)}>{copy.contact} <ArrowRight size={17} /></Link>
              <Link className="business-text-link" to={withLanguage('/business/login', language)}>{copy.signIn}</Link>
            </div>
          </div>
          <div className="business-hero-visual">
            <img src={researchJourney} alt={copy.imageAlt} decoding="async" />
            <div className="business-hero-visual-copy"><p>{copy.imageKicker}</p><strong>{copy.imageTitle}</strong></div>
          </div>
        </div>
      </section>
      <section className="business-section business-section--soft">
        <div className="business-container">
          <p className="business-eyebrow">{copy.help}</p>
          <div className="business-service-grid">
            {copy.services.map(([title, body, action], index) => {
              const Icon = [ClipboardList, UsersRound, ArrowRight][index];
              const destination = index === 2 ? '/business/login' : '/business/access';
              return <article key={title}><Icon size={24} /><h3>{title}</h3><p>{body}</p><Link className="business-text-link" to={withLanguage(destination, language)}>{action} <ArrowRight size={15} /></Link></article>;
            })}
          </div>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
