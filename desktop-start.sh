#!/usr/bin/env bash
# ============================================================
# desktop-start.sh — AIFlow 桌面生产模式
# 构建前端，启动 FastAPI + webview 窗口
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
export PYTHONPATH="$ROOT${PYTHONPATH:+:$PYTHONPATH}"

cd "$ROOT"

# Build frontend if not present
if [ ! -d "$ROOT/web/dist" ]; then
    echo "==> Building web frontend..."
    cd "$ROOT/web"
    pnpm install --silent
    pnpm build
    cd "$ROOT"
fi

echo "==> Starting AIFlow Desktop..."
uv run python -c "from src.main import main; main()"
