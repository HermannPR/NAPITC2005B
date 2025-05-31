# 🌿 MAWI - Sistema de Biomonitoreo Ambiental

> **Estado actual:** ✅ **100% OPERATIVO** - Sistema listo para producción

## 🚀 **INICIO RÁPIDO**

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (editar .env)
# 3. Iniciar servidor
npm start
```

**URL:** http://localhost:3000  
**Login:** `superadmin@mawi.com` / `SuperAdmin2025!`

## 📋 **CARACTERÍSTICAS PRINCIPALES**

### ✅ **Sistema Completo**
- **Autenticación JWT** - Tokens de 24 horas
- **Chat AI** - Integración con Groq API (Llama 3)
- **Base de datos MySQL** - Gestión completa de datos
- **4 Páginas principales** - Dashboard, Biomo, Convocatorias, Explorador
- **7 Formularios** - Tipos completos de biomonitoreo
- **Panel Admin** - Gestión de usuarios y registros

### 🔐 **Configuración**

**Base de Datos:**
```env
HOST=localhost
PORT=3306
DB=awaq
USR=root
PASS=root
```

**Chat AI (Groq):**
```env
AI_API_ENDPOINT=https://api.groq.com/openai/v1/chat/completions
AI_API_KEY=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
AI_MODEL=meta-llama/llama-3-70b-8192
```

## 🎯 **PÁGINAS DISPONIBLES**

- 📊 **Dashboard:** `/dashboard.html` - Panel principal
- 🔬 **Biomo:** `/biomo.html` - Chat AI + Biomonitoreo
- 📢 **Convocatorias:** `/convocatorias.html` - Gestión de proyectos
- 🔍 **Explorador:** `/explorador.html` - Exploración de datos
- 👨‍💼 **Admin:** `/Adminindex.html` - Panel administrativo

## 📁 **ESTRUCTURA LIMPIA**

```
napitc2005b/
├── main.js              # 🚀 Punto de entrada
├── webserver.js         # ⚙️ Configuración servidor
├── package.json         # 📦 Dependencias
├── .env                 # 🔒 Variables de entorno
├── Controllers/         # 🎛️ API y rutas
├── Service/            # 🔧 Lógica de negocio
├── Datasource/         # 🗄️ Base de datos
├── public/             # 🌐 Frontend
└── archive/            # 📚 Archivos de desarrollo
```

## 🏆 **SISTEMA LISTO PARA PRODUCCIÓN**

- ✅ **Código limpio** y organizado
- ✅ **IA funcional** con Groq API
- ✅ **Sin errores** de consola
- ✅ **Autenticación** estable (24h)
- ✅ **Documentación** completa

---

**💡 Para más detalles:** Ver `PRODUCTION-GUIDE.md`  
**🔧 Desarrollado por:** Equipo MAWI  
**📅 Última actualización:** Mayo 30, 2025
