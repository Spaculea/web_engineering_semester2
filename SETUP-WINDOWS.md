# DHBW Klausuren-Archiv - Windows Setup

Automatisches Setup-Skript für Windows PowerShell

## Schnell-Installation

```powershell
# 1. Repository klonen
git clone https://github.com/Spaculea/web_engineering_semester2.git
cd web_engineering_semester2

# 2. Dependencies installieren
npm install

# 3. Datenbank starten und initialisieren
npm run db:reset

# 4. Admin-Benutzer erstellen
node create-admin-user.js

# 5. Server starten
npm start
```

## Login-Daten

- **URL**: http://localhost:3000
- **Admin-Username**: admin
- **Admin-Passwort**: admin123

## Troubleshooting

### Port bereits belegt
```powershell
# Port 3000 freigeben
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Docker-Probleme
```powershell
# Docker-Services neu starten
docker-compose down
docker-compose up -d postgres
```

### Datenbank-Reset
```powershell
# Kompletter Reset
npm run db:stop
npm run db:reset
node create-admin-user.js
```

## Features testen

1. ✅ **Browser öffnen**: http://localhost:3000
2. ✅ **Navigation testen**: Zwischen Semestern wechseln
3. ✅ **Login testen**: Mit admin/admin123 anmelden
4. ✅ **Upload testen**: Datei per Drag & Drop hochladen
5. ✅ **Download testen**: PDF-Download funktioniert

## Entwicklung

```powershell
# Development-Server mit Auto-Reload
npm run dev

# Dokumentation generieren
npm run docs

# Öffne Dokumentation
start docs/index.html
```
