import { apiClient, getStoredUser, normalizeUser, persistSession } from './client';
import { isAdminRole } from '../utils/roles';

const channelPalette = ['#10b981', '#2563eb', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#64748b'];
const channelNames = ['Channel A', 'Channel B', 'Channel C', 'Channel D', 'Channel E', 'Channel F', 'Channel G'];
const partnerSlugs = ['gwss', 'za-survey', 'wwi', 'opx', 'mr', 'bitlabs', 'cpx-research', 'theoremreach'];

const theoremReachPartner = {
  id: 'theoremreach',
  slug: 'theoremreach',
  name: 'Theorem Reach',
  displayName: 'Theorem Reach',
  codeName: 'Channel G',
  channelLetter: 'G',
  channelColor: '#7c3aed',
  activeSurveys: 0,
  conversion: 'Active',
  isSynthetic: false,
};

const isAdmin = () => isAdminRole(getStoredUser()?.role);

const codeForIndex = (index) => {
  const safeIndex = Math.max(0, index);
  return {
    codeName: channelNames[safeIndex % channelNames.length],
    channelColor: channelPalette[safeIndex % channelPalette.length],
    channelLetter: String.fromCharCode(65 + (safeIndex % channelNames.length)),
  };
};

const codeForPartner = (partner) => codeForIndex(partnerSlugs.indexOf(partner?.slug));

const displayPartnerName = (partner) => {
  if (isAdmin()) return partner?.name || '-';
  return codeForPartner(partner).codeName;
};

const ensureCpxPartner = (partners) => {
  const nextPartners = partners.some((partner) => partner.slug === 'cpx-research')
    ? partners
    : [
        ...partners,
        {
          id: 'cpx-research',
          name: 'CPX Research',
          slug: 'cpx-research',
          logoUrl: null,
          isSynthetic: true,
        },
      ];

  if (nextPartners.some((partner) => partner.slug === 'theoremreach')) return nextPartners;

  return [...nextPartners, theoremReachPartner];
};

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

const statusToUi = (status) => String(status || '').toLowerCase();

const mapRecord = (record) => ({
  ...record,
  surveyNumber: record.survey?.externalId || record.surveyId,
  surveyId: record.survey?.externalId || record.surveyId,
  platform: displayPartnerName(record.partner) || record.partnerId,
  employee: record.user?.displayName || record.user?.email || '-',
  ip: record.ipAddress,
  coins: record.coinsEarned,
  coinsReward: record.coinsEarned,
  status: statusToUi(record.status),
  time: record.auditTime || record.createdAt,
  startTime: record.startTime,
  auditTime: record.auditTime || '-',
});

const mapSurvey = (survey, partnerContext) => ({
  ...survey,
  pid: survey.clientId || survey.id,
  surveyId: survey.externalId,
  partnerDisplayName: partnerContext?.displayName || partnerContext?.name || survey.partner?.name,
  partnerCodeName: partnerContext?.codeName,
  channelColor: partnerContext?.channelColor,
  clicks: survey.clicks ?? Math.max(0, survey.sampleSize - survey.remaining),
  completes: survey.completes ?? 0,
  quota: survey.sampleSize,
});

const mapEmployee = (user) => ({
  ...user,
  name: user.displayName || user.name || '-',
  roleLabel: String(user.role || 'EMPLOYEE').toUpperCase() === 'ADMIN' ? 'ADMIN' : 'EMPLOYEE',
  isActive: user.isActive !== false,
});

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
  const partners = ensureCpxPartner(response.data.partners || []);
  const counts = await Promise.all(
    partners.map((partner) =>
      partner.isSynthetic
        ? Promise.resolve(0)
        : apiClient
            .get(`/api/partners/${partner.id}/surveys`, { params: { pageSize: 1 } })
            .then((surveyResponse) => surveyResponse.data.meta?.total || 0)
            .catch(() => 0)
    )
  );

  return {
    data: partners.map((partner, index) => {
      const channelCode = partner.codeName
        ? {
            codeName: partner.codeName,
            channelColor: partner.channelColor,
            channelLetter: partner.channelLetter,
          }
        : codeForIndex(index);

      return {
        ...partner,
        ...channelCode,
        displayName: partner.displayName || partner.name,
        name: isAdmin() ? partner.name : channelCode.codeName,
        activeSurveys: partner.activeSurveys ?? counts[index],
        conversion: partner.conversion || 'Live',
      };
    }),
  };
};

export const getSurveysByPartner = async (partnerId) => {
  const [partnerResponse, response] = await Promise.all([
    apiClient.get(`/api/partners/${partnerId}`).catch(() => ({ data: { partner: null } })),
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
    data: (response.data.items || []).map((survey) => mapSurvey(survey, partnerContext)),
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

export const startSurvey = async ({ surveyId, proxyIp, fingerprintBrowser, operatingSystem, linkType }) =>
  apiClient.post('/api/surveys/start', {
    surveyId,
    proxyIp,
    fingerprintBrowser,
    operatingSystem,
    linkType,
  });

export const getAdminDashboard = async () => {
  const [statsResponse, riskResponse] = await Promise.all([apiClient.get('/api/admin/stats'), apiClient.get('/api/admin/risk')]);
  const classificationColors = {
    'High Quality': '#22c55e',
    'Medium Risk': '#f59e0b',
    'High Risk': '#ef4444',
  };

  return {
    data: {
      stats: statsResponse.data,
      riskClassification: (riskResponse.data.classification || []).map((item) => ({
        ...item,
        fill: classificationColors[item.name] || '#64748b',
      })),
      geographicRisk: (riskResponse.data.geographic || []).map((item) => ({
        country: item.country,
        highQuality: item.value,
        mediumRisk: 0,
        highRisk: 0,
      })),
      dailyRiskTrend: [],
    },
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

export const createEmployee = async ({ name, email, password, role }) => {
  const response = await apiClient.post('/api/admin/users', {
    name,
    email,
    password,
    role: role || 'EMPLOYEE',
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
