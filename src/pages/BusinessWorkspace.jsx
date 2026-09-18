import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Landmark,
  LoaderCircle,
  LogOut,
  MoreHorizontal,
  Pencil,
  Plus,
  Sparkles,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { completeBusinessResearchOnboarding, createBusinessProject, decideBusinessProjectQuote, deleteBusinessProject, getBusinessWorkspace, submitBusinessProject, updateBusinessProject } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import NotificationBell from '../components/NotificationBell';
import { useLanguage, withLanguage } from '../components/LanguageContext';
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
    eyebrow: 'QUESTIONNAIRE DESIGN',
    title: 'Request a questionnaire',
    description: 'Tell us the decision and audience. We will prepare the questionnaire for your project.',
    button: 'Request design',
    icon: ClipboardList,
    format: 'SURVEY',
  },
  research: {
    eyebrow: 'MANAGED RESEARCH',
    title: 'Request research support',
    description: 'Plan interviews, usability work, discussions, or a study that needs participant recruitment.',
    button: 'Request support',
    icon: UsersRound,
    format: 'INTERVIEW',
  },
};

const incentiveBudgetLabels = {
  CONFIRMED: 'Incentive budget confirmed',
  NEED_GUIDANCE: 'Incentive guidance requested',
  NOT_APPLICABLE: 'No participant incentive planned',
};

const organizationTypeOptions = [
  { value: 'BUSINESS', title: 'Business or commercial organisation', description: 'I am planning research for a company, brand, agency, retailer, or commercial team.', icon: Building2 },
  { value: 'RESEARCH_OR_EDUCATION', title: 'Research or education institution', description: 'I am working with a university, school, research centre, or academic project.', icon: GraduationCap },
  { value: 'NONPROFIT_OR_PUBLIC', title: 'Non-profit or public organisation', description: 'I am planning research for a charity, community organisation, public body, or civic programme.', icon: Landmark },
];

function onboardingStorageKey(user) {
  const identity = String(user?.id || user?.email || '').trim().toLowerCase();
  return identity ? `guanyi-business-onboarding:${identity}` : '';
}

function readStoredOnboarding(user) {
  const key = onboardingStorageKey(user);
  if (!key || typeof window === 'undefined') return null;
  try {
    const stored = JSON.parse(window.localStorage.getItem(key) || 'null');
    return stored?.researchRole && stored?.researchIntent ? stored : null;
  } catch {
    return null;
  }
}

function storeOnboarding(user, value) {
  const key = onboardingStorageKey(user);
  if (!key || typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify({ ...value, savedAt: new Date().toISOString() }));
}

const typeForProject = (project) => (
  project.studyFormat === 'SURVEY' ? projectTypes.questionnaire : projectTypes.research
);

