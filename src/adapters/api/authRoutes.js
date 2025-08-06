/**
 * @fileoverview Express API Routes for Authentication operations
 * @author Sergiu Paculea
 */

/**
 * Creates Express routes for authentication operations
 * @param {AuthenticateUserUseCase} authenticateUserUseCase - Use case for user authentication
 * @returns {Object} Express router
 */
function createAuthRoutes(authenticateUserUseCase) {
    const express = require('express');
    const router = express.Router();

    /**
     * POST /api/login
     * Authenticate a user
     */
    router.post('/api/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            if (!username || !password) {
                return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich' });
            }

            const result = await authenticateUserUseCase.execute({ username, password });

            // Set session data
            req.session.userId = result.user.id;
            req.session.username = result.user.username;

            res.json({
                success: result.success,
                message: result.message,
                userId: result.user.id,
                username: result.user.username
            });

        } catch (error) {
            if (error.message.includes('Ungültiger Benutzername oder Passwort')) {
                return res.status(401).json({ message: error.message });
            }
            console.error('Fehler beim Login:', error);
            res.status(500).json({ message: 'Serverfehler' });
        }
    });

    /**
     * POST /api/logout
     * Logout current user
     */
    router.post('/api/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.error('Logout-Fehler:', err);
                return res.status(500).json({ message: 'Serverfehler' });
            }
            res.json({ success: true, message: 'Logout erfolgreich' });
        });
    });

    /**
     * GET /api/auth/status
     * Check authentication status
     */
    router.get('/api/auth/status', (req, res) => {
        if (req.session.userId) {
            res.json({ authenticated: true, username: req.session.username });
        } else {
            res.json({ authenticated: false });
        }
    });

    return router;
}

module.exports = createAuthRoutes;