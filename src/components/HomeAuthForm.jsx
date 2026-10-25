import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin } from '../api/realApi';
import { useAuth } from './AuthContext';
import { useLanguage, withLanguage } from './LanguageContext';
import { GoogleButton } from './PublicAuthPanel';
import './HomeAuthForm.css';

export default function HomeAuthForm({ audience = 'participant' }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const { language, publicCopy } = useLanguage();
  const form = publicCopy.pages.access.form;
  const navigate = useNavigate();
  const isResearch = audience === 'research';

  /* 2026-10-25：这一格以前是空按钮（onSubmit 只 preventDefault）。现在把邮箱带到
     报名页，用户不用再打一遍；研究端回研究端的注册页，参与端回参与端的注册页。
     登录仍在那两页的面板里切换。 */
  const handleSubmit = (event) => {
    event.preventDefault();
    const target = isResearch ? '/business/register' : '/register';
    const query = new URLSearchParams({ email: email.trim() }).toString();
    navigate(`${withLanguage(target, language)}&${query}`);
  };

  const handleGoogleCredential = async (credential) => {
    setError('');
    try {
      const response = await googleLogin({ credential });
      setUser(response.data.user);
      const role = String(response.data.user?.role || '').toUpperCase();
      navigate(role === 'BUSINESS' ? '/business/workspace' : '/dashboard', { replace: true });
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="home-auth-form">
      {!isResearch && (
        <>
          <div className="home-auth-google-wrap">
            <GoogleButton
              mode="login"
              onCredential={handleGoogleCredential}
              onError={setError}
              language="en-US"
              theme="outline"
              variant="field"
              label={form.google}
              note="Google sign-in is unavailable on this network"
            />
          </div>
          <div className="home-auth-or"><span>{form.or}</span></div>
        </>
      )}

      <form className="home-auth-email" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={form.emailPlaceholder}
          aria-label="Email address"
          autoComplete="email"
          required
        />
        <button type="submit">{form.continue}</button>
      </form>

      {error && <p className="home-auth-error" role="alert">{error}</p>}

      <p className="home-auth-terms">
        {form.terms.split(/(\{terms\}|\{privacy\})/).map((part, index) => {
          if (part === '{terms}') {
            return (
              <Link key={index} to={isResearch ? '/business/terms' : '/terms'} target="_blank" rel="noopener noreferrer">
                {publicCopy.home.footer.termsService}
              </Link>
            );
          }
          if (part === '{privacy}') {
            return (
              <Link key={index} to="/privacy" target="_blank" rel="noopener noreferrer">
                {publicCopy.home.footer.privacyPolicy}
              </Link>
            );
          }
          return part;
        })}
      </p>
    </div>
  );
}
