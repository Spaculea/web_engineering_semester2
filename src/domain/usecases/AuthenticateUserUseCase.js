/**
 * @fileoverview Benutzer authentifizieren Use Case
 * @author Sergiu Paculea
 */

/**
 * Use Case für Benutzerauthentifizierung
 * @class
 */
class AuthenticateUserUseCase {
    /**
     * AuthenticateUserUseCase erstellen
     * @param {UserRepositoryPort} userRepository - User Repository
     * @param {AuthServicePort} authService - Authentifizierungsservice
     */
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    /**
     * Use Case ausführen
     * @param {Object} credentials - Benutzeranmeldedaten
     * @param {string} credentials.username - Benutzername
     * @param {string} credentials.password - Passwort
     * @returns {Promise<Object>} Authentifizierungsergebnis
     */
    async execute(credentials) {
        const { username, password } = credentials;

        if (!username || !password) {
            throw new Error('Benutzername und Passwort sind erforderlich');
        }

        // Benutzer nach Benutzername suchen
        const user = await this.userRepository.findByUsername(username);
        
        if (!user) {
            throw new Error('Ungültiger Benutzername oder Passwort');
        }

        // Passwort überprüfen
        const isValidPassword = await this.authService.comparePassword(password, user.password_hash);
        
        if (!isValidPassword) {
            throw new Error('Ungültiger Benutzername oder Passwort');
        }

        // Benutzerinformationen zurückgeben (ohne sensible Daten)
        return {
            success: true,
            message: 'Login erfolgreich',
            user: {
                id: user.id,
                username: user.username
            }
        };
    }
}

module.exports = AuthenticateUserUseCase;