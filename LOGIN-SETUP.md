# Login-System Setup Anleitung

## 🚀 Schnellstart

### 1. Abhängigkeiten installieren
```bash
npm install bcrypt express-session
```

### 2. Admin-Hash generieren
```bash
node generate-admin.js
```

### 3. Datenbank zurücksetzen (mit neuer Benutzer-Tabelle)
```bash
npm run db:reset
```

### 4. Admin-Benutzer manuell hinzufügen
Führen Sie das SQL-Kommando aus der Ausgabe von `generate-admin.js` in Ihrer Datenbank aus.

### 5. Server starten
```bash
npm run dev
```

## 📋 Login-Informationen

- **Username:** admin
- **Password:** admin123

## 🔧 Automatisches Setup

### Windows PowerShell:
```powershell
.\setup-login.ps1
```

### Linux/Mac:
```bash
chmod +x setup-login.sh
./setup-login.sh
```

## 🎯 Was wurde implementiert?

### 1. **Bootstrap Modal Login**
- Login-Modal mit Benutzername/Passwort
- Responsive Design mit Bootstrap
- Fehlerbehandlung und Status-Anzeigen

### 2. **Server-seitige Authentifizierung**
- Express-Session für Session-Management
- Bcrypt für sichere Passwort-Hashing
- Middleware für geschützte Routen

### 3. **Datenbankschema**
- `users` Tabelle mit sicheren Passwort-Hashes
- Foreign Key Constraints
- Indizes für bessere Performance

### 4. **Upload-Schutz**
- Upload-Formular nur für eingeloggte Benutzer
- API-Endpunkt mit Authentifizierung geschützt
- Dynamische UI-Anpassung basierend auf Login-Status

### 5. **Client-seitige Funktionalität**
- Automatische Authentifizierungsstatusprüfung
- Login/Logout-Funktionalität
- UI-Updates basierend auf Authentifizierungsstatus

## 🛠️ Troubleshooting

### Datenbank-Probleme:
```bash
# Datenbank komplett zurücksetzen
docker compose down -v
docker compose up -d postgres
npm run db:reset
```

### Session-Probleme:
- Browser-Cookies löschen
- Server neu starten

### Passwort vergessen:
- Neuen Hash mit `generate-admin.js` generieren
- Direkt in der Datenbank aktualisieren

## 📁 Veränderte Dateien

1. **src/homePage.html** - Login-Modal und geschütztes Upload-Formular
2. **src/client-side.js** - Login-Funktionalität
3. **src/server.js** - Authentifizierungs-Routen und Session-Management
4. **init.sql** - Benutzer-Tabelle
5. **package.json** - Neue Abhängigkeiten

## 🔐 Sicherheitshinweise

- Ändern Sie das Standard-Passwort in einer Produktionsumgebung
- Verwenden Sie HTTPS für sichere Cookie-Übertragung
- Implementieren Sie Rate-Limiting für Login-Versuche
- Verwenden Sie starke Session-Secrets
