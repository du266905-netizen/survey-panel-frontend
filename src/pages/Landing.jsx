import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main className="bg-white text-slate-800 antialiased">
      <style>{`
        .public-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 40px;
        }

        .public-header {
          background: #ffffff;
          padding: 30px 0;
        }

        .public-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .public-logo {
          color: #0f172a;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          text-decoration: none;
        }

        .public-links {
          display: flex;
          gap: 40px;
          list-style: none;
        }

        .public-links a {
          color: #475569;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
        }

        .public-links a:hover {
          color: #000000;
        }

        .public-hero {
          padding: 120px 0 90px;
          text-align: center;
        }

        .public-hero h1 {
          max-width: 850px;
          margin: 0 auto 28px;
          color: #0f172a;
          font-size: 54px;
          font-weight: 800;
          letter-spacing: -1.5px;
          line-height: 1.15;
        }

        .public-hero p {
          max-width: 680px;
          margin: 0 auto 44px;
          color: #64748b;
          font-size: 20px;
          line-height: 1.625;
        }

        .public-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: #000000;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          padding: 16px 40px;
          text-decoration: none;
        }

        .public-cta:hover {
          background: #1e293b;
          transform: translateY(-2px);
        }

        .public-banner-section {
          margin: 40px auto 100px;
        }

        .public-banner-card {
          position: relative;
          display: flex;
          min-height: 480px;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 24px;
          background:
            linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)),
            url('/landing-celpax.jpg') center / cover no-repeat;
          padding: 40px;
        }

        .public-banner-content {
          max-width: 640px;
          color: #ffffff;
          text-align: center;
        }

        .public-banner-content h2 {
          margin-bottom: 20px;
          font-size: 42px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .public-banner-content p {
          font-size: 18px;
          line-height: 1.6;
          opacity: 0.95;
        }

        .public-split {
          padding: 90px 0;
        }

        .public-muted {
          border-bottom: 1px solid #e2e8f0;
          border-top: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .public-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .public-tag {
          display: block;
          margin-bottom: 16px;
          color: #2563eb;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .public-title {
          margin-bottom: 24px;
          color: #0f172a;
          font-size: 38px;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.2;
        }

        .public-copy {
          margin-bottom: 20px;
          color: #64748b;
          font-size: 16px;
          line-height: 1.625;
        }

        .public-image {
          overflow: hidden;
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
        }

        .public-image img {
          display: block;
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
        }

        .public-footer {
          margin-top: 60px;
          background: #0f172a;
          color: #94a3b8;
          padding: 80px 0 40px;
        }

        .public-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 60px;
          margin-bottom: 60px;
        }

        .public-footer h2 {
          margin-bottom: 16px;
          color: #ffffff;
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
        }

        .public-footer h3 {
          margin-bottom: 18px;
          color: #3b82f6;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .public-footer p {
          max-width: 440px;
          color: #94a3b8;
          font-size: 15px;
          line-height: 1.625;
        }

        .public-mail {
          color: #ffffff;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none;
        }

        .public-mail:hover {
          color: #3b82f6;
          text-decoration: underline;
        }

        .public-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid #1e293b;
          padding-top: 40px;
          font-size: 14px;
        }

        .public-footer-links {
          display: flex;
          gap: 24px;
        }

        .public-footer-links a {
          color: #94a3b8;
          text-decoration: none;
        }

        .public-footer-links a:hover {
          color: #ffffff;
        }

        @media (max-width: 968px) {
          .public-container {
            padding: 0 24px;
          }

          .public-links {
            display: none;
          }

          .public-hero {
            padding: 82px 0 56px;
          }

          .public-hero h1 {
            font-size: 36px;
          }

          .public-hero p {
            font-size: 17px;
          }

          .public-banner-card {
            min-height: 360px;
          }

          .public-banner-content h2 {
            font-size: 30px;
          }

          .public-grid,
          .public-footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .public-footer-bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>

      <header className="public-header">
        <div className="public-container public-nav">
          <Link className="public-logo" to="/">
            GUANYISEARCH
          </Link>
          <ul className="public-links">
            <li>
              <a href="#about">About Our Panel</a>
            </li>
            <li>
              <a href="#rewards">Rewards & Benefits</a>
            </li>
            <li>
              <a href="#network">Global Network</a>
            </li>
          </ul>
        </div>
      </header>

      <section className="public-hero">
        <div className="public-container">
          <h1>
            Your Voice Matters.
            <br />
            Your Opinion Shapes the World.
          </h1>
          <p>
            Guanyisearch connects real human perspectives with leading global media strategy. Every insight you provide fuels analytical research
            that shapes tomorrow&apos;s marketplace.
          </p>
          <Link className="public-cta" to="/login">
            Begin Survey Portal
          </Link>
        </div>
      </section>

      <section id="about" className="public-container public-banner-section">
        <div className="public-banner-card">
          <div className="public-banner-content">
            <h2>How was your day?</h2>
            <p>
              We believe every meaningful insight starts with personal reflection. Share your daily observations and consumer trends to help refine
              our international dataset, and get recognized for your time.
            </p>
          </div>
        </div>
      </section>

      <section id="rewards" className="public-split public-muted">
        <div className="public-container public-grid">
          <div>
            <span className="public-tag">Value Your Time</span>
            <h2 className="public-title">Turn Your Perspectives Into Premium Earnings</h2>
            <p className="public-copy">
              Your expertise is worth more than a generic thank-you. At Guanyisearch, we treat our panelists as critical data co-creators.
              Participate in tailored, high-fidelity questionnaires designed around your industry lifestyle.
            </p>
            <p className="public-copy">
              Every fully completed session directly adds to your tiered account balance. Enjoy transparent payouts, consistent survey options, and
              a platform that rewards your accuracy with scalable bonuses.
            </p>
          </div>
          <div className="public-image">
            <img src="/landing-rewards.jpg" alt="Earn rewards with Guanyisearch" />
          </div>
        </div>
      </section>

      <section id="network" className="public-split">
        <div className="public-container public-grid">
          <div className="public-image">
            <img src="/landing-network.jpg" alt="Join our global research network" />
          </div>
          <div>
            <span className="public-tag">Empowerment</span>
            <h2 className="public-title">Join a Global Collective of Thought Leaders</h2>
            <p className="public-copy">
              When you join our survey ecosystem, you&apos;re stepping into an elite global circle. Our contributors span multiple continents,
              industries, and creative domains, forming a powerhouse repository of actionable public metrics.
            </p>
            <p className="public-copy">
              See the direct ripple effect of your submitted data. Monitor macro trends, gain early access to curated analytical findings, and see
              how your single voice shapes mainstream corporate directions.
            </p>
          </div>
        </div>
      </section>

      <footer className="public-footer">
        <div className="public-container public-footer-grid">
          <div>
            <h2>GUANYISEARCH</h2>
            <p>
              A trusted baseline for international media assessment and public metric intelligence. We bridge consumer feedback and enterprise
              positioning through rigorous validation.
            </p>
          </div>
          <div>
            <h3>Contact & Inquiries</h3>
            <p className="mb-2 text-slate-300">Have questions regarding your panel eligibility? Reach us at:</p>
            <a className="public-mail" href="mailto:heguanyi@guanyi-media.com">
              heguanyi@guanyi-media.com
            </a>
          </div>
        </div>
        <div className="public-container public-footer-bottom">
          <p>&copy; 2026 GUANYISEARCH. All Rights Reserved.</p>
          <div className="public-footer-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
