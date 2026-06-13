export const mockRecords = Array.from({ length: 28 }, (_, index) => {
  const platforms = ['GWSS', 'ZA Survey', 'WWI', 'OPX', 'MR', 'BitLabs'];
  const statuses = ['completed', 'pending', 'failed'];
  const status = statuses[index % statuses.length];
  const day = String(12 - (index % 12)).padStart(2, '0');

  return {
    surveyNumber: `SR-${20260600 + index}`,
    surveyId: `SV-${90000 + index}`,
    platform: platforms[index % platforms.length],
    ipAddress: `104.28.${40 + index}.${12 + index}`,
    coinsReward: [90, 125, 180, 240, 310][index % 5],
    amount: [0.9, 1.25, 1.8, 2.4, 3.1][index % 5],
    status,
    startTime: `2026-06-${day} ${String(9 + (index % 8)).padStart(2, '0')}:15`,
    auditTime: status === 'pending' ? '-' : `2026-06-${day} ${String(10 + (index % 8)).padStart(2, '0')}:42`,
  };
});

export const recentActivities = mockRecords
  .filter((record) => record.status === 'completed')
  .slice(0, 10)
  .map((record) => ({
    surveyId: record.surveyId,
    platform: record.platform,
    ip: record.ipAddress,
    coins: record.coinsReward,
    status: record.status,
    time: record.auditTime,
  }));
