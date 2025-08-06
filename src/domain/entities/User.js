/**
 * @fileoverview User domain entity
 * @author Sergiu Paculea
 */

/**
 * User entity representing a user in the system
 * @class
 */
class User {
    /**
     * Create a User
     * @param {Object} data - User data
     * @param {number} [data.id] - The user ID
     * @param {string} data.username - The username
     * @param {string} [data.password_hash] - The password hash
     * @param {Date} [data.created_at] - Creation timestamp
     */
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.password_hash = data.password_hash;
        this.created_at = data.created_at;
    }

    /**
     * Validate if the user has required fields
     * @returns {boolean} True if valid
     */
    isValid() {
        return !!(this.username);
    }

    /**
     * Get user data without sensitive information
     * @returns {Object} Public user data
     */
    getPublicData() {
        return {
            id: this.id,
            username: this.username,
            created_at: this.created_at
        };
    }
}

module.exports = User;