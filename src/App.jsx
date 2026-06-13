import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import { useAuth } from './components/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import MyRecords from './pages/MyRecords';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import SurveyList from './pages/SurveyList';
import SurveyPartners from './pages/SurveyPartners';

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
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
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
