@echo off
echo Starting local server for Product Dashboard...
echo.
echo Server running at: http://localhost:8000
echo Press Ctrl+C to stop the server
echo.
start "" "http://localhost:8000"
python -m http.server 8000
