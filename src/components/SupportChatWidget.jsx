import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, FilePenLine, LoaderCircle, Send, UserRound } from 'lucide-react';
import { createSupportTicket, sendSupportMessage } from '../api/supportApi';
import { useAuth } from './AuthContext';
import './SupportChatWidget.css';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Welcome to GuanyiSearch Support. Ask a general question, or submit a request when you need help with your account.',
};

const QUICK_QUESTIONS = [
  'How do Coins and rewards work?',
  'How does participation work?',
  'How is my privacy handled?',
];

const TICKET_CATEGORIES = [
  { value: 'ACCOUNT', label: 'Account & access' },
  { value: 'PARTICIPATION', label: 'Participation' },
  { value: 'REWARDS', label: 'Coins & rewards' },
  { value: 'PRIVACY', label: 'Privacy request' },
  { value: 'OTHER', label: 'Something else' },
];

function trimMessages(messages) {
  return messages.slice(-12).map(({ role, content }) => ({ role, content }));
}

export function SupportChatGlyph({ size = 28, decorative = false }) {
  return (
    <svg className="support-chat-glyph" viewBox="0 0 120 110" width={size} height={size} aria-hidden={decorative ? 'true' : undefined} role={decorative ? undefined : 'img'}>
      {!decorative && <title>Support</title>}
      <circle className="support-chat-glyph-coin" cx="92" cy="23" r="17" />
      <path className="support-chat-glyph-coin-mark" d="M84 23h16M92 15v16" />
      <path className="support-chat-glyph-bubble" d="M20 38c0-15 11-25 27-25h28c15 0 25 10 25 24v15c0 14-10 23-25 23H51L29 92l4-21c-8-6-13-17-13-33Z" />
      <path className="support-chat-glyph-copy" d="M39 39h34M39 51h25M39 63h13" />
      <path className="support-chat-glyph-signal" d="M75 82c8 0 14 3 18 9M83 91c5 0 8 2 11 5" />
      <path className="support-chat-glyph-ground" d="M23 100c19 4 43 4 60 0" />
      <circle className="support-chat-glyph-accent" cx="105" cy="48" r="3.5" />
    </svg>
  );
}

