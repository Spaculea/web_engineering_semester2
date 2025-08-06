/**
 * @fileoverview Refactored Server using Hexagonal Architecture
 * @author Sergiu Paculea
 */

const express = require("express");
const session = require("express-session");
const path = require("path");
require('dotenv').config();

const Container = require('./Container');

// API Route Handlers
const createKlausurRoutes = require('./adapters/api/klausurRoutes');
const createLoesungRoutes = require('./adapters/api/loesungRoutes');
const createAuthRoutes = require('./adapters/api/authRoutes');
const { createUploadRoutes } = require('./adapters/api/uploadRoutes');

const app = express();
const port = 3000;

// Initialize dependency container
const container = new Container();

// Database configuration
const dbConfig = {
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'dhbw_klausuren',
  password: process.env.DB_PASSWORD || 'postgrePassword',
  port: parseInt(process.env.DB_PORT, 10) || 5400,
};

// Initialize container with dependencies
container.initialize(dbConfig);

// Session middleware
app.use(session({
  secret: 'dhbw-altklausuren-secret-key-2025',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Middleware for JSON parsing
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname)));

/**
 * Test database connection
 * @returns {Promise<boolean>} True if connection successful
 */
async function testDatabaseConnection() {
  try {
    const pool = container.get('pool');
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
 * Start the server
 */
async function startServer() {
  console.log('🚀 Starting server...');

  const dbConnected = await testDatabaseConnection();

  // Setup API routes using hexagonal architecture
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

  // Homepage route
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

// Graceful shutdown handling
process.on('SIGINT', async () => {
  console.log('🔄 Server wird beendet...');
  await container.cleanup();
  console.log('✅ Ressourcen bereinigt');
  process.exit(0);
});

// Start the application
startServer().catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});