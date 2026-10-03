import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, LoaderCircle, PanelLeft, PanelLeftClose, Plus, Send, Sparkles, Trash2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject, getResearchBriefGuidance } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import BusinessBalanceChip from '../components/BusinessBalanceChip';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';
import '../components/BusinessRail.css';
import BusinessRail from '../components/BusinessRail';

const steps = ['goal', 'route', 'audience', 'market', 'sample', 'timeline'];
const PENDING_BRIEF_STORAGE_KEY = 'guanyisearch.business-ai-brief.pending.v2';
const starterPrompts = {
  en: [
    'How do Chinese consumers feel about smartwatches that use AI health features?',
    'What would make shoppers in Japan and South Korea switch skincare brands?',
    'How do first-time parents in the UK decide whether a food delivery service is trustworthy?',
    'Which concerns stop German small businesses from using AI accounting tools?',
  ],
  zh: [
    '中国消费者如何看待带有 AI 健康功能的智能手表？',
    '什么因素会让日本和韩国的消费者更换护肤品牌？',
    '英国新手父母如何判断一家外卖服务是否值得信任？',
    '哪些顾虑阻碍德国小型企业使用 AI 财务工具？',
  ],
};

function readPendingBrief() {
  try {
    const value = JSON.parse(sessionStorage.getItem(PENDING_BRIEF_STORAGE_KEY) || 'null');
    return value && typeof value === 'object' ? value : null;
  } catch { return null; }
}

function clearPendingBrief() {
  try { sessionStorage.removeItem(PENDING_BRIEF_STORAGE_KEY); } catch { /* Restricted browser context. */ }
}

const BRIEF_HISTORY_STORAGE_KEY = 'guanyisearch.business-ai-brief.history.v1';
const BRIEF_HISTORY_LIMIT = 30;

