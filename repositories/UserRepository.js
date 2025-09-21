/**
 * UserRepository - Camada de acesso a dados para usuários
 * Isola os dados mockados e expõe interface consistente
 */

class UserRepository {
  constructor(dataSource = null) {
    // Dados mockados - serão substituídos por banco real no futuro
    this.users = dataSource || [
      {
        id: '1',
        name: 'Administrador',
        email: 'admin@apocalypse.academy',
        password: 'admin123',
        role: 'admin',
        avatar: '/images/avatars/admin.jpg',
        subscription: {
          status: 'active',
          plan: 'premium',
          expiresAt: new Date('2024-12-31')
        },
        profile: {
          joinedAt: new Date('2023-01-01'),
          lastLogin: new Date(),
          preferences: {
            language: 'pt-BR',
            notifications: true,
            autoplay: true
          }
        },
        progress: {
          coursesCompleted: 12,
          totalWatchTime: 156 * 60, // em minutos
          certificatesEarned: 8,
          currentStreak: 15
        }
      },
      {
        id: '2',
        name: 'Membro Apocalypse',
        email: 'membro@apocalypse.academy',
        password: 'membro123',
        role: 'member',
        avatar: '/images/avatars/member.jpg',
        subscription: {
          status: 'active',
          plan: 'basic',
          expiresAt: new Date('2024-06-30')
        },
        profile: {
          joinedAt: new Date('2023-06-15'),
          lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 dia atrás
          preferences: {
            language: 'pt-BR',
            notifications: true,
            autoplay: false
          }
        },
        progress: {
          coursesCompleted: 5,
          totalWatchTime: 78 * 60,
          certificatesEarned: 3,
          currentStreak: 7
        }
      },
      {
        id: '3',
        name: 'Usuário Teste',
        email: 'teste@apocalypse.academy',
        password: 'teste123',
        role: 'member',
        avatar: '/images/avatars/default.jpg',
        subscription: {
          status: 'trial',
          plan: 'trial',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 dias
        },
        profile: {
          joinedAt: new Date(),
          lastLogin: new Date(),
          preferences: {
            language: 'pt-BR',
            notifications: false,
            autoplay: true
          }
        },
        progress: {
          coursesCompleted: 0,
          totalWatchTime: 0,
          certificatesEarned: 0,
          currentStreak: 0
        }
      }
    ];
  }

