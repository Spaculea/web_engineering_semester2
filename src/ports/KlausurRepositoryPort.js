/**
 * @fileoverview Klausur Repository Port Interface
 * @author Sergiu Paculea
 */

/**
 * Interface for Klausur repository operations
 * @interface
 */
class KlausurRepositoryPort {
    /**
     * Find klausuren by semester
     * @param {string} semester - The semester to search for
     * @returns {Promise<Array>} Array of klausuren
     */
    async findBySemester(semester) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Find klausur by ID
     * @param {number} id - The klausur ID
     * @returns {Promise<Object|null>} Klausur object or null if not found
     */
    async findById(id) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Create a new klausur
     * @param {Object} klausurData - The klausur data
     * @returns {Promise<number>} The created klausur ID
     */
    async create(klausurData) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Get klausur PDF by ID
     * @param {number} id - The klausur ID
     * @returns {Promise<Object|null>} Object with PDF data and name, or null
     */
    async getPdfById(id) {
        throw new Error('Method must be implemented by adapter');
    }
}

module.exports = KlausurRepositoryPort;