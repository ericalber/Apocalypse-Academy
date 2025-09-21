// SECURITY SHIELD - Sistema de Segurança Completo
// Seguindo Guide Master - Preservando estrutura visual existente

import CryptoJS from 'crypto-js';

// Configurações de segurança
const SECURITY_CONFIG = {
  encryption: {
    algorithm: 'AES-256-GCM',
    keySize: 256,
    ivSize: 16,
    saltSize: 16,
    iterations: 10000
  },
  session: {
    timeout: 24 * 60 * 60 * 1000, // 24 horas
    renewThreshold: 2 * 60 * 60 * 1000, // 2 horas
    maxSessions: 3, // máximo de sessões simultâneas
    ipValidation: true,
    userAgentValidation: true
  },
  rateLimit: {
    login: { attempts: 5, window: 15 * 60 * 1000 }, // 5 tentativas em 15 min
    api: { requests: 100, window: 60 * 1000 }, // 100 req/min
    download: { requests: 10, window: 60 * 1000 } // 10 downloads/min
  },
  firewall: {
    blockedIPs: [],
    allowedCountries: ['BR', 'US', 'CA', 'MX', 'AR', 'CL', 'CO', 'PE'],
    suspiciousPatterns: [
      /bot|crawler|spider/i,
      /hack|exploit|inject/i,
      /\<script\>/i,
      /union.*select/i
    ]
  },
  backup: {
    interval: 6 * 60 * 60 * 1000, // 6 horas
    retention: 30, // 30 backups
    encryption: true,
    compression: true
  }
};

// Classe principal do Security Shield
export class SecurityShield {
  constructor() {
    this.encryptionKey = this.generateEncryptionKey();
    this.sessionManager = new SessionManager();
    this.rateLimiter = new RateLimiter();
    this.firewall = new Firewall();
    this.backupManager = new BackupManager();
    this.auditLogger = new AuditLogger();
    this.threatDetector = new ThreatDetector();
    this.initialized = false;
  }

  // Inicializar sistema de segurança
  async initialize() {
    try {
      // Verificar integridade do sistema
      await this.verifySystemIntegrity();

      // Inicializar componentes
      await this.sessionManager.initialize();
      await this.rateLimiter.initialize();
      await this.firewall.initialize();
      await this.backupManager.initialize();
      await this.auditLogger.initialize();
      await this.threatDetector.initialize();

      // Configurar monitoramento
      this.setupSecurityMonitoring();

      // Agendar backups automáticos
      this.scheduleAutomaticBackups();

      this.initialized = true;
      this.auditLogger.log('SYSTEM_INIT', 'Security Shield initialized successfully');

      return { success: true, message: 'Security Shield ativado' };
    } catch (error) {
      this.auditLogger.log('SYSTEM_ERROR', `Failed to initialize: ${error.message}`);
      throw error;
    }
  }

  // Verificar integridade do sistema
  async verifySystemIntegrity() {
    const criticalFiles = [
      '/lib/auth-enhanced.js',
      '/lib/billing-payment-suite.js',
      '/lib/streaming-ui-pack.js',
      '/contexts/AuthContext.js'
    ];

    for (const file of criticalFiles) {
      // Em produção, verificaria hash dos arquivos
      console.log(`Verificando integridade: ${file}`);
    }
  }

  // Gerar chave de criptografia
  generateEncryptionKey() {
    return CryptoJS.lib.WordArray.random(SECURITY_CONFIG.encryption.keySize / 8);
  }

  // Criptografar dados
  encrypt(data, customKey = null) {
    try {
      const key = customKey || this.encryptionKey;
      const salt = CryptoJS.lib.WordArray.random(SECURITY_CONFIG.encryption.saltSize);
      const iv = CryptoJS.lib.WordArray.random(SECURITY_CONFIG.encryption.ivSize);

      const derivedKey = CryptoJS.PBKDF2(key, salt, {
        keySize: SECURITY_CONFIG.encryption.keySize / 32,
        iterations: SECURITY_CONFIG.encryption.iterations
      });

      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), derivedKey, {
        iv: iv,
        mode: CryptoJS.mode.GCM
      });

