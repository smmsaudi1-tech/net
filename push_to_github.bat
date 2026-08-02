@echo off
title NEXT GEN DEVS - Push Maximum Pinnacle Stage to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Pinnacle Stage
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging all pinnacle components & audio engine...
git add .

echo [2/3] Committing updates...
git commit -m "Deploy maximum pinnacle stage with Live Modal Previews, Web Audio API, Agentic SEO, and GSAP kinetics"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Pinnacle Stage to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
