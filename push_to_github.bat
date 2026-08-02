@echo off
title NextGen Devs - Push to GitHub
color 0A

echo ===================================================
echo     NextGen Devs -- Automated GitHub Push Tool
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
set /p msg="[3/4] Enter Commit Message (Press ENTER for default 'Update NextGen Devs Code'): "
if "%msg%"=="" set msg=Update NextGen Devs Web Agency Platform

git commit -m "%msg%"

echo.
echo [4/4] Pushing to GitHub repository...
git push -u origin main --force

echo.
echo ===================================================
echo   ✅ Successfully Pushed NextGen Devs to GitHub!
echo ===================================================
echo.
pause
