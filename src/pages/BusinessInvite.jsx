import { useState } from 'react';
import { ArrowRight, LogIn, Mail, UserPlus, Users } from 'lucide-react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { acceptTeamInvitation } from '../api/realApi';
import './BusinessInvite.css';

/* The page an invited person lands on.
 *
 * The link carries a token; the page shows which team it is for and what to do
 * next. Accepting needs the team API (there is none yet), so the button either
 * continues into the existing sign-up with the token attached, or — when the
 * person is already signed in — says the invitation will be applied once the
 * endpoint exists. Nothing here pretends the person has joined. */

const copy = {
  'zh-CN': {
    eyebrow: '团队邀请', title: '加入团队', inviter: '邀请你加入',
    body: '接受后，你会看到这个团队的项目、问卷和结果，和团队其他成员是同一份工作区。',
    signedInAs: '当前登录邮箱', mismatch: '这个邀请发往另一个邮箱，请用该邮箱登录后再接受。',
    expired: '这个邀请已过期，请让对方重新发送。', acceptFailed: '加入失败，请稍后重试。',
    accept: '接受邀请', signup: '注册并接受', login: '登录后接受', signout: '换一个账号',
    pending: '邀请暂时无法接受；功能开放后会自动生效。',
    invalid: '这个邀请链接不完整或已失效。', back: '返回首页',
  },
  en: {
    eyebrow: 'Team invitation', title: 'Join the team', inviter: 'invites you to join',
    body: 'Once you accept, you see this team’s projects, questionnaires and results — the same workspace as everyone else in it.',
    signedInAs: 'Signed in as', mismatch: 'This invitation was sent to a different address. Sign in with that one to accept.',
    expired: 'This invitation has expired. Ask the team to send a new one.', acceptFailed: 'Could not join the team. Try again.',
    accept: 'Accept invitation', signup: 'Sign up and accept', login: 'Sign in and accept', signout: 'Use another account',
    pending: 'This invitation cannot be accepted yet; it will apply once team invitations open.',
    invalid: 'This invitation link is incomplete or expired.', back: 'Back to home',
  },
};

export default function BusinessInvite() {
  const [params] = useSearchParams();
  const routeParams = useParams();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  const token = routeParams.token || params.get('token') || '';
  const email = params.get('email') || '';
  const team = params.get('team') || '';
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [accepting, setAccepting] = useState(false);

  const nextPath = `/business/invite?${new URLSearchParams({ token, email, team }).toString()}`;

  if (!token) {
    return (
      <main className="bi-page">
        <section className="bi-card">
          <p className="bi-eyebrow">{text.eyebrow}</p>
          <h1>{text.invalid}</h1>
          <Link className="bi-button" to={withLanguage('/', language)}>{text.back}</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="bi-page">
      <section className="bi-card">
        <p className="bi-eyebrow">{text.eyebrow}</p>
        <h1>{text.title}</h1>

        <div className="bi-team">
          <span className="bi-team-icon"><Users size={20} aria-hidden="true" /></span>
          <div>
            <strong>{team || '—'}</strong>
            <small>{text.inviter}{email ? ` · ${email}` : ''}</small>
          </div>
        </div>

        <p className="bi-body">{text.body}</p>

        {user ? (
          <>
            <p className="bi-signed">
              {text.signedInAs} <strong>{user.email}</strong>
            </p>
            {email && user.email && email.toLowerCase() !== String(user.email).toLowerCase() ? (
              <p className="bi-error">{text.mismatch}</p>
            ) : null}
            <button
              type="button"
              className="bi-button is-primary"
              disabled={accepting}
              onClick={async () => {
                setError('');
                setNote('');
                setAccepting(true);
                try {
                  await acceptTeamInvitation(token);
                  navigate(withLanguage('/business/team', language));
                } catch (err) {
                  const code = err?.response?.data?.code || err?.response?.data?.error?.code || '';
                  setError(
                    code === 'INVITATION_EXPIRED' ? text.expired
                      : code === 'INVITATION_EMAIL_MISMATCH' ? text.mismatch
                        : text.acceptFailed,
                  );
                } finally {
                  setAccepting(false);
                }
              }}
            >
              <LogIn size={16} aria-hidden="true" /> {text.accept}
            </button>
            <button type="button" className="bi-link" onClick={() => logout()}>{text.signout}</button>
            {error ? <p className="bi-error">{error}</p> : null}
            {note ? <p className="bi-note">{note}</p> : null}
          </>
        ) : (
          <>
            <Link
              className="bi-button is-primary"
              to={withLanguage(`/register?role=BUSINESS&invite=${encodeURIComponent(token)}&inviteEmail=${encodeURIComponent(email)}`, language)}
            >
              <UserPlus size={16} aria-hidden="true" /> {text.signup}
            </Link>
            <Link className="bi-button" to={withLanguage(`/login?next=${encodeURIComponent(nextPath)}`, language)}>
              <Mail size={16} aria-hidden="true" /> {text.login} <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
