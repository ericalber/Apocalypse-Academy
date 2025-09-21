// Sistema de Lives Simultâneas YouTube + OTT
// Gerencia transmissões ao vivo para público geral (YouTube) e alunos (plataforma privada)

export interface LiveStream {
  id: string;
  title: string;
  description: string;
  scheduledStart: string;
  actualStart?: string;
  actualEnd?: string;
  status: 'scheduled' | 'live' | 'ended' | 'cancelled';
  type: 'qa_session' | 'course_live' | 'special_event' | 'documentary_premiere';
  
  // Configurações de distribuição
  distribution: {
    youtube: {
      enabled: boolean;
      streamKey?: string;
      broadcastId?: string;
      privacy: 'public' | 'unlisted' | 'private';
      monetization: boolean;
      chatEnabled: boolean;
      recordingEnabled: boolean;
    };
    platform: {
      enabled: boolean;
      streamKey?: string;
      accessLevel: 'free' | 'premium' | 'course_only';
      chatEnabled: boolean;
      recordingEnabled: boolean;
      maxViewers?: number;
    };
  };
  
  // URLs de transmissão
  streaming: {
    rtmpEndpoint: string;
    youtube?: {
      rtmpUrl: string;
      streamKey: string;
      watchUrl: string;
      embedUrl: string;
    };
    platform?: {
      rtmpUrl: string;
      streamKey: string;
      hlsUrl: string;
      dashUrl: string;
    };
  };
  
  // Configurações técnicas
  technical: {
    resolution: '720p' | '1080p' | '1440p' | '2160p';
    bitrate: number;
    framerate: 30 | 60;
    audioCodec: 'aac' | 'opus';
    videoCodec: 'h264' | 'h265';
  };
  
  // Metadados
  metadata: {
    instructor: string;
    category: string;
    tags: string[];
    thumbnail: string;
    language: string;
    estimatedDuration: number;
  };
  
  // Estatísticas em tempo real
  analytics: {
    youtube?: {
      viewers: number;
      likes: number;
      comments: number;
      shares: number;
    };
    platform?: {
      viewers: number;
      uniqueViewers: number;
      chatMessages: number;
      engagement: number;
    };
    totalViewers: number;
    peakViewers: number;
    avgWatchTime: number;
  };
  
  // Gravação e VOD
  recording: {
    enabled: boolean;
    youtube?: {
      videoId?: string;
      processingStatus?: 'processing' | 'ready' | 'failed';
    };
    platform?: {
      vodPath?: string;
      processingStatus?: 'processing' | 'ready' | 'failed';
      hlsUrl?: string;
      dashUrl?: string;
    };
  };
  
  createdAt: string;
  updatedAt: string;
}

export interface LiveStreamConfig {
  rtmp: {
    serverUrl: string;
    port: number;
    appName: string;
    recordPath: string;
    maxConnections: number;
  };
  youtube: {
    apiKey: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    channelId: string;
    defaultPrivacy: 'public' | 'unlisted' | 'private';
    autoRecord: boolean;
    autoPublish: boolean;
  };
  platform: {
    hlsSegmentDuration: number;
    hlsPlaylistSize: number;
    dashSegmentDuration: number;
    transcodingProfiles: Array<{
      name: string;
      resolution: string;
      bitrate: number;
      codec: string;
    }>;
    cdnBaseUrl: string;
    maxConcurrentViewers: number;
  };
  notifications: {
    webhookUrl?: string;
    emailNotifications: boolean;
    telegramBot?: {
      token: string;
      chatId: string;
    };
  };
}

class LiveStreamingManager {
  private config: LiveStreamConfig;
  private activeStreams: Map<string, LiveStream> = new Map();
  
  constructor(config: LiveStreamConfig) {
    this.config = config;
  }

