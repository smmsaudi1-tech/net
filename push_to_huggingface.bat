@echo off
title NextGen Devs - Push to Hugging Face Spaces
color 0B

echo ===================================================
echo   🚀 NextGen Devs — Auto Push to Hugging Face Spaces
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

echo [2/3] Preparing Git repository for Hugging Face...
git init
git branch -M main
git remote add hf https://huggingface.co/spaces/Yousef891238/net 2>nul || git remote set-url hf https://huggingface.co/spaces/Yousef891238/net

echo [3/3] Committing and Pushing to Hugging Face...
git add .
git add -f dist
git commit -m "Deploy NextGen Devs Web Agency Platform to Hugging Face Spaces"
git push -f hf main

echo.
echo ===================================================
echo   ✅ Successfully Deployed NextGen Devs!
echo   🔗 Space URL: https://huggingface.co/spaces/Yousef891238/net
echo ===================================================
echo.
pause