export default function BusinessWorkspace() {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [workspace, setWorkspace] = useState({ profile: null, projects: [] });
  const [loading, setLoading] = useState(true);
  const [openChooser, setOpenChooser] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [projectType, setProjectType] = useState('questionnaire');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [form, setForm] = useState(emptyProject);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [quoteProject, setQuoteProject] = useState(null);
  const [quoteDecision, setQuoteDecision] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [editingProject, setEditingProject] = useState(null);
  const [briefProject, setBriefProject] = useState(null);
  const [projectMenuId, setProjectMenuId] = useState('');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboarding, setOnboarding] = useState({ researchRole: '', researchIntent: '', organizationType: '' });
  const [onboardingSaving, setOnboardingSaving] = useState(false);
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  const selectedType = projectTypes[projectType];
  const isQuestionnaire = projectType === 'questionnaire';
  const visibleProjects = activeFilter === 'ALL'
    ? workspace.projects
    : workspace.projects.filter((project) => project.status === activeFilter);
  const questionnaireProjects = workspace.projects.filter((project) => project.questionnaire);

  useEffect(() => {
    let active = true;
    getBusinessWorkspace()
      .then((response) => {
        if (!active) return;
        setWorkspace(response.data);
        const savedOnThisDevice = readStoredOnboarding(user);
        const savedOrganizationType = organizationTypeOptions.some((option) => option.value === response.data.profile?.organizationType)
          ? response.data.profile.organizationType
          : savedOnThisDevice?.organizationType || '';
        setOnboarding({
          researchRole: response.data.profile?.researchRole || savedOnThisDevice?.researchRole || '',
          researchIntent: response.data.profile?.researchIntent || savedOnThisDevice?.researchIntent || '',
          organizationType: savedOrganizationType,
        });
        setOnboardingComplete(Boolean(response.data.profile?.researchOnboardedAt || savedOnThisDevice));
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
  }, [location.search, user]);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const chooseProjectType = (type) => {
    setProjectType(type);
    setForm({ ...emptyProject, studyFormat: projectTypes[type].format });
    setOpenChooser(false);
    setOpenForm(true);
  };

  const openNewProject = () => {
    setEditingProject(null);
    setForm(emptyProject);
    setOpenChooser(true);
  };

  const saveOnboarding = async () => {
    if (!onboarding.researchRole || !onboarding.researchIntent || (onboarding.researchRole === 'ORGANIZATION' && !onboarding.organizationType) || onboardingSaving) return;
    setOnboardingSaving(true);
    try {
      const response = await completeBusinessResearchOnboarding(onboarding);
      setWorkspace((current) => ({ ...current, profile: response.data.profile }));
      storeOnboarding(user, onboarding);
      setOnboardingComplete(true);
    } catch (error) {
      const status = error.response?.status;
      if (!status || status >= 500 || [404, 405, 501].includes(status)) {
        storeOnboarding(user, onboarding);
        setOnboardingComplete(true);
        setMessage('Your research preferences are saved on this device for now. You can start using the workspace.');
      } else {
        setMessage(error.response?.data?.message || 'We could not save your research preferences. Please try again.');
      }
    } finally {
      setOnboardingSaving(false);
    }
  };

  const advanceOnboarding = () => {
    if (onboardingStep === 0 && onboarding.researchRole) {
      setOnboardingStep(1);
      return;
    }
    if (onboardingStep === 1 && onboarding.researchIntent) {
      if (onboarding.researchRole === 'ORGANIZATION') setOnboardingStep(2);
      else saveOnboarding();
      return;
    }
    if (onboardingStep === 2) saveOnboarding();
  };

  const openEditProject = (project) => {
    const type = project.studyFormat === 'SURVEY' ? 'questionnaire' : 'research';
    setProjectType(type);
    setForm({
      title: project.title || '', researchGoal: project.researchGoal || '', audienceDescription: project.audienceDescription || '',
      studyFormat: project.studyFormat || projectTypes[type].format, countries: project.countries || '', languages: project.languages || '',
      targetParticipants: project.targetParticipants || '', estimatedMinutes: project.estimatedMinutes || '', timeline: project.timeline || '',
      incentiveBudget: project.incentiveBudget || 'NEED_GUIDANCE', additionalContext: project.additionalContext || '',
    });
    setProjectMenuId('');
    setEditingProject(project);
    setOpenForm(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setMessage('');
    try {
      const payload = {
        ...form,
        targetParticipants: form.targetParticipants || undefined,
        estimatedMinutes: form.estimatedMinutes || undefined,
        ...(editingProject ? {} : { selfServiceQuestionnaire: isQuestionnaire }),
      };
      const response = editingProject
        ? await updateBusinessProject(editingProject.id, payload)
        : await createBusinessProject(payload);
      setWorkspace((current) => ({ ...current, projects: editingProject
        ? current.projects.map((project) => project.id === editingProject.id ? response.data.project : project)
        : [response.data.project, ...current.projects] }));
      setForm(emptyProject);
      setOpenForm(false);
      setEditingProject(null);
      setMessage(editingProject ? 'Your research brief has been updated.' : isQuestionnaire ? 'Your questionnaire draft is ready. Add questions and collect responses before reviewing results.' : 'Your research brief is ready. Submit it when you are ready for a proposal.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not create this project. Please check the details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (project) => {
    if (submitting || !window.confirm(`Delete the draft “${project.title}”? This cannot be undone.`)) return;
    setSubmitting(true); setMessage(''); setProjectMenuId('');
    try {
      await deleteBusinessProject(project.id);
      setWorkspace((current) => ({ ...current, projects: current.projects.filter((item) => item.id !== project.id) }));
      setMessage('Draft research brief deleted.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'We could not delete this draft. Please try again.');
    } finally { setSubmitting(false); }
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
          <button className={activeView === 'home' ? 'is-active' : ''} type="button" title="Research services" aria-label="Research services" onClick={() => setActiveView('home')}>
            <LayoutDashboard size={20} />
          </button>
          <button className={activeView === 'projects' ? 'is-active' : ''} type="button" title="Projects" aria-label="Projects" onClick={() => setActiveView('projects')}>
            <ClipboardList size={20} />
          </button>
          <button className={activeView === 'results' ? 'is-active' : ''} type="button" title="Questionnaire results" aria-label="Questionnaire results" onClick={() => setActiveView('results')}>
            <BarChart3 size={20} />
          </button>
          <NotificationBell className="business-workspace-notification" presentation="modal" />
          <div className="business-workspace-account">
            <button type="button" onClick={() => setAccountMenuOpen((value) => !value)} aria-label="Account menu" aria-expanded={accountMenuOpen}>
              <UserRound size={20} />
              <span>{String(user?.displayName || user?.email || 'A').trim().charAt(0).toUpperCase()}</span>
            </button>
            {accountMenuOpen && <div><strong>{user?.displayName || 'Client account'}</strong><span>{user?.email}</span><button type="button" onClick={() => { setAccountMenuOpen(false); navigate('/business/account'); }}><UserRound size={15} /> Account</button><button type="button" onClick={() => { logout(); navigate('/business/login'); }}><LogOut size={15} /> Sign out</button></div>}
          </div>
        </aside>

        {activeView === 'home' ? <section className="business-projects business-workspace-home">
          <div className="business-workspace-home-intro">
            <div><p className="business-eyebrow">RESEARCH SERVICES</p><h1>Research with a clear next step.</h1><p>Start with the decision you need to make in a market. Choose a questionnaire when you need structured answers at scale, or tailored research when the question needs a more considered route.</p></div>
            <button className="business-home-project-link" type="button" onClick={() => setActiveView('projects')}>View projects <ArrowRight size={16} /></button>
          </div>
          <div className="business-service-launchers">
            <article>
              <span><ClipboardList size={24} /></span><p>QUESTIONNAIRE DESIGN</p><h2>Custom questionnaire</h2><p>Turn a focused question into a structured questionnaire for a defined audience. Create a private draft, build the questions, and review only real responses in your workspace.</p>
              <button className="business-button" type="button" onClick={() => chooseProjectType('questionnaire')}>Start a questionnaire brief <ArrowRight size={16} /></button>
            </article>
            <article>
              <span><UsersRound size={24} /></span><p>TAILORED RESEARCH</p><h2>Custom research</h2><p>For cross-market decisions that need interviews, usability work, group discussion, or a more specific recruitment and research plan.</p>
              <button className="business-button" type="button" onClick={() => chooseProjectType('research')}>Start a research brief <ArrowRight size={16} /></button>
            </article>
          </div>
          <div className="business-workspace-home-lower">
            <section><p>HOW A REQUEST MOVES FORWARD</p><ol><li><span>01</span><strong>Prepare a brief</strong><small>Describe the decision, people, market and timing.</small></li><li><span>02</span><strong>Discuss the scope</strong><small>Our team reviews the brief and asks for what is needed.</small></li><li><span>03</span><strong>Review a proposal</strong><small>A scope and quote are shared before work begins.</small></li></ol></section>
            <section className="business-results-entry"><BarChart3 size={24} /><p>QUESTIONNAIRE RESULTS</p><h2>Review what people actually said.</h2><span>{questionnaireProjects.length ? `${questionnaireProjects.length} questionnaire ${questionnaireProjects.length === 1 ? 'project is' : 'projects are'} available to review.` : 'Results appear here after a questionnaire has been prepared and receives answers.'}</span><button type="button" onClick={() => setActiveView('results')}>Open results <ArrowRight size={16} /></button></section>
          </div>
        </section> : activeView === 'results' ? <section className="business-projects business-results-index">
          <div className="business-projects-head"><div><p className="business-eyebrow">QUESTIONNAIRE RESULTS</p><h1>Results</h1><p>Question summaries and individual answers are available only for questionnaires in this workspace. This area never uses demonstration data.</p></div><button className="business-home-project-link" type="button" onClick={() => setActiveView('home')}>Research services <ArrowRight size={16} /></button></div>
          {loading ? <div className="business-workspace-loading"><LoaderCircle className="animate-spin" /> Loading results</div> : questionnaireProjects.length ? <div className="business-results-index-list">{questionnaireProjects.map((project) => <article key={project.id}><div><p>QUESTIONNAIRE</p><h2>{project.questionnaire?.title || project.title}</h2><span>{project.questionnaire?.responseCount || 0} responses received</span></div><Link className="business-button" to={withLanguage(`/business/projects/${project.id}/results`, language)}>View results <ArrowRight size={16} /></Link></article>)}</div> : <section className="business-results-index-empty"><BarChart3 size={30} /><h2>No questionnaire results yet.</h2><p>Start a custom questionnaire, add its questions, and collect answers. Once responses are received, their summaries and answer records will appear here.</p><button className="business-button" type="button" onClick={() => chooseProjectType('questionnaire')}>Start a questionnaire brief <ArrowRight size={16} /></button></section>}
        </section> : <section className="business-projects">
          <div className="business-projects-head">
            <div>
              <p className="business-eyebrow">RESEARCH WORKSPACE</p>
              <h1>Projects</h1>
              <p>Keep each research brief, proposal, and confirmed next step in one place.</p>
            </div>
            <div className="business-project-head-actions">
              <Link className="business-button" to="/business/access">Contact sales <ArrowRight size={17} /></Link>
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
                      <div className="business-project-menu"><button type="button" onClick={() => setProjectMenuId((current) => current === project.id ? '' : project.id)} aria-label={`Project actions for ${project.title}`} aria-expanded={projectMenuId === project.id}><MoreHorizontal size={19} /></button>{projectMenuId === project.id && <div><button type="button" onClick={() => { setBriefProject(project); setProjectMenuId(''); }}><FileText size={14} /> View brief</button>{project.status === 'DRAFT' && <button type="button" onClick={() => openEditProject(project)}><Pencil size={14} /> Edit brief</button>}{project.status === 'DRAFT' && <button className="is-danger" type="button" onClick={() => deleteProject(project)}><Trash2 size={14} /> Delete draft</button>}</div>}</div>
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
                        {project.questionnaire && <><Link className="business-project-open" to={withLanguage(`/business/projects/${project.id}`, language)}>Open questionnaire draft <ArrowRight size={15} /></Link><Link className="business-project-open business-project-results" to={withLanguage(`/business/projects/${project.id}/results`, language)}><BarChart3 size={15} /> View results</Link></>}
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
                    <span>Choose another status or prepare a new research brief.</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="business-projects-empty-layout">
              <button className="business-create-project-card" type="button" onClick={openNewProject}>
                <span><Plus size={31} /></span>
                <strong>Prepare a research brief</strong>
                <small>Request a questionnaire design or managed research support.</small>
              </button>
              <section className="business-projects-guide">
                <p>GET STARTED</p>
                <h2>Start with the decision.</h2>
                <ol>
                  <li><span>01</span> Describe what you need to learn</li>
                  <li><span>02</span> Tell us who matters to the decision</li>
                  <li><span>03</span> Submit when you are ready for a proposal</li>
                </ol>
              </section>
            </div>
          )}
        </section>}
      </div>

      {openChooser && (
        <div className="business-project-modal business-project-modal--chooser" role="dialog" aria-modal="true" aria-labelledby="business-project-chooser-title">
          <section>
            <button className="business-modal-close" type="button" onClick={() => setOpenChooser(false)} aria-label="Close"><X size={18} /></button>
            <p className="business-eyebrow">NEW PROJECT</p>
            <h2 id="business-project-chooser-title">What would you like us to prepare?</h2>
            <p className="business-form-intro">Choose the service that best matches the decision your team needs to make.</p>
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
            <p className="business-eyebrow">{editingProject ? 'EDIT RESEARCH BRIEF' : selectedType.eyebrow}</p>
            <h2 id="business-project-title">{editingProject ? 'Update this research brief.' : isQuestionnaire ? 'Request a questionnaire design.' : 'Request managed research support.'}</h2>
            <p className="business-form-intro">
              {isQuestionnaire
                ? 'Tell us what you need to understand and who matters to the decision. We will prepare a questionnaire that fits the project.'
                : 'Tell us what needs to be learned, from whom, and by when. We will prepare the research route and proposal.'}
            </p>

            <label>
              {isQuestionnaire ? 'Project name' : 'Research project name'}
              <input name="title" value={form.title} onChange={update} placeholder={isQuestionnaire ? 'For example, New product feedback' : 'For example, Member onboarding study'} required />
            </label>
            <section className="business-brief-section">
              <p>01 · DECISION AND PEOPLE</p>
              <h3>Start with the decision you need to make.</h3>
              <span>These core details help us understand what useful research needs to answer.</span>
            </section>
            <label>
              What decision should this support?
              <textarea name="researchGoal" value={form.researchGoal} onChange={update} placeholder="Describe the decision, context, and what a useful answer would help you do." required />
            </label>
            <label>
              Who do you need to hear from?
              <textarea name="audienceDescription" value={form.audienceDescription} onChange={update} placeholder="Describe the people, context, or experience that matters." required />
            </label>

            <div className="business-form-grid">
              <label>
                Where should this research be grounded?
                <input name="countries" value={form.countries} onChange={update} placeholder="For example, Saudi Arabia and the UAE" />
                <small>Country, market, city, or community. Optional.</small>
              </label>
              <label>
                Relevant language(s)
                <input name="languages" value={form.languages} onChange={update} placeholder="For example, Arabic and English" />
                <small>Optional, including any language or local-expression needs.</small>
              </label>
            </div>

            <section className="business-brief-section">
              <p>02 · METHOD AND PRACTICAL SCOPE</p>
              <h3>Set the shape of the work.</h3>
              <span>These are planning details, not a commitment to a final scope, price, or launch date.</span>
            </section>
            <div className="business-form-grid">
              {isQuestionnaire ? (
                <label>
                  Estimated completion time (minutes)
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
                Target number of participants
                <input name="targetParticipants" type="number" min="1" value={form.targetParticipants} onChange={update} placeholder="Optional" />
                <small>An initial estimate is enough. We can discuss feasibility after submission.</small>
              </label>
              <label>
                Desired timeline
                <input name="timeline" value={form.timeline} onChange={update} placeholder="For example, next month" />
              </label>
              <label>
                Participant incentive status
                <select name="incentiveBudget" value={form.incentiveBudget} onChange={update}>
                  <option value="NEED_GUIDANCE">I need guidance on participant incentives</option>
                  <option value="CONFIRMED">An incentive budget is confirmed</option>
                  <option value="NOT_APPLICABLE">No participant incentive is planned</option>
                </select>
              </label>
            </div>

            <section className="business-brief-callout">
              <div>
                <p>WHAT HAPPENS NEXT</p>
                <strong>Saving keeps the brief private in your workspace. Submitting asks for a proposal.</strong>
                <span>Saving does not launch a study, recruit participants, or commit you to a scope.</span>
              </div>
              <Sparkles size={20} />
            </section>

            <label>
              Supporting material or context
              <textarea name="additionalContext" value={form.additionalContext} onChange={update} placeholder={isQuestionnaire ? 'Question drafts, existing surveys, or constraints. Optional.' : 'Discussion guide, prototype, constraints, or other context. Optional.'} />
            </label>
            <button className="business-button" type="submit" disabled={submitting}>
              {submitting ? <LoaderCircle className="animate-spin" size={17} /> : editingProject ? 'Save changes' : 'Save research brief'}
              {!submitting && <ArrowRight size={17} />}
            </button>
          </form>
        </div>
      )}
      {briefProject && <div className="business-project-modal" role="dialog" aria-modal="true" aria-labelledby="business-brief-title"><section className="business-brief-dialog"><button className="business-modal-close" type="button" onClick={() => setBriefProject(null)} aria-label="Close"><X size={18} /></button><p className="business-eyebrow">RESEARCH BRIEF</p><h2 id="business-brief-title">{briefProject.title}</h2><p>{briefProject.researchGoal}</p><dl><div><dt>Who we need to hear from</dt><dd>{briefProject.audienceDescription}</dd></div><div><dt>Format</dt><dd>{briefProject.studyFormat.replaceAll('_', ' ').toLowerCase()}</dd></div>{briefProject.countries && <div><dt>Market or community</dt><dd>{briefProject.countries}</dd></div>}{briefProject.languages && <div><dt>Languages</dt><dd>{briefProject.languages}</dd></div>}{briefProject.targetParticipants && <div><dt>Target participants</dt><dd>{briefProject.targetParticipants}</dd></div>}{briefProject.estimatedMinutes && <div><dt>{briefProject.studyFormat === 'SURVEY' ? 'Estimated completion time' : 'Estimated session time'}</dt><dd>{briefProject.estimatedMinutes} minutes</dd></div>}{briefProject.timeline && <div><dt>Preferred timing</dt><dd>{briefProject.timeline}</dd></div>}<div><dt>Participant incentives</dt><dd>{incentiveBudgetLabels[briefProject.incentiveBudget] || incentiveBudgetLabels.NEED_GUIDANCE}</dd></div></dl>{briefProject.additionalContext && <section><strong>Additional context</strong><p>{briefProject.additionalContext}</p></section>}<div className="business-brief-dialog-actions"><button type="button" onClick={() => setBriefProject(null)}>Close</button>{briefProject.status === 'DRAFT' && <button type="button" className="business-button" onClick={() => { setBriefProject(null); openEditProject(briefProject); }}>Edit brief <Pencil size={15} /></button>}</div></section></div>}
      {quoteProject?.latestQuote && <div className="business-project-modal" role="dialog" aria-modal="true" aria-labelledby="business-quote-title"><section className="business-quote-dialog"><button className="business-modal-close" type="button" onClick={() => setQuoteProject(null)} aria-label="Close"><X size={18} /></button><p className="business-eyebrow">PROJECT QUOTE</p><h2 id="business-quote-title">Review your proposal.</h2><p className="business-form-intro">Accepting confirms that your organization agrees to this scope. Recruitment starts only after funding is confirmed.</p><dl><div><dt>Project</dt><dd>{quoteProject.title}</dd></div><div><dt>Quote</dt><dd>{new Intl.NumberFormat('en-US', { style: 'currency', currency: quoteProject.latestQuote.currency || 'USD' }).format(quoteProject.latestQuote.amount || 0)}</dd></div>{quoteProject.latestQuote.validUntil && <div><dt>Valid until</dt><dd>{new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(new Date(quoteProject.latestQuote.validUntil))}</dd></div>}</dl><section className="business-quote-scope"><strong>Scope included</strong><p>{quoteProject.latestQuote.scope}</p>{quoteProject.latestQuote.terms && <><strong>Terms</strong><p>{quoteProject.latestQuote.terms}</p></>}</section>{quoteDecision === 'DECLINE' && <label className="business-quote-decline">Why does this not work for your team? <textarea value={declineReason} onChange={(event) => setDeclineReason(event.target.value)} maxLength={800} placeholder="Optional feedback for a revised proposal." /></label>}<div className="business-quote-actions">{quoteDecision === 'DECLINE' ? <><button type="button" onClick={() => setQuoteDecision('')}>Keep reviewing</button><button type="button" className="business-quote-decline-button" disabled={submitting} onClick={() => decideQuote('DECLINE')}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : 'Decline quote'}</button></> : <><button type="button" onClick={() => setQuoteDecision('DECLINE')}>Decline</button><button type="button" className="business-button" disabled={submitting} onClick={() => decideQuote('ACCEPT')}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : 'Accept quote'} <Check size={16} /></button></>}</div></section></div>}
      {!loading && workspace.profile && !onboardingComplete && (
        <section className="business-onboarding" aria-labelledby="business-onboarding-title">
          <div className="business-onboarding-shell">
            <img src="/guanyisearch-project-mark.png" alt="GuanyiSearch" />
            <span className="business-onboarding-step">Step {onboardingStep + 1} of {onboarding.researchRole === 'ORGANIZATION' ? 3 : 2}</span>
            <h1 id="business-onboarding-title">
              {onboardingStep === 0 && 'How will you use GuanyiSearch?'}
              {onboardingStep === 1 && 'What would you like to understand?'}
              {onboardingStep === 2 && 'What kind of organisation are you?'}
            </h1>
            <p className="business-onboarding-intro">
              {onboardingStep === 0 && 'Choose the account context that best describes your work. You can still request either type of research service.'}
              {onboardingStep === 1 && 'Choose the closest starting point. Your research brief will carry the detail when you are ready.'}
              {onboardingStep === 2 && 'This helps us understand the context for your research request. It does not change what you can ask for.'}
            </p>
            {onboardingStep === 0 && <div className="business-onboarding-options business-onboarding-options--two">
              <button type="button" className={onboarding.researchRole === 'INDEPENDENT' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchRole: 'INDEPENDENT', organizationType: 'INDEPENDENT_RESEARCHER' }))}><UserRound size={23} /><strong>Individual</strong><small>I am exploring a question in my own capacity, for study, learning, or an independent project.</small></button>
              <button type="button" className={onboarding.researchRole === 'ORGANIZATION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchRole: 'ORGANIZATION', organizationType: current.organizationType === 'INDEPENDENT_RESEARCHER' ? '' : current.organizationType }))}><UsersRound size={23} /><strong>Organisation</strong><small>I am planning research for a business, institution, public body, or non-profit organisation.</small></button>
            </div>}
            {onboardingStep === 1 && <div className="business-onboarding-options business-onboarding-options--three">
              <button type="button" className={onboarding.researchIntent === 'INDEPENDENT_RESEARCH' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'INDEPENDENT_RESEARCH' }))}><ClipboardList size={22} /><strong>Explore a research question</strong><small>I want a considered way to learn from people in a place or community.</small></button>
              <button type="button" className={onboarding.researchIntent === 'MARKET_EXPLORATION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'MARKET_EXPLORATION' }))}><Sparkles size={22} /><strong>Understand a local market</strong><small>I want to learn how people, context, or local expression differ in a region.</small></button>
              <button type="button" className={onboarding.researchIntent === 'MARKET_DECISION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'MARKET_DECISION' }))}><BarChart3 size={22} /><strong>Prepare a market decision</strong><small>I need evidence for a product, brand, channel, or market-entry decision.</small></button>
            </div>}
            {onboardingStep === 2 && <div className="business-onboarding-options business-onboarding-options--three">
              {organizationTypeOptions.map(({ value, title, description, icon: Icon }) => <button type="button" key={value} className={onboarding.organizationType === value ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, organizationType: value }))}><Icon size={22} /><strong>{title}</strong><small>{description}</small></button>)}
            </div>}
            <footer>
              {onboardingStep > 0 && <button type="button" onClick={() => setOnboardingStep((current) => current - 1)}>Back</button>}
              <button className="business-button" type="button" disabled={(onboardingStep === 0 && !onboarding.researchRole) || (onboardingStep === 1 && !onboarding.researchIntent) || (onboardingStep === 2 && !onboarding.organizationType) || onboardingSaving} onClick={advanceOnboarding}>
                {onboardingSaving ? <LoaderCircle className="animate-spin" size={17} /> : onboardingStep === (onboarding.researchRole === 'ORGANIZATION' ? 2 : 1) ? 'Enter workspace' : 'Continue'}
                {!onboardingSaving && <ArrowRight size={17} />}
              </button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}