function Message({ message }) {
  return (
    <article className={`support-chat-message is-${message.role}`}>
      <span className="support-chat-message-label">{message.role === 'assistant' ? 'SUPPORT' : 'YOU'}</span>
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
  const [requestOpen, setRequestOpen] = useState(false);
  const [ticketCategory, setTicketCategory] = useState('ACCOUNT');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactName, setContactName] = useState('');
  const [ticketStatus, setTicketStatus] = useState('');
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const bodyRef = useRef(null);

  const isSignedIn = Boolean(user?.email);

  useEffect(() => {
    if (isOpen && bodyRef.current) {
      bodyRef.current.scrollTop = requestOpen ? 0 : bodyRef.current.scrollHeight;
    }
  }, [isOpen, messages, isSending, requestOpen, ticketStatus]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setRequestOpen(false);
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const openRequestForm = () => {
    setError('');
    setTicketStatus('');
    setRequestOpen(true);
  };

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
      if (response.data.needsHuman) openRequestForm();
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'We could not send that message. Please try again or submit a request.');
    } finally {
      setIsSending(false);
    }
  };

  const submitSupportRequest = async (event) => {
    event.preventDefault();
    const subject = ticketSubject.trim();
    const description = ticketDescription.trim();
    if (!subject || !description || isCreatingTicket) return;

    setError('');
    setTicketStatus('');
    setIsCreatingTicket(true);
    try {
      await createSupportTicket({
        category: ticketCategory,
        subject,
        messages: [{ role: 'user', content: description }],
        ...(isSignedIn ? {} : { contactEmail: contactEmail.trim(), contactName: contactName.trim() || undefined }),
      });
      setTicketStatus('Request received. Our team will follow up using your contact details.');
      setTicketSubject('');
      setTicketDescription('');
      setRequestOpen(false);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'We could not submit your request. Please try again.');
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
              <span className="support-chat-title-mark"><SupportChatGlyph size={37} decorative /></span>
              <div>
                <span>GUANYISEARCH</span>
                <strong>How can we help?</strong>
              </div>
            </div>
            <button type="button" className="support-chat-close" onClick={() => setIsOpen(false)} aria-label="Close support"><ChevronDown size={20} /></button>
          </header>

          <div className="support-chat-disclosure">Please don’t share passwords, verification codes, or payment details.</div>

          <div className="support-chat-body" ref={bodyRef}>
            {!requestOpen && messages.map((message, index) => <Message key={`${message.role}-${index}-${message.content.slice(0, 16)}`} message={message} />)}
            {isSending && <div className="support-chat-typing"><LoaderCircle size={15} className="animate-spin" /> One moment…</div>}
            {error && <div className="support-chat-error">{error}</div>}
            {ticketStatus && <div className="support-chat-success">{ticketStatus}</div>}

            {!messages.some((message) => message.role === 'user') && !requestOpen && (
              <div className="support-chat-suggestions">
                <span>Common questions</span>
                {QUICK_QUESTIONS.map((question) => <button key={question} type="button" onClick={() => submitMessage(question)}>{question}<ArrowUpRight size={15} /></button>)}
              </div>
            )}

            {requestOpen && !ticketStatus && (
              <form className="support-request-form" onSubmit={submitSupportRequest}>
                <div className="support-request-heading"><FilePenLine size={17} /><div><span>SUPPORT REQUEST</span><strong>Tell us what you need.</strong></div></div>
                <p>Choose a topic and give the team a short description so your request reaches the right person.</p>
                <label>TOPIC
                  <select value={ticketCategory} onChange={(event) => setTicketCategory(event.target.value)}>
                    {TICKET_CATEGORIES.map((category) => <option key={category.value} value={category.value}>{category.label}</option>)}
                  </select>
                </label>
                <label>SUBJECT
                  <input value={ticketSubject} required maxLength={140} onChange={(event) => setTicketSubject(event.target.value)} placeholder="A short summary" />
                </label>
                <label>DETAILS
                  <textarea value={ticketDescription} required maxLength={1800} onChange={(event) => setTicketDescription(event.target.value)} placeholder="What happened, and what would you like help with?" />
                </label>
                {!isSignedIn && (
                  <div className="support-request-contact">
                    <label>NAME<input value={contactName} maxLength={80} onChange={(event) => setContactName(event.target.value)} autoComplete="name" /></label>
                    <label>EMAIL<input value={contactEmail} type="email" required maxLength={254} onChange={(event) => setContactEmail(event.target.value)} autoComplete="email" /></label>
                  </div>
                )}
                {isSignedIn && <p className="support-request-signed-in">We’ll reply using the email address on your account.</p>}
                <div className="support-request-actions">
                  <button type="button" onClick={() => setRequestOpen(false)}>Back to chat</button>
                  <button type="submit" disabled={isCreatingTicket}>{isCreatingTicket ? 'Submitting…' : 'Submit request'} <ArrowUpRight size={15} /></button>
                </div>
              </form>
            )}
          </div>

          {!requestOpen && (
            <div className="support-chat-human-row">
              <button type="button" onClick={openRequestForm}><UserRound size={15} /> Submit a request</button>
              <a href="/privacy">Privacy</a>
            </div>
          )}

          <form className="support-chat-composer" onSubmit={(event) => { event.preventDefault(); submitMessage(input); }}>
            <textarea value={input} maxLength={1800} onChange={(event) => setInput(event.target.value)} placeholder="Type your question…" aria-label="Support question" />
            <button type="submit" disabled={!input.trim() || isSending} aria-label="Send question"><Send size={17} /></button>
          </form>
        </section>
      )}
      <button className={`support-chat-launcher ${isOpen ? 'is-open' : ''}`} type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? 'Close support' : 'Open support'} aria-expanded={isOpen}>
        {isOpen ? <ChevronDown size={23} /> : <SupportChatGlyph size={48} decorative />}
      </button>
    </div>
  );
}
