import { useEffect, useMemo, useState } from 'react';
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
    intro: '用于发票抬头与税务处理，与付款方式无关。',
    company: '公司名称',
    country: '国家 / 地区',
    address: '地址',
    city: '城市',
    postal: '邮编',
    taxType: '税号类型',
    vat: '税号 / VAT',
    optional: '选填',
    email: '开票邮箱',
    save: '保存',
    saving: '正在保存…',
    saved: '已保存',
    required: '请填写公司名称并选择国家。',
    failed: '暂时无法保存，稍后再试。你的付款不受影响。',
  },
};

const en = {
  title: 'Billing details',
  intro: 'Used on the invoice and for tax. Independent of how you pay.',
  company: 'Company name',
  country: 'Country or region',
  address: 'Address',
  city: 'City',
  postal: 'Postal code',
  taxType: 'Tax ID type',
  vat: 'Tax or VAT number',
  optional: 'optional',
  email: 'Invoice email',
  save: 'Save',
  saving: 'Saving…',
  saved: 'Saved',
  required: 'Add a company name and a country.',
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
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errorKey, setErrorKey] = useState('');

  useEffect(() => {
    let cancelled = false;
    getBillingProfile()
      .then((payload) => {
        if (cancelled || !payload) return;
        const next = payload.profile || payload;
        setProfile({ ...EMPTY, ...next });
      })
      .catch(() => { /* endpoint not deployed yet: start empty */ });
    return () => { cancelled = true; };
  }, []);

  const update = (key) => (event) => {
    const { value } = event.target;
    setProfile((current) => ({ ...current, [key]: value }));
    setSaved(false);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (!profile.companyName.trim() || !profile.country) {
      setErrorKey('required');
      return;
    }
    setErrorKey('');
    setSaving(true);
    try {
      await saveBillingProfile(profile);
      setSaved(true);
    } catch {
      setErrorKey('failed');
    } finally {
      setSaving(false);
    }
  };

  return { profile, update, submit, saving, saved, errorKey };
}

export default function BusinessBillingProfile({ billing, embedded = false }) {
  const { language } = useLanguage();
  const copy = copyByLanguage[language] || en;
  const countries = useMemo(() => countryOptionsFor(language), [language]);
  const { profile, update, submit, saving, saved, errorKey } = billing;

  return (
    <form className={`billing-profile${embedded ? ' is-embedded' : ''}`} onSubmit={submit} noValidate>
      <div className="billing-profile-head">
        <div className="billing-profile-head-text">
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
        </div>
        {saved ? (
          <span className="billing-profile-saved"><Check size={14} aria-hidden="true" /> {copy.saved}</span>
        ) : (
          <button className="billing-profile-save" type="submit" disabled={saving}>
            {saving ? copy.saving : copy.save}
          </button>
        )}
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
        {copy.address} <span className="is-optional">{copy.optional}</span>
        <input value={profile.addressLine1} onChange={update('addressLine1')} autoComplete="street-address" />
      </label>

      <div className="billing-profile-pair">
        <label className="billing-profile-field">
          {copy.city} <span className="is-optional">{copy.optional}</span>
          <input value={profile.city} onChange={update('city')} autoComplete="address-level2" />
        </label>
        <label className="billing-profile-field">
          {copy.postal} <span className="is-optional">{copy.optional}</span>
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
        {copy.email} <span className="is-optional">{copy.optional}</span>
        <input type="email" value={profile.billingEmail} onChange={update('billingEmail')} autoComplete="email" />
      </label>

      {errorKey ? <p className="billing-profile-error" role="alert">{copy[errorKey]}</p> : null}
    </form>
  );
}
