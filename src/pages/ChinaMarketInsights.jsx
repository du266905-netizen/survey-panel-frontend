import { ArrowRight, ClipboardPenLine, MapPinned, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { HomeFooter } from '../components/HomeLegacySections';
import PublicSiteHeader from '../components/PublicSiteHeader';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import forbiddenCity from '../assets/china-market/beijing-forbidden-city.jpg';
import beijingSkyline from '../assets/china-market/beijing-skyline.jpg';
import './ChinaMarketInsights.css';

const capabilities = [
  {
    icon: ClipboardPenLine,
    title: 'Tier 1 to Tier 4 reach',
    body: 'Plan research across China’s major centres and lower-tier markets, with local context built into multi-city and continuous fieldwork.',
  },
  {
    icon: MapPinned,
    title: 'Mature network, specific audiences',
    body: 'Reach a high-quality respondent community and recruit for defined segments—from new mothers and senior internet users to business leaders and niche communities.',
  },
  {
    icon: ShieldCheck,
    title: 'Real data, manual quality control',
    body: 'Every project is reviewed from source to delivery. We reject bot data and use hands-on local quality checks to protect the reliability of the evidence.',
  },
];

const steps = [
  ['01', 'Set the market question', 'Clarify the decision, audience, locations and timing that matter to your team.'],
  ['02', 'Build the local fieldwork route', 'Match the project with the right method, local network and quality-control plan.'],
  ['03', 'Turn evidence into a next move', 'Receive real responses and an actionable China market recommendation for your organisation.'],
];

export default function ChinaMarketInsights() {
  const { language } = useLanguage();

  return (
    <main className="china-market-page">
      <PublicSiteHeader heroOverlay />
      <section className="china-market-hero">
        <div className="china-market-container china-market-hero-layout">
          <div className="china-market-hero-copy">
            <p className="china-market-kicker">CHINA MARKET INSIGHT CAPABILITY</p>
            <h1>Real local reach for clearer China market decisions.</h1>
            <p>A mature research network and high-quality respondent community help organisations reach real people across China’s Tier 1 to Tier 4 cities—then turn evidence into a practical next move.</p>
            <div className="china-market-actions">
              <Link className="china-market-button" to={withLanguage('/business/access', language)}>Discuss a China research brief <ArrowRight size={17} /></Link>
              <Link className="china-market-link" to={withLanguage('/business', language)}>Explore research services</Link>
            </div>
          </div>
          <figure className="china-market-hero-image" aria-hidden="true">
            <img src={beijingSkyline} alt="Beijing skyline at dusk" decoding="async" />
          </figure>
        </div>
      </section>

      <section className="china-market-context" aria-labelledby="china-market-statement-title">
        <div className="china-market-container china-market-context-grid">
          <figure className="china-market-context-image"><img src={forbiddenCity} alt="View over Beijing's Forbidden City" loading="lazy" decoding="async" /></figure>
          <div>
            <p className="china-market-kicker">MORE THAN A MARKET LABEL</p>
            <h2 id="china-market-statement-title">China is not one consumer story.</h2>
            <p>Consumer expectations, language, media, retail, technology and daily life shift between cities, regions and communities. We do not stop at raw data: we connect what people say with the local setting around a decision, helping teams enter, grow or reposition in China with fewer costly blind spots.</p>
          </div>
        </div>
      </section>

      <section className="china-market-capabilities" aria-labelledby="china-market-capabilities-title">
        <div className="china-market-container">
          <div className="china-market-section-heading"><p className="china-market-kicker">EXECUTION CAPABILITY</p><h2 id="china-market-capabilities-title">Built for China’s scale, detail and pace.</h2></div>
          <div className="china-market-capability-grid">
            {capabilities.map(({ icon: Icon, title, body }, index) => <article key={title}><Icon size={23} strokeWidth={1.65} /><h3><span>{String(index + 1).padStart(2, '0')}</span>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="china-market-route" aria-labelledby="china-market-route-title">
        <div className="china-market-container china-market-route-layout">
          <div><p className="china-market-kicker">FROM QUESTION TO NEXT STEP</p><h2 id="china-market-route-title">From fieldwork to a useful market move.</h2><p className="china-market-route-promise">Preliminary data can be delivered within 48 hours when the agreed project scope supports it.</p></div>
          <ol>
            {steps.map(([number, title, body]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="china-market-cta">
        <div className="china-market-container">
          <div><p className="china-market-kicker">REAL PEOPLE · REAL INSIGHT</p><h2>Bring the China market question your team is weighing.</h2><p>Share the decision, people and market context involved. We will build the right research route—not a generic template—and help turn the result into a practical recommendation.</p></div>
          <Link className="china-market-button china-market-button--light" to={withLanguage('/business/access', language)}>Contact the research team <ArrowRight size={17} /></Link>
        </div>
      </section>
      <HomeFooter />
    </main>
  );
}
