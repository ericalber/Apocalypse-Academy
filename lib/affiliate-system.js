// AFFILIATE SYSTEM - Sistema de Afiliados Completo
// Seguindo Guide Master - Preservando estrutura visual existente

// Configurações do sistema de afiliados
const AFFILIATE_CONFIG = {
  commission: {
    default: 0.30, // 30% comissão padrão
    premium: 0.40, // 40% para afiliados premium
    vip: 0.50, // 50% para afiliados VIP
    tiers: {
      bronze: { minSales: 0, commission: 0.30 },
      silver: { minSales: 10, commission: 0.35 },
      gold: { minSales: 50, commission: 0.40 },
      platinum: { minSales: 100, commission: 0.45 },
      diamond: { minSales: 250, commission: 0.50 }
    }
  },
  tracking: {
    cookieDuration: 30, // 30 dias
    sessionDuration: 24 * 60 * 60 * 1000, // 24 horas
    attributionWindow: 30 * 24 * 60 * 60 * 1000, // 30 dias
    crossDevice: true,
    crossBrowser: true
  },
  payment: {
    minimumPayout: 50, // R$ 50 mínimo para saque
    paymentMethods: ['pix', 'bank_transfer', 'paypal'],
    paymentSchedule: 'weekly', // semanal, quinzenal, mensal
    holdingPeriod: 7 * 24 * 60 * 60 * 1000 // 7 dias de retenção
  },
  validation: {
    fraudDetection: true,
    qualityScore: true,
    conversionTracking: true,
    clickValidation: true
  }
};

// Classe principal do Sistema de Afiliados
export class AffiliateSystem {
  constructor() {
    this.affiliates = new Map();
    this.transactions = new Map();
    this.clicks = new Map();
    this.conversions = new Map();
    this.commissions = new Map();
    this.payouts = new Map();
    this.analytics = new AffiliateAnalytics();
    this.fraudDetector = new FraudDetector();
    this.paymentProcessor = new AffiliatePaymentProcessor();
    this.initialized = false;
  }

  // Inicializar sistema de afiliados
  async initialize() {
    try {
      // Carregar dados salvos
      await this.loadAffiliateData();
      
      // Configurar tracking
      this.setupTracking();
      
      // Configurar analytics
      await this.analytics.initialize();
      
      // Configurar detector de fraude
      await this.fraudDetector.initialize();
      
      // Configurar processador de pagamentos
      await this.paymentProcessor.initialize();
      
      // Configurar limpeza automática
      this.setupAutomaticCleanup();
      
      this.initialized = true;
      console.log('Affiliate System inicializado com sucesso');
      
      return { success: true, message: 'Sistema de Afiliados ativado' };
    } catch (error) {
      console.error('Erro ao inicializar Affiliate System:', error);
      throw error;
    }
  }

  // Configurar tracking de afiliados
  setupTracking() {
    // Interceptar parâmetros UTM na URL
    this.trackUTMParameters();
    
    // Configurar cookies de tracking
    this.setupTrackingCookies();
    
    // Configurar event listeners
    this.setupEventListeners();
    
    // Configurar cross-device tracking
    if (AFFILIATE_CONFIG.tracking.crossDevice) {
      this.setupCrossDeviceTracking();
    }
  }

  // Rastrear parâmetros UTM
  trackUTMParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {};
    
    // Parâmetros UTM padrão
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
    
    // Parâmetros customizados de afiliado
    const affiliateKeys = ['ref', 'affiliate', 'partner', 'promo', 'coupon'];
    
    [...utmKeys, ...affiliateKeys].forEach(key => {
      const value = urlParams.get(key);
      if (value) {
        utmParams[key] = value;
      }
    });

