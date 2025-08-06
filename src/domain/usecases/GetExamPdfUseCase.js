/**
 * @fileoverview Klausur PDF abrufen Use Case
 * @author Sergiu Paculea
 */

/**
 * Use Case zum Abrufen von Klausur-PDFs
 * @class
 */
class GetExamPdfUseCase {
    /**
     * GetExamPdfUseCase erstellen
     * @param {KlausurRepositoryPort} klausurRepository - Klausur Repository
     */
    constructor(klausurRepository) {
        this.klausurRepository = klausurRepository;
    }

    /**
     * Use Case ausführen
     * @param {number} examId - Die Klausur-ID
     * @returns {Promise<Object>} PDF-Daten und Dateiname
     */
    async execute(examId) {
        if (!examId) {
            throw new Error('Klausur-ID ist erforderlich');
        }

        const pdfData = await this.klausurRepository.getPdfById(examId);
        
        if (!pdfData) {
            throw new Error('Klausur nicht gefunden');
        }

        return {
            pdf: pdfData.klausur_pdf,
            filename: `${pdfData.name}.pdf`,
            contentType: 'application/pdf'
        };
    }
}

module.exports = GetExamPdfUseCase;