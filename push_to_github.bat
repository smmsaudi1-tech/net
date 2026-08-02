@echo off
title NEXT GEN DEVS - Push 3D Robot AI Agent & AI Chatbot Widget to GitHub
color 0A

echo ===================================================
echo   🚀 NEXT GEN DEVS -- Auto Push 3D Robot & AI Chatbot
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Staging 3D Robot AI sculpture, AI Chatbot widget, and Universal Light Mode fixes...
git add .

echo [2/3] Committing updates...
git commit -m "Replace Hero 3D model with 3D Cybernetic Humanoid Robot AI Agent + Add Interactive AI Chatbot Widget & Universal Light Mode"

echo [3/3] Pushing to GitHub main branch...
git push -u origin main

echo.
echo ===================================================
echo   ✅ Successfully Pushed 3D Robot & AI Chatbot to GitHub!
echo   🚀 Vercel Auto-Deployment Complete!
echo ===================================================
echo.
pause
