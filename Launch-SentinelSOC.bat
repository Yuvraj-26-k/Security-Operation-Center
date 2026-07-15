@echo off
title SentinelSOC Launcher

echo Starting Backend...
start "SentinelSOC Backend" cmd /k "cd /d D:\Security-Operation-Center\backend && .venv\Scripts\activate && uvicorn app.main:app --reload"

timeout /t 5 /nobreak >nul

echo Starting Frontend...
start "SentinelSOC Frontend" cmd /k "cd /d D:\Security-Operation-Center\src && npm run dev"

timeout /t 5 /nobreak >nul

start http://localhost:5173

exit
