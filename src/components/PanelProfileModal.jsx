import { Check, ChevronLeft, ChevronRight, CircleHelp, Coins, LoaderCircle, Search, Settings2, ShieldCheck, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { savePanelProfileProgress } from '../api/realApi';
import Logo from './Logo';
import { useLanguage } from './LanguageContext';
import {
  adminAreasForCountry,
  countryOptionsFor,
  employedStatusValues,
  localizedPanelProfileOptions,
} from '../constants/panelProfileOptions';
import { interpolate } from '../utils/interpolate';

function monthOptionsFor(locale) {
  return Array.from({ length: 12 }, (_, index) => ({ value: String(index + 1), label: new Date(Date.UTC(2026, index, 1)).toLocaleDateString(locale, { month: 'long' }) }));
}
const dayOptions = Array.from({ length: 31 }, (_, index) => ({ value: String(index + 1), label: String(index + 1) }));
const maxBirthYear = new Date().getUTCFullYear() - 18;
const yearOptions = Array.from({ length: maxBirthYear - 1900 + 1 }, (_, index) => String(maxBirthYear - index));
const featuredCountryCodes = ['US', 'CA', 'GB', 'CN', 'AU', 'IN'];

function initialDraft(profile) {
  return {
    country: profile?.country || '',
    adminAreaCode: profile?.adminAreaCode || '',
    cityOrRegion: profile?.cityOrRegion || '',
    postalCode: profile?.postalCode || '',
    language: profile?.language || '',
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
    researchTopics: profile?.researchTopics || [],
    participationFormats: profile?.participationFormats || [],
  };
}

function questionSteps(draft, copy, options) {
  const countryAdminAreas = adminAreasForCountry(draft.country);
  const steps = [
    { key: 'intro', kind: 'intro' },
    { key: 'country', kind: 'select', title: copy.stepCountryTitle, description: copy.stepCountryDescription },
    { key: 'language', kind: 'options', title: copy.stepLanguageTitle, description: copy.stepLanguageDescription, options: options.languageOptions },
    { key: 'birthDate', kind: 'birthDate', title: copy.stepBirthDateTitle, description: copy.stepBirthDateDescription },
    { key: 'gender', kind: 'options', title: copy.stepGenderTitle, description: copy.stepGenderDescription, options: options.genderOptions },
    { key: 'educationLevel', kind: 'options', title: copy.stepEducationTitle, description: copy.stepEducationDescription, options: options.educationOptions },
    { key: 'employmentStatus', kind: 'options', title: copy.stepEmploymentTitle, description: copy.stepEmploymentDescription, options: options.employmentOptions },
  ];

  if (countryAdminAreas.length) {
    steps.splice(2, 0, { key: 'adminAreaCode', kind: 'select', title: copy.stepAdminAreaTitle, description: copy.stepAdminAreaDescription });
    steps.splice(3, 0, { key: 'postalCode', kind: 'text', optional: true, title: copy.stepPostalCodeTitle, description: copy.stepPostalCodeDescription });
  } else {
    steps.splice(2, 0, { key: 'cityOrRegion', kind: 'text', title: copy.stepCityTitle, description: copy.stepCityDescription });
  }

  if (employedStatusValues.has(draft.employmentStatus)) {
    steps.push({ key: 'industry', kind: 'options', title: copy.stepIndustryTitle, description: copy.stepIndustryDescription, options: options.industryOptions });
  }

  steps.push({ key: 'maritalStatus', kind: 'options', title: copy.stepMaritalStatusTitle, description: copy.stepMaritalStatusDescription, options: options.maritalStatusOptions });
  steps.push({ key: 'hasChildren', kind: 'options', title: copy.stepHasChildrenTitle, description: copy.stepHasChildrenDescription, options: options.childrenOptions });

  if (draft.hasChildren === 'yes') {
    steps.push({ key: 'childrenAgeBands', kind: 'multi', title: copy.stepChildrenAgeBandsTitle, description: copy.stepChildrenAgeBandsDescription, options: options.childrenAgeBandOptions });
  }

  if (draft.country === 'US') {
    steps.push({ key: 'householdIncomeUsd', kind: 'options', title: copy.stepHouseholdIncomeTitle, description: copy.stepHouseholdIncomeDescription, options: options.householdIncomeOptions });
  }

  steps.push({ key: 'researchTopics', kind: 'multi', title: copy.stepResearchTopicsTitle, description: copy.stepResearchTopicsDescription, options: options.researchTopicOptions, exclusiveValues: ['prefer_not_to_say'] });
  steps.push({ key: 'participationFormats', kind: 'multi', title: copy.stepParticipationFormatsTitle, description: copy.stepParticipationFormatsDescription, options: options.participationFormatOptions, exclusiveValues: ['not_sure_yet'] });

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

function CountryOptions({ value, onSelect, disabled, options, featuredOptions, copy }) {
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const matches = normalizedQuery
    ? options.filter((option) => option.label.toLocaleLowerCase().includes(normalizedQuery)).slice(0, 8)
    : [];

  return (
    <div className="profile-survey-country-picker">
      <div className="profile-survey-country-options">
        {featuredOptions.map((option) => (
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
          placeholder={copy.searchPlaceholder}
          disabled={disabled}
        />
      </label>
      {normalizedQuery && (
        <div className="profile-survey-country-results" role="listbox" aria-label={copy.searchResultsLabel}>
          {matches.length ? matches.map((option) => (
            <button key={option.value} type="button" role="option" aria-selected={value === option.value} disabled={disabled} onClick={() => onSelect(option.value)}>
              {option.label}
            </button>
          )) : <p>{copy.searchEmpty}</p>}
        </div>
      )}
    </div>
  );
}

export default function PanelProfileModal({ open, profile, rewardCoins, onClose, onProfileSaved, onCompleted, asPage = false }) {
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy?.panelistUi?.onboarding || {};
  const optionsCopy = publicCopy?.panelistUi?.options || {};
  const options = useMemo(() => localizedPanelProfileOptions(optionsCopy), [optionsCopy]);
  const countryList = useMemo(() => countryOptionsFor(language), [language]);
  const featuredCountryList = useMemo(() => featuredCountryCodes.map((code) => countryList.find((option) => option.value === code)).filter(Boolean), [countryList]);
  const [draft, setDraft] = useState(() => initialDraft(profile));
  const [stepIndex, setStepIndex] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [completedProfile, setCompletedProfile] = useState(null);
  const [awardedCoins, setAwardedCoins] = useState(0);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const steps = useMemo(() => questionSteps(draft, copy, options), [draft, copy, options]);
  const currentStep = steps[stepIndex] || steps[0];
  const questionCount = Math.max(steps.length - 1, 1);
  const progressValue = completed ? 100 : Math.max(0, Math.min(100, (Math.max(stepIndex, 0) / questionCount) * 100));

  useEffect(() => {
    if (!open) return;
    const nextDraft = initialDraft(profile);
    setDraft(nextDraft);
    setCompleted(false);
    setCompletedProfile(null);
    setAwardedCoins(0);
    setError('');
    setOptionsOpen(false);
    setStepIndex(profile?.isComplete ? 0 : Math.min(profile?.profileCurrentStep || 0, questionSteps(nextDraft, copy, options).length - 1));
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
      const nextSteps = questionSteps(nextDraft, copy, options);
      setDraft(nextDraft);
      if (response.data.profile.isComplete) {
        setCompleted(true);
        setCompletedProfile(response.data.profile);
        setAwardedCoins(response.data.awardedCoins || 0);
        onProfileSaved?.(response.data);
      } else {
        setStepIndex(Math.min(nextStepIndex, nextSteps.length - 1));
        onProfileSaved?.(response.data);
      }
    } catch (caughtError) {
      setError(caughtError.response?.data?.message || copy.saveError);
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
    if (currentStep.kind === 'multi') {
      const selectedValues = draft[currentStep.key] || [];
      if (selectedValues.length) persist({ [currentStep.key]: selectedValues });
    }
  };

  const toggleMultiChoice = (fieldName, value, exclusiveValues = []) => {
    setDraft((current) => {
      const currentValues = current[fieldName] || [];
      if (exclusiveValues.includes(value)) return { ...current, [fieldName]: [value] };
      const withoutExclusiveValue = currentValues.filter((entry) => !exclusiveValues.includes(entry));
      return {
        ...current,
        [fieldName]: withoutExclusiveValue.includes(value) ? withoutExclusiveValue.filter((entry) => entry !== value) : [...withoutExclusiveValue, value],
      };
    });
  };

  const continueAfterCompletion = () => {
    if (onCompleted) {
      onCompleted({ profile: completedProfile, awardedCoins });
      return;
    }
    onClose();
  };

  const renderQuestion = () => {
    if (completed) {
      return (
        <div className="profile-survey-success">
          <span className="profile-survey-success-icon"><ShieldCheck size={34} /></span>
          <p className="profile-survey-eyebrow">{copy.completeEyebrow}</p>
          <h2>{awardedCoins ? interpolate(copy.coinsAdded, { coins: awardedCoins.toLocaleString() }) : copy.profileUpToDate}</h2>
          <p>{awardedCoins ? copy.completeRewardBody : copy.completeThanksBody}</p>
          <button className="profile-survey-primary-action" type="button" onClick={continueAfterCompletion}>{copy.returnToWorkspace} <ChevronRight size={18} /></button>
        </div>
      );
    }

    if (currentStep.kind === 'intro') {
      const rewardParts = copy.introReward.split('{coins}');
      return (
        <div className="profile-survey-intro">
          <span className="profile-survey-intro-coin"><Coins size={23} /></span>
          <p className="profile-survey-eyebrow">{copy.introEyebrow}</p>
          <h2>{copy.introTitle}</h2>
          <p>{copy.introBody}</p>
          <div className="profile-survey-reward-note"><Coins size={16} /> {rewardParts[0]}<strong>{rewardCoins.toLocaleString()}</strong>{rewardParts[1]}</div>
          <button className="profile-survey-primary-action" type="button" onClick={() => setStepIndex(1)}>{copy.startProfile} <ChevronRight size={18} /></button>
          <a href="/privacy" className="profile-survey-privacy-link"><CircleHelp size={15} /> {copy.privacyLinkLabel}</a>
        </div>
      );
    }

    if (currentStep.key === 'country') {
      return <CountryOptions value={draft.country} onSelect={(value) => selectAnswer('country', value)} disabled={saving} options={countryList} featuredOptions={featuredCountryList} copy={copy} />;
    }

    if (currentStep.key === 'adminAreaCode') {
      const areas = adminAreasForCountry(draft.country);
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <FieldControl>
            <select value={draft.adminAreaCode} onChange={(event) => setDraft((current) => ({ ...current, adminAreaCode: event.target.value }))} autoFocus>
              <option value="">{copy.adminAreaPlaceholder}</option>
              {areas.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </FieldControl>
          <button className="profile-survey-primary-action" type="submit" disabled={saving || !draft.adminAreaCode.trim()}>{copy.continue} <ChevronRight size={18} /></button>
        </form>
      );
    }

    if (currentStep.key === 'cityOrRegion') {
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <FieldControl><input value={draft.cityOrRegion} onChange={(event) => setDraft((current) => ({ ...current, cityOrRegion: event.target.value }))} placeholder={copy.cityPlaceholder} autoFocus maxLength={120} /></FieldControl>
          <button className="profile-survey-primary-action" type="submit" disabled={saving || !draft.cityOrRegion.trim()}>{copy.continue} <ChevronRight size={18} /></button>
        </form>
      );
    }

    if (currentStep.key === 'postalCode') {
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <FieldControl><input value={draft.postalCode} onChange={(event) => setDraft((current) => ({ ...current, postalCode: event.target.value }))} placeholder={copy.postalCodePlaceholder} autoFocus maxLength={24} /></FieldControl>
          <button className="profile-survey-primary-action" type="submit" disabled={saving}>{copy.continue} <ChevronRight size={18} /></button>
          <button className="profile-survey-skip-action" type="button" onClick={() => persist({ postalCode: null })} disabled={saving}>{copy.skipForNow}</button>
        </form>
      );
    }

    if (currentStep.key === 'birthDate') {
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <div className="profile-survey-date-fields">
            <FieldControl><select value={draft.birthMonth} onChange={(event) => setDraft((current) => ({ ...current, birthMonth: event.target.value }))} autoFocus><option value="">{copy.monthPlaceholder}</option>{monthOptionsFor(language).map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></FieldControl>
            <FieldControl><select value={draft.birthDay} onChange={(event) => setDraft((current) => ({ ...current, birthDay: event.target.value }))}><option value="">{copy.dayPlaceholder}</option>{dayOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></FieldControl>
            <FieldControl><select value={draft.birthYear} onChange={(event) => setDraft((current) => ({ ...current, birthYear: event.target.value }))}><option value="">{copy.yearPlaceholder}</option>{yearOptions.map((option) => <option key={option} value={option}>{option}</option>)}</select></FieldControl>
          </div>
          <button className="profile-survey-primary-action" type="submit" disabled={saving || !draft.birthYear || !draft.birthMonth || !draft.birthDay}>{copy.continue} <ChevronRight size={18} /></button>
        </form>
      );
    }

    if (currentStep.kind === 'multi') {
      const selectedValues = draft[currentStep.key] || [];
      return (
        <form onSubmit={submitText} className="profile-survey-form">
          <div className="profile-survey-options">
            {currentStep.options.map((option) => <LargeOption key={option.value} label={option.label} multi selected={selectedValues.includes(option.value)} disabled={saving} onClick={() => toggleMultiChoice(currentStep.key, option.value, currentStep.exclusiveValues)} />)}
          </div>
          <button className="profile-survey-primary-action" type="submit" disabled={saving || !selectedValues.length}>{copy.continue} <ChevronRight size={18} /></button>
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
          <div className="profile-survey-brand"><Logo size="sm" /></div>
          <div className="profile-survey-actions">
            <div className="profile-survey-header-progress" role="progressbar" aria-label={copy.progressAriaLabel} aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(progressValue)}>
              <span style={{ width: `${progressValue}%` }} />
            </div>
            <div
              className="profile-survey-options-control"
              onMouseEnter={() => setOptionsOpen(true)}
              onMouseLeave={() => setOptionsOpen(false)}
            >
              <button className="profile-survey-options-trigger" type="button" onClick={() => setOptionsOpen((open) => !open)} aria-expanded={optionsOpen} aria-haspopup="menu" aria-label={copy.optionsAriaLabel}>
                <Settings2 size={17} />
              </button>
              {optionsOpen && (
                <div className="profile-survey-options-menu" role="menu">
                  <a href="/privacy" role="menuitem"><CircleHelp size={15} /> {publicCopy?.panelistUi?.common?.privacy}</a>
                  <button type="button" role="menuitem" onClick={onClose}><X size={15} /> {copy.saveAndExit}</button>
                </div>
              )}
            </div>
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
          {saving && <p className="profile-survey-saving"><LoaderCircle size={15} className="animate-spin" /> {copy.saving}</p>}
        </div>
        {!completed && stepIndex > 0 && <button className="profile-survey-back" type="button" onClick={() => setStepIndex((current) => Math.max(0, current - 1))} disabled={saving}><ChevronLeft size={17} /> {copy.back}</button>}
      </section>
    </div>
  );

  return asPage ? questionnaire : createPortal(questionnaire, document.body);
}
