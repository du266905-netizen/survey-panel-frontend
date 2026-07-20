import { Link } from 'react-router-dom';
import Logo from './Logo';

export function LegalSection({ number, id, title, children }) {
  return (
    <section id={id} className="legal-section">
      <header className="legal-section-head">
        <span aria-hidden="true">{String(number).padStart(2, '0')}</span>
        <div>
          <p>Section {number}</p>
          <h2>{title}</h2>
        </div>
      </header>
      <div className="legal-section-content">{children}</div>
    </section>
  );
}

export default function LegalPageLayout({ eyebrow, title, intro, sections, children }) {
  return (
    <main className="legal-page">
      <div className="legal-page-grain" aria-hidden="true" />
      <header className="legal-header">
        <div className="legal-container legal-header-inner">
          <Link className="legal-logo" to="/" aria-label="GuanyiSearch home">
            <Logo size="md" />
          </Link>
          <div className="legal-header-links">
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
            <Link className="legal-sign-in" to="/login">Sign in</Link>
          </div>
        </div>
      </header>

      <section className="legal-hero">
        <div className="legal-container">
          <p className="legal-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-hero-copy">{intro}</p>
          <div className="legal-meta">
            <span>Effective June 6, 2026</span>
            <span>For registered Guanyi Media panelists</span>
          </div>
        </div>
      </section>

      <div className="legal-container legal-layout">
        <aside className="legal-toc" aria-label="Page sections">
          <p>On this page</p>
          <nav>
            {sections.map((section, index) => (
              <a key={section.id} href={`#${section.id}`}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="legal-document">{children}</article>
      </div>

      <footer className="legal-footer">
        <div className="legal-container legal-footer-inner">
          <div>
            <p>Questions or requests</p>
            <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>
          </div>
          <span>© 2026 Guanyi Media</span>
        </div>
      </footer>
    </main>
  );
}
