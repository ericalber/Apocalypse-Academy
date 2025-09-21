import React, { createContext, useContext, useState, useEffect } from 'react';
import UserService from '../services/UserService.js';

// Criando o contexto de autenticação
const AuthContext = createContext(null);

// Provider que envolverá a aplicação
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userService] = useState(() => new UserService());

  // Verificar se o usuário está autenticado ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user_data');
        
        if (token && userData) {
          try {
            const parsedUserData = JSON.parse(userData);
            setUser(parsedUserData);
          } catch (parseError) {
            console.error('Erro ao parsear dados do usuário:', parseError);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user_data');
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Função de login usando o serviço
  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const result = await userService.authenticate(email, password);
      
      if (result.success) {
        // Salvar dados no localStorage
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('user_data', JSON.stringify(result.user));
        
        // Atualizar estado
        setUser(result.user);
        
        return {
          success: true,
          message: result.message
        };
      } else {
        return {
          success: false,
          message: result.message
        };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    } finally {
      setLoading(false);
    }
  };

  // Função de registro usando o serviço
  const register = async (userData) => {
    try {
      setLoading(true);
      
      const result = await userService.register(userData);
      
      if (result.success) {
        // Salvar dados no localStorage
        localStorage.setItem('auth_token', result.token);
        localStorage.setItem('user_data', JSON.stringify(result.user));
        
        // Atualizar estado
        setUser(result.user);
        
        return {
          success: true,
          message: result.message
        };
      } else {
        return {
          success: false,
          message: result.message
        };
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setUser(null);
  };

  // Função para atualizar perfil
  const updateProfile = async (updates) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const result = await userService.updateProfile(user.id, updates);
      
      if (result.success) {
        // Atualizar dados locais
        const updatedUserData = result.user;
        localStorage.setItem('user_data', JSON.stringify(updatedUserData));
        setUser(updatedUserData);
        
        return {
          success: true,
          message: result.message
        };
      } else {
        return {
          success: false,
          message: result.message
        };
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  };

  // Função para alterar senha
  const changePassword = async (currentPassword, newPassword) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const result = await userService.changePassword(user.id, currentPassword, newPassword);
      
      return {
        success: result.success,
        message: result.message
      };
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  };

  // Função para atualizar progresso
  const updateProgress = async (progressData) => {
    try {
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const result = await userService.updateProgress(user.id, progressData);
      
      if (result.success) {
        // Atualizar dados locais
        const updatedUser = {
          ...user,
          progress: result.progress
        };
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
        setUser(updatedUser);
        
        return {
          success: true,
          message: result.message
        };
      } else {
        return {
          success: false,
          message: result.message
        };
      }
    } catch (error) {
      console.error('Erro ao atualizar progresso:', error);
      return {
        success: false,
        message: 'Erro interno do servidor'
      };
    }
  };

  // Função para verificar permissões
  const hasPermission = async (permission) => {
    try {
      if (!user) {
        return false;
      }

      const result = await userService.checkPermission(user.id, permission);
      return result.hasPermission;
    } catch (error) {
      console.error('Erro ao verificar permissão:', error);
      return false;
    }
  };

  // Função para verificar se está autenticado
  const isAuthenticated = () => {
    return user !== null;
  };

  // Função para verificar se tem assinatura ativa
  const hasActiveSubscription = async () => {
    try {
      if (!user) {
        return false;
      }

      const result = await userService.checkSubscriptionStatus(user.id);
      return result.success && result.subscription?.isActive;
    } catch (error) {
      console.error('Erro ao verificar assinatura:', error);
      return false;
    }
  };

  // Função para buscar status da assinatura
  const getSubscriptionStatus = async () => {
    try {
      if (!user) {
        return null;
      }

      const result = await userService.checkSubscriptionStatus(user.id);
      return result.success ? result.subscription : null;
    } catch (error) {
      console.error('Erro ao buscar status da assinatura:', error);
      return null;
    }
  };

  // Função para recarregar dados do usuário
  const refreshUser = async () => {
    try {
      if (!user) {
        return;
      }

      const result = await userService.getProfile(user.id);
      
      if (result.success) {
        const updatedUserData = result.user;
        localStorage.setItem('user_data', JSON.stringify(updatedUserData));
        setUser(updatedUserData);
      }
    } catch (error) {
      console.error('Erro ao recarregar dados do usuário:', error);
    }
  };

  // Valores do contexto
  const contextValue = {
    // Estado
    user,
    loading,
    
    // Funções de autenticação
    login,
    register,
    logout,
    isAuthenticated,
    
    // Funções de perfil
    updateProfile,
    changePassword,
    refreshUser,
    
    // Funções de progresso
    updateProgress,
    
    // Funções de permissão
    hasPermission,
    
    // Funções de assinatura
    hasActiveSubscription,
    getSubscriptionStatus,
    
    // Serviço (para uso avançado)
    userService
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;