function newConversationId() {
  return `brief-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

/* The assistant panel lists conversations, and it can only ever list the ones
   the user actually had. There is no backend for chat history, and the research
   records themselves live in the workspace, so this is a device-local list —
   never a stand-in for real project data. */
function readBriefHistory() {
  try {
    const value = JSON.parse(localStorage.getItem(BRIEF_HISTORY_STORAGE_KEY) || '[]');
    return Array.isArray(value)
      ? value.filter((item) => item && typeof item === 'object' && typeof item.id === 'string')
      : [];
  } catch { return []; }
}

function writeBriefHistory(items) {
  try {
    localStorage.setItem(BRIEF_HISTORY_STORAGE_KEY, JSON.stringify(items.slice(0, BRIEF_HISTORY_LIMIT)));
  } catch { /* Restricted browser context — the flow still works without history. */ }
}

function containsChinese(value) { return /[\u3400-\u9FFF]/.test(String(value || '')); }

function projectTitle(value, fallback) {
  const compact = String(value || '').replaceAll(/\s+/g, ' ').trim();
  return !compact ? fallback : (compact.length > 62 ? `${compact.slice(0, 59)}…` : compact);
}

function conversationWhen(value, language) {
  const time = Number(value) || 0;
  if (!time) return '';
  try {
    return new Intl.DateTimeFormat(language, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(time));
  } catch { return ''; }
}

export default function BusinessAiBrief() {
  const { user } = useAuth();
  const { language, publicCopy } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  // Copy comes from the language library, not from this file: it used to keep
  // its own zh/en pair, so the other 16 languages fell back to English here.
  const aiBrief = publicCopy?.workspace?.business?.aiBrief || {};
  const text = aiBrief[language] || aiBrief['en-US'] || {};
  // The guided conversation follows the language the user writes in, which is
  // not always the interface language — see conversationText below.
  const zhText = aiBrief['zh-CN'] || text;
  // Guard the nested maps: a partially regenerated language library must
  // degrade to blank labels, never white-screen the page.
  const textFields = (value) => (value && value.fields) || {};
  const [pendingBrief] = useState(() => readPendingBrief());
  const requestedPrompt = String(location.state?.initialPrompt || '').trim();
  const initialPrompt = requestedPrompt || String(pendingBrief?.brief?.goal || '').trim();
  const displayName = String(user?.displayName || user?.email?.split('@')[0] || text.displayNameFallback).trim();
  const [brief, setBrief] = useState(() => ({ goal: initialPrompt, route: requestedPrompt ? '' : String(pendingBrief?.brief?.route || ''), audience: requestedPrompt ? '' : String(pendingBrief?.brief?.audience || ''), market: requestedPrompt ? '' : String(pendingBrief?.brief?.market || ''), sample: requestedPrompt ? '' : String(pendingBrief?.brief?.sample || ''), timeline: requestedPrompt ? '' : String(pendingBrief?.brief?.timeline || '') }));
  const [messages, setMessages] = useState(() => {
    if (!requestedPrompt && Array.isArray(pendingBrief?.messages) && pendingBrief.messages.length) return pendingBrief.messages;
    const opening = { id: 'opening-guide', role: 'guide', opening: true, content: text.opening };
    if (!initialPrompt) return [opening];
    const responseText = containsChinese(initialPrompt) ? zhText : text;
    return [opening, { id: 'opening-user', role: 'user', content: initialPrompt }, { id: 'opening-next', role: 'guide', content: responseText.next.route }];
  });
  const [activeStep, setActiveStep] = useState(() => requestedPrompt ? 1 : Math.min(Math.max(Number(pendingBrief?.activeStep) || 0, 0), steps.length));
  const [reply, setReply] = useState('');
  const [routeChoice, setRouteChoice] = useState('');
  const [saving, setSaving] = useState(false);
  const [guiding, setGuiding] = useState(false);
  const [error, setError] = useState('');
  const [guidanceWarning, setGuidanceWarning] = useState('');
  const [exampleIndex, setExampleIndex] = useState(() => Math.floor(Math.random() * starterPrompts[language === 'zh-CN' ? 'zh' : 'en'].length));
  const [typedExample, setTypedExample] = useState('');
  const [conversationId, setConversationId] = useState(() => newConversationId());
  const [history, setHistory] = useState(() => readBriefHistory());
  const [assistantOpen, setAssistantOpen] = useState(true);
  const conversationEndRef = useRef(null);
  const title = useMemo(() => projectTitle(brief.goal, text.newBrief), [brief.goal, text.newBrief]);
  const activeField = steps[activeStep];
  const ready = activeStep >= steps.length;
  const capturedCount = steps.filter((field) => field !== 'route' && brief[field]).length;
  const hasStarted = messages.some((message) => message.role === 'user');
  const examples = starterPrompts[language === 'zh-CN' ? 'zh' : 'en'];
  const example = examples[exampleIndex % examples.length];

  // A conversation follows the language the user actually writes in, which is
  // not necessarily the UI language: an en-US interface can receive a Chinese
  // question. The messages already worked this way; the route card and the
  // prompt after picking a route were still keyed to the UI language, so a
  // Chinese question got a Chinese answer next to an English option list.
  const conversationInChinese = containsChinese(brief.goal) || messages.some((message) => containsChinese(message.content));
  const conversationText = conversationInChinese ? zhText : text;

  // The three service routes used to be a fixed strip at the bottom of the page.
  // They are now the same card the guide "says" inside the conversation, which
  // is how Apollo presents a choice: a labelled group, a selected state and one
  // confirmation action. The chosen value still goes through selectRoute, so the
  // downstream flow is unchanged.
  const routeOptions = conversationText.routes || [];
  const chosenRoute = routeOptions.find((option) => option.value === routeChoice);

  useEffect(() => {
    try { sessionStorage.setItem(PENDING_BRIEF_STORAGE_KEY, JSON.stringify({ brief, messages, activeStep })); } catch { /* The flow still works without session storage. */ }
    // A conversation joins the assistant's list as soon as the user has said
    // something; an untouched opening screen is not a conversation.
    if (!messages.some((message) => message.role === 'user')) return;
    const entry = { id: conversationId, title: projectTitle(brief.goal, text.newBrief), updatedAt: Date.now(), brief, messages, activeStep };
    const next = [entry, ...readBriefHistory().filter((item) => item.id !== conversationId)].slice(0, BRIEF_HISTORY_LIMIT);
    writeBriefHistory(next);
    setHistory(next);
  }, [activeStep, brief, messages, conversationId, text.newBrief]);

  useEffect(() => {
    if (hasStarted) return undefined;
    let cancelled = false;
    let timer;
    const type = (index) => {
      if (cancelled) return;
      setTypedExample(example.slice(0, index));
      if (index < example.length) {
        timer = window.setTimeout(() => type(index + 1), 74);
      } else {
        timer = window.setTimeout(() => {
          if (cancelled) return;
          setTypedExample('');
          setExampleIndex((current) => (current + 1) % examples.length);
        }, 2400);
      }
    };
    type(0);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [example, examples.length, hasStarted]);

  useEffect(() => {
    if (!hasStarted || guiding) return;
    const frame = window.requestAnimationFrame(() => conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }));
    return () => window.cancelAnimationFrame(frame);
  }, [guiding, hasStarted, messages.length]);

  const leaveBrief = () => { clearPendingBrief(); navigate(withLanguage('/business/workspace', language)); };

  // ---- assistant panel: the conversation list lives on this device only ----

  const openingMessage = () => ({ id: 'opening-guide', role: 'guide', opening: true, content: text.opening });

  const startNewChat = () => {
    setConversationId(newConversationId());
    setBrief({ goal: '', route: '', audience: '', market: '', sample: '', timeline: '' });
    setMessages([openingMessage()]);
    setActiveStep(0);
    setRouteChoice(''); setReply(''); setError(''); setGuidanceWarning('');
    clearPendingBrief();
  };

  const openConversation = (entry) => {
    setConversationId(entry.id);
    setBrief({
      goal: String(entry.brief?.goal || ''),
      route: String(entry.brief?.route || ''),
      audience: String(entry.brief?.audience || ''),
      market: String(entry.brief?.market || ''),
      sample: String(entry.brief?.sample || ''),
      timeline: String(entry.brief?.timeline || ''),
    });
    setMessages(Array.isArray(entry.messages) && entry.messages.length ? entry.messages : [openingMessage()]);
    setActiveStep(Math.min(Math.max(Number(entry.activeStep) || 0, 0), steps.length));
    setRouteChoice(''); setReply(''); setError(''); setGuidanceWarning('');
  };

  const removeConversation = (id) => {
    const next = readBriefHistory().filter((item) => item.id !== id);
    writeBriefHistory(next);
    setHistory(next);
    if (id === conversationId) startNewChat();
  };

  // The shared rail (components/BusinessRail) replaces this page's own icon
  // strip. Every entry keeps the destination it had here: "Overview" still
  // leaves the brief and clears the pending draft, the rest open a workspace
  // view, and "AI research guide" is this page.
  const handleRailSelect = (id) => {
    if (id === 'ai') return;
    if (id === 'home') { leaveBrief(); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  const addReply = async (event) => {
    event.preventDefault();
    const value = reply.trim();
    if (!value || guiding) return;
    if (ready) { setMessages((current) => [...current, { id: `user-note-${current.length}`, role: 'user', content: value }]); setReply(''); return; }
    const nextIndex = activeStep + 1;
    const nextField = steps[nextIndex] || null;
    const updatedBrief = { ...brief, [activeField]: value };
    const shouldReplyInChinese = containsChinese(value) || containsChinese(updatedBrief.goal) || messages.some((message) => containsChinese(message.content));
    const responseText = shouldReplyInChinese ? zhText : text;
    setBrief(updatedBrief);
    setMessages((current) => [...current, { id: `user-${activeField}-${current.length}`, role: 'user', content: value }]);
    setActiveStep(nextIndex); setReply(''); setGuidanceWarning(''); setGuiding(true);
    if (nextField === 'route') {
      setMessages((current) => [...current, { id: `guide-route-${current.length}`, role: 'guide', content: responseText.next.route }]);
      setGuiding(false);
      return;
    }
    try {
      const response = await getResearchBriefGuidance({ brief: updatedBrief, currentField: activeField, nextField, responseLanguage: shouldReplyInChinese ? 'zh' : 'en' });
      const guidance = response.data.guidance;
      const additions = [guidance.reply];
      if (guidance.suggestedResearchFocus) additions.push(`${responseText.suggestedFocus}: ${guidance.suggestedResearchFocus}`);
      if (guidance.safetyNote) additions.push(`${responseText.methodNote}: ${guidance.safetyNote}`);
      setMessages((current) => [...current, { id: `guide-${activeField}-${current.length}`, role: 'guide', content: additions.join('\n\n') }]);
    } catch {
      setGuidanceWarning(responseText.guideUnavailable);
      setMessages((current) => [...current, { id: `guide-${activeField}-fallback-${current.length}`, role: 'guide', content: `${responseText.manualGuide}: ${responseText.next[nextField || 'ready']}` }]);
    } finally { setGuiding(false); }
  };

  const selectRoute = (route, label) => {
    if (activeField !== 'route') return;
    const responseText = conversationText;
    setBrief((current) => ({ ...current, route }));
    setMessages((current) => [...current, { id: `user-route-${current.length}`, role: 'user', content: label }, { id: `guide-route-next-${current.length}`, role: 'guide', content: responseText.next.audience }]);
    setActiveStep((current) => current + 1);
  };

  const saveBrief = async () => {
    if (!ready || saving) return;
    setSaving(true); setError('');
    try {
      const parsedSample = Number.parseInt(String(brief.sample).replaceAll(/[^0-9]/g, ''), 10);
      const prepared = { title, researchGoal: brief.goal, audienceDescription: brief.audience, countries: brief.market, languages: '', targetParticipants: Number.isFinite(parsedSample) ? parsedSample : '', timeline: brief.timeline, additionalContext: '' };
      if (brief.route === 'QUESTIONNAIRE_SERVICE') {
        clearPendingBrief();
        navigate(withLanguage('/business/custom-questionnaire', language), { state: { preparedRequest: prepared } });
        return;
      }
      if (brief.route === 'AUDIENCE_RECRUITMENT') {
        clearPendingBrief();
        navigate(withLanguage('/business/audience-plan', language), { state: { preparedPlan: prepared } });
        return;
      }
      const response = await createBusinessProject({ title, researchGoal: brief.goal, audienceDescription: brief.audience, studyFormat: 'INTERVIEW', countries: brief.market, targetParticipants: Number.isFinite(parsedSample) ? parsedSample : undefined, timeline: brief.timeline, incentiveBudget: 'NEED_GUIDANCE', additionalContext: '', selfServiceQuestionnaire: false });
      clearPendingBrief();
      navigate(withLanguage('/business/workspace?view=projects', language), { state: { message: text.savedDraftMessage } });
    } catch { setError(conversationText.saveError); } finally { setSaving(false); }
  };

  return <main className="business-ai-brief-page notranslate" translate="no" data-translate="no">
    <div className={`business-ai-brief-shell${assistantOpen ? ' has-assistant' : ''}`}>
      <BusinessRail className="business-ai-brief-rail" activeId="ai" onSelect={handleRailSelect} />
      {assistantOpen && (
        <aside className="business-ai-brief-assistant" aria-label={text.assistantTitle}>
          <header>
            <strong>{text.assistantTitle}</strong>
            <button type="button" onClick={() => setAssistantOpen(false)} aria-label={text.collapsePanel}><PanelLeftClose size={17} /></button>
          </header>
          <div className="business-ai-brief-assistant-actions">
            <button type="button" onClick={startNewChat}><Plus size={15} /> {text.startNewChat}</button>
            <button type="button" onClick={leaveBrief}><ArrowLeft size={15} /> {text.back}</button>
          </div>
          <p className="business-ai-brief-assistant-section">{text.chatsLabel}</p>
          <div className="business-ai-brief-assistant-list">
            {history.length ? history.map((entry) => (
              <div key={entry.id} className={entry.id === conversationId ? 'is-current' : ''}>
                <button type="button" className="business-ai-brief-assistant-open" onClick={() => openConversation(entry)} aria-current={entry.id === conversationId ? 'true' : undefined}>
                  <strong>{entry.title}</strong>
                  <small>{conversationWhen(entry.updatedAt, language)}</small>
                </button>
                <button type="button" className="business-ai-brief-assistant-delete" onClick={() => removeConversation(entry.id)} aria-label={text.deleteChat}><Trash2 size={14} /></button>
              </div>
            )) : <p className="business-ai-brief-assistant-empty">{text.noChats}</p>}
          </div>
        </aside>
      )}
      <section className="business-ai-brief-surface">
        <header className="business-ai-brief-header"><div className="business-ai-brief-brand"><img className="business-ai-brief-wordmark" src="/guanyisearch-wordmark.png" alt="guanyisearch" />{hasStarted && <><span aria-hidden="true">/</span><strong>{title}</strong></>}</div><div className="business-ai-brief-tools">{!assistantOpen && <button className="business-ai-brief-panel-toggle" type="button" onClick={() => setAssistantOpen(true)} aria-label={text.showPanel}><PanelLeft size={17} /></button>}<div className="business-ai-brief-actions"><button className="business-ai-brief-back" type="button" onClick={leaveBrief}><ArrowLeft size={16} /> {text.back}</button><details className="business-ai-project-history"><summary>{text.history} <ChevronDown size={14} /></summary><div><p>{text.progress}</p><strong>{title}</strong><span>{(typeof text.captured === 'function' ? text.captured(capturedCount, steps.length - 1) : '')}</span>{steps.filter((field) => brief[field]).map((field) => <p className="business-ai-history-field" key={field}><Check size={13} /><b>{textFields(text)[field]}</b><em>{brief[field]}</em></p>)}</div></details></div><BusinessBalanceChip />
          <NotificationBell className="business-workspace-notification" /></div></header>
        <section className={`business-ai-conversation${hasStarted ? ' is-started' : ' is-waiting'}`} aria-label={text.newBrief}>
          <div className="business-ai-conversation-log" role="log" aria-live="polite">{messages.filter((message) => !message.opening || !hasStarted).map((message) => <article key={message.id} className={`${message.role === 'user' ? 'is-user' : 'is-guide'}${message.opening ? ' is-opening' : ''}`}>{message.role === 'guide' && <span className="business-ai-guide-mark" aria-hidden="true"><Sparkles size={14} /></span>}{message.opening ? <h1>{message.content}<span className="business-ai-title-question">{text.questionMark}</span></h1> : <p>{message.content}</p>}</article>)}
          {activeField === 'route' && (
            <section className="business-ai-route-card" aria-label={conversationText.routeTitle}>
              <p className="business-ai-route-card-title">{conversationText.routeTitle}</p>
              <div className="business-ai-route-options" role="radiogroup" aria-label={conversationText.routeTitle}>
                {routeOptions.map((option) => (
                  <button key={option.value} type="button" role="radio" aria-checked={routeChoice === option.value} className={routeChoice === option.value ? 'is-selected' : ''} onClick={() => setRouteChoice(option.value)}>
                    <i aria-hidden="true" />
                    <span><b>{option.label}</b><small>{option.note}</small></span>
                  </button>
                ))}
              </div>
              <div className="business-ai-route-actions">
                <button className="business-button" type="button" disabled={!routeChoice} onClick={() => selectRoute(routeChoice, chosenRoute ? chosenRoute.label : '')}>{conversationText.routeContinue} <ArrowRight size={16} /></button>
              </div>
            </section>
          )}
          {!hasStarted && <p className="business-ai-starter-example"><span>{text.exampleLabel}</span><strong>{typedExample}</strong><i aria-hidden="true" /></p>}<span className="business-ai-conversation-end" ref={conversationEndRef} aria-hidden="true" /></div>
          {(activeField !== 'route' || guidanceWarning || error) && <div className="business-ai-dock"><div className="business-ai-dock-meta"><p className="business-ai-brief-note">{text.note}</p><p className="business-ai-brief-data-notice">{text.dataNotice}</p></div>{guidanceWarning && <p className="business-ai-brief-error" role="status">{guidanceWarning}</p>}{ready && <button className="business-button business-ai-save" type="button" disabled={saving} onClick={saveBrief}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : conversationText.save} {!saving && <ArrowRight size={16} />}</button>}{error && <p className="business-ai-brief-error" role="alert">{error}</p>}{activeField !== 'route' && <form className="business-ai-composer" onSubmit={addReply}><textarea value={reply} disabled={guiding} onChange={(event) => setReply(event.target.value)} placeholder={hasStarted ? conversationText.placeholders[ready ? 'done' : activeField] : ''} aria-label={conversationText.placeholders[ready ? 'done' : activeField]} /><button type="submit" disabled={!reply.trim() || guiding} aria-label="Send">{guiding ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}</button></form>}</div>}
        </section>
      </section>
    </div>
  </main>;
}
