/**
 * @fileoverview Refaktorierter Server mit Hexagonaler Architektur
 * @author Sergiu Paculea
 */

const express = require("express");
const session = require("express-session");
const path = require("path");
require('dotenv').config();

const Container = require('./Container');

// API Route Handler
const createKlausurRoutes = require('./adapters/api/klausurRoutes');
const createLoesungRoutes = require('./adapters/api/loesungRoutes');
const createAuthRoutes = require('./adapters/api/authRoutes');
const { createUploadRoutes } = require('./adapters/api/uploadRoutes');

const app = express();
const port = 3000;

// Dependency Container initialisieren
const container = new Container();

// Datenbankkonfiguration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'dhbw_klausuren',
  password: process.env.DB_PASSWORD || 'postgrePassword',
  port: parseInt(process.env.DB_PORT, 10) || 5400,
};

// Container mit Abhängigkeiten initialisieren
container.initialize(dbConfig);

// Session Middleware
app.use(session({
  secret: 'dhbw-altklausuren-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 Stunden
  }
}));

// Middleware für JSON-Parsing
app.use(express.json());

// Statische Dateien bereitstellen
app.use(express.static(path.join(__dirname)));

/**
 * Datenbankverbindung testen
 * @returns {Promise<boolean>} True wenn Verbindung erfolgreich
 */
async function testDatabaseConnection() {
  try {
    const pool = container.get('pool');
    const client = await pool.connect();
    console.log('✅ Database connected successfully');

    // Testabfrage um zu prüfen ob klausuren-Tabelle existiert
    let result = await client.query("SELECT COUNT(*) FROM klausuren");
    console.log(`📊 Klausuren table has ${result.rows[0].count} records`);

    result = await client.query("SELECT COUNT(*) FROM loesungen");
    console.log(`📊 Lösungen table has ${result.rows[0].count} records`);

    client.release();
    return true;
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
    console.error('Make sure PostgreSQL is running and credentials are correct');
    return false;
  }
}

/**
 * Server starten
 */
async function startServer() {
  console.log('🚀 Starting server...');

  const dbConnected = await testDatabaseConnection();

  // API-Routen mit hexagonaler Architektur einrichten
  app.use(createKlausurRoutes(
    container.get('getExamsUseCase'),
    container.get('getExamPdfUseCase')
  ));

  app.use(createLoesungRoutes(
    container.get('getSolutionsUseCase'),
    container.get('getSolutionPdfUseCase')
  ));

  app.use(createAuthRoutes(
    container.get('authenticateUserUseCase')
  ));

  app.use(createUploadRoutes(
    container.get('uploadExamUseCase')
  ));

  // Homepage-Route
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "homePage.html"));
  });

  app.listen(port, () => {
    console.log(`✅ Server läuft auf http://localhost:${port}`);
    console.log(`✅ Umgebungsvariablen geladen: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    if (!dbConnected) {
      console.log('⚠️  Server started but database is not available');
    }
  });
}

// Graceful Shutdown Handling
process.on('SIGINT', async () => {
  console.log('🔄 Server wird beendet...');
  await container.cleanup();
  console.log('✅ Ressourcen bereinigt');
  process.exit(0);
});

// Anwendung starten
startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});