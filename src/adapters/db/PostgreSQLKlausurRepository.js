/**
 * @fileoverview PostgreSQL Klausur Repository Adapter
 * @author Sergiu Paculea
 */

const KlausurRepositoryPort = require('../../ports/KlausurRepositoryPort');

/**
 * PostgreSQL-Implementierung des KlausurRepositoryPort
 * @class
 * @extends KlausurRepositoryPort
 */
class PostgreSQLKlausurRepository extends KlausurRepositoryPort {
    /**
     * Create PostgreSQLKlausurRepository
     * @param {Pool} pool - PostgreSQL connection pool
     */
    constructor(pool) {
        super();
        this.pool = pool;
    }

    /**
     * Find klausuren by semester
     * @param {string} semester - The semester to search for
     * @returns {Promise<Array>} Array of klausuren
     */
    async findBySemester(semester) {
        const { rows } = await this.pool.query(
            "SELECT id, name, fach, semester FROM klausuren WHERE semester = $1 ORDER BY fach",
            [semester]
        );
        return rows;
    }

    /**
     * Find klausur by ID
     * @param {number} id - The klausur ID
     * @returns {Promise<Object|null>} Klausur object or null if not found
     */
    async findById(id) {
        const { rows } = await this.pool.query(
            "SELECT id, name, fach, semester FROM klausuren WHERE id = $1",
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    /**
     * Create a new klausur
     * @param {Object} klausurData - The klausur data
     * @returns {Promise<number>} The created klausur ID
     */
    async create(klausurData) {
        const { name, fach, semester, klausur_pdf } = klausurData;
        const { rows } = await this.pool.query(
            "INSERT INTO klausuren (name, fach, semester, klausur_pdf) VALUES ($1, $2, $3, $4) RETURNING id",
            [name, fach, semester, klausur_pdf]
        );
        return rows[0].id;
    }

    /**
     * Get klausur PDF by ID
     * @param {number} id - The klausur ID
     * @returns {Promise<Object|null>} Object with PDF data and name, or null
     */
    async getPdfById(id) {
        const { rows } = await this.pool.query(
            "SELECT klausur_pdf, name FROM klausuren WHERE id = $1",
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }
}

module.exports = PostgreSQLKlausurRepository;