/**
 * Testes para UserRepository
 */

import UserRepository from '../../repositories/UserRepository.js';

describe('UserRepository', () => {
  let userRepository;
  let mockUsers;

  beforeEach(() => {
    // Dados mockados para testes
    mockUsers = [
      {
        id: '1',
        name: 'Admin Test',
        email: 'admin@test.com',
        password: 'admin123',
        role: 'admin',
        subscription: {
          status: 'active',
          plan: 'premium',
          expiresAt: new Date('2024-12-31')
        },
        progress: {
          coursesCompleted: 5,
          totalWatchTime: 300,
          certificatesEarned: 3,
          currentStreak: 10
        }
      },
      {
        id: '2',
        name: 'Member Test',
        email: 'member@test.com',
        password: 'member123',
        role: 'member',
        subscription: {
          status: 'trial',
          plan: 'trial',
          expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        },
        progress: {
          coursesCompleted: 0,
          totalWatchTime: 0,
          certificatesEarned: 0,
          currentStreak: 0
        }
      }
    ];

    userRepository = new UserRepository(mockUsers);
  });

  describe('findById', () => {
    it('deve retornar usuário quando ID existe', async () => {
      const user = await userRepository.findById('1');
      
      expect(user).toBeDefined();
      expect(user.id).toBe('1');
      expect(user.name).toBe('Admin Test');
    });

    it('deve retornar null quando ID não existe', async () => {
      const user = await userRepository.findById('999');
      
      expect(user).toBeNull();
    });

    it('deve retornar cópia do usuário (não referência)', async () => {
      const user1 = await userRepository.findById('1');
      const user2 = await userRepository.findById('1');
      
      expect(user1).toEqual(user2);
      expect(user1).not.toBe(user2); // Diferentes referências
    });
  });

  describe('findByEmail', () => {
    it('deve retornar usuário quando email existe', async () => {
      const user = await userRepository.findByEmail('admin@test.com');
      
      expect(user).toBeDefined();
      expect(user.email).toBe('admin@test.com');
    });

    it('deve ser case-insensitive', async () => {
      const user = await userRepository.findByEmail('ADMIN@TEST.COM');
      
      expect(user).toBeDefined();
      expect(user.email).toBe('admin@test.com');
    });

    it('deve retornar null quando email não existe', async () => {
      const user = await userRepository.findByEmail('inexistente@test.com');
      
      expect(user).toBeNull();
    });
  });

  describe('validateCredentials', () => {
    it('deve retornar usuário com credenciais válidas', async () => {
      const user = await userRepository.validateCredentials('admin@test.com', 'admin123');
      
      expect(user).toBeDefined();
      expect(user.email).toBe('admin@test.com');
    });

    it('deve retornar null com senha incorreta', async () => {
      const user = await userRepository.validateCredentials('admin@test.com', 'senhaerrada');
      
      expect(user).toBeNull();
    });

    it('deve retornar null com email inexistente', async () => {
      const user = await userRepository.validateCredentials('inexistente@test.com', 'qualquersenha');
      
      expect(user).toBeNull();
    });
  });

  describe('create', () => {
    it('deve criar novo usuário com dados válidos', async () => {
      const userData = {
        name: 'Novo Usuário',
        email: 'novo@test.com',
        password: 'senha123'
      };

      const newUser = await userRepository.create(userData);
      
      expect(newUser).toBeDefined();
      expect(newUser.name).toBe('Novo Usuário');
      expect(newUser.email).toBe('novo@test.com');
      expect(newUser.role).toBe('member'); // Padrão
      expect(newUser.subscription.status).toBe('trial'); // Padrão
    });

    it('deve rejeitar email duplicado', async () => {
      const userData = {
        name: 'Usuário Duplicado',
        email: 'admin@test.com', // Email já existe
        password: 'senha123'
      };

      await expect(userRepository.create(userData)).rejects.toThrow('Email já está em uso');
    });

    it('deve normalizar email para lowercase', async () => {
      const userData = {
        name: 'Teste Case',
        email: 'TESTE@CASE.COM',
        password: 'senha123'
      };

      const newUser = await userRepository.create(userData);
      
      expect(newUser.email).toBe('teste@case.com');
    });
  });

  describe('update', () => {
    it('deve atualizar usuário existente', async () => {
      const updates = {
        name: 'Nome Atualizado',
        profile: {
          preferences: {
            language: 'en'
          }
        }
      };

      const updatedUser = await userRepository.update('1', updates);
      
      expect(updatedUser.name).toBe('Nome Atualizado');
      expect(updatedUser.profile.preferences.language).toBe('en');
      // Deve preservar outros campos
      expect(updatedUser.email).toBe('admin@test.com');
    });

    it('deve rejeitar usuário inexistente', async () => {
      const updates = { name: 'Teste' };

      await expect(userRepository.update('999', updates)).rejects.toThrow('Usuário não encontrado');
    });

    it('deve fazer merge de objetos aninhados', async () => {
      const updates = {
        progress: {
          coursesCompleted: 10 // Atualizar apenas este campo
        }
      };

      const updatedUser = await userRepository.update('1', updates);
      
      expect(updatedUser.progress.coursesCompleted).toBe(10);
      // Deve preservar outros campos do progress
      expect(updatedUser.progress.totalWatchTime).toBe(300);
      expect(updatedUser.progress.certificatesEarned).toBe(3);
    });
  });

  describe('updateProgress', () => {
    it('deve atualizar progresso do usuário', async () => {
      const progressData = {
        coursesCompleted: 8,
        totalWatchTime: 500
      };

      const updatedUser = await userRepository.updateProgress('1', progressData);
      
      expect(updatedUser.progress.coursesCompleted).toBe(8);
      expect(updatedUser.progress.totalWatchTime).toBe(500);
      // Deve preservar outros campos
      expect(updatedUser.progress.certificatesEarned).toBe(3);
    });
  });

  describe('hasPermission', () => {
    it('deve retornar true para admin com qualquer permissão', async () => {
      const hasPermission = await userRepository.hasPermission('1', 'manage_users');
      
      expect(hasPermission).toBe(true);
    });

    it('deve retornar false para member com permissão de admin', async () => {
      const hasPermission = await userRepository.hasPermission('2', 'manage_users');
      
      expect(hasPermission).toBe(false);
    });

    it('deve retornar true para member com permissão básica', async () => {
      const hasPermission = await userRepository.hasPermission('2', 'read');
      
      expect(hasPermission).toBe(true);
    });

    it('deve retornar false para usuário inexistente', async () => {
      const hasPermission = await userRepository.hasPermission('999', 'read');
      
      expect(hasPermission).toBe(false);
    });
  });

  describe('hasActiveSubscription', () => {
    it('deve retornar true para assinatura ativa', async () => {
      // Garantir que a data de expiração seja no futuro
      const futureDate = new Date();
      futureDate.setFullYear(futureDate.getFullYear() + 1);
      mockUsers[0].subscription.expiresAt = futureDate;
      
      userRepository = new UserRepository(mockUsers);
      
      const hasActive = await userRepository.hasActiveSubscription('1');
      
      expect(hasActive).toBe(true);
    });

    it('deve retornar false para trial expirado', async () => {
      // Modificar data de expiração para o passado
      mockUsers[1].subscription.expiresAt = new Date('2020-01-01');
      userRepository = new UserRepository(mockUsers);

      const hasActive = await userRepository.hasActiveSubscription('2');
      
      expect(hasActive).toBe(false);
    });

    it('deve retornar false para usuário inexistente', async () => {
      const hasActive = await userRepository.hasActiveSubscription('999');
      
      expect(hasActive).toBe(false);
    });
  });

  describe('findAll', () => {
    it('deve retornar todos os usuários sem filtros', async () => {
      const users = await userRepository.findAll();
      
      expect(users).toHaveLength(2);
      expect(users[0].id).toBe('1');
      expect(users[1].id).toBe('2');
    });

    it('deve filtrar por role', async () => {
      const admins = await userRepository.findAll({ role: 'admin' });
      
      expect(admins).toHaveLength(1);
      expect(admins[0].role).toBe('admin');
    });

    it('deve filtrar por status de assinatura', async () => {
      const activeUsers = await userRepository.findAll({ subscriptionStatus: 'active' });
      
      expect(activeUsers).toHaveLength(1);
      expect(activeUsers[0].subscription.status).toBe('active');
    });

    it('deve aplicar paginação', async () => {
      const page1 = await userRepository.findAll({ page: 1, limit: 1 });
      
      expect(page1).toHaveLength(1);
      expect(page1[0].id).toBe('1');
    });
  });

  describe('delete', () => {
    it('deve deletar usuário existente', async () => {
      const deletedUser = await userRepository.delete('1');
      
      expect(deletedUser.id).toBe('1');
      
      // Verificar se foi removido
      const user = await userRepository.findById('1');
      expect(user).toBeNull();
    });

    it('deve rejeitar usuário inexistente', async () => {
      await expect(userRepository.delete('999')).rejects.toThrow('Usuário não encontrado');
    });
  });

  describe('Tratamento de erros', () => {
    it('deve tratar erros em findById', async () => {
      // Simular erro interno
      userRepository.users = null;

      await expect(userRepository.findById('1')).rejects.toThrow('Erro ao buscar usuário por ID');
    });

    it('deve tratar erros em create', async () => {
      // Simular erro interno
      userRepository.users = null;

      const userData = {
        name: 'Teste',
        email: 'teste@test.com',
        password: 'senha123'
      };

      await expect(userRepository.create(userData)).rejects.toThrow('Erro ao criar usuário');
    });
  });
});

