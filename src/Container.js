/**
 * @fileoverview Anwendungs-Abhängigkeitscontainer
 * @author Sergiu Paculea
 */

const { Pool } = require('pg');

// Domain Use Cases
const GetExamsUseCase = require('./domain/usecases/GetExamsUseCase');
const GetSolutionsUseCase = require('./domain/usecases/GetSolutionsUseCase');
const UploadExamUseCase = require('./domain/usecases/UploadExamUseCase');
const AuthenticateUserUseCase = require('./domain/usecases/AuthenticateUserUseCase');
const GetExamPdfUseCase = require('./domain/usecases/GetExamPdfUseCase');
const GetSolutionPdfUseCase = require('./domain/usecases/GetSolutionPdfUseCase');

// Adapters
const PostgreSQLKlausurRepository = require('./adapters/db/PostgreSQLKlausurRepository');
const PostgreSQLLoesungRepository = require('./adapters/db/PostgreSQLLoesungRepository');
const PostgreSQLUserRepository = require('./adapters/db/PostgreSQLUserRepository');
const BcryptAuthService = require('./adapters/db/BcryptAuthService');

/**
 * Anwendungs-Abhängigkeitscontainer
 * @class
 */
class Container {
    constructor() {
        this.dependencies = {};
    }

    /**
     * Container mit Datenbankverbindung initialisieren
     * @param {Object} dbConfig - Datenbankkonfiguration
     */
    initialize(dbConfig) {
        // Datenbank-Verbindungspool erstellen
        const pool = new Pool(dbConfig);
        this.dependencies.pool = pool;

        // Repositories erstellen (Adapters)
        this.dependencies.klausurRepository = new PostgreSQLKlausurRepository(pool);
        this.dependencies.loesungRepository = new PostgreSQLLoesungRepository(pool);
        this.dependencies.userRepository = new PostgreSQLUserRepository(pool);
        this.dependencies.authService = new BcryptAuthService();

        // Use Cases erstellen (Domain Layer)
        this.dependencies.getExamsUseCase = new GetExamsUseCase(
            this.dependencies.klausurRepository
        );
        
        this.dependencies.getSolutionsUseCase = new GetSolutionsUseCase(
            this.dependencies.loesungRepository
        );
        
        this.dependencies.uploadExamUseCase = new UploadExamUseCase(
            this.dependencies.klausurRepository,
            this.dependencies.loesungRepository
        );
        
        this.dependencies.authenticateUserUseCase = new AuthenticateUserUseCase(
            this.dependencies.userRepository,
            this.dependencies.authService
        );
        
        this.dependencies.getExamPdfUseCase = new GetExamPdfUseCase(
            this.dependencies.klausurRepository
        );
        
        this.dependencies.getSolutionPdfUseCase = new GetSolutionPdfUseCase(
            this.dependencies.loesungRepository
        );
    }

    /**
     * Abhängigkeit nach Name abrufen
     * @param {string} name - Name der Abhängigkeit
     * @returns {*} Die Abhängigkeit
     */
    get(name) {
        if (!this.dependencies[name]) {
            throw new Error(`Abhängigkeit '${name}' wurde nicht gefunden`);
        }
        return this.dependencies[name];
    }

    /**
     * Ressourcen bereinigen
     */
    async cleanup() {
        if (this.dependencies.pool) {
            await this.dependencies.pool.end();
        }
    }
}

module.exports = Container;