/**
 * @fileoverview Get Solutions Use Case
 * @author Sergiu Paculea
 */

/**
 * Use case for retrieving solutions by semester
 * @class
 */
class GetSolutionsUseCase {
    /**
     * Create GetSolutionsUseCase
     * @param {LoesungRepositoryPort} loesungRepository - Loesung repository
     */
    constructor(loesungRepository) {
        this.loesungRepository = loesungRepository;
    }

    /**
     * Execute the use case
     * @param {string} semester - The semester to get solutions for
     * @returns {Promise<Array>} Array of solution metadata with klausur info
     */
    async execute(semester) {
        if (!semester) {
            throw new Error('Semester is required');
        }

        const loesungen = await this.loesungRepository.findBySemester(semester);
        
        // Return metadata with klausur information
        return loesungen.map(loesung => ({
            id: loesung.id,
            name: loesung.name,
            fach: loesung.fach,
            klausur_id: loesung.klausur_id
        }));
    }
}

module.exports = GetSolutionsUseCase;