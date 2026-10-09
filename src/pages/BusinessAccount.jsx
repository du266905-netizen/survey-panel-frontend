import { useEffect, useState } from 'react';
import { ArrowLeft, Check, LoaderCircle, LogOut, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBusinessWorkspace, updateProfile } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import { useLanguage } from '../components/LanguageContext';
import {
  AvatarError, AVATAR_ACCEPT, clearBusinessAvatar, saveBusinessAvatar, useBusinessAvatar,
} from '../utils/businessAvatar';
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
  const avatar = useBusinessAvatar();
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [avatarNote, setAvatarNote] = useState('');

  /* Choosing a picture never reaches a server yet — see utils/businessAvatar.js
     for what that means and for the one function to change when it does. */
  const handleAvatarPick = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setAvatarNote('');
    setAvatarBusy(true);
    try {
      await saveBusinessAvatar(file);
      setAvatarNote('头像已更新。');
    } catch (err) {
      const code = err instanceof AvatarError ? err.code : 'failed';
      setAvatarNote({
        type: '请选择 PNG、JPG 或 WebP 图片。',
        'too-big': '图片太大，请换一张小于 12MB 的。',
        unreadable: '这张图片读不出来，请换一张。',
      }[code] || '头像没能保存，请重试。');
    } finally {
      setAvatarBusy(false);
    }
  };

  const handleAvatarClear = () => {
    clearBusinessAvatar();
    setAvatarNote('头像已移除。');
  };

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
        <section className="business-account-details"><div className="business-account-person"><span className="business-account-avatar">{avatar ? <img src={avatar} alt="" /> : <UserRound size={21} />}</span><div><strong>{user?.displayName || ws.account.clientFallback}</strong><small>{ws.account.workspaceOwner}</small></div><div className="business-account-avatar-actions"><label className="business-account-avatar-pick">{avatar ? '更换头像' : '上传头像'}<input type="file" accept={AVATAR_ACCEPT} onChange={handleAvatarPick} disabled={avatarBusy} /></label>{avatar ? <button type="button" onClick={handleAvatarClear}>移除</button> : null}</div></div>{(avatarNote || avatarBusy) ? <p className="business-account-avatar-note">{avatarBusy ? '正在处理图片…' : avatarNote}</p> : null}<dl><div><dt>{ws.account.organisationLabel}</dt><dd>{profile?.organizationName || ws.account.organisationFallback}</dd></div><div><dt>{ws.account.organisationType}</dt><dd>{profile?.organizationType?.replaceAll('_', ' ').toLowerCase() || ws.account.notSet}</dd></div><div><dt>{ws.account.emailLabel}</dt><dd>{user?.email || ws.account.notSet}</dd></div><div><dt>{ws.account.regionLabel}</dt><dd>{profile?.region || ws.account.notSet}</dd></div></dl></section>
        <aside className="business-account-settings"><p>{ws.account.settingsEyebrow}</p><h2>{ws.account.displayName}</h2><span>{ws.account.displayNameHelp}</span><label>{ws.account.nameLabel}<input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={80} autoComplete="name" /></label>{message && <em className="is-success"><Check size={15} /> {message}</em>}{error && <em className="is-error">{error}</em>}<button className="business-button" type="button" onClick={saveName} disabled={saving || !displayName.trim()}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : ws.account.saveName}</button><button className="business-account-signout" type="button" onClick={signOut}><LogOut size={16} /> {ws.account.signOut}</button></aside>
      </div>
    </section>
  </main>;
}
