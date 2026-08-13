import { useEffect, useState } from 'react';
import { ArrowRight, ClipboardList, LoaderCircle, Plus, UsersRound, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createBusinessProject, getBusinessWorkspace } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import Logo from '../components/Logo';
import './Business.css';

const emptyProject = { title: '', researchGoal: '', audienceDescription: '', studyFormat: 'SURVEY', countries: '', languages: '', targetParticipants: '', estimatedMinutes: '', timeline: '', incentiveBudget: 'NEED_GUIDANCE', additionalContext: '' };
const statusLabel = { RECEIVED: 'Received', REVIEW: 'In review', PROPOSAL: 'Proposal ready', CONFIRMED: 'Confirmed', RECRUITING: 'Recruiting', COMPLETED: 'Completed' };

const projectTypes = {
  questionnaire: {
    eyebrow: 'CUSTOM QUESTIONNAIRE',
    title: 'Build a custom questionnaire',
    description: 'Turn a business decision into a concise questionnaire with the right question formats and a clear respondent flow.',
    button: 'Create questionnaire',
    icon: ClipboardList,
    format: 'SURVEY',
  },
  research: {
    eyebrow: 'CUSTOM RESEARCH',
    title: 'Plan a tailored study',
    description: 'Scope an interview, usability session, group discussion, or another focused way to learn from people.',
    button: 'Plan research',
    icon: UsersRound,
    format: 'INTERVIEW',
  },
};

const typeForProject = (project) => project.studyFormat === 'SURVEY' ? projectTypes.questionnaire : projectTypes.research;

