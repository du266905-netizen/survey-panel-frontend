import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import PublicAuthPanel from './PublicAuthPanel';
import './AuthDialog.css';

/* 2026-11-19: sign-in and sign-up open as a dialog over the page — dimmed and
   blurred behind, one card, two modes that slide sideways. No route change. */
export default function AuthDialog({ open, initialMode = 'login', onClose }) {
  const [mode, setMode] = useState(initialMode);
  const [direction, setDirection] = useState('next');
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    setMode(initialMode);
    const onKey = (event) => { if (event.key === 'Escape') onClose?.(); };
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, initialMode, onClose]);

  if (!open) return null;

  const changeMode = (next) => {
    setDirection(next === 'register' ? 'next' : 'prev');
    setMode(next);
  };

  return (
    <div className="auth-dialog" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose?.(); }}>
      <div className="auth-dialog-card" role="dialog" aria-modal="true" aria-label="Account access">
        <button ref={closeRef} type="button" className="auth-dialog-close" aria-label="Close" onClick={onClose}>
          <X size={18} strokeWidth={1.6} aria-hidden="true" />
        </button>
        <div key={mode} className={`auth-dialog-panel is-${direction}`}>
          <PublicAuthPanel
            mode={mode}
            onModeChange={changeMode}
            accountType="PARTICIPANT"
          />
        </div>
      </div>
    </div>
  );
}
