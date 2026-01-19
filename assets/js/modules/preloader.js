/**
 * Módulo de Preloader
 * Gerencia a tela de carregamento inicial
 */

import { CONFIG, SELECTORS } from '../config/constants.js';
import { $ } from '../utils/dom-helpers.js';

class Preloader {
    constructor() {
        this.preloader = $(SELECTORS.preloader);
        if (!this.preloader) return;
        
        this.init();
    }
    
    init() {
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hide();
            }, CONFIG.PRELOADER_DURATION);
        });
    }
    
    hide() {
        this.preloader.classList.add('hidden');
        setTimeout(() => {
            this.preloader.style.display = 'none';
        }, 500);
    }
}

export default Preloader;
