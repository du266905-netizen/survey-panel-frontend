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
    <main className="grid min-h-screen overflow-hidden bg-stone-50 lg:grid-cols-[0.92fr_1.08fr]">
      <section className="relative flex min-h-screen items-center px-6 py-10 sm:px-10 lg:px-14">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-green-100/70 blur-3xl" />
        <div className="relative mx-auto w-full max-w-md">
          <Logo size="lg" />

          <div className="mt-10 rounded-[28px] border border-white bg-white/90 p-7 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-9">
            <div className="mb-7">
              <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600 ring-1 ring-green-100">
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
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
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
                    className="h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-sm font-medium text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
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
                <span className="text-slate-400">Admin-created accounts only</span>
                <a className="font-semibold text-green-600 hover:text-green-700" href="mailto:heguanyi@guanyi-media.com">
                  Need access?
                </a>
              </div>

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-green-600 text-sm font-bold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl hover:shadow-green-600/25 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
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
            Need a participant account? <Link className="font-semibold text-green-600 hover:text-green-700" to="/register">Register here</Link>
          </p>
        </div>
      </section>

      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <img className="absolute inset-0 h-full w-full object-cover" src="/hero.jpg" alt="Research participant giving feedback" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,20,10,0.08)_0%,rgba(0,32,16,0.72)_100%)]" />
        <div className="absolute right-10 top-10 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur">
          1000 Coins = $1 USD
        </div>
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
