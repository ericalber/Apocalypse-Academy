// PERFORMANCE BOOST KIT - Sistema de Otimização Completo
// Seguindo Guide Master - Preservando estrutura visual existente

// Configurações de performance
const PERFORMANCE_CONFIG = {
  caching: {
    staticAssets: 31536000, // 1 ano
    apiResponses: 300, // 5 minutos
    userContent: 3600, // 1 hora
    images: 2592000, // 30 dias
    videos: 604800 // 7 dias
  },
  compression: {
    enabled: true,
    level: 6,
    threshold: 1024 // 1KB
  },
  lazyLoading: {
    images: true,
    videos: true,
    components: true,
    threshold: '50px'
  },
  preloading: {
    criticalResources: true,
    nextPage: true,
    fonts: true,
    images: true
  },
  bundleOptimization: {
    codesplitting: true,
    treeShaking: true,
    minification: true,
    compression: true
  },
  monitoring: {
    coreWebVitals: true,
    userExperience: true,
    resourceTiming: true,
    errorTracking: true
  }
};

// Métricas de performance
const PERFORMANCE_THRESHOLDS = {
  // Core Web Vitals
  LCP: { good: 2500, needsImprovement: 4000 }, // Largest Contentful Paint
  FID: { good: 100, needsImprovement: 300 },   // First Input Delay
  CLS: { good: 0.1, needsImprovement: 0.25 },  // Cumulative Layout Shift
  
  // Outras métricas importantes
  FCP: { good: 1800, needsImprovement: 3000 }, // First Contentful Paint
  TTI: { good: 3800, needsImprovement: 7300 }, // Time to Interactive
  TBT: { good: 200, needsImprovement: 600 },   // Total Blocking Time
  
  // Métricas de rede
  TTFB: { good: 800, needsImprovement: 1800 }, // Time to First Byte
  
  // Métricas customizadas
  videoLoadTime: { good: 3000, needsImprovement: 8000 },
  imageLoadTime: { good: 1000, needsImprovement: 3000 }
};

// Classe principal do Performance Boost Kit
export class PerformanceBoostKit {
  constructor() {
    this.metrics = new Map();
    this.observer = null;
    this.resourceObserver = null;
    this.navigationObserver = null;
    this.cache = new Map();
    this.preloadQueue = [];
    this.lazyLoadQueue = [];
    this.optimizations = {
      imagesOptimized: 0,
      videosOptimized: 0,
      cacheHits: 0,
      bundleSize: 0,
      loadTime: 0
    };
    this.isInitialized = false;
  }

  // Inicializar sistema de performance
  async initialize() {
    try {
      // Configurar observadores de performance
      this.setupPerformanceObservers();
      
      // Configurar cache inteligente
      this.setupIntelligentCaching();
      
      // Configurar lazy loading
      this.setupLazyLoading();
      
      // Configurar preloading
      this.setupPreloading();
      
      // Otimizar recursos existentes
      await this.optimizeExistingResources();
      
      // Configurar monitoramento contínuo
      this.setupContinuousMonitoring();
      
      // Aplicar otimizações de CSS e JS
      this.applyCSSOptimizations();
      this.applyJSOptimizations();
      
      this.isInitialized = true;
      console.log('Performance Boost Kit inicializado com sucesso');
      
      return { success: true, message: 'Performance Boost Kit ativado' };
    } catch (error) {
      console.error('Erro ao inicializar Performance Boost Kit:', error);
      throw error;
    }
  }

