import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle, Paperclip, PanelLeft, PanelLeftClose, Plus, Send, Sprout, Trash2, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { AI_BRIEF_MODE, MOCK_COMMANDS, MOCK_SCENARIOS, generateBriefProject, sendBriefTurn } from '../ai/aiBriefTurnClient';
import { AI_DOCUMENT_MODE, analyzeDocumentIntake } from '../ai/documentIntakeClient';
import { DOCUMENT_MOCK_CASES, analyzeDocumentMock } from '../ai/documentIntakeMock';
import { getAiBriefTurnCopy } from '../constants/aiBriefTurnCopy';
import './Business.css';
import './BusinessAiBriefTheme.css';
import './BusinessAiBriefTurn.css';

const DRAFT_KEY = 'guanyisearch.business-ai-brief.draft.v3';
const HISTORY_KEY = 'guanyisearch.business-ai-brief.history.v2';
const GENERATION_KEY = 'guanyisearch.business-ai-brief.generation.v1';
const OLD_PENDING_KEY = 'guanyisearch.business-ai-brief.pending.v2';
const HISTORY_LIMIT = 20;
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

function newId(prefix) {
  const random = globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return `${prefix}-${random}`;
}

function emptyDraft() {
  return {
    decision: '',
    audience: '',
    serviceCategory: null,
    studyFormat: null,
    market: '',
    sample: '',
    assumptions: [],
  };
}

const BLOCKING_MISSING = ['decision', 'audience', 'serviceCategory', 'studyFormat'];

function normalizeAssumptions(items) {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item) => item && ['market', 'sample'].includes(item.field))
    .map((item) => ({
      field: item.field,
      value: String(item.value ?? ''),
      reason: String(item.reason || ''),
    }));
}

function normalizeMissing(items) {
  if (!Array.isArray(items)) return [];
  return items.filter((item) => BLOCKING_MISSING.includes(item));
}

function generationSignature(draft) {
  return JSON.stringify([
    draft.decision, draft.audience, draft.serviceCategory,
    draft.studyFormat, draft.market, draft.sample,
  ]);
}

function getGenerationKey(draft) {
  const signature = generationSignature(draft);
  try {
    const stored = JSON.parse(localStorage.getItem(GENERATION_KEY) || 'null');
    if (stored?.key && stored.signature === signature) return stored.key;
    const key = newId('generate');
    localStorage.setItem(GENERATION_KEY, JSON.stringify({ key, signature, createdAt: Date.now() }));
    return key;
  } catch {
    return newId('generate');
  }
}

function clearGenerationKey() {
  try { localStorage.removeItem(GENERATION_KEY); } catch { /* Restricted browser context. */ }
}

function isEmptyDraft(draft) {
  return !draft.decision && !draft.audience && !draft.serviceCategory
    && !draft.studyFormat && !draft.market && !draft.sample;
}

// The endpoint's strict body schema accepts only the formal draft fields.
// assumptions/revision are UI state, not request fields; timeline is deliberately
// not collected by the AI brief.
function toApiDraft(draft) {
  const sample = String(draft.sample || '').replace(/[^0-9]/g, '');
  return {
    decision: draft.decision || null,
    audience: draft.audience || null,
    serviceCategory: draft.serviceCategory || null,
    studyFormat: draft.studyFormat || null,
    market: draft.market || null,
    sample: sample ? Number(sample) : null,
  };
}

function normalizeDraft(value) {
  const base = emptyDraft();
  if (!value || typeof value !== 'object') return base;
  const text = (key) => (typeof value[key] === 'string' ? value[key] : '');
  return {
    ...base,
    decision: text('decision'),
    audience: text('audience'),
    serviceCategory: typeof value.serviceCategory === 'string' ? value.serviceCategory : null,
    studyFormat: typeof value.studyFormat === 'string' ? value.studyFormat : null,
    market: text('market'),
    sample: value.sample === null || value.sample === undefined ? '' : String(value.sample),
    assumptions: normalizeAssumptions(value.assumptions),
  };
}

