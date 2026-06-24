import os
from dataclasses import dataclass


@dataclass(frozen=True)
class DesktopConfig:
    dev_mode: bool
    fastapi_port: int = 8000
    vite_port: int = 1420
    window_width: int = 1280
    window_height: int = 800
    window_title: str = "AIFlow"

    @classmethod
    def from_env(cls) -> "DesktopConfig":
        return cls(
            dev_mode=os.environ.get("AIFLOW_DEV", "0") == "1",
            fastapi_port=int(os.environ.get("AIFLOW_PORT", "8000")),
            vite_port=int(os.environ.get("AIFLOW_VITE_PORT", "1420")),
        )
