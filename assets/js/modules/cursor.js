/**
 * Módulo de Cursor Customizado - REFATORADO E OTIMIZADO
 * Corrige problemas de visibilidade, performance e hover indevido
 */

import { CONFIG, SELECTORS } from '../config/constants.js';
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
        this.currentX = 0;
        this.currentY = 0;
        this.dotX = 0;
        this.dotY = 0;
        this.animationId = null;
        this.isHovering = false;
        this.isVisible = false;
        
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
        
        // Esconder cursor padrão em elementos interativos
        document.body.style.cursor = 'none';
    }
    
    attachEvents() {
        // Usar passive para melhor performance
        document.addEventListener('mousemove', this.handleMouseMove.bind(this), { passive: true });
        document.addEventListener('mouseenter', this.handleMouseEnter.bind(this), { passive: true });
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this), { passive: true });
        
        // Elementos interativos - usando seletor centralizado que exclui .highlight
        const hoverElements = document.querySelectorAll(SELECTORS.interactiveElements);
        
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
        
        // Garantir que o cursor está visível quando o mouse se move
        if (!this.isVisible) {
            this.showCursor();
        }
    }
    
    handleMouseEnter() {
        this.showCursor();
    }
    
    handleMouseLeave() {
        this.hideCursor();
    }
    
    setHoverState(isHovering) {
        this.isHovering = isHovering;
        document.body.classList.toggle('cursor-hover', isHovering);
    }
    
    showCursor() {
        this.isVisible = true;
        if (this.cursor) {
            this.cursor.style.opacity = '1';
            this.cursor.style.visibility = 'visible';
        }
        if (this.cursorDot) {
            this.cursorDot.style.opacity = '1';
            this.cursorDot.style.visibility = 'visible';
        }
    }
    
    hideCursor() {
        this.isVisible = false;
        if (this.cursor) {
            this.cursor.style.opacity = '0';
            this.cursor.style.visibility = 'hidden';
        }
        if (this.cursorDot) {
            this.cursorDot.style.opacity = '0';
            this.cursorDot.style.visibility = 'hidden';
        }
    }
    
    startAnimation() {
        const animate = () => {
            // Suavização com lag otimizado
            const lagFactor = CONFIG.CURSOR.LAG_FACTOR;
            const dotLagFactor = CONFIG.CURSOR.DOT_LAG_FACTOR;
            
            // Cursor principal com lag
            this.currentX += (this.mouseX - this.currentX) * lagFactor;
            this.currentY += (this.mouseY - this.currentY) * lagFactor;
            
            // Usar left/top para posicionamento base e transform para centralização
            if (this.cursor && this.isVisible) {
                this.cursor.style.left = `${this.currentX}px`;
                this.cursor.style.top = `${this.currentY}px`;
            }
            
            // Dot central com menos lag
            this.dotX += (this.mouseX - this.dotX) * dotLagFactor;
            this.dotY += (this.mouseY - this.dotY) * dotLagFactor;
            
            if (this.cursorDot && this.isVisible) {
                this.cursorDot.style.left = `${this.dotX}px`;
                this.cursorDot.style.top = `${this.dotY}px`;
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
