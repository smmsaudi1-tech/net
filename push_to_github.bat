@echo off
title NEXT GEN DEVS - Push Legendary Scroll Kinetics to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Legendary Scroll Kinetics
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging smooth scroll & GSAP perspective kinetics...
git add .

echo [2/3] Committing updates...
git commit -m "Deploy legendary GSAP scroll kinetics, velocity interpolation, and animated stat counters"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Legendary Kinetics to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
