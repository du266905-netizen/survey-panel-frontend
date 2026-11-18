import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import PublicAuthPanel from '../components/PublicAuthPanel';
import './AuthScreen.css';

/* 2026-11-19: participant sign-in and sign-up share the entry chrome. The two
   modes slide sideways instead of swapping in place: the incoming panel comes
   from the side the thumb moved towards. */
export default function AuthScreen({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [direction, setDirection] = useState('next');
  const previous = useRef(initialMode);
  const [params] = useSearchParams();
  const email = params.get('email') || '';

  const changeMode = (next) => {
    setDirection(next === 'register' ? 'next' : 'prev');
    previous.current = mode;
    setMode(next);
  };

  return (
    <AuthShell cardClassName="join-card--auth">
      <div className={`auth-panel-wrap is-${direction}`} key={mode}>
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
