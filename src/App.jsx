import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { useAuth } from './components/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import AdminSupportTickets from './pages/AdminSupportTickets';
import MarketingAssets from './pages/MarketingAssets';
import AdminPartners from './pages/AdminPartners';
import AdminPanelists from './pages/AdminPanelists';
import AdminRewards from './pages/AdminRewards';
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
import { isAdminRole } from './utils/roles';

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

function PublicPage({ children }) {
  return <PublicSiteLayout>{children}</PublicSiteLayout>;
}

function NewsRoute() {
  const { user } = useAuth();
  return user ? (
    <AppLayout>
      <NewsWall />
    </AppLayout>
  ) : (
    <PublicPage><NewsWall /></PublicPage>
  );
}

function SurveyCompleteRoute() {
  const { user } = useAuth();
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
  return user ? (
    <AppLayout>
      <SurveyPartners />
    </AppLayout>
  ) : (
    <PublicPage><SurveyPartners /></PublicPage>
  );
}

export default function App() {
  return (
    <>
      <RouteScrollManager />
      <Routes>
        <Route path="/login" element={<PublicEntry><Landing initialAuthMode="login" authOnly /></PublicEntry>} />
        <Route path="/register" element={<PublicEntry><Landing initialAuthMode="register" authOnly /></PublicEntry>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/privacy" element={<PublicPage><Privacy /></PublicPage>} />
        <Route path="/terms" element={<PublicPage><Terms /></PublicPage>} />
        <Route path="/how-it-works" element={<PublicPage><HowItWorks /></PublicPage>} />
        <Route path="/our-approach" element={<PublicPage><OurApproach /></PublicPage>} />
        <Route path="/news" element={<NewsRoute />} />
        <Route path="/news/:articleId" element={<PublicPage><NewsArticlePage /></PublicPage>} />
        <Route path="/partners" element={<SurveyWallRoute />} />
        <Route path="/survey/complete" element={<SurveyCompleteRoute />} />
        <Route path="/panel-profile" element={<ProtectedRoute><PanelProfilePage /></ProtectedRoute>} />
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/onboarding" element={<Navigate to="/panel-profile" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/partners/:partnerId/surveys" element={<SurveyList />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/referrals" element={<Navigate to="/dashboard?referral=true" replace />} />
          <Route path="/records" element={<Navigate to="/dashboard" replace />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
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
      <SupportChatWidget />
    </>
  );
}