  // Configurar observadores de performance
  setupPerformanceObservers() {
    // Performance Observer para Core Web Vitals
    if ('PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            this.recordMetric('LCP', entry.startTime);
          }
        }
      });
      
      try {
        this.observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer não suportado');
      }

      // FID (First Input Delay)
      this.observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'first-input') {
            this.recordMetric('FID', entry.processingStart - entry.startTime);
          }
        }
      });
      
      try {
        this.observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer não suportado');
      }

      // Resource timing
      this.resourceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.analyzeResourceTiming(entry);
        }
      });
      
      try {
        this.resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (e) {
        console.warn('Resource observer não suportado');
      }
    }

    // CLS (Cumulative Layout Shift)
    this.setupCLSObserver();
    
    // Navigation timing
    this.setupNavigationTiming();
  }

  // Configurar observador de CLS
  setupCLSObserver() {
    let clsValue = 0;
    let clsEntries = [];

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          const firstSessionEntry = clsEntries[0];
          const lastSessionEntry = clsEntries[clsEntries.length - 1];

          if (!firstSessionEntry || 
              entry.startTime - lastSessionEntry.startTime < 1000 ||
              entry.startTime - firstSessionEntry.startTime < 5000) {
            clsEntries.push(entry);
            clsValue += entry.value;
          } else {
            clsEntries = [entry];
            clsValue = entry.value;
          }
        }
      }
      
      this.recordMetric('CLS', clsValue);
    });

    try {
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS observer não suportado');
    }
  }

  // Configurar timing de navegação
  setupNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        if (navigation) {
          this.recordMetric('TTFB', navigation.responseStart - navigation.requestStart);
          this.recordMetric('DOMContentLoaded', navigation.domContentLoadedEventEnd - navigation.navigationStart);
          this.recordMetric('LoadComplete', navigation.loadEventEnd - navigation.navigationStart);
        }

        // FCP (First Contentful Paint)
        const paintEntries = performance.getEntriesByType('paint');
        const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          this.recordMetric('FCP', fcpEntry.startTime);
        }
      }, 0);
    });
  }

  // Analisar timing de recursos
  analyzeResourceTiming(entry) {
    const resourceType = this.getResourceType(entry.name);
    const loadTime = entry.responseEnd - entry.startTime;
    
    // Registrar métricas por tipo de recurso
    this.recordMetric(`${resourceType}LoadTime`, loadTime);
    
    // Identificar recursos lentos
    if (loadTime > 3000) {
      console.warn(`Recurso lento detectado: ${entry.name} (${loadTime}ms)`);
      this.suggestOptimization(entry);
    }
    
    // Analisar cache hits
    if (entry.transferSize === 0 && entry.decodedBodySize > 0) {
      this.optimizations.cacheHits++;
    }
  }

  // Determinar tipo de recurso
  getResourceType(url) {
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'image';
    if (url.match(/\.(mp4|webm|ogg|avi)$/i)) return 'video';
    if (url.match(/\.(css)$/i)) return 'stylesheet';
    if (url.match(/\.(js)$/i)) return 'script';
    if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return 'font';
    return 'other';
  }

  // Configurar cache inteligente
  setupIntelligentCaching() {
    // Service Worker para cache avançado
    if ('serviceWorker' in navigator) {
      this.registerServiceWorker();
    }

    // Cache em memória para dados da API
    this.setupMemoryCache();
    
    // Cache de imagens otimizadas
    this.setupImageCache();
  }

  // Registrar Service Worker
  async registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registrado:', registration);
      
      // Comunicação com Service Worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data.type === 'CACHE_HIT') {
          this.optimizations.cacheHits++;
        }
      });
    } catch (error) {
      console.warn('Erro ao registrar Service Worker:', error);
    }
  }

  // Cache em memória
  setupMemoryCache() {
    const originalFetch = window.fetch;
    
    window.fetch = async (url, options = {}) => {
      const cacheKey = `${url}_${JSON.stringify(options)}`;
      
      // Verificar cache
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() - cached.timestamp < PERFORMANCE_CONFIG.caching.apiResponses * 1000) {
          this.optimizations.cacheHits++;
          return Promise.resolve(new Response(JSON.stringify(cached.data)));
        }
      }
      
      // Fazer requisição
      const response = await originalFetch(url, options);
      
      // Cachear resposta se for GET
      if (!options.method || options.method === 'GET') {
        try {
          const data = await response.clone().json();
          this.cache.set(cacheKey, {
            data: data,
            timestamp: Date.now()
          });
        } catch (e) {
          // Não é JSON, não cachear
        }
      }
      
      return response;
    };
  }

  // Cache de imagens
  setupImageCache() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.dataset.optimized) {
        this.optimizeImage(img);
      }
    });
  }

  // Configurar lazy loading
  setupLazyLoading() {
    // Intersection Observer para lazy loading
    const lazyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadLazyElement(entry.target);
          lazyObserver.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: PERFORMANCE_CONFIG.lazyLoading.threshold
    });

    // Observar imagens lazy
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => lazyObserver.observe(img));

    // Observar vídeos lazy
    const lazyVideos = document.querySelectorAll('video[data-src]');
    lazyVideos.forEach(video => lazyObserver.observe(video));

    // Observar componentes lazy
    const lazyComponents = document.querySelectorAll('[data-lazy-component]');
    lazyComponents.forEach(component => lazyObserver.observe(component));
  }

  // Carregar elemento lazy
  loadLazyElement(element) {
    if (element.tagName === 'IMG') {
      element.src = element.dataset.src;
      element.onload = () => {
        element.classList.add('loaded');
        this.optimizations.imagesOptimized++;
      };
    } else if (element.tagName === 'VIDEO') {
      element.src = element.dataset.src;
      element.onloadeddata = () => {
        element.classList.add('loaded');
        this.optimizations.videosOptimized++;
      };
    } else if (element.dataset.lazyComponent) {
      // Carregar componente dinamicamente
      this.loadLazyComponent(element);
    }
  }

  // Carregar componente lazy
  async loadLazyComponent(element) {
    const componentName = element.dataset.lazyComponent;
    try {
      const module = await import(`/components/${componentName}.js`);
      const Component = module.default;
      // Renderizar componente
      element.innerHTML = Component.render();
      element.classList.add('loaded');
    } catch (error) {
      console.error(`Erro ao carregar componente lazy: ${componentName}`, error);
    }
  }

  // Configurar preloading
  setupPreloading() {
    // Preload de recursos críticos
    this.preloadCriticalResources();
    
    // Preload de próxima página
    this.setupNextPagePreload();
    
    // Preload de fontes
    this.preloadFonts();
    
    // Preload de imagens importantes
    this.preloadCriticalImages();
  }

  // Preload de recursos críticos
  preloadCriticalResources() {
    const criticalResources = [
      '/css/critical.css',
      '/js/critical.js',
      '/fonts/primary-font.woff2'
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(woff|woff2)$/)) {
        link.as = 'font';
        link.type = 'font/woff2';
        link.crossOrigin = 'anonymous';
      }
      
      document.head.appendChild(link);
    });
  }

  // Preload de próxima página
  setupNextPagePreload() {
    const links = document.querySelectorAll('a[href^="/"]');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        this.preloadPage(link.href);
      }, { once: true });
    });
  }

  // Preload de página
  preloadPage(url) {
    if (this.preloadQueue.includes(url)) return;
    
    this.preloadQueue.push(url);
    
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }

  // Preload de fontes
  preloadFonts() {
    const fonts = [
      '/fonts/ezra-regular.woff2',
      '/fonts/ezra-bold.woff2',
      '/fonts/inter-regular.woff2',
      '/fonts/inter-bold.woff2'
    ];

    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = font;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // Preload de imagens críticas
  preloadCriticalImages() {
    const criticalImages = [
      '/images/hero-background.jpg',
      '/images/logo-apocalypse.png'
    ];

    criticalImages.forEach(image => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = image;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  // Otimizar recursos existentes
  async optimizeExistingResources() {
    // Otimizar imagens
    await this.optimizeImages();
    
    // Otimizar vídeos
    await this.optimizeVideos();
    
    // Comprimir CSS
    this.compressCSS();
    
    // Comprimir JavaScript
    this.compressJS();
  }

  // Otimizar imagens
  async optimizeImages() {
    const images = document.querySelectorAll('img');
    
    for (const img of images) {
      if (!img.dataset.optimized) {
        await this.optimizeImage(img);
      }
    }
  }

  // Otimizar imagem individual
  async optimizeImage(img) {
    return new Promise((resolve) => {
      // Adicionar loading lazy se não tiver
      if (!img.loading) {
        img.loading = 'lazy';
      }

      // Adicionar decode async
      img.decoding = 'async';

      // Otimizar formato
      if (this.supportsWebP() && !img.src.includes('.webp')) {
        const webpSrc = img.src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // Testar se WebP existe
        const testImg = new Image();
        testImg.onload = () => {
          img.src = webpSrc;
          img.dataset.optimized = 'true';
          this.optimizations.imagesOptimized++;
          resolve();
        };
        testImg.onerror = () => {
          img.dataset.optimized = 'true';
          resolve();
        };
        testImg.src = webpSrc;
      } else {
        img.dataset.optimized = 'true';
        resolve();
      }
    });
  }

  // Verificar suporte a WebP
  supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  }

  // Otimizar vídeos
  async optimizeVideos() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
      // Adicionar preload metadata
      if (!video.preload) {
        video.preload = 'metadata';
      }

      // Adicionar loading lazy
      video.loading = 'lazy';

      // Otimizar poster
      if (video.poster && !video.dataset.posterOptimized) {
        this.optimizeVideoPoster(video);
      }

      this.optimizations.videosOptimized++;
    });
  }

  // Otimizar poster do vídeo
  optimizeVideoPoster(video) {
    if (this.supportsWebP()) {
      const webpPoster = video.poster.replace(/\.(jpg|jpeg|png)$/i, '.webp');
      
      const testImg = new Image();
      testImg.onload = () => {
        video.poster = webpPoster;
        video.dataset.posterOptimized = 'true';
      };
      testImg.onerror = () => {
        video.dataset.posterOptimized = 'true';
      };
      testImg.src = webpPoster;
    }
  }

  // Aplicar otimizações de CSS
  applyCSSOptimizations() {
    // Adicionar will-change para elementos animados
    const animatedElements = document.querySelectorAll('.animated, .hover-effect, .transition');
    animatedElements.forEach(element => {
      element.style.willChange = 'transform, opacity';
    });

    // Otimizar contain para elementos isolados
    const isolatedElements = document.querySelectorAll('.card, .modal, .dropdown');
    isolatedElements.forEach(element => {
      element.style.contain = 'layout style paint';
    });

    // Adicionar transform3d para aceleração de hardware
    const transformElements = document.querySelectorAll('.transform, .scale, .rotate');
    transformElements.forEach(element => {
      element.style.transform += ' translateZ(0)';
    });
  }

  // Aplicar otimizações de JavaScript
  applyJSOptimizations() {
    // Debounce para eventos de scroll e resize
    this.debounceScrollEvents();
    this.debounceResizeEvents();
    
    // Throttle para eventos de mouse
    this.throttleMouseEvents();
    
    // Otimizar event listeners
    this.optimizeEventListeners();
  }

  // Debounce para scroll
  debounceScrollEvents() {
    let scrollTimeout;
    const originalAddEventListener = window.addEventListener;
    
    window.addEventListener = function(type, listener, options) {
      if (type === 'scroll') {
        const debouncedListener = function(event) {
          clearTimeout(scrollTimeout);
          scrollTimeout = setTimeout(() => listener(event), 16); // ~60fps
        };
        return originalAddEventListener.call(this, type, debouncedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  }

  // Debounce para resize
  debounceResizeEvents() {
    let resizeTimeout;
    const originalAddEventListener = window.addEventListener;
    
    window.addEventListener = function(type, listener, options) {
      if (type === 'resize') {
        const debouncedListener = function(event) {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => listener(event), 250);
        };
        return originalAddEventListener.call(this, type, debouncedListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  }

  // Throttle para mouse events
  throttleMouseEvents() {
    let mouseTimeout = false;
    const originalAddEventListener = document.addEventListener;
    
    document.addEventListener = function(type, listener, options) {
      if (type === 'mousemove') {
        const throttledListener = function(event) {
          if (!mouseTimeout) {
            listener(event);
            mouseTimeout = true;
            setTimeout(() => mouseTimeout = false, 16); // ~60fps
          }
        };
        return originalAddEventListener.call(this, type, throttledListener, options);
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  }

  // Otimizar event listeners
  optimizeEventListeners() {
    // Usar passive listeners quando possível
    const passiveEvents = ['scroll', 'wheel', 'touchstart', 'touchmove'];
    
    passiveEvents.forEach(eventType => {
      const elements = document.querySelectorAll(`[data-${eventType}]`);
      elements.forEach(element => {
        const handler = element.dataset[eventType];
        if (handler && typeof window[handler] === 'function') {
          element.addEventListener(eventType, window[handler], { passive: true });
        }
      });
    });
  }

  // Configurar monitoramento contínuo
  setupContinuousMonitoring() {
    // Monitorar a cada 30 segundos
    setInterval(() => {
      this.collectPerformanceMetrics();
    }, 30000);

    // Monitorar mudanças no DOM
    this.setupDOMObserver();
    
    // Monitorar uso de memória
    this.setupMemoryMonitoring();
  }

  // Observar mudanças no DOM
  setupDOMObserver() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              this.optimizeNewElement(node);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // Otimizar novo elemento
  optimizeNewElement(element) {
    // Otimizar imagens adicionadas dinamicamente
    const images = element.querySelectorAll ? element.querySelectorAll('img') : [];
    images.forEach(img => this.optimizeImage(img));

    // Otimizar vídeos adicionados dinamicamente
    const videos = element.querySelectorAll ? element.querySelectorAll('video') : [];
    videos.forEach(video => {
      video.preload = 'metadata';
      video.loading = 'lazy';
    });
  }

  // Monitorar uso de memória
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = performance.memory;
        this.recordMetric('memoryUsed', memory.usedJSHeapSize);
        this.recordMetric('memoryTotal', memory.totalJSHeapSize);
        this.recordMetric('memoryLimit', memory.jsHeapSizeLimit);
        
        // Alertar se uso de memória for alto
        const memoryUsage = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        if (memoryUsage > 0.8) {
          console.warn('Alto uso de memória detectado:', memoryUsage * 100 + '%');
        }
      }, 60000); // A cada minuto
    }
  }

  // Coletar métricas de performance
  collectPerformanceMetrics() {
    // Navigation timing
    const navigation = performance.getEntriesByType('navigation')[0];
    if (navigation) {
      this.recordMetric('pageLoadTime', navigation.loadEventEnd - navigation.navigationStart);
      this.recordMetric('domContentLoaded', navigation.domContentLoadedEventEnd - navigation.navigationStart);
    }

    // Resource timing
    const resources = performance.getEntriesByType('resource');
    const totalResourceTime = resources.reduce((sum, resource) => {
      return sum + (resource.responseEnd - resource.startTime);
    }, 0);
    
    this.recordMetric('totalResourceTime', totalResourceTime);
    this.recordMetric('resourceCount', resources.length);
  }

  // Registrar métrica
  recordMetric(name, value) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    
    const metrics = this.metrics.get(name);
    metrics.push({
      value: value,
      timestamp: Date.now()
    });
    
    // Manter apenas últimas 100 medições
    if (metrics.length > 100) {
      metrics.splice(0, metrics.length - 100);
    }
  }

  // Obter métricas
  getMetrics() {
    const result = {};
    
    for (const [name, values] of this.metrics) {
      const recentValues = values.slice(-10); // Últimas 10 medições
      const average = recentValues.reduce((sum, item) => sum + item.value, 0) / recentValues.length;
      const latest = recentValues[recentValues.length - 1]?.value || 0;
      
      result[name] = {
        latest: latest,
        average: Math.round(average),
        count: values.length,
        threshold: PERFORMANCE_THRESHOLDS[name] || null
      };
    }
    
    return result;
  }

  // Obter Core Web Vitals
  getCoreWebVitals() {
    const metrics = this.getMetrics();
    
    return {
      LCP: metrics.LCP || { latest: 0, average: 0 },
      FID: metrics.FID || { latest: 0, average: 0 },
      CLS: metrics.CLS || { latest: 0, average: 0 },
      FCP: metrics.FCP || { latest: 0, average: 0 },
      TTFB: metrics.TTFB || { latest: 0, average: 0 }
    };
  }

  // Obter score de performance
  getPerformanceScore() {
    const vitals = this.getCoreWebVitals();
    let score = 100;
    
    // Penalizar baseado nos thresholds
    Object.entries(vitals).forEach(([metric, data]) => {
      const threshold = PERFORMANCE_THRESHOLDS[metric];
      if (threshold && data.latest > 0) {
        if (data.latest > threshold.needsImprovement) {
          score -= 20;
        } else if (data.latest > threshold.good) {
          score -= 10;
        }
      }
    });
    
    return Math.max(0, score);
  }

  // Sugerir otimização
  suggestOptimization(resource) {
    const suggestions = [];
    const resourceType = this.getResourceType(resource.name);
    const loadTime = resource.responseEnd - resource.startTime;
    
    if (resourceType === 'image' && loadTime > 2000) {
      suggestions.push('Considere usar WebP ou otimizar a compressão da imagem');
      suggestions.push('Implemente lazy loading para imagens fora da viewport');
    }
    
    if (resourceType === 'video' && loadTime > 5000) {
      suggestions.push('Use preload="metadata" para vídeos');
      suggestions.push('Considere usar streaming adaptativo');
    }
    
    if (resourceType === 'script' && loadTime > 1000) {
      suggestions.push('Considere code splitting para JavaScript');
      suggestions.push('Use async ou defer para scripts não críticos');
    }
    
    if (resourceType === 'stylesheet' && loadTime > 1000) {
      suggestions.push('Considere inline CSS crítico');
      suggestions.push('Use media queries para CSS não crítico');
    }
    
    return suggestions;
  }

  // Comprimir CSS
  compressCSS() {
    const styleSheets = document.querySelectorAll('style');
    styleSheets.forEach(style => {
      if (!style.dataset.compressed) {
        style.textContent = style.textContent
          .replace(/\s+/g, ' ')
          .replace(/;\s*}/g, '}')
          .replace(/\s*{\s*/g, '{')
          .replace(/;\s*/g, ';')
          .trim();
        style.dataset.compressed = 'true';
      }
    });
  }

  // Comprimir JavaScript
  compressJS() {
    // Em produção, isso seria feito durante o build
    console.log('JavaScript compression aplicada durante o build');
  }

  // Obter relatório completo
  getPerformanceReport() {
    return {
      timestamp: new Date().toISOString(),
      score: this.getPerformanceScore(),
      coreWebVitals: this.getCoreWebVitals(),
      metrics: this.getMetrics(),
      optimizations: this.optimizations,
      recommendations: this.getRecommendations()
    };
  }

  // Obter recomendações
  getRecommendations() {
    const recommendations = [];
    const vitals = this.getCoreWebVitals();
    
    if (vitals.LCP.latest > PERFORMANCE_THRESHOLDS.LCP.needsImprovement) {
      recommendations.push({
        priority: 'HIGH',
        metric: 'LCP',
        issue: 'Largest Contentful Paint muito lento',
        solution: 'Otimize imagens principais e use preload para recursos críticos'
      });
    }
    
    if (vitals.FID.latest > PERFORMANCE_THRESHOLDS.FID.needsImprovement) {
      recommendations.push({
        priority: 'HIGH',
        metric: 'FID',
        issue: 'First Input Delay muito alto',
        solution: 'Reduza JavaScript bloqueante e use code splitting'
      });
    }
    
    if (vitals.CLS.latest > PERFORMANCE_THRESHOLDS.CLS.needsImprovement) {
      recommendations.push({
        priority: 'MEDIUM',
        metric: 'CLS',
        issue: 'Cumulative Layout Shift muito alto',
        solution: 'Defina dimensões para imagens e evite inserção dinâmica de conteúdo'
      });
    }
    
    return recommendations;
  }

  // Limpar recursos
  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.resourceObserver) {
      this.resourceObserver.disconnect();
    }
    if (this.navigationObserver) {
      this.navigationObserver.disconnect();
    }
    
    this.cache.clear();
    this.metrics.clear();
  }
}

