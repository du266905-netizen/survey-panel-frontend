import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, Check, LoaderCircle, Mail, Plus, ShieldCheck, Trash2, UserRound, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { useAuth } from '../components/AuthContext';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessTeam.css';
import './BusinessAccountShell.css';

/* Team settings, the shape Pollfish uses: the current team at the top, then
 * its name and logo, then the people in it.
 *
 * Members and invitations live in this browser until the team API exists —
 * there is no organisation table yet. The page says so rather than pretending
 * an invitation was sent. */

const copy = {
  'zh-CN': {
    title: '团队设置', intro: '团队共享项目、余额与发票；成员看到的是同一份工作区。',
    untitled: '未命名团队', teamNamePlaceholder: '输入团队名称',
    emailFixed: '团队邮箱不可自行修改；如需变更，请邮件联系',
    back: '返回账户', current: '当前团队', teamInfo: '团队信息', teamName: '团队名称', teamEmail: '团队邮箱',
    update: '更新', saved: '已保存', logo: '团队标志', logoHint: '添加到问卷与结果页顶部，建议 600KB 以内的 PNG 或 SVG。',
    logoDrop: '把图片拖到这里，或点击选择', logoChange: '更换标志', logoNote: '标志只存在这台浏览器：还没有上传接口。',
    members: '团队成员', invite: '邀请', inviteTitle: '邀请团队成员', inviteEmail: '邮箱', inviteRole: '角色',
    inviteSend: '发送邀请', inviteNote: '接口未接：邀请只记录在本机，不会真的发邮件。',
    roleOwner: '所有者', roleAdmin: '管理员', roleMember: '成员', remove: '移除', you: '你',
    pending: '待接受', localOnly: '成员与邀请只保存在这台浏览器：团队接口还没有。',
    empty: '还没有成员', invited: '已记录邀请', invalidEmail: '请输入有效邮箱', exists: '这个邮箱已经在团队里了',
    ownerLocked: '所有者不能移除',
  },
  en: {
    title: 'Team settings', intro: 'A team shares projects, balance and invoices; every member sees the same workspace.',
    untitled: 'Unnamed team', teamNamePlaceholder: 'Enter a team name',
    emailFixed: 'The team email cannot be changed here. To change it, email',
    back: 'Back to account', current: 'Current team', teamInfo: 'Team information', teamName: 'Team name', teamEmail: 'Team email',
    update: 'Update', saved: 'Saved', logo: 'Team logo', logoHint: 'Shown on questionnaires and result pages; PNG or SVG under 600KB.',
    logoDrop: 'Drop an image here, or click to choose', logoChange: 'Change logo', logoNote: 'The logo stays in this browser: there is no upload endpoint yet.',
    members: 'Team members', invite: 'Invite', inviteTitle: 'Invite a team member', inviteEmail: 'Email', inviteRole: 'Role',
    inviteSend: 'Send invitation', inviteNote: 'No endpoint yet: the invitation is recorded locally and no email is sent.',
    roleOwner: 'Owner', roleAdmin: 'Admin', roleMember: 'Member', remove: 'Remove', you: 'You',
    pending: 'Pending', localOnly: 'Members and invitations stay in this browser until the team API exists.',
    empty: 'No members yet', invited: 'Invitation recorded', invalidEmail: 'Enter a valid email', exists: 'That email is already in the team',
    ownerLocked: 'The owner cannot be removed',
  },
};

const storageKey = (teamId) => `guanyisearch.business.team.${teamId}`;

