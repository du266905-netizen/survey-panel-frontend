import { useCallback, useEffect, useRef, useState } from 'react';
import { Check, ChevronLeft, Eye, EyeOff, LoaderCircle, LockKeyhole, Mail } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { googleLogin, login, register, sendEmailCode, verifyEmailCode } from '../api/realApi';
import { useAuth } from './AuthContext';
import TurnstileWidget from './TurnstileWidget';

const GOOGLE_SCRIPT_SRC = 'https://accounts.google.com/gsi/client';
const codeCooldownSeconds = 60;
let googleScriptPromise;

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

function GoogleButton({ mode, agreedToTerms, onCredential, onError }) {
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
            if (mode === 'register' && !agreedToTerms) {
              onError('Please agree to the Terms of Service and Privacy Policy before continuing.');
              return;
            }
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
        });
      })
      .catch(() => onError('Google sign-in could not be loaded. Please use email instead.'));
    return () => {
      active = false;
    };
  }, [agreedToTerms, clientId, mode, onCredential, onError]);

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

export default function PublicAuthPanel({ mode = 'register', onModeChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const panelRef = useRef(null);
  const { setUser } = useAuth();
  const [registerExpanded, setRegisterExpanded] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ displayName: '', email: '', password: '', verificationCode: '' });
  const [agreedToTerms, setAgreedToTerms] = useState(false);
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
    setError('');
    setMessage('');
    setShowPassword(false);
  }, [mode]);

  const showError = useCallback((value) => {
    setMessage('');
    setError(value);
  }, []);

  const clearTurnstileToken = useCallback(() => {
    setTurnstileToken('');
  }, []);

  const resetFormScroll = useCallback(() => {
    window.requestAnimationFrame(() => panelRef.current?.closest('.landing-access-inner')?.scrollTo({ top: 0, behavior: 'auto' }));
  }, []);

  const finishAuth = useCallback(
    (response) => {
      setUser(response.data.user);
      navigate(response.data.isNewUser ? '/onboarding' : '/dashboard', { replace: true });
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
      setCodeCooldown(codeCooldownSeconds);
      setMessage('Verification code sent. Check your inbox.');
    } catch (caughtError) {
      showError(caughtError.response?.data?.message || 'Unable to send a verification code.');
    } finally {
      setSendingCode(false);
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!agreedToTerms) return showError('Please agree to the Terms of Service and Privacy Policy.');
    if (!/^\d{6}$/.test(registerForm.verificationCode)) return showError('Enter the 6-digit email verification code.');
    setLoading(true);
    setError('');
    try {
      await verifyEmailCode({ email: registerForm.email, code: registerForm.verificationCode });
      finishAuth(
        await register({
          ...registerForm,
          turnstileToken,
          agreedToTermsAt: new Date().toISOString(),
          referredBy,
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
        <p className="public-auth-eyebrow">{isLogin ? 'Welcome back' : 'Join the verified panel'}</p>
        <h2 id="public-auth-title">{isLogin ? 'Continue where you left off.' : 'Your perspective belongs here.'}</h2>
        <p className="public-auth-intro">{isLogin ? 'Access your survey wall, wallet, and activity records.' : 'Create a panelist account, verify your email, and start building your profile.'}</p>

        {!isLogin && (
          <label className="public-auth-consent">
            <input type="checkbox" checked={agreedToTerms} onChange={(event) => setAgreedToTerms(event.target.checked)} />
            <span>I agree to the <Link to="/terms" target="_blank">Terms</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>.</span>
          </label>
        )}

        <div className={loading ? 'pointer-events-none opacity-60' : ''}>
          <GoogleButton mode={mode} agreedToTerms={agreedToTerms} onCredential={handleGoogleCredential} onError={showError} />
        </div>

        <div className="public-auth-divider"><span>or continue with email</span></div>

        {isLogin ? (
          <form className="public-auth-form" onSubmit={handleLogin}>
            <label><span>Email address</span><span className="public-auth-input"><Mail size={17} /><input type="email" autoComplete="email" placeholder="you@example.com" value={loginForm.email} onChange={(event) => setLoginForm({ ...loginForm, email: event.target.value })} required /></span></label>
            <label><span>Password</span><span className="public-auth-input"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" placeholder="Your password" value={loginForm.password} onChange={(event) => setLoginForm({ ...loginForm, password: event.target.value })} required /><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></span></label>
            <div className="public-auth-secondary"><Link to="/forgot-password">Forgot password?</Link></div>
            <button className="public-auth-submit" type="submit" disabled={loading}>{loading ? <LoaderCircle className="animate-spin" size={18} /> : 'Sign in'}{!loading && <Check size={17} />}</button>
          </form>
        ) : !registerExpanded ? (
          <button className="public-auth-email-cta" type="button" onClick={() => { setRegisterExpanded(true); resetFormScroll(); }}><Mail size={18} /> Continue with email</button>
        ) : (
          <form className="public-auth-form public-auth-register-form" onSubmit={handleRegister}>
            <button className="public-auth-back" type="button" onClick={() => { setRegisterExpanded(false); resetFormScroll(); }}><ChevronLeft size={16} /> Other sign-up options</button>
            <label><span>Display name</span><span className="public-auth-input"><input type="text" autoComplete="name" placeholder="How should we call you?" value={registerForm.displayName} onChange={(event) => setRegisterForm({ ...registerForm, displayName: event.target.value })} required /></span></label>
            <label><span>Email address</span><span className="public-auth-input"><Mail size={17} /><input type="email" autoComplete="email" placeholder="you@example.com" value={registerForm.email} onChange={(event) => setRegisterForm({ ...registerForm, email: event.target.value, verificationCode: '' })} required /></span></label>
            <button className="public-auth-code" type="button" onClick={handleSendCode} disabled={!registerForm.email || sendingCode || codeCooldown}>{sendingCode ? 'Sending…' : codeCooldown ? `Resend in ${codeCooldown}s` : 'Send verification code'}</button>
            <label><span>Email code</span><span className="public-auth-input"><input inputMode="numeric" autoComplete="one-time-code" maxLength="6" placeholder="6-digit code" value={registerForm.verificationCode} onChange={(event) => setRegisterForm({ ...registerForm, verificationCode: event.target.value.replace(/\D/g, '').slice(0, 6) })} required /></span></label>
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
