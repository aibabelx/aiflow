最终脚本一览
浏览器 / 服务器端
./server-dev.sh       开发模式 — uvicorn hot reload + Vite HMR，浏览器访问 :1420
./server-test.sh      运行测试 — API 端点、模块导入、前端构建验证
./server-start.sh     生产模式 — 构建前端，启动服务器，浏览器访问 :8000
./server-build.sh     构建打包 — Docker 镜像 (build/export/push)

桌面端
./desktop-dev.sh      开发模式 — Vite HMR 前端 + webview debug 窗口
./desktop-test.sh     运行测试 — 桌面模块、PyInstaller 配置、前端 dist 验证
./desktop-start.sh    生产模式 — 构建前端，启动 FastAPI + webview 窗口
./desktop-build.sh    构建打包 — PyInstaller (mac/linux/windows/all)