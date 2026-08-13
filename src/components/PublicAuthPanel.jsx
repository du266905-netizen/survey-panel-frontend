import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { googleLogin, login, register, sendEmailCode, verifyEmailCode } from '../api/realApi';
import { useAuth } from './AuthContext';
import TurnstileWidget from './TurnstileWidget';
import './PublicAuthPanel.css';

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client?hl=en';
const codeCooldownSeconds = 60;
let googleScriptPromise;

function codeCooldownStorageKey(email) {
  return `guanyi-email-code-cooldown:${String(email || '').trim().toLowerCase()}`;
}

function readCodeCooldown(email) {
  const storedUntil = Number(window.localStorage.getItem(codeCooldownStorageKey(email)));
  return Number.isFinite(storedUntil) ? Math.max(0, Math.ceil((storedUntil - Date.now()) / 1000)) : 0;
}

function formatWaitTime(seconds) {
  const roundedSeconds = Math.max(1, Math.ceil(Number(seconds) || codeCooldownSeconds));
  if (roundedSeconds < 60) return `${roundedSeconds} seconds`;
  const minutes = Math.ceil(roundedSeconds / 60);
  return `${minutes} minute${minutes === 1 ? '' : 's'}`;
}

function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve();
  if (googleScriptPromise) return googleScriptPromise;

  googleScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${GOOGLE_SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', () => reject(new Error('Google sign-in failed to load')), { once: true });
      return;
    }
    const script = document.createElement('script');
    script.src = GOOGLE_SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = resolve;
    script.onerror = () => reject(new Error('Google sign-in failed to load'));
    document.head.appendChild(script);
  });

  return googleScriptPromise;
}

function GoogleButton({ mode, onCredential, onError }) {
  const containerRef = useRef(null);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!clientId || !containerRef.current) return undefined;
    let active = true;
    loadGoogleScript()
      .then(() => {
        if (!active || !containerRef.current || !window.google?.accounts?.id) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => {
            if (!response.credential) {
              onError('Google did not return a sign-in credential. Please try again.');
              return;
            }
            onCredential(response.credential);
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
        window.google.accounts.id.renderButton(containerRef.current, {
          type: 'standard',
          theme: 'filled_black',
          size: 'large',
          text: mode === 'login' ? 'signin_with' : 'signup_with',
          shape: 'pill',
          width: Math.min(containerRef.current.clientWidth || 360, 380),
          logo_alignment: 'left',
          locale: 'en',
        });
      })
      .catch(() => onError('Google sign-in could not be loaded. Please use email instead.'));
    return () => {
      active = false;
    };
  }, [clientId, mode, onCredential, onError]);

  if (!clientId) {
    return (
      <button className="public-auth-google-disabled" type="button" disabled title="Set VITE_GOOGLE_CLIENT_ID to enable Google sign-in">
        <span className="grid h-5 w-5 place-items-center rounded-full border border-slate-300 text-[10px] font-black text-slate-500">G</span>
        Continue with Google
      </button>
    );
  }

  return <div ref={containerRef} className="min-h-11" />;
}

