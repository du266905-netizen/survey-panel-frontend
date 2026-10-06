import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, FilePenLine, LoaderCircle, Send, UserRound } from 'lucide-react';
import { createSupportTicket, sendSupportMessage } from '../api/supportApi';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';
import Logo from './Logo';
import './SupportChatWidget.css';

/* The welcome line and the quick questions stay English in this module: they
   are the conversation content that goes to the support API (see
   trimMessages/sendSupportMessage). Only what the panelist reads is looked up
   in the language library at render time. */
const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Welcome to GuanyiSearch Support. Ask a general question, or submit a request when you need help with your account.',
};

const QUICK_QUESTIONS = [
  'How do Coins and rewards work?',
  'How does participation work?',
  'How is my privacy handled?',
];

/* `value` is the category sent to the support API; `label` names the
   language-library key rendered in the topic dropdown. */
const TICKET_CATEGORIES = [
  { value: 'ACCOUNT', label: 'categoryAccount' },
  { value: 'PARTICIPATION', label: 'categoryParticipation' },
  { value: 'REWARDS', label: 'categoryRewards' },
  { value: 'PRIVACY', label: 'categoryPrivacy' },
  { value: 'OTHER', label: 'categoryOther' },
];

function trimMessages(messages) {
  return messages.slice(-12).map(({ role, content }) => ({ role, content }));
}

export function SupportChatGlyph({ size = 28, decorative = false }) {
  const { publicCopy } = useLanguage();
  return (
    <svg className="support-chat-glyph" viewBox="0 0 120 110" width={size} height={size} aria-hidden={decorative ? 'true' : undefined} role={decorative ? undefined : 'img'}>
      {!decorative && <title>{publicCopy?.panelistUi?.chat?.glyphTitle}</title>}
      <circle className="support-chat-glyph-orb" cx="89" cy="24" r="16" />
      <path className="support-chat-glyph-bubble" d="M21 34c0-14 12-23 29-23h24c16 0 27 9 27 23v14c0 14-11 23-28 23H51L30 88l4-20c-8-7-13-18-13-34Z" />
      <g className="support-chat-glyph-dots">
        <circle cx="47" cy="49" r="3.7" />
        <circle cx="61" cy="49" r="3.7" />
        <circle cx="75" cy="49" r="3.7" />
      </g>
    </svg>
  );
}

function Message({ message, copy }) {
  /* The seeded welcome message keeps its English content in state (it is sent
     to the API with the conversation); the panelist reads the library copy. */
  const isWelcomeMessage = message.role === 'assistant' && message.content === INITIAL_MESSAGE.content;
  return (
    <article className={`support-chat-message is-${message.role}`}>
      <span className="support-chat-message-label">{message.role === 'assistant' ? copy.roleSupport : copy.roleYou}</span>
      <p>{isWelcomeMessage ? copy.initialMessage : message.content}</p>
    </article>
  );
}

