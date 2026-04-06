@echo off
REM ========================================
REM OpenCode Supermemory Plugin Installer
REM ========================================

echo.
echo ========================================
echo  OpenCode Supermemory Plugin Installer
echo ========================================
echo.

REM Check if OpenCode is installed
where opencode >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] OpenCode is not installed!
    echo Install from: https://opencode.ai
    pause
    exit /b 1
)
echo [OK] OpenCode found

REM Create config directory
echo.
echo [2/5] Creating config directory...
set "CONFIG_DIR=%USERPROFILE%\.config\opencode"
if not exist "%CONFIG_DIR%" mkdir "%CONFIG_DIR%"
echo [OK] Config directory ready

REM Get API Key
echo.
echo [3/5] Supermemory API Key
echo Get your free API key from: https://app.supermemory.ai/?view=integrations
echo.
set /p API_KEY="Enter your Supermemory API key (sm_...): "

REM Create config file
echo.
echo [4/5] Creating OpenCode config...
(
echo {
echo   "plugin": [
echo     "opencode-supermemory"
echo   ],
echo   "supermemory": {
echo     "apiKey": "%API_KEY%",
echo     "similarityThreshold": 0.6,
echo     "maxMemories": 5,
echo     "maxProjectMemories": 10,
echo     "injectProfile": true,
echo     "containerTagPrefix": "opencode",
echo     "compactionThreshold": 0.8
echo   }
echo }
) > "%CONFIG_DIR%\opencode.jsonc"

echo [OK] Config created: %CONFIG_DIR%\opencode.jsonc

REM Set environment variable
echo.
echo [5/5] Setting environment variable...
setx SUPERMEMORY_API_KEY "%API_KEY%" >nul 2>&1
echo [OK] API key saved to environment

echo.
echo ========================================
echo  Installation Complete!
echo ========================================
echo.
echo Next steps:
echo   1. Restart your terminal
echo   2. Run: opencode -c
echo   3. You should see 'supermemory' in tools
echo.
echo Commands:
echo   /supermemory-init  - Explore codebase
echo   supermemory.add    - Add memory
echo   supermemory.search - Search memories
echo.
pause
