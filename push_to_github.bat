@echo off
title NEXT GEN DEVS - Push Cybernetic Robot 3D & Bilingual EN/AR System to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Cybernetic 3D & i18n
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging Cybernetic Android 3D Robot & Bilingual EN/AR system...
git add .

echo [2/3] Committing updates...
git commit -m "Deploy Cybernetic Android 3D Robot sculpture + Bilingual Arabic and English (EN/AR) language system with Google Fonts (Cairo, Tajawal, Readex Pro)"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Cybernetic 3D & i18n to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
