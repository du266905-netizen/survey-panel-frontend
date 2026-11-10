import { useCallback, useEffect, useMemo, useState } from 'react';
import { Check, LoaderCircle, Mail, Plus, ShieldCheck, Trash2, UserRound, Users } from 'lucide-react';
import BusinessRail from '../components/BusinessRail';
import NotificationBell from '../components/NotificationBell';
import { useAuth } from '../components/AuthContext';
import { useLanguage } from '../components/LanguageContext';
import {
  createTeamInvitation,
  getBusinessTeam,
  removeTeamMember,
  revokeTeamInvitation,
  updateBusinessTeam,
  updateTeamMemberRole,
} from '../api/realApi';
import './BusinessTeam.css';
import './BusinessAccountShell.css';

/* Team settings. The team, its members and pending invitations come from the
 * team API; nothing here is kept in the browser. */

const copy = {
  'zh-CN': {
    title: '团队设置', intro: '团队共享项目、余额与发票；成员看到的是同一份工作区。',
    untitled: '未命名团队', teamNamePlaceholder: '输入团队名称',
    emailFixed: '团队邮箱不可自行修改；如需变更，请邮件联系',
    back: '返回账户', current: '当前团队', teamInfo: '团队信息', teamName: '团队名称', teamEmail: '团队邮箱',
    update: '更新', saved: '已保存', logo: '团队标志', logoHint: '添加到问卷与结果页顶部，建议 600KB 以内的 PNG 或 SVG。',
    logoDrop: '把图片拖到这里，或点击选择', logoChange: '更换标志', logoNote: '上传接口暂未开放，标志先不做修改。',
    members: '团队成员', invite: '邀请', inviteTitle: '邀请团队成员', inviteEmail: '邮箱', inviteRole: '角色',
    inviteSend: '发送邀请', inviteNote: '邀请会发到对方邮箱，接受后才加入团队。',
    roleOwner: '所有者', roleAdmin: '管理员', roleMember: '成员', remove: '移除', you: '你',
    pending: '待接受', localOnly: '成员与邀请以团队接口为准。',
    empty: '还没有成员', invited: '邀请已发送', invalidEmail: '请输入有效邮箱', exists: '这个邮箱已经在团队里了',
    ownerLocked: '所有者不能移除', loadFailed: '团队信息加载失败', saveFailed: '保存失败', inviteFailed: '邀请发送失败',
    managerOnly: '只有所有者或管理员可以修改团队',
  },
  en: {
    title: 'Team settings', intro: 'A team shares projects, balance and invoices; every member sees the same workspace.',
    untitled: 'Unnamed team', teamNamePlaceholder: 'Enter a team name',
    emailFixed: 'The team email cannot be changed here. To change it, email',
    back: 'Back to account', current: 'Current team', teamInfo: 'Team information', teamName: 'Team name', teamEmail: 'Team email',
    update: 'Update', saved: 'Saved', logo: 'Team logo', logoHint: 'Shown on questionnaires and result pages; PNG or SVG under 600KB.',
    logoDrop: 'Drop an image here, or click to choose', logoChange: 'Change logo', logoNote: 'Uploads are not open yet; the logo stays unchanged.',
    members: 'Team members', invite: 'Invite', inviteTitle: 'Invite a team member', inviteEmail: 'Email', inviteRole: 'Role',
    inviteSend: 'Send invitation', inviteNote: 'The invitation is emailed and joins the team once accepted.',
    roleOwner: 'Owner', roleAdmin: 'Admin', roleMember: 'Member', remove: 'Remove', you: 'You',
    pending: 'Pending', localOnly: 'Members and invitations come from the team API.',
    empty: 'No members yet', invited: 'Invitation sent', invalidEmail: 'Enter a valid email', exists: 'That email is already in the team',
    ownerLocked: 'The owner cannot be removed', loadFailed: 'Could not load the team', saveFailed: 'Could not save',
    inviteFailed: 'Could not send the invitation', managerOnly: 'Only an owner or admin can change the team',
  },
};

function errorCode(error) {
  return error?.response?.data?.code || error?.response?.data?.error?.code || '';
}

