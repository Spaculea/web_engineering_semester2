/**
 * @fileoverview Get Solution PDF Use Case
 * @author Sergiu Paculea
 */

/**
 * Use case for retrieving solution PDF
 * @class
 */
class GetSolutionPdfUseCase {
    /**
     * Create GetSolutionPdfUseCase
     * @param {LoesungRepositoryPort} loesungRepository - Loesung repository
     */
    constructor(loesungRepository) {
        this.loesungRepository = loesungRepository;
    }

    /**
     * Execute the use case
     * @param {number} solutionId - The solution ID
     * @returns {Promise<Object>} PDF data and filename
     */
    async execute(solutionId) {
        if (!solutionId) {
            throw new Error('Solution ID is required');
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