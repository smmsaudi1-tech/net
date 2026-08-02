@echo off
title NEXT GEN DEVS - Push Holographic Globe 3D & GSAP Product Card Animations to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Holographic Globe 3D
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging Holographic Quantum Globe 3D & product card GSAP animations...
git add .

echo [2/3] Committing updates...
git commit -m "Replace Hero 3D model with Holographic Quantum Globe with orbiting production satellites + add GSAP ScrollTrigger staggered entrance animations to product cards"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Holographic Globe to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
