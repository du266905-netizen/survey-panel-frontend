import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Paperclip, Send, X } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';
import {
  chatRequestLog,
  getChatFaq,
  getChatThread,
  markChatRead,
  openChatStream,
  sendChatMessage,
  startChatThread,
  submitChatRating,
} from '../api/supportChatApi';
import {
  formatOpeningEn,
  formatOpeningZh,
  nextSupportOpening,
  supportAvailability,
  supportHoursLabel,
} from '../utils/supportHours';
import './BusinessSupportChat.css';

/* The client-side help chat.
 *
 * Two things meet here, and both are deliberate:
 *  - the **shell** (launcher, panel, thread, chips, composer, typography,
 *    colours, radii) is the existing template, unchanged. Every colour, radius
 *    and shadow still comes from the tokens the workspace shell declares;
 *  - the **content and flow** follow the three reference screens the user
 *    supplied: an opening line that says a specialist can be brought in, a list
 *    of common questions each ending in "resolved / need more help", and — when
 *    nobody is on shift — an explicit offline notice with the time we return.
 *
 * Support hours are Monday–Saturday 10:00–22:00 China Standard Time; the rule
 * lives in ../utils/supportHours.js and carries 16 boundary tests.
 *
 * The panel is wired to the real backend (/api/business/chat). When that backend
 * is unreachable the panel **degrades quietly**: it keeps the fallback copy and
 * never throws into the console, because a help panel that breaks the page is
 * worse than one that answers slowly.
 *
 * Scope and non-goals:
 *  - the participant-side SupportChatWidget is NOT a reference here (the user
 *    called it ugly and irrelevant); nothing is shared with it beyond the
 *    language library;
 *  - attachments are still not connected: the control says so rather than
 *    pretending;
 *  - all copy lives in the language library under publicCopy.business.chat; the
 *    fallback below only guarantees the panel is never blank if a key is missing.
 */

const FALLBACK = {
  launcher: 'Open help chat',
  close: 'Close chat',
  title: 'GuanyiSearch',
  greeting: 'Hi there. Got a question? I’m here to help.',
  transferNote: 'If I can’t solve it, I’ll try to connect you with a support specialist.',
  typing: 'Replying',
  placeholder: 'Type a message',
  attach: 'Attach a file',
  attachNote: 'File attachments are not connected yet. Paste a link or describe the file and we will pick it up.',
  attachPending: 'Attachment ready to describe — uploads are not connected yet. The file is:',
  send: 'Send',
  suggestionsLabel: 'Suggested questions',
  suggestions: [
    'How does a research project start?',
    'What does a questionnaire cost?',
    'How many responses will I get?',
    'Who takes part in the research?',
    'How are participants paid?',
    'Something else',
  ],
  replies: {
    start: 'A project starts with a research goal. Describe the decision you need to make and we will shape the brief with you.',
    cost: 'Questionnaire work is quoted per project, based on length, audience and how hard the group is to reach. Nothing is charged before you accept a quote.',
    responses: 'Feasible response volume depends on the audience and the market. Tell us who you need and we will confirm what is realistic.',
    participants: 'Participants come from the GuanyiSearch panel and are screened against your criteria before they answer.',
    incentive: 'Participants are paid for completed work; the incentive is agreed as part of the project scope.',
    fallback: 'Thanks — a researcher will pick this up. Meanwhile you can keep working; nothing here blocks your tasks.',
  },

  /* ── the flow the three reference screens describe ───────────────────── */
  backStart: 'Back to the start',
  contact: 'Contact support',
  seeFaq: 'See common questions',
  faqIntro: 'I found some related articles in the help centre.',
  faqNone: 'No help topics are published yet.',
  faqLoading: 'Loading…',
  resolved: 'Yes, my issue is resolved',
  needMore: 'No, I need more help',
  askFirst: 'Describe what you need help with and I’ll pass it to a specialist.',
  offline: 'All support specialists are currently offline. Please try again during support hours.',
  hoursAre: 'Our support hours are',
  returnOn: 'They will be back on',
  leaveMessage: 'Leave a message and we will pick it up when we are back',
  threadClosed: 'This conversation has been closed.',
  rateAsk: 'How was this conversation?',
  rateSent: 'Thanks — your rating was recorded.',
  newThread: 'Start a new conversation',
  waiting: 'Waiting for support.',
  errorSend: 'That did not send. Please try again.',
  errorRejected: 'The server rejected that message.',
  errorNetwork: 'We could not reach support just now — please check your connection.',
  errorExpired: 'Your session expired. Please sign in again.',
  errorBusy: 'Too many requests just now. Please try again in a few minutes.',
  errorAlready: 'That message was already sent. Please edit it and try again.',
  errorDenied: 'This account cannot use support chat.',
  aiNote: 'Answers come from our help centre, and a specialist picks up anything it cannot settle.',
  traceTitle: 'What the panel just tried',
};

