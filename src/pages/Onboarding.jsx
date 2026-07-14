import { useEffect, useMemo, useState } from 'react';
import { BadgeCheck, BriefcaseBusiness, CalendarDays, Coins, Globe2, Languages, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { completeOnboardingProfile, getOnboardingProfile } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import PageHeader from '../components/PageHeader';

const countryOptions = [
  ['US', 'United States'],
  ['GB', 'United Kingdom'],
  ['CA', 'Canada'],
  ['AU', 'Australia'],
  ['DE', 'Germany'],
  ['FR', 'France'],
  ['ES', 'Spain'],
  ['IT', 'Italy'],
  ['NL', 'Netherlands'],
  ['BR', 'Brazil'],
  ['MX', 'Mexico'],
  ['IN', 'India'],
  ['PH', 'Philippines'],
  ['ID', 'Indonesia'],
  ['TH', 'Thailand'],
  ['VN', 'Vietnam'],
  ['MY', 'Malaysia'],
  ['SG', 'Singapore'],
  ['JP', 'Japan'],
  ['KR', 'South Korea'],
  ['OTHER', 'Other'],
];

const languageOptions = [
  ['en', 'English'],
  ['es', 'Spanish'],
  ['fr', 'French'],
  ['de', 'German'],
  ['pt', 'Portuguese'],
  ['it', 'Italian'],
  ['id', 'Indonesian'],
  ['th', 'Thai'],
  ['vi', 'Vietnamese'],
  ['zh', 'Chinese'],
  ['ja', 'Japanese'],
  ['ko', 'Korean'],
];

const genderOptions = [
  ['female', 'Female'],
  ['male', 'Male'],
  ['non_binary', 'Non-binary'],
  ['prefer_not_to_say', 'Prefer not to say'],
  ['other', 'Other'],
];

const occupationOptions = [
  ['student', 'Student'],
  ['employed_full_time', 'Employed full-time'],
  ['employed_part_time', 'Employed part-time'],
  ['self_employed', 'Self-employed'],
  ['unemployed', 'Unemployed'],
  ['retired', 'Retired'],
  ['homemaker', 'Homemaker'],
  ['other', 'Other'],
];

const initialForm = {
  country: 'US',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  gender: 'prefer_not_to_say',
  occupation: 'employed_full_time',
  language: 'en',
};

export default function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [profile, setProfile] = useState(null);
  const [bonuses, setBonuses] = useState({ registration: 100, profileSurvey: 50 });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [rewardPoints, setRewardPoints] = useState(null);

  const maxBirthYear = useMemo(() => new Date().getFullYear() - 13, []);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setLoading(true);
      try {
        const response = await getOnboardingProfile();
        if (!isMounted) return;
        const loadedProfile = response.data.profile;
        setProfile(loadedProfile);
        setBonuses(response.data.bonuses || { registration: 100, profileSurvey: 50 });
        setForm({
          country: loadedProfile?.country || initialForm.country,
          birthYear: loadedProfile?.birthYear || '',
          birthMonth: loadedProfile?.birthMonth || '',
          birthDay: loadedProfile?.birthDay || '',
          gender: loadedProfile?.gender || initialForm.gender,
          occupation: loadedProfile?.occupation || initialForm.occupation,
          language: loadedProfile?.language?.slice(0, 2) || initialForm.language,
        });
      } catch (caughtError) {
        if (isMounted) {
          setError(caughtError.response?.data?.message || 'Unable to load profile.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setRewardPoints(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setError('');

    try {
      const response = await completeOnboardingProfile({
        ...form,
        birthYear: Number(form.birthYear),
        birthMonth: Number(form.birthMonth),
        birthDay: Number(form.birthDay),
      });
      setUser(response.data.user);
      setProfile(response.data.profile);
      setRewardPoints(response.data.rewardPoints || 0);
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Unable to save profile.');
    } finally {
      setSaving(false);
    }
  };

  const profileCompleted = Boolean(profile?.profileSurveyCompletedAt || rewardPoints !== null);

  return (
    <>
      <PageHeader
        title="Profile Onboarding"
        description="Complete core targeting fields before entering the Survey Wall."
        action={
          profileCompleted ? (
            <button className="btn-primary" type="button" onClick={() => navigate('/partners')}>
              Enter Survey Wall
            </button>
          ) : null
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <form className="card p-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Globe2 size={16} />
                Country
              </span>
              <select className="field" name="country" value={form.country} onChange={handleChange} disabled={loading} required>
                {countryOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarDays size={16} />
                Birth month
              </span>
              <input
                className="field"
                name="birthMonth"
                type="number"
                min="1"
                max="12"
                value={form.birthMonth}
                onChange={handleChange}
                placeholder="1-12"
                disabled={loading}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarDays size={16} />
                Birth day
              </span>
              <input
                className="field"
                name="birthDay"
                type="number"
                min="1"
                max="31"
                value={form.birthDay}
                onChange={handleChange}
                placeholder="1-31"
                disabled={loading}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Languages size={16} />
                Primary language
              </span>
              <select className="field" name="language" value={form.language} onChange={handleChange} disabled={loading} required>
                {languageOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <CalendarDays size={16} />
                Birth year
              </span>
              <input
                className="field"
                name="birthYear"
                type="number"
                min="1900"
                max={maxBirthYear}
                value={form.birthYear}
                onChange={handleChange}
                placeholder="1995"
                disabled={loading}
                required
              />
            </label>

            <label className="block">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <UserRound size={16} />
                Gender
              </span>
              <select className="field" name="gender" value={form.gender} onChange={handleChange} disabled={loading} required>
                {genderOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <BriefcaseBusiness size={16} />
                Occupation
              </span>
              <select className="field" name="occupation" value={form.occupation} onChange={handleChange} disabled={loading} required>
                {occupationOptions.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}

          {rewardPoints !== null && (
            <div className="mt-5 rounded-xl border border-cyan-200 bg-cyan-50 p-4 text-sm font-semibold text-cyan-800">
              {rewardPoints > 0 ? `Profile survey completed. +${rewardPoints} Points added.` : 'Profile updated.'}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <button className="btn-primary" type="submit" disabled={loading || saving}>
              {saving ? 'Saving profile...' : 'Finish profile'}
            </button>
            <button className="btn-secondary" type="button" onClick={() => navigate('/partners')} disabled={!profileCompleted}>
              Continue
            </button>
          </div>
        </form>

        <aside className="space-y-4">
          <section className="card p-5">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Coins size={20} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-950">Reward Status</p>
                <p className="text-xs font-semibold text-slate-500">Registration and profile bonuses</p>
              </div>
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <span className="font-semibold text-slate-700">Registration</span>
                <span className="font-bold text-amber-700">+{bonuses.registration} Points</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm">
                <span className="font-semibold text-slate-700">Profile Survey</span>
                <span className="font-bold text-amber-700">+{bonuses.profileSurvey} Points</span>
              </div>
            </div>
          </section>

          <section className="card p-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
                <BadgeCheck size={18} />
              </span>
              <div>
                <p className="text-sm font-bold text-slate-950">Email Verified</p>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Your account is ready. Complete this profile to improve survey matching quality.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
