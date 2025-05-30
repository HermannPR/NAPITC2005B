// auth-utils.js - Utilidades compartidas para manejo de autenticación
function getUserRole() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.rol;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

function getUserName() {
    const token = localStorage.getItem('token');
    if (!token) return 'Usuario';
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.nombre || 'Usuario';
    } catch (error) {
        console.error('Error decoding token:', error);
        return 'Usuario';
    }
}

function getUserData() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}

function getRoleDisplayName(rol) {
    switch(parseInt(rol)) {
        case 1: return 'Usuario';
        case 2: return 'Biomonitor';
        case 3: return 'Admin';
        case 4: return 'Super Admin';
        default: return 'Usuario';
    }
}

function checkAuthAndRedirect() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function setupHeader() {
    const rol = getUserRole();
    const nombre = getUserName();
    const roleDisplay = getRoleDisplayName(rol);
    
    // Actualizar el nombre del usuario en el header
    const adminNameElement = document.getElementById('admin-name');
    if (adminNameElement) {
        adminNameElement.textContent = nombre;
    }
    
    // Actualizar el badge del rol
    const roleBadgeElement = document.querySelector('.admin-role-badge');
    if (roleBadgeElement) {
        roleBadgeElement.textContent = roleDisplay;
    }
    
    // Actualizar el texto del rol en el header (para páginas con .user-menu span)
    const userMenuSpan = document.querySelector('.user-menu span');
    if (userMenuSpan) {
        userMenuSpan.textContent = roleDisplay;
    }
}

function checkAdminPermissions() {
    const rol = getUserRole();
    if (rol < 3) {
        alert('No tienes permisos para acceder a esta página');
        window.location.href = 'dashboard.html';
        return false;
    }
    return true;
}

// Función para verificar permisos mínimos
function requireMinRole(minRole) {
    const rol = getUserRole();
    if (!rol || rol < minRole) {
        alert('No tienes permisos para acceder a esta página');
        window.location.href = rol ? 'dashboard.html' : 'login.html';
        return false;
    }
    return true;
}

/**
 * Initialize page authentication and setup
 * @param {boolean} requireAdmin - Whether admin permissions are required
 * @returns {boolean} True if initialization successful
 */
function initializeAuth(requireAdmin = false) {
    if (!checkAuthAndRedirect()) {
        return false;
    }
    
    if (requireAdmin && !requireMinRole(3)) {
        return false;
    }
    
    setupHeader();
    return true;
}

function getAuthToken() {
    return localStorage.getItem('token');
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}
