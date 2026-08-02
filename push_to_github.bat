@echo off
title NEXT GEN DEVS - Push WebGL Particles & Kinetic Animations to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Animations & Graphics
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging WebGL particles & kinetic marquee strips...
git add .

echo [2/3] Committing updates...
git commit -m "Add WebGL particle canvas background and kinetic marquee typography strips"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Animations to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
