/**
 * @fileoverview Authentication Service Port Interface
 * @author Sergiu Paculea
 */

/**
 * Interface for authentication operations
 * @interface
 */
class AuthServicePort {
    /**
     * Hash a password
     * @param {string} password - The plain text password
     * @returns {Promise<string>} The hashed password
     */
    async hashPassword(password) {
        throw new Error('Method must be implemented by adapter');
    }

    /**
     * Compare password with hash
     * @param {string} password - The plain text password
     * @param {string} hash - The password hash
     * @returns {Promise<boolean>} True if password matches hash
     */
    async comparePassword(password, hash) {
        throw new Error('Method must be implemented by adapter');
    }
}

module.exports = AuthServicePort;