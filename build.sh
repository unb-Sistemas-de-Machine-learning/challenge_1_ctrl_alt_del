#!/usr/bin/env bash
set -e

echo "========================================="
echo "Iniciando Build do Ta Certo Brasil"
echo "========================================="

# 1. Build Backend
echo ""
echo "[1/2] Executando build e verificacao do Backend..."
python3 -m compileall backend/app || python -m compileall backend/app
echo "Backend compilado com sucesso!"

# 2. Build Frontend
echo ""
echo "[2/2] Executando build de producao do Frontend..."
(cd ta_certo_brasil && npm run build)
echo "Frontend compilado com sucesso!"

echo ""
echo "========================================="
echo "Build concluida com sucesso!"
echo "========================================="

