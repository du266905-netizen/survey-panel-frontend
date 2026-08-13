import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react';
import PublicAuthPanel from '../components/PublicAuthPanel';
import { submitBusinessInquiry } from '../api/realApi';
import './Business.css';

const initialForm = { content: '', email: '', name: '', organizationType: '', region: '' };

export default function BusinessAccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname.endsWith('/login');
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
      await submitBusinessInquiry({ contactName: form.name, email: form.email, organizationType: form.organizationType, region: form.region, content: form.content });
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
      <Link className="business-access-brand" to="/business"><ArrowLeft size={16} /> Business research</Link>
      {isLogin ? (
        <div className="business-login-layout"><section><p className="business-eyebrow">CLIENT WORKSPACE</p><h1>Sign in to your projects.</h1><p>Review submitted work, project status, and agreed next steps in one place.</p></section><div className="business-access-panel"><PublicAuthPanel mode="login" onModeChange={() => navigate('/business/access', { replace: true })} accountType="BUSINESS" /></div></div>
      ) : (
        <div className="business-contact-layout">
          <section className="business-contact-intro"><p className="business-eyebrow">BUSINESS RESEARCH</p><h1>Tell us what you need to learn.</h1><p>For custom questionnaires, interviews, usability sessions, and focused studies. Send a concise outline and we will discuss the appropriate next step.</p><Link to="/business/login" className="business-text-link">Already a client? Sign in <ArrowRight size={15} /></Link></section>
          <form className="business-contact-form" onSubmit={submit}>
            <label>What would you like to research?<textarea name="content" value={form.content} onChange={update} placeholder="The decision, audience, and question you need to answer." minLength="20" maxLength="1800" required /></label>
            <div className="business-contact-grid"><label>Contact email<input name="email" type="email" autoComplete="email" value={form.email} onChange={update} placeholder="you@organisation.com" required /></label><label>Name<input name="name" autoComplete="name" value={form.name} onChange={update} placeholder="Your name" required /></label><label>Organisation type<select name="organizationType" value={form.organizationType} onChange={update} required><option value="">Select one</option><option value="Business">Business</option><option value="Research or education">Research or education</option><option value="Nonprofit or public organisation">Nonprofit or public organisation</option><option value="Independent researcher">Independent researcher</option></select></label><label>Region<input name="region" autoComplete="address-level1" value={form.region} onChange={update} placeholder="Country or region" required /></label></div>
            {message && <p className="business-contact-message">{message}</p>}
            <button className="business-button" type="submit" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={17} /> : 'Send enquiry'} {!submitting && <ArrowRight size={17} />}</button>
          </form>
        </div>
      )}
    </main>
  );
}
