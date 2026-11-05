import { apiClient } from '../api/client';

/* One endpoint for the two question-level actions: rewrite a prompt, or propose
 * options for it. The brief is passed along because a good rewrite depends on
 * who the study talks to, not just on the sentence.
 *
 * The backend endpoint does not exist yet; until it does the call fails and the
 * panel says so instead of inventing text. In development a fixture is used so
 * the interface can be worked on. */

const ASSIST_ENDPOINT = '/api/business/ai-brief/assist';

const devFixture = (request) => {
  const prompt = String(request.prompt || '').trim();
  if (request.mode === 'options') {
    const base = prompt.replace(/[？?。.]$/, '');
    return {
      candidates: [
        `${base}——主要看重哪一点？`,
        '您目前是怎么做的？',
        '哪些方面最影响您的选择？',
        '如果只能改一处，您希望改什么？',
      ],
    };
  }
  return {
    candidates: [
      prompt.replace(/您/g, '你'),
      `在最近三个月里，${prompt.replace(/^过去三个月[，,]?/, '')}`,
      prompt.replace(/[？?]$/, '？').replace(/最/g, '比较'),
    ].filter(Boolean),
  };
};

export async function assistQuestion({ mode, prompt, choices, brief }) {
  const request = { mode, prompt, choices: choices || [], brief: brief || '' };
  if (import.meta.env.DEV) return { data: devFixture(request), mocked: true };
  const response = await apiClient.post(ASSIST_ENDPOINT, request, { timeout: 60000 });
  return { data: response.data, mocked: false };
}
