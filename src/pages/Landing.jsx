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
        <Link className="landing-cta" to="/login">
          Get Started
        </Link>
      </section>
    </main>
  );
}
