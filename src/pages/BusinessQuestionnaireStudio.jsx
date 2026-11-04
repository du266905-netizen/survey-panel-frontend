import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle, Archive, ArrowLeft, Check, CheckCircle2, ChevronDown, Copy, Eye, GripVertical, LoaderCircle,
  MoreHorizontal, Plus, Send, Settings2, Star, Trash2, X,
} from 'lucide-react';
import {
  archiveBusinessQuestionnaire, deleteBusinessProject, duplicateBusinessQuestionnaire,
  getBusinessProject, publishBusinessQuestionnaire, saveBusinessQuestionnaire,
} from '../api/realApi';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './BusinessQuestionnaireStudio.css';

/* The questionnaire editor.
 *
 * Cards are compact on purpose: the header row carries everything that acts on
 * the question (number, prompt, type, required, duplicate, menu), and the rows
 * below are the answers, edited in place. Enter adds a row, Backspace on an
 * empty row removes it — no "add option" button to hunt for.
 *
 * Persistence is unchanged: the same questions array, settings filtered to the
 * five keys the server accepts, so a save cannot 400 on report-only fields. */

const TYPES = [
  ['SINGLE_CHOICE', '单选', 'Single choice'],
  ['MULTIPLE_CHOICE', '多选', 'Multiple choice'],
  ['RATING', '评分', 'Rating'],
  ['RANKING', '排序', 'Ranking'],
  ['NUMBER', '数字', 'Number'],
  ['SHORT_TEXT', '短文本', 'Short text'],
  ['LONG_TEXT', '长文本', 'Long text'],
];
const TYPE_LABEL = Object.fromEntries(TYPES.map(([value, zh, en]) => [value, { 'zh-CN': zh, en }]));
const CHOICE_TYPES = ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING', 'RANKING'];
const LOGIC_TYPES = ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING'];
const SAVE_SETTINGS = ['allowOther', 'maxSelections', 'randomizeChoices', 'scaleLowLabel', 'scaleHighLabel'];
const MAX_QUESTIONS = 30;
const SECTIONS = [
  ['SCREENING', '甄别', 'Screening'],
  ['CORE', '核心', 'Core'],
  ['PROFILE', '画像', 'Profile'],
  ['CLOSING', '收尾', 'Closing'],
];

