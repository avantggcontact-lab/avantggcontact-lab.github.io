/* === INICIO DEL SCRIPT PRINCIPAL DE LA PÁGINA ===
   Usamos 'DOMContentLoaded' para asegurarnos de que el HTML esté completamente cargado
   antes de intentar seleccionar elementos (como botones o el header).
*/
document.addEventListener('DOMContentLoaded', () => {

    /* --- SECCIÓN 1: LÓGICA DE ANIMACIÓN DEL HEADER (Menú Principal) ---
       Esta sección controla el efecto de vidrio y el ocultar/mostrar al hacer scroll.
    */

    // 1.1. Selección de elementos
    const header = document.getElementById('main-header');

    // 1.2. Variables de estado
    let lastScrollY = window.scrollY;

    // 1.3. Event Listener para el Scroll (solo si existe el header)
    if (header) {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < lastScrollY) {
                header.classList.remove('-translate-y-full');
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                header.classList.add('-translate-y-full');
            }

            if (currentScrollY > 50) {
                header.classList.add('bg-white/80', 'backdrop-blur-md', 'shadow-lg');
            } else {
                header.classList.remove('bg-white/80', 'backdrop-blur-md', 'shadow-lg');
            }

            lastScrollY = currentScrollY;
        });
    }


    /* --- SECCIÓN 2: LÓGICA DEL MENÚ MÓVIL (Pantalla Completa) ---
       Esta sección controla la apertura y cierre del menú en dispositivos móviles.
    */

    const mobileMenuButton = document.getElementById('mobile-menu-button'); // El botón de hamburguesa
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay'); // La superposición
    const mobileMenuPanel = document.getElementById('mobile-menu-panel'); // El panel que desliza
    const mobileMenuCloseButton = document.getElementById('mobile-menu-close-button'); // El botón 'X'
    const mobileLinks = mobileMenuOverlay ? mobileMenuOverlay.querySelectorAll('a') : [];

    const openMenu = () => {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('opacity-0', 'pointer-events-none');
            mobileMenuOverlay.classList.add('opacity-100', 'pointer-events-auto');
        }
        if (mobileMenuPanel) {
            mobileMenuPanel.classList.remove('translate-x-full');
            mobileMenuPanel.classList.add('translate-x-0');
        }
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('opacity-100', 'pointer-events-auto');
            mobileMenuOverlay.classList.add('opacity-0', 'pointer-events-none');
        }
        if (mobileMenuPanel) {
            mobileMenuPanel.classList.remove('translate-x-0');
            mobileMenuPanel.classList.add('translate-x-full');
        }
        document.body.style.overflow = 'auto';
    };

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openMenu);
    }

    if (mobileMenuCloseButton) {
        mobileMenuCloseButton.addEventListener('click', closeMenu);
    }

    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (event) => {
            if (event.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
    }

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    // IntersectionObserver para animaciones al hacer scroll
    const animated = document.querySelectorAll('[data-animate], .animate-on-scroll');
    if ('IntersectionObserver' in window && animated.length) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
        animated.forEach(el => obs.observe(el));
    } else {
        // Fallback: mostrar todos
        animated.forEach(el => el.classList.add('show'));
    }

    // Reemplaza iconos Feather si la librería está cargada
    if (window.feather && typeof window.feather.replace === 'function') {
        window.feather.replace();
    }
});

/* === FIN DEL SCRIPT PRINCIPAL === */