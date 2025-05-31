const hashPassword = require('./Service/hashPassword.js');
const dataSource = require('./Datasource/MySQLMngr');
const crypto = require('crypto');

/**
 * Generate new credentials with native crypto
 */
function generateCredentials(password) {
    const salt = hashPassword.getSalt();
    const hash = hashPassword.encryptPassword(password, salt);
    const fullPassword = salt + hash;
    
    return {
        salt: salt,
        hash: hash,
        fullPassword: fullPassword,
        plainPassword: password
    };
}

/**
 * Delete all existing users
 */
async function deleteAllUsers() {
    try {
        console.log('🗑️  Deleting all existing users...');
        const deleteQuery = 'DELETE FROM usuario';
        const result = await dataSource.getData(deleteQuery);
        
        if (result.status) {
            console.log('✅ All users deleted successfully');
            return true;
        } else {
            console.log('❌ Error deleting users:', result.err);
            return false;
        }
    } catch (error) {
        console.log('❌ Error:', error.message);
        return false;
    }
}

/**
 * Create new users with generated credentials
 */
async function createNewUsers() {
    const users = [        {
            email: 'admin@mawi.com',
            nombre: 'Admin',
            apellidos: 'Principal',
            password: 'Admin2025!',
            rol: 3
        },
        {
            email: 'user@mawi.com',
            nombre: 'Regular',
            apellidos: 'User',
            password: 'User2025!',
            rol: 2
        },
        {
            email: 'superadmin@mawi.com',
            nombre: 'Super',
            apellidos: 'Administrator',
            password: 'SuperAdmin2025!',
            rol: 4
        }
    ];

    console.log('👤 Creating new users...');
    console.log('========================================');

    for (const userData of users) {
        try {
            // Generate credentials
            const credentials = generateCredentials(userData.password);
              // Insert user into database with correct field names including estado = 'A' (Active)
            const insertQuery = `
                INSERT INTO usuario (email, Nombre, Apellidos, password, rol, estado) 
                VALUES (?, ?, ?, ?, ?, ?)
            `;
            const params = [userData.email, userData.nombre, userData.apellidos, credentials.fullPassword, userData.rol, 'A'];
            
            const result = await dataSource.getDataWithParams(insertQuery, params);
            
            if (result.status) {
                console.log(`✅ User created: ${userData.email}`);
                console.log(`   Name: ${userData.nombre} ${userData.apellidos}`);
                console.log(`   Password: ${userData.password}`);
                console.log(`   Role: ${userData.rol}`);
                console.log(`   Salt: ${credentials.salt}`);
                console.log(`   Hash Length: ${credentials.hash.length}`);
                console.log(`   Full Password Length: ${credentials.fullPassword.length}`);
                console.log('----------------------------------------');
            } else {
                console.log(`❌ Error creating user ${userData.email}:`, result.err);
            }
        } catch (error) {
            console.log(`❌ Error creating user ${userData.email}:`, error.message);
        }
    }
}

/**
 * List all current users
 */
async function listUsers() {
    try {        console.log('📋 Current users in database:');
        const query = 'SELECT idUsuario, email, Nombre, Apellidos, rol, estado, LENGTH(password) as passwordLength FROM usuario';
        const result = await dataSource.getData(query);
        
        if (result.status && result.rows.length > 0) {
            console.log('========================================');
            result.rows.forEach(user => {                console.log(`ID: ${user.idUsuario}`);
                console.log(`Email: ${user.email}`);
                console.log(`Name: ${user.Nombre} ${user.Apellidos}`);
                console.log(`Role: ${user.rol}`);
                console.log(`Estado: ${user.estado}`);
                console.log(`Password Length: ${user.passwordLength}`);
                console.log('----------------------------------------');
            });
        } else {
            console.log('No users found or error occurred:', result.err);
        }
    } catch (error) {
        console.log('❌ Error listing users:', error.message);
    }
}

/**
 * Test authentication with new credentials
 */
async function testAuthentication() {    const testCredentials = [
        { email: 'admin@mawi.com', password: 'Admin2025!' },
        { email: 'user@mawi.com', password: 'User2025!' },
        { email: 'superadmin@mawi.com', password: 'SuperAdmin2025!' }
    ];

    console.log('🔐 Testing authentication...');
    console.log('========================================');

    for (const cred of testCredentials) {
        try {
            const user = await hashPassword.isValidUser(cred.email, cred.password);
            if (user) {
                console.log(`✅ Authentication successful for ${cred.email}`);
                console.log(`   User ID: ${user.id}`);
                console.log(`   Name: ${user.nombre}`);
            } else {
                console.log(`❌ Authentication failed for ${cred.email}`);
            }
        } catch (error) {
            console.log(`❌ Authentication error for ${cred.email}:`, error.message);
        }
        console.log('----------------------------------------');
    }
}

/**
 * Main function
 */
async function main() {
    console.log('🚀 MAWI User Management Tool');
    console.log('========================================');
    
    const args = process.argv.slice(2);
    const action = args[0] || 'help';

    switch (action) {
        case 'list':
            await listUsers();
            break;
        case 'delete':
            await deleteAllUsers();
            break;
        case 'create':
            await createNewUsers();
            break;
        case 'reset':
            await deleteAllUsers();
            await createNewUsers();
            break;
        case 'test':
            await testAuthentication();
            break;
        case 'full':
            await listUsers();
            await deleteAllUsers();
            await createNewUsers();
            await testAuthentication();
            break;
        default:
            console.log('Available commands:');
            console.log('  list    - List all current users');
            console.log('  delete  - Delete all users');
            console.log('  create  - Create new users');
            console.log('  reset   - Delete all and create new users');
            console.log('  test    - Test authentication');
            console.log('  full    - Complete reset and test');
            console.log('');
            console.log('Usage: node manage-users.js [command]');
            break;
    }

    process.exit(0);
}

// Run if called directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    generateCredentials,
    deleteAllUsers,
    createNewUsers,
    listUsers,
    testAuthentication
};