function loadStored() {
  try {
    const value = JSON.parse(localStorage.getItem(DRAFT_KEY) || 'null');
    if (!value || typeof value !== 'object') return null;
    const messages = Array.isArray(value.messages)
      ? value.messages.filter((item) => item && typeof item.content === 'string' && ['user', 'guide'].includes(item.role))
      : [];
    return {
      conversationId: typeof value.conversationId === 'string' ? value.conversationId : '',
      draft: normalizeDraft(value.draft),
      messages,
      action: typeof value.action === 'string' ? value.action : null,
      missing: Array.isArray(value.missing) ? value.missing.filter((item) => typeof item === 'string') : [],
      assumptions: normalizeAssumptions(value.assumptions),
    };
  } catch {
    return null;
  }
}

function readHistory() {
  try {
    const value = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
    if (!Array.isArray(value)) return [];
    return value
      .filter((item) => item && typeof item.id === 'string' && Array.isArray(item.messages))
      .slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

function writeHistory(items) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(items.slice(0, HISTORY_LIMIT)));
  } catch { /* Restricted browser context. */ }
}

function truncate(value, limit = 62) {
  const compact = String(value || '').replaceAll(/\s+/g, ' ').trim();
  if (!compact) return '';
  return compact.length > limit ? `${compact.slice(0, limit - 3)}…` : compact;
}

function titleFor(draft, messages, copy) {
  const firstUser = messages.find((message) => message.role === 'user')?.content;
  return truncate(draft.decision || firstUser || copy.title);
}

function serviceLabel(value, copy) {
  if (value === 'SURVEY') return copy.serviceSurvey;
  if (value === 'CUSTOM_RESEARCH') return copy.customResearch;
  if (value === 'QUALITATIVE_SUPPORT') return copy.qualitativeSupport;
  return copy.notSet;
}

function methodLabel(value, copy) {
  if (value === 'SURVEY') return copy.methodSurvey;
  if (value === 'INTERVIEW') return copy.methodInterview;
  if (value === 'GROUP_DISCUSSION') return copy.methodGroup;
  if (value === 'USABILITY_TEST') return copy.methodUsability;
  if (value === 'OTHER') return copy.methodOther;
  return copy.notSet;
}

function fieldLabel(field, copy) {
  if (field === 'decision') return copy.decision;
  if (field === 'audience') return copy.audience;
  if (field === 'serviceCategory') return copy.serviceCategory;
  if (field === 'studyFormat') return copy.studyFormat;
  if (field === 'market') return copy.market;
  if (field === 'sample') return copy.sample;
  return field;
}

