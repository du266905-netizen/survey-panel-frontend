import { useEffect, useState } from 'react';
import { Check, LoaderCircle, LogOut, UserRound, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { changePassword, getBusinessWorkspace, requestPasswordReset, updateProfile } from '../api/realApi';
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
  const [resetBusy, setResetBusy] = useState(false);
  const [resetNote, setResetNote] = useState('');
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [passwordNote, setPasswordNote] = useState('');
  const [passwordBusy, setPasswordBusy] = useState(false);

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

  return (
    <>
      <section className="business-account-shell">
      <div>
        <h1>{language === 'zh-CN' ? '个人设置' : language === 'zh-Hant' ? '個人設定' : ws.account.title}</h1>
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
            <div><dt>{ws.account.emailLabel}</dt><dd>{user?.email || notSet}</dd></div>
            <div><dt>{ws.account.organisationLabel}</dt><dd>{profile?.organizationName || ws.account.organisationFallback}</dd></div>
            {/* Only rows that carry a value: a field the page cannot edit
                should not be displayed as 未设置 either. */}
            {profile?.organizationType ? (
              <div><dt>{ws.account.organisationType}</dt><dd>{profile.organizationType.replaceAll('_', ' ').toLowerCase()}</dd></div>
            ) : null}
            {profile?.region ? (
              <div><dt>{ws.account.regionLabel}</dt><dd>{profile.region}</dd></div>
            ) : null}
          </dl>
          <p className="business-account-fixed">
            邮箱不可自行修改；如需变更，请邮件联系 <a href="mailto:support@guanyisearch.com">support@guanyisearch.com</a>。
          </p>

          <div className="business-account-password">
            <h2>更改密码</h2>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                setPasswordNote('');
                if (!passwords.current || !passwords.next) {
                  setPasswordNote('请填写旧密码和新密码。');
                  return;
                }
                if (passwords.next.length < 8) {
                  setPasswordNote('新密码至少 8 位。');
                  return;
                }
                if (passwords.next !== passwords.confirm) {
                  setPasswordNote('两次输入的新密码不一致。');
                  return;
                }
                setPasswordBusy(true);
                try {
                  await changePassword({ currentPassword: passwords.current, password: passwords.next });
                  setPasswords({ current: '', next: '', confirm: '' });
                  setPasswordNote('密码已更新。');
                } catch (failure) {
                  const missing = !failure?.response || failure.response.status === 404;
                  setPasswordNote(missing ? '改密接口还没接上，可先用下面的重置邮件。' : (failure?.response?.data?.message || '改密失败，请检查旧密码。'));
                } finally {
                  setPasswordBusy(false);
                }
              }}
            >
              <label>
                <span>旧密码</span>
                <input type="password" autoComplete="current-password" value={passwords.current} onChange={(event) => setPasswords((current) => ({ ...current, current: event.target.value }))} />
              </label>
              <label>
                <span>新密码</span>
                <input type="password" autoComplete="new-password" value={passwords.next} onChange={(event) => setPasswords((current) => ({ ...current, next: event.target.value }))} />
              </label>
              <label>
                <span>确认新密码</span>
                <input type="password" autoComplete="new-password" value={passwords.confirm} onChange={(event) => setPasswords((current) => ({ ...current, confirm: event.target.value }))} />
              </label>
              <button type="submit" className="business-button" disabled={passwordBusy}>
                {passwordBusy ? <LoaderCircle className="animate-spin" size={15} /> : null} 提交
              </button>
              {passwordNote ? <em className={passwordNote === '密码已更新。' ? 'is-success' : 'is-error'}>{passwordNote}</em> : null}
            </form>
            <p className="business-account-hint">
              忘记旧密码？<button type="button" className="business-account-link" disabled={resetBusy || !user?.email} onClick={async () => {
                setResetNote('');
                setResetBusy(true);
                try {
                  await requestPasswordReset({ email: user?.email, accountType: 'BUSINESS' });
                  setResetNote('重置邮件已发送，请查收。');
                } catch {
                  setResetNote('发送失败，请稍后再试。');
                } finally {
                  setResetBusy(false);
                }
              }}>发送重置邮件</button>
            </p>
            {resetNote ? <em className={resetNote.startsWith('重置邮件') ? 'is-success' : 'is-error'}>{resetNote}</em> : null}
          </div>

        </section>

        <aside className="business-account-settings">
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
          <button className="business-account-signout" type="button" onClick={signOut}>
            <LogOut size={16} /> {ws.account.signOut}
          </button>
        </aside>
      </div>
      </section>
    

    {cropSrc ? (
      <BusinessAvatarCropper
        src={cropSrc}
        busy={avatarBusy}
        onCancel={closeCropper}
        onConfirm={handleCropConfirm}
      />
    ) : null}
  </>
  );
}
