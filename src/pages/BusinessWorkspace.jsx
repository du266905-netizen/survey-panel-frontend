import { useEffect, useState } from 'react';
import {
  ArrowRight,
  ClipboardList,
  FileText,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Plus,
  UsersRound,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { createBusinessProject, getBusinessWorkspace } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import Logo from '../components/Logo';
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
  RECEIVED: 'Received',
  REVIEW: 'Planning',
  PROPOSAL: 'Project details',
  CONFIRMED: 'Active',
  RECRUITING: 'In field',
  COMPLETED: 'Completed',
};

const projectFilters = [
  ['ALL', 'All'],
  ['RECEIVED', 'Received'],
  ['REVIEW', 'Planning'],
  ['PROPOSAL', 'Project details'],
  ['CONFIRMED', 'Active'],
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
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useState({ profile: null, projects: [] });
  const [loading, setLoading] = useState(true);
  const [openChooser, setOpenChooser] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [projectType, setProjectType] = useState('questionnaire');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [form, setForm] = useState(emptyProject);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const selectedType = projectTypes[projectType];
  const isQuestionnaire = projectType === 'questionnaire';
  const visibleProjects = activeFilter === 'ALL'
    ? workspace.projects
    : workspace.projects.filter((project) => project.status === activeFilter);

  useEffect(() => {
    let active = true;
    getBusinessWorkspace()
      .then((response) => {
        if (active) setWorkspace(response.data);
      })
      .catch(() => {
        if (active) setMessage('We could not load your projects. Please refresh and try again.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

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
      setMessage('Your project is ready in this workspace.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not create this project. Please check the details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="business-workspace">
      <header className="business-workspace-header">
        <Link to="/business/workspace" aria-label="GuanyiSearch projects"><Logo size="md" /></Link>
        <button
          className="business-workspace-logout"
          type="button"
          onClick={() => { logout(); navigate('/business/login'); }}
        >
          <LogOut size={15} /> Sign out
        </button>
      </header>

      <div className="business-workspace-body business-workspace-body--rail">
        <aside className="business-workspace-rail" aria-label="Workspace navigation">
          <img className="business-workspace-rail-mark" src="/guanyisearch-project-mark.png" alt="" />
          <Link className="is-active" to="/business/workspace" title="Projects" aria-label="Projects">
            <LayoutDashboard size={20} />
          </Link>
          <Link to="/business/access" title="Contact sales" aria-label="Contact sales">
            <FileText size={20} />
          </Link>
        </aside>

        <section className="business-projects">
          <div className="business-projects-head">
            <div>
              <p className="business-eyebrow">PROJECTS</p>
              <h1>Projects</h1>
              <p>Create a custom questionnaire or tailored research project when you are ready to learn from people.</p>
            </div>
            <div className="business-project-head-actions">
              <Link className="business-sales-link" to="/business/access">Contact sales <ArrowRight size={15} /></Link>
              {workspace.projects.length ? (
                <button className="business-button" type="button" onClick={() => setOpenChooser(true)}>
                  <Plus size={17} /> New project
                </button>
              ) : <span className="business-project-count">0 projects</span>}
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
    </main>
  );
}
