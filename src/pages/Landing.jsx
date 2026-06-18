import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <main className="landing-page">
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        .landing-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #00140a url('/hero.jpg') center / cover no-repeat;
        }

        .landing-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(to bottom, rgba(0, 0, 0, 0.15), rgba(0, 20, 10, 0.65));
        }

        .landing-nav {
          position: absolute;
          top: 0;
          right: 0;
          left: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
        }

        .landing-brand {
          color: #ffffff;
          font-size: 20px;
          font-weight: 300;
          letter-spacing: 0.08em;
        }

        .landing-signin {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 24px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 8px;
          background: transparent;
          color: #ffffff;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .landing-signin:hover {
          background: rgba(255, 255, 255, 0.15);
        }

        .landing-content {
          position: absolute;
          bottom: 12%;
          left: 6%;
          z-index: 10;
          max-width: 680px;
        }

        .landing-eyebrow {
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .landing-headline {
          margin-top: 12px;
          color: #ffffff;
          font-size: 56px;
          font-weight: 300;
          line-height: 1.15;
        }

        .landing-subtitle {
          max-width: 560px;
          margin-top: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 16px;
          font-weight: 300;
        }

        .landing-stats {
          display: flex;
          gap: 20px;
          margin-top: 40px;
        }

        .landing-stat-card {
          flex: 1;
          padding: 20px 24px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
          text-align: center;
          transition: all 0.3s ease;
        }

        .landing-stat-card:hover {
          border-color: rgba(255, 255, 255, 0.4);
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-4px);
        }

        .landing-stat-number {
          color: #ffffff;
          font-size: 28px;
          font-weight: 600;
          display: block;
        }

        .landing-stat-label {
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-top: 8px;
        }

        .landing-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 28px;
          padding: 14px 36px;
          border: none;
          border-radius: 10px;
          background: #22c55e;
          color: #ffffff;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.03em;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .landing-cta:hover {
          background: #16a34a;
          transform: scale(1.02);
        }

        .landing-circle {
          position: absolute;
          right: -80px;
          bottom: -80px;
          z-index: 0;
          width: 400px;
          height: 400px;
          border-radius: 9999px;
          background: rgba(34, 197, 94, 0.08);
          filter: blur(60px);
          animation: pulse 5s infinite;
        }

        .landing-footer {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32px;
          padding: 24px 48px;
          background: rgba(0, 20, 10, 0.4);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .landing-footer a {
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .landing-footer a:hover {
          color: #ffffff;
        }

        .landing-stats {
          flex-direction: column;
        }

        @media (max-width: 720px) {
          .landing-nav {
            padding: 20px 24px;
          }

          .landing-content {
            right: 24px;
            bottom: 10%;
            left: 24px;
          }

          .landing-headline {
            font-size: 42px;
          }

          .landing-stats {
            flex-direction: row;
            gap: 12px;
          }

          .landing-stat-card {
            padding: 16px 12px;
          }

          .landing-stat-number {
            font-size: 20px;
          }

          .landing-footer {
            flex-direction: column;
            gap: 16px;
            padding: 16px 24px;
          }
        }
      `}</style>

      <div className="landing-overlay" aria-hidden="true" />
      <div className="landing-circle" aria-hidden="true" />

      <nav className="landing-nav" aria-label="Public navigation">
        <p className="landing-brand">GY Research</p>
        <Link className="landing-signin" to="/login">
          Sign In
        </Link>
      </nav>

      <section className="landing-content">
        <p className="landing-eyebrow">GY Research</p>
        <h1 className="landing-headline">
          Your opinion
          <br />
          shapes the world
        </h1>
        <p className="landing-subtitle">Join our global research community. Earn rewards for every survey you complete.</p>
        
        <div className="landing-stats">
          <div className="landing-stat-card">
            <span className="landing-stat-number">10000+</span>
            <span className="landing-stat-label">Members</span>
          </div>
          <div className="landing-stat-card">
            <span className="landing-stat-number">500+</span>
            <span className="landing-stat-label">Surveys</span>
          </div>
          <div className="landing-stat-card">
            <span className="landing-stat-number">$2-5</span>
            <span className="landing-stat-label">Per Survey</span>
          </div>
        </div>

        <Link className="landing-cta" to="/login">
          Get Started
        </Link>
      </section>

      <footer className="landing-footer">
        <Link to="/privacy">Privacy Policy</Link>
        <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>•</span>
        <Link to="/terms">Terms & Conditions</Link>
      </footer>
    </main>
  );
}
