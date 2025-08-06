/**
 * @fileoverview Lösungen abrufen Use Case
 * @author Sergiu Paculea
 */

/**
 * Use Case zum Abrufen von Lösungen nach Semester
 * @class
 */
class GetSolutionsUseCase {
    /**
     * GetSolutionsUseCase erstellen
     * @param {LoesungRepositoryPort} loesungRepository - Loesung Repository
     */
    constructor(loesungRepository) {
        this.loesungRepository = loesungRepository;
    }

    /**
     * Use Case ausführen
     * @param {string} semester - Das Semester für das Lösungen abgerufen werden sollen
     * @returns {Promise<Array>} Array mit Lösungs-Metadaten inklusive Klausur-Info
     */
    async execute(semester) {
        if (!semester) {
            throw new Error('Semester ist erforderlich');
        }

        const loesungen = await this.loesungRepository.findBySemester(semester);
        
        // Metadaten mit Klausur-Informationen zurückgeben
        return loesungen.map(loesung => ({
            id: loesung.id,
            name: loesung.name,
            fach: loesung.fach,
            klausur_id: loesung.klausur_id
        }));
    }
}

module.exports = GetSolutionsUseCase;