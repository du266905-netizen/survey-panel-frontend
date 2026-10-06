import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Check, ClipboardList, Eye, LoaderCircle, Plus, ShieldAlert, SlidersHorizontal, Trash2, UsersRound, X } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { archiveBusinessQuestionnaire, deleteBusinessProject, duplicateBusinessQuestionnaire, getBusinessProject, getBusinessQuestionnaireResponses, publishBusinessQuestionnaire, saveBusinessQuestionnaire } from '../api/realApi';
import { useLanguage } from '../components/LanguageContext';
import './BusinessQuestionnaire.css';

const questionTypes = [
  ['SINGLE_CHOICE', 'typeSingleChoice'], ['MULTIPLE_CHOICE', 'typeMultipleChoice'], ['RANKING', 'typeRanking'],
  ['RATING', 'typeRating'], ['NUMBER', 'typeNumber'], ['SHORT_TEXT', 'typeShortText'], ['LONG_TEXT', 'typeLongText'],
];
const questionTypeGuidance = {
  SINGLE_CHOICE: 'guidanceSingleChoice',
  MULTIPLE_CHOICE: 'guidanceMultipleChoice',
  RANKING: 'guidanceRanking',
  RATING: 'guidanceRating',
  NUMBER: 'guidanceNumber',
  SHORT_TEXT: 'guidanceShortText',
  LONG_TEXT: 'guidanceLongText',
};
const questionSections = [['SCREENING', 'sectionScreening'], ['CORE', 'sectionCore'], ['PROFILE', 'sectionProfile'], ['CLOSING', 'sectionClosing']];
const choiceQuestion = (type) => ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING', 'RANKING'].includes(type);
const logicSourceQuestion = (type) => ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING'].includes(type);
const defaultChoices = (type) => type === 'RATING' ? ['1', '2', '3', '4', '5'] : choiceQuestion(type) ? ['Option 1', 'Option 2'] : [];
const defaultSettings = () => ({ allowOther: false, maxSelections: null, randomizeChoices: false, scaleLowLabel: '', scaleHighLabel: '', measurementRole: 'OUTCOME', variableName: '', referencePeriod: '' });
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
  { id: 'age', titleKey: 'moduleAgeTitle', detailKey: 'moduleAgeDetail', type: 'SINGLE_CHOICE', prompt: 'Which age range are you in?', choices: ['18–24', '25–34', '35–44', '45–54', '55–64', '65 or older', 'Prefer not to say'], settings: { allowOther: false } },
  { id: 'location', titleKey: 'moduleLocationTitle', detailKey: 'moduleLocationDetail', type: 'SHORT_TEXT', prompt: 'Which country or market do you currently live in?', choices: [] },
  { id: 'education', titleKey: 'moduleEducationTitle', detailKey: 'moduleEducationDetail', type: 'SINGLE_CHOICE', prompt: 'What is the highest level of education you have completed?', choices: ['Secondary school or below', 'Vocational or technical qualification', 'Undergraduate degree', 'Postgraduate degree', 'Prefer not to say'], settings: { allowOther: true } },
  { id: 'employment', titleKey: 'moduleEmploymentTitle', detailKey: 'moduleEmploymentDetail', type: 'SINGLE_CHOICE', prompt: 'Which best describes your current employment status?', choices: ['Employed full-time', 'Employed part-time', 'Self-employed', 'Student', 'Not currently employed', 'Retired', 'Prefer not to say'], settings: { allowOther: true } },
  { id: 'industry', titleKey: 'moduleIndustryTitle', detailKey: 'moduleIndustryDetail', type: 'SINGLE_CHOICE', prompt: 'Which industry do you mainly work in?', choices: ['Agriculture & natural resources', 'Manufacturing & industrial', 'Construction & real estate', 'Wholesale, retail & e-commerce', 'Transport, logistics & travel', 'Information, media & telecommunications', 'Financial & insurance services', 'Professional, scientific & technical services', 'Education & training', 'Healthcare, social care & life sciences', 'Government, public services & nonprofit', 'Hospitality, food & personal services', 'Other', 'Prefer not to say'], settings: { allowOther: false, measurementRole: 'SEGMENT' } },
  { id: 'income', titleKey: 'moduleIncomeTitle', detailKey: 'moduleIncomeDetail', type: 'SINGLE_CHOICE', prompt: 'Which household income range best describes your household?', choices: ['Lower income range', 'Middle income range', 'Higher income range', 'Prefer not to say'], settings: { allowOther: false } },
  { id: 'household', titleKey: 'moduleHouseholdTitle', detailKey: 'moduleHouseholdDetail', type: 'MULTIPLE_CHOICE', prompt: 'Which people live in your household?', choices: ['I live alone', 'Partner or spouse', 'Children under 18', 'Other adults', 'Prefer not to say'], settings: { allowOther: true, maxSelections: null } },
];

