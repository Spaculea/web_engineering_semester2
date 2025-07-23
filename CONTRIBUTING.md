# Contributing Guidelines

Vielen Dank für Ihr Interesse am DHBW Klausuren-Archiv! 🎓

## 🤝 Wie können Sie beitragen?

### 📝 Issues melden
- **Bug Reports**: Beschreiben Sie das Problem detailliert
- **Feature Requests**: Schlagen Sie neue Funktionen vor
- **Verbesserungsvorschläge**: UI/UX oder Performance-Optimierungen

### 💻 Code beitragen
1. **Fork** des Repositories erstellen
2. **Feature Branch** erstellen: `git checkout -b feature/neue-funktion`
3. **Änderungen implementieren** mit Tests
4. **Pull Request** erstellen

## 📋 Code-Richtlinien

### JavaScript
```javascript
/**
 * @function functionName
 * @memberof Namespace
 * @description Beschreibung der Funktion
 * @param {type} param - Parameter-Beschreibung
 * @returns {type} - Rückgabe-Beschreibung
 */
function functionName(param) {
    // Implementation
}
```

### HTML
- **Semantische Tags** verwenden
- **Bootstrap-Klassen** für Styling
- **Accessibility-Attribute** hinzufügen

### CSS
- **Mobile-First** Approach
- **BEM-Methodology** wo möglich
- **Bootstrap-Variablen** nutzen

## 🧪 Testing

### Manueller Test-Prozess
1. **Server starten**: `npm start`
2. **Login testen**: admin/admin123
3. **Upload testen**: Drag & Drop
4. **Download testen**: PDF-Links
5. **Responsive testen**: Verschiedene Bildschirmgrößen

### Automatisierte Tests (geplant)
```bash
npm test              # Unit Tests
npm run test:e2e      # End-to-End Tests
npm run test:coverage # Coverage Report
```

## 📚 Dokumentation

### JSDoc aktualisieren
- **Alle Funktionen** dokumentieren
- **Parameter und Rückgaben** beschreiben
- **Beispiele** hinzufügen wo sinnvoll

### README aktualisieren
- **Neue Features** beschreiben
- **Setup-Anleitungen** aktualisieren
- **API-Dokumentation** erweitern

## 🔄 Pull Request Prozess

### Vor dem PR
1. **Code-Style** überprüfen
2. **Funktionalität** testen
3. **Dokumentation** aktualisieren
4. **Commit-Messages** überprüfen

### PR-Template
```
## Beschreibung
Kurze Beschreibung der Änderungen

## Typ der Änderung
- [ ] Bug Fix
- [ ] Neues Feature
- [ ] Breaking Change
- [ ] Dokumentation

## Testing
- [ ] Lokale Tests bestanden
- [ ] Browser-Kompatibilität getestet
- [ ] Mobile-Ansicht getestet

## Screenshots (falls UI-Änderungen)
Vor/Nach-Screenshots hinzufügen
```

## 📋 Commit-Richtlinien

### Conventional Commits
```
type(scope): description

feat(upload): add drag and drop functionality
fix(auth): resolve login session timeout
docs(readme): update installation guide
style(css): improve mobile responsiveness
refactor(api): restructure endpoint handlers
test(unit): add authentication tests
```

### Commit-Types
- **feat**: Neue Features
- **fix**: Bug-Fixes
- **docs**: Dokumentation
- **style**: Code-Formatting
- **refactor**: Code-Umstrukturierung
- **test**: Test-Ergänzungen
- **chore**: Build-Prozess, etc.

## 🎯 Entwicklungs-Priorities

### Hoch
- [ ] **Suchfunktion**: Klausuren durchsuchbar machen
- [ ] **Unit Tests**: Automatisierte Test-Suite
- [ ] **Error Handling**: Bessere Fehlerbehandlung

### Mittel
- [ ] **Multi-Language**: Internationalisierung
- [ ] **Themes**: Dark/Light-Mode
- [ ] **Analytics**: Nutzungsstatistiken

### Niedrig
- [ ] **PWA**: Progressive Web App Features
- [ ] **Offline-Mode**: Offline-Funktionalität
- [ ] **Push-Notifications**: Benachrichtigungen

## 🆘 Hilfe bekommen

### Erste Schritte
1. **Repository klonen** und Setup durchführen
2. **Dokumentation lesen** (README.md)
3. **Issues durchgehen** für offene Aufgaben
4. **Discord/Chat** für direkte Hilfe (falls verfügbar)

### Ressourcen
- **JSDoc**: https://jsdoc.app/
- **Bootstrap 5**: https://getbootstrap.com/docs/5.3/
- **Express.js**: https://expressjs.com/
- **PostgreSQL**: https://www.postgresql.org/docs/

## 🏆 Anerkennung

Alle Beiträge werden in der **Contributors**-Sektion gewürdigt:
- **Major Features**: Namensnennung im README
- **Bug Fixes**: Erwähnung im CHANGELOG
- **Dokumentation**: Credits in der jeweiligen Datei

---

**Vielen Dank für Ihren Beitrag zum DHBW Klausuren-Archiv! 🚀**
