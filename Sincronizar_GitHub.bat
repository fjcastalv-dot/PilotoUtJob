@echo off
chcp 65001 >nul
title Sincronizar Bolsa de Trabajo UT Cancún con GitHub
cd /d "%~dp0"

echo ======================================================
echo    SINCRONIZAR BOLSA DE TRABAJO UT CANCÚN CON GITHUB
echo ======================================================
echo.
echo Directorio local: %~dp0
echo.

set GIT_CMD="git"
if exist "C:\Users\fjcas\AppData\Local\Programs\Git\cmd\git.exe" (
    set GIT_CMD="C:\Users\fjcas\AppData\Local\Programs\Git\cmd\git.exe"
)

echo [1/3] Verificando cambios locales...
%GIT_CMD% add -A

echo [2/3] Creando paquete de actualizacion...
%GIT_CMD% diff-index --quiet HEAD --
if %ERRORLEVEL% NEQ 0 (
    %GIT_CMD% commit -m "Actualizacion automatica del proyecto Bolsa UT Cancun"
) else (
    echo No habia cambios nuevos sin confirmar.
)

echo.
echo [3/3] Subiendo cambios a GitHub...
%GIT_CMD% rev-parse --abbrev-ref --symbolic-full-name @{u} >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [AVISO] Aun no has vinculado un repositorio remoto de GitHub.
    echo Para vincularlo por primera vez ejecuta:
    echo   git remote add origin https://github.com/TU-USUARIO/TU-REPOSITORIO.git
    echo   git push -u origin main
) else (
    %GIT_CMD% push
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo ======================================================
        echo   SINCRONIZACION COMPLETADA CON EXITO EN GITHUB!
        echo ======================================================
    ) else (
        echo.
        echo ======================================================
        echo   Hubo un detalle al sincronizar. Revisa tu conexion.
        echo ======================================================
    )
)

echo.
echo Presiona cualquier tecla para cerrar esta ventana...
pause >nul
