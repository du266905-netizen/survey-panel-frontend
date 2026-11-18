import { useState } from 'react';
import HomeEntry from '../components/HomeEntry';
import { useLanguage } from '../components/LanguageContext';
import './JoinAccess.css';

/* 2026-11-19: the sign-up surface is its own page, built like the contact
   sales page: a dimmed photograph with the form on a small sheet. The old
   homepage block kept a film frame and a card the height of the viewport. */
export default function JoinAccess() {
  const [audience, setAudience] = useState('participant');
  const { publicCopy } = useLanguage();
  const text = publicCopy.pages.access;

  return (
    <main className="join-screen">
      <img className="join-screen-bg" src="/access-bg.jpg" alt="" aria-hidden="true" />
      <div className="join-screen-veil" aria-hidden="true" />
      <section className="join-sheet" aria-labelledby="join-title">
        <h1 id="join-title" className="join-sheet-title">{text.title}</h1>
        <p className="join-sheet-note">{text.note}</p>
        <div className="join-sheet-form">
          <HomeEntry audience={audience} onAudienceChange={setAudience} />
        </div>
      </section>
    </main>
  );
}
