/**
 * @fileoverview Loesung Repository Port Interface
 * @author Sergiu Paculea
 */

/**
 * Interface für Loesung Repository Operationen
 * @interface
 */
class LoesungRepositoryPort {
    /**
     * Loesungen nach Semester finden (über Klausur-Beziehung)
     * @param {string} semester - Das zu suchende Semester
     * @returns {Promise<Array>} Array von Loesungen mit Klausur-Info
     */
    async findBySemester(semester) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Loesung nach ID finden
     * @param {number} id - Die Loesung-ID
     * @returns {Promise<Object|null>} Loesung-Objekt oder null wenn nicht gefunden
     */
    async findById(id) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Neue Loesung erstellen
     * @param {Object} loesungData - Die Loesung-Daten
     * @returns {Promise<number>} Die erstellte Loesung-ID
     */
    async create(loesungData) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Loesung-PDF nach ID abrufen
     * @param {number} id - Die Loesung-ID
     * @returns {Promise<Object|null>} Objekt mit PDF-Daten und Klausur-Name, oder null
     */
    async getPdfById(id) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }
}

module.exports = LoesungRepositoryPort;