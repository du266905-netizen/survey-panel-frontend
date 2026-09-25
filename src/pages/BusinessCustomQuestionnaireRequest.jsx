import { useState } from 'react';
import { ArrowLeft, ArrowRight, BarChart3, BrainCircuit, Check, ClipboardList, FileText, LayoutDashboard, LoaderCircle, LogOut, UserRound, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import NotificationBell from '../components/NotificationBell';
import BusinessLanguagePicker from '../components/BusinessLanguagePicker';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import serviceImage from '../assets/business/custom-questionnaire-service.jpg';
import './Business.css';

const initialRequest = {
  title: '', researchGoal: '', audienceDescription: '', countries: '', languages: '',
  estimatedMinutes: '', targetParticipants: '', timeline: '', additionalContext: '',
};

const text = {
  en: {
    eyebrow: 'CUSTOM QUESTIONNAIRE', title: 'Turn a question into evidence you can use.', intro: 'Tell us the decision, audience, and practical context. Your request remains private while our team reviews it.', stepOne: '01 · THE DECISION', stepOneTitle: 'What do you need to understand?', stepOneIntro: 'Start with the decision. We will use this to shape a considered questionnaire brief.', stepTwo: '02 · RESEARCH SCOPE', stepTwoTitle: 'Set the practical context.', stepTwoIntro: 'These estimates help review feasibility. They are not a commitment to price, timeline, or launch.', project: 'Project name', projectHint: 'For example: New product feedback', decision: 'What decision should this research support?', decisionHint: 'Describe the question, context, and how a useful answer would help your team decide.', audience: 'Who is your audience?', audienceHint: 'Describe the people whose perspective matters to this decision.', market: 'Market or community', marketHint: 'Country, market, city, or community. Optional.', language: 'Language or local-expression needs', languageHint: 'Optional. Tell us if wording needs local adaptation.', minutes: 'Expected questionnaire completion time', sample: 'Expected sample size', sampleHint: 'An initial estimate is enough. We will review feasibility with you.', timing: 'Preferred timing', timingHint: 'For example: within two weeks', context: 'Existing questionnaire, materials, or constraints', contextHint: 'Optional. Do not include personal contact details, confidential files, or sensitive information.', previous: 'Back', continue: 'Continue', submit: 'Send for review', submitting: 'Sending request…', back: 'Back to workspace', saved: 'Your custom questionnaire request is now in your project workspace for review.', error: 'We could not save this request. Please check the required details and try again.', modalEyebrow: 'A CLEARER WAY TO ASK', modalTitle: 'Rather than guessing, ask the people who matter.', modalBody: 'Need practical direction for a decision? Our custom questionnaire service turns your question into a reviewable questionnaire, then supports the collection and analysis of real responses after the scope is confirmed.', modalSteps: ['Share the decision and audience.', 'Our team reviews the request and confirms the next practical step.', 'You review the proposed questionnaire and request changes before it is used.', 'After approval and confirmation, responses and the research report are available in your workspace.'], start: 'Continue', later: 'Maybe later', ai: 'AI research guide', questionnaires: 'Questionnaire editor', projects: 'Projects', results: 'Results', account: 'Account', signOut: 'Sign out',
  },
  zh: {
    eyebrow: '定制问卷', title: '把你想知道的，变成可用的真实证据。', intro: '告诉我们你的决策问题、受众和实际背景。提交前，它始终只保留在你的工作区；团队会先审核需求。', stepOne: '01 · 决策与受众', stepOneTitle: '你想了解什么', stepOneIntro: '从需要做出的决策开始。我们会据此准备一份更有针对性的问卷需求。', stepOneError: '请先填写项目名称、决策问题和受众群体，再继续下一页。', stepTwo: '02 · 研究范围', stepTwoTitle: '补充实际背景。', stepTwoIntro: '这些预估用于评估可行性，不代表价格、周期或启动日期的承诺。', project: '项目名称', projectHint: '例如：新品上市反馈', decision: '这项研究最终要支持什么决策？', decisionHint: '描述问题、背景，以及一份有用的答案将如何帮助团队决策。', audience: '你的受众群体是哪些？', audienceHint: '描述哪些人的看法对这项决策最重要。', market: '市场或社群', marketHint: '国家、市场、城市或社群。选填。', language: '语言或本地表达需求', languageHint: '选填。如需本地化表述，可在这里说明。', minutes: '预计问卷完成时长（分钟）', sample: '预计样本数', sampleHint: '先给一个初步估计即可；我们会和你确认可行性。', timing: '希望何时获得答案', timingHint: '例如：两周内', context: '已有问卷、参考材料或限制条件', contextHint: '选填。请勿输入个人联系方式、保密文件或敏感信息。', previous: '返回', continue: '继续下一页', submit: '提交审核', submitting: '正在提交需求…', back: '返回工作区', saved: '定制问卷需求已保存到项目工作区，等待审核。', error: '暂时无法保存这份需求，请检查必填内容后重试。', modalEyebrow: '把猜测变成答案', modalTitle: '与其瞎猜，不如直接提问。', modalBody: '想更快捷、更有把握地获得决策建议？我们的定制问卷服务会把你的想法整理成可审核的研究需求，并在范围确认后，协助完成问卷设计、真实数据采集和研究分析。', modalSteps: ['告诉我们你要做出的决策，以及想听取谁的看法。', '团队先审核你的需求，并与你确认下一步。', '你可以查看问卷设计稿，并在正式使用前提出修改意见。', '在范围确认后开展采集与分析；完成后会在工作区通知你查看交付材料。'], start: '继续', later: '以后再说', ai: 'AI 研究引导', questionnaires: '问卷编辑器', projects: '项目', results: '结果', account: '账户', signOut: '退出登录',
  },
};

export default function BusinessCustomQuestionnaireRequest() {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const copy = language === 'zh-CN' ? text.zh : text.en;
  const navigate = useNavigate();
  const location = useLocation();
  const preparedRequest = location.state?.preparedRequest;
  const [request, setRequest] = useState(() => ({ ...initialRequest, ...(preparedRequest || {}) }));
  const [step, setStep] = useState(1);
  const [showIntro, setShowIntro] = useState(() => !preparedRequest);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const displayName = String(user?.displayName || user?.email?.split('@')[0] || 'A').trim();
  const update = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));
  const goWorkspace = (view = '') => navigate(withLanguage(`/business/workspace${view ? `?view=${view}` : ''}`, language));
  const goNext = () => { if (request.title.trim().length < 3 || request.researchGoal.trim().length < 20 || request.audienceDescription.trim().length < 10) { setError(copy.stepOneError || copy.error); return; } setError(''); setStep(2); };

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true); setError('');
    try {
      await createBusinessProject({
        ...request,
        studyFormat: 'SURVEY',
        targetParticipants: request.targetParticipants ? Number(request.targetParticipants) : undefined,
        estimatedMinutes: request.estimatedMinutes ? Number(request.estimatedMinutes) : undefined,
        incentiveBudget: 'NEED_GUIDANCE',
        selfServiceQuestionnaire: false,
      });
      navigate(withLanguage('/business/workspace?view=projects', language), { state: { message: copy.saved } });
    } catch {
      setError(copy.error);
    } finally { setSubmitting(false); }
  };

  return <main className="business-custom-request-page">
    <div className="business-custom-request-shell">
      <aside className="business-workspace-rail" aria-label="Workspace navigation">
        <img className="business-workspace-rail-mark" src="/guanyisearch-project-mark.png" alt="guanyisearch" />
        <button type="button" title={copy.back} aria-label={copy.back} onClick={() => goWorkspace()}><LayoutDashboard size={20} /></button>
        <button type="button" title={copy.ai} aria-label={copy.ai} onClick={() => navigate(withLanguage('/business/ai-brief', language))}><BrainCircuit size={20} /></button>
        <button type="button" title={copy.questionnaires} aria-label={copy.questionnaires} onClick={() => goWorkspace('questionnaires')}><ClipboardList size={20} /></button>
        <button className="is-active" type="button" title={copy.projects} aria-label={copy.projects}><FileText size={20} /></button>
        <button type="button" title={copy.results} aria-label={copy.results} onClick={() => goWorkspace('results')}><BarChart3 size={20} /></button>
        <BusinessLanguagePicker />
        <NotificationBell className="business-workspace-notification" />
        <div className="business-workspace-account"><button type="button" onClick={() => setAccountOpen((current) => !current)} aria-label={copy.account} aria-expanded={accountOpen}><UserRound size={20} /><span>{displayName.charAt(0).toUpperCase()}</span></button>{accountOpen && <div><strong>{displayName}</strong><span>{user?.email}</span><button type="button" onClick={() => navigate(withLanguage('/business/account', language))}><UserRound size={15} /> {copy.account}</button><button type="button" onClick={() => { logout(); navigate(withLanguage('/business/login', language)); }}><LogOut size={15} /> {copy.signOut}</button></div>}</div>
      </aside>
      <section className="business-custom-request-surface">
        <header><button type="button" onClick={() => goWorkspace()}><ArrowLeft size={16} /> {copy.back}</button><div><span>{copy.eyebrow}</span>{step === 1 ? <button type="button" className="business-button business-custom-request-next" onClick={goNext}>{copy.continue} <ArrowRight size={16} /></button> : <><button type="button" className="business-custom-request-quiet" onClick={() => { setError(''); setStep(1); }}>{copy.previous}</button><button className="business-button" type="submit" form="business-custom-questionnaire-form" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : copy.submit} {!submitting && <ArrowRight size={16} />}</button></>}</div></header>
        <form id="business-custom-questionnaire-form" className="business-custom-request-form" onSubmit={submit}>
          <div className="business-custom-request-heading"><p>{step === 1 ? copy.stepOne : copy.stepTwo}</p><h1>{step === 1 ? copy.stepOneTitle : copy.stepTwoTitle}{language === 'zh-CN' && step === 1 && <i className="business-custom-request-question-mark">？</i>}</h1><span>{step === 1 ? copy.stepOneIntro : copy.stepTwoIntro}</span></div>
          {step === 1 ? <section className="business-custom-request-fields"><label>{copy.project}<input name="title" value={request.title} onChange={update} placeholder={copy.projectHint} required /></label><label>{copy.decision}<textarea name="researchGoal" value={request.researchGoal} onChange={update} placeholder={copy.decisionHint} required /></label><label>{copy.audience}<textarea name="audienceDescription" value={request.audienceDescription} onChange={update} placeholder={copy.audienceHint} required /></label><div className="business-custom-request-grid"><label>{copy.market}<input name="countries" value={request.countries} onChange={update} placeholder={copy.marketHint} /></label><label>{copy.language}<input name="languages" value={request.languages} onChange={update} placeholder={copy.languageHint} /></label></div></section> : <section className="business-custom-request-fields"><div className="business-custom-request-grid"><label>{copy.minutes}<input name="estimatedMinutes" type="number" min="1" value={request.estimatedMinutes} onChange={update} /></label><label>{copy.sample}<input name="targetParticipants" type="number" min="1" value={request.targetParticipants} onChange={update} /><small>{copy.sampleHint}</small></label><label>{copy.timing}<input name="timeline" value={request.timeline} onChange={update} placeholder={copy.timingHint} /></label></div><label>{copy.context}<textarea name="additionalContext" value={request.additionalContext} onChange={update} placeholder={copy.contextHint} /></label></section>}
          {error && <p className="business-custom-request-error" role="alert">{error}</p>}
        </form>
      </section>
    </div>
    {showIntro && <div className="business-custom-intro-modal" role="dialog" aria-modal="true" aria-labelledby="custom-questionnaire-intro-title"><section><button className="business-custom-intro-close" type="button" onClick={() => setShowIntro(false)} aria-label={language === 'zh-CN' ? '关闭介绍' : 'Close introduction'}><X size={20} /></button><div className="business-custom-intro-copy"><p>{copy.modalEyebrow}</p><h2 id="custom-questionnaire-intro-title">{copy.modalTitle}</h2><span>{copy.modalBody}</span><ol>{copy.modalSteps.map((item, index) => <li key={item}><b>{String(index + 1).padStart(2, '0')}</b>{item}</li>)}</ol><div><button className="business-button business-custom-intro-continue" type="button" onClick={() => setShowIntro(false)}>{copy.start} <ArrowRight size={16} /></button><button type="button" onClick={() => goWorkspace()}>{copy.later}</button></div></div><figure><img src={serviceImage} alt="" /></figure></section></div>}
  </main>;
}
