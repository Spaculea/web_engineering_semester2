#!/bin/bash

# Setup-Script für Login-System

echo "🚀 Setup für Login-System wird gestartet..."

# 1. Abhängigkeiten installieren
echo "📦 Installiere neue Abhängigkeiten..."
npm install bcrypt express-session

# 2. Admin-Benutzer-Hash generieren
echo "🔑 Generiere Admin-Benutzer..."
node generate-admin.js > admin-user.txt

# 3. Datenbank zurücksetzen
echo "🗄️ Setze Datenbank zurück..."
npm run db:reset

# 4. Admin-Benutzer zur Datenbank hinzufügen
echo "👤 Füge Admin-Benutzer zur Datenbank hinzu..."
# Hole den Hash aus der generierten Datei
HASH=$(grep "Hash:" admin-user.txt | cut -d' ' -f2)
echo "INSERT INTO users (username, password_hash) VALUES ('admin', '$HASH') ON CONFLICT (username) DO NOTHING;" > add-admin.sql

# SQL-Befehl ausführen
docker exec -i dhbw-postgres psql -U postgres -d dhbw_klausuren < add-admin.sql

# 5. Aufräumen
rm admin-user.txt add-admin.sql

echo "✅ Setup abgeschlossen!"
echo ""
echo "Login-Informationen:"
echo "Username: admin"
echo "Password: admin123"
echo ""
echo "Starte den Server mit: npm run dev"
