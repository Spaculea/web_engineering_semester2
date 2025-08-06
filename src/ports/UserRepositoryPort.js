/**
 * @fileoverview User Repository Port Interface
 * @author Sergiu Paculea
 */

/**
 * Interface for User repository operations
 * @interface
 */
class UserRepositoryPort {
    /**
     * Find user by username
     * @param {string} username - The username to search for
     * @returns {Promise<Object|null>} User object or null if not found
     */
    async findByUsername(username) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Find user by ID
     * @param {number} id - The user ID
     * @returns {Promise<Object|null>} User object or null if not found
     */
    async findById(id) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Create a new user
     * @param {Object} userData - The user data
     * @returns {Promise<number>} The created user ID
     */
    async create(userData) {
        throw new Error('Method must be implemented by adapter');
    }
}

module.exports = UserRepositoryPort;