import { legalDocs } from '../content/legal';
import { useLanguage } from '../components/LanguageContext';
import './LegalDocument.css';

/* A legal document on the web, set exactly as its PDF: the title, the date
 * under it, one lead paragraph, then the sections. No marketing headline, no
 * second introduction — the document is the page. The PDF sits one click away,
 * in the same place the cookie preference link puts the cookie policy. */
const LABEL = { zh: '下载 PDF', en: 'Download PDF' };

export default function LegalDocument({ slug, part = false }) {
  const { language } = useLanguage();
  const lang = String(language || '').startsWith('zh') ? 'zh' : 'en';
  const doc = legalDocs[slug]?.[lang] || legalDocs[slug]?.en;
  if (!doc) return null;

  return (
    <main className={`legal-doc${part ? ' is-part' : ''}`}>
      <article className="legal-doc-inner">
        <header className="legal-doc-head">
          <h1>{doc.title}</h1>
          <a className="legal-doc-pdf" href={doc.pdf} target="_blank" rel="noreferrer">
            {LABEL[lang]}
          </a>
        </header>

        <p className="legal-doc-date">{doc.date}</p>

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
