import { useMemo, useState } from 'react';
import { AlertCircle, ArrowLeft, ArrowRight, Check, FileText, LoaderCircle, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import { DOCUMENT_MOCK_CASES, analyzeDocumentMock } from '../ai/documentIntakeMock';
import { AI_DOCUMENT_MODE, analyzeDocumentIntake } from '../ai/documentIntakeClient';
import './BusinessAiDocumentIntake.css';

const MAX_BYTES = 10 * 1024 * 1024;
const SUPPORTED = ['.pdf', '.docx', '.txt'];
const DRAFT_KEY = 'guanyisearch.business-ai-brief.draft.v3';
const GENERATION_KEY = 'guanyisearch.business-ai-brief.generation.v1';

const emptyDraft = {
  decision: '', audience: '', serviceCategory: '', studyFormat: '', market: '', sample: '',
};

function toFormDraft(draft = {}) {
  return {
    decision: draft.decision || '',
    audience: draft.audience || '',
    serviceCategory: draft.serviceCategory || '',
    studyFormat: draft.studyFormat || '',
    market: draft.market || '',
    sample: draft.sample === null || draft.sample === undefined ? '' : String(draft.sample),
  };
}

const caseLabels = {
  'research-brief-to-editable-draft': 'Convertible research brief',
  'research-theme-needs-details': 'Theme needs more detail',
  'sensitive-content-refused-before-model': 'Sensitive content refused',
  'consent-required-before-upload': 'Consent required',
  'unsupported-file-rejected': 'Unsupported file',
  'unreadable-document-rejected': 'Unreadable document',
  'analysis-unavailable-keeps-no-artifact': 'Analysis unavailable',
};

function getCopy(language) {
  if (String(language || '').startsWith('zh')) {
    return {
      back: '返回 AI brief',
      eyebrow: '文档转 brief',
      title: '把文档变成可编辑的研究 brief。',
      intro: '上传一份文本型文档，我们会提炼出研究决策和受众，交回 AI brief 让你确认。这里不会创建或发布问卷。',
      consentTitle: '上传前，请确认文档如何使用',
      consentPoints: [
        '文件只用于生成本次可编辑研究 brief。',
        '分析完成后不长期保留原文件；不会自动创建、发布或招募。',
        '为完成分析，提取的文本会发送给模型服务处理。',
      ],
      consentCheck: '我已阅读并同意上述处理方式。',
      uploadTitle: '上传文档',
      uploadHint: '仅支持文本型 PDF、DOCX、TXT，最大 10 MB。扫描件、图片、加密文件和远程链接不支持。',
      choose: '选择文件',
      replace: '更换文件',
      analyze: '分析文档',
      analyzing: '正在分析文档…',
      mock: 'Mock 用例（开发）',
      mockHint: 'Mock 只回放冻结夹具，不读取真实文件内容。',
      summary: '摘要',
      briefTitle: '可编辑 brief',
      needsDetails: '文档里有一个研究主题，但还不足以安全确定目标或受众。请补充下面的字段。',
      missing: '还差',
      decision: '决策',
      audience: '受众',
      serviceCategory: '服务类型',
      studyFormat: '研究方法',
      market: '市场',
      sample: '样本',
      notSet: '未填',
      serviceNone: '未选择',
      serviceSurvey: '问卷',
      serviceCustom: '定制研究',
      serviceQualitative: '定性研究支持',
      methodNone: '未选择',
      methodSurvey: '问卷',
      methodInterview: '访谈',
      methodGroup: '焦点小组',
      methodUsability: '可用性测试',
      methodOther: '其他',
      continue: '继续到 AI brief',
      continueHint: '只会带入 brief，不会创建项目。',
      refuseTitle: '这份文档不能用于生成问卷。',
      refuseBody: '文档包含敏感或不适用的内容。我们没有保留或展示文档原文。你可以重新开始，或直接填写研究 brief。',
      startOver: '重新开始',
      manual: '直接填表',
      retry: '重试',
      fileTooLarge: '文件超过 10 MB。',
      fileUnsupported: '仅支持文本型 PDF、DOCX、TXT。',
      fileInvalid: '请重新选择一个文件。',
      errorTitles: {
        AI_DOCUMENT_PROCESSING_CONSENT_REQUIRED: '需要先确认数据处理说明。',
        AI_DOCUMENT_INVALID: '文件无法识别，请重新选择。',
        AI_DOCUMENT_TOO_LARGE: '文件超过 10 MB。',
        AI_DOCUMENT_UNSUPPORTED: '不支持这种文件类型。',
        AI_DOCUMENT_UNREADABLE: '文件无法被安全读取；改后缀重试没有帮助。',
        AI_DOCUMENT_RATE_LIMITED: '分析请求太频繁，请稍等再试。',
        AI_DOCUMENT_ANALYSIS_INVALID: '分析结果不安全，没有生成 brief。',
        AI_DOCUMENT_ANALYSIS_UNAVAILABLE: '文档分析暂时不可用。',
      },
      errorBody: '你可以重试，或直接填写研究 brief。',
    };
  }
  return {
    back: 'Back to AI brief',
    eyebrow: 'Document to brief',
    title: 'Turn a document into an editable research brief.',
    intro: 'Upload one text-based document. We extract the decision and audience, then hand an editable brief back to AI brief. No questionnaire is created or published here.',
    consentTitle: 'Before you upload',
    consentPoints: [
      'The file is used only to prepare this editable research brief.',
      'The original file is not retained long-term after analysis; no project, questionnaire, recruitment, or publication is created automatically.',
      'To analyze it, the extracted text is sent to the model service for processing.',
    ],
    consentCheck: 'I have read and agree to this processing.',
    uploadTitle: 'Upload a document',
    uploadHint: 'Text PDF, DOCX, or TXT, up to 10 MB. Scans, images, encrypted files, and remote links are not supported.',
    choose: 'Choose file',
    replace: 'Replace file',
    analyze: 'Analyze document',
    analyzing: 'Analyzing document…',
    mock: 'Mock case (dev)',
    mockHint: 'Mock replays the frozen fixtures; it does not read real file content.',
    summary: 'Summary',
    briefTitle: 'Editable brief',
    needsDetails: 'The document contains a research theme, but not enough to safely determine the decision or audience. Complete the fields below.',
    missing: 'Still needed',
    decision: 'Decision',
    audience: 'Audience',
    serviceCategory: 'Service type',
    studyFormat: 'Research method',
    market: 'Market',
    sample: 'Sample',
    notSet: 'Not set',
    serviceNone: 'Not selected',
    serviceSurvey: 'Survey',
    serviceCustom: 'Custom research',
    serviceQualitative: 'Qualitative research support',
    methodNone: 'Not selected',
    methodSurvey: 'Survey',
    methodInterview: 'Interview',
    methodGroup: 'Group discussion',
    methodUsability: 'Usability test',
    methodOther: 'Other',
    continue: 'Continue to AI brief',
    continueHint: 'Only the brief is carried over; no project is created.',
    refuseTitle: 'This document cannot be used for a questionnaire.',
    refuseBody: 'It contains sensitive or unsuitable content. We did not retain or display the document text. Start over, or fill in the research brief manually.',
    startOver: 'Start over',
    manual: 'Fill in manually',
    retry: 'Retry',
    fileTooLarge: 'The file is larger than 10 MB.',
    fileUnsupported: 'Only text PDF, DOCX, and TXT are supported.',
    fileInvalid: 'Choose the file again.',
    errorTitles: {
      AI_DOCUMENT_PROCESSING_CONSENT_REQUIRED: 'Confirm the processing notice first.',
      AI_DOCUMENT_INVALID: 'The file was not recognized. Choose it again.',
      AI_DOCUMENT_TOO_LARGE: 'The file is larger than 10 MB.',
      AI_DOCUMENT_UNSUPPORTED: 'This file type is not supported.',
      AI_DOCUMENT_UNREADABLE: 'The file could not be read safely. Renaming it will not help.',
      AI_DOCUMENT_RATE_LIMITED: 'Too many analysis requests. Wait a moment and retry.',
      AI_DOCUMENT_ANALYSIS_INVALID: 'The analysis result was not safe, so no brief was created.',
      AI_DOCUMENT_ANALYSIS_UNAVAILABLE: 'Document analysis is temporarily unavailable.',
    },
    errorBody: 'Retry, or fill in the research brief manually.',
  };
}

export default function BusinessAiDocumentIntake() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const copy = useMemo(() => getCopy(language), [language]);
  const [consent, setConsent] = useState(false);
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [mockCase, setMockCase] = useState(DOCUMENT_MOCK_CASES[0].id);
  const [stage, setStage] = useState('idle');
  const [result, setResult] = useState(null);
  const [brief, setBrief] = useState(emptyDraft);
  const [error, setError] = useState(null);

  const labels = useMemo(() => Object.fromEntries(
    DOCUMENT_MOCK_CASES.map((item) => [item.id, caseLabels[item.id] || item.id]),
  ), []);

  const pickFile = (nextFile) => {
    setFileError('');
    setError(null);
    setResult(null);
    setStage('idle');
    if (!nextFile) {
      setFile(null);
      return;
    }
    const name = String(nextFile.name || '').toLowerCase();
    if (!SUPPORTED.some((extension) => name.endsWith(extension))) {
      setFile(null);
      setFileError(copy.fileUnsupported);
      return;
    }
    if (nextFile.size > MAX_BYTES) {
      setFile(null);
      setFileError(copy.fileTooLarge);
      return;
    }
    setFile(nextFile);
  };

  const startOver = () => {
    setFile(null);
    setFileError('');
    setStage('idle');
    setResult(null);
    setBrief(emptyDraft);
    setError(null);
  };

  const saveBrief = () => {
    const nextDraft = {
      decision: brief.decision.trim() || null,
      audience: brief.audience.trim() || null,
      serviceCategory: brief.serviceCategory || null,
      studyFormat: brief.studyFormat || null,
      market: brief.market.trim() || null,
      sample: brief.sample ? Number(String(brief.sample).replace(/[^0-9]/g, '')) : null,
    };
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({
        conversationId: `document-${Date.now()}`,
        draft: { ...nextDraft, assumptions: [] },
        messages: [],
        action: null,
        missing: [],
        assumptions: [],
        updatedAt: Date.now(),
      }));
      localStorage.removeItem(GENERATION_KEY);
    } catch {
      /* Restricted browser context. */
    }
    navigate(withLanguage('/business/ai-brief', language));
  };

  const analyze = async () => {
    if (!consent) {
      setError({ code: 'AI_DOCUMENT_PROCESSING_CONSENT_REQUIRED' });
      return;
    }
    if (AI_DOCUMENT_MODE === 'api' && !file) {
      setFileError(copy.fileInvalid);
      return;
    }
    setStage('analyzing');
    setError(null);
    setResult(null);
    try {
      const response = AI_DOCUMENT_MODE === 'api'
        ? await analyzeDocumentIntake({ file, responseLanguage: language.startsWith('zh') ? 'zh' : 'en' })
        : await analyzeDocumentMock(mockCase, language);
      setResult(response);
      setBrief(toFormDraft(response.draft));
      setStage('result');
    } catch (failure) {
      const code = failure?.response?.data?.code || failure?.code || 'AI_DOCUMENT_ANALYSIS_UNAVAILABLE';
      setError({ code });
      setStage('idle');
    }
  };

  const updateBrief = (event) => {
    setBrief((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  return (
    <main className="business-doc-page">
      <header className="business-doc-topbar">
        <button type="button" onClick={() => navigate(withLanguage('/business/ai-brief', language))}>
          <ArrowLeft size={16} /> {copy.back}
        </button>
        <span>{copy.eyebrow}</span>
      </header>

      <section className="business-doc-body">
        <div className="business-doc-intro">
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>

        {!result && !error && (
          <>
            <section className="business-doc-consent">
              <h2>{copy.consentTitle}</h2>
              <ul>{copy.consentPoints.map((item) => <li key={item}>{item}</li>)}</ul>
              <label>
                <input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
                <span>{copy.consentCheck}</span>
              </label>
            </section>

            <section className="business-doc-upload">
              <div className="business-doc-upload-head">
                <h2>{copy.uploadTitle}</h2>
                <p>{copy.uploadHint}</p>
              </div>
              <div className="business-doc-file-row">
                <span className="business-doc-file-icon"><FileText size={20} /></span>
                <span className="business-doc-file-copy">
                  <strong>{file ? file.name : copy.choose}</strong>
                  <small>{file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : copy.uploadHint}</small>
                </span>
                <label className="business-doc-file-pick">
                  {file ? copy.replace : copy.choose}
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                    onChange={(event) => pickFile(event.target.files?.[0] || null)}
                  />
                </label>
              </div>
              {fileError && <p className="business-doc-inline-error" role="alert">{fileError}</p>}
              {AI_DOCUMENT_MODE === 'mock' && (
                <div className="business-doc-mock">
                  <label>
                    {copy.mock}
                    <select value={mockCase} onChange={(event) => setMockCase(event.target.value)}>
                      {DOCUMENT_MOCK_CASES.map((item) => <option value={item.id} key={item.id}>{labels[item.id]}</option>)}
                    </select>
                  </label>
                  <small>{copy.mockHint}</small>
                </div>
              )}
              <button type="button" className="business-doc-primary" onClick={analyze} disabled={!consent || (AI_DOCUMENT_MODE === 'api' && !file) || stage === 'analyzing'} aria-busy={stage === 'analyzing'}>
                {stage === 'analyzing' ? <LoaderCircle className="animate-spin" size={16} /> : copy.analyze}
                {stage !== 'analyzing' && <ArrowRight size={16} />}
              </button>
            </section>
          </>
        )}

        {stage === 'analyzing' && (
          <section className="business-doc-state" aria-live="polite">
            <LoaderCircle className="animate-spin" size={24} />
            <p>{copy.analyzing}</p>
          </section>
        )}

        {error && (
          <section className="business-doc-state business-doc-state--error" role="alert">
            <span className="business-doc-state-icon"><AlertCircle size={24} /></span>
            <h2>{copy.errorTitles[error.code] || copy.errorTitles.AI_DOCUMENT_ANALYSIS_UNAVAILABLE}</h2>
            <p>{copy.errorBody}</p>
            <div className="business-doc-actions">
              <button type="button" className="business-doc-primary" onClick={analyze}>{copy.retry} <ArrowRight size={16} /></button>
              <button type="button" className="business-doc-quiet" onClick={() => navigate(withLanguage('/business/custom-questionnaire', language))}>{copy.manual}</button>
              <button type="button" className="business-doc-quiet" onClick={startOver}>{copy.startOver}</button>
            </div>
          </section>
        )}

        {result?.outcome === 'REFUSE' && (
          <section className="business-doc-state business-doc-state--refuse">
            <span className="business-doc-state-icon"><ShieldAlert size={26} /></span>
            <h2>{copy.refuseTitle}</h2>
            <p>{copy.refuseBody}</p>
            <div className="business-doc-actions">
              <button type="button" className="business-doc-primary" onClick={startOver}>{copy.startOver} <ArrowRight size={16} /></button>
              <button type="button" className="business-doc-quiet" onClick={() => navigate(withLanguage('/business/custom-questionnaire', language))}>{copy.manual}</button>
            </div>
          </section>
        )}

        {(result?.outcome === 'BRIEF' || result?.outcome === 'NEEDS_DETAILS') && (
          <section className="business-doc-result">
            {result.summary && <div className="business-doc-summary"><p>{copy.summary}</p><span>{result.summary}</span></div>}
            {result.outcome === 'NEEDS_DETAILS' && <p className="business-doc-note">{copy.needsDetails}</p>}
            {result.missing?.length > 0 && <p className="business-doc-note">{copy.missing}: {result.missing.map((field) => copy[field] || field).join(' · ')}</p>}
            <div className="business-doc-brief">
              <header><h2>{copy.briefTitle}</h2><span>{result.source?.kind || ''}</span></header>
              <div className="business-doc-grid">
                <label className="is-full">{copy.decision}<textarea name="decision" value={brief.decision} onChange={updateBrief} /></label>
                <label className="is-full">{copy.audience}<textarea name="audience" value={brief.audience} onChange={updateBrief} /></label>
                <label>{copy.serviceCategory}
                  <select name="serviceCategory" value={brief.serviceCategory} onChange={updateBrief}>
                    <option value="">{copy.serviceNone}</option>
                    <option value="SURVEY">{copy.serviceSurvey}</option>
                    <option value="CUSTOM_RESEARCH">{copy.serviceCustom}</option>
                    <option value="QUALITATIVE_SUPPORT">{copy.serviceQualitative}</option>
                  </select>
                </label>
                <label>{copy.studyFormat}
                  <select name="studyFormat" value={brief.studyFormat} onChange={updateBrief}>
                    <option value="">{copy.methodNone}</option>
                    <option value="SURVEY">{copy.methodSurvey}</option>
                    <option value="INTERVIEW">{copy.methodInterview}</option>
                    <option value="GROUP_DISCUSSION">{copy.methodGroup}</option>
                    <option value="USABILITY_TEST">{copy.methodUsability}</option>
                    <option value="OTHER">{copy.methodOther}</option>
                  </select>
                </label>
                <label>{copy.market}<input name="market" value={brief.market} onChange={updateBrief} /></label>
                <label>{copy.sample}<input name="sample" value={brief.sample} onChange={updateBrief} inputMode="numeric" /></label>
              </div>
            </div>
            <div className="business-doc-actions">
              <button type="button" className="business-doc-primary" onClick={saveBrief}>{copy.continue} <ArrowRight size={16} /></button>
              <button type="button" className="business-doc-quiet" onClick={startOver}>{copy.startOver}</button>
            </div>
            <p className="business-doc-continue-hint"><Check size={14} /> {copy.continueHint}</p>
          </section>
        )}
      </section>
    </main>
  );
}
