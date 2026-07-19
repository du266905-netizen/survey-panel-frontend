import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getPanelProfile } from '../api/realApi';
import PanelProfileInviteModal from './PanelProfileInviteModal';

const ProfileSurveyContext = createContext(null);

export function ProfileSurveyProvider({ enabled, children }) {
  const [panelProfile, setPanelProfile] = useState(null);
  const [rewardCoins, setRewardCoins] = useState(150);
  const [loading, setLoading] = useState(Boolean(enabled));
  const [open, setOpen] = useState(false);

  const refreshPanelProfile = async () => {
    if (!enabled) return null;
    setLoading(true);
    try {
      const response = await getPanelProfile();
      const nextProfile = response.data.profile;
      setPanelProfile(nextProfile);
      setRewardCoins(response.data.rewardCoins || 150);
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
      setLoading(false);
      return undefined;
    }

    refreshPanelProfile()
      .then((nextProfile) => {
        if (mounted && !nextProfile?.isComplete) setOpen(true);
      })
      .catch(() => {
        if (mounted) setLoading(false);
      });

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
    </ProfileSurveyContext.Provider>
  );
}

export function useProfileSurvey() {
  return useContext(ProfileSurveyContext) || {
    panelProfile: null,
    rewardCoins: 150,
    loading: false,
    openProfileSurvey: () => {},
    refreshPanelProfile: async () => null,
  };
}
