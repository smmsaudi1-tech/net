@echo off
title NEXT GEN DEVS - Push Bespoke 3D Model & Light/Dark Mode Switcher to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Bespoke 3D & Theme
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging Bespoke 3D Developer Crystal Sculpture & Light/Dark Mode toggle...
git add .

echo [2/3] Committing updates...
git commit -m "Add Bespoke 3D Quantum Compiler Prism sculpture + Light Mode and Dark Mode theme switcher in Navbar"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed Bespoke 3D & Theme to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
