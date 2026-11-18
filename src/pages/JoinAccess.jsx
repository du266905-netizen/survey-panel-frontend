import { useState } from 'react';
import { Link } from 'react-router-dom';
import HomeEntry from '../components/HomeEntry';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './JoinAccess.css';

/* 2026-11-19: entry lives on its own page — no site header, no footer, one
   dimmed photograph, one card. Structure follows the standard auth block:
   brand, title, third-party buttons, divider, email, terms. */
export default function JoinAccess() {
  const [audience, setAudience] = useState('participant');
  const { publicCopy, language } = useLanguage();
  const text = publicCopy.pages.access;
  const isCjk = /^(zh|ja|ko)/i.test(language || '');

  return (
    <main className="join-screen">
      <img className="join-screen-bg" src="/access-bg.jpg" alt="" aria-hidden="true" />
      <div className="join-screen-veil" aria-hidden="true" />

      <div className="join-brand">
        <img src="/brand-mark-warm.png" alt="" width="26" height="26" />
        <span>guanyisearch</span>
      </div>

      <section className="join-card" aria-labelledby="join-title">
        <h1 id="join-title" className="join-card-title">{text.title}</h1>
        <p className="join-card-note">{text.note}</p>
        <HomeEntry audience={audience} onAudienceChange={setAudience} />
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
