@echo off
title NEXUS - Push to Hugging Face Spaces
color 0B

echo ===================================================
echo   🚀 NEXUS — Auto Push to Hugging Face Spaces
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/3] Building production bundle (npm run build)...
call npm run build

if not exist dist (
    echo [!] Build failed. Exiting...
    pause
    exit /b 1
)

echo [2/3] Preparing Git repository for Hugging Face Static SDK...
git init
git branch -M main
git remote add hf https://huggingface.co/spaces/Yousef891238/net 2>nul || git remote set-url hf https://huggingface.co/spaces/Yousef891238/net

copy /y dist\index.html index.html >nul 2>&1
xcopy /s /e /y dist\assets assets\ >nul 2>&1

echo [3/3] Committing and Pushing to Hugging Face...
git add .
git add -f index.html assets
git commit -m "Deploy NEXUS Static Web App to Hugging Face Spaces"
git push -f hf main

echo.
echo ===================================================
echo    ✨ SUCCESS! Project pushed to Hugging Face!
echo ===================================================
echo.
pause
