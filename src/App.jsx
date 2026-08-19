import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { useAuth } from './components/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import AdminSupportTickets from './pages/AdminSupportTickets';
import AdminBusinessQuestionnaires from './pages/AdminBusinessQuestionnaires';
import AdminBusinessProjects from './pages/AdminBusinessProjects';
import MarketingAssets from './pages/MarketingAssets';
import AdminPartners from './pages/AdminPartners';
import AdminPanelists from './pages/AdminPanelists';
import AdminResearchOpportunities from './pages/AdminResearchOpportunities';
import AdminRewards from './pages/AdminRewards';
import ActivityDashboard from './pages/ActivityDashboard';
import CommunityHub from './pages/CommunityHub';
import Dashboard from './pages/Dashboard';
import DatabaseExplorer from './pages/DatabaseExplorer';
import ForgotPassword from './pages/ForgotPassword';
import HowItWorks from './pages/HowItWorks';
import HomeAtlas from './pages/HomeAtlas';
import Landing from './pages/Landing';
import NewsWall from './pages/NewsWall';
import NewsArticlePage from './pages/NewsArticlePage';
import OurApproach from './pages/OurApproach';
import PanelProfilePage from './pages/PanelProfilePage';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import ResearchActivities from './pages/ResearchActivities';
import SettlementReview from './pages/SettlementReview';
import Settings from './pages/Settings';
import SurveyList from './pages/SurveyList';
import SurveyComplete from './pages/SurveyComplete';
import SurveyPartners from './pages/SurveyPartners';
import Team from './pages/Team';
import Privacy from './pages/Privacy';
import RouteScrollManager from './components/RouteScrollManager';
import PublicSiteLayout from './components/PublicSiteLayout';
import Terms from './pages/Terms';
import TrafficConsole from './pages/TrafficConsole';
import Wallet from './pages/Wallet';
import WorkerDetail from './pages/WorkerDetail';
import WorkerMonitor from './pages/WorkerMonitor';
import AgentPrecheck from './pages/AgentPrecheck';
import SupportChatWidget from './components/SupportChatWidget';
import { isAdminRole, isPanelistRole } from './utils/roles';
import { isBusinessRole } from './utils/roles';
import Business from './pages/Business';
import BusinessAccess from './pages/BusinessAccess';
import BusinessWorkspace from './pages/BusinessWorkspace';
import BusinessAccount from './pages/BusinessAccount';
import BusinessQuestionnaireBuilder from './pages/BusinessQuestionnaireBuilder';
import PublicBusinessQuestionnaire from './pages/PublicBusinessQuestionnaire';
import JoinChoice from './pages/JoinChoice';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function PublicEntry({ children }) {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : children;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return isAdminRole(user?.role) ? children : <Navigate to="/dashboard" replace />;
}

function MemberRoute({ children }) {
  const { user } = useAuth();
  if (isAdminRole(user?.role)) return <Navigate to="/admin" replace />;
  return isBusinessRole(user?.role) ? <Navigate to="/business/workspace" replace /> : children;
}

function BusinessRoute({ children }) {
  const { user } = useAuth();
  return isBusinessRole(user?.role) ? children : <Navigate to="/business/access" replace />;
}

function PublicPage({ children }) {
  return <PublicSiteLayout>{children}</PublicSiteLayout>;
}

function NewsRoute() {
  const { user } = useAuth();
  if (isAdminRole(user?.role)) return <Navigate to="/admin" replace />;
  return user ? (
    <AppLayout>
      <NewsWall />
    </AppLayout>
  ) : (
    <PublicPage><NewsWall /></PublicPage>
  );
}

function NewsArticleRoute() {
  const { user } = useAuth();
  return user ? (
    <AppLayout>
      <NewsArticlePage />
    </AppLayout>
  ) : (
    <PublicPage><NewsArticlePage /></PublicPage>
  );
}

function SurveyCompleteRoute() {
  const { user } = useAuth();
  if (isAdminRole(user?.role)) return <Navigate to="/admin" replace />;
  return user ? (
    <AppLayout>
      <SurveyComplete />
    </AppLayout>
  ) : (
    <PublicPage><SurveyComplete /></PublicPage>
  );
}

function SurveyWallRoute() {
  const { user } = useAuth();
  if (isAdminRole(user?.role)) return <Navigate to="/admin" replace />;
  return user ? (
    <AppLayout>
      <SurveyPartners />
    </AppLayout>
  ) : (
    <PublicPage><SurveyPartners /></PublicPage>
  );
}

