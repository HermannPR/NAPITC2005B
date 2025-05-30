/**
 * MAWI Test Records Insertion Script
 * Creates sample biomonitoring records for testing admin functionality
 * 
 * This script creates test data for all biomonitoring form types:
 * - Variables Climáticas
 * - Cámaras Trampa  
 * - Fauna Búsqueda Libre
 * - Fauna Punto Conteo
 * - Fauna Transecto
 * - Validación Cobertura
 * - Parcela Vegetación
 */

const fetch = require('node-fetch');
require('dotenv').config();

// Base URL for the API
const BASE_URL = 'http://localhost:3000';

// Test user credentials (you may need to adjust these)
const TEST_CREDENTIALS = {
    email: 'admin@mawi.test',
    password: 'admin123'
};

// Test user ID (will be populated after login)
let TEST_USER_ID = null;
let AUTH_TOKEN = null;

/**
 * Authenticate and get token
 */
async function authenticate() {
    try {
        const response = await fetch(`${BASE_URL}/Consultas/api/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(TEST_CREDENTIALS)
        });

        const data = await response.json();
        
        if (response.ok && data.token) {
            AUTH_TOKEN = data.token;
            // Decode token to get user ID
            const payload = JSON.parse(Buffer.from(data.token.split('.')[1], 'base64').toString());
            TEST_USER_ID = payload.id;
            console.log('✅ Authentication successful');
            console.log(`📋 User ID: ${TEST_USER_ID}`);
            console.log(`🔑 Token: ${AUTH_TOKEN.substring(0, 50)}...`);
            return true;
        } else {
            console.error('❌ Authentication failed:', data.message);
            return false;
        }
    } catch (error) {
        console.error('❌ Authentication error:', error);
        return false;
    }
}

/**
 * Helper function to make authenticated API calls
 */
async function apiCall(endpoint, data) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AUTH_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        
        if (response.ok && result.status === 'success') {
            console.log(`✅ ${endpoint}: Record created with ID ${result.records}`);
            return result;
        } else {
            console.error(`❌ ${endpoint}: ${result.message}`);
            return null;
        }
    } catch (error) {
        console.error(`❌ ${endpoint}: Error - ${error.message}`);
        return null;
    }
}

/**
 * Test data templates for each biomonitoring form type
 */
const testData = {
    variablesClimaticas: [
        {
            estadoTiempo: 'Soleado',
            estacion: 'Verano',
            tipoRegistro: 'variables_climaticas',
            zona: 'Zona Norte',
            pluviosidadMm: 150.5,
            temperaturaMaxima: 32.0,
            humedadMaxima: 85.0,
            temperaturaMinima: 18.5,
            nivelQuebradaMt: 1250.0
        },
        {
            estadoTiempo: 'Nublado',
            estacion: 'Invierno',
            tipoRegistro: 'variables_climaticas',
            zona: 'Zona Sur',
            pluviosidadMm: 240.8,
            temperaturaMaxima: 22.0,
            humedadMaxima: 92.0,
            temperaturaMinima: 8.2,
            nivelQuebradaMt: 1180.0
        },
        {
            estadoTiempo: 'Lluvioso',
            estacion: 'Otoño',
            tipoRegistro: 'variables_climaticas',
            zona: 'Zona Este',
            pluviosidadMm: 320.2,
            temperaturaMaxima: 26.5,
            humedadMaxima: 95.0,
            temperaturaMinima: 12.8,
            nivelQuebradaMt: 1320.5
        }
    ],

    camarasTrampa: [
        {
            estadoTiempo: 'Soleado',
            estacion: 'Primavera',
            tipoRegistro: 'camaras_trampa',
            codigo: 'CAM001',
            zona: 'Sendero Principal',
            nombreCamara: 'Cámara Bosque Norte',
            placaCamara: 'PLC-001-2024',
            placaGuaya: 'GUA-001-2024',
            anchoCaminoMt: 2.5,
            fechaInstalacion: '2024-01-15',
            distanciaObjetivoMt: 3.0,
            alturaLenteMt: 1.2,
            listaChequeo: 'Batería OK, Memoria OK, Sensor OK',
            evidencias: 'Foto instalación, coordenadas GPS',
            observaciones: 'Instalación exitosa en área de alta actividad animal'
        },
        {
            estadoTiempo: 'Nublado',
            estacion: 'Verano',
            tipoRegistro: 'camaras_trampa',
            codigo: 'CAM002',
            zona: 'Quebrada Este',
            nombreCamara: 'Cámara Agua Limpia',
            placaCamara: 'PLC-002-2024',
            placaGuaya: 'GUA-002-2024',
            anchoCaminoMt: 1.8,
            fechaInstalacion: '2024-02-10',
            distanciaObjetivoMt: 4.5,
            alturaLenteMt: 1.5,
            listaChequeo: 'Batería OK, Memoria OK, Lente limpio',
            evidencias: 'Video prueba, mapa ubicación',
            observaciones: 'Ubicada cerca de fuente de agua para monitoreo de fauna'
        }
    ],

    faunaBusquedaLibre: [
        {
            estadoTiempo: 'Soleado',
            estacion: 'Primavera',
            tipoRegistro: 'fauna_busqueda_libre',
            zona: 'Bosque Secundario',
            tipoAnimal: 'Ave',
            nombreComun: 'Tangara Azuleja',
            nombreCientifico: 'Thraupis episcopus',
            numeroIndividuos: 3,
            tipoObservacion: 'Visual',
            alturaObservacion: 'Dosel medio (5-15m)',
            evidencias: 'Fotografía, grabación canto',
            observaciones: 'Grupo familiar alimentándose de frutos de Cecropia'
        },
        {
            estadoTiempo: 'Parcialmente nublado',
            estacion: 'Verano',
            tipoRegistro: 'fauna_busqueda_libre',
            zona: 'Ribera del río',
            tipoAnimal: 'Mamífero',
            nombreComun: 'Nutria de río',
            nombreCientifico: 'Lontra longicaudis',
            numeroIndividuos: 2,
            tipoObservacion: 'Visual',
            alturaObservacion: 'Nivel del suelo',
            evidencias: 'Huellas, fotografía rastros',
            observaciones: 'Avistamiento en actividad de pesca, agua cristalina'
        },
        {
            estadoTiempo: 'Lluvioso',
            estacion: 'Invierno',
            tipoRegistro: 'fauna_busqueda_libre',
            zona: 'Sotobosque',
            tipoAnimal: 'Anfibio',
            nombreComun: 'Rana de cristal',
            nombreCientifico: 'Centrolene sp.',
            numeroIndividuos: 5,
            tipoObservacion: 'Visual y auditiva',
            alturaObservacion: 'Vegetación baja (0-2m)',
            evidencias: 'Grabación sonora, fotografías',
            observaciones: 'Alta actividad reproductiva durante la lluvia'
        }
    ],

    faunaPuntoConteo: [
        {
            estadoTiempo: 'Soleado',
            estacion: 'Primavera',
            tipoRegistro: 'fauna_punto_conteo',
            zona: 'Punto de conteo PC-01',
            tipoAnimal: 'Ave',
            nombreComun: 'Mirla negra',
            nombreCientifico: 'Turdus fuscater',
            numeroIndividuos: 8,
            tipoObservacion: 'Visual y auditiva',
            alturaObservacion: 'Dosel bajo (2-5m)',
            evidencias: 'Lista de chequeo, coordenadas GPS',
            observaciones: 'Conteo matutino 6:00-6:30 AM, alta actividad'
        },
        {
            estadoTiempo: 'Despejado',
            estacion: 'Verano',
            tipoRegistro: 'fauna_punto_conteo',
            zona: 'Punto de conteo PC-02',
            tipoAnimal: 'Ave',
            nombreComun: 'Colibrí chupasavia',
            nombreCientifico: 'Amazilia tzacatl',
            numeroIndividuos: 12,
            tipoObservacion: 'Visual',
            alturaObservacion: 'Vegetación media (2-8m)',
            evidencias: 'Fotografías, mapa punto conteo',
            observaciones: 'Abundante floración de Inga, alta actividad alimentaria'
        }
    ],

    faunaTransecto: [
        {
            estadoTiempo: 'Nublado',
            estacion: 'Otoño',
            tipoRegistro: 'fauna_transecto',
            numeroTransecto: 'T-001',
            tipoAnimal: 'Reptil',
            nombreComun: 'Lagarto verde',
            nombreCientifico: 'Anolis auratus',
            nroIndividuos: 4,
            tipoObservacion: 'Visual',
            evidencias: 'GPS track, fotografías',
            observaciones: 'Transecto 500m, observaciones cada 50m, actividad termorregulación'
        },
        {
            estadoTiempo: 'Soleado',
            estacion: 'Primavera',
            tipoRegistro: 'fauna_transecto',
            numeroTransecto: 'T-002',
            tipoAnimal: 'Mamífero',
            nombreComun: 'Ardilla roja',
            nombreCientifico: 'Sciurus granatensis',
            nroIndividuos: 6,
            tipoObservacion: 'Visual y rastros',
            evidencias: 'Video, marcas GPS',
            observaciones: 'Transecto ribereño 300m, alta actividad en árboles frutales'
        }
    ],

    validacionCobertura: [
        {
            estadoTiempo: 'Despejado',
            estacion: 'Verano',
            tipoRegistro: 'validacion_cobertura',
            codigo: 'COB-001',
            seguimiento: 'Mensual',
            cambio: 'Regeneración natural',
            cobertura: 'Bosque secundario tardío',
            tiposCultivo: 'N/A',
            disturbio: 'Mínimo - sendero existente',
            evidencias: 'Fotografías aéreas, mediciones GPS',
            observaciones: 'Recuperación exitosa después de 5 años de protección'
        },
        {
            estadoTiempo: 'Parcialmente nublado',
            estacion: 'Invierno',
            tipoRegistro: 'validacion_cobertura',
            codigo: 'COB-002',
            seguimiento: 'Trimestral',
            cambio: 'Pérdida de cobertura',
            cobertura: 'Pastos y rastrojos',
            tiposCultivo: 'Maíz, frijol',
            disturbio: 'Alto - expansión agrícola',
            evidencias: 'Comparación satelital, entrevistas',
            observaciones: 'Necesaria implementación de corredores biológicos'
        }
    ],

    parcelaVegetacion: [
        {
            estadoTiempo: 'Soleado',
            estacion: 'Primavera',
            tipoRegistro: 'parcela_vegetacion',
            cuadrante: 'A1',
            subcuadrante: 'a',
            habitoCrecimiento: 'Árbol',
            nombreComun: 'Ceiba',
            nombreCientifico: 'Ceiba pentandra',
            placa: 'PAR-001-A1a-001',
            circunferencias: 185.5,
            distanciaMt: 12.3,
            estaturaBiomonitorMt: 1.70,
            alturaMt: 25.8,
            evidencias: 'Fotografía, mediciones DAP',
            observaciones: 'Árbol emergente, buen estado fitosanitario, presencia epífitas'
        },
        {
            estadoTiempo: 'Nublado',
            estacion: 'Verano',
            tipoRegistro: 'parcela_vegetacion',
            cuadrante: 'B2',
            subcuadrante: 'c',
            habitoCrecimiento: 'Arbusto',
            nombreComun: 'Café de monte',
            nombreCientifico: 'Psychotria sp.',
            placa: 'PAR-001-B2c-015',
            circunferencias: 12.8,
            distanciaMt: 3.2,
            estaturaBiomonitorMt: 1.65,
            alturaMt: 2.5,
            evidencias: 'Fotografía hojas y frutos',
            observaciones: 'Sotobosque denso, floración activa, importante para fauna'
        },
        {
            estadoTiempo: 'Despejado',
            estacion: 'Otoño',
            tipoRegistro: 'parcela_vegetacion',
            cuadrante: 'C3',
            subcuadrante: 'd',
            habitoCrecimiento: 'Liana',
            nombreComun: 'Bejuco de agua',
            nombreCientifico: 'Vitis tiliifolia',
            placa: 'PAR-001-C3d-022',
            circunferencias: 8.5,
            distanciaMt: 1.8,
            estaturaBiomonitorMt: 1.72,
            alturaMt: 15.0,
            evidencias: 'Fotografía hábito, flores',
            observaciones: 'Liana robusta alcanzando dosel, importante conectividad'
        }
    ]
};

/**
 * Insert test records for each form type
 */
async function insertTestRecords() {
    console.log('🌱 Starting test records insertion...\n');

    // Variables Climáticas
    console.log('📊 Inserting Variables Climáticas...');
    for (const record of testData.variablesClimaticas) {
        await apiCall('/Consultas/api/insertVClimaticas', record);
    }

    // Cámaras Trampa
    console.log('\n📷 Inserting Cámaras Trampa...');
    for (const record of testData.camarasTrampa) {
        await apiCall('/Consultas/api/insertCamarasTrampa', record);
    }

    // Fauna Búsqueda Libre
    console.log('\n🦋 Inserting Fauna Búsqueda Libre...');
    for (const record of testData.faunaBusquedaLibre) {
        await apiCall('/Consultas/api/insertFaunaBusquedaLibre', record);
    }

    // Fauna Punto Conteo
    console.log('\n🔍 Inserting Fauna Punto Conteo...');
    for (const record of testData.faunaPuntoConteo) {
        await apiCall('/Consultas/api/insertFaunaPuntoConteo', record);
    }

    // Fauna Transecto
    console.log('\n📏 Inserting Fauna Transecto...');
    for (const record of testData.faunaTransecto) {
        await apiCall('/Consultas/api/insertFaunaTransecto', record);
    }

    // Validación Cobertura
    console.log('\n🌳 Inserting Validación Cobertura...');
    for (const record of testData.validacionCobertura) {
        await apiCall('/Consultas/api/insertValidacionCobertura', record);
    }

    // Parcela Vegetación
    console.log('\n🌿 Inserting Parcela Vegetación...');
    for (const record of testData.parcelaVegetacion) {
        await apiCall('/Consultas/api/insertParcelaVegetacion', record);
    }

    console.log('\n✅ Test records insertion completed!');
}

/**
 * Create a test user if needed
 */
async function createTestUser() {
    console.log('👤 Creating test user...');
    
    const testUser = {
        Nombre: 'Usuario',
        Apellidos: 'Prueba',
        email: TEST_CREDENTIALS.email,
        password: TEST_CREDENTIALS.password,
        pais: 'Colombia',
        numerotel: '+57 300 123 4567',
        region: 'Antioquia',
        ciudad: 'Medellín',
        nombreOrganizacion: 'MAWI Test Organization',
        descOrganizacion: 'Organización de prueba para validación del sistema',
        rol: 2, // Regular user role
        estado: 'A', // Active status
        idResponsable: null
    };

    try {
        const response = await fetch(`${BASE_URL}/Consultas/api/insertUser`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testUser)
        });

        const result = await response.json();
        
        if (response.ok && result.status === 'success') {
            console.log('✅ Test user created successfully');
            return true;
        } else {
            console.log('ℹ️ Test user may already exist or other issue:', result.message);
            return false;
        }
    } catch (error) {
        console.log('ℹ️ Could not create test user:', error.message);
        return false;
    }
}

/**
 * Display summary statistics
 */
function displaySummary() {
    console.log('\n📈 TEST DATA SUMMARY:');
    console.log('==========================================');
    console.log(`📊 Variables Climáticas: ${testData.variablesClimaticas.length} records`);
    console.log(`📷 Cámaras Trampa: ${testData.camarasTrampa.length} records`);
    console.log(`🦋 Fauna Búsqueda Libre: ${testData.faunaBusquedaLibre.length} records`);
    console.log(`🔍 Fauna Punto Conteo: ${testData.faunaPuntoConteo.length} records`);
    console.log(`📏 Fauna Transecto: ${testData.faunaTransecto.length} records`);
    console.log(`🌳 Validación Cobertura: ${testData.validacionCobertura.length} records`);
    console.log(`🌿 Parcela Vegetación: ${testData.parcelaVegetacion.length} records`);
    
    const total = Object.values(testData).reduce((sum, records) => sum + records.length, 0);
    console.log(`\n📊 TOTAL RECORDS TO INSERT: ${total}`);
    console.log('==========================================\n');
}

/**
 * Main execution function
 */
async function main() {
    console.log('🌟 MAWI Test Records Insertion Script');
    console.log('====================================');
    
    displaySummary();

    // Try to authenticate with existing user, create one if needed
    let authenticated = await authenticate();
    
    if (!authenticated) {
        console.log('🔄 Attempting to create test user...');
        await createTestUser();
        
        // Wait a moment and try authentication again
        await new Promise(resolve => setTimeout(resolve, 1000));
        authenticated = await authenticate();
    }

    if (!authenticated) {
        console.error('❌ Could not authenticate. Please check your credentials or create a test user manually.');
        console.log('\n📝 Manual user creation:');
        console.log('1. Go to the signup page');
        console.log(`2. Create a user with email: ${TEST_CREDENTIALS.email}`);
        console.log(`3. Set password: ${TEST_CREDENTIALS.password}`);
        console.log('4. Activate the user through admin panel');
        return;
    }

    // Insert test records
    await insertTestRecords();

    console.log('\n🎉 Script completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Access the admin panel: http://localhost:3000/Adminindex.html');
    console.log('2. Go to "Todos los Registros" to see the test data');
    console.log('3. Verify all record types are displayed correctly');
    console.log('4. Test filtering and search functionality');
}

// Execute the script
if (require.main === module) {
    main().catch(console.error);
}

module.exports = {
    authenticate,
    insertTestRecords,
    createTestUser,
    testData
};
