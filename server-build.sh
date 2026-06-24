#!/usr/bin/env bash
# ============================================================
# server-build.sh — AIFlow 服务器构建打包
# 打包 Docker 镜像，导出 tar.gz，推送到 registry
# 用法:
#   ./server-build.sh           构建 Docker 镜像
#   ./server-build.sh export    构建 + 导出 tar.gz
#   ./server-build.sh push      构建 + 推送 registry
# ============================================================
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

VERSION=$(uv run python -c "from src import __version__; print(__version__)" 2>/dev/null || echo "0.1.0")
IMAGE="aiflow-server"

build_frontend() {
    if [ ! -d "$ROOT/web/dist" ]; then
        echo "==> Building frontend..."
        cd "$ROOT/web" && pnpm install --silent && pnpm build
        cd "$ROOT"
    fi
}

build_docker() {
    echo "==> Building Docker image: $IMAGE:$VERSION"
    docker build \
        -t "$IMAGE:$VERSION" \
        -t "$IMAGE:latest" \
        -f "$ROOT/deploy/docker/Dockerfile" \
        "$ROOT"
    echo "  [OK] $IMAGE:$VERSION"
    echo "  [OK] $IMAGE:latest"
}

export_image() {
    mkdir -p "$ROOT/dist"
    local out="$ROOT/dist/aiflow-server-${VERSION}.tar.gz"
    echo "==> Exporting image to $out"
    docker save "$IMAGE:$VERSION" | gzip > "$out"
    echo "  [OK] $out ($(du -h "$out" | cut -f1))"
}

push_image() {
    local registry="${DOCKER_REGISTRY:-}"
    if [ -z "$registry" ]; then
        echo "[ERR] Set DOCKER_REGISTRY env var (e.g. DOCKER_REGISTRY=registry.example.com)"
        exit 1
    fi
    echo "==> Pushing to $registry..."
    docker tag "$IMAGE:$VERSION" "$registry/$IMAGE:$VERSION"
    docker tag "$IMAGE:$VERSION" "$registry/$IMAGE:latest"
    docker push "$registry/$IMAGE:$VERSION"
    docker push "$registry/$IMAGE:latest"
    echo "  [OK] $registry/$IMAGE:$VERSION"
    echo "  [OK] $registry/$IMAGE:latest"
}

# ── Main ────────────────────────────────────────
build_frontend

case "${1:-build}" in
    build)
        build_docker
        ;;
    export)
        build_docker
        export_image
        ;;
    push)
        build_docker
        push_image
        ;;
    *)
        echo "Usage: $0 {build|export|push}"
        exit 1
        ;;
esac
