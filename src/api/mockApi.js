// LEGACY MOCK SYSTEM - DO NOT USE IN PRODUCTION
// Deprecated. Kept only for UI development mock data.
// All business data has moved to /api/realApi.js.

const throwDeprecatedMockApi = () => {
  throw new Error('mockApi is deprecated. Use src/api/realApi.js for all business data.');
};

export const login = throwDeprecatedMockApi;
export const getDashboard = throwDeprecatedMockApi;
export const getPartners = throwDeprecatedMockApi;
export const getSurveysByPartner = throwDeprecatedMockApi;
export const getRecords = throwDeprecatedMockApi;
export const startSurvey = throwDeprecatedMockApi;
export const getAdminDashboard = throwDeprecatedMockApi;
export const getEmployees = throwDeprecatedMockApi;
export const createEmployee = throwDeprecatedMockApi;
export const updateEmployee = throwDeprecatedMockApi;
export const deleteEmployee = throwDeprecatedMockApi;
