import { useEffect, useState } from 'react';
import { ArrowLeft, Check, LoaderCircle, LogOut, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBusinessWorkspace, updateProfile } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import { useLanguage } from '../components/LanguageContext';
import './Business.css';

export default function BusinessAccount() {
  const { user, setUser, logout } = useAuth();
  const { language, publicCopy } = useLanguage();
  // Copy that used to be hardcoded English in this file now comes from the
  // language library, keyed by language.
  const workspaceStaticMap = publicCopy?.workspace?.business?.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getBusinessWorkspace().then((response) => setProfile(response.data.profile || null)).catch(() => setError(ws.account.loadError));
  }, []);

  const saveName = async () => {
    if (!displayName.trim() || saving) return;
    setSaving(true); setMessage(''); setError('');
    try {
      const response = await updateProfile({ displayName: displayName.trim() });
      setUser(response.data.user);
      setMessage(ws.account.nameUpdated);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || ws.account.nameUpdateError);
    } finally { setSaving(false); }
  };

  const signOut = () => {
    logout();
    navigate('/business/login', { replace: true });
  };

  return <main className="business-account-page">
    <header><img className="business-account-wordmark" src="/guanyisearch-wordmark.png" alt="guanyisearch" /><button type="button" onClick={() => navigate('/business/workspace')}><ArrowLeft size={17} /> {ws.account.backToProjects}</button></header>
    <section className="business-account-shell">
      <div><p className="business-eyebrow">{ws.account.eyebrow}</p><h1>{ws.account.title}</h1><p>{ws.account.intro}</p></div>
      <div className="business-account-grid">
        <section className="business-account-details"><div className="business-account-person"><span><UserRound size={21} /></span><div><strong>{user?.displayName || ws.account.clientFallback}</strong><small>{ws.account.workspaceOwner}</small></div></div><dl><div><dt>{ws.account.organisationLabel}</dt><dd>{profile?.organizationName || ws.account.organisationFallback}</dd></div><div><dt>{ws.account.organisationType}</dt><dd>{profile?.organizationType?.replaceAll('_', ' ').toLowerCase() || ws.account.notSet}</dd></div><div><dt>{ws.account.emailLabel}</dt><dd>{user?.email || ws.account.notSet}</dd></div><div><dt>{ws.account.regionLabel}</dt><dd>{profile?.region || ws.account.notSet}</dd></div></dl></section>
        <aside className="business-account-settings"><p>{ws.account.settingsEyebrow}</p><h2>{ws.account.displayName}</h2><span>{ws.account.displayNameHelp}</span><label>{ws.account.nameLabel}<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={80} autoComplete="name" /></label>{message && <em className="is-success"><Check size={15} /> {message}</em>}{error && <em className="is-error">{error}</em>}<button className="business-button" type="button" onClick={saveName} disabled={saving || !displayName.trim()}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : ws.account.saveName}</button><button className="business-account-signout" type="button" onClick={signOut}><LogOut size={16} /> {ws.account.signOut}</button></aside>
      </div>
    </section>
  </main>;
}