function questionFromAudienceModule(module) {
  return {
    ...newQuestion(module.type),
    section: 'PROFILE',
    prompt: module.prompt,
    choices: [...module.choices],
    settings: { ...defaultSettings(), measurementRole: 'SEGMENT', ...(module.settings || {}) },
  };
}

function PreviewQuestionField({ question, value, onChange }) {
  const { language, publicCopy } = useLanguage();
  const qb = publicCopy.workspace.business.questionnaireBuilder[language] || publicCopy.workspace.business.questionnaireBuilder['en-GB'] || {};
  const choices = Array.isArray(question.choices) ? question.choices : [];
  const settings = { ...defaultSettings(), ...(question.settings || {}) };
  const displayChoices = useMemo(() => settings.randomizeChoices ? [...choices].sort(() => Math.random() - .5) : choices, [question.id, question.tempId, question.choices, settings.randomizeChoices]);
  if (question.type === 'LONG_TEXT') return <textarea value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'SHORT_TEXT') return <input value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'NUMBER') return <input type="number" inputMode="decimal" value={value || ''} onChange={(event) => onChange(event.target.value)} />;
  if (question.type === 'RANKING') return <div className="business-preview-options business-preview-ranking">{displayChoices.map((choice) => <label key={choice}><span>{Array.isArray(value) ? value.indexOf(choice) + 1 || '—' : '—'}</span><input type="checkbox" checked={Array.isArray(value) && value.includes(choice)} onChange={(event) => onChange(event.target.checked ? [...(Array.isArray(value) ? value : []), choice] : (Array.isArray(value) ? value.filter((item) => item !== choice) : []))} /> {choice}</label>)}<small>{qb.previewRankingHint}</small></div>;
  if (question.type === 'MULTIPLE_CHOICE') {
    const other = Array.isArray(value) ? value.find((item) => item.startsWith('Other: ')) : '';
    return <div className="business-preview-options">{displayChoices.map((choice) => <label key={choice}><input type="checkbox" checked={Array.isArray(value) && value.includes(choice)} onChange={(event) => { const next = event.target.checked ? [...(Array.isArray(value) ? value : []), choice] : (Array.isArray(value) ? value.filter((item) => item !== choice) : []); if (!settings.maxSelections || next.length <= settings.maxSelections) onChange(next); }} /> {choice}</label>)}{settings.allowOther && <label><input type="checkbox" checked={Boolean(other)} onChange={(event) => onChange(event.target.checked ? [...(Array.isArray(value) ? value : []), 'Other: details'] : (Array.isArray(value) ? value.filter((item) => !item.startsWith('Other: ')) : []))} /> {qb.previewOther} {other && <input aria-label={qb.previewOtherAria} value={other.replace(/^Other:\s*/, '')} onChange={(event) => onChange((Array.isArray(value) ? value : []).map((item) => item.startsWith('Other: ') ? `Other: ${event.target.value}` : item))} />}</label>}</div>;
  }
  const other = typeof value === 'string' && value.startsWith('Other: ') ? value : '';
  return <div className="business-preview-options">{displayChoices.map((choice) => <label key={choice}><input type="radio" name={`preview-${questionIdentity(question)}`} checked={value === choice} onChange={() => onChange(choice)} /> {choice}</label>)}{settings.allowOther && <label><input type="radio" name={`preview-${questionIdentity(question)}`} checked={Boolean(other)} onChange={() => onChange('Other: details')} /> {qb.previewOther} {other && <input aria-label={qb.previewOtherAria} value={other.replace(/^Other:\s*/, '')} onChange={(event) => onChange(`Other: ${event.target.value}`)} />}</label>}{question.type === 'RATING' && (settings.scaleLowLabel || settings.scaleHighLabel) && <small className="business-preview-scale"><span>{settings.scaleLowLabel}</span><span>{settings.scaleHighLabel}</span></small>}</div>;
}

