import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  ClipboardList,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Plus,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createBusinessProject, decideBusinessProjectQuote, getBusinessWorkspace, submitBusinessProject } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import NotificationBell from '../components/NotificationBell';
import './Business.css';

const emptyProject = {
  title: '',
  researchGoal: '',
  audienceDescription: '',
  studyFormat: 'SURVEY',
  countries: '',
  languages: '',
  targetParticipants: '',
  estimatedMinutes: '',
  timeline: '',
  incentiveBudget: 'NEED_GUIDANCE',
  additionalContext: '',
};

const statusLabel = {
  DRAFT: 'Draft',
  SUBMITTED_FOR_REVIEW: 'Submitted for review',
  QUOTE_REQUIRED: 'Quote requested',
  QUOTE_SENT: 'Quote ready',
  CLIENT_ACCEPTED: 'Awaiting payment',
  FUNDED: 'Funded',
  RECRUITING: 'Recruiting',
  LIVE: 'Live',
  COMPLETED: 'Completed',
};

const projectFilters = [
  ['ALL', 'All'],
  ['DRAFT', 'Draft'],
  ['SUBMITTED_FOR_REVIEW', 'In review'],
  ['QUOTE_REQUIRED', 'Quote requested'],
  ['QUOTE_SENT', 'Quote ready'],
  ['CLIENT_ACCEPTED', 'Awaiting payment'],
  ['FUNDED', 'Funded'],
  ['RECRUITING', 'Recruiting'],
  ['LIVE', 'Live'],
  ['COMPLETED', 'Completed'],
];

const projectTypes = {
  questionnaire: {
    eyebrow: 'CUSTOM QUESTIONNAIRE',
    title: 'Custom questionnaire',
    description: 'A focused questionnaire designed around the decision and people that matter.',
    button: 'Start questionnaire',
    icon: ClipboardList,
    format: 'SURVEY',
  },
  research: {
    eyebrow: 'TAILORED RESEARCH',
    title: 'Tailored research',
    description: 'An interview, usability session, group discussion, or another focused study.',
    button: 'Start research',
    icon: UsersRound,
    format: 'INTERVIEW',
  },
};

const typeForProject = (project) => (
  project.studyFormat === 'SURVEY' ? projectTypes.questionnaire : projectTypes.research
);

