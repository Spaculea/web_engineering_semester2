/**
 * @fileoverview Bcrypt Authentication Service Adapter
 * @author Sergiu Paculea
 */

const bcrypt = require('bcrypt');
const AuthServicePort = require('../../ports/AuthServicePort');

/**
 * Bcrypt implementation of AuthServicePort
 * @class
 * @extends AuthServicePort
 */
class BcryptAuthService extends AuthServicePort {
    /**
     * Create BcryptAuthService
     * @param {number} [saltRounds=10] - Number of salt rounds for bcrypt
     */
    constructor(saltRounds = 10) {
        super();
        this.saltRounds = saltRounds;
    }

    /**
     * Hash a password
     * @param {string} password - The plain text password
     * @returns {Promise<string>} The hashed password
     */
    async hashPassword(password) {
        return bcrypt.hash(password, this.saltRounds);
    }

    /**
     * Compare password with hash
     * @param {string} password - The plain text password
     * @param {string} hash - The password hash
     * @returns {Promise<boolean>} True if password matches hash
     */
    async comparePassword(password, hash) {
        return bcrypt.compare(password, hash);
    }
}

module.exports = BcryptAuthService;