  /**
   * Cria uma nova transmissão ao vivo
   */
  async createLiveStream(streamData: Partial<LiveStream>): Promise<LiveStream> {
    const streamId = this.generateStreamId();
    
    const liveStream: LiveStream = {
      id: streamId,
      title: streamData.title || 'Live Stream',
      description: streamData.description || '',
      scheduledStart: streamData.scheduledStart || new Date().toISOString(),
      status: 'scheduled',
      type: streamData.type || 'qa_session',
      
      distribution: {
        youtube: {
          enabled: streamData.distribution?.youtube?.enabled ?? true,
          privacy: streamData.distribution?.youtube?.privacy || this.config.youtube.defaultPrivacy,
          monetization: streamData.distribution?.youtube?.monetization ?? true,
          chatEnabled: streamData.distribution?.youtube?.chatEnabled ?? true,
          recordingEnabled: streamData.distribution?.youtube?.recordingEnabled ?? this.config.youtube.autoRecord
        },
        platform: {
          enabled: streamData.distribution?.platform?.enabled ?? true,
          accessLevel: streamData.distribution?.platform?.accessLevel || 'free',
          chatEnabled: streamData.distribution?.platform?.chatEnabled ?? true,
          recordingEnabled: streamData.distribution?.platform?.recordingEnabled ?? true,
          maxViewers: streamData.distribution?.platform?.maxViewers || this.config.platform.maxConcurrentViewers
        }
      },
      
      streaming: {
        rtmpEndpoint: `${this.config.rtmp.serverUrl}:${this.config.rtmp.port}/${this.config.rtmp.appName}`,
        youtube: undefined,
        platform: undefined
      },
      
      technical: {
        resolution: streamData.technical?.resolution || '1080p',
        bitrate: streamData.technical?.bitrate || 4000,
        framerate: streamData.technical?.framerate || 30,
        audioCodec: streamData.technical?.audioCodec || 'aac',
        videoCodec: streamData.technical?.videoCodec || 'h264'
      },
      
      metadata: {
        instructor: streamData.metadata?.instructor || 'Eric Alberto da Cruz',
        category: streamData.metadata?.category || 'Escatologia',
        tags: streamData.metadata?.tags || ['apocalypse', 'academy', 'live'],
        thumbnail: streamData.metadata?.thumbnail || '/images/live-default-thumbnail.jpg',
        language: streamData.metadata?.language || 'pt-BR',
        estimatedDuration: streamData.metadata?.estimatedDuration || 3600
      },
      
      analytics: {
        totalViewers: 0,
        peakViewers: 0,
        avgWatchTime: 0
      },
      
      recording: {
        enabled: streamData.recording?.enabled ?? true
      },
      
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Configurar YouTube se habilitado
    if (liveStream.distribution.youtube.enabled) {
      await this.setupYouTubeLive(liveStream);
    }

    // Configurar plataforma se habilitado
    if (liveStream.distribution.platform.enabled) {
      await this.setupPlatformLive(liveStream);
    }

    this.activeStreams.set(streamId, liveStream);
    
    // Notificar criação
    await this.notifyStreamEvent(liveStream, 'created');
    
    return liveStream;
  }

  /**
   * Configura transmissão no YouTube
   */
  private async setupYouTubeLive(stream: LiveStream): Promise<void> {
    try {
      // Criar broadcast no YouTube
      const broadcast = await this.createYouTubeBroadcast(stream);
      
      // Criar stream no YouTube
      const youtubeStream = await this.createYouTubeStream(stream);
      
      // Vincular broadcast e stream
      await this.bindYouTubeBroadcastStream(broadcast.id, youtubeStream.id);
      
      stream.distribution.youtube.broadcastId = broadcast.id;
      stream.distribution.youtube.streamKey = youtubeStream.cdn.ingestionInfo.streamName;
      
      stream.streaming.youtube = {
        rtmpUrl: youtubeStream.cdn.ingestionInfo.ingestionAddress,
        streamKey: youtubeStream.cdn.ingestionInfo.streamName,
        watchUrl: `https://www.youtube.com/watch?v=${broadcast.id}`,
        embedUrl: `https://www.youtube.com/embed/${broadcast.id}`
      };
      
    } catch (error) {
      console.error('Erro ao configurar YouTube Live:', error);
      stream.distribution.youtube.enabled = false;
    }
  }

  /**
   * Configura transmissão na plataforma
   */
  private async setupPlatformLive(stream: LiveStream): Promise<void> {
    try {
      const streamKey = this.generateStreamKey();
      
      stream.distribution.platform.streamKey = streamKey;
      
      stream.streaming.platform = {
        rtmpUrl: `${this.config.rtmp.serverUrl}:${this.config.rtmp.port}/${this.config.rtmp.appName}`,
        streamKey: streamKey,
        hlsUrl: `${this.config.platform.cdnBaseUrl}/live/${streamKey}/index.m3u8`,
        dashUrl: `${this.config.platform.cdnBaseUrl}/live/${streamKey}/manifest.mpd`
      };
      
    } catch (error) {
      console.error('Erro ao configurar Platform Live:', error);
      stream.distribution.platform.enabled = false;
    }
  }

  /**
   * Inicia transmissão ao vivo
   */
  async startLiveStream(streamId: string): Promise<void> {
    const stream = this.activeStreams.get(streamId);
    if (!stream) {
      throw new Error('Stream não encontrada');
    }

    try {
      // Iniciar no YouTube se habilitado
      if (stream.distribution.youtube.enabled && stream.distribution.youtube.broadcastId) {
        await this.startYouTubeBroadcast(stream.distribution.youtube.broadcastId);
      }

      // Iniciar na plataforma (RTMP server já deve estar rodando)
      if (stream.distribution.platform.enabled) {
        await this.startPlatformStream(stream);
      }

      stream.status = 'live';
      stream.actualStart = new Date().toISOString();
      stream.updatedAt = new Date().toISOString();

      // Iniciar coleta de analytics
      this.startAnalyticsCollection(streamId);
      
      // Notificar início
      await this.notifyStreamEvent(stream, 'started');
      
    } catch (error) {
      console.error('Erro ao iniciar stream:', error);
      throw error;
    }
  }

  /**
   * Encerra transmissão ao vivo
   */
  async endLiveStream(streamId: string): Promise<void> {
    const stream = this.activeStreams.get(streamId);
    if (!stream) {
      throw new Error('Stream não encontrada');
    }

    try {
      // Encerrar no YouTube
      if (stream.distribution.youtube.enabled && stream.distribution.youtube.broadcastId) {
        await this.endYouTubeBroadcast(stream.distribution.youtube.broadcastId);
      }

      // Encerrar na plataforma
      if (stream.distribution.platform.enabled) {
        await this.endPlatformStream(stream);
      }

      stream.status = 'ended';
      stream.actualEnd = new Date().toISOString();
      stream.updatedAt = new Date().toISOString();

      // Parar coleta de analytics
      this.stopAnalyticsCollection(streamId);
      
      // Processar gravações se habilitado
      if (stream.recording.enabled) {
        await this.processRecordings(stream);
      }
      
      // Notificar fim
      await this.notifyStreamEvent(stream, 'ended');
      
    } catch (error) {
      console.error('Erro ao encerrar stream:', error);
      throw error;
    }
  }

  /**
   * Obtém configurações OBS para transmissão
   */
  getOBSConfig(streamId: string): {
    youtube?: { rtmpUrl: string; streamKey: string };
    platform?: { rtmpUrl: string; streamKey: string };
    recommended: {
      resolution: string;
      bitrate: number;
      framerate: number;
      keyframeInterval: number;
      audioCodec: string;
      videoCodec: string;
    };
  } {
    const stream = this.activeStreams.get(streamId);
    if (!stream) {
      throw new Error('Stream não encontrada');
    }

    return {
      youtube: stream.streaming.youtube ? {
        rtmpUrl: stream.streaming.youtube.rtmpUrl,
        streamKey: stream.streaming.youtube.streamKey
      } : undefined,
      
      platform: stream.streaming.platform ? {
        rtmpUrl: stream.streaming.platform.rtmpUrl,
        streamKey: stream.streaming.platform.streamKey
      } : undefined,
      
      recommended: {
        resolution: stream.technical.resolution,
        bitrate: stream.technical.bitrate,
        framerate: stream.technical.framerate,
        keyframeInterval: 2,
        audioCodec: stream.technical.audioCodec,
        videoCodec: stream.technical.videoCodec
      }
    };
  }

  /**
   * Obtém URLs de visualização para diferentes audiências
   */
  getViewingUrls(streamId: string, userType: 'public' | 'student' | 'premium'): {
    youtube?: string;
    platform?: string;
    embed?: {
      youtube?: string;
      platform?: string;
    };
  } {
    const stream = this.activeStreams.get(streamId);
    if (!stream) {
      throw new Error('Stream não encontrada');
    }

    const result: any = {};

    // YouTube sempre disponível para público
    if (stream.distribution.youtube.enabled && stream.streaming.youtube) {
      result.youtube = stream.streaming.youtube.watchUrl;
      result.embed = result.embed || {};
      result.embed.youtube = stream.streaming.youtube.embedUrl;
    }

    // Plataforma baseada no nível de acesso
    if (stream.distribution.platform.enabled && stream.streaming.platform) {
      const hasAccess = 
        stream.distribution.platform.accessLevel === 'free' ||
        (stream.distribution.platform.accessLevel === 'premium' && (userType === 'premium' || userType === 'student')) ||
        (stream.distribution.platform.accessLevel === 'course_only' && userType === 'student');

      if (hasAccess) {
        result.platform = stream.streaming.platform.hlsUrl;
        result.embed = result.embed || {};
        result.embed.platform = stream.streaming.platform.hlsUrl;
      }
    }

    return result;
  }

  /**
   * Coleta analytics em tempo real
   */
  private startAnalyticsCollection(streamId: string): void {
    const interval = setInterval(async () => {
      const stream = this.activeStreams.get(streamId);
      if (!stream || stream.status !== 'live') {
        clearInterval(interval);
        return;
      }

      try {
        // Coletar analytics do YouTube
        if (stream.distribution.youtube.enabled && stream.distribution.youtube.broadcastId) {
          const youtubeStats = await this.getYouTubeAnalytics(stream.distribution.youtube.broadcastId);
          stream.analytics.youtube = youtubeStats;
        }

        // Coletar analytics da plataforma
        if (stream.distribution.platform.enabled) {
          const platformStats = await this.getPlatformAnalytics(streamId);
          stream.analytics.platform = platformStats;
        }

        // Calcular totais
        const youtubeViewers = stream.analytics.youtube?.viewers || 0;
        const platformViewers = stream.analytics.platform?.viewers || 0;
        stream.analytics.totalViewers = youtubeViewers + platformViewers;
        
        if (stream.analytics.totalViewers > stream.analytics.peakViewers) {
          stream.analytics.peakViewers = stream.analytics.totalViewers;
        }

        stream.updatedAt = new Date().toISOString();

      } catch (error) {
        console.error('Erro ao coletar analytics:', error);
      }
    }, 30000); // A cada 30 segundos
  }

  /**
   * Para coleta de analytics
   */
  private stopAnalyticsCollection(streamId: string): void {
    // Implementar parada da coleta
    console.log(`Parando coleta de analytics para stream ${streamId}`);
  }

  /**
   * Processa gravações após o fim da transmissão
   */
  private async processRecordings(stream: LiveStream): Promise<void> {
    try {
      // Processar gravação do YouTube
      if (stream.distribution.youtube.enabled && stream.distribution.youtube.recordingEnabled) {
        await this.processYouTubeRecording(stream);
      }

      // Processar gravação da plataforma
      if (stream.distribution.platform.enabled && stream.distribution.platform.recordingEnabled) {
        await this.processPlatformRecording(stream);
      }

    } catch (error) {
      console.error('Erro ao processar gravações:', error);
    }
  }

  /**
   * Processa gravação do YouTube
   */
  private async processYouTubeRecording(stream: LiveStream): Promise<void> {
    // YouTube processa automaticamente
    stream.recording.youtube = {
      videoId: stream.distribution.youtube.broadcastId,
      processingStatus: 'processing'
    };
  }

  /**
   * Processa gravação da plataforma
   */
  private async processPlatformRecording(stream: LiveStream): Promise<void> {
    const recordingPath = `${this.config.rtmp.recordPath}/${stream.id}.mp4`;
    
    // Executar script de processamento
    await this.executeScript('process-live-recording.sh', [
      recordingPath,
      stream.id,
      'live_recording'
    ]);

    stream.recording.platform = {
      vodPath: recordingPath,
      processingStatus: 'processing'
    };
  }

  /**
   * Executa script de processamento
   */
  private async executeScript(scriptName: string, args: string[]): Promise<void> {
    // Implementar execução de script
    console.log(`Executando script ${scriptName} com args:`, args);
  }

  /**
   * Envia notificações de eventos da stream
   */
  private async notifyStreamEvent(stream: LiveStream, event: 'created' | 'started' | 'ended'): Promise<void> {
    try {
      // Webhook
      if (this.config.notifications.webhookUrl) {
        await fetch(this.config.notifications.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ stream, event, timestamp: new Date().toISOString() })
        });
      }

