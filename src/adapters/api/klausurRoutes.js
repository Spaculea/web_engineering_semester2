/**
 * @fileoverview Express API Routes für Klausur-Operationen
 * @author Sergiu Paculea
 */

/**
 * Erstellt Express-Routen für Klausur-Operationen
 * @param {GetExamsUseCase} getExamsUseCase - Use Case zum Abrufen von Klausuren
 * @param {GetExamPdfUseCase} getExamPdfUseCase - Use Case zum Abrufen von Klausur-PDFs
 * @returns {Object} Express Router
 */
function createKlausurRoutes(getExamsUseCase, getExamPdfUseCase) {
    const express = require('express');
    const router = express.Router();

    /**
     * GET /api/exams/:semester
     * Alle Klausuren für ein bestimmtes Semester abrufen
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
     * PDF-Dokument für eine bestimmte Klausur abrufen
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