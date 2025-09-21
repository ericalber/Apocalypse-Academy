// Script de Upload para YouTube - Apocalypse Academy
// Uso: node youtube_upload.js <video_file> <curso_id> <aula_id> <distribution_type>

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Configurações do YouTube API
const YOUTUBE_CONFIG = {
  clientId: process.env.YOUTUBE_CLIENT_ID,
  clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
  refreshToken: process.env.YOUTUBE_REFRESH_TOKEN,
  redirectUri: 'urn:ietf:wg:oauth:2.0:oob'
};

// Configurações de upload
const UPLOAD_CONFIG = {
  part: 'snippet,status',
  requestBody: {
    snippet: {
      categoryId: '27', // Education
      defaultLanguage: 'pt-BR',
      defaultAudioLanguage: 'pt-BR'
    },
    status: {
      privacyStatus: 'private', // Será atualizado baseado no distribution_type
      selfDeclaredMadeForKids: false
    }
  },
  media: {
    body: null // Será definido com o arquivo de vídeo
  }
};

class YouTubeUploader {
  constructor() {
    this.oauth2Client = null;
    this.youtube = null;
    this.initializeAuth();
  }

  // Inicializar autenticação
  initializeAuth() {
    this.oauth2Client = new google.auth.OAuth2(
      YOUTUBE_CONFIG.clientId,
      YOUTUBE_CONFIG.clientSecret,
      YOUTUBE_CONFIG.redirectUri
    );

    this.oauth2Client.setCredentials({
      refresh_token: YOUTUBE_CONFIG.refreshToken
    });

    this.youtube = google.youtube({
      version: 'v3',
      auth: this.oauth2Client
    });
  }

  // Validar parâmetros
  validateParams(args) {
    if (args.length < 4) {
      throw new Error('Uso: node youtube_upload.js <video_file> <curso_id> <aula_id> <distribution_type>');
    }

    const [videoFile, cursoId, aulaId, distributionType] = args;

    if (!fs.existsSync(videoFile)) {
      throw new Error(`Arquivo de vídeo não encontrado: ${videoFile}`);
    }

    if (!['youtube_public', 'youtube_unlisted'].includes(distributionType)) {
      throw new Error(`Tipo de distribuição inválido: ${distributionType}`);
    }

    return { videoFile, cursoId, aulaId, distributionType };
  }

  // Carregar metadados do curso
  async loadCourseMetadata(cursoId, aulaId) {
    try {
      const catalogPath = path.join(__dirname, '../api/catalog.json');
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      
      const course = catalog.courses.find(c => c.id === cursoId);
      if (!course) {
        throw new Error(`Curso não encontrado: ${cursoId}`);
      }

      let lesson = null;
      for (const module of course.modules) {
        const foundLesson = module.lessons.find(l => l.id === aulaId);
        if (foundLesson) {
          lesson = foundLesson;
          break;
        }
      }

      if (!lesson) {
        throw new Error(`Aula não encontrada: ${aulaId}`);
      }

      return { course, lesson };
    } catch (error) {
      console.error('Erro ao carregar metadados:', error.message);
      throw error;
    }
  }

  // Gerar título e descrição para YouTube
  generateVideoMetadata(course, lesson, distributionType) {
    const isTrailer = distributionType === 'youtube_public';
    
    let title, description;

    if (isTrailer) {
      title = `${lesson.title} - TRAILER | ${course.title} | Apocalypse Academy`;
      description = this.generateTrailerDescription(course, lesson);
    } else {
      title = `${lesson.title} | ${course.title} | Apocalypse Academy`;
      description = this.generateLessonDescription(course, lesson);
    }

    return { title, description };
  }

