# 🔐 CREDENCIALES DE PRUEBA - MAWI

**Solo para uso en desarrollo y testing**

## 👨‍💼 Usuarios de Prueba del Sistema

### Super Administrador
```
Email: superadmin@mawi.com
Password: SuperAdmin2025!
Rol: 4 (Super Admin)
Estado: Activo
```

### Administrador
```
Email: admin@mawi.com
Password: Admin2025!
Rol: 3 (Administrador)
Estado: Activo
```

### Usuario Regular
```
Email: user@mawi.com
Password: User2025!
Rol: 1 (Usuario)
Estado: Activo
```

## 🗄️ Base de Datos

```
Host: localhost
Database: [nombre_de_tu_bd]
Usuario: [tu_usuario_mysql]
Password: [tu_password_mysql]
Puerto: 3306
```

## 🌐 URLs de Acceso

```
Servidor: http://localhost:3000
Login: http://localhost:3000/login.html
Admin Panel: http://localhost:3000/Adminindex.html
Gestión Usuarios: http://localhost:3000/AdmUpReguser.html
Todos los Registros: http://localhost:3000/admin-todos-registros.html
Test Data: http://localhost:3000/test-data-insertion.html
```

## 📊 Datos de Prueba

**Total Registros Insertados: 17**

- Variables Climáticas: 3 registros
- Cámaras Trampa: 2 registros  
- Fauna Búsqueda Libre: 3 registros
- Fauna Punto Conteo: 2 registros
- Fauna Transecto: 2 registros
- Validación Cobertura: 2 registros
- Parcela Vegetación: 3 registros

## 🧪 Scripts de Testing

```bash
# Insertar datos de prueba
node test/insertTestRecords.js

# Validar datos insertados
node test/validateTestData.js

# Iniciar servidor
npm start
```

## ⚠️ Notas Importantes

- **NO usar en producción**
- Cambiar credenciales antes del deploy
- Los datos de prueba se pueden limpiar desde el admin panel
- El usuario de prueba tiene permisos completos de administrador

---
*Generado automáticamente para desarrollo - Mayo 30, 2025*
