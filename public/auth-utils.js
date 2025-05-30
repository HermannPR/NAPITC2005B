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

// =========================== SIDEBAR FUNCTIONALITY ===========================

/**
 * Configuración de navegación para diferentes tipos de usuario
 */
const navigationConfig = {
    user: [
        { name: 'Dashboard', icon: 'fas fa-home', url: 'dashboard.html' },
        { name: 'Biomonitoreo', icon: 'fas fa-leaf', url: 'biomo.html' },
        { name: 'Convocatorias', icon: 'fas fa-bullhorn', url: 'convocatorias.html' },
        { name: 'Explorador', icon: 'fas fa-search', url: 'explorador.html' }
    ],
    admin: [
        { name: 'Panel Admin', icon: 'fas fa-cog', url: 'Adminindex.html' },
        { name: 'Dashboard', icon: 'fas fa-home', url: 'dashboard.html' },
        { name: 'Gestión Usuarios', icon: 'fas fa-users', url: 'SAaceptarusuarios.html' },
        { name: 'Todos los Registros', icon: 'fas fa-database', url: 'AdmUpReguser.html' },
        { name: 'Biomonitoreo', icon: 'fas fa-leaf', url: 'biomo.html' },
        { name: 'Convocatorias', icon: 'fas fa-bullhorn', url: 'convocatorias.html' },
        { name: 'Explorador', icon: 'fas fa-search', url: 'explorador.html' }
    ]
};

/**
 * Genera el HTML de la sidebar con nuevo diseño
 */
function generateSidebarHTML() {
    const rol = getUserRole();
    const nombre = getUserName();
    const roleDisplay = getRoleDisplayName(rol);
    const isAdmin = rol >= 3;
    const navItems = isAdmin ? navigationConfig.admin : navigationConfig.user;
    
    return `
        <div class="sidebar" id="sidebar">
            <nav class="sidebar-nav">
                ${navItems.map(item => `
                    <a href="${item.url}" class="sidebar-item" data-page="${item.url}">
                        <span class="sidebar-icon">
                            <i class="${item.icon}"></i>
                        </span>
                        <span class="sidebar-text">${item.name}</span>
                    </a>
                `).join('')}
            </nav>
            
            <div class="sidebar-footer">
                <a href="#" class="support-link" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Cerrar Sesión</span>
                </a>
            </div>
        </div>
        
        <div class="sidebar-overlay" id="sidebarOverlay"></div>
    `;
}

/**
 * Carga los estilos CSS de la sidebar desde archivo externo
 */
function loadSidebarCSS() {
    // Verificar si ya se ha cargado el CSS
    if (document.querySelector('link[href*="sidebar-styles.css"]')) {
        return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'css/sidebar-styles.css';
    document.head.appendChild(link);
}

/**
 * Genera el HTML del header con toggle de sidebar
 */
function generateHeaderHTML() {
    const nombre = getUserName();
    const roleDisplay = getRoleDisplayName(getUserRole());
    
    return `
        <header class="mawi-header">
            <div class="sidebar-toggle" onclick="toggleSidebar()">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                </svg>
            </div>
            
            <div class="logo">
                <svg class="eye-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
                <h2>MAWI</h2>
            </div>
            
            <div class="user-menu">
                <span>${roleDisplay}</span>
                <div class="avatar-circle">
                    <i class="fas fa-user"></i>
                </div>
            </div>
        </header>
    `;
}

/**
 * Inicializa la sidebar y header en una página
 */
function initializeSidebar() {
    // Verificar que el usuario esté autenticado
    if (!checkAuthAndRedirect()) {
        return false;
    }
    
    // Cargar CSS de la sidebar
    loadSidebarCSS();
    
    // Crear contenedor de la aplicación si no existe
    let appContainer = document.querySelector('.mawi-app-container');
    if (!appContainer) {
        // Envolver el contenido existente en el contenedor de la app
        const body = document.body;
        const existingContent = body.innerHTML;
        
        body.innerHTML = `
            <div class="mawi-app-container">
                <div class="app-content">
                    <div class="main-content">
                        ${existingContent}
                    </div>
                </div>
            </div>
        `;
        
        appContainer = document.querySelector('.mawi-app-container');
    }
    
    // Agregar header si no existe
    if (!document.querySelector('.mawi-header')) {
        const headerHTML = generateHeaderHTML();
        appContainer.insertAdjacentHTML('afterbegin', headerHTML);
    }
    
    // Agregar sidebar y overlay
    const appContent = document.querySelector('.app-content');
    if (appContent && !document.querySelector('.sidebar')) {
        const sidebarHTML = generateSidebarHTML();
        appContent.insertAdjacentHTML('afterbegin', sidebarHTML);
    }
    
    // Marcar el elemento activo en la navegación
    highlightActivePage();
    
    // Event listeners
    setupSidebarEvents();
    
    return true;
}

/**
 * Toggle de la sidebar
 */
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    body.classList.toggle('sidebar-open');
}

/**
 * Cierra la sidebar
 */
function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const body = document.body;
    
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    body.classList.remove('sidebar-open');
}

/**
 * Resalta la página activa en la navegación
 */
function highlightActivePage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.sidebar-item[data-page]');
    
    navItems.forEach(item => {
        const itemPage = item.getAttribute('data-page');
        if (itemPage === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

/**
 * Configura los event listeners de la sidebar
 */
function setupSidebarEvents() {
    // Cerrar sidebar al hacer click en overlay
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }
    
    // Cerrar sidebar en móviles al hacer click en un enlace
    const navItems = document.querySelectorAll('.sidebar-item[data-page]');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
    
    // Cerrar sidebar con tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });
    
    // Ajustar sidebar en resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) {
            // En desktop, la sidebar es siempre visible
            closeSidebar();
        }
    });
}

/**
 * Función de inicialización completa para páginas internas
 * Combina autenticación y sidebar
 */
function initializePage(options = {}) {
    const {
        requireAdmin = false,
        showSidebar = true,
        customSetup = null
    } = options;
    
    // Verificar autenticación
    if (!initializeAuth(requireAdmin)) {
        return false;
    }
    
    // Inicializar sidebar si se requiere
    if (showSidebar) {
        initializeSidebar();
    }
    
    // Ejecutar configuración personalizada
    if (typeof customSetup === 'function') {
        customSetup();
    }
    
    return true;
}

// Hacer funciones disponibles globalmente
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.logout = logout;
window.initializePage = initializePage;
window.checkAuthAndRedirect = checkAuthAndRedirect;
window.getUserRole = getUserRole;
window.getUserName = getUserName;
window.getUserData = getUserData;
window.getRoleDisplayName = getRoleDisplayName;
window.initializeAuth = initializeAuth;
window.requireMinRole = requireMinRole;
window.setupHeader = setupHeader;
