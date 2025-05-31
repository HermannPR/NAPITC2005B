// sidebar.js - Componente Sidebar Único para todas las páginas

class MawiSidebar {
  constructor(options = {}) {
    this.activePage = options.activePage || '';
    this.containerId = options.containerId || 'sidebar-container';
    this.isCollapsed = window.innerWidth <= 768;
    this.navItems = [
      { href: 'dashboard.html', icon: '🏠', text: 'Inicio', page: 'dashboard' },
      { href: 'biomo.html', icon: '🌿', text: 'Asistente de Mi Biomo', page: 'biomo' },
      { href: 'explorador.html', icon: '📄', text: 'Asistente Explorador de Anteproyectos', page: 'explorador' },
      { href: 'convocatorias.html', icon: '📋', text: 'Asistente de Convocatorias', page: 'convocatorias' },
      { href: 'perfil.html', icon: '👤', text: 'Mi Perfil', page: 'perfil' }
    ];
    this.init();
  }

  // Crear HTML del sidebar
  createSidebarHTML() {
    return `
      <aside class="sidebar ${this.isCollapsed ? 'collapsed' : ''}" id="mawi-sidebar">
        <div class="sidebar-header">
          <h3 class="sidebar-title">Navegación</h3>
          <button class="sidebar-toggle-btn" onclick="window.mawiSidebar.toggle()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div class="sidebar-content">
          <nav class="sidebar-nav">
            ${this.createNavItems()}
          </nav>
          
          <div class="sidebar-footer">
            <a href="#" class="support-link">
              <img src="support-icon.svg" alt="Soporte" />
              <span>Contacta con el soporte</span>
            </a>
          </div>
        </div>
      </aside>
      
      <!-- Overlay para móvil -->
      <div class="sidebar-overlay" id="sidebar-overlay" onclick="window.mawiSidebar.toggle()"></div>
    `;
  }

  // Crear elementos de navegación
  createNavItems() {
    return this.navItems.map(item => {
      const activeClass = this.activePage === item.page ? 'active' : '';
      return `
        <a href="${item.href}" class="sidebar-item ${activeClass}" data-tooltip="${item.text}">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            ${this.getIconSVG(item.icon)}
          </svg>
          <span>${item.text}</span>
        </a>
      `;
    }).join('');
  }

  // Obtener SVG para iconos
  getIconSVG(icon) {
    const icons = {
      '🏠': '<path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2"/><polyline points="9,22 9,12 15,12 15,22" stroke="currentColor" stroke-width="2"/>',
      '🌿': '<path d="M12 2C13.0609 2 14.0783 2.42143 14.8284 3.17157C15.5786 3.92172 16 4.93913 16 6C16 7.06087 15.5786 8.07828 14.8284 8.82843C14.0783 9.57857 13.0609 10 12 10C10.9391 10 9.92172 9.57857 9.17157 8.82843C8.42143 8.07828 8 7.06087 8 6C8 4.93913 8.42143 3.92172 9.17157 3.17157C9.92172 2.42143 10.9391 2 12 2Z" stroke="currentColor" stroke-width="2"/><path d="M12 10C14.2091 10 16 11.7909 16 14V20C16 21.1046 15.1046 22 14 22H10C8.89543 22 8 21.1046 8 20V14C8 11.7909 9.79086 10 12 10Z" stroke="currentColor" stroke-width="2"/>',
      '📄': '<path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" stroke-width="2"/><polyline points="14,2 14,8 20,8" stroke="currentColor" stroke-width="2"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2"/><polyline points="10,9 9,9 8,9" stroke="currentColor" stroke-width="2"/>',
      '📋': '<path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" stroke="currentColor" stroke-width="2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2"/>',
      '👤': '<path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2"/>'
    };
    return icons[icon] || icons['📄']; // Fallback al icono de documento
  }

  // Inicializar sidebar
  init() {
    this.render();
    this.setupEventListeners();
  }

