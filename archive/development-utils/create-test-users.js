const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

// Configuración de la base de datos
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'awaq',
    port: 3306
};

/**
 * Genera hash de contraseña con el formato usado en el sistema MAWI
 */
function generatePasswordHash(password) {
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(password, salt);
    return `${salt}:${hash}`;
}

/**
 * Crear usuarios de prueba adicionales con diferentes roles y estados
 */
async function createTestUsers() {
    console.log('🚀 Creando usuarios de prueba adicionales...');
    console.log('==========================================');

    const connection = await mysql.createConnection(dbConfig);

    const testUsers = [
        {
            email: 'biomonitor1@mawi.com',
            nombre: 'Carlos',
            apellidos: 'González Ramírez',
            password: 'Biomonitor123!',
            rol: 2,
            estado: 'A'
        },
        {
            email: 'biomonitor2@mawi.com',
            nombre: 'María',
            apellidos: 'López Silva',
            password: 'Biomonitor456!',
            rol: 2,
            estado: 'A'
        },
        {
            email: 'investigador@mawi.com',
            nombre: 'Dr. Antonio',
            apellidos: 'Martínez Rojas',
            password: 'Investigador789!',
            rol: 2,
            estado: 'A'
        },
        {
            email: 'usuario.campo@mawi.com',
            nombre: 'Lucia',
            apellidos: 'Hernández Torres',
            password: 'Campo2025!',
            rol: 1,
            estado: 'A'
        },
        {
            email: 'usuario.pendiente@mawi.com',
            nombre: 'Pedro',
            apellidos: 'Sánchez Vargas',
            password: 'Pendiente123!',
            rol: 1,
            estado: 'P'
        },
        {
            email: 'usuario.inactivo@mawi.com',
            nombre: 'Ana',
            apellidos: 'Flores Mendoza',
            password: 'Inactivo456!',
            rol: 1,
            estado: 'I'
        },
        {
            email: 'coordinador@mawi.com',
            nombre: 'Jorge',
            apellidos: 'Ruiz Castillo',
            password: 'Coordinador789!',
            rol: 3,
            estado: 'A'
        }
    ];

    try {
        for (const userData of testUsers) {
            // Verificar si el usuario ya existe
            const [existing] = await connection.execute(
                'SELECT email FROM usuario WHERE email = ?',
                [userData.email]
            );

            if (existing.length > 0) {
                console.log(`⚠️  Usuario ya existe: ${userData.email}`);
                continue;
            }

            // Generar hash de contraseña
            const passwordHash = generatePasswordHash(userData.password);

            // Insertar usuario
            const [result] = await connection.execute(`
                INSERT INTO usuario (email, Nombre, Apellidos, password, rol, estado) 
                VALUES (?, ?, ?, ?, ?, ?)
            `, [
                userData.email,
                userData.nombre,
                userData.apellidos,
                passwordHash,
                userData.rol,
                userData.estado
            ]);

            console.log(`✅ Usuario creado: ${userData.email}`);
            console.log(`   Nombre: ${userData.nombre} ${userData.apellidos}`);
            console.log(`   Rol: ${userData.rol} | Estado: ${userData.estado}`);
            console.log(`   ID: ${result.insertId}`);
            console.log('----------------------------------------');
        }

        console.log('🎉 Usuarios de prueba creados exitosamente!');
        
    } catch (error) {
        console.error('❌ Error creando usuarios:', error.message);
    } finally {
        await connection.end();
    }
}

/**
 * Crear registros de prueba para los usuarios
 */
