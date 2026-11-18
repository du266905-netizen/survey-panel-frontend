import { useState } from 'react';
import HomeEntry from '../components/HomeEntry';
import { useLanguage } from '../components/LanguageContext';
import './JoinAccess.css';

/* 2026-11-19: one centred sheet on the dimmed photograph. The words sit above
   the form inside the same card; everything is sans and centred. */
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
