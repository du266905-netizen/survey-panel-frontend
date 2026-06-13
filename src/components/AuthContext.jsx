import { createContext, useContext, useMemo, useState } from 'react';
import { clearSession, getStoredUser, normalizeUser } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUserState] = useState(() => getStoredUser());
  const setUser = (nextUser) => {
    const normalizedUser = normalizeUser(nextUser);
    setUserState(normalizedUser);
    if (normalizedUser) {
      window.localStorage.setItem('surveyUser', JSON.stringify(normalizedUser));
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      logout: () => {
        clearSession();
        setUserState(null);
      },
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
