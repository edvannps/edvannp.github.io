/**
 * PORTFÓLIO EDVAN SABINO - MAIN APP
 * Arquivo principal que inicializa todos os módulos
 * 
 * @author Edvan Sabino
 * @version 2.0.0
 * @description Portfólio profissional com arquitetura modular e otimizado
 */

import Preloader from './modules/preloader.js';
import Navigation from './modules/navigation.js';
import CustomCursor from './modules/cursor.js';
import ParticlesAnimation from './modules/particles.js';
import ScrollEffects from './modules/scroll-effects.js';
import HeroAnimations from './modules/hero-animations.js';
import { logPerformance } from './utils/performance.js';

/**
 * Classe principal da aplicação
 */
class PortfolioApp {
    constructor() {
        this.modules = {};
        this.init();
    }
    
    init() {
        logPerformance('App Init Start');
        
        // Carregar módulos na ordem correta
        this.loadModules();
        
        // Setup de event listeners globais
        this.setupGlobalEvents();
        
        logPerformance('App Init Complete');
    }
    
    loadModules() {
        try {
            // Preloader (primeiro)
            this.modules.preloader = new Preloader();
            
            // Navegação
            this.modules.navigation = new Navigation();
            
            // Cursor customizado (otimizado)
            this.modules.cursor = new CustomCursor();
            
            // Animação de partículas
            this.modules.particles = new ParticlesAnimation();
            
            // Efeitos de scroll
            this.modules.scrollEffects = new ScrollEffects();
            
            // Animações do hero
            this.modules.heroAnimations = new HeroAnimations();
            
            console.log('✅ Todos os módulos carregados com sucesso');
        } catch (error) {
            console.error('❌ Erro ao carregar módulos:', error);
        }
    }
    
    setupGlobalEvents() {
        // Prevenir comportamentos indesejados
        this.preventDefaultBehaviors();
        
        // Log de performance em desenvolvimento
        if (location.hostname === 'localhost') {
            this.logPerformanceMetrics();
        }
    }
    
    preventDefaultBehaviors() {
        // Prevenir zoom em mobile ao tocar duas vezes
        document.addEventListener('dblclick', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    logPerformanceMetrics() {
        // Log de métricas após carregamento completo
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (performance && performance.getEntriesByType) {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.group('📊 Performance Metrics');
                    console.log('DOM Content Loaded:', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart, 'ms');
                    console.log('Load Complete:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
                    console.log('Total Load Time:', perfData.loadEventEnd, 'ms');
                    console.groupEnd();
                }
            }, 0);
        });
    }
    
    /**
     * Método para destruir todos os módulos (útil para SPA)
     */
    destroy() {
        Object.values(this.modules).forEach(module => {
            if (module && typeof module.destroy === 'function') {
                module.destroy();
            }
        });
        console.log('🔥 App destroyed');
    }
}

// Inicializar app quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.portfolioApp = new PortfolioApp();
    });
} else {
    window.portfolioApp = new PortfolioApp();
}

// Exportar para uso global (se necessário)
export default PortfolioApp;
