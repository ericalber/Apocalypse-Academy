/**
 * CourseRepository - Camada de acesso a dados para cursos
 * Isola os dados mockados e expõe interface consistente
 */

class CourseRepository {
  constructor(dataSource = null) {
    // Dados mockados - serão substituídos por banco real no futuro
    this.courses = dataSource || [
      {
        id: '1',
        title: 'Escatologia Bíblica Avançada',
        slug: 'escatologia-biblica-avancada',
        description: 'Estudo profundo sobre os últimos tempos e profecias bíblicas',
        shortDescription: 'Compreenda as profecias dos últimos tempos',
        category: 'escatologia',
        level: 'advanced',
        instructor: {
          id: '1',
          name: 'Dr. João Silva',
          avatar: '/images/instructors/joao-silva.jpg',
          bio: 'Doutor em Teologia com especialização em Escatologia'
        },
        thumbnail: '/images/courses/escatologia-avancada.jpg',
        trailer: '/videos/trailers/escatologia-trailer.mp4',
        duration: 510, // em minutos
        totalLessons: 20,
        completedLessons: 12,
        progress: 60,
        rating: 4.8,
        totalRatings: 156,
        totalStudents: 1247,
        price: 197.90,
        originalPrice: 297.90,
        isPremium: true,
        isFeatured: true,
        isPublished: true,
        tags: ['profecia', 'apocalipse', 'daniel', 'revelação'],
        requirements: [
          'Conhecimento básico da Bíblia',
          'Ter completado curso de Teologia Básica'
        ],
        whatYouLearn: [
          'Interpretação das profecias de Daniel',
          'Compreensão do livro de Apocalipse',
          'Sinais dos últimos tempos',
          'Cronologia profética'
        ],
        chapters: [
          {
            id: '1',
            title: 'Introdução: Os Sinais Ocultos',
            duration: '00:00',
            isCompleted: true,
            isCurrentLesson: false
          },
          {
            id: '2',
            title: 'As Organizações Secretas',
            duration: '15:30',
            isCompleted: false,
            isCurrentLesson: true
          },
          {
            id: '3',
            title: 'O Sistema Financeiro Global',
            duration: '32:45',
            isCompleted: false,
            isCurrentLesson: false
          },
          {
            id: '4',
            title: 'Conexões Proféticas',
            duration: '58:20',
            isCompleted: false,
            isCurrentLesson: false
          },
          {
            id: '5',
            title: 'O Que Está Por Vir',
            duration: '1:25:10',
            isCompleted: false,
            isCurrentLesson: false
          }
        ],
        createdAt: new Date('2023-01-15'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: '2',
        title: 'Geopolítica e Profecias Bíblicas',
        slug: 'geopolitica-profecias-biblicas',
        description: 'Análise dos eventos mundiais atuais à luz das profecias bíblicas',
        shortDescription: 'Entenda os eventos mundiais pela perspectiva bíblica',
        category: 'geopolitica',
        level: 'intermediate',
        instructor: {
          id: '2',
          name: 'Prof. Maria Santos',
          avatar: '/images/instructors/maria-santos.jpg',
          bio: 'Professora de Relações Internacionais e Teologia'
        },
        thumbnail: '/images/courses/geopolitica-profecias.jpg',
        trailer: '/videos/trailers/geopolitica-trailer.mp4',
        duration: 420,
        totalLessons: 18,
        completedLessons: 5,
        progress: 28,
        rating: 4.6,
        totalRatings: 89,
        totalStudents: 567,
        price: 147.90,
        originalPrice: 197.90,
        isPremium: true,
        isFeatured: false,
        isPublished: true,
        tags: ['geopolitica', 'profecia', 'israel', 'nações'],
        requirements: [
          'Interesse em eventos atuais',
          'Conhecimento básico de geografia'
        ],
        whatYouLearn: [
          'Papel de Israel nos últimos tempos',
          'Análise de conflitos mundiais',
          'Profecias sobre as nações',
          'Sinais geopolíticos atuais'
        ],
        chapters: [
          {
            id: '1',
            title: 'Introdução: Cenário Mundial',
            duration: '00:00',
            isCompleted: true,
            isCurrentLesson: false
          },
          {
            id: '2',
            title: 'As Nações nos Últimos Tempos',
            duration: '18:45',
            isCompleted: true,
            isCurrentLesson: false
          },
          {
            id: '3',
            title: 'Conflitos no Oriente Médio',
            duration: '35:20',
            isCompleted: true,
            isCurrentLesson: false
          },
          {
            id: '4',
            title: 'A Nova Ordem Mundial',
            duration: '52:10',
            isCompleted: true,
            isCurrentLesson: false
          },
          {
            id: '5',
            title: 'O Papel de Israel nos Últimos Tempos',
            duration: '1:08:30',
            isCompleted: false,
            isCurrentLesson: true
          }
        ],
        createdAt: new Date('2023-03-20'),
        updatedAt: new Date('2024-02-05')
      },
      {
        id: '3',
        title: 'Guerra Espiritual Moderna',
        slug: 'guerra-espiritual-moderna',
        description: 'Batalha espiritual nos tempos modernos e como se preparar',
        shortDescription: 'Prepare-se para a batalha espiritual dos últimos tempos',
        category: 'guerra-cultural',
        level: 'intermediate',
        instructor: {
          id: '3',
          name: 'Pastor Carlos Lima',
          avatar: '/images/instructors/carlos-lima.jpg',
          bio: 'Pastor com 20 anos de experiência em libertação'
        },
        thumbnail: '/images/courses/guerra-espiritual.jpg',
        trailer: '/videos/trailers/guerra-espiritual-trailer.mp4',
        duration: 360,
        totalLessons: 15,
        completedLessons: 3,
        progress: 20,
        rating: 4.9,
        totalRatings: 234,
        totalStudents: 892,
        price: 127.90,
        originalPrice: 177.90,
        isPremium: true,
        isFeatured: true,
        isPublished: true,
        tags: ['guerra-espiritual', 'libertação', 'oração', 'jejum'],
        requirements: [
          'Ser cristão nascido de novo',
          'Ter experiência em oração'
        ],
        whatYouLearn: [
          'Identificar ataques espirituais',
          'Usar a armadura de Deus',
          'Estratégias de oração',
          'Ministério de libertação'
        ],
        chapters: [
          {
            id: '1',
            title: 'Fundamentos da Guerra Espiritual',
            duration: '00:00',
            isCompleted: true,
            isCurrentLesson: false
          },
          {
            id: '2',
            title: 'Identificando Fortalezas Espirituais',
            duration: '22:15',
            isCompleted: false,
            isCurrentLesson: true
          },
          {
            id: '3',
            title: 'Armadura de Deus',
            duration: '45:30',
            isCompleted: false,
            isCurrentLesson: false
          },
          {
            id: '4',
            title: 'Estratégias de Combate',
            duration: '1:12:45',
            isCompleted: false,
            isCurrentLesson: false
          },
          {
            id: '5',
            title: 'Vitória e Libertação',
            duration: '1:38:20',
            isCompleted: false,
            isCurrentLesson: false
          }
        ],
        createdAt: new Date('2023-05-10'),
        updatedAt: new Date('2024-01-20')
      }
    ];
  }

  /**
   * Buscar curso por ID
   */
  async findById(id) {
    try {
      const course = this.courses.find(c => c.id === id);
      return course ? { ...course } : null;
    } catch (error) {
      throw new Error(`Erro ao buscar curso por ID: ${error.message}`);
    }
  }

  /**
   * Buscar curso por slug
   */
  async findBySlug(slug) {
    try {
      const course = this.courses.find(c => c.slug === slug);
      return course ? { ...course } : null;
    } catch (error) {
      throw new Error(`Erro ao buscar curso por slug: ${error.message}`);
    }
  }

  /**
   * Listar cursos com filtros
   */
  async findAll(filters = {}) {
    try {
      let filteredCourses = [...this.courses];

      // Filtro por categoria
      if (filters.category) {
        filteredCourses = filteredCourses.filter(c => c.category === filters.category);
      }

      // Filtro por nível
      if (filters.level) {
        filteredCourses = filteredCourses.filter(c => c.level === filters.level);
      }

      // Filtro por premium
      if (filters.isPremium !== undefined) {
        filteredCourses = filteredCourses.filter(c => c.isPremium === filters.isPremium);
      }

      // Filtro por featured
      if (filters.isFeatured !== undefined) {
        filteredCourses = filteredCourses.filter(c => c.isFeatured === filters.isFeatured);
      }

      // Filtro por publicado
      if (filters.isPublished !== undefined) {
        filteredCourses = filteredCourses.filter(c => c.isPublished === filters.isPublished);
      }

      // Busca por texto
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredCourses = filteredCourses.filter(c => 
          c.title.toLowerCase().includes(searchTerm) ||
          c.description.toLowerCase().includes(searchTerm) ||
          c.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }

      // Ordenação
      if (filters.sortBy) {
        filteredCourses.sort((a, b) => {
          switch (filters.sortBy) {
            case 'title':
              return a.title.localeCompare(b.title);
            case 'rating':
              return b.rating - a.rating;
            case 'students':
              return b.totalStudents - a.totalStudents;
            case 'price':
              return a.price - b.price;
            case 'newest':
              return new Date(b.createdAt) - new Date(a.createdAt);
            default:
              return 0;
          }
        });
      }

      // Paginação
      if (filters.page && filters.limit) {
        const start = (filters.page - 1) * filters.limit;
        const end = start + filters.limit;
        filteredCourses = filteredCourses.slice(start, end);
      }

      return filteredCourses.map(course => ({ ...course }));
    } catch (error) {
      throw new Error(`Erro ao listar cursos: ${error.message}`);
    }
  }

  /**
   * Buscar cursos em destaque
   */
  async findFeatured(limit = 6) {
    try {
      const featured = this.courses
        .filter(c => c.isFeatured && c.isPublished)
        .slice(0, limit);
      
      return featured.map(course => ({ ...course }));
    } catch (error) {
      throw new Error(`Erro ao buscar cursos em destaque: ${error.message}`);
    }
  }

  /**
   * Buscar cursos por categoria
   */
  async findByCategory(category, limit = null) {
    try {
      let courses = this.courses.filter(c => 
        c.category === category && c.isPublished
      );

      if (limit) {
        courses = courses.slice(0, limit);
      }

      return courses.map(course => ({ ...course }));
    } catch (error) {
      throw new Error(`Erro ao buscar cursos por categoria: ${error.message}`);
    }
  }

  /**
   * Atualizar progresso do curso para um usuário
   */
  async updateProgress(courseId, userId, progressData) {
    try {
      const course = await this.findById(courseId);
      if (!course) {
        throw new Error('Curso não encontrado');
      }

      // Em uma implementação real, isso seria uma tabela separada de progresso
      // Por agora, simulamos atualizando o curso
      const updatedCourse = {
        ...course,
        completedLessons: progressData.completedLessons || course.completedLessons,
        progress: progressData.progress || course.progress
      };

      const courseIndex = this.courses.findIndex(c => c.id === courseId);
      this.courses[courseIndex] = updatedCourse;

      return { ...updatedCourse };
    } catch (error) {
      throw new Error(`Erro ao atualizar progresso: ${error.message}`);
    }
  }

  /**
   * Marcar aula como concluída
   */
  async completeLesson(courseId, chapterId, userId) {
    try {
      const course = await this.findById(courseId);
      if (!course) {
        throw new Error('Curso não encontrado');
      }

      const updatedChapters = course.chapters.map(chapter => {
        if (chapter.id === chapterId) {
          return { ...chapter, isCompleted: true, isCurrentLesson: false };
        }
        return chapter;
      });

      // Encontrar próxima aula
      const currentIndex = updatedChapters.findIndex(c => c.id === chapterId);
      if (currentIndex < updatedChapters.length - 1) {
        updatedChapters[currentIndex + 1].isCurrentLesson = true;
      }

      const completedCount = updatedChapters.filter(c => c.isCompleted).length;
      const progress = Math.round((completedCount / updatedChapters.length) * 100);

      const updatedCourse = {
        ...course,
        chapters: updatedChapters,
        completedLessons: completedCount,
        progress
      };

      const courseIndex = this.courses.findIndex(c => c.id === courseId);
      this.courses[courseIndex] = updatedCourse;

      return { ...updatedCourse };
    } catch (error) {
      throw new Error(`Erro ao completar aula: ${error.message}`);
    }
  }

  /**
   * Criar novo curso
   */
  async create(courseData) {
    try {
      // Verificar se slug já existe
      const existingCourse = await this.findBySlug(courseData.slug);
      if (existingCourse) {
        throw new Error('Slug já está em uso');
      }

      const newCourse = {
        id: Date.now().toString(),
        ...courseData,
        totalStudents: 0,
        rating: 0,
        totalRatings: 0,
        completedLessons: 0,
        progress: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.courses.push(newCourse);
      return { ...newCourse };
    } catch (error) {
      throw new Error(`Erro ao criar curso: ${error.message}`);
    }
  }

  /**
   * Atualizar curso
   */
  async update(id, updates) {
    try {
      const courseIndex = this.courses.findIndex(c => c.id === id);
      if (courseIndex === -1) {
        throw new Error('Curso não encontrado');
      }

      const updatedCourse = {
        ...this.courses[courseIndex],
        ...updates,
        updatedAt: new Date()
      };

      this.courses[courseIndex] = updatedCourse;
      return { ...updatedCourse };
    } catch (error) {
      throw new Error(`Erro ao atualizar curso: ${error.message}`);
    }
  }

  /**
   * Deletar curso
   */
  async delete(id) {
    try {
      const courseIndex = this.courses.findIndex(c => c.id === id);
      if (courseIndex === -1) {
        throw new Error('Curso não encontrado');
      }

      const deletedCourse = this.courses.splice(courseIndex, 1)[0];
      return { ...deletedCourse };
    } catch (error) {
      throw new Error(`Erro ao deletar curso: ${error.message}`);
    }
  }

  /**
   * Buscar estatísticas dos cursos
   */
  async getStats() {
    try {
      const totalCourses = this.courses.length;
      const publishedCourses = this.courses.filter(c => c.isPublished).length;
      const premiumCourses = this.courses.filter(c => c.isPremium).length;
      const totalStudents = this.courses.reduce((sum, c) => sum + c.totalStudents, 0);
      const averageRating = this.courses.reduce((sum, c) => sum + c.rating, 0) / totalCourses;

      return {
        totalCourses,
        publishedCourses,
        premiumCourses,
        totalStudents,
        averageRating: Math.round(averageRating * 10) / 10
      };
    } catch (error) {
      throw new Error(`Erro ao buscar estatísticas: ${error.message}`);
    }
  }
}

export default CourseRepository;

