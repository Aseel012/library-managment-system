@echo off
cd /d "%~dp0"
echo.
echo  Shaikh Aseel Portfolio — Local Server
echo  =====================================
echo  Open: http://localhost:8080/index.html
echo  Press Ctrl+C to stop
echo.
python -m http.server 8080
