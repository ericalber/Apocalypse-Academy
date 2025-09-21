// Sistema de Distribuição Híbrida YouTube + OTT
// Gerencia distribuição inteligente de vídeos entre YouTube e plataforma privada

export interface VideoDistribution {
  id: string;
  title: string;
  description: string;
  distribution: 'youtube_public' | 'youtube_unlisted' | 'platform_private';
  youtube?: {
    videoId?: string;
    embedUrl?: string;
    uploadStatus?: 'pending' | 'uploading' | 'processing' | 'live' | 'failed';
    privacy?: 'public' | 'unlisted' | 'private';
    monetization?: boolean;
    chapters?: Array<{
      time: string;
      title: string;
    }>;
  };
  platform?: {
    hlsUrl?: string;
    dashUrl?: string;
    signedUrl?: string;
    drmPolicy?: 'streaming' | 'download' | 'none';
    qualityCap?: '720p' | '1080p' | '2160p' | '4320p';
    accessLevel?: 'free' | 'premium' | 'course' | 'live';
  };
  metadata: {
    duration: number;
    thumbnail: string;
    poster: string;
    tags: string[];
    category: string;
    language: string;
    captions?: Array<{
      lang: string;
      label: string;
      url: string;
    }>;
    chapters?: string;
  };
  analytics: {
    views: number;
    engagement: number;
    completionRate: number;
    avgWatchTime: number;
    lastUpdated: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface DistributionConfig {
  youtube: {
    apiKey: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    channelId: string;
    defaultPrivacy: 'public' | 'unlisted' | 'private';
    monetizationEnabled: boolean;
    brandingWatermark?: string;
  };
  platform: {
    cdnBaseUrl: string;
    signingKey: string;
    drmEnabled: boolean;
    defaultQuality: string;
    watermarkEnabled: boolean;
    geoRestrictions: string[];
  };
  rules: {
    autoDistribution: boolean;
    trailersToYoutube: boolean;
    coursesToPlatform: boolean;
    livesToBoth: boolean;
  };
}

class VideoDistributionManager {
  private config: DistributionConfig;
  
  constructor(config: DistributionConfig) {
    this.config = config;
  }

  /**
   * Determina a distribuição ideal para um vídeo baseado em regras
   */
  determineDistribution(
    videoType: 'trailer' | 'course' | 'documentary' | 'live' | 'preview',
    accessLevel: 'free' | 'premium' | 'course',
    targetAudience: 'discovery' | 'students' | 'members'
  ): VideoDistribution['distribution'] {
    
    // Regras de distribuição automática
    if (this.config.rules.autoDistribution) {
      
      // Trailers sempre públicos no YouTube para discovery
      if (videoType === 'trailer' && this.config.rules.trailersToYoutube) {
        return 'youtube_public';
      }
      
      // Cursos sempre na plataforma privada
      if (videoType === 'course' && this.config.rules.coursesToPlatform) {
        return 'platform_private';
      }
      
      // Lives podem ir para ambos
      if (videoType === 'live' && this.config.rules.livesToBoth) {
        return targetAudience === 'discovery' ? 'youtube_public' : 'platform_private';
      }
      
      // Documentários baseados no nível de acesso
      if (videoType === 'documentary') {
        return accessLevel === 'free' ? 'youtube_public' : 'platform_private';
      }
      
      // Previews sempre unlisted no YouTube
      if (videoType === 'preview') {
        return 'youtube_unlisted';
      }
    }
    
    // Fallback para plataforma privada
    return 'platform_private';
  }

  /**
   * Cria configuração de vídeo para YouTube
   */
  createYouTubeConfig(video: Partial<VideoDistribution>): any {
    const isPublic = video.distribution === 'youtube_public';
    
    return {
      snippet: {
        title: video.title,
        description: this.formatYouTubeDescription(video),
        tags: video.metadata?.tags || [],
        categoryId: this.getYouTubeCategoryId(video.metadata?.category),
        defaultLanguage: video.metadata?.language || 'pt-BR',
        defaultAudioLanguage: video.metadata?.language || 'pt-BR'
      },
      status: {
        privacyStatus: isPublic ? 'public' : 'unlisted',
        embeddable: true,
        license: 'youtube',
        publicStatsViewable: isPublic,
        madeForKids: false
      },
      monetizationDetails: {
        access: {
          allowed: this.config.youtube.monetizationEnabled && isPublic
        }
      }
    };
  }

  /**
   * Formata descrição para YouTube com capítulos
   */
  private formatYouTubeDescription(video: Partial<VideoDistribution>): string {
    let description = video.description || '';
    
    // Adicionar informações da Apocalypse Academy
    description += '\n\n🎬 APOCALYPSE ACADEMY\n';
    description += 'A plataforma definitiva para compreender os sinais dos tempos.\n\n';
    
    // Adicionar capítulos se disponíveis
    if (video.youtube?.chapters && video.youtube.chapters.length > 0) {
      description += '📖 CAPÍTULOS:\n';
      video.youtube.chapters.forEach(chapter => {
        description += `${chapter.time} ${chapter.title}\n`;
      });
      description += '\n';
    }
    
    // Adicionar links
    description += '🔗 LINKS:\n';
    description += '• Site: https://apocalypseacademy.com\n';
    description += '• Cursos Completos: https://apocalypseacademy.com/cursos\n';
    description += '• Documentários: https://apocalypseacademy.com/documentarios\n';
    description += '• Comunidade Telegram: [LINK]\n\n';
    
    // Adicionar hashtags
    description += '#ApocalypseAcademy #Escatologia #Profecia #SinaisDosTempo #EstudoBiblico';
    
    return description;
  }

  /**
   * Obtém ID da categoria do YouTube
   */
  private getYouTubeCategoryId(category?: string): string {
    const categoryMap: { [key: string]: string } = {
      'education': '27',
      'religion': '22',
      'documentary': '1',
      'course': '27',
      'live': '25'
    };
    
    return categoryMap[category || 'education'] || '27';
  }

  /**
   * Cria URL assinada para plataforma privada
   */
  async createSignedUrl(
    videoPath: string,
    userId: string,
    expirationHours: number = 24
  ): Promise<string> {
    const expiration = Date.now() + (expirationHours * 60 * 60 * 1000);
    const payload = {
      path: videoPath,
      userId: userId,
      exp: expiration
    };
    
    // Simular assinatura (em produção, usar JWT ou similar)
    const signature = Buffer.from(JSON.stringify(payload)).toString('base64');
    
    return `${this.config.platform.cdnBaseUrl}${videoPath}?token=${signature}`;
  }

  /**
   * Obtém configuração de player baseada na distribuição
   */
  getPlayerConfig(video: VideoDistribution, userId?: string): any {
    if (video.distribution.startsWith('youtube')) {
      return {
        type: 'youtube',
        src: video.youtube?.embedUrl,
        controls: true,
        autoplay: false,
        poster: video.metadata.poster
      };
    } else {
      return {
        type: video.platform?.dashUrl ? 'dash' : 'hls',
        src: video.platform?.signedUrl || video.platform?.hlsUrl || video.platform?.dashUrl,
        poster: video.metadata.poster,
        captions: video.metadata.captions,
        chapters: video.metadata.chapters,
        watermark: userId ? this.generateWatermark(userId) : undefined,
        controls: true,
        autoplay: false
      };
    }
  }

  /**
   * Gera watermark para usuário
   */
  private generateWatermark(userId: string): string {
    const hash = Buffer.from(userId).toString('base64').substring(0, 8);
    const timestamp = new Date().toISOString().substring(0, 10);
    return `${hash}-${timestamp}`;
  }

  /**
   * Analisa performance de distribuição
   */
  async analyzeDistributionPerformance(videoId: string): Promise<{
    youtube?: {
      views: number;
      likes: number;
      comments: number;
      shares: number;
      watchTime: number;
      revenue?: number;
    };
    platform?: {
      views: number;
      completionRate: number;
      avgWatchTime: number;
      uniqueViewers: number;
      engagement: number;
    };
    recommendation: 'youtube_focus' | 'platform_focus' | 'balanced' | 'redistribute';
  }> {
    // Implementar análise real em produção
    return {
      youtube: {
        views: 1250,
        likes: 89,
        comments: 23,
        shares: 15,
        watchTime: 3420,
        revenue: 12.50
      },
      platform: {
        views: 890,
        completionRate: 0.78,
        avgWatchTime: 1680,
        uniqueViewers: 650,
        engagement: 0.85
      },
      recommendation: 'balanced'
    };
  }

  /**
   * Sincroniza metadados entre plataformas
   */
  async syncMetadata(videoId: string, updates: Partial<VideoDistribution>): Promise<void> {
    // Atualizar YouTube se aplicável
    if (updates.youtube?.videoId) {
      await this.updateYouTubeMetadata(updates.youtube.videoId, updates);
    }
    
    // Atualizar plataforma privada
    if (updates.platform) {
      await this.updatePlatformMetadata(videoId, updates);
    }
  }

  /**
   * Atualiza metadados no YouTube
   */
  private async updateYouTubeMetadata(youtubeVideoId: string, updates: Partial<VideoDistribution>): Promise<void> {
    // Implementar usando YouTube Data API v3
    console.log(`Atualizando YouTube video ${youtubeVideoId}:`, updates);
  }

  /**
   * Atualiza metadados na plataforma
   */
  private async updatePlatformMetadata(videoId: string, updates: Partial<VideoDistribution>): Promise<void> {
    // Implementar atualização no banco de dados da plataforma
    console.log(`Atualizando plataforma video ${videoId}:`, updates);
  }

  /**
   * Migra vídeo entre distribuições
   */
  async migrateDistribution(
    videoId: string,
    fromDistribution: VideoDistribution['distribution'],
    toDistribution: VideoDistribution['distribution']
  ): Promise<void> {
    console.log(`Migrando vídeo ${videoId} de ${fromDistribution} para ${toDistribution}`);
    
    // Implementar lógica de migração
    // 1. Backup do vídeo atual
    // 2. Upload para nova plataforma
    // 3. Atualizar metadados
    // 4. Redirecionar URLs antigas
    // 5. Remover da plataforma anterior (se necessário)
  }
}

// Configuração padrão
export const defaultDistributionConfig: DistributionConfig = {
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || '',
    clientId: process.env.YOUTUBE_CLIENT_ID || '',
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET || '',
    refreshToken: process.env.YOUTUBE_REFRESH_TOKEN || '',
    channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    defaultPrivacy: 'unlisted',
    monetizationEnabled: true,
    brandingWatermark: '/images/apocalypse-academy-watermark.png'
  },
  platform: {
    cdnBaseUrl: process.env.CDN_BASE_URL || 'https://cdn.apocalypseacademy.com',
    signingKey: process.env.VIDEO_SIGNING_KEY || '',
    drmEnabled: true,
    defaultQuality: '1080p',
    watermarkEnabled: true,
    geoRestrictions: ['BR', 'US']
  },
  rules: {
    autoDistribution: true,
    trailersToYoutube: true,
    coursesToPlatform: true,
    livesToBoth: true
  }
};

export default VideoDistributionManager;