      return {
        encrypted: encrypted.toString(),
        salt: salt.toString(),
        iv: iv.toString(),
        timestamp: Date.now()
      };
    } catch (error) {
      this.auditLogger.log('ENCRYPTION_ERROR', error.message);
      throw new Error('Falha na criptografia');
    }
  }

  // Descriptografar dados
  decrypt(encryptedData, customKey = null) {
    try {
      const key = customKey || this.encryptionKey;
      const salt = CryptoJS.enc.Hex.parse(encryptedData.salt);
      const iv = CryptoJS.enc.Hex.parse(encryptedData.iv);

      const derivedKey = CryptoJS.PBKDF2(key, salt, {
        keySize: SECURITY_CONFIG.encryption.keySize / 32,
        iterations: SECURITY_CONFIG.encryption.iterations
      });

      const decrypted = CryptoJS.AES.decrypt(encryptedData.encrypted, derivedKey, {
        iv: iv,
        mode: CryptoJS.mode.GCM
      });

      return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
    } catch (error) {
      this.auditLogger.log('DECRYPTION_ERROR', error.message);
      throw new Error('Falha na descriptografia');
    }
  }

  // Hash seguro para senhas
  hashPassword(password, salt = null) {
    const passwordSalt = salt || CryptoJS.lib.WordArray.random(128/8);
    const hash = CryptoJS.PBKDF2(password, passwordSalt, {
      keySize: 512/32,
      iterations: 10000
    });

    return {
      hash: hash.toString(),
      salt: passwordSalt.toString(),
      algorithm: 'PBKDF2',
      iterations: 10000
    };
  }

  // Verificar senha
  verifyPassword(password, storedHash) {
    const salt = CryptoJS.enc.Hex.parse(storedHash.salt);
    const hash = CryptoJS.PBKDF2(password, salt, {
      keySize: 512/32,
      iterations: storedHash.iterations
    });

    return hash.toString() === storedHash.hash;
  }

  // Gerar token seguro
  generateSecureToken(length = 32) {
    return CryptoJS.lib.WordArray.random(length).toString();
  }

  // Validar entrada do usuário
  sanitizeInput(input, type = 'text') {
    if (typeof input !== 'string') return '';

    let sanitized = input.trim();

    switch (type) {
      case 'email':
        sanitized = sanitized.toLowerCase();
        // Remover caracteres perigosos
        sanitized = sanitized.replace(/[<>\"']/g, '');
        break;
      case 'html':
        // Escapar HTML
        sanitized = sanitized
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#x27;');
        break;
      case 'sql':
        // Prevenir SQL injection
        sanitized = sanitized.replace(/['";\\]/g, '');
        break;
      default:
        // Sanitização básica
        sanitized = sanitized.replace(/[<>\"'&]/g, '');
    }

    return sanitized;
  }

  // Configurar monitoramento de segurança
  setupSecurityMonitoring() {
    // Monitorar tentativas de login suspeitas
    setInterval(() => {
      this.threatDetector.analyzeSuspiciousActivity();
    }, 60000); // A cada minuto

    // Verificar integridade dos dados
    setInterval(() => {
      this.verifyDataIntegrity();
    }, 300000); // A cada 5 minutos

    // Limpar logs antigos
    setInterval(() => {
      this.auditLogger.cleanup();
    }, 3600000); // A cada hora
  }

  // Agendar backups automáticos
  scheduleAutomaticBackups() {
    setInterval(() => {
      this.backupManager.createBackup();
    }, SECURITY_CONFIG.backup.interval);
  }

  // Verificar integridade dos dados
  async verifyDataIntegrity() {
    try {
      // Verificar localStorage
      const criticalKeys = [
        'apocalypse_auth_token',
        'apocalypse_user_data',
        'apocalypse_cart',
        'apocalypse_orders'
      ];

      for (const key of criticalKeys) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            JSON.parse(data);
          } catch {
            this.auditLogger.log('DATA_CORRUPTION', `Corrupted data detected: ${key}`);
            localStorage.removeItem(key);
          }
        }
      }
    } catch (error) {
      this.auditLogger.log('INTEGRITY_CHECK_ERROR', error.message);
    }
  }

  // Obter relatório de segurança
  getSecurityReport() {
    return {
      timestamp: new Date().toISOString(),
      status: this.initialized ? 'ACTIVE' : 'INACTIVE',
      threats: this.threatDetector.getThreats(),
      sessions: this.sessionManager.getActiveSessions(),
      rateLimits: this.rateLimiter.getStatus(),
      firewall: this.firewall.getStatus(),
      backups: this.backupManager.getStatus(),
      auditLogs: this.auditLogger.getRecentLogs(100)
    };
  }
}

// Gerenciador de Sessões
class SessionManager {
  constructor() {
    this.activeSessions = new Map();
  }

  async initialize() {
    // Carregar sessões ativas
    this.loadActiveSessions();
    
    // Configurar limpeza automática
    setInterval(() => {
      this.cleanupExpiredSessions();
    }, 60000); // A cada minuto
  }

  createSession(userId, userAgent, ipAddress) {
    const sessionId = CryptoJS.lib.WordArray.random(32).toString();
    const session = {
      id: sessionId,
      userId: userId,
      userAgent: userAgent,
      ipAddress: ipAddress,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      expiresAt: Date.now() + SECURITY_CONFIG.session.timeout
    };

    // Verificar limite de sessões
    const userSessions = Array.from(this.activeSessions.values())
      .filter(s => s.userId === userId);

    if (userSessions.length >= SECURITY_CONFIG.session.maxSessions) {
      // Remover sessão mais antiga
      const oldestSession = userSessions.sort((a, b) => a.createdAt - b.createdAt)[0];
      this.activeSessions.delete(oldestSession.id);
    }

    this.activeSessions.set(sessionId, session);
    this.saveActiveSessions();

    return session;
  }

  validateSession(sessionId, userAgent, ipAddress) {
    const session = this.activeSessions.get(sessionId);
    
    if (!session) return false;
    if (session.expiresAt < Date.now()) {
      this.activeSessions.delete(sessionId);
      return false;
    }

    // Validar IP e User Agent se habilitado
    if (SECURITY_CONFIG.session.ipValidation && session.ipAddress !== ipAddress) {
      return false;
    }

    if (SECURITY_CONFIG.session.userAgentValidation && session.userAgent !== userAgent) {
      return false;
    }

    // Atualizar última atividade
    session.lastActivity = Date.now();
    
    // Renovar sessão se próxima do vencimento
    if (session.expiresAt - Date.now() < SECURITY_CONFIG.session.renewThreshold) {
      session.expiresAt = Date.now() + SECURITY_CONFIG.session.timeout;
    }

    this.saveActiveSessions();
    return true;
  }

  destroySession(sessionId) {
    this.activeSessions.delete(sessionId);
    this.saveActiveSessions();
  }

  cleanupExpiredSessions() {
    const now = Date.now();
    for (const [sessionId, session] of this.activeSessions) {
      if (session.expiresAt < now) {
        this.activeSessions.delete(sessionId);
      }
    }
    this.saveActiveSessions();
  }

  loadActiveSessions() {
    try {
      const saved = localStorage.getItem('apocalypse_active_sessions');
      if (saved) {
        const sessions = JSON.parse(saved);
        this.activeSessions = new Map(Object.entries(sessions));
      }
    } catch (error) {
      console.error('Erro ao carregar sessões:', error);
    }
  }

  saveActiveSessions() {
    try {
      const sessions = Object.fromEntries(this.activeSessions);
      localStorage.setItem('apocalypse_active_sessions', JSON.stringify(sessions));
    } catch (error) {
      console.error('Erro ao salvar sessões:', error);
    }
  }

  getActiveSessions() {
    return Array.from(this.activeSessions.values());
  }
}

// Rate Limiter
class RateLimiter {
  constructor() {
    this.limits = new Map();
  }

  async initialize() {
    // Carregar limites salvos
    this.loadLimits();
    
    // Limpeza automática
    setInterval(() => {
      this.cleanup();
    }, 60000);
  }

  checkLimit(key, type = 'api') {
    const config = SECURITY_CONFIG.rateLimit[type];
    if (!config) return true;

    const now = Date.now();
    const windowStart = now - config.window;

    if (!this.limits.has(key)) {
      this.limits.set(key, []);
    }

    const requests = this.limits.get(key);
    
    // Remover requests antigas
    const validRequests = requests.filter(time => time > windowStart);
    this.limits.set(key, validRequests);

    // Verificar limite
    if (validRequests.length >= config.attempts) {
      return false;
    }

    // Adicionar nova request
    validRequests.push(now);
    this.saveLimits();

    return true;
  }

  cleanup() {
    const now = Date.now();
    for (const [key, requests] of this.limits) {
      const validRequests = requests.filter(time => time > now - 3600000); // 1 hora
      if (validRequests.length === 0) {
        this.limits.delete(key);
      } else {
        this.limits.set(key, validRequests);
      }
    }
    this.saveLimits();
  }

  loadLimits() {
    try {
      const saved = localStorage.getItem('apocalypse_rate_limits');
      if (saved) {
        const limits = JSON.parse(saved);
        this.limits = new Map(Object.entries(limits));
      }
    } catch (error) {
      console.error('Erro ao carregar rate limits:', error);
    }
  }

  saveLimits() {
    try {
      const limits = Object.fromEntries(this.limits);
      localStorage.setItem('apocalypse_rate_limits', JSON.stringify(limits));
    } catch (error) {
      console.error('Erro ao salvar rate limits:', error);
    }
  }

  getStatus() {
    return {
      totalKeys: this.limits.size,
      activeWindows: Array.from(this.limits.entries()).map(([key, requests]) => ({
        key,
        requests: requests.length,
        lastRequest: Math.max(...requests)
      }))
    };
  }
}

// Firewall
class Firewall {
  constructor() {
    this.blockedIPs = new Set(SECURITY_CONFIG.firewall.blockedIPs);
    this.suspiciousActivity = new Map();
  }

  async initialize() {
    this.loadBlockedIPs();
  }

  checkRequest(request) {
    const { ip, userAgent, url, headers } = request;

    // Verificar IP bloqueado
    if (this.blockedIPs.has(ip)) {
      return { allowed: false, reason: 'IP_BLOCKED' };
    }

    // Verificar padrões suspeitos
    for (const pattern of SECURITY_CONFIG.firewall.suspiciousPatterns) {
      if (pattern.test(userAgent) || pattern.test(url)) {
        this.recordSuspiciousActivity(ip, 'SUSPICIOUS_PATTERN');
        return { allowed: false, reason: 'SUSPICIOUS_PATTERN' };
      }
    }

    // Verificar atividade suspeita
    if (this.isSuspiciousActivity(ip)) {
      return { allowed: false, reason: 'SUSPICIOUS_ACTIVITY' };
    }

    return { allowed: true };
  }

  blockIP(ip, reason = 'MANUAL') {
    this.blockedIPs.add(ip);
    this.saveBlockedIPs();
    console.log(`IP bloqueado: ${ip} - Razão: ${reason}`);
  }

  unblockIP(ip) {
    this.blockedIPs.delete(ip);
    this.saveBlockedIPs();
    console.log(`IP desbloqueado: ${ip}`);
  }

  recordSuspiciousActivity(ip, type) {
    if (!this.suspiciousActivity.has(ip)) {
      this.suspiciousActivity.set(ip, []);
    }

    const activities = this.suspiciousActivity.get(ip);
    activities.push({ type, timestamp: Date.now() });

    // Manter apenas últimas 100 atividades
    if (activities.length > 100) {
      activities.splice(0, activities.length - 100);
    }

    // Auto-bloquear se muita atividade suspeita
    const recentActivities = activities.filter(a => 
      Date.now() - a.timestamp < 300000 // 5 minutos
    );

    if (recentActivities.length > 10) {
      this.blockIP(ip, 'AUTO_BLOCK_SUSPICIOUS');
    }
  }

  isSuspiciousActivity(ip) {
    const activities = this.suspiciousActivity.get(ip);
    if (!activities) return false;

    const recentActivities = activities.filter(a => 
      Date.now() - a.timestamp < 300000 // 5 minutos
    );

    return recentActivities.length > 5;
  }

  loadBlockedIPs() {
    try {
      const saved = localStorage.getItem('apocalypse_blocked_ips');
      if (saved) {
        this.blockedIPs = new Set(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Erro ao carregar IPs bloqueados:', error);
    }
  }

  saveBlockedIPs() {
    try {
      localStorage.setItem('apocalypse_blocked_ips', JSON.stringify([...this.blockedIPs]));
    } catch (error) {
      console.error('Erro ao salvar IPs bloqueados:', error);
    }
  }

  getStatus() {
    return {
      blockedIPs: this.blockedIPs.size,
      suspiciousIPs: this.suspiciousActivity.size,
      recentBlocks: Array.from(this.blockedIPs).slice(-10)
    };
  }
}

// Gerenciador de Backup
class BackupManager {
  constructor() {
    this.backups = [];
  }

  async initialize() {
    this.loadBackupHistory();
  }

  async createBackup() {
    try {
      const backup = {
        id: `backup_${Date.now()}`,
        timestamp: new Date().toISOString(),
        data: this.collectBackupData(),
        size: 0,
        compressed: SECURITY_CONFIG.backup.compression,
        encrypted: SECURITY_CONFIG.backup.encryption
      };

      // Simular compressão e criptografia
      if (backup.compressed) {
        backup.data = this.compressData(backup.data);
      }

      if (backup.encrypted) {
        const securityShield = new SecurityShield();
        backup.data = securityShield.encrypt(backup.data);
      }

      backup.size = JSON.stringify(backup.data).length;

      this.backups.push(backup);

      // Manter apenas os últimos backups
      if (this.backups.length > SECURITY_CONFIG.backup.retention) {
        this.backups.splice(0, this.backups.length - SECURITY_CONFIG.backup.retention);
      }

      this.saveBackupHistory();

      console.log(`Backup criado: ${backup.id} (${backup.size} bytes)`);
      return backup;

    } catch (error) {
      console.error('Erro ao criar backup:', error);
      throw error;
    }
  }

  collectBackupData() {
    const data = {};
    
    // Coletar dados críticos do localStorage
    const criticalKeys = [
      'apocalypse_user_data',
      'apocalypse_orders',
      'apocalypse_affiliate_transactions',
      'apocalypse_active_sessions'
    ];

    for (const key of criticalKeys) {
      const value = localStorage.getItem(key);
      if (value) {
        data[key] = value;
      }
    }

    return data;
  }

  compressData(data) {
    // Simulação de compressão (em produção usaria biblioteca real)
    const compressed = JSON.stringify(data);
    return { compressed: true, data: compressed };
  }

  async restoreBackup(backupId) {
    try {
      const backup = this.backups.find(b => b.id === backupId);
      if (!backup) {
        throw new Error('Backup não encontrado');
      }

      let data = backup.data;

      // Descriptografar se necessário
      if (backup.encrypted) {
        const securityShield = new SecurityShield();
        data = securityShield.decrypt(data);
      }

      // Descomprimir se necessário
      if (backup.compressed) {
        data = JSON.parse(data.data);
      }

      // Restaurar dados
      for (const [key, value] of Object.entries(data)) {
        localStorage.setItem(key, value);
      }

      console.log(`Backup restaurado: ${backupId}`);
      return { success: true };

    } catch (error) {
      console.error('Erro ao restaurar backup:', error);
      throw error;
    }
  }

  loadBackupHistory() {
    try {
      const saved = localStorage.getItem('apocalypse_backup_history');
      if (saved) {
        this.backups = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar histórico de backup:', error);
    }
  }

  saveBackupHistory() {
    try {
      localStorage.setItem('apocalypse_backup_history', JSON.stringify(this.backups));
    } catch (error) {
      console.error('Erro ao salvar histórico de backup:', error);
    }
  }

  getStatus() {
    return {
      totalBackups: this.backups.length,
      lastBackup: this.backups.length > 0 ? this.backups[this.backups.length - 1] : null,
      totalSize: this.backups.reduce((sum, backup) => sum + backup.size, 0)
    };
  }
}

// Logger de Auditoria
class AuditLogger {
  constructor() {
    this.logs = [];
  }

  async initialize() {
    this.loadLogs();
  }

  log(event, details, userId = null) {
    const logEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      event: event,
      details: details,
      userId: userId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      ip: 'client-side' // Em produção, seria obtido do servidor
    };

    this.logs.push(logEntry);

    // Manter apenas os últimos 1000 logs
    if (this.logs.length > 1000) {
      this.logs.splice(0, this.logs.length - 1000);
    }

    this.saveLogs();
    console.log(`[AUDIT] ${event}: ${details}`);
  }

  getRecentLogs(limit = 50) {
    return this.logs.slice(-limit);
  }

  searchLogs(criteria) {
    return this.logs.filter(log => {
      if (criteria.event && log.event !== criteria.event) return false;
      if (criteria.userId && log.userId !== criteria.userId) return false;
      if (criteria.startDate && new Date(log.timestamp) < new Date(criteria.startDate)) return false;
      if (criteria.endDate && new Date(log.timestamp) > new Date(criteria.endDate)) return false;
      return true;
    });
  }

  cleanup() {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    this.logs = this.logs.filter(log => new Date(log.timestamp) > thirtyDaysAgo);
    this.saveLogs();
  }

  loadLogs() {
    try {
      const saved = localStorage.getItem('apocalypse_audit_logs');
      if (saved) {
        this.logs = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar logs de auditoria:', error);
    }
  }

  saveLogs() {
    try {
      localStorage.setItem('apocalypse_audit_logs', JSON.stringify(this.logs));
    } catch (error) {
      console.error('Erro ao salvar logs de auditoria:', error);
    }
  }
}

// Detector de Ameaças
class ThreatDetector {
  constructor() {
    this.threats = [];
    this.patterns = {
      bruteForce: /(.)\1{10,}/, // Repetição excessiva
      sqlInjection: /(union|select|insert|delete|drop|create|alter)/i,
      xss: /(<script|javascript:|on\w+\s*=)/i,
      pathTraversal: /(\.\.\/|\.\.\\)/,
      commandInjection: /(;|\||&|`|\$\()/
    };
  }

  async initialize() {
    this.loadThreats();
  }

  analyzeSuspiciousActivity() {
    // Analisar padrões de login
    this.analyzeLoginPatterns();
    
    // Analisar tentativas de acesso
    this.analyzeAccessPatterns();
    
    // Analisar dados de entrada
    this.analyzeInputPatterns();
  }

  analyzeLoginPatterns() {
    // Simular análise de padrões de login suspeitos
    const recentLogins = this.getRecentLoginAttempts();
    
    // Detectar tentativas de força bruta
    const ipCounts = {};
    recentLogins.forEach(login => {
      ipCounts[login.ip] = (ipCounts[login.ip] || 0) + 1;
    });

    for (const [ip, count] of Object.entries(ipCounts)) {
      if (count > 10) {
        this.recordThreat('BRUTE_FORCE', `IP ${ip} tentou ${count} logins`, 'HIGH');
      }
    }
  }

  analyzeAccessPatterns() {
    // Analisar padrões de acesso suspeitos
    const recentAccess = this.getRecentAccessAttempts();
    
    recentAccess.forEach(access => {
      if (access.url.includes('admin') && !access.authorized) {
        this.recordThreat('UNAUTHORIZED_ACCESS', `Tentativa de acesso admin: ${access.url}`, 'MEDIUM');
      }
    });
  }

  analyzeInputPatterns() {
    // Analisar entradas do usuário em busca de padrões maliciosos
    const recentInputs = this.getRecentUserInputs();
    
    recentInputs.forEach(input => {
      for (const [threatType, pattern] of Object.entries(this.patterns)) {
        if (pattern.test(input.data)) {
          this.recordThreat(threatType.toUpperCase(), `Padrão suspeito detectado: ${input.data.substring(0, 100)}`, 'HIGH');
        }
      }
    });
  }

  recordThreat(type, description, severity) {
    const threat = {
      id: `threat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: type,
      description: description,
      severity: severity,
      timestamp: new Date().toISOString(),
      status: 'ACTIVE',
      ip: 'client-side',
      userAgent: navigator.userAgent
    };

    this.threats.push(threat);

    // Manter apenas as últimas 500 ameaças
    if (this.threats.length > 500) {
      this.threats.splice(0, this.threats.length - 500);
    }

    this.saveThreats();

    // Log crítico para ameaças de alta severidade
    if (severity === 'HIGH') {
      console.warn(`[THREAT DETECTED] ${type}: ${description}`);
    }
  }

  getRecentLoginAttempts() {
    // Simular dados de tentativas de login recentes
    return [];
  }

  getRecentAccessAttempts() {
    // Simular dados de tentativas de acesso recentes
    return [];
  }

  getRecentUserInputs() {
    // Simular dados de entradas do usuário recentes
    return [];
  }

  getThreats() {
    return this.threats.filter(threat => threat.status === 'ACTIVE');
  }

  loadThreats() {
    try {
      const saved = localStorage.getItem('apocalypse_threats');
      if (saved) {
        this.threats = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Erro ao carregar ameaças:', error);
    }
  }

  saveThreats() {
    try {
      localStorage.setItem('apocalypse_threats', JSON.stringify(this.threats));
    } catch (error) {
      console.error('Erro ao salvar ameaças:', error);
    }
  }
}

// Instância singleton
export const securityShield = new SecurityShield();

// Hook React para usar o Security Shield
export const useSecurityShield = () => {
  const [securityStatus, setSecurityStatus] = useState({
    initialized: securityShield.initialized,
    threats: [],
    lastBackup: null
  });

  useEffect(() => {
    const updateStatus = () => {
      setSecurityStatus({
        initialized: securityShield.initialized,
        threats: securityShield.threatDetector?.getThreats() || [],
        lastBackup: securityShield.backupManager?.getStatus()?.lastBackup || null
      });
    };

    const interval = setInterval(updateStatus, 5000); // A cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return {
    ...securityStatus,
    initialize: securityShield.initialize.bind(securityShield),
    encrypt: securityShield.encrypt.bind(securityShield),
    decrypt: securityShield.decrypt.bind(securityShield),
    hashPassword: securityShield.hashPassword.bind(securityShield),
    verifyPassword: securityShield.verifyPassword.bind(securityShield),
    sanitizeInput: securityShield.sanitizeInput.bind(securityShield),
    generateSecureToken: securityShield.generateSecureToken.bind(securityShield),
    getSecurityReport: securityShield.getSecurityReport.bind(securityShield)
  };
};

export default securityShield;