export default function PublicAuthPanel({ mode = 'register', onModeChange, accountType = 'PARTICIPANT' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const panelRef = useRef(null);
  const { setUser } = useAuth();
  const [registerExpanded, setRegisterExpanded] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ displayName: '', email: '', password: '', verificationCode: '', organizationType: '', region: '' });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeCooldown, setCodeCooldown] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const referredBy = new URLSearchParams(location.search).get('ref') || undefined;

  useEffect(() => {
    if (!codeCooldown) return undefined;
    const timer = window.setTimeout(() => setCodeCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [codeCooldown]);

  useEffect(() => {
    setCodeCooldown(readCodeCooldown(registerForm.email));
  }, [registerForm.email]);

  useEffect(() => {
    setError('');
    setMessage('');
    setShowPassword(false);
  }, [mode]);

  const showError = useCallback((value) => {
    setMessage('');
    setError(value);
  }, []);

  const startCodeCooldown = (email, seconds = codeCooldownSeconds) => {
    const normalizedSeconds = Math.max(1, Math.ceil(Number(seconds) || codeCooldownSeconds));
    window.localStorage.setItem(codeCooldownStorageKey(email), String(Date.now() + normalizedSeconds * 1000));
    setCodeCooldown(normalizedSeconds);
  };

  const clearTurnstileToken = useCallback(() => {
    setTurnstileToken('');
  }, []);

  const resetFormScroll = useCallback(() => {
    window.requestAnimationFrame(() => panelRef.current?.closest('.landing-access-inner')?.scrollTo({ top: 0, behavior: 'auto' }));
  }, []);

  const finishAuth = useCallback(
    (response) => {
      setUser(response.data.user);
      const destination = String(response.data.user?.role || '').toUpperCase() === 'BUSINESS' ? '/business/workspace' : '/dashboard';
      navigate(destination, { replace: true });
    },
    [navigate, setUser]
  );

  const handleGoogleCredential = useCallback(
    async (credential) => {
      setLoading(true);
      setError('');
      try {
        const response = await googleLogin({ credential, agreedToTermsAt: mode === 'register' ? new Date().toISOString() : undefined, referredBy });
        finishAuth(response);
      } catch (caughtError) {
        showError(caughtError.response?.data?.message || 'Google sign-in failed. Please try email instead.');
      } finally {
        setLoading(false);
      }
    },
    [finishAuth, mode, referredBy, showError]
  );

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      finishAuth(await login(loginForm));
    } catch (caughtError) {
      showError(caughtError.response?.data?.message || 'Login failed. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendCode = async () => {
    if (!registerForm.email || codeCooldown || sendingCode) return;
    setSendingCode(true);
    setError('');
    try {
      await sendEmailCode({ email: registerForm.email });
      startCodeCooldown(registerForm.email);
      setMessage('Verification code sent. Check your inbox and spam folder.');
    } catch (caughtError) {
      const code = caughtError.response?.data?.error || caughtError.response?.data?.code;
      const retryAfterSeconds = Number(caughtError.response?.data?.retryAfterSeconds || caughtError.response?.headers?.['retry-after']);
      if (code === 'EMAIL_CODE_RATE_LIMITED' || caughtError.response?.status === 429) {
        const waitSeconds = Math.max(1, Math.ceil(retryAfterSeconds || codeCooldownSeconds));
        startCodeCooldown(registerForm.email, waitSeconds);
        setMessage(`Please wait ${formatWaitTime(waitSeconds)} before requesting another code.`);
      } else if (code === 'EMAIL_CODE_SEND_FAILED') {
        showError('Email delivery is temporarily unavailable. Please try again shortly.');
      } else {
        showError('Unable to send a verification code. Please check the address and try again.');
      }
    } finally {
      setSendingCode(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (accountType !== 'BUSINESS' && !/^\d{6}$/.test(registerForm.verificationCode)) return showError('Enter the 6-digit email verification code.');
    setLoading(true);
    setError('');
    try {
      if (accountType === 'BUSINESS' && (!registerForm.organizationType || !registerForm.region.trim())) {
        return showError('Please choose your organization type and region.');
      }
      if (accountType !== 'BUSINESS') await verifyEmailCode({ email: registerForm.email, code: registerForm.verificationCode });
      finishAuth(
        await register({
          ...registerForm,
          turnstileToken,
          agreedToTermsAt: new Date().toISOString(),
          referredBy,
          accountType,
        })
      );
    } catch (caughtError) {
      showError(caughtError.response?.data?.message || 'Registration failed. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const changeMode = (nextMode) => {
    setRegisterExpanded(nextMode === 'register' ? registerExpanded : false);
    onModeChange(nextMode);
    resetFormScroll();
  };

  const isLogin = mode === 'login';

  return (
    <section ref={panelRef} className="public-auth-panel" aria-labelledby="public-auth-title">
      <div className="public-auth-tabs" role="tablist" aria-label="Account access">
        <button className={isLogin ? 'is-active' : ''} onClick={() => changeMode('login')} type="button" role="tab" aria-selected={isLogin}>Sign in</button>
        <button className={!isLogin ? 'is-active' : ''} onClick={() => changeMode('register')} type="button" role="tab" aria-selected={!isLogin}>Create account</button>
      </div>

      <div className="public-auth-content">
        <p className="public-auth-eyebrow">{isLogin ? 'Welcome back' : accountType === 'BUSINESS' ? 'Business workspace' : 'Join the verified panel'}</p>
        <h2 id="public-auth-title">{isLogin ? 'Continue where you left off.' : accountType === 'BUSINESS' ? 'Create your research workspace.' : 'Your perspective belongs here.'}</h2>
        <p className="public-auth-intro">{isLogin ? 'Sign in to continue to your workspace.' : accountType === 'BUSINESS' ? 'Use your workspace to request a custom questionnaire or a tailored research study.' : 'Create a participant account, verify your email, and begin your first survey.'}</p>

        <p className="public-auth-consent">By {isLogin ? 'signing in' : 'creating an account'}, you agree to the <Link to="/terms" target="_blank">Terms of Service</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>.</p>

        <div className={loading ? 'pointer-events-none opacity-60' : ''}>
          {accountType !== 'BUSINESS' ? <GoogleButton mode={mode} onCredential={handleGoogleCredential} onError={showError} /> : null}
        </div>

        {accountType !== 'BUSINESS' ? <div className="public-auth-divider"><span>or continue with email</span></div> : null}

        {isLogin ? (
          <form className="public-auth-form" onSubmit={handleLogin}>
            <label><span>Email address</span><span className="public-auth-input"><Mail size={17} /><input type="email" autoComplete="email" placeholder="you@example.com" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} required /></span></label>
            <label><span>Password</span><span className="public-auth-input"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Your password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            <div className="public-auth-secondary"><Link to="/forgot-password">Forgot password?</Link></div>
            <button className="public-auth-submit" type="submit" disabled={loading}>{loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Sign in'}{!loading && <Check size={17} />}</button>
          </form>
        ) : !registerExpanded && accountType !== 'BUSINESS' ? (
          <button className="public-auth-email-cta" type="button" onClick={() => { setRegisterExpanded(true); resetFormScroll(); }}><Mail size={18} /> Continue with email</button>
        ) : (
          <form className="public-auth-form public-auth-register-form" onSubmit={handleRegister}>
            {accountType !== 'BUSINESS' && <button className="public-auth-back" type="button" onClick={() => { setRegisterExpanded(false); resetFormScroll(); }}><ChevronLeft size={16} /> Other sign-up options</button>}
            <label><span>{accountType === 'BUSINESS' ? 'Contact name' : 'Display name'}</span><span className="public-auth-input"><input type="text" autoComplete="name" placeholder={accountType === 'BUSINESS' ? 'Your name' : 'How should we call you?'} value={registerForm.displayName} onChange={(event) => setRegisterForm({ ...registerForm, displayName: event.target.value })} required /></span></label>
            {accountType === 'BUSINESS' && <>
              <label><span>Organization type</span><span className="public-auth-input"><select value={registerForm.organizationType} onChange={(event) => setRegisterForm({ ...registerForm, organizationType: event.target.value })} required><option value="">Select one</option><option value="BUSINESS">Business</option><option value="RESEARCH_OR_EDUCATION">Research or education</option><option value="NONPROFIT_OR_PUBLIC">Nonprofit or public organization</option><option value="INDEPENDENT_RESEARCHER">Independent researcher</option></select></span></label>
              <label><span>Region</span><span className="public-auth-input"><input type="text" autoComplete="address-level1" placeholder="Country or region" value={registerForm.region} onChange={(event) => setRegisterForm({ ...registerForm, region: event.target.value })} required /></span></label>
            </>}
            <label><span>Email address</span><span className="public-auth-input"><Mail size={17} /><input type="email" autoComplete="email" placeholder="you@example.com" value={registerForm.email} onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value, verificationCode: '' })} required /></span></label>
            {accountType !== 'BUSINESS' && <><button className="public-auth-code" type="button" onClick={handleSendCode} disabled={!registerForm.email || sendingCode || codeCooldown}>{sendingCode ? 'Sending…' : codeCooldown ? `Resend in ${codeCooldown}s` : 'Send verification code'}</button><label><span>Email code</span><span className="public-auth-input"><input inputMode="numeric" autoComplete="one-time-code" maxLength="6" placeholder="6-digit code" value={registerForm.verificationCode} onChange={(event) => setRegisterForm({ ...registerForm, verificationCode: event.target.value.replace(/\D/g, '').slice(0, 6) })} required /></span></label></>}
            <label><span>Password</span><span className="public-auth-input"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="new-password" minLength="8" placeholder="At least 8 characters" value={registerForm.password} onChange={(event) => setRegisterForm({ ...registerForm, password: event.target.value })} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            <TurnstileWidget theme="dark" onVerify={setTurnstileToken} onExpire={clearTurnstileToken} onError={clearTurnstileToken} />
            <button className="public-auth-submit" type="submit" disabled={loading || !turnstileToken}>{loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Create account'}{!loading && <Check size={17} />}</button>
          </form>
        )}

        {message && <p className="public-auth-message is-success">{message}</p>}
        {error && <p className="public-auth-message">{error}</p>}
      </div>
    </section>
  );
}