      // Telegram
      if (this.config.notifications.telegramBot) {
        await this.sendTelegramNotification(stream, event);
      }

      // Email
      if (this.config.notifications.emailNotifications) {
        await this.sendEmailNotification(stream, event);
      }

    } catch (error) {
      console.error('Erro ao enviar notificações:', error);
    }
  }

  /**
   * Envia notificação via Telegram
   */
  private async sendTelegramNotification(stream: LiveStream, event: string): Promise<void> {
    const bot = this.config.notifications.telegramBot!;
    const message = this.formatTelegramMessage(stream, event);
    
    await fetch(`https://api.telegram.org/bot${bot.token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: bot.chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  }

  /**
   * Formata mensagem para Telegram
   */
  private formatTelegramMessage(stream: LiveStream, event: string): string {
    const eventEmojis = {
      created: '📅',
      started: '🔴',
      ended: '⏹️'
    };

    const emoji = eventEmojis[event as keyof typeof eventEmojis] || '📺';
    
    let message = `${emoji} *Live Stream ${event.toUpperCase()}*\n\n`;
    message += `*Título:* ${stream.title}\n`;
    message += `*Instrutor:* ${stream.metadata.instructor}\n`;
    message += `*Categoria:* ${stream.metadata.category}\n`;
    
    if (event === 'started' || event === 'ended') {
      message += `*Visualizadores:* ${stream.analytics.totalViewers}\n`;
      if (stream.analytics.peakViewers > 0) {
        message += `*Pico de visualizadores:* ${stream.analytics.peakViewers}\n`;
      }
    }
    
    if (stream.streaming.youtube?.watchUrl) {
      message += `\n[Assistir no YouTube](${stream.streaming.youtube.watchUrl})`;
    }
    
    return message;
  }

  /**
   * Envia notificação por email
   */
  private async sendEmailNotification(stream: LiveStream, event: string): Promise<void> {
    // Implementar envio de email
    console.log(`Enviando email sobre ${event} da stream ${stream.title}`);
  }

  // Métodos auxiliares para APIs externas
  private async createYouTubeBroadcast(stream: LiveStream): Promise<any> {
    // Implementar criação de broadcast no YouTube
    return { id: 'youtube_broadcast_id' };
  }

  private async createYouTubeStream(stream: LiveStream): Promise<any> {
    // Implementar criação de stream no YouTube
    return {
      id: 'youtube_stream_id',
      cdn: {
        ingestionInfo: {
          ingestionAddress: 'rtmp://a.rtmp.youtube.com/live2',
          streamName: 'youtube_stream_key'
        }
      }
    };
  }

  private async bindYouTubeBroadcastStream(broadcastId: string, streamId: string): Promise<void> {
    // Implementar vinculação no YouTube
  }

  private async startYouTubeBroadcast(broadcastId: string): Promise<void> {
    // Implementar início do broadcast no YouTube
  }

  private async endYouTubeBroadcast(broadcastId: string): Promise<void> {
    // Implementar fim do broadcast no YouTube
  }

  private async startPlatformStream(stream: LiveStream): Promise<void> {
    // Implementar início da stream na plataforma
  }

  private async endPlatformStream(stream: LiveStream): Promise<void> {
    // Implementar fim da stream na plataforma
  }

  private async getYouTubeAnalytics(broadcastId: string): Promise<any> {
    // Implementar coleta de analytics do YouTube
    return {
      viewers: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      shares: Math.floor(Math.random() * 20)
    };
  }

  private async getPlatformAnalytics(streamId: string): Promise<any> {
    // Implementar coleta de analytics da plataforma
    return {
      viewers: Math.floor(Math.random() * 500),
      uniqueViewers: Math.floor(Math.random() * 400),
      chatMessages: Math.floor(Math.random() * 200),
      engagement: Math.random()
    };
  }

  private generateStreamId(): string {
    return `live_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateStreamKey(): string {
    return Math.random().toString(36).substr(2, 16);
  }
}

// Configuração padrão
export const defaultLiveStreamConfig: LiveStreamConfig = {
  rtmp: {
    serverUrl: 'rtmp://localhost',
    port: 1935,
    appName: 'live',
    recordPath: '/var/recordings',
    maxConnections: 100
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || '',
    clientId: process.env.YOUTUBE_CLIENT_ID || '',
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET || '',
    refreshToken: process.env.YOUTUBE_REFRESH_TOKEN || '',
    channelId: process.env.YOUTUBE_CHANNEL_ID || '',
    defaultPrivacy: 'public',
    autoRecord: true,
    autoPublish: true
  },
  platform: {
    hlsSegmentDuration: 6,
    hlsPlaylistSize: 10,
    dashSegmentDuration: 4,
    transcodingProfiles: [
      { name: '720p', resolution: '1280x720', bitrate: 2500, codec: 'h264' },
      { name: '1080p', resolution: '1920x1080', bitrate: 4000, codec: 'h264' },
      { name: '1440p', resolution: '2560x1440', bitrate: 8000, codec: 'h264' }
    ],
    cdnBaseUrl: process.env.CDN_BASE_URL || 'https://cdn.apocalypseacademy.com',
    maxConcurrentViewers: 1000
  },
  notifications: {
    webhookUrl: process.env.WEBHOOK_URL,
    emailNotifications: true,
    telegramBot: {
      token: process.env.TELEGRAM_BOT_TOKEN || '',
      chatId: process.env.TELEGRAM_CHAT_ID || ''
    }
  }
};

export default LiveStreamingManager;

