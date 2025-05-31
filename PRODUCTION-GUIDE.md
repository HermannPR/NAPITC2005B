# 🚀 MAWI - Guía de Producción

## 📋 **Archivos Esenciales para Producción**

### **Archivos Core (REQUERIDOS):**
```
napitc2005b/
├── main.js                    # Punto de entrada principal
├── webserver.js              # Configuración del servidor Express
├── constants.js              # Constantes del sistema
├── package.json              # Dependencias del proyecto
├── .env                      # Variables de entorno (configurar antes de producción)
├── README.md                 # Documentación principal
│
├── Controllers/              # Controladores de la API
│   ├── router.js            # Configuración de rutas
│   └── API/                 # Endpoints REST
│       ├── usersRestController.js
│       ├── chatAIRestController.js
│       ├── formRestController.js
│       └── ...
│
├── Service/                  # Lógica de negocio
│   ├── usersService.js
│   ├── hashPassword.js
│   ├── formsService.js
│   └── ...
│
├── Datasource/              # Acceso a datos
│   └── MySQLMngr.js
│
├── public/                  # Frontend (archivos estáticos)
│   ├── *.html              # Páginas web
│   ├── *.css               # Estilos
│   ├── *.js                # Scripts del frontend
│   └── css/                # Estilos organizados
│
└── test/                    # Scripts de testing
    └── insertTestRecords.js
```

### **Archivos Archivados (NO REQUERIDOS en producción):**
```
archive/
├── test-scripts/           # Scripts de testing y desarrollo
├── development-utils/      # Utilidades de desarrollo
└── documentation/          # Documentación de desarrollo
```

## 🔧 **Configuración de Producción**

### **1. Variables de Entorno (.env)**
```env
# Base de Datos
HOST=localhost
PORT=3306
DB=awaq
USR=root
PASS=your_production_password

# JWT
SECRET=your_production_secret_key
SALT_SIZE=12

# Groq AI (CONFIGURADO Y FUNCIONANDO)
AI_API_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
AI_API_KEY=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
AI_MODEL=meta-llama/llama-3-70b-8192
```

### **2. Instalación Rápida**
```bash
# 1. Instalar dependencias
npm install

# 2. Configurar base de datos MySQL
# (Importar esquema desde archive/documentation/)

# 3. Configurar variables de entorno
# (Editar .env con credenciales de producción)

# 4. Iniciar servidor
npm start
# ó
node main.js
```

### **3. Verificación del Sistema**
```
✅ Servidor: http://localhost:3000
✅ Login: superadmin@mawi.com / SuperAdmin2025!
✅ Chat AI: Funcional con Groq API
✅ Páginas: dashboard.html, biomo.html, explorador.html, convocatorias.html
```

## 📊 **Características del Sistema**

### **Backend:**
- ✅ Node.js + Express.js
- ✅ MySQL Database
- ✅ JWT Authentication (24h tokens)
- ✅ Groq AI Integration
- ✅ RESTful API

### **Frontend:**
- ✅ HTML5 + CSS3 + Vanilla JavaScript
- ✅ Responsive Design
- ✅ Admin Dashboard
- ✅ Chat AI Interface
- ✅ User Management

### **Funcionalidades:**
- ✅ 7 tipos de formularios de biomonitoreo
- ✅ Sistema de usuarios con roles
- ✅ Chat AI especializado en biomonitoreo
- ✅ Panel administrativo completo
- ✅ Gestión de registros y datos

## 🎯 **Para Desarrolladores**

### **Estructura Limpia:**
- **Archivos de producción:** En directorio raíz
- **Archivos de desarrollo:** En `archive/`
- **Testing:** Disponible en `archive/test-scripts/`
- **Documentación:** En `archive/documentation/`

### **Scripts Útiles:**
```bash
# Desarrollo
npm start              # Iniciar servidor
node main.js          # Iniciar directamente

# Testing (desde archive/)
node archive/test-scripts/test-groq-api.js
node test/insertTestRecords.js
```

## 🚀 **El sistema está LISTO para producción**

- ✅ Código limpio y organizado
- ✅ IA funcional con Groq
- ✅ Autenticación JWT corregida
- ✅ Sin archivos innecesarios
- ✅ Documentación completa

---
**Última actualización:** Mayo 30, 2025  
**Estado:** ✅ Producción Ready  
**IA:** ✅ Groq API Configurada
