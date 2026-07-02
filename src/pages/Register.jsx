import { useCallback, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import Logo from '../components/Logo';
import TurnstileWidget from '../components/TurnstileWidget';

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ displayName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const canSubmit = agreedToTerms && Boolean(turnstileToken) && !loading;

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const handleVerify = useCallback((token) => {
    setTurnstileToken(token);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken('');
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canSubmit) return;

    setLoading(true);
    setError('');

    try {
      const response = await register({
        ...form,
        turnstileToken,
        agreedToTermsAt: new Date().toISOString(),
      });
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (caughtError) {
      const code = caughtError.response?.data?.error || caughtError.response?.data?.code;
      if (code === 'TURNSTILE_VERIFICATION_FAILED') {
        resetTurnstile();
      }
      setError(caughtError.response?.data?.message || code || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 px-4 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8">
          <Logo size="lg" />
          <p className="mt-3 text-sm italic text-slate-500">Your opinion shapes the world.</p>
        </div>

        <form className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
          <div>
            <h1 className="text-2xl font-semibold text-slate-950">Create your account</h1>
            <p className="mt-2 text-sm text-slate-500">Access is reviewed and protected against automated signups.</p>
          </div>

          <label className="mt-6 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Display Name</span>
            <input
              className="field focus:border-green-500 focus:ring-2 focus:ring-green-100"
              name="displayName"
              value={form.displayName}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Email Address</span>
            <input
              className="field focus:border-green-500 focus:ring-2 focus:ring-green-100"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="enter your email"
              required
            />
          </label>

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Password</span>
            <span className="relative block">
              <input
                className="field pr-12 focus:border-green-500 focus:ring-2 focus:ring-green-100"
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

          <label className="mt-5 flex items-start gap-3 text-sm text-slate-600">
            <input
              className="mt-1 h-4 w-4 rounded border-slate-300 accent-green-600"
              type="checkbox"
              checked={agreedToTerms}
              onChange={(event) => setAgreedToTerms(event.target.checked)}
              required
            />
            <span>
              I have read and agree to the{' '}
              <Link className="font-semibold text-green-600 hover:text-green-700" to="/terms" target="_blank">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link className="font-semibold text-green-600 hover:text-green-700" to="/privacy" target="_blank">
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          <div className="mt-5">
            <TurnstileWidget onVerify={handleVerify} onExpire={resetTurnstile} onError={resetTurnstile} />
          </div>

          {error && <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <button
            className="mt-6 w-full rounded-xl bg-green-600 py-3 font-semibold text-white shadow-sm transition-all duration-200 hover:bg-green-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={!canSubmit}
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have access?{' '}
            <Link className="font-semibold text-green-600 hover:text-green-700" to="/login">
              Sign in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
}
