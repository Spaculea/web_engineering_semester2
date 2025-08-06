/**
 * @fileoverview User Repository Port Interface
 * @author Sergiu Paculea
 */

/**
 * Interface für User Repository Operationen
 * @interface
 */
class UserRepositoryPort {
    /**
     * Benutzer nach Benutzername finden
     * @param {string} username - Der zu suchende Benutzername
     * @returns {Promise<Object|null>} User-Objekt oder null wenn nicht gefunden
     */
    async findByUsername(username) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Benutzer nach ID finden
     * @param {number} id - Die Benutzer-ID
     * @returns {Promise<Object|null>} User-Objekt oder null wenn nicht gefunden
     */
    async findById(id) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }

    /**
     * Neuen Benutzer erstellen
     * @param {Object} userData - Die Benutzerdaten
     * @returns {Promise<number>} Die erstellte Benutzer-ID
     */
    async create(userData) {
        throw new Error('Methode muss vom Adapter implementiert werden');
    }
}

module.exports = UserRepositoryPort;