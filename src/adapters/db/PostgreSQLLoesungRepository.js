/**
 * @fileoverview PostgreSQL Loesung Repository Adapter
 * @author Sergiu Paculea
 */

const LoesungRepositoryPort = require('../../ports/LoesungRepositoryPort');

/**
 * PostgreSQL implementation of LoesungRepositoryPort
 * @class
 * @extends LoesungRepositoryPort
 */
class PostgreSQLLoesungRepository extends LoesungRepositoryPort {
    /**
     * Create PostgreSQLLoesungRepository
     * @param {Pool} pool - PostgreSQL connection pool
     */
    constructor(pool) {
        super();
        this.pool = pool;
    }

    /**
     * Find loesungen by semester (via klausur relationship)
     * @param {string} semester - The semester to search for
     * @returns {Promise<Array>} Array of loesungen with klausur info
     */
    async findBySemester(semester) {
        const { rows } = await this.pool.query(
            "SELECT l.id, k.name, k.fach, k.id as klausur_id FROM loesungen l JOIN klausuren k ON l.klausur_id = k.id WHERE k.semester = $1 ORDER BY k.fach",
            [semester]
        );
        return rows;
    }

    /**
     * Find loesung by ID
     * @param {number} id - The loesung ID
     * @returns {Promise<Object|null>} Loesung object or null if not found
     */
    async findById(id) {
        const { rows } = await this.pool.query(
            "SELECT id, klausur_id FROM loesungen WHERE id = $1",
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    /**
     * Create a new loesung
     * @param {Object} loesungData - The loesung data
     * @returns {Promise<number>} The created loesung ID
     */
    async create(loesungData) {
        const { klausur_id, loesung_pdf } = loesungData;
        const { rows } = await this.pool.query(
            "INSERT INTO loesungen (klausur_id, loesung_pdf) VALUES ($1, $2) RETURNING id",
            [klausur_id, loesung_pdf]
        );
        return rows[0].id;
    }

    /**
     * Get loesung PDF by ID
     * @param {number} id - The loesung ID
     * @returns {Promise<Object|null>} Object with PDF data and klausur name, or null
     */
    async getPdfById(id) {
        const { rows } = await this.pool.query(
            "SELECT l.loesung_pdf, k.name FROM loesungen l JOIN klausuren k ON l.klausur_id = k.id WHERE l.id = $1",
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = PostgreSQLLoesungRepository;