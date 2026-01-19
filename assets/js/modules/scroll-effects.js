/**
 * Módulo de Efeitos de Scroll
 * Reveal de elementos e outras animações baseadas em scroll
 */

import { CONFIG, SELECTORS } from '../config/constants.js';
import { $$, prefersReducedMotion } from '../utils/dom-helpers.js';
import { createObserver } from '../utils/performance.js';

class ScrollEffects {
    constructor() {
        if (prefersReducedMotion()) {
            // Se usuário prefere movimento reduzido, mostrar tudo imediatamente
            this.revealAll();
            return;
        }
        
        this.init();
    }
    
    init() {
        this.setupRevealAnimation();
    }
    
    setupRevealAnimation() {
        const reveals = $$(SELECTORS.revealElements);
        
        const observer = createObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: CONFIG.REVEAL.THRESHOLD,
            rootMargin: CONFIG.REVEAL.ROOT_MARGIN
        });
        
        if (observer) {
            reveals.forEach(element => {
                element.classList.add('reveal');
                observer.observe(element);
            });
        } else {
            // Fallback se IntersectionObserver não for suportado
            this.revealAll();
        }
    }
    
    revealAll() {
        const reveals = $$(SELECTORS.revealElements);
        reveals.forEach(el => {
            el.classList.add('revealed');
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
}

export default ScrollEffects;
