import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { register, sendEmailCode, verifyEmailCode } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import Logo from '../components/Logo';
import TurnstileWidget from '../components/TurnstileWidget';

const codeCooldownSeconds = 60;

export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ displayName: '', email: '', password: '', verificationCode: '' });
  const codeInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [codeCooldown, setCodeCooldown] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [codeFocused, setCodeFocused] = useState(false);
  const [toast, setToast] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!codeCooldown) return undefined;
    const timer = window.setTimeout(() => setCodeCooldown((value) => Math.max(0, value - 1)), 1000);
    return () => window.clearTimeout(timer);
  }, [codeCooldown]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = window.setTimeout(() => setToast(null), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValue = name === 'verificationCode' ? value.replace(/\D/g, '').slice(0, 6) : value;
    setForm((current) => ({ ...current, [name]: nextValue }));
    if (name === 'email' || name === 'verificationCode') {
      setEmailVerified(false);
    }
  };

  const handleVerify = useCallback((token) => {
    setTurnstileToken(token);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken('');
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const passwordChecks = [
    { label: '8+ characters', passed: form.password.length >= 8 },
    { label: 'Upper and lower case', passed: /[a-z]/.test(form.password) && /[A-Z]/.test(form.password) },
    { label: 'Number or symbol', passed: /[\d\W_]/.test(form.password) },
  ];
  const passwordScore = passwordChecks.filter((check) => check.passed).length;
  const passwordStrength = passwordScore === 3 ? 'Strong' : passwordScore === 2 ? 'Good' : passwordScore === 1 ? 'Fair' : 'Weak';

  // Client-side cooldown mirrors the server limit and prevents accidental resends.
  const handleSendCode = async () => {
    if (!form.email || sendingCode || codeCooldown) return;

    setSendingCode(true);
    setError('');

    try {
      await sendEmailCode({ email: form.email });
      setCodeCooldown(codeCooldownSeconds);
      showToast('Verification code sent.', 'success');
    } catch {
      showToast('Unable to send verification code.', 'error');
    } finally {
      setSendingCode(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!agreedToTerms || loading) return;
    if (!/^\d{6}$/.test(form.verificationCode)) {
      setError('Invalid verification code.');
      showToast('Invalid verification code.', 'error');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // The code is verified first, then submitted with registration as proof.
      if (!emailVerified) {
        await verifyEmailCode({ email: form.email, code: form.verificationCode });
        setEmailVerified(true);
      }
      const response = await register({
        ...form,
        turnstileToken,
        agreedToTermsAt: new Date().toISOString(),
        referredBy: searchParams.get('ref') || undefined,
      });
      setUser(response.data.user);
      navigate('/panel-profile', { replace: true });
    } catch (caughtError) {
      const code = caughtError.response?.data?.error || caughtError.response?.data?.code;
      if (code === 'TURNSTILE_VERIFICATION_FAILED') {
        resetTurnstile();
      }
      if (code === 'EMAIL_CODE_INVALID') {
        showToast('Invalid verification code.', 'error');
      }
      setError(caughtError.response?.data?.message || code || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const codeDigits = Array.from({ length: 6 }, (_, index) => form.verificationCode[index] || '');

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      {toast && (
        <div
          className={`fixed right-4 top-4 z-50 rounded-xl border px-4 py-3 text-sm font-semibold shadow-lg ${
            toast.type === 'error' ? 'border-red-200 bg-red-50 text-red-700' : 'border-cyan-200 bg-white text-cyan-800'
          }`}
        >
          {toast.message}
        </div>
      )}
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8">
          <Logo size="lg" />
          <p className="mt-3 text-sm italic text-slate-500">Your opinion shapes the world.</p>
        </div>

        <form className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500">Create a panelist account to access available surveys.</p>
          </div>

          <label className="mt-6 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Display Name</span>
            <input
              className="field"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Email Address</span>
            <span className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <input
                className="field"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="enter your email"
                required
              />
              <button
                className="btn-secondary min-h-11 min-w-[9rem] px-4 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                type="button"
                disabled={!form.email || sendingCode || codeCooldown > 0}
                onClick={handleSendCode}
              >
                {sendingCode ? 'Sending...' : codeCooldown ? `${codeCooldown}s` : 'Send Code'}
              </button>
            </span>
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Email Verification Code</span>
            <span className="relative block">
              <input
                ref={codeInputRef}
                className="sr-only"
                name="verificationCode"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={form.verificationCode}
                onChange={handleChange}
                onFocus={() => setCodeFocused(true)}
                onBlur={() => setCodeFocused(false)}
                aria-label="Email verification code"
                required
              />
              <span
                className="grid grid-cols-6 gap-2"
                aria-hidden="true"
                onMouseDown={(event) => {
                  event.preventDefault();
                  codeInputRef.current?.focus();
                }}
              >
                {codeDigits.map((digit, index) => {
                  const isActive = codeFocused && index === Math.min(form.verificationCode.length, 5);
                  return (
                    <span
                      className={`flex aspect-square min-h-12 items-center justify-center rounded-xl border bg-white text-lg font-semibold text-slate-950 shadow-sm transition-colors ${
                        isActive ? 'border-cyan-500 ring-2 ring-cyan-100' : 'border-slate-200'
                      }`}
                      key={index}
                    >
                      {digit}
                    </span>
                  );
                })}
              </span>
              {emailVerified && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-600" aria-label="Email verified">
                  <CheckCircle2 size={18} />
                </span>
              )}
            </span>
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Password</span>
            <span className="relative block">
              <input
                className="field pr-12"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
                placeholder="enter your password"
                minLength={8}
                required
              />
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-900"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </span>
          </label>

          <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-600">
              <span>Password strength</span>
              <span>{passwordStrength}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
              {passwordChecks.map((check) => (
                <span
                  key={check.label}
                  className={`h-1.5 rounded-full ${check.passed ? 'bg-cyan-500' : 'bg-slate-200'}`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <div className="mt-3 grid gap-1 text-xs font-medium text-slate-500">
              {passwordChecks.map((check) => (
                <span className="flex items-center gap-2" key={check.label}>
                  <CheckCircle2 size={14} className={check.passed ? 'text-cyan-600' : 'text-slate-300'} />
                  {check.label}
                </span>
              ))}
            </div>
          </div>

          <label className="mt-5 flex items-start gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(event) => setAgreedToTerms(event.target.checked)}
              className="mt-1"
              required
            />
            <span>
              I agree to the{' '}
              <a href="/terms" target="_blank" rel="noreferrer" className="underline text-cyan-600">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="/privacy" target="_blank" rel="noreferrer" className="underline text-cyan-600">
                Privacy Policy
              </a>
            </span>
          </label>

          <div className="mt-5">
            <TurnstileWidget onVerify={handleVerify} onExpire={resetTurnstile} onError={resetTurnstile} />
          </div>

          {error && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <button
            className="mt-6 w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-cyan-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={!agreedToTerms || !turnstileToken || loading}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have access?{' '}
            <Link className="font-semibold text-cyan-600 hover:text-cyan-700" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
