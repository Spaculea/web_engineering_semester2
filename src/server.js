/**
 * @fileoverview Server-seitige Logik für die Verwaltung von Klausuren und Lösungen.
 * @author Sergiu Paculea
 */
/**
 * @namespace ServerSideFunctions
 * @description Enthält Funktionen zum Starten des Servers, Testen der Datenbankverbindung
 */
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");
const multer = require("multer");
const path = require("path");
const { error } = require("console");
const fs = require("fs");

const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10 MB
});
const app = express();
const port = 3000;

// Session-Middleware
app.use(session({
  secret: 'dhbw-altklausuren-secret-key-2025', // Sicherer Schlüssel
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Bei HTTPS auf true setzen
    maxAge: 24 * 60 * 60 * 1000 // 24 Stunden
  }
}));

// Middleware für JSON-Parsing
app.use(express.json());

// Server statische Dateien bereitstellen
app.use(express.static(path.join(__dirname)));

require('dotenv').config(); // Lädt Umgebungsvariablen aus .env Datei

// PostgreSQL-Verbindung
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'dhbw_klausuren',
  password: process.env.DB_PASSWORD || 'sese20022003',
  port: parseInt(process.env.DB_PORT, 10) || 5400,
});

/**
 * @async
 * @function testDatabaseConnection
 * @memberof ServerSideFunctions
 * @description Testet die Datenbankverbindung, bevor die Anwendung gestartet wird.
 * Es gibt die Anzahl der Einträge in den Tabellen "klausuren" und "loesungen" aus.
 * @returns {Promise<boolean>} true if database connection is successful, false otherwise
 */
async function testDatabaseConnection() {
  try {
    const client = await pool.connect();
    console.log('✅ Database connected successfully');

    // Test query to check if klausuren table exists
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
 * @async
 * @function startServer
 * @memberof ServerSideFunctions
 * @description Startet den Express-Server und testet die Datenbankverbindung.
 * Wenn die Verbindung fehlschlägt, wird eine Warnung ausgegeben,
 */
async function startServer() {
  console.log('🚀 Starting server...');

  const dbConnected = await testDatabaseConnection();

  app.listen(port, () => {
    console.log(`✅ Server läuft auf http://localhost:${port}`);
    console.log(`✅ Umgebungsvariablen geladen: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    if (!dbConnected) {
      console.log('⚠️  Server started but database is not available');
    }
  });
}

/** 
 * Stellt die Homepage bereit, die das Frontend der Anwendung enthält.
 * @route GET /
 */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "homePage.html"));
});

/** 
 * @name GET /api/exams/:semester
 * @function
 * @memberof ServerSideFunctions
 * @description Gibt alle Klausuren für ein bestimmtes Semester zurück.
 * @param {string} semester - Das Semester, für das die Klausuren abgerufen werden sollen.
 * @returns {Array} - Ein Array von Klausuren, die das Semester, Fach und Name enthalten.
 * @throws {Error} - Gibt einen Fehler zurück, wenn die Abfrage fehlschlägt.
 */
app.get("/api/exams/:semester", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT id, name, fach, semester FROM klausuren WHERE semester = $1 ORDER BY fach",
      [req.params.semester]
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ Query error:', err);
    res.status(500).json({ error: "Fehler beim Laden der Klausuren" });
  }
});

/**
 * @name GET /api/solutions/:semester
 * @function
 * @memberof ServerSideFunctions
 * @description Gibt alle Lösungen für ein bestimmtes Semester zurück.
 * @param {string} semester - Das Semester, für das die Lösungen abgerufen werden sollen.
 * @returns {Array} - Ein Array von Lösungen, die die ID, Name, Fach und Klausur-ID enthalten.
 * @throws {Error} - Gibt einen Fehler zurück, wenn die Abfrage fehlschlägt.
 */
app.get("/api/solutions/:semester", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT l.id, k.name, k.fach, k.id as klausur_id FROM loesungen l JOIN klausuren k ON l.klausur_id = k.id WHERE k.semester = $1 ORDER BY k.fach",
      [req.params.semester]
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ Query error:', err);
    res.status(500).json({ error: "Fehler beim Laden der Lösungen" });
  }
});

/** 
 * @name GET /klausuren/:id/pdf
 * @function
 * @memberof ServerSideFunctions
 * @description Gibt das PDF-Dokument einer Klausur zurück.
 * @param {string} id - Die ID der Klausur, deren PDF abgerufen werden soll.
 * @returns {Buffer} - Das PDF-Dokument der Klausur.  
*/
app.get("/klausuren/:id/pdf", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT klausur_pdf, name FROM klausuren WHERE id = $1",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).send("Nicht gefunden.");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${rows[0].name}.pdf"`);
    res.send(rows[0].klausur_pdf);

  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Abrufen.");
  }
});

/** 
 * @name GET /loesungen/:id/pdf
 * @function
 * @memberof ServerSideFunctions
 * @description Gibt das PDF-Dokument einer Lösung zurück.
 * @param {string} id - Die ID der Lösung, deren PDF abgerufen werden soll.
 * @returns {Buffer} - Das PDF-Dokument der Lösung.
 */
app.get("/loesungen/:id/pdf", async (req, res) => {
  try {
    const { rows } = await pool.query(
      "SELECT l.loesung_pdf, k.name FROM loesungen l JOIN klausuren k ON l.klausur_id = k.id WHERE l.id = $1",
      [req.params.id]
    );
    if (rows.length === 0) {
      return res.status(404).send("Nicht gefunden.");
    }
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${rows[0].name}_Loesung.pdf"`);
    res.send(rows[0].loesung_pdf);

  } catch (err) {
    console.error(err);
    res.status(500).send("Fehler beim Abrufen.");
  }
});

/** 
 * @name POST /api/upload
 * @function
 * @memberof ServerSideFunctions
 * @description Ermöglicht das Hochladen von Klausur- und Lösungspapieren.
 * @param {Object} req - Die Anfrage, die die Dateien und Metadaten enthält.
 * @param {Object} res - Die Antwort, die den Status des Uploads zurückgibt.
 * @returns {Object} - Ein Objekt mit einer Erfolgsmeldung und den IDs der gespeicherten Klausur und Lösung.
 * @throws {Error} - Gibt einen Fehler zurück, wenn die Validierung fehlschlägt oder ein Fehler beim Speichern in der Datenbank auftritt.
 */
app.post("/api/upload", requireAuth, upload.fields([
  { name: "klausur", maxCount: 1 },
  { name: "loesung", maxCount: 1 }
]), async (req, res) => {
  try {
    const { name, fach, semester } = req.body;

    if (!name || !fach || !semester) {
      return res.status(400).json({ message: "Name, Fach und Semester sind erforderlich." });
    }

    const klausurPDF = req.files.klausur[0].buffer;
    let loesungPDF = null;
    let loesungId = null;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      // Klausur speichern
      const klausurResult = await client.query(
        "INSERT INTO klausuren (name, fach, semester, klausur_pdf) VALUES ($1, $2, $3, $4) RETURNING id",
        [name, fach, semester, klausurPDF]
      );
      const klausurId = klausurResult.rows[0].id;

      // Lösung speichern, falls vorhanden
      if (req.files.loesung && req.files.loesung[0]) {
        loesungPDF = req.files.loesung[0].buffer;

        const loesungResult = await client.query(
          "INSERT INTO loesungen (klausur_id, loesung_pdf) VALUES ($1, $2) RETURNING id",
          [klausurId, loesungPDF]
        );

        loesungId = loesungResult.rows[0].id;
      }

      await client.query("COMMIT");

      res.status(200).json({
        message: "Upload erfolgreich",
        klausurId,
        loesungId
      });
    } catch (error) {
      await client.query("ROLLBACK");
      console.error("Fehler beim Speichern in der Datenbank:", error);
      res.status(500).json({ error: "Fehler beim Speichern in der Datenbank" });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Fehler beim Verarbeiten der Anfrage:", error);
    res.status(500).json({ error: "Server-Fehler beim Verarbeiten des Uploads" });
  }
});

// Middleware für geschützte Routen
function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ message: 'Authentifizierung erforderlich' });
  }
  next();
}

