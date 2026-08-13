import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import { isBusinessRole } from '../utils/roles';

export default function Business() {
  const { user } = useAuth();
  return <Navigate to={isBusinessRole(user?.role) ? '/business/workspace' : '/business/access'} replace />;
}
