# Changelog

Alle wichtigen Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

## [2.0.0] - 2025-07-23

### ✨ Hinzugefügt
- **Drag & Drop Upload**: Moderne Datei-Upload-Oberfläche
- **Responsive Design**: Bootstrap 5.3.0 Integration
- **Login-System**: Modal-basierte Authentifizierung
- **Session-Management**: Sichere Server-Sessions
- **Datei-Validierung**: Automatische Typ- und Größenprüfung
- **Live-Vorschau**: Sofortige Anzeige ausgewählter Dateien
- **Animationen**: Sanfte Übergänge und Hover-Effekte

### 🔐 Sicherheit
- **bcrypt-Hashing**: Sichere Passwort-Speicherung
- **Geschützte Routen**: Upload nur für authentifizierte Benutzer
- **Input-Validierung**: Frontend und Backend-Validierung

### 🎨 Design
- **Bootstrap Cards**: Moderne Card-basierte Layouts
- **Bootstrap Icons**: Konsistente Iconographie
- **Mobile-First**: Responsive Design für alle Geräte
- **Accessibility**: Barrierefreie Bedienung

### 🛠 Technisch
- **Docker Integration**: PostgreSQL-Container
- **Environment Variables**: Konfiguration über .env
- **JSDoc Documentation**: Vollständige API-Dokumentation
- **Error Handling**: Robuste Fehlerbehandlung

## [1.0.0] - 2025-07-16

### ✨ Hinzugefügt
- **Basis-Webserver**: Express.js-Server
- **PostgreSQL-Integration**: Datenbank für Klausuren und Lösungen
- **PDF-Upload**: Grundlegende Upload-Funktionalität
- **Semester-Navigation**: Klausuren nach Semestern organisiert
- **Download-System**: PDF-Download für Klausuren und Lösungen

### 📁 Dateistruktur
- **Klausuren-Archiv**: Strukturierte Speicherung nach Semestern
- **Lösungen-System**: Verknüpfung von Klausuren mit Lösungen
- **Datenbank-Schema**: Relationale Datenbankstruktur

### 🔧 Setup
- **Docker Compose**: Entwicklungsumgebung
- **Automatische Initialisierung**: Datenbank-Setup-Skripte
- **Asset-Import**: Automatischer Import vorhandener PDFs

## Geplante Features

### Version 2.1.0
- [ ] **Suchfunktion**: Volltext-Suche in Klausuren
- [ ] **Kategorien**: Erweiterte Fach-Kategorisierung
- [ ] **Bewertungssystem**: Nutzer-Bewertungen für Klausuren
- [ ] **Kommentare**: Kommentar-System für Klausuren

### Version 2.2.0
- [ ] **Multi-User**: Verschiedene Benutzerrollen
- [ ] **Favoriten**: Persönliche Klausuren-Listen
- [ ] **Export**: PDF-Sammlungen exportieren
- [ ] **API v2**: RESTful API mit OpenAPI-Dokumentation

### Version 3.0.0
- [ ] **React Frontend**: Moderne SPA-Architektur
- [ ] **Real-time**: WebSocket-Integration
- [ ] **Cloud Storage**: S3-Integration für Dateien
- [ ] **Analytics**: Nutzungsstatistiken

## Migration Guide

### Von v1.0.0 zu v2.0.0

1. **Neue Dependencies installieren**:
```bash
npm install bcrypt express-session
```

2. **Datenbank-Schema aktualisieren**:
```bash
npm run db:reset
```

3. **Admin-Benutzer erstellen**:
```bash
node create-admin-user.js
```

4. **Frontend-Assets aktualisieren**:
- Neue CSS-Dateien hinzugefügt
- Bootstrap 5.3.0 Integration
- Neue JavaScript-Module

## Breaking Changes

### Version 2.0.0
- **API-Änderungen**: Neue Authentifizierungs-Endpoints
- **Datenbankschema**: Neue `users`-Tabelle erforderlich
- **Frontend**: Bootstrap 5.x erforderlich (nicht kompatibel mit v4.x)

## Contributors

- **Sergiu Paculea** - Hauptentwickler und Projektinitiator
- DHBW Stuttgart - Bildungspartner und Auftraggeber

---

**Hinweis**: Dieses Projekt folgt [Semantic Versioning](https://semver.org/).
