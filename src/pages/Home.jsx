import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStoredUser } from '../api/client';

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    if (getStoredUser()) {
      navigate('/dashboard', { replace: true });
    } else {
      window.location.href = '/landing.html';
    }
  }, [navigate]);

  return null;
}
