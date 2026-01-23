/**
 * Configurações Globais do Portfólio
 * Centraliza todas as constantes para fácil manutenção
 */

export const CONFIG = {
    // Performance
    ENABLE_PARTICLES: true,
    ENABLE_MATRIX: false, // Desabilitado por padrão para melhor performance
    ENABLE_CUSTOM_CURSOR: true,
    ENABLE_FLOATING_ICONS: true,
    
    // Animações
    PRELOADER_DURATION: 2000, // ms
    TYPING_SPEED: 50, // ms por caractere
    GLITCH_DURATION: 600, // ms
    RIPPLE_DURATION: 600, // ms
    
    // Particles
    PARTICLES: {
        COUNT_DESKTOP: 50,
        COUNT_MOBILE: 30,
        CONNECTION_DISTANCE: 120,
        SPEED: 0.5,
        MIN_RADIUS: 1,
        MAX_RADIUS: 2,
        COLOR: 'rgba(51, 153, 204, 0.6)',
        LINE_COLOR_OPACITY: 0.2
    },
    
    // Cursor Customizado (OTIMIZADO E REFATORADO)
    CURSOR: {
        LAG_FACTOR: 0.2, // Suavização do cursor principal
        DOT_LAG_FACTOR: 0.6, // Suavização do dot central (menos lag)
        SIZE: 20,
        DOT_SIZE: 5,
        HOVER_SIZE: 40,
        UPDATE_THROTTLE: 16 // ~60fps
    },
    
    // Scroll Reveal
    REVEAL: {
        THRESHOLD: 0.15,
        ROOT_MARGIN: '0px 0px -50px 0px'
    },
    
    // Breakpoints
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1440
    }
};

export const SELECTORS = {
    preloader: '.preloader',
    header: '#main-header',
    mobileMenuToggle: '.mobile-menu-toggle',
    navLinks: '.nav-links',
    navLinksItems: '.nav-links a',
    hero: '#hero',
    heroTitle: '.hero-text h1',
    heroSubtitle: '.hero-text h2',
    revealElements: '.about-text, .project-card, .section-title',
    buttons: '.btn',
    // Elementos interativos para o cursor (EXCLUINDO .highlight)
    interactiveElements: 'a:not(.highlight), button, .btn, .project-card, input, textarea, select'
};
