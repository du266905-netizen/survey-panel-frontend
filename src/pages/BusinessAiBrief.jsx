import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Circle, FilePenLine, LoaderCircle, Send, Sparkles } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject, getResearchBriefGuidance } from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';

const steps = ['audience', 'market', 'sample', 'timeline'];
const PENDING_BRIEF_STORAGE_KEY = 'guanyisearch.business-ai-brief.pending.v1';

function readPendingBrief() {
  try {
    const value = JSON.parse(sessionStorage.getItem(PENDING_BRIEF_STORAGE_KEY) || 'null');
    return value && typeof value === 'object' ? value : null;
  } catch {
    return null;
  }
}

function clearPendingBrief() {
  try {
    sessionStorage.removeItem(PENDING_BRIEF_STORAGE_KEY);
  } catch {
    // Session storage can be unavailable in a restricted browser context.
  }
}

const copy = {
  en: {
    projects: 'Projects',
    fallbackTitle: 'New research brief',
    guide: 'RESEARCH GUIDE',
    opening: (goal) => `I’ve started a private research brief from your question. I can help organise it into a questionnaire draft, but no participants have been contacted and no research finding has been created.\n\nFirst, who do you need to hear from?`,
    next: {
      market: 'Thank you. Which country, market, or community should this questionnaire be grounded in?',
      sample: 'Noted. About how many completed responses would you like to plan for? You can say “not sure” if you would like guidance.',
      timeline: 'One last planning detail: when do you need an answer? A date or a rough timeframe is enough.',
      ready: 'Your research brief now has the core details needed to prepare a questionnaire draft. Review the summary before you save it; sending a brief never starts fieldwork or creates findings.',
    },
    placeholders: {
      audience: 'For example: adults in Germany who buy skincare online',
      market: 'For example: Germany, Berlin, or DACH',
      sample: 'For example: 300 completed responses, or “not sure”',
      timeline: 'For example: before 15 October, or within two weeks',
      done: 'Add an optional note to this brief',
    },
    status: 'RESEARCH BRIEF',
    captured: 'Captured',
    toClarify: 'Still to clarify',
    fields: { goal: 'Research question', audience: 'People to hear from', market: 'Market or community', sample: 'Completed responses', timeline: 'When you need an answer' },
    draft: 'Private draft',
    note: 'This guide prepares a draft. It does not contact participants, set a price, or create research findings.',
    dataNotice: 'AI assistance sends only the project text you choose to an AI assistance provider to prepare this draft. It is not saved as a project until you choose Save. Do not include personal contact details, confidential information, or files.',
    guideUnavailable: 'AI guidance is unavailable right now. You can continue preparing this draft manually.',
    manualGuide: 'Manual guide',
    suggestedFocus: 'A possible focus',
    methodNote: 'Planning note',
    save: 'Save research brief',
    saving: 'Saving brief…',
    finish: 'Finish guide',
    saveError: 'We could not save this brief. Please try again.',
    back: 'Back to projects',
  },
  zh: {
    projects: '项目',
    fallbackTitle: '新的研究简报',
    guide: '研究引导',
    opening: () => '我已根据你的问题建立一份私有研究简报。我会协助把它整理为可编辑的问卷草稿；目前没有联系参与者，也没有生成任何研究结论。\n\n首先，你希望听到哪些人的看法？',
    next: {
      market: '好的。你希望这份问卷以哪个国家、市场或社群为背景？',
      sample: '已记录。你希望计划收集多少份有效回复？如果暂时不确定，也可以直接说“需要建议”。',
      timeline: '最后一个规划信息：你最晚何时需要答案？写日期或大致时间范围都可以。',
      ready: '这份研究简报现在已有准备问卷草稿所需的核心信息。请先检查右侧摘要；保存简报不会启动调研，也不会生成研究结论。',
    },
    placeholders: {
      audience: '例如：在德国线上购买护肤品的成年人',
      market: '例如：德国、柏林或德语区',
      sample: '例如：300 份有效回复，或“需要建议”',
      timeline: '例如：10 月 15 日前，或两周内',
      done: '为这份简报添加补充说明',
    },
    status: '研究简报',
    captured: '已记录',
    toClarify: '仍待补充',
    fields: { goal: '研究问题', audience: '希望听到谁的看法', market: '市场或社群', sample: '有效回复数量', timeline: '需要答案的时间' },
    draft: '私有草稿',
    note: '此引导只准备草稿，不会联系参与者、确定价格或生成研究结论。',
    dataNotice: 'AI 协助只会将你主动提交的项目文字发送给 AI 协助服务方，用于准备这份草稿；在你点选“保存”前，它不会保存为项目。请勿输入个人联系方式、保密信息或文件内容。',
    guideUnavailable: 'AI 引导暂时不可用。你仍可继续手动完成这份草稿。',
    manualGuide: '本地引导',
    suggestedFocus: '可考虑的研究重点',
    methodNote: '规划提示',
    save: '保存研究简报',
    saving: '正在保存简报…',
    finish: '完成引导',
    saveError: '暂时无法保存这份简报，请重试。',
    back: '返回项目',
  },
};

