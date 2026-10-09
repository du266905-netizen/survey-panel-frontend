import { useEffect, useState } from 'react';
import { Check, LoaderCircle, LogOut, Receipt, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getBusinessWorkspace, updateProfile } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import {
  AvatarError, AVATAR_ACCEPT, clearBusinessAvatar, loadAvatarSource,
  saveBusinessAvatarFromCrop, useBusinessAvatar, validateAvatarFile,
} from '../utils/businessAvatar';
import BusinessAvatarCropper from '../components/BusinessAvatarCropper';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { ArrowLeft } from 'lucide-react';
import './Business.css';
import './BusinessAccountShell.css';

export default function BusinessAccount() {
  const { user, setUser, logout } = useAuth();
  const { language, publicCopy } = useLanguage();
  const workspaceStaticMap = publicCopy?.workspace?.business?.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};
  const area = publicCopy?.workspace?.business?.accountArea || {};
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const avatar = useBusinessAvatar();
  const [avatarBusy, setAvatarBusy] = useState(false);
  const [avatarNote, setAvatarNote] = useState('');
  // the object URL shown under the cropper; nothing is stored until it is confirmed
  const [cropSrc, setCropSrc] = useState('');

  /* Choosing a picture never reaches a server yet — see utils/businessAvatar.js
     for what that means and for the one function to change when it does. */
  const avatarErrorText = (err) => {
    const code = err instanceof AvatarError ? err.code : 'failed';
    return {
      type: '请选择 PNG、JPG 或 WebP 图片。',
      'too-big': '图片太大，请换一张小于 12MB 的。',
      unreadable: '这张图片读不出来，请换一张。',
    }[code] || '头像没能保存，请重试。';
  };

  /* Picking a file no longer stores anything — it opens the cropper. The picture
     is written only when the crop is confirmed, so cancelling leaves the existing
     avatar exactly as it was. */
  const handleAvatarPick = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setAvatarNote('');
    try {
      validateAvatarFile(file);
      setCropSrc(loadAvatarSource(file));
    } catch (err) {
      setAvatarNote(avatarErrorText(err));
    }
  };

  const closeCropper = () => {
    if (cropSrc) URL.revokeObjectURL(cropSrc);
    setCropSrc('');
  };

  const handleCropConfirm = async (rect) => {
    setAvatarBusy(true);
    try {
      await saveBusinessAvatarFromCrop(cropSrc, rect);
      setAvatarNote('头像已更新。');
      closeCropper();
    } catch (err) {
      setAvatarNote(avatarErrorText(err));
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

  const notSet = ws.account.notSet;

  /* The rail is the app's own; every entry keeps the destination the AI brief page
     gives it. Nothing is marked current: the rail's list is the workspace, and
     this page is reached from its account menu. */
  const handleRailSelect = (id) => {
    if (id === 'home') { navigate(withLanguage('/business/workspace', language)); return; }
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    navigate(withLanguage(`/business/workspace?view=${id}`, language));
  };

  return <main className="business-account-page">
    <BusinessRail onSelect={handleRailSelect} />
    <div className="business-account-pane">
      <header>
        <button type="button" onClick={() => navigate(withLanguage('/business/workspace', language))}>
          <ArrowLeft size={17} /> {ws.account.backToProjects}
        </button>
        <NotificationBell />
      </header>

      <section className="business-account-shell">
      <div>
        <p className="business-eyebrow">{ws.account.eyebrow}</p>
        <h1>{ws.account.title}</h1>
        <p>{ws.account.intro}</p>
      </div>

      <div className="business-account-grid">
        <section className="business-account-details">
          <div className="business-account-person">
            <span className="business-account-avatar">{avatar ? <img src={avatar} alt="" /> : <UserRound size={21} />}</span>
            <div>
              <strong>{user?.displayName || ws.account.clientFallback}</strong>
              <small>{ws.account.workspaceOwner}</small>
            </div>
            <div className="business-account-avatar-actions">
              <label className="business-account-avatar-pick">{avatar ? '更换头像' : '上传头像'}
                <input type="file" accept={AVATAR_ACCEPT} onChange={handleAvatarPick} disabled={avatarBusy} />
              </label>
              {avatar ? <button type="button" onClick={handleAvatarClear}>移除</button> : null}
            </div>
          </div>
          {(avatarNote || avatarBusy) ? <p className="business-account-avatar-note">{avatarBusy ? '正在处理图片…' : avatarNote}</p> : null}
          <dl>
            <div><dt>{ws.account.organisationLabel}</dt><dd>{profile?.organizationName || ws.account.organisationFallback}</dd></div>
            <div><dt>{ws.account.organisationType}</dt><dd>{profile?.organizationType?.replaceAll('_', ' ').toLowerCase() || notSet}</dd></div>
            <div><dt>{ws.account.emailLabel}</dt><dd>{user?.email || notSet}</dd></div>
            <div><dt>{ws.account.regionLabel}</dt><dd>{profile?.region || notSet}</dd></div>
          </dl>
        </section>

        <aside className="business-account-settings">
          <p>{ws.account.settingsEyebrow}</p>
          <h2>{ws.account.displayName}</h2>
          <span>{ws.account.displayNameHelp}</span>
          <label>{ws.account.nameLabel}
            <input value={displayName} onChange={(event) => setDisplayName(event.target.value)} maxLength={80} autoComplete="name" />
          </label>
          {message && <em className="is-success"><Check size={15} /> {message}</em>}
          {error && <em className="is-error">{error}</em>}
          <button className="business-button" type="button" onClick={saveName} disabled={saving || !displayName.trim()}>
            {saving ? <LoaderCircle className="animate-spin" size={16} /> : ws.account.saveName}
          </button>
          <button className="business-account-billing" type="button" onClick={() => navigate(withLanguage('/business/billing', language))}><Receipt size={16} /> {publicCopy?.workspace?.business?.billing?.title || 'Invoices and billing'}</button>
          <button className="business-account-signout" type="button" onClick={signOut}>
            <LogOut size={16} /> {ws.account.signOut}
          </button>
        </aside>
      </div>
      </section>
    </div>

    {cropSrc ? (
      <BusinessAvatarCropper
        src={cropSrc}
        busy={avatarBusy}
        onCancel={closeCropper}
        onConfirm={handleCropConfirm}
      />
    ) : null}
  </main>;
}
