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
  send: 'Send',
  suggestionsLabel: 'Suggested questions',
  suggestions: [
    'I’ve got a payment problem',
    'Other',
    'Issues with my account',
    'Project moderation',
    'Deposit',
    'KYC',
  ],
  replies: {
    payment: 'Thanks — open Billing and send us the invoice number, and we will trace the payment for you.',
    account: 'Tell us which detail looks wrong and we will check the account record for you.',
    moderation: 'Project moderation is handled by the research team. Share the project name and we will pick it up.',
    deposit: 'Deposits are credited once the gateway confirms them. Send the reference and we will check it.',
    kyc: 'For KYC, send the business name and we will tell you which document is still outstanding.',
    fallback: 'Thanks — a researcher will pick this up. Meanwhile you can keep working; nothing here blocks your tasks.',
  },
};

/* Which canned reply a suggestion maps to; keeps wording and routing apart. */
const SUGGESTION_REPLY = ['payment', 'fallback', 'account', 'moderation', 'deposit', 'kyc'];

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
  const threadRef = useRef(null);
  const replyTimer = useRef(null);

  /* Clear any half-finished reply when the panel unmounts. */
  useEffect(() => () => window.clearTimeout(replyTimer.current), []);

  /* One greeting, stamped when the panel is first opened. */
  useEffect(() => {
    if (!open || messages.length) return;
    setMessages([{ id: 'greeting', from: 'them', text: copy.greeting, at: new Date() }]);
  }, [open, messages.length, copy.greeting]);

  /* Follow the conversation as it grows. */
  useEffect(() => {
    const node = threadRef.current;
    if (node) node.scrollTop = node.scrollHeight;
  }, [messages, open]);

  /* Escape closes the panel, matching the other overlays in the workspace. */
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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
        <section className="business-support-chat" aria-label={copy.title}>
          <header className="business-support-chat-head">
            <Logo size="sm" />
            <button
              type="button"
              className="business-support-chat-close"
              onClick={() => setOpen(false)}
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
