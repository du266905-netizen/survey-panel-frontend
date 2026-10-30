import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  Building2,
  Check,
  ClipboardList,
  FileText,
  GraduationCap,
  Landmark,
  LoaderCircle,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  UserRound,
  UsersRound,
  X,
  Zap,
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { capturePaypalReturn, completeBusinessResearchOnboarding, createBusinessPayment, createBusinessProject, decideBusinessProjectQuote, deleteBusinessProject, getBusinessQuestionnaireDrafts, getBusinessWorkspace, submitBusinessProject, updateBusinessProject } from '../api/realApi';
import { useAuth } from '../components/AuthContext';
import BusinessBalanceChip, { BUSINESS_BALANCE_REFRESH_EVENT } from '../components/BusinessBalanceChip';
import BusinessPageLoader from '../components/BusinessPageLoader';
import BusinessProjectCategoryTabs from '../components/BusinessProjectCategoryTabs';
import { businessProjectStatusDescriptions } from '../constants/businessProjectStatus';
import { getNewProjectChooserCopy } from '../constants/newProjectChooserCopy';
import { getCustomSubmissionCopy } from '../constants/customSubmissionCopy';
import { clearPaypalReturnFromUrl, readPaypalReturnToken } from '../components/paypalReturn';
import BusinessLanguagePicker from '../components/BusinessLanguagePicker';
import NotificationBell from '../components/NotificationBell';
import Logo from '../components/Logo';
import { useLanguage, withLanguage } from '../components/LanguageContext';
import './Business.css';
import '../components/BusinessRail.css';
import BusinessRail from '../components/BusinessRail';
import BusinessTour from '../components/BusinessTour';
import './BusinessWorkspaceTheme.css';
import './BusinessResearchType.css';
import './BusinessNewProjectChooser.css';
import './BusinessCustomSubmission.css';
import './BusinessWorkspaceChrome.css';


const emptyProject = {
  title: '',
  researchGoal: '',
  audienceDescription: '',
  studyFormat: 'SURVEY',
  serviceCategory: 'SURVEY',
  countries: '',
  languages: '',
  targetParticipants: '',
  estimatedMinutes: '',
  timeline: '',
  incentiveBudget: 'NEED_GUIDANCE',
  additionalContext: '',
};

const projectCategoryCopy = {
  'zh-CN': { ALL: '全部', SURVEY: '调查', CUSTOM_RESEARCH: '定制研究', QUALITATIVE_SUPPORT: '定性研究支持' },
  'zh-Hant': { ALL: '全部', SURVEY: '調查', CUSTOM_RESEARCH: '客製研究', QUALITATIVE_SUPPORT: '定性研究支持' },
  'en-US': { ALL: 'All', SURVEY: 'Survey', CUSTOM_RESEARCH: 'Custom research', QUALITATIVE_SUPPORT: 'Qualitative research support' },
  'en-GB': { ALL: 'All', SURVEY: 'Survey', CUSTOM_RESEARCH: 'Custom research', QUALITATIVE_SUPPORT: 'Qualitative research support' },
};
const projectViewDetailsCopy = {
  'zh-CN': '查看详情',
  'zh-Hant': '查看詳情',
  'en-US': 'View details',
  'en-GB': 'View details',
};

const projectCategory = (project) => {
  if (['SURVEY', 'CUSTOM_RESEARCH', 'QUALITATIVE_SUPPORT'].includes(project.serviceCategory)) return project.serviceCategory;
  if (project.questionnaire || project.studyFormat === 'SURVEY') return 'SURVEY';
  if (['INTERVIEW', 'GROUP_DISCUSSION', 'USABILITY_TEST'].includes(project.studyFormat)) return 'QUALITATIVE_SUPPORT';
  return 'CUSTOM_RESEARCH';
};
const legacyVisibleInProjects = (project) => {
  if (project.status === 'DRAFT') return false;
  if (!project.questionnaire) return true;
  return ['PENDING_REVIEW', 'APPROVED', 'PUBLISHED'].includes(project.questionnaire.status);
};

const projectTypes = {
  questionnaire: {
    eyebrow: 'QUESTIONNAIRE DESIGN',
    title: 'Request a questionnaire',
    description: 'Tell us the decision and audience. We will prepare the questionnaire for your project.',
    button: 'Request design',
    icon: ClipboardList,
    format: 'SURVEY',
    category: 'SURVEY',
  },
  research: {
    eyebrow: 'MANAGED RESEARCH',
    title: 'Request research support',
    description: 'Plan interviews, usability work, discussions, or a study that needs participant recruitment.',
    button: 'Request support',
    icon: UsersRound,
    format: 'INTERVIEW',
    category: 'QUALITATIVE_SUPPORT',
  },
};

const chooserProducts = [
  { key: 'customSurvey', type: 'questionnaire', icon: ClipboardList },
  { key: 'researchSupport', type: 'research', icon: UsersRound },
  { key: 'selfService', type: 'selfService', icon: Zap },
];

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

function welcomeStorageKey(user) {
  const identity = String(user?.id || user?.email || '').trim().toLowerCase();
  return identity ? `guanyi-business-welcome:${identity}` : '';
}

function hasSeenWorkspaceWelcome(user) {
  const key = welcomeStorageKey(user);
  if (!key || typeof window === 'undefined') return false;
  return window.localStorage.getItem(key) === 'seen';
}

function storeWorkspaceWelcome(user) {
  const key = welcomeStorageKey(user);
  if (!key || typeof window === 'undefined') return;
  window.localStorage.setItem(key, 'seen');
}

/* The tour follows the welcome card and is stored per account for the same
   reason the welcome flag is: one person's first visit must not silence the
   introduction for everyone on that browser (D-15). */
