import { apiClient, getStoredUser, normalizeUser, persistSession } from './client';
import { isAdminRole } from '../utils/roles';

const channelPalette = ['#10b981', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#7c3aed', '#0f766e'];
const channelNames = ['Channel A', 'Channel B', 'Channel C', 'Channel D', 'Channel E', 'Channel F', 'Channel G', 'Channel H'];
const partnerSlugs = ['gwss', 'za-survey', 'wwi', 'opx', 'mr', 'bitlabs', 'cpx-research', 'theoremreach'];
const realPartnerSlugs = new Set(['cpx-research', 'theoremreach', 'bitlabs']);

const isAdmin = () => isAdminRole(getStoredUser()?.role);

const codeForIndex = (index) => {
  const safeIndex = Math.max(0, index);
  return {
    codeName: channelNames[safeIndex % channelNames.length],
    channelColor: channelPalette[safeIndex % channelPalette.length],
    channelLetter: String.fromCharCode(65 + (safeIndex % channelNames.length)),
  };
};

const codeForPartner = (partner, fallbackIndex = 0) => {
  const slugIndex = partnerSlugs.indexOf(partner?.slug);
  return codeForIndex(slugIndex >= 0 ? slugIndex : fallbackIndex);
};

const displayPartnerName = (partner) => {
  if (isAdmin()) return partner?.name || '-';
  return codeForPartner(partner).codeName;
};

const statusToUi = (status) => String(status || '').toLowerCase();

const maskSurveyId = (value, index) => {
  if (isAdmin()) return value || '-';
  return `Survey-${String(index + 1).padStart(3, '0')}`;
};

const publicSurveyCode = (value, index = 0) => {
  const source = String(value || index + 1);
  let hash = 0;
  for (let position = 0; position < source.length; position += 1) {
    hash = (hash * 31 + source.charCodeAt(position)) % 90000000;
  }
  return `Survey #${String(hash + 10000000).slice(0, 8)}`;
};

const mapRecord = (record, index = 0) => {
  const rawSurveyId = record.survey?.externalId || record.surveyId;
  const displaySurveyCode = publicSurveyCode(rawSurveyId, index);
  return {
    ...record,
    rawSurveyId,
    surveyNumber: isAdmin() ? maskSurveyId(rawSurveyId, index) : displaySurveyCode,
    surveyId: isAdmin() ? rawSurveyId : displaySurveyCode,
    pid: isAdmin() ? record.survey?.clientId || record.surveyId || '-' : undefined,
    platform: isAdmin() ? displayPartnerName(record.partner) || record.partnerId : 'Channel A',
    employee: record.user?.displayName || record.user?.email || '-',
    ip: record.ipAddress,
    coins: record.coinsEarned,
    coinsReward: record.coinsEarned,
    amountUsd: record.amountUsd,
    payoutUsd: Number(record.amountUsd || 0),
    postbackStatus: record.postbackStatus || '-',
    transId: isAdmin() ? record.transId || '-' : undefined,
    status: statusToUi(record.status),
    time: record.auditTime || record.createdAt,
    startTime: record.startTime,
    auditTime: record.auditTime || '-',
  };
};

const mapSurvey = (survey, partnerContext, index = 0) => ({
  ...survey,
  pid: survey.clientId || survey.id,
  surveyId: survey.externalId,
  displayName: isAdmin() ? survey.surveyName || survey.externalId : `Survey ${index + 1}`,
  partnerId: survey.partnerId || partnerContext?.id,
  partnerDisplayName: partnerContext?.displayName || partnerContext?.name || survey.partner?.name,
  partnerCodeName: partnerContext?.codeName,
  channelColor: partnerContext?.channelColor,
  clicks: survey.clicks ?? Math.max(0, survey.sampleSize - survey.remaining),
  completes: survey.completes ?? 0,
  quota: survey.sampleSize,
});

const mapSurveyWallItem = (survey, index = 0) => ({
  ...survey,
  id: survey.id || survey.externalId,
  surveyId: survey.externalId || survey.id,
  displayName: `Survey ${index + 1}`,
  publicSurveyCode: survey.publicSurveyCode || publicSurveyCode(survey.externalId || survey.id, index),
  loi: Number(survey.loi || 0),
  reward: Number(survey.reward || 0),
  status: survey.status || 'ACTIVE',
});

const mapEmployee = (user) => ({
  ...user,
  name: user.displayName || user.name || '-',
  tag: user.groupName || '',
  roleValue: ['PANELIST', 'USER'].includes(String(user.role || '').toUpperCase()) ? 'PANELIST' : String(user.role || 'EMPLOYEE').toUpperCase() === 'ADMIN' ? 'ADMIN' : 'EMPLOYEE',
  roleLabel:
    String(user.role || 'EMPLOYEE').toUpperCase() === 'ADMIN'
      ? 'Admin'
      : ['PANELIST', 'USER'].includes(String(user.role || '').toUpperCase())
        ? 'Panelist'
        : 'Employee',
  isActive: user.isActive !== false,
});

export const login = async ({ email, password }) => {
  const response = await apiClient.post('/api/auth/login', { email, password });
  persistSession(response.data);

  return {
    data: {
      ...response.data,
      user: normalizeUser(response.data.user),
    },
  };
};

export const register = async ({ email, password, displayName, verificationCode, turnstileToken, agreedToTermsAt }) => {
  const response = await apiClient.post('/api/auth/register', {
    email,
    password,
    displayName,
    verificationCode,
    turnstileToken,
    agreedToTermsAt,
  });
  persistSession(response.data);

  return {
    data: {
      ...response.data,
      user: normalizeUser(response.data.user),
    },
  };
};

export const sendEmailCode = async ({ email }) => {
  const response = await apiClient.post('/api/auth/send-email-code', { email });
  return { data: response.data };
};

export const verifyEmailCode = async ({ email, code }) => {
  const response = await apiClient.post('/api/auth/verify-email-code', { email, code });
  return { data: response.data };
};

export const requestPasswordReset = async ({ email }) => {
  const response = await apiClient.post('/api/auth/forgot-password', { email });
  return { data: response.data };
};

export const resetPassword = async ({ email, token, password }) => {
  const response = await apiClient.post('/api/auth/reset-password', { email, token, password });
  return { data: response.data };
};

export const getCurrentUser = async () => {
  const response = await apiClient.get('/api/auth/me');
  return {
    data: {
      ...response.data,
      user: normalizeUser(response.data.user),
    },
  };
};

export const updateProfile = async ({ displayName }) => {
  const response = await apiClient.put('/api/auth/profile', { displayName });
  return {
    data: {
      ...response.data,
      user: normalizeUser(response.data.user),
    },
  };
};

export const getOnboardingProfile = async () => {
  const response = await apiClient.get('/api/auth/onboarding');
  return { data: response.data };
};

export const completeOnboardingProfile = async (payload) => {
  const response = await apiClient.post('/api/auth/onboarding', payload);
  return {
    data: {
      ...response.data,
      user: normalizeUser(response.data.user),
    },
  };
};

export const getWallet = async () => {
  const response = await apiClient.get('/api/wallet');
  return { data: response.data };
};

export const redeemReward = async ({ provider = 'manual', rewardType = 'gift_card', amountCoins, note }) => {
  const response = await apiClient.post('/api/wallet/redeem', {
    provider,
    rewardType,
    amountCoins: Number(amountCoins),
    note,
  });
  return { data: response.data };
};

export const getRewardOrders = async (params = {}) => {
  const response = await apiClient.get('/api/admin/rewards/orders', {
    params: { pageSize: 100, ...params },
  });
  return { data: response.data };
};

export const getRewardProviders = async () => {
  const response = await apiClient.get('/api/admin/rewards/providers');
  return { data: response.data.providers || [] };
};

export const updateRewardOrder = async (orderId, payload) => {
  const response = await apiClient.patch(`/api/admin/rewards/orders/${orderId}`, payload);
  return { data: response.data };
};

export const updateRewardProvider = async (name, payload) => {
  const response = await apiClient.patch(`/api/admin/rewards/providers/${name}`, payload);
  return { data: response.data };
};

export const getDashboard = async () => {
  const [statsResponse, chartResponse, recordsResponse] = await Promise.all([
    apiClient.get('/api/records/stats'),
    apiClient.get('/api/records/chart'),
    apiClient.get('/api/records', {
      params: { pageSize: 10, status: 'COMPLETED' },
    }),
  ]);

  return {
    data: {
      stats: {
        completedOffers: statsResponse.data.totalCompleted,
        coinsEarned: statsResponse.data.coinsEarned,
        pendingEarnings: statsResponse.data.pendingEarnings,
        failedEarnings: statsResponse.data.failedEarnings,
      },
      earningsTrend: chartResponse.data.chart || [],
      recentActivities: (recordsResponse.data.items || []).map(mapRecord),
    },
  };
};

export const getPartners = async () => {
  const response = await apiClient.get('/api/partners');
  const partners = (response.data.partners || response.data.items || []).filter((partner) => realPartnerSlugs.has(partner.slug));

  return {
    data: partners.map((partner, index) => {
      const channelCode = codeForPartner(partner, index);
      const isConnected = partner.slug === 'cpx-research';
      const partnerStatus = partner.slug === 'theoremreach' ? 'In discussion' : partner.slug === 'bitlabs' ? 'Promoting' : partner.conversion || 'Connected';

      return {
        ...partner,
        ...channelCode,
        displayName: partner.name,
        name: isAdmin() ? partner.name : channelCode.codeName,
        activeSurveys: isConnected ? partner.activeSurveys ?? partner.surveyCount ?? partner._count?.surveys ?? 0 : 0,
        conversion: partnerStatus,
        isConnected,
      };
    }),
  };
};

export const getSurveysByPartner = async (partnerId) => {
  const [partnerResponse, response] = await Promise.all([
    apiClient.get(`/api/partners/${partnerId}`),
    apiClient.get(`/api/partners/${partnerId}/surveys`, {
      params: { pageSize: 100 },
    }),
  ]);
  const partner = partnerResponse.data.partner;
  const partnerCode = codeForPartner(partner);
  const partnerContext = partner
    ? {
        ...partner,
        displayName: isAdmin() ? partner.name : partnerCode.codeName,
        codeName: partnerCode.codeName,
        channelColor: partnerCode.channelColor,
      }
    : null;

  return {
    data: (response.data.items || []).map((survey, index) => mapSurvey(survey, partnerContext, index)),
  };
};

export const getSurveyWall = async () => {
  const response = await apiClient.get('/api/survey/list', {
    params: { pageSize: 100 },
  });

  return {
    data: (response.data.items || []).map(mapSurveyWallItem),
  };
};

export const getRecords = async () => {
  const endpoint = isAdmin() ? '/api/admin/records' : '/api/records';
  const response = await apiClient.get(endpoint, {
    params: { pageSize: 100 },
  });

  return {
    data: (response.data.items || []).map(mapRecord),
  };
};

export const startSurvey = async ({ surveyId, partnerId, proxyIp, fingerprintBrowser, operatingSystem, linkType }) =>
  apiClient.post('/api/survey/start', {
    surveyId,
    partnerId,
    proxyIp,
    fingerprintBrowser,
    operatingSystem,
    linkType,
  });

export const getAdminDashboard = async () => {
  const [statsResponse, trafficQualityResponse, riskResponse, partnersResponse] = await Promise.all([
    apiClient.get('/api/admin/stats'),
    apiClient.get('/api/admin/traffic-quality', { params: { days: 7 } }),
    apiClient.get('/api/admin/risk'),
    apiClient.get('/api/partners'),
  ]);
  const classificationColors = {
    'High Quality': '#06b6d4',
    'Medium Risk': '#f59e0b',
    'High Risk': '#ef4444',
  };
  const partners = (partnersResponse.data.partners || partnersResponse.data.items || []).filter((partner) => realPartnerSlugs.has(partner.slug));

  return {
    data: {
      stats: statsResponse.data,
      trafficQuality: trafficQualityResponse.data,
      riskClassification: (riskResponse.data.classification || []).map((item) => ({
        ...item,
        fill: classificationColors[item.name] || '#64748b',
      })),
      geographicRisk: (riskResponse.data.geographic || []).map((item) => ({
        country: item.country,
        value: item.value,
      })),
      panelistRegions: (trafficQualityResponse.data.regions || []).map((item) => ({
        country: item.country,
        value: item.value,
      })),
      partnerPerformance: partners.map((partner, index) => {
        const isConnected = partner.slug === 'cpx-research';
        return {
          ...partner,
          displayName: partner.name,
          activeSurveys: isConnected ? partner.activeSurveys ?? partner.surveyCount ?? partner._count?.surveys ?? 0 : 0,
          businessStatus: partner.slug === 'theoremreach' ? 'In discussion' : partner.slug === 'bitlabs' ? 'Promoting' : 'Connected',
          channel: `Channel ${String.fromCharCode(65 + index)}`,
        };
      }),
    },
  };
};

export const getDatabaseExplorer = async ({ table, limit = 20 } = {}) => {
  const response = await apiClient.get('/api/admin/database', {
    params: { table, limit },
  });

  return {
    data: response.data,
  };
};

export const getEmployees = async () => {
  const response = await apiClient.get('/api/admin/users', {
    params: { pageSize: 100 },
  });

  return {
    data: (response.data.items || []).map(mapEmployee),
  };
};

export const createEmployee = async ({ name, email, password, role, tag, groupName }) => {
  const response = await apiClient.post('/api/admin/users', {
    name,
    email,
    password,
    role: role || 'EMPLOYEE',
    groupName: tag || groupName || '',
  });

  return {
    data: mapEmployee(response.data.user),
  };
};

export const updateEmployee = async (id, payload) => {
  const response = await apiClient.put(`/api/admin/users/${id}`, payload);

  return {
    data: mapEmployee(response.data.user),
  };
};

export const deleteEmployee = async (id) => apiClient.delete(`/api/admin/users/${id}`);

export const getTrafficSummary = async () => {
  const response = await apiClient.get('/api/traffic/summary');
  return response.data;
};

export const getTrafficDiagnostics = async () => {
  const response = await apiClient.get('/api/traffic/diagnostics');
  return response.data;
};

export const getTrafficWorkers = async () => {
  const response = await apiClient.get('/api/traffic/workers');
  return response.data;
};

export const getTrafficWorker = async (workerId) => {
  const response = await apiClient.get(`/api/traffic/workers/${workerId}`);
  return response.data;
};

export const importWorkerTrafficTask = async (workerId, payload) => {
  const response = await apiClient.post(`/api/traffic/workers/${workerId}/tasks/import`, payload);
  return response.data;
};

export const bindWorkerTrafficProfile = async (workerId, profileId, payload = {}) => {
  const response = await apiClient.post(`/api/traffic/workers/${workerId}/profiles/${profileId}/bind`, payload);
  return response.data;
};

export const updateWorkerDevice = async (workerId, agentId, payload = {}) => {
  const response = await apiClient.patch(`/api/traffic/workers/${workerId}/devices/${agentId}`, payload);
  return response.data;
};

export const updateWorkerMoreLoginCredential = async (workerId, payload = {}) => {
  const response = await apiClient.put(`/api/traffic/workers/${workerId}/morelogin-credential`, payload);
  return response.data;
};

export const getTrafficTasks = async (params = {}) => {
  const response = await apiClient.get('/api/traffic/tasks', { params });
  return response.data;
};

export const importTrafficTask = async (payload) => {
  const response = await apiClient.post('/api/traffic/tasks/import', payload);
  return response.data;
};

export const assignTrafficTask = async (taskId, payload) => {
  const response = await apiClient.post(`/api/traffic/tasks/${taskId}/assign`, payload);
  return response.data;
};

export const releaseTrafficTask = async (taskId, payload = {}) => {
  const response = await apiClient.post(`/api/traffic/tasks/${taskId}/release`, payload);
  return response.data;
};

export const markTrafficOutcome = async (taskId, payload) => {
  const response = await apiClient.post(`/api/traffic/tasks/${taskId}/outcome`, payload);
  return response.data;
};

export const runTrafficScheduler = async (payload = {}) => {
  const response = await apiClient.post('/api/traffic/scheduler/tick', payload);
  return response.data;
};

export const getTrafficProfiles = async (params = {}) => {
  const response = await apiClient.get('/api/traffic/profiles', { params });
  return response.data;
};

export const createTrafficProfile = async (payload) => {
  const response = await apiClient.post('/api/traffic/profiles', payload);
  return response.data;
};

export const bulkCreateTrafficProfiles = async (payload) => {
  const response = await apiClient.post('/api/traffic/profiles/bulk', payload);
  return response.data;
};

export const updateTrafficProfile = async (profileId, payload) => {
  const response = await apiClient.put(`/api/traffic/profiles/${profileId}`, payload);
  return response.data;
};

export const launchTrafficProfile = async (profileId) => {
  const response = await apiClient.post(`/api/traffic/profiles/${profileId}/launch`);
  return response.data;
};

export const closeTrafficProfile = async (profileId, payload = {}) => {
  const response = await apiClient.post(`/api/traffic/profiles/${profileId}/close`, payload);
  return response.data;
};

export const getTrafficLogs = async (params = {}) => {
  const response = await apiClient.get('/api/traffic/logs', { params });
  return response.data;
};
