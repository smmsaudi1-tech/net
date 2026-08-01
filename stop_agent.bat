@echo off
title NEXUS - Stop Background Agent
color 0C

echo ===================================================
echo   Stopping NEXUS Real Local Network Agent...
echo ===================================================
echo.

taskkill /f /im node.exe >nul 2>&1

echo [*] Background Agent Stopped Successfully.
echo.
pause
