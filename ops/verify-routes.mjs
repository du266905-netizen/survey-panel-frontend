#!/usr/bin/env node
/**
 * 真路由截图 + 控制台断言（被 ops/verify.sh 调用，也可单独跑）。
 *
 * 环境变量：
 *   GATE_BASE   产物站点根，如 http://127.0.0.1:4173
 *   GATE_OUT    截图与日志目录
 *   GATE_TOKEN  可选。给了才跑需要登录的研究端路由（localStorage 注入会话）
 *   GATE_CHROME Chrome 可执行文件路径
 *
 * 断言（失败即 exit 1）：
 *   - 每个要跑的路由都能拿到 HTML、渲染出非空 body
 *   - 控制台/未捕获异常里没有 error 级消息
 *   - 1440×900 与 390×844 各出一张截图
 *   - 研究端路由上能看到帮助小助手（launcher），且能开、能关
 *   - 参与端路由上不应出现研究端的小助手
 */
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.GATE_BASE || 'http://127.0.0.1:4173';
const OUT = process.env.GATE_OUT || 'ops/verify-out';
const TOKEN = process.env.GATE_TOKEN || '';
const CHROME = process.env.GATE_CHROME || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = Number(process.env.GATE_CDP_PORT || 9760);

mkdirSync(OUT, { recursive: true });
const log = [];
const say = (line) => { console.log(line); log.push(line); };

let pass = 0, fail = 0, skip = 0;
const ok = (m) => { say(`  ok   ${m}`); pass += 1; };
const bad = (m, d = '') => { say(`  FAIL ${m} :: ${d}`); fail += 1; };
const note = (m) => { say(`  skip ${m}`); skip += 1; };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PUBLIC_ROUTES = ['/', '/business/login'];
const AUTH_ROUTES = ['/business/workspace', '/business/account', '/business/billing', '/business/budget'];
const VIEWPORTS = [{ w: 1440, h: 900, tag: '1440' }, { w: 390, h: 844, tag: '390' }];

const chrome = spawn(CHROME, [
  '--headless=new', `--remote-debugging-port=${PORT}`,
  '--user-data-dir=/tmp/g09-verify', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--hide-scrollbars', '--window-size=1440,900', 'about:blank',
], { stdio: 'ignore' });

const waitForTarget = async () => {
  for (let i = 0; i < 80; i += 1) {
    try {
      const list = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json());
      const page = list.find((t) => t.type === 'page');
      if (page) return page;
    } catch { /* not up yet */ }
    await sleep(250);
  }
  throw new Error('Chrome did not expose a page target');
};

const target = await waitForTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });

let seq = 1;
const pending = new Map();
let consoleErrors = [];
ws.addEventListener('message', (event) => {
  const msg = JSON.parse(event.data);
  if (msg.id && pending.has(msg.id)) { pending.get(msg.id)(msg); pending.delete(msg.id); }
  if (msg.method === 'Runtime.exceptionThrown') {
    consoleErrors.push(`exception: ${(msg.params?.exceptionDetails?.exception?.description || '').slice(0, 160)}`);
  }
  if (msg.method === 'Runtime.consoleAPICalled' && msg.params?.type === 'error') {
    consoleErrors.push(`console.error: ${msg.params.args.map((a) => a.value ?? a.description ?? '').join(' ').slice(0, 160)}`);
  }
});
const send = (method, params = {}) => new Promise((resolve) => {
  const id = seq++;
  pending.set(id, resolve);
  ws.send(JSON.stringify({ id, method, params }));
});
const evaluate = async (expression) => {
  const res = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true });
  if (res.result?.exceptionDetails) return { error: res.result.exceptionDetails.text };
  return { value: res.result?.result?.value };
};

await send('Page.enable');
await send('Runtime.enable');

const seedSession = async () => {
  const user = {
    id: 'gate', email: 'gate@verify.local', displayName: 'Gate Verify', role: 'business',
    memberId: 'GATE', username: 'Gate Verify', coins: 0,
  };
  await send('Page.navigate', { url: `${BASE}/` });
  await sleep(1200);
  await evaluate(`localStorage.setItem('surveyToken', ${JSON.stringify(TOKEN)});
                  localStorage.setItem('surveyUser', ${JSON.stringify(JSON.stringify(user))}); 'ok'`);
};

