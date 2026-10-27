import { useRef, useState } from 'react';
import { Paperclip, X } from 'lucide-react';
import { countryOptions } from '../constants/panelProfileOptions';
import { useLanguage } from './LanguageContext';

/* Application form for a single role.

   Fields follow the owner's reference (first name, last name, email, country,
   phone, CV, LinkedIn, salary expectation, a short statement). The visa and
   right-to-work questions are deliberately absent.

   There is no application endpoint yet, so submitting opens the mail client
   with everything already written and asks the applicant to attach the CV.
   When the endpoint exists, replace handleSubmit only. */

const COPY = {
  'zh-CN': {
    title: '申请这份工作',
    required: '* 表示必填字段',
    first: '名',
    last: '姓',
    email: '电子邮件',
    country: '国家',
    phone: '电话',
    cv: '简历／履历',
    cvHint: '支持 PDF、DOC、DOCX、TXT、RTF，最大 10 MB',
    choose: '选择文件',
    linkedin: 'LinkedIn 个人资料',
    salary: '您对这个职位的基本薪资期望是多少？',
    statement: '请简单描述你的经历，并说说对这个职位的看法。',
    submit: '提交申请',
    sent: '已打开邮件客户端，请附上简历文件后发送。',
    missing: '请填写所有必填项。',
    tooBig: '文件超过 10 MB。',
    wrongType: '只支持 PDF、DOC、DOCX、TXT、RTF。',
  },
  'zh-Hant': {
    title: '申請這份工作',
    required: '* 表示必填欄位',
    first: '名',
    last: '姓',
    email: '電子郵件',
    country: '國家',
    phone: '電話',
    cv: '履歷',
    cvHint: '支援 PDF、DOC、DOCX、TXT、RTF，最大 10 MB',
    choose: '選擇檔案',
    linkedin: 'LinkedIn 個人資料',
    salary: '您對這個職位的基本薪資期望是多少？',
    statement: '請簡單描述你的經歷，並說說對這個職位的看法。',
    submit: '提交申請',
    sent: '已開啟郵件用戶端，請附上履歷檔案後寄出。',
    missing: '請填寫所有必填欄位。',
    tooBig: '檔案超過 10 MB。',
    wrongType: '只支援 PDF、DOC、DOCX、TXT、RTF。',
  },
  'en-US': {
    title: 'Apply for this job',
    required: '* indicates a required field',
    first: 'First name',
    last: 'Last name',
    email: 'Email',
    country: 'Country',
    phone: 'Phone',
    cv: 'Résumé / CV',
    cvHint: 'PDF, DOC, DOCX, TXT or RTF, up to 10 MB',
    choose: 'Choose a file',
    linkedin: 'LinkedIn profile',
    salary: 'What is your basic salary expectation for this role?',
    statement: 'Describe your experience in short, and what you make of this role.',
    submit: 'Submit application',
    sent: 'Your mail client is open — attach the CV file and send.',
    missing: 'Please fill in every required field.',
    tooBig: 'That file is larger than 10 MB.',
    wrongType: 'Only PDF, DOC, DOCX, TXT and RTF are accepted.',
  },
  'en-GB': {
    title: 'Apply for this job',
    required: '* indicates a required field',
    first: 'First name',
    last: 'Last name',
    email: 'Email',
    country: 'Country',
    phone: 'Phone',
    cv: 'Résumé / CV',
    cvHint: 'PDF, DOC, DOCX, TXT or RTF, up to 10 MB',
    choose: 'Choose a file',
    linkedin: 'LinkedIn profile',
    salary: 'What is your basic salary expectation for this role?',
    statement: 'Describe your experience in short, and what you make of this role.',
    submit: 'Submit application',
    sent: 'Your mail client is open — attach the CV file and send.',
    missing: 'Please fill in every required field.',
    tooBig: 'That file is larger than 10 MB.',
    wrongType: 'Only PDF, DOC, DOCX, TXT and RTF are accepted.',
  },
};

const ACCEPT = '.pdf,.doc,.docx,.txt,.rtf';
const MAX_BYTES = 10 * 1024 * 1024;

