import { useEffect, useState } from 'react';
import { BadgeCheck, Gift, Mail, ShieldCheck, UserRound, WalletCards } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getOnboardingProfile, updateProfile } from '../api/realApi';
import PageHeader from '../components/PageHeader';
import { useAuth } from '../components/AuthContext';
import CoinAmount from '../components/CoinAmount';
import { isPanelistRole } from '../utils/roles';

const languageLabels = {
  de: 'German',
  en: 'English',
  es: 'Spanish',
  fr: 'French',
  id: 'Indonesian',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  pt: 'Portuguese',
  th: 'Thai',
  vi: 'Vietnamese',
  zh: 'Chinese',
};

const genderLabels = {
  female: 'Female',
  male: 'Male',
  non_binary: 'Non-binary',
  other: 'Other',
  prefer_not_to_say: 'Prefer not to say',
};

const occupationLabels = {
  employed_full_time: 'Employed full-time',
  employed_part_time: 'Employed part-time',
  homemaker: 'Homemaker',
  other: 'Other',
  retired: 'Retired',
  self_employed: 'Self-employed',
  student: 'Student',
  unemployed: 'Unemployed',
};

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

function StatusRow({ icon: Icon, label, value, tone = 'slate' }) {
  const toneClass = tone === 'cyan' ? 'bg-cyan-50 text-cyan-700' : tone === 'amber' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-700';

  return (
    <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${toneClass}`}>
        <Icon size={18} />
      </span>
      <div>
        <p className="text-sm font-bold text-slate-950">{label}</p>
        <p className="mt-1 text-sm text-slate-500">{value}</p>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user, setUser } = useAuth();
  const isPanelist = isPanelistRole(user?.role);
  const [displayName, setDisplayName] = useState(user?.displayName || user?.username || '');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(isPanelist);
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
      setLoading(true);
      try {
        const [currentUserResponse, onboardingResponse] = await Promise.all([getCurrentUser(), getOnboardingProfile()]);
        if (!isMounted) return;
        setUser(currentUserResponse.data.user);
        setProfile(onboardingResponse.data.profile);
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError.response?.data?.message || 'Unable to refresh profile.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
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
      ['Coins Balance', <CoinAmount value={user?.coins} />],
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

  const profileComplete = Boolean(profile?.profileSurveyCompletedAt);
  const profileFields = [
    ['Public Panelist ID', displayValue(profile?.publicId || user?.memberId)],
    ['Email', user?.email],
    ['Country', displayValue(profile?.country)],
    ['Language', displayValue(languageLabels[profile?.language] || profile?.language)],
    ['Age Range', displayValue(profile?.ageRange)],
    ['Gender', displayValue(genderLabels[profile?.gender] || profile?.gender)],
    ['Occupation', displayValue(occupationLabels[profile?.occupation] || profile?.occupation)],
  ];

  return (
    <>
      <PageHeader title="Account" description="Your panelist profile, rewards, and security status." />

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section className="card p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950">Panelist Profile</h2>
              <p className="mt-1 text-sm text-slate-500">{loading ? 'Refreshing account details...' : 'Core survey matching information.'}</p>
            </div>
            <Link className="btn-secondary" to="/onboarding">
              Edit Profile
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {profileFields.map(([label, value]) => (
              <InfoPanel key={label} label={label} value={value} />
            ))}
          </div>
        </section>

        <aside className="space-y-4">
          <section className="card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <WalletCards size={21} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-950">Rewards Balance</p>
                <p className="mt-1 text-lg font-black text-amber-800">
                  <CoinAmount value={user?.coins} />
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800">
              1000 Coins = $1 USD
            </div>
          </section>

          <section className="card p-5">
            <h2 className="mb-4 text-lg font-bold text-slate-950">Account Status</h2>
            <div className="space-y-3">
              <StatusRow icon={BadgeCheck} label="Email Verified" value="This account can receive survey and reward notifications." tone="cyan" />
              <StatusRow
                icon={Gift}
                label="Profile Survey"
                value={profileComplete ? 'Completed. Matching quality is improved.' : 'Complete it to unlock the profile bonus.'}
                tone={profileComplete ? 'cyan' : 'amber'}
              />
              <StatusRow icon={ShieldCheck} label="Security" value="Password reset is available by email." />
            </div>
          </section>

          <section className="card p-5">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-slate-950">
              <UserRound size={18} />
              Display Name
            </h2>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Name shown in your account</span>
              <input className="field" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
            </label>
            <button className="btn-primary mt-4 w-full" type="button" onClick={handleSaveName} disabled={saving || !displayName.trim()}>
              {saving ? 'Saving...' : 'Save name'}
            </button>
            {message && <p className="mt-3 rounded-lg border border-cyan-200 bg-cyan-50 p-3 text-sm font-semibold text-cyan-800">{message}</p>}
            {error && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}
          </section>

          <section className="card p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Mail size={18} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-950">Email</p>
                <p className="mt-1 break-all text-sm text-slate-500">{user?.email}</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
