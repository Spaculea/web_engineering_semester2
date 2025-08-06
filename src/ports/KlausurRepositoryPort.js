/**
 * @fileoverview Klausur Repository Port Interface
 * @author Sergiu Paculea
 */

/**
 * Interface für Klausur Repository Operationen
 * @interface
 */
class KlausurRepositoryPort {
    /**
     * Klausuren nach Semester finden
     * @param {string} semester - Das zu suchende Semester
     * @returns {Promise<Array>} Array von Klausuren
     */
    async findBySemester(semester) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Klausur nach ID finden
     * @param {number} id - Die Klausur-ID
     * @returns {Promise<Object|null>} Klausur-Objekt oder null wenn nicht gefunden
     */
    async findById(id) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Neue Klausur erstellen
     * @param {Object} klausurData - Die Klausur-Daten
     * @returns {Promise<number>} Die erstellte Klausur-ID
     */
    async create(klausurData) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Klausur-PDF nach ID abrufen
     * @param {number} id - Die Klausur-ID
     * @returns {Promise<Object|null>} Objekt mit PDF-Daten und Name, oder null
     */
    async getPdfById(id) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }
}

module.exports = KlausurRepositoryPort;