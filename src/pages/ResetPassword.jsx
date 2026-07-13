import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react';
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
    <main className="recovery-page">
      <section className="recovery-shell">
        <aside className="recovery-brand" aria-label="GuanyiSearch password reset">
          <Link className="recovery-logo" to="/">
            <Logo size="lg" variant="light" />
          </Link>
          <img className="recovery-brand-mark" src="/guanyisearch-brand-mark.png" alt="" aria-hidden="true" />

          <div className="recovery-brand-copy">
            <p className="recovery-kicker">Secure reset</p>
            <h1>Set a password that is yours alone.</h1>
            <p>Your account, participation history, and reward record remain in one place. Choose a new password to continue.</p>
          </div>

          <div className="recovery-brand-note">
            <ShieldCheck size={17} />
            <span>Protected account access</span>
          </div>
        </aside>

        <section className="recovery-panel" aria-labelledby="reset-password-title">
          <div className="recovery-panel-inner">
            <Link className="recovery-return" to="/login">
              <ArrowLeft size={16} />
              Back to sign in
            </Link>

            <form className="recovery-card recovery-card-reset" onSubmit={handleSubmit}>
              <div className="recovery-icon"><KeyRound size={22} /></div>
              <p className="recovery-kicker">New password</p>
              <h2 id="reset-password-title">Keep your account secure.</h2>
              <p className="recovery-intro">Choose a strong password for your GuanyiSearch account. Your reset link is checked when you save it.</p>

              <label className="recovery-field-group">
                <span>New password</span>
                <span className="recovery-input">
                  <KeyRound size={17} aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                  <button
                    className="recovery-password-toggle"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>

              <div className="recovery-strength" aria-live="polite">
                <div className="recovery-strength-head"><span>Password strength</span><strong>{passwordStrength}</strong></div>
                <div className="recovery-strength-meter" aria-hidden="true">
                  {passwordChecks.map((check) => <span key={check.label} className={check.passed ? 'is-passed' : ''} />)}
                </div>
                <div className="recovery-strength-list">
                  {passwordChecks.map((check) => (
                    <span key={check.label} className={check.passed ? 'is-passed' : ''}>
                      <CheckCircle2 size={14} />
                      {check.label}
                    </span>
                  ))}
                </div>
              </div>

              <label className="recovery-field-group">
                <span>Confirm password</span>
                <span className="recovery-input">
                  <KeyRound size={17} aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </span>
              </label>

              {completed && (
                <div className="recovery-message is-success" role="status">
                  <CheckCircle2 size={17} />
                  <span>Password updated. You can sign in with your new password.</span>
                </div>
              )}

              {error && <p className="recovery-message is-error" role="alert">{error}</p>}

              {completed ? (
                <Link className="recovery-submit" to="/login"><span>Back to sign in</span><ArrowUpRight size={17} /></Link>
              ) : (
                <button className="recovery-submit" type="submit" disabled={loading}>
                  <span>{loading ? 'Saving password…' : 'Update password'}</span>
                  {loading ? <span className="recovery-spinner" aria-hidden="true" /> : <ArrowUpRight size={17} />}
                </button>
              )}
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
