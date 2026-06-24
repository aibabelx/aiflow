"""AIFlow entry point.

Commands:
    server   — Run FastAPI server only (no webview window)
    desktop  — Run full desktop app (FastAPI + webview, default)
"""

import sys

import uvicorn


def run_server():
    uvicorn.run(
        "src.app:create_app",
        host="127.0.0.1",
        port=8000,
        reload=True,
        factory=True,
    )


def main():
    if len(sys.argv) > 1 and sys.argv[1] == "server":
        run_server()
    else:
        from src.desktop.launcher import main as desktop_main

        desktop_main()


if __name__ == "__main__":
    main()
