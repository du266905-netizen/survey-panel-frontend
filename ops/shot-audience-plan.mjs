// 交互式截图：进 audience-plan 第一页 → 填必填 → 点"下一步" → 截第二页。
//
// 之所以要单独这一个：`ops/verify-routes.mjs` 只截静态路由，而这个问题只在
// 第二页出现，必须真的点进去才看得到。
//
//   BASE=http://127.0.0.1:4173 SESSION_TOKEN=<jwt> OUT=<dir> node ops/shot-audience-plan.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.BASE || 'http://127.0.0.1:4173';
const TOKEN = process.env.SESSION_TOKEN || '';
const OUT = process.env.OUT || 'ops/verify-out';
const PORT = Number(process.env.GATE_CDP_PORT || 9333);
mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const target = list.find((entry) => entry.type === 'page');
  if (!target) throw new Error('no Chrome page target; start Chrome with --remote-debugging-port');
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => ws.addEventListener('open', resolve));

  let id = 0;
  const pending = new Map();
  const consoleErrors = [];
  ws.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
    if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') {
      consoleErrors.push(message.params.args.map((a) => a.value || a.description).join(' '));
    }
    if (message.method === 'Runtime.exceptionThrown') {
      consoleErrors.push(message.params.exceptionDetails.text || 'exception');
    }
  });
  const send = (method, params = {}) => new Promise((resolve) => {
    const messageId = ++id;
    pending.set(messageId, resolve);
    ws.send(JSON.stringify({ id: messageId, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    return result.result?.result?.value;
  };

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });

  // 会话注入：与 verify-routes 相同的写法
  const user = { id: process.env.SESSION_USER_ID || 'probe', role: 'business', email: 'probe@e.test', displayName: 'Probe' };
  await send('Page.navigate', { url: `${BASE}/` });
  await sleep(1200);
  await evaluate(`localStorage.setItem('surveyToken', ${JSON.stringify(TOKEN)});
                  localStorage.setItem('surveyUser', ${JSON.stringify(JSON.stringify(user))}); 'ok'`);

  await send('Page.navigate', { url: `${BASE}/business/audience-plan` });
  await sleep(2500);
  await evaluate(`(() => {
    const set = (el, value) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const setArea = (el, value) => {
      const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
      setter.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };
    const inputs = [...document.querySelectorAll('input, textarea')];
    if (inputs[0]) set(inputs[0], '可行性测试');
    if (inputs[1]) setArea(inputs[1], '我们要决定是否进入沙特市场，需要了解当地受访者的真实看法与障碍。');
    if (inputs[2]) setArea(inputs[2], '沙特与阿联酋的普通消费者');
    return inputs.length;
  })()`);
  await sleep(600);
  const clicked = await evaluate(`(() => {
    const button = [...document.querySelectorAll('button')].find((b) => /continue|next|下一步/i.test(b.textContent || ''));
    if (!button) return 'no-next-button';
    button.click();
    return 'clicked';
  })()`);
  await sleep(1500);

  const shape = await evaluate(`(() => {
    const grid = document.querySelector('.business-custom-request-grid');
    if (!grid) return { grid: false };
    const label = grid.querySelector('label');
    const style = label ? getComputedStyle(label) : null;
    return {
      grid: true,
      labels: grid.querySelectorAll('label').length,
      labelBorderTop: style?.borderTopWidth,
      labelBorderBottom: style?.borderBottomWidth,
      labelBorderLeft: style?.borderLeftWidth,
    };
  })()`);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  const file = join(OUT, 'audience-plan-step2-1440.png');
  writeFileSync(file, Buffer.from(shot.result.data, 'base64'));

  // 顺带截第一页做对照
  await send('Page.navigate', { url: `${BASE}/business/audience-plan` });
  await sleep(2200);
  const shot1 = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync(join(OUT, 'audience-plan-step1-1440.png'), Buffer.from(shot1.result.data, 'base64'));

  console.log(`clicked=${clicked}`);
  console.log(`step2 grid=${shape.grid} labels=${shape.labels} labelBorders(top/bottom/left)=${shape.labelBorderTop}/${shape.labelBorderBottom}/${shape.labelBorderLeft}`);
  console.log(`screenshots=${file} + audience-plan-step1-1440.png`);
  console.log(`consoleErrors=${consoleErrors.length}`);
  ws.close();
}

main().catch((error) => { console.error(error); process.exit(1); });