    if (Object.keys(utmParams).length > 0) {
      this.recordClick(utmParams);
      this.setTrackingCookie(utmParams);
    }
  }

  // Configurar cookies de tracking
  setupTrackingCookies() {
    // Verificar cookie existente
    const existingTracking = this.getTrackingCookie();
    if (existingTracking && !this.isTrackingExpired(existingTracking)) {
      // Atualizar última atividade
      existingTracking.lastActivity = Date.now();
      this.setTrackingCookie(existingTracking);
    }
  }

  // Definir cookie de tracking
  setTrackingCookie(data) {
    const trackingData = {
      ...data,
      timestamp: Date.now(),
      lastActivity: Date.now(),
      sessionId: this.generateSessionId(),
      fingerprint: this.generateFingerprint()
    };

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + AFFILIATE_CONFIG.tracking.cookieDuration);

    document.cookie = `apocalypse_affiliate=${JSON.stringify(trackingData)}; expires=${expirationDate.toUTCString()}; path=/; secure; samesite=strict`;
    
    // Salvar também no localStorage como backup
    localStorage.setItem('apocalypse_affiliate_backup', JSON.stringify(trackingData));
  }

  // Obter cookie de tracking
  getTrackingCookie() {
    try {
      const cookies = document.cookie.split(';');
      const affiliateCookie = cookies.find(cookie => cookie.trim().startsWith('apocalypse_affiliate='));
      
      if (affiliateCookie) {
        const cookieValue = affiliateCookie.split('=')[1];
        return JSON.parse(decodeURIComponent(cookieValue));
      }
      
      // Tentar backup do localStorage
      const backup = localStorage.getItem('apocalypse_affiliate_backup');
      return backup ? JSON.parse(backup) : null;
    } catch (error) {
      console.error('Erro ao ler cookie de tracking:', error);
      return null;
    }
  }

  // Verificar se tracking expirou
  isTrackingExpired(trackingData) {
    const now = Date.now();
    const trackingAge = now - trackingData.timestamp;
    const lastActivityAge = now - trackingData.lastActivity;
    
    return trackingAge > AFFILIATE_CONFIG.tracking.attributionWindow ||
           lastActivityAge > AFFILIATE_CONFIG.tracking.sessionDuration;
  }

  // Gerar ID de sessão
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Gerar fingerprint do dispositivo
  generateFingerprint() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'top';
    ctx.font = '14px Arial';
    ctx.fillText('Apocalypse Academy Fingerprint', 2, 2);
    
    const fingerprint = [
      navigator.userAgent,
      navigator.language,
      screen.width + 'x' + screen.height,
      new Date().getTimezoneOffset(),
      canvas.toDataURL()
    ].join('|');
    
    return btoa(fingerprint).substr(0, 32);
  }

  // Configurar event listeners
  setupEventListeners() {
    // Tracking de cliques em links
    document.addEventListener('click', (event) => {
      const link = event.target.closest('a');
      if (link && link.href) {
        this.trackLinkClick(link);
      }
    });

    // Tracking de formulários
    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (form.tagName === 'FORM') {
        this.trackFormSubmission(form);
      }
    });

    // Tracking de conversões
    window.addEventListener('beforeunload', () => {
      this.flushPendingEvents();
    });
  }

  // Configurar cross-device tracking
  setupCrossDeviceTracking() {
    // Usar localStorage e sessionStorage para sincronização
    const deviceId = localStorage.getItem('apocalypse_device_id') || this.generateDeviceId();
    localStorage.setItem('apocalypse_device_id', deviceId);
    
    // Sincronizar com servidor quando possível
    this.syncCrossDeviceData(deviceId);
  }

  // Gerar ID do dispositivo
  generateDeviceId() {
    return `device_${Date.now()}_${Math.random().toString(36).substr(2, 16)}`;
  }

  // Sincronizar dados cross-device
  async syncCrossDeviceData(deviceId) {
    try {
      // Em produção, sincronizaria com API do servidor
      const syncData = {
        deviceId: deviceId,
        tracking: this.getTrackingCookie(),
        timestamp: Date.now()
      };
      
      localStorage.setItem('apocalypse_cross_device_sync', JSON.stringify(syncData));
    } catch (error) {
      console.error('Erro na sincronização cross-device:', error);
    }
  }

  // Registrar clique
  recordClick(utmParams) {
    const clickId = `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const clickData = {
      id: clickId,
      ...utmParams,
      timestamp: Date.now(),
      url: window.location.href,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      ip: 'client-side', // Em produção seria obtido do servidor
      fingerprint: this.generateFingerprint(),
      validated: false
    };

    this.clicks.set(clickId, clickData);
    this.saveAffiliateData();
    
    // Validar clique
    this.validateClick(clickData);
    
    console.log('Clique de afiliado registrado:', clickId);
    return clickId;
  }

  // Validar clique
  async validateClick(clickData) {
    try {
      // Verificar fraude
      const fraudCheck = await this.fraudDetector.validateClick(clickData);
      
      if (fraudCheck.isValid) {
        clickData.validated = true;
        clickData.qualityScore = fraudCheck.qualityScore;
        
        // Registrar no analytics
        this.analytics.recordClick(clickData);
      } else {
        clickData.validated = false;
        clickData.fraudReason = fraudCheck.reason;
        console.warn('Clique inválido detectado:', fraudCheck.reason);
      }
      
      this.saveAffiliateData();
    } catch (error) {
      console.error('Erro na validação de clique:', error);
    }
  }

  // Rastrear clique em link
  trackLinkClick(link) {
    const trackingData = this.getTrackingCookie();
    if (!trackingData) return;

    const linkData = {
      url: link.href,
      text: link.textContent.trim(),
      timestamp: Date.now(),
      tracking: trackingData
    };

    // Salvar evento de clique
    const events = JSON.parse(localStorage.getItem('apocalypse_affiliate_events') || '[]');
    events.push({ type: 'link_click', data: linkData });
    localStorage.setItem('apocalypse_affiliate_events', JSON.stringify(events));
  }

  // Rastrear submissão de formulário
  trackFormSubmission(form) {
    const trackingData = this.getTrackingCookie();
    if (!trackingData) return;

    const formData = {
      action: form.action,
      method: form.method,
      fields: Array.from(form.elements).map(element => ({
        name: element.name,
        type: element.type,
        hasValue: !!element.value
      })),
      timestamp: Date.now(),
      tracking: trackingData
    };

    // Salvar evento de formulário
    const events = JSON.parse(localStorage.getItem('apocalypse_affiliate_events') || '[]');
    events.push({ type: 'form_submission', data: formData });
    localStorage.setItem('apocalypse_affiliate_events', JSON.stringify(events));
  }

  // Registrar conversão
  recordConversion(conversionData) {
    const trackingData = this.getTrackingCookie();
    if (!trackingData) {
      console.warn('Nenhum tracking de afiliado encontrado para conversão');
      return null;
    }

    const conversionId = `conversion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const conversion = {
      id: conversionId,
      ...conversionData,
      tracking: trackingData,
      timestamp: Date.now(),
      status: 'pending',
      commission: this.calculateCommission(conversionData, trackingData),
      validated: false
    };

    this.conversions.set(conversionId, conversion);
    this.saveAffiliateData();
    
    // Validar conversão
    this.validateConversion(conversion);
    
    console.log('Conversão registrada:', conversionId);
    return conversionId;
  }

  // Calcular comissão
  calculateCommission(conversionData, trackingData) {
    const affiliateId = trackingData.utm_source || trackingData.ref || trackingData.affiliate;
    const affiliate = this.getAffiliate(affiliateId);
    
    let commissionRate = AFFILIATE_CONFIG.commission.default;
    
    if (affiliate) {
      // Usar taxa baseada no tier do afiliado
      const tier = this.getAffiliateTier(affiliate);
      commissionRate = AFFILIATE_CONFIG.commission.tiers[tier].commission;
    }
    
    const commissionAmount = conversionData.value * commissionRate;
    
    return {
      rate: commissionRate,
      amount: commissionAmount,
      currency: conversionData.currency || 'BRL',
      tier: affiliate ? this.getAffiliateTier(affiliate) : 'bronze'
    };
  }

  // Obter afiliado
  getAffiliate(affiliateId) {
    return this.affiliates.get(affiliateId);
  }

  // Obter tier do afiliado
  getAffiliateTier(affiliate) {
    const totalSales = affiliate.stats?.totalSales || 0;
    
    for (const [tier, config] of Object.entries(AFFILIATE_CONFIG.commission.tiers).reverse()) {
      if (totalSales >= config.minSales) {
        return tier;
      }
    }
    
    return 'bronze';
  }

  // Validar conversão
  async validateConversion(conversion) {
    try {
      // Verificar fraude
      const fraudCheck = await this.fraudDetector.validateConversion(conversion);
      
      if (fraudCheck.isValid) {
        conversion.validated = true;
        conversion.status = 'approved';
        conversion.qualityScore = fraudCheck.qualityScore;
        
        // Registrar comissão
        this.recordCommission(conversion);
        
        // Atualizar estatísticas do afiliado
        this.updateAffiliateStats(conversion);
        
        // Registrar no analytics
        this.analytics.recordConversion(conversion);
      } else {
        conversion.validated = false;
        conversion.status = 'rejected';
        conversion.fraudReason = fraudCheck.reason;
        console.warn('Conversão inválida detectada:', fraudCheck.reason);
      }
      
      this.saveAffiliateData();
    } catch (error) {
      console.error('Erro na validação de conversão:', error);
    }
  }

  // Registrar comissão
  recordCommission(conversion) {
    const commissionId = `commission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const commission = {
      id: commissionId,
      conversionId: conversion.id,
      affiliateId: conversion.tracking.utm_source || conversion.tracking.ref,
      amount: conversion.commission.amount,
      rate: conversion.commission.rate,
      currency: conversion.commission.currency,
      tier: conversion.commission.tier,
      status: 'pending',
      createdAt: Date.now(),
      payableAt: Date.now() + AFFILIATE_CONFIG.payment.holdingPeriod
    };

    this.commissions.set(commissionId, commission);
    this.saveAffiliateData();
    
    console.log('Comissão registrada:', commissionId);
  }

  // Atualizar estatísticas do afiliado
  updateAffiliateStats(conversion) {
    const affiliateId = conversion.tracking.utm_source || conversion.tracking.ref;
    let affiliate = this.affiliates.get(affiliateId);
    
    if (!affiliate) {
      affiliate = this.createAffiliate(affiliateId);
    }
    
    if (!affiliate.stats) {
      affiliate.stats = {
        totalClicks: 0,
        totalConversions: 0,
        totalSales: 0,
        totalCommissions: 0,
        conversionRate: 0,
        averageOrderValue: 0
      };
    }
    
    affiliate.stats.totalConversions++;
    affiliate.stats.totalSales += conversion.value;
    affiliate.stats.totalCommissions += conversion.commission.amount;
    affiliate.stats.conversionRate = (affiliate.stats.totalConversions / affiliate.stats.totalClicks) * 100;
    affiliate.stats.averageOrderValue = affiliate.stats.totalSales / affiliate.stats.totalConversions;
    affiliate.lastActivity = Date.now();
    
    this.affiliates.set(affiliateId, affiliate);
    this.saveAffiliateData();
  }

  // Criar afiliado
  createAffiliate(affiliateId) {
    const affiliate = {
      id: affiliateId,
      name: affiliateId,
      email: null,
      status: 'active',
      tier: 'bronze',
      createdAt: Date.now(),
      lastActivity: Date.now(),
      paymentInfo: {},
      stats: {
        totalClicks: 0,
        totalConversions: 0,
        totalSales: 0,
        totalCommissions: 0,
        conversionRate: 0,
        averageOrderValue: 0
      }
    };
    
    this.affiliates.set(affiliateId, affiliate);
    return affiliate;
  }

  // Processar pagamentos
  async processPayouts() {
    const pendingCommissions = Array.from(this.commissions.values())
      .filter(commission => 
        commission.status === 'pending' && 
        Date.now() >= commission.payableAt
      );

    // Agrupar por afiliado
    const commissionsByAffiliate = {};
    pendingCommissions.forEach(commission => {
      if (!commissionsByAffiliate[commission.affiliateId]) {
        commissionsByAffiliate[commission.affiliateId] = [];
      }
      commissionsByAffiliate[commission.affiliateId].push(commission);
    });

    // Processar pagamentos por afiliado
    for (const [affiliateId, commissions] of Object.entries(commissionsByAffiliate)) {
      const totalAmount = commissions.reduce((sum, commission) => sum + commission.amount, 0);
      
      if (totalAmount >= AFFILIATE_CONFIG.payment.minimumPayout) {
        await this.createPayout(affiliateId, commissions, totalAmount);
      }
    }
  }

  // Criar pagamento
  async createPayout(affiliateId, commissions, totalAmount) {
    const payoutId = `payout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const payout = {
      id: payoutId,
      affiliateId: affiliateId,
      commissions: commissions.map(c => c.id),
      amount: totalAmount,
      currency: 'BRL',
      status: 'pending',
      method: 'pix', // Padrão PIX
      createdAt: Date.now(),
      processedAt: null
    };

    this.payouts.set(payoutId, payout);
    
    // Marcar comissões como processadas
    commissions.forEach(commission => {
      commission.status = 'paid';
      commission.payoutId = payoutId;
    });

    this.saveAffiliateData();
    
    // Processar pagamento
    try {
      await this.paymentProcessor.processPayout(payout);
      payout.status = 'completed';
      payout.processedAt = Date.now();
    } catch (error) {
      payout.status = 'failed';
      payout.error = error.message;
      console.error('Erro no processamento de pagamento:', error);
    }
    
    this.saveAffiliateData();
    console.log('Pagamento criado:', payoutId);
  }

  // Flush de eventos pendentes
  flushPendingEvents() {
    const events = JSON.parse(localStorage.getItem('apocalypse_affiliate_events') || '[]');
    
    if (events.length > 0) {
      // Em produção, enviaria para o servidor
      console.log('Enviando eventos pendentes:', events.length);
      localStorage.removeItem('apocalypse_affiliate_events');
    }
  }

  // Configurar limpeza automática
  setupAutomaticCleanup() {
    // Limpar dados antigos a cada hora
    setInterval(() => {
      this.cleanupOldData();
    }, 60 * 60 * 1000);
  }

  // Limpar dados antigos
  cleanupOldData() {
    const now = Date.now();
    const maxAge = 90 * 24 * 60 * 60 * 1000; // 90 dias
    
    // Limpar cliques antigos
    for (const [clickId, click] of this.clicks) {
      if (now - click.timestamp > maxAge) {
        this.clicks.delete(clickId);
      }
    }
    
    // Limpar conversões antigas
    for (const [conversionId, conversion] of this.conversions) {
      if (now - conversion.timestamp > maxAge) {
        this.conversions.delete(conversionId);
      }
    }
    
    this.saveAffiliateData();
  }

  // Carregar dados do afiliado
  async loadAffiliateData() {
    try {
      const data = localStorage.getItem('apocalypse_affiliate_data');
      if (data) {
        const parsed = JSON.parse(data);
        
        this.affiliates = new Map(parsed.affiliates || []);
        this.transactions = new Map(parsed.transactions || []);
        this.clicks = new Map(parsed.clicks || []);
        this.conversions = new Map(parsed.conversions || []);
        this.commissions = new Map(parsed.commissions || []);
        this.payouts = new Map(parsed.payouts || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados de afiliado:', error);
    }
  }

  // Salvar dados do afiliado
  saveAffiliateData() {
    try {
      const data = {
        affiliates: Array.from(this.affiliates.entries()),
        transactions: Array.from(this.transactions.entries()),
        clicks: Array.from(this.clicks.entries()),
        conversions: Array.from(this.conversions.entries()),
        commissions: Array.from(this.commissions.entries()),
        payouts: Array.from(this.payouts.entries()),
        lastSaved: Date.now()
      };
      
      localStorage.setItem('apocalypse_affiliate_data', JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar dados de afiliado:', error);
    }
  }

  // Obter dashboard do afiliado
  getAffiliateDashboard(affiliateId) {
    const affiliate = this.affiliates.get(affiliateId);
    if (!affiliate) return null;

    const clicks = Array.from(this.clicks.values())
      .filter(click => 
        click.utm_source === affiliateId || 
        click.ref === affiliateId ||
        click.affiliate === affiliateId
      );

    const conversions = Array.from(this.conversions.values())
      .filter(conversion => 
        conversion.tracking.utm_source === affiliateId ||
        conversion.tracking.ref === affiliateId ||
        conversion.tracking.affiliate === affiliateId
      );

    const commissions = Array.from(this.commissions.values())
      .filter(commission => commission.affiliateId === affiliateId);

    const payouts = Array.from(this.payouts.values())
      .filter(payout => payout.affiliateId === affiliateId);

    return {
      affiliate: affiliate,
      stats: {
        ...affiliate.stats,
        pendingCommissions: commissions.filter(c => c.status === 'pending').length,
        paidCommissions: commissions.filter(c => c.status === 'paid').length,
        totalPayouts: payouts.reduce((sum, payout) => sum + payout.amount, 0)
      },
      recentClicks: clicks.slice(-10),
      recentConversions: conversions.slice(-10),
      pendingPayouts: payouts.filter(p => p.status === 'pending'),
      tier: this.getAffiliateTier(affiliate),
      nextTier: this.getNextTier(affiliate)
    };
  }

  // Obter próximo tier
  getNextTier(affiliate) {
    const currentTier = this.getAffiliateTier(affiliate);
    const tiers = Object.keys(AFFILIATE_CONFIG.commission.tiers);
    const currentIndex = tiers.indexOf(currentTier);
    
    if (currentIndex < tiers.length - 1) {
      const nextTier = tiers[currentIndex + 1];
      const nextTierConfig = AFFILIATE_CONFIG.commission.tiers[nextTier];
      const salesNeeded = nextTierConfig.minSales - (affiliate.stats?.totalSales || 0);
      
      return {
        tier: nextTier,
        salesNeeded: Math.max(0, salesNeeded),
        commission: nextTierConfig.commission
      };
    }
    
    return null;
  }

  // Obter relatório de performance
  getPerformanceReport(affiliateId, period = '30d') {
    const affiliate = this.affiliates.get(affiliateId);
    if (!affiliate) return null;

    const periodMs = this.parsePeriod(period);
    const startDate = Date.now() - periodMs;

    const clicks = Array.from(this.clicks.values())
      .filter(click => 
        (click.utm_source === affiliateId || click.ref === affiliateId) &&
        click.timestamp >= startDate
      );

    const conversions = Array.from(this.conversions.values())
      .filter(conversion => 
        (conversion.tracking.utm_source === affiliateId || conversion.tracking.ref === affiliateId) &&
        conversion.timestamp >= startDate
      );

    const commissions = Array.from(this.commissions.values())
      .filter(commission => 
        commission.affiliateId === affiliateId &&
        commission.createdAt >= startDate
      );

    return {
      period: period,
      clicks: clicks.length,
      conversions: conversions.length,
      conversionRate: clicks.length > 0 ? (conversions.length / clicks.length) * 100 : 0,
      revenue: conversions.reduce((sum, conv) => sum + conv.value, 0),
      commissions: commissions.reduce((sum, comm) => sum + comm.amount, 0),
      averageOrderValue: conversions.length > 0 ? 
        conversions.reduce((sum, conv) => sum + conv.value, 0) / conversions.length : 0,
      topProducts: this.getTopProducts(conversions),
      dailyStats: this.getDailyStats(clicks, conversions, startDate)
    };
  }

  // Parse período
  parsePeriod(period) {
    const match = period.match(/^(\d+)([dwmy])$/);
    if (!match) return 30 * 24 * 60 * 60 * 1000; // 30 dias padrão
    
    const [, amount, unit] = match;
    const multipliers = {
      'd': 24 * 60 * 60 * 1000,
      'w': 7 * 24 * 60 * 60 * 1000,
      'm': 30 * 24 * 60 * 60 * 1000,
      'y': 365 * 24 * 60 * 60 * 1000
    };
    
    return parseInt(amount) * multipliers[unit];
  }

  // Obter produtos mais vendidos
  getTopProducts(conversions) {
    const productStats = {};
    
    conversions.forEach(conversion => {
      const productId = conversion.productId || 'unknown';
      if (!productStats[productId]) {
        productStats[productId] = {
          id: productId,
          name: conversion.productName || 'Produto Desconhecido',
          sales: 0,
          revenue: 0
        };
      }
      
      productStats[productId].sales++;
      productStats[productId].revenue += conversion.value;
    });
    
    return Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);
  }

  // Obter estatísticas diárias
  getDailyStats(clicks, conversions, startDate) {
    const days = {};
    const dayMs = 24 * 60 * 60 * 1000;
    
    // Inicializar dias
    for (let date = startDate; date <= Date.now(); date += dayMs) {
      const dayKey = new Date(date).toISOString().split('T')[0];
      days[dayKey] = { clicks: 0, conversions: 0, revenue: 0 };
    }
    
    // Contar cliques
    clicks.forEach(click => {
      const dayKey = new Date(click.timestamp).toISOString().split('T')[0];
      if (days[dayKey]) {
        days[dayKey].clicks++;
      }
    });
    
    // Contar conversões
    conversions.forEach(conversion => {
      const dayKey = new Date(conversion.timestamp).toISOString().split('T')[0];
      if (days[dayKey]) {
        days[dayKey].conversions++;
        days[dayKey].revenue += conversion.value;
      }
    });
    
    return Object.entries(days).map(([date, stats]) => ({
      date,
      ...stats
    }));
  }
}

// Analytics de Afiliados
class AffiliateAnalytics {
  constructor() {
    this.events = [];
  }

  async initialize() {
    this.loadEvents();
  }

  recordClick(clickData) {
    this.events.push({
      type: 'click',
      data: clickData,
      timestamp: Date.now()
    });
    this.saveEvents();
  }

  recordConversion(conversionData) {
    this.events.push({
      type: 'conversion',
      data: conversionData,
      timestamp: Date.now()
    });
    this.saveEvents();
  }

  loadEvents() {
    try {
      const saved = localStorage.getItem('apocalypse_affiliate_analytics');
      if (saved) {
        this.events = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar analytics:', error);
    }
  }

  saveEvents() {
    try {
      localStorage.setItem('apocalypse_affiliate_analytics', JSON.stringify(this.events));
    } catch (error) {
      console.error('Erro ao salvar analytics:', error);
    }
  }
}

// Detector de Fraude
class FraudDetector {
  constructor() {
    this.suspiciousPatterns = [];
    this.ipBlacklist = new Set();
    this.fingerprintHistory = new Map();
  }

  async initialize() {
    this.loadFraudData();
  }

  async validateClick(clickData) {
    const checks = [
      this.checkIPReputation(clickData),
      this.checkClickFrequency(clickData),
      this.checkFingerprintHistory(clickData),
      this.checkUserAgentPatterns(clickData),
      this.checkReferrerValidation(clickData)
    ];

    const results = await Promise.all(checks);
    const failedChecks = results.filter(result => !result.isValid);
    
    if (failedChecks.length === 0) {
      return { isValid: true, qualityScore: 100 };
    }
    
    const qualityScore = Math.max(0, 100 - (failedChecks.length * 20));
    
    return {
      isValid: qualityScore >= 60,
      qualityScore: qualityScore,
      reason: failedChecks.map(check => check.reason).join(', ')
    };
  }

  async validateConversion(conversionData) {
    const checks = [
      this.checkConversionTiming(conversionData),
      this.checkValueConsistency(conversionData),
      this.checkTrackingConsistency(conversionData)
    ];

    const results = await Promise.all(checks);
    const failedChecks = results.filter(result => !result.isValid);
    
    if (failedChecks.length === 0) {
      return { isValid: true, qualityScore: 100 };
    }
    
    const qualityScore = Math.max(0, 100 - (failedChecks.length * 25));
    
    return {
      isValid: qualityScore >= 70,
      qualityScore: qualityScore,
      reason: failedChecks.map(check => check.reason).join(', ')
    };
  }

  checkIPReputation(clickData) {
    if (this.ipBlacklist.has(clickData.ip)) {
      return { isValid: false, reason: 'IP na blacklist' };
    }
    return { isValid: true };
  }

  checkClickFrequency(clickData) {
    // Verificar frequência de cliques do mesmo fingerprint
    const recentClicks = this.fingerprintHistory.get(clickData.fingerprint) || [];
    const recentClicksCount = recentClicks.filter(timestamp => 
      Date.now() - timestamp < 60000 // 1 minuto
    ).length;
    
    if (recentClicksCount > 5) {
      return { isValid: false, reason: 'Muitos cliques em pouco tempo' };
    }
    
    return { isValid: true };
  }

  checkFingerprintHistory(clickData) {
    if (!this.fingerprintHistory.has(clickData.fingerprint)) {
      this.fingerprintHistory.set(clickData.fingerprint, []);
    }
    
    const history = this.fingerprintHistory.get(clickData.fingerprint);
    history.push(Date.now());
    
    // Manter apenas últimos 100 registros
    if (history.length > 100) {
      history.splice(0, history.length - 100);
    }
    
    return { isValid: true };
  }

  checkUserAgentPatterns(clickData) {
    const suspiciousPatterns = [
      /bot|crawler|spider/i,
      /headless/i,
      /phantom/i,
      /selenium/i
    ];
    
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(clickData.userAgent)) {
        return { isValid: false, reason: 'User Agent suspeito' };
      }
    }
    
    return { isValid: true };
  }

  checkReferrerValidation(clickData) {
    // Verificar se referrer é válido
    if (clickData.referrer && clickData.referrer.includes('localhost')) {
      return { isValid: false, reason: 'Referrer localhost suspeito' };
    }
    
    return { isValid: true };
  }

  checkConversionTiming(conversionData) {
    const clickTime = conversionData.tracking.timestamp;
    const conversionTime = conversionData.timestamp;
    const timeDiff = conversionTime - clickTime;
    
    // Conversão muito rápida (menos de 30 segundos)
    if (timeDiff < 30000) {
      return { isValid: false, reason: 'Conversão muito rápida' };
    }
    
    // Conversão muito lenta (mais de 30 dias)
    if (timeDiff > 30 * 24 * 60 * 60 * 1000) {
      return { isValid: false, reason: 'Conversão fora da janela de atribuição' };
    }
    
    return { isValid: true };
  }

  checkValueConsistency(conversionData) {
    // Verificar se valor é consistente
    if (conversionData.value <= 0) {
      return { isValid: false, reason: 'Valor de conversão inválido' };
    }
    
    // Verificar valores muito altos (possível fraude)
    if (conversionData.value > 10000) {
      return { isValid: false, reason: 'Valor de conversão suspeito' };
    }
    
    return { isValid: true };
  }

  checkTrackingConsistency(conversionData) {
    // Verificar se dados de tracking são consistentes
    if (!conversionData.tracking || !conversionData.tracking.fingerprint) {
      return { isValid: false, reason: 'Dados de tracking inconsistentes' };
    }
    
    return { isValid: true };
  }

  loadFraudData() {
    try {
      const saved = localStorage.getItem('apocalypse_fraud_data');
      if (saved) {
        const data = JSON.parse(saved);
        this.ipBlacklist = new Set(data.ipBlacklist || []);
        this.fingerprintHistory = new Map(data.fingerprintHistory || []);
      }
    } catch (error) {
      console.error('Erro ao carregar dados de fraude:', error);
    }
  }

  saveFraudData() {
    try {
      const data = {
        ipBlacklist: Array.from(this.ipBlacklist),
        fingerprintHistory: Array.from(this.fingerprintHistory.entries())
      };
      localStorage.setItem('apocalypse_fraud_data', JSON.stringify(data));
    } catch (error) {
      console.error('Erro ao salvar dados de fraude:', error);
    }
  }
}

