import sys
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from starlette.responses import FileResponse, Response

from src.api.router import api_router


def _get_web_dist() -> Path:
    if getattr(sys, "frozen", False):
        base = Path(sys._MEIPASS)
    else:
        base = Path(__file__).resolve().parent.parent
    return base / "web" / "dist"


def _create_spa_fallback(app: FastAPI, dist: Path) -> None:
    index_html = dist / "index.html"

    @app.middleware("http")
    async def _spa_middleware(request: Request, call_next) -> Response:
        response = await call_next(request)
        if response.status_code == 404 and not request.url.path.startswith("/api"):
            return FileResponse(index_html)
        return response


def create_app() -> FastAPI:
    app = FastAPI(title="AIFlow", version="0.1.0")

    app.include_router(api_router, prefix="/api")

    dist = _get_web_dist()
    if dist.exists():
        app.mount("/assets", StaticFiles(directory=dist / "assets"), name="assets")
        app.mount("/", StaticFiles(directory=dist, html=True), name="spa")
        _create_spa_fallback(app, dist)

    return app
