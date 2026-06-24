#!/usr/bin/env bash
# ============================================================
# server-test.sh — AIFlow 服务器测试
# 运行后端 API 测试 + 前端构建验证
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
export PYTHONPATH="$ROOT${PYTHONPATH:+:$PYTHONPATH}"
PORT=18000  # use non-standard port to avoid conflicts

cd "$ROOT"

PASS=0
FAIL=0

check() {
    local desc="$1"
    local result="$2"
    local expected="$3"
    if echo "$result" | grep -q "$expected"; then
        echo "  [PASS] $desc"
        PASS=$((PASS + 1))
    else
        echo "  [FAIL] $desc"
        echo "         expected: $expected"
        echo "         got:      $result"
        FAIL=$((FAIL + 1))
    fi
}

echo "==========================================="
echo "  AIFlow Server Tests"
echo "==========================================="

# ── 1. Import check ────────────────────────────
echo ""
echo "[1/5] Module imports..."
if uv run python -c "
from src.app import create_app
from src.api.router import api_router
from src.api.health import router
print('OK')
" 2>&1 | grep -q "OK"; then
    echo "  [PASS] All modules import correctly"
    PASS=$((PASS + 1))
else
    echo "  [FAIL] Module import failed"
    FAIL=$((FAIL + 1))
fi

# ── 2. Build frontend if needed ────────────────
echo ""
echo "[2/5] Frontend build..."
if [ ! -d "$ROOT/web/dist" ]; then
    cd "$ROOT/web"
    pnpm install --silent
    pnpm build
    cd "$ROOT"
fi
if [ -f "$ROOT/web/dist/index.html" ] && [ -d "$ROOT/web/dist/assets" ]; then
    echo "  [PASS] Frontend built: $(ls "$ROOT/web/dist/assets/"*.js 2>/dev/null | head -1)"
    PASS=$((PASS + 1))
else
    echo "  [FAIL] Frontend build output missing"
    FAIL=$((FAIL + 1))
fi

# ── 3. Start server ────────────────────────────
echo ""
echo "[3/5] Server startup..."
uv run uvicorn src.app:create_app --factory --host 127.0.0.1 --port $PORT &
SERVER_PID=$!
sleep 2

if kill -0 $SERVER_PID 2>/dev/null; then
    echo "  [PASS] Server started on port $PORT"
    PASS=$((PASS + 1))
else
    echo "  [FAIL] Server failed to start"
    FAIL=$((FAIL + 1))
    exit 1
fi

# ── 4. API tests ───────────────────────────────
echo ""
echo "[4/5] API endpoints..."

HEALTH=$(curl -s http://127.0.0.1:$PORT/api/health)
check "GET /api/health returns 200" "$HEALTH" '"status":"ok"'

INDEX=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$PORT/)
check "GET / returns 200" "$INDEX" "200"

SPA=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$PORT/some-page)
check "GET /some-page returns 200 (SPA fallback)" "$SPA" "200"

API_404=$(curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:$PORT/api/nonexistent)
check "GET /api/nonexistent returns 404" "$API_404" "404"

# ── 5. Cleanup ─────────────────────────────────
echo ""
echo "[5/5] Cleanup..."
kill $SERVER_PID 2>/dev/null || true
echo "  [PASS] Server stopped"
PASS=$((PASS + 1))

# ── Summary ────────────────────────────────────
echo ""
echo "==========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "==========================================="

if [ $FAIL -gt 0 ]; then
    exit 1
fi
