import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { googleLogin } from '../api/realApi';
import { useAuth } from './AuthContext';
import { GoogleButton } from './PublicAuthPanel';
import './HomeAuthForm.css';

export default function HomeAuthForm({ audience = 'participant' }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const isResearch = audience === 'research';

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
              label="Sign in with Google"
              note="Google sign-in is unavailable on this network"
            />
          </div>
          <div className="home-auth-or"><span>or</span></div>
        </>
      )}

      <form className="home-auth-email" onSubmit={(event) => event.preventDefault()}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter email"
          aria-label="Email address"
          autoComplete="email"
          required
        />
        <button type="submit">Continue</button>
      </form>

      {error && <p className="home-auth-error" role="alert">{error}</p>}

      <p className="home-auth-terms">
        By signing in, you agree to the{' '}
        <Link to={isResearch ? '/business/terms' : '/terms'} target="_blank" rel="noopener noreferrer">Terms of Service</Link>{' '}
        and <Link to="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
      </p>
    </div>
  );
}
