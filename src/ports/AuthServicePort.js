/**
 * @fileoverview Authentifizierungsservice Port Interface
 * @author Sergiu Paculea
 */

/**
 * Interface für Authentifizierungsoperationen
 * @interface
 */
class AuthServicePort {
    /**
     * Passwort hashen
     * @param {string} password - Das Klartext-Passwort
     * @returns {Promise<string>} Das gehashte Passwort
     */
    async hashPassword(password) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Passwort mit Hash vergleichen
     * @param {string} password - Das Klartext-Passwort
     * @param {string} hash - Der Passwort-Hash
     * @returns {Promise<boolean>} True wenn Passwort mit Hash übereinstimmt
     */
    async comparePassword(password, hash) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }
}

module.exports = AuthServicePort;