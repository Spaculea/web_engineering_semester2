# Setup-Script für Login-System (Windows PowerShell)

Write-Host "🚀 Setup für Login-System wird gestartet..." -ForegroundColor Green

# 1. Abhängigkeiten installieren
Write-Host "📦 Installiere neue Abhängigkeiten..." -ForegroundColor Yellow
npm install bcrypt express-session

# 2. Admin-Benutzer-Hash generieren
Write-Host "🔑 Generiere Admin-Benutzer..." -ForegroundColor Yellow
node generate-admin.js | Out-File -FilePath "admin-user.txt"

# 3. Datenbank zurücksetzen
Write-Host "🗄️ Setze Datenbank zurück..." -ForegroundColor Yellow
npm run db:reset

# 4. Admin-Benutzer zur Datenbank hinzufügen
Write-Host "👤 Füge Admin-Benutzer zur Datenbank hinzu..." -ForegroundColor Yellow

# Hash aus der generierten Datei extrahieren
$hashLine = Get-Content "admin-user.txt" | Select-String "Hash:"
$hash = $hashLine.ToString().Split(' ')[1]

# SQL-Befehl erstellen
$sqlCommand = "INSERT INTO users (username, password_hash) VALUES ('admin', '$hash') ON CONFLICT (username) DO NOTHING;"
$sqlCommand | Out-File -FilePath "add-admin.sql"

# SQL-Befehl ausführen
Get-Content "add-admin.sql" | docker exec -i dhbw-postgres psql -U postgres -d dhbw_klausuren

# 5. Aufräumen
Remove-Item "admin-user.txt", "add-admin.sql"

Write-Host "✅ Setup abgeschlossen!" -ForegroundColor Green
Write-Host ""
Write-Host "Login-Informationen:" -ForegroundColor Cyan
Write-Host "Username: admin" -ForegroundColor White
Write-Host "Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "Starte den Server mit: npm run dev" -ForegroundColor Yellow
