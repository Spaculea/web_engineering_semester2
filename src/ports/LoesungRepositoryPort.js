/**
 * @fileoverview Loesung Repository Port Interface
 * @author Sergiu Paculea
 */

/**
 * Interface for Loesung repository operations
 * @interface
 */
class LoesungRepositoryPort {
    /**
     * Find loesungen by semester (via klausur relationship)
     * @param {string} semester - The semester to search for
     * @returns {Promise<Array>} Array of loesungen with klausur info
     */
    async findBySemester(semester) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Find loesung by ID
     * @param {number} id - The loesung ID
     * @returns {Promise<Object|null>} Loesung object or null if not found
     */
    async findById(id) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Create a new loesung
     * @param {Object} loesungData - The loesung data
     * @returns {Promise<number>} The created loesung ID
     */
    async create(loesungData) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Get loesung PDF by ID
     * @param {number} id - The loesung ID
     * @returns {Promise<Object|null>} Object with PDF data and klausur name, or null
     */
    async getPdfById(id) {
        throw new Error('Method must be implemented by adapter');
    }
}

module.exports = LoesungRepositoryPort;