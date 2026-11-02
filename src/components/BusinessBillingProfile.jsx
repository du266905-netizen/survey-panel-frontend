import { useEffect, useMemo, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { getBillingProfile, saveBillingProfile } from '../api/realApi';
import { countryOptionsFor } from '../constants/panelProfileOptions';
import { useLanguage } from './LanguageContext';
import './BusinessBillingProfile.css';

/* The billing profile: who the invoice is made out to.
 *
 * It is the merchant's own record, not the payment provider's — the country
 * decides the tax treatment and the company name goes on the invoice, and
 * neither changes when the customer switches between PayPal, crypto or a bank
 * transfer. See INTEGRATION-TASKS §8.
 *
 * The state lives in `useBillingProfile` (called once per page) so the fields
 * can be rendered inside whichever payment panel is open without losing what
 * was typed when the customer switches route. */

const copyByLanguage = {
  'zh-CN': {
    title: '账单信息',
    company: '公司名称',
    country: '国家 / 地区',
    address: '地址',
    city: '城市',
    postal: '邮编',
    taxType: '税号类型',
    vat: '税号 / VAT',
    optional: '选填',
    email: '邮箱',
    save: '保存',
    saving: '正在保存…',
    saved: '已保存',
    required: '请填完公司名称、国家、地址和邮箱。',
    failed: '暂时无法保存，稍后再试。你的付款不受影响。',
  },
};

const en = {
  title: 'Billing details',
  company: 'Company name',
  country: 'Country or region',
  address: 'Address',
  city: 'City',
  postal: 'Postal code',
  taxType: 'Tax ID type',
  vat: 'Tax or VAT number',
  optional: 'optional',
  email: 'Email',
  save: 'Save',
  saving: 'Saving…',
  saved: 'Saved',
  required: 'Fill in company, country, address and email.',
  failed: 'Could not save just now. Payments are not affected.',
};

/* Tax identifiers are country-shaped: an SG company gives a GST number, an EU
 * company a VAT number. One list, chosen by type, is enough for an invoice. */
const TAX_TYPES = [
  { value: 'VAT', label: 'VAT' },
  { value: 'GST', label: 'GST' },
  { value: 'ABN', label: 'ABN' },
  { value: 'EIN', label: 'EIN' },
  { value: 'OTHER', label: 'Other' },
];

/* Tax identifiers are the only optional part: everyone can raise an invoice
 * with a company, a country and an address, but only some customers reclaim
 * tax. */
const REQUIRED_KEYS = ['companyName', 'country', 'addressLine1', 'city', 'postalCode', 'billingEmail'];

const isComplete = (profile) => REQUIRED_KEYS.every((key) => String(profile[key] || '').trim());

const EMPTY = {
  companyName: '',
  country: '',
  addressLine1: '',
  city: '',
  postalCode: '',
  taxIdType: '',
  vatNumber: '',
  billingEmail: '',
};

export function useBillingProfile() {
  const [profile, setProfile] = useState(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorKey, setErrorKey] = useState('');
  /* What the server already has, so coming back to the page does not re-save
     the same values, and typing does not save on every keystroke. */
  const storedRef = useRef(JSON.stringify(EMPTY));

  useEffect(() => {
    let cancelled = false;
    getBillingProfile()
      .then((payload) => {
        if (cancelled || !payload) return;
        const next = { ...EMPTY, ...(payload.profile || payload) };
        storedRef.current = JSON.stringify(next);
        setProfile(next);
      })
      .catch(() => { /* endpoint not deployed yet: start empty */ })
      .finally(() => { if (!cancelled) setLoaded(true); });
    return () => { cancelled = true; };
  }, []);

  /* There is no save button: the profile belongs to the account, so it is
     written as soon as it is complete and has changed. The card route cannot
     hook into PayPal's own button, and this way it does not need to. */
  useEffect(() => {
    if (!loaded) return undefined;
    if (!isComplete(profile)) return undefined;
    const serialized = JSON.stringify(profile);
    if (serialized === storedRef.current) return undefined;

    const timer = window.setTimeout(() => {
      setSaving(true);
      saveBillingProfile(profile)
        .then(() => {
          storedRef.current = serialized;
          setSaved(true);
          setErrorKey('');
        })
        .catch((error) => {
          /* A missing endpoint is not a customer-facing failure. */
          if (error?.response?.status === 404) return;
          setErrorKey('failed');
        })
        .finally(() => setSaving(false));
    }, 900);

    return () => window.clearTimeout(timer);
  }, [profile, loaded]);

  const update = (key) => (event) => {
    const { value } = event.target;
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  return { profile, update, saving, saved, errorKey };
}

export default function BusinessBillingProfile({ billing, embedded = false }) {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || en;
  const countries = useMemo(() => countryOptionsFor(language), [language]);
  const { profile, update, saving, saved, errorKey } = billing;

  return (
    <div className={`billing-profile${embedded ? ' is-embedded' : ''}`}>
      <div className="billing-profile-head">
        <div className="billing-profile-head-text">
          <h2>{copy.title}</h2>
        </div>
        {saved && !saving ? (
          <span className="billing-profile-saved"><Check size={14} aria-hidden="true" /> {copy.saved}</span>
        ) : null}
      </div>

      <label className="billing-profile-field">
        {copy.company}
        <input value={profile.companyName} onChange={update('companyName')} autoComplete="organization" />
      </label>

      <label className="billing-profile-field">
        {copy.country}
        <select value={profile.country} onChange={update('country')}>
          <option value="">—</option>
          {countries.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>

      <label className="billing-profile-field">
        {copy.address}
        <input value={profile.addressLine1} onChange={update('addressLine1')} autoComplete="street-address" />
      </label>

      <div className="billing-profile-pair">
        <label className="billing-profile-field">
          {copy.city}
          <input value={profile.city} onChange={update('city')} autoComplete="address-level2" />
        </label>
        <label className="billing-profile-field">
          {copy.postal}
          <input value={profile.postalCode} onChange={update('postalCode')} autoComplete="postal-code" />
        </label>
      </div>

      <div className="billing-profile-pair">
        <label className="billing-profile-field">
          {copy.taxType} <span className="is-optional">{copy.optional}</span>
          <select value={profile.taxIdType} onChange={update('taxIdType')}>
            <option value="">—</option>
            {TAX_TYPES.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </label>
        <label className="billing-profile-field">
          {copy.vat} <span className="is-optional">{copy.optional}</span>
          <input value={profile.vatNumber} onChange={update('vatNumber')} autoComplete="off" />
        </label>
      </div>

      <label className="billing-profile-field">
        {copy.email}
        <input type="email" value={profile.billingEmail} onChange={update('billingEmail')} autoComplete="email" />
      </label>

      {errorKey ? <p className="billing-profile-error" role="alert">{copy[errorKey]}</p> : null}
    </div>
  );
}
