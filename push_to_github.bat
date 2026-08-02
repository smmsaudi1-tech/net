@echo off
title NEXT GEN DEVS - Push GSAP & Case Studies to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push GSAP Updates
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging GSAP & Case Studies components...
git add .

echo [2/3] Committing updates...
git commit -m "Add GSAP ScrollTrigger pinned track & Editorial Case Studies for all production projects"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed GSAP & Case Studies to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
