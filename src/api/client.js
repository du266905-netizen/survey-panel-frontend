import axios from 'axios';

const defaultApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://api.guanyi-media.com';
  }
  return 'http://127.0.0.1:3001';
};

const configuredApiBaseUrl = String(import.meta.env.VITE_API_URL || '').trim();

const apiBaseUrl = (() => {
  try {
    const url = new URL(configuredApiBaseUrl);
    return ['http:', 'https:'].includes(url.protocol) ? configuredApiBaseUrl.replace(/\/+$/, '') : defaultApiBaseUrl();
  } catch {
    return defaultApiBaseUrl();
  }
})();

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('surveyToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem('surveyToken');
      window.localStorage.removeItem('surveyUser');
    }

    return Promise.reject(error);
  }
);

export function persistSession({ token, user }) {
  if (!token || !user) return;
  window.localStorage.setItem('surveyToken', token);
  window.localStorage.setItem('surveyUser', JSON.stringify(normalizeUser(user)));
}

export function clearSession() {
  window.localStorage.removeItem('surveyToken');
  window.localStorage.removeItem('surveyUser');
}

export function getStoredUser() {
  try {
    const stored = window.localStorage.getItem('surveyUser');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function normalizeUser(user) {
  if (!user) return null;
  const rawRole = String(user.role || '').toUpperCase();
  const role = rawRole === 'ADMIN' ? 'admin' : rawRole === 'BUSINESS' ? 'business' : rawRole === 'PANELIST' || rawRole === 'USER' ? 'panelist' : 'employee';

  return {
    ...user,
    username: user.displayName,
    coins: user.coinsBalance,
    group: user.groupName,
    team: user.teamName,
    role,
  };
}
