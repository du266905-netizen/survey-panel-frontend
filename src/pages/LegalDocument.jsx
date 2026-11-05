import { legalDocs } from '../content/legal';
import './LegalDocument.css';

/* A legal document on the web, set exactly as its PDF: the title, the date
 * under it, one lead paragraph, then the sections. No marketing headline, no
 * second introduction — the document is the page. The PDF sits one click away,
 * in the same place the cookie preference link puts the cookie policy. */
export default function LegalDocument({ slug }) {
  const doc = legalDocs[slug];
  if (!doc) return null;

  return (
    <main className="legal-doc">
      <article className="legal-doc-inner">
        <header className="legal-doc-head">
          <h1>{doc.title}</h1>
          <a className="legal-doc-pdf" href={doc.pdf} target="_blank" rel="noreferrer">
            Download PDF
            <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" focusable="false">
              <path d="M4 1h7v7M11 1 3 9" fill="none" stroke="currentColor" strokeWidth="1.2" />
              <path d="M9 7v3.5H1.5V3H5" fill="none" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </a>
        </header>

        <p className="legal-doc-date">Effective {doc.date}</p>

        <div className="legal-doc-lead" dangerouslySetInnerHTML={{ __html: doc.lead }} />

        <div className="legal-doc-body">
          {doc.sections.map((section) => (
            <section className="legal-doc-section" id={section.id} key={section.id}>
              <h2>{section.title}</h2>
              <div className="legal-doc-prose" dangerouslySetInnerHTML={{ __html: section.html }} />
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