export default function App() {
  const { user } = useAuth();

  return (
    <>
      <RouteScrollManager />
      <Routes>
        <Route path="/login" element={<PublicEntry><Landing initialAuthMode="login" authOnly /></PublicEntry>} />
        <Route path="/register" element={<PublicEntry><Landing initialAuthMode="register" authOnly /></PublicEntry>} />
        <Route path="/join" element={<JoinChoice />} />
        <Route path="/business" element={<Business />} />
        <Route path="/business/access" element={<BusinessAccess />} />
        <Route path="/business/login" element={<BusinessAccess />} />
        <Route path="/business/register" element={<BusinessAccess />} />
        <Route path="/business/workspace" element={<BusinessRoute><BusinessWorkspace /></BusinessRoute>} />
        <Route path="/business/account" element={<BusinessRoute><BusinessAccount /></BusinessRoute>} />
        <Route path="/business/projects/:projectId" element={<BusinessRoute><BusinessQuestionnaireBuilder /></BusinessRoute>} />
        <Route path="/business/s/:publicId" element={<PublicBusinessQuestionnaire />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy" element={<PublicPage><Privacy /></PublicPage>} />
        <Route path="/terms" element={<PublicPage><Terms /></PublicPage>} />
        <Route path="/how-it-works" element={<PublicPage><HowItWorks /></PublicPage>} />
        <Route path="/our-approach" element={<PublicPage><OurApproach /></PublicPage>} />
        <Route path="/news" element={<NewsRoute />} />
        <Route path="/news/:articleId" element={<NewsArticleRoute />} />
        <Route path="/partners" element={<SurveyWallRoute />} />
        <Route path="/survey/complete" element={<SurveyCompleteRoute />} />
        <Route path="/panel-profile" element={<ProtectedRoute><MemberRoute><PanelProfilePage /></MemberRoute></ProtectedRoute>} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/onboarding" element={<MemberRoute><Navigate to="/panel-profile" replace /></MemberRoute>} />
          <Route path="/dashboard" element={<MemberRoute><Dashboard /></MemberRoute>} />
          <Route path="/activity" element={<MemberRoute><ActivityDashboard /></MemberRoute>} />
          <Route path="/community" element={<MemberRoute><CommunityHub /></MemberRoute>} />
          <Route path="/research" element={<MemberRoute><ResearchActivities /></MemberRoute>} />
          <Route path="/partners/:partnerId/surveys" element={<MemberRoute><SurveyList /></MemberRoute>} />
          <Route path="/wallet" element={<MemberRoute><Wallet /></MemberRoute>} />
          <Route path="/referrals" element={<MemberRoute><Navigate to="/dashboard?referral=true" replace /></MemberRoute>} />
          <Route path="/records" element={<MemberRoute><Navigate to="/dashboard" replace /></MemberRoute>} />
          <Route path="/profile" element={<MemberRoute><Profile /></MemberRoute>} />
          <Route path="/settings" element={<MemberRoute><Settings /></MemberRoute>} />
          <Route
            path="/team"
            element={
              <AdminRoute>
                <Team />
              </AdminRoute>
            }
          />
          <Route
            path="/workers"
            element={
              <AdminRoute>
                <WorkerMonitor />
              </AdminRoute>
            }
          />
          <Route
            path="/workers/:workerId"
            element={
              <AdminRoute>
                <WorkerDetail />
              </AdminRoute>
            }
          />
          <Route
            path="/traffic"
            element={
              <AdminRoute>
                <TrafficConsole />
              </AdminRoute>
            }
          />
          <Route
            path="/orbit/settlement"
            element={
              <AdminRoute>
                <SettlementReview />
              </AdminRoute>
            }
          />
          <Route
            path="/agent-precheck"
            element={
              <AdminRoute>
                <AgentPrecheck />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/panelists"
            element={
              <AdminRoute>
                <AdminPanelists />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/research-opportunities"
            element={
              <AdminRoute>
                <AdminResearchOpportunities />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/rewards"
            element={
              <AdminRoute>
                <AdminRewards />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/partners"
            element={
              <AdminRoute>
                <AdminPartners />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/database"
            element={
              <AdminRoute>
                <DatabaseExplorer />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/marketing-assets"
            element={
              <AdminRoute>
                <MarketingAssets />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/business-questionnaires"
            element={<AdminRoute><AdminBusinessQuestionnaires /></AdminRoute>}
          />
          <Route
            path="/admin/business-projects"
            element={<AdminRoute><AdminBusinessProjects /></AdminRoute>}
          />
          <Route
            path="/admin/support"
            element={
              <AdminRoute>
                <AdminSupportTickets />
              </AdminRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
        </Route>
        <Route path="/" element={<HomeAtlas />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      {isPanelistRole(user?.role) && <SupportChatWidget />}
    </>
  );
}
