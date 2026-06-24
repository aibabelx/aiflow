# ── Stage 1: Build frontend ──────────────────────────────
FROM node:22-alpine AS web-builder
WORKDIR /web
COPY web/package.json web/pnpm-lock.yaml web/pnpm-workspace.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile
COPY web/ ./
RUN pnpm build

# ── Stage 2: Runtime ─────────────────────────────────────
FROM python:3.13-slim
LABEL org.opencontainers.image.title="AIFlow Server"
LABEL org.opencontainers.image.description="AI workflow orchestration"

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies from lock file
COPY pyproject.toml uv.lock ./
RUN pip install --no-cache-dir uv \
    && uv pip install --system --no-cache fastapi uvicorn[standard] aiofiles \
    && rm -rf $(pip cache dir)

# Copy source
COPY src/ ./src/

# Copy built frontend
COPY --from=web-builder /web/dist ./web/dist

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/api/health || exit 1

CMD ["uvicorn", "src.app:create_app", "--factory", "--host", "0.0.0.0", "--port", "8000"]
