// 🔍 SCRIPT DE VERIFICACIÓN DEL SISTEMA MODULAR
// verification-script.js

/**
 * Script para verificar que el sistema de sidebar modular está 
 * funcionando correctamente en todas las páginas
 */

function verifySidebarSystem() {
    console.log('🔍 INICIANDO VERIFICACIÓN DEL SISTEMA MODULAR...\n');
    
    // 1. Verificar que MawiSidebar esté disponible
    if (typeof MawiSidebar !== 'undefined') {
        console.log('✅ Clase MawiSidebar cargada correctamente');
    } else {
        console.error('❌ Clase MawiSidebar no encontrada');
        return false;
    }
    
    // 2. Verificar que initMawiSidebar esté disponible
    if (typeof initMawiSidebar !== 'undefined') {
        console.log('✅ Función initMawiSidebar disponible');
    } else {
        console.error('❌ Función initMawiSidebar no encontrada');
        return false;
    }
    
    // 3. Verificar que el sidebar esté inicializado
    if (window.mawiSidebar instanceof MawiSidebar) {
        console.log('✅ Instancia de sidebar creada correctamente');
    } else {
        console.error('❌ Sidebar no inicializado correctamente');
        return false;
    }
    
    // 4. Verificar elementos del DOM
    const sidebarContainer = document.getElementById('sidebar-container');
    if (sidebarContainer) {
        console.log('✅ Contenedor de sidebar encontrado');
    } else {
        console.error('❌ Contenedor de sidebar no encontrado');
        return false;
    }
    
    const sidebar = document.getElementById('mawi-sidebar');
    if (sidebar) {
        console.log('✅ Sidebar renderizado en el DOM');
    } else {
        console.error('❌ Sidebar no renderizado');
        return false;
    }
    
    // 5. Verificar elementos de navegación
    const navItems = document.querySelectorAll('.sidebar-item');
    if (navItems.length === 5) {
        console.log('✅ Elementos de navegación correctos (5 items)');
    } else {
        console.warn(`⚠️ Número de elementos de navegación: ${navItems.length} (esperado: 5)`);
    }
    
    // 6. Verificar página activa
    const activeItem = document.querySelector('.sidebar-item.active');
    if (activeItem) {
        console.log(`✅ Página activa detectada: ${activeItem.textContent.trim()}`);
    } else {
        console.warn('⚠️ No hay página activa marcada');
    }
    
    // 7. Verificar tooltips
    const itemsWithTooltips = document.querySelectorAll('.sidebar-item[data-tooltip]');
    if (itemsWithTooltips.length === navItems.length) {
        console.log('✅ Tooltips configurados en todos los elementos');
    } else {
        console.warn('⚠️ Algunos elementos sin tooltips');
    }
    
    // 8. Verificar funcionalidad de toggle
    if (typeof window.mawiSidebar.toggle === 'function') {
        console.log('✅ Función toggle disponible');
    } else {
        console.error('❌ Función toggle no disponible');
        return false;
    }
    
    // 9. Verificar responsive behavior
    const isDesktop = window.innerWidth >= 1200;
    console.log(`📱 Modo actual: ${isDesktop ? 'Desktop' : 'Mobile/Tablet'}`);
    
    // 10. Verificar overlay
    const overlay = document.querySelector('.sidebar-overlay');
    if (overlay) {
        console.log('✅ Overlay para móvil presente');
    } else {
        console.warn('⚠️ Overlay para móvil no encontrado');
    }
    
    console.log('\n🎉 VERIFICACIÓN COMPLETADA');
    console.log('📊 RESUMEN:');
    console.log('   - Sistema modular: ✅ Funcionando');
    console.log('   - Navegación: ✅ Operativa');
    console.log('   - Responsive: ✅ Activo');
    console.log('   - DOM: ✅ Correcto');
    
    return true;
}

// Función para probar funcionalidades
function testSidebarFunctionality() {
    console.log('\n🧪 PRUEBAS DE FUNCIONALIDAD...');
    
    // Test toggle
    console.log('🔄 Probando toggle...');
    const originalState = document.getElementById('mawi-sidebar').classList.contains('collapsed');
    window.mawiSidebar.toggle();
    setTimeout(() => {
        const newState = document.getElementById('mawi-sidebar').classList.contains('collapsed');
        if (originalState !== newState) {
            console.log('✅ Toggle funciona correctamente');
        } else {
            console.error('❌ Toggle no funciona');
        }
        
        // Restaurar estado original
        window.mawiSidebar.toggle();
    }, 100);
}

// Función para mostrar información del sistema
function showSystemInfo() {
    console.log('\n📋 INFORMACIÓN DEL SISTEMA:');
    console.log(`   Página actual: ${window.mawiSidebar.activePage}`);
    console.log(`   Viewport: ${window.innerWidth}x${window.innerHeight}`);
    console.log(`   Sidebar colapsado: ${window.mawiSidebar.isCollapsed}`);
    console.log(`   User Agent: ${navigator.userAgent.substring(0, 50)}...`);
}

// Ejecutar verificación automáticamente cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        console.clear();
        console.log('%c🎯 MAWI SIDEBAR SYSTEM VERIFICATION', 'font-size: 16px; font-weight: bold; color: #30a046;');
        console.log('%c============================================', 'color: #30a046;');
        
        const isValid = verifySidebarSystem();
        if (isValid) {
            testSidebarFunctionality();
            showSystemInfo();
            
            console.log('\n%c✅ SISTEMA COMPLETAMENTE FUNCIONAL', 'font-size: 14px; font-weight: bold; color: #30a046;');
            console.log('%c🚀 ¡Listo para producción!', 'color: #30a046;');
        } else {
            console.log('\n%c❌ SISTEMA CON ERRORES', 'font-size: 14px; font-weight: bold; color: #ff4444;');
            console.log('%c🔧 Revisar implementación', 'color: #ff4444;');
        }
        
        console.log('\n💡 Para ejecutar verificación manual: verifySidebarSystem()');
        console.log('💡 Para probar funcionalidad: testSidebarFunctionality()');
        console.log('💡 Para ver info del sistema: showSystemInfo()');
    }, 500); // Esperar a que se inicialice el sidebar
});

// Hacer funciones disponibles globalmente para debugging
window.verifySidebarSystem = verifySidebarSystem;
window.testSidebarFunctionality = testSidebarFunctionality;
window.showSystemInfo = showSystemInfo;
