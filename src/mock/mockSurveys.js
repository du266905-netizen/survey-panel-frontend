const countries = ['US', 'UK', 'CA', 'AU', 'DE', 'FR', 'SG', 'JP'];
const topics = ['Streaming Habits', 'Mobile Banking', 'Home Appliances', 'Travel Intent', 'Gaming Spend', 'Health Products', 'Retail Loyalty', 'B2B Software'];

export const mockSurveys = Array.from({ length: 36 }, (_, index) => {
  const partnerIds = ['gwss', 'za-survey', 'wwi', 'opx', 'mr', 'bitlabs'];
  const partnerId = partnerIds[index % partnerIds.length];
  const reward = [1.25, 1.85, 2.1, 2.75, 3.4, 4.2][index % 6];

  return {
    pid: `PID-${String(7000 + index).padStart(5, '0')}`,
    partnerId,
    surveyId: `${partnerId.toUpperCase().replace('-', '')}-${22000 + index}`,
    surveyName: `${topics[index % topics.length]} Study ${index + 1}`,
    country: countries[index % countries.length],
    loi: 6 + (index % 8) * 3,
    ir: 18 + (index % 9) * 6,
    clicks: 80 + index * 17,
    completes: 12 + index * 4,
    quota: 100 + (index % 5) * 50,
    reward,
  };
});
