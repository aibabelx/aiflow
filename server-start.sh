#!/usr/bin/env bash
# ============================================================
# server-start.sh — AIFlow 服务器生产模式
# 构建前端，启动 uvicorn，浏览器打开 http://localhost:8000
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
export PYTHONPATH="$ROOT${PYTHONPATH:+:$PYTHONPATH}"
PORT="${AIFLOW_PORT:-8000}"
HOST="${AIFLOW_HOST:-0.0.0.0}"

cd "$ROOT"

# Build frontend if not present
if [ ! -d "$ROOT/web/dist" ]; then
    echo "==> Building web frontend..."
    cd "$ROOT/web"
    pnpm install --silent
    pnpm build
    cd "$ROOT"
fi

echo "==========================================="
echo "  AIFlow Server"
echo "  → http://localhost:$PORT"
echo "  → Press Ctrl+C to stop"
echo "==========================================="

uv run uvicorn src.app:create_app --factory --host "$HOST" --port "$PORT"
