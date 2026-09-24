import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BarChart3, BrainCircuit, Check, ChevronDown, ClipboardList, FileText, Languages, LayoutDashboard, LoaderCircle, LogOut, Send, Sparkles, UserRound } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject, getResearchBriefGuidance } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';

const steps = ['goal', 'route', 'audience', 'market', 'sample', 'timeline'];
const PENDING_BRIEF_STORAGE_KEY = 'guanyisearch.business-ai-brief.pending.v2';
const starterPrompts = {
  en: [
    'How do Chinese consumers feel about smartwatches that use AI health features?',
    'What would make shoppers in Japan and South Korea switch skincare brands?',
    'How do first-time parents in the UK decide whether a food delivery service is trustworthy?',
    'Which concerns stop German small businesses from using AI accounting tools?',
  ],
  zh: [
    '中国消费者如何看待带有 AI 健康功能的智能手表？',
    '什么因素会让日本和韩国的消费者更换护肤品牌？',
    '英国新手父母如何判断一家外卖服务是否值得信任？',
    '哪些顾虑阻碍德国小型企业使用 AI 财务工具？',
  ],
};

function readPendingBrief() {
  try {
    const value = JSON.parse(sessionStorage.getItem(PENDING_BRIEF_STORAGE_KEY) || 'null');
    return value && typeof value === 'object' ? value : null;
  } catch { return null; }
}

function clearPendingBrief() {
  try { sessionStorage.removeItem(PENDING_BRIEF_STORAGE_KEY); } catch { /* Restricted browser context. */ }
}

function containsChinese(value) { return /[\u3400-\u9FFF]/.test(String(value || '')); }

const copy = {
  en: {
    projects: 'Projects', newBrief: 'New research brief', opening: () => 'What would you like to research', questionMark: '?', exampleLabel: 'For example',
    next: { route: 'Which route best fits this need? I will prepare an editable draft only.', audience: 'Thanks — who would you like to hear from?', market: 'Which country, market, or community should this focus on?', sample: 'About how many completed responses would you like to plan for? “Not sure” is fine.', timeline: 'When would you like an answer? A date or rough timeframe is enough.', ready: 'That is enough to prepare an editable planning draft. Review the details, then continue when you are ready.' },
    placeholders: { goal: 'For example: understand how Chinese consumers view AI assistants in everyday life', audience: 'For example: adults in China who have used an AI assistant', market: 'For example: China, Shanghai, or Greater China', sample: 'For example: 300 completed responses, or “not sure”', timeline: 'For example: within two weeks', done: 'Add an optional note' },
    progress: 'Private draft', history: 'Project history', captured: (number) => `${number} of ${steps.length - 1} details captured`, details: 'View draft details', fields: { goal: 'Research question', route: 'Service route', audience: 'People to hear from', market: 'Market or community', sample: 'Completed responses', timeline: 'Timing' },
    note: 'Draft only — no participant contact, pricing, recruitment, publication, or research findings.', dataNotice: 'AI assistance uses only the text you choose to send. Do not include personal contact details, confidential information, or files.', guideUnavailable: 'AI guidance is unavailable right now. You can keep going with the local guide.', manualGuide: 'Local guide', suggestedFocus: 'A possible focus', methodNote: 'Planning note', save: 'Continue', saving: 'Preparing draft…', saveError: 'We could not save this draft. Please try again.', back: 'Back to projects', services: 'Workspace', questionnaires: 'Questionnaire editor', results: 'Results', account: 'Account', signOut: 'Sign out',
  },
  zh: {
    projects: '项目', newBrief: '新研究简报', opening: () => '你想研究什么', questionMark: '？', exampleLabel: '例如',
    next: { route: '这项需求最适合哪条路径？我只会准备一份可编辑草稿。', audience: '好的。你希望听到哪些人的看法？', market: '你希望聚焦哪个国家、市场或社群？', sample: '你希望计划收集多少份有效回复？暂时不确定也可以。', timeline: '你希望何时拿到答案？写日期或大致时间范围都可以。', ready: '这些信息已足够准备一份可编辑的规划草稿。你可以查看详情，并在准备好后继续。' },
    placeholders: { goal: '例如：了解中国消费者如何看待日常生活中的 AI 助手', audience: '例如：使用过 AI 助手的中国成年人', market: '例如：中国、上海或大中华区', sample: '例如：300 份有效回复，或“暂不确定”', timeline: '例如：两周内', done: '补充一条可选说明' },
    progress: '私有草稿', history: '项目历史', captured: (number) => `已记录 ${number}/${steps.length - 1} 项`, details: '查看草稿详情', fields: { goal: '研究问题', route: '服务路径', audience: '希望听到谁的看法', market: '市场或社群', sample: '有效回复数量', timeline: '时间要求' },
    note: '这只是草稿，不会联系参与者、确定价格或生成研究结论。', dataNotice: 'AI 协助只会处理你主动发送的文字。请勿输入个人联系方式、保密信息或文件内容。', guideUnavailable: 'AI 引导暂时不可用。你仍可继续使用本地引导。', manualGuide: '本地引导', suggestedFocus: '可考虑的研究重点', methodNote: '规划提示', save: '进入问卷编辑器', saving: '正在打开编辑器…', saveError: '暂时无法保存这份草稿，请重试。', back: '返回项目', services: '工作区', questionnaires: '问卷编辑器', results: '结果', account: '账户', signOut: '退出登录',
  },
};

