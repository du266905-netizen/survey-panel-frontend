import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, EyeOff, KeyRound } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/realApi';
import Logo from '../components/Logo';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || '';
  const token = searchParams.get('token') || '';
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState('');

  const passwordChecks = useMemo(
    () => [
      { label: '8+ characters', passed: form.password.length >= 8 },
      { label: 'Upper and lower case', passed: /[a-z]/.test(form.password) && /[A-Z]/.test(form.password) },
      { label: 'Number or symbol', passed: /[\d\W_]/.test(form.password) },
    ],
    [form.password]
  );
  const passwordScore = passwordChecks.filter((check) => check.passed).length;
  const passwordStrength = passwordScore === 3 ? 'Strong' : passwordScore === 2 ? 'Good' : passwordScore === 1 ? 'Fair' : 'Weak';

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (!email || !token) {
      setError('Invalid or expired reset link.');
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await resetPassword({ email, token, password: form.password });
      setCompleted(true);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-md flex-col justify-center">
        <div className="mb-8">
          <Logo size="lg" />
          <p className="mt-3 text-sm italic text-slate-500">Your opinion shapes the world.</p>
        </div>

        <form className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm" onSubmit={handleSubmit}>
          <div className="mb-7 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
            <KeyRound size={22} />
          </div>
          <h1 className="text-2xl font-semibold text-slate-950">Create new password</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Choose a stronger password for your Guanyi Search account.</p>

          <label className="mt-6 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">New Password</span>
            <span className="relative block">
              <input
                className="field pr-12"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                placeholder="enter a new password"
                autoComplete="new-password"
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

          <label className="mt-4 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Confirm Password</span>
            <input
              className="field"
              type={showPassword ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
              placeholder="confirm your password"
              autoComplete="new-password"
              minLength={8}
              required
            />
          </label>

          {completed && (
            <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm font-semibold text-cyan-800">
              Password updated. You can sign in with your new password.
            </div>
          )}

          {error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          {completed ? (
            <Link className="btn-primary mt-6 w-full" to="/login">
              Back to login
            </Link>
          ) : (
            <button className="btn-primary mt-6 w-full" type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update password'}
            </button>
          )}
        </form>
      </section>
    </main>
  );
}
