/**
 * @fileoverview Loesung (Lösung) Domain-Entität
 * @author Sergiu Paculea
 */

/**
 * Loesung-Entität die eine Lösung im System repräsentiert
 * @class
 */
class Loesung {
    /**
     * Eine Loesung erstellen
     * @param {Object} data - Loesung-Daten
     * @param {number} [data.id] - Die Loesung-ID
     * @param {number} data.klausur_id - Die zugehörige Klausur-ID
     * @param {Buffer} [data.loesung_pdf] - Die PDF-Daten
     * @param {Date} [data.created_at] - Erstellungszeitstempel
     */
    constructor(data) {
        this.id = data.id;
        this.klausur_id = data.klausur_id;
        this.loesung_pdf = data.loesung_pdf;
        this.created_at = data.created_at;
    }

    /**
     * Prüfen ob die Loesung die erforderlichen Felder hat
     * @returns {boolean} True wenn gültig
     */
    isValid() {
        return !!(this.klausur_id);
    }

    /**
     * Loesung-Metadaten ohne PDF-Daten abrufen
     * @returns {Object} Loesung-Metadaten
     */
    getMetadata() {
        return {
            id: this.id,
            klausur_id: this.klausur_id,
            created_at: this.created_at
        };
    }
}

module.exports = Loesung;