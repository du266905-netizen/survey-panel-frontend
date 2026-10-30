import { useState } from 'react';
import { ArrowLeft, ArrowRight, LoaderCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createBusinessProject } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import heroImage from '../assets/business/research-support-hero.jpg';
import './BusinessCustomQuestionnaire.css';

const initialRequest = {
  title: '', researchGoal: '', audienceDescription: '', studyFormat: 'INTERVIEW',
  countries: '', languages: '', targetParticipants: '', estimatedMinutes: '', timeline: '', additionalContext: '',
};

const copyByLanguage = {
  'zh-CN': {
    back: '返回工作区', eyebrow: '研究支持', title: '告诉我们你想了解什么。',
    intro: '访谈、焦点小组、可用性测试，或需要招募参与者的研究。先提交需求，我们会在范围确认后与你联系。',
    introTitle: '先确定研究要支持什么决策。', introBody: '我们会根据决策、受众和方法，评估可行的研究方案与下一步。',
    scopeTitle: '补充实际范围。', scopeIntro: '这些初步估计帮助我们评估可行性，不构成价格或时间承诺。',
    project: '项目名称', projectHint: '例如：会员续费研究',
    decision: '这项研究要支持什么决策？', decisionHint: '描述决策、背景，以及一个有用的答案会如何帮助团队。',
    audience: '你想听取谁的意见？', audienceHint: '描述最相关的人群、场景或经验。',
    method: '研究方法', interview: '访谈', group: '焦点小组', usability: '可用性测试', other: '其他',
    market: '市场或社区', marketHint: '国家、市场、城市或社区，选填。',
    language: '语言或本地表达需求', languageHint: '选填。如需本地化措辞，请说明。',
    participants: '目标参与人数', minutes: '单场预计时长（分钟）', timing: '期望时间', timingHint: '例如：两周内',
    context: '补充材料或约束', contextHint: '选填。不要包含个人联系方式、机密文件或敏感信息。',
    submit: '提交研究需求', submitting: '正在提交…',
    error: '请补全项目名称、决策和受众后再提交。',
    failed: '提交失败，请稍后重试。',
  },
};

const en = {
  back: 'Back to workspace', eyebrow: 'RESEARCH SUPPORT', title: 'Tell us what you need to understand.',
  intro: 'Interviews, group discussions, usability work, or a study that needs participant recruitment. Send the request first; we will confirm the scope with you.',
  introTitle: 'Start with the decision this research should support.', introBody: 'We will assess the decision, audience, and method to propose a feasible next step.',
  scopeTitle: 'Add the practical scope.', scopeIntro: 'These initial estimates help us assess feasibility; they are not a commitment to price or timeline.',
  project: 'Project name', projectHint: 'For example: Member renewal study',
  decision: 'What decision should this research support?', decisionHint: 'Describe the decision, context, and how a useful answer would help the team.',
  audience: 'Who do you need to hear from?', audienceHint: 'Describe the people, context, or experience that matters.',
  method: 'Research method', interview: 'Interview', group: 'Group discussion', usability: 'Usability test', other: 'Other',
  market: 'Market or community', marketHint: 'Country, market, city, or community. Optional.',
  language: 'Language or local-expression needs', languageHint: 'Optional. Tell us if wording needs local adaptation.',
  participants: 'Target participants', minutes: 'Estimated session minutes', timing: 'Preferred timing', timingHint: 'For example: within two weeks',
  context: 'Supporting material or context', contextHint: 'Optional. Do not include personal contact details, confidential files, or sensitive information.',
  submit: 'Send research request', submitting: 'Sending request…',
  error: 'Complete the project name, decision, and audience before submitting.',
  failed: 'The request could not be saved. Try again.',
};

export default function BusinessResearchSupportRequest() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const copy = language.startsWith('zh') ? copyByLanguage['zh-CN'] : en;
  const [request, setRequest] = useState(initialRequest);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const update = (event) => setRequest((current) => ({ ...current, [event.target.name]: event.target.value }));
  const goWorkspace = () => navigate(withLanguage('/business/workspace?view=projects', language));

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    if (request.title.trim().length < 3 || request.researchGoal.trim().length < 20 || request.audienceDescription.trim().length < 10) {
      setError(copy.error);
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      await createBusinessProject({
        ...request,
        serviceCategory: 'QUALITATIVE_SUPPORT',
        targetParticipants: request.targetParticipants ? Number(request.targetParticipants) : undefined,
        estimatedMinutes: request.estimatedMinutes ? Number(request.estimatedMinutes) : undefined,
        incentiveBudget: 'NEED_GUIDANCE',
        selfServiceQuestionnaire: false,
      });
      navigate(withLanguage('/business/workspace?view=projects', language), { state: { customSubmitted: true } });
    } catch {
      setError(copy.failed);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="business-custom-page">
      <header className="business-custom-topbar">
        <button type="button" onClick={goWorkspace}><ArrowLeft size={16} /> {copy.back}</button>
        <span>{copy.eyebrow}</span>
      </header>

      <section className="business-custom-hero">
        <img src={heroImage} alt="" decoding="async" />
        <div className="business-custom-hero-copy">
          <h1>{copy.title}</h1>
          <p>{copy.intro}</p>
        </div>
      </section>

      <section className="business-custom-body">
        <div className="business-custom-intro">
          <h2>{copy.introTitle}</h2>
          <p>{copy.introBody}</p>
        </div>

        <form id="business-research-support-form" className="business-custom-form" onSubmit={submit}>
          <section className="business-custom-section">
            <div className="business-custom-grid">
              <label className="is-full">{copy.project}<input name="title" value={request.title} onChange={update} placeholder={copy.projectHint} required /></label>
              <label className="is-full">{copy.decision}<textarea name="researchGoal" value={request.researchGoal} onChange={update} placeholder={copy.decisionHint} required /></label>
              <label className="is-full">{copy.audience}<textarea name="audienceDescription" value={request.audienceDescription} onChange={update} placeholder={copy.audienceHint} required /></label>
              <label>{copy.method}
                <select name="studyFormat" value={request.studyFormat} onChange={update}>
                  <option value="INTERVIEW">{copy.interview}</option>
                  <option value="GROUP_DISCUSSION">{copy.group}</option>
                  <option value="USABILITY_TEST">{copy.usability}</option>
                  <option value="OTHER">{copy.other}</option>
                </select>
              </label>
              <label>{copy.market}<input name="countries" value={request.countries} onChange={update} placeholder={copy.marketHint} /></label>
              <label>{copy.language}<input name="languages" value={request.languages} onChange={update} placeholder={copy.languageHint} /></label>
            </div>
          </section>

          <section className="business-custom-section business-custom-section--scope">
            <div className="business-custom-section-head">
              <h2>{copy.scopeTitle}</h2>
              <p>{copy.scopeIntro}</p>
            </div>
            <div className="business-custom-grid business-custom-grid--three">
              <label>{copy.participants}<input name="targetParticipants" type="number" min="1" value={request.targetParticipants} onChange={update} /></label>
              <label>{copy.minutes}<input name="estimatedMinutes" type="number" min="1" value={request.estimatedMinutes} onChange={update} /></label>
              <label>{copy.timing}<input name="timeline" value={request.timeline} onChange={update} placeholder={copy.timingHint} /></label>
              <label className="is-full">{copy.context}<textarea name="additionalContext" value={request.additionalContext} onChange={update} placeholder={copy.contextHint} /></label>
            </div>
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
