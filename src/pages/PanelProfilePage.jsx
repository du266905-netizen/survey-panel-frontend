import { LoaderCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPanelProfile } from '../api/realApi';
import PanelProfileModal from '../components/PanelProfileModal';
import { useAuth } from '../components/AuthContext';
import { isPanelistRole } from '../utils/roles';

export default function PanelProfilePage() {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [rewardCoins, setRewardCoins] = useState(150);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isPanelistRole(user?.role)) {
      navigate('/dashboard', { replace: true });
      return undefined;
    }

    let mounted = true;
    getPanelProfile()
      .then((response) => {
        if (!mounted) return;
        setProfile(response.data.profile);
        setRewardCoins(response.data.rewardCoins || 150);
      })
      .catch((caughtError) => {
        if (mounted) setError(caughtError.response?.data?.message || 'Unable to load your panel profile.');
      });

    return () => {
      mounted = false;
    };
  }, [navigate, user?.role]);

  const handleProfileSaved = (result) => {
    setProfile(result.profile);
    if (result.awardedCoins > 0 && user) {
      setUser({ ...user, coinsBalance: Number(user.coinsBalance || 0) + Number(result.awardedCoins) });
    }
  };

  if (error) {
    return <main className="profile-survey-page-status"><p>{error}</p><button type="button" onClick={() => navigate('/dashboard')}>Return to workspace</button></main>;
  }

  if (!profile) {
    return <main className="profile-survey-page-status"><LoaderCircle className="animate-spin" size={24} /><p>Loading your panel profile…</p></main>;
  }

  return <PanelProfileModal open profile={profile} rewardCoins={rewardCoins} onClose={() => navigate('/dashboard')} onProfileSaved={handleProfileSaved} asPage />;
}
