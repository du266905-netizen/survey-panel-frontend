import { Check, ChevronLeft, ChevronRight, CircleHelp, Coins, LoaderCircle, Search, Settings2, ShieldCheck, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { savePanelProfileProgress } from '../api/realApi';
import Logo from './Logo';
import {
  adminAreasForCountry,
  childrenAgeBandOptions,
  childrenOptions,
  countryOptions,
  educationOptions,
  employedStatusValues,
  employmentOptions,
  genderOptions,
  householdIncomeOptions,
  industryOptions,
  maritalStatusOptions,
} from '../constants/panelProfileOptions';

const monthOptions = Array.from({ length: 12 }, (_, index) => ({ value: String(index + 1), label: new Date(Date.UTC(2026, index, 1)).toLocaleDateString('en-US', { month: 'long' }) }));
const dayOptions = Array.from({ length: 31 }, (_, index) => ({ value: String(index + 1), label: String(index + 1) }));
const maxBirthYear = new Date().getUTCFullYear() - 18;
const yearOptions = Array.from({ length: maxBirthYear - 1900 + 1 }, (_, index) => String(maxBirthYear - index));
const featuredCountryCodes = ['US', 'CA', 'GB', 'CN', 'AU', 'IN'];
const featuredCountryOptions = featuredCountryCodes.map((code) => countryOptions.find((option) => option.value === code)).filter(Boolean);

function initialDraft(profile) {
  return {
    country: profile?.country || '',
    adminAreaCode: profile?.adminAreaCode || '',
    cityOrRegion: profile?.cityOrRegion || '',
    postalCode: profile?.postalCode || '',
    birthYear: profile?.birthYear ? String(profile.birthYear) : '',
    birthMonth: profile?.birthMonth ? String(profile.birthMonth) : '',
    birthDay: profile?.birthDay ? String(profile.birthDay) : '',
    gender: profile?.gender || '',
    educationLevel: profile?.educationLevel || '',
    employmentStatus: profile?.employmentStatus || '',
    industry: profile?.industry || '',
    maritalStatus: profile?.maritalStatus || '',
    hasChildren: profile?.hasChildren || '',
    childrenAgeBands: profile?.childrenAgeBands || [],
    householdIncomeUsd: profile?.householdIncomeUsd || '',
  };
}

function questionSteps(draft) {
  const countryAdminAreas = adminAreasForCountry(draft.country);
  const steps = [
    { key: 'intro', kind: 'intro' },
    { key: 'country', kind: 'select', title: 'Where do you currently live?', description: 'Choose your country or territory of residence.' },
    { key: 'birthDate', kind: 'birthDate', title: 'What is your date of birth?', description: 'We use this only to determine your age group for matching.' },
    { key: 'gender', kind: 'options', title: 'What is your gender?', description: 'Choose the option that best describes you.', options: genderOptions },
    { key: 'educationLevel', kind: 'options', title: 'What is the highest level of education you have completed?', description: 'Select your completed highest level.', options: educationOptions },
    { key: 'employmentStatus', kind: 'options', title: 'What is your current main employment status?', description: 'Choose the option that best describes your situation.', options: employmentOptions },
  ];

  if (countryAdminAreas.length) {
    steps.splice(2, 0, { key: 'adminAreaCode', kind: 'select', title: 'What state, province, or region do you live in?', description: 'Choose the area that best matches your current residence.' });
    steps.splice(3, 0, { key: 'postalCode', kind: 'text', optional: true, title: 'What is your postal code?', description: 'Optional. It can help with location-based survey eligibility.' });
  } else {
    steps.splice(2, 0, { key: 'cityOrRegion', kind: 'text', title: 'What city or region do you live in?', description: 'Enter your current city or region of residence.' });
  }

  if (employedStatusValues.has(draft.employmentStatus)) {
    steps.push({ key: 'industry', kind: 'options', title: 'What industry do you work in?', description: 'Choose the industry that best matches your main work.', options: industryOptions });
  }

  steps.push({ key: 'maritalStatus', kind: 'options', title: 'What is your marital or partnership status?', description: 'Choose the option that best describes your current status.', options: maritalStatusOptions });
  steps.push({ key: 'hasChildren', kind: 'options', title: 'Do you have children you or your partner care for?', description: 'This helps us match family and household research.', options: childrenOptions });

  if (draft.hasChildren === 'yes') {
    steps.push({ key: 'childrenAgeBands', kind: 'multi', title: 'What age groups are your children?', description: 'Select every age group that applies.', options: childrenAgeBandOptions });
  }

  if (draft.country === 'US') {
    steps.push({ key: 'householdIncomeUsd', kind: 'options', title: 'What is your approximate annual household income before tax?', description: 'Choose the range that best fits your household.', options: householdIncomeOptions });
  }

  return steps;
}

function LargeOption({ label, selected, onClick, disabled, multi = false }) {
  return (
    <button className={`profile-survey-option ${selected ? 'is-selected' : ''}`} type="button" onClick={onClick} disabled={disabled}>
      <span>{label}</span>
      <span className={`profile-survey-option-mark ${multi ? 'is-multi' : ''}`}>{selected && <Check size={16} strokeWidth={3} />}</span>
    </button>
  );
}

function FieldControl({ children }) {
  return <div className="profile-survey-field-control">{children}</div>;
}

function QuestionTitle({ title }) {
  return <h1 id="panel-profile-title">{title}</h1>;
}

function CountryOptions({ value, onSelect, disabled }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = normalizedQuery
    ? countryOptions.filter((option) => option.label.toLocaleLowerCase().includes(normalizedQuery)).slice(0, 8)
    : [];

  return (
    <div className="profile-survey-country-picker">
      <div className="profile-survey-country-options">
        {featuredCountryOptions.map((option) => (
          <LargeOption
            key={option.value}
            label={option.label}
            selected={value === option.value}
            disabled={disabled}
            onClick={() => onSelect(option.value)}
          />
        ))}
      </div>
      <label className="profile-survey-country-search">
        <Search size={18} aria-hidden="true" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search all countries and territories"
          disabled={disabled}
        />
      </label>
      {normalizedQuery && (
        <div className="profile-survey-country-results" role="listbox" aria-label="Country search results">
          {matches.length ? matches.map((option) => (
            <button key={option.value} type="button" role="option" aria-selected={value === option.value} disabled={disabled} onClick={() => onSelect(option.value)}>
              {option.label}
            </button>
          )) : <p>No country or territory found.</p>}
        </div>
      )}
    </div>
  );
}

export default function PanelProfileModal({ open, profile, rewardCoins, onClose, onProfileSaved, onCompleted, asPage = false }) {
  const [draft, setDraft] = useState(() => initialDraft(profile));
  const [stepIndex, setStepIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [awardedCoins, setAwardedCoins] = useState(0);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const steps = useMemo(() => questionSteps(draft), [draft]);
  const currentStep = steps[stepIndex] || steps[0];
  const questionCount = Math.max(steps.length - 1, 1);
  const progressValue = completed ? 100 : Math.max(0, Math.min(100, (Math.max(stepIndex, 0) / questionCount) * 100));

  useEffect(() => {
    if (!open) return;
    const nextDraft = initialDraft(profile);
    setDraft(nextDraft);
    setCompleted(false);
    setAwardedCoins(0);
    setError('');
    setOptionsOpen(false);
    setStepIndex(profile?.isComplete ? 0 : Math.min(profile?.profileCurrentStep || 0, questionSteps(nextDraft).length - 1));
  }, [open]);

  useEffect(() => {
    if (!open || asPage) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, asPage, onClose]);

  if (!open || typeof document === 'undefined') return null;

  const persist = async (answers, nextStepIndex = stepIndex + 1) => {
    if (saving) return;
    setSaving(true);
    setError('');
    try {
      const response = await savePanelProfileProgress({ answers, currentStep: nextStepIndex });
      const nextDraft = initialDraft(response.data.profile);
      const nextSteps = questionSteps(nextDraft);
      setDraft(nextDraft);
      if (response.data.profile.isComplete) {
        setCompleted(true);
        setAwardedCoins(response.data.awardedCoins || 0);
        onProfileSaved?.(response.data);
        onCompleted?.({ profile: response.data.profile, awardedCoins: response.data.awardedCoins || 0 });
      } else {
        setStepIndex(Math.min(nextStepIndex, nextSteps.length - 1));
        onProfileSaved?.(response.data);
      }
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || 'Your answer could not be saved. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const selectAnswer = (fieldName, value) => {
    const answers = { [fieldName]: value };
    if (fieldName === 'country') {
      answers.adminAreaCode = null;
      answers.cityOrRegion = null;
      answers.postalCode = null;
    }
    persist(answers);
  };

  const submitText = (event) => {
    event.preventDefault();
    if (currentStep.key === 'adminAreaCode') {
      if (!draft.adminAreaCode.trim()) return;
      persist({ adminAreaCode: draft.adminAreaCode });
      return;
    }
    if (currentStep.key === 'cityOrRegion') {
      if (!draft.cityOrRegion.trim()) return;
      persist({ cityOrRegion: draft.cityOrRegion });
      return;
    }
    if (currentStep.key === 'postalCode') {
      persist({ postalCode: draft.postalCode || null });
      return;
    }
    if (currentStep.key === 'birthDate') {
      if (!draft.birthYear || !draft.birthMonth || !draft.birthDay) return;
      persist({ birthYear: Number(draft.birthYear), birthMonth: Number(draft.birthMonth), birthDay: Number(draft.birthDay) });
      return;
    }
    if (currentStep.key === 'childrenAgeBands' && draft.childrenAgeBands.length) {
      persist({ childrenAgeBands: draft.childrenAgeBands });
    }
  };

  const toggleChildrenAgeBand = (value) => {
    setDraft((current) => {
      const currentValues = current.childrenAgeBands || [];
      if (value === 'prefer_not_to_say') return { ...current, childrenAgeBands: ['prefer_not_to_say'] };
      const withoutPreference = currentValues.filter((entry) => entry !== 'prefer_not_to_say');
      return {
        ...current,
        childrenAgeBands: withoutPreference.includes(value) ? withoutPreference.filter((entry) => entry !== value) : [...withoutPreference, value],
      };
    });
  };

  const renderQuestion = () => {
    if (completed) {
      return (
        <div className="profile-survey-success">
          <span className="profile-survey-success-icon"><ShieldCheck size={34} /></span>
          <p className="profile-survey-eyebrow">First survey complete</p>
          <h2>{awardedCoins ? `${awardedCoins} Coins added` : 'Your answers are saved'}</h2>
          <p>{awardedCoins ? 'Thank you. Your first-survey reward has been added to your wallet.' : 'Thank you for sharing your perspective.'}</p>
          <button className="profile-survey-primary-action" type="button" onClick={onClose}>Return to your workspace <ChevronRight size={18} /></button>
        </div>
      );
    }

    if (currentStep.kind === 'intro') {
      return (
        <div className="profile-survey-intro">
          <span className="profile-survey-intro-coin"><Coins size={23} /></span>
          <p className="profile-survey-eyebrow">Your first survey</p>
          <h2>Help us match you with more relevant research.</h2>
          <p>Answer a short set of introduction questions at your own pace. You can close this at any time and continue later.</p>
          <div className="profile-survey-reward-note"><Coins size={16} /> Complete this survey to receive <strong>{rewardCoins} Coins</strong> once.</div>
          <button className="profile-survey-primary-action" type="button" onClick={() => setStepIndex(1)}>Start survey <ChevronRight size={18} /></button>
          <a href="/privacy" className="profile-survey-privacy-link"><CircleHelp size={15} /> How we use survey information</a>
        </div>
      );
    }

    if (currentStep.key === 'country') {
      return <CountryOptions value={draft.country} onSelect={(value) => selectAnswer('country', value)} disabled={saving} />;
    }

    if (currentStep.key === 'adminAreaCode') {
      const areas = adminAreasForCountry(draft.country);
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <FieldControl>
            <select value={draft.adminAreaCode} onChange={(event) => setDraft((current) => ({ ...current, adminAreaCode: event.target.value }))} autoFocus>
              <option value="">Select state, province, or region</option>
              {areas.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </FieldControl>
          <button className="profile-survey-primary-action" type="submit" disabled={saving || !draft.adminAreaCode.trim()}>Continue <ChevronRight size={18} /></button>
        </form>
      );
    }

    if (currentStep.key === 'cityOrRegion') {
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <FieldControl><input value={draft.cityOrRegion} onChange={(event) => setDraft((current) => ({ ...current, cityOrRegion: event.target.value }))} placeholder="City" autoFocus maxLength={120} /></FieldControl>
          <button className="profile-survey-primary-action" type="submit" disabled={saving || !draft.cityOrRegion.trim()}>Continue <ChevronRight size={18} /></button>
        </form>
      );
    }

    if (currentStep.key === 'postalCode') {
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <FieldControl><input value={draft.postalCode} onChange={(event) => setDraft((current) => ({ ...current, postalCode: event.target.value }))} placeholder="Postal code" autoFocus maxLength={24} /></FieldControl>
          <button className="profile-survey-primary-action" type="submit" disabled={saving}>Continue <ChevronRight size={18} /></button>
          <button className="profile-survey-skip-action" type="button" onClick={() => persist({ postalCode: null })} disabled={saving}>Skip for now</button>
        </form>
      );
    }

    if (currentStep.key === 'birthDate') {
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <div className="profile-survey-date-fields">
            <FieldControl><select value={draft.birthMonth} onChange={(event) => setDraft((current) => ({ ...current, birthMonth: event.target.value }))} autoFocus><option value="">Month</option>{monthOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></FieldControl>
            <FieldControl><select value={draft.birthDay} onChange={(event) => setDraft((current) => ({ ...current, birthDay: event.target.value }))}><option value="">Day</option>{dayOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></FieldControl>
            <FieldControl><select value={draft.birthYear} onChange={(event) => setDraft((current) => ({ ...current, birthYear: event.target.value }))}><option value="">Year</option>{yearOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></FieldControl>
          </div>
          <button className="profile-survey-primary-action" type="submit" disabled={saving || !draft.birthYear || !draft.birthMonth || !draft.birthDay}>Continue <ChevronRight size={18} /></button>
        </form>
      );
    }

    if (currentStep.kind === 'multi') {
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <div className="profile-survey-options">
            {currentStep.options.map((option) => <LargeOption key={option.value} label={option.label} multi selected={draft.childrenAgeBands.includes(option.value)} disabled={saving} onClick={() => toggleChildrenAgeBand(option.value)} />)}
          </div>
          <button className="profile-survey-primary-action" type="submit" disabled={saving || !draft.childrenAgeBands.length}>Continue <ChevronRight size={18} /></button>
        </form>
      );
    }

    return (
      <div className="profile-survey-options">
        {currentStep.options.map((option) => <LargeOption key={option.value} label={option.label} selected={draft[currentStep.key] === option.value} disabled={saving} onClick={() => selectAnswer(currentStep.key, option.value)} />)}
      </div>
    );
  };

  const questionnaire = (
    <div className={`profile-survey-backdrop ${asPage ? 'is-page' : ''}`} role={asPage ? undefined : 'dialog'} aria-modal={asPage ? undefined : 'true'} aria-labelledby="panel-profile-title">
      <section className="profile-survey-modal">
        <header className="profile-survey-topbar">
          <div className="profile-survey-brand"><Logo size="sm" variant="light" /></div>
          <div className="profile-survey-actions">
            <div className="profile-survey-header-progress" role="progressbar" aria-label="First survey progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progressValue)}>
              <span style={{ width: `${progressValue}%` }} />
            </div>
            <button className="profile-survey-options-trigger" type="button" onClick={() => setOptionsOpen((open) => !open)} aria-expanded={optionsOpen} aria-haspopup="menu" aria-label="Options">
              <Settings2 size={17} />
            </button>
            {optionsOpen && (
              <div className="profile-survey-options-menu" role="menu">
                <a href="/privacy" role="menuitem"><CircleHelp size={15} /> Privacy</a>
                <button type="button" role="menuitem" onClick={onClose}><X size={15} /> Save and exit</button>
              </div>
            )}
          </div>
        </header>
        <div className="profile-survey-progress-track"><span style={{ width: `${progressValue}%` }} /></div>
        <div className="profile-survey-content">
          {!completed && currentStep.kind !== 'intro' && (
            <div className="profile-survey-question-head">
              <QuestionTitle title={currentStep.title} />
              <p>{currentStep.description}</p>
            </div>
          )}
          {renderQuestion()}
          {error && <p className="profile-survey-error">{error}</p>}
          {saving && <p className="profile-survey-saving"><LoaderCircle size={15} className="animate-spin" /> Saving your answer</p>}
        </div>
        {!completed && stepIndex > 0 && <button className="profile-survey-back" type="button" onClick={() => setStepIndex((current) => Math.max(0, current - 1))} disabled={saving}><ChevronLeft size={17} /> Back</button>}
      </section>
    </div>
  );

  return asPage ? questionnaire : createPortal(questionnaire, document.body);
}
