/**
 * Módulo de Animações do Hero
 * Efeitos de typing, glitch, floating icons
 */

import { CONFIG, SELECTORS } from '../config/constants.js';
import { $, $$, prefersReducedMotion } from '../utils/dom-helpers.js';

class HeroAnimations {
    constructor() {
        this.hero = $(SELECTORS.hero);
        this.heroTitle = $(SELECTORS.heroTitle);
        this.heroSubtitle = $(SELECTORS.heroSubtitle);
        
        if (!this.hero) return;
        
        this.init();
    }
    
    init() {
        if (!prefersReducedMotion()) {
            this.setupTypingEffect();
            this.setupGlitchEffect();
            this.setupFloatingIcons();
        }
        this.setupRippleEffect();
    }
    
    setupTypingEffect() {
        if (!this.heroSubtitle) return;
        
        const originalText = this.heroSubtitle.textContent;
        this.heroSubtitle.textContent = '';
        this.heroSubtitle.style.opacity = '1';
        
        let charIndex = 0;
        
        const typeChar = () => {
            if (charIndex < originalText.length) {
                this.heroSubtitle.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, CONFIG.TYPING_SPEED);
            } else {
                this.heroSubtitle.classList.add('typing-complete');
            }
        };
        
        setTimeout(typeChar, 600);
    }
    
    setupGlitchEffect() {
        if (!this.heroTitle) return;
        
        this.heroTitle.addEventListener('mouseenter', function() {
            this.classList.add('glitch-active');
            setTimeout(() => {
                this.classList.remove('glitch-active');
            }, CONFIG.GLITCH_DURATION);
        });
    }
    
    setupFloatingIcons() {
        if (!CONFIG.ENABLE_FLOATING_ICONS) return;
        
        const techStack = ['Java', 'JS', 'AWS', 'SQL', 'Git', 'React', 'Node', 'Docker'];
        const container = document.createElement('div');
        container.className = 'floating-icons';
        
        techStack.forEach((tech, index) => {
            const icon = document.createElement('div');
            icon.className = 'tech-icon';
            icon.textContent = tech;
            icon.style.left = `${Math.random() * 80 + 10}%`;
            icon.style.animationDelay = `${index * 0.5}s`;
            icon.style.animationDuration = `${15 + Math.random() * 10}s`;
            container.appendChild(icon);
        });
        
        this.hero.appendChild(container);
    }
    
    setupRippleEffect() {
        const buttons = $$(SELECTORS.buttons);
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.classList.add('ripple-effect');
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                setTimeout(() => ripple.remove(), CONFIG.RIPPLE_DURATION);
            });
        });
    }
}

export default HeroAnimations;
