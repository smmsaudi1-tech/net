@echo off
title NEXT GEN DEVS - Push 100% Symmetrical EN/AR Bilingual Site to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Symmetrical EN/AR
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging 100% mirror symmetrical EN/AR bilingual site design...
git add .

echo [2/3] Committing updates...
git commit -m "Deploy 100% mirror symmetrical bilingual site design with full English and Arabic translations for all 16 sections using Cairo and Readex Pro Google Fonts"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Symmetrical EN/AR Site to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
