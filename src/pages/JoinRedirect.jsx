import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* 2026-11-12: /access used to redirect to /#join. The hash made the browser
   jump (no glide) and stayed in the address bar, so every refresh landed on the
   sign-in block. Now we hand the intent to the home page through one flag and
   let it scroll smoothly. */
export default function JoinRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    try { window.sessionStorage.setItem('gs:scroll-to-join', '1'); } catch { /* storage blocked */ }
    navigate('/', { replace: true });
  }, [navigate]);
  return null;
}