export default function SupportChatWidget() {
  const { user } = useAuth();
  const { publicCopy } = useLanguage();
  const copy = publicCopy?.panelistUi?.chat || {};
  const commonCopy = publicCopy?.panelistUi?.common || {};
  /* Quick questions render localized labels while the English array values stay
     the message content that is submitted to the support API. */
  const quickQuestionLabels = [copy.quickCoins, copy.quickParticipation, copy.quickPrivacy];
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
      setError(caughtError.response?.data?.message || copy.errorSend);
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
      setTicketStatus(copy.requestReceived);
      setTicketSubject('');
      setTicketDescription('');
      setRequestOpen(false);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || copy.errorSubmit);
    } finally {
      setIsCreatingTicket(false);
    }
  };

  return (
    <div className="support-chat-widget">
      {isOpen && (
        <section className="support-chat-panel" role="dialog" aria-modal="false" aria-label={copy.dialogLabel}>
          <header className="support-chat-header">
            <div className="support-chat-title">
              <span className="support-chat-title-mark"><SupportChatGlyph size={37} decorative /></span>
              <div>
                <Logo size="sm" className="support-chat-brand" />
                <strong>{copy.heading}</strong>
              </div>
            </div>
            <button type="button" className="support-chat-close" onClick={() => setIsOpen(false)} aria-label={copy.closeSupport}><ChevronDown size={20} /></button>
          </header>

          <div className="support-chat-disclosure">{copy.disclosure}</div>

          <div className="support-chat-body" ref={bodyRef}>
            {!requestOpen && messages.map((message, index) => <Message key={`${message.role}-${index}-${message.content.slice(0, 16)}`} message={message} copy={copy} />)}
            {isSending && <div className="support-chat-typing"><LoaderCircle size={15} className="animate-spin" /> {copy.sending}</div>}
            {error && <div className="support-chat-error">{error}</div>}
            {ticketStatus && <div className="support-chat-success">{ticketStatus}</div>}

            {!messages.some((message) => message.role === 'user') && !requestOpen && (
              <div className="support-chat-suggestions">
                <span>{copy.commonQuestions}</span>
                {QUICK_QUESTIONS.map((question, index) => <button key={question} type="button" onClick={() => submitMessage(question)}>{quickQuestionLabels[index]}<ArrowUpRight size={15} /></button>)}
              </div>
            )}

            {requestOpen && !ticketStatus && (
              <form className="support-request-form" onSubmit={submitSupportRequest}>
                <div className="support-request-heading"><FilePenLine size={17} /><div><span>{copy.requestKicker}</span><strong>{copy.requestTitle}</strong></div></div>
                <p>{copy.requestIntro}</p>
                <label>{copy.fieldTopic}
                  <select value={ticketCategory} onChange={(event) => setTicketCategory(event.target.value)}>
                    {TICKET_CATEGORIES.map((category) => <option key={category.value} value={category.value}>{copy[category.label]}</option>)}
                  </select>
                </label>
                <label>{copy.fieldSubject}
                  <input value={ticketSubject} required maxLength={140} onChange={(event) => setTicketSubject(event.target.value)} placeholder={copy.subjectPlaceholder} />
                </label>
                <label>{copy.fieldDetails}
                  <textarea value={ticketDescription} required maxLength={1800} onChange={(event) => setTicketDescription(event.target.value)} placeholder={copy.detailsPlaceholder} />
                </label>
                {!isSignedIn && (
                  <div className="support-request-contact">
                    <label>{copy.fieldName}<input value={contactName} maxLength={80} onChange={(event) => setContactName(event.target.value)} autoComplete="name" /></label>
                    <label>{copy.fieldEmail}<input value={contactEmail} type="email" required maxLength={254} onChange={(event) => setContactEmail(event.target.value)} autoComplete="email" /></label>
                  </div>
                )}
                {isSignedIn && <p className="support-request-signed-in">{copy.signedInNote}</p>}
                <div className="support-request-actions">
                  <button type="button" onClick={() => setRequestOpen(false)}>{copy.backToChat}</button>
                  <button type="submit" disabled={isCreatingTicket}>{isCreatingTicket ? copy.submitting : copy.submitRequest} <ArrowUpRight size={15} /></button>
                </div>
              </form>
            )}
          </div>

          {!requestOpen && (
            <div className="support-chat-human-row">
              <button type="button" onClick={openRequestForm}><UserRound size={15} /> {copy.submitARequest}</button>
              <a href="/privacy">{commonCopy.privacy}</a>
            </div>
          )}

          <form className="support-chat-composer" onSubmit={(event) => { event.preventDefault(); submitMessage(input); }}>
            <textarea value={input} maxLength={1800} onChange={(event) => setInput(event.target.value)} placeholder={copy.inputPlaceholder} aria-label={copy.inputLabel} />
            <button type="submit" disabled={!input.trim() || isSending} aria-label={copy.sendLabel}><Send size={17} /></button>
          </form>
        </section>
      )}
      <button className={`support-chat-launcher ${isOpen ? 'is-open' : ''}`} type="button" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? copy.closeSupport : copy.openSupport} aria-expanded={isOpen}>
        {isOpen ? <ChevronDown size={23} /> : <SupportChatGlyph size={48} decorative />}
      </button>
    </div>
  );
}
