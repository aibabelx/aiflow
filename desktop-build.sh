#!/usr/bin/env bash
# ============================================================
# desktop-build.sh — AIFlow 桌面打包
# PyInstaller 构建 macOS / Linux / Windows 桌面应用
# 用法:
#   ./desktop-build.sh             构建当前平台
#   ./desktop-build.sh mac         构建 macOS .app + .dmg
#   ./desktop-build.sh linux       构建 Linux 可执行文件
#   ./desktop-build.sh windows     交叉构建 Windows .exe (需要 wine)
#   ./desktop-build.sh all         构建所有平台（当前平台完整包，其他仅可执行文件）
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

VERSION=$(uv run python -c "from src import __version__; print(__version__)" 2>/dev/null || echo "0.1.0")
PLATFORM=$(uname -s | tr '[:upper:]' '[:lower:]')

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${GREEN}[BUILD]${NC} $*"; }
warn() { echo -e "${RED}[WARN]${NC}  $*"; }
info() { echo -e "${CYAN}[INFO]${NC}  $*"; }

# ── Build frontend ──────────────────────────────
build_frontend() {
    if [ ! -d "$ROOT/web/dist" ]; then
        log "Building web frontend..."
        cd "$ROOT/web" && pnpm install --silent && pnpm build
        cd "$ROOT"
    else
        info "web/dist already exists, skip. Run 'pnpm build' in web/ to rebuild."
    fi
}

# ── PyInstaller ─────────────────────────────────
run_pyinstaller() {
    log "Running PyInstaller..."
    uv run pyinstaller aiflow.spec --clean --noconfirm
}

# ── macOS .app + .dmg ───────────────────────────
package_macos() {
    local app_name="AIFlow"
    local app_dir="dist/${app_name}.app"
    local dmg_name="dist/AIFlow-${VERSION}-macOS-arm64.dmg"

    log "Creating macOS .app bundle..."

    rm -rf "$app_dir"
    mkdir -p "$app_dir/Contents/MacOS"
    mkdir -p "$app_dir/Contents/Resources"

    cp "dist/$app_name" "$app_dir/Contents/MacOS/"

    cat > "$app_dir/Contents/Info.plist" << PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>$app_name</string>
    <key>CFBundleName</key>
    <string>$app_name</string>
    <key>CFBundleDisplayName</key>
    <string>AIFlow</string>
    <key>CFBundleVersion</key>
    <string>$VERSION</string>
    <key>CFBundleShortVersionString</key>
    <string>$VERSION</string>
    <key>CFBundlePackageType</key>
    <string>APPL</string>
    <key>CFBundleIdentifier</key>
    <string>com.aiflow.desktop</string>
    <key>LSMinimumSystemVersion</key>
    <string>12.0</string>
    <key>NSHighResolutionCapable</key>
    <true/>
</dict>
</plist>
PLIST

    log "Creating .dmg..."
    hdiutil create -volname "AIFlow" -srcfolder "$app_dir" \
        -ov -format UDZO "$dmg_name" 2>/dev/null

    log "macOS artifacts:"
    echo "    $app_dir"
    echo "    $dmg_name ($(du -h "$dmg_name" | cut -f1))"
}

# ── Linux ───────────────────────────────────────
package_linux() {
    local arch
    arch=$(uname -m)
    local pkg="dist/AIFlow-${VERSION}-linux-${arch}"

    log "Packaging Linux binary..."
    tar -czf "${pkg}.tar.gz" -C dist AIFlow
    log "Linux artifact: ${pkg}.tar.gz ($(du -h "${pkg}.tar.gz" | cut -f1))"

    if command -v appimagetool &>/dev/null; then
        log "Creating AppImage..."
        local appdir="dist/AIFlow.AppDir"
        mkdir -p "$appdir/usr/bin"
        cp "dist/AIFlow" "$appdir/usr/bin/"

        cat > "$appdir/aiflow.desktop" << 'EOF'
[Desktop Entry]
Name=AIFlow
Exec=AIFlow
Type=Application
Categories=Utility;
EOF
        cat > "$appdir/AppRun" << 'EOF'
#!/bin/sh
DIR="$(dirname "$(readlink -f "$0")")"
exec "$DIR/usr/bin/AIFlow" "$@"
EOF
        chmod +x "$appdir/AppRun"

        ARCH=$arch appimagetool "$appdir" "${pkg}.AppImage" 2>/dev/null
        log "Linux AppImage: ${pkg}.AppImage"
        rm -rf "$appdir"
    fi
}

# ── Windows ─────────────────────────────────────
package_windows() {
    local pkg="dist/AIFlow-${VERSION}-windows-amd64"
    log "Packaging Windows executable..."
    if command -v zip &>/dev/null; then
        zip -jq "${pkg}.zip" dist/AIFlow.exe 2>/dev/null
        log "Windows artifact: ${pkg}.zip ($(du -h "${pkg}.zip" | cut -f1))"
    else
        log "Windows artifact: dist/AIFlow.exe"
    fi
}

# ── Build current platform ──────────────────────
build_current() {
    build_frontend
    run_pyinstaller

    case "$PLATFORM" in
        darwin)    package_macos ;;
        linux)     package_linux ;;
        mingw*|msys*|cygwin*) package_windows ;;
        *) warn "Unknown platform: $PLATFORM. Binary in dist/" ;;
    esac

    log "Build complete."
}

# ── Main ────────────────────────────────────────
case "${1:-}" in
    mac|darwin)
        build_frontend
        run_pyinstaller
        package_macos
        ;;
    linux)
        build_frontend
        run_pyinstaller
        package_linux
        ;;
    windows|win)
        build_frontend
        run_pyinstaller
        package_windows
        ;;
    all)
        build_frontend
        run_pyinstaller
        case "$PLATFORM" in
            darwin) package_macos ;;
            linux)  package_linux ;;
            *)      package_windows ;;
        esac
        log "All builds complete. For cross-platform, run on target OS."
        ;;
    *)
        build_current
        ;;
esac
