/* Homepage contact section, extracted so it can be reused on another page.
   It owns its form state and submission; the caller only renders it.
   Styles live in HomeAtlas.css (.atlas-stage / .atlas-contact-*), which the
   homepage imports. */

import { useMemo, useState } from 'react';
import { ArrowUpRight, LoaderCircle, Send } from 'lucide-react';
import { createSupportTicket } from '../api/supportApi';
import { useLanguage } from './LanguageContext';
import { countryFlag, countryLabel, countryOptions, phoneCountryOptions } from '../constants/panelProfileOptions';

export default function HomeContactSection() {
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.home;
  const regionNames = useMemo(() => {
    try { return new Intl.DisplayNames([language], { type: 'region' }); } catch { return null; }
  }, [language]);
  const localizedCountry = (country) => regionNames?.of(country.value) || country.label;

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phoneCountry: 'US',
    phone: '',
    region: 'US',
    subject: '',
    message: '',
  });
  const [contactStatus, setContactStatus] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const updateContactField = (event) => {
    const { name, value } = event.target;
    setContactForm((current) => ({ ...current, [name]: value }));
  };

  const submitContactForm = async (event) => {
    event.preventDefault();
    if (isSubmittingContact) return;

    const name = contactForm.name.trim();
    const email = contactForm.email.trim();
    const phone = contactForm.phone.trim();
    const phonePrefix = phoneCountryOptions.find((option) => option.value === contactForm.phoneCountry)?.dialCode || '';
    const subject = contactForm.subject.trim();
    const message = contactForm.message.trim();

    if (!name || !email || !subject || !message) return;

    setContactStatus('');
    setIsSubmittingContact(true);
    try {
      await createSupportTicket({
        source: 'PUBLIC_HOME_CONTACT',
        category: 'OTHER',
        subject,
        messages: [{
          role: 'user',
          content: `${message}${phone ? `\n\nContact number: ${phonePrefix} ${phone}` : ''}\nRegion: ${countryLabel(contactForm.region)}`,
        }],
        contactName: name,
        contactEmail: email,
      });
      setContactForm({ name: '', email: '', phoneCountry: 'US', phone: '', region: 'US', subject: '', message: '' });
      setContactStatus(copy.received);
    } catch (caughtError) {
      setContactStatus(caughtError.response?.data?.message || copy.sendError);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  return (
    <section id="atlas-contact" className="atlas-stage" aria-labelledby="atlas-contact-title">
      <div className="atlas-contact-panel">
        <div className="atlas-contact-copy">
          <h2 id="atlas-contact-title">{copy.contactTitle}</h2>
          <p className="atlas-contact-intro">{copy.contactIntro}</p>
        </div>

        <form className="atlas-contact-form" onSubmit={submitContactForm}>
          <label className="atlas-contact-field--name">
            <span>{copy.name}</span>
            <input name="name" value={contactForm.name} onChange={updateContactField} autoComplete="name" maxLength={80} required />
          </label>
          <label className="atlas-contact-field--email">
            <span>{copy.email}</span>
            <input name="email" type="email" value={contactForm.email} onChange={updateContactField} autoComplete="email" maxLength={254} required />
          </label>
          <label className="atlas-contact-field--phone">
            <span>{copy.contactNumber} <em>{copy.optional}</em></span>
            <span className="atlas-phone-input">
              <select name="phoneCountry" value={contactForm.phoneCountry} onChange={updateContactField} aria-label={copy.country}>
                {phoneCountryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {localizedCountry(country)} ({country.dialCode})</option>)}
              </select>
              <input name="phone" type="tel" inputMode="tel" value={contactForm.phone} onChange={updateContactField} autoComplete="tel-national" placeholder={copy.phonePlaceholder} maxLength={32} />
            </span>
          </label>
          <label className="atlas-contact-field--region">
            <span>{copy.country}</span>
            <select name="region" value={contactForm.region} onChange={updateContactField} autoComplete="country">
              {countryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {localizedCountry(country)}</option>)}
            </select>
          </label>
          <label className="atlas-contact-field--subject">
            <span>{copy.subject}</span>
            <input name="subject" value={contactForm.subject} onChange={updateContactField} maxLength={140} required />
          </label>
          <label className="atlas-contact-field--message">
            <span>{copy.message}</span>
            <textarea name="message" value={contactForm.message} onChange={updateContactField} maxLength={1800} required />
          </label>
          <button className="atlas-contact-submit" type="submit" disabled={isSubmittingContact}>
            {isSubmittingContact ? <LoaderCircle size={17} className="atlas-contact-spinner" /> : <Send size={17} />}
            {isSubmittingContact ? copy.sending : copy.send}
            {!isSubmittingContact && <ArrowUpRight size={17} />}
          </button>
          {contactStatus && <p className={`atlas-contact-status ${contactStatus.startsWith('Thank') ? 'is-success' : 'is-error'}`} role="status">{contactStatus}</p>}
        </form>
      </div>
    </section>
  );
}
