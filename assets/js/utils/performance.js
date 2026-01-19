/**
 * Utilitários de Performance
 * Funções para otimização e monitoramento
 */

/**
 * Usa requestAnimationFrame com fallback
 */
export const raf = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    ((callback) => window.setTimeout(callback, 1000 / 60));

/**
 * Cancela animationFrame
 */
export const cancelRaf = window.cancelAnimationFrame ||
                         window.webkitCancelAnimationFrame ||
                         window.mozCancelAnimationFrame ||
                         window.clearTimeout;

/**
 * Cria observer para Intersection
 */
export const createObserver = (callback, options = {}) => {
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver não suportado');
        return null;
    }
    
    return new IntersectionObserver(callback, options);
};

/**
 * Preload de imagens
 */
export const preloadImages = (urls) => {
    return Promise.all(
        urls.map(url => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
        })
    );
};

/**
 * Log de performance (apenas em desenvolvimento)
 */
export const logPerformance = (label) => {
    if (performance && performance.mark && location.hostname === 'localhost') {
        performance.mark(label);
        console.log(`⚡ Performance: ${label}`);
    }
};

/**
 * Mede tempo de execução
 */
export const measureTime = (fn, label = 'Function') => {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`⏱️ ${label}: ${(end - start).toFixed(2)}ms`);
    return result;
};