  /**
   * Buscar usuário por ID
   */
  async findById(id) {
    try {
      const user = this.users.find(u => u.id === id);
      return user ? { ...user } : null; // Retorna cópia para evitar mutação
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por ID: ${error.message}`);
    }
  }

  /**
   * Buscar usuário por email
   */
  async findByEmail(email) {
    try {
      const user = this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      return user ? { ...user } : null;
    } catch (error) {
      throw new Error(`Erro ao buscar usuário por email: ${error.message}`);
    }
  }

  /**
   * Validar credenciais de login
   */
  async validateCredentials(email, password) {
    try {
      const user = await this.findByEmail(email);
      if (!user) {
        return null;
      }

      // Em produção, usar hash/bcrypt
      const isValidPassword = user.password === password;
      return isValidPassword ? { ...user } : null;
    } catch (error) {
      throw new Error(`Erro ao validar credenciais: ${error.message}`);
    }
  }

  /**
   * Criar novo usuário
   */
  async create(userData) {
    try {
      // Verificar se email já existe
      const existingUser = await this.findByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email já está em uso');
      }

      const newUser = {
        id: Date.now().toString(), // Em produção, usar UUID
        name: userData.name,
        email: userData.email.toLowerCase(),
        password: userData.password, // Em produção, fazer hash
        role: userData.role || 'member',
        avatar: userData.avatar || '/images/avatars/default.jpg',
        subscription: {
          status: 'trial',
          plan: 'trial',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        profile: {
          joinedAt: new Date(),
          lastLogin: new Date(),
          preferences: {
            language: userData.language || 'pt-BR',
            notifications: true,
            autoplay: true
          }
        },
        progress: {
          coursesCompleted: 0,
          totalWatchTime: 0,
          certificatesEarned: 0,
          currentStreak: 0
        }
      };

      this.users.push(newUser);
      return { ...newUser };
    } catch (error) {
      throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
  }

  /**
   * Atualizar usuário
   */
  async update(id, updates) {
    try {
      const userIndex = this.users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('Usuário não encontrado');
      }

      // Merge dos dados, preservando estrutura aninhada
      const currentUser = this.users[userIndex];
      const updatedUser = {
        ...currentUser,
        ...updates,
        profile: {
          ...currentUser.profile,
          ...(updates.profile || {})
        },
        subscription: {
          ...currentUser.subscription,
          ...(updates.subscription || {})
        },
        progress: {
          ...currentUser.progress,
          ...(updates.progress || {})
        }
      };

      this.users[userIndex] = updatedUser;
      return { ...updatedUser };
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }

  /**
   * Atualizar último login
   */
  async updateLastLogin(id) {
    try {
      return await this.update(id, {
        profile: {
          lastLogin: new Date()
        }
      });
    } catch (error) {
      throw new Error(`Erro ao atualizar último login: ${error.message}`);
    }
  }

  /**
   * Atualizar progresso do usuário
   */
  async updateProgress(id, progressData) {
    try {
      const user = await this.findById(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const newProgress = {
        ...user.progress,
        ...progressData
      };

      return await this.update(id, { progress: newProgress });
    } catch (error) {
      throw new Error(`Erro ao atualizar progresso: ${error.message}`);
    }
  }

  /**
   * Listar todos os usuários (admin)
   */
  async findAll(filters = {}) {
    try {
      let filteredUsers = [...this.users];

      // Filtro por role
      if (filters.role) {
        filteredUsers = filteredUsers.filter(u => u.role === filters.role);
      }

      // Filtro por status de assinatura
      if (filters.subscriptionStatus) {
        filteredUsers = filteredUsers.filter(u => u.subscription.status === filters.subscriptionStatus);
      }

      // Paginação
      if (filters.page && filters.limit) {
        const start = (filters.page - 1) * filters.limit;
        const end = start + filters.limit;
        filteredUsers = filteredUsers.slice(start, end);
      }

      return filteredUsers.map(user => ({ ...user }));
    } catch (error) {
      throw new Error(`Erro ao listar usuários: ${error.message}`);
    }
  }

  /**
   * Deletar usuário
   */
  async delete(id) {
    try {
      const userIndex = this.users.findIndex(u => u.id === id);
      if (userIndex === -1) {
        throw new Error('Usuário não encontrado');
      }

      const deletedUser = this.users.splice(userIndex, 1)[0];
      return { ...deletedUser };
    } catch (error) {
      throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
  }

  /**
   * Verificar se usuário tem permissão
   */
  async hasPermission(id, permission) {
    try {
      const user = await this.findById(id);
      if (!user) {
        return false;
      }

      // Lógica de permissões baseada no role
      const permissions = {
        admin: ['read', 'write', 'delete', 'manage_users', 'manage_content'],
        member: ['read', 'write_own'],
        trial: ['read_limited']
      };

      return permissions[user.role]?.includes(permission) || false;
    } catch (error) {
      throw new Error(`Erro ao verificar permissão: ${error.message}`);
    }
  }

  /**
   * Verificar se assinatura está ativa
   */
  async hasActiveSubscription(id) {
    try {
      const user = await this.findById(id);
      if (!user) {
        return false;
      }

      const { status, expiresAt } = user.subscription;
      const now = new Date();

      return status === 'active' && new Date(expiresAt) > now;
    } catch (error) {
      throw new Error(`Erro ao verificar assinatura: ${error.message}`);
    }
  }
}

export default UserRepository;

