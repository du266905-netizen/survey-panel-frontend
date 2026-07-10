import { useState } from 'react';
import { Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import Logo from '../components/Logo';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await login(form);
      setUser(response.data.user);
      navigate('/dashboard');
    } catch (caughtError) {
      const message = caughtError.response?.data?.message || 'Login failed. Please check your email and password.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen overflow-hidden bg-slate-50 md:grid-cols-[0.92fr_1.08fr]">
      <section className="relative flex min-h-screen items-center px-6 py-10 sm:px-10 lg:px-14">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-slate-100/60 blur-3xl" />
        <div className="relative mx-auto w-full max-w-md">
          <Logo size="lg" />

          <div className="mt-10 rounded-[28px] border border-slate-100 bg-white p-7 shadow-[0_24px_80px_rgba(15,23,42,0.10)] sm:p-9">
            <div className="mb-7">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 ring-1 ring-cyan-100">
                <LockKeyhole size={22} />
              </div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-950">Welcome back</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">Sign in to manage surveys, coins, records, and partner performance.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Email address</span>
                <span className="relative block">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    type="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    autoComplete="email"
                    required
                  />
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Password</span>
                <span className="relative block">
                  <input
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    className="absolute right-3 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>
              </label>

              <div className="flex items-center justify-between text-xs">
                <span aria-hidden="true" />
                <Link className="font-semibold text-cyan-600 hover:text-cyan-700" to="/forgot-password">
                  Forgot password?
                </Link>
              </div>

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-cyan-600 text-sm font-bold text-white shadow-lg shadow-cyan-600/20 transition hover:-translate-y-0.5 hover:bg-cyan-700 hover:shadow-xl hover:shadow-cyan-600/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Login'}
              </button>

              {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-400">
            Need a participant account? <Link className="font-semibold text-cyan-600 hover:text-cyan-700" to="/register">Register here</Link>
          </p>
        </div>
      </section>

      <section
        className="relative hidden min-h-screen overflow-hidden bg-slate-900 md:block"
        aria-label="Research participant using a mobile device"
      >
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="/login-hero.jpg?v=20260709"
          alt=""
          aria-hidden="true"
          decoding="async"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.04)_0%,rgba(15,23,42,0.62)_100%)]" />
        <div className="absolute bottom-12 left-12 max-w-xl text-white">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
            <ShieldCheck size={16} />
            Trusted survey operations
          </div>
          <h2 className="text-5xl font-light leading-tight tracking-tight">Your opinion shapes the world.</h2>
          <p className="mt-4 max-w-md text-base leading-7 text-white/72">
            Connect with research partners, complete verified surveys, and earn coins for the time you invest.
          </p>
        </div>
      </section>
    </main>
  );
}