  // Renderizar sidebar en el DOM
  render() {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = this.createSidebarHTML();
    } else {
      console.error(`Container with id "${this.containerId}" not found`);
    }
  }

  // Configurar event listeners
  setupEventListeners() {
    // Manejar redimensionamiento de ventana
    window.addEventListener('resize', () => {
      this.handleResize();
    });

    // Cerrar sidebar en móvil al hacer click fuera
    document.addEventListener('click', (e) => {
      this.handleOutsideClick(e);
    });

    // Prevenir que el click en el toggle cierre el sidebar
    const toggleBtn = document.querySelector('.sidebar-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    // Manejar clicks en items del sidebar
    this.setupNavigationListeners();
  }

  // Manejar redimensionamiento
  handleResize() {
    const sidebar = document.getElementById('mawi-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
      if (window.innerWidth >= 1200) {
        // Desktop: mostrar sidebar, ocultar overlay
        this.isCollapsed = false;
        sidebar.classList.remove('collapsed');
        overlay.classList.remove('active');
        document.body.classList.remove('sidebar-open');
      } else if (window.innerWidth <= 768) {
        // Móvil: colapsar sidebar
        if (!this.isCollapsed) {
          this.isCollapsed = true;
          sidebar.classList.add('collapsed');
          overlay.classList.remove('active');
          document.body.classList.remove('sidebar-open');
        }
      }
    }
  }

  // Manejar clicks fuera del sidebar
  handleOutsideClick(e) {
    if (window.innerWidth <= 1199) { // Solo en móvil/tablet
      const sidebar = document.getElementById('mawi-sidebar');
      const toggleBtn = document.querySelector('.sidebar-toggle-btn');
      const overlay = document.getElementById('sidebar-overlay');
      
      if (sidebar && toggleBtn && overlay && 
          !sidebar.contains(e.target) && 
          !toggleBtn.contains(e.target) && 
          !this.isCollapsed) {
        this.toggle();
      }
    }
  }

  // Configurar listeners de navegación
  setupNavigationListeners() {
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // En móvil, cerrar sidebar al navegar
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            this.toggle();
          }, 100);
        }
      });
    });
  }  // Alternar visibilidad del sidebar
  toggle() {
    const sidebar = document.getElementById('mawi-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    
    if (sidebar && overlay) {
      this.isCollapsed = !this.isCollapsed;
      
      // Console debug para verificar el estado
      console.log('Sidebar toggle - isCollapsed:', this.isCollapsed);
      
      if (window.innerWidth >= 1200) {
        // Desktop: solo cambiar ancho
        sidebar.classList.toggle('collapsed', this.isCollapsed);
        console.log('Desktop mode - sidebar classes:', sidebar.className);
      } else {
        // Móvil/Tablet: mostrar/ocultar
        sidebar.classList.toggle('collapsed', this.isCollapsed);
        overlay.classList.toggle('active', !this.isCollapsed);
        document.body.classList.toggle('sidebar-open', !this.isCollapsed);
        console.log('Mobile/Tablet mode - sidebar classes:', sidebar.className);
      }
      
      // Forzar actualización de estilos en modo collapsed
      if (this.isCollapsed) {
        // Ocultar todos los elementos del sidebar
        const sidebarItems = sidebar.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
          item.style.display = 'none';
          item.style.opacity = '0';
          item.style.visibility = 'hidden';
        });
        
        // Ocultar específicamente spans e iconos
        const sidebarSpans = sidebar.querySelectorAll('.sidebar-item span');
        sidebarSpans.forEach(span => {
          span.style.display = 'none';
        });
        
        const sidebarIcons = sidebar.querySelectorAll('.sidebar-item svg');
        sidebarIcons.forEach(icon => {
          icon.style.display = 'none';
        });
        
        // Ocultar navegación y footer
        const sidebarNav = sidebar.querySelector('.sidebar-nav');
        if (sidebarNav) {
          sidebarNav.style.display = 'none';
        }
        
        const sidebarFooter = sidebar.querySelector('.sidebar-footer');
        if (sidebarFooter) {
          sidebarFooter.style.display = 'none';
        }
        
        console.log('Forced hide all sidebar content');
      } else {
        // Restaurar visibilidad
        const sidebarItems = sidebar.querySelectorAll('.sidebar-item');
        sidebarItems.forEach(item => {
          item.style.display = '';
          item.style.opacity = '';
          item.style.visibility = '';
        });
        
        const sidebarSpans = sidebar.querySelectorAll('.sidebar-item span');
        sidebarSpans.forEach(span => {
          span.style.display = '';
        });
        
        const sidebarIcons = sidebar.querySelectorAll('.sidebar-item svg');
        sidebarIcons.forEach(icon => {
          icon.style.display = '';
        });
        
        // Restaurar navegación y footer
        const sidebarNav = sidebar.querySelector('.sidebar-nav');
        if (sidebarNav) {
          sidebarNav.style.display = '';
        }
        
        const sidebarFooter = sidebar.querySelector('.sidebar-footer');
        if (sidebarFooter) {
          sidebarFooter.style.display = '';
        }
        
        console.log('Restored sidebar content visibility');
      }
      
      // Actualizar estado visual del contenido principal
      const mainContent = document.querySelector('.main-content, .test-container');
      if (mainContent) {
        mainContent.classList.toggle('full-width', this.isCollapsed);
      }
    } else {
      console.error('Sidebar o overlay no encontrado');
    }
  }

  // Establecer página activa
  setActivePage(pageName) {
    this.activePage = pageName;
    const items = document.querySelectorAll('.sidebar-item');
    items.forEach(item => item.classList.remove('active'));
    
    // Encontrar y activar el elemento correspondiente
    const targetItem = Array.from(items).find(item => {
      const href = item.getAttribute('href');
      return href && href.includes(pageName);
    });
    
    if (targetItem) {
      targetItem.classList.add('active');
    }
  }

  // Actualizar badge de notificaciones (funcionalidad futura)
  updateBadge(page, count) {
    const targetItem = document.querySelector(`[href="${page}.html"]`);
    if (targetItem && count > 0) {
      let badge = targetItem.querySelector('.badge');
      if (!badge) {
        badge = document.createElement('span');
        badge.className = 'badge';
        targetItem.appendChild(badge);
      }
      badge.textContent = count;
    }
  }

  // Destruir sidebar (útil para cleanup)
  destroy() {
    const container = document.getElementById(this.containerId);
    if (container) {
      container.innerHTML = '';
    }
    
    // Remover event listeners globales
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('click', this.handleOutsideClick);
    
    // Limpiar referencias globales
    window.mawiSidebar = null;
  }
}

// Función de inicialización global
function initMawiSidebar(activePage = '') {
  // Verificar que el DOM esté cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.mawiSidebar = new MawiSidebar({ activePage });
    });
  } else {
    window.mawiSidebar = new MawiSidebar({ activePage });
  }
}

// Exportar para uso en módulos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { MawiSidebar, initMawiSidebar };
}

// Hacer disponible globalmente
window.MawiSidebar = MawiSidebar;
window.initMawiSidebar = initMawiSidebar;
