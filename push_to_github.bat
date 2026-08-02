@echo off
title NEXT GEN DEVS - Push Light Mode Fix & 3D Canvas Sizing to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Light Mode Fix
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging Light/Dark mode fixes & 3D canvas sizing...
git add .

echo [2/3] Committing updates...
git commit -m "Fix Light Mode color overrides across all components & guarantee 3D WebGL Canvas initialization and sizing"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Light Mode Fix to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
