/**
 * @fileoverview User (Benutzer) Domain-Entität
 * @author Sergiu Paculea
 */

/**
 * User-Entität die einen Benutzer im System repräsentiert
 * @class
 */
class User {
    /**
     * Einen User erstellen
     * @param {Object} data - User-Daten
     * @param {number} [data.id] - Die Benutzer-ID
     * @param {string} data.username - Der Benutzername
     * @param {string} [data.password_hash] - Der Passwort-Hash
     * @param {Date} [data.created_at] - Erstellungszeitstempel
     */
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password_hash = data.password_hash;
        this.created_at = data.created_at;
    }

    /**
     * Prüfen ob der User die erforderlichen Felder hat
     * @returns {boolean} True wenn gültig
     */
    isValid() {
        return !!(this.username);
    }

    /**
     * Benutzerdaten ohne sensible Informationen abrufen
     * @returns {Object} Öffentliche Benutzerdaten
     */
    getPublicData() {
        return {
            id: this.id,
            username: this.username,
            created_at: this.created_at
        };
    }
}

module.exports = User;