const dataSource = require('./Datasource/MySQLMngr');

async function testConnection() {
    console.log('🔍 Testing database connection...');
    console.log('Host:', process.env.HOST || 'localhost');
    console.log('Port:', process.env.PORT || 'not set');
    console.log('Database:', process.env.DB || 'not set');
    console.log('User:', process.env.USR || 'not set');
    
    try {
        // Simple test query
        const result = await dataSource.getData('SELECT 1 as test');
        console.log('✅ Database connection successful');
        console.log('Result:', result);
    } catch (error) {
        console.log('❌ Database connection failed');
        console.log('Error:', error.message);
        
        // Try with different port
        console.log('\n🔄 Trying with port 3306...');
        process.env.PORT = '3306';
        try {
            const result2 = await dataSource.getData('SELECT 1 as test');
            console.log('✅ Database connection successful with port 3306');
            console.log('Result:', result2);
        } catch (error2) {
            console.log('❌ Database connection still failed with port 3306');
            console.log('Error:', error2.message);
        }
    }
    
    process.exit(0);
}

testConnection();
