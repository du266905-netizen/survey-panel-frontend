import { useEffect, useState } from 'react';
import { Coins, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser, updateProfile } from '../api/realApi';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../components/AuthContext';
import { isPanelistRole } from '../utils/roles';
import { useProfileSurvey } from '../components/ProfileSurveyContext';

function displayValue(value, fallback = 'Not set') {
  return value || fallback;
}

function InfoPanel({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 break-words text-sm font-bold text-slate-950">{value}</p>
    </div>
  );
}

export default function Profile() {
  const { user, setUser } = useAuth();
  const isPanelist = isPanelistRole(user?.role);
  const { panelProfile, rewardCoins, loading: panelProfileLoading, openProfileSurvey } = useProfileSurvey();
  const [displayName, setDisplayName] = useState(user?.displayName || user?.username || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setDisplayName(user?.displayName || user?.username || '');
  }, [user?.displayName, user?.username]);

  useEffect(() => {
    if (!isPanelist) return undefined;
    let isMounted = true;

    async function refreshProfile() {
      try {
        const currentUserResponse = await getCurrentUser();
        if (!isMounted) return;
        setUser(currentUserResponse.data.user);
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError.response?.data?.message || 'Unable to refresh profile.');
        }
      }
    }

    refreshProfile();

    return () => {
      isMounted = false;
    };
  }, [isPanelist]);

  const handleSaveName = async () => {
    if (saving || !displayName.trim()) return;
    setSaving(true);
    setMessage('');
    setError('');

    try {
      const response = await updateProfile({ displayName: displayName.trim() });
      setUser(response.data.user);
      setMessage('Display name updated.');
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to update display name.');
    } finally {
      setSaving(false);
    }
  };

  if (!isPanelist) {
    const fields = [
      ['Member ID', user?.memberId || user?.id],
      ['Group', user?.group],
      ['Team', user?.team],
      ['Login IP', user?.loginIp],
      ['Login Region', user?.loginRegion],
      ['Email', user?.email],
    ];

    return (
      <>
        <PageHeader title="Profile" description="Member identity and account settings." />
        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
          <section className="card p-5">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Member Information</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map(([label, value]) => (
                <InfoPanel key={label} label={label} value={value} />
              ))}
            </div>
          </section>
          <section className="card p-5">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Settings</h2>
            <label className="space-y-2">
              <span className="text-sm font-semibold text-slate-700">Change Display Name</span>
              <input className="field" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
            </label>
            <button className="btn-primary mt-4 w-full" type="button" onClick={handleSaveName} disabled={saving}>
              {saving ? 'Saving...' : 'Change'}
            </button>
          </section>
        </div>
      </>
    );
  }

  const accountFields = [
    ['Public Panelist ID', displayValue(user?.publicPanelistId || user?.memberId)],
    ['Email', displayValue(user?.email)],
  ];

  return (
    <>
      <PageHeader title="Account" description="Your account identity and security settings." />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="card p-5">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-950">Account Details</h2>
            <p className="mt-1 text-sm text-slate-500">Your survey-matching information is kept private and used only to improve eligibility.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {accountFields.map(([label, value]) => (
              <InfoPanel key={label} label={label} value={value} />
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200/70 bg-amber-50/60 p-4">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700 shadow-sm"><Coins size={20} /></span>
              <div><p className="font-bold text-slate-950">Panel profile</p><p className="mt-1 text-sm text-slate-600">{panelProfileLoading ? 'Checking your profile…' : panelProfile?.isComplete ? 'Your profile is complete. You can update it anytime.' : `Complete your profile to receive ${rewardCoins} Coins once.`}</p></div>
            </div>
            <button className="btn-secondary" type="button" onClick={openProfileSurvey}>{panelProfile?.isComplete ? 'Update profile' : 'Complete profile'}</button>
          </div>
        </section>

        <aside className="space-y-4">
          <section className="card p-5">
            <h2 className="text-lg font-bold text-slate-950">Display Name</h2>
            <p className="mt-1 text-sm text-slate-500">This is the name shown in your workspace.</p>
            <label className="mt-4 block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Name</span>
              <input
                className="field"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
                maxLength={80}
                autoComplete="name"
              />
            </label>
            <button className="btn-primary mt-4 w-full" type="button" onClick={handleSaveName} disabled={saving || !displayName.trim()}>
              {saving ? 'Saving...' : 'Save name'}
            </button>
            {message && <p className="mt-3 rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm font-semibold text-cyan-800">{message}</p>}
            {error && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
          </section>

          <section className="card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <ShieldCheck size={21} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-950">Account Security</p>
                <p className="mt-1 text-sm text-slate-500">Use a secure email reset to change your password.</p>
              </div>
            </div>
            <Link className="btn-secondary mt-5 w-full" to="/forgot-password">
              Reset password
            </Link>
          </section>
        </aside>
      </div>
    </>
  );
}
