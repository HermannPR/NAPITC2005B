# 🌿 MAWI - Biomonitoring System

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [System Architecture](#-system-architecture)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Admin Dashboard](#-admin-dashboard)
- [Authentication System](#-authentication-system)
- [Installation & Setup](#-installation--setup)
- [Testing & Development](#-testing--development)
- [Project Structure](#-project-structure)
- [Features](#-features)
- [Phase 1 Completion](#-phase-1-completion)

## 🌿 Project Overview

MAWI is a comprehensive biomonitoring system designed for ecological data collection and management. The system supports multiple types of biological and environmental monitoring activities including climate variables, camera traps, fauna observations, and vegetation monitoring.

### Key Features
- **Multi-form Biomonitoring**: 7 different types of biological data collection
- **Admin Dashboard**: Complete administrative interface with modern UI
- **User Management**: Role-based access control with JWT authentication
- **Data Visualization**: Comprehensive records management and filtering
- **Responsive Design**: Modern CSS architecture with mobile support

## 🏗️ System Architecture

### Technology Stack
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Authentication**: JWT (JSON Web Tokens)
- **Architecture**: RESTful API with MVC pattern

### Core Components
```
MAWI System
├── Frontend (Public Pages)
│   ├── User Authentication
│   ├── Data Collection Forms
│   ├── Dashboard
│   └── Admin Interface
├── Backend API
│   ├── Controllers (REST endpoints)
│   ├── Services (Business logic)
│   └── Data Access Layer
└── Database
    ├── User Management
    ├── Form Data Storage
    └── Administrative Tables
```

## 🗄️ Database Schema

### Core Tables

#### `formularioInicial`
Main form table storing common data for all biomonitoring activities:
```sql
- idFormIn (Primary Key)
- estadoTiempo (Weather conditions)
- estacion (Station/Location)
- tipoRegistro (Record type)
- idCreador (Creator user ID)
- fechaCreacion (Creation date)
```

#### Specialized Tables
1. **`variables_climaticas`** - Climate monitoring data
2. **`camaras_trampa`** - Camera trap installations
3. **`fauna_busqueda_libre`** - Free fauna search observations
4. **`fauna_punto_conteo`** - Point count fauna surveys
5. **`fauna_transecto`** - Transect fauna surveys
6. **`validacion_cobertura`** - Coverage validation data
7. **`parcela_vegetacion`** - Vegetation plot monitoring

#### User Management
- **`usuarios`** - User accounts and profiles
- **`user_sessions`** - Session management
- **`roles`** - User role definitions

## 🔌 API Endpoints

### Authentication
```
POST /login                    - User authentication
POST /signup                   - User registration
POST /logout                   - User logout
GET  /verify-token             - Token validation
```

### Form Data Management
```
POST /Consultas/api/insertVClimaticas          - Climate variables
POST /Consultas/api/insertCamarasTrampa        - Camera traps
POST /Consultas/api/insertFaunaBusquedaLibre   - Free fauna search
POST /Consultas/api/insertFaunaPuntoConteo     - Point count fauna
POST /Consultas/api/insertFaunaTransecto       - Transect fauna
POST /Consultas/api/insertValidacionCobertura  - Coverage validation
POST /Consultas/api/insertParcelaVegetacion    - Vegetation plots
```

### Admin Operations
```
GET  /Consultas/api/getusers                   - Retrieve all users
GET  /Consultas/api/getRegistros/:idUsuario    - User's records
POST /Consultas/api/updateUsuario              - Update user data
POST /Consultas/api/deleteUsuario              - Delete user
```

## 👨‍💼 Admin Dashboard

### Features
- **📊 Statistics Dashboard**: Real-time system metrics
- **👥 User Management**: Create, edit, and manage user accounts
- **📋 Records Management**: View and filter all system records
- **🔍 Advanced Search**: Multi-criteria filtering system
- **📤 Data Export**: CSV export functionality
- **🔒 Role-based Access**: Admin (Level 3) and Super Admin (Level 4)

### Admin Pages
1. **`Adminindex.html`** - Main dashboard with system overview
2. **`AdmUpReguser.html`** - User management interface
3. **`admin-todos-registros.html`** - Comprehensive records view
4. **`SAaceptarusuarios.html`** - User approval interface

## 🔐 Authentication System

### User Roles
- **Level 1**: Basic User - Data collection only
- **Level 2**: Advanced User - Extended data access
- **Level 3**: Admin - User management and system administration
- **Level 4**: Super Admin - Full system control

### Security Features
- JWT token-based authentication
- Password hashing with bcrypt
- Session management
- Role-based route protection
- Token expiration handling

## 🚀 Installation & Setup

### Prerequisites
```bash
- Node.js (v14 or higher)
- MySQL (v8.0 or higher)
- npm or yarn package manager
```

### Installation Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd napitc2005b
```

2. **Install dependencies**
```bash
npm install
```

3. **Database Setup**
```bash
# Create MySQL database
# Import schema from database/schema.sql
# Update connection settings in Datasource/MySQLMngr.js
```

4. **Environment Configuration**
```bash
# Create .env file with:
DB_HOST=localhost
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=mawi_db
JWT_SECRET=your_jwt_secret
PORT=3000
```

5. **Start the server**
```bash
npm start
# or
node main.js
```

6. **Access the application**
```
http://localhost:3000
```

## 🧪 Testing & Development

### Test Data Insertion

The system includes comprehensive test data generation:

#### Node.js Script
```bash
node test/insertTestRecords.js
```
- Creates 17 test records across all biomonitoring types
- Automatic user creation for testing
- JWT authentication handling
- Progress tracking and error reporting

#### Browser Interface
```
http://localhost:3000/test-data-insertion.html
```
- Visual test data insertion interface
- Real-time progress tracking
- Individual and bulk record creation
- Authentication management

### Test Records Include
- **Climate Variables**: Temperature, humidity, precipitation data
- **Camera Traps**: Installation and configuration records
- **Fauna Observations**: Bird, mammal, and reptile sightings
- **Vegetation Monitoring**: Plant species and coverage data
- **Environmental Conditions**: Weather and habitat assessments

## 📁 Project Structure

```
napitc2005b/
├── Controllers/           # API Controllers
│   ├── API/
│   │   ├── formRestController.js      # Form data endpoints
│   │   ├── SAdminRestController.js    # Admin operations
│   │   ├── usersRestController.js     # User management
│   │   └── imageRestController.js     # Image handling
│   ├── Templates/
│   │   └── templates.js               # Template rendering
│   └── router.js                      # Route configuration
│
├── Service/               # Business Logic Layer
│   ├── formsService.js               # Form processing
│   ├── SAdminService.js              # Admin operations
│   ├── usersService.js               # User management
│   ├── hashPassword.js               # Password utilities
│   └── imageUploadService.js         # File uploads
│
├── Datasource/            # Data Access Layer
│   └── MySQLMngr.js                  # Database connection
│
├── public/                # Frontend Assets
│   ├── css/
│   │   ├── base.css                  # Base styles
│   │   ├── components.css            # Component styles
│   │   └── admin.css                 # Admin interface
│   ├── Adminindex.html               # Admin dashboard
│   ├── admin-todos-registros.html    # Records management
│   ├── AdmUpReguser.html             # User management
│   ├── login.html                    # Authentication
│   ├── dashboard.html                # User dashboard
│   └── test-data-insertion.html      # Testing interface
│
├── test/                  # Testing Utilities
│   └── insertTestRecords.js          # Test data generator
│
├── main.js                # Application entry point
├── webserver.js          # Express server configuration
└── package.json          # Project dependencies
```

## ✨ Features

### Data Collection Forms
1. **Variables Climáticas** - Environmental monitoring
2. **Cámaras Trampa** - Wildlife camera management
3. **Fauna Búsqueda Libre** - General wildlife observations
4. **Fauna Punto Conteo** - Point count surveys
5. **Fauna Transecto** - Line transect surveys
6. **Validación Cobertura** - Habitat coverage assessment
7. **Parcela Vegetación** - Vegetation plot analysis

### Admin Capabilities
- Real-time system statistics
- User account management
- Comprehensive data filtering
- Export functionality
- Role-based permissions
- Session monitoring

### User Experience
- Responsive design for all devices
- Modern, intuitive interface
- Real-time form validation
- Progress tracking
- Error handling and recovery

## 🎯 Phase 1 Completion

### ✅ Completed Features

#### Frontend Redesign
- ✅ Modern CSS architecture with base, components, and admin styles
- ✅ Responsive design system
- ✅ Component-based UI structure
- ✅ Consistent color scheme and typography

#### Authentication System
- ✅ JWT-based authentication
- ✅ Role-based access control (4 user levels)
- ✅ Session management
- ✅ Password security with hashing
- ✅ Login/logout functionality

#### Admin Dashboard
- ✅ Statistics overview with real-time metrics
- ✅ User management interface
- ✅ Records management with advanced filtering
- ✅ Data export capabilities
- ✅ Modern admin interface design

#### Test Data & Validation
- ✅ Comprehensive test record generation (17 records)
- ✅ All 7 biomonitoring form types covered
- ✅ Browser-based testing interface
- ✅ Admin records page validation
- ✅ Filter and search functionality testing

### 📊 System Metrics (Test Environment)
- **Total Test Records**: 17 across all form types
- **Biomonitoring Types**: 7 fully implemented
- **Admin Features**: 100% functional
- **Test Coverage**: All major user workflows
- **Response Time**: Optimized for real-time operations

### 🔄 Next Phase Planning
- Advanced data visualization
- Reporting and analytics dashboard
- Mobile application development
- API documentation and versioning
- Performance optimization
- Advanced search capabilities

## 📞 Support & Documentation

### Development Team
- **Project Type**: Biomonitoring System
- **Architecture**: Node.js REST API with MySQL
- **Frontend**: Modern HTML5/CSS3/JavaScript
- **Authentication**: JWT with role-based access

### Key Contacts
- System administrators can access admin panel at `/Adminindex.html`
- Test environment available at `/test-data-insertion.html`
- API documentation available through endpoint testing

---

**MAWI Biomonitoring System** - Advancing ecological research through comprehensive data management and modern web technologies.
