import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react';
import PublicAuthPanel from '../components/PublicAuthPanel';
import { submitBusinessInquiry } from '../api/realApi';
import { countryFlag, countryLabel, countryOptions, phoneCountryOptions } from '../constants/panelProfileOptions';
import './Business.css';

const initialForm = { content: '', email: '', name: '', organizationType: '', phoneCountry: 'US', phone: '', region: 'US' };

export default function BusinessAccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const authMode = location.pathname.endsWith('/login') ? 'login' : location.pathname.endsWith('/register') ? 'register' : null;
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage('');
    try {
      const phonePrefix = phoneCountryOptions.find((option) => option.value === form.phoneCountry)?.dialCode || '';
      await submitBusinessInquiry({ contactName: form.name, email: form.email, organizationType: form.organizationType, region: countryLabel(form.region), phone: form.phone.trim() ? `${phonePrefix} ${form.phone.trim()}` : '', content: form.content });
      setForm(initialForm);
      setMessage('Thank you. Your enquiry has been received and we will follow up using the email you provided.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not send your enquiry. Please review the details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="business-access-page business-contact-page">
      <Link className="business-access-brand" to="/"><ArrowLeft size={16} /> Back to GuanyiSearch</Link>
      {authMode ? (
        <div className="business-login-layout"><section><p className="business-eyebrow">CLIENT WORKSPACE</p><h1>{authMode === 'login' ? 'Sign in to your projects.' : 'Create your workspace.'}</h1><p>See your projects, progress, and next steps in one place.</p></section><div className="business-access-panel"><PublicAuthPanel mode={authMode} onModeChange={(nextMode) => navigate(nextMode === 'login' ? '/business/login' : '/business/register', { replace: true })} accountType="BUSINESS" /></div></div>
      ) : (
        <div className="business-contact-layout">
          <section className="business-contact-intro"><p className="business-eyebrow">BUSINESS RESEARCH</p><h1>Turn your next question into useful evidence.</h1><p>Tell us what you need to learn. We will help you find the right research route for your team.</p></section>
          <form className="business-contact-form" onSubmit={submit}>
            <label>What would you like to research?<textarea name="content" value={form.content} onChange={update} placeholder="The decision, audience, and question you need to answer." minLength="20" maxLength="1800" required /></label>
            <div className="business-contact-grid"><label>Contact email<input name="email" type="email" autoComplete="email" value={form.email} onChange={update} placeholder="you@organisation.com" required /></label><label>Name<input name="name" autoComplete="name" value={form.name} onChange={update} placeholder="Your name" required /></label><label>Organisation type<select name="organizationType" value={form.organizationType} onChange={update} required><option value="">Select one</option><option value="Business">Business</option><option value="Research or education">Research or education</option><option value="Nonprofit or public organisation">Nonprofit or public organisation</option><option value="Independent researcher">Independent researcher</option></select></label><label>Region<select name="region" autoComplete="country" value={form.region} onChange={update} required>{countryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {country.label}</option>)}</select></label><label>Phone number <em>Optional</em><span className="business-phone-input"><select name="phoneCountry" value={form.phoneCountry} onChange={update} aria-label="Phone country or territory">{phoneCountryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {country.dialCode}</option>)}</select><input name="phone" type="tel" inputMode="tel" autoComplete="tel-national" value={form.phone} onChange={update} placeholder="Phone number" maxLength="32" /></span></label></div>
            {message && <p className="business-contact-message">{message}</p>}
            <button className="business-button" type="submit" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={17} /> : 'Send enquiry'} {!submitting && <ArrowRight size={17} />}</button>
          </form>
        </div>
      )}
    </main>
  );
}