function tourStorageKey(user) {
  const identity = String(user?.id || user?.email || '').trim().toLowerCase();
  return identity ? `guanyi-business-tour:${identity}` : '';
}

function hasSeenBusinessTour(user) {
  const key = tourStorageKey(user);
  if (!key || typeof window === 'undefined') return false;
  return window.localStorage.getItem(key) === 'seen';
}

function storeBusinessTourSeen(user) {
  const key = tourStorageKey(user);
  if (!key || typeof window === 'undefined') return;
  window.localStorage.setItem(key, 'seen');
}

export default function BusinessWorkspace() {
  const { user, logout } = useAuth();
  const { language, publicCopy } = useLanguage();
  const copy = publicCopy.workspace.business;
  // Strings that used to be inline `language === 'zh-CN' ? ... : ...` ternaries
  // in this file. They now come from the language library, keyed by language.
  const workspaceUiMap = copy.workspaceUi || {};
  const ui = workspaceUiMap[language] || workspaceUiMap['en-US'] || {};
  // Copy that used to be hardcoded English in this file now comes from the
  // language library, keyed by language.
  const workspaceStaticMap = copy.workspaceStatic || {};
  const ws = workspaceStaticMap[language] || workspaceStaticMap['en-GB'] || {};
  // Home copy and the greeting used to be defined in this file (they were the
  // last page-local tables). They now come from the language library.
  const homeCopy = copy.workspaceHome || {};
  const workspaceText = (homeCopy.home || {})[language] || (homeCopy.home || {})['en-US'] || [];
  const workspaceGreeting = (target, useReturning) => {
    if (useReturning) return (homeCopy.greetingReturning || {})[target] || 'Welcome back,';
    const labels = (homeCopy.greetingFirstVisit || {})[target] || ['Good morning,', 'Good afternoon,', 'Good evening,'];
    /* The visitor's own clock: this runs in the browser, so it follows their
       device time zone rather than the server's. 00:00–04:59 stays on the
       evening label instead of greeting someone at 3am with "Good morning". */
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return labels[0];
    if (hour >= 12 && hour < 18) return labels[1];
    return labels[2];
  };
  const briefCopy = copy.brief;
  const projectsCopy = copy.projects;
  const feedbackCopy = copy.feedback;
  const navigate = useNavigate();
  const location = useLocation();
  const [workspace, setWorkspace] = useState({ profile: null, projects: [] });
  const [questionnaireDrafts, setQuestionnaireDrafts] = useState([]);
  const [draftsError, setDraftsError] = useState(false);
  const [draftsReload, setDraftsReload] = useState(0);
  const [loading, setLoading] = useState(true);
  const [openChooser, setOpenChooser] = useState(false);
  const [customSubmitted, setCustomSubmitted] = useState(() => Boolean(location.state?.customSubmitted));
  const [openForm, setOpenForm] = useState(false);
  const [activeView, setActiveView] = useState('home');
  const [projectType, setProjectType] = useState('questionnaire');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [form, setForm] = useState(emptyProject);
  const [submitting, setSubmitting] = useState(false);
  const [payingProjectId, setPayingProjectId] = useState('');
  const paypalReturnHandledRef = useRef('');
  const [message, setMessage] = useState('');
  const [quoteProject, setQuoteProject] = useState(null);
  const [quoteDecision, setQuoteDecision] = useState('');
  const [declineReason, setDeclineReason] = useState('');
  const [editorStarterOpen, setEditorStarterOpen] = useState(false);
  const [editorStarter, setEditorStarter] = useState({ title: '', researchGoal: '', audienceDescription: '' });
  const [editingProject, setEditingProject] = useState(null);
  const [briefProject, setBriefProject] = useState(null);
  const [projectMenuId, setProjectMenuId] = useState('');
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [onboarding, setOnboarding] = useState({ researchRole: '', researchIntent: '', organizationType: '' });
  const [onboardingSaving, setOnboardingSaving] = useState(false);
  const [onboardingError, setOnboardingError] = useState('');
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const [greetingIsReturning, setGreetingIsReturning] = useState(false);

  const selectedTypeCopy = briefCopy[projectType];
  const chooserCopy = getNewProjectChooserCopy(language);
  const customSuccessCopy = getCustomSubmissionCopy(language);

  useEffect(() => {
    if (!location.state?.customSubmitted) return;
    navigate(withLanguage('/business/workspace?view=projects', language), { replace: true, state: {} });
  }, []);
  const studyFormatLabel = (format) => format === 'SURVEY'
    ? copy.services.questionnaireTitle
    : briefCopy.methods.find(([value]) => value === format)?.[1] || String(format || '').replaceAll('_', ' ').toLowerCase();
  const isQuestionnaire = projectType === 'questionnaire';
  const categoryLabels = projectCategoryCopy[language] || projectCategoryCopy['en-US'];
  const projectPool = workspace.projects.filter((project) => project.visibleInProjects ?? legacyVisibleInProjects(project));
  const projectCategories = [
    { value: 'ALL', label: categoryLabels.ALL, count: projectPool.length },
    { value: 'SURVEY', label: categoryLabels.SURVEY, count: projectPool.filter((project) => projectCategory(project) === 'SURVEY').length },
    { value: 'CUSTOM_RESEARCH', label: categoryLabels.CUSTOM_RESEARCH, count: projectPool.filter((project) => projectCategory(project) === 'CUSTOM_RESEARCH').length },
    { value: 'QUALITATIVE_SUPPORT', label: categoryLabels.QUALITATIVE_SUPPORT, count: projectPool.filter((project) => projectCategory(project) === 'QUALITATIVE_SUPPORT').length },
  ];
  const visibleProjects = activeFilter === 'ALL'
    ? projectPool
    : projectPool.filter((project) => projectCategory(project) === activeFilter);
  const questionnaireProjects = workspace.projects.filter((project) => project.questionnaire);
  const resultProjects = questionnaireProjects.filter((project) => project.questionnaire?.status === 'PUBLISHED');
  const responseCount = questionnaireProjects.reduce((total, project) => total + Number(project.questionnaire?.responseCount || 0), 0);
  const questionnaireDraftCount = questionnaireProjects.filter((project) => project.questionnaire?.status === 'DRAFT').length;
  const planningCount = workspace.projects.filter((project) => ['SUBMITTED_FOR_REVIEW', 'QUOTE_REQUIRED', 'QUOTE_SENT', 'CLIENT_ACCEPTED'].includes(project.status)).length;
  const recentProjects = [...workspace.projects].sort((first, second) => new Date(second.updatedAt || 0) - new Date(first.updatedAt || 0)).slice(0, 3);
  const displayName = String(user?.displayName || user?.email?.split('@')[0] || (ui.displayNameFallback)).trim();
  // True exactly when the wizard below renders. The welcome card can also be up
  // on its own, after the wizard closes.
  const wizardOpen = !loading && Boolean(workspace.profile) && !onboardingComplete && !tourOpen;

  /* Both overlays are full-screen, but the document behind them stays
     scrollable: wheel over the (short) dialog chains to the page, and Space /
     PageDown scroll it regardless. That is what let the dashboard slide up
     under the wizard. Lock the document for as long as either overlay is up. */
  useEffect(() => {
    if (!wizardOpen) return undefined;
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
    };
  }, [wizardOpen]);

  useEffect(() => {
    const requestedView = new URLSearchParams(location.search).get('view');
    setActiveView(['home', 'questionnaires', 'projects', 'results'].includes(requestedView) ? requestedView : 'home');
  }, [location.search]);

  const selectWorkspaceView = (view) => {
    const target = view === 'home' ? '/business/workspace' : `/business/workspace?view=${view}`;
    setActiveView(view);
    navigate(withLanguage(target, language));
  };

  // The rail itself lives in components/BusinessRail, shared with
  // /business/ai-brief. This page supplies only the current entry and what a
  // click does — every branch keeps the handler the 74px icon rail used.
  const handleRailSelect = (id) => {
    if (id === 'ai') { navigate(withLanguage('/business/ai-brief', language)); return; }
    selectWorkspaceView(id);
  };

  const workspaceSearchRef = useRef(null);
  const [workspaceQuery, setWorkspaceQuery] = useState('');

  // The top bar hands the question to the existing AI brief flow, which already
  // accepts `location.state.initialPrompt` and posts it to the guidance endpoint.
  const submitWorkspaceQuestion = (event) => {
    event.preventDefault();
    const question = workspaceQuery.trim();
    if (!question) { workspaceSearchRef.current?.focus(); return; }
    setWorkspaceQuery('');
    navigate(withLanguage('/business/ai-brief', language), { state: { initialPrompt: question } });
  };

  useEffect(() => {
    const focusSearch = (event) => {
      if (!(event.metaKey || event.ctrlKey) || String(event.key).toLowerCase() !== 'k') return;
      event.preventDefault();
      workspaceSearchRef.current?.focus();
    };
    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  useEffect(() => {
    let active = true;
    getBusinessWorkspace()
      .then((response) => {
        if (!active) return;
        setWorkspace(response.data);
        const hasSeenWelcome = hasSeenWorkspaceWelcome(user);
        const savedOnThisDevice = readStoredOnboarding(user);
        const onboarded = Boolean(response.data.profile?.researchOnboardedAt || savedOnThisDevice);
        /* A first visit ALWAYS gets the time of day. Someone coming back gets
           "Welcome back" about half the time and the time of day otherwise, so
           the page does not read as a fixed banner. */
        setGreetingIsReturning(hasSeenWelcome && Math.random() < 0.5);
        /* The tour is the introduction now: the old single-card welcome modal
           was removed. Every account sees it once — existing accounts included —
           because the flag is per user, not per browser. A first visit still
           walks the onboarding wizard first; the tour opens from saveOnboarding
           once that is finished. */
        if (onboarded && !hasSeenBusinessTour(user)) setTourOpen(true);
        const savedOrganizationType = organizationTypeOptions.some((option) => option.value === response.data.profile?.organizationType)
          ? response.data.profile.organizationType
          : savedOnThisDevice?.organizationType || '';
        setOnboarding({
          researchRole: response.data.profile?.researchRole || savedOnThisDevice?.researchRole || '',
          researchIntent: response.data.profile?.researchIntent || savedOnThisDevice?.researchIntent || '',
          organizationType: savedOrganizationType,
        });
        setOnboardingComplete(onboarded);
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

  // PayPal appends ?token=... on return. Send only that token to the API; the
  // backend resolves it against the signed-in user and captures the order.
  useEffect(() => {
    const token = readPaypalReturnToken(location.search);
    if (!token || paypalReturnHandledRef.current === token) return undefined;
    paypalReturnHandledRef.current = token;
    let active = true;
    capturePaypalReturn(token)
      .then(() => {
        if (!active) return;
        clearPaypalReturnFromUrl();
        window.dispatchEvent(new Event(BUSINESS_BALANCE_REFRESH_EVENT));
      })
      .catch(() => {
        if (!active) return;
        clearPaypalReturnFromUrl();
        setMessage(ui.paymentFailed || 'We could not start this payment. Please try again.');
      });
    return () => { active = false; };
  }, [location.search, ui.paymentFailed]);

  useEffect(() => {
    if (loading) return undefined;
    let active = true;
    setDraftsError(false);
    getBusinessQuestionnaireDrafts()
      .then((response) => {
        if (!active) return;
        setQuestionnaireDrafts(Array.isArray(response.questionnaireDrafts) ? response.questionnaireDrafts : []);
      })
      .catch(() => {
        if (!active) return;
        const fallback = workspace.projects.filter((project) => project.questionnaire?.status === 'DRAFT');
        setQuestionnaireDrafts(fallback);
        setDraftsError(fallback.length === 0);
      });
    return () => { active = false; };
  }, [loading, workspace.projects, draftsReload]);

  const update = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const chooseProjectType = (type) => {
    if (type === 'questionnaire') {
      navigate(withLanguage('/business/custom-questionnaire', language));
      return;
    }
    setProjectType(type);
    setForm({ ...emptyProject, studyFormat: projectTypes[type].format, serviceCategory: projectTypes[type].category });
    setEditingProject(null);
    setOpenChooser(false);
    setOpenForm(true);
  };

  const openNewProject = () => {
    setEditingProject(null);
    setForm(emptyProject);
    setOpenChooser(true);
  };

  const dismissCustomSubmitted = () => {
    setCustomSubmitted(false);
    navigate(withLanguage('/business/workspace?view=projects', language), { replace: true, state: {} });
  };

  const chooseProduct = (product) => {
    if (product.type === 'selfService') {
      setOpenChooser(false);
      navigate(withLanguage('/business/audience-plan', language));
      return;
    }
    if (product.type === 'research') {
      setOpenChooser(false);
      navigate(withLanguage('/business/research-support', language));
      return;
    }
    chooseProjectType(product.type);
  };

  const createEditorDraft = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true); setMessage('');
    try {
      const response = await createBusinessProject({
        title: editorStarter.title,
        researchGoal: editorStarter.researchGoal,
        audienceDescription: editorStarter.audienceDescription,
        studyFormat: 'SURVEY', serviceCategory: 'SURVEY', countries: '', languages: '', incentiveBudget: 'NEED_GUIDANCE', additionalContext: '', selfServiceQuestionnaire: true,
      });
      setEditorStarterOpen(false);
      setEditorStarter({ title: '', researchGoal: '', audienceDescription: '' });
      navigate(withLanguage(`/business/projects/${response.data.project.id}`, language));
    } catch {
      setMessage(feedbackCopy.createError);
    } finally { setSubmitting(false); }
  };

  const saveOnboarding = async () => {
    if (!onboarding.researchRole || !onboarding.researchIntent || (onboarding.researchRole === 'ORGANIZATION' && !onboarding.organizationType) || onboardingSaving) return;
    setOnboardingSaving(true);
    setOnboardingError('');
    try {
      /* The API takes `organizationType` only for an organisation; for an
         individual it derives INDEPENDENT_RESEARCHER itself. Sending the
         sentinel `INDEPENDENT_RESEARCHER` in the body was rejected by the
         route's enum with a 400, so every "individual" signup was unable to
         finish onboarding. Keep the local state (the org step needs it), just
         do not put it on the wire. */
      const response = await completeBusinessResearchOnboarding({
        researchRole: onboarding.researchRole,
        researchIntent: onboarding.researchIntent,
        ...(onboarding.researchRole === 'ORGANIZATION' ? { organizationType: onboarding.organizationType } : {}),
      });
      setWorkspace((current) => ({ ...current, profile: response.data.profile }));
      storeOnboarding(user, onboarding);
      setOnboardingComplete(true);
      if (!hasSeenBusinessTour(user)) setTourOpen(true);
    } catch (error) {
      const status = error.response?.status;
      if (!status || status >= 500 || [404, 405, 501].includes(status)) {
        storeOnboarding(user, onboarding);
        setOnboardingComplete(true);
        if (!hasSeenBusinessTour(user)) setTourOpen(true);
        setMessage(feedbackCopy.preferencesSaved);
      } else {
        /* Inside the dialog: the page-level banner sits behind the dimmed
           overlay, so a failure used to look like a button that does nothing. */
        setOnboardingError(feedbackCopy.savePreferencesError);
      }
    } finally {
      setOnboardingSaving(false);
    }
  };

  const advanceOnboarding = () => {
    setOnboardingError('');
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
      studyFormat: project.studyFormat || projectTypes[type].format, serviceCategory: project.serviceCategory || projectTypes[type].category, countries: project.countries || '', languages: project.languages || '',
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
      if (!editingProject && isQuestionnaire && response.data.project?.id) {
        navigate(withLanguage(`/business/projects/${response.data.project.id}`, language));
        return;
      }
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
      setQuestionnaireDrafts((current) => current.filter((item) => item.id !== project.id));
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

  const beginPayment = async (project) => {
    if (payingProjectId) return;
    setPayingProjectId(project.id); setMessage('');
    try {
      const response = await createBusinessPayment(project.id);
      const payment = response.data?.payment;
      if (!payment) throw new Error('PAYMENT_RESPONSE_INVALID');
      setWorkspace((current) => ({ ...current, projects: current.projects.map((item) => item.id === project.id ? { ...item, latestPayment: payment } : item) }));
      if (payment.checkoutUrl) {
        window.location.assign(payment.checkoutUrl);
        return;
      }
      // A 201 without a checkout URL is not a success the user can act on.
      setMessage(ws.workspace.paymentUnavailable);
    } catch (error) {
      setMessage(error.response?.data?.message || ws.workspace.paymentUnavailable);
    } finally { setPayingProjectId(''); }
  };

  /* Closing the introduction does NOT make this a returning visit in the same
     session: the greeting keeps its time of day, and "Welcome back" starts on
     the next visit, when both flags are already set. */
  const closeTour = () => {
    storeWorkspaceWelcome(user);
    storeBusinessTourSeen(user);
    setTourOpen(false);
  };

  const finishTour = () => {
    storeWorkspaceWelcome(user);
    storeBusinessTourSeen(user);
    setTourOpen(false);
    navigate(withLanguage('/business/ai-brief', language));
  };

  /* Replay from the account menu. Return to the overview first: steps four to
     nine are anchored to elements that only exist there. */
  const replayTour = () => {
    selectWorkspaceView('home');
    setTourOpen(true);
  };

  /* 问号单独拆出来：衬线体在大字号下那个钩很怪（自定义问卷页早就这么处理了，
     见 .business-custom-request-question-mark）。这里对 ? 和 ？都生效。 */
  const onboardingTitle = String(copy.onboarding?.titles?.[onboardingStep] || '');
  const onboardingTitleText = onboardingTitle.replace(/[?？]\s*$/, '');
  const onboardingTitleMark = /[?？]\s*$/.test(onboardingTitle) ? onboardingTitle.trim().slice(-1) : '';

  return (
    <main className={`business-workspace${activeView === 'questionnaires' ? ' business-workspace--questionnaire-hub' : ''}`}>
      <div className="business-workspace-body business-workspace-body--rail">
        <BusinessRail activeId={activeView} onSelect={handleRailSelect} onReplayTour={replayTour} />

        <header className="business-workspace-topbar">
          <form className="business-workspace-searchbar" role="search" aria-label="ask a question in guanyisearch" data-tour="search" onSubmit={submitWorkspaceQuestion}>
            <Search size={17} aria-hidden="true" />
            <input ref={workspaceSearchRef} type="search" value={workspaceQuery} onChange={(event) => setWorkspaceQuery(event.target.value)} placeholder="ask a question in guanyisearch" aria-label="ask a question in guanyisearch" />
            <kbd aria-hidden="true">⌘K</kbd>
          </form>
          <BusinessBalanceChip />
          <NotificationBell className="business-workspace-notification" />
        </header>

        {activeView === 'home' ? <section className="business-projects business-workspace-home">
          <header className="business-dashboard-header"><div><p className="business-dashboard-hero-line">{publicCopy.hero.lines.slice(1).join(' ')}</p><h1><span>{workspaceGreeting(language, greetingIsReturning)}</span><strong>{displayName}.</strong></h1><p className="business-dashboard-intro">{workspaceText[0]}</p><button className="business-hero-cta" type="button" data-tour="primary" onClick={() => openNewProject()}>{workspaceText[1]}<ArrowRight size={16} /></button></div></header>
          <div className="business-dashboard-actions">
            <button type="button" onClick={() => openNewProject()}><span className="is-purple"><Plus size={21} /></span><div><strong>{workspaceText[1]}</strong><small>{workspaceText[2]}</small></div><ArrowRight size={17} /></button>
            <button type="button" onClick={() => navigate(withLanguage('/business/ai-brief', language))}><span className="is-amber"><Sparkles size={21} /></span><div><strong>{workspaceText[3]}</strong><small>{workspaceText[4]}</small></div><ArrowRight size={17} /></button>
            <button type="button" onClick={() => selectWorkspaceView('questionnaires')}><span className="is-green"><ClipboardList size={21} /></span><div><strong>{workspaceText[5]}</strong><small>{workspaceText[6]}</small></div><ArrowRight size={17} /></button>
          </div>
          {message && <p className="business-workspace-message">{message}</p>}
          <div className="business-dashboard-grid">
            <section className="business-dashboard-statistics"><header><div><h2>{workspaceText[7]}</h2><p>{workspaceText[8]}</p></div><button type="button" onClick={() => selectWorkspaceView('results')}>{workspaceText[9]}</button></header><div className="business-dashboard-stats"><article><span><ClipboardList size={17} /></span><small>{workspaceText[10]}</small><strong>{workspace.projects.length}</strong></article><article><span><Pencil size={17} /></span><small>{workspaceText[11]}</small><strong>{questionnaireDraftCount}</strong></article><article><span><FileText size={17} /></span><small>{workspaceText[12]}</small><strong>{planningCount}</strong></article><article><span><BarChart3 size={17} /></span><small>{workspaceText[13]}</small><strong>{responseCount}</strong></article></div></section>
            <section className="business-dashboard-recent"><header><div><h2>{workspaceText[14]}</h2><p>{workspaceText[15]}</p></div><button type="button" onClick={() => selectWorkspaceView('projects')}>{workspaceText[16]}</button></header>{recentProjects.length ? <div>{recentProjects.map((project) => <button key={project.id} type="button" onClick={() => selectWorkspaceView('projects')}><span className={`business-status status-${String(project.status).toLowerCase()}`}>{projectsCopy.statuses[project.status] || project.status}</span><strong>{project.title}</strong><small>{project.questionnaire?.responseCount || 0} {copy.results.responses}</small><ArrowRight size={15} /></button>)}</div> : <div className="business-dashboard-empty"><ClipboardList size={24} /><strong>{workspaceText[17]}</strong><button type="button" onClick={openNewProject}>{projectsCopy.getStarted}</button></div>}</section>
          </div>
        </section> : activeView === 'questionnaires' ? <section className="business-projects business-questionnaire-hub">
          <div className="business-projects-head"><div><p className="business-eyebrow">{ui.questionnaireEyebrow}</p><h1>{workspaceText[11]}</h1><p>{ui.questionnaireIntro}</p></div><button className="business-button" type="button" onClick={() => navigate(withLanguage('/business/audience-plan', language))}><Plus size={16} /> {ui.planAudience}</button></div>
          {loading ? <BusinessPageLoader label={feedbackCopy.loadingProjects} /> : draftsError ? <div className="business-questionnaire-load-error" role="alert"><strong>{language.startsWith('zh') ? '草稿加载失败' : 'Could not load drafts'}</strong><p>{language.startsWith('zh') ? '这不代表草稿被删除。请重试。' : 'Your drafts are not deleted. Try again.'}</p><button type="button" onClick={() => setDraftsReload((value) => value + 1)}>{language.startsWith('zh') ? '重试' : 'Retry'}</button></div> : questionnaireDrafts.length ? <div className="business-questionnaire-hub-list">{questionnaireDrafts.map((project) => {
            const questionnaire = project.questionnaire || {};
            const status = String(questionnaire.status || project.status || 'DRAFT');
            const statusLabel = projectsCopy.statuses?.[status] || (status === 'DRAFT' ? (ui.draftBadge || 'Draft') : status);
            const questionCount = Number(questionnaire.questionCount || 0);
            const responseCount = Number(questionnaire.responseCount || 0);
            const stats = String(ui.questionStats || '{q} questions · {r} responses')
              .replace('{q}', String(questionCount))
              .replace('{r}', String(responseCount));
            return (
              <article key={project.id} className="business-questionnaire-card">
                <div className="business-questionnaire-card-preview" aria-hidden="true">
                  <span className="business-questionnaire-card-preview-title" />
                  <span className="business-questionnaire-card-preview-line" />
                  <span className="business-questionnaire-card-preview-line is-short" />
                  <span className="business-questionnaire-card-preview-choice" />
                  <span className="business-questionnaire-card-preview-choice" />
                </div>
                <div className="business-questionnaire-card-body">
                  <span className={`business-status status-${status.toLowerCase()}`}>{statusLabel}</span>
                  <h2>{questionnaire.title || project.title}</h2>
                  <p>{stats}</p>
                  <div className="business-questionnaire-card-actions">
                    <Link className="business-project-open" to={withLanguage(`/business/projects/${project.id}`, language)}>{ui.openEditor} <ArrowRight size={15} /></Link>
                    {questionnaire.status === 'PUBLISHED' && <Link className="business-project-open business-project-results" to={withLanguage(`/business/projects/${project.id}/results`, language)}><BarChart3 size={15} /> {projectsCopy.viewResults}</Link>}
                    {project.status === 'DRAFT' && <button type="button" className="business-project-open business-project-delete" onClick={() => deleteProject(project)} disabled={submitting}><Trash2 size={15} /> {projectsCopy.deleteDraft}</button>}
                  </div>
                </div>
              </article>
            );
          })}</div> : <p className="business-questionnaire-empty">{ui.noDraftsTitle}</p>}
        </section> : activeView === 'results' ? <section className="business-projects business-results-index">
          <div className="business-projects-head"><div><p className="business-eyebrow">{copy.results.eyebrow}</p><h1>{copy.results.indexTitle}</h1><p>{copy.results.indexIntro}</p></div><button className="business-button" type="button" onClick={() => selectWorkspaceView('home')}>{copy.rail.services} <ArrowRight size={16} /></button></div>
          {loading ? <BusinessPageLoader label={feedbackCopy.loadingResults} /> : resultProjects.length ? <div className="business-results-index-list">{resultProjects.map((project) => <article key={project.id}><div><p>{copy.services.questionnaireEyebrow}</p><h2>{project.questionnaire?.title || project.title}</h2><span>{project.questionnaire?.responseCount || 0} {copy.results.responses}</span></div><Link className="business-button" to={withLanguage(`/business/projects/${project.id}/results`, language)}>{copy.results.view} <ArrowRight size={16} /></Link></article>)}</div> : <p className="business-results-empty-line">{copy.results.noResultsTitle}</p>}
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

          {loading ? <BusinessPageLoader label={feedbackCopy.loadingProjects} /> : projectPool.length ? (
            <>
              <BusinessProjectCategoryTabs
                items={projectCategories}
                value={activeFilter}
                onChange={setActiveFilter}
                ariaLabel={projectsCopy.title}
              />

              <div className="business-project-list">
                {visibleProjects.map((project) => {
                  return (
                    <article key={project.id}>
                      <div className="business-project-menu"><button type="button" onClick={() => setProjectMenuId((current) => current === project.id ? '' : project.id)} aria-label={projectsCopy.actions.replace('{title}', project.title)} aria-expanded={projectMenuId === project.id}><MoreHorizontal size={19} /></button>{projectMenuId === project.id && <div><button type="button" onClick={() => { setBriefProject(project); setProjectMenuId(''); }}><FileText size={14} /> {projectsCopy.viewBrief}</button>{project.status === 'DRAFT' && <button type="button" onClick={() => openEditProject(project)}><Pencil size={14} /> {projectsCopy.editBrief}</button>}{project.status === 'DRAFT' && <button className="is-danger" type="button" onClick={() => deleteProject(project)}><Trash2 size={14} /> {projectsCopy.deleteDraft}</button>}</div>}</div>
                      <div>
                        <span className={`business-status status-${String(project.status).toLowerCase()}`} title={businessProjectStatusDescriptions[project.status] || ''}>
                          {projectsCopy.statuses[project.status] || project.status}
                        </span>
                        <p className="business-project-kind">{categoryLabels[projectCategory(project)]}</p>
                        <h2>{project.title}</h2>
                        <p>{project.researchGoal}</p>
                      </div>
                      <dl>
                        <div><dt>{projectsCopy.format}</dt><dd>{studyFormatLabel(project.studyFormat)}</dd></div>
                        <div><dt>{projectsCopy.audience}</dt><dd>{project.audienceDescription}</dd></div>
                        <div><dt>{projectsCopy.updated}</dt><dd>{new Date(project.updatedAt).toLocaleDateString(language)}</dd></div>
                      </dl>
                      <div className="business-project-actions">
                        <button type="button" className="business-project-open" onClick={() => { setBriefProject(project); setProjectMenuId(''); }}>{projectViewDetailsCopy[language] || projectViewDetailsCopy['en-US']} <ArrowRight size={15} /></button>
                        {!project.questionnaire && ['DRAFT', 'QUOTE_REQUIRED'].includes(project.status) && <button type="button" className="business-project-open" onClick={() => requestProposal(project)} disabled={submitting}>{submitting ? projectsCopy.submitting : projectsCopy.submit} <ArrowRight size={15} /></button>}
                        {!project.questionnaire && project.latestQuote?.status === 'SENT' && <button type="button" className="business-project-open" onClick={() => { setQuoteProject(project); setQuoteDecision(''); setDeclineReason(''); }}>{projectsCopy.reviewQuote} <ArrowRight size={15} /></button>}
                        {!project.questionnaire && project.status === 'CLIENT_ACCEPTED' && <button type="button" className="business-project-open" onClick={() => beginPayment(project)} disabled={Boolean(payingProjectId)} aria-busy={payingProjectId === project.id}>{payingProjectId === project.id ? <><LoaderCircle className="animate-spin" size={15} /> {ws.workspace.paymentPreparing}</> : <>{ws.workspace.continueToPayment} <ArrowRight size={15} /></>}</button>}
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
            <section className="business-projects-empty">
              <button className="business-projects-empty-icon" type="button" onClick={openNewProject} aria-label={projectsCopy.prepareBrief} title={projectsCopy.prepareBrief}><Plus size={24} /></button>
              <h2>{projectsCopy.prepareBrief}</h2>
              <p>{projectsCopy.startDecision}</p>
            </section>
          )}
        </section>}
      </div>


      {customSubmitted && (
        <div className="business-custom-submission" role="dialog" aria-modal="true" aria-labelledby="business-custom-submission-title">
          <section>
            <span className="business-custom-submission-icon" aria-hidden="true"><Check size={48} strokeWidth={1.6} /></span>
            <h2 id="business-custom-submission-title">{customSuccessCopy.title}</h2>
            <p>{customSuccessCopy.body}</p>
            <button type="button" onClick={dismissCustomSubmitted} autoFocus>
              {customSuccessCopy.action} <ArrowRight size={18} strokeWidth={2} />
            </button>
          </section>
        </div>
      )}

      {openChooser && (
        <div className="business-project-modal business-project-modal--chooser" role="dialog" aria-modal="true" aria-labelledby="business-project-chooser-title">
          <section>
            <button className="business-modal-close" type="button" onClick={() => setOpenChooser(false)} aria-label={briefCopy.close}><X size={18} /></button>
            <h2 id="business-project-chooser-title">{chooserCopy.title}</h2>
            <p className="business-form-intro">{chooserCopy.intro}</p>
            <div className="business-product-list">
              {chooserProducts.map(({ key, type, icon: Icon }) => {
                const item = chooserCopy.products[key];
                if (!item) return null;
                return (
                  <button
                    type="button"
                    key={key}
                    className={key === 'selfService' ? 'is-self-service' : ''}
                    onClick={() => chooseProduct({ type })}
                  >
                    <span className="business-product-icon"><Icon size={20} /></span>
                    <span className="business-product-copy">
                      <span className="business-product-title">
                        <strong>{item.title}</strong>
                      </span>
                      <small>{item.description}</small>
                    </span>
                    <span className="business-product-action">{item.action} <ArrowRight size={16} /></span>
                  </button>
                );
              })}
            </div>
            <p className="business-product-note">{chooserCopy.note}</p>
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
      {editorStarterOpen && <div className="business-project-modal business-editor-starter-modal" role="dialog" aria-modal="true" aria-labelledby="business-editor-starter-title"><form onSubmit={createEditorDraft}><button className="business-modal-close" type="button" onClick={() => setEditorStarterOpen(false)} aria-label={briefCopy.close}><X size={18} /></button><p className="business-eyebrow">{ui.editorStarterEyebrow}</p><h2 id="business-editor-starter-title">{ui.editorStarterTitle}</h2><p className="business-form-intro">{ui.editorStarterIntro}</p><label>{ui.editorStarterName}<input required minLength="3" value={editorStarter.title} onChange={(event) => setEditorStarter((current) => ({ ...current, title: event.target.value }))} placeholder={ui.editorStarterNamePlaceholder} /></label><label>{ui.editorStarterGoal}<textarea required minLength="20" value={editorStarter.researchGoal} onChange={(event) => setEditorStarter((current) => ({ ...current, researchGoal: event.target.value }))} placeholder={ui.editorStarterGoalPlaceholder} /></label><label>{ui.editorStarterAudience}<textarea required minLength="10" value={editorStarter.audienceDescription} onChange={(event) => setEditorStarter((current) => ({ ...current, audienceDescription: event.target.value }))} placeholder={ui.editorStarterAudiencePlaceholder} /></label><button className="business-button" type="submit" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={16} /> : ui.editorStarterSubmit} {!submitting && <ArrowRight size={16} />}</button></form></div>}
      {tourOpen && <BusinessTour open language={language} onClose={closeTour} onFinish={finishTour} />}
      {/* 引导：压在模糊工作区上的大弹窗（用户 2026-10-17，参照 YouGov）。
          背景是真工作区，答完这几问才关掉它并弹出欢迎弹窗。
          版式：顶部通栏进度条 → 字标 + 01/03 → 大标题 → 说明 → 卡片（图标砖 + 选中勾）→ 页脚按钮。 */}
      {!loading && workspace.profile && !onboardingComplete && !tourOpen && (
        <div className="business-onboarding" role="dialog" aria-modal="true" aria-labelledby="business-onboarding-title">
          <section className="business-onboarding-dialog">
            {/* 字标是品牌，独占顶部一条，不和序号/正文排在一起。 */}
            <header className="business-onboarding-head">
              <Logo size="lg" variant="dark" />
            </header>
            <div className="business-onboarding-meta">
              <p className="business-onboarding-kicker">{ui.onboardingWorkspace}</p>
              <span className="business-onboarding-count">
                <strong>{String(onboardingStep + 1).padStart(2, '0')}</strong>
                <em>/</em>
                {String(onboarding.researchRole === 'ORGANIZATION' ? 3 : 2).padStart(2, '0')}
              </span>
            </div>
            <h1 id="business-onboarding-title">
              {onboardingTitleText}
              {onboardingTitleMark && <i className="business-onboarding-question-mark">{onboardingTitleMark}</i>}
            </h1>
            <p className="business-onboarding-intro">{copy.onboarding.intros[onboardingStep]}</p>
            {onboardingStep === 0 && <div className="business-onboarding-options business-onboarding-options--two">
              <button type="button" className={onboarding.researchRole === 'INDEPENDENT' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchRole: 'INDEPENDENT', organizationType: 'INDEPENDENT_RESEARCHER' }))}>
                <span className="business-onboarding-option-icon"><UserRound size={21} /></span>
                <span className="business-onboarding-option-check" aria-hidden="true"><Check size={13} /></span>
                <strong>{copy.onboarding.individual[0]}</strong>
                <small>{copy.onboarding.individual[1]}</small>
              </button>
              <button type="button" className={onboarding.researchRole === 'ORGANIZATION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchRole: 'ORGANIZATION', organizationType: current.organizationType === 'INDEPENDENT_RESEARCHER' ? '' : current.organizationType }))}>
                <span className="business-onboarding-option-icon"><UsersRound size={21} /></span>
                <span className="business-onboarding-option-check" aria-hidden="true"><Check size={13} /></span>
                <strong>{copy.onboarding.organisation[0]}</strong>
                <small>{copy.onboarding.organisation[1]}</small>
              </button>
            </div>}
            {onboardingStep === 1 && <div className="business-onboarding-options business-onboarding-options--three">
              <button type="button" className={onboarding.researchIntent === 'INDEPENDENT_RESEARCH' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'INDEPENDENT_RESEARCH' }))}>
                <span className="business-onboarding-option-icon"><ClipboardList size={20} /></span>
                <span className="business-onboarding-option-check" aria-hidden="true"><Check size={13} /></span>
                <strong>{copy.onboarding.intents[0][0]}</strong>
                <small>{copy.onboarding.intents[0][1]}</small>
              </button>
              <button type="button" className={onboarding.researchIntent === 'MARKET_EXPLORATION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'MARKET_EXPLORATION' }))}>
                <span className="business-onboarding-option-icon"><Sparkles size={20} /></span>
                <span className="business-onboarding-option-check" aria-hidden="true"><Check size={13} /></span>
                <strong>{copy.onboarding.intents[1][0]}</strong>
                <small>{copy.onboarding.intents[1][1]}</small>
              </button>
              <button type="button" className={onboarding.researchIntent === 'MARKET_DECISION' ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, researchIntent: 'MARKET_DECISION' }))}>
                <span className="business-onboarding-option-icon"><BarChart3 size={20} /></span>
                <span className="business-onboarding-option-check" aria-hidden="true"><Check size={13} /></span>
                <strong>{copy.onboarding.intents[2][0]}</strong>
                <small>{copy.onboarding.intents[2][1]}</small>
              </button>
            </div>}
            {onboardingStep === 2 && <div className="business-onboarding-options business-onboarding-options--three">
              {organizationTypeOptions.map(({ value, icon: Icon }, index) => <button type="button" key={value} className={onboarding.organizationType === value ? 'is-selected' : ''} onClick={() => setOnboarding((current) => ({ ...current, organizationType: value }))}>
                <span className="business-onboarding-option-icon"><Icon size={20} /></span>
                <span className="business-onboarding-option-check" aria-hidden="true"><Check size={13} /></span>
                <strong>{copy.onboarding.organisationTypes[index][0]}</strong>
                <small>{copy.onboarding.organisationTypes[index][1]}</small>
              </button>)}
            </div>}
            {onboardingError && <p className="business-onboarding-error" role="alert">{onboardingError}</p>}
            <footer className="business-onboarding-actions">
              {onboardingStep > 0 && <button className="business-onboarding-back" type="button" onClick={() => setOnboardingStep((current) => current - 1)}>{copy.onboarding.back}</button>}
              <button className="business-onboarding-next" type="button" disabled={(onboardingStep === 0 && !onboarding.researchRole) || (onboardingStep === 1 && !onboarding.researchIntent) || (onboardingStep === 2 && !onboarding.organizationType) || onboardingSaving} onClick={advanceOnboarding}>
                {onboardingSaving ? <LoaderCircle className="animate-spin" size={17} /> : onboardingStep === (onboarding.researchRole === 'ORGANIZATION' ? 2 : 1) ? copy.onboarding.enter : copy.onboarding.continue}
                {!onboardingSaving && <ArrowRight size={17} />}
              </button>
            </footer>
          </section>
        </div>
      )}
    </main>
  );
}
