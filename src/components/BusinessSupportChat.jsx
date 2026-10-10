import { useEffect, useMemo, useRef, useState } from 'react';
import { Paperclip, Send, X } from 'lucide-react';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';
import './BusinessSupportChat.css';

/* The client-side help chat, shaped after the Cryptomus reference the user
 * supplied: a circular launcher that opens a full-height panel whose header is
 * the GuanyiSearch wordmark, a scrolled conversation, suggested-reply chips, and
 * a composer.
 *
 * Scope and non-goals:
 *  - the participant-side SupportChatWidget is NOT a reference here (the user
 *    called it ugly and irrelevant); nothing is shared with it beyond the
 *    language library;
 *  - there is no chat backend. Replies are static copy chosen from the same
 *    language keys, and nothing is persisted. Do not let this read as a live
 *    support channel.
 *
 * Every colour, radius and shadow comes from the tokens the workspace shell
 * already declares (--ap-*, --business-*), so the panel inherits the page theme
 * instead of inventing a second one. All copy lives in the language library
 * under publicCopy.business.chat; the fallback below only guarantees that the
 * panel is never blank if a key is missing.
 */

const FALLBACK = {
  launcher: 'Open help chat',
  close: 'Close chat',
  title: 'GuanyiSearch',
  greeting: 'Hi there. Got a question? I’m here to help.',
  typing: 'Replying',
  placeholder: 'Type a message',
  attach: 'Attach a file',
  attachNote: 'File attachments are not connected yet. Paste a link or describe the file and we will pick it up.',
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
};

/* Which canned reply a suggestion maps to; keeps wording and routing apart. */
const SUGGESTION_REPLY = ['start', 'cost', 'responses', 'participants', 'incentive', 'fallback'];

const pad2 = (value) => String(value).padStart(2, '0');

function clockLabel(date) {
  return `${pad2(date.getHours())}:${pad2(date.getMinutes())}`;
}

export default function BusinessSupportChat() {
  const { publicCopy } = useLanguage();
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
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState(false);
  /* The attach button has no backend behind it yet. Rather than a dead control
     that does nothing when clicked, it says so. */
  const [attachNote, setAttachNote] = useState(false);
  const threadRef = useRef(null);
  const panelRef = useRef(null);
  const replyTimer = useRef(null);

  /* Clear any half-finished reply when the panel unmounts. */
  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

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
  }, [messages, open, attachNote]);

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

  const push = (from, text) => {
    setMessages((current) => [...current, { id: `${from}-${current.length}-${Date.now()}`, from, text, at: new Date() }]);
  };

  /* There is no chat backend, so an answer is a canned line. Pausing on the
     typing indicator keeps the interaction honest about that and gives the
     panel the loading state the reference has. */
  const scheduleReply = (text) => {
    setPending(true);
    window.clearTimeout(replyTimer.current);
    replyTimer.current = window.setTimeout(() => {
      push('them', text);
      setPending(false);
    }, 950);
  };

  const sendText = (raw) => {
    const text = String(raw || '').trim();
    if (!text) return;
    push('me', text);
    setInput('');
    scheduleReply(copy.replies.fallback);
  };

  const pickSuggestion = (label, index) => {
    push('me', label);
    const key = SUGGESTION_REPLY[index] || 'fallback';
    scheduleReply(copy.replies[key] || copy.replies.fallback);
  };

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
            {messages.map((message) => (
              <article key={message.id} className={`business-support-chat-line is-${message.from}`}>
                <div className="business-support-chat-bubble">{message.text}</div>
                <time className="business-support-chat-time">{clockLabel(message.at)}</time>
              </article>
            ))}

            {messages.length <= 1 && !pending && (
              <div className="business-support-chat-suggestions" role="group" aria-label={copy.suggestionsLabel}>
                {copy.suggestions.map((label, index) => (
                  <button
                    key={label}
                    type="button"
                    className="business-support-chat-chip"
                    onClick={() => pickSuggestion(label, index)}
                  >
                    {label}
                  </button>
                ))}
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

          <form
            className="business-support-chat-composer"
            onSubmit={(event) => {
              event.preventDefault();
              sendText(input);
            }}
          >
            <button
              type="button"
              className="business-support-chat-attach"
              aria-label={copy.attach}
              title={copy.attach}
              onClick={() => setAttachNote((current) => !current)}
            >
              <Paperclip size={18} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <input
              type="text"
              className="business-support-chat-input"
              value={input}
              placeholder={copy.placeholder}
              aria-label={copy.placeholder}
              onChange={(event) => setInput(event.target.value)}
            />
            <button
              type="submit"
              className="business-support-chat-send"
              aria-label={copy.send}
              title={copy.send}
              disabled={!input.trim()}
            >
              <Send size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </form>
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
