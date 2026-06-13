import { apiClient, normalizeUser, persistSession } from './client';

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
  platform: record.partner?.name || record.partnerId,
  ip: record.ipAddress,
  coins: record.coinsEarned,
  coinsReward: record.coinsEarned,
  status: statusToUi(record.status),
  time: record.auditTime || record.createdAt,
  startTime: record.startTime,
  auditTime: record.auditTime || '-',
});

const mapSurvey = (survey) => ({
  ...survey,
  pid: survey.clientId || survey.id,
  surveyId: survey.externalId,
  clicks: survey.clicks ?? Math.max(0, survey.sampleSize - survey.remaining),
  completes: survey.completes ?? 0,
  quota: survey.sampleSize,
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
  const partners = response.data.partners || [];
  const counts = await Promise.all(
    partners.map((partner) =>
      apiClient
        .get(`/api/partners/${partner.id}/surveys`, { params: { pageSize: 1 } })
        .then((surveyResponse) => surveyResponse.data.meta?.total || 0)
        .catch(() => 0)
    )
  );

  return {
    data: partners.map((partner, index) => ({
      ...partner,
      activeSurveys: counts[index],
      conversion: 'Live',
    })),
  };
};

export const getSurveysByPartner = async (partnerId) => {
  const response = await apiClient.get(`/api/partners/${partnerId}/surveys`, {
    params: { pageSize: 100 },
  });

  return {
    data: (response.data.items || []).map(mapSurvey),
  };
};

export const getRecords = async () => {
  const response = await apiClient.get('/api/records', {
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
