import { apiClient } from '../api/client';
import fixtures from './aiBriefTurnFixtures.json';
import generateFixtures from './aiBriefGenerateFixtures.json';

/**
 * The fixtures are the frozen contract. Mock mode only replays them by exact
 * user message; it must not grow its own merge logic.
 */
export const AI_BRIEF_MODE = String(
  import.meta.env?.VITE_AI_BRIEF_MODE || (import.meta.env?.DEV ? 'mock' : 'api'),
).toLowerCase();

export const MOCK_SCENARIOS = fixtures.scenarios.filter((scenario) => scenario.required);

const messageFor = (id, fallback) => fixtures.scenarios.find((scenario) => scenario.id === id)?.request.message || fallback;

// Mock-only command aliases: the fixture text is Chinese, the UI may not be.
// In API mode the page sends the localised command instead.
export const MOCK_COMMANDS = {
  restart: messageFor('06-restart-clears-draft', '算了，重来'),
  custom: messageFor('10-confirm-custom', '按定制研究'),
  qualitative: messageFor('09-confirm-qualitative', '按定性研究支持'),
};

function responseFrom(expect) {
  const { action, reply, draft, missing, assumptions } = expect;
  return structuredClone({ action, reply, draft, missing, assumptions });
}

function mockTurn(request) {
  if (request.command === 'GENERATE') {
    const generate = fixtures.scenarios.find((item) => item.id === '07-generate-command');
    if (generate) return responseFrom(generate.expect);
  }
  const scenario = fixtures.scenarios.find(
    (item) => item.request.message.trim() === String(request.message || '').trim(),
  );
  if (!scenario) {
    const error = new Error('MOCK_SCENARIO_NOT_FOUND');
    error.code = 'MOCK_SCENARIO_NOT_FOUND';
    throw error;
  }
  return responseFrom(scenario.expect);
}

const generatedMockKeys = new Set();

function mockGenerateMode() {
  try {
    const query = new URLSearchParams(window.location.search).get('mockGenerate');
    if (query) return query;
    return window.localStorage.getItem('guanyisearch.business-ai-brief.mock-generate') || 'success';
  } catch {
    return 'success';
  }
}

function generateError(failure) {
  const error = new Error(failure.message || 'AI_BRIEF_GENERATION_FAILED');
  error.code = failure.code;
  error.status = failure.status;
  error.response = { data: failure };
  return error;
}

function mockGenerate(request) {
  const mode = mockGenerateMode();
  if (mode === 'invalid-output' || mode === 'fail') throw generateError(generateFixtures.failures['invalid-output']);
  if (mode === 'unavailable') throw generateError(generateFixtures.failures.unavailable);
  if (mode === 'key-conflict') throw generateError(generateFixtures.failures['key-conflict']);
  if (mode === 'replay') return structuredClone(generateFixtures.replay.data);
  const key = String(request.generationKey || '');
  if (generatedMockKeys.has(key)) return structuredClone(generateFixtures.replay.data);
  generatedMockKeys.add(key);
  return structuredClone(generateFixtures.success.data);
}

export async function generateBriefProject(request) {
  if (AI_BRIEF_MODE === 'mock') return mockGenerate(request);
  const response = await apiClient.post('/api/business/ai-brief/generate', request, { timeout: 150000 });
  return response.data;
}

export async function sendBriefTurn(request) {
  if (AI_BRIEF_MODE === 'mock') return mockTurn(request);
  const response = await apiClient.post('/api/business/ai-brief/turn', request);
  return response.data;
}
