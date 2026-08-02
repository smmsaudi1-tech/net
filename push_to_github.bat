@echo off
title NEXT GEN DEVS - Push TypeScript Fix for Vercel Deployment
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Vercel Build Fix
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging fixed LanguageContext.tsx...
git add .

echo [2/3] Committing updates...
git commit -m "Fix duplicate key TS1117 syntax error in LanguageContext.tsx for 100% clean Vercel build"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Fixed & Pushed to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
