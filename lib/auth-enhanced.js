// AUTH & SIGN KIT - Sistema de Autenticação Completo
// Seguindo Guide Master - Preservando estrutura visual existente

import { useState, useEffect } from 'react';

// Configurações de autenticação
const AUTH_CONFIG = {
  tokenKey: 'apocalypse_auth_token',
  userKey: 'apocalypse_user_data',
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas
  maxLoginAttempts: 5,
  lockoutDuration: 15 * 60 * 1000, // 15 minutos
};

// Usuários de teste expandidos
const TEST_USERS = [
  {
    id: '1',
    name: 'Administrador',
    email: 'admin@apocalypse.academy',
    password: 'admin123',
    role: 'admin',
    avatar: '/images/avatars/admin.jpg',
    permissions: ['all'],
    twoFactorEnabled: false,
    lastLogin: null,
    createdAt: '2024-01-01',
    subscription: 'premium'
  },
  {
    id: '2',
    name: 'Usuário Premium',
    email: 'premium@apocalypse.academy',
    password: 'premium123',
    role: 'premium',
    avatar: '/images/avatars/premium.jpg',
    permissions: ['courses', 'documentaries', 'magazines', 'live'],
    twoFactorEnabled: true,
    lastLogin: null,
    createdAt: '2024-01-15',
    subscription: 'premium'
  },
  {
    id: '3',
    name: 'Usuário Básico',
    email: 'usuario@teste.com',
    password: 'teste123',
    role: 'user',
    avatar: '/images/avatars/user.jpg',
    permissions: ['courses', 'documentaries'],
    twoFactorEnabled: false,
    lastLogin: null,
    createdAt: '2024-02-01',
    subscription: 'basic'
  }
];

// Classe principal do Auth & Sign Kit
export class AuthEnhanced {
  constructor() {
    this.user = null;
    this.isAuthenticated = false;
    this.loading = true;
    this.loginAttempts = this.getLoginAttempts();
    this.isLocked = this.checkLockout();
  }

  // Inicialização do sistema de auth
  async initialize() {
    try {
      const token = localStorage.getItem(AUTH_CONFIG.tokenKey);
      const userData = localStorage.getItem(AUTH_CONFIG.userKey);
      
      if (token && userData) {
        const user = JSON.parse(userData);
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        
        // Verificar se o token não expirou
        if (tokenData.exp > Date.now()) {
          this.user = user;
          this.isAuthenticated = true;
          this.updateLastLogin(user.id);
        } else {
          this.logout();
        }
      }
    } catch (error) {
      console.error('Erro ao inicializar autenticação:', error);
      this.logout();
    } finally {
      this.loading = false;
    }
  }

  // Login com email e senha
  async login(email, password, rememberMe = false) {
    try {
      // Verificar se está bloqueado
      if (this.isLocked) {
        throw new Error('Muitas tentativas de login. Tente novamente em 15 minutos.');
      }

      this.loading = true;

      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Encontrar usuário
      const user = TEST_USERS.find(u => u.email === email && u.password === password);
      
      if (!user) {
        this.incrementLoginAttempts();
        throw new Error('Email ou senha incorretos');
      }

      // Verificar 2FA se habilitado
      if (user.twoFactorEnabled) {
        return { requiresTwoFactor: true, userId: user.id };
      }

      // Login bem-sucedido
      this.resetLoginAttempts();
      return this.completeLogin(user, rememberMe);

    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  // Login social (Google, Facebook)
  async socialLogin(provider, token) {
    try {
      this.loading = true;

      // Simular validação do token social
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Em produção, validaria o token com o provider
      const socialUser = {
        id: `social_${Date.now()}`,
        name: `Usuário ${provider}`,
        email: `user@${provider}.com`,
        role: 'user',
        avatar: `/images/avatars/${provider}.jpg`,
        permissions: ['courses', 'documentaries'],
        twoFactorEnabled: false,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        subscription: 'basic',
        provider: provider
      };

      return this.completeLogin(socialUser, true);

    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  // Verificação 2FA
  async verifyTwoFactor(userId, code) {
    try {
      this.loading = true;

      // Simular verificação do código 2FA
      await new Promise(resolve => setTimeout(resolve, 800));

      // Código de teste: 123456
      if (code !== '123456') {
        throw new Error('Código de verificação inválido');
      }

      const user = TEST_USERS.find(u => u.id === userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      return this.completeLogin(user, true);

    } catch (error) {
      this.loading = false;
      throw error;
    }
  }

  // Completar login
  completeLogin(user, rememberMe) {
    // Gerar token JWT simulado
    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role,
      iat: Date.now(),
      exp: Date.now() + (rememberMe ? 30 * 24 * 60 * 60 * 1000 : AUTH_CONFIG.sessionTimeout)
    };

    const token = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })) + '.' +
                  btoa(JSON.stringify(tokenPayload)) + '.' +
                  btoa('signature');

    // Salvar dados
    localStorage.setItem(AUTH_CONFIG.tokenKey, token);
    localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(user));

    // Atualizar estado
    this.user = user;
    this.isAuthenticated = true;
    this.loading = false;

    // Atualizar último login
    this.updateLastLogin(user.id);

    return { success: true, user, token };
  }