const copy = {
  'zh-CN': {
    back: '返回项目', draft: '草稿', published: '已发布',
    flow: '流程', stepAudience: '受众', stepQuestions: '问卷', stepQuote: '报价', stepPay: '付款',
    backToProject: '返回项目',
    quality: '质量检查', summary: '问卷概况', questionsN: '题目', requiredN: '必答',
    minutes: '预计时长', minutesValue: '{n} 分钟', issues: '待处理', noIssues: '没有发现问题',
    issuePrompt: 'Q{n} 还没有题干', issueOptions: 'Q{n} 的选项少于 2 个',
    issueLogic: 'Q{n} 的显示条件指向了不存在的题', issueLogicValue: 'Q{n} 的显示条件取值不在选项里',
    issueDuplicate: 'Q{n} 和 Q{m} 题干重复',
    addQuestion: '添加题目', addOption: '添加选项', optionPlaceholder: '选项 {n}',
    duplicate: '复制这道题', menu: '更多', required: '必答', logic: '逻辑',
    logicNone: '始终显示', logicAdd: '添加显示条件', logicWhen: '当', logicIs: '是', logicPick: '选择一道题',
    remove: '删除', moveUp: '上移', moveDown: '下移',
    promptPlaceholder: '问题', type: '题型', options: '选项',
    save: '保存', publish: '发布', publishing: '发布中…', saved: '已保存', saveFailed: '保存失败，请稍后再试。',
    untitled: '未命名问卷', preview: '预览',
    archived: '已归档', copyDraft: '复制为新草稿', archive: '归档', deleteDraft: '删除草稿',
    deleteConfirm: '删除这份草稿？删除后不可恢复。',
    locked: '已发布：结构已锁定。如需修改，复制为新草稿。',
    coverTitle: '封面说明', coverPlaceholder: '受访者打开问卷时先看到的一段话',
    sensitiveTitle: '这份问卷会收集敏感信息', sensitiveBody: '包含收入、性别、健康等字段时，发布前需要确认用途与告知已就位。',
    sensitiveConfirm: '确认并发布', sensitiveCancel: '再检查一下', previewTitle: '受访者看到的顺序', close: '关闭',
    next: '下一步', prev: '上一步', finish: '完成',
    other: '其他', requiredMark: '必答', optionalMark: '选填',
  },
  en: {
    back: 'Back to project', draft: 'Draft', published: 'Published',
    flow: 'Flow', stepAudience: 'Audience', stepQuestions: 'Questionnaire', stepQuote: 'Quote', stepPay: 'Payment',
    backToProject: 'Back to project',
    quality: 'Quality check', summary: 'Summary', questionsN: 'Questions', requiredN: 'Required',
    minutes: 'Length', minutesValue: '{n} min', issues: 'To fix', noIssues: 'Nothing to fix',
    issuePrompt: 'Q{n} has no prompt', issueOptions: 'Q{n} has fewer than two options',
    issueLogic: 'Q{n} points at a question that no longer exists', issueLogicValue: 'Q{n} uses a value that is not an option',
    issueDuplicate: 'Q{n} and Q{m} ask the same thing',
    addQuestion: 'Add question', addOption: 'Add option', optionPlaceholder: 'Option {n}',
    duplicate: 'Duplicate', menu: 'More', required: 'Required', logic: 'Logic',
    logicNone: 'Always shown', logicAdd: 'Add condition', logicWhen: 'When', logicIs: 'is', logicPick: 'Pick a question',
    remove: 'Delete', moveUp: 'Move up', moveDown: 'Move down',
    promptPlaceholder: 'Question', type: 'Type', options: 'Options',
    save: 'Save', publish: 'Publish', publishing: 'Publishing…', saved: 'Saved', saveFailed: 'Could not save. Try again.',
    untitled: 'Untitled questionnaire', preview: 'Preview',
    archived: 'Archived', copyDraft: 'Copy as a new draft', archive: 'Archive', deleteDraft: 'Delete draft',
    deleteConfirm: 'Delete this draft? This cannot be undone.',
    locked: 'Published: the structure is locked. Copy it to a new draft to change it.',
    coverTitle: 'Cover note', coverPlaceholder: 'What respondents read before the first question',
    sensitiveTitle: 'This survey asks for sensitive information', sensitiveBody: 'Income, gender or health fields need a stated purpose and notice before publishing.',
    sensitiveConfirm: 'Confirm and publish', sensitiveCancel: 'Check again', previewTitle: 'What the respondent sees', close: 'Close',
    next: 'Next', prev: 'Back', finish: 'Done',
    other: 'Other', requiredMark: 'Required', optionalMark: 'Optional',
  },
};

const uid = () => window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const emptySettings = () => ({ allowOther: false, maxSelections: null, randomizeChoices: false, scaleLowLabel: '', scaleHighLabel: '' });
const defaultChoices = (type) => (type === 'RATING' ? ['1', '2', '3', '4', '5'] : ['选项 1', '选项 2']);
const newQuestion = (type = 'SINGLE_CHOICE', section = 'CORE') => ({
  uid: uid(), type, section, prompt: '', required: false,
  choices: CHOICE_TYPES.includes(type) ? defaultChoices(type) : [],
  settings: emptySettings(), logic: null,
});
const normalize = (question) => ({
  uid: question.id || uid(),
  id: question.id,
  type: question.type || 'SINGLE_CHOICE',
  section: question.section || 'CORE',
  prompt: question.prompt || '',
  required: Boolean(question.required),
  choices: Array.isArray(question.choices) ? question.choices : [],
  settings: { ...emptySettings(), ...(question.settings || {}) },
  logic: question.logic || null,
});
const savedSettings = (settings) => SAVE_SETTINGS.reduce((out, key) => {
  if (settings && key in settings) out[key] = settings[key];
  return out;
}, {});

