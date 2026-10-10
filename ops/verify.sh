#!/usr/bin/env bash
# 前端上线门（G-09）—— 推 main 之前必须 exit 0。
#
# 挡的事故：假阳性验证、视觉事故、阶梯外字号（见《闸门清单》G-09）。
# 通过标准（原文四条）：
#   ① build ✓
#   ② 真路由 1440/390 截图
#   ③ 控制台无异常
#   ④ 字号检查全绿（= ops/check-tokens.js 通过）
#
# 用法：
#   bash ops/verify.sh                    # 只跑公开路由
#   SESSION_TOKEN=<JWT> bash ops/verify.sh  # 额外跑登录后的研究端路由（开着小助手）
#
# 说明：
#   - 脚本自己 build 并用 `vite preview` 起产物（不是 dev server），所以验的是**真构建产物**；
#   - 截图与原始输出落在 ops/verify-out/（可删，不入库）；
#   - SESSION_TOKEN 缺省时，需要登录的路由会**明确标记为跳过**，不会假装通过。
set -uo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NODE="${NODE:-$(command -v node)}"
PORT="${PORT:-4173}"
BASE="http://127.0.0.1:${PORT}"
OUT="$REPO_ROOT/ops/verify-out"
CHROME="${CHROME:-/Applications/Google Chrome.app/Contents/MacOS/Google Chrome}"

pass=0; fail=0; skip=0
ok(){   printf '  ✅ %s\n' "$1"; pass=$((pass+1)); }
bad(){  printf '  ❌ %s\n' "$1"; fail=$((fail+1)); }
note(){ printf '  ⚠️  跳过：%s\n' "$1"; skip=$((skip+1)); }

mkdir -p "$OUT"
echo "=== 前端上线门 G-09：$REPO_ROOT ==="

# ── ① build ────────────────────────────────────────────────────────────────
echo
echo "① 构建"
if (cd "$REPO_ROOT" && npm run build >"$OUT/build.log" 2>&1); then
  ok "npm run build 通过（产物 dist/）"
else
  bad "npm run build 失败，见 ops/verify-out/build.log"
  tail -20 "$OUT/build.log" | sed 's/^/      /'
  echo
  echo "--- 合计：通过 ${pass}，失败 ${fail}，跳过 $skip ---"
  exit 1
fi
BUILD_FILES=$(find "$REPO_ROOT/dist/assets" -maxdepth 1 -name 'index-*.js' -o -maxdepth 1 -name 'index-*.css' 2>/dev/null | wc -l | tr -d ' ')
[ "$BUILD_FILES" -ge 2 ] && ok "产物含 index-*.js 与 index-*.css" || bad "产物不完整（找到 $BUILD_FILES 个 index-*）"

# ── ④ 字号 ────────────────────────────────────────────────────────────────
echo
echo "④ 字号检查（全量扫 src/，与基线比对）"
if "$NODE" "$REPO_ROOT/ops/check-tokens.js" >"$OUT/check-tokens.log" 2>&1; then
  ok "$(grep -o '没有文件比基线多' "$OUT/check-tokens.log" | head -1 || echo 'check-tokens 通过')"
else
  bad "check-tokens 未通过，见 ops/verify-out/check-tokens.log"
  grep -E '❌|档外字号' "$OUT/check-tokens.log" | head -6 | sed 's/^/      /'
fi

# ── ② ③ 真路由截图 + 控制台 ─────────────────────────────────────────────────
echo
echo "② ③ 真路由截图与控制台（vite preview + Chrome）"
if [ ! -x "$CHROME" ]; then
  note "找不到 Chrome（${CHROME}），② ③ 无法执行"
else
  (cd "$REPO_ROOT" && npx vite preview --port "$PORT" --strictPort >"$OUT/preview.log" 2>&1) &
  PREVIEW_PID=$!
  cleanup(){ kill "$PREVIEW_PID" 2>/dev/null; }
  trap cleanup EXIT
  for _ in $(seq 1 40); do
    curl -fsS -m 2 "$BASE/" >/dev/null 2>&1 && break
    sleep 0.5
  done
  if ! curl -fsS -m 3 "$BASE/" >/dev/null 2>&1; then
    bad "vite preview 没起来，见 ops/verify-out/preview.log"
  else
    ok "vite preview 起来了（${BASE}，验的是构建产物）"
    GATE_BASE="$BASE" GATE_OUT="$OUT" GATE_TOKEN="${SESSION_TOKEN:-}" GATE_CHROME="$CHROME" \
      "$NODE" "$REPO_ROOT/ops/verify-routes.mjs"
    ROUTE_EXIT=$?
    if [ "$ROUTE_EXIT" -eq 0 ]; then ok "真路由截图与控制台断言通过"
    else bad "真路由/控制台断言未通过（exit ${ROUTE_EXIT}），见 ops/verify-out/routes.log"; fi
    [ -n "${SESSION_TOKEN:-}" ] || note "研究端登录路由（SESSION_TOKEN 未提供）"
  fi
fi

echo
echo "--- 合计：通过 ${pass}，失败 ${fail}，跳过 $skip ---"
echo "    截图与原始输出：ops/verify-out/"
[ "$fail" -eq 0 ] || exit 1
[ "$skip" -eq 0 ] || exit 3
