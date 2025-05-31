// Sidebar JavaScript estándar para todas las páginas
// Este código debe incluirse en todas las páginas con sidebar

function initializeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggleBtn = document.getElementById('sidebarToggleBtn');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  
  console.log('🔍 Inicializando sidebar...');
  console.log('Sidebar:', sidebar);
  console.log('Toggle button:', sidebarToggleBtn);
  console.log('Overlay:', sidebarOverlay);
  
  if (!sidebar) {
    console.error('❌ Elemento sidebar no encontrado');
    return;
  }
  
  if (!sidebarToggleBtn) {
    console.error('❌ Botón toggle del sidebar no encontrado');
    return;
  }
  
  if (!sidebarOverlay) {
    console.error('❌ Overlay del sidebar no encontrado');
    return;
  }

  // Función para alternar el sidebar
  function toggleSidebar() {
    const isMobile = window.innerWidth < 1200;
    console.log('📱 Toggle sidebar - Mobile:', isMobile, 'Width:', window.innerWidth);
    
    if (isMobile) {
      // En móvil: usar overlay
      const isOpen = sidebar.classList.contains('open');
      console.log('📱 Estado móvil - Abierto:', isOpen);
      
      if (isOpen) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
        console.log('📱 Sidebar cerrado en móvil');
      } else {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        console.log('📱 Sidebar abierto en móvil');
      }
    } else {
      // En desktop: colapsar/expandir
      const isCollapsed = sidebar.classList.contains('collapsed');
      console.log('🖥️ Estado desktop - Colapsado:', isCollapsed);
      
      sidebar.classList.toggle('collapsed');
      console.log('🖥️ Sidebar toggled en desktop - Nuevo estado colapsado:', !isCollapsed);
    }
  }
  // Event listeners
  sidebarToggleBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('🔘 Click en botón toggle detectado');
    toggleSidebar();
  });
  
  sidebarOverlay.addEventListener('click', function() {
    if (window.innerWidth < 1200) {
      console.log('🔘 Click en overlay detectado');
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Manejar cambios de tamaño de ventana
  window.addEventListener('resize', function() {
    const isMobile = window.innerWidth < 1200;
    
    if (!isMobile) {
      // En desktop, limpiar estados móviles
      sidebar.classList.remove('open');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      // En móvil, limpiar estado colapsado
      sidebar.classList.remove('collapsed');
    }
  });

  // Cerrar sidebar en móvil al hacer clic en enlaces
  const sidebarLinks = sidebar.querySelectorAll('.sidebar-item');
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth < 1200) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  console.log('✅ Sidebar inicializado correctamente');
}

// Exportar función para uso global
window.initializeSidebar = initializeSidebar;
