# 🎓 DHBW Stuttgart - Altklausuren Archiv Informatik

Ein modernes Web-Archiv für alte Klausuren und Lösungen der DHBW Stuttgart, entwickelt im Rahmen der Prüfungsleistung für Web Engineering.

![DHBW Logo](src/logo%20DHBW.svg)

## 📋 Inhaltsverzeichnis

- [Über das Projekt](#über-das-projekt)
- [Features](#features)
- [Technologien](#technologien)
- [Installation](#installation)
- [Verwendung](#verwendung)
- [API-Dokumentation](#api-dokumentation)
- [Projektstruktur](#projektstruktur)
- [Konfiguration](#konfiguration)
- [Entwicklung](#entwicklung)
- [Deployment](#deployment)
- [Beitragen](#beitragen)
- [Lizenz](#lizenz)

## 🎯 Über das Projekt

Das DHBW Altklausuren-Archiv ist eine vollständige Web-Anwendung zur Verwaltung und Bereitstellung von Klausuren und Lösungen für Informatik-Studierende. Die Anwendung bietet eine moderne, responsive Benutzeroberfläche mit Bootstrap und ein sicheres Login-System für das Hochladen neuer Inhalte.

### Ziele
- Zentrale Sammlung aller Altklausuren nach Semestern
- Einfacher Zugang zu Lösungen
- Sichere Upload-Funktionalität für Administratoren
- Responsive Design für alle Geräte
- Moderne Web-Technologien

## ✨ Features

### 🔍 **Browsing & Download**
- **Semester-basierte Navigation**: Klausuren nach Semestern 1-6 organisiert
- **PDF-Download**: Direkter Download von Klausuren und Lösungen
- **Responsive Design**: Optimiert für Desktop, Tablet und Mobile
- **Suchfreundlich**: Übersichtliche Darstellung aller verfügbaren Inhalte

### 🔐 **Authentifizierung & Sicherheit**
- **Modal-basiertes Login**: Elegante Bootstrap-Modal für Anmeldung
- **Session-Management**: Sichere Server-Sessions mit Express-Session
- **Passwort-Hashing**: bcrypt für sichere Passwortspeicherung
- **Geschützte Routen**: Upload nur für authentifizierte Benutzer

### 📤 **Upload-System**
- **Drag & Drop Interface**: Moderne Datei-Upload mit Drag-and-Drop
- **PDF-Only Support**: Ausschließlich PDF-Dateien werden unterstützt
- **Datei-Validierung**: Automatische Überprüfung von Typ und Größe
- **Live-Vorschau**: Sofortige Anzeige ausgewählter Dateien
- **Batch-Upload**: Gleichzeitiges Hochladen von Klausur und Lösung

### 🎨 **Benutzeroberfläche**
- **Bootstrap 5.3.0**: Moderne, responsive UI-Komponenten
- **Card-basierte Layouts**: Übersichtliche Darstellung von Inhalten
- **Bootstrap Icons**: Konsistente Iconographie
- **Animationen**: Sanfte Übergänge und Hover-Effekte
- **Accessibility**: Barrierefreie Bedienung

## 🛠 Technologien

### Frontend
- **HTML5** - Semantische Markup-Struktur
- **CSS3** - Moderne Styling-Features
- **Bootstrap 5.3.0** - Responsive CSS-Framework
- **Bootstrap Icons** - Icon-Bibliothek
- **Vanilla JavaScript** - Client-seitige Logik
- **Drag & Drop API** - Native Browser-APIs

### Backend
- **Node.js** - JavaScript-Runtime
- **Express.js** - Web-Framework
- **PostgreSQL** - Relationale Datenbank
- **bcrypt** - Passwort-Hashing
- **express-session** - Session-Management
- **multer** - Datei-Upload-Middleware
- **dotenv** - Umgebungsvariablen

### Development & Deployment
- **Docker & Docker Compose** - Containerisierung
- **JSDoc** - API-Dokumentation
- **Nodemon** - Development-Server
- **Git** - Versionskontrolle

## 🚀 Installation

### Voraussetzungen
- Node.js (v16 oder höher)
- Docker & Docker Compose
- Git

### Schritt-für-Schritt-Installation

1. **Repository klonen (Optional)**
```bash
# Option 1: Repository klonen
git clone https://github.com/Spaculea/web_engineering_semester2.git
cd web_engineering_semester2

# Option 2: Projekt-Ordner direkt verwenden (empfohlen)
# Verwenden Sie den vorhandenen Projekt-Ordner
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Umgebungsvariablen konfigurieren**
```bash
# .env Datei muss im src/ Ordner erstellt werden:
# src/.env mit folgendem Inhalt:
DB_HOST=localhost
DB_PORT=5400
DB_USER=postgres
DB_PASSWORD=postgrePassword
DB_NAME=dhbw_klausuren
```

**Wichtig**: Erstellen Sie eine neue Datei `src/.env` mit den oben genannten Umgebungsvariablen.

4. **Datenbank starten und initialisieren (mit Admin-Benutzer)**
```bash
npm run db:reset
```

5. **Server starten**
```bash
npm start
```

Die Anwendung ist nun unter `http://localhost:3000` verfügbar.

**Login-Daten:**
- **Benutzername**: `admin`
- **Passwort**: `admin123`

> **Hinweis**: Der Admin-Benutzer wird automatisch bei `npm run db:reset` oder `npm run db:init` erstellt.

## 💻 Verwendung

### 🌐 **Für Studierende (Öffentlicher Zugang)**

1. **Website besuchen**: `http://localhost:3000`
2. **Semester auswählen**: Navigation verwenden (1.-6. Semester)
3. **Klausuren durchsuchen**: Verfügbare Klausuren und Lösungen ansehen
4. **Download**: Direkt auf gewünschte PDF-Dateien klicken

### 👨‍💼 **Für Administratoren (Upload)**

1. **Login**: Auf "Login" in der Navigation klicken
   - **Benutzername**: `admin`
   - **Passwort**: `admin123`

2. **Upload-Bereich**: Nach Login wird Upload-Sektion sichtbar

3. **Datei hochladen**:
   - **Drag & Drop**: Dateien direkt in gestrichelte Bereiche ziehen
   - **Klick-Upload**: Auf "Datei auswählen" klicken
   - **Formular ausfüllen**: Name, Fach, Semester angeben
   - **Upload**: Button "Hochladen" klicken

4. **Logout**: "Logout" in der Navigation

## 📚 API-Dokumentation

### Authentifizierung

```http
POST /api/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

```http
POST /api/logout
```

```http
GET /api/auth/status
```

### Klausuren & Lösungen

```http
GET /api/exams/:semester
# Gibt alle Klausuren für ein Semester zurück
```

```http
GET /api/solutions/:semester
# Gibt alle Lösungen für ein Semester zurück
```

```http
GET /klausuren/:id/pdf
# Download einer Klausur-PDF
```

```http
GET /loesungen/:id/pdf
# Download einer Lösungs-PDF
```

### Upload (Authentifizierung erforderlich)

```http
POST /api/upload
Content-Type: multipart/form-data

# FormData mit:
# - name: String
# - fach: String
# - semester: String
# - klausur: File
# - loesung: File (optional)
```

Vollständige API-Dokumentation: `npm run docs` → `docs/index.html`

## 📁 Projektstruktur

```
Projekt/
├── src/                                    # Quellcode (Hexagonal Architecture)
│   ├── homePage.html                      # Haupt-HTML-Datei
│   ├── server.js                          # Express-Server (refactored)
│   ├── server-original.js                # Original-Server (Backup)
│   ├── Container.js                       # Dependency Injection Container
│   ├── client-side.js                     # Frontend-JavaScript
│   ├── styles.css                         # Basis-Styles
│   ├── styles-bootstrap.css               # Bootstrap-Anpassungen
│   ├── drag-drop-styles.css               # Drag-Drop-Styles
│   ├── logo DHBW.svg                     # DHBW-Logo
│   ├── adapters/                          # Adapter Layer (Hexagonal Architecture)
│   │   ├── api/                          # API-Route-Adapter
│   │   │   ├── authRoutes.js             # Authentifizierungs-Routen
│   │   │   ├── klausurRoutes.js          # Klausur-API-Routen
│   │   │   ├── loesungRoutes.js          # Lösungs-API-Routen
│   │   │   └── uploadRoutes.js           # Upload-API-Routen
│   │   └── db/                           # Datenbank-Adapter
│   │       ├── BcryptAuthService.js       # Authentifizierungsservice
│   │       ├── PostgreSQLKlausurRepository.js    # Klausur-Repository
│   │       ├── PostgreSQLLoesungRepository.js    # Lösungs-Repository
│   │       └── PostgreSQLUserRepository.js       # User-Repository
│   ├── domain/                            # Domain Layer (Business Logic)
│   │   ├── entities/                     # Domain-Entitäten
│   │   │   ├── Klausur.js                # Klausur-Entität
│   │   │   ├── Loesung.js                # Lösungs-Entität
│   │   │   └── User.js                   # User-Entität
│   │   └── usecases/                     # Use Cases (Business Logic)
│   │       ├── AuthenticateUserUseCase.js       # User-Authentifizierung
│   │       ├── GetExamPdfUseCase.js              # Klausur-PDF abrufen
│   │       ├── GetExamsUseCase.js                # Klausuren abrufen
│   │       ├── GetSolutionPdfUseCase.js          # Lösungs-PDF abrufen
│   │       ├── GetSolutionsUseCase.js            # Lösungen abrufen
│   │       └── UploadExamUseCase.js              # Klausur hochladen
│   ├── ports/                             # Ports (Interfaces)
│   │   ├── AuthServicePort.js            # Authentifizierungs-Interface
│   │   ├── KlausurRepositoryPort.js      # Klausur-Repository-Interface
│   │   ├── LoesungRepositoryPort.js      # Lösungs-Repository-Interface
│   │   └── UserRepositoryPort.js         # User-Repository-Interface
│   ├── assets/                           # Statische Assets
│   │   ├── Klausuren/                    # PDF-Klausuren
│   │   └── Loesungen/                    # PDF-Lösungen
│   └── db/                               # Datenbank-Setup
│       └── initialization.js             # DB-Setup-Skript
├── docs/                                 # JSDoc-Dokumentation
│   └── HEXAGONAL_ARCHITECTURE.md        # Architektur-Dokumentation
├── docker-compose.yaml                   # Docker-Services
├── Dockerfile                           # Docker-Image
├── package.json                         # Node.js-Konfiguration
├── jsdoc.json                           # JSDoc-Konfiguration
├── .env                                 # Umgebungsvariablen (Root-Level)
├── src/.env                             # Umgebungsvariablen (muss erstellt werden)
├── init.sql                             # SQL-Schema
├── create-admin-user.js                 # Admin-User-Skript
└── README.md                            # Diese Datei
```

### 🏗️ Hexagonal Architecture

Das Projekt folgt der **Hexagonal Architecture** (Ports & Adapters Pattern):

- **Domain Layer**: Geschäftslogik und Entitäten (unabhängig von externen Systemen)
- **Ports**: Interfaces für externe Abhängigkeiten
- **Adapters**: Implementierungen der Ports (Datenbank, API, etc.)
- **Container**: Dependency Injection für lose Kopplung

## ⚙️ Konfiguration

### Umgebungsvariablen (src/.env)
```env
# Datenbank
DB_HOST=localhost
DB_PORT=5400
DB_USER=postgres
DB_PASSWORD=postgrePassword
DB_NAME=dhbw_klausuren

# Server
PORT=3000
NODE_ENV=development
```

**Wichtig**: Die `.env` Datei muss im `src/` Ordner erstellt werden, nicht im Projekt-Root.

### Docker-Services
- **PostgreSQL**: Port 5400
- **Node.js App**: Port 3000
- **Persistent Volume**: `postgres_data`

## 🔧 Entwicklung

### Verfügbare Scripts

```bash
# Development
npm run dev              # Startet Server mit Nodemon
npm start               # Produktions-Server

# Datenbank
npm run db:start        # PostgreSQL-Container starten
npm run db:stop         # Container stoppen
npm run db:reset        # Datenbank zurücksetzen + neu initialisieren + Admin erstellen
npm run db:init         # Nur Datenbank initialisieren + Admin erstellen

# Dokumentation
npm run docs            # JSDoc generieren
npm run docs:watch      # JSDoc mit Watch-Mode
npm run docs:serve      # Docs generieren + HTTP-Server

# Utils
npm run generate-admin  # Admin-Hash generieren (nur anzeigen)
npm run create-admin    # Admin-User in bestehende DB einfügen
```

### Development-Workflow

1. **Code ändern** in `src/`
2. **Server automatisch neu starten** (mit `npm run dev`)
3. **Browser aktualisieren** → `http://localhost:3000`
4. **Tests laufen lassen**: `node test-login.js`
5. **Dokumentation aktualisieren**: `npm run docs`

### Database-Schema

```sql
-- Klausuren-Tabelle
CREATE TABLE klausuren (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    fach VARCHAR(100) NOT NULL,
    semester VARCHAR(10) NOT NULL,
    klausur_pdf BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Lösungen-Tabelle
CREATE TABLE loesungen (
    id SERIAL PRIMARY KEY,
    klausur_id INTEGER REFERENCES klausuren(id),
    loesung_pdf BYTEA NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Benutzer-Tabelle
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🚀 Deployment

### Docker Deployment

1. **Image erstellen**
```bash
docker build -t dhbw-klausuren-archiv .
```

2. **Mit Docker Compose starten**
```bash
docker-compose up -d
```

### Code-Style
- **JavaScript**: Standard-Style mit JSDoc-Kommentaren
- **HTML**: Semantische Tags, Bootstrap-Klassen
- **CSS**: BEM-Methodology wo möglich
- **Commits**: Conventional Commits Format