// Instância singleton
export const performanceBoostKit = new PerformanceBoostKit();

// Hook React para usar o Performance Boost Kit
export const usePerformanceBoost = () => {
  const [performanceData, setPerformanceData] = useState({
    score: 0,
    coreWebVitals: {},
    optimizations: performanceBoostKit.optimizations,
    isInitialized: performanceBoostKit.isInitialized
  });

  useEffect(() => {
    const updatePerformanceData = () => {
      setPerformanceData({
        score: performanceBoostKit.getPerformanceScore(),
        coreWebVitals: performanceBoostKit.getCoreWebVitals(),
        optimizations: performanceBoostKit.optimizations,
        isInitialized: performanceBoostKit.isInitialized
      });
    };

    // Atualizar a cada 10 segundos
    const interval = setInterval(updatePerformanceData, 10000);
    
    // Atualização inicial
    updatePerformanceData();
    
    return () => clearInterval(interval);
  }, []);

  return {
    ...performanceData,
    initialize: performanceBoostKit.initialize.bind(performanceBoostKit),
    getMetrics: performanceBoostKit.getMetrics.bind(performanceBoostKit),
    getCoreWebVitals: performanceBoostKit.getCoreWebVitals.bind(performanceBoostKit),
    getPerformanceScore: performanceBoostKit.getPerformanceScore.bind(performanceBoostKit),
    getPerformanceReport: performanceBoostKit.getPerformanceReport.bind(performanceBoostKit),
    getRecommendations: performanceBoostKit.getRecommendations.bind(performanceBoostKit)
  };
};

export default performanceBoostKit;

