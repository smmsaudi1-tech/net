@echo off
title NEXUS - Push to GitHub
color 0A

echo ===================================================
echo     NEXUS -- Automated GitHub Auto-Push Tool
echo ===================================================
echo.

cd /d "%~dp0"

echo [1/4] Checking Git repository initialization...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo [*] Initializing new Git repository...
    git init
    git branch -M main
    git remote add origin https://github.com/smmsaudi1-tech/net.git
) else (
    git remote set-url origin https://github.com/smmsaudi1-tech/net.git
)

echo [2/4] Staging all project files...
git add .

echo.
set /p msg="[3/4] Enter Commit Message (Press ENTER for default 'Update NEXUS Code'): "
if "%msg%"=="" set msg=Update NEXUS Code

git commit -m "%msg%"

echo.
echo [4/4] Pushing code to GitHub repository (https://github.com/smmsaudi1-tech/net.git)...
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo ===================================================
    echo    SUCCESS! Project successfully pushed to GitHub!
    echo ===================================================
) else (
    echo ===================================================
    echo    PUSH ERROR: Please check your GitHub login/token.
    echo ===================================================
)

echo.
pause
