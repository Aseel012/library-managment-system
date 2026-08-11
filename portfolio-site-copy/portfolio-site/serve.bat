@echo off
cd /d "%~dp0"
echo Starting portfolio at http://localhost:8080
echo Open: http://localhost:8080/index.html
python -m http.server 8080
