# Supermemory Installation Script for OpenCode
# Run this script to install the Supermemory plugin

Write-Host "========================================" -ForegroundColor Cyan
Write-Host " OpenCode Supermemory Plugin Installer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check prerequisites
Write-Host "[1/5] Checking prerequisites..." -ForegroundColor Yellow

if (-not (Get-Command opencode -ErrorAction SilentlyContinue)) {
    Write-Host " ERROR: OpenCode is not installed!" -ForegroundColor Red
    Write-Host " Install from: https://opencode.ai" -ForegroundColor Yellow
    exit 1
}
Write-Host " OK: OpenCode found" -ForegroundColor Green

# Step 2: Create config directory
Write-Host "`n[2/5] Creating config directory..." -ForegroundColor Yellow

$configDir = "$env:USERPROFILE\.config\opencode"
if (-not (Test-Path $configDir)) {
    New-Item -ItemType Directory -Path $configDir -Force | Out-Null
    Write-Host " Created: $configDir" -ForegroundColor Green
} else {
    Write-Host " Exists: $configDir" -ForegroundColor Green
}

# Step 3: Get API Key
Write-Host "`n[3/5] Supermemory API Key" -ForegroundColor Yellow
Write-Host " Get your free API key from: https://app.supermemory.ai/?view=integrations" -ForegroundColor Cyan

$apiKey = Read-Host "Enter your Supermemory API key (sm_...)"

if ($apiKey -notmatch "^sm_") {
    Write-Host " WARNING: API key should start with 'sm_'" -ForegroundColor Yellow
}

# Step 4: Create config file
Write-Host "`n[4/5] Creating OpenCode config..." -ForegroundColor Yellow

$configContent = @"
{
  "plugin": [
    "opencode-supermemory"
  ],
  "supermemory": {
    "apiKey": "$apiKey",
    "similarityThreshold": 0.6,
    "maxMemories": 5,
    "maxProjectMemories": 10,
    "maxProfileItems": 5,
    "injectProfile": true,
    "containerTagPrefix": "opencode",
    "compactionThreshold": 0.8
  }
}
"@

$configPath = "$configDir\opencode.jsonc"
Set-Content -Path $configPath -Value $configContent -Force
Write-Host " Created: $configPath" -ForegroundColor Green

# Step 5: Set environment variable
Write-Host "`n[5/5] Setting environment variable..." -ForegroundColor Yellow

[System.Environment]::SetEnvironmentVariable("SUPERMEMORY_API_KEY", $apiKey, "User")
Write-Host " API key saved to environment (permanent)" -ForegroundColor Green

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host " Installation Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Restart OpenCode" -ForegroundColor White
Write-Host "  2. Run: opencode -c" -ForegroundColor White
Write-Host "  3. You should see 'supermemory' in tools" -ForegroundColor White
Write-Host ""
Write-Host "Commands available:" -ForegroundColor Yellow
Write-Host "  /supermemory-init  - Explore and memorize codebase" -ForegroundColor White
Write-Host "  supermemory.add    - Add a memory" -ForegroundColor White
Write-Host "  supermemory.search - Search memories" -ForegroundColor White
Write-Host "  supermemory.forget - Remove a memory" -ForegroundColor White
Write-Host ""
