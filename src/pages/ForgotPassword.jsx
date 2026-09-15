import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../api/realApi';
import Logo from '../components/Logo';
import { useLanguage, withLanguage } from '../components/LanguageContext';

const recoveryCopy = {
  'zh-CN': { recovery: '账户恢复', title: '回到你的研究旅程。', body: '我们会发送一封带有安全、限时链接的邮件，供你设置新密码。', secure: '安全的账户恢复', back: '返回登录', reset: '重设密码', heading: '找回你的账户。', intro: '输入与你账户关联的邮箱。若系统识别该地址，我们会立即发送重设说明。', email: '邮箱地址', sent: '若该邮箱有效，密码重设说明已发送。', sending: '正在发送安全链接…', send: '发送重设链接', remembered: '想起密码了？', signIn: '立即登录', error: '无法发送密码重设邮件。' },
  'zh-Hant': { recovery: '帳戶復原', title: '回到你的研究旅程。', body: '我們會發送一封帶有安全、限時連結的電郵，供你設定新密碼。', secure: '安全的帳戶復原', back: '返回登入', reset: '重設密碼', heading: '找回你的帳戶。', intro: '輸入與你帳戶關聯的電郵。若系統識別該地址，我們會立即發送重設說明。', email: '電郵地址', sent: '若該電郵有效，密碼重設說明已發送。', sending: '正在發送安全連結…', send: '發送重設連結', remembered: '想起密碼了？', signIn: '立即登入', error: '無法發送密碼重設電郵。' },
};

export default function ForgotPassword() {
  const { language } = useLanguage();
  const copy = recoveryCopy[language] || { recovery: 'Account recovery', title: 'Return to your research journey.', body: 'We will send a secure, time-limited link so you can choose a new password and return when you are ready.', secure: 'Secure account recovery', back: 'Back to sign in', reset: 'Password reset', heading: 'Find your way back.', intro: 'Enter the email address linked to your account. If it is recognised, we will send reset instructions right away.', email: 'Email address', sent: 'If the email is valid, password reset instructions have been sent.', sending: 'Sending secure link…', send: 'Send reset link', remembered: 'Remembered your password?', signIn: 'Sign in instead', error: 'Unable to send password reset email.' };
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
      setError(caughtError.response?.data?.message || copy.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="recovery-page">
      <section className="recovery-shell">
        <aside className="recovery-brand" aria-label="GuanyiSearch account recovery">
          <Link className="recovery-logo" to={withLanguage('/', language)}>
            <Logo size="lg" variant="light" />
          </Link>
          <img className="recovery-brand-mark" src="/guanyisearch-brand-mark.png" alt="" aria-hidden="true" />

          <div className="recovery-brand-copy">
            <p className="recovery-kicker">{copy.recovery}</p>
            <h1>{copy.title}</h1>
            <p>{copy.body}</p>
          </div>

          <div className="recovery-brand-note">
            <ShieldCheck size={17} />
            <span>{copy.secure}</span>
          </div>
        </aside>

        <section className="recovery-panel" aria-labelledby="forgot-password-title">
          <div className="recovery-panel-inner">
            <Link className="recovery-return" to={withLanguage('/login', language)}>
              <ArrowLeft size={16} />
              {copy.back}
            </Link>

            <form className="recovery-card" onSubmit={handleSubmit}>
              <div className="recovery-icon"><Mail size={22} /></div>
              <p className="recovery-kicker">{copy.reset}</p>
              <h2 id="forgot-password-title">{copy.heading}</h2>
              <p className="recovery-intro">{copy.intro}</p>

              <label className="recovery-field-group">
                <span>{copy.email}</span>
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
                  <span>{copy.sent}</span>
                </div>
              )}

              {error && <p className="recovery-message is-error" role="alert">{error}</p>}

              <button className="recovery-submit" type="submit" disabled={loading}>
                <span>{loading ? copy.sending : copy.send}</span>
                {loading ? <span className="recovery-spinner" aria-hidden="true" /> : <ArrowUpRight size={17} />}
              </button>

              <p className="recovery-help">{copy.remembered} <Link to={withLanguage('/login', language)}>{copy.signIn}</Link></p>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
