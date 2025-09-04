# Script para iniciar o portfolio completo da Lucila Hertzriken
Write-Host "🚀 Iniciando Portfolio da Lucila Hertzriken..." -ForegroundColor Green
Write-Host ""

# Função para verificar se uma porta está em uso
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    }
    catch {
        return $false
    }
}

# Verificar se as portas estão livres
if (Test-Port 8000) {
    Write-Host "⚠️  Porta 8000 (backend) já está em uso!" -ForegroundColor Yellow
}

if (Test-Port 3000) {
    Write-Host "⚠️  Porta 3000 (frontend) já está em uso!" -ForegroundColor Yellow
}

Write-Host "📦 Iniciando Backend (Node.js)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm start"

Write-Host "⏳ Aguardando backend inicializar..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "🎨 Iniciando Frontend (React)..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm start"

Write-Host ""
Write-Host "✅ Ambos os servidores foram iniciados!" -ForegroundColor Green
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Blue
Write-Host "🔧 Backend: http://localhost:8000" -ForegroundColor Blue
Write-Host ""
Write-Host "Pressione qualquer tecla para fechar esta janela..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
