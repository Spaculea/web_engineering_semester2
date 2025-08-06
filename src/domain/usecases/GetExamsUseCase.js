/**
 * @fileoverview Get Exams Use Case
 * @author Sergiu Paculea
 */

/**
 * Use case for retrieving exams by semester
 * @class
 */
class GetExamsUseCase {
    /**
     * Create GetExamsUseCase
     * @param {KlausurRepositoryPort} klausurRepository - Klausur repository
     */
    constructor(klausurRepository) {
        this.klausurRepository = klausurRepository;
    }

    /**
     * Execute the use case
     * @param {string} semester - The semester to get exams for
     * @returns {Promise<Array>} Array of exam metadata
     */
    async execute(semester) {
        if (!semester) {
            throw new Error('Semester is required');
        }

        const klausuren = await this.klausurRepository.findBySemester(semester);
        
        // Return metadata only (no PDF data)
        return klausuren.map(klausur => ({
            id: klausur.id,
            name: klausur.name,
            fach: klausur.fach,
            semester: klausur.semester
        }));
    }
}

module.exports = GetExamsUseCase;