export default function BusinessTeam() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  const teamId = user?.id || 'local';
  const [stored, setStored] = useState(() => {
    try {
      return JSON.parse(window.localStorage.getItem(storageKey(teamId)) || '{}');
    } catch { return {}; }
  });
  const [name, setName] = useState(stored.name || '');
  const [logo, setLogo] = useState(stored.logo || '');
  const [members, setMembers] = useState(stored.members || []);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey(teamId), JSON.stringify({ name, logo, members }));
    } catch { /* private mode */ }
  }, [teamId, name, logo, members]);

  const people = useMemo(() => ([
    {
      id: 'owner',
      name: user?.displayName || user?.email || '—',
      email: user?.email || '—',
      role: 'OWNER',
      you: true,
    },
    ...members,
  ]), [members, user]);

  const roleLabel = (value) => ({ OWNER: text.roleOwner, ADMIN: text.roleAdmin, MEMBER: text.roleMember }[value] || value);

  const invite = () => {
    setError('');
    setNote('');
    const value = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError(text.invalidEmail);
      return;
    }
    if (people.some((person) => person.email.toLowerCase() === value)) {
      setError(text.exists);
      return;
    }
    setSaving(true);
    window.setTimeout(() => {
      setMembers((current) => [...current, { id: `invite-${Date.now()}`, email: value, role, name: '', pending: true }]);
      setEmail('');
      setSaving(false);
      setNote(`${text.invited}：${value}`);
    }, 250);
  };

  const changeRole = (memberId, nextRole) => {
    setMembers((current) => current.map((member) => (member.id === memberId ? { ...member, role: nextRole } : member)));
  };

  const removeMember = (memberId) => {
    setMembers((current) => current.filter((member) => member.id !== memberId));
  };

  const pickLogo = (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  return (
    <main className="business-account-page">
      <BusinessRail activeId="team" />
      <div className="business-account-pane">
        <header><NotificationBell /></header>

        <section className="business-account-shell">
          <div>
            <h1>{text.title}</h1>
            <p>{text.intro}</p>
          </div>

          <div className="bt-body">
        <section className="bt-current">
          <span className="bt-current-icon">{logo ? <img src={logo} alt="" /> : <Users size={20} aria-hidden="true" />}</span>
          <div>
            <strong>{name || text.untitled}</strong>
            <small>{user?.email || '—'}</small>
          </div>
          <em>{text.current}</em>
        </section>

        <section className="bt-block">
          <h2>{text.teamInfo}</h2>
          <label className="bt-field">
            <span>{text.teamName}</span>
            <input value={name} placeholder={text.teamNamePlaceholder} onChange={(event) => setName(event.target.value)} maxLength={80} />
          </label>
          <label className="bt-field">
            <span>{text.teamEmail}</span>
            <input className="bt-input-locked" value={user?.email || ''} readOnly disabled />
          </label>
          <p className="bt-hint">
            {text.emailFixed}
            {' '}
            <a className="bt-link" href="mailto:support@guanyisearch.com">support@guanyisearch.com</a>
          </p>
          <button type="button" className="bt-button" onClick={() => { setNote(text.saved); setError(''); }}>
            <Check size={15} aria-hidden="true" /> {text.update}
          </button>
          {note ? <p className="bt-note"><Check size={13} aria-hidden="true" /> {note}</p> : null}
        </section>

        <section className="bt-block">
          <h2>{text.logo}</h2>
          <p className="bt-hint">{text.logoHint}</p>
          <label className={`bt-drop${logo ? ' has-logo' : ''}`}>
            {logo ? <img src={logo} alt="" /> : <Plus size={20} aria-hidden="true" />}
            <span>{logo ? text.logoChange : text.logoDrop}</span>
            <input type="file" accept="image/png,image/svg+xml,image/jpeg" onChange={pickLogo} />
          </label>
          <p className="bt-note">{text.logoNote}</p>
        </section>

        <section className="bt-block">
          <h2>{text.members}</h2>

          <div className="bt-invite">
            <div className="bt-invite-row">
              <label className="bt-field is-grow">
                <span>{text.inviteEmail}</span>
                <input type="email" value={email} placeholder="name@company.com" onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label className="bt-field">
                <span>{text.inviteRole}</span>
                <select value={role} onChange={(event) => setRole(event.target.value)}>
                  <option value="MEMBER">{text.roleMember}</option>
                  <option value="ADMIN">{text.roleAdmin}</option>
                </select>
              </label>
              <button type="button" className="bt-button is-primary" onClick={invite} disabled={saving}>
                {saving ? <LoaderCircle size={15} className="bt-spin" /> : <Mail size={15} aria-hidden="true" />} {text.inviteSend}
              </button>
            </div>
            <p className="bt-note">{text.inviteNote}</p>
            {error ? <p className="bt-error">{error}</p> : null}
          </div>

          <div className="bt-members">
            {people.map((person) => (
              <article className={`bt-member${person.pending ? ' is-pending' : ''}`} key={person.id}>
                <span className="bt-member-avatar">
                  {person.role === 'OWNER' ? <ShieldCheck size={18} aria-hidden="true" /> : <UserRound size={18} aria-hidden="true" />}
                </span>
                <div className="bt-member-main">
                  <strong>{person.name || person.email}{person.you ? ` · ${text.you}` : ''}</strong>
                  <small>{person.email}</small>
                </div>
                {person.role === 'OWNER' ? (
                  <em className="bt-role">{roleLabel(person.role)}</em>
                ) : (
                  <select className="bt-role-select" value={person.role} onChange={(event) => changeRole(person.id, event.target.value)} aria-label={text.inviteRole}>
                    <option value="MEMBER">{text.roleMember}</option>
                    <option value="ADMIN">{text.roleAdmin}</option>
                  </select>
                )}
                {person.pending ? <em className="bt-pending">{text.pending}</em> : null}
                {person.role !== 'OWNER' ? (
                  <button type="button" className="bt-icon" onClick={() => removeMember(person.id)} aria-label={text.remove} title={text.remove}>
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                ) : null}
              </article>
            ))}
            {!people.length ? <p className="bt-hint">{text.empty}</p> : null}
          </div>

          <p className="bt-note">{text.localOnly}</p>
        </section>
          </div>
        </section>
      </div>
    </main>
  );
}
