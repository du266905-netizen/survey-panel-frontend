import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUp, ChevronDown, LoaderCircle, MessageCircleMore, Send, UserRound } from 'lucide-react';
import { createSupportTicket, sendSupportMessage } from '../api/supportApi';
import { useAuth } from './AuthContext';
import './SupportChatWidget.css';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Hi — I can explain published information about participation, Coins, rewards, privacy, and account safety. For account-specific questions, I’ll connect you with a person.',
};

const QUICK_QUESTIONS = [
  'How do Coins and rewards work?',
  'What is the published minimum redemption?',
  'How is my privacy handled?',
];

function trimMessages(messages) {
  return messages.slice(-12).map(({ role, content }) => ({ role, content }));
}

export function SupportChatGlyph({ size = 28, decorative = false }) {
  return (
    <svg className="support-chat-glyph" viewBox="0 0 132 116" width={size} height={size} aria-hidden={decorative ? 'true' : undefined} role={decorative ? undefined : 'img'}>
      {!decorative && <title>Support chat</title>}
      <circle className="support-chat-glyph-sun" cx="98" cy="27" r="20" />
      <path className="support-chat-glyph-breeze" d="M88 65c13 0 21 4 25 12M91 76c8 0 14 3 18 8" />
      <path className="support-chat-glyph-bubble" d="M25 28c8-12 25-16 46-16 24 0 40 4 46 18 4 9 4 31-1 42-5 12-17 18-33 19H55L29 106l5-23c-11-6-16-16-16-29 0-11 2-20 7-26Z" />
      <circle className="support-chat-glyph-dot" cx="50" cy="51" r="3.5" />
      <circle className="support-chat-glyph-dot" cx="69" cy="51" r="3.5" />
      <circle className="support-chat-glyph-dot" cx="88" cy="51" r="3.5" />
      <path className="support-chat-glyph-ground" d="M25 111c20 4 48 4 68 0" />
      <circle className="support-chat-glyph-accent" cx="111" cy="61" r="4.5" />
    </svg>
  );
}

function Message({ message }) {
  return (
    <article className={`support-chat-message is-${message.role}`}>
      <span className="support-chat-message-label">{message.role === 'assistant' ? 'GUANYISEARCH SUPPORT' : 'YOU'}</span>
      <p>{message.content}</p>
    </article>
  );
}

export default function SupportChatWidget() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const [handoffOpen, setHandoffOpen] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const bodyRef = useRef(null);

  const isSignedIn = Boolean(user?.email);
  const messagesForTicket = useMemo(() => trimMessages(messages), [messages]);

  useEffect(() => {
    if (isOpen && bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [isOpen, messages, isSending]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setHandoffOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const submitMessage = async (value) => {
    const content = String(value || '').trim();
    if (!content || isSending) return;

    const nextMessages = trimMessages([...messages, { role: 'user', content }]);
    setMessages(nextMessages);
    setInput('');
    setError('');
    setTicketStatus('');
    setIsSending(true);
    try {
      const response = await sendSupportMessage(nextMessages);
      setMessages((current) => trimMessages([...current, { role: 'assistant', content: response.data.reply }]));
      if (response.data.needsHuman) setHandoffOpen(true);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'The support assistant could not respond. Please try again or talk to a person.');
    } finally {
      setIsSending(false);
    }
  };

  const submitHandoff = async (event) => {
    event.preventDefault();
    if (isCreatingTicket) return;
    setError('');
    setTicketStatus('');
    setIsCreatingTicket(true);
    try {
      await createSupportTicket({
        messages: messagesForTicket,
        ...(isSignedIn ? {} : { contactEmail: contactEmail.trim(), contactName: contactName.trim() || undefined }),
        subject: 'Website support request',
      });
      setTicketStatus('Your request is in the support queue. A person will review the conversation and reply using the contact details on file.');
      setHandoffOpen(false);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'We could not create the support request. Please try again.');
    } finally {
      setIsCreatingTicket(false);
    }
  };

  return (
    <div className="support-chat-widget">
      {isOpen && (
        <section className="support-chat-panel" role="dialog" aria-modal="false" aria-label="GuanyiSearch support">
          <header className="support-chat-header">
            <div className="support-chat-title">
              <span className="support-chat-title-mark"><SupportChatGlyph size={31} decorative /></span>
              <div>
                <span>GUANYISEARCH</span>
                <strong>A considered conversation.</strong>
              </div>
            </div>
            <button type="button" className="support-chat-close" onClick={() => setIsOpen(false)} aria-label="Close support chat"><ChevronDown size={20} /></button>
          </header>

          <div className="support-chat-disclosure">Please do not send passwords, verification codes, payment details, government IDs, or full financial information.</div>

          <div className="support-chat-body" ref={bodyRef}>
            {messages.map((message, index) => <Message key={`${message.role}-${index}-${message.content.slice(0, 16)}`} message={message} />)}
            {isSending && <div className="support-chat-typing"><LoaderCircle size={15} className="animate-spin" /> Checking published information…</div>}
            {error && <div className="support-chat-error">{error}</div>}
            {ticketStatus && <div className="support-chat-success">{ticketStatus}</div>}

            {!messages.some((message) => message.role === 'user') && (
              <div className="support-chat-suggestions">
                {QUICK_QUESTIONS.map((question) => <button key={question} type="button" onClick={() => submitMessage(question)}>{question}</button>)}
              </div>
            )}

            {handoffOpen && !ticketStatus && (
              <form className="support-handoff-form" onSubmit={submitHandoff}>
                <div className="support-handoff-heading"><UserRound size={17} /><strong>Talk to a person</strong></div>
                <p>Your conversation will be saved as a private support request for the team to review.</p>
                {!isSignedIn && (
                  <>
                    <label>NAME<input value={contactName} maxLength={80} onChange={(event) => setContactName(event.target.value)} autoComplete="name" /></label>
                    <label>EMAIL<input value={contactEmail} type="email" required maxLength={254} onChange={(event) => setContactEmail(event.target.value)} autoComplete="email" /></label>
                  </>
                )}
                {isSignedIn && <p className="support-handoff-signed-in">We’ll use the email address associated with your signed-in account.</p>}
                <button type="submit" disabled={isCreatingTicket}>{isCreatingTicket ? 'Creating request…' : 'Create support request'} <ArrowUp size={15} /></button>
              </form>
            )}
          </div>

          <div className="support-chat-human-row">
            <button type="button" onClick={() => { setHandoffOpen((open) => !open); setTicketStatus(''); }}><UserRound size={15} /> Talk to a person</button>
            <a href="/privacy">Privacy</a>
          </div>

          <form className="support-chat-composer" onSubmit={(event) => { event.preventDefault(); submitMessage(input); }}>
            <textarea value={input} maxLength={1800} onChange={(event) => setInput(event.target.value)} placeholder="Ask about published platform information…" aria-label="Support question" />
            <button type="submit" disabled={!input.trim() || isSending} aria-label="Send support question"><Send size={17} /></button>
          </form>
        </section>
      )}
      <button className={`support-chat-launcher ${isOpen ? 'is-open' : ''}`} type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Close support chat' : 'Open support chat'} aria-expanded={isOpen}>
        {isOpen ? <ChevronDown size={24} /> : <SupportChatGlyph size={57} decorative />}
        <span className="support-chat-launcher-caption">Support</span>
      </button>
    </div>
  );
}
