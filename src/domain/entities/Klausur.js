/**
 * @fileoverview Klausur (Prüfung) Domain-Entität
 * @author Sergiu Paculea
 */

/**
 * Klausur-Entität die eine Prüfung im System repräsentiert
 * @class
 */
class Klausur {
    /**
     * Eine Klausur erstellen
     * @param {Object} data - Klausur-Daten
     * @param {number} [data.id] - Die Klausur-ID
     * @param {string} data.name - Der Klausur-Name
     * @param {string} data.fach - Das Fach
     * @param {string} data.semester - Das Semester
     * @param {Buffer} [data.klausur_pdf] - Die PDF-Daten
     * @param {Date} [data.created_at] - Erstellungszeitstempel
     */
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.fach = data.fach;
        this.semester = data.semester;
        this.klausur_pdf = data.klausur_pdf;
        this.created_at = data.created_at;
    }

    /**
     * Prüfen ob die Klausur die erforderlichen Felder hat
     * @returns {boolean} True wenn gültig
     */
    isValid() {
        return !!(this.name && this.fach && this.semester);
    }

    /**
     * Klausur-Metadaten ohne PDF-Daten abrufen
     * @returns {Object} Klausur-Metadaten
     */
    getMetadata() {
        return {
            id: this.id,
            name: this.name,
            fach: this.fach,
            semester: this.semester,
            created_at: this.created_at
        };
    }
}

module.exports = Klausur;