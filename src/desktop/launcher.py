import logging
import signal
import threading
import time

import uvicorn
import webview
from src.app import create_app
from src.desktop.config import DesktopConfig

logger = logging.getLogger(__name__)


class FastAPIRunner:
    def __init__(self, config: DesktopConfig):
        self.config = config
        self._server: uvicorn.Server | None = None
        self._actual_port: int = config.fastapi_port

    @property
    def port(self) -> int:
        return self._actual_port

    def _find_free_port(self, start: int, attempts: int = 10) -> int:
        import socket

        for offset in range(attempts):
            port = start + offset
            with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
                if s.connect_ex(("127.0.0.1", port)) != 0:
                    return port
        return start

    def start(self):
        self._actual_port = self._find_free_port(self.config.fastapi_port)
        app = create_app()
        self._server = uvicorn.Server(
            uvicorn.Config(
                app,
                host="127.0.0.1",
                port=self._actual_port,
                log_level="info",
            )
        )
        thread = threading.Thread(target=self._server.run, daemon=True)
        thread.start()

    def wait_until_ready(self, timeout: float = 10.0):
        import urllib.request

        deadline = time.time() + timeout
        last_error = None
        while time.time() < deadline:
            try:
                url = f"http://127.0.0.1:{self._actual_port}/api/health"
                with urllib.request.urlopen(url, timeout=1) as resp:
                    if resp.status == 200:
                        return
            except Exception as exc:
                last_error = exc
            time.sleep(0.2)
        raise TimeoutError(
            f"FastAPI did not start on port {self._actual_port} within {timeout}s"
        ) from last_error

    def stop(self):
        if self._server:
            self._server.should_exit = True


def main():
    config = DesktopConfig.from_env()
    runner = FastAPIRunner(config)

    runner.start()
    runner.wait_until_ready()

    if config.dev_mode:
        url = f"http://localhost:{config.vite_port}"
    else:
        url = f"http://localhost:{runner.port}"

    window = webview.create_window(
        title=config.window_title,
        url=url,
        width=config.window_width,
        height=config.window_height,
        resizable=True,
        confirm_close=True,
    )

    signal.signal(signal.SIGINT, lambda s, f: window.destroy())
    signal.signal(signal.SIGTERM, lambda s, f: window.destroy())

    webview.start(debug=config.dev_mode)

    runner.stop()


if __name__ == "__main__":
    main()
