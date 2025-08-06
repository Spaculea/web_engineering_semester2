/**
 * @fileoverview Klausur hochladen Use Case
 * @author Sergiu Paculea
 */

const Klausur = require('../entities/Klausur');
const Loesung = require('../entities/Loesung');

/**
 * Use Case zum Hochladen von Klausur- und Lösungsdateien
 * @class
 */
class UploadExamUseCase {
    /**
     * UploadExamUseCase erstellen
     * @param {KlausurRepositoryPort} klausurRepository - Klausur Repository
     * @param {LoesungRepositoryPort} loesungRepository - Loesung Repository
     */
    constructor(klausurRepository, loesungRepository) {
        this.klausurRepository = klausurRepository;
        this.loesungRepository = loesungRepository;
    }

    /**
     * Use Case ausführen
     * @param {Object} uploadData - Die Upload-Daten
     * @param {string} uploadData.name - Klausurname
     * @param {string} uploadData.fach - Fach
     * @param {string} uploadData.semester - Semester
     * @param {Buffer} uploadData.klausurPDF - Klausur-PDF-Daten
     * @param {Buffer} [uploadData.loesungPDF] - Lösungs-PDF-Daten (optional)
     * @returns {Promise<Object>} Upload-Ergebnis mit IDs
     */
    async execute(uploadData) {
        const { name, fach, semester, klausurPDF, loesungPDF } = uploadData;

        // Erforderliche Felder validieren
        if (!name || !fach || !semester || !klausurPDF) {
            throw new Error('Name, Fach, Semester und Klausur-PDF sind erforderlich');
        }

        // Klausur-Entität erstellen
        const klausur = new Klausur({
            name,
            fach,
            semester,
            klausur_pdf: klausurPDF
        });

        if (!klausur.isValid()) {
            throw new Error('Ungültige Klausur-Daten');
        }

        // Klausur speichern
        const klausurId = await this.klausurRepository.create({
            name: klausur.name,
            fach: klausur.fach,
            semester: klausur.semester,
            klausur_pdf: klausur.klausur_pdf
        });

        let loesungId = null;

        // Lösung speichern falls bereitgestellt
        if (loesungPDF) {
            const loesung = new Loesung({
                klausur_id: klausurId,
                loesung_pdf: loesungPDF
            });

            if (!loesung.isValid()) {
                throw new Error('Ungültige Lösungs-Daten');
            }

            loesungId = await this.loesungRepository.create({
                klausur_id: loesung.klausur_id,
                loesung_pdf: loesung.loesung_pdf
            });
        }

        return {
            message: 'Upload erfolgreich',
            klausurId,
            loesungId
        };
    }
}

module.exports = UploadExamUseCase;