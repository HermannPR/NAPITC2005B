// Script para hacer login y obtener un token válido
const http = require('http');

async function loginAndGetToken() {
    console.log('🔐 Iniciando login para obtener token válido...');
    
    // Datos de prueba (basado en las credenciales que vi en manage-users.js)
    const loginData = JSON.stringify({
        email: 'user@mawi.com',
        password: 'User2025!'
    });
    
    const options = {
        hostname: 'localhost',
        port: 3000,
        path: '/Consultas/api/login',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(loginData)
        }
    };
    
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let responseData = '';
            
            console.log(`📡 Status Code: ${res.statusCode}`);
            
            res.on('data', (chunk) => {
                responseData += chunk;
            });
            
            res.on('end', () => {
                try {
                    console.log(`📄 Raw Response: ${responseData}`);
                    
                    if (res.statusCode === 200) {
                        const jsonResponse = JSON.parse(responseData);
                        console.log('✅ Login exitoso');
                        console.log('🔑 Token:', jsonResponse.token);
                        console.log('👤 Rol:', jsonResponse.rol);
                        console.log('📋 Estado:', jsonResponse.estado);
                        
                        // Decodificar token para mostrar contenido
                        try {
                            const payload = JSON.parse(Buffer.from(jsonResponse.token.split('.')[1], 'base64').toString());
                            console.log('📄 Contenido del token:', payload);
                        } catch (e) {
                            console.log('⚠️ No se pudo decodificar el token');
                        }
                        
                        resolve(jsonResponse.token);
                    } else {
                        console.log(`❌ Login falló con status: ${res.statusCode}`);
                        console.log('Respuesta:', responseData);
                        resolve(null);
                    }
                } catch (error) {
                    console.error('❌ Error parsing response:', error);
                    console.log('Raw response was:', responseData);
                    resolve(null);
                }
            });
        });
        
        req.on('error', (error) => {
            console.error('❌ Request error:', error);
            resolve(null);
        });
        
        req.setTimeout(10000, () => {
            console.error('❌ Request timeout');
            req.abort();
            resolve(null);
        });
        
        req.write(loginData);
        req.end();
    });
}

// Ejecutar login
loginAndGetToken().then(token => {
    if (token) {
        console.log('\n🎉 Token obtenido exitosamente');
        console.log('💡 Para usar en el navegador, ejecuta en la consola:');
        console.log(`localStorage.setItem('token', '${token}');`);
        console.log('🔄 Luego recarga la página biomo.html');
    } else {
        console.log('\n❌ No se pudo obtener el token');
        console.log('💡 Verifica que el usuario user@mawi.com existe y está activo');
    }
    process.exit(0);
});
