/**
 * @fileoverview Express API Routes for Loesung operations
 * @author Sergiu Paculea
 */

/**
 * Creates Express routes for loesung operations
 * @param {GetSolutionsUseCase} getSolutionsUseCase - Use case for getting solutions
 * @param {GetSolutionPdfUseCase} getSolutionPdfUseCase - Use case for getting solution PDFs
 * @returns {Object} Express router
 */
function createLoesungRoutes(getSolutionsUseCase, getSolutionPdfUseCase) {
    const express = require('express');
    const router = express.Router();

    /**
     * GET /api/solutions/:semester
     * Get all solutions for a specific semester
     */
    router.get('/api/solutions/:semester', async (req, res) => {
        try {
            const solutions = await getSolutionsUseCase.execute(req.params.semester);
            res.json(solutions);
        } catch (err) {
            console.error('❌ Query error:', err);
            res.status(500).json({ error: "Fehler beim Laden der Lösungen" });
        }
    });

    /**
     * GET /loesungen/:id/pdf
     * Get PDF document for a specific solution
     */
    router.get('/loesungen/:id/pdf', async (req, res) => {
        try {
            const pdfData = await getSolutionPdfUseCase.execute(parseInt(req.params.id));
            
            res.setHeader("Content-Type", pdfData.contentType);
            res.setHeader("Content-Disposition", `attachment; filename="${pdfData.filename}"`);
            res.send(pdfData.pdf);
        } catch (err) {
            if (err.message === 'Lösung nicht gefunden') {
                return res.status(404).send("Nicht gefunden.");
            }
            console.error('❌ Error:', err);
            res.status(500).send("Fehler beim Abrufen.");
        }
    });

    return router;
}

module.exports = createLoesungRoutes;