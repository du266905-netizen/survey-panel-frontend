import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import PublicAuthPanel from '../components/PublicAuthPanel';
import './AuthScreen.css';

/* 2026-11-19: one card, two modes. Switching re-mounts the panel with a slide
   keyframe: the incoming form travels in from the side the switch moved
   towards. A horizontal track was tried first — the browser did not always
   start the transform transition, so the move was invisible. */
export default function AuthScreen({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const direction = useRef('next');
  const [params] = useSearchParams();
  const email = params.get('email') || '';

  const changeMode = (next) => {
    direction.current = next === 'register' ? 'next' : 'prev';
    setMode(next);
  };

  return (
    <AuthShell cardClassName="join-card--auth">
      <div key={mode} className={`auth-enter is-${direction.current}`}>
        <PublicAuthPanel
          mode={mode}
          onModeChange={changeMode}
          accountType="PARTICIPANT"
          initialEmail={email}
        />
      </div>
    </AuthShell>
  );
}
