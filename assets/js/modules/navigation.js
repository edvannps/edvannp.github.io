/**
 * Módulo de Navegação
 * Gerencia menu mobile e scroll do header
 */

import { SELECTORS } from '../config/constants.js';
import { $, $$, addEvent } from '../utils/dom-helpers.js';
import { throttle } from '../utils/dom-helpers.js';

class Navigation {
    constructor() {
        this.header = $(SELECTORS.header);
        this.mobileMenuToggle = $(SELECTORS.mobileMenuToggle);
        this.navLinks = $(SELECTORS.navLinks);
        this.navLinksItems = $$(SELECTORS.navLinksItems);
        
        if (!this.header || !this.mobileMenuToggle) return;
        
        this.init();
    }
    
    init() {
        this.setupMobileMenu();
        this.setupSmoothScroll();
        this.setupScrollEffect();
    }
    
    setupMobileMenu() {
        // Toggle do menu
        this.mobileMenuToggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Fecha o menu ao clicar em um link
        addEvent(this.navLinksItems, 'click', () => {
            this.closeMenu();
        });
        
        // Fecha o menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (document.body.classList.contains('menu-open') && 
                !this.navLinks.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.mobileMenuToggle.classList.toggle('active');
        this.navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        const isExpanded = this.mobileMenuToggle.classList.contains('active');
        this.mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    }
    
    closeMenu() {
        this.mobileMenuToggle.classList.remove('active');
        this.navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
    }
    
    setupSmoothScroll() {
        addEvent($$('a[href^="#"]'), 'click', (e) => {
            e.preventDefault();
            const target = $(e.currentTarget.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    setupScrollEffect() {
        // Throttle para melhor performance
        const handleScroll = throttle(() => {
            if (window.scrollY > 50) {
                this.header.classList.add('scrolled');
            } else {
                this.header.classList.remove('scrolled');
            }
        }, 100);
        
        window.addEventListener('scroll', handleScroll, { passive: true });
    }
}

export default Navigation;