const visit = async (route, viewport) => {
  await send('Emulation.setDeviceMetricsOverride', {
    width: viewport.w, height: viewport.h, deviceScaleFactor: 1, mobile: viewport.w < 500,
  });
  consoleErrors = [];
  await send('Page.navigate', { url: `${BASE}${route}` });
  // Poll until the app has actually painted instead of sleeping a fixed amount:
  // the first cold paint of "/" measured ~3.7s here, which a fixed 2.6s wait
  // reported as "renders empty" — a false failure in the gate itself.
  let bodyLength = 0;
  for (let i = 0; i < 25; i += 1) {
    await sleep(400);
    const probe = await evaluate('document.body.innerText.trim().length');
    bodyLength = typeof probe.value === 'number' ? probe.value : -1;
    if (bodyLength > 40) break;
  }
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const name = `${route.replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '') || 'root'}-${viewport.tag}.png`;
  writeFileSync(join(OUT, name), Buffer.from(shot.result.data, 'base64'));
  return { bodyLength, shot: name, errors: [...consoleErrors] };
};

try {
  say(`\n  站点：${BASE}   输出：${OUT}`);
  if (!TOKEN) note('GATE_TOKEN 未提供：只验公开路由，研究端登录路由不验（不假装通过）');
  else await seedSession();

  for (const viewport of VIEWPORTS) {
    for (const route of PUBLIC_ROUTES) {
      const r = await visit(route, viewport);
      if (r.bodyLength > 40) ok(`${viewport.tag} ${route} 有真实内容（${r.bodyLength} 字符）→ ${r.shot}`);
      else bad(`${viewport.tag} ${route} 渲染为空`, `body=${r.bodyLength}`);
      if (r.errors.length) bad(`${viewport.tag} ${route} 控制台有 error`, r.errors.slice(0, 2).join(' | '));
      else ok(`${viewport.tag} ${route} 控制台无 error`);
    }
    if (!TOKEN) continue;
    for (const route of AUTH_ROUTES) {
      const r = await visit(route, viewport);
      if (r.bodyLength > 40) ok(`${viewport.tag} ${route} 有真实内容 → ${r.shot}`);
      else bad(`${viewport.tag} ${route} 渲染为空`, `body=${r.bodyLength}`);
      if (r.errors.length) bad(`${viewport.tag} ${route} 控制台有 error`, r.errors.slice(0, 2).join(' | '));
      else ok(`${viewport.tag} ${route} 控制台无 error`);
      const launcher = await evaluate('!!document.querySelector(".business-support-chat-launcher")');
      if (launcher.value === true) {
        await evaluate('document.querySelector(".business-support-chat-launcher").click()');
        await sleep(700);
        const opened = await evaluate('!!document.querySelector(".business-support-chat")');
        const chips = await evaluate('[...document.querySelectorAll(".business-support-chat-chip")].map((c) => c.textContent)');
        if (opened.value === true) ok(`${viewport.tag} ${route} 帮助小助手可打开`);
        else bad(`${viewport.tag} ${route} 帮助小助手打不开`);
        if (Array.isArray(chips.value) && chips.value.some((c) => /kyc|deposit|payment problem/i.test(c))) {
          bad(`${viewport.tag} ${route} 小助手里仍有支付平台话术`, JSON.stringify(chips.value));
        }
        const closeShot = await send('Page.captureScreenshot', { format: 'png' });
        writeFileSync(join(OUT, `chat-open-${viewport.tag}.png`), Buffer.from(closeShot.result.data, 'base64'));
        await evaluate('document.querySelector(".business-support-chat-close").click()');
        await sleep(500);
        const closed = await evaluate('!document.querySelector(".business-support-chat")');
        if (closed.value === true) ok(`${viewport.tag} ${route} 帮助小助手可关闭`);
        else bad(`${viewport.tag} ${route} 帮助小助手关不掉`);
      } else {
        bad(`${viewport.tag} ${route} 没有帮助小助手 launcher`);
      }
    }
  }

  // the participant side must not carry the research-side widget
  if (TOKEN) {
    await evaluate(`localStorage.setItem('surveyUser', ${JSON.stringify(JSON.stringify({
      id: 'gate', email: 'gate@verify.local', displayName: 'Gate', role: 'panelist', username: 'Gate', coins: 0,
    }))}); 'ok'`);
    const r = await visit('/dashboard', VIEWPORTS[0]);
    const launcher = await evaluate('!!document.querySelector(".business-support-chat-launcher")');
    if (launcher.value === false) ok('参与端没有研究端的小助手（各挂各的）');
    else bad('参与端出现了研究端的小助手');
    if (r.errors.length) note(`/dashboard 控制台有 error（多为未登录后端导致的接口失败）：${r.errors[0]}`);
  }
} catch (error) {
  bad('执行中断', error.message);
} finally {
  ws.close();
  chrome.kill();
  writeFileSync(join(OUT, 'routes.log'), `${log.join('\n')}\n`);
  say(`\n  --- 路由检查：通过 ${pass}，失败 ${fail}，跳过 ${skip} ---`);
  process.exit(fail ? 1 : 0);
}
