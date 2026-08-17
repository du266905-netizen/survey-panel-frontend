import { useEffect, useMemo, useState } from 'react';
import { Archive, ArrowLeft, ArrowRight, Check, ClipboardList, Copy, LoaderCircle, Plus, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { archiveBusinessQuestionnaire, duplicateBusinessQuestionnaire, getBusinessProject, getBusinessQuestionnaireResponses, publishBusinessQuestionnaire, saveBusinessQuestionnaire } from '../api/realApi';
import './BusinessQuestionnaire.css';

const questionTypes = [['SINGLE_CHOICE', 'Single choice'], ['MULTIPLE_CHOICE', 'Multiple choice'], ['SHORT_TEXT', 'Short text'], ['LONG_TEXT', 'Long text'], ['RATING', 'Rating scale']];
const collectionOptions = [
  ['SELF_DISTRIBUTED', 'Share it yourself', 'Create a link for your own customers, members, or contacts.'],
  ['AUDIENCE_SOURCING', 'Source respondents', 'Request a tailored audience and response plan from GuanyiSearch.'],
  ['RESEARCH_SUPPORT', 'Research support', 'Request questionnaire design support or a tailored study proposal.'],
];
const choiceQuestion = (type) => ['SINGLE_CHOICE', 'MULTIPLE_CHOICE', 'RATING'].includes(type);
const newQuestion = (type = 'SINGLE_CHOICE') => ({ tempId: window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, type, prompt: '', required: false, choices: type === 'RATING' ? ['1', '2', '3', '4', '5'] : choiceQuestion(type) ? ['Option 1', 'Option 2'] : [] });

export default function BusinessQuestionnaireBuilder() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [title, setTitle] = useState('');
  const [coverDescription, setCoverDescription] = useState('');
  const [questions, setQuestions] = useState([]);
  const [collectionMode, setCollectionMode] = useState('SELF_DISTRIBUTED');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sensitiveNoticeOpen, setSensitiveNoticeOpen] = useState(false);
  const [responses, setResponses] = useState([]);
  const questionnaire = project?.questionnaire;
  const responseCount = questionnaire?.responseCount || 0;
  const structureLocked = questionnaire?.status === 'PUBLISHED' && responseCount > 0;
  const publicUrl = useMemo(() => questionnaire?.publicId ? `${window.location.origin}/business/s/${questionnaire.publicId}` : '', [questionnaire?.publicId]);
  const statusLabel = questionnaire?.status === 'PENDING_REVIEW' ? (collectionMode === 'SELF_DISTRIBUTED' ? 'Pending publication review' : 'Quote requested · content review pending') : questionnaire?.status === 'APPROVED' ? 'Content approved · awaiting launch' : questionnaire?.status === 'PUBLISHED' ? (questionnaire.isCollecting ? 'Live' : 'Collection paused') : questionnaire?.status === 'ARCHIVED' ? 'Archived' : 'Draft';

  useEffect(() => {
    let active = true;
    getBusinessProject(projectId).then((response) => {
      if (!active) return;
      const nextProject = response.data.project;
      if (!nextProject.questionnaire) { navigate('/business/workspace', { replace: true }); return; }
      setProject(nextProject); setTitle(nextProject.questionnaire.title || nextProject.title); setCoverDescription(nextProject.questionnaire.coverDescription || ''); setCollectionMode(nextProject.questionnaire.collectionMode || 'SELF_DISTRIBUTED'); setQuestions(nextProject.questionnaire.questions || []);
      if (nextProject.questionnaire.responseCount) getBusinessQuestionnaireResponses(projectId).then((responsesResponse) => { if (active) setResponses(responsesResponse.data.responses || []); }).catch(() => {});
    }).catch((caughtError) => { if (active) setError(caughtError.response?.data?.message || 'We could not load this questionnaire.'); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [navigate, projectId]);

  const updateQuestion = (index, changes) => {
    if (structureLocked) return;
    setQuestions((current) => current.map((question, position) => {
      if (position !== index) return question;
      const type = changes.type || question.type;
      return { ...question, ...changes, choices: choiceQuestion(type) ? (question.choices?.length ? question.choices : type === 'RATING' ? ['1', '2', '3', '4', '5'] : ['Option 1', 'Option 2']) : [] };
    }));
  };
  const save = async ({ publish = false, sensitiveDataAcknowledged = false } = {}) => {
    if (!questionnaire || saving) return;
    setSaving(true); setMessage(''); setError('');
    try {
      const response = await saveBusinessQuestionnaire(projectId, { title, coverDescription, collectionMode, isCollecting: questionnaire.status === 'PUBLISHED' ? questionnaire.isCollecting : false, questions: questions.map(({ type, prompt, required, choices }) => ({ type, prompt, required, choices })) });
      let nextQuestionnaire = response.data.questionnaire;
      if (publish) nextQuestionnaire = (await publishBusinessQuestionnaire(projectId, { sensitiveDataAcknowledged })).data.questionnaire;
      setProject((current) => ({ ...current, questionnaire: nextQuestionnaire, ...(publish ? { status: response.data.projectStatus || current.status } : {}) })); setQuestions(nextQuestionnaire.questions || questions); setSensitiveNoticeOpen(false); setMessage(publish ? (collectionMode === 'SELF_DISTRIBUTED' ? 'Your questionnaire is pending publication review.' : 'Your project is submitted for scope, pricing and content review.') : 'Draft saved.');
    } catch (caughtError) {
      if (publish && caughtError.response?.data?.code === 'SENSITIVE_DATA_NOTICE_REQUIRED') setSensitiveNoticeOpen(true);
      setError(caughtError.response?.data?.message || 'We could not save this questionnaire. Please check the questions and try again.');
    } finally { setSaving(false); }
  };
  const archive = async () => { if (!questionnaire || saving) return; setSaving(true); setError(''); try { const response = await archiveBusinessQuestionnaire(projectId); setProject((current) => ({ ...current, questionnaire: response.data.questionnaire })); setMessage('Questionnaire archived. Its public link is no longer collecting responses.'); } catch (caughtError) { setError(caughtError.response?.data?.message || 'We could not archive this questionnaire.'); } finally { setSaving(false); } };
  const duplicate = async () => { if (!questionnaire || saving) return; setSaving(true); setError(''); try { const response = await duplicateBusinessQuestionnaire(projectId); navigate(`/business/projects/${response.data.project.id}`); } catch (caughtError) { setError(caughtError.response?.data?.message || 'We could not copy this questionnaire.'); } finally { setSaving(false); } };
  const copyPublicLink = async () => { try { await window.navigator.clipboard.writeText(publicUrl); setMessage('Share link copied.'); } catch { setError('Copy was not available in this browser. You can copy the link from the address field.'); } };

  if (loading) return <main className="business-builder-loading"><LoaderCircle className="animate-spin" /> Loading questionnaire</main>;
  if (error && !project) return <main className="business-builder-loading"><strong>{error}</strong><Link to="/business/workspace">Back to projects</Link></main>;
  return <main className="business-builder">
    <header className="business-builder-header"><Link to="/business/workspace"><ArrowLeft size={17} /> Projects</Link><div><span>{statusLabel}</span><button type="button" onClick={() => save()} disabled={saving}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : 'Save draft'}</button>{['DRAFT', 'ARCHIVED'].includes(questionnaire.status) && <button className="business-builder-publish" type="button" onClick={() => save({ publish: true })} disabled={saving || !questions.length}>{saving ? <LoaderCircle className="animate-spin" size={16} /> : collectionMode === 'SELF_DISTRIBUTED' ? 'Submit for publication' : 'Request quote & review'} <ArrowRight size={16} /></button>}{['PUBLISHED', 'PENDING_REVIEW', 'APPROVED'].includes(questionnaire.status) && <button type="button" onClick={archive} disabled={saving}><Archive size={15} /> Archive</button>}</div></header>
    <div className="business-builder-layout"><section className="business-builder-main"><p className="business-eyebrow">QUESTIONNAIRE</p><input className="business-builder-title" value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Questionnaire title" placeholder="Questionnaire title" /><p className="business-builder-lede">Build your questions, explain the purpose to respondents, then choose whether to share it yourself or request GuanyiSearch research support.</p><label className="business-cover-field"><span>What will respondents know?</span><textarea value={coverDescription} onChange={(event) => setCoverDescription(event.target.value)} maxLength={600} placeholder="Explain the purpose of this questionnaire and how the responses will be used." /></label>{structureLocked && <div className="business-builder-lock"><strong>This questionnaire already has responses.</strong><span>Question types, wording, options and required settings are locked to protect the integrity of your data.</span><button type="button" onClick={duplicate} disabled={saving}>Copy as new questionnaire <ArrowRight size={15} /></button></div>}{message && <p className="business-builder-message is-success"><Check size={16} /> {message}</p>}{error && <p className="business-builder-message">{error}</p>}
      <div className="business-question-list">{questions.map((question, index) => <article key={question.id || question.tempId} className="business-question-card"><div className="business-question-card-head"><span>Question {index + 1}</span><button type="button" disabled={structureLocked} onClick={() => setQuestions((current) => current.filter((_, position) => position !== index))} aria-label={`Delete question ${index + 1}`}><Trash2 size={16} /></button></div><textarea value={question.prompt} disabled={structureLocked} onChange={(event) => updateQuestion(index, { prompt: event.target.value })} placeholder="Write your question" aria-label={`Question ${index + 1} text`} /><div className="business-question-controls"><select value={question.type} disabled={structureLocked} onChange={(event) => updateQuestion(index, { type: event.target.value })}>{questionTypes.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select><label><input type="checkbox" disabled={structureLocked} checked={question.required} onChange={(event) => updateQuestion(index, { required: event.target.checked })} /> Required</label></div>{choiceQuestion(question.type) && <div className="business-question-choices">{question.choices.map((choice, choiceIndex) => <div key={`${question.id || question.tempId}-${choiceIndex}`}><input value={choice} disabled={structureLocked} onChange={(event) => updateQuestion(index, { choices: question.choices.map((item, position) => position === choiceIndex ? event.target.value : item) })} /><button type="button" disabled={structureLocked} onClick={() => updateQuestion(index, { choices: question.choices.filter((_, position) => position !== choiceIndex) })}><Trash2 size={15} /></button></div>)}{question.type !== 'RATING' && <button className="business-question-add-choice" disabled={structureLocked} type="button" onClick={() => updateQuestion(index, { choices: [...question.choices, `Option ${question.choices.length + 1}`] })}>Add option</button>}</div>}</article>)}</div>
      <div className="business-add-question"><ClipboardList size={20} /><div><strong>Add a question</strong><span>Start simple. You can add more as the study takes shape.</span></div><button type="button" disabled={structureLocked} onClick={() => setQuestions((current) => [...current, newQuestion()])}><Plus size={16} /> Add question</button></div></section>
      <aside className="business-builder-sidebar"><section><p>RESPONSE COLLECTION</p><h2>How will you collect responses?</h2><div className="business-collection-options">{collectionOptions.map(([value, label, description]) => <label key={value} className={collectionMode === value ? 'is-selected' : ''}><input type="radio" name="collectionMode" disabled={structureLocked} value={value} checked={collectionMode === value} onChange={() => setCollectionMode(value)} /><strong>{label}</strong><span>{description}</span></label>)}</div>{collectionMode !== 'SELF_DISTRIBUTED' && <p className="business-collection-note">Submitting starts scope, pricing and content review. Your questionnaire can be content-approved before recruitment begins, but it will not collect responses until funding is confirmed.</p>}</section><section className="business-share-card"><p>SHARE LINK</p>{questionnaire.status === 'PUBLISHED' && questionnaire.isCollecting ? <><strong>Ready to send</strong><span>{publicUrl}</span><button type="button" onClick={copyPublicLink}><Copy size={15} /> Copy link</button><a href={publicUrl} target="_blank" rel="noreferrer">Open questionnaire <ArrowRight size={15} /></a></> : questionnaire.status === 'APPROVED' ? <><strong>Content approved</strong><span>Collection will begin when project funding and launch are confirmed.</span></> : questionnaire.status === 'PENDING_REVIEW' ? <><strong>{collectionMode === 'SELF_DISTRIBUTED' ? 'Pending publication review' : 'Project and content review underway'}</strong><span>{collectionMode === 'SELF_DISTRIBUTED' ? 'Your link will be available after approval.' : 'We will notify you in the workspace when a quote is ready.'}</span></> : questionnaire.status === 'ARCHIVED' ? <><strong>Archived</strong><span>This public link no longer accepts responses. Copy the questionnaire to create a new version.</span></> : <><strong>Save your draft, then submit when ready.</strong><span>You can keep editing until you request publication or research support.</span></>}</section><section className="business-response-card"><p>RESPONSES</p><strong>{responseCount}</strong><span>responses received</span></section></aside></div>
    {responses.length > 0 && <section className="business-response-list"><p>RESPONSE DATA</p><h2>Latest responses</h2>{responses.slice(0, 25).map((response) => <article key={response.id}><header><span>{new Date(response.submittedAt).toLocaleString()}</span>{response.qualityFlag && <em>Flagged: {response.qualityFlag === 'TOO_FAST' ? 'completed unusually quickly' : response.qualityFlag}</em>}</header>{questions.map((question) => response.answers[question.id] !== undefined && <div key={question.id}><strong>{question.prompt}</strong><span>{Array.isArray(response.answers[question.id]) ? response.answers[question.id].join(', ') : String(response.answers[question.id])}</span></div>)}</article>)}</section>}
    {sensitiveNoticeOpen && <div className="business-sensitive-modal" role="dialog" aria-modal="true"><div><p>SENSITIVE DATA NOTICE</p><h2>Confirm before requesting publication</h2><span>This questionnaire may ask about sensitive personal information. You must obtain any required consent and comply with the laws that apply to your research.</span><section><button type="button" onClick={() => setSensitiveNoticeOpen(false)}>Go back</button><button type="button" className="business-builder-publish" onClick={() => save({ publish: true, sensitiveDataAcknowledged: true })}>I understand and confirm</button></section></div></div>}
  </main>;
}