function QuestionnairePreview({ title, coverDescription, questions, onClose }) {
  const { language, publicCopy } = useLanguage();
  const qb = publicCopy.workspace.business.questionnaireBuilder[language] || publicCopy.workspace.business.questionnaireBuilder['en-GB'] || {};
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  const visibleQuestions = questions.filter((question) => questionIsVisible(question, questions, answers));
  const submit = (event) => {
    event.preventDefault();
    const missing = visibleQuestions.find((question) => question.required && !hasAnswer(answers[questionIdentity(question)]));
    if (missing) { setComplete(false); setError(qb.previewRequiredError); document.getElementById(`preview-question-${questionIdentity(missing)}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    setError(''); setComplete(true);
  };
  return createPortal(<div className="business-preview-modal" role="dialog" aria-modal="true" aria-label={qb.previewDialogAria}><div className="business-preview-shell"><header><div><p>{qb.previewEyebrow}</p><strong>{qb.previewBanner}</strong></div><button type="button" onClick={onClose} aria-label={qb.previewCloseAria}><X size={18} /></button></header><form onSubmit={submit}><p>{qb.previewFormEyebrow}</p><h1>{title || qb.untitledQuestionnaire}</h1>{coverDescription && <span className="business-preview-cover">{coverDescription}</span>}{visibleQuestions.map((question, index) => <fieldset id={`preview-question-${questionIdentity(question)}`} key={questionIdentity(question)}><legend>{index + 1}. {question.prompt || qb.untitledQuestion} {question.required && <em>{qb.required}</em>}</legend><PreviewQuestionField question={question} value={answers[questionIdentity(question)]} onChange={(value) => { setComplete(false); setAnswers((current) => ({ ...current, [questionIdentity(question)]: value })); }} /></fieldset>)}{!questions.length && <p className="business-preview-empty">{qb.previewEmpty}</p>}{error && <p className="business-preview-error">{error}</p>}{complete && <p className="business-preview-complete"><Check size={16} /> {qb.previewComplete}</p>}<footer><button type="button" onClick={onClose}>{qb.previewReturn}</button><button type="submit" className="business-builder-publish" disabled={!questions.length}>{qb.previewTestRequired}</button></footer></form></div></div>, document.body);
}

function QuestionCard({ question, index, questions, locked, onUpdate, onRemove, onMove }) {
  const { language, publicCopy } = useLanguage();
  const qb = publicCopy.workspace.business.questionnaireBuilder[language] || publicCopy.workspace.business.questionnaireBuilder['en-GB'] || {};
  const isChoice = choiceQuestion(question.type);
  const sources = questions.slice(0, index).filter((item) => logicSourceQuestion(item.type) && item.choices?.length);
  const logicSource = sources.find((item) => item.position + 1 === question.logic?.sourcePosition || questions.indexOf(item) + 1 === question.logic?.sourcePosition);
  const sourceChoices = logicSource?.choices || [];
  const settings = { ...defaultSettings(), ...(question.settings || {}) };
  const updateSettings = (changes) => onUpdate({ settings: { ...settings, ...changes } });
  const changeType = (type) => onUpdate({ type, choices: choiceQuestion(type) ? (question.type === type && question.choices?.length ? question.choices : defaultChoices(type)) : [], settings: { ...settings, allowOther: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'].includes(type) ? settings.allowOther : false, maxSelections: type === 'MULTIPLE_CHOICE' ? settings.maxSelections : null } });
  const updateChoice = (choiceIndex, value) => onUpdate({ choices: question.choices.map((choice, position) => position === choiceIndex ? value : choice) });
  return <article id={`business-question-${questionIdentity(question)}`} className="business-question-card business-question-card-rich">
    <div className="business-question-card-head"><span>{qb.cardQuestionNumber.replace('{n}', index + 1)}</span><div><button type="button" disabled={locked || index === 0} onClick={() => onMove(-1)} aria-label={qb.cardMoveUpAria.replace('{n}', index + 1)}><ArrowUp size={15} /></button><button type="button" disabled={locked || index === questions.length - 1} onClick={() => onMove(1)} aria-label={qb.cardMoveDownAria.replace('{n}', index + 1)}><ArrowDown size={15} /></button><select aria-label={qb.cardSectionAria.replace('{n}', index + 1)} value={question.section} disabled={locked} onChange={(event) => onUpdate({ section: event.target.value })}>{questionSections.map(([value, key]) => <option value={value} key={value}>{qb[key]}</option>)}</select><button type="button" disabled={locked} onClick={onRemove} aria-label={qb.cardDeleteAria.replace('{n}', index + 1)}><Trash2 size={16} /></button></div></div>
    <textarea value={question.prompt} disabled={locked} onChange={(event) => onUpdate({ prompt: event.target.value })} placeholder={qb.cardPromptPlaceholder} aria-label={qb.cardPromptAria.replace('{n}', index + 1)} />
    <div className="business-question-controls"><select value={question.type} disabled={locked} onChange={(event) => changeType(event.target.value)}>{questionTypes.map(([value, key]) => <option value={value} key={value}>{qb[key]}</option>)}</select><label><input type="checkbox" disabled={locked} checked={question.required} onChange={(event) => onUpdate({ required: event.target.checked })} /> {qb.required}</label></div><p className="business-question-method-note">{qb[questionTypeGuidance[question.type]]}</p>
    {isChoice && <div className="business-question-choices">{question.choices.map((choice, choiceIndex) => <div key={`${question.id || question.tempId}-${choiceIndex}`}><span>{choiceIndex + 1}</span><input value={choice} disabled={locked} onChange={(event) => updateChoice(choiceIndex, event.target.value)} aria-label={qb.cardOptionAria.replace('{n}', choiceIndex + 1)} /><button type="button" disabled={locked || question.choices.length <= 2} onClick={() => onUpdate({ choices: question.choices.filter((_, position) => position !== choiceIndex) })}><Trash2 size={15} /></button></div>)}<button className="business-question-add-choice" disabled={locked || question.type === 'RATING'} type="button" onClick={() => onUpdate({ choices: [...question.choices, `Option ${question.choices.length + 1}`] })}><Plus size={14} /> {qb.cardAddOption}</button></div>}
    <div className="business-question-advanced">
      {['SINGLE_CHOICE', 'MULTIPLE_CHOICE'].includes(question.type) && <label><input type="checkbox" disabled={locked} checked={settings.allowOther} onChange={(event) => updateSettings({ allowOther: event.target.checked })} /> {qb.cardAllowOther}</label>}
      {isChoice && question.type !== 'RATING' && <label><input type="checkbox" disabled={locked} checked={settings.randomizeChoices} onChange={(event) => updateSettings({ randomizeChoices: event.target.checked })} /> {qb.cardShuffleChoices}</label>}
      {question.type === 'MULTIPLE_CHOICE' && <label className="business-inline-number">{qb.cardMaxSelections} <input type="number" min="1" max={Math.max(1, question.choices.length)} disabled={locked} value={settings.maxSelections || ''} onChange={(event) => updateSettings({ maxSelections: event.target.value ? Number(event.target.value) : null })} /></label>}
      {question.type === 'RATING' && <div className="business-scale-labels"><input value={settings.scaleLowLabel} disabled={locked} onChange={(event) => updateSettings({ scaleLowLabel: event.target.value })} placeholder={qb.cardScaleLowPlaceholder} /><input value={settings.scaleHighLabel} disabled={locked} onChange={(event) => updateSettings({ scaleHighLabel: event.target.value })} placeholder={qb.cardScaleHighPlaceholder} /></div>}
    </div>
    <details className="business-question-variable"><summary>{qb.variableTitle} <span>{qb.chip?.[settings.measurementRole] || settings.measurementRole.replaceAll('_', ' ').toLowerCase()}</span></summary><p>{qb.variableBody}</p><div><label>{qb.variableRole}<select disabled={locked} value={settings.measurementRole} onChange={(event) => updateSettings({ measurementRole: event.target.value })}><option value="OUTCOME">{qb.roleOutcome}</option><option value="DRIVER">{qb.roleDriver}</option><option value="SCREENING">{qb.roleScreening}</option><option value="SEGMENT">{qb.roleSegment}</option><option value="CONTROL">{qb.roleControl}</option><option value="EXPLORATORY">{qb.roleExploratory}</option></select></label><label>{qb.variableLabel} <input disabled={locked} value={settings.variableName} onChange={(event) => updateSettings({ variableName: event.target.value })} placeholder={qb.variableLabelPlaceholder} /></label><label>{qb.variableReferencePeriod} <input disabled={locked} value={settings.referencePeriod} onChange={(event) => updateSettings({ referencePeriod: event.target.value })} placeholder={qb.variableReferencePlaceholder} /></label></div></details>
    {sources.length > 0 && <details className="business-question-logic"><summary><SlidersHorizontal size={14} /> {qb.logicTitle} {question.logic ? qb.logicActive : ''}</summary><p>{qb.logicBody}</p><label><input type="checkbox" disabled={locked} checked={Boolean(question.logic)} onChange={(event) => onUpdate({ logic: event.target.checked ? { sourcePosition: questions.indexOf(sources[0]) + 1, value: sources[0].choices[0] } : null })} /> {qb.logicToggle}</label>{question.logic && <div><select disabled={locked} value={question.logic.sourcePosition} onChange={(event) => { const source = questions[Number(event.target.value) - 1]; onUpdate({ logic: { sourcePosition: Number(event.target.value), value: source?.choices?.[0] || '' } }); }}>{sources.map((source) => <option value={questions.indexOf(source) + 1} key={source.id || source.tempId}>Q{questions.indexOf(source) + 1}: {source.prompt || qb.untitledQuestion}</option>)}</select><select disabled={locked} value={question.logic.value} onChange={(event) => onUpdate({ logic: { ...question.logic, value: event.target.value } })}>{sourceChoices.map((choice) => <option value={choice} key={choice}>{choice}</option>)}</select></div>}</details>}
  </article>;
}

function buildChecks(questions, qb) {
  const checks = [];
  const core = questions.filter((question) => question.section === 'CORE').length;
  const outcomes = questions.filter((question) => question.section === 'CORE' && (question.settings?.measurementRole || 'OUTCOME') === 'OUTCOME').length;
  const open = questions.filter((question) => ['SHORT_TEXT', 'LONG_TEXT'].includes(question.type)).length;
  if (!questions.length) checks.push(['warning', qb.checkAddFirst]);
  if (questions.length > 20) checks.push(['warning', qb.checkTooMany]);
  if (questions.length && !core) checks.push(['warning', qb.checkNeedCore]);
  if (core && !outcomes) checks.push(['warning', qb.checkNeedOutcome]);
  if (open > Math.ceil(Math.max(questions.length, 1) / 3)) checks.push(['warning', qb.checkTooManyOpen]);
  questions.forEach((question, index) => {
    const cleanChoices = question.choices.map((choice) => String(choice).trim().toLocaleLowerCase()).filter(Boolean);
    const hasDuplicateChoices = new Set(cleanChoices).size !== cleanChoices.length;
    const isSensitiveProfile = question.section === 'PROFILE' && /(income|salary|gender|sex|ethnic|race|religion|health|disab)/i.test(question.prompt);
    if (question.prompt.trim().length < 3) checks.push(['warning', qb.checkClearWording.replace('{n}', index + 1)]);
    if (choiceQuestion(question.type) && question.choices.filter(Boolean).length < 2) checks.push(['warning', qb.checkTwoOptions.replace('{n}', index + 1)]);
    if (hasDuplicateChoices) checks.push(['warning', qb.checkDuplicateOptions.replace('{n}', index + 1)]);
    if (question.type === 'RATING' && question.settings?.randomizeChoices) checks.push(['warning', qb.checkOrderedScale.replace('{n}', index + 1)]);
    if (question.type === 'RATING' && Boolean(question.settings?.scaleLowLabel) !== Boolean(question.settings?.scaleHighLabel)) checks.push(['warning', qb.checkBothScaleLabels.replace('{n}', index + 1)]);
    if (isSensitiveProfile && question.required) checks.push(['warning', qb.checkSensitiveRequired.replace('{n}', index + 1)]);
    if (question.logic && question.logic.sourcePosition >= index + 1) checks.push(['warning', qb.checkLogicEarlier.replace('{n}', index + 1)]);
    if (question.logic?.sourcePosition && question.logic.sourcePosition < index + 1) {
      const source = questions[question.logic.sourcePosition - 1];
      if (!source || !logicSourceQuestion(source.type) || !source.choices?.includes(question.logic.value)) checks.push(['warning', qb.checkLogicStale.replace('{n}', index + 1)]);
    }
    if (/\b(and|or)\b|以及|同时|和.*和/i.test(question.prompt)) checks.push(['warning', qb.checkDoubleBarrelled.replace('{n}', index + 1)]);
  });
  if (!checks.length) checks.push(['ready', qb.checkReady]);
  return checks;
}

export default function BusinessQuestionnaireBuilder() {
  const { projectId } = useParams(); const navigate = useNavigate();
  const { language, publicCopy } = useLanguage();
  const qb = publicCopy.workspace.business.questionnaireBuilder[language] || publicCopy.workspace.business.questionnaireBuilder['en-GB'] || {};
  const [project, setProject] = useState(null); const [title, setTitle] = useState(''); const [coverDescription, setCoverDescription] = useState(''); const [questions, setQuestions] = useState([]); const [collectionMode, setCollectionMode] = useState('AUDIENCE_SOURCING');
  const [loading, setLoading] = useState(true); const [saving, setSaving] = useState(false); const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [sensitiveNoticeOpen, setSensitiveNoticeOpen] = useState(false); const [responses, setResponses] = useState([]); const [previewOpen, setPreviewOpen] = useState(false); const [newQuestionType, setNewQuestionType] = useState('SINGLE_CHOICE');
  const savedSnapshotRef = useRef(null);
  const questionnaire = project?.questionnaire; const responseCount = questionnaire?.responseCount || 0; const structureLocked = questionnaire?.status === 'PUBLISHED' && responseCount > 0;
  const checks = useMemo(() => buildChecks(questions, qb), [questions, qb]);
  const variableCounts = useMemo(() => questions.reduce((counts, question) => { const role = question.settings?.measurementRole || 'OUTCOME'; counts[role] = (counts[role] || 0) + 1; return counts; }, {}), [questions]);
  const currentSnapshot = useMemo(() => draftSnapshot({ title, coverDescription, collectionMode, questions }), [title, coverDescription, collectionMode, questions]);
  const isDirty = savedSnapshotRef.current !== null && savedSnapshotRef.current !== currentSnapshot;
  const statusLabel = questionnaire?.status === 'PENDING_REVIEW' ? qb.statusPendingReview : questionnaire?.status === 'APPROVED' ? qb.statusApproved : questionnaire?.status === 'PUBLISHED' ? (questionnaire.isCollecting ? qb.statusLive : qb.statusPaused) : questionnaire?.status === 'ARCHIVED' ? qb.statusArchived : qb.statusDraft;
  useEffect(() => { let active = true; getBusinessProject(projectId).then((response) => { if (!active) return; const nextProject = response.data.project; if (!nextProject.questionnaire) { navigate('/business/workspace', { replace: true }); return; } const nextTitle = nextProject.questionnaire.title || nextProject.title; const nextCoverDescription = nextProject.questionnaire.coverDescription || ''; const nextCollectionMode = 'AUDIENCE_SOURCING'; const nextQuestions = (nextProject.questionnaire.questions || []).map(normalizeQuestion); savedSnapshotRef.current = draftSnapshot({ title: nextTitle, coverDescription: nextCoverDescription, collectionMode: nextCollectionMode, questions: nextQuestions }); setProject(nextProject); setTitle(nextTitle); setCoverDescription(nextCoverDescription); setCollectionMode(nextCollectionMode); setQuestions(nextQuestions); if (nextProject.questionnaire.responseCount) getBusinessQuestionnaireResponses(projectId).then((result) => { if (active) setResponses(result.data.responses || []); }).catch(() => {}); }).catch((caughtError) => { if (active) setError(caughtError.response?.data?.message || qb.loadFailed); }).finally(() => { if (active) setLoading(false); }); return () => { active = false; }; }, [navigate, projectId]);
  const updateQuestion = (index, changes) => { if (!structureLocked) setQuestions((current) => current.map((question, position) => position === index ? { ...question, ...changes } : question)); };
  const addAudienceModule = (module) => { if (!structureLocked && !questions.some((question) => question.section === 'PROFILE' && question.prompt === module.prompt)) { setQuestions((current) => [...current, questionFromAudienceModule(module)]); setMessage(qb.moduleAdded.replace('{title}', qb[module.titleKey])); } };
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
    if (breaksRule) { setError(qb.moveBlocked); return; }
    setQuestions(remapped); setError(''); setMessage(qb.orderUpdated);
  };
  const save = async ({ publish = false, sensitiveDataAcknowledged = false } = {}) => { if (!questionnaire || saving) return; setSaving(true); setMessage(''); setError(''); try { const response = await saveBusinessQuestionnaire(projectId, { title, coverDescription, collectionMode, isCollecting: questionnaire.status === 'PUBLISHED' ? questionnaire.isCollecting : false, questions: questions.map(({ type, section, prompt, required, choices, settings, logic }) => ({ type, section, prompt, required, choices, settings, logic })) }); let nextQuestionnaire = response.data.questionnaire; if (publish) nextQuestionnaire = (await publishBusinessQuestionnaire(projectId, { sensitiveDataAcknowledged })).data.questionnaire; const nextQuestions = (nextQuestionnaire.questions || questions).map(normalizeQuestion); savedSnapshotRef.current = draftSnapshot({ title: nextQuestionnaire.title || title, coverDescription: nextQuestionnaire.coverDescription || '', collectionMode, questions: nextQuestions }); setProject((current) => ({ ...current, questionnaire: nextQuestionnaire })); setQuestions(nextQuestions); setSensitiveNoticeOpen(false); setMessage(publish ? qb.submitted : qb.draftSaved); } catch (caughtError) { if (publish && caughtError.response?.data?.code === 'SENSITIVE_DATA_NOTICE_REQUIRED') setSensitiveNoticeOpen(true); setError(caughtError.response?.data?.message || qb.saveFailed); } finally { setSaving(false); } };
  const archive = async () => { if (!questionnaire || saving) return; setSaving(true); setError(''); try { const response = await archiveBusinessQuestionnaire(projectId); setProject((current) => ({ ...current, questionnaire: response.data.questionnaire })); setMessage(qb.archived); } catch (caughtError) { setError(caughtError.response?.data?.message || qb.archiveFailed); } finally { setSaving(false); } };
  const deleteDraft = async () => {
    if (!questionnaire || questionnaire.status !== 'DRAFT' || responseCount > 0 || saving) return;
    if (!window.confirm(qb.deleteConfirm)) return;
    setSaving(true); setError('');
    try { await deleteBusinessProject(projectId); navigate('/business/workspace?view=questionnaires'); }
    catch (caughtError) { setError(caughtError.response?.data?.message || qb.deleteFailed); }
    finally { setSaving(false); }
  };
  const duplicate = async () => { if (!questionnaire || saving) return; setSaving(true); setError(''); try { const response = await duplicateBusinessQuestionnaire(projectId); navigate(`/business/projects/${response.data.project.id}`); } catch (caughtError) { setError(caughtError.response?.data?.message || qb.copyFailed); } finally { setSaving(false); } };
  if (loading) return <main className="business-builder-loading"><LoaderCircle className="animate-spin" /> {qb.loading}</main>;
  if (error && !project) return <main className="business-builder-loading"><strong>{error}</strong><Link to="/business/workspace">{qb.backToProjects}</Link></main>;
  return <main className="business-builder"><header className="business-builder-header"><Link to="/business/workspace?view=questionnaires"><img className="business-builder-brand-mark" src="/guanyisearch-brand-mark-transparent.png" alt="GuanyiSearch" /> <ArrowLeft size={17} /> {qb.headerEditorTitle}</Link><div><span>{statusLabel}{isDirty && qb.headerUnsaved}</span><button type="button" onClick={() => save()} disabled={saving || !isDirty}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : qb.headerSaveDraft}</button><span className="business-builder-audience-status"><UsersRound size={14} /> {qb.headerAudienceReady}</span><details className="business-builder-guide"><summary>{qb.guideTitle}</summary><div><strong>{qb.guideLead}</strong><ul><li>{qb.guidePoint1}</li><li>{qb.guidePoint2}</li><li>{qb.guidePoint3}</li><li>{qb.guidePoint4}</li></ul><span>{qb.guideNote}</span></div></details><button type="button" onClick={() => { setPreviewOpen(true); setError(''); }} disabled={saving}><Eye size={15} /> {qb.headerPreview}</button>{questionnaire.status === 'DRAFT' && responseCount === 0 && <button className="business-builder-delete" type="button" onClick={deleteDraft} disabled={saving}><Trash2 size={15} /> {qb.headerDeleteDraft}</button>}{['DRAFT', 'ARCHIVED'].includes(questionnaire.status) && <button className="business-builder-publish" type="button" onClick={() => save({ publish: true })} disabled={saving || !questions.length}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : qb.headerRequestReview} <ArrowRight size={16} /></button>}{['PUBLISHED', 'PENDING_REVIEW', 'APPROVED'].includes(questionnaire.status) && <button type="button" onClick={archive} disabled={saving}><Archive size={15} /> {qb.headerArchive}</button>}</div></header>
    <div className="business-builder-layout"><section className="business-builder-main"><p className="business-eyebrow">{qb.headerEyebrow}</p><input className="business-builder-title" value={title} onChange={(event) => setTitle(event.target.value)} aria-label={qb.titleLabel} placeholder={qb.titleLabel} /><details className="business-study-brief"><summary><span><b>{qb.briefTitle}</b><small>{project.researchGoal || qb.briefGoalFallback}</small></span><em>{(variableCounts.OUTCOME === 1 ? qb.briefQuestionCountOne : qb.briefQuestionCount).replace('{questions}', questions.length).replace('{outcomes}', variableCounts.OUTCOME || 0)}</em></summary><dl><div><dt>{qb.briefDecision}</dt><dd>{project.researchGoal || qb.notSet}</dd></div><div><dt>{qb.briefAudience}</dt><dd>{project.audienceDescription || qb.notSet}</dd></div>{project.countries && <div><dt>{qb.briefMarket}</dt><dd>{project.countries}</dd></div>}{project.estimatedMinutes && <div><dt>{qb.briefEstimatedLength}</dt><dd>{qb.briefMinutes.replace('{minutes}', project.estimatedMinutes)}</dd></div>}<div><dt>{qb.briefVariables}</dt><dd>{qb.briefVariableSummary.replace('{outcomes}', variableCounts.OUTCOME || 0).replace('{drivers}', variableCounts.DRIVER || 0).replace('{segments}', variableCounts.SEGMENT || 0).replace('{screening}', variableCounts.SCREENING || 0)}</dd></div></dl></details><details className="business-cover-field"><summary>{qb.coverTitle} <span>{qb.optional}</span></summary><label><span>{qb.coverLabel}</span><textarea value={coverDescription} onChange={(event) => setCoverDescription(event.target.value)} maxLength={600} placeholder={qb.coverPlaceholder} /></label></details><details className="business-audience-modules"><summary><span><b>{qb.audienceTitle}</b><small>{qb.audienceSubtitle}</small></span><em><UsersRound size={15} /> {qb.audienceAction}</em></summary><div className="business-audience-module-grid">{audienceModules.map((module) => { const alreadyAdded = questions.some((question) => question.section === 'PROFILE' && question.prompt === module.prompt); return <article key={module.id}><div><strong>{qb[module.titleKey]}</strong><span>{qb[module.detailKey]}</span></div><button type="button" onClick={() => addAudienceModule(module)} disabled={structureLocked || alreadyAdded}><Plus size={14} /> {alreadyAdded ? qb.audienceAdded : qb.audienceAdd}</button></article>; })}</div><footer><ShieldAlert size={14} /> {qb.audienceNote}</footer></details>{structureLocked && <div className="business-builder-lock"><strong>{qb.lockTitle}</strong><span>{qb.lockBody}</span><button type="button" onClick={duplicate} disabled={saving}>{qb.lockCopy} <ArrowRight size={15} /></button></div>}{message && <p className="business-builder-message is-success"><Check size={16} /> {message}</p>}{error && <p className="business-builder-message">{error}</p>}
      <section className="business-question-toolbar"><div><ClipboardList size={19} /><span><strong>{qb.toolbarTitle}</strong><small>{qb.toolbarSubtitle}</small></span></div><label><span>{qb.toolbarMethod}</span><select value={newQuestionType} disabled={structureLocked} onChange={(event) => setNewQuestionType(event.target.value)}>{questionTypes.map(([type, key]) => <option value={type} key={type}>{qb[key]}</option>)}</select></label><button type="button" className="business-builder-publish" disabled={structureLocked} onClick={() => setQuestions((current) => [...current, newQuestion(newQuestionType)])}><Plus size={15} /> {qb.toolbarAdd}</button></section>
      <div className="business-question-list">{questions.map((question, index) => <QuestionCard key={question.id || question.tempId} question={question} index={index} questions={questions} locked={structureLocked} onUpdate={(changes) => updateQuestion(index, changes)} onMove={(direction) => moveQuestion(index, direction)} onRemove={() => !structureLocked && setQuestions((current) => current.filter((_, position) => position !== index))} />)}</div>
    </section><aside className="business-builder-sidebar"><section className="business-question-navigator"><p>{qb.navigatorEyebrow}</p><h2>{qb.navigatorTitle}</h2><div>{questions.length ? questions.map((question, index) => <button key={questionIdentity(question)} type="button" onClick={() => document.getElementById(`business-question-${questionIdentity(question)}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}><span>{index + 1}</span><strong>{question.prompt || qb.untitledQuestion}</strong><small>{qb[questionSections.find(([value]) => value === question.section)?.[1]]}</small>{question.logic && <i>{qb.navigatorShownAfter.replace('{position}', question.logic.sourcePosition).replace('{value}', question.logic.value)}</i>}</button>) : <span className="business-question-navigator-empty">{qb.navigatorEmpty}</span>}</div></section><section className="business-design-checks"><p>{qb.checksEyebrow}</p><h2>{qb.checksTitle}</h2>{checks.map(([state, text], index) => <div className={state} key={`${state}-${index}`}><span>{state === 'ready' ? <Check size={14} /> : '!'}</span>{text}</div>)}</section></aside></div>
    {responses.length > 0 && <section className="business-response-list"><p>{qb.responsesEyebrow}</p><h2>{qb.responsesTitle}</h2>{responses.slice(0, 25).map((response) => <article key={response.id}><header><span>{new Date(response.submittedAt).toLocaleString()}</span>{response.qualityFlag && <em>{qb.responsesFlagged.replace('{flag}', response.qualityFlag === 'TOO_FAST' ? qb.responsesTooFast : response.qualityFlag)}</em>}</header>{questions.map((question) => response.answers[question.id] !== undefined && <div key={question.id}><strong>{question.prompt}</strong><span>{Array.isArray(response.answers[question.id]) ? response.answers[question.id].join(', ') : String(response.answers[question.id])}</span></div>)}</article>)}</section>}
    {previewOpen && <QuestionnairePreview title={title} coverDescription={coverDescription} questions={questions} onClose={() => setPreviewOpen(false)} />}
    {sensitiveNoticeOpen && <div className="business-sensitive-modal" role="dialog" aria-modal="true"><div><p>{qb.sensitiveEyebrow}</p><h2>{qb.sensitiveTitle}</h2><span>{qb.sensitiveBody}</span><section><button type="button" onClick={() => setSensitiveNoticeOpen(false)}>{qb.sensitiveBack}</button><button type="button" className="business-builder-publish" onClick={() => save({ publish: true, sensitiveDataAcknowledged: true })}>{qb.sensitiveConfirm}</button></section></div></div>}
  </main>;
}