function projectTitle(value, fallback) {
  const compact = String(value || '').replaceAll(/\s+/g, ' ').trim();
  if (!compact) return fallback;
  return compact.length > 78 ? `${compact.slice(0, 75)}…` : compact;
}

export default function BusinessAiBrief() {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const isChinese = language === 'zh-CN';
  const text = isChinese ? copy.zh : copy.en;
  const [pendingBrief] = useState(() => readPendingBrief());
  const requestedPrompt = String(location.state?.initialPrompt || '').trim();
  const initialPrompt = requestedPrompt || String(pendingBrief?.brief?.goal || '').trim();
  const [brief, setBrief] = useState(() => requestedPrompt ? {
    goal: requestedPrompt, audience: '', market: '', sample: '', timeline: '',
  } : {
    goal: initialPrompt,
    audience: String(pendingBrief?.brief?.audience || ''),
    market: String(pendingBrief?.brief?.market || ''),
    sample: String(pendingBrief?.brief?.sample || ''),
    timeline: String(pendingBrief?.brief?.timeline || ''),
  });
  const [messages, setMessages] = useState(() => {
    if (!requestedPrompt && Array.isArray(pendingBrief?.messages) && pendingBrief.messages.length) return pendingBrief.messages;
    return initialPrompt ? [
      { id: 'opening-user', role: 'user', content: initialPrompt },
      { id: 'opening-guide', role: 'guide', content: text.opening(initialPrompt) },
    ] : [];
  });
  const [activeStep, setActiveStep] = useState(() => requestedPrompt ? 0 : Math.min(Math.max(Number(pendingBrief?.activeStep) || 0, 0), steps.length));
  const [reply, setReply] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [guiding, setGuiding] = useState(false);
  const [guidanceWarning, setGuidanceWarning] = useState('');

  const title = useMemo(() => projectTitle(initialPrompt, text.fallbackTitle), [initialPrompt, text.fallbackTitle]);
  const activeField = steps[activeStep];
  const ready = activeStep >= steps.length;

  useEffect(() => {
    if (!brief.goal) return;
    try {
      sessionStorage.setItem(PENDING_BRIEF_STORAGE_KEY, JSON.stringify({ brief, messages, activeStep }));
    } catch {
      // The flow remains usable when a browser blocks session storage.
    }
  }, [activeStep, brief, messages]);

  const leaveBrief = () => {
    clearPendingBrief();
    navigate(withLanguage('/business/workspace', language));
  };

  const addReply = async (event) => {
    event.preventDefault();
    const value = reply.trim();
    if (!value || guiding) return;
    if (ready) {
      setMessages((current) => [...current, { id: `user-note-${current.length}`, role: 'user', content: value }]);
      setReply('');
      return;
    }
    const nextIndex = activeStep + 1;
    const nextField = steps[nextIndex];
    const updatedBrief = { ...brief, [activeField]: value };
    setBrief(updatedBrief);
    setMessages((current) => [...current, { id: `user-${activeField}`, role: 'user', content: value }]);
    setActiveStep(nextIndex);
    setReply('');
    setGuidanceWarning('');
    setGuiding(true);

    try {
      const response = await getResearchBriefGuidance({
        brief: updatedBrief,
        currentField: activeField,
        nextField: nextField || null,
      });
      const guidance = response.data.guidance;
      const additions = [guidance.reply];
      if (guidance.suggestedResearchFocus) additions.push(`${text.suggestedFocus}: ${guidance.suggestedResearchFocus}`);
      if (guidance.safetyNote) additions.push(`${text.methodNote}: ${guidance.safetyNote}`);
      setMessages((current) => [...current, {
        id: `guide-${activeField}`,
        role: 'guide',
        content: additions.join('\n\n'),
      }]);
    } catch {
      setGuidanceWarning(text.guideUnavailable);
      setMessages((current) => [...current, {
        id: `guide-${activeField}-fallback`,
        role: 'guide',
        content: `${text.manualGuide}: ${text.next[nextField || 'ready']}`,
      }]);
    } finally {
      setGuiding(false);
    }
  };

  const saveBrief = async () => {
    if (!ready || saving) return;
    setSaving(true);
    setError('');
    try {
      const parsedSample = Number.parseInt(String(brief.sample).replaceAll(/[^0-9]/g, ''), 10);
      const response = await createBusinessProject({
        title,
        researchGoal: brief.goal,
        audienceDescription: brief.audience,
        studyFormat: 'SURVEY',
        countries: brief.market,
        targetParticipants: Number.isFinite(parsedSample) ? parsedSample : undefined,
        timeline: brief.timeline,
        incentiveBudget: 'NEED_GUIDANCE',
        additionalContext: '',
        selfServiceQuestionnaire: false,
      });
      clearPendingBrief();
      navigate(withLanguage('/business/workspace', language), { state: { savedBriefId: response.data.project?.id } });
    } catch {
      setError(text.saveError);
    } finally {
      setSaving(false);
    }
  };

  if (!initialPrompt) {
    return <Navigate to={withLanguage('/business/workspace', language)} replace />;
  }

  return (
    <main className="business-ai-brief-page notranslate" translate="no" data-translate="no">
      <header className="business-ai-brief-header">
        <div className="business-ai-brief-crumbs" aria-label={text.projects}>
          <img src="/guanyisearch-wordmark.png" alt="guanyisearch" />
          <span aria-hidden="true">/</span>
          <button type="button" onClick={leaveBrief}>{text.projects}</button>
          <span aria-hidden="true">/</span>
          <strong title={title}>{title}</strong>
        </div>
        <button className="business-ai-brief-back" type="button" onClick={leaveBrief}><ArrowLeft size={16} /> {text.back}</button>
      </header>

      <div className="business-ai-brief-layout">
        <section className="business-ai-conversation" aria-label={text.guide}>
          <header>
            <span><Sparkles size={16} /></span>
            <div><p>{text.guide}</p><h1>{title}</h1></div>
          </header>
          <div className="business-ai-conversation-log" role="log" aria-live="polite">
            {messages.map((message) => (
              <article key={message.id} className={message.role === 'user' ? 'is-user' : 'is-guide'}>
                {message.role === 'guide' && <span className="business-ai-guide-mark" aria-hidden="true"><Sparkles size={14} /></span>}
                <p>{message.content}</p>
              </article>
            ))}
          </div>
          <form className="business-ai-composer" onSubmit={addReply}>
            <textarea value={reply} disabled={guiding} onChange={(event) => setReply(event.target.value)} placeholder={text.placeholders[ready ? 'done' : activeField]} aria-label={text.placeholders[ready ? 'done' : activeField]} />
            <button type="submit" disabled={!reply.trim() || guiding} aria-label="Send">{guiding ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}</button>
          </form>
        </section>

        <aside className="business-ai-brief-summary" aria-label={text.status}>
          <header><div><p>{text.status}</p><h2>{text.draft}</h2></div><FilePenLine size={20} /></header>
          <section>
            <h3>{text.captured}</h3>
            {['goal', ...steps].filter((key) => brief[key]).map((key) => <div className="is-captured" key={key}><Check size={14} /><span><strong>{text.fields[key]}</strong><small>{brief[key]}</small></span></div>)}
          </section>
          {!ready && <section>
            <h3>{text.toClarify}</h3>
            {steps.filter((key) => !brief[key]).map((key) => <div className="is-pending" key={key}><Circle size={13} /><span>{text.fields[key]}</span></div>)}
          </section>}
          <p className="business-ai-brief-note">{text.note}</p>
          <p className="business-ai-brief-data-notice">{text.dataNotice}</p>
          {guidanceWarning && <p className="business-ai-brief-error" role="status">{guidanceWarning}</p>}
          {ready && <button className="business-button business-ai-save" type="button" disabled={saving} onClick={saveBrief}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : text.save} {!saving && <ArrowRight size={16} />}</button>}
          {error && <p className="business-ai-brief-error" role="alert">{error}</p>}
        </aside>
      </div>
    </main>
  );
}
