/**
 * Utilitários para manipulação do DOM
 * Funções auxiliares para seleção e manipulação de elementos
 */

/**
 * Seleciona um elemento do DOM
 */
export const $ = (selector) => document.querySelector(selector);

/**
 * Seleciona múltiplos elementos do DOM
 */
export const $$ = (selector) => document.querySelectorAll(selector);

/**
 * Adiciona event listener com opção de multiple
 */
export const addEvent = (elements, event, handler, options = {}) => {
    if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
        elements.forEach(el => el.addEventListener(event, handler, options));
    } else {
        elements.addEventListener(event, handler, options);
    }
};

/**
 * Remove event listener
 */
export const removeEvent = (elements, event, handler) => {
    if (NodeList.prototype.isPrototypeOf(elements) || Array.isArray(elements)) {
        elements.forEach(el => el.removeEventListener(event, handler));
    } else {
        elements.removeEventListener(event, handler);
    }
};

/**
 * Throttle function - limita execuções
 */
export const throttle = (func, delay) => {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
};

/**
 * Debounce function - aguarda pausa na execução
 */
export const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

/**
 * Verifica se está em dispositivo móvel
 */
export const isMobile = () => window.innerWidth <= 1024;

/**
 * Verifica se prefere movimento reduzido (acessibilidade)
 */
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};
