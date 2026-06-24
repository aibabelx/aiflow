#!/usr/bin/env bash
# ============================================================
# server-dev.sh — AIFlow 服务器开发模式
# 启动 uvicorn hot reload + Vite dev server 代理
# 浏览器打开 http://localhost:8000
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
export PYTHONPATH="$ROOT${PYTHONPATH:+:$PYTHONPATH}"
PORT="${AIFLOW_PORT:-8000}"

cd "$ROOT"

check_deps() {
    if ! command -v pnpm &>/dev/null; then
        echo "[ERR] pnpm not found. Install: npm i -g pnpm"
        exit 1
    fi
}

install_frontend() {
    if [ ! -d "$ROOT/web/node_modules" ]; then
        echo "==> Installing frontend deps..."
        cd "$ROOT/web" && pnpm install --silent
        cd "$ROOT"
    fi
}

cleanup() {
    echo ""
    echo "==> Shutting down..."
    kill $VITE_PID 2>/dev/null || true
    kill $UVICORN_PID 2>/dev/null || true
    exit 0
}
trap cleanup INT TERM

check_deps
install_frontend

echo "==========================================="
echo "  AIFlow Server [DEV MODE]"
echo "  → Frontend:  http://localhost:1420 (Vite dev)"
echo "  → Backend:   http://localhost:$PORT (uvicorn)"
echo "  → Open:      http://localhost:1420"
echo "  → Press Ctrl+C to stop"
echo "==========================================="

# Start Vite dev server (hot reload frontend)
cd "$ROOT/web"
pnpm dev &
VITE_PID=$!
cd "$ROOT"

# Start uvicorn with hot reload
uv run uvicorn src.app:create_app --factory --host 0.0.0.0 --port "$PORT" --reload &
UVICORN_PID=$!

wait
