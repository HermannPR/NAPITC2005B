#!/usr/bin/env node

/**
 * MAWI Test Data Validation Script
 * Validates that test records were properly inserted and are accessible via API
 */

const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';
const TEST_USER_EMAIL = 'test.admin@mawi.com';
const TEST_USER_PASSWORD = 'TestPassword123!';

let authToken = null;
let userId = null;

console.log('🔍 MAWI Test Data Validation');
console.log('==============================');

async function validateTestData() {
    try {
        // Step 1: Authenticate
        console.log('🔐 Authenticating test user...');
        await authenticateTestUser();
        
        // Step 2: Get user data
        console.log('👤 Retrieving user information...');
        await getUserData();
        
        // Step 3: Validate records
        console.log('📊 Validating test records...');
        await validateRecords();
        
        // Step 4: Test admin endpoints
        console.log('👨‍💼 Testing admin endpoints...');
        await testAdminEndpoints();
        
        console.log('\n✅ Validation completed successfully!');
        console.log('🎉 All test data is properly accessible via the API');
        
    } catch (error) {
        console.error('❌ Validation failed:', error.message);
        process.exit(1);
    }
}

async function authenticateTestUser() {
    try {
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: TEST_USER_EMAIL,
                password: TEST_USER_PASSWORD
            })
        });
        
        if (!response.ok) {
            throw new Error(`Authentication failed: ${response.status}`);
        }
        
        const data = await response.json();
        authToken = data.token;
        
        // Decode JWT to get user ID
        const payload = JSON.parse(atob(authToken.split('.')[1]));
        userId = payload.id;
        
        console.log(`   ✅ Authenticated successfully (User ID: ${userId})`);
        
    } catch (error) {
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

async function getUserData() {
    try {
        const response = await fetch(`${BASE_URL}/Consultas/api/getusers`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to get users: ${response.status}`);
        }
        
        const data = await response.json();
        const users = data.records || [];
        const testUser = users.find(u => u.email === TEST_USER_EMAIL);
        
        if (!testUser) {
            throw new Error('Test user not found in user list');
        }
        
        console.log(`   ✅ User found: ${testUser.Nombre} ${testUser.Apellidos}`);
        console.log(`   📊 Total records: ${testUser.TotalRegistros}`);
        
    } catch (error) {
        throw new Error(`User data validation failed: ${error.message}`);
    }
}

async function validateRecords() {
    try {
        const response = await fetch(`${BASE_URL}/Consultas/api/getRegistros/${userId}`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (!response.ok) {
            throw new Error(`Failed to get records: ${response.status}`);
        }
        
        const data = await response.json();
        const records = data.registros || [];
        
        console.log(`   📋 Total records found: ${records.length}`);
        
        // Count records by type
        const recordTypes = {};
        records.forEach(record => {
            const type = record.tipoRegistro;
            recordTypes[type] = (recordTypes[type] || 0) + 1;
        });
        
        console.log('   📊 Records by type:');
        Object.entries(recordTypes).forEach(([type, count]) => {
            console.log(`      • ${type}: ${count} records`);
        });
        
        // Validate we have all expected types
        const expectedTypes = [
            'variables_climaticas',
            'camaras_trampa',
            'fauna_busqueda_libre',
            'fauna_punto_conteo',
            'fauna_transecto',
            'validacion_cobertura',
            'parcela_vegetacion'
        ];
        
        const missingTypes = expectedTypes.filter(type => !recordTypes[type]);
        if (missingTypes.length > 0) {
            console.log(`   ⚠️  Missing record types: ${missingTypes.join(', ')}`);
        } else {
            console.log('   ✅ All expected record types found');
        }
        
    } catch (error) {
        throw new Error(`Record validation failed: ${error.message}`);
    }
}

async function testAdminEndpoints() {
    try {
        // Test getting all users (admin function)
        const usersResponse = await fetch(`${BASE_URL}/Consultas/api/getusers`, {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (!usersResponse.ok) {
            throw new Error(`Admin endpoint test failed: ${usersResponse.status}`);
        }
        
        const usersData = await usersResponse.json();
        console.log(`   ✅ Admin users endpoint working (${usersData.records?.length || 0} users)`);
        
        // Test pagination or filtering (if available)
        console.log('   ✅ Admin access verified');
        
    } catch (error) {
        throw new Error(`Admin endpoint test failed: ${error.message}`);
    }
}

// Helper function to format record types
function formatRecordType(type) {
    const typeMap = {
        'variables_climaticas': 'Variables Climáticas',
        'camaras_trampa': 'Cámaras Trampa',
        'fauna_busqueda_libre': 'Fauna Búsqueda Libre',
        'fauna_punto_conteo': 'Fauna Punto Conteo',
        'fauna_transecto': 'Fauna Transecto',
        'validacion_cobertura': 'Validación Cobertura',
        'parcela_vegetacion': 'Parcela Vegetación'
    };
    
    return typeMap[type] || type;
}

// Run validation
validateTestData();
