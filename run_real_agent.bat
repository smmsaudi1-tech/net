@echo off
title NEXUS - Real Network Agent Server
color 0B

echo ===================================================
echo   NEXUS -- Real Local Network Discovery Agent
echo ===================================================
echo.

cd /d "%~dp0"

echo [*] Starting Real Local ARP Scanner Server on Port 3001...
echo [*] Scanning your local Wi-Fi / Router subnet...
echo.

node server/index.cjs

pause