function projectTitle(value, fallback) {
  const compact = String(value || '').replaceAll(/\s+/g, ' ').trim();
  return !compact ? fallback : (compact.length > 62 ? `${compact.slice(0, 59)}…` : compact);
}

export default function BusinessAiBrief() {
  const { user, logout } = useAuth();
  const { language, navigateToLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const text = language === 'zh-CN' ? copy.zh : copy.en;
  const [pendingBrief] = useState(() => readPendingBrief());
  const requestedPrompt = String(location.state?.initialPrompt || '').trim();
  const initialPrompt = requestedPrompt || String(pendingBrief?.brief?.goal || '').trim();
  const displayName = String(user?.displayName || user?.email?.split('@')[0] || (language === 'zh-CN' ? '朋友' : 'there')).trim();
  const [brief, setBrief] = useState(() => ({ goal: initialPrompt, route: requestedPrompt ? '' : String(pendingBrief?.brief?.route || ''), audience: requestedPrompt ? '' : String(pendingBrief?.brief?.audience || ''), market: requestedPrompt ? '' : String(pendingBrief?.brief?.market || ''), sample: requestedPrompt ? '' : String(pendingBrief?.brief?.sample || ''), timeline: requestedPrompt ? '' : String(pendingBrief?.brief?.timeline || '') }));
  const [messages, setMessages] = useState(() => {
    if (!requestedPrompt && Array.isArray(pendingBrief?.messages) && pendingBrief.messages.length) return pendingBrief.messages;
    const opening = { id: 'opening-guide', role: 'guide', opening: true, content: text.opening(displayName) };
    if (!initialPrompt) return [opening];
    const responseText = containsChinese(initialPrompt) ? copy.zh : text;
    return [opening, { id: 'opening-user', role: 'user', content: initialPrompt }, { id: 'opening-next', role: 'guide', content: responseText.next.route }];
  });
  const [activeStep, setActiveStep] = useState(() => requestedPrompt ? 1 : Math.min(Math.max(Number(pendingBrief?.activeStep) || 0, 0), steps.length));
  const [reply, setReply] = useState('');
  const [saving, setSaving] = useState(false);
  const [guiding, setGuiding] = useState(false);
  const [error, setError] = useState('');
  const [guidanceWarning, setGuidanceWarning] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [exampleIndex, setExampleIndex] = useState(() => Math.floor(Math.random() * starterPrompts[language === 'zh-CN' ? 'zh' : 'en'].length));
  const [typedExample, setTypedExample] = useState('');
  const conversationEndRef = useRef(null);
  const title = useMemo(() => projectTitle(brief.goal, text.newBrief), [brief.goal, text.newBrief]);
  const activeField = steps[activeStep];
  const ready = activeStep >= steps.length;
  const capturedCount = steps.filter((field) => field !== 'route' && brief[field]).length;
  const hasStarted = messages.some((message) => message.role === 'user');
  const examples = starterPrompts[language === 'zh-CN' ? 'zh' : 'en'];
  const example = examples[exampleIndex % examples.length];

  useEffect(() => {
    try { sessionStorage.setItem(PENDING_BRIEF_STORAGE_KEY, JSON.stringify({ brief, messages, activeStep })); } catch { /* The flow still works without session storage. */ }
  }, [activeStep, brief, messages]);

  useEffect(() => {
    if (hasStarted) return undefined;
    let cancelled = false;
    let timer;
    const type = (index) => {
      if (cancelled) return;
      setTypedExample(example.slice(0, index));
      if (index < example.length) {
        timer = window.setTimeout(() => type(index + 1), 74);
      } else {
        timer = window.setTimeout(() => {
          if (cancelled) return;
          setTypedExample('');
          setExampleIndex((current) => (current + 1) % examples.length);
        }, 2400);
      }
    };
    type(0);
    return () => { cancelled = true; window.clearTimeout(timer); };
  }, [example, examples.length, hasStarted]);

  useEffect(() => {
    if (!hasStarted || guiding) return;
    const frame = window.requestAnimationFrame(() => conversationEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }));
    return () => window.cancelAnimationFrame(frame);
  }, [guiding, hasStarted, messages.length]);

  const leaveBrief = () => { clearPendingBrief(); navigate(withLanguage('/business/workspace', language)); };

  const addReply = async (event) => {
    event.preventDefault();
    const value = reply.trim();
    if (!value || guiding) return;
    if (ready) { setMessages((current) => [...current, { id: `user-note-${current.length}`, role: 'user', content: value }]); setReply(''); return; }
    const nextIndex = activeStep + 1;
    const nextField = steps[nextIndex] || null;
    const updatedBrief = { ...brief, [activeField]: value };
    const shouldReplyInChinese = containsChinese(value) || containsChinese(updatedBrief.goal) || messages.some((message) => containsChinese(message.content));
    const responseText = shouldReplyInChinese ? copy.zh : text;
    setBrief(updatedBrief);
    setMessages((current) => [...current, { id: `user-${activeField}-${current.length}`, role: 'user', content: value }]);
    setActiveStep(nextIndex); setReply(''); setGuidanceWarning(''); setGuiding(true);
    if (nextField === 'route') {
      setMessages((current) => [...current, { id: `guide-route-${current.length}`, role: 'guide', content: responseText.next.route }]);
      setGuiding(false);
      return;
    }
    try {
      const response = await getResearchBriefGuidance({ brief: updatedBrief, currentField: activeField, nextField, responseLanguage: shouldReplyInChinese ? 'zh' : 'en' });
      const guidance = response.data.guidance;
      const additions = [guidance.reply];
      if (guidance.suggestedResearchFocus) additions.push(`${responseText.suggestedFocus}: ${guidance.suggestedResearchFocus}`);
      if (guidance.safetyNote) additions.push(`${responseText.methodNote}: ${guidance.safetyNote}`);
      setMessages((current) => [...current, { id: `guide-${activeField}-${current.length}`, role: 'guide', content: additions.join('\n\n') }]);
    } catch {
      setGuidanceWarning(responseText.guideUnavailable);
      setMessages((current) => [...current, { id: `guide-${activeField}-fallback-${current.length}`, role: 'guide', content: `${responseText.manualGuide}: ${responseText.next[nextField || 'ready']}` }]);
    } finally { setGuiding(false); }
  };

  const selectRoute = (route, label) => {
    if (activeField !== 'route') return;
    const responseText = language === 'zh-CN' ? copy.zh : copy.en;
    setBrief((current) => ({ ...current, route }));
    setMessages((current) => [...current, { id: `user-route-${current.length}`, role: 'user', content: label }, { id: `guide-route-next-${current.length}`, role: 'guide', content: responseText.next.audience }]);
    setActiveStep((current) => current + 1);
  };

  const saveBrief = async () => {
    if (!ready || saving) return;
    setSaving(true); setError('');
    try {
      const parsedSample = Number.parseInt(String(brief.sample).replaceAll(/[^0-9]/g, ''), 10);
      const prepared = { title, researchGoal: brief.goal, audienceDescription: brief.audience, countries: brief.market, languages: '', targetParticipants: Number.isFinite(parsedSample) ? parsedSample : '', timeline: brief.timeline, additionalContext: '' };
      if (brief.route === 'QUESTIONNAIRE_SERVICE') {
        clearPendingBrief();
        navigate(withLanguage('/business/custom-questionnaire', language), { state: { preparedRequest: prepared } });
        return;
      }
      if (brief.route === 'AUDIENCE_RECRUITMENT') {
        clearPendingBrief();
        navigate(withLanguage('/business/audience-plan', language), { state: { preparedPlan: prepared } });
        return;
      }
      const response = await createBusinessProject({ title, researchGoal: brief.goal, audienceDescription: brief.audience, studyFormat: 'INTERVIEW', countries: brief.market, targetParticipants: Number.isFinite(parsedSample) ? parsedSample : undefined, timeline: brief.timeline, incentiveBudget: 'NEED_GUIDANCE', additionalContext: '', selfServiceQuestionnaire: false });
      clearPendingBrief();
      navigate(withLanguage('/business/workspace?view=projects', language), { state: { message: language === 'zh-CN' ? '研究支持需求已保存为可编辑草稿。' : 'Your research-support request is saved as an editable draft.' } });
    } catch { setError(text.saveError); } finally { setSaving(false); }
  };

  return <main className="business-ai-brief-page notranslate" translate="no" data-translate="no">
    <div className="business-ai-brief-shell">
      <aside className="business-workspace-rail business-ai-brief-rail" aria-label={text.services}>
        <img className="business-workspace-rail-mark" src="/guanyisearch-project-mark.png" alt="guanyisearch" />
        <button type="button" title={text.services} aria-label={text.services} onClick={leaveBrief}><LayoutDashboard size={20} /></button>
        <button className="is-active" type="button" title={language === 'zh-CN' ? 'AI 研究引导' : 'AI research guide'} aria-label={language === 'zh-CN' ? 'AI 研究引导' : 'AI research guide'}><BrainCircuit size={20} /></button>
        <button type="button" title={text.questionnaires} aria-label={text.questionnaires} onClick={() => navigate(withLanguage('/business/workspace?view=questionnaires', language))}><ClipboardList size={20} /></button>
        <button type="button" title={text.projects} aria-label={text.projects} onClick={() => navigate(withLanguage('/business/workspace?view=projects', language))}><FileText size={20} /></button>
        <button type="button" title={text.results} aria-label={text.results} onClick={() => navigate(withLanguage('/business/workspace?view=results', language))}><BarChart3 size={20} /></button>
        <button className="business-workspace-language" type="button" title={language === 'zh-CN' ? 'Switch to English' : '切换到中文'} aria-label={language === 'zh-CN' ? 'Switch to English' : '切换到中文'} onClick={() => navigateToLanguage(language === 'zh-CN' ? 'en-US' : 'zh-CN')}><Languages size={18} /><span>{language === 'zh-CN' ? 'EN' : '中'}</span></button>
        <NotificationBell className="business-workspace-notification" />
        <div className="business-workspace-account"><button type="button" onClick={() => setAccountMenuOpen((value) => !value)} aria-label={text.account} aria-expanded={accountMenuOpen}><UserRound size={20} /><span>{displayName.charAt(0).toUpperCase()}</span></button>{accountMenuOpen && <div><strong>{displayName}</strong><span>{user?.email}</span><button type="button" onClick={() => navigate(withLanguage('/business/account', language))}><UserRound size={15} /> {text.account}</button><button type="button" onClick={() => { logout(); navigate(withLanguage('/business/login', language)); }}><LogOut size={15} /> {text.signOut}</button></div>}</div>
      </aside>
      <section className="business-ai-brief-surface">
        <header className="business-ai-brief-header"><div className="business-ai-brief-brand"><img className="business-ai-brief-wordmark" src="/guanyisearch-wordmark.png" alt="guanyisearch" />{hasStarted && <><span aria-hidden="true">/</span><strong>{title}</strong></>}</div><div className="business-ai-brief-actions"><button className="business-ai-brief-back" type="button" onClick={leaveBrief}><ArrowLeft size={16} /> {text.back}</button><details className="business-ai-project-history"><summary>{text.history} <ChevronDown size={14} /></summary><div><p>{text.progress}</p><strong>{title}</strong><span>{text.captured(capturedCount)}</span>{steps.filter((field) => brief[field]).map((field) => <p className="business-ai-history-field" key={field}><Check size={13} /><b>{text.fields[field]}</b><em>{brief[field]}</em></p>)}</div></details></div></header>
        <section className={`business-ai-conversation${hasStarted ? ' is-started' : ' is-waiting'}`} aria-label={text.newBrief}>
          <div className="business-ai-conversation-log" role="log" aria-live="polite">{messages.filter((message) => !message.opening || !hasStarted).map((message) => <article key={message.id} className={`${message.role === 'user' ? 'is-user' : 'is-guide'}${message.opening ? ' is-opening' : ''}`}>{message.role === 'guide' && <span className="business-ai-guide-mark" aria-hidden="true"><Sparkles size={14} /></span>}{message.opening ? <><p className="business-ai-personal-greeting">{language === 'zh-CN' ? `你好，${displayName}` : `Hi, ${displayName}`}</p><h1>{message.content}<span className="business-ai-title-question">{text.questionMark}</span></h1></> : <p>{message.content}</p>}</article>)}{!hasStarted && <p className="business-ai-starter-example"><span>{text.exampleLabel}</span><strong>{typedExample}</strong><i aria-hidden="true" /></p>}<span className="business-ai-conversation-end" ref={conversationEndRef} aria-hidden="true" /></div>
          <div className="business-ai-dock"><div className="business-ai-dock-meta"><p className="business-ai-brief-note">{text.note}</p><p className="business-ai-brief-data-notice">{text.dataNotice}</p></div>{guidanceWarning && <p className="business-ai-brief-error" role="status">{guidanceWarning}</p>}{activeField === 'route' && <div className="business-ai-route-picker"><button type="button" onClick={() => selectRoute('QUESTIONNAIRE_SERVICE', language === 'zh-CN' ? '定制问卷服务' : 'Custom questionnaire service')}><b>{language === 'zh-CN' ? '定制问卷服务' : 'Custom questionnaire service'}</b><span>{language === 'zh-CN' ? '把决策问题整理为可审核的问卷需求。' : 'Turn a decision into a reviewable questionnaire brief.'}</span></button><button type="button" onClick={() => selectRoute('AUDIENCE_RECRUITMENT', language === 'zh-CN' ? '问卷研究与受众招募' : 'Questionnaire research & audience recruitment')}><b>{language === 'zh-CN' ? '问卷研究与受众招募' : 'Questionnaire research & audience recruitment'}</b><span>{language === 'zh-CN' ? '先定义真实、可验证的目标受众，再进入题目编辑。' : 'Define a real, verifiable target audience before editing questions.'}</span></button><button type="button" onClick={() => selectRoute('CUSTOM_RESEARCH', language === 'zh-CN' ? '定制研究支持' : 'Custom research support')}><b>{language === 'zh-CN' ? '定制研究支持' : 'Custom research support'}</b><span>{language === 'zh-CN' ? '适合定性线上访谈、可用性测试或需要研究团队协作的需求。' : 'For online qualitative interviews, usability work, or team-led research.'}</span></button></div>}{ready && <button className="business-button business-ai-save" type="button" disabled={saving} onClick={saveBrief}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : text.save} {!saving && <ArrowRight size={16} />}</button>}{error && <p className="business-ai-brief-error" role="alert">{error}</p>}{activeField !== 'route' && <form className="business-ai-composer" onSubmit={addReply}><textarea value={reply} disabled={guiding} onChange={(event) => setReply(event.target.value)} placeholder={hasStarted ? text.placeholders[ready ? 'done' : activeField] : ''} aria-label={text.placeholders[ready ? 'done' : activeField]} /><button type="submit" disabled={!reply.trim() || guiding} aria-label="Send">{guiding ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}</button></form>}</div>
        </section>
      </section>
    </div>
  </main>;
}
