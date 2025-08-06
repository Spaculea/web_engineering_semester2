/**
 * @fileoverview Get Exam PDF Use Case
 * @author Sergiu Paculea
 */

/**
 * Use case for retrieving exam PDF
 * @class
 */
class GetExamPdfUseCase {
    /**
     * Create GetExamPdfUseCase
     * @param {KlausurRepositoryPort} klausurRepository - Klausur repository
     */
    constructor(klausurRepository) {
        this.klausurRepository = klausurRepository;
    }

    /**
     * Execute the use case
     * @param {number} examId - The exam ID
     * @returns {Promise<Object>} PDF data and filename
     */
    async execute(examId) {
        if (!examId) {
            throw new Error('Exam ID is required');
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