export default function BusinessWorkspace() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState({ profile: null, projects: [] });
  const [loading, setLoading] = useState(true);
  const [openChooser, setOpenChooser] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [projectType, setProjectType] = useState('questionnaire');
  const [form, setForm] = useState(emptyProject);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const selectedType = projectTypes[projectType];
  const isQuestionnaire = projectType === 'questionnaire';

  useEffect(() => {
    let active = true;
    getBusinessWorkspace()
      .then((response) => { if (active) setWorkspace(response.data); })
      .catch(() => { if (active) setMessage('We could not load the workspace. Please refresh and try again.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const chooseProjectType = (type) => {
    setProjectType(type);
    setForm({ ...emptyProject, studyFormat: projectTypes[type].format });
    setOpenChooser(false);
    setOpenForm(true);
  };
  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage('');
    try {
      const response = await createBusinessProject({ ...form, targetParticipants: form.targetParticipants || undefined, estimatedMinutes: form.estimatedMinutes || undefined });
      setWorkspace((current) => ({ ...current, projects: [response.data.project, ...current.projects] }));
      setForm(emptyProject);
      setOpenForm(false);
      setMessage('Your request has been received. We will review the scope and follow up with the next step.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not submit this request. Please review the details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="business-workspace">
      <header className="business-workspace-header">
        <Link to="/business/workspace" aria-label="Business workspace"><Logo size="md" /></Link>
        <div><span>Research workspace</span><button type="button" onClick={() => { logout(); navigate('/business/login'); }}>Log out</button></div>
      </header>
      <div className="business-workspace-body">
        <aside><p>WORKSPACE</p><strong>Projects</strong><span>Create a questionnaire or scope a tailored study. Each request is reviewed before work begins.</span><Link to="/business">About Business research <ArrowRight size={14} /></Link></aside>
        <section className="business-projects">
          <div className="business-projects-head">
            <div><p className="business-eyebrow">PROJECTS</p><h1>Choose how to begin.</h1><p>Start with a custom questionnaire when you need structured feedback, or a tailored study when the method needs to fit the decision.</p></div>
            <button className="business-button" type="button" onClick={() => setOpenChooser(true)}><Plus size={17} /> New project</button>
          </div>
          {message && <p className="business-workspace-message">{message}</p>}
          {loading ? <div className="business-workspace-loading"><LoaderCircle className="animate-spin" /> Loading workspace</div> : workspace.projects.length ? (
            <div className="business-project-list">
              {workspace.projects.map((project) => {
                const type = typeForProject(project);
                return <article key={project.id}><div><span className={`business-status status-${String(project.status).toLowerCase()}`}>{statusLabel[project.status] || project.status}</span><p className="business-project-kind">{type.eyebrow}</p><h2>{project.title}</h2><p>{project.researchGoal}</p></div><dl><div><dt>Format</dt><dd>{project.studyFormat.replaceAll('_', ' ').toLowerCase()}</dd></div><div><dt>Audience</dt><dd>{project.audienceDescription}</dd></div><div><dt>Updated</dt><dd>{new Date(project.updatedAt).toLocaleDateString()}</dd></div></dl></article>;
              })}
            </div>
          ) : (
            <div className="business-start-grid">
              {Object.entries(projectTypes).map(([typeKey, type]) => {
                const Icon = type.icon;
                return <article key={typeKey} className="business-start-card"><div className="business-start-icon"><Icon size={24} /></div><p>{type.eyebrow}</p><h2>{type.title}</h2><span>{type.description}</span><ul>{typeKey === 'questionnaire' ? <><li>Question design and respondent flow</li><li>Clear survey scope before fieldwork</li></> : <><li>Interviews, usability sessions, or group discussion</li><li>Method, audience, and timing reviewed together</li></>}</ul><button className="business-text-action" type="button" onClick={() => chooseProjectType(typeKey)}>{type.button} <ArrowRight size={16} /></button></article>;
              })}
            </div>
          )}
        </section>
      </div>
      {openChooser && <div className="business-project-modal business-project-modal--chooser" role="dialog" aria-modal="true" aria-labelledby="business-project-chooser-title"><section><button className="business-modal-close" type="button" onClick={() => setOpenChooser(false)} aria-label="Close"><X size={18} /></button><p className="business-eyebrow">NEW PROJECT</p><h2 id="business-project-chooser-title">What would you like to create?</h2><p className="business-form-intro">Choose the route that best matches the work in front of you. You can refine the details next.</p><div className="business-chooser-grid">{Object.entries(projectTypes).map(([typeKey, type]) => { const Icon = type.icon; return <button type="button" key={typeKey} onClick={() => chooseProjectType(typeKey)}><Icon size={22} /><span>{type.eyebrow}</span><strong>{type.title}</strong><small>{type.description}</small><em>Continue <ArrowRight size={15} /></em></button>; })}</div></section></div>}
      {openForm && <div className="business-project-modal" role="dialog" aria-modal="true" aria-labelledby="business-project-title"><form onSubmit={submit}><button className="business-modal-close" type="button" onClick={() => setOpenForm(false)} aria-label="Close"><X size={18} /></button><p className="business-eyebrow">{selectedType.eyebrow}</p><h2 id="business-project-title">{isQuestionnaire ? 'Build a questionnaire around a real decision.' : 'Plan research around the decision ahead.'}</h2><p className="business-form-intro">{isQuestionnaire ? 'Tell us what you need to understand and who should complete it. We will review the scope before any fieldwork begins.' : 'Tell us what needs to be learned, from whom, and by when. We will review the appropriate method and scope with you.'}</p><label>{isQuestionnaire ? 'Questionnaire name' : 'Research project name'}<input name="title" value={form.title} onChange={update} placeholder={isQuestionnaire ? 'For example, New product feedback' : 'For example, Member onboarding study'} required /></label><label>{isQuestionnaire ? 'What decision should this questionnaire support?' : 'What decision should this research support?'}<textarea name="researchGoal" value={form.researchGoal} onChange={update} placeholder="Describe the decision, context, and what a useful answer would help you do." required /></label><label>{isQuestionnaire ? 'Who should complete it?' : 'Who do you need to hear from?'}<textarea name="audienceDescription" value={form.audienceDescription} onChange={update} placeholder="Describe the people, context, or experience that matters." required /></label><div className="business-form-grid">{isQuestionnaire ? <><label>Expected completed responses<input name="targetParticipants" type="number" min="1" value={form.targetParticipants} onChange={update} placeholder="Optional" /></label><label>Estimated completion time<input name="estimatedMinutes" type="number" min="1" value={form.estimatedMinutes} onChange={update} placeholder="Optional" /></label></> : <><label>Research method<select name="studyFormat" value={form.studyFormat} onChange={update}><option value="INTERVIEW">Interview</option><option value="USABILITY_TEST">Usability test</option><option value="GROUP_DISCUSSION">Group discussion</option><option value="OTHER">Other</option></select></label><label>People needed<input name="targetParticipants" type="number" min="1" value={form.targetParticipants} onChange={update} placeholder="Optional" /></label><label>Estimated session minutes<input name="estimatedMinutes" type="number" min="1" value={form.estimatedMinutes} onChange={update} placeholder="Optional" /></label></>}</div><div className="business-form-grid"><label>Countries or regions<input name="countries" value={form.countries} onChange={update} placeholder="Optional" /></label><label>Languages<input name="languages" value={form.languages} onChange={update} placeholder="Optional" /></label><label>Desired timeline<input name="timeline" value={form.timeline} onChange={update} placeholder="For example, next month" /></label></div><label>Participant incentive<select name="incentiveBudget" value={form.incentiveBudget} onChange={update}><option value="NEED_GUIDANCE">I need guidance</option><option value="CONFIRMED">I have a confirmed budget</option><option value="NOT_APPLICABLE">Not applicable for this project</option></select></label><label>Materials or useful context<textarea name="additionalContext" value={form.additionalContext} onChange={update} placeholder={isQuestionnaire ? 'Question drafts, existing surveys, or constraints. Optional.' : 'Discussion guide, prototype, constraints, or other context. Optional.'} /></label><button className="business-button" type="submit" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={17} /> : isQuestionnaire ? 'Request questionnaire' : 'Request research plan'} {!submitting && <ArrowRight size={17} />}</button></form></div>}
    </main>
  );
}
