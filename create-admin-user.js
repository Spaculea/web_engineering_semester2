const bcrypt = require('bcrypt');
const { Pool } = require('pg');

// Lade Umgebungsvariablen
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10)
});

async function createAdminUser() {
    try {
        const username = 'admin';
        const password = 'admin123';

        // Erstelle Hash
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        console.log(`Erstelle Admin-Benutzer:`);
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        console.log(`Hash: ${passwordHash}`);

        // Lösche vorhandenen Admin-Benutzer
        await pool.query('DELETE FROM users WHERE username = $1', [username]);

        // Füge neuen Admin-Benutzer ein
        const result = await pool.query(
            'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id',
            [username, passwordHash]
        );

        console.log(`✅ Admin-Benutzer erfolgreich erstellt mit ID: ${result.rows[0].id}`);

        // Überprüfe die Erstellung
        const checkResult = await pool.query('SELECT id, username, LENGTH(password_hash) as hash_length FROM users WHERE username = $1', [username]);
        console.log(`✅ Überprüfung: User ID ${checkResult.rows[0].id}, Hash-Länge: ${checkResult.rows[0].hash_length}`);

    } catch (error) {
        console.error('❌ Fehler beim Erstellen des Admin-Benutzers:', error);
    } finally {
        await pool.end();
    }
}

createAdminUser();