function PreviewAnswer({ question }) {
  if (question.type === 'LONG_TEXT') return <textarea className="sq-preview-input" rows={4} disabled placeholder="…" />;
  if (question.type === 'SHORT_TEXT' || question.type === 'NUMBER') return <input className="sq-preview-input" disabled placeholder="…" />;
  if (question.type === 'RATING') {
    return (
      <div className="sq-preview-scale">
        {(question.choices.length ? question.choices : ['1', '2', '3', '4', '5']).map((choice) => <span key={choice}>{choice}</span>)}
      </div>
    );
  }
  if (question.type === 'RANKING') {
    return <ol className="sq-preview-rank">{question.choices.map((choice) => <li key={choice}>{choice}</li>)}</ol>;
  }
  return (
    <div className="sq-preview-options">
      {question.choices.map((choice) => (
        <label key={choice}>
          <input type={question.type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'} disabled />
          <span>{choice}</span>
        </label>
      ))}
      {question.settings?.allowOther ? (
        <label><input type={question.type === 'MULTIPLE_CHOICE' ? 'checkbox' : 'radio'} disabled /><span>其他</span></label>
      ) : null}
    </div>
  );
}

export default function BusinessQuestionnaireStudio() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const text = copy[language] || copy.en;

  const [project, setProject] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);
  const [openLogic, setOpenLogic] = useState(null);
  const [dragging, setDragging] = useState(null);
  const [saving, setSaving] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewStep, setPreviewStep] = useState(0);
  const [cover, setCover] = useState('');
  const [moreOpen, setMoreOpen] = useState(false);
  const [sensitiveOpen, setSensitiveOpen] = useState(false);
  const optionRefs = useRef({});

  const load = useCallback(async () => {
    try {
      const response = await getBusinessProject(projectId);
      const next = response.data.project;
      if (!next.questionnaire) {
        navigate(withLanguage('/business/workspace', language));
        return;
      }
      setProject(next);
      setCover(next.questionnaire?.coverDescription || '');
      setQuestions((next.questionnaire?.questions || []).map(normalize));
    } catch {
      setError(text.saveFailed);
    }
  }, [projectId, text.saveFailed, navigate, language]);

  useEffect(() => { load(); }, [load]);

  const status = project?.questionnaire?.status || 'DRAFT';
  const readOnly = status !== 'DRAFT' && status !== 'ARCHIVED';
  const hasSensitive = questions.some((question) => question.section === 'PROFILE'
    && /(income|salary|gender|sex|ethnic|race|religion|health|disab)/i.test(question.prompt));

  const typeLabel = (type) => TYPE_LABEL[type]?.[language] || TYPE_LABEL[type]?.en || type;
  const sectionLabel = (section) => {
    const row = SECTIONS.find(([value]) => value === section);
    return row ? (language === 'zh-CN' ? row[1] : row[2]) : section;
  };

  const update = (uidValue, changes) => {
    setQuestions((current) => current.map((question) => (question.uid === uidValue ? { ...question, ...changes } : question)));
    setMessage('');
  };
  const updateSettings = (uidValue, changes) => {
    const target = questions.find((question) => question.uid === uidValue);
    if (target) update(uidValue, { settings: { ...target.settings, ...changes } });
  };

  const addQuestion = (section = 'CORE') => {
    if (questions.length >= MAX_QUESTIONS) return;
    setQuestions((current) => [...current, newQuestion('SINGLE_CHOICE', section)]);
  };

  const duplicateQuestion = (uidValue) => {
    const index = questions.findIndex((question) => question.uid === uidValue);
    if (index < 0 || questions.length >= MAX_QUESTIONS) return;
    const source = questions[index];
    const copyQuestion = { ...source, uid: uid(), id: undefined, logic: null, choices: [...source.choices] };
    setQuestions((current) => {
      const next = [...current];
      next.splice(index + 1, 0, copyQuestion);
      return next.map((question, position) => (question.logic && question.logic.sourcePosition > index && position > index
        ? { ...question, logic: { ...question.logic, sourcePosition: question.logic.sourcePosition + 1 } }
        : question));
    });
    setOpenMenu(null);
  };

  const removeQuestion = (uidValue) => {
    const index = questions.findIndex((question) => question.uid === uidValue);
    if (index < 0) return;
    setQuestions((current) => current
      .filter((question) => question.uid !== uidValue)
      .map((question) => (question.logic && question.logic.sourcePosition > index
        ? { ...question, logic: { ...question.logic, sourcePosition: question.logic.sourcePosition - 1 } }
        : question)));
    setOpenMenu(null);
  };

  const moveQuestion = (fromUid, toUidValue) => {
    if (fromUid === toUidValue) return;
    setQuestions((current) => {
      const from = current.findIndex((question) => question.uid === fromUid);
      const to = current.findIndex((question) => question.uid === toUidValue);
      if (from < 0 || to < 0) return current;
      const next = [...current];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
    setDragging(null);
  };

  const changeType = (question, type) => {
    update(question.uid, {
      type,
      choices: CHOICE_TYPES.includes(type) ? (question.choices.length ? question.choices : defaultChoices(type)) : [],
      settings: {
        ...question.settings,
        allowOther: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'].includes(type) ? question.settings.allowOther : false,
        maxSelections: type === 'MULTIPLE_CHOICE' ? question.settings.maxSelections : null,
      },
      logic: LOGIC_TYPES.includes(type) ? question.logic : null,
    });
  };

  /* Enter in an option adds the next row and moves focus there; Backspace on an
     empty row takes it away and hands focus back. No button to reach for. */
  const onOptionKeyDown = (event, question, choiceIndex) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const next = [...question.choices];
      next.splice(choiceIndex + 1, 0, '');
      update(question.uid, { choices: next });
      window.requestAnimationFrame(() => {
        const input = optionRefs.current[`${question.uid}-${choiceIndex + 1}`];
        input?.focus();
        input?.select();
      });
    }
    if (event.key === 'Backspace' && !question.choices[choiceIndex] && question.choices.length > 2) {
      event.preventDefault();
      const next = question.choices.filter((_, position) => position !== choiceIndex);
      update(question.uid, { choices: next });
      window.requestAnimationFrame(() => optionRefs.current[`${question.uid}-${Math.max(0, choiceIndex - 1)}`]?.focus());
    }
  };

  const checks = useMemo(() => {
    const issues = [];
    questions.forEach((question, index) => {
      const n = index + 1;
      if (!question.prompt.trim()) issues.push(text.issuePrompt.replace('{n}', n));
      if (CHOICE_TYPES.includes(question.type) && question.type !== 'RATING' && question.choices.filter((choice) => choice.trim()).length < 2) {
        issues.push(text.issueOptions.replace('{n}', n));
      }
      if (question.logic?.sourcePosition) {
        const source = questions[question.logic.sourcePosition - 1];
        if (!source) issues.push(text.issueLogic.replace('{n}', n));
        else if (!source.choices.includes(question.logic.value)) issues.push(text.issueLogicValue.replace('{n}', n));
      }
      const earlier = questions.slice(0, index).findIndex((item) => item.prompt && item.prompt === question.prompt);
      if (question.prompt && earlier >= 0) issues.push(text.issueDuplicate.replace('{n}', n).replace('{m}', earlier + 1));
    });
    return issues;
  }, [questions, text]);

  const minutes = Math.max(1, Math.round(questions.length * 0.75));

  const save = async ({ publish = false, acknowledged = false } = {}) => {
    if (saving) return;
    if (publish && hasSensitive && !acknowledged) {
      setSensitiveOpen(true);
      return;
    }
    setSaving(publish ? 'publish' : 'save');
    setError('');
    setMessage('');
    try {
      await saveBusinessQuestionnaire(projectId, {
        title: project?.questionnaire?.title || project?.title || text.untitled,
        coverDescription: cover || '',
        collectionMode: project?.questionnaire?.collectionMode || 'AUDIENCE_SOURCING',
        isCollecting: Boolean(project?.questionnaire?.isCollecting),
        questions: questions.map((question, index) => ({
          type: question.type,
          section: question.section,
          prompt: question.prompt || `Question ${index + 1}`,
          required: question.required,
          choices: question.choices,
          settings: savedSettings(question.settings),
          logic: question.logic,
        })),
      });
      if (publish) await publishBusinessQuestionnaire(projectId, { sensitiveDataAcknowledged: acknowledged });
      await load();
      setMessage(text.saved);
    } catch (failure) {
      setError(failure?.response?.data?.message || text.saveFailed);
    } finally {
      setSaving('');
    }
  };

  const archive = async () => {
    setMoreOpen(false);
    setSaving('archive');
    try {
      await archiveBusinessQuestionnaire(projectId);
      await load();
      setMessage(text.archived);
    } catch (failure) {
      setError(failure?.response?.data?.message || text.saveFailed);
    } finally { setSaving(''); }
  };

  const duplicate = async () => {
    setMoreOpen(false);
    setSaving('duplicate');
    try {
      const response = await duplicateBusinessQuestionnaire(projectId);
      navigate(withLanguage(`/business/projects/${response.data.project.id}`, language));
    } catch (failure) {
      setError(failure?.response?.data?.message || text.saveFailed);
      setSaving('');
    }
  };

  const removeDraft = async () => {
    setMoreOpen(false);
    if (!window.confirm(text.deleteConfirm)) return;
    setSaving('delete');
    try {
      await deleteBusinessProject(projectId);
      navigate(withLanguage('/business/workspace?view=questionnaires', language));
    } catch (failure) {
      setError(failure?.response?.data?.message || text.saveFailed);
      setSaving('');
    }
  };

  const grouped = SECTIONS.map(([value]) => ({
    value,
    items: questions.filter((question) => question.section === value),
  })).filter((group) => group.items.length);

  const previewList = previewOpen ? questions : [];

  return (
    <main className={`sq-page${readOnly ? ' is-locked' : ''}`}>
      <header className="sq-top">
        <button type="button" className="sq-icon" onClick={() => navigate(withLanguage(`/business/projects/${projectId}`, language))} aria-label={text.back}>
          <ArrowLeft size={17} aria-hidden="true" />
        </button>
        <div className="sq-title">
          <strong>{project?.questionnaire?.title || project?.title || text.untitled}</strong>
          <span className={`sq-status${project?.questionnaire?.status === 'PUBLISHED' ? ' is-live' : ''}`}>
            {project?.questionnaire?.status === 'PUBLISHED' ? text.published : text.draft}
          </span>
        </div>
        <div className="sq-top-actions">
          {message ? <span className="sq-saved"><Check size={14} aria-hidden="true" /> {message}</span> : null}
          <button type="button" className="sq-btn" onClick={() => { setPreviewOpen(true); setPreviewStep(0); }}>
            <Eye size={15} aria-hidden="true" /> {text.preview}
          </button>
          <button type="button" className="sq-btn" onClick={() => save()} disabled={Boolean(saving)}>
            {saving === 'save' ? <LoaderCircle size={15} className="sq-spin" /> : null} {text.save}
          </button>
          <button type="button" className="sq-btn is-primary" onClick={() => save({ publish: true })} disabled={Boolean(saving) || !questions.length}>
            {saving === 'publish' ? <LoaderCircle size={15} className="sq-spin" /> : <Send size={15} aria-hidden="true" />}
            {saving === 'publish' ? text.publishing : text.publish}
          </button>
          <div className="sq-menu-wrap">
            <button type="button" className="sq-icon" aria-label={text.menu} onClick={() => setMoreOpen((open) => !open)}>
              <MoreHorizontal size={17} aria-hidden="true" />
            </button>
            {moreOpen ? (
              <div className="sq-menu">
                <button type="button" onClick={duplicate}><Copy size={14} aria-hidden="true" /> {text.copyDraft}</button>
                {['PUBLISHED', 'PENDING_REVIEW', 'APPROVED'].includes(status) ? (
                  <button type="button" onClick={archive}><Archive size={14} aria-hidden="true" /> {text.archive}</button>
                ) : null}
                {status === 'DRAFT' ? (
                  <button type="button" onClick={removeDraft}><Trash2 size={14} aria-hidden="true" /> {text.deleteDraft}</button>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </header>

      {error ? <p className="sq-error" role="alert">{error}</p> : null}

      <div className="sq-shell">
        {/* The rail is the process, not a menu: audience, questionnaire,
            quote, payment. Each step is a link; only the built ones are live. */}
        <nav className="sq-nav" aria-label={text.flow}>
          <ol className="sq-steps">
            <li>
              <a href={withLanguage(`/business/projects/${projectId}/audience`, language)}>
                <span className="sq-step-n">1</span> {text.stepAudience}
              </a>
            </li>
            <li className="is-current">
              <span><span className="sq-step-n">2</span> {text.stepQuestions}</span>
            </li>
            <li className="is-todo">
              <span><span className="sq-step-n">3</span> {text.stepQuote}</span>
            </li>
            <li className="is-todo">
              <span><span className="sq-step-n">4</span> {text.stepPay}</span>
            </li>
          </ol>
          <a className="sq-nav-back" href={withLanguage(`/business/projects/${projectId}`, language)}>
            <ArrowLeft size={14} aria-hidden="true" /> {text.backToProject}
          </a>
        </nav>

        <section className="sq-canvas">
          {readOnly ? (
            <div className="sq-banner">
              <AlertCircle size={15} aria-hidden="true" />
              <span>{text.locked}</span>
              <button type="button" className="sq-btn" onClick={duplicate}>{text.copyDraft}</button>
            </div>
          ) : null}

          <label className="sq-cover">
            <span>{text.coverTitle}</span>
            <textarea
              rows={2}
              maxLength={600}
              value={cover}
              disabled={readOnly}
              placeholder={text.coverPlaceholder}
              onChange={(event) => { setCover(event.target.value); setMessage(''); }}
            />
          </label>

          {questions.length === 0 ? (
            <div className="sq-empty">
              <p>{text.addQuestion}</p>
              <button type="button" className="sq-btn is-primary" onClick={() => addQuestion('CORE')}>
                <Plus size={15} aria-hidden="true" /> {text.addQuestion}
              </button>
            </div>
          ) : null}

          {grouped.map((group, groupIndex) => (
            <section className="sq-group" key={group.value}>
              <header className="sq-group-head">
                <span className="sq-group-title">Section {groupIndex + 1}: {sectionLabel(group.value)}</span>
                <Star size={14} aria-hidden="true" />
                <button type="button" className="sq-icon" aria-label={text.addQuestion} onClick={() => addQuestion(group.value)}>
                  <Plus size={15} aria-hidden="true" />
                </button>
              </header>

              <div className="sq-page-label"><GripVertical size={13} aria-hidden="true" /> Page 1</div>

              <div className="sq-cards">
                {group.items.map((question) => {
                  const index = questions.findIndex((item) => item.uid === question.uid);
                  const logicSource = question.logic?.sourcePosition ? questions[question.logic.sourcePosition - 1] : null;
                  const isChoice = CHOICE_TYPES.includes(question.type);
                  return (
                    <article
                      key={question.uid}
                      className={`sq-card${dragging === question.uid ? ' is-dragging' : ''}`}
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={() => { if (dragging) moveQuestion(dragging, question.uid); }}
                    >
                      <header className="sq-card-head">
                        <button
                          type="button"
                          className="sq-grip"
                          aria-label="drag"
                          draggable
                          onDragStart={() => setDragging(question.uid)}
                          onDragEnd={() => setDragging(null)}
                        >
                          <GripVertical size={15} aria-hidden="true" />
                        </button>
                        <span className="sq-qnum">Q{index + 1}</span>
                        <input
                          className="sq-prompt"
                          value={question.prompt}
                          placeholder={text.promptPlaceholder}
                          onChange={(event) => update(question.uid, { prompt: event.target.value })}
                        />
                        <label className="sq-type">
                          <select value={question.type} onChange={(event) => changeType(question, event.target.value)} aria-label={text.type}>
                            {TYPES.map(([type]) => <option key={type} value={type}>{typeLabel(type)}</option>)}
                          </select>
                          <ChevronDown size={13} aria-hidden="true" />
                        </label>
                        <label className="sq-required" title={text.required}>
                          <input type="checkbox" checked={question.required} onChange={(event) => update(question.uid, { required: event.target.checked })} />
                          <span>{text.required}</span>
                        </label>
                        <button type="button" className="sq-tool" title={text.duplicate} onClick={() => duplicateQuestion(question.uid)}>
                          <Copy size={15} aria-hidden="true" />
                        </button>
                        <div className="sq-menu-wrap">
                          <button
                            type="button"
                            className="sq-tool"
                            title={text.menu}
                            aria-expanded={openMenu === question.uid}
                            onClick={() => setOpenMenu((current) => (current === question.uid ? null : question.uid))}
                          >
                            <MoreHorizontal size={16} aria-hidden="true" />
                          </button>
                          {openMenu === question.uid ? (
                            <div className="sq-menu">
                              <button type="button" onClick={() => { removeQuestion(question.uid); }}>
                                <Trash2 size={14} aria-hidden="true" /> {text.remove}
                              </button>
                              <button type="button" onClick={() => duplicateQuestion(question.uid)}>
                                <Copy size={14} aria-hidden="true" /> {text.duplicate}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  const target = questions[index - 1];
                                  if (target) moveQuestion(question.uid, target.uid);
                                  setOpenMenu(null);
                                }}
                                disabled={index === 0}
                              >
                                <ArrowLeft size={14} aria-hidden="true" className="sq-up" /> {text.moveUp}
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </header>

                      {isChoice ? (
                        <div className="sq-options">
                          {question.choices.map((choice, choiceIndex) => (
                            <div className="sq-option" key={`${question.uid}-${choiceIndex}`}>
                              <span className="sq-bullet" aria-hidden="true" />
                              <input
                                ref={(node) => { optionRefs.current[`${question.uid}-${choiceIndex}`] = node; }}
                                value={choice}
                                placeholder={text.optionPlaceholder.replace('{n}', choiceIndex + 1)}
                                onChange={(event) => {
                                  const next = [...question.choices];
                                  next[choiceIndex] = event.target.value;
                                  update(question.uid, { choices: next });
                                }}
                                onKeyDown={(event) => onOptionKeyDown(event, question, choiceIndex)}
                              />
                              <button
                                type="button"
                                className="sq-tool"
                                onClick={() => update(question.uid, { choices: question.choices.filter((_, position) => position !== choiceIndex) })}
                                disabled={question.choices.length <= 2}
                                title={text.remove}
                              >
                                <X size={14} aria-hidden="true" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className="sq-add-option"
                            onClick={() => {
                              const next = [...question.choices, ''];
                              update(question.uid, { choices: next });
                              window.requestAnimationFrame(() => optionRefs.current[`${question.uid}-${next.length - 1}`]?.focus());
                            }}
                          >
                            <Plus size={14} aria-hidden="true" /> {text.addOption}
                          </button>
                        </div>
                      ) : null}

                      {question.type === 'RATING' ? (
                        <div className="sq-scale">
                          <input
                            placeholder={language === 'zh-CN' ? '低分说明' : 'Low end'}
                            value={question.settings.scaleLowLabel || ''}
                            onChange={(event) => updateSettings(question.uid, { scaleLowLabel: event.target.value })}
                          />
                          <input
                            placeholder={language === 'zh-CN' ? '高分说明' : 'High end'}
                            value={question.settings.scaleHighLabel || ''}
                            onChange={(event) => updateSettings(question.uid, { scaleHighLabel: event.target.value })}
                          />
                        </div>
                      ) : null}

                      <div className={`sq-logic${logicSource ? ' is-set' : ''}`}>
                        <Settings2 size={13} aria-hidden="true" />
                        {logicSource ? (
                          <span className="sq-logic-text">
                            {text.logicWhen} Q{question.logic.sourcePosition} {text.logicIs}
                            <select
                              value={question.logic.value}
                              onChange={(event) => update(question.uid, { logic: { ...question.logic, value: event.target.value } })}
                            >
                              {logicSource.choices.map((choice) => <option key={choice} value={choice}>{choice}</option>)}
                            </select>
                            <button type="button" className="sq-link" onClick={() => update(question.uid, { logic: null })}>{text.remove}</button>
                          </span>
                        ) : (
                          <button
                            type="button"
                            className="sq-link"
                            disabled={index === 0}
                            onClick={() => setOpenLogic((current) => (current === question.uid ? null : question.uid))}
                          >
                            {text.logicAdd}
                          </button>
                        )}
                        {openLogic === question.uid ? (
                          <select
                            autoFocus
                            defaultValue=""
                            onChange={(event) => {
                              if (!event.target.value) return;
                              const position = Number(event.target.value);
                              update(question.uid, { logic: { sourcePosition: position, value: questions[position - 1]?.choices?.[0] || '' } });
                              setOpenLogic(null);
                            }}
                          >
                            <option value="">{text.logicPick}</option>
                            {questions.slice(0, index).filter((item) => LOGIC_TYPES.includes(item.type)).map((item) => (
                              <option key={item.uid} value={questions.indexOf(item) + 1}>Q{questions.indexOf(item) + 1} · {item.prompt || '—'}</option>
                            ))}
                          </select>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>

              <button type="button" className="sq-add-question" onClick={() => addQuestion(group.value)}>
                <Plus size={15} aria-hidden="true" /> {text.addQuestion}
              </button>
            </section>
          ))}
        </section>

        <aside className="sq-side" id="quality">
          <section className="sq-side-block">
            <h2>{text.summary}</h2>
            <dl>
              <div><dt>{text.questionsN}</dt><dd>{questions.length}/{MAX_QUESTIONS}</dd></div>
              <div><dt>{text.requiredN}</dt><dd>{questions.filter((question) => question.required).length}</dd></div>
              <div><dt>{text.minutes}</dt><dd>{text.minutesValue.replace('{n}', minutes)}</dd></div>
            </dl>
          </section>
          <section className="sq-side-block">
            <h2>{text.quality}</h2>
            {checks.length === 0 ? (
              <p className="sq-ok"><CheckCircle2 size={15} aria-hidden="true" /> {text.noIssues}</p>
            ) : (
              <ul className="sq-issues">
                {checks.map((issue) => <li key={issue}><AlertCircle size={14} aria-hidden="true" /> {issue}</li>)}
              </ul>
            )}
          </section>
        </aside>
      </div>

      {sensitiveOpen ? (
        <div className="sq-modal" role="dialog" aria-modal="true" aria-label={text.sensitiveTitle}>
          <button type="button" className="sq-modal-scrim" aria-label={text.close} onClick={() => setSensitiveOpen(false)} />
          <section className="sq-modal-card is-narrow">
            <header><strong>{text.sensitiveTitle}</strong></header>
            <div className="sq-modal-body"><p className="sq-preview-empty">{text.sensitiveBody}</p></div>
            <footer>
              <button type="button" className="sq-btn" onClick={() => setSensitiveOpen(false)}>{text.sensitiveCancel}</button>
              <button
                type="button"
                className="sq-btn is-primary"
                onClick={() => { setSensitiveOpen(false); save({ publish: true, acknowledged: true }); }}
              >
                {text.sensitiveConfirm}
              </button>
            </footer>
          </section>
        </div>
      ) : null}

      {previewOpen ? (
        <div className="sq-modal" role="dialog" aria-modal="true" aria-label={text.previewTitle}>
          <button type="button" className="sq-modal-scrim" aria-label={text.close} onClick={() => setPreviewOpen(false)} />
          <section className="sq-modal-card">
            <header>
              <strong>{text.previewTitle}</strong>
              <span className="sq-modal-count">{previewStep + 1} / {Math.max(1, previewList.length)}</span>
              <button type="button" className="sq-icon" onClick={() => setPreviewOpen(false)} aria-label={text.close}>
                <X size={17} aria-hidden="true" />
              </button>
            </header>
            <div className="sq-modal-body">
              {previewList[previewStep] ? (
                <div className="sq-preview-q">
                  <p>{previewList[previewStep].prompt || '—'}{previewList[previewStep].required ? <em>*</em> : null}</p>
                  <PreviewAnswer question={previewList[previewStep]} />
                </div>
              ) : <p className="sq-preview-empty">—</p>}
            </div>
            <footer>
              <button type="button" className="sq-btn" disabled={previewStep === 0} onClick={() => setPreviewStep((step) => Math.max(0, step - 1))}>
                {text.prev}
              </button>
              <button
                type="button"
                className="sq-btn is-primary"
                onClick={() => {
                  if (previewStep >= previewList.length - 1) setPreviewOpen(false);
                  else setPreviewStep((step) => step + 1);
                }}
              >
                {previewStep >= previewList.length - 1 ? text.finish : text.next}
              </button>
            </footer>
          </section>
        </div>
      ) : null}
    </main>
  );
}
