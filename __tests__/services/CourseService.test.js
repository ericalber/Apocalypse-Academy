/**
 * Testes para CourseService
 */

import CourseService from '../../services/CourseService.js';
import CourseRepository from '../../repositories/CourseRepository.js';
import UserRepository from '../../repositories/UserRepository.js';

// Mock dos repositories
jest.mock('../../repositories/CourseRepository.js');
jest.mock('../../repositories/UserRepository.js');

describe('CourseService', () => {
  let courseService;
  let mockCourseRepository;
  let mockUserRepository;

  beforeEach(() => {
    // Criar mocks dos repositories
    mockCourseRepository = {
      findById: jest.fn(),
      findBySlug: jest.fn(),
      findAll: jest.fn(),
      findFeatured: jest.fn(),
      findByCategory: jest.fn(),
      updateProgress: jest.fn(),
      completeLesson: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      getStats: jest.fn()
    };

    mockUserRepository = {
      findById: jest.fn(),
      hasActiveSubscription: jest.fn(),
      updateProgress: jest.fn()
    };

    // Configurar mocks dos constructors
    CourseRepository.mockImplementation(() => mockCourseRepository);
    UserRepository.mockImplementation(() => mockUserRepository);

    courseService = new CourseService();
  });

  describe('getCourse', () => {
    const mockCourse = {
      id: '1',
      title: 'Curso Teste',
      slug: 'curso-teste',
      isPremium: false,
      progress: 0
    };

    it('deve retornar curso público sem usuário', async () => {
      mockCourseRepository.findById.mockResolvedValue(mockCourse);

      const result = await courseService.getCourse('1');

      expect(result.success).toBe(true);
      expect(result.course.hasAccess).toBe(true);
      expect(result.course.accessLevel).toBe('preview');
    });

    it('deve retornar curso premium sem acesso para usuário não logado', async () => {
      const premiumCourse = { ...mockCourse, isPremium: true };
      mockCourseRepository.findById.mockResolvedValue(premiumCourse);

      const result = await courseService.getCourse('1');

      expect(result.success).toBe(true);
      expect(result.course.hasAccess).toBe(false);
      expect(result.course.accessLevel).toBe('none');
    });

    it('deve verificar acesso para usuário logado', async () => {
      const premiumCourse = { ...mockCourse, isPremium: true };
      const mockUser = { id: '1', role: 'member' };

      mockCourseRepository.findById.mockResolvedValue(premiumCourse);
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);

      const result = await courseService.getCourse('1', '1');

      expect(result.success).toBe(true);
      expect(result.course.hasAccess).toBe(true);
      expect(result.course.accessLevel).toBe('full');
    });

    it('deve retornar erro para curso inexistente', async () => {
      mockCourseRepository.findById.mockResolvedValue(null);

      const result = await courseService.getCourse('999');

      expect(result.success).toBe(false);
      expect(result.course).toBeNull();
      expect(result.message).toBe('Curso não encontrado');
    });
  });

  describe('getCourseBySlug', () => {
    it('deve buscar curso por slug', async () => {
      const mockCourse = {
        id: '1',
        title: 'Curso Teste',
        slug: 'curso-teste',
        isPremium: false
      };

      mockCourseRepository.findBySlug.mockResolvedValue(mockCourse);
      mockCourseRepository.findById.mockResolvedValue(mockCourse);

      const result = await courseService.getCourseBySlug('curso-teste');

      expect(result.success).toBe(true);
      expect(result.course.slug).toBe('curso-teste');
      expect(mockCourseRepository.findBySlug).toHaveBeenCalledWith('curso-teste');
    });

    it('deve retornar erro para slug inexistente', async () => {
      mockCourseRepository.findBySlug.mockResolvedValue(null);

      const result = await courseService.getCourseBySlug('slug-inexistente');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Curso não encontrado');
    });
  });

  describe('listCourses', () => {
    const mockCourses = [
      {
        id: '1',
        title: 'Curso Gratuito',
        isPremium: false
      },
      {
        id: '2',
        title: 'Curso Premium',
        isPremium: true
      }
    ];

    it('deve listar cursos com verificação de acesso', async () => {
      mockCourseRepository.findAll.mockResolvedValue(mockCourses);

      const result = await courseService.listCourses();

      expect(result.success).toBe(true);
      expect(result.courses).toHaveLength(2);
      expect(result.courses[0].hasAccess).toBe(true); // Curso gratuito
      expect(result.courses[1].hasAccess).toBe(false); // Curso premium sem usuário
    });

    it('deve aplicar filtros', async () => {
      const filters = { category: 'escatologia' };
      mockCourseRepository.findAll.mockResolvedValue([mockCourses[0]]);

      const result = await courseService.listCourses(filters);

      expect(mockCourseRepository.findAll).toHaveBeenCalledWith(filters);
      expect(result.courses).toHaveLength(1);
    });
  });

  describe('getFeaturedCourses', () => {
    it('deve buscar cursos em destaque', async () => {
      const featuredCourses = [
        { id: '1', title: 'Curso Destaque 1', isPremium: false },
        { id: '2', title: 'Curso Destaque 2', isPremium: true }
      ];

      mockCourseRepository.findFeatured.mockResolvedValue(featuredCourses);

      const result = await courseService.getFeaturedCourses(2);

      expect(result.success).toBe(true);
      expect(result.courses).toHaveLength(2);
      expect(mockCourseRepository.findFeatured).toHaveBeenCalledWith(2);
    });

    it('deve usar limite padrão', async () => {
      mockCourseRepository.findFeatured.mockResolvedValue([]);

      await courseService.getFeaturedCourses();

      expect(mockCourseRepository.findFeatured).toHaveBeenCalledWith(6);
    });
  });

  describe('getCoursesByCategory', () => {
    it('deve buscar cursos por categoria', async () => {
      const categoryCourses = [
        { id: '1', title: 'Curso Escatologia', category: 'escatologia', isPremium: false }
      ];

      mockCourseRepository.findByCategory.mockResolvedValue(categoryCourses);

      const result = await courseService.getCoursesByCategory('escatologia', 10);

      expect(result.success).toBe(true);
      expect(result.courses).toHaveLength(1);
      expect(result.category).toBe('escatologia');
      expect(mockCourseRepository.findByCategory).toHaveBeenCalledWith('escatologia', 10);
    });
  });

  describe('getUserCourses', () => {
    it('deve buscar cursos do usuário', async () => {
      const mockUser = { id: '1', name: 'Test User' };
      const userCourses = [
        { id: '1', title: 'Curso em Andamento', progress: 50 },
        { id: '2', title: 'Curso Iniciado', progress: 10 }
      ];

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockCourseRepository.findAll.mockResolvedValue([
        ...userCourses,
        { id: '3', title: 'Curso Não Iniciado', progress: 0 },
        { id: '4', title: 'Curso Completo', progress: 100 }
      ]);

      const result = await courseService.getUserCourses('1');

      expect(result.success).toBe(true);
      expect(result.courses).toHaveLength(2); // Apenas cursos em andamento (0 < progress < 100)
    });

    it('deve retornar erro para usuário inexistente', async () => {
      mockUserRepository.findById.mockResolvedValue(null);

      const result = await courseService.getUserCourses('999');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Usuário não encontrado');
    });
  });

  describe('startCourse', () => {
    it('deve iniciar curso com acesso válido', async () => {
      const mockCourse = {
        id: '1',
        title: 'Curso Teste',
        progress: 0,
        isPremium: false
      };

      const mockUser = { 
        id: '1', 
        role: 'member',
        progress: { totalWatchTime: 0 }
      };
      const updatedCourse = { ...mockCourse, progress: 1 };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);
      mockCourseRepository.findById.mockResolvedValue(mockCourse);
      mockCourseRepository.updateProgress.mockResolvedValue(updatedCourse);
      mockUserRepository.updateProgress.mockResolvedValue(mockUser);

      const result = await courseService.startCourse('1', '1');

      expect(result.success).toBe(true);
      expect(result.course.progress).toBe(1);
      expect(result.message).toBe('Curso iniciado com sucesso');
    });

    it('deve retornar curso já iniciado', async () => {
      const mockCourse = {
        id: '1',
        title: 'Curso Teste',
        progress: 50 // Já iniciado
      };

      const mockUser = { id: '1', role: 'member' };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);
      mockCourseRepository.findById.mockResolvedValue(mockCourse);

      const result = await courseService.startCourse('1', '1');

      expect(result.success).toBe(true);
      expect(result.message).toBe('Curso já foi iniciado');
    });

    it('deve rejeitar acesso negado', async () => {
      const mockUser = { id: '1', role: 'member' };
      const premiumCourse = { id: '1', isPremium: true };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(false);
      mockCourseRepository.findById.mockResolvedValue(premiumCourse);

      const result = await courseService.startCourse('1', '1');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Acesso negado ao curso');
    });
  });

  describe('completeLesson', () => {
    it('deve completar aula com sucesso', async () => {
      const mockUser = {
        id: '1',
        progress: {
          totalWatchTime: 100,
          coursesCompleted: 0,
          certificatesEarned: 0
        }
      };

      const updatedCourse = {
        id: '1',
        progress: 75 // Não completou o curso ainda
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);
      mockCourseRepository.findById.mockResolvedValue({ id: '1', isPremium: false });
      mockCourseRepository.completeLesson.mockResolvedValue(updatedCourse);
      mockUserRepository.updateProgress.mockResolvedValue(mockUser);

      const result = await courseService.completeLesson('1', 'chapter1', '1', 30);

      expect(result.success).toBe(true);
      expect(result.lessonCompleted).toBe(true);
      expect(result.courseCompleted).toBe(false);
      expect(mockUserRepository.updateProgress).toHaveBeenCalledWith('1', {
        totalWatchTime: 130 // 100 + 30
      });
    });

    it('deve completar curso e conceder certificado', async () => {
      const mockUser = {
        id: '1',
        progress: {
          totalWatchTime: 100,
          coursesCompleted: 5,
          certificatesEarned: 2
        }
      };

      const completedCourse = {
        id: '1',
        progress: 100,
        isPremium: true // Curso premium ganha certificado
      };

      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);
      mockCourseRepository.findById.mockResolvedValue({ id: '1', isPremium: true });
      mockCourseRepository.completeLesson.mockResolvedValue(completedCourse);
      mockUserRepository.updateProgress.mockResolvedValue(mockUser);

      const result = await courseService.completeLesson('1', 'chapter1', '1', 30);

      expect(result.success).toBe(true);
      expect(result.courseCompleted).toBe(true);
      expect(result.message).toBe('Parabéns! Curso concluído!');
      expect(mockUserRepository.updateProgress).toHaveBeenCalledWith('1', {
        totalWatchTime: 130,
        coursesCompleted: 6,
        certificatesEarned: 3
      });
    });
  });

  describe('getNextLesson', () => {
    it('deve retornar próxima aula', async () => {
      const mockCourse = {
        id: '1',
        chapters: [
          { id: 'ch1', isCompleted: true, isCurrentLesson: false },
          { id: 'ch2', isCompleted: false, isCurrentLesson: true },
          { id: 'ch3', isCompleted: false, isCurrentLesson: false }
        ]
      };

      mockCourseRepository.findById.mockResolvedValue(mockCourse);

      const result = await courseService.getNextLesson('1', '1');

      expect(result.success).toBe(true);
      expect(result.currentLesson.id).toBe('ch2');
      expect(result.nextLesson.id).toBe('ch2'); // Primeira não completada
      expect(result.hasNextLesson).toBe(true);
    });

    it('deve indicar quando não há próxima aula', async () => {
      const mockCourse = {
        id: '1',
        chapters: [
          { id: 'ch1', isCompleted: true, isCurrentLesson: false },
          { id: 'ch2', isCompleted: true, isCurrentLesson: true }
        ]
      };

      mockCourseRepository.findById.mockResolvedValue(mockCourse);

      const result = await courseService.getNextLesson('1', '1');

      expect(result.success).toBe(true);
      expect(result.hasNextLesson).toBe(false);
    });
  });

  describe('checkCourseAccess', () => {
    it('deve permitir acesso a curso gratuito', async () => {
      const freeCourse = { id: '1', isPremium: false };
      const mockUser = { id: '1', role: 'member' };

      mockCourseRepository.findById.mockResolvedValue(freeCourse);
      mockUserRepository.findById.mockResolvedValue(mockUser);

      const result = await courseService.checkCourseAccess('1', '1');

      expect(result.hasAccess).toBe(true);
      expect(result.accessLevel).toBe('full');
      expect(result.reason).toBe('Curso gratuito');
    });

    it('deve permitir acesso com assinatura ativa', async () => {
      const premiumCourse = { id: '1', isPremium: true };
      const mockUser = { id: '1', role: 'member' };

      mockCourseRepository.findById.mockResolvedValue(premiumCourse);
      mockUserRepository.findById.mockResolvedValue(mockUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(true);

      const result = await courseService.checkCourseAccess('1', '1');

      expect(result.hasAccess).toBe(true);
      expect(result.accessLevel).toBe('full');
      expect(result.reason).toBe('Assinatura ativa');
    });

    it('deve permitir acesso de admin', async () => {
      const premiumCourse = { id: '1', isPremium: true };
      const adminUser = { id: '1', role: 'admin' };

      mockCourseRepository.findById.mockResolvedValue(premiumCourse);
      mockUserRepository.findById.mockResolvedValue(adminUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(false);

      const result = await courseService.checkCourseAccess('1', '1');

      expect(result.hasAccess).toBe(true);
      expect(result.accessLevel).toBe('full');
      expect(result.reason).toBe('Usuário administrador');
    });

    it('deve dar acesso limitado para trial', async () => {
      const premiumCourse = { id: '1', isPremium: true };
      const trialUser = {
        id: '1',
        role: 'member',
        subscription: { status: 'trial' }
      };

      mockCourseRepository.findById.mockResolvedValue(premiumCourse);
      mockUserRepository.findById.mockResolvedValue(trialUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(false);

      const result = await courseService.checkCourseAccess('1', '1');

      expect(result.hasAccess).toBe(true);
      expect(result.accessLevel).toBe('preview');
      expect(result.reason).toBe('Período trial');
    });

    it('deve negar acesso sem assinatura', async () => {
      const premiumCourse = { id: '1', isPremium: true };
      const regularUser = {
        id: '1',
        role: 'member',
        subscription: { status: 'inactive' }
      };

      mockCourseRepository.findById.mockResolvedValue(premiumCourse);
      mockUserRepository.findById.mockResolvedValue(regularUser);
      mockUserRepository.hasActiveSubscription.mockResolvedValue(false);

      const result = await courseService.checkCourseAccess('1', '1');

      expect(result.hasAccess).toBe(false);
      expect(result.accessLevel).toBe('none');
      expect(result.reason).toBe('Assinatura necessária');
    });
  });

  describe('createCourse', () => {
    it('deve criar curso com permissão de admin', async () => {
      const courseData = {
        title: 'Novo Curso',
        slug: 'novo-curso',
        description: 'Descrição do curso',
        category: 'escatologia',
        instructor: { name: 'Instrutor' }
      };

      const adminUser = { id: '1', role: 'admin' };
      const newCourse = { id: '2', ...courseData };

      mockUserRepository.findById.mockResolvedValue(adminUser);
      mockCourseRepository.create.mockResolvedValue(newCourse);

      const result = await courseService.createCourse(courseData, '1');

      expect(result.success).toBe(true);
      expect(result.course.title).toBe('Novo Curso');
      expect(mockCourseRepository.create).toHaveBeenCalledWith(courseData);
    });

    it('deve rejeitar usuário sem permissão', async () => {
      const courseData = { title: 'Curso' };
      const regularUser = { id: '1', role: 'member' };

      mockUserRepository.findById.mockResolvedValue(regularUser);

      const result = await courseService.createCourse(courseData, '1');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Acesso negado');
    });

    it('deve validar dados do curso', async () => {
      const invalidCourseData = { title: 'A' }; // Título muito curto
      const adminUser = { id: '1', role: 'admin' };

      mockUserRepository.findById.mockResolvedValue(adminUser);

      const result = await courseService.createCourse(invalidCourseData, '1');

      expect(result.success).toBe(false);
      expect(result.message).toBe('Título deve ter pelo menos 3 caracteres');
    });
  });

  describe('Validações', () => {
    describe('validateCourseData', () => {
      it('deve validar dados corretos', () => {
        const validData = {
          title: 'Curso Válido',
          slug: 'curso-valido',
          description: 'Descrição válida do curso',
          category: 'escatologia',
          instructor: { name: 'Instrutor' }
        };

        const result = courseService.validateCourseData(validData);
        expect(result.valid).toBe(true);
      });

      it('deve rejeitar título muito curto', () => {
        const invalidData = {
          title: 'AB',
          slug: 'curso',
          description: 'Descrição',
          category: 'escatologia',
          instructor: { name: 'Instrutor' }
        };

        const result = courseService.validateCourseData(invalidData);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Título deve ter pelo menos 3 caracteres');
      });

      it('deve rejeitar descrição muito curta', () => {
        const invalidData = {
          title: 'Curso Válido',
          slug: 'curso-valido',
          description: 'Curta',
          category: 'escatologia',
          instructor: { name: 'Instrutor' }
        };

        const result = courseService.validateCourseData(invalidData);
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Descrição deve ter pelo menos 10 caracteres');
      });
    });

    describe('shouldAwardCertificate', () => {
      it('deve conceder certificado para curso premium completo', () => {
        const course = { progress: 100, isPremium: true };
        
        const result = courseService.shouldAwardCertificate(course);
        expect(result).toBe(true);
      });

      it('deve negar certificado para curso gratuito', () => {
        const course = { progress: 100, isPremium: false };
        
        const result = courseService.shouldAwardCertificate(course);
        expect(result).toBe(false);
      });

      it('deve negar certificado para curso incompleto', () => {
        const course = { progress: 50, isPremium: true };
        
        const result = courseService.shouldAwardCertificate(course);
        expect(result).toBe(false);
      });
    });
  });
});

