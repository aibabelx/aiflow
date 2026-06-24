#!/usr/bin/env bash
# ============================================================
# desktop-dev.sh — AIFlow 桌面开发模式
# Vite 热更新前端 + webview debug 窗口
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
export PYTHONPATH="$ROOT${PYTHONPATH:+:$PYTHONPATH}"
export AIFLOW_DEV=1

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
    exit 0
}
trap cleanup INT TERM

check_deps
install_frontend

echo "==========================================="
echo "  AIFlow Desktop [DEV MODE]"
echo "  → Frontend: http://localhost:1420 (Vite HMR)"
echo "  → Backend:  http://localhost:8000 (auto)"
echo "==========================================="

# Start Vite dev server
cd "$ROOT/web"
pnpm dev &
VITE_PID=$!
cd "$ROOT"

sleep 2

# Start desktop app (webview connects to Vite dev server)
uv run python -c "from src.main import main; main()"

cleanup
