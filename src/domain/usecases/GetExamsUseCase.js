/**
 * @fileoverview Klausuren abrufen Use Case
 * @author Sergiu Paculea
 */

/**
 * Use Case zum Abrufen von Klausuren nach Semester
 * @class
 */
class GetExamsUseCase {
    /**
     * GetExamsUseCase erstellen
     * @param {KlausurRepositoryPort} klausurRepository - Klausur Repository
     */
    constructor(klausurRepository) {
        this.klausurRepository = klausurRepository;
    }

    /**
     * Use Case ausführen
     * @param {string} semester - Das Semester für das Klausuren abgerufen werden sollen
     * @returns {Promise<Array>} Array mit Klausur-Metadaten
     */
    async execute(semester) {
        if (!semester) {
            throw new Error('Semester ist erforderlich');
        }

        const klausuren = await this.klausurRepository.findBySemester(semester);
        
        // Nur Metadaten zurückgeben (keine PDF-Daten)
        return klausuren.map(klausur => ({
            id: klausur.id,
            name: klausur.name,
            fach: klausur.fach,
            semester: klausur.semester
        }));
    }
}

module.exports = GetExamsUseCase;