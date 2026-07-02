import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { useAuth } from './components/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MyRecords from './pages/MyRecords';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Settings from './pages/Settings';
import SurveyList from './pages/SurveyList';
import SurveyPartners from './pages/SurveyPartners';
import Team from './pages/Team';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { isAdminRole } from './utils/roles';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  return isAdminRole(user?.role) ? children : <Navigate to="/dashboard" replace />;
}

function PublicHomeRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <Landing />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/partners" element={<SurveyPartners />} />
        <Route path="/partners/:partnerId/surveys" element={<SurveyList />} />
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
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Route>
      <Route path="/" element={<PublicHomeRoute />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
