const bcrypt = require('bcrypt');

async function generateAdminUser() {
    const password = 'admin123'; // Standard-Passwort für Admin
    const hash = await bcrypt.hash(password, 10);

    console.log('Admin-Benutzer erstellen:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('Hash:', hash);
    console.log('');
    console.log('SQL-Befehl zum Einfügen:');
    console.log(`INSERT INTO users (username, password_hash) VALUES ('admin', '${hash}') ON CONFLICT (username) DO NOTHING;`);
}

generateAdminUser().catch(console.error);
