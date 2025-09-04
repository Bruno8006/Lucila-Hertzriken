@echo off
echo 🚀 Iniciando Portfolio da Lucila Hertzriken...
echo.

echo 📦 Iniciando Backend (Node.js)...
start "Backend" cmd /k "cd backend && npm start"

echo ⏳ Aguardando backend inicializar...
timeout /t 3 /nobreak > nul

echo 🎨 Iniciando Frontend (React)...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo ✅ Ambos os servidores foram iniciados!
echo 🌐 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:8000
echo.
echo Pressione qualquer tecla para fechar esta janela...
pause > nul
