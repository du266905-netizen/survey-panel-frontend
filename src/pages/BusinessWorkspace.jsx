import { useEffect, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  BrainCircuit,
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

export default function BusinessWorkspace() {
  const { user, logout } = useAuth();
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.workspace.business;
  const briefCopy = copy.brief;
  const projectsCopy = copy.projects;
  const feedbackCopy = copy.feedback;
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

  const selectedTypeCopy = briefCopy[projectType];
  const studyFormatLabel = (format) => format === 'SURVEY'
    ? copy.services.questionnaireTitle
    : briefCopy.methods.find(([value]) => value === format)?.[1] || String(format || '').replaceAll('_', ' ').toLowerCase();
  const isQuestionnaire = projectType === 'questionnaire';
  const visibleProjects = activeFilter === 'ALL'
    ? workspace.projects
    : workspace.projects.filter((project) => project.status === activeFilter);
  const questionnaireProjects = workspace.projects.filter((project) => project.questionnaire);
  const responseCount = questionnaireProjects.reduce((total, project) => total + Number(project.questionnaire?.responseCount || 0), 0);
  const draftCount = workspace.projects.filter((project) => project.status === 'DRAFT').length;
  const recentProjects = [...workspace.projects].sort((first, second) => new Date(second.updatedAt || 0) - new Date(first.updatedAt || 0)).slice(0, 3);
  const displayName = String(user?.displayName || user?.email?.split('@')[0] || (language === 'zh-CN' ? '朋友' : 'there')).trim();

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
        if (active) setMessage(feedbackCopy.loadProjects);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [feedbackCopy.loadProjects, location.search, user]);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const chooseProjectType = (type) => {
    setProjectType(type);
    setForm({ ...emptyProject, studyFormat: projectTypes[type].format });
    setEditingProject(null);
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
        setMessage(feedbackCopy.preferencesSaved);
      } else {
        setMessage(feedbackCopy.savePreferencesError);
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
      setMessage(editingProject ? feedbackCopy.briefUpdated : isQuestionnaire ? feedbackCopy.questionnaireReady : feedbackCopy.briefReady);
    } catch (error) {
      setMessage(feedbackCopy.createError);
    } finally {
      setSubmitting(false);
    }
  };

  const deleteProject = async (project) => {
    if (submitting || !window.confirm(feedbackCopy.deleteConfirm.replace('{title}', project.title))) return;
    setSubmitting(true); setMessage(''); setProjectMenuId('');
    try {
      await deleteBusinessProject(project.id);
      setWorkspace((current) => ({ ...current, projects: current.projects.filter((item) => item.id !== project.id) }));
      setMessage(feedbackCopy.deleted);
    } catch (error) {
      setMessage(feedbackCopy.deleteError);
    } finally { setSubmitting(false); }
  };

  const requestProposal = async (project) => {
    if (submitting) return;
    setSubmitting(true); setMessage('');
    try {
      const response = await submitBusinessProject(project.id);
      setWorkspace((current) => ({ ...current, projects: current.projects.map((item) => item.id === project.id ? response.data.project : item) }));
      setMessage(feedbackCopy.submitted);
    } catch (error) {
      setMessage(feedbackCopy.submitError);
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
      setMessage(decision === 'ACCEPT' ? feedbackCopy.quoteAccepted : feedbackCopy.quoteDeclined);
    } catch (error) {
      setMessage(feedbackCopy.quoteError);
    } finally { setSubmitting(false); }
  };

  return (
    <main className="business-workspace notranslate" translate="no" data-translate="no">
      <div className="business-workspace-body business-workspace-body--rail">
        <aside className="business-workspace-rail" aria-label={copy.rail.navigation}>
          <img className="business-workspace-rail-mark" src="/guanyisearch-project-mark.png" alt="" />
          <button className={activeView === 'home' ? 'is-active' : ''} type="button" title={copy.rail.services} aria-label={copy.rail.services} onClick={() => setActiveView('home')}><LayoutDashboard size={20} /></button>
          <button className={activeView === 'projects' ? 'is-active' : ''} type="button" title={copy.rail.projects} aria-label={copy.rail.projects} onClick={() => setActiveView('projects')}><ClipboardList size={20} /></button>
          <button className={activeView === 'results' ? 'is-active' : ''} type="button" title={copy.rail.results} aria-label={copy.rail.results} onClick={() => setActiveView('results')}><BarChart3 size={20} /></button>
          <NotificationBell className="business-workspace-notification" presentation="modal" />
          <div className="business-workspace-account">
            <button type="button" onClick={() => setAccountMenuOpen((value) => !value)} aria-label={copy.rail.accountMenu} aria-expanded={accountMenuOpen}><UserRound size={20} /><span>{String(user?.displayName || user?.email || 'A').trim().charAt(0).toUpperCase()}</span></button>
            {accountMenuOpen && <div><strong>{user?.displayName || copy.rail.clientAccount}</strong><span>{user?.email}</span><button type="button" onClick={() => { setAccountMenuOpen(false); navigate(withLanguage('/business/account', language)); }}><UserRound size={15} /> {copy.rail.account}</button><button type="button" onClick={() => { logout(); navigate(withLanguage('/business/login', language)); }}><LogOut size={15} /> {copy.rail.signOut}</button></div>}
          </div>
        </aside>

        {activeView === 'home' ? <section className="business-projects business-workspace-home">
          <header className="business-dashboard-header"><div><p className="business-dashboard-hero-line">{publicCopy.hero.lines.slice(1).join(' ')}</p><h1><span>{language === 'zh-CN' ? '欢迎回来，' : 'Welcome back,'}</span><strong>{displayName}.</strong></h1><p className="business-dashboard-intro">{language === 'zh-CN' ? '从一个研究目标开始，组织项目、问卷与真实答卷。' : 'Start with a research goal, then organise projects, questionnaires, and real responses.'}</p></div></header>
          <div className="business-dashboard-actions">
            <button type="button" onClick={() => openNewProject()}><span className="is-purple"><Plus size={21} /></span><div><strong>{language === 'zh-CN' ? '新建研究' : 'Start new research'}</strong><small>{language === 'zh-CN' ? '选择问卷或定制研究' : 'Choose a questionnaire or tailored study'}</small></div><ArrowRight size={17} /></button>
            <button type="button" onClick={() => navigate(withLanguage('/business/ai-brief', language))}><span className="is-amber"><BrainCircuit size={21} /></span><div><strong>Start with AI</strong><small>{language === 'zh-CN' ? '用对话开始一份研究简报' : 'Start a research brief in a conversation'}</small></div><ArrowRight size={17} /></button>
            <button type="button" onClick={() => chooseProjectType('questionnaire')}><span className="is-green"><ClipboardList size={21} /></span><div><strong>{language === 'zh-CN' ? '问卷设计' : 'Questionnaire design'}</strong><small>{language === 'zh-CN' ? '创建私有问卷草稿' : 'Create a private draft'}</small></div><ArrowRight size={17} /></button>
          </div>
          {message && <p className="business-workspace-message">{message}</p>}
          <div className="business-dashboard-grid">
            <section className="business-dashboard-statistics"><header><div><h2>{language === 'zh-CN' ? '研究概览' : 'Research overview'}</h2><p>{language === 'zh-CN' ? '只显示此工作区的真实记录。' : 'Only real records from this workspace.'}</p></div><button type="button" onClick={() => setActiveView('results')}>{language === 'zh-CN' ? '查看结果' : 'View results'}</button></header><div className="business-dashboard-stats"><article><span><ClipboardList size={17} /></span><small>{language === 'zh-CN' ? '项目' : 'Projects'}</small><strong>{workspace.projects.length}</strong></article><article><span><Pencil size={17} /></span><small>{language === 'zh-CN' ? '草稿' : 'Drafts'}</small><strong>{draftCount}</strong></article><article><span><BarChart3 size={17} /></span><small>{language === 'zh-CN' ? '已收答卷' : 'Responses'}</small><strong>{responseCount}</strong></article></div></section>
            <section className="business-dashboard-recent"><header><div><h2>{language === 'zh-CN' ? '最近项目' : 'Recent projects'}</h2><p>{language === 'zh-CN' ? '继续处理你的研究工作。' : 'Continue work already in progress.'}</p></div><button type="button" onClick={() => setActiveView('projects')}>{language === 'zh-CN' ? '所有项目' : 'All projects'}</button></header>{recentProjects.length ? <div>{recentProjects.map((project) => <button key={project.id} type="button" onClick={() => setActiveView('projects')}><span className={`business-status status-${String(project.status).toLowerCase()}`}>{projectsCopy.statuses[project.status] || project.status}</span><strong>{project.title}</strong><small>{project.questionnaire?.responseCount || 0} {copy.results.responses}</small><ArrowRight size={15} /></button>)}</div> : <div className="business-dashboard-empty"><ClipboardList size={24} /><strong>{language === 'zh-CN' ? '准备第一份研究简报。' : 'Prepare your first research brief.'}</strong><button type="button" onClick={openNewProject}>{projectsCopy.getStarted}</button></div>}</section>
          </div>
        </section> : activeView === 'results' ? <section className="business-projects business-results-index">
          <div className="business-projects-head"><div><p className="business-eyebrow">{copy.results.eyebrow}</p><h1>{copy.results.indexTitle}</h1><p>{copy.results.indexIntro}</p></div><button className="business-home-project-link" type="button" onClick={() => setActiveView('home')}>{copy.rail.services} <ArrowRight size={16} /></button></div>
          {loading ? <div className="business-workspace-loading"><LoaderCircle className="animate-spin" /> {feedbackCopy.loadingResults}</div> : questionnaireProjects.length ? <div className="business-results-index-list">{questionnaireProjects.map((project) => <article key={project.id}><div><p>{copy.services.questionnaireEyebrow}</p><h2>{project.questionnaire?.title || project.title}</h2><span>{project.questionnaire?.responseCount || 0} {copy.results.responses}</span></div><Link className="business-button" to={withLanguage(`/business/projects/${project.id}/results`, language)}>{copy.results.view} <ArrowRight size={16} /></Link></article>)}</div> : <section className="business-results-index-empty"><BarChart3 size={30} /><h2>{copy.results.noResultsTitle}</h2><p>{copy.results.noResultsBody}</p><button className="business-button" type="button" onClick={() => chooseProjectType('questionnaire')}>{copy.services.questionnaireAction} <ArrowRight size={16} /></button></section>}
        </section> : <section className="business-projects">
          <div className="business-projects-head">
            <div>
              <p className="business-eyebrow">{projectsCopy.eyebrow}</p>
              <h1>{projectsCopy.title}</h1>
              <p>{projectsCopy.intro}</p>
            </div>
            <div className="business-project-head-actions">
              <Link className="business-button" to={withLanguage('/business/access', language)}>{projectsCopy.contactSales} <ArrowRight size={17} /></Link>
            </div>
          </div>

          {message && <p className="business-workspace-message">{message}</p>}

          {loading ? <div className="business-workspace-loading"><LoaderCircle className="animate-spin" /> {feedbackCopy.loadingProjects}</div> : workspace.projects.length ? (
            <>
              <div className="business-project-toolbar" role="tablist" aria-label={projectsCopy.title}>
                {projectFilters.map(([value]) => (
                  <button
                    key={value}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === value}
                    className={activeFilter === value ? 'is-active' : ''}
                    onClick={() => setActiveFilter(value)}
                  >
                    {projectsCopy.filters[value]} <span>{value === 'ALL' ? workspace.projects.length : workspace.projects.filter((project) => project.status === value).length}</span>
                  </button>
                ))}
              </div>

              <div className="business-project-list">
                {visibleProjects.map((project) => {
                  return (
                    <article key={project.id}>
                      <div className="business-project-menu"><button type="button" onClick={() => setProjectMenuId((current) => current === project.id ? '' : project.id)} aria-label={projectsCopy.actions.replace('{title}', project.title)} aria-expanded={projectMenuId === project.id}><MoreHorizontal size={19} /></button>{projectMenuId === project.id && <div><button type="button" onClick={() => { setBriefProject(project); setProjectMenuId(''); }}><FileText size={14} /> {projectsCopy.viewBrief}</button>{project.status === 'DRAFT' && <button type="button" onClick={() => openEditProject(project)}><Pencil size={14} /> {projectsCopy.editBrief}</button>}{project.status === 'DRAFT' && <button className="is-danger" type="button" onClick={() => deleteProject(project)}><Trash2 size={14} /> {projectsCopy.deleteDraft}</button>}</div>}</div>
                      <div>
                        <span className={`business-status status-${String(project.status).toLowerCase()}`}>
                          {projectsCopy.statuses[project.status] || project.status}
                        </span>
                        <p className="business-project-kind">{project.studyFormat === 'SURVEY' ? copy.services.questionnaireEyebrow : briefCopy.research.eyebrow}</p>
                        <h2>{project.title}</h2>
                        <p>{project.researchGoal}</p>
                      </div>
                      <dl>
                        <div><dt>{projectsCopy.format}</dt><dd>{studyFormatLabel(project.studyFormat)}</dd></div>
                        <div><dt>{projectsCopy.audience}</dt><dd>{project.audienceDescription}</dd></div>
                        <div><dt>{projectsCopy.updated}</dt><dd>{new Date(project.updatedAt).toLocaleDateString(language)}</dd></div>
                      </dl>
                      <div className="business-project-actions">
                        {project.questionnaire && <><Link className="business-project-open" to={withLanguage(`/business/projects/${project.id}`, language)}>{projectsCopy.openDraft} <ArrowRight size={15} /></Link><Link className="business-project-open business-project-results" to={withLanguage(`/business/projects/${project.id}/results`, language)}><BarChart3 size={15} /> {projectsCopy.viewResults}</Link></>}
                        {!project.questionnaire && ['DRAFT', 'QUOTE_REQUIRED'].includes(project.status) && <button type="button" className="business-project-open" onClick={() => requestProposal(project)} disabled={submitting}>{submitting ? projectsCopy.submitting : projectsCopy.submit} <ArrowRight size={15} /></button>}
                        {project.latestQuote?.status === 'SENT' && <button type="button" className="business-project-open" onClick={() => { setQuoteProject(project); setQuoteDecision(''); setDeclineReason(''); }}>{projectsCopy.reviewQuote} <ArrowRight size={15} /></button>}
                      </div>
                      {project.latestQuote && <p className="business-project-quote-note">{project.latestQuote.status === 'SENT'
                        ? feedbackCopy.quoteReady.replace('{version}', project.latestQuote.version)
                        : feedbackCopy.quoteStatus.replace('{version}', project.latestQuote.version).replace('{status}', projectsCopy.statuses[project.latestQuote.status] || project.latestQuote.status)}</p>}
                    </article>
                  );
                })}
                {!visibleProjects.length && (
                  <div className="business-project-filter-empty">
                    <ClipboardList size={22} />
                    <strong>{projectsCopy.noProjects}</strong>
                    <span>{projectsCopy.chooseAnother}</span>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="business-projects-empty-layout">
              <button className="business-create-project-card" type="button" onClick={openNewProject}>
                <span><Plus size={31} /></span>
                <strong>{projectsCopy.prepareBrief}</strong>
                <small>{projectsCopy.prepareBriefBody}</small>
              </button>
              <section className="business-projects-guide">
                <p>{projectsCopy.getStarted}</p>
                <h2>{projectsCopy.startDecision}</h2>
                <ol>
                  {projectsCopy.guide.map((step, index) => <li key={step}><span>{String(index + 1).padStart(2, '0')}</span> {step}</li>)}
                </ol>
              </section>
            </div>
          )}
        </section>}
      </div>


      {openChooser && (
        <div className="business-project-modal business-project-modal--chooser" role="dialog" aria-modal="true" aria-labelledby="business-project-chooser-title">
          <section>
            <button className="business-modal-close" type="button" onClick={() => setOpenChooser(false)} aria-label={briefCopy.close}><X size={18} /></button>
            <p className="business-eyebrow">{briefCopy.chooserKicker}</p>
            <h2 id="business-project-chooser-title">{briefCopy.chooserTitle}</h2>
            <p className="business-form-intro">{briefCopy.chooserIntro}</p>
            <div className="business-chooser-grid">
              {Object.entries(projectTypes).map(([typeKey, type]) => {
                const Icon = type.icon;
                const typeCopy = briefCopy[typeKey];
                return (
                  <button type="button" key={typeKey} onClick={() => chooseProjectType(typeKey)}>
                    <Icon size={22} />
                    <span>{typeCopy.eyebrow}</span>
                    <strong>{typeCopy.title}</strong>
                    <small>{typeCopy.description}</small>
                    <em>{typeCopy.action} <ArrowRight size={15} /></em>
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
            <button className="business-modal-close" type="button" onClick={() => setOpenForm(false)} aria-label={briefCopy.close}><X size={18} /></button>
            <p className="business-eyebrow">{editingProject ? briefCopy.editKicker : selectedTypeCopy.eyebrow}</p>
            <h2 id="business-project-title">{editingProject ? briefCopy.editTitle : selectedTypeCopy.modalTitle}</h2>
            <p className="business-form-intro">
              {selectedTypeCopy.intro}
            </p>

            <label>
              {selectedTypeCopy.projectLabel}
              <input name="title" value={form.title} onChange={update} placeholder={selectedTypeCopy.projectPlaceholder} required />
            </label>
            <section className="business-brief-section">
              <p>{briefCopy.decisionKicker}</p>
              <h3>{briefCopy.decisionTitle}</h3>
              <span>{briefCopy.decisionIntro}</span>
            </section>
            <label>
              {briefCopy.decisionLabel}
              <textarea name="researchGoal" value={form.researchGoal} onChange={update} placeholder={briefCopy.decisionPlaceholder} required />
            </label>
            <label>
              {briefCopy.audienceLabel}
              <textarea name="audienceDescription" value={form.audienceDescription} onChange={update} placeholder={briefCopy.audiencePlaceholder} required />
            </label>

            <div className="business-form-grid">
              <label>
                {briefCopy.marketLabel}
                <input name="countries" value={form.countries} onChange={update} placeholder={briefCopy.marketPlaceholder} />
                <small>{briefCopy.marketHelp}</small>
              </label>
              <label>
                {briefCopy.languagesLabel}
                <input name="languages" value={form.languages} onChange={update} placeholder={briefCopy.languagesPlaceholder} />
                <small>{briefCopy.languagesHelp}</small>
              </label>
            </div>

            <section className="business-brief-section">
              <p>{briefCopy.scopeKicker}</p>
              <h3>{briefCopy.scopeTitle}</h3>
              <span>{briefCopy.scopeIntro}</span>
            </section>
            <div className="business-form-grid">
              {isQuestionnaire ? (
                <label>
                  {selectedTypeCopy.timeLabel}
                  <input name="estimatedMinutes" type="number" min="1" value={form.estimatedMinutes} onChange={update} placeholder={briefCopy.optionalPlaceholder} />
                </label>
              ) : (
                <>
                  <label>
                    {briefCopy.methodLabel}
                    <select name="studyFormat" value={form.studyFormat} onChange={update}>
                      {briefCopy.methods.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                    </select>
                  </label>
                  <label>
                    {selectedTypeCopy.timeLabel}
                    <input name="estimatedMinutes" type="number" min="1" value={form.estimatedMinutes} onChange={update} placeholder={briefCopy.optionalPlaceholder} />
                  </label>
                </>
              )}
              <label>
                {briefCopy.participantsLabel}
                <input name="targetParticipants" type="number" min="1" value={form.targetParticipants} onChange={update} placeholder={briefCopy.optionalPlaceholder} />
                <small>{briefCopy.participantsHelp}</small>
              </label>
              <label>
                {briefCopy.timelineLabel}
                <input name="timeline" value={form.timeline} onChange={update} placeholder={briefCopy.timelinePlaceholder} />
              </label>
              <label>
                {briefCopy.incentiveLabel}
                <select name="incentiveBudget" value={form.incentiveBudget} onChange={update}>
                  {briefCopy.incentives.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                </select>
              </label>
            </div>

            <section className="business-brief-callout">
              <div>
                <p>{briefCopy.nextKicker}</p>
                <strong>{briefCopy.nextTitle}</strong>
                <span>{briefCopy.nextBody}</span>
              </div>
              <Sparkles size={20} />
            </section>

            <label>
              {briefCopy.contextLabel}
              <textarea name="additionalContext" value={form.additionalContext} onChange={update} placeholder={selectedTypeCopy.contextPlaceholder} />
            </label>
            <button className="business-button" type="submit" disabled={submitting}>
              {submitting ? <LoaderCircle className="animate-spin" size={17} /> : editingProject ? briefCopy.saveChanges : briefCopy.save}
              {!submitting && <ArrowRight size={17} />}
            </button>
          </form>
        </div>
      )}
      {briefProject && <div className="business-project-modal" role="dialog" aria-modal="true" aria-labelledby="business-brief-title"><section className="business-brief-dialog"><button className="business-modal-close" type="button" onClick={() => setBriefProject(null)} aria-label={projectsCopy.briefDialog.close}><X size={18} /></button><p className="business-eyebrow">{projectsCopy.briefDialog.eyebrow}</p><h2 id="business-brief-title">{briefProject.title}</h2><p>{briefProject.researchGoal}</p><dl><div><dt>{projectsCopy.briefDialog.audience}</dt><dd>{briefProject.audienceDescription}</dd></div><div><dt>{projectsCopy.briefDialog.format}</dt><dd>{studyFormatLabel(briefProject.studyFormat)}</dd></div>{briefProject.countries && <div><dt>{projectsCopy.briefDialog.market}</dt><dd>{briefProject.countries}</dd></div>}{briefProject.languages && <div><dt>{projectsCopy.briefDialog.languages}</dt><dd>{briefProject.languages}</dd></div>}{briefProject.targetParticipants && <div><dt>{projectsCopy.briefDialog.participants}</dt><dd>{briefProject.targetParticipants}</dd></div>}{briefProject.estimatedMinutes && <div><dt>{briefProject.studyFormat === 'SURVEY' ? projectsCopy.briefDialog.completionTime : projectsCopy.briefDialog.sessionTime}</dt><dd>{projectsCopy.briefDialog.minutes.replace('{minutes}', briefProject.estimatedMinutes)}</dd></div>}{briefProject.timeline && <div><dt>{projectsCopy.briefDialog.timing}</dt><dd>{briefProject.timeline}</dd></div>}<div><dt>{projectsCopy.briefDialog.incentives}</dt><dd>{projectsCopy.briefDialog.incentiveLabels[briefProject.incentiveBudget] || projectsCopy.briefDialog.incentiveLabels.NEED_GUIDANCE}</dd></div></dl>{briefProject.additionalContext && <section><strong>{projectsCopy.briefDialog.additional}</strong><p>{briefProject.additionalContext}</p></section>}<div className="business-brief-dialog-actions"><button type="button" onClick={() => setBriefProject(null)}>{projectsCopy.briefDialog.close}</button>{briefProject.status === 'DRAFT' && <button type="button" className="business-button" onClick={() => { setBriefProject(null); openEditProject(briefProject); }}>{projectsCopy.briefDialog.edit} <Pencil size={15} /></button>}</div></section></div>}
      {quoteProject?.latestQuote && <div className="business-project-modal" role="dialog" aria-modal="true" aria-labelledby="business-quote-title"><section className="business-quote-dialog"><button className="business-modal-close" type="button" onClick={() => setQuoteProject(null)} aria-label={briefCopy.close}><X size={18} /></button><p className="business-eyebrow">{projectsCopy.quote.eyebrow}</p><h2 id="business-quote-title">{projectsCopy.quote.title}</h2><p className="business-form-intro">{projectsCopy.quote.intro}</p><dl><div><dt>{projectsCopy.quote.project}</dt><dd>{quoteProject.title}</dd></div><div><dt>{projectsCopy.quote.quote}</dt><dd>{new Intl.NumberFormat(language, { style: 'currency', currency: quoteProject.latestQuote.currency || 'USD' }).format(quoteProject.latestQuote.amount || 0)}</dd></div>{quoteProject.latestQuote.validUntil && <div><dt>{projectsCopy.quote.validUntil}</dt><dd>{new Intl.DateTimeFormat(language, { dateStyle: 'medium' }).format(new Date(quoteProject.latestQuote.validUntil))}</dd></div>}</dl><section className="business-quote-scope"><strong>{projectsCopy.quote.scope}</strong><p>{quoteProject.latestQuote.scope}</p>{quoteProject.latestQuote.terms && <><strong>{projectsCopy.quote.terms}</strong><p>{quoteProject.latestQuote.terms}</p></>}</section>{quoteDecision === 'DECLINE' && <label className="business-quote-decline">{projectsCopy.quote.declineQuestion}<textarea value={declineReason} onChange={(event) => setDeclineReason(event.target.value)} maxLength={800} placeholder={projectsCopy.quote.declinePlaceholder} /></label>}<div className="business-quote-actions">{quoteDecision === 'DECLINE' ? <><button type="button" onClick={() => setQuoteDecision('')}>{projectsCopy.quote.keepReviewing}</button><button type="button" className="business-quote-decline-button" disabled={submitting} onClick={() => decideQuote('DECLINE')}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : projectsCopy.quote.declineQuote}</button></> : <><button type="button" onClick={() => setQuoteDecision('DECLINE')}>{projectsCopy.quote.decline}</button><button type="button" className="business-button" disabled={submitting} onClick={() => decideQuote('ACCEPT')}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : projectsCopy.quote.accept} <Check size={16} /></button></>}</div></section></div>}
      {!loading && workspace.profile && !onboardingComplete && (
        <section className="business-onboarding" aria-labelledby="business-onboarding-title">
          <header className="business-onboarding-chrome">
            <img src="/guanyisearch-project-mark.png" alt="GuanyiSearch" />
            <div>
              <span>{language === 'zh-CN' ? '研究工作区' : 'Research workspace'}</span>
              <strong>{copy.onboarding.step.replace('{current}', onboardingStep + 1).replace('{total}', onboarding.researchRole === 'ORGANIZATION' ? 3 : 2)}</strong>
            </div>
          </header>
          <div className="business-onboarding-shell">
            <h1 id="business-onboarding-title">
              {copy.onboarding.titles[onboardingStep]}
            </h1>
            <p className="business-onboarding-intro">
              {copy.onboarding.intros[onboardingStep]}
            </p>
            {onboardingStep === 0 && <div className="business-onboarding-options business-onboarding-options--two">
              <button type="button" className={onboarding.researchRole === 'INDEPENDENT' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchRole: 'INDEPENDENT', organizationType: 'INDEPENDENT_RESEARCHER' }))}><UserRound size={23} /><strong>{copy.onboarding.individual[0]}</strong><small>{copy.onboarding.individual[1]}</small></button>
              <button type="button" className={onboarding.researchRole === 'ORGANIZATION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchRole: 'ORGANIZATION', organizationType: current.organizationType === 'INDEPENDENT_RESEARCHER' ? '' : current.organizationType }))}><UsersRound size={23} /><strong>{copy.onboarding.organisation[0]}</strong><small>{copy.onboarding.organisation[1]}</small></button>
            </div>}
            {onboardingStep === 1 && <div className="business-onboarding-options business-onboarding-options--three">
              <button type="button" className={onboarding.researchIntent === 'INDEPENDENT_RESEARCH' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'INDEPENDENT_RESEARCH' }))}><ClipboardList size={22} /><strong>{copy.onboarding.intents[0][0]}</strong><small>{copy.onboarding.intents[0][1]}</small></button>
              <button type="button" className={onboarding.researchIntent === 'MARKET_EXPLORATION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'MARKET_EXPLORATION' }))}><Sparkles size={22} /><strong>{copy.onboarding.intents[1][0]}</strong><small>{copy.onboarding.intents[1][1]}</small></button>
              <button type="button" className={onboarding.researchIntent === 'MARKET_DECISION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'MARKET_DECISION' }))}><BarChart3 size={22} /><strong>{copy.onboarding.intents[2][0]}</strong><small>{copy.onboarding.intents[2][1]}</small></button>
            </div>}
            {onboardingStep === 2 && <div className="business-onboarding-options business-onboarding-options--three">
              {organizationTypeOptions.map(({ value, icon: Icon }, index) => <button type="button" key={value} className={onboarding.organizationType === value ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, organizationType: value }))}><Icon size={22} /><strong>{copy.onboarding.organisationTypes[index][0]}</strong><small>{copy.onboarding.organisationTypes[index][1]}</small></button>)}
            </div>}
            <footer>
              {onboardingStep > 0 && <button type="button" onClick={() => setOnboardingStep((current) => current - 1)}>{copy.onboarding.back}</button>}
              <button className="business-button" type="button" disabled={(onboardingStep === 0 && !onboarding.researchRole) || (onboardingStep === 1 && !onboarding.researchIntent) || (onboardingStep === 2 && !onboarding.organizationType) || onboardingSaving} onClick={advanceOnboarding}>
                {onboardingSaving ? <LoaderCircle className="animate-spin" size={17} /> : onboardingStep === (onboarding.researchRole === 'ORGANIZATION' ? 2 : 1) ? copy.onboarding.enter : copy.onboarding.continue}
                {!onboardingSaving && <ArrowRight size={17} />}
              </button>
            </footer>
          </div>
        </section>
      )}
    </main>
  );
}
