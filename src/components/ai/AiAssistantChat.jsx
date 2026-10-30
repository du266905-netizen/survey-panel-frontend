import { useEffect, useRef, useState } from 'react';
import { ArrowRight, LoaderCircle, Paperclip, Send, Sprout, X } from 'lucide-react';
import { AI_DOCUMENT_MODE, analyzeDocumentIntake } from '../../ai/documentIntakeClient';
import { DOCUMENT_MOCK_CASES, analyzeDocumentMock } from '../../ai/documentIntakeMock';

const DOCUMENT_MAX_BYTES = 10 * 1024 * 1024;
const DOCUMENT_TYPES = ['.pdf', '.docx', '.txt'];
const DOCUMENT_CASE_LABELS = {
  'research-brief-to-editable-draft': 'Convertible research brief',
  'research-theme-needs-details': 'Theme needs more detail',
  'sensitive-content-refused-before-model': 'Sensitive content refused',
  'consent-required-before-upload': 'Consent required',
  'unsupported-file-rejected': 'Unsupported file',
  'unreadable-document-rejected': 'Unreadable document',
  'analysis-unavailable-keeps-no-artifact': 'Analysis unavailable',
};

/**
 * Shared chat surface. Hosts own the business state and provide the cards
 * between messages; this component owns the thread, composer, attachment
 * consent, analysis call and safe file validation.
 */
