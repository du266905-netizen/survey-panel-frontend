import { useState } from 'react';
import { Link } from 'react-router-dom';
import './HomeAuthForm.css';

export default function HomeAuthForm({ audience = 'participant' }) {
  const [email, setEmail] = useState('');
  const isResearch = audience === 'research';

  return (
    <div className="home-auth-form">
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

      {!isResearch && (
        <>
          <div className="home-auth-or"><span>or</span></div>
          <button className="home-auth-google" type="button">
            <span className="home-auth-google-mark" aria-hidden="true">G</span>
            Continue with Google
          </button>
        </>
      )}

      <p className="home-auth-terms">
        By signing in, you agree to the{' '}
        <Link to={isResearch ? '/business/terms' : '/terms'} target="_blank" rel="noopener noreferrer">Terms of Service</Link>{' '}
        and <Link to="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</Link>.
      </p>
    </div>
  );
}
