/**
 * @fileoverview PostgreSQL User Repository Adapter
 * @author Sergiu Paculea
 */

const UserRepositoryPort = require('../../ports/UserRepositoryPort');

/**
 * PostgreSQL implementation of UserRepositoryPort
 * @class
 * @extends UserRepositoryPort
 */
class PostgreSQLUserRepository extends UserRepositoryPort {
    /**
     * Create PostgreSQLUserRepository
     * @param {Pool} pool - PostgreSQL connection pool
     */
    constructor(pool) {
        super();
        this.pool = pool;
    }

    /**
     * Find user by username
     * @param {string} username - The username to search for
     * @returns {Promise<Object|null>} User object or null if not found
     */
    async findByUsername(username) {
        const { rows } = await this.pool.query(
            'SELECT id, username, password_hash FROM users WHERE username = $1',
            [username]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    /**
     * Find user by ID
     * @param {number} id - The user ID
     * @returns {Promise<Object|null>} User object or null if not found
     */
    async findById(id) {
        const { rows } = await this.pool.query(
            'SELECT id, username FROM users WHERE id = $1',
            [id]
        );
        return rows.length > 0 ? rows[0] : null;
    }

    /**
     * Create a new user
     * @param {Object} userData - The user data
     * @returns {Promise<number>} The created user ID
     */
    async create(userData) {
        const { username, password_hash } = userData;
        const { rows } = await this.pool.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
            [username, password_hash]
        );
        return rows[0].id;
    }
}

module.exports = PostgreSQLUserRepository;