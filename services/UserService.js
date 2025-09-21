/**
 * UserService - Camada de lógica de negócio para usuários
 * Coordena repositórios e implementa regras de negócio
 */

import UserRepository from '../repositories/UserRepository.js';

class UserService {
  constructor(userRepository = null) {
    this.userRepository = userRepository || new UserRepository();
  }

  /**
   * Autenticar usuário
   */
  async authenticate(email, password) {
    try {
      // Validações de entrada
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      if (!this.isValidEmail(email)) {
        throw new Error('Email inválido');
      }

      // Buscar e validar credenciais
      const user = await this.userRepository.validateCredentials(email, password);
      if (!user) {
        throw new Error('Credenciais inválidas');
      }

      // Verificar se conta está ativa
      if (user.status === 'suspended') {
        throw new Error('Conta suspensa. Entre em contato com o suporte.');
      }

      // Atualizar último login
      await this.userRepository.updateLastLogin(user.id);

      // Retornar dados seguros (sem senha)
      const { password: _, ...safeUser } = user;
      
      return {
        success: true,
        user: safeUser,
        token: this.generateToken(user.id), // Em produção, usar JWT
        message: 'Login realizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        token: null,
        message: error.message
      };
    }
  }

  /**
   * Registrar novo usuário
   */
  async register(userData) {
    try {
      // Validações de entrada
      const validation = this.validateUserData(userData);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      // Verificar se email já existe
      const existingUser = await this.userRepository.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Este email já está cadastrado');
      }

      // Criar usuário
      const newUser = await this.userRepository.create({
        name: userData.name.trim(),
        email: userData.email.toLowerCase().trim(),
        password: userData.password, // Em produção, fazer hash
        language: userData.language || 'pt-BR'
      });

      // Retornar dados seguros
      const { password: _, ...safeUser } = newUser;

      return {
        success: true,
        user: safeUser,
        token: this.generateToken(newUser.id),
        message: 'Conta criada com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        token: null,
        message: error.message
      };
    }
  }

  /**
   * Buscar perfil do usuário
   */
  async getProfile(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Retornar dados seguros
      const { password: _, ...safeUser } = user;
      return {
        success: true,
        user: safeUser
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        message: error.message
      };
    }
  }

  /**
   * Atualizar perfil do usuário
   */
  async updateProfile(userId, updates) {
    try {
      // Validar dados de entrada
      if (updates.email && !this.isValidEmail(updates.email)) {
        throw new Error('Email inválido');
      }

      if (updates.name && updates.name.trim().length < 2) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
      }

      // Verificar se novo email já está em uso
      if (updates.email) {
        const existingUser = await this.userRepository.findByEmail(updates.email);
        if (existingUser && existingUser.id !== userId) {
          throw new Error('Este email já está em uso');
        }
      }

      // Atualizar usuário
      const updatedUser = await this.userRepository.update(userId, {
        ...updates,
        email: updates.email ? updates.email.toLowerCase().trim() : undefined,
        name: updates.name ? updates.name.trim() : undefined
      });

      // Retornar dados seguros
      const { password: _, ...safeUser } = updatedUser;

      return {
        success: true,
        user: safeUser,
        message: 'Perfil atualizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        user: null,
        message: error.message
      };
    }
  }

  /**
   * Alterar senha
   */
  async changePassword(userId, currentPassword, newPassword) {
    try {
      // Buscar usuário atual
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Validar senha atual
      if (user.password !== currentPassword) {
        throw new Error('Senha atual incorreta');
      }

      // Validar nova senha
      if (!this.isValidPassword(newPassword)) {
        throw new Error('Nova senha deve ter pelo menos 6 caracteres');
      }

      // Atualizar senha
      await this.userRepository.update(userId, {
        password: newPassword // Em produção, fazer hash
      });

      return {
        success: true,
        message: 'Senha alterada com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Atualizar progresso do usuário
   */
  async updateProgress(userId, progressData) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Validar dados de progresso
      const validatedProgress = this.validateProgressData(progressData);

      const updatedUser = await this.userRepository.updateProgress(userId, validatedProgress);

      return {
        success: true,
        progress: updatedUser.progress,
        message: 'Progresso atualizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        progress: null,
        message: error.message
      };
    }
  }

  /**
   * Verificar permissões do usuário
   */
  async checkPermission(userId, permission) {
    try {
      const hasPermission = await this.userRepository.hasPermission(userId, permission);
      
      return {
        success: true,
        hasPermission,
        permission
      };
    } catch (error) {
      return {
        success: false,
        hasPermission: false,
        message: error.message
      };
    }
  }

  /**
   * Verificar status da assinatura
   */
  async checkSubscriptionStatus(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const hasActiveSubscription = await this.userRepository.hasActiveSubscription(userId);
      const subscription = user.subscription;

      // Calcular dias restantes
      let daysRemaining = 0;
      if (subscription.expiresAt) {
        const now = new Date();
        const expiryDate = new Date(subscription.expiresAt);
        daysRemaining = Math.max(0, Math.ceil((expiryDate - now) / (1000 * 60 * 60 * 24)));
      }

      return {
        success: true,
        subscription: {
          ...subscription,
          isActive: hasActiveSubscription,
          daysRemaining,
          needsRenewal: daysRemaining <= 7 && daysRemaining > 0
        }
      };
    } catch (error) {
      return {
        success: false,
        subscription: null,
        message: error.message
      };
    }
  }

  /**
   * Listar usuários (admin)
   */
  async listUsers(filters = {}, requestingUserId) {
    try {
      // Verificar se usuário tem permissão de admin
      const permissionCheck = await this.checkPermission(requestingUserId, 'manage_users');
      if (!permissionCheck.hasPermission) {
        throw new Error('Acesso negado');
      }

      const users = await this.userRepository.findAll(filters);

      // Remover senhas dos resultados
      const safeUsers = users.map(user => {
        const { password: _, ...safeUser } = user;
        return safeUser;
      });

      return {
        success: true,
        users: safeUsers,
        total: safeUsers.length
      };
    } catch (error) {
      return {
        success: false,
        users: [],
        message: error.message
      };
    }
  }

  /**
   * Buscar estatísticas de usuários
   */
  async getUserStats(requestingUserId) {
    try {
      // Verificar permissão de admin
      const permissionCheck = await this.checkPermission(requestingUserId, 'manage_users');
      if (!permissionCheck.hasPermission) {
        throw new Error('Acesso negado');
      }

      const allUsers = await this.userRepository.findAll();
      
      const stats = {
        totalUsers: allUsers.length,
        activeSubscriptions: allUsers.filter(u => u.subscription.status === 'active').length,
        trialUsers: allUsers.filter(u => u.subscription.status === 'trial').length,
        adminUsers: allUsers.filter(u => u.role === 'admin').length,
        memberUsers: allUsers.filter(u => u.role === 'member').length,
        totalWatchTime: allUsers.reduce((sum, u) => sum + (u.progress.totalWatchTime || 0), 0),
        totalCertificates: allUsers.reduce((sum, u) => sum + (u.progress.certificatesEarned || 0), 0)
      };

      return {
        success: true,
        stats
      };
    } catch (error) {
      return {
        success: false,
        stats: null,
        message: error.message
      };
    }
  }

  // Métodos de validação privados

  /**
   * Validar email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validar senha
   */
  isValidPassword(password) {
    if (!password || typeof password !== 'string') {
      return false;
    }
    return password.trim().length >= 6;
  }

  /**
   * Validar dados do usuário
   */
  validateUserData(userData) {
    if (!userData.name || userData.name.trim().length < 2) {
      return { valid: false, message: 'Nome deve ter pelo menos 2 caracteres' };
    }

    if (!userData.email || !this.isValidEmail(userData.email)) {
      return { valid: false, message: 'Email inválido' };
    }

    if (!userData.password || !this.isValidPassword(userData.password)) {
      return { valid: false, message: 'Senha deve ter pelo menos 6 caracteres' };
    }

    return { valid: true };
  }

  /**
   * Validar dados de progresso
   */
  validateProgressData(progressData) {
    const validated = {};

    if (typeof progressData.coursesCompleted === 'number' && progressData.coursesCompleted >= 0) {
      validated.coursesCompleted = progressData.coursesCompleted;
    }

    if (typeof progressData.totalWatchTime === 'number' && progressData.totalWatchTime >= 0) {
      validated.totalWatchTime = progressData.totalWatchTime;
    }

    if (typeof progressData.certificatesEarned === 'number' && progressData.certificatesEarned >= 0) {
      validated.certificatesEarned = progressData.certificatesEarned;
    }

    if (typeof progressData.currentStreak === 'number' && progressData.currentStreak >= 0) {
      validated.currentStreak = progressData.currentStreak;
    }

    return validated;
  }

  /**
   * Gerar token (simplificado - em produção usar JWT)
   */
  generateToken(userId) {
    return `token_${userId}_${Date.now()}`;
  }

  /**
   * Validar token (simplificado - em produção usar JWT)
   */
  validateToken(token) {
    if (!token || !token.startsWith('token_')) {
      return { valid: false, userId: null };
    }

    const parts = token.split('_');
    if (parts.length !== 3) {
      return { valid: false, userId: null };
    }

    const userId = parts[1];
    const timestamp = parseInt(parts[2]);
    const now = Date.now();

    // Token válido por 24 horas
    if (now - timestamp > 24 * 60 * 60 * 1000) {
      return { valid: false, userId: null };
    }

    return { valid: true, userId };
  }
}

export default UserService;

