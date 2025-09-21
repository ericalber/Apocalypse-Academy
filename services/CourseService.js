/**
 * CourseService - Camada de lógica de negócio para cursos
 * Coordena repositórios e implementa regras de negócio
 */

import CourseRepository from '../repositories/CourseRepository.js';
import UserRepository from '../repositories/UserRepository.js';

class CourseService {
  constructor(courseRepository = null, userRepository = null) {
    this.courseRepository = courseRepository || new CourseRepository();
    this.userRepository = userRepository || new UserRepository();
  }

  /**
   * Buscar curso por ID com verificação de acesso
   */
  async getCourse(courseId, userId = null) {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        throw new Error('Curso não encontrado');
      }

      // Verificar acesso se usuário fornecido
      let hasAccess = true;
      let accessLevel = 'full';

      if (userId) {
        const accessCheck = await this.checkCourseAccess(courseId, userId);
        hasAccess = accessCheck.hasAccess;
        accessLevel = accessCheck.accessLevel;
      } else {
        // Usuário não logado - acesso limitado
        hasAccess = !course.isPremium;
        accessLevel = course.isPremium ? 'none' : 'preview';
      }

      return {
        success: true,
        course: {
          ...course,
          hasAccess,
          accessLevel
        }
      };
    } catch (error) {
      return {
        success: false,
        course: null,
        message: error.message
      };
    }
  }

  /**
   * Buscar curso por slug
   */
  async getCourseBySlug(slug, userId = null) {
    try {
      const course = await this.courseRepository.findBySlug(slug);
      if (!course) {
        throw new Error('Curso não encontrado');
      }

      return await this.getCourse(course.id, userId);
    } catch (error) {
      return {
        success: false,
        course: null,
        message: error.message
      };
    }
  }

  /**
   * Listar cursos com filtros e verificação de acesso
   */
  async listCourses(filters = {}, userId = null) {
    try {
      const courses = await this.courseRepository.findAll(filters);

      // Verificar acesso para cada curso
      const coursesWithAccess = await Promise.all(
        courses.map(async (course) => {
          let hasAccess = true;
          let accessLevel = 'full';

          if (userId) {
            const accessCheck = await this.checkCourseAccess(course.id, userId);
            hasAccess = accessCheck.hasAccess;
            accessLevel = accessCheck.accessLevel;
          } else {
            hasAccess = !course.isPremium;
            accessLevel = course.isPremium ? 'none' : 'preview';
          }

          return {
            ...course,
            hasAccess,
            accessLevel
          };
        })
      );

      return {
        success: true,
        courses: coursesWithAccess,
        total: coursesWithAccess.length
      };
    } catch (error) {
      return {
        success: false,
        courses: [],
        message: error.message
      };
    }
  }

  /**
   * Buscar cursos em destaque
   */
  async getFeaturedCourses(limit = 6, userId = null) {
    try {
      const courses = await this.courseRepository.findFeatured(limit);

      const coursesWithAccess = await Promise.all(
        courses.map(async (course) => {
          let hasAccess = true;
          let accessLevel = 'full';

          if (userId) {
            const accessCheck = await this.checkCourseAccess(course.id, userId);
            hasAccess = accessCheck.hasAccess;
            accessLevel = accessCheck.accessLevel;
          } else {
            hasAccess = !course.isPremium;
            accessLevel = course.isPremium ? 'none' : 'preview';
          }

          return {
            ...course,
            hasAccess,
            accessLevel
          };
        })
      );

      return {
        success: true,
        courses: coursesWithAccess
      };
    } catch (error) {
      return {
        success: false,
        courses: [],
        message: error.message
      };
    }
  }

  /**
   * Buscar cursos por categoria
   */
  async getCoursesByCategory(category, limit = null, userId = null) {
    try {
      const courses = await this.courseRepository.findByCategory(category, limit);

      const coursesWithAccess = await Promise.all(
        courses.map(async (course) => {
          let hasAccess = true;
          let accessLevel = 'full';

          if (userId) {
            const accessCheck = await this.checkCourseAccess(course.id, userId);
            hasAccess = accessCheck.hasAccess;
            accessLevel = accessCheck.accessLevel;
          } else {
            hasAccess = !course.isPremium;
            accessLevel = course.isPremium ? 'none' : 'preview';
          }

          return {
            ...course,
            hasAccess,
            accessLevel
          };
        })
      );

      return {
        success: true,
        courses: coursesWithAccess,
        category
      };
    } catch (error) {
      return {
        success: false,
        courses: [],
        message: error.message
      };
    }
  }

  /**
   * Buscar cursos do usuário (em andamento)
   */
  async getUserCourses(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Buscar todos os cursos que o usuário tem acesso
      const allCourses = await this.courseRepository.findAll({ isPublished: true });
      
      // Filtrar cursos em andamento (com progresso > 0 e < 100)
      const coursesInProgress = allCourses.filter(course => 
        course.progress > 0 && course.progress < 100
      );

      return {
        success: true,
        courses: coursesInProgress,
        total: coursesInProgress.length
      };
    } catch (error) {
      return {
        success: false,
        courses: [],
        message: error.message
      };
    }
  }

  /**
   * Iniciar curso (marcar como iniciado)
   */
  async startCourse(courseId, userId) {
    try {
      // Verificar se usuário tem acesso
      const accessCheck = await this.checkCourseAccess(courseId, userId);
      if (!accessCheck.hasAccess) {
        throw new Error('Acesso negado ao curso');
      }

      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        throw new Error('Curso não encontrado');
      }

      // Se curso já foi iniciado, retornar estado atual
      if (course.progress > 0) {
        return {
          success: true,
          course,
          message: 'Curso já foi iniciado'
        };
      }

      // Marcar primeira aula como atual
      const updatedCourse = await this.courseRepository.updateProgress(courseId, userId, {
        progress: 1,
        completedLessons: 0
      });

      // Atualizar progresso do usuário
      const user = await this.userRepository.findById(userId);
      await this.userRepository.updateProgress(userId, {
        totalWatchTime: user.progress.totalWatchTime
      });

      return {
        success: true,
        course: updatedCourse,
        message: 'Curso iniciado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        course: null,
        message: error.message
      };
    }
  }

  /**
   * Completar aula
   */
  async completeLesson(courseId, chapterId, userId, watchTime = 0) {
    try {
      // Verificar acesso
      const accessCheck = await this.checkCourseAccess(courseId, userId);
      if (!accessCheck.hasAccess) {
        throw new Error('Acesso negado ao curso');
      }

      // Completar aula
      const updatedCourse = await this.courseRepository.completeLesson(courseId, chapterId, userId);

      // Atualizar tempo de estudo do usuário
      const user = await this.userRepository.findById(userId);
      const newWatchTime = user.progress.totalWatchTime + watchTime;
      
      let updatedProgress = {
        totalWatchTime: newWatchTime
      };

      // Se curso foi completado (100%), incrementar cursos concluídos
      if (updatedCourse.progress === 100) {
        updatedProgress.coursesCompleted = user.progress.coursesCompleted + 1;
        
        // Verificar se deve ganhar certificado
        if (this.shouldAwardCertificate(updatedCourse)) {
          updatedProgress.certificatesEarned = user.progress.certificatesEarned + 1;
        }
      }

      await this.userRepository.updateProgress(userId, updatedProgress);

      return {
        success: true,
        course: updatedCourse,
        lessonCompleted: true,
        courseCompleted: updatedCourse.progress === 100,
        message: updatedCourse.progress === 100 ? 'Parabéns! Curso concluído!' : 'Aula concluída com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        course: null,
        message: error.message
      };
    }
  }

  /**
   * Buscar próxima aula
   */
  async getNextLesson(courseId, userId) {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        throw new Error('Curso não encontrado');
      }

      // Encontrar aula atual ou próxima
      const currentLesson = course.chapters.find(chapter => chapter.isCurrentLesson);
      const nextLesson = course.chapters.find(chapter => !chapter.isCompleted);

      return {
        success: true,
        currentLesson,
        nextLesson: nextLesson || currentLesson,
        hasNextLesson: !!nextLesson
      };
    } catch (error) {
      return {
        success: false,
        currentLesson: null,
        nextLesson: null,
        message: error.message
      };
    }
  }

  /**
   * Verificar acesso ao curso
   */
  async checkCourseAccess(courseId, userId) {
    try {
      const course = await this.courseRepository.findById(courseId);
      if (!course) {
        return { hasAccess: false, accessLevel: 'none', reason: 'Curso não encontrado' };
      }

      const user = await this.userRepository.findById(userId);
      if (!user) {
        return { hasAccess: false, accessLevel: 'none', reason: 'Usuário não encontrado' };
      }

      // Curso gratuito - acesso liberado
      if (!course.isPremium) {
        return { hasAccess: true, accessLevel: 'full', reason: 'Curso gratuito' };
      }

      // Verificar assinatura ativa
      const hasActiveSubscription = await this.userRepository.hasActiveSubscription(userId);
      if (hasActiveSubscription) {
        return { hasAccess: true, accessLevel: 'full', reason: 'Assinatura ativa' };
      }

      // Usuário admin sempre tem acesso
      if (user.role === 'admin') {
        return { hasAccess: true, accessLevel: 'full', reason: 'Usuário administrador' };
      }

      // Trial - acesso limitado
      if (user.subscription.status === 'trial') {
        return { hasAccess: true, accessLevel: 'preview', reason: 'Período trial' };
      }

      return { hasAccess: false, accessLevel: 'none', reason: 'Assinatura necessária' };
    } catch (error) {
      return { hasAccess: false, accessLevel: 'none', reason: error.message };
    }
  }

  /**
   * Buscar estatísticas dos cursos
   */
  async getCourseStats(requestingUserId) {
    try {
      // Verificar permissão de admin
      const user = await this.userRepository.findById(requestingUserId);
      if (!user || user.role !== 'admin') {
        throw new Error('Acesso negado');
      }

      const stats = await this.courseRepository.getStats();

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

  /**
   * Criar novo curso (admin)
   */
  async createCourse(courseData, requestingUserId) {
    try {
      // Verificar permissão
      const user = await this.userRepository.findById(requestingUserId);
      if (!user || user.role !== 'admin') {
        throw new Error('Acesso negado');
      }

      // Validar dados do curso
      const validation = this.validateCourseData(courseData);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      // Criar curso
      const newCourse = await this.courseRepository.create(courseData);

      return {
        success: true,
        course: newCourse,
        message: 'Curso criado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        course: null,
        message: error.message
      };
    }
  }

  /**
   * Atualizar curso (admin)
   */
  async updateCourse(courseId, updates, requestingUserId) {
    try {
      // Verificar permissão
      const user = await this.userRepository.findById(requestingUserId);
      if (!user || user.role !== 'admin') {
        throw new Error('Acesso negado');
      }

      const updatedCourse = await this.courseRepository.update(courseId, updates);

      return {
        success: true,
        course: updatedCourse,
        message: 'Curso atualizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        course: null,
        message: error.message
      };
    }
  }

  // Métodos privados de validação e lógica de negócio

  /**
   * Validar dados do curso
   */
  validateCourseData(courseData) {
    if (!courseData.title || courseData.title.trim().length < 3) {
      return { valid: false, message: 'Título deve ter pelo menos 3 caracteres' };
    }

    if (!courseData.slug || courseData.slug.trim().length < 3) {
      return { valid: false, message: 'Slug deve ter pelo menos 3 caracteres' };
    }

    if (!courseData.description || courseData.description.trim().length < 10) {
      return { valid: false, message: 'Descrição deve ter pelo menos 10 caracteres' };
    }

    if (!courseData.category) {
      return { valid: false, message: 'Categoria é obrigatória' };
    }

    if (!courseData.instructor || !courseData.instructor.name) {
      return { valid: false, message: 'Instrutor é obrigatório' };
    }

    return { valid: true };
  }

  /**
   * Verificar se deve conceder certificado
   */
  shouldAwardCertificate(course) {
    // Regras de negócio para certificados
    return course.progress === 100 && course.isPremium;
  }

  /**
   * Calcular tempo estimado de conclusão
   */
  calculateEstimatedCompletion(course, userProgress) {
    if (!course.duration || !userProgress) {
      return null;
    }

    const remainingTime = course.duration * (1 - userProgress / 100);
    const averageSessionTime = 30; // minutos por sessão
    const sessionsNeeded = Math.ceil(remainingTime / averageSessionTime);

    return {
      remainingMinutes: Math.round(remainingTime),
      estimatedSessions: sessionsNeeded,
      estimatedDays: Math.ceil(sessionsNeeded / 2) // assumindo 2 sessões por dia
    };
  }

  /**
   * Gerar recomendações de cursos
   */
  async getRecommendations(userId, limit = 5) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Lógica simples de recomendação baseada em cursos similares
      const allCourses = await this.courseRepository.findAll({ isPublished: true });
      
      // Filtrar cursos não iniciados
      const notStartedCourses = allCourses.filter(course => course.progress === 0);
      
      // Ordenar por rating e popularidade
      const recommendations = notStartedCourses
        .sort((a, b) => (b.rating * b.totalStudents) - (a.rating * a.totalStudents))
        .slice(0, limit);

      return {
        success: true,
        recommendations
      };
    } catch (error) {
      return {
        success: false,
        recommendations: [],
        message: error.message
      };
    }
  }
}

export default CourseService;

