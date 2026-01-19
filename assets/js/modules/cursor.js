/**
 * Módulo de Cursor Customizado - OTIMIZADO
 * Corrige problemas de lag e melhora performance
 */

import { CONFIG } from '../config/constants.js';
import { isMobile, prefersReducedMotion } from '../utils/dom-helpers.js';
import { raf, cancelRaf } from '../utils/performance.js';

class CustomCursor {
    constructor() {
        // Não inicializar em mobile ou se usuário prefere movimento reduzido
        if (isMobile() || prefersReducedMotion() || !CONFIG.ENABLE_CUSTOM_CURSOR) {
            return;
        }
        
        this.cursor = null;
        this.cursorDot = null;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.animationId = null;
        this.isHovering = false;
        
        // Throttle para atualização do mouse
        this.lastUpdate = 0;
        
        this.init();
    }
    
    init() {
        this.createElements();
        this.attachEvents();
        this.startAnimation();
    }
    
    createElements() {
        // Criar cursor principal
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        
        // Criar dot central
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'custom-cursor-dot';
        
        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorDot);
        
        // Esconder cursor padrão
        document.body.style.cursor = 'none';
    }
    
    attachEvents() {
        // Usar passive para melhor performance
        document.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
        document.addEventListener('mouseenter', this.showCursor.bind(this), { passive: true });
        document.addEventListener('mouseleave', this.hideCursor.bind(this), { passive: true });
        
        // Elementos interativos
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.setHoverState(true), { passive: true });
            el.addEventListener('mouseleave', () => this.setHoverState(false), { passive: true });
        });
    }
    
    handleMouseMove(e) {
        // Throttle: apenas atualizar a cada 16ms (~60fps)
        const now = Date.now();
        if (now - this.lastUpdate < CONFIG.CURSOR.UPDATE_THROTTLE) {
            return;
        }
        this.lastUpdate = now;
        
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }
    
    setHoverState(isHovering) {
        this.isHovering = isHovering;
        document.body.classList.toggle('cursor-hover', isHovering);
    }
    
    showCursor() {
        if (this.cursor) this.cursor.style.opacity = '1';
        if (this.cursorDot) this.cursorDot.style.opacity = '1';
    }
    
    hideCursor() {
        if (this.cursor) this.cursor.style.opacity = '0';
        if (this.cursorDot) this.cursorDot.style.opacity = '0';
    }
    
    startAnimation() {
        const animate = () => {
            // Suavização com lag otimizado
            const lagFactor = CONFIG.CURSOR.LAG_FACTOR;
            const dotLagFactor = CONFIG.CURSOR.DOT_LAG_FACTOR;
            
            // Cursor principal com lag
            this.cursorX += (this.mouseX - this.cursorX) * lagFactor;
            this.cursorY += (this.mouseY - this.cursorY) * lagFactor;
            
            // Usar transform ao invés de left/top para melhor performance
            if (this.cursor) {
                this.cursor.style.transform = `translate(${this.cursorX}px, ${this.cursorY}px)`;
            }
            
            // Dot central com menos lag
            this.dotX += (this.mouseX - this.dotX) * dotLagFactor;
            this.dotY += (this.mouseY - this.dotY) * dotLagFactor;
            
            if (this.cursorDot) {
                this.cursorDot.style.transform = `translate(${this.dotX}px, ${this.dotY}px)`;
            }
            
            this.animationId = raf(animate);
        };
        
        animate();
    }
    
    destroy() {
        if (this.animationId) {
            cancelRaf(this.animationId);
        }
        if (this.cursor) this.cursor.remove();
        if (this.cursorDot) this.cursorDot.remove();
        document.body.style.cursor = 'auto';
    }
}

export default CustomCursor;
