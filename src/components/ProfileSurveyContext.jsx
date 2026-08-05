import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getCurrentUser, getPanelProfile, reconcilePanelProfileReward } from '../api/realApi';
import { useAuth } from './AuthContext';
import FirstSurveyCompletionModal from './FirstSurveyCompletionModal';
import PanelProfileInviteModal from './PanelProfileInviteModal';

const ProfileSurveyContext = createContext(null);

export function ProfileSurveyProvider({ enabled, children }) {
  const { setUser } = useAuth();
  const [panelProfile, setPanelProfile] = useState(null);
  const [rewardCoins, setRewardCoins] = useState(1000);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [open, setOpen] = useState(false);
  const [completionNotice, setCompletionNotice] = useState(null);

  const refreshPanelProfile = async () => {
    if (!enabled) return null;
    setLoading(true);
    try {
      const response = await getPanelProfile();
      const nextProfile = response.data.profile;
      setPanelProfile(nextProfile);
      setRewardCoins(response.data.rewardCoins || 1000);
      return nextProfile;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    if (!enabled) {
      setPanelProfile(null);
      setOpen(false);
      setCompletionNotice(null);
      setLoading(false);
      return undefined;
    }

    try {
      const storedNotice = window.sessionStorage.getItem('first-survey-completion');
      window.sessionStorage.removeItem('first-survey-completion');
      if (storedNotice) {
        const parsedNotice = JSON.parse(storedNotice);
        setCompletionNotice({ awardedCoins: Math.max(0, Number(parsedNotice.awardedCoins) || 0) });
      }
    } catch {
      window.sessionStorage.removeItem('first-survey-completion');
    }

    const loadPanelProfile = async () => {
      try {
        let nextProfile = await refreshPanelProfile();
        if (!mounted) return;

        if (nextProfile?.isComplete && nextProfile.profileVersion !== 'v2') {
          const reward = await reconcilePanelProfileReward();
          if (!mounted) return;
          nextProfile = reward.data.profile;
          setPanelProfile(nextProfile);

          if (reward.data.awardedCoins > 0) {
            setCompletionNotice({ awardedCoins: Math.max(0, Number(reward.data.awardedCoins) || 0) });
            try {
              const currentUser = await getCurrentUser();
              if (mounted) setUser(currentUser.data.user);
            } catch {}
          }
        }

        if (mounted && !nextProfile?.isComplete) setOpen(true);
      } catch {
        if (mounted) setLoading(false);
      }
    };

    loadPanelProfile();

    return () => {
      mounted = false;
    };
  }, [enabled]);

  const value = useMemo(
    () => ({
      panelProfile,
      rewardCoins,
      loading,
      openProfileSurvey: () => setOpen(true),
      refreshPanelProfile,
    }),
    [panelProfile, rewardCoins, loading]
  );

  return (
    <ProfileSurveyContext.Provider value={value}>
      {children}
      <PanelProfileInviteModal
        open={open}
        profile={panelProfile}
        rewardCoins={rewardCoins}
        onClose={() => setOpen(false)}
      />
      <FirstSurveyCompletionModal
        awardedCoins={completionNotice?.awardedCoins || 0}
        open={Boolean(completionNotice)}
        onClose={() => setCompletionNotice(null)}
      />
    </ProfileSurveyContext.Provider>
  );
}

export function useProfileSurvey() {
  return useContext(ProfileSurveyContext) || {
    panelProfile: null,
    rewardCoins: 1000,
    loading: false,
    openProfileSurvey: () => {},
    refreshPanelProfile: async () => null,
  };
}