  // Gerar descrição para trailer
  generateTrailerDescription(course, lesson) {
    return `🎬 TRAILER OFICIAL

${lesson.description}

📚 CURSO COMPLETO: ${course.title}
👨‍🏫 INSTRUTOR: ${course.instructor}
⏱️ DURAÇÃO: ${this.formatDuration(lesson.durationSec)}
🎯 NÍVEL: ${course.level}

🔥 ACESSE O CURSO COMPLETO:
👉 https://apocalypseacademy.com/cursos/${course.slug}

📖 SOBRE O CURSO:
${course.description}

🎓 O QUE VOCÊ VAI APRENDER:
${course.modules.map((module, index) => `${index + 1}. ${module.title}`).join('\n')}

🌟 APOCALYPSE ACADEMY
A plataforma definitiva para compreender os sinais dos tempos e se preparar para os últimos dias.

📱 SIGA-NOS:
• Instagram: @apocalypseacademy
• Telegram: t.me/apocalypseacademy
• Spotify: Devocionais Proféticos

🏷️ TAGS:
#ApocalypseAcademy #Escatologia #Profecia #UltimosTempos #SinaisDosTempo #EstudoBiblico #Preparacao #${course.category}

⚠️ AVISO LEGAL:
Este conteúdo é baseado em interpretações bíblicas e tem fins educacionais. Sempre consulte as Escrituras e busque orientação espiritual.`;
  }

  // Gerar descrição para aula completa
  generateLessonDescription(course, lesson) {
    return `📚 AULA COMPLETA

${lesson.description}

🎓 CURSO: ${course.title}
👨‍🏫 INSTRUTOR: ${course.instructor}
⏱️ DURAÇÃO: ${this.formatDuration(lesson.durationSec)}
🎯 NÍVEL: ${course.level}

📖 SOBRE ESTA AULA:
Nesta aula do curso "${course.title}", exploramos em profundidade os conceitos apresentados no título "${lesson.title}".

🔗 ACESSE A PLATAFORMA:
👉 https://apocalypseacademy.com

📋 CAPÍTULOS:
00:00 Introdução
${this.generateChapterTimestamps(lesson.durationSec)}

📚 RECURSOS ADICIONAIS:
• Apostila em PDF
• Áudios para download
• Exercícios práticos
• Certificado de conclusão

🌟 APOCALYPSE ACADEMY
A plataforma definitiva para compreender os sinais dos tempos e se preparar para os últimos dias.

📱 CONECTE-SE CONOSCO:
• Site: https://apocalypseacademy.com
• Instagram: @apocalypseacademy
• Telegram: t.me/apocalypseacademy
• Spotify: Devocionais Proféticos

🏷️ TAGS:
#ApocalypseAcademy #Escatologia #Profecia #UltimosTempos #SinaisDosTempo #EstudoBiblico #Preparacao #${course.category} #AulaCompleta

⚠️ DIREITOS AUTORAIS:
© 2024 Apocalypse Academy. Todos os direitos reservados. Este conteúdo é protegido por direitos autorais e destinado exclusivamente aos alunos matriculados.`;
  }

  // Gerar timestamps de capítulos
  generateChapterTimestamps(durationSec) {
    const chapterDuration = 300; // 5 minutos
    const totalChapters = Math.floor(durationSec / chapterDuration);
    const timestamps = [];

    for (let i = 1; i <= totalChapters; i++) {
      const time = i * chapterDuration;
      const formatted = this.formatTimestamp(time);
      timestamps.push(`${formatted} Capítulo ${i}`);
    }

    return timestamps.join('\n');
  }

