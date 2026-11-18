import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import HomeAuthForm from '../components/HomeAuthForm';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './JoinAccess.css';

/* 2026-11-19: entry is a wide sheet over the dimmed photograph — words on the
   left, the form on the right, the way the contact-sales block is built. */
export default function JoinAccess() {
  const [audience, setAudience] = useState('participant');
  const { publicCopy, language } = useLanguage();
  const text = publicCopy.pages.access;
  const form = text.form;
  const isCjk = /^(zh|ja|ko)/i.test(language || '');
  const research = audience === 'research';

  return (
    <AuthShell
      cardClassName="join-card--wide"
      footer={(
        <p className="join-terms">
          {isCjk ? '继续即表示同意' : 'By continuing you agree to the '}
          <Link to={withLanguage('/terms', language)}>{isCjk ? '服务条款' : 'Terms of Service'}</Link>
          {isCjk ? '与' : ' and '}
          <Link to={withLanguage('/privacy', language)}>{isCjk ? '隐私政策' : 'Privacy Policy'}</Link>
          {isCjk ? '。' : '.'}
        </p>
      )}
    >
      <div className="join-grid">
        <div className="join-grid-copy">
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
        </div>

        <div className="join-grid-form">
          <HomeAuthForm audience={audience} />
          <p className="join-card-switch">
            {isCjk ? '已有账号？' : 'Already have an account? '}
            <Link to={withLanguage('/login', language)}>{isCjk ? '登录' : 'Sign in'}</Link>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
