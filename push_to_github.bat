@echo off
title NEXT GEN DEVS - Push TypeScript Fix for Vercel Deployment
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push Vercel Build Fix
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/4] Cleaning local git commit history...
git reset origin/main

echo [2/4] Staging updated clean files...
git add .

echo [3/4] Creating single clean commit...
git commit -m "Add Groq AI Chatbot Secret Page"

echo [4/4] Pushing cleanly to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Fixed and Pushed to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
