import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/mockApi';
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
      setError(caughtError.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .login-page {
          display: flex;
          flex-direction: row;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #ffffff;
        }

        .login-left {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 45%;
          padding: 48px;
          background: #fafaf9;
          animation: slideInLeft 0.5s ease-out;
        }

        .login-left-inner {
          width: 100%;
          max-width: 420px;
          margin: 0 auto;
        }

        .login-logo {
          display: flex;
        }

        .login-copy {
          margin-top: 8px;
        }

        .login-copy-primary {
          color: #374151;
          font-size: 13px;
          font-style: italic;
        }

        .login-divider {
          margin: 24px 0;
          border: none;
          border-top: 1px solid #f3f4f6;
        }

        .login-title {
          color: #111827;
          font-size: 24px;
          font-weight: 600;
        }

        .login-subtitle {
          margin-top: 6px;
          color: #6b7280;
          font-size: 13px;
        }

        .login-form {
          margin-top: 24px;
        }

        .login-field {
          display: block;
          margin-top: 18px;
        }

        .login-field:first-child {
          margin-top: 0;
        }

        .login-label {
          display: block;
          margin-bottom: 6px;
          color: #374151;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .login-input-wrap {
          position: relative;
          display: block;
        }

        .login-input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          outline: none;
          color: #111827;
          font-size: 14px;
          transition: all 0.2s ease;
        }

        .login-input:focus {
          border-color: #22c55e;
        }

        .login-input-password {
          padding-right: 44px;
        }

        .login-eye {
          position: absolute;
          top: 50%;
          right: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 30px;
          height: 30px;
          border: none;
          background: transparent;
          color: #6b7280;
          cursor: pointer;
          transform: translateY(-50%);
        }

        .login-forgot-row {
          display: flex;
          justify-content: flex-end;
          margin-top: 6px;
        }

        .login-forgot {
          border: none;
          background: transparent;
          color: #22c55e;
          font-size: 12px;
          cursor: pointer;
        }

        .login-contact {
          margin-top: 16px;
          color: #9ca3af;
          font-size: 11px;
          text-align: center;
        }

        .login-contact a {
          color: #22c55e;
        }

        .login-right {
          position: relative;
          width: 55%;
          padding: 0;
          overflow: hidden;
          background: #000;
        }

        .login-right-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .login-right::before {
          position: absolute;
          inset: 0;
          content: "";
          background: rgba(0, 0, 0, 0.15);
        }

        .login-hero-copy {
          position: absolute;
          bottom: 10%;
          left: 8%;
          z-index: 1;
        }

        .login-hero-subtitle {
          margin-top: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
          font-style: italic;
        }

        @media (max-width: 820px) {
          .login-page {
            flex-direction: column;
          }

          .login-left,
          .login-right {
            width: 100%;
          }

          .login-left {
            height: 62%;
            padding: 32px 24px;
          }

          .login-right {
            height: 38%;
          }
        }
      `}</style>

      <section className="login-left">
        <div className="login-left-inner">
          <div className="login-logo">
            <Logo size="md" />
          </div>
          <div className="login-copy">
            <p className="login-copy-primary">Your opinion shapes the world.</p>
          </div>

          <hr className="login-divider" />

          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to your account</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-field">
              <span className="login-label">EMAIL ADDRESS</span>
              <input
                className="login-input focus:ring-2 focus:ring-green-500 focus:border-green-500"
                type="email"
                placeholder="enter your email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                autoComplete="off"
                defaultValue=""
                required
              />
            </label>

            <label className="login-field">
              <span className="login-label">PASSWORD</span>
              <span className="login-input-wrap">
                <input
                  className="login-input login-input-password focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="enter your password"
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  autoComplete="off"
                  defaultValue=""
                  required
                />
                <button
                  className="login-eye"
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </span>
            </label>

            <div className="login-forgot-row">
              <button className="login-forgot" type="button">
                Forgot password
              </button>
            </div>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md active:scale-95"
              type="submit"
              disabled={loading}
            >
              {loading ? 'SIGNING IN...' : 'LOGIN'}
            </button>

            {error && <p className="login-error">{error}</p>}
          </form>

          <p className="login-contact">
            Contact admin <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>
          </p>
          <div className="text-center text-xs text-slate-400 mt-4">
            <a href="/privacy" className="hover:text-slate-600">Privacy Policy</a>
            <span className="mx-2">·</span>
            <a href="/terms" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </section>

      <section className="login-right" aria-label="Research participant">
        <img src="/hero.jpg" alt="" className="login-right-img" />
        <div className="login-hero-copy">
          <div className="inline-flex rounded-2xl bg-white/80 p-3 backdrop-blur-sm">
            <Logo size="lg" />
          </div>
          <p className="login-hero-subtitle">Connecting people with research that matters.</p>
        </div>
      </section>
    </main>
  );
}
