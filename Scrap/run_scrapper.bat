@echo off
set VENV_DIR=.venv

:: 1. Cria o ambiente virtual se ele ainda nao existir
if not exist "%VENV_DIR%" (
    echo Criando ambiente virtual em %VENV_DIR%...
    python -m venv %VENV_DIR%
    
    echo Instalando dependencias pela primeira vez...
    "%VENV_DIR%\Scripts\pip.exe" install --upgrade pip
    "%VENV_DIR%\Scripts\pip.exe" install instaloader
    echo Instalacao concluida!
)

:: 2. Executa o scrapper usando o Python do ambiente virtual
echo Executando scrapper.py...
"%VENV_DIR%\Scripts\python.exe" scrapper.py

pause