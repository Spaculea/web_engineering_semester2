/**
 * @fileoverview Loesung (Solution) domain entity
 * @author Sergiu Paculea
 */

/**
 * Loesung entity representing a solution in the system
 * @class
 */
class Loesung {
    /**
     * Create a Loesung
     * @param {Object} data - Loesung data
     * @param {number} [data.id] - The loesung ID
     * @param {number} data.klausur_id - The associated klausur ID
     * @param {Buffer} [data.loesung_pdf] - The PDF data
     * @param {Date} [data.created_at] - Creation timestamp
     */
    constructor(data) {
        this.id = data.id;
        this.klausur_id = data.klausur_id;
        this.loesung_pdf = data.loesung_pdf;
        this.created_at = data.created_at;
    }

    /**
     * Validate if the loesung has required fields
     * @returns {boolean} True if valid
     */
    isValid() {
        return !!(this.klausur_id);
    }

    /**
     * Get loesung metadata without PDF data
     * @returns {Object} Loesung metadata
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