export default function JobApplicationForm({ role }) {
  const { language } = useLanguage();
  const c = COPY[language] || COPY['en-US'];
  const fileInput = useRef(null);
  const [form, setForm] = useState({ first: '', last: '', email: '', country: 'CN', phone: '', linkedin: '', salary: '', statement: '' });
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const pick = (event) => {
    const chosen = event.target.files?.[0];
    if (!chosen) return;
    if (chosen.size > MAX_BYTES) { setStatus(c.tooBig); return; }
    if (!/\.(pdf|doc|docx|txt|rtf)$/i.test(chosen.name)) { setStatus(c.wrongType); return; }
    setStatus('');
    setFile(chosen);
  };

  const clearFile = () => {
    setFile(null);
    if (fileInput.current) fileInput.current.value = '';
  };

  const submit = (event) => {
    event.preventDefault();
    const required = [form.first, form.last, form.email, form.country, form.phone, form.linkedin, form.statement];
    if (required.some((value) => !String(value).trim()) || !file) {
      setStatus(c.missing);
      return;
    }
    const body = [
      `Role: ${role}`,
      `Name: ${form.first} ${form.last}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Country: ${form.country}`,
      `LinkedIn: ${form.linkedin}`,
      form.salary ? `Salary expectation: ${form.salary}` : '',
      '',
      form.statement,
      '',
      `CV attached as: ${file.name}`,
    ].filter(Boolean).join('\n');
    window.location.href = `mailto:careers@guanyi-media.com?subject=${encodeURIComponent(`Application — ${role}`)}&body=${encodeURIComponent(body)}`;
    setStatus(c.sent);
  };

  return (
    <form className="apply-form" onSubmit={submit} noValidate>
      <div className="apply-head">
        <h2>{c.title}</h2>
        <p>{c.required}</p>
      </div>

      <div className="apply-grid">
        <label className="apply-field">
          <span>{c.first}<b>*</b></span>
          <input value={form.first} onChange={set('first')} autoComplete="given-name" required />
        </label>
        <label className="apply-field">
          <span>{c.last}<b>*</b></span>
          <input value={form.last} onChange={set('last')} autoComplete="family-name" required />
        </label>
      </div>

      <label className="apply-field">
        <span>{c.email}<b>*</b></span>
        <input type="email" value={form.email} onChange={set('email')} autoComplete="email" required />
      </label>

      <div className="apply-grid">
        <label className="apply-field">
          <span>{c.country}<b>*</b></span>
          <select value={form.country} onChange={set('country')} required>
            {countryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="apply-field">
          <span>{c.phone}<b>*</b></span>
          <input type="tel" value={form.phone} onChange={set('phone')} autoComplete="tel" required />
        </label>
      </div>

      <div className="apply-field">
        <span>{c.cv}<b>*</b></span>
        <div className={`apply-drop${file ? ' has-file' : ''}`}>
          <input ref={fileInput} id="apply-cv" type="file" accept={ACCEPT} onChange={pick} />
          {file ? (
            <span className="apply-file">
              {file.name}
              <button type="button" onClick={clearFile} aria-label="remove"><X size={14} /></button>
            </span>
          ) : (
            <label className="apply-file-button" htmlFor="apply-cv">
              <Paperclip size={15} strokeWidth={1.7} aria-hidden="true" />
              {c.choose}
            </label>
          )}
        </div>
        <small className="apply-hint">{c.cvHint}</small>
      </div>

      <label className="apply-field">
        <span>{c.linkedin}<b>*</b></span>
        <input value={form.linkedin} onChange={set('linkedin')} required />
      </label>

      <label className="apply-field">
        <span>{c.salary}</span>
        <input value={form.salary} onChange={set('salary')} />
      </label>

      <label className="apply-field">
        <span>{c.statement}<b>*</b></span>
        <textarea rows={7} value={form.statement} onChange={set('statement')} required />
      </label>

      {status && <p className="apply-status" role="status">{status}</p>}

      <div className="apply-actions">
        <button type="submit">{c.submit}</button>
      </div>
    </form>
  );
}
