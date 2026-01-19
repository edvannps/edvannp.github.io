/**
 * Módulo de Animações de Partículas - OTIMIZADO
 * Canvas com partículas conectadas no hero
 */

import { CONFIG, SELECTORS } from '../config/constants.js';
import { $, isMobile, prefersReducedMotion } from '../utils/dom-helpers.js';
import { raf, cancelRaf, createObserver } from '../utils/performance.js';

class ParticlesAnimation {
    constructor() {
        if (!CONFIG.ENABLE_PARTICLES || prefersReducedMotion()) {
            return;
        }
        
        this.hero = $(SELECTORS.hero);
        if (!this.hero) return;
        
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        
        this.init();
    }
    
    init() {
        this.createCanvas();
        this.setupParticles();
        this.setupObserver();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'tech-canvas';
        this.hero.insertBefore(this.canvas, this.hero.firstChild);
        
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.resizeCanvas();
        
        window.addEventListener('resize', this.resizeCanvas.bind(this));
    }
    
    resizeCanvas() {
        this.canvas.width = this.hero.offsetWidth;
        this.canvas.height = this.hero.offsetHeight;
    }
    
    setupParticles() {
        const count = isMobile() 
            ? CONFIG.PARTICLES.COUNT_MOBILE 
            : CONFIG.PARTICLES.COUNT_DESKTOP;
        
        this.particles = [];
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }
    
    drawConnections() {
        const distance = CONFIG.PARTICLES.CONNECTION_DISTANCE;
        const opacity = CONFIG.PARTICLES.LINE_COLOR_OPACITY;
        
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < distance) {
                    const alpha = opacity * (1 - dist / distance);
                    this.ctx.strokeStyle = `rgba(51, 153, 204, ${alpha})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            particle.update();
            particle.draw(this.ctx);
        });
        
        this.drawConnections();
        this.animationId = raf(this.animate.bind(this));
    }
    
    setupObserver() {
        const observer = createObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    this.stop();
                } else {
                    this.start();
                }
            });
        });
        
        if (observer) {
            observer.observe(this.hero);
        }
    }
    
    stop() {
        if (this.animationId) {
            cancelRaf(this.animationId);
            this.animationId = null;
        }
    }
    
    start() {
        if (!this.animationId) {
            this.animate();
        }
    }
    
    destroy() {
        this.stop();
        if (this.canvas) {
            this.canvas.remove();
        }
    }
}

class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * CONFIG.PARTICLES.SPEED;
        this.vy = (Math.random() - 0.5) * CONFIG.PARTICLES.SPEED;
        this.radius = Math.random() * 
            (CONFIG.PARTICLES.MAX_RADIUS - CONFIG.PARTICLES.MIN_RADIUS) + 
            CONFIG.PARTICLES.MIN_RADIUS;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
    }
    
    draw(ctx) {
        ctx.fillStyle = CONFIG.PARTICLES.COLOR;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default ParticlesAnimation;
