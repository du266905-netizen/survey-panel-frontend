import { useEffect, useMemo, useRef, useState } from 'react';
import { Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, ClipboardList, Copy, Eye, LoaderCircle, Plus, ShieldAlert, SlidersHorizontal, Trash2, UsersRound, X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { archiveBusinessQuestionnaire, deleteBusinessProject, duplicateBusinessQuestionnaire, getBusinessProject, getBusinessQuestionnaireResponses, publishBusinessQuestionnaire, saveBusinessQuestionnaire } from '../api/realApi';
import './BusinessQuestionnaire.css';

const questionTypes = [
  ['SINGLE_CHOICE', 'Single choice'], ['MULTIPLE_CHOICE', 'Multiple choice'], ['RANKING', 'Rank choices'],
  ['RATING', 'Rating scale'], ['NUMBER', 'Number'], ['SHORT_TEXT', 'Short text'], ['LONG_TEXT', 'Long text'],
];
const questionSections = [['SCREENING', 'Screening'], ['CORE', 'Core questions'], ['PROFILE', 'Profile'], ['CLOSING', 'Closing']];
const collectionOptions = [
  ['SELF_DISTRIBUTED', 'Share with your own audience', 'Create a link for your own customers, members, or contacts. Results are not population-representative by default.'],
  ['AUDIENCE_SOURCING', 'Request participant feasibility', 'Ask for a review of the intended audience. Sample, availability, price, and timing require confirmation.'],
  ['RESEARCH_SUPPORT', 'Request research support', 'Ask for questionnaire design support or a tailored study proposal. This request does not launch a study.'],
];
const choiceQuestion = (type) => ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING', 'RANKING'].includes(type);
const logicSourceQuestion = (type) => ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING'].includes(type);
const defaultChoices = (type) => type === 'RATING' ? ['1', '2', '3', '4', '5'] : choiceQuestion(type) ? ['Option 1', 'Option 2'] : [];
const defaultSettings = () => ({ allowOther: false, maxSelections: null, randomizeChoices: false, scaleLowLabel: '', scaleHighLabel: '' });
const questionKey = () => window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
const newQuestion = (type = 'SINGLE_CHOICE') => ({ tempId: questionKey(), type, section: 'CORE', prompt: '', required: false, choices: defaultChoices(type), settings: defaultSettings(), logic: null });
const normalizeQuestion = (question) => ({ ...newQuestion(question.type || 'SINGLE_CHOICE'), ...question, section: question.section || 'CORE', choices: Array.isArray(question.choices) ? question.choices : defaultChoices(question.type), settings: { ...defaultSettings(), ...(question.settings || {}) }, logic: question.logic || null });
const questionIdentity = (question) => question?.id || question?.tempId;
const draftSnapshot = ({ title, coverDescription, collectionMode, questions }) => JSON.stringify({ title, coverDescription, collectionMode, questions: questions.map(({ type, section, prompt, required, choices, settings, logic }) => ({ type, section, prompt, required, choices, settings, logic })) });

function remapLogicAfterReorder(previous, ordered) {
  return ordered.map((question) => {
    if (!question.logic?.sourcePosition) return question;
    const source = previous[question.logic.sourcePosition - 1];
    const sourcePosition = ordered.findIndex((item) => questionIdentity(item) === questionIdentity(source)) + 1;
    return sourcePosition ? { ...question, logic: { ...question.logic, sourcePosition } } : { ...question, logic: null };
  });
}

function questionIsVisible(question, questions, answers) {
  if (!question.logic?.sourcePosition || !question.logic?.value) return true;
  const source = questions[question.logic.sourcePosition - 1];
  const answer = source ? answers[questionIdentity(source)] : null;
  return Array.isArray(answer) ? answer.includes(question.logic.value) : answer === question.logic.value;
}

function hasAnswer(value) {
  return Array.isArray(value) ? value.length > 0 : String(value ?? '').trim().length > 0;
}

const audienceModules = [
  { id: 'age', title: 'Age band', detail: 'Use only the bands needed for screening or analysis.', type: 'SINGLE_CHOICE', prompt: 'Which age range are you in?', choices: ['18–24', '25–34', '35–44', '45–54', '55–64', '65 or older', 'Prefer not to say'], settings: { allowOther: false } },
  { id: 'location', title: 'Location', detail: 'Country, region, city, or market — adapt to the study.', type: 'SHORT_TEXT', prompt: 'Which country or market do you currently live in?', choices: [] },
  { id: 'education', title: 'Education', detail: 'Optional; use only where it supports the decision.', type: 'SINGLE_CHOICE', prompt: 'What is the highest level of education you have completed?', choices: ['Secondary school or below', 'Vocational or technical qualification', 'Undergraduate degree', 'Postgraduate degree', 'Prefer not to say'], settings: { allowOther: true } },
  { id: 'employment', title: 'Employment & industry', detail: 'Keep employment status separate from industry for clearer reporting.', type: 'SINGLE_CHOICE', prompt: 'Which best describes your current employment status?', choices: ['Employed full-time', 'Employed part-time', 'Self-employed', 'Student', 'Not currently employed', 'Retired', 'Prefer not to say'], settings: { allowOther: true } },
  { id: 'industry', title: 'Industry', detail: 'Useful for B2B and workforce studies.', type: 'SHORT_TEXT', prompt: 'Which industry do you mainly work in?', choices: [] },
  { id: 'income', title: 'Household income', detail: 'Sensitive: use locally appropriate bands and always allow an opt-out.', type: 'SINGLE_CHOICE', prompt: 'Which household income range best describes your household?', choices: ['Lower income range', 'Middle income range', 'Higher income range', 'Prefer not to say'], settings: { allowOther: false } },
  { id: 'household', title: 'Household structure', detail: 'Add only when it affects the product or decision.', type: 'MULTIPLE_CHOICE', prompt: 'Which people live in your household?', choices: ['I live alone', 'Partner or spouse', 'Children under 18', 'Other adults', 'Prefer not to say'], settings: { allowOther: true, maxSelections: null } },
];

function questionFromAudienceModule(module) {
  return {
    ...newQuestion(module.type),
    section: 'PROFILE',
    prompt: module.prompt,
    choices: [...module.choices],
    settings: { ...defaultSettings(), ...(module.settings || {}) },
  };
}

function PreviewQuestionField({ question, value, onChange }) {
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const settings = { ...defaultSettings(), ...(question.settings || {}) };
  const displayChoices = useMemo(() => settings.randomizeChoices ? [...choices].sort(() => Math.random() - .5) : choices, [question.id, question.tempId, question.choices, settings.randomizeChoices]);
  if (question.type === 'LONG_TEXT') return <textarea value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'SHORT_TEXT') return <input value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'NUMBER') return <input type="number" inputMode="decimal" value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'RANKING') return <div className="business-preview-options business-preview-ranking">{displayChoices.map((choice) => <label key={choice}><span>{Array.isArray(value) ? value.indexOf(choice) + 1 || '—' : '—'}</span><input type="checkbox" checked={Array.isArray(value) && value.includes(choice)} onChange={(event) => onChange(event.target.checked ? [...(Array.isArray(value) ? value : []), choice] : (Array.isArray(value) ? value.filter((item) => item !== choice) : []))} /> {choice}</label>)}<small>Select choices in the order you prefer them.</small></div>;
  if (question.type === 'MULTIPLE_CHOICE') {
    const other = Array.isArray(value) ? value.find((item) => item.startsWith('Other: ')) : '';
    return <div className="business-preview-options">{displayChoices.map((choice) => <label key={choice}><input type="checkbox" checked={Array.isArray(value) && value.includes(choice)} onChange={(event) => { const next = event.target.checked ? [...(Array.isArray(value) ? value : []), choice] : (Array.isArray(value) ? value.filter((item) => item !== choice) : []); if (!settings.maxSelections || next.length <= settings.maxSelections) onChange(next); }} /> {choice}</label>)}{settings.allowOther && <label><input type="checkbox" checked={Boolean(other)} onChange={(event) => onChange(event.target.checked ? [...(Array.isArray(value) ? value : []), 'Other: details'] : (Array.isArray(value) ? value.filter((item) => !item.startsWith('Other: ')) : []))} /> Other {other && <input aria-label="Other answer" value={other.replace(/^Other:\s*/, '')} onChange={(event) => onChange((Array.isArray(value) ? value : []).map((item) => item.startsWith('Other: ') ? `Other: ${event.target.value}` : item))} />}</label>}</div>;
  }
  const other = typeof value === 'string' && value.startsWith('Other: ') ? value : '';
  return <div className="business-preview-options">{displayChoices.map((choice) => <label key={choice}><input type="radio" name={`preview-${questionIdentity(question)}`} checked={value === choice} onChange={() => onChange(choice)} /> {choice}</label>)}{settings.allowOther && <label><input type="radio" name={`preview-${questionIdentity(question)}`} checked={Boolean(other)} onChange={() => onChange('Other: details')} /> Other {other && <input aria-label="Other answer" value={other.replace(/^Other:\s*/, '')} onChange={(event) => onChange(`Other: ${event.target.value}`)} />}</label>}{question.type === 'RATING' && (settings.scaleLowLabel || settings.scaleHighLabel) && <small className="business-preview-scale"><span>{settings.scaleLowLabel}</span><span>{settings.scaleHighLabel}</span></small>}</div>;
}

