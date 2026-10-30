import fixtures from './documentIntakeFixtures.json';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const summaries = {
  'research-brief-to-editable-draft': 'The document describes a study of annual-plan upgrades among small SaaS teams, with operators as the target audience.',
  'research-theme-needs-details': 'The document mentions a research theme, but does not identify a decision, audience, service type, or method clearly enough to prepare a brief.',
};

export const DOCUMENT_MOCK_CASES = fixtures.cases;

/**
 * Mock only. It replays the frozen case by id and never classifies a real file,
 * infers a service category, or inspects document text.
 */
export async function analyzeDocumentMock(caseId, responseLanguage = 'en') {
  const testCase = fixtures.cases.find((item) => item.id === caseId) || fixtures.cases[0];
  const { expect } = testCase;
  await delay(1100);
  if (expect.httpStatus >= 400) {
    const error = new Error(expect.code || 'AI_DOCUMENT_ANALYSIS_UNAVAILABLE');
    error.status = expect.httpStatus;
    error.code = expect.code;
    error.response = { data: { code: expect.code, message: expect.code } };
    throw error;
  }
  if (expect.outcome === 'REFUSE') {
    return {
      outcome: 'REFUSE',
      source: { kind: testCase.input.kind, retained: false },
    };
  }
  const draft = expect.draft || {
    decision: null,
    audience: null,
    serviceCategory: null,
    studyFormat: null,
    market: null,
    sample: null,
  };
  return {
    outcome: expect.outcome,
    summary: summaries[testCase.id] || (responseLanguage === 'zh' ? '文档中提到了一个研究主题。' : 'The document contains a research theme.'),
    draft,
    missing: expect.missingIncludes || [],
    source: { kind: testCase.input.kind, retained: false },
  };
}