/** Login-Route 
 * @route POST /api/login
 * @function  
 * @memberof ServerSideFunctions
 * @description Authentifiziert einen Benutzer anhand von Benutzernamen und Passwort.
*/
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Benutzername und Passwort sind erforderlich' });
    }

    // Benutzer aus Datenbank laden
    const result = await pool.query(
      'SELECT id, username, password_hash FROM users WHERE username = $1',
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Ungültiger Benutzername oder Passwort' });
    }

    const user = result.rows[0];

    const isValidPassword = await bcrypt.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Ungültiger Benutzername oder Passwort' });
    }

    // Authentifizierung erfolgreich
    req.session.userId = user.id;
    req.session.username = user.username;

    res.json({
      success: true,
      message: 'Login erfolgreich',
      userId: user.id,
      username: user.username
    });

  } catch (error) {
    console.error('Fehler beim Login:', error);
    res.status(500).json({ message: 'Serverfehler' });
  }
});

app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout-Fehler:', err);
      return res.status(500).json({ message: 'Serverfehler' });
    }
    res.json({ success: true, message: 'Logout erfolgreich' });
  });
});

/** Authentifizierungsstatus abfragen   
 * @route GET /api/auth/status
 * @function
 * @memberof ServerSideFunctions
 * @description Überprüft, ob der Benutzer angemeldet ist.
 * @param {Object} req - Die Anfrage, die die Session-Informationen enthält.
 * @param {Object} res - Die Antwort, die den Authentifizierungsstatus zurückgibt.
 * @returns {Object} - Ein Objekt, das den Authentifizierungsstatus und den Benutzernamen enthält, falls der Benutzer angemeldet ist.
*/
app.get('/api/auth/status', (req, res) => {
  if (req.session.userId) {
    res.json({ authenticated: true, username: req.session.username });
  } else {
    res.json({ authenticated: false });
  }
});

// Server starten
app.listen(port, () => {
  console.log(`✅ Server läuft auf http://localhost:${port}`);
  console.log(`✅ Umgebungsvariablen geladen: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('🔄 Server wird beendet...');
  pool.end(() => {
    console.log('✅ Datenbankverbindung geschlossen');
    process.exit(0);
  });
});