export default function BusinessAiBriefTurn() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const copy = useMemo(() => getAiBriefTurnCopy(language), [language]);
  const [stored] = useState(() => loadStored());
  const initialPrompt = String(location.state?.initialPrompt || '').trim();

  const [conversationId, setConversationId] = useState(() => stored?.conversationId || newId('brief'));
  const [draft, setDraft] = useState(() => stored?.draft || emptyDraft());
  const [messages, setMessages] = useState(() => (
    stored?.messages?.length
      ? stored.messages
      : [{ id: 'opening-guide', role: 'guide', opening: true, content: copy.opening }]
  ));
  const [action, setAction] = useState(() => stored?.action || null);
  const [missing, setMissing] = useState(() => stored?.missing || []);
  const [assumptions, setAssumptions] = useState(() => stored?.assumptions || []);
  const [history, setHistory] = useState(() => readHistory());
  const [reply, setReply] = useState(initialPrompt);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');
  const [docConsentOpen, setDocConsentOpen] = useState(false);
  const [docConsentChecked, setDocConsentChecked] = useState(false);
  const [docConsent, setDocConsent] = useState(false);
  const [docAnalyzing, setDocAnalyzing] = useState(false);
  const [docMockCase, setDocMockCase] = useState(DOCUMENT_MOCK_CASES[0].id);
  const fileInputRef = useRef(null);
  const [manualOpen, setManualOpen] = useState(false);
  const [manual, setManual] = useState({ decision: '', audience: '', market: '', sample: '' });
  const [assistantOpen, setAssistantOpen] = useState(true);

  const busyRef = useRef(false);
  const endRef = useRef(null);
  const composerRef = useRef(null);

  useEffect(() => {
    try { sessionStorage.removeItem(OLD_PENDING_KEY); } catch { /* Restricted browser context. */ }
  }, []);

  const hasStarted = messages.some((message) => message.role === 'user');

  useEffect(() => {
    if (!hasStarted) return;
    const payload = { conversationId, draft, messages, action, missing, assumptions, updatedAt: Date.now() };
    try { localStorage.setItem(DRAFT_KEY, JSON.stringify(payload)); } catch { /* Restricted browser context. */ }
    const entry = { ...payload, title: titleFor(draft, messages, copy) };
    const next = [entry, ...readHistory().filter((item) => item.id !== conversationId)].slice(0, HISTORY_LIMIT);
    writeHistory(next);
    setHistory(next);
  }, [action, assumptions, conversationId, copy, draft, hasStarted, messages, missing]);

  useEffect(() => {
    if (!hasStarted) return;
    const frame = window.requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }));
    return () => window.cancelAnimationFrame(frame);
  }, [busy, hasStarted, messages.length]);

  const resetLocal = () => {
    setConversationId(newId('brief'));
    setDraft(emptyDraft());
    setMessages([{ id: 'opening-guide', role: 'guide', opening: true, content: copy.opening }]);
    setAction(null);
    setMissing([]);
    setAssumptions([]);
    setReply('');
    setError('');
    setGenerateError('');
    setGenerating(false);
    setDocAnalyzing(false);
    setManualOpen(false);
    clearGenerationKey();
    try { localStorage.removeItem(DRAFT_KEY); } catch { /* Restricted browser context. */ }
  };

  const turnSeqRef = useRef(0);
  const latestTurnRef = useRef(0);

  const runTurn = async ({ message, command } = {}) => {
    const value = String(message || '').trim();
    if ((!command && !value) || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError('');
    if (!command) setReply('');

    const userMessage = command ? null : { id: newId('user'), role: 'user', content: value };
    const nextMessages = userMessage ? [...messages, userMessage] : messages;
    if (userMessage) setMessages(nextMessages);

    const turnId = ++turnSeqRef.current;
    latestTurnRef.current = turnId;

    const request = {
      draft: toApiDraft(draft),
      responseLanguage: language.startsWith('zh') ? 'zh' : 'en',
    };
    if (command) request.command = command;
    else request.message = value;

    try {
      const response = await sendBriefTurn(request);
      if (turnId !== latestTurnRef.current) return;
      if (!response?.draft || typeof response.draft !== 'object') throw new Error('AI_BRIEF_RESPONSE_INVALID');
      const nextAssumptions = normalizeAssumptions(response.assumptions);
      setDraft({ ...normalizeDraft(response.draft), assumptions: nextAssumptions });
      setAction(response.action || null);
      setMissing(normalizeMissing(response.missing));
      setAssumptions(nextAssumptions);
      setMessages([...nextMessages, { id: newId('guide'), role: 'guide', content: String(response.reply || '') }]);
    } catch (failure) {
      if (turnId !== latestTurnRef.current) return;
      const code = failure?.response?.data?.code || failure?.code;
      if (code === 'MOCK_SCENARIO_NOT_FOUND') setError(copy.mockUnsupported);
      else if (code === 'AI_BRIEF_UNAVAILABLE') setError(copy.unavailable);
      else setError(failure?.response?.data?.message || copy.genericError);
    } finally {
      if (turnId === latestTurnRef.current) {
        busyRef.current = false;
        setBusy(false);
      }
    }
  };

  const sendMessage = (text) => runTurn({ message: text });

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage(reply);
  };

  const mockCommand = (key, fallback) => (AI_BRIEF_MODE === 'mock' ? MOCK_COMMANDS[key] || fallback : fallback);

  const handleCategory = (category) => {
    sendMessage(mockCommand(
      category === 'CUSTOM_RESEARCH' ? 'custom' : 'qualitative',
      category === 'CUSTOM_RESEARCH' ? copy.confirmCustomCommand : copy.confirmQualitativeCommand,
    ));
  };

  const appendGuide = (content) => {
    setMessages((current) => [...current, { id: newId('guide'), role: 'guide', content }]);
  };

  const documentErrorText = (failure) => {
    const code = failure?.response?.data?.code || failure?.code;
    const messages = {
      AI_DOCUMENT_PROCESSING_CONSENT_REQUIRED: copy.documentConsentRequired,
      AI_DOCUMENT_INVALID: copy.documentInvalid,
      AI_DOCUMENT_TOO_LARGE: copy.documentTooLarge,
      AI_DOCUMENT_UNSUPPORTED: copy.documentUnsupported,
      AI_DOCUMENT_UNREADABLE: copy.documentUnreadable,
      AI_DOCUMENT_RATE_LIMITED: copy.documentRateLimited,
      AI_DOCUMENT_ANALYSIS_INVALID: copy.documentUnavailable,
      AI_DOCUMENT_ANALYSIS_UNAVAILABLE: copy.documentUnavailable,
    };
    return messages[code] || copy.documentUnavailable;
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
      appendGuide(copy.documentUnsupported);
      return;
    }
    if (file.size > DOCUMENT_MAX_BYTES) {
      appendGuide(copy.documentTooLarge);
      return;
    }
    setDocAnalyzing(true);
    setGenerateError('');
    setMessages((current) => [...current, { id: newId('user'), role: 'user', content: copy.documentUploaded }]);
    try {
      const response = AI_DOCUMENT_MODE === 'api'
        ? await analyzeDocumentIntake({ file, responseLanguage: language.startsWith('zh') ? 'zh' : 'en' })
        : await analyzeDocumentMock(docMockCase, language);
      if (response?.outcome === 'REFUSE') {
        appendGuide(copy.documentRefused);
        return;
      }
      if (response?.outcome === 'BRIEF' || response?.outcome === 'NEEDS_DETAILS') {
        const extracted = normalizeDraft(response.draft);
        const nextDraft = { ...draft };
        for (const field of ['decision', 'audience', 'serviceCategory', 'studyFormat', 'market', 'sample']) {
          if (extracted[field] !== null && extracted[field] !== '') nextDraft[field] = extracted[field];
        }
        setDraft(nextDraft);
        const nextMissing = normalizeMissing(response.missing);
        setMissing(nextMissing);
        setAssumptions([]);
        setAction(nextMissing.length ? 'ASK' : 'READY');
        appendGuide(`${response.outcome === 'NEEDS_DETAILS' ? copy.documentNeeds : copy.documentReady}${response.summary ? `

${response.summary}` : ''}`);
        return;
      }
      appendGuide(copy.documentUnavailable);
    } catch (failure) {
      appendGuide(documentErrorText(failure));
    } finally {
      setDocAnalyzing(false);
    }
  };

  const handleDocumentFile = (event) => {
    const file = event.target.files?.[0] || null;
    event.target.value = '';
    analyzeDocumentFile(file);
  };

  const handleGenerate = async () => {
    if (generating) return;
    const requestDraft = toApiDraft(draft);
    if (!requestDraft.decision || !requestDraft.audience || !requestDraft.serviceCategory || !requestDraft.studyFormat) {
      setGenerateError(copy.generationInvalid);
      return;
    }
    if (requestDraft.studyFormat !== 'SURVEY') {
      setGenerateError(copy.generationMethodUnsupported);
      return;
    }
    setGenerating(true);
    setGenerateError('');
    const generationKey = getGenerationKey(draft);
    try {
      const result = await generateBriefProject({
        generationKey,
        draft: requestDraft,
        responseLanguage: language.startsWith('zh') ? 'zh' : 'en',
      });
      if (!result?.editorPath) throw Object.assign(new Error('AI_BRIEF_GENERATION_INVALID_OUTPUT'), { code: 'AI_BRIEF_GENERATION_INVALID_OUTPUT' });
      navigate(result.editorPath);
    } catch (failure) {
      const code = failure?.response?.data?.code || failure?.code;
      if (code === 'AI_BRIEF_GENERATION_KEY_CONFLICT') clearGenerationKey();
      const messages = {
        AI_BRIEF_GENERATION_INVALID: copy.generationInvalid,
        AI_BRIEF_GENERATION_KEY_CONFLICT: copy.generationKeyConflict,
        AI_BRIEF_GENERATION_METHOD_UNSUPPORTED: copy.generationMethodUnsupported,
        AI_BRIEF_GENERATION_RATE_LIMITED: copy.generationRateLimited,
        AI_BRIEF_GENERATION_INVALID_OUTPUT: copy.generationInvalidOutput,
        AI_BRIEF_GENERATION_UNAVAILABLE: copy.generationUnavailable,
      };
      setGenerateError(messages[code] || failure?.response?.data?.message || copy.genericError);
    } finally {
      setGenerating(false);
    }
  };

  const handleRestart = () => {
    if (!hasStarted && isEmptyDraft(draft)) {
      resetLocal();
      return;
    }
    sendMessage(mockCommand('restart', copy.restartCommand));
  };

  const handleManualSubmit = (event) => {
    event.preventDefault();
    const parts = [
      manual.decision ? `${copy.manualDecision}: ${manual.decision}` : '',
      manual.audience ? `${copy.manualAudience}: ${manual.audience}` : '',
      manual.market ? `${copy.manualMarket}: ${manual.market}` : '',
      manual.sample ? `${copy.manualSample}: ${manual.sample}` : '',
    ].filter(Boolean);
    if (!parts.length) return;
    setManualOpen(false);
    sendMessage(parts.join('; '));
  };

  const openConversation = (entry) => {
    setConversationId(entry.id);
    setDraft(normalizeDraft(entry.draft));
    setMessages(entry.messages?.length ? entry.messages : [{ id: 'opening-guide', role: 'guide', opening: true, content: copy.opening }]);
    setAction(entry.action || null);
    setMissing(Array.isArray(entry.missing) ? entry.missing : []);
    setAssumptions(Array.isArray(entry.assumptions) ? entry.assumptions : []);
    setReply('');
    setError('');
    setGenerateError('');
    setGenerating(false);
    setManualOpen(false);
    clearGenerationKey();
  };

  const removeConversation = (id) => {
    const next = readHistory().filter((item) => item.id !== id);
    writeHistory(next);
    setHistory(next);
    if (id === conversationId) resetLocal();
  };

  const leaveBrief = () => navigate(withLanguage('/business/workspace', language));
  const title = titleFor(draft, messages, copy);
  const showDraft = Boolean(
    draft.decision || draft.audience || draft.serviceCategory || draft.studyFormat
    || draft.market || draft.sample || draft.assumptions.length,
  );
  const needsServiceCategory = action === 'ASK'
    && missing.includes('serviceCategory')
    && ['INTERVIEW', 'GROUP_DISCUSSION'].includes(draft.studyFormat);

  return (
    <main className="business-ai-brief-page notranslate" translate="no" data-translate="no">
      <div className={`business-ai-brief-shell has-assistant${assistantOpen ? '' : ' is-collapsed'}`}>
        <aside className={`business-ai-brief-assistant${assistantOpen ? '' : ' is-collapsed'}`} aria-label={copy.title}>
          <div className="business-ai-brief-assistant-brand"><img src="/guanyisearch-wordmark.png" alt="GuanyiSearch" /></div>
          <header>
            <button type="button" onClick={() => setAssistantOpen((value) => !value)} aria-label={assistantOpen ? copy.collapse : copy.expand} aria-expanded={assistantOpen}>
              {assistantOpen ? <PanelLeftClose size={17} /> : <PanelLeft size={17} />}
            </button>
            <strong>{copy.title}</strong>
          </header>
          <div className="business-ai-brief-assistant-actions">
            <button type="button" onClick={resetLocal}><Plus size={15} /> {copy.newChat}</button>
            <button type="button" onClick={leaveBrief}><ArrowLeft size={15} /> {copy.back}</button>
          </div>
          <p className="business-ai-brief-assistant-section">{copy.history}</p>
          <div className="business-ai-brief-assistant-list">
            {history.length ? history.map((entry, index) => (
              <div key={`${entry.id}-${index}`} className={entry.id === conversationId ? 'is-current' : ''}>
                <button type="button" className="business-ai-brief-assistant-open" onClick={() => openConversation(entry)} aria-current={entry.id === conversationId ? 'true' : undefined}>
                  <strong>{entry.title}</strong>
                </button>
                <button type="button" className="business-ai-brief-assistant-delete" onClick={() => removeConversation(entry.id)} aria-label={copy.deleteChat}><Trash2 size={14} /></button>
              </div>
            )) : <p className="business-ai-brief-assistant-empty">{copy.emptyHistory}</p>}
          </div>
        </aside>

        <section className="business-ai-brief-surface">
          <header className="business-ai-brief-header">
            <div className="business-ai-brief-brand">
              <img className="business-ai-brief-wordmark" src="/guanyisearch-wordmark.png" alt="guanyisearch" />
              {hasStarted && <><span aria-hidden="true">/</span><strong>{title}</strong></>}
            </div>
            <div className="business-ai-brief-tools"><NotificationBell className="business-workspace-notification" /></div>
          </header>

          <section className={`business-ai-conversation${hasStarted ? ' is-started' : ' is-waiting'}`} aria-label={copy.title}>
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

              {AI_BRIEF_MODE === 'mock' && (!hasStarted || error === copy.mockUnsupported) && (
                <section className="business-ai-turn-mock" aria-label={copy.mock}>
                  <strong>{copy.mock}</strong>
                  <p>{copy.mockHint}</p>
                  <div>
                    {MOCK_SCENARIOS.map((scenario, index) => (
                      <button key={`${scenario.id}-${index}`} type="button" onClick={() => sendMessage(scenario.request.message)}>
                        {scenario.request.message}
                      </button>
                    ))}
                  </div>
                </section>
              )}

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

              {showDraft && (
                <section className="business-ai-turn-draft" aria-label={copy.draftTitle}>
                  <header><span>{copy.draftTitle}</span></header>
                  <dl>
                    <div><dt>{copy.decision}</dt><dd>{draft.decision || copy.notSet}</dd></div>
                    <div><dt>{copy.audience}</dt><dd>{draft.audience || copy.notSet}</dd></div>
                    <div><dt>{copy.serviceCategory}</dt><dd>{serviceLabel(draft.serviceCategory, copy)}</dd></div>
                    <div><dt>{copy.studyFormat}</dt><dd>{methodLabel(draft.studyFormat, copy)}</dd></div>
                    <div><dt>{copy.market}</dt><dd>{draft.market || copy.notSet}</dd></div>
                    <div><dt>{copy.sample}</dt><dd>{draft.sample || copy.notSet}</dd></div>
                  </dl>
                  {draft.assumptions.length > 0 && (
                    <div className="business-ai-turn-assumptions">
                      <span>{copy.assumptions}</span>
                      {draft.assumptions.map((item, index) => <em key={`${item.field}-${item.value}-${index}`}>{fieldLabel(item.field, copy)}: {item.value}</em>)}
                    </div>
                  )}
                </section>
              )}

              {needsServiceCategory && (
                <section className="business-ai-turn-card">
                  <strong>{copy.askService}</strong>
                  <p>{copy.askServiceHint}</p>
                  <div className="business-ai-turn-service">
                    <button type="button" onClick={() => handleCategory('CUSTOM_RESEARCH')}>
                      <b>{copy.customResearch}</b><small>{copy.customResearchNote}</small>
                    </button>
                    <button type="button" onClick={() => handleCategory('QUALITATIVE_SUPPORT')}>
                      <b>{copy.qualitativeSupport}</b><small>{copy.qualitativeSupportNote}</small>
                    </button>
                  </div>
                </section>
              )}

              {action === 'ASK' && !needsServiceCategory && missing.length > 0 && (
                <p className="business-ai-turn-note">{copy.askMore}: {missing.map((item) => fieldLabel(item, copy)).join(' · ')}</p>
              )}

              {action === 'READY' && (
                <section className="business-ai-turn-card">
                  <strong>{copy.ready}</strong>
                  <p>{copy.readyHint}</p>
                  <div className="business-ai-turn-card-actions">
                    <button type="button" className="business-button" onClick={handleGenerate} disabled={generating || busy} aria-busy={generating}>
                      {generating ? <LoaderCircle className="animate-spin" size={15} /> : copy.generate}
                      {!generating && <ArrowRight size={16} />}
                    </button>
                    <button type="button" className="business-ai-turn-quiet" onClick={() => composerRef.current?.focus()}>{copy.keepEditing}</button>
                  </div>
                  {generateError && <p className="business-ai-turn-note is-error" role="alert">{generateError}</p>}
                </section>
              )}

              <span className="business-ai-conversation-end" ref={endRef} aria-hidden="true" />
            </div>

            <div className="business-ai-dock">
              {error && <p className="business-ai-brief-error" role="alert">{error}</p>}
              <form className="business-ai-composer" onSubmit={handleSubmit}>
                <textarea
                  ref={composerRef}
                  value={reply}
                  disabled={busy}
                  onChange={(event) => setReply(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent?.isComposing) {
                      event.preventDefault();
                      if (reply.trim() && !busy) sendMessage(reply);
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
              <div className="business-ai-turn-secondary">
                <button type="button" onClick={handleRestart}>{copy.restart}</button>
                {AI_BRIEF_MODE !== 'mock' && (
                  <button type="button" onClick={() => setManualOpen((value) => !value)}>{copy.manual}</button>
                )}
              </div>
              {manualOpen && AI_BRIEF_MODE !== 'mock' && (
                <form className="business-ai-turn-manual" onSubmit={handleManualSubmit}>
                  <p>{copy.manualHint}</p>
                  <label>{copy.manualDecision}<input value={manual.decision} onChange={(event) => setManual({ ...manual, decision: event.target.value })} /></label>
                  <label>{copy.manualAudience}<input value={manual.audience} onChange={(event) => setManual({ ...manual, audience: event.target.value })} /></label>
                  <div>
                    <label>{copy.manualMarket}<input value={manual.market} onChange={(event) => setManual({ ...manual, market: event.target.value })} /></label>
                    <label>{copy.manualSample}<input value={manual.sample} onChange={(event) => setManual({ ...manual, sample: event.target.value })} /></label>
                  </div>
                  <button type="submit" className="business-button" disabled={!manual.decision.trim() || !manual.audience.trim()}>{copy.manualSubmit} <ArrowRight size={16} /></button>
                </form>
              )}
            </div>
          </section>
        </section>
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
    </main>
  );
}
