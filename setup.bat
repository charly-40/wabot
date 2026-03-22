@echo off
title WABot Setup

echo ================================
echo     INSTALADOR WABOT
echo ================================
echo.

:: Verificar Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
echo [ERROR] Node.js no esta instalado.
echo Descargalo desde: https://nodejs.org/
pause
exit
)

echo [OK] Node.js detectado
echo.

:: Instalar dependencias
echo Instalando dependencias...
npm install
if %errorlevel% neq 0 (
echo [ERROR] Fallo al instalar dependencias
pause
exit
)

echo [OK] Dependencias instaladas
echo.

:: Crear carpeta temp
if not exist temp mkdir temp

echo [OK] Estructura lista
echo.

echo ================================
echo   INSTALACION COMPLETA
echo ================================
echo.
echo Para iniciar el bot:
echo node index.js
echo.

pause
