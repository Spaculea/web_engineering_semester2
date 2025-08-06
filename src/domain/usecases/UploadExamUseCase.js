/**
 * @fileoverview Upload Exam Use Case
 * @author Sergiu Paculea
 */

const Klausur = require('../entities/Klausur');
const Loesung = require('../entities/Loesung');

/**
 * Use case for uploading exam and solution files
 * @class
 */
class UploadExamUseCase {
    /**
     * Create UploadExamUseCase
     * @param {KlausurRepositoryPort} klausurRepository - Klausur repository
     * @param {LoesungRepositoryPort} loesungRepository - Loesung repository
     */
    constructor(klausurRepository, loesungRepository) {
        this.klausurRepository = klausurRepository;
        this.loesungRepository = loesungRepository;
    }

    /**
     * Execute the use case
     * @param {Object} uploadData - The upload data
     * @param {string} uploadData.name - Exam name
     * @param {string} uploadData.fach - Subject
     * @param {string} uploadData.semester - Semester
     * @param {Buffer} uploadData.klausurPDF - Exam PDF data
     * @param {Buffer} [uploadData.loesungPDF] - Solution PDF data (optional)
     * @returns {Promise<Object>} Upload result with IDs
     */
    async execute(uploadData) {
        const { name, fach, semester, klausurPDF, loesungPDF } = uploadData;

        // Validate required fields
        if (!name || !fach || !semester || !klausurPDF) {
            throw new Error('Name, Fach, Semester und Klausur-PDF sind erforderlich');
        }

        // Create klausur entity
        const klausur = new Klausur({
            name,
            fach,
            semester,
            klausur_pdf: klausurPDF
        });

        if (!klausur.isValid()) {
            throw new Error('Ungültige Klausur-Daten');
        }

        // Save klausur
        const klausurId = await this.klausurRepository.create({
            name: klausur.name,
            fach: klausur.fach,
            semester: klausur.semester,
            klausur_pdf: klausur.klausur_pdf
        });

        let loesungId = null;

        // Save solution if provided
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