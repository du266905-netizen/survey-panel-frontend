import { useState } from 'react';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/mockApi';
import { useAuth } from '../components/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState({ email: 'admin@surveypanel.com', password: 'Admin@2026' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex min-h-screen">
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .login-left-panel {
          animation: slideInLeft 0.6s ease-out;
        }

        .login-container {
          display: flex;
          min-height: 100vh;
        }

        .login-form-section {
          width: 45%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          padding: 40px;
        }

        .login-image-section {
          width: 55%;
          background: url('/coffee-bg.jpg') center / cover no-repeat;
          position: relative;
        }

        .login-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
        }

        .login-form-wrapper {
          width: 100%;
          max-width: 380px;
        }

        .login-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 32px;
          font-size: 14px;
          font-weight: 500;
          color: #22c55e;
        }

        .login-brand-icon {
          width: 20px;
          height: 20px;
          background: #22c55e;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 12px;
        }

        .login-title {
          font-size: 32px;
          font-weight: 600;
          color: #000;
          margin-bottom: 8px;
        }

        .login-subtitle {
          font-size: 14px;
          color: #666;
          margin-bottom: 32px;
        }

        .login-form-group {
          margin-bottom: 20px;
        }

        .login-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #000;
          margin-bottom: 8px;
        }

        .login-input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s;
        }

        .login-input:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }

        .login-password-wrapper {
          position: relative;
        }

        .login-password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: #999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .login-password-toggle:hover {
          color: #666;
        }

        .login-button {
          width: 100%;
          padding: 12px;
          background: #22c55e;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          margin-top: 24px;
        }

        .login-button:hover:not(:disabled) {
          background: #16a34a;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }

        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .login-error {
          margin-top: 16px;
          padding: 12px;
          background: #fee2e2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          font-size: 13px;
          color: #dc2626;
        }

        .login-footer {
          margin-top: 20px;
          text-align: center;
          font-size: 13px;
          color: #999;
        }

        .login-footer a {
          color: #22c55e;
          text-decoration: none;
          font-weight: 500;
        }

        .login-footer a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .login-container {
            flex-direction: column;
          }

          .login-form-section {
            width: 100%;
            min-height: 100vh;
          }

          .login-image-section {
            display: none;
          }

          .login-form-wrapper {
            max-width: 100%;
          }
        }
      `}</style>

      <div className="login-container">
        {/* Left Panel - Login Form */}
        <section className="login-form-section login-left-panel">
          <div className="login-form-wrapper">
            <div className="login-brand">
              <div className="login-brand-icon">🔒</div>
              <span>GY Research</span>
            </div>

            <h1 className="login-title">Welcome back</h1>
            <p className="login-subtitle">Sign in to your account.</p>

            <form onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label className="login-label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={18}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#999',
                      pointerEvents: 'none',
                    }}
                  />
                  <input
                    className="login-input"
                    type="email"
                    placeholder="admin@surveypanel.com"
                    value={form.email}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    style={{ paddingLeft: '40px' }}
                    required
                  />
                </div>
              </div>

              <div className="login-form-group">
                <label className="login-label">Password</label>
                <div className="login-password-wrapper">
                  <input
                    className="login-input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={form.password}
                    onChange={(event) => setForm({ ...form, password: event.target.value })}
                    style={{ paddingRight: '40px' }}
                    required
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button className="login-button" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Login'}
              </button>

              {error && <div className="login-error">{error}</div>}
            </form>

            <div className="login-footer">
              Contact admin to request access{' '}
              <a href="mailto:heguanyi@guanyi-media.com">heguanyi@guanyi-media.com</a>
            </div>
          </div>
        </section>

        {/* Right Panel - Coffee Image */}
        <section className="login-image-section">
          <div className="login-image-overlay" />
        </section>
      </div>
    </div>
  );
}