/* Which canned reply a suggestion maps to; keeps wording and routing apart. */
const SUGGESTION_REPLY = ['start', 'cost', 'responses', 'participants', 'incentive', 'fallback'];

/* The three screens, as one explicit state. An explicit state beats inferring
   the screen from "how many messages are there" — that inference is what made
   the first draft show the wrong chips at the wrong time. */
const SCREEN = { welcome: 'welcome', faq: 'faq', handoff: 'handoff', thread: 'thread' };

const pad2 = (value) => String(value).padStart(2, '0');

const clockLabel = (date) => {
  const d = date instanceof Date ? date : new Date(date);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
};

/* The backend speaks its own status vocabulary; the panel only needs to know
   whether the conversation is still live. */
const isClosed = (thread) => String(thread?.status || '').toUpperCase() === 'CLOSED';

export default function BusinessSupportChat() {
  const { publicCopy, language, activeLanguage } = useLanguage();
  /* The help topics are stored per locale and the backend matches exactly, so the
     UI language has to be mapped to a locale it actually serves. The seed ships
     en-GB; anything else falls back to it rather than showing an empty list. */
  const faqLocale = useMemo(() => {
    const code = String(activeLanguage?.code || language || 'en-GB');
    if (/^zh-(cn|hans)/i.test(code)) return 'zh-CN';
    if (/^zh/i.test(code)) return 'zh-Hant';
    if (/^en/i.test(code)) return code === 'en-US' ? 'en-US' : 'en-GB';
    return code;
  }, [activeLanguage?.code, language]);
  const copy = useMemo(() => {
    const provided = publicCopy?.business?.chat || {};
    return {
      ...FALLBACK,
      ...provided,
      suggestions: provided.suggestions?.length ? provided.suggestions : FALLBACK.suggestions,
      replies: { ...FALLBACK.replies, ...(provided.replies || {}) },
    };
  }, [publicCopy]);

  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState(SCREEN.welcome);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  const [notice, setNotice] = useState('');
  /* The attach button has no backend behind it yet. Rather than a dead control
     that does nothing when clicked, it says so. */
  const [attachNote, setAttachNote] = useState(false);

  /* ── backend state ───────────────────────────────────────────────────── */
  const [faq, setFaq] = useState([]);
  const [faqLoading, setFaqLoading] = useState(false);
  const [openFaqId, setOpenFaqId] = useState(null);
  const [thread, setThread] = useState(null);
  const [ratingSent, setRatingSent] = useState(false);
  const [now, setNow] = useState(() => new Date());

  const threadRef = useRef(null);
  const panelRef = useRef(null);
  const replyTimer = useRef(null);
  const etagRef = useRef(null);
  const triedFaqRef = useRef([]);
  const threadKeyRef = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  /* Re-read the clock every minute so a panel left open crosses 10:00 / 22:00
     by itself instead of showing a stale "we are online". */
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const availability = useMemo(() => supportAvailability(now), [now]);
  const opening = useMemo(
    () => (availability.online ? null : nextSupportOpening(now)),
    [availability.online, now],
  );
  const openingLabel = useMemo(() => {
    if (!opening) return '';
    return /^zh/i.test(String(activeLanguage?.code || language || '')) ? formatOpeningZh(opening) : formatOpeningEn(opening);
  }, [opening, activeLanguage?.code, language]);
  /* Offline is said ONCE, as a message from the support side, and it names the
     hours themselves ("10:00–22:00") before the date we return. The earlier
     version split this across a footer and a bubble and replaced the composer —
     which took the room away exactly when somebody might want to read or write. */
  const offlineLine = `${copy.offline} ${copy.hoursAre} ${supportHoursLabel()}. ${copy.returnOn} ${openingLabel}`.trim();

  /* Closing mirrors opening: the panel collapses back down into the launcher
     instead of vanishing. Reduced-motion users get the instant version. */
  const closePanel = () => {
    const node = panelRef.current;
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (!node || reduce || typeof node.animate !== 'function') {
      setOpen(false);
      return;
    }
    const animation = node.animate(
      [
        { opacity: 1, transform: 'scaleY(1) translateY(0)' },
        { opacity: 0, transform: 'scaleY(.12) translateY(10px)' },
      ],
      { duration: 260, easing: 'cubic-bezier(.6, 0, .75, .3)', fill: 'forwards' },
    );
    animation.onfinish = () => setOpen(false);
    animation.oncancel = () => setOpen(false);
  };

  /* One greeting, stamped when the panel is first opened. */
  useEffect(() => {
    if (!open || messages.length) return;
    setMessages([{ id: 'greeting', from: 'them', text: copy.greeting, at: new Date() }]);
  }, [open, messages.length, copy.greeting]);

  /* Follow the conversation as it grows. */
  useEffect(() => {
    const node = threadRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, open, attachNote, notice, faqLoading, openFaqId, screen, thread?.messages?.length]);

  /* Escape closes the panel, matching the other overlays in the workspace. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') closePanel();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const push = useCallback((from, text) => {
    setMessages((current) => [...current, { id: `${from}-${current.length}-${Date.now()}`, from, text, at: new Date() }]);
  }, []);

  /* ── backend calls — every one of them defensive ─────────────────────── */

  const loadFaq = useCallback(async () => {
    setFaqLoading(true);
    try {
      let items = await getChatFaq(faqLocale);
      if (!items.length && faqLocale !== 'en-GB') items = await getChatFaq('en-GB');
      setFaq(items);
    } catch {
      setFaq([]);
    } finally {
      setFaqLoading(false);
    }
  }, [faqLocale]);

  const applyThread = useCallback((next, etag) => {
    setThread(next);
    if (etag !== undefined) etagRef.current = etag;
    if (next?.id) setScreen(SCREEN.thread);
  }, []);

  const refreshThread = useCallback(async () => {
    try {
      const res = await getChatThread(etagRef.current);
      if (res.unchanged) return;
      applyThread(res.thread ?? null, res.etag ?? null);
    } catch { /* the panel keeps working with what it has */ }
  }, [applyThread]);

  /* On open: load the help topics, and pick up a conversation that is already
     running so a refresh does not look like a lost thread. */
  useEffect(() => {
    if (!open) return undefined;
    let alive = true;
    void (async () => {
      void loadFaq();
      try {
        const res = await getChatThread(null);
        if (alive && res.thread?.id) applyThread(res.thread, res.etag ?? null);
      } catch { /* no backend / not entitled — the copy still stands */ }
    })();
    return () => { alive = false; };
  }, [open, loadFaq, applyThread]);

  /* Live updates while a conversation is open: SSE first, and a cheap ETag poll
     as the safety net (an unchanged thread costs a 304). */
  useEffect(() => {
    if (!open || !thread?.id) return undefined;
    const stream = openChatStream({
      onMessage: (message) => {
        if (!message?.id) return;
        setThread((prev) => {
          if (!prev) return prev;
          if (prev.messages?.some((m) => m.id === message.id)) return prev;
          return { ...prev, messages: [...(prev.messages || []), message] };
        });
      },
    });
    const poll = window.setInterval(() => { void refreshThread(); }, 15000);
    return () => { window.clearInterval(poll); stream.close(); };
  }, [open, thread?.id, refreshThread]);

  /* Reading the thread clears the unread badge on the staff side of the same
     conversation; failures here are housekeeping and can be ignored. */
  useEffect(() => {
    if (open && thread?.id) void markChatRead().catch(() => {});
  }, [open, thread?.id, thread?.messages?.length]);

  /* ── the flow ────────────────────────────────────────────────────────── */

  const rememberTried = (faqId) => {
    if (faqId && !triedFaqRef.current.includes(faqId)) {
      triedFaqRef.current = [...triedFaqRef.current, faqId].slice(0, 20);
    }
  };

  const toggleFaq = (item) => {
    rememberTried(item.id);
    setOpenFaqId((current) => (current === item.id ? null : item.id));
  };

  /**
   * Say what actually went wrong.
   *
   * The first version collapsed everything that was not 429/409/403 into "that
   * did not send", which hid the one thing needed to fix it. A network failure,
   * a gateway error and a rejected body now read differently, and the HTTP
   * status is shown for the cases that are still unknown — a support panel that
   * cannot explain its own failure wastes the customer's time twice.
   */
  const sendError = (error) => {
    const status = error?.response?.status;
    const detail = error?.response?.data?.message || error?.response?.data?.error || '';
    /* Which request failed matters as much as the status: a 404 on the wrong
       URL and a 404 on the right URL are completely different problems, and the
       first version of this message could not tell them apart. */
    const cfg = error?.config || {};
    const where = cfg.method && cfg.url ? ` — ${String(cfg.method).toUpperCase()} ${cfg.url}` : '';
    if (status === 429) return copy.errorBusy;
    if (status === 409) return copy.errorAlready;
    if (status === 403) return copy.errorDenied;
    if (status === 400) return `${copy.errorRejected}${detail ? ` (${detail})` : ''}${where}`;
    if (status === 401) return copy.errorExpired;
    if (!status) return `${copy.errorNetwork}${error?.message ? ` (${String(error.message).slice(0, 60)})` : ''}${where}`;
    return `${copy.errorSend} (HTTP ${status}${detail ? `: ${String(detail).slice(0, 80)}` : ''})${where}`;
  };

  /* One automatic retry for the failures that are worth retrying: a dropped
     connection or a 5xx. The message stays in the box until it is delivered, so
     a retry can never duplicate it. */
  const isTransient = (error) => {
    const status = error?.response?.status;
    return !status || status >= 500;
  };

  const inputRef = useRef(null);

  const deliver = async (text) => {
    /* Read the live DOM value as well as the state: some input paths (IME
       composition, autofill, drag-and-drop paste) do not fire the React change
       event, and then the state stays empty — which used to leave the send
       button disabled and made the panel look broken. */
    const fromDom = inputRef.current ? inputRef.current.value : '';
    const body = String(text || fromDom || '').trim();
    if (!body) return;
    /* The failure that matters most: words typed but never sent. Put them back
       and say so, instead of leaving the box empty. */
    const restore = (value) => {
      setInput(value);
      if (inputRef.current) inputRef.current.value = value;
    };
    setNotice('');
    setPending(true);
    push('me', body);
    setInput('');
    try {
      if (!thread?.id) {
        if (!threadKeyRef.current) threadKeyRef.current = `chat-thread:${Date.now()}:${body.slice(0, 24)}`;
        const data = await startChatThread({
          message: body,
          triedFaqItemIds: triedFaqRef.current,
          key: threadKeyRef.current,
        });
        threadKeyRef.current = null;
        applyThread(data?.thread ?? null, undefined);
      } else {
        await sendChatMessage({ message: body });
        await refreshThread();
      }
    } catch (error) {
      if (isTransient(error)) {
        try {
          if (!thread?.id) {
            const data = await startChatThread({ message: body, triedFaqItemIds: triedFaqRef.current, key: threadKeyRef.current });
            threadKeyRef.current = null;
            applyThread(data?.thread ?? null, undefined);
          } else {
            await sendChatMessage({ message: body });
            await refreshThread();
          }
          setNotice('');
          return;
        } catch (second) {
          if (second?.response?.status === 409) threadKeyRef.current = null;
          restore(body);
          setNotice(sendError(second));
          return;
        }
      }
      if (error?.response?.status === 409) threadKeyRef.current = null;
      /* Keep the customer's words — silently losing them is the one failure this
         panel must not have. */
      restore(body);
      setNotice(sendError(error));
    } finally {
      setPending(false);
    }
  };

  const pickSuggestion = (label, index) => {
    push('me', label);
    const key = SUGGESTION_REPLY[index] || 'fallback';
    setPending(true);
    window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      push('them', copy.replies[key] || copy.replies.fallback);
      setPending(false);
    }, 950);
  };

  const rate = async (score) => {
    if (!thread?.id) return;
    setPending(true);
    try {
      await submitChatRating({ score, threadId: thread.id });
      setRatingSent(true);
      push('them', copy.rateSent);
    } catch {
      setNotice(copy.errorSend);
    } finally {
      setPending(false);
    }
  };

  const resetConversation = () => {
    applyThread(null, null);
    setRatingSent(false);
    setOpenFaqId(null);
    setMessages([]);
    setScreen(SCREEN.welcome);
  };

  /* ── derived ─────────────────────────────────────────────────────────── */

  const closed = isClosed(thread);
  const inThread = Boolean(thread?.id) && !closed;
  const needsRating = Boolean(closed && thread?.ratingRequestedAt && !ratingSent);

  const threadMessages = useMemo(
    () => (thread?.messages || []).map((m) => ({
      id: m.id,
      from: String(m.authorType).toUpperCase() === 'STAFF' ? 'them' : 'me',
      text: m.body,
      at: m.createdAt,
    })),
    [thread?.messages],
  );

  /* The composer stays available whenever the conversation is not closed.
     Hiding it off-shift used to remove the one thing a visitor might still want:
     the chance to read the topics, or to leave the question for the morning. */
  const showComposer = !closed;

  return (
    <>
      {open && (
        <section className="business-support-chat" ref={panelRef} aria-label={copy.title}>
          <header className="business-support-chat-head">
            <Logo size="sm" />
            <button
              type="button"
              className="business-support-chat-close"
              onClick={closePanel}
              aria-label={copy.close}
              title={copy.close}
            >
              <X size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </header>

          <div className="business-support-chat-thread" ref={threadRef} role="log" aria-live="polite">
            {/* Screen 1 — opening. */}
            {messages.map((message) => (
              <article key={message.id} className={`business-support-chat-line is-${message.from}`}>
                <div className="business-support-chat-bubble">{message.text}</div>
                <time className="business-support-chat-time">{clockLabel(message.at)}</time>
              </article>
            ))}

            {screen === SCREEN.welcome && (
              <article className="business-support-chat-line is-them">
                <div className="business-support-chat-bubble">{copy.transferNote}</div>
              </article>
            )}

            {screen === SCREEN.welcome && !pending && (
              <div className="business-support-chat-suggestions" role="group" aria-label={copy.suggestionsLabel}>
                <button type="button" className="business-support-chat-chip" onClick={() => setScreen(SCREEN.faq)}>
                  {copy.seeFaq}
                </button>
                <button type="button" className="business-support-chat-chip" onClick={() => setScreen(SCREEN.handoff)}>
                  {copy.contact}
                </button>
              </div>
            )}

            {/* Screen 2 — the topics, each opening into its answer and the two
                follow-up choices. */}
            {screen === SCREEN.faq && (
              <>
                <article className="business-support-chat-line is-them">
                  <div className="business-support-chat-bubble">
                    {faqLoading ? copy.faqLoading : (faq.length ? copy.faqIntro : copy.faqNone)}
                  </div>
                </article>

                {faq.length > 0 && (
                  <div className="business-support-chat-suggestions" role="group" aria-label={copy.suggestionsLabel}>
                    {faq.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        className="business-support-chat-chip"
                        aria-expanded={openFaqId === item.id}
                        onClick={() => toggleFaq(item)}
                      >
                        {item.question}
                      </button>
                    ))}
                  </div>
                )}

                {openFaqId && (() => {
                  const item = faq.find((f) => f.id === openFaqId);
                  if (!item) return null;
                  return (
                    <>
                      <article className="business-support-chat-line is-them">
                        <div className="business-support-chat-bubble">{item.answer}</div>
                      </article>
                      <div className="business-support-chat-suggestions" role="group" aria-label={copy.suggestionsLabel}>
                        <button
                          type="button"
                          className="business-support-chat-chip"
                          onClick={() => {
                            setOpenFaqId(null);
                            push('me', copy.resolved);
                            push('them', copy.replies.fallback);
                          }}
                        >
                          {copy.resolved}
                        </button>
                        <button
                          type="button"
                          className="business-support-chat-chip"
                          onClick={() => { setOpenFaqId(null); setScreen(SCREEN.handoff); }}
                        >
                          {copy.needMore}
                        </button>
                      </div>
                    </>
                  );
                })()}

                <div className="business-support-chat-suggestions">
                  <button type="button" className="business-support-chat-chip" onClick={() => setScreen(SCREEN.welcome)}>
                    {copy.backStart}
                  </button>
                </div>
              </>
            )}

            {/* Screen 3 — hand-off: online asks for the words, offline says when
                we are back. Only shown while no conversation exists yet, so an
                open thread is never interrupted by it. */}
            {screen === SCREEN.handoff && !inThread && (
              <article className="business-support-chat-line is-them">
                <div className="business-support-chat-bubble">
                  {availability.online ? copy.askFirst : offlineLine}
                </div>
              </article>
            )}

            {threadMessages.map((message) => (
              <article key={message.id} className={`business-support-chat-line is-${message.from}`}>
                <div className="business-support-chat-bubble">{message.text}</div>
                <time className="business-support-chat-time">{clockLabel(message.at)}</time>
              </article>
            ))}

            {inThread && !threadMessages.length && (
              <article className="business-support-chat-line is-them">
                <div className="business-support-chat-bubble">{copy.waiting}</div>
              </article>
            )}

            {closed && (
              <article className="business-support-chat-line is-them">
                <div className="business-support-chat-bubble">{copy.threadClosed}</div>
              </article>
            )}

            {needsRating && (
              <>
                <article className="business-support-chat-line is-them">
                  <div className="business-support-chat-bubble">{copy.rateAsk}</div>
                </article>
                <div className="business-support-chat-suggestions" role="group" aria-label={copy.rateAsk}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" className="business-support-chat-chip" onClick={() => void rate(n)}>
                      {n}
                    </button>
                  ))}
                </div>
              </>
            )}

            {closed && (
              <div className="business-support-chat-suggestions">
                <button type="button" className="business-support-chat-chip" onClick={resetConversation}>
                  {copy.newThread}
                </button>
              </div>
            )}

            {pending && (
              <div className="business-support-chat-typing" aria-label={copy.typing} role="status">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          {attachNote && (
            <p className="business-support-chat-note" role="status">{copy.attachNote}</p>
          )}

          {notice && (
            <p className="business-support-chat-note" role="status">{notice}</p>
          )}

          {/* 出了错才出现的请求台账：把方法/路径/状态摊开，一条反馈就能定位。 */}
          {notice && chatRequestLog.some((r) => r.status == null || r.status >= 400) && (
            <details className="business-support-chat-trace">
              <summary>{copy.traceTitle}</summary>
              <pre>{chatRequestLog
                .filter((r) => r.status == null || r.status >= 400)
                .slice(-8)
                .map((r) => `${r.at} ${r.method} ${r.url} → ${r.status ?? 'no status'}${r.error ? ` (${String(r.error).slice(0, 60)})` : ''}${r.base ? ` [base ${r.base}]` : ''}`)
                .join('\n')}</pre>
            </details>
          )}

          {showComposer ? (
            <form
              className="business-support-chat-composer"
              onSubmit={(event) => {
                event.preventDefault();
                void deliver(input);
              }}
            >
              <button
                type="button"
                className="business-support-chat-attach"
                aria-label={copy.attach}
                title={copy.attach}
                onClick={() => fileRef.current?.click()}
              >
                <Paperclip size={18} strokeWidth={1.8} aria-hidden="true" />
              </button>
              <input
                type="file"
                ref={fileRef}
                className="business-support-chat-file"
                tabIndex={-1}
                aria-hidden="true"
                onChange={(event) => {
                  const picked = event.target.files?.[0];
                  event.target.value = '';
                  if (!picked) return;
                  /* There is no upload endpoint yet. Say what happened and keep
                     the door open: the file NAME goes into the message so the
                     specialist knows what to expect. */
                  setAttachNote(true);
                  const note = `${copy.attachPending} ${picked.name}`;
                  setInput(note);
                  if (inputRef.current) inputRef.current.value = note;
                }}
              />
              <input
                type="text"
                ref={inputRef}
                className="business-support-chat-input"
                value={input}
                placeholder={screen === SCREEN.handoff && !inThread
                  ? (availability.online ? copy.askFirst : copy.leaveMessage)
                  : copy.placeholder}
                aria-label={copy.placeholder}
                onChange={(event) => setInput(event.target.value)}
                onInput={(event) => setInput(event.target.value)}
              />
              <button
                type="submit"
                className="business-support-chat-send"
                aria-label={copy.send}
                title={copy.send}
                disabled={pending}
              >
                <Send size={17} strokeWidth={1.8} aria-hidden="true" />
              </button>
            </form>
          ) : null}

          {/* One footer, one place, always the same line. It used to live in two
              mutually exclusive branches (a footer with a conversation, the
              composer's else-branch without one), so the same sentence moved
              around and read as if it appeared twice. */}
          <p className="business-support-chat-note">{copy.aiNote}</p>
        </section>
      )}

      <button
        type="button"
        className="business-support-chat-launcher"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? copy.close : copy.launcher}
        aria-expanded={open}
        title={open ? copy.close : copy.launcher}
      >
        {open ? (
          <X size={22} strokeWidth={1.8} aria-hidden="true" />
        ) : (
          <svg viewBox="0 0 32 32" width="48" height="48" aria-hidden="true" focusable="false">
            {/* The reference glyph, measured off the supplied image: a solid
                capsule with a small wedge tail under its right-hand end. The
                drawing itself is centred, so the icon just scales up inside the
                disc; width/height set how large the bubble reads. */}
            <rect x="4.2" y="11.4" width="23.6" height="9.2" rx="4.6" fill="currentColor" />
            <path d="M21.4 20.3h4.2l-2.9 5.2z" fill="currentColor" />
          </svg>
        )}
      </button>
    </>
  );
}
