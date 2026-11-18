import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HomeAuthForm from '../components/HomeAuthForm';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './JoinAccess.css';

/* 2026-11-19: entry is its own page — no site header, no footer, no brand
   lockup (the mark is still a test). One card on the dimmed photograph:
   title, a two-way switch, the third-party button, the email field. */
export default function JoinAccess() {
  const [audience, setAudience] = useState('participant');
  const navigate = useNavigate();
  const { publicCopy, language } = useLanguage();
  const text = publicCopy.pages.access;
  const form = text.form;
  const isCjk = /^(zh|ja|ko)/i.test(language || '');
  const research = audience === 'research';

  return (
    <main className="join-screen">
      <img className="join-screen-bg" src="/access-bg.jpg" alt="" aria-hidden="true" />
      <div className="join-screen-veil" aria-hidden="true" />

      <button
        type="button"
        className="join-back"
        aria-label={isCjk ? '返回' : 'Back'}
        onClick={() => { if (window.history.length > 1) navigate(-1); else navigate(withLanguage('/', language)); }}
      >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M11.5 4.5 6 10l5.5 5.5" />
          <path d="M6 10h8.5" />
        </svg>
      </button>

      <Link className="join-brand" to={withLanguage('/', language)} aria-label="guanyisearch">
        <img src="/guanyisearch-wordmark.png" alt="guanyisearch" />
      </Link>

      <section className="join-card" aria-labelledby="join-title">
        <h1 id="join-title" className="join-card-title">{text.title}</h1>
        <p className="join-card-note">{text.note}</p>

        <div className="join-switch" role="tablist" aria-label="Choose an account type">
          <span className={`join-switch-thumb${research ? ' is-right' : ''}`} aria-hidden="true" />
          <button
            type="button"
            role="tab"
            aria-selected={!research}
            className={!research ? 'is-on' : ''}
            onClick={() => setAudience('participant')}
          >
            {form.participant}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={research}
            className={research ? 'is-on' : ''}
            onClick={() => setAudience('research')}
          >
            {form.researcher}
          </button>
        </div>

        <HomeAuthForm audience={audience} />

        <p className="join-card-switch">
          {isCjk ? '已有账号？' : 'Already have an account? '}
          <Link to={withLanguage('/login', language)}>{isCjk ? '登录' : 'Sign in'}</Link>
        </p>
      </section>

      <p className="join-terms">
        {isCjk ? '继续即表示同意' : 'By continuing you agree to the '}
        <Link to={withLanguage('/terms', language)}>{isCjk ? '服务条款' : 'Terms of Service'}</Link>
        {isCjk ? '与' : ' and '}
        <Link to={withLanguage('/privacy', language)}>{isCjk ? '隐私政策' : 'Privacy Policy'}</Link>
        {isCjk ? '。' : '.'}
      </p>
    </main>
  );
}