function QuestionnairePreview({ title, coverDescription, questions, onClose }) {
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const visibleQuestions = questions.filter((question) => questionIsVisible(question, questions, answers));
  const submit = (event) => {
    event.preventDefault();
    const missing = visibleQuestions.find((question) => question.required && !hasAnswer(answers[questionIdentity(question)]));
    if (missing) { setComplete(false); setError('Answer every required question to test this preview.'); document.getElementById(`preview-question-${questionIdentity(missing)}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    setError(''); setComplete(true);
  };
  return <div className="business-preview-modal" role="dialog" aria-modal="true" aria-label="Questionnaire preview"><div className="business-preview-shell"><header><div><p>PREVIEW ONLY</p><strong>This uses the current unsaved draft. No response will be recorded.</strong></div><button type="button" onClick={onClose} aria-label="Close preview"><X size={18} /></button></header><form onSubmit={submit}><p>QUESTIONNAIRE</p><h1>{title || 'Untitled questionnaire'}</h1>{coverDescription && <span className="business-preview-cover">{coverDescription}</span>}{visibleQuestions.map((question, index) => <fieldset id={`preview-question-${questionIdentity(question)}`} key={questionIdentity(question)}><legend>{index + 1}. {question.prompt || 'Untitled question'} {question.required && <em>Required</em>}</legend><PreviewQuestionField question={question} value={answers[questionIdentity(question)]} onChange={(value) => { setComplete(false); setAnswers((current) => ({ ...current, [questionIdentity(question)]: value })); }} /></fieldset>)}{!questions.length && <p className="business-preview-empty">Add a question to test the respondent experience.</p>}{error && <p className="business-preview-error">{error}</p>}{complete && <p className="business-preview-complete"><Check size={16} /> Preview complete. This did not save a response.</p>}<footer><button type="button" onClick={onClose}>Return to editor</button><button type="submit" className="business-builder-publish" disabled={!questions.length}>Test required questions</button></footer></form></div></div>;
}

function QuestionCard({ question, index, questions, locked, onUpdate, onRemove, onMove }) {
  const isChoice = choiceQuestion(question.type);
  const sources = questions.slice(0, index).filter((item) => logicSourceQuestion(item.type) && item.choices?.length);
  const logicSource = sources.find((item) => item.position + 1 === question.logic?.sourcePosition || questions.indexOf(item) + 1 === question.logic?.sourcePosition);
  const sourceChoices = logicSource?.choices || [];
  const settings = { ...defaultSettings(), ...(question.settings || {}) };
  const updateSettings = (changes) => onUpdate({ settings: { ...settings, ...changes } });
  const changeType = (type) => onUpdate({ type, choices: choiceQuestion(type) ? (question.type === type && question.choices?.length ? question.choices : defaultChoices(type)) : [], settings: { ...settings, allowOther: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'].includes(type) ? settings.allowOther : false, maxSelections: type === 'MULTIPLE_CHOICE' ? settings.maxSelections : null } });
  const updateChoice = (choiceIndex, value) => onUpdate({ choices: question.choices.map((choice, position) => position === choiceIndex ? value : choice) });
  return <article className="business-question-card business-question-card-rich">
    <div className="business-question-card-head"><span>Question {index + 1}</span><div><button type="button" disabled={locked || index === 0} onClick={() => onMove(-1)} aria-label={`Move question ${index + 1} up`}><ArrowUp size={15} /></button><button type="button" disabled={locked || index === questions.length - 1} onClick={() => onMove(1)} aria-label={`Move question ${index + 1} down`}><ArrowDown size={15} /></button><select aria-label={`Question ${index + 1} section`} value={question.section} disabled={locked} onChange={(event) => onUpdate({ section: event.target.value })}>{questionSections.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><button type="button" disabled={locked} onClick={onRemove} aria-label={`Delete question ${index + 1}`}><Trash2 size={16} /></button></div></div>
    <textarea value={question.prompt} disabled={locked} onChange={(event) => onUpdate({ prompt: event.target.value })} placeholder="Write a clear, single-focus question" aria-label={`Question ${index + 1} text`} />
    <div className="business-question-controls"><select value={question.type} disabled={locked} onChange={(event) => changeType(event.target.value)}>{questionTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><label><input type="checkbox" disabled={locked} checked={question.required} onChange={(event) => onUpdate({ required: event.target.checked })} /> Required</label></div>
    {isChoice && <div className="business-question-choices">{question.choices.map((choice, choiceIndex) => <div key={`${question.id || question.tempId}-${choiceIndex}`}><span>{choiceIndex + 1}</span><input value={choice} disabled={locked} onChange={(event) => updateChoice(choiceIndex, event.target.value)} aria-label={`Option ${choiceIndex + 1}`} /><button type="button" disabled={locked || question.choices.length <= 2} onClick={() => onUpdate({ choices: question.choices.filter((_, position) => position !== choiceIndex) })}><Trash2 size={15} /></button></div>)}<button className="business-question-add-choice" disabled={locked || question.type === 'RATING'} type="button" onClick={() => onUpdate({ choices: [...question.choices, `Option ${question.choices.length + 1}`] })}><Plus size={14} /> Add option</button></div>}
    <div className="business-question-advanced">
      {['SINGLE_CHOICE', 'MULTIPLE_CHOICE'].includes(question.type) && <label><input type="checkbox" disabled={locked} checked={settings.allowOther} onChange={(event) => updateSettings({ allowOther: event.target.checked })} /> Let people write another answer</label>}
      {isChoice && question.type !== 'RATING' && <label><input type="checkbox" disabled={locked} checked={settings.randomizeChoices} onChange={(event) => updateSettings({ randomizeChoices: event.target.checked })} /> Shuffle choices for respondents</label>}
      {question.type === 'MULTIPLE_CHOICE' && <label className="business-inline-number">Maximum selections <input type="number" min="1" max={Math.max(1, question.choices.length)} disabled={locked} value={settings.maxSelections || ''} onChange={(event) => updateSettings({ maxSelections: event.target.value ? Number(event.target.value) : null })} /></label>}
      {question.type === 'RATING' && <div className="business-scale-labels"><input value={settings.scaleLowLabel} disabled={locked} onChange={(event) => updateSettings({ scaleLowLabel: event.target.value })} placeholder="Low-end label (optional)" /><input value={settings.scaleHighLabel} disabled={locked} onChange={(event) => updateSettings({ scaleHighLabel: event.target.value })} placeholder="High-end label (optional)" /></div>}
    </div>
    {sources.length > 0 && <details className="business-question-logic"><summary><SlidersHorizontal size={14} /> Display rule {question.logic ? '· active' : ''}</summary><p>Show this question only when an earlier answer matches.</p><label><input type="checkbox" disabled={locked} checked={Boolean(question.logic)} onChange={(event) => onUpdate({ logic: event.target.checked ? { sourcePosition: questions.indexOf(sources[0]) + 1, value: sources[0].choices[0] } : null })} /> Use a display rule</label>{question.logic && <div><select disabled={locked} value={question.logic.sourcePosition} onChange={(event) => { const source = questions[Number(event.target.value) - 1]; onUpdate({ logic: { sourcePosition: Number(event.target.value), value: source?.choices?.[0] || '' } }); }}>{sources.map((source) => <option value={questions.indexOf(source) + 1} key={source.id || source.tempId}>Q{questions.indexOf(source) + 1}: {source.prompt || 'Untitled question'}</option>)}</select><select disabled={locked} value={question.logic.value} onChange={(event) => onUpdate({ logic: { ...question.logic, value: event.target.value } })}>{sourceChoices.map((choice) => <option value={choice} key={choice}>{choice}</option>)}</select></div>}</details>}
  </article>;
}

function buildChecks(questions) {
  const checks = [];
  const core = questions.filter((question) => question.section === 'CORE').length;
  const open = questions.filter((question) => ['SHORT_TEXT', 'LONG_TEXT'].includes(question.type)).length;
  if (!questions.length) checks.push(['warning', 'Add the first question to start a usable questionnaire.']);
  if (questions.length > 20) checks.push(['warning', 'This draft has more than 20 questions. Consider whether every question supports the decision.']);
  if (questions.length && !core) checks.push(['warning', 'Add at least one core question that answers the study goal.']);
  if (open > Math.ceil(Math.max(questions.length, 1) / 3)) checks.push(['warning', 'There are many open-text questions. They take longer to answer and analyse.']);
  questions.forEach((question, index) => {
    const cleanChoices = question.choices.map((choice) => String(choice).trim().toLocaleLowerCase()).filter(Boolean);
    const hasDuplicateChoices = new Set(cleanChoices).size !== cleanChoices.length;
    const isSensitiveProfile = question.section === 'PROFILE' && /(income|salary|gender|sex|ethnic|race|religion|health|disab)/i.test(question.prompt);
    if (question.prompt.trim().length < 3) checks.push(['warning', `Question ${index + 1} needs clear wording.`]);
    if (choiceQuestion(question.type) && question.choices.filter(Boolean).length < 2) checks.push(['warning', `Question ${index + 1} needs at least two answer options.`]);
    if (hasDuplicateChoices) checks.push(['warning', `Question ${index + 1} has duplicate answer options.`]);
    if (question.type === 'RATING' && question.settings?.randomizeChoices) checks.push(['warning', `Question ${index + 1} is an ordered scale; do not shuffle its response order.`]);
    if (isSensitiveProfile && question.required) checks.push(['warning', `Question ${index + 1} asks for potentially sensitive profile data. Make it optional unless it is necessary and justified.`]);
    if (question.logic && question.logic.sourcePosition >= index + 1) checks.push(['warning', `Question ${index + 1} has a display rule that must point to an earlier question.`]);
  });
  if (!checks.length) checks.push(['ready', 'Structure looks ready to preview. Review wording, audience and consent before publishing.']);
  return checks;
}

export default function BusinessQuestionnaireBuilder() {
  const { projectId } = useParams(); const navigate = useNavigate();
  const [project, setProject] = useState(null); const [title, setTitle] = useState(''); const [coverDescription, setCoverDescription] = useState(''); const [questions, setQuestions] = useState([]); const [collectionMode, setCollectionMode] = useState('SELF_DISTRIBUTED');
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [sensitiveNoticeOpen, setSensitiveNoticeOpen] = useState(false); const [responses, setResponses] = useState([]); const [audienceModulesOpen, setAudienceModulesOpen] = useState(false); const [previewOpen, setPreviewOpen] = useState(false);
  const savedSnapshotRef = useRef(null);
  const questionnaire = project?.questionnaire; const responseCount = questionnaire?.responseCount || 0; const structureLocked = questionnaire?.status === 'PUBLISHED' && responseCount > 0;
  const publicUrl = useMemo(() => questionnaire?.publicId ? `${window.location.origin}/business/s/${questionnaire.publicId}` : '', [questionnaire?.publicId]);
  const checks = useMemo(() => buildChecks(questions), [questions]);
  const currentSnapshot = useMemo(() => draftSnapshot({ title, coverDescription, collectionMode, questions }), [title, coverDescription, collectionMode, questions]);
  const isDirty = savedSnapshotRef.current !== null && savedSnapshotRef.current !== currentSnapshot;
  const statusLabel = questionnaire?.status === 'PENDING_REVIEW' ? (collectionMode === 'SELF_DISTRIBUTED' ? 'Pending publication review' : 'Quote requested · content review pending') : questionnaire?.status === 'APPROVED' ? 'Content approved · awaiting launch' : questionnaire?.status === 'PUBLISHED' ? (questionnaire.isCollecting ? 'Live' : 'Collection paused') : questionnaire?.status === 'ARCHIVED' ? 'Archived' : 'Draft';
  useEffect(() => { let active = true; getBusinessProject(projectId).then((response) => { if (!active) return; const nextProject = response.data.project; if (!nextProject.questionnaire) { navigate('/business/workspace', { replace: true }); return; } const nextTitle = nextProject.questionnaire.title || nextProject.title; const nextCoverDescription = nextProject.questionnaire.coverDescription || ''; const nextCollectionMode = nextProject.questionnaire.collectionMode || 'SELF_DISTRIBUTED'; const nextQuestions = (nextProject.questionnaire.questions || []).map(normalizeQuestion); savedSnapshotRef.current = draftSnapshot({ title: nextTitle, coverDescription: nextCoverDescription, collectionMode: nextCollectionMode, questions: nextQuestions }); setProject(nextProject); setTitle(nextTitle); setCoverDescription(nextCoverDescription); setCollectionMode(nextCollectionMode); setQuestions(nextQuestions); if (nextProject.questionnaire.responseCount) getBusinessQuestionnaireResponses(projectId).then((result) => { if (active) setResponses(result.data.responses || []); }).catch(() => {}); }).catch((caughtError) => { if (active) setError(caughtError.response?.data?.message || 'We could not load this questionnaire.'); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [navigate, projectId]);
  const updateQuestion = (index, changes) => { if (!structureLocked) setQuestions((current) => current.map((question, position) => position === index ? { ...question, ...changes } : question)); };
  const addAudienceModule = (module) => { if (!structureLocked && !questions.some((question) => question.section === 'PROFILE' && question.prompt === module.prompt)) { setQuestions((current) => [...current, questionFromAudienceModule(module)]); setMessage(`${module.title} added to this draft. Review it below, then save the draft.`); } };
  const moveQuestion = (index, direction) => {
    if (structureLocked || index + direction < 0 || index + direction >= questions.length) return;
    const ordered = [...questions]; const [moved] = ordered.splice(index, 1); ordered.splice(index + direction, 0, moved);
    const remapped = remapLogicAfterReorder(questions, ordered);
    const breaksRule = questions.some((question, position) => {
      if (!question.logic?.sourcePosition || question.logic.sourcePosition >= position + 1) return false;
      const source = questions[question.logic.sourcePosition - 1];
      const nextQuestionIndex = remapped.findIndex((item) => questionIdentity(item) === questionIdentity(question));
      const nextSourceIndex = remapped.findIndex((item) => questionIdentity(item) === questionIdentity(source));
      return nextSourceIndex >= 0 && nextQuestionIndex >= 0 && nextSourceIndex >= nextQuestionIndex;
    });
    if (breaksRule) { setError('That move would put a display-rule source after its dependent question. Move the dependent question first.'); return; }
    setQuestions(remapped); setError(''); setMessage('Question order updated. Display rules still point to the same source questions.');
  };
  const save = async ({ publish = false, sensitiveDataAcknowledged = false } = {}) => { if (!questionnaire || saving) return; setSaving(true); setMessage(''); setError(''); try { const response = await saveBusinessQuestionnaire(projectId, { title, coverDescription, collectionMode, isCollecting: questionnaire.status === 'PUBLISHED' ? questionnaire.isCollecting : false, questions: questions.map(({ type, section, prompt, required, choices, settings, logic }) => ({ type, section, prompt, required, choices, settings, logic })) }); let nextQuestionnaire = response.data.questionnaire; if (publish) nextQuestionnaire = (await publishBusinessQuestionnaire(projectId, { sensitiveDataAcknowledged })).data.questionnaire; const nextQuestions = (nextQuestionnaire.questions || questions).map(normalizeQuestion); savedSnapshotRef.current = draftSnapshot({ title: nextQuestionnaire.title || title, coverDescription: nextQuestionnaire.coverDescription || '', collectionMode: nextQuestionnaire.collectionMode || collectionMode, questions: nextQuestions }); setProject((current) => ({ ...current, questionnaire: nextQuestionnaire })); setQuestions(nextQuestions); setSensitiveNoticeOpen(false); setMessage(publish ? (collectionMode === 'SELF_DISTRIBUTED' ? 'Your questionnaire is pending publication review.' : 'Your project is submitted for scope, pricing and content review.') : 'Draft saved.'); } catch (caughtError) { if (publish && caughtError.response?.data?.code === 'SENSITIVE_DATA_NOTICE_REQUIRED') setSensitiveNoticeOpen(true); setError(caughtError.response?.data?.message || 'We could not save this questionnaire. Please check the questions and try again.'); } finally { setSaving(false); } };
  const archive = async () => { if (!questionnaire || saving) return; setSaving(true); setError(''); try { const response = await archiveBusinessQuestionnaire(projectId); setProject((current) => ({ ...current, questionnaire: response.data.questionnaire })); setMessage('Questionnaire archived. Its public link is no longer collecting responses.'); } catch (caughtError) { setError(caughtError.response?.data?.message || 'We could not archive this questionnaire.'); } finally { setSaving(false); } };
  const deleteDraft = async () => {
    if (!questionnaire || questionnaire.status !== 'DRAFT' || responseCount > 0 || saving) return;
    if (!window.confirm('Delete this draft? This cannot be undone.')) return;
    setSaving(true); setError('');
    try { await deleteBusinessProject(projectId); navigate('/business/workspace?view=questionnaires'); }
    catch (caughtError) { setError(caughtError.response?.data?.message || 'This draft could not be deleted.'); }
    finally { setSaving(false); }
  };
  const duplicate = async () => { if (!questionnaire || saving) return; setSaving(true); setError(''); try { const response = await duplicateBusinessQuestionnaire(projectId); navigate(`/business/projects/${response.data.project.id}`); } catch (caughtError) { setError(caughtError.response?.data?.message || 'We could not copy this questionnaire.'); } finally { setSaving(false); } };
  const copyPublicLink = async () => { try { await window.navigator.clipboard.writeText(publicUrl); setMessage('Share link copied.'); } catch { setError('Copy was not available in this browser.'); } };
  if (loading) return <main className="business-builder-loading"><LoaderCircle className="animate-spin" /> Loading questionnaire</main>;
  if (error && !project) return <main className="business-builder-loading"><strong>{error}</strong><Link to="/business/workspace">Back to projects</Link></main>;
  return <main className="business-builder"><header className="business-builder-header"><Link to="/business/workspace"><ArrowLeft size={17} /> Projects</Link><div><span>{statusLabel}{isDirty && ' · Unsaved changes'}</span><button type="button" onClick={() => save()} disabled={saving || !isDirty}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : 'Save draft'}</button><button type="button" onClick={() => { setPreviewOpen(true); setError(''); }} disabled={saving}><Eye size={15} /> Preview</button>{questionnaire.status === 'DRAFT' && responseCount === 0 && <button className="business-builder-delete" type="button" onClick={deleteDraft} disabled={saving}><Trash2 size={15} /> Delete draft</button>}{['DRAFT', 'ARCHIVED'].includes(questionnaire.status) && <button className="business-builder-publish" type="button" onClick={() => save({ publish: true })} disabled={saving || !questions.length}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : collectionMode === 'SELF_DISTRIBUTED' ? 'Submit for publication' : 'Request quote & review'} <ArrowRight size={16} /></button>}{['PUBLISHED', 'PENDING_REVIEW', 'APPROVED'].includes(questionnaire.status) && <button type="button" onClick={archive} disabled={saving}><Archive size={15} /> Archive</button>}</div></header>
    <div className="business-builder-layout"><section className="business-builder-main"><p className="business-eyebrow">QUESTIONNAIRE DESIGN</p><input className="business-builder-title" value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Questionnaire title" placeholder="Questionnaire title" /><p className="business-builder-lede">Build a focused questionnaire: screen the right people, answer the core decision, then gather only the profile details you need.</p><label className="business-cover-field"><span>What will respondents know?</span><textarea value={coverDescription} onChange={(event) => setCoverDescription(event.target.value)} maxLength={600} placeholder="Explain the purpose of this questionnaire and how responses will be used." /></label><section className="business-audience-modules"><header><div><span>PROFILE MODULES</span><h2>Build only the audience profile you need.</h2><p>These are editable starting points, not quotas or a claim of representativeness.</p></div><button type="button" onClick={() => setAudienceModulesOpen((current) => !current)} disabled={structureLocked}>{audienceModulesOpen ? 'Hide modules' : 'Add profile module'} <UsersRound size={15} /></button></header>{audienceModulesOpen && <div className="business-audience-module-grid">{audienceModules.map((module) => { const alreadyAdded = questions.some((question) => question.section === 'PROFILE' && question.prompt === module.prompt); return <article key={module.id}><strong>{module.title}</strong><span>{module.detail}</span><button type="button" onClick={() => addAudienceModule(module)} disabled={structureLocked || alreadyAdded}><Plus size={14} /> {alreadyAdded ? 'Added to draft' : 'Add to draft'}</button></article>; })}</div>}<footer><ShieldAlert size={14} /> Collect profile details only when they are necessary for screening or analysis; explain why sensitive fields are optional.</footer></section>{structureLocked && <div className="business-builder-lock"><strong>This questionnaire already has responses.</strong><span>Question wording and structure are locked to protect the integrity of your data.</span><button type="button" onClick={duplicate} disabled={saving}>Copy as new questionnaire <ArrowRight size={15} /></button></div>}{message && <p className="business-builder-message is-success"><Check size={16} /> {message}</p>}{error && <p className="business-builder-message">{error}</p>}
      <div className="business-question-list">{questions.map((question, index) => <QuestionCard key={question.id || question.tempId} question={question} index={index} questions={questions} locked={structureLocked} onUpdate={(changes) => updateQuestion(index, changes)} onMove={(direction) => moveQuestion(index, direction)} onRemove={() => !structureLocked && setQuestions((current) => current.filter((_, position) => position !== index))} />)}</div>
      <div className="business-add-question"><ClipboardList size={20} /><div><strong>Add a question</strong><span>Use a question type that fits the answer you need.</span></div><div className="business-add-question-actions">{questionTypes.slice(0, 5).map(([type, label]) => <button type="button" disabled={structureLocked} onClick={() => setQuestions((current) => [...current, newQuestion(type)])} key={type}><Plus size={14} /> {label}</button>)}</div></div>
    </section><aside className="business-builder-sidebar"><section className="business-design-checks"><p>DESIGN CHECK</p><h2>Before you publish</h2>{checks.map(([state, text], index) => <div className={state} key={`${state}-${index}`}><span>{state === 'ready' ? <Check size={14} /> : '!'}</span>{text}</div>)}</section><section><p>RESPONSE COLLECTION</p><h2>How will you collect responses?</h2><div className="business-collection-options">{collectionOptions.map(([value, label, description]) => <label key={value} className={collectionMode === value ? 'is-selected' : ''}><input type="radio" name="collectionMode" disabled={structureLocked} value={value} checked={collectionMode === value} onChange={() => setCollectionMode(value)} /><strong>{label}</strong><span>{description}</span></label>)}</div>{collectionMode !== 'SELF_DISTRIBUTED' && <p className="business-collection-note">Submitting requests a feasibility, scope, and content review. Recruitment does not begin until the scope and launch are confirmed.</p>}</section><section className="business-share-card"><p>SHARE LINK</p>{questionnaire.status === 'PUBLISHED' && questionnaire.isCollecting ? <><strong>Ready to send</strong><span>{publicUrl}</span><button type="button" onClick={copyPublicLink}><Copy size={15} /> Copy link</button><a href={publicUrl} target="_blank" rel="noreferrer"><Eye size={15} /> Open questionnaire</a></> : <><strong>Save your draft, then submit when ready.</strong><span>You can keep editing until you request publication or research support.</span></>}</section><section className="business-response-card"><p>RESPONSES</p><strong>{responseCount}</strong><span>responses received</span></section></aside></div>
    {responses.length > 0 && <section className="business-response-list"><p>RESPONSE DATA</p><h2>Latest responses</h2>{responses.slice(0, 25).map((response) => <article key={response.id}><header><span>{new Date(response.submittedAt).toLocaleString()}</span>{response.qualityFlag && <em>Flagged: {response.qualityFlag === 'TOO_FAST' ? 'completed unusually quickly' : response.qualityFlag}</em>}</header>{questions.map((question) => response.answers[question.id] !== undefined && <div key={question.id}><strong>{question.prompt}</strong><span>{Array.isArray(response.answers[question.id]) ? response.answers[question.id].join(', ') : String(response.answers[question.id])}</span></div>)}</article>)}</section>}
    {previewOpen && <QuestionnairePreview title={title} coverDescription={coverDescription} questions={questions} onClose={() => setPreviewOpen(false)} />}
    {sensitiveNoticeOpen && <div className="business-sensitive-modal" role="dialog" aria-modal="true"><div><p>SENSITIVE DATA NOTICE</p><h2>Confirm before requesting publication</h2><span>This questionnaire may ask about sensitive personal information. You must obtain any required consent and comply with the laws that apply to your research.</span><section><button type="button" onClick={() => setSensitiveNoticeOpen(false)}>Go back</button><button type="button" className="business-builder-publish" onClick={() => save({ publish: true, sensitiveDataAcknowledged: true })}>I understand and confirm</button></section></div></div>}
  </main>;
}
