import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, CheckCircle2, Eye, EyeOff, KeyRound, ShieldCheck } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../api/realApi';
import Logo from '../components/Logo';
import { useLanguage, withLanguage } from '../components/LanguageContext';

const resetCopy = {
  'zh-CN': { kicker: '安全重设', title: '设置只属于你的密码。', body: '你的账户、参与记录与奖励记录都保存在同一个地方。设置新密码后即可继续。', secure: '受保护的账户访问', back: '返回登录', newPassword: '新密码', heading: '保护你的账户安全。', intro: '为你的 GuanyiSearch 账户设置强密码。保存时会验证重设链接。', strength: '密码强度', strong: '强', good: '良好', fair: '一般', weak: '弱', characters: '至少 8 个字符', cases: '包含大写和小写字母', number: '包含数字或符号', confirm: '确认密码', confirmPlaceholder: '再次输入新密码', updated: '密码已更新。你可以使用新密码登录。', saving: '正在保存密码…', update: '更新密码', showPassword: '显示密码', hidePassword: '隐藏密码', errorLink: '重设链接无效或已过期。', errorMatch: '两次输入的密码不一致。', errorReset: '无法重设密码。' },
  'zh-Hant': { kicker: '安全重設', title: '設定只屬於你的密碼。', body: '你的帳戶、參與紀錄與獎勵紀錄都保存在同一個地方。設定新密碼後即可繼續。', secure: '受保護的帳戶存取', back: '返回登入', newPassword: '新密碼', heading: '保護你的帳戶安全。', intro: '為你的 GuanyiSearch 帳戶設定強密碼。儲存時會驗證重設連結。', strength: '密碼強度', strong: '強', good: '良好', fair: '一般', weak: '弱', characters: '至少 8 個字元', cases: '包含大寫和小寫字母', number: '包含數字或符號', confirm: '確認密碼', confirmPlaceholder: '再次輸入新密碼', updated: '密碼已更新。你可以使用新密碼登入。', saving: '正在儲存密碼…', update: '更新密碼', showPassword: '顯示密碼', hidePassword: '隱藏密碼', errorLink: '重設連結無效或已過期。', errorMatch: '兩次輸入的密碼不一致。', errorReset: '無法重設密碼。' },
};

export default function ResetPassword() {
  const { language } = useLanguage();
  const copy = resetCopy[language] || { kicker: 'Secure reset', title: 'Set a password that is yours alone.', body: 'Your account, participation history, and reward record remain in one place. Choose a new password to continue.', secure: 'Protected account access', back: 'Back to sign in', newPassword: 'New password', heading: 'Keep your account secure.', intro: 'Choose a strong password for your GuanyiSearch account. Your reset link is checked when you save it.', strength: 'Password strength', strong: 'Strong', good: 'Good', fair: 'Fair', weak: 'Weak', characters: '8+ characters', cases: 'Upper and lower case', number: 'Number or symbol', confirm: 'Confirm password', confirmPlaceholder: 'Confirm your new password', updated: 'Password updated. You can sign in with your new password.', saving: 'Saving password…', update: 'Update password', showPassword: 'Show password', hidePassword: 'Hide password', errorLink: 'Invalid or expired reset link.', errorMatch: 'Passwords do not match.', errorReset: 'Unable to reset password.' };
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
      { label: copy.characters, passed: form.password.length >= 8 },
      { label: copy.cases, passed: /[a-z]/.test(form.password) && /[A-Z]/.test(form.password) },
      { label: copy.number, passed: /[\d\W_]/.test(form.password) },
    ],
    [copy, form.password]
  );
  const passwordScore = passwordChecks.filter((check) => check.passed).length;
  const passwordStrength = passwordScore === 3 ? copy.strong : passwordScore === 2 ? copy.good : passwordScore === 1 ? copy.fair : copy.weak;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;

    if (!email || !token) {
      setError(copy.errorLink);
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError(copy.errorMatch);
      return;
    }

    setLoading(true);
    setError('');

    try {
      await resetPassword({ email, token, password: form.password });
      setCompleted(true);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || copy.errorReset);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="recovery-page">
      <section className="recovery-shell">
        <aside className="recovery-brand" aria-label="GuanyiSearch password reset">
          <Link className="recovery-logo" to={withLanguage('/', language)}>
            <Logo size="lg" variant="light" />
          </Link>
          <img className="recovery-brand-mark" src="/guanyisearch-brand-mark.png" alt="" aria-hidden="true" />

          <div className="recovery-brand-copy">
            <p className="recovery-kicker">{copy.kicker}</p>
            <h1>{copy.title}</h1>
            <p>{copy.body}</p>
          </div>

          <div className="recovery-brand-note">
            <ShieldCheck size={17} />
            <span>{copy.secure}</span>
          </div>
        </aside>

        <section className="recovery-panel" aria-labelledby="reset-password-title">
          <div className="recovery-panel-inner">
            <Link className="recovery-return" to={withLanguage('/login', language)}>
              <ArrowLeft size={16} />
              {copy.back}
            </Link>

            <form className="recovery-card recovery-card-reset" onSubmit={handleSubmit}>
              <div className="recovery-icon"><KeyRound size={22} /></div>
              <p className="recovery-kicker">{copy.newPassword}</p>
              <h2 id="reset-password-title">{copy.heading}</h2>
              <p className="recovery-intro">{copy.intro}</p>

              <label className="recovery-field-group">
                <span>{copy.newPassword}</span>
                <span className="recovery-input">
                  <KeyRound size={17} aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                    placeholder={copy.characters}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                  <button
                    className="recovery-password-toggle"
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? copy.hidePassword : copy.showPassword}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </span>
              </label>

              <div className="recovery-strength" aria-live="polite">
                <div className="recovery-strength-head"><span>{copy.strength}</span><strong>{passwordStrength}</strong></div>
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
                <span>{copy.confirm}</span>
                <span className="recovery-input">
                  <KeyRound size={17} aria-hidden="true" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={(event) => setForm((current) => ({ ...current, confirmPassword: event.target.value }))}
                    placeholder={copy.confirmPlaceholder}
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </span>
              </label>

              {completed && (
                <div className="recovery-message is-success" role="status">
                  <CheckCircle2 size={17} />
                  <span>{copy.updated}</span>
                </div>
              )}

              {error && <p className="recovery-message is-error" role="alert">{error}</p>}

              {completed ? (
                <Link className="recovery-submit" to={withLanguage('/login', language)}><span>{copy.back}</span><ArrowUpRight size={17} /></Link>
              ) : (
                <button className="recovery-submit" type="submit" disabled={loading}>
                  <span>{loading ? copy.saving : copy.update}</span>
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