async function createTestRecords() {
    console.log('📊 Creando registros de prueba...');
    console.log('==========================================');

    const connection = await mysql.createConnection(dbConfig);

    try {
        // Obtener usuarios para asignar registros
        const [users] = await connection.execute(
            'SELECT idUsuario, email, Nombre FROM usuario WHERE estado = "A" AND rol >= 1'
        );

        console.log(`Encontrados ${users.length} usuarios activos`);

        // Crear formularios iniciales y registros específicos
        const recordTypes = [
            'variables_climaticas',
            'camaras_trampa', 
            'fauna_busqueda_libre',
            'fauna_punto_conteo',
            'fauna_transecto',
            'validacion_cobertura',
            'parcela_vegetacion'
        ];

        let recordCount = 0;

        for (const user of users.slice(0, 5)) { // Solo primeros 5 usuarios
            const numRecords = Math.floor(Math.random() * 8) + 2; // 2-9 registros por usuario
            
            for (let i = 0; i < numRecords; i++) {
                const recordType = recordTypes[Math.floor(Math.random() * recordTypes.length)];
                
                // Insertar formulario inicial
                const [formResult] = await connection.execute(`
                    INSERT INTO formularioInicial (estadoTiempo, estacion, tipoRegistro, idCreador, fechaCreacion)
                    VALUES (?, ?, ?, ?, NOW())
                `, [
                    ['Soleado', 'Nublado', 'Lluvioso', 'Parcialmente nublado'][Math.floor(Math.random() * 4)],
                    ['Estación A', 'Estación B', 'Estación C', 'Estación D'][Math.floor(Math.random() * 4)],
                    recordType,
                    user.idUsuario
                ]);

                recordCount++;
            }
            
            console.log(`✅ ${numRecords} registros creados para: ${user.Nombre} (${user.email})`);
        }

        console.log(`🎉 Total de ${recordCount} registros de prueba creados!`);

    } catch (error) {
        console.error('❌ Error creando registros:', error.message);
    } finally {
        await connection.end();
    }
}

/**
 * Mostrar resumen de usuarios y registros
 */
async function showSummary() {
    console.log('📋 RESUMEN DEL SISTEMA');
    console.log('==========================================');

    const connection = await mysql.createConnection(dbConfig);

    try {
        // Contar usuarios por rol y estado
        const [userStats] = await connection.execute(`
            SELECT 
                rol,
                estado,
                COUNT(*) as cantidad
            FROM usuario 
            GROUP BY rol, estado
            ORDER BY rol, estado
        `);

        console.log('👥 USUARIOS POR ROL Y ESTADO:');
        const roleNames = { 1: 'Usuario', 2: 'Biomonitor', 3: 'Admin', 4: 'Super Admin' };
        const statusNames = { 'A': 'Activo', 'P': 'Pendiente', 'I': 'Inactivo' };

        userStats.forEach(stat => {
            console.log(`   ${roleNames[stat.rol]} (${statusNames[stat.estado]}): ${stat.cantidad}`);
        });

        // Contar registros por usuario
        const [recordStats] = await connection.execute(`
            SELECT 
                u.Nombre,
                u.email,
                u.rol,
                u.estado,
                COUNT(f.idFormIn) as total_registros
            FROM usuario u
            LEFT JOIN formularioInicial f ON u.idUsuario = f.idCreador
            GROUP BY u.idUsuario
            ORDER BY total_registros DESC
        `);

        console.log('\\n📊 REGISTROS POR USUARIO:');
        recordStats.forEach(stat => {
            if (stat.total_registros > 0) {
                console.log(`   ${stat.Nombre} (${stat.email}): ${stat.total_registros} registros`);
            }
        });

        // Total general
        const [totals] = await connection.execute(`
            SELECT 
                (SELECT COUNT(*) FROM usuario) as total_usuarios,
                (SELECT COUNT(*) FROM usuario WHERE estado = 'A') as usuarios_activos,
                (SELECT COUNT(*) FROM formularioInicial) as total_registros
        `);

        console.log('\\n🎯 TOTALES GENERALES:');
        console.log(`   Total Usuarios: ${totals[0].total_usuarios}`);
        console.log(`   Usuarios Activos: ${totals[0].usuarios_activos}`);
        console.log(`   Total Registros: ${totals[0].total_registros}`);

    } catch (error) {
        console.error('❌ Error obteniendo resumen:', error.message);
    } finally {
        await connection.end();
    }
}

// Ejecutar funciones
async function main() {
    console.log('🌿 MAWI - Creación de Datos de Prueba para Gestión de Usuarios');
    console.log('===============================================================');
    
    await createTestUsers();
    await createTestRecords();
    await showSummary();
    
    console.log('\\n✅ ¡Proceso completado! Ahora puedes revisar la gestión de usuarios en:');
    console.log('   http://localhost:3000/AdmUpReguser.html');
    console.log('\\n🔐 Usa las credenciales del super admin para acceder:');
    console.log('   Email: superadmin@mawi.com');
    console.log('   Password: SuperAdmin2025!');
}

main().catch(console.error);
