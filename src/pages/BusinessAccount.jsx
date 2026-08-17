import { useEffect, useState } from 'react';
import { ArrowLeft, Check, LoaderCircle, LogOut, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBusinessWorkspace, updateProfile } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import './Business.css';

export default function BusinessAccount() {
  const { user, setUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getBusinessWorkspace().then((response) => setProfile(response.data.profile || null)).catch(() => setError('We could not load your workspace details. Please return to projects and try again.'));
  }, []);

  const saveName = async () => {
    if (!displayName.trim() || saving) return;
    setSaving(true); setMessage(''); setError('');
    try {
      const response = await updateProfile({ displayName: displayName.trim() });
      setUser(response.data.user);
      setMessage('Account name updated.');
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'We could not update your account name. Please try again.');
    } finally { setSaving(false); }
  };

  const signOut = () => {
    logout();
    navigate('/business/login', { replace: true });
  };

  return <main className="business-account-page">
    <header><img src="/guanyisearch-project-mark.png" alt="GuanyiSearch" /><button type="button" onClick={() => navigate('/business/workspace')}><ArrowLeft size={17} /> Back to projects</button></header>
    <section className="business-account-shell">
      <div><p className="business-eyebrow">CLIENT WORKSPACE</p><h1>Account</h1><p>Manage the identity shown in your research workspace.</p></div>
      <div className="business-account-grid">
        <section className="business-account-details"><div className="business-account-person"><span><UserRound size={21} /></span><div><strong>{user?.displayName || 'Client account'}</strong><small>Workspace owner</small></div></div><dl><div><dt>Organisation</dt><dd>{profile?.organizationName || 'Research workspace'}</dd></div><div><dt>Organisation type</dt><dd>{profile?.organizationType?.replaceAll('_', ' ').toLowerCase() || 'Not set'}</dd></div><div><dt>Email</dt><dd>{user?.email || 'Not set'}</dd></div><div><dt>Region</dt><dd>{profile?.region || 'Not set'}</dd></div></dl></section>
        <aside className="business-account-settings"><p>ACCOUNT SETTINGS</p><h2>Display name</h2><span>This name is shown beside your projects and workspace notifications.</span><label>Name<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={80} autoComplete="name" /></label>{message && <em className="is-success"><Check size={15} /> {message}</em>}{error && <em className="is-error">{error}</em>}<button className="business-button" type="button" onClick={saveName} disabled={saving || !displayName.trim()}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : 'Save name'}</button><button className="business-account-signout" type="button" onClick={signOut}><LogOut size={16} /> Sign out of this workspace</button></aside>
      </div>
    </section>
  </main>;
}
