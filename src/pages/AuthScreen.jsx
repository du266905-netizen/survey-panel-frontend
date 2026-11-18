import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import PublicAuthPanel from '../components/PublicAuthPanel';
import './AuthScreen.css';

/* 2026-11-19: the participant sign-in and sign-up pages share the entry
   chrome; the panel supplies the form and the mode switch. */
export default function AuthScreen({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [params] = useSearchParams();
  const email = params.get('email') || '';

  return (
    <AuthShell cardClassName="join-card--auth">
      <PublicAuthPanel
        mode={mode}
        onModeChange={setMode}
        accountType="PARTICIPANT"
        initialEmail={email}
      />
    </AuthShell>
  );
}
