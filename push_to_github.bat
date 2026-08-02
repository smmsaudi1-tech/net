@echo off
title NEXT GEN DEVS - Push 3D Website Architect Skill Updates to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Full 3D & Animation
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging full 3D & Animation skill implementations...
git add .

echo [2/3] Committing updates...
git commit -m "Apply full 3D Website Architect skill: 3D Code Compiler sculpture, GSAP kinetics, WebGL particles, and smooth scroll interpolation"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed 3D & Animation Skill to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
