#!/usr/bin/env node
/**
 * Production smoke gate.
 *
 * Runs the paths that have actually broken in production (CORS 403, route 404,
 * save 400, dead site) against the real origin — the same origin a browser
 * uses, not server-to-server. Run it after every deploy and before calling a
 * release done.
 *
 *   node ops/prod-smoke.mjs                 # anonymous checks only
 *   SMOKE_EMAIL=... SMOKE_PASSWORD=... \
 *     node ops/prod-smoke.mjs               # + login / create draft / save / delete
 *
 * Exit code 0 = every check passed. Any failure prints what came back.
 * No dependency on the app bundle; Node 22+ (global fetch).
 */
const BASE = process.env.SMOKE_BASE || 'https://www.guanyisearch.com';
const API = process.env.SMOKE_API || 'https://api.guanyi-media.com';
const ORIGIN = new URL(BASE).origin;
const EMAIL = process.env.SMOKE_EMAIL || '';
const PASSWORD = process.env.SMOKE_PASSWORD || '';
const TIMEOUT = Number(process.env.SMOKE_TIMEOUT_MS || 15000);

const results = [];

async function check(name, fn) {
  const started = Date.now();
  try {
    const detail = await fn();
    results.push({ name, ok: true, detail, ms: Date.now() - started });
  } catch (error) {
    results.push({ name, ok: false, detail: error.message, ms: Date.now() - started });
  }
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { Origin: ORIGIN, ...(options.headers || {}) },
    signal: AbortSignal.timeout(TIMEOUT),
  });
  const text = await response.text();
  let json = null;
  try { json = JSON.parse(text); } catch { /* html or empty */ }
  return { status: response.status, headers: response.headers, text, json };
}

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

const preflight = (path, method = 'POST') => request(`${API}${path}`, {
  method: 'OPTIONS',
  headers: {
    'Access-Control-Request-Method': method,
    'Access-Control-Request-Headers': 'authorization,content-type',
  },
});

/* --- anonymous checks ---------------------------------------------------- */

await check('site responds', async () => {
  const res = await request(`${BASE}/`);
  expect(res.status === 200, `GET / -> ${res.status}`);
  const bundle = (res.text.match(/assets\/index-[A-Za-z0-9_-]+\.js/) || [])[0];
  expect(bundle, 'index bundle not referenced');
  return bundle;
});

await check('business page responds', async () => {
  const res = await request(`${BASE}/business/access`);
  expect(res.status === 200, `GET /business/access -> ${res.status}`);
  return '200';
});

await check('api health', async () => {
  const res = await request(`${API}/health`);
  expect(res.status === 200, `GET /health -> ${res.status}`);
  expect(res.json?.status === 'ok', `health payload: ${res.text.slice(0, 120)}`);
  return 'ok';
});

const criticalPreflights = [
  ['/api/auth/login', 'POST'],
  ['/api/auth/register', 'POST'],
  ['/api/business/workspace', 'GET'],
  ['/api/business/projects', 'POST'],
  ['/api/business/questionnaire-drafts', 'GET'],
];

for (const [path, method] of criticalPreflights) {
  await check(`cors ${method} ${path}`, async () => {
    const res = await preflight(path, method);
    if (res.status === 403) throw new Error(`403 ${res.json?.code || ''} — origin ${ORIGIN} is not allow-listed`);
    expect(res.status === 204, `preflight -> ${res.status}`);
    const allow = res.headers.get('access-control-allow-origin') || '';
    expect(allow === ORIGIN || allow === '*', `allow-origin "${allow}" does not match ${ORIGIN}`);
    return '204';
  });
}

await check('workspace requires auth (not 403/404)', async () => {
  const res = await request(`${API}/api/business/workspace`);
  expect(res.status === 401, `GET /api/business/workspace -> ${res.status} ${res.json?.code || ''}`);
  return '401';
});

/* --- authenticated path (only with credentials) -------------------------- */

let createdProjectId = null;

if (EMAIL && PASSWORD) {
  let token = '';

  await check('login', async () => {
    const res = await request(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    });
    expect(res.status === 200, `login -> ${res.status} ${res.json?.message || ''}`);
    token = res.json?.token || res.json?.accessToken || '';
    expect(token, 'login response has no token');
    return '200';
  });

  if (token) {
    const auth = { Authorization: `Bearer ${token}` };

    await check('create draft', async () => {
      const res = await request(`${API}/api/business/projects`, {
        method: 'POST',
        headers: { ...auth, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `[smoke] ${new Date().toISOString()}`,
          researchGoal: 'Production smoke check. Safe to delete.',
          audienceDescription: 'Smoke test audience.',
          studyFormat: 'SURVEY',
          serviceCategory: 'SURVEY',
          countries: '',
          languages: '',
          incentiveBudget: 'NEED_GUIDANCE',
          additionalContext: '',
          selfServiceQuestionnaire: true,
        }),
      });
      expect([200, 201].includes(res.status), `create -> ${res.status} ${res.json?.message || ''}`);
      createdProjectId = res.json?.project?.id || '';
      expect(createdProjectId, 'create response has no project id');
      return createdProjectId;
    });

    await check('save questionnaire', async () => {
      expect(createdProjectId, 'no project to save');
      const projectRes = await request(`${API}/api/business/projects/${createdProjectId}`, { headers: auth });
      expect(projectRes.status === 200, `GET project -> ${projectRes.status}`);
      const questionnaire = projectRes.json?.project?.questionnaire;
      expect(questionnaire, 'project has no questionnaire');
      const body = {
        title: questionnaire.title || '[smoke] draft',
        coverDescription: questionnaire.coverDescription || '',
        collectionMode: 'AUDIENCE_SOURCING',
        isCollecting: false,
        questions: (questionnaire.questions || []).map(({ type, section, prompt, required, choices, settings, logic }) => ({
          type, section, prompt, required, choices, settings, logic,
        })),
      };
      const res = await request(`${API}/api/business/projects/${createdProjectId}/questionnaire`, {
        method: 'PUT',
        headers: { ...auth, 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      expect(res.status === 200, `PUT questionnaire -> ${res.status} ${res.json?.code || res.json?.message || ''}`);
      return '200';
    });

    await check('cleanup draft', async () => {
      expect(createdProjectId, 'no project to delete');
      const res = await request(`${API}/api/business/projects/${createdProjectId}`, {
        method: 'DELETE',
        headers: auth,
      });
      expect([200, 204].includes(res.status), `DELETE -> ${res.status}`);
      createdProjectId = null;
      return 'deleted';
    });
  }
} else {
  results.push({ name: 'authenticated path', ok: null, detail: 'skipped (set SMOKE_EMAIL / SMOKE_PASSWORD)', ms: 0 });
}

/* --- report -------------------------------------------------------------- */

if (createdProjectId) {
  console.error(`\nWARNING: smoke project ${createdProjectId} was left behind (cleanup failed).`);
}

let failed = 0;
console.log(`\nProduction smoke · ${new Date().toISOString()} · ${ORIGIN} -> ${API}\n`);
for (const row of results) {
  const mark = row.ok === null ? '–' : row.ok ? '✓' : '✗';
  if (row.ok === false) failed += 1;
  console.log(`${mark} ${row.name.padEnd(38)} ${String(row.detail).slice(0, 90)}  ${row.ms}ms`);
}
console.log(`\n${results.length - failed - results.filter((r) => r.ok === null).length}/${results.filter((r) => r.ok !== null).length} passed\n`);
process.exit(failed ? 1 : 0);
