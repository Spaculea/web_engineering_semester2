/**
 * @fileoverview Lösungs-PDF abrufen Use Case
 * @author Sergiu Paculea
 */

/**
 * Use Case zum Abrufen von Lösungs-PDFs
 * @class
 */
class GetSolutionPdfUseCase {
    /**
     * GetSolutionPdfUseCase erstellen
     * @param {LoesungRepositoryPort} loesungRepository - Loesung Repository
     */
    constructor(loesungRepository) {
        this.loesungRepository = loesungRepository;
    }

    /**
     * Use Case ausführen
     * @param {number} solutionId - Die Lösungs-ID
     * @returns {Promise<Object>} PDF-Daten und Dateiname
     */
    async execute(solutionId) {
        if (!solutionId) {
            throw new Error('Lösungs-ID ist erforderlich');
        }

        const pdfData = await this.loesungRepository.getPdfById(solutionId);
        
        if (!pdfData) {
            throw new Error('Lösung nicht gefunden');
        }

        return {
            pdf: pdfData.loesung_pdf,
            filename: `${pdfData.name}_Loesung.pdf`,
            contentType: 'application/pdf'
        };
    }
}

module.exports = GetSolutionPdfUseCase;