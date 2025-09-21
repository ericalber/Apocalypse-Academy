/**
 * Testes para UserService
 */

import UserService from '../../services/UserService.js';
import UserRepository from '../../repositories/UserRepository.js';

// Mock do UserRepository
jest.mock('../../repositories/UserRepository.js');

describe('UserService', () => {
  let userService;
  let mockUserRepository;

  beforeEach(() => {
    // Criar mock do repository
    mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      validateCredentials: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      updateLastLogin: jest.fn(),
      updateProgress: jest.fn(),
      hasPermission: jest.fn(),
      hasActiveSubscription: jest.fn(),
      findAll: jest.fn(),
      delete: jest.fn()
    };

    // Configurar mock do constructor
    UserRepository.mockImplementation(() => mockUserRepository);

    userService = new UserService();
  });

  describe('authenticate', () => {
    it('deve autenticar usuário com credenciais válidas', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123',
        role: 'member'
      };

      mockUserRepository.validateCredentials.mockResolvedValue(mockUser);
      mockUserRepository.updateLastLogin.mockResolvedValue(mockUser);

      const result = await userService.authenticate('test@test.com', 'password123');

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.password).toBeUndefined(); // Senha deve ser removida
      expect(result.token).toBeDefined();
      expect(mockUserRepository.validateCredentials).toHaveBeenCalledWith('test@test.com', 'password123');
      expect(mockUserRepository.updateLastLogin).toHaveBeenCalledWith('1');
    });

    it('deve rejeitar credenciais inválidas', async () => {
      mockUserRepository.validateCredentials.mockResolvedValue(null);

      const result = await userService.authenticate('test@test.com', 'senhaerrada');

      expect(result.success).toBe(false);
      expect(result.user).toBeNull();
      expect(result.token).toBeNull();
      expect(result.message).toBe('Credenciais inválidas');
    });

    it('deve validar email obrigatório', async () => {
      const result = await userService.authenticate('', 'password123');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email e senha são obrigatórios');
    });

    it('deve validar formato do email', async () => {
      const result = await userService.authenticate('emailinvalido', 'password123');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email inválido');
    });

    it('deve rejeitar conta suspensa', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        status: 'suspended'
      };

      mockUserRepository.validateCredentials.mockResolvedValue(mockUser);

      const result = await userService.authenticate('test@test.com', 'password123');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Conta suspensa. Entre em contato com o suporte.');
    });
  });

  describe('register', () => {
    it('deve registrar novo usuário com dados válidos', async () => {
      const userData = {
        name: 'Novo Usuário',
        email: 'novo@test.com',
        password: 'senha123'
      };

      const mockNewUser = {
        id: '2',
        ...userData,
        role: 'member'
      };

      mockUserRepository.findByEmail.mockResolvedValue(null); // Email não existe
      mockUserRepository.create.mockResolvedValue(mockNewUser);

      const result = await userService.register(userData);

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.password).toBeUndefined(); // Senha deve ser removida
      expect(result.token).toBeDefined();
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        name: 'Novo Usuário',
        email: 'novo@test.com',
        password: 'senha123',
        language: 'pt-BR'
      });
    });

    it('deve rejeitar email já existente', async () => {
      const userData = {
        name: 'Usuário',
        email: 'existente@test.com',
        password: 'senha123'
      };

      const existingUser = { id: '1', email: 'existente@test.com' };
      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      const result = await userService.register(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Este email já está cadastrado');
    });

    it('deve validar dados obrigatórios', async () => {
      const userData = {
        name: '', // Nome vazio
        email: 'test@test.com',
        password: 'senha123'
      };

      const result = await userService.register(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Nome deve ter pelo menos 2 caracteres');
    });

    it('deve validar formato do email', async () => {
      const userData = {
        name: 'Usuário',
        email: 'emailinvalido',
        password: 'senha123'
      };

      const result = await userService.register(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email inválido');
    });

    it('deve validar senha mínima', async () => {
      const userData = {
        name: 'Usuário',
        email: 'test@test.com',
        password: '123' // Muito curta
      };

      const result = await userService.register(userData);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Senha deve ter pelo menos 6 caracteres');
    });
  });

  describe('getProfile', () => {
    it('deve retornar perfil do usuário', async () => {
      const mockUser = {
        id: '1',
        name: 'Test User',
        email: 'test@test.com',
        password: 'password123'
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.getProfile('1');

      expect(result.success).toBe(true);
      expect(result.user).toBeDefined();
      expect(result.user.password).toBeUndefined(); // Senha deve ser removida
      expect(mockUserRepository.findById).toHaveBeenCalledWith('1');
    });

    it('deve rejeitar usuário inexistente', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      const result = await userService.getProfile('999');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Usuário não encontrado');
    });
  });

  describe('updateProfile', () => {
    it('deve atualizar perfil com dados válidos', async () => {
      const updates = {
        name: 'Nome Atualizado',
        email: 'novo@test.com'
      };

      const updatedUser = {
        id: '1',
        name: 'Nome Atualizado',
        email: 'novo@test.com'
      };

      mockUserRepository.findByEmail.mockResolvedValue(null); // Email não existe
      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await userService.updateProfile('1', updates);

      expect(result.success).toBe(true);
      expect(result.user.name).toBe('Nome Atualizado');
      expect(mockUserRepository.update).toHaveBeenCalledWith('1', {
        name: 'Nome Atualizado',
        email: 'novo@test.com'
      });
    });

    it('deve rejeitar email já em uso por outro usuário', async () => {
      const updates = { email: 'existente@test.com' };
      const existingUser = { id: '2', email: 'existente@test.com' };

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      const result = await userService.updateProfile('1', updates);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Este email já está em uso');
    });

    it('deve permitir manter o mesmo email', async () => {
      const updates = { name: 'Novo Nome' };
      const updatedUser = { id: '1', name: 'Novo Nome', email: 'test@test.com' };

      mockUserRepository.update.mockResolvedValue(updatedUser);

      const result = await userService.updateProfile('1', updates);

      expect(result.success).toBe(true);
    });
  });

  describe('changePassword', () => {
    it('deve alterar senha com dados válidos', async () => {
      const mockUser = {
        id: '1',
        password: 'senhaatual'
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.update.mockResolvedValue(mockUser);

      const result = await userService.changePassword('1', 'senhaatual', 'novasenha123');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Senha alterada com sucesso');
      expect(mockUserRepository.update).toHaveBeenCalledWith('1', {
        password: 'novasenha123'
      });
    });

    it('deve rejeitar senha atual incorreta', async () => {
      const mockUser = {
        id: '1',
        password: 'senhaatual'
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.changePassword('1', 'senhaerrada', 'novasenha123');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Senha atual incorreta');
    });

    it('deve validar nova senha', async () => {
      const mockUser = {
        id: '1',
        password: 'senhaatual'
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await userService.changePassword('1', 'senhaatual', '123'); // Muito curta

      expect(result.success).toBe(false);
      expect(result.message).toBe('Nova senha deve ter pelo menos 6 caracteres');
    });
  });

  describe('updateProgress', () => {
    it('deve atualizar progresso com dados válidos', async () => {
      const mockUser = { id: '1', progress: { coursesCompleted: 5 } };
      const progressData = { coursesCompleted: 8, totalWatchTime: 300 };
      const updatedUser = { ...mockUser, progress: progressData };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.updateProgress.mockResolvedValue(updatedUser);

      const result = await userService.updateProgress('1', progressData);

      expect(result.success).toBe(true);
      expect(result.progress.coursesCompleted).toBe(8);
      expect(mockUserRepository.updateProgress).toHaveBeenCalledWith('1', progressData);
    });

    it('deve filtrar dados inválidos', async () => {
      const mockUser = { id: '1', progress: {} };
      const progressData = {
        coursesCompleted: 5,
        invalidField: 'invalid', // Campo inválido
        totalWatchTime: -10 // Valor inválido
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.updateProgress.mockResolvedValue(mockUser);

      const result = await userService.updateProgress('1', progressData);

      expect(result.success).toBe(true);
      // Deve ter filtrado apenas campos válidos
      expect(mockUserRepository.updateProgress).toHaveBeenCalledWith('1', {
        coursesCompleted: 5
        // totalWatchTime e invalidField devem ser filtrados
      });
    });
  });

  describe('checkPermission', () => {
    it('deve verificar permissão do usuário', async () => {
      mockUserRepository.hasPermission.mockResolvedValue(true);

      const result = await userService.checkPermission('1', 'read');

      expect(result.success).toBe(true);
      expect(result.hasPermission).toBe(true);
      expect(mockUserRepository.hasPermission).toHaveBeenCalledWith('1', 'read');
    });

    it('deve retornar false para permissão negada', async () => {
      mockUserRepository.hasPermission.mockResolvedValue(false);

      const result = await userService.checkPermission('1', 'admin');

      expect(result.success).toBe(true);
      expect(result.hasPermission).toBe(false);
    });
  });

  describe('checkSubscriptionStatus', () => {
    it('deve retornar status da assinatura', async () => {
      const mockUser = {
        id: '1',
        subscription: {
          status: 'active',
          plan: 'premium',
          expiresAt: new Date('2024-12-31')
        }
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);

      const result = await userService.checkSubscriptionStatus('1');

      expect(result.success).toBe(true);
      expect(result.subscription.isActive).toBe(true);
      expect(result.subscription.status).toBe('active');
      expect(result.subscription.daysRemaining).toBeGreaterThanOrEqual(0);
    });

    it('deve calcular dias restantes corretamente', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const mockUser = {
        id: '1',
        subscription: {
          status: 'active',
          expiresAt: tomorrow
        }
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);

      const result = await userService.checkSubscriptionStatus('1');

      expect(result.subscription.daysRemaining).toBe(1);
    });

    it('deve identificar necessidade de renovação', async () => {
      const in5Days = new Date();
      in5Days.setDate(in5Days.getDate() + 5);

      const mockUser = {
        id: '1',
        subscription: {
          status: 'active',
          expiresAt: in5Days
        }
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);

      const result = await userService.checkSubscriptionStatus('1');

      expect(result.subscription.needsRenewal).toBe(true);
    });
  });

  describe('Validações', () => {
    describe('isValidEmail', () => {
      it('deve validar emails corretos', () => {
        expect(userService.isValidEmail('test@test.com')).toBe(true);
        expect(userService.isValidEmail('user.name+tag@domain.co.uk')).toBe(true);
      });

      it('deve rejeitar emails incorretos', () => {
        expect(userService.isValidEmail('emailinvalido')).toBe(false);
        expect(userService.isValidEmail('test@')).toBe(false);
        expect(userService.isValidEmail('@test.com')).toBe(false);
      });
    });

    describe('isValidPassword', () => {
      it('deve validar senhas corretas', () => {
        expect(userService.isValidPassword('senha123')).toBe(true);
        expect(userService.isValidPassword('123456')).toBe(true);
      });

      it('deve rejeitar senhas incorretas', () => {
        expect(userService.isValidPassword('123')).toBe(false);
        expect(userService.isValidPassword('')).toBe(false);
        expect(userService.isValidPassword('   ')).toBe(false); // Apenas espaços
        expect(userService.isValidPassword(null)).toBe(false);
        expect(userService.isValidPassword(undefined)).toBe(false);
      });
    });

    describe('validateUserData', () => {
      it('deve validar dados corretos', () => {
        const userData = {
          name: 'Nome Válido',
          email: 'test@test.com',
          password: 'senha123'
        };

        const result = userService.validateUserData(userData);
        expect(result.valid).toBe(true);
      });

      it('deve rejeitar nome muito curto', () => {
        const userData = {
          name: 'A',
          email: 'test@test.com',
          password: 'senha123'
        };

        const result = userService.validateUserData(userData);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Nome deve ter pelo menos 2 caracteres');
      });
    });
  });

  describe('Token Management', () => {
    describe('generateToken', () => {
      it('deve gerar token válido', () => {
        const token = userService.generateToken('123');
        
        expect(token).toMatch(/^token_123_\d+$/);
      });
    });

    describe('validateToken', () => {
      it('deve validar token válido', () => {
        const token = userService.generateToken('123');
        const validation = userService.validateToken(token);
        
        expect(validation.valid).toBe(true);
        expect(validation.userId).toBe('123');
      });

      it('deve rejeitar token inválido', () => {
        const validation = userService.validateToken('token_invalido');
        
        expect(validation.valid).toBe(false);
        expect(validation.userId).toBeNull();
      });

      it('deve rejeitar token expirado', () => {
        // Simular token antigo
        const oldToken = `token_123_${Date.now() - 25 * 60 * 60 * 1000}`; // 25 horas atrás
        const validation = userService.validateToken(oldToken);
        
        expect(validation.valid).toBe(false);
        expect(validation.userId).toBeNull();
      });
    });
  });
});

