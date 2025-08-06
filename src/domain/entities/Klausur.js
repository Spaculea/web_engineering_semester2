/**
 * @fileoverview Klausur (Exam) domain entity
 * @author Sergiu Paculea
 */

/**
 * Klausur entity representing an exam in the system
 * @class
 */
class Klausur {
    /**
     * Create a Klausur
     * @param {Object} data - Klausur data
     * @param {number} [data.id] - The klausur ID
     * @param {string} data.name - The klausur name
     * @param {string} data.fach - The subject
     * @param {string} data.semester - The semester
     * @param {Buffer} [data.klausur_pdf] - The PDF data
     * @param {Date} [data.created_at] - Creation timestamp
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
     * Validate if the klausur has required fields
     * @returns {boolean} True if valid
     */
    isValid() {
        return !!(this.name && this.fach && this.semester);
    }

    /**
     * Get klausur metadata without PDF data
     * @returns {Object} Klausur metadata
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