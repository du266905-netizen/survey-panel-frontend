import { useState } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle, Paperclip, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import heroImage from '../assets/business/custom-questionnaire-hero.jpg';
import './BusinessCustomQuestionnaire.css';

const initialRequest = {
  title: '', researchGoal: '', audienceDescription: '', countries: '', languages: '',
  estimatedMinutes: '', targetParticipants: '', timeline: '', additionalContext: '',
};

export default function BusinessCustomQuestionnaireRequest() {
  const { language, publicCopy } = useLanguage();
  const requests = publicCopy?.workspace?.business?.customRequest || {};
  const copy = requests[language] || requests['en-US'] || {};
  const navigate = useNavigate();
  const location = useLocation();
  const preparedRequest = location.state?.preparedRequest;
  const [request, setRequest] = useState(() => ({ ...initialRequest, ...(preparedRequest || {}) }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [attachments, setAttachments] = useState([null, null]);
  const [attachmentError, setAttachmentError] = useState('');
  const attachmentCopy = language.startsWith('zh') ? {
    title: '附件',
    hint: '如果你有文件需要发送。',
    note: '每个文件不超过 5MB，格式为 PDF 或 Word 文档。',
    optional: '选填',
    choose: '选择文件',
    replace: '更换',
    remove: '移除',
    slot1: '附件 1',
    slot2: '附件 2',
    typeError: '仅支持 PDF 或 Word 文档。',
    sizeError: '文件不能超过 5MB。',
  } : {
    title: 'Attachments',
    hint: 'If you have files to send.',
    note: 'Up to 5 MB each. PDF or Word document.',
    optional: 'Optional',
    choose: 'Choose file',
    replace: 'Replace',
    remove: 'Remove',
    slot1: 'Attachment 1',
    slot2: 'Attachment 2',
    typeError: 'Only PDF or Word documents are supported.',
    sizeError: 'Each file must be 5 MB or less.',
  };
  const formatSize = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  const update = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));
  const updateAttachment = (index, file) => {
    setAttachmentError('');
    if (!file) {
      setAttachments((current) => current.map((item, itemIndex) => itemIndex === index ? null : item));
      return;
    }
    const isDoc = /\.(pdf|doc|docx)$/i.test(file.name);
    if (!isDoc) {
      setAttachmentError(attachmentCopy.typeError);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setAttachmentError(attachmentCopy.sizeError);
      return;
    }
    setAttachments((current) => current.map((item, itemIndex) => itemIndex === index ? file : item));
  };
  const topbarLabel = language.startsWith('zh')
    ? (language === 'zh-Hant' ? '定製調查研究' : '定制调查研究')
    : 'CUSTOM SURVEY RESEARCH';
  const goWorkspace = () => navigate(withLanguage('/business/workspace?view=projects', language));

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    if (request.title.trim().length < 3 || request.researchGoal.trim().length < 20 || request.audienceDescription.trim().length < 10) {
      setError(copy.stepOneError || copy.error);
      return;
    }
    setSubmitting(true);
    setError('');
    const attachmentSummary = attachments
      .filter(Boolean)
      .map((file, index) => `Attachment ${index + 1}: ${file.name} (${formatSize(file.size)})`)
      .join('\n');
    const additionalContext = [String(request.additionalContext || '').trim(), attachmentSummary]
      .filter(Boolean)
      .join('\n\n')
      .slice(0, 1800);
    try {
      await createBusinessProject({
        ...request,
        additionalContext,
        studyFormat: 'SURVEY',
        serviceCategory: 'CUSTOM_RESEARCH',
        targetParticipants: request.targetParticipants ? Number(request.targetParticipants) : undefined,
        estimatedMinutes: request.estimatedMinutes ? Number(request.estimatedMinutes) : undefined,
        incentiveBudget: 'NEED_GUIDANCE',
        selfServiceQuestionnaire: false,
      });
      navigate(withLanguage('/business/workspace?view=projects', language), { state: { customSubmitted: true } });
    } catch {
      setError(copy.error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="business-custom-page">
      <header className="business-custom-topbar">
        <button type="button" onClick={goWorkspace}>
          <ArrowLeft size={16} /> {copy.back}
        </button>
        <span>{topbarLabel}</span>
      </header>

      <section className="business-custom-hero">
        <img src={heroImage} alt="" decoding="async" />
        <div className="business-custom-hero-copy">
          <h1>{copy.title}</h1>
        </div>
      </section>

      <section className="business-custom-body">
        <div className="business-custom-intro">
          <h2>{copy.modalTitle}</h2>
          <p>{copy.modalBody}</p>
          {Array.isArray(copy.modalSteps) && copy.modalSteps.length > 0 && (
            <ol className="business-custom-steps">
              {copy.modalSteps.map((item, index) => (
                <li key={item}>
                  <b>{String(index + 1).padStart(2, '0')}</b>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          )}
        </div>

        <form id="business-custom-questionnaire-form" className="business-custom-form" onSubmit={submit}>
          <section className="business-custom-section">
            <div className="business-custom-grid">
              <label className="is-full">
                {copy.project}
                <input name="title" value={request.title} onChange={update} placeholder={copy.projectHint} required />
              </label>
              <label className="is-full">
                {copy.decision}
                <textarea name="researchGoal" value={request.researchGoal} onChange={update} placeholder={copy.decisionHint} required />
              </label>
              <label className="is-full">
                {copy.audience}
                <textarea name="audienceDescription" value={request.audienceDescription} onChange={update} placeholder={copy.audienceHint} required />
              </label>
              <label>
                {copy.market}
                <input name="countries" value={request.countries} onChange={update} placeholder={copy.marketHint} />
              </label>
              <label>
                {copy.language}
                <input name="languages" value={request.languages} onChange={update} placeholder={copy.languageHint} />
              </label>
            </div>
          </section>

          <section className="business-custom-section business-custom-section--scope">
            <div className="business-custom-section-head">
              <h2>{copy.stepTwoTitle}</h2>
              <p>{copy.stepTwoIntro}</p>
            </div>
            <div className="business-custom-grid business-custom-grid--three">
              <label>
                {copy.minutes}
                <input name="estimatedMinutes" type="number" min="1" value={request.estimatedMinutes} onChange={update} />
              </label>
              <label>
                {copy.sample}
                <input name="targetParticipants" type="number" min="1" value={request.targetParticipants} onChange={update} />
                <small>{copy.sampleHint}</small>
              </label>
              <label>
                {copy.timing}
                <input name="timeline" value={request.timeline} onChange={update} placeholder={copy.timingHint} />
              </label>
              <label className="is-full">
                {copy.context}
                <textarea name="additionalContext" value={request.additionalContext} onChange={update} placeholder={copy.contextHint} />
              </label>
            </div>
          </section>

          <section className="business-custom-attachments">
            <div className="business-custom-section-head">
              <h2>{attachmentCopy.title} <span>{attachmentCopy.optional}</span></h2>
              <p>{attachmentCopy.hint}</p>
            </div>
            <div className="business-custom-attachment-list">
              {[0, 1].map((index) => {
                const file = attachments[index];
                return (
                  <div className="business-custom-attachment-row" key={index}>
                    <span className="business-custom-attachment-icon"><Paperclip size={17} /></span>
                    <span className="business-custom-attachment-label">{index === 0 ? attachmentCopy.slot1 : attachmentCopy.slot2}</span>
                    {file ? (
                      <span className="business-custom-attachment-file">
                        <span>{file.name}</span>
                        <small>{formatSize(file.size)}</small>
                        <button type="button" onClick={() => updateAttachment(index, null)} aria-label={attachmentCopy.remove}><X size={14} /></button>
                      </span>
                    ) : (
                      <label className="business-custom-attachment-pick">
                        {attachmentCopy.choose}
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          onChange={(event) => updateAttachment(index, event.target.files?.[0] || null)}
                        />
                      </label>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="business-custom-attachment-note">{attachmentCopy.note}</p>
            {attachmentError && <p className="business-custom-error" role="alert">{attachmentError}</p>}
          </section>

          {error && <p className="business-custom-error" role="alert">{error}</p>}

          <footer className="business-custom-actions">
            <button type="submit" className="business-custom-submit" disabled={submitting}>
              {submitting ? <LoaderCircle className="animate-spin" size={16} /> : copy.submit}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
