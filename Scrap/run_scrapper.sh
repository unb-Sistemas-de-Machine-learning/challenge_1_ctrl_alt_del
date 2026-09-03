#!/bin/bash


VENV_DIR=".venv"


if [ ! -d "$VENV_DIR" ]; then
    echo "Ambiente virtual não encontrado. Criando em $VENV_DIR..."
    python3 -m venv "$VENV_DIR"
    
    echo "Instalando dependências pela primeira vez..."
    "$VENV_DIR/bin/pip" install --upgrade pip
    "$VENV_DIR/bin/pip" install instaloader
    echo "Instalação concluída!"
fi


echo "Executando scrapper.py..."
"$VENV_DIR/bin/python" scrapper.py