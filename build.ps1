<#
.SYNOPSIS
    Script de build local para Backend e Frontend (Windows PowerShell)
#>

$ErrorActionPreference = "Stop"

Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Iniciando Build do Ta Certo Brasil" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# 1. Build Backend
Write-Host "`n[1/2] Executando build e verificacao do Backend..." -ForegroundColor Yellow
python -m compileall backend/app
if ($LASTEXITCODE -ne 0) {
    Write-Error "Falha na compilacao do backend."
    exit $LASTEXITCODE
}
Write-Host "Backend compilado com sucesso!" -ForegroundColor Green

# 2. Build Frontend
Write-Host "`n[2/2] Executando build de producao do Frontend..." -ForegroundColor Yellow
Push-Location ta_certo_brasil
try {
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Falha no build do frontend."
        exit $LASTEXITCODE
    }
} finally {
    Pop-Location
}
Write-Host "Frontend compilado com sucesso!" -ForegroundColor Green

Write-Host "`n=========================================" -ForegroundColor Cyan
Write-Host "Build concluida com sucesso!" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Cyan