export default function BusinessWorkspace() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [workspace, setWorkspace] = useState({ profile: null, projects: [] });
  const [loading, setLoading] = useState(true);
  const [openChooser, setOpenChooser] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [projectType, setProjectType] = useState('questionnaire');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [form, setForm] = useState(emptyProject);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [quoteProject, setQuoteProject] = useState(null);
  const [quoteDecision, setQuoteDecision] = useState('');
  const [declineReason, setDeclineReason] = useState('');

  const selectedType = projectTypes[projectType];
  const isQuestionnaire = projectType === 'questionnaire';
  const visibleProjects = activeFilter === 'ALL'
    ? workspace.projects
    : workspace.projects.filter((project) => project.status === activeFilter);

  useEffect(() => {
    let active = true;
    getBusinessWorkspace()
      .then((response) => {
        if (!active) return;
        setWorkspace(response.data);
        const quoteId = new URLSearchParams(location.search).get('quote');
        const matchingProject = quoteId ? (response.data.projects || []).find((project) => project.latestQuote?.id === quoteId && project.latestQuote?.status === 'SENT') : null;
        if (matchingProject) setQuoteProject(matchingProject);
      })
      .catch(() => {
        if (active) setMessage('We could not load your projects. Please refresh and try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [location.search]);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

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
      const response = await createBusinessProject({
        ...form,
        targetParticipants: form.targetParticipants || undefined,
        estimatedMinutes: form.estimatedMinutes || undefined,
      });
      setWorkspace((current) => ({ ...current, projects: [response.data.project, ...current.projects] }));
      setForm(emptyProject);
      setOpenForm(false);
      if (response.data.project.questionnaire) {
        navigate(`/business/projects/${response.data.project.id}`);
        return;
      }
      setMessage('Your project is ready in this workspace.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not create this project. Please check the details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const requestProposal = async (project) => {
    if (submitting) return;
    setSubmitting(true); setMessage('');
    try {
      const response = await submitBusinessProject(project.id);
      setWorkspace((current) => ({ ...current, projects: current.projects.map((item) => item.id === project.id ? response.data.project : item) }));
      setMessage('Your research brief is with our team for scope and pricing.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not submit this brief. Please try again.');
    } finally { setSubmitting(false); }
  };

  const decideQuote = async (decision) => {
    const project = quoteProject;
    const quote = project?.latestQuote;
    if (!project || !quote || submitting) return;
    setSubmitting(true); setMessage('');
    try {
      const response = await decideBusinessProjectQuote(project.id, quote.id, { decision, ...(decision === 'DECLINE' && declineReason.trim() ? { declineReason: declineReason.trim() } : {}) });
      setWorkspace((current) => ({ ...current, projects: current.projects.map((item) => item.id === project.id ? response.data.project : item) }));
      setQuoteProject(null); setQuoteDecision(''); setDeclineReason('');
      setMessage(decision === 'ACCEPT' ? 'Quote accepted. We will confirm funding before recruitment begins.' : 'Quote declined. Our team can prepare a revised scope when you are ready.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not record your response to this quote.');
    } finally { setSubmitting(false); }
  };

  return (
    <main className="business-workspace">
      <div className="business-workspace-body business-workspace-body--rail">
        <aside className="business-workspace-rail" aria-label="Workspace navigation">
          <img className="business-workspace-rail-mark" src="/guanyisearch-project-mark.png" alt="" />
          <Link className="is-active" to="/business/workspace" title="Projects" aria-label="Projects">
            <LayoutDashboard size={20} />
          </Link>
          <NotificationBell className="business-workspace-notification" presentation="modal" />
          <div className="business-workspace-account">
            <button type="button" onClick={() => setAccountMenuOpen((value) => !value)} aria-label="Account menu" aria-expanded={accountMenuOpen}>
              <UserRound size={20} />
              <span>{String(user?.displayName || user?.email || 'A').trim().charAt(0).toUpperCase()}</span>
            </button>
            {accountMenuOpen && <div><strong>{user?.displayName || 'Client account'}</strong><span>{user?.email}</span><button type="button" onClick={() => { setAccountMenuOpen(false); navigate('/profile'); }}><UserRound size={15} /> Account</button><button type="button" onClick={() => { logout(); navigate('/business/login'); }}><LogOut size={15} /> Sign out</button></div>}
          </div>
        </aside>

        <section className="business-projects">
          <div className="business-projects-head">
            <div>
              <p className="business-eyebrow">RESEARCH WORKSPACE</p>
              <h1>Projects</h1>
              <p>Create a custom questionnaire or tailored research project when you are ready to learn from people.</p>
            </div>
            <div className="business-project-head-actions">
              <Link className="business-sales-link" to="/business/access">Contact sales <ArrowRight size={15} /></Link>
              {workspace.projects.length ? (
                <button className="business-button" type="button" onClick={() => setOpenChooser(true)}>
                  <Plus size={17} /> New project
                </button>
              ) : <span className="business-project-count">No projects yet</span>}
            </div>
          </div>

          {message && <p className="business-workspace-message">{message}</p>}

          {loading ? <div className="business-workspace-loading"><LoaderCircle className="animate-spin" /> Loading projects</div> : workspace.projects.length ? (
            <>
              <div className="business-project-toolbar" role="tablist" aria-label="Filter projects">
                {projectFilters.map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === value}
                    className={activeFilter === value ? 'is-active' : ''}
                    onClick={() => setActiveFilter(value)}
                  >
                    {label} <span>{value === 'ALL' ? workspace.projects.length : workspace.projects.filter((project) => project.status === value).length}</span>
                  </button>
                ))}
              </div>

              <div className="business-project-list">
                {visibleProjects.map((project) => {
                  const type = typeForProject(project);
                  return (
                    <article key={project.id}>
                      <div>
                        <span className={`business-status status-${String(project.status).toLowerCase()}`}>
                          {statusLabel[project.status] || project.status}
                        </span>
                        <p className="business-project-kind">{type.eyebrow}</p>
                        <h2>{project.title}</h2>
                        <p>{project.researchGoal}</p>
                      </div>
                      <dl>
                        <div><dt>Format</dt><dd>{project.studyFormat.replaceAll('_', ' ').toLowerCase()}</dd></div>
                        <div><dt>Audience</dt><dd>{project.audienceDescription}</dd></div>
                        <div><dt>Updated</dt><dd>{new Date(project.updatedAt).toLocaleDateString()}</dd></div>
                      </dl>
                      <div className="business-project-actions">
                        {project.questionnaire && <Link className="business-project-open" to={`/business/projects/${project.id}`}>Open questionnaire <ArrowRight size={15} /></Link>}
                        {!project.questionnaire && ['DRAFT', 'QUOTE_REQUIRED'].includes(project.status) && <button type="button" className="business-project-open" onClick={() => requestProposal(project)} disabled={submitting}>{submitting ? 'Submitting…' : 'Submit for review'} <ArrowRight size={15} /></button>}
                        {project.latestQuote?.status === 'SENT' && <button type="button" className="business-project-open" onClick={() => { setQuoteProject(project); setQuoteDecision(''); setDeclineReason(''); }}>Review quote <ArrowRight size={15} /></button>}
                      </div>
                      {project.latestQuote && <p className="business-project-quote-note">{project.latestQuote.status === 'SENT' ? `Quote v${project.latestQuote.version} is ready to review.` : `Quote v${project.latestQuote.version}: ${project.latestQuote.status.toLowerCase().replaceAll('_', ' ')}.`}</p>}
                    </article>
                  );
                })}
                {!visibleProjects.length && (
                  <div className="business-project-filter-empty">
                    <ClipboardList size={22} />
                    <strong>No projects in this view.</strong>
                    <span>Choose another status or start a new project.</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="business-projects-empty-layout">
              <button className="business-create-project-card" type="button" onClick={() => setOpenChooser(true)}>
                <span><Plus size={31} /></span>
                <strong>Create a new project</strong>
                <small>Start with a custom questionnaire or tailored research.</small>
              </button>
              <section className="business-projects-guide">
                <p>GET STARTED</p>
                <h2>Put a question into motion.</h2>
                <ol>
                  <li><span>01</span> Choose a project type</li>
                  <li><span>02</span> Add the essential context</li>
                  <li><span>03</span> Keep every project here</li>
                </ol>
              </section>
            </div>
          )}
        </section>
      </div>

      {openChooser && (
        <div className="business-project-modal business-project-modal--chooser" role="dialog" aria-modal="true" aria-labelledby="business-project-chooser-title">
          <section>
            <button className="business-modal-close" type="button" onClick={() => setOpenChooser(false)} aria-label="Close"><X size={18} /></button>
            <p className="business-eyebrow">NEW PROJECT</p>
            <h2 id="business-project-chooser-title">What would you like to create?</h2>
            <p className="business-form-intro">Choose one route, then add the context needed for that project.</p>
            <div className="business-chooser-grid">
              {Object.entries(projectTypes).map(([typeKey, type]) => {
                const Icon = type.icon;
                return (
                  <button type="button" key={typeKey} onClick={() => chooseProjectType(typeKey)}>
                    <Icon size={22} />
                    <span>{type.eyebrow}</span>
                    <strong>{type.title}</strong>
                    <small>{type.description}</small>
                    <em>{type.button} <ArrowRight size={15} /></em>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {openForm && (
        <div className="business-project-modal" role="dialog" aria-modal="true" aria-labelledby="business-project-title">
          <form onSubmit={submit}>
            <button className="business-modal-close" type="button" onClick={() => setOpenForm(false)} aria-label="Close"><X size={18} /></button>
            <p className="business-eyebrow">{selectedType.eyebrow}</p>
            <h2 id="business-project-title">{isQuestionnaire ? 'Outline a custom questionnaire.' : 'Outline the research you need.'}</h2>
            <p className="business-form-intro">
              {isQuestionnaire
                ? 'Tell us what you need to understand and who should complete it. Add the practical context that will shape the questionnaire.'
                : 'Tell us what needs to be learned, from whom, and by when. Add the context that will shape the study.'}
            </p>

            <label>
              {isQuestionnaire ? 'Questionnaire project name' : 'Research project name'}
              <input name="title" value={form.title} onChange={update} placeholder={isQuestionnaire ? 'For example, New product feedback' : 'For example, Member onboarding study'} required />
            </label>
            <label>
              {isQuestionnaire ? 'What decision should this questionnaire support?' : 'What decision should this research support?'}
              <textarea name="researchGoal" value={form.researchGoal} onChange={update} placeholder="Describe the decision, context, and what a useful answer would help you do." required />
            </label>
            <label>
              {isQuestionnaire ? 'Who should complete it?' : 'Who do you need to hear from?'}
              <textarea name="audienceDescription" value={form.audienceDescription} onChange={update} placeholder="Describe the people, context, or experience that matters." required />
            </label>

            <div className="business-form-grid">
              {isQuestionnaire ? (
                <label>
                  Estimated completion time
                  <input name="estimatedMinutes" type="number" min="1" value={form.estimatedMinutes} onChange={update} placeholder="Optional" />
                </label>
              ) : (
                <>
                  <label>
                    Research method
                    <select name="studyFormat" value={form.studyFormat} onChange={update}>
                      <option value="INTERVIEW">Interview</option>
                      <option value="USABILITY_TEST">Usability test</option>
                      <option value="GROUP_DISCUSSION">Group discussion</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </label>
                  <label>
                    Estimated session minutes
                    <input name="estimatedMinutes" type="number" min="1" value={form.estimatedMinutes} onChange={update} placeholder="Optional" />
                  </label>
                </>
              )}
              <label>
                Desired timeline
                <input name="timeline" value={form.timeline} onChange={update} placeholder="For example, next month" />
              </label>
            </div>

            <section className="business-sales-callout">
              <div>
                <p>Audience & delivery</p>
                <strong>Need a particular audience or delivery plan?</strong>
                <span>Talk through the right route for this project with our sales team.</span>
              </div>
              <Link to="/business/access" onClick={() => setOpenForm(false)}>Contact sales <ArrowRight size={15} /></Link>
            </section>

            <label>
              Materials or useful context
              <textarea name="additionalContext" value={form.additionalContext} onChange={update} placeholder={isQuestionnaire ? 'Question drafts, existing surveys, or constraints. Optional.' : 'Discussion guide, prototype, constraints, or other context. Optional.'} />
            </label>
            <button className="business-button" type="submit" disabled={submitting}>
              {submitting ? <LoaderCircle className="animate-spin" size={17} /> : 'Create project'}
              {!submitting && <ArrowRight size={17} />}
            </button>
          </form>
        </div>
      )}
      {quoteProject?.latestQuote && <div className="business-project-modal" role="dialog" aria-modal="true" aria-labelledby="business-quote-title"><section className="business-quote-dialog"><button className="business-modal-close" type="button" onClick={() => setQuoteProject(null)} aria-label="Close"><X size={18} /></button><p className="business-eyebrow">PROJECT QUOTE</p><h2 id="business-quote-title">Review your proposal.</h2><p className="business-form-intro">Accepting confirms that your organization agrees to this scope. Recruitment starts only after funding is confirmed.</p><dl><div><dt>Project</dt><dd>{quoteProject.title}</dd></div><div><dt>Quote</dt><dd>{new Intl.NumberFormat('en-US', { style: 'currency', currency: quoteProject.latestQuote.currency || 'USD' }).format(quoteProject.latestQuote.amount || 0)}</dd></div>{quoteProject.latestQuote.validUntil && <div><dt>Valid until</dt><dd>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(quoteProject.latestQuote.validUntil))}</dd></div>}</dl><section className="business-quote-scope"><strong>Scope included</strong><p>{quoteProject.latestQuote.scope}</p>{quoteProject.latestQuote.terms && <><strong>Terms</strong><p>{quoteProject.latestQuote.terms}</p></>}</section>{quoteDecision === 'DECLINE' && <label className="business-quote-decline">Why does this not work for your team? <textarea value={declineReason} onChange={(event) => setDeclineReason(event.target.value)} maxLength={800} placeholder="Optional feedback for a revised proposal." /></label>}<div className="business-quote-actions">{quoteDecision === 'DECLINE' ? <><button type="button" onClick={() => setQuoteDecision('')}>Keep reviewing</button><button type="button" className="business-quote-decline-button" disabled={submitting} onClick={() => decideQuote('DECLINE')}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : 'Decline quote'}</button></> : <><button type="button" onClick={() => setQuoteDecision('DECLINE')}>Decline</button><button type="button" className="business-button" disabled={submitting} onClick={() => decideQuote('ACCEPT')}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : 'Accept quote'} <Check size={16} /></button></>}</div></section></div>}
    </main>
  );
}