  // Recuperação de senha
  async forgotPassword(email) {
    try {
      this.loading = true;

      // Simular envio de email
      await new Promise(resolve => setTimeout(resolve, 1200));

      const user = TEST_USERS.find(u => u.email === email);
      if (!user) {
        throw new Error('Email não encontrado');
      }

      // Em produção, enviaria email real
      console.log(`Email de recuperação enviado para: ${email}`);
      
      return { 
        success: true, 
        message: 'Email de recuperação enviado com sucesso',
        resetToken: `reset_${Date.now()}_${user.id}`
      };

    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Reset de senha
  async resetPassword(token, newPassword) {
    try {
      this.loading = true;

      // Simular validação do token
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!token.startsWith('reset_')) {
        throw new Error('Token de reset inválido');
      }

      // Em produção, validaria o token e atualizaria a senha
      return { 
        success: true, 
        message: 'Senha alterada com sucesso' 
      };

    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Logout
  logout() {
    localStorage.removeItem(AUTH_CONFIG.tokenKey);
    localStorage.removeItem(AUTH_CONFIG.userKey);
    this.user = null;
    this.isAuthenticated = false;
    this.loading = false;
  }

  // Verificar permissões
  hasPermission(permission) {
    if (!this.isAuthenticated || !this.user) return false;
    if (this.user.role === 'admin') return true;
    return this.user.permissions.includes(permission);
  }

  // Gerenciamento de tentativas de login
  getLoginAttempts() {
    const attempts = localStorage.getItem('login_attempts');
    return attempts ? JSON.parse(attempts) : { count: 0, lastAttempt: null };
  }

  incrementLoginAttempts() {
    const attempts = {
      count: this.loginAttempts.count + 1,
      lastAttempt: Date.now()
    };
    
    localStorage.setItem('login_attempts', JSON.stringify(attempts));
    this.loginAttempts = attempts;

    if (attempts.count >= AUTH_CONFIG.maxLoginAttempts) {
      this.isLocked = true;
    }
  }

  resetLoginAttempts() {
    localStorage.removeItem('login_attempts');
    this.loginAttempts = { count: 0, lastAttempt: null };
    this.isLocked = false;
  }

  checkLockout() {
    if (this.loginAttempts.count >= AUTH_CONFIG.maxLoginAttempts) {
      const timeSinceLastAttempt = Date.now() - this.loginAttempts.lastAttempt;
      if (timeSinceLastAttempt < AUTH_CONFIG.lockoutDuration) {
        return true;
      } else {
        this.resetLoginAttempts();
        return false;
      }
    }
    return false;
  }

  updateLastLogin(userId) {
    // Em produção, atualizaria no backend
    console.log(`Último login atualizado para usuário: ${userId}`);
  }

  // Atualizar perfil do usuário
  async updateProfile(profileData) {
    try {
      this.loading = true;

      // Simular atualização
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = { ...this.user, ...profileData };
      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(updatedUser));
      this.user = updatedUser;

      return { success: true, user: updatedUser };

    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Alterar senha
  async changePassword(currentPassword, newPassword) {
    try {
      this.loading = true;

      // Simular verificação da senha atual
      await new Promise(resolve => setTimeout(resolve, 800));

      if (this.user.password !== currentPassword) {
        throw new Error('Senha atual incorreta');
      }

      // Em produção, atualizaria no backend
      return { success: true, message: 'Senha alterada com sucesso' };

    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Habilitar/Desabilitar 2FA
  async toggle2FA(enable, password) {
    try {
      this.loading = true;

      // Verificar senha
      if (this.user.password !== password) {
        throw new Error('Senha incorreta');
      }

      // Simular configuração 2FA
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedUser = { ...this.user, twoFactorEnabled: enable };
      localStorage.setItem(AUTH_CONFIG.userKey, JSON.stringify(updatedUser));
      this.user = updatedUser;

      return { 
        success: true, 
        message: enable ? '2FA habilitado com sucesso' : '2FA desabilitado com sucesso',
        qrCode: enable ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==' : null
      };

    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }
}

// Instância singleton
export const authEnhanced = new AuthEnhanced();

// Hook React para usar o Auth Enhanced
export const useAuthEnhanced = () => {
  const [state, setState] = useState({
    user: authEnhanced.user,
    isAuthenticated: authEnhanced.isAuthenticated,
    loading: authEnhanced.loading
  });

  useEffect(() => {
    authEnhanced.initialize();
    
    // Listener para mudanças de estado
    const updateState = () => {
      setState({
        user: authEnhanced.user,
        isAuthenticated: authEnhanced.isAuthenticated,
        loading: authEnhanced.loading
      });
    };

    // Simular listener de mudanças
    const interval = setInterval(updateState, 100);
    
    return () => clearInterval(interval);
  }, []);

  return {
    ...state,
    login: authEnhanced.login.bind(authEnhanced),
    socialLogin: authEnhanced.socialLogin.bind(authEnhanced),
    verifyTwoFactor: authEnhanced.verifyTwoFactor.bind(authEnhanced),
    forgotPassword: authEnhanced.forgotPassword.bind(authEnhanced),
    resetPassword: authEnhanced.resetPassword.bind(authEnhanced),
    logout: authEnhanced.logout.bind(authEnhanced),
    hasPermission: authEnhanced.hasPermission.bind(authEnhanced),
    updateProfile: authEnhanced.updateProfile.bind(authEnhanced),
    changePassword: authEnhanced.changePassword.bind(authEnhanced),
    toggle2FA: authEnhanced.toggle2FA.bind(authEnhanced)
  };
};

export default authEnhanced;

