@echo off
title NEXT GEN DEVS - Push Fix to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Fix to GitHub
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging all fixed files...
git add .

echo [2/3] Committing fixes...
git commit -m "Fix TypeScript interface exports for Vercel deployment"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed to GitHub!
echo   🚀 Vercel Deployment Will Auto-Trigger & Succeed!
echo ===================================================
echo.
pause
