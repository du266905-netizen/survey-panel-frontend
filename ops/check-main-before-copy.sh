#!/usr/bin/env bash
# 交付前的闸门：确认主工作区没有"我不知道的提交"。
#
# 为什么需要它：交付流程是 `cp 我的副本 → 主工作区`，这是**无条件覆盖**。
# 2026-10-10 就是这样差点回退掉用户自己的一个提交（3a1cd56）——那次侥幸没丢，
# 因为两份内容恰好一致。内容不一致时，覆盖是静默的，git status 之后也是干净的，
# 除非专门比对 HEAD。
#
# 用法：bash ops/check-main-before-copy.sh <主工作区路径>
set -euo pipefail
MAIN="${1:?用法: check-main-before-copy.sh <主工作区路径>}"
W="$(cd "$(dirname "$0")/.." && pwd)"

echo "=== 交付前闸门 ==="
echo "  主工作区: $MAIN"

# ① 主工作区必须干净（有未提交改动说明有人正在那里工作）
DIRTY=$(git -C "$MAIN" status --porcelain | wc -l | tr -d ' ')
if [ "$DIRTY" != "0" ]; then
  echo "  ❌ 主工作区有 $DIRTY 处未提交改动 —— 先问清楚再动，不要覆盖"
  git -C "$MAIN" status --porcelain | head -10 | sed 's/^/       /'
  exit 1
fi
echo "  ✅ 无未提交改动"

# ② 主工作区的 HEAD 必须是我推送后见过的那个
HEAD=$(git -C "$MAIN" rev-parse HEAD)
LAST=$(cat "$W/ops/.last-delivered-head" 2>/dev/null || echo '')
if [ -z "$LAST" ]; then
  echo "  ⚠️ 没有上次交付记录（首次运行）。记录当前 HEAD: $HEAD"
  echo "$HEAD" > "$W/ops/.last-delivered-head"
else
  if [ "$HEAD" != "$LAST" ]; then
    echo "  ℹ️  主工作区 HEAD 变了："
    echo "       上次交付: $LAST"
    echo "       现在 HEAD: $HEAD"
    echo "     中间这些提交不是我推的，先看清楚："
    git -C "$MAIN" log --oneline "$LAST..$HEAD" 2>/dev/null | sed 's/^/       /' || echo "       (无法比对，$LAST 可能已不在历史里)"
    echo "  ❌ 先确认这些提交是什么，再决定是否覆盖"
    exit 1
  fi
  echo "  ✅ HEAD 与上次交付一致（${HEAD}）"
fi
echo "=== 通过 ==="
