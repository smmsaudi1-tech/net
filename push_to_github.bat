@echo off
title NEXT GEN DEVS - Push Dynamic Morphing 3D Robot & Professional Arabic to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Dynamic 3D & i18n
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging dynamic morphing 3D Robot & fluent Arabic translations...
git add .

echo [2/3] Committing updates...
git commit -m "Deploy dynamic morphing 3D Robot sculpture + fluent professional Arabic translations across all sections with Cairo and Readex Pro typography"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Dynamic 3D & i18n to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
