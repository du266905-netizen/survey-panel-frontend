import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle, PanelLeft, PanelLeftClose, Plus, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationBell from '../components/NotificationBell';
import { AiCreditsMenu } from '../components/AiCredits';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { useAuth } from '../components/AuthContext';
import { AI_BRIEF_MODE, MOCK_COMMANDS, MOCK_SCENARIOS, generateBriefProject, sendBriefTurn } from '../ai/aiBriefTurnClient';
import { createConversation, deleteConversation as deleteRemoteConversation, getConversation, saveDraft } from '../api/aiConversations';
import { useConversationList } from '../hooks/useAiConversations';
import AiAssistantChat from '../components/ai/AiAssistantChat';
import { getAiBriefTurnCopy } from '../constants/aiBriefTurnCopy';
import './Business.css';
import './BusinessAiBriefTheme.css';
import './BusinessAiBriefTurn.css';

const GENERATION_KEY_BASE = 'guanyisearch.business-ai-brief.generation.v2';

/* The stored signature used to be the brief text itself, under a key shared by
   every account on the browser: sign out, sign in as someone else, and their
   draft was still sitting there in localStorage. Now the key carries the user
   id and only a hash of the draft is kept. */
function generationStorageKey(userId) {
  return `${GENERATION_KEY_BASE}:${userId || 'anonymous'}`;
}

function hashSignature(text) {
  let hash = 5381;
  for (let i = 0; i < text.length; i += 1) hash = ((hash * 33) ^ text.charCodeAt(i)) >>> 0;
  return hash.toString(16);
}
const OLD_PENDING_KEY = 'guanyisearch.business-ai-brief.pending.v2';
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

function getGenerationKey(draft, userId) {
  const signature = hashSignature(generationSignature(draft));
  try {
    const storageKey = generationStorageKey(userId);
    const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
    if (stored?.key && stored.signature === signature) return stored.key;
    const key = newId('generate');
    localStorage.setItem(storageKey, JSON.stringify({ key, signature, createdAt: Date.now() }));
    return key;
  } catch {
    return newId('generate');
  }
}

