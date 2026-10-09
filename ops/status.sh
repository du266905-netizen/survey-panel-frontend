#!/usr/bin/env bash
# 唯一的状态打印器 —— 现状只从这里取，不许手写进文档（《交接文档》§1 的来源）。
# 用法: bash <前端仓库>/ops/status.sh
set -uo pipefail

FRONTEND="${FRONTEND:-/Users/mac/Documents/Codex/2026-06-12/build-a-survey-panel-management-platform/work/survey-panel}"
BACKEND="${BACKEND:-/Users/mac/Documents/Codex/2026-06-12/build-a-survey-panel-management-platform/work/survey-panel-backend}"
WORKSPACE="${WORKSPACE:-/Users/mac/Documents/deepseek-harness/default-workspace}"
LIVE="${LIVE:-https://www.guanyi-media.com/business/login}"
BRANCH_FE="${BRANCH_FE:-main}"
BRANCH_BE="${BRANCH_BE:-express-prisma-main}"

hdr() { printf '\n=== %s ===\n' "$1"; }

hdr "前端仓库"
if [ -d "$FRONTEND/.git" ]; then
  printf '  本地 HEAD      %s\n' "$(git -C "$FRONTEND" rev-parse --short HEAD)"
  printf '  远端引用       %s\n' "$(git -C "$FRONTEND" rev-parse --short "origin/$BRANCH_FE" 2>/dev/null || echo '（无）')"
  printf '  未提交         %s 条\n' "$(git -C "$FRONTEND" status --porcelain | wc -l | tr -d ' ')"
  printf '  领先远端       %s 条\n' "$(git -C "$FRONTEND" rev-list --count "origin/$BRANCH_FE..HEAD" 2>/dev/null || echo '（无远端引用）')"
else
  printf '  ❌ 找不到仓库: %s\n' "$FRONTEND"
fi

hdr "线上（外部可见的事实）"
ASSETS=$(curl -s -m 15 "$LIVE" | grep -o 'assets/index-[A-Za-z0-9_-]*\.\(js\|css\)' | sort -u | tr '\n' ' ')
printf '  首页资源       %s\n' "${ASSETS:-（取不到，可能网络或域名问题）}"

hdr "后端仓库"
if [ -d "$BACKEND/.git" ]; then
  printf '  本地 HEAD      %s\n' "$(git -C "$BACKEND" rev-parse --short HEAD)"
  printf '  远端引用       %s' "$(git -C "$BACKEND" rev-parse --short "origin/$BRANCH_BE" 2>/dev/null || echo '（无）')"
  REF="$BACKEND/.git/refs/remotes/origin/$BRANCH_BE"
  [ -f "$REF" ] && printf '（引用最后更新 %s）' "$(stat -f '%Sm' "$REF")"
  printf '\n'
  printf '  未提交         %s 条（他人/在建，勿动）\n' "$(git -C "$BACKEND" status --porcelain | wc -l | tr -d ' ')"
  printf '  凭据探测       %s\n' "$(GIT_TERMINAL_PROMPT=0 git -C "$BACKEND" ls-remote origin "$BRANCH_BE" 2>&1 | head -1 | cut -c1-80)"
  printf '  真实来源       生产服务器（用户 2026-10-10 定：先部署服务器，git 推送与核验推后）\n'
else
  printf '  ❌ 找不到仓库: %s\n' "$BACKEND"
fi

hdr "交付记录 / 文档"
printf '  上次交付 HEAD  %s\n' "$(cat "$(dirname "$0")/.last-delivered-head" 2>/dev/null || echo '（无）')"
printf '  交接文档       %s（%s 行）\n' "$WORKSPACE/交接文档.md" "$(wc -l < "$WORKSPACE/交接文档.md" 2>/dev/null | tr -d ' ' || echo '?')"
printf '  闸门清单       %s\n' "$WORKSPACE/闸门清单.md"
printf '\n  说明：本脚本只打印事实；任何"应该没问题"的判断都不属于这里。\n'
