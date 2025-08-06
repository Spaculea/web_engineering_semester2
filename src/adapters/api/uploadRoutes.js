/**
 * @fileoverview Express API Routes for Upload operations
 * @author Sergiu Paculea
 */

const multer = require("multer");

// Configure multer for file uploads
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // Max 10 MB
});

/**
 * Middleware for protected routes
 */
function requireAuth(req, res, next) {
    if (!req.session.userId) {
        return res.status(401).json({ message: 'Authentifizierung erforderlich' });
    }
    next();
}

/**
 * Creates Express routes for upload operations
 * @param {UploadExamUseCase} uploadExamUseCase - Use case for uploading exams
 * @returns {Object} Express router
 */
function createUploadRoutes(uploadExamUseCase) {
    const express = require('express');
    const router = express.Router();

    /**
     * POST /api/upload
     * Upload exam and solution files
     */
    router.post("/api/upload", requireAuth, upload.fields([
        { name: "klausur", maxCount: 1 },
        { name: "loesung", maxCount: 1 }
    ]), async (req, res) => {
        try {
            const { name, fach, semester } = req.body;

            if (!name || !fach || !semester) {
                return res.status(400).json({ message: "Name, Fach und Semester sind erforderlich." });
            }

            if (!req.files.klausur || !req.files.klausur[0]) {
                return res.status(400).json({ message: "Klausur-PDF ist erforderlich." });
            }

            const klausurPDF = req.files.klausur[0].buffer;
            let loesungPDF = null;

            if (req.files.loesung && req.files.loesung[0]) {
                loesungPDF = req.files.loesung[0].buffer;
            }

            const result = await uploadExamUseCase.execute({
                name,
                fach,
                semester,
                klausurPDF,
                loesungPDF
            });

            res.status(200).json(result);

        } catch (error) {
            console.error("Fehler beim Verarbeiten der Anfrage:", error);
            
            if (error.message.includes('erforderlich') || error.message.includes('Ungültige')) {
                return res.status(400).json({ error: error.message });
            }
            
            res.status(500).json({ error: "Server-Fehler beim Verarbeiten des Uploads" });
        }
    });

    return router;
}

module.exports = { createUploadRoutes, requireAuth };