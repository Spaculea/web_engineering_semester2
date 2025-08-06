/**
 * @fileoverview Authenticate User Use Case
 * @author Sergiu Paculea
 */

/**
 * Use case for user authentication
 * @class
 */
class AuthenticateUserUseCase {
    /**
     * Create AuthenticateUserUseCase
     * @param {UserRepositoryPort} userRepository - User repository
     * @param {AuthServicePort} authService - Authentication service
     */
    constructor(userRepository, authService) {
        this.userRepository = userRepository;
        this.authService = authService;
    }

    /**
     * Execute the use case
     * @param {Object} credentials - User credentials
     * @param {string} credentials.username - Username
     * @param {string} credentials.password - Password
     * @returns {Promise<Object>} Authentication result
     */
    async execute(credentials) {
        const { username, password } = credentials;

        if (!username || !password) {
            throw new Error('Benutzername und Passwort sind erforderlich');
        }

        // Find user by username
        const user = await this.userRepository.findByUsername(username);
        
        if (!user) {
            throw new Error('Ungültiger Benutzername oder Passwort');
        }

        // Verify password
        const isValidPassword = await this.authService.comparePassword(password, user.password_hash);
        
        if (!isValidPassword) {
            throw new Error('Ungültiger Benutzername oder Passwort');
        }

        // Return user info (without sensitive data)
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