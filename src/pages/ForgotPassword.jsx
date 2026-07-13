import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, ShieldCheck } from 'lucide-react';
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
    <main className="recovery-page">
      <section className="recovery-shell">
        <aside className="recovery-brand" aria-label="GuanyiSearch account recovery">
          <Link className="recovery-logo" to="/">
            <Logo size="lg" variant="light" />
          </Link>
          <img className="recovery-brand-mark" src="/guanyisearch-brand-mark.png" alt="" aria-hidden="true" />

          <div className="recovery-brand-copy">
            <p className="recovery-kicker">Account recovery</p>
            <h1>Return to your research journey.</h1>
            <p>We will send a secure, time-limited link so you can choose a new password and return when you are ready.</p>
          </div>

          <div className="recovery-brand-note">
            <ShieldCheck size={17} />
            <span>Secure account recovery</span>
          </div>
        </aside>

        <section className="recovery-panel" aria-labelledby="forgot-password-title">
          <div className="recovery-panel-inner">
            <Link className="recovery-return" to="/login">
              <ArrowLeft size={16} />
              Back to sign in
            </Link>

            <form className="recovery-card" onSubmit={handleSubmit}>
              <div className="recovery-icon"><Mail size={22} /></div>
              <p className="recovery-kicker">Password reset</p>
              <h2 id="forgot-password-title">Find your way back.</h2>
              <p className="recovery-intro">Enter the email address linked to your account. If it is recognised, we will send reset instructions right away.</p>

              <label className="recovery-field-group">
                <span>Email address</span>
                <span className="recovery-input">
                  <Mail size={17} aria-hidden="true" />
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </span>
              </label>

              {submitted && (
                <div className="recovery-message is-success" role="status">
                  <Mail size={17} />
                  <span>If the email is valid, password reset instructions have been sent.</span>
                </div>
              )}

              {error && <p className="recovery-message is-error" role="alert">{error}</p>}

              <button className="recovery-submit" type="submit" disabled={loading}>
                <span>{loading ? 'Sending secure link…' : 'Send reset link'}</span>
                {loading ? <span className="recovery-spinner" aria-hidden="true" /> : <ArrowUpRight size={17} />}
              </button>

              <p className="recovery-help">Remembered your password? <Link to="/login">Sign in instead</Link></p>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
