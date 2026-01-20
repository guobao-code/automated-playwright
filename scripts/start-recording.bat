@echo off
chcp 65001 > nul
cls

echo ╔════════════════════════════════════════════════════════════╗
echo ║           Playwright 录制辅助工具                          ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo 📋 可用录制模块：
echo.
echo   1. 认证模块 - 登录、退出、用户信息
echo   2. 排行榜模块 - 自然榜、最强榜、赛事榜
echo   3. 体育测试模块 - 所有测试项目
echo   4. 组织管理模块 - 成员、班级、角色
echo   5. 测试计划模块 - 创建、编辑、删除计划
echo   6. 赛事管理模块 - 创建、编辑、删除赛事
echo.

set /p choice="请选择要录制的模块 (1-6): "

if "%choice%"=="1" (
    echo ✅ 已选择: 认证模块
    echo 📝 请录制: 密码登录 -^> 用户信息 -^> 退出登录
    echo.
    echo 🚀 正在启动录制工具...
    npx playwright codegen https://www.aisports.cn/integratedServicesSy --output=tests/recording-auth.spec.ts
) else if "%choice%"=="2" (
    echo ✅ 已选择: 排行榜模块
    echo 📝 请录制: 自然榜 -^> 筛选 -^> 导出 -^> 最强榜 -^> 赛事榜
    echo.
    echo 🚀 正在启动录制工具...
    npx playwright codegen https://www.aisports.cn/integratedServicesSy --output=tests/recording-leaderboard.spec.ts
) else if "%choice%"=="3" (
    echo ✅ 已选择: 体育测试模块
    echo 📝 请录制: 测试项目列表 -^> 50米跑 -^> 跳绳 -^> 筛选 -^> 导出
    echo.
    echo 🚀 正在启动录制工具...
    npx playwright codegen https://www.aisports.cn/integratedServicesSy --output=tests/recording-sports.spec.ts
) else if "%choice%"=="4" (
    echo ✅ 已选择: 组织管理模块
    echo 📝 请录制: 成员列表 -^> 搜索 -^> 导入 -^> 导出 -^> 班级管理
    echo.
    echo 🚀 正在启动录制工具...
    npx playwright codegen https://www.aisports.cn/integratedServicesSy --output=tests/recording-organization.spec.ts
) else if "%choice%"=="5" (
    echo ✅ 已选择: 测试计划模块
    echo 📝 请录制: 新建计划 -^> 选择项目 -^> 设置标准 -^> 查看 -^> 导出
    echo.
    echo 🚀 正在启动录制工具...
    npx playwright codegen https://www.aisports.cn/integratedServicesSy --output=tests/recording-testplan.spec.ts
) else if "%choice%"=="6" (
    echo ✅ 已选择: 赛事管理模块
    echo 📝 请录制: 新建赛事 -^> 选择赛项 -^> 发布 -^> 查看 -^> 导出
    echo.
    echo 🚀 正在启动录制工具...
    npx playwright codegen https://www.aisports.cn/integratedServicesSy --output=tests/recording-event.spec.ts
) else (
    echo ❌ 无效选择！
    pause
)
