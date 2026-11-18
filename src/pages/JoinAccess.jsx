import { useState } from 'react';
import HomeEntry from '../components/HomeEntry';
import { useLanguage } from '../components/LanguageContext';
import './JoinAccess.css';

/* 2026-11-19: a standalone entry page. The photograph carries the words; the
   sheet carries only the form, so the card is not a page inside a page. */
export default function JoinAccess() {
  const [audience, setAudience] = useState('participant');
  const { publicCopy } = useLanguage();
  const text = publicCopy.pages.access;

  return (
    <main className="join-screen">
      <img className="join-screen-bg" src="/access-bg.jpg" alt="" aria-hidden="true" />
      <div className="join-screen-veil" aria-hidden="true" />
      <div className="join-wrap">
        <div className="join-copy">
          <h1 className="join-copy-title">{text.title}</h1>
          <p className="join-copy-note">{text.note}</p>
        </div>
        <section className="join-sheet" aria-label="Choose an account type">
          <HomeEntry audience={audience} onAudienceChange={setAudience} />
        </section>
      </div>
    </main>
  );
}
