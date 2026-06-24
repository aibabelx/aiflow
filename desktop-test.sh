#!/usr/bin/env bash
# ============================================================
# desktop-test.sh — AIFlow 桌面端测试
# 验证 PyInstaller 入口、webview 相关模块、打包配置
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
export PYTHONPATH="$ROOT${PYTHONPATH:+:$PYTHONPATH}"

cd "$ROOT"

PASS=0
FAIL=0

echo "==========================================="
echo "  AIFlow Desktop Tests"
echo "==========================================="

# ── 1. Desktop imports ─────────────────────────
echo ""
echo "[1/4] Desktop module imports..."
if uv run python -c "
from src.desktop.launcher import FastAPIRunner, main
from src.desktop.config import DesktopConfig
from src.main import main as entry_main
from src.app import create_app
print('OK')
" 2>&1 | grep -q "OK"; then
    echo "  [PASS] All desktop modules import correctly"
    PASS=$((PASS + 1))
else
    echo "  [FAIL] Desktop module import failed"
    FAIL=$((FAIL + 1))
fi

# ── 2. Desktop config ──────────────────────────
echo ""
echo "[2/4] Desktop configuration..."
RESULT=$(uv run python -c "
from src.desktop.config import DesktopConfig
c = DesktopConfig.from_env()
print(f'dev={c.dev_mode},port={c.fastapi_port},title={c.window_title}')
")
if echo "$RESULT" | grep -q "title=AIFlow"; then
    echo "  [PASS] $RESULT"
    PASS=$((PASS + 1))
else
    echo "  [FAIL] Config test failed: $RESULT"
    FAIL=$((FAIL + 1))
fi

# ── 3. PyInstaller spec check ──────────────────
echo ""
echo "[3/4] PyInstaller spec validation..."
if [ -f "$ROOT/aiflow.spec" ]; then
    # Check that key hidden imports exist in spec
    ISSUES=0
    for mod in "src.desktop.launcher" "src.app" "src.api.router" "webview.js"; do
        if ! grep -q "\"$mod\"" "$ROOT/aiflow.spec"; then
            echo "  [WARN] Hidden import '$mod' not in aiflow.spec"
            ISSUES=$((ISSUES + 1))
        fi
    done
    if [ $ISSUES -eq 0 ]; then
        echo "  [PASS] aiflow.spec looks valid"
        PASS=$((PASS + 1))
    else
        echo "  [FAIL] aiflow.spec missing $ISSUES hidden imports"
        FAIL=$((FAIL + 1))
    fi
else
    echo "  [FAIL] aiflow.spec not found"
    FAIL=$((FAIL + 1))
fi

# ── 4. Frontend dist check ─────────────────────
echo ""
echo "[4/4] Frontend dist for desktop packaging..."
if [ ! -d "$ROOT/web/dist" ]; then
    echo "==> Building frontend..."
    cd "$ROOT/web" && pnpm install --silent && pnpm build
    cd "$ROOT"
fi
if [ -f "$ROOT/web/dist/index.html" ] && [ -d "$ROOT/web/dist/assets" ]; then
    echo "  [PASS] web/dist ready for PyInstaller packaging"
    PASS=$((PASS + 1))
else
    echo "  [FAIL] web/dist missing or incomplete"
    FAIL=$((FAIL + 1))
fi

# ── Summary ────────────────────────────────────
echo ""
echo "==========================================="
echo "  Results: $PASS passed, $FAIL failed"
echo "==========================================="

if [ $FAIL -gt 0 ]; then
    exit 1
fi
