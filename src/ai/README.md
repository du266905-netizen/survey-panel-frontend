# AiBriefTurn fixtures

`aiBriefTurnFixtures.json` is a generated copy of the frozen contract fixtures:

- source: `../../fixtures/ai-brief-turn/v1/scenarios.json` (workspace root)
- sync: `npm run sync:ai-fixtures` (also runs before `dev` and `build`)

Do not edit the copy by hand. The fixture is the behaviour truth; the mock only
replays it by exact message and must not grow its own merge logic.

## Generate v1 mock

`aiBriefGenerateFixtures.json` is a local replay fixture for
`POST /api/business/ai-brief/generate`. It is not synced from the shared
turn scenarios.

Mock generation defaults to success. To exercise the other frozen states in dev:

- `?mockGenerate=invalid-output` or `?mockGenerate=fail` → 502 invalid output
- `?mockGenerate=unavailable` → 503 unavailable
- `?mockGenerate=key-conflict` → 409 key conflict
- `?mockGenerate=replay` → 200 duplicate response

The same override can be set in localStorage under
`guanyisearch.business-ai-brief.mock-generate`. The page persists one
`generationKey` per draft signature under
`guanyisearch.business-ai-brief.generation.v1`; reset/new chat clears it.