// Processador de Pagamentos para Afiliados
class AffiliatePaymentProcessor {
  constructor() {
    this.paymentMethods = AFFILIATE_CONFIG.payment.paymentMethods;
  }

  async initialize() {
    console.log('Processador de pagamentos de afiliados inicializado');
  }

  async processPayout(payout) {
    // Simular processamento de pagamento
    console.log(`Processando pagamento: ${payout.id} - R$ ${payout.amount}`);
    
    // Em produção, integraria com APIs de pagamento reais
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, transactionId: `tx_${Date.now()}` });
      }, 2000);
    });
  }
}

// Instância singleton
export const affiliateSystem = new AffiliateSystem();

// Hook React para usar o Sistema de Afiliados
export const useAffiliateSystem = () => {
  const [affiliateData, setAffiliateData] = useState({
    isTracking: false,
    affiliateId: null,
    stats: null,
    isInitialized: affiliateSystem.initialized
  });

  useEffect(() => {
    const updateAffiliateData = () => {
      const trackingData = affiliateSystem.getTrackingCookie();
      const affiliateId = trackingData?.utm_source || trackingData?.ref || trackingData?.affiliate;
      
      setAffiliateData({
        isTracking: !!trackingData,
        affiliateId: affiliateId,
        stats: affiliateId ? affiliateSystem.getAffiliateDashboard(affiliateId) : null,
        isInitialized: affiliateSystem.initialized
      });
    };

    // Atualizar a cada 30 segundos
    const interval = setInterval(updateAffiliateData, 30000);
    
    // Atualização inicial
    updateAffiliateData();
    
    return () => clearInterval(interval);
  }, []);

  return {
    ...affiliateData,
    initialize: affiliateSystem.initialize.bind(affiliateSystem),
    recordConversion: affiliateSystem.recordConversion.bind(affiliateSystem),
    getAffiliateDashboard: affiliateSystem.getAffiliateDashboard.bind(affiliateSystem),
    getPerformanceReport: affiliateSystem.getPerformanceReport.bind(affiliateSystem)
  };
};

export default affiliateSystem;

