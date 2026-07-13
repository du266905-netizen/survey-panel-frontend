import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { useAuth } from './components/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import AdminPartners from './pages/AdminPartners';
import AdminRewards from './pages/AdminRewards';
import Dashboard from './pages/Dashboard';
import DatabaseExplorer from './pages/DatabaseExplorer';
import ForgotPassword from './pages/ForgotPassword';
import Landing from './pages/Landing';
import MyRecords from './pages/MyRecords';
import Onboarding from './pages/Onboarding';
import Profile from './pages/Profile';
import ResetPassword from './pages/ResetPassword';
import Settings from './pages/Settings';
import SurveyList from './pages/SurveyList';
import SurveyPartners from './pages/SurveyPartners';
import Team from './pages/Team';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import TrafficConsole from './pages/TrafficConsole';
import Wallet from './pages/Wallet';
import WorkerDetail from './pages/WorkerDetail';
import WorkerMonitor from './pages/WorkerMonitor';
import AgentPrecheck from './pages/AgentPrecheck';
import { isAdminRole } from './utils/roles';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return isAdminRole(user?.role) ? children : <Navigate to="/dashboard" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Landing initialAuthMode="login" />} />
      <Route path="/register" element={<Landing initialAuthMode="register" />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/隐私" element={<Navigate to="/privacy" replace />} />
      <Route path="/terms" element={<Terms />} />
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/partners" element={<SurveyPartners />} />
        <Route path="/partners/:partnerId/surveys" element={<SurveyList />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/records" element={<MyRecords />} />
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
          path="/agent-precheck"
          element={
            <AdminRoute>
              <AgentPrecheck />
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
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Route>
      <Route path="/" element={<Landing initialAuthMode="register" />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