function clearGenerationKey(userId) {
  try { localStorage.removeItem(generationStorageKey(userId)); } catch { /* Restricted browser context. */ }
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
  const { user } = useAuth();
  const copy = useMemo(() => getAiBriefTurnCopy(language), [language]);
  /* Opening the page always starts a new conversation. The previous one stays
     in the history list on the left, where it belongs — an empty page is the
     contract every assistant keeps (2026-11-01). `loadStored()` is no longer
     consulted on mount; `openConversation` is the only way back in. */
  /* 会话 id 由后端在第一条消息时创建；在此之前页面不产生任何服务端记录。 */
  const [conversationId, setConversationId] = useState(() => null);
  const [draft, setDraft] = useState(() => emptyDraft());
  const [messages, setMessages] = useState(() => (
    [{ id: 'opening-guide', role: 'guide', opening: true, content: copy.opening }]
  ));
  const [action, setAction] = useState(() => null);
  const [missing, setMissing] = useState(() => []);
  const [assumptions, setAssumptions] = useState(() => []);
  const conversationList = useConversationList();
  const history = conversationList.data || [];
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generateError, setGenerateError] = useState('');
  const [docResult, setDocResult] = useState(null);
  const [docInputs, setDocInputs] = useState({ decision: '', audience: '' });
  const [manualOpen, setManualOpen] = useState(false);
  const [manual, setManual] = useState({ decision: '', audience: '', market: '', sample: '' });
  const [assistantOpen, setAssistantOpen] = useState(true);

  const busyRef = useRef(false);
  const endRef = useRef(null);
  const composerRef = useRef(null);
  /* 服务端已有的那份草稿指纹。turn 成功时后端会原子写入 turn 的 draft，
     前端若紧接着再 PATCH 一次就是和它抢写；指纹相同就跳过。 */
  const serverDraftRef = useRef('');

  useEffect(() => {
    try { sessionStorage.removeItem(OLD_PENDING_KEY); } catch { /* Restricted browser context. */ }
  }, []);


  const hasStarted = messages.some((message) => message.role === 'user');

  /* 只保存“用户手改出来的”草稿。turn 返回的那份已经由后端写过了，
     再 PATCH 一次就是拿旧值盖新值，必须跳过（2026-11-01 后端确认的竞态）。 */
  useEffect(() => {
    if (!hasStarted || !conversationId) return;
    const payload = { draft, action, missing, assumptions };
    const signature = JSON.stringify(payload);
    if (signature === serverDraftRef.current) return;
    const timer = window.setTimeout(() => {
      void saveDraft({ id: conversationId, payload })
        .then(() => { serverDraftRef.current = signature; })
        .catch(() => { /* 草稿失败不该打断对话 */ });
    }, 600);
    return () => window.clearTimeout(timer);
  }, [action, assumptions, conversationId, draft, hasStarted, missing]);

  useEffect(() => {
    if (!hasStarted) return;
    const frame = window.requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }));
    return () => window.cancelAnimationFrame(frame);
  }, [busy, hasStarted, messages.length]);

  const resetLocal = () => {
    setConversationId(null);
    setDraft(emptyDraft());
    setMessages([{ id: 'opening-guide', role: 'guide', opening: true, content: copy.opening }]);
    setAction(null);
    setMissing([]);
    setAssumptions([]);
    setError('');
    setGenerateError('');
    setGenerating(false);
    setDocAnalyzing(false);
    setDocResult(null);
    setDocInputs({ decision: '', audience: '' });
    setManualOpen(false);
    clearGenerationKey(user?.id);
  };

  const turnSeqRef = useRef(0);
  const latestTurnRef = useRef(0);

  const runTurn = async ({ message, command } = {}) => {
    const value = String(message || '').trim();
    if ((!command && !value) || busyRef.current) return;
    busyRef.current = true;
    setBusy(true);
    setError('');
    if (!command) setDocResult(null);

    const userMessage = command ? null : { id: newId('user'), role: 'user', content: value };
    const nextMessages = userMessage ? [...messages, userMessage] : messages;
    if (userMessage) setMessages(nextMessages);

    /* 第一条消息时才建会话：空会话不进列表，也不浪费一个 id。 */
    let activeConversationId = conversationId;
    if (!activeConversationId) {
      try {
        const created = await createConversation();
        activeConversationId = created?.id || null;
        if (activeConversationId) setConversationId(activeConversationId);
      } catch { /* 建不出来就退回纯内存对话，至少别白屏 */ }
    }

    const turnId = ++turnSeqRef.current;
    latestTurnRef.current = turnId;

    const request = {
      /* 会话 id：后端在 turn 里把这一问一答写进会话，刷新才读得到。
         后端尚未接收该字段时它是无害的多余参数。 */
      conversationId: activeConversationId || undefined,
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
      /* 后端已在同一事务里写过这份 draft，记下指纹，别让防抖再去覆盖。 */
      serverDraftRef.current = JSON.stringify({
        draft: { ...normalizeDraft(response.draft), assumptions: nextAssumptions },
        action: response.action || null,
        missing: normalizeMissing(response.missing),
        assumptions: nextAssumptions,
      });
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

  /* The ask box in the workspace hands its question over through router state;
     without this it opened an empty conversation and dropped what was typed. */
  const seededPromptRef = useRef(false);
  useEffect(() => {
    const prompt = String(location.state?.initialPrompt || '').trim();
    if (!prompt || seededPromptRef.current) return;
    seededPromptRef.current = true;
    navigate(location.pathname, { replace: true, state: {} });
    sendMessage(prompt);
  }, [location, navigate]);

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

  const handleDocumentStart = () => {
    setMessages((current) => [...current, { id: newId('user'), role: 'user', content: copy.documentUploaded }]);
  };

  const handleDocumentAnalyzed = (response) => {
    if (response?.outcome === 'REFUSE') {
      setDocResult(null);
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
      setDocResult({ outcome: response.outcome, summary: response.summary || '', draft: nextDraft, missing: nextMissing, source: response.source || null });
      setDocInputs({ decision: '', audience: '' });
      appendGuide(response.outcome === 'NEEDS_DETAILS' ? copy.documentNeeds : copy.documentReady);
      return;
    }
    appendGuide(copy.documentUnavailable);
  };

  const handleDocumentError = (failure) => {
    appendGuide(documentErrorText(failure));
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
    const generationKey = getGenerationKey(draft, user?.id);
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
      if (code === 'AI_BRIEF_GENERATION_KEY_CONFLICT') clearGenerationKey(user?.id);
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

  const openConversation = async (entry) => {
    setConversationId(entry.id);
    setDraft(emptyDraft());
    setMessages([{ id: 'opening-guide', role: 'guide', opening: true, content: copy.opening }]);
    setAction(null);
    setMissing([]);
    setAssumptions([]);
    try {
      const data = await getConversation(entry.id);
      const mapped = (data.messages || []).map((m) => ({
        id: m.id,
        role: String(m.role).toUpperCase() === 'USER' ? 'user' : 'guide',
        content: m.content,
      }));
      if (mapped.length) setMessages(mapped);
      const payload = data.draft?.payload;
      if (payload && typeof payload === 'object') {
        const restoredDraft = normalizeDraft(payload.draft ?? payload);
        const restoredAction = typeof payload.action === 'string' ? payload.action : null;
        const restoredMissing = Array.isArray(payload.missing) ? payload.missing : [];
        const restoredAssumptions = normalizeAssumptions(payload.assumptions);
        setDraft(restoredDraft);
        setAction(restoredAction);
        setMissing(restoredMissing);
        setAssumptions(restoredAssumptions);
        /* 刚从服务端读回来的草稿，别再原样写回去。 */
        serverDraftRef.current = JSON.stringify({
          draft: restoredDraft,
          action: restoredAction,
          missing: restoredMissing,
          assumptions: restoredAssumptions,
        });
      }
    } catch { /* 打不开就停在新会话，不把页面搞死 */ }
    setError('');
    setGenerateError('');
    setGenerating(false);
    setDocResult(null);
    setDocInputs({ decision: '', audience: '' });
    setManualOpen(false);
    clearGenerationKey(user?.id);
  };

  const removeConversation = async (id) => {
    try {
      await deleteRemoteConversation(id);
      await conversationList.refetch();
    } catch { /* 删不掉就留着，别假装删了 */ }
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
            <button
              type="button"
              onClick={() => setAssistantOpen((value) => !value)}
              aria-label={assistantOpen ? copy.collapse : copy.expand}
              title={assistantOpen ? copy.collapse : copy.expand}
              aria-expanded={assistantOpen}
            >
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
                <button type="button" className="business-ai-brief-assistant-delete" onClick={() => removeConversation(entry.id)} aria-label={copy.deleteChat} title={copy.deleteChat}><Trash2 size={14} /></button>
              </div>
            )) : <p className="business-ai-brief-assistant-empty">{copy.emptyHistory}</p>}
          </div>
          <AiCreditsMenu language={language} onNavigate={(path) => navigate(withLanguage(path, language))} />
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
            <AiAssistantChat
              copy={copy}
              language={language}
              messages={messages}
              busy={busy}
              error={error}
              onSend={sendMessage}
              onDocumentStart={handleDocumentStart}
              onDocumentAnalyzed={handleDocumentAnalyzed}
              onDocumentError={handleDocumentError}
              composerRef={composerRef}
              autoOpenDocument={new URLSearchParams(location.search).get('attach') === 'document'}
              footer={<>
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
              </>}
            >
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

              {showDraft && !docResult && (
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

              {docResult && (
                <section className="business-ai-doc-result" aria-label={copy.documentFrom}>
                  <header>
                    <span>{copy.documentFrom}</span>
                    <em>{docResult.source?.kind || ''}</em>
                  </header>
                  {docResult.summary && <p>{docResult.summary}</p>}
                  <details>
                    <summary>{copy.documentViewExtracted}</summary>
                    <dl>
                      <div><dt>{copy.decision}</dt><dd>{draft.decision || copy.notSet}</dd></div>
                      <div><dt>{copy.audience}</dt><dd>{draft.audience || copy.notSet}</dd></div>
                      <div><dt>{copy.serviceCategory}</dt><dd>{serviceLabel(draft.serviceCategory, copy)}</dd></div>
                      <div><dt>{copy.studyFormat}</dt><dd>{methodLabel(draft.studyFormat, copy)}</dd></div>
                      <div><dt>{copy.market}</dt><dd>{draft.market || copy.notSet}</dd></div>
                      <div><dt>{copy.sample}</dt><dd>{draft.sample || copy.notSet}</dd></div>
                    </dl>
                  </details>
                  {docResult.missing.length > 0 && (
                    <div className="business-ai-doc-missing">
                      <strong>{copy.documentMissing}</strong>
                      {docResult.missing.includes('decision') && (
                        <label>{copy.decision}<input value={docInputs.decision} onChange={(event) => setDocInputs((current) => ({ ...current, decision: event.target.value }))} onKeyDown={(event) => { if (event.key === 'Enter') applyDocumentField('decision', docInputs.decision); }} /><button type="button" onClick={() => applyDocumentField('decision', docInputs.decision)}>{copy.documentSet}</button></label>
                      )}
                      {docResult.missing.includes('audience') && (
                        <label>{copy.audience}<input value={docInputs.audience} onChange={(event) => setDocInputs((current) => ({ ...current, audience: event.target.value }))} onKeyDown={(event) => { if (event.key === 'Enter') applyDocumentField('audience', docInputs.audience); }} /><button type="button" onClick={() => applyDocumentField('audience', docInputs.audience)}>{copy.documentSet}</button></label>
                      )}
                      {docResult.missing.includes('serviceCategory') && (
                        <div className="business-ai-doc-choice">
                          <span>{copy.serviceCategory}</span>
                          <button type="button" onClick={() => applyDocumentField('serviceCategory', 'SURVEY')}>{copy.serviceSurvey}</button>
                          <button type="button" onClick={() => applyDocumentField('serviceCategory', 'CUSTOM_RESEARCH')}>{copy.customResearch}</button>
                          <button type="button" onClick={() => applyDocumentField('serviceCategory', 'QUALITATIVE_SUPPORT')}>{copy.qualitativeSupport}</button>
                        </div>
                      )}
                      {docResult.missing.includes('studyFormat') && (
                        <div className="business-ai-doc-choice">
                          <span>{copy.studyFormat}</span>
                          <button type="button" onClick={() => applyDocumentField('studyFormat', 'SURVEY')}>{copy.methodSurvey}</button>
                          <button type="button" onClick={() => applyDocumentField('studyFormat', 'INTERVIEW')}>{copy.methodInterview}</button>
                          <button type="button" onClick={() => applyDocumentField('studyFormat', 'GROUP_DISCUSSION')}>{copy.methodGroup}</button>
                          <button type="button" onClick={() => applyDocumentField('studyFormat', 'USABILITY_TEST')}>{copy.methodUsability}</button>
                          <button type="button" onClick={() => applyDocumentField('studyFormat', 'OTHER')}>{copy.methodOther}</button>
                        </div>
                      )}
                    </div>
                  )}
                </section>
              )}

              {needsServiceCategory && !docResult && (
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

              {action === 'ASK' && !needsServiceCategory && !docResult && missing.length > 0 && (
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

            </AiAssistantChat>
          </section>
        </section>
      </div>
    </main>
  );
}
