import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, '../fixtures/ai-brief-turn/v1/scenarios.json');
const target = resolve(root, 'src/ai/aiBriefTurnFixtures.json');

if (!existsSync(source)) {
  console.warn('[ai-fixtures] canonical fixture not found; keeping the current copy.');
  process.exit(0);
}

mkdirSync(dirname(target), { recursive: true });
copyFileSync(source, target);
console.log('[ai-fixtures] synced from fixtures/ai-brief-turn/v1/scenarios.json');
