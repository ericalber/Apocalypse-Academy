// Sistema de Autenticação da Apocalypse Academy
import { useState, useEffect, createContext, useContext } from 'react';

// Contexto de Autenticação
const AuthContext = createContext();

// Usuários de teste
const TEST_USERS = [
  {
    id: 1,
    email: 'admin@apocalypse.academy',
    password: 'admin123',
    name: 'Administrador',
    role: 'admin',
    avatar: '/images/avatar-admin.jpg'
  },
  {
    id: 2,
    email: 'usuario@teste.com',
    password: 'teste123',
    name: 'Usuário Teste',
    role: 'user',
    avatar: '/images/avatar-user.jpg'
  },
  {
    id: 3,
    email: 'premium@apocalypse.academy',
    password: 'premium123',
    name: 'Usuário Premium',
    role: 'premium',
    avatar: '/images/avatar-premium.jpg'
  }
];

// Provider de Autenticação
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há usuário logado no localStorage
    const savedUser = localStorage.getItem('apocalypse_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('apocalypse_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verificar credenciais
      const foundUser = TEST_USERS.find(
        u => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error('Email ou senha incorretos');
      }

      // Remover senha do objeto do usuário
      const { password: _, ...userWithoutPassword } = foundUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('apocalypse_user', JSON.stringify(userWithoutPassword));
      
      return { success: true, user: userWithoutPassword };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const loginWithGoogle = async () => {
    try {
      // Simular login com Google
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const googleUser = {
        id: Date.now(),
        email: 'google@user.com',
        name: 'Usuário Google',
        role: 'user',
        avatar: '/images/avatar-google.jpg',
        provider: 'google'
      };

      setUser(googleUser);
      localStorage.setItem('apocalypse_user', JSON.stringify(googleUser));
      
      return { success: true, user: googleUser };
    } catch (error) {
      return { success: false, error: 'Erro no login com Google' };
    }
  };

  const loginWithFacebook = async () => {
    try {
      // Simular login com Facebook
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const facebookUser = {
        id: Date.now(),
        email: 'facebook@user.com',
        name: 'Usuário Facebook',
        role: 'user',
        avatar: '/images/avatar-facebook.jpg',
        provider: 'facebook'
      };

      setUser(facebookUser);
      localStorage.setItem('apocalypse_user', JSON.stringify(facebookUser));
      
      return { success: true, user: facebookUser };
    } catch (error) {
      return { success: false, error: 'Erro no login com Facebook' };
    }
  };

  const register = async (userData) => {
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Verificar se email já existe
      const existingUser = TEST_USERS.find(u => u.email === userData.email);
      if (existingUser) {
        throw new Error('Este email já está cadastrado');
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        role: 'user',
        avatar: '/images/avatar-default.jpg'
      };

      setUser(newUser);
      localStorage.setItem('apocalypse_user', JSON.stringify(newUser));
      
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('apocalypse_user');
  };

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    loginWithFacebook,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isPremium: user?.role === 'premium' || user?.role === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook para usar o contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}

// Componente de proteção de rotas
export function ProtectedRoute({ children, requireAdmin = false, requirePremium = false }) {
  const { user, loading, isAdmin, isPremium } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Carregando...</div>
      </div>
    );
  }

  if (!user) {
    // Redirecionar para login se não estiver autenticado
    if (typeof window !== 'undefined') {
      window.location.href = '/entrar';
    }
    return null;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Acesso negado. Apenas administradores.</div>
      </div>
    );
  }

  if (requirePremium && !isPremium) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Acesso negado. Apenas usuários premium.</div>
      </div>
    );
  }

  return children;
}

export default AuthContext;

