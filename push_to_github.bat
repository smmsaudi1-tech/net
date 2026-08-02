@echo off
title NEXT GEN DEVS - Push Mechanical Robot 3D & Universal Light Mode to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Mechanical Robot & Theme
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging Mechanical Robotic 3D Head & Universal Light Mode across all 16 sections...
git add .

echo [2/3] Committing updates...
git commit -m "Replace Hero 3D model with Mechanical Robotic Android Head & Chassis + Universal Light Mode styling across all 16 sections"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Mechanical Robot 3D & Theme to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
