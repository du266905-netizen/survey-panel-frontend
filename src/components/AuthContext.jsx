import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';
import { clearSession, getStoredUser, normalizeUser, SESSION_INVALIDATED_EVENT } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getStoredUser());

  const clearLocalUser = () => {
    clearSession();
    setUserState(null);
  };

  useLayoutEffect(() => {
    const handleSessionInvalidated = () => clearLocalUser();
    window.addEventListener(SESSION_INVALIDATED_EVENT, handleSessionInvalidated);
    return () => window.removeEventListener(SESSION_INVALIDATED_EVENT, handleSessionInvalidated);
  }, []);

  const setUser = (nextUser) => {
    const normalizedUser = normalizeUser(nextUser);
    if (!normalizedUser) {
      clearLocalUser();
      return;
    }

    setUserState(normalizedUser);
    window.localStorage.setItem('surveyUser', JSON.stringify(normalizedUser));
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout: clearLocalUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