  // Formatar duração em minutos
  formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}min`;
    }
    return `${minutes}min`;
  }

  // Formatar timestamp para capítulos
  formatTimestamp(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  // Gerar tags para o vídeo
  generateTags(course, lesson) {
    const baseTags = [
      'Apocalypse Academy',
      'Escatologia',
      'Profecia',
      'Últimos Tempos',
      'Sinais dos Tempos',
      'Estudo Bíblico',
      'Preparação',
      'Eric Alberto da Cruz'
    ];

    const courseTags = [
      course.category,
      course.title,
      course.level
    ];

    const lessonTags = lesson.title.split(' ').filter(word => word.length > 3);

    return [...baseTags, ...courseTags, ...lessonTags].slice(0, 15); // YouTube limita a 15 tags
  }

  // Fazer upload do vídeo
  async uploadVideo(videoFile, metadata, distributionType) {
    console.log('Iniciando upload para YouTube...');
    
    const { title, description } = metadata;
    const tags = this.generateTags(metadata.course, metadata.lesson);
    
    // Configurar privacidade baseada no tipo de distribuição
    const privacyStatus = distributionType === 'youtube_public' ? 'public' : 'unlisted';
    
    const uploadConfig = {
      ...UPLOAD_CONFIG,
      requestBody: {
        ...UPLOAD_CONFIG.requestBody,
        snippet: {
          ...UPLOAD_CONFIG.requestBody.snippet,
          title: title,
          description: description,
          tags: tags
        },
        status: {
          ...UPLOAD_CONFIG.requestBody.status,
          privacyStatus: privacyStatus
        }
      },
      media: {
        body: fs.createReadStream(videoFile)
      }
    };

    try {
      console.log(`Fazendo upload: ${title}`);
      console.log(`Privacidade: ${privacyStatus}`);
      
      const response = await this.youtube.videos.insert(uploadConfig);
      
      const videoId = response.data.id;
      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
      
      console.log('✅ Upload concluído com sucesso!');
      console.log(`📺 Video ID: ${videoId}`);
      console.log(`🔗 URL: ${videoUrl}`);
      
      return {
        videoId,
        videoUrl,
        embedUrl: `https://www.youtube.com/embed/${videoId}`,
        status: 'uploaded',
        privacyStatus
      };
      
    } catch (error) {
      console.error('❌ Erro no upload:', error.message);
      throw error;
    }
  }

  // Atualizar catálogo com informações do YouTube
  async updateCatalogWithYouTube(cursoId, aulaId, youtubeData) {
    try {
      const catalogPath = path.join(__dirname, '../api/catalog.json');
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
      
      // Encontrar e atualizar a aula
      for (const course of catalog.courses) {
        if (course.id === cursoId) {
          for (const module of course.modules) {
            const lesson = module.lessons.find(l => l.id === aulaId);
            if (lesson) {
              // Atualizar informações do YouTube
              if (!lesson.youtube) {
                lesson.youtube = {};
              }
              
              lesson.youtube = {
                videoId: youtubeData.videoId,
                embedUrl: youtubeData.embedUrl,
                watchUrl: youtubeData.videoUrl,
                privacyStatus: youtubeData.privacyStatus,
                uploadedAt: new Date().toISOString()
              };
              
              lesson.updatedAt = new Date().toISOString();
              break;
            }
          }
          break;
        }
      }
      
      // Atualizar timestamp do catálogo
      catalog.metadata.lastUpdated = new Date().toISOString();
      
      // Salvar catálogo atualizado
      fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
      
      console.log('✅ Catálogo atualizado com informações do YouTube');
      
    } catch (error) {
      console.error('❌ Erro ao atualizar catálogo:', error.message);
      throw error;
    }
  }

  // Função principal
  async run(args) {
    try {
      console.log('🎬 APOCALYPSE ACADEMY - UPLOAD YOUTUBE');
      console.log('=====================================');
      
      // Validar parâmetros
      const { videoFile, cursoId, aulaId, distributionType } = this.validateParams(args);
      
      console.log(`📁 Arquivo: ${videoFile}`);
      console.log(`📚 Curso: ${cursoId}`);
      console.log(`🎓 Aula: ${aulaId}`);
      console.log(`📡 Distribuição: ${distributionType}`);
      console.log('');
      
      // Carregar metadados
      console.log('📖 Carregando metadados do curso...');
      const { course, lesson } = await this.loadCourseMetadata(cursoId, aulaId);
      
      // Gerar metadados do vídeo
      console.log('✏️ Gerando metadados do vídeo...');
      const videoMetadata = this.generateVideoMetadata(course, lesson, distributionType);
      videoMetadata.course = course;
      videoMetadata.lesson = lesson;
      
      console.log(`📝 Título: ${videoMetadata.title}`);
      console.log('');
      
      // Fazer upload
      const youtubeData = await this.uploadVideo(videoFile, videoMetadata, distributionType);
      
      // Atualizar catálogo
      console.log('📋 Atualizando catálogo...');
      await this.updateCatalogWithYouTube(cursoId, aulaId, youtubeData);
      
      console.log('');
      console.log('🎉 UPLOAD CONCLUÍDO COM SUCESSO!');
      console.log(`🔗 Acesse: ${youtubeData.videoUrl}`);
      
      return youtubeData;
      
    } catch (error) {
      console.error('💥 ERRO NO UPLOAD:', error.message);
      process.exit(1);
    }
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  const uploader = new YouTubeUploader();
  uploader.run(process.argv.slice(2));
}

module.exports = YouTubeUploader;