export default function BusinessTeam() {
  const { user } = useAuth();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  const [team, setTeam] = useState(null);
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [nameDraft, setNameDraft] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('MEMBER');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getBusinessTeam();
      setTeam(data?.team || null);
      setMembers(Array.isArray(data?.members) ? data.members : []);
      setInvitations(Array.isArray(data?.invitations) ? data.invitations : []);
      setNameDraft(data?.team?.name || '');
    } catch {
      setError(text.loadFailed);
    } finally {
      setLoading(false);
    }
  }, [text.loadFailed]);

  useEffect(() => { load(); }, [load]);

  const people = useMemo(() => ([
    ...members.map((member) => ({
      id: member.id,
      name: member.displayName || '',
      email: member.email || '',
      role: String(member.role || 'member').toUpperCase(),
      you: member.userId === user?.id,
      pending: false,
    })),
    ...invitations.map((invitation) => ({
      id: invitation.id,
      name: '',
      email: invitation.email || '',
      role: String(invitation.role || 'member').toUpperCase(),
      you: false,
      pending: true,
    })),
  ]), [members, invitations, user?.id]);

  const roleLabel = (value) => ({ OWNER: text.roleOwner, ADMIN: text.roleAdmin, MEMBER: text.roleMember }[value] || value);

  const saveName = async () => {
    setError('');
    setNote('');
    const value = nameDraft.trim();
    if (value.length < 2) return;
    setSaving(true);
    try {
      await updateBusinessTeam({ name: value });
      await load();
      setNote(text.saved);
    } catch (err) {
      setError(errorCode(err) === 'TEAM_MANAGER_REQUIRED' ? text.managerOnly : text.saveFailed);
    } finally {
      setSaving(false);
    }
  };

  const invite = async () => {
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
    try {
      await createTeamInvitation({ email: value, role: role.toLowerCase() });
      setEmail('');
      await load();
      setNote(`${text.invited}：${value}`);
    } catch (err) {
      setError(errorCode(err) === 'TEAM_MANAGER_REQUIRED' ? text.managerOnly : text.inviteFailed);
    } finally {
      setSaving(false);
    }
  };

  const changeRole = async (memberId, nextRole) => {
    setError('');
    try {
      await updateTeamMemberRole(memberId, nextRole.toLowerCase());
      await load();
    } catch (err) {
      setError(errorCode(err) === 'TEAM_MANAGER_REQUIRED' ? text.managerOnly : text.saveFailed);
    }
  };

  const removePerson = async (person) => {
    setError('');
    try {
      if (person.pending) await revokeTeamInvitation(person.id);
      else await removeTeamMember(person.id);
      await load();
    } catch (err) {
      setError(errorCode(err) === 'TEAM_MANAGER_REQUIRED' ? text.managerOnly : text.saveFailed);
    }
  };

  const pickLogo = (event) => {
    event.preventDefault();
    setNote('');
    setError(text.logoNote);
  };

  return (
    <>
      <section className="business-account-shell">
          <div>
            <h1>{text.title}</h1>
            <p>{text.intro}</p>
          </div>

          <div className="bt-body">
        <section className="bt-current">
          <span className="bt-current-icon">{team?.logoUrl ? <img src={team.logoUrl} alt="" /> : <Users size={20} aria-hidden="true" />}</span>
          <div>
            <strong>{team?.name || text.untitled}</strong>
            <small>{user?.email || '—'}</small>
          </div>
          <em>{text.current}</em>
        </section>

        <section className="bt-block">
          <h2>{text.teamInfo}</h2>
          <label className="bt-field">
            <span>{text.teamName}</span>
            <input value={nameDraft} placeholder={text.teamNamePlaceholder} onChange={(event) => setNameDraft(event.target.value)} maxLength={180} />
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
          <button type="button" className="bt-button" onClick={saveName} disabled={saving}>
            <Check size={15} aria-hidden="true" /> {text.update}
          </button>
          {note ? <p className="bt-note"><Check size={13} aria-hidden="true" /> {note}</p> : null}
        </section>

        <section className="bt-block">
          <h2>{text.logo}</h2>
          <p className="bt-hint">{text.logoHint}</p>
          <label className={`bt-drop${team?.logoUrl ? ' has-logo' : ''}`}>
            {team?.logoUrl ? <img src={team.logoUrl} alt="" /> : <Plus size={20} aria-hidden="true" />}
            <span>{team?.logoUrl ? text.logoChange : text.logoDrop}</span>
            <input type="file" accept="image/png,image/svg+xml,image/jpeg" onClick={pickLogo} disabled />
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
            {loading ? <p className="bt-hint"><LoaderCircle size={15} className="bt-spin" aria-hidden="true" /> {text.current}</p> : null}
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
                  <button type="button" className="bt-icon" onClick={() => removePerson(person)} aria-label={text.remove} title={text.remove}>
                    <Trash2 size={15} aria-hidden="true" />
                  </button>
                ) : null}
              </article>
            ))}
            {!loading && !people.length ? <p className="bt-hint">{text.empty}</p> : null}
          </div>

          <p className="bt-note">{text.localOnly}</p>
        </section>
          </div>
        </section>
      
    </>
  );
}
