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

export default function LegalPageLayout({ eyebrow, title, intro, sections, children, audience = 'For Guanyi Media users', effectiveDate = 'Effective July 5, 2026' }) {
  return (
    <main className="legal-page">
      <div className="legal-page-grain" aria-hidden="true" />
      <section className="legal-hero">
        <div className="legal-container">
          <p className="legal-eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="legal-hero-copy">{intro}</p>
          <div className="legal-meta">
            <span>{effectiveDate}</span>
            <span>{audience}</span>
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

    </main>
  );
}
