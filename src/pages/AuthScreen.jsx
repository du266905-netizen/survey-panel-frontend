import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AuthShell from '../components/AuthShell';
import PublicAuthPanel from '../components/PublicAuthPanel';
import './AuthScreen.css';

/* 2026-11-19: the two modes are one horizontal track, so switching slides the
   whole panel — the card does not swap its contents in place. Height follows
   the slide that is showing. */
export default function AuthScreen({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [params] = useSearchParams();
  const email = params.get('email') || '';
  const trackRef = useRef(null);
  const slidesRef = useRef({});
  const [height, setHeight] = useState(null);
  const register = mode === 'register';

  useEffect(() => {
    const slide = slidesRef.current[mode];
    if (slide) setHeight(slide.offsetHeight);
  }, [mode, email]);

  return (
    <AuthShell cardClassName="join-card--auth">
      <div className="auth-viewport" style={height ? { height } : undefined}>
        <div ref={trackRef} className={`auth-track${register ? ' is-register' : ''}`}>
          {['login', 'register'].map((panelMode) => {
            const active = panelMode === mode;
            return (
              <div
                key={panelMode}
                className="auth-slide"
                ref={(node) => { slidesRef.current[panelMode] = node; }}
                aria-hidden={!active}
                inert={active ? undefined : ''}
              >
                <PublicAuthPanel
                  mode={panelMode}
                  onModeChange={setMode}
                  accountType="PARTICIPANT"
                  initialEmail={email}
                />
              </div>
            );
          })}
        </div>
      </div>
    </AuthShell>
  );
}
