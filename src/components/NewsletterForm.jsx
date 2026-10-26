import { useState } from 'react';
import { Mail } from 'lucide-react';
import { createSupportTicket } from '../api/supportApi';
import './NewsletterForm.css';

/* The newsletter card at the foot of the dark closing band.
   Used by the homepage and by About, so both pages end the same way.

   Submission goes through /api/support/handoff (the same channel the contact
   page uses) and lands in the support queue with source
   PUBLIC_NEWSLETTER_SIGNUP. There is no dedicated subscribe endpoint yet; when
   there is, only `submit` below changes. */

const copy = {
  'en-US': {
    title: 'Subscribe to our newsletter',
    line: 'We will send you our latest news, highlights and research briefs.',
    placeholder: 'Your email',
    button: 'Subscribe',
    note: 'If you would like to receive our monthly updates, please provide your email address. You can unsubscribe at any time.',
    done: 'Received. Thank you.',
    error: 'Could not send. Please try again.',
  },
  'en-GB': {
    title: 'Subscribe to our newsletter',
    line: 'We will send you our latest news, highlights and research briefs.',
    placeholder: 'Your email',
    button: 'Subscribe',
    note: 'If you would like to receive our monthly updates, please provide your email address. You can unsubscribe at any time.',
    done: 'Received. Thank you.',
    error: 'Could not send. Please try again.',
  },
  'zh-CN': {
    title: '订阅我们的资讯简报',
    line: '我们会把最新讯息、精彩内容、研究简报等发送给您。',
    placeholder: '你的邮箱',
    button: '订阅',
    note: '如果您想接收我们每月发送的内容资讯，请提供你的电子邮件地址。你可以随时退订。',
    done: '已收到，谢谢。',
    error: '发送失败，请稍后再试。',
  },
  'zh-Hant': {
    title: '訂閱我們的資訊簡報',
    line: '我們會把最新訊息、精彩內容、研究簡報等發送給您。',
    placeholder: '你的郵箱',
    button: '訂閱',
    note: '如果您想接收我們每月發送的內容資訊，請提供你的電子郵件地址。你可以隨時退訂。',
    done: '已收到，謝謝。',
    error: '發送失敗，請稍後再試。',
  },
};

export default function NewsletterForm({ language }) {
  const t = copy[language] || copy['en-US'];
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const sending = status === 'sending';

  const submit = async (event) => {
    event.preventDefault();
    const value = email.trim();
    if (!value || sending) return;
    setStatus('sending');
    try {
      await createSupportTicket({
        source: 'PUBLIC_NEWSLETTER_SIGNUP',
        category: 'OTHER',
        subject: 'Newsletter sign-up',
        contactName: value,
        contactEmail: value,
        messages: [{ role: 'user', content: 'Newsletter sign-up from the public site.' }],
      });
      setEmail('');
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="newsletter-form" onSubmit={submit}>
      <div className="newsletter-form-head">
        <Mail className="newsletter-form-icon" size={20} strokeWidth={1.65} aria-hidden="true" />
        <p className="newsletter-form-title">{t.title}</p>
      </div>
      <p className="newsletter-form-line">{t.line}</p>
      <div className="newsletter-form-field">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t.placeholder}
          aria-label={t.placeholder}
        />
        <button type="submit" disabled={sending} aria-busy={sending}>{t.button}</button>
      </div>
      <p className="newsletter-form-note" role="status">
        {status === 'done' ? t.done : status === 'error' ? t.error : t.note}
      </p>
    </form>
  );
}
