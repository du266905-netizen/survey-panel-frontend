import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:3001',
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

  return {
    ...user,
    username: user.displayName,
    coins: user.coinsBalance,
    group: user.groupName,
    team: user.teamName,
    role: String(user.role || '').toLowerCase(),
  };
}
