import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LoaderCircle } from 'lucide-react';
import PublicAuthPanel from '../components/PublicAuthPanel';
import PublicSiteHeader from '../components/PublicSiteHeader';
import AuthTopBar from '../components/AuthTopBar';
import { submitBusinessInquiry } from '../api/realApi';
import { countryFlag, countryLabel, countryOptions, phoneCountryOptions } from '../constants/panelProfileOptions';
import researcherRegistrationTeam from '../assets/business/researcher-registration-team.jpg';
import contactSalesCity from '../assets/business/contact-sales-city.jpg';
import { HomeFooter } from '../components/HomeLegacySections';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';

const initialForm = { content: '', email: '', name: '', organizationType: '', phoneCountry: 'US', phone: '', region: 'US' };

export default function BusinessAccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.workspace.business.access;
  // Copy that used to be hardcoded English in this file now comes from the
  // language library, keyed by language.
  const workspaceStaticMap = publicCopy?.workspace?.business?.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};
  const authMode = location.pathname.endsWith('/login') ? 'login' : location.pathname.endsWith('/register') ? 'register' : null;
  // Carried over from the homepage entry (2026-10-25); the panel seeds both
  // forms with it, and switching mode keeps it in the URL.
  const initialEmail = new URLSearchParams(location.search).get('email') || '';
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
      setMessage(ws.access.sent);
    } catch (error) {
      setMessage(error.response?.data?.message || ws.access.sendError);
    } finally {
      setSubmitting(false);
    }
  };

  /* 登录／注册（用户 2026-10-17）：改成参与端登录页的形式 —— 顶部一条导航，左边是表单，
     右边是整幅满高的照片，标题文案压在照片上。两页共用研究端注册页那张
     researcher-registration-team.jpg（登录页不再单用 researcher-login-mobile.jpg）。

     联系页（/business/access）2026-10-24 并进公开页新壳：它原先是唯一没有
     `PublicSiteHeader` 的公开页（只有一行「← Back」），卡片还带着绿玻璃底、
     圆角和阴影。现在与其它公开页同一个壳：黑导航、白底、1120 版心、直角；
     标题与说明从照片上移到白纸，照片作为左栏下方的配图。 */
  return authMode ? (
    <>
      <main className={`business-access-page business-login-page business-login-page--${authMode}`}>
        {/* 2026-10-26：和参与端一致——只留品牌标 + 右侧返回，照片上不再压字。 */}
        <AuthTopBar backLabel={publicCopy.chrome.header.back || 'Back'} />
        <div className="business-login-shell">
          <section className="business-login-form" aria-label="Account access">
            <PublicAuthPanel mode={authMode} onModeChange={(nextMode) => navigate(`${withLanguage(nextMode === 'login' ? '/business/login' : '/business/register', language)}${initialEmail ? `&email=${encodeURIComponent(initialEmail)}` : ''}`, { replace: true })} accountType="BUSINESS" initialEmail={initialEmail} />
          </section>
          <section className="business-login-intro" aria-labelledby="business-login-title">
            <img src={researcherRegistrationTeam} alt="" aria-hidden="true" decoding="async" />
            <div>
              <p className="business-eyebrow">{copy.eyebrow}</p>
              <h1 id="business-login-title">{authMode === 'login' ? copy.loginTitle : copy.registerTitle}</h1>
              <p>{authMode === 'login' ? copy.loginIntro : copy.registerIntro}</p>
            </div>
          </section>
        </div>
      </main>
    </>
  ) : (
    <>
    <main className="business-access-page business-contact-page">
      <PublicSiteHeader />
      <section className="business-contact-shell">
        <div className="business-contact-columns">
          <div className="business-contact-intro">
            <p className="business-eyebrow">{ws.access.contactEyebrow}</p>
            <h1>{ws.access.contactTitle}</h1>
            <p className="business-contact-lede">{ws.access.contactIntro}</p>
          </div>
          <form className="business-contact-form" onSubmit={submit}>
          <label>{ws.access.questionLabel}<textarea name="content" value={form.content} onChange={update} placeholder={ws.access.questionPlaceholder} minLength="20" maxLength="1800" required /></label>
          <div className="business-contact-grid"><label>{ws.access.contactEmail}<input name="email" type="email" autoComplete="email" value={form.email} onChange={update} placeholder={ws.access.emailPlaceholder} required /></label><label>{ws.access.nameLabel}<input name="name" autoComplete="name" value={form.name} onChange={update} placeholder={ws.access.namePlaceholder} required /></label><label>{ws.access.organisationType}<select name="organizationType" value={form.organizationType} onChange={update} required><option value="">{ws.access.selectOne}</option><option value="Business">{ws.access.orgBusiness}</option><option value="Research or education">{ws.access.orgResearch}</option><option value="Nonprofit or public organisation">{ws.access.orgNonprofit}</option><option value="Independent researcher">{ws.access.orgIndependent}</option></select></label><label>{ws.access.regionLabel}<select name="region" autoComplete="country" value={form.region} onChange={update} required>{countryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {country.label}</option>)}</select></label><label className="business-contact-phone-field"><span className="business-contact-phone-label">{ws.access.phoneLabel} <em>{ws.access.optional}</em></span><span className="business-phone-input"><select name="phoneCountry" value={form.phoneCountry} onChange={update} aria-label={ws.access.phoneCountryAria}>{phoneCountryOptions.map((country) => <option key={country.value} value={country.value}>{countryFlag(country.value)} {country.label} ({country.dialCode})</option>)}</select><input name="phone" type="tel" inputMode="tel" autoComplete="tel-national" value={form.phone} onChange={update} placeholder={ws.access.phonePlaceholder} maxLength="32" /></span></label></div>
          {message && <p className="business-contact-message">{message}</p>}
          <button className="business-button" type="submit" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={17} /> : ws.access.send} {!submitting && <ArrowRight size={17} />}</button>
        </form>
          <figure className="business-contact-figure"><img src={contactSalesCity} alt="" decoding="async" /></figure>
        </div>
      </section>
    </main>
    <HomeFooter />
    </>
  );
}