export default function AiAssistantChat({
  copy,
  language,
  messages,
  busy,
  error,
  onSend,
  onDocumentStart,
  onDocumentAnalyzed,
  onDocumentError,
  composerRef,
  autoOpenDocument = false,
  footer = null,
  children = null,
}) {
  const [reply, setReply] = useState('');
  const [docConsentOpen, setDocConsentOpen] = useState(false);
  const [docConsentChecked, setDocConsentChecked] = useState(false);
  const [docConsent, setDocConsent] = useState(false);
  const [docAnalyzing, setDocAnalyzing] = useState(false);
  const [docMockCase, setDocMockCase] = useState(DOCUMENT_MOCK_CASES[0].id);
  const fileInputRef = useRef(null);
  const endRef = useRef(null);

  const hasStarted = messages.some((message) => message.role === 'user');

  useEffect(() => {
    if (!autoOpenDocument || docConsent) return;
    setDocConsentChecked(false);
    setDocConsentOpen(true);
  }, [autoOpenDocument, docConsent]);

  useEffect(() => {
    if (!hasStarted) return undefined;
    const frame = window.requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }));
    return () => window.cancelAnimationFrame(frame);
  }, [busy, hasStarted, messages.length, docAnalyzing]);

  const submit = (event) => {
    event.preventDefault();
    const value = reply.trim();
    if (!value || busy) return;
    setReply('');
    onSend(value);
  };

  const openDocumentPicker = () => {
    if (docAnalyzing) return;
    if (!docConsent) {
      setDocConsentChecked(false);
      setDocConsentOpen(true);
      return;
    }
    fileInputRef.current?.click();
  };

  const confirmDocumentConsent = () => {
    if (!docConsentChecked) return;
    setDocConsent(true);
    setDocConsentOpen(false);
    window.setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const analyzeDocumentFile = async (file) => {
    if (!file) return;
    const name = String(file.name || '').toLowerCase();
    if (!DOCUMENT_TYPES.some((extension) => name.endsWith(extension))) {
      onDocumentError?.({ code: 'AI_DOCUMENT_UNSUPPORTED' });
      return;
    }
    if (file.size > DOCUMENT_MAX_BYTES) {
      onDocumentError?.({ code: 'AI_DOCUMENT_TOO_LARGE' });
      return;
    }
    setDocAnalyzing(true);
    onDocumentStart?.();
    try {
      const response = AI_DOCUMENT_MODE === 'api'
        ? await analyzeDocumentIntake({ file, responseLanguage: language.startsWith('zh') ? 'zh' : 'en' })
        : await analyzeDocumentMock(docMockCase, language);
      onDocumentAnalyzed?.(response);
    } catch (failure) {
      onDocumentError?.(failure);
    } finally {
      setDocAnalyzing(false);
    }
  };

  const handleDocumentFile = (event) => {
    const file = event.target.files?.[0] || null;
    event.target.value = '';
    analyzeDocumentFile(file);
  };

  return (
    <>
      <div className="business-ai-conversation-log" role="log" aria-live="polite">
        {messages.filter((message) => !message.opening || !hasStarted).map((message, index) => (
          message.opening ? (
            <article key={`${message.id}-${index}`} className="is-guide is-opening">
              <h1><span><Sprout size={64} className="business-ai-opening-sprout" aria-hidden="true" /> {message.content}</span></h1>
              <p className="business-ai-turn-opening-hint">{copy.openingHint}</p>
            </article>
          ) : (
            <article key={`${message.id}-${index}`} className={message.role === 'user' ? 'is-user' : 'is-guide'}>
              {message.role === 'guide' && <span className="business-ai-guide-mark" aria-hidden="true"><Sprout size={24} className="business-ai-sprout" /></span>}
              <p>{message.content}</p>
            </article>
          )
        ))}

        {busy && (
          <article className="is-guide is-thinking" aria-hidden="true">
            <span className="business-ai-guide-mark"><Sprout size={24} className="business-ai-sprout" /></span>
            <span className="business-ai-thinking-dots"><i /><i /><i /></span>
          </article>
        )}

        {docAnalyzing && (
          <article className="is-guide is-document-thinking">
            <span className="business-ai-guide-mark"><Paperclip size={20} /></span>
            <p>{copy.documentAnalyzing}</p>
          </article>
        )}

        {children}
        <span className="business-ai-conversation-end" ref={endRef} aria-hidden="true" />
      </div>

      <div className="business-ai-dock">
        {error && <p className="business-ai-brief-error" role="alert">{error}</p>}
        <form className="business-ai-composer" onSubmit={submit}>
          <textarea
            ref={composerRef}
            value={reply}
            disabled={busy}
            onChange={(event) => setReply(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent?.isComposing) {
                event.preventDefault();
                if (reply.trim() && !busy) {
                  setReply('');
                  onSend(reply);
                }
              }
            }}
            placeholder={copy.placeholder}
            aria-label={copy.placeholder}
          />
          <div className="business-ai-composer-bar">
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
              className="business-ai-document-input"
              onChange={handleDocumentFile}
            />
            <button type="button" className="business-ai-attach" onClick={openDocumentPicker} disabled={docAnalyzing} title={copy.documentTitle} aria-label={copy.documentTitle}><Paperclip size={17} /></button>
            <button type="submit" disabled={!reply.trim() || busy} aria-label={copy.send}>
              {busy ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}
            </button>
          </div>
        </form>
        {footer}
      </div>

      {docConsentOpen && (
        <div className="business-ai-doc-consent" role="dialog" aria-modal="true" aria-labelledby="business-ai-doc-consent-title">
          <section>
            <button type="button" className="business-ai-doc-close" onClick={() => setDocConsentOpen(false)} aria-label={copy.documentCancel}><X size={18} /></button>
            <h2 id="business-ai-doc-consent-title">{copy.documentConsentTitle}</h2>
            <ul>{copy.documentConsentPoints.map((item) => <li key={item}>{item}</li>)}</ul>
            <label className="business-ai-doc-check">
              <input type="checkbox" checked={docConsentChecked} onChange={(event) => setDocConsentChecked(event.target.checked)} />
              <span>{copy.documentConsentCheck}</span>
            </label>
            {AI_DOCUMENT_MODE === 'mock' && (
              <label className="business-ai-doc-mock">
                {copy.documentMock}
                <select value={docMockCase} onChange={(event) => setDocMockCase(event.target.value)}>
                  {DOCUMENT_MOCK_CASES.map((item) => <option key={item.id} value={item.id}>{DOCUMENT_CASE_LABELS[item.id] || item.id}</option>)}
                </select>
                <small>{copy.documentMockHint}</small>
              </label>
            )}
            <div className="business-ai-doc-actions">
              <button type="button" className="business-ai-turn-quiet" onClick={() => setDocConsentOpen(false)}>{copy.documentCancel}</button>
              <button type="button" className="business-button" disabled={!docConsentChecked} onClick={confirmDocumentConsent}>{copy.documentChoose} <ArrowRight size={16} /></button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
