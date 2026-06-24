import sys
from pathlib import Path

a = Analysis(
    ["src/desktop/launcher.py"],
    pathex=[],
    binaries=[],
    datas=[
        ("web/dist", "web/dist"),
    ],
    hiddenimports=[
        "webview.platforms.cocoa",
        "webview.platforms.winforms",
        "webview.platforms.gtk",
        "webview.js",
        "uvicorn.loops.auto",
        "uvicorn.logging",
        "uvicorn.protocols",
        "src.api",
        "src.api.health",
        "src.api.router",
        "src.app",
        "src.desktop",
        "src.desktop.config",
        "src.desktop.launcher",
        "src.main",
        "src.tools",
        "src.tools.bash",
        "src.tools.file_operators",
        "src.tools.planning",
        "src.tools.web_search",
        "src.tools.search",
        "src.core",
        "src.llms",
        "src.graph",
        "src.workflow",
        "src.agents",
        "src.sys",
        "src.utils",
    ],
    hookspath=[],
    hooksconfig={},
    runtime_hooks=[],
    excludes=["pip", "setuptools"],
    noarchive=False,
)

pyz = PYZ(a.pure)

exe = EXE(
    pyz,
    a.scripts,
    a.binaries,
    a.datas,
    a.zipfiles,
    name="AIFlow",
    debug=False,
    strip=False,
    upx=True,
    console=False,
    icon=None,
    target_architecture=None,
)
