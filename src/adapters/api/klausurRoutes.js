/**
 * @fileoverview Express API Routes for Klausur operations
 * @author Sergiu Paculea
 */

/**
 * Creates Express routes for klausur operations
 * @param {GetExamsUseCase} getExamsUseCase - Use case for getting exams
 * @param {GetExamPdfUseCase} getExamPdfUseCase - Use case for getting exam PDFs
 * @returns {Object} Express router
 */
function createKlausurRoutes(getExamsUseCase, getExamPdfUseCase) {
    const express = require('express');
    const router = express.Router();

    /**
     * GET /api/exams/:semester
     * Get all exams for a specific semester
     */
    router.get('/api/exams/:semester', async (req, res) => {
        try {
            const exams = await getExamsUseCase.execute(req.params.semester);
            res.json(exams);
        } catch (err) {
            console.error('❌ Query error:', err);
            res.status(500).json({ error: "Fehler beim Laden der Klausuren" });
        }
    });

    /**
     * GET /klausuren/:id/pdf
     * Get PDF document for a specific exam
     */
    router.get('/klausuren/:id/pdf', async (req, res) => {
        try {
            const pdfData = await getExamPdfUseCase.execute(parseInt(req.params.id));
            
            res.setHeader("Content-Type", pdfData.contentType);
            res.setHeader("Content-Disposition", `attachment; filename="${pdfData.filename}"`);
            res.send(pdfData.pdf);
        } catch (err) {
            if (err.message === 'Klausur nicht gefunden') {
                return res.status(404).send("Nicht gefunden.");
            }
            console.error('❌ Error:', err);
            res.status(500).send("Fehler beim Abrufen.");
        }
    });

    return router;
}

module.exports = createKlausurRoutes;