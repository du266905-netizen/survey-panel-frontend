import { useState } from 'react';
import { ArrowLeft, Mail, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../api/realApi';
import Logo from '../components/Logo';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      await requestPasswordReset({ email });
      setSubmitted(true);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to send password reset email.');
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
            <Mail size={22} />
          </div>
          <h1 className="text-2xl font-semibold text-slate-950">Reset password</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter your account email and we will send a secure reset link.
          </p>

          <label className="mt-6 block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.08em] text-slate-700">Email Address</span>
            <input
              className="field"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="enter your email"
              autoComplete="email"
              required
            />
          </label>

          {submitted && (
            <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm font-semibold text-cyan-800">
              If the email is valid, password reset instructions have been sent.
            </div>
          )}

          {error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          <button className="btn-primary mt-6 w-full" type="submit" disabled={loading}>
            <Send size={16} />
            {loading ? 'Sending...' : 'Send reset link'}
          </button>

          <Link className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 hover:text-cyan-800" to="/login">
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </form>
      </section>
    </main>
  );
}
