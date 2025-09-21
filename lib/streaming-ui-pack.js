// STREAMING UI PACK - Sistema de Player e Transmissões Completo
// Seguindo Guide Master - Preservando estrutura visual existente

import { useState, useEffect, useRef } from 'react';

// Configurações de streaming
const STREAMING_CONFIG = {
  supportedFormats: ['mp4', 'webm', 'hls', 'dash'],
  qualityLevels: [
    { label: 'Auto', value: 'auto' },
    { label: '6K', value: '2160p', bitrate: 25000 },
    { label: '4K', value: '2160p', bitrate: 15000 },
    { label: '1440p', value: '1440p', bitrate: 8000 },
    { label: '1080p', value: '1080p', bitrate: 5000 },
    { label: '720p', value: '720p', bitrate: 2500 },
    { label: '480p', value: '480p', bitrate: 1000 },
    { label: '360p', value: '360p', bitrate: 500 }
  ],
  playbackSpeeds: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  bufferSize: 30, // segundos
  seekPreviewThumbnails: true,
  adaptiveBitrate: true,
  drmSupport: true
};

// Configurações de CDN e hosting
const CDN_CONFIG = {
  primary: 'https://cdn.apocalypse.academy',
  fallback: 'https://backup-cdn.apocalypse.academy',
  regions: {
    'br': 'https://br-cdn.apocalypse.academy',
    'us': 'https://us-cdn.apocalypse.academy',
    'eu': 'https://eu-cdn.apocalypse.academy'
  }
};

// Dados de exemplo para demonstração
const SAMPLE_CONTENT = {
  documentaries: [
    {
      id: 'doc_001',
      title: 'Os Eventos Finais da Profecia Bíblica',
      description: 'Uma análise profunda dos sinais dos tempos',
      duration: 8100, // 2h 15min em segundos
      thumbnail: '/images/documentaries/eventos-finais-thumb.jpg',
      poster: '/images/documentaries/eventos-finais-poster.jpg',
      sources: [
        {
          quality: '4K',
          url: `${CDN_CONFIG.primary}/documentaries/eventos-finais-4k.mp4`,
          type: 'video/mp4'
        },
        {
          quality: '1080p',
          url: `${CDN_CONFIG.primary}/documentaries/eventos-finais-1080p.mp4`,
          type: 'video/mp4'
        },
        {
          quality: '720p',
          url: `${CDN_CONFIG.primary}/documentaries/eventos-finais-720p.mp4`,
          type: 'video/mp4'
        }
      ],
      subtitles: [
        {
          language: 'pt-BR',
          label: 'Português',
          url: `${CDN_CONFIG.primary}/subtitles/eventos-finais-pt.vtt`,
          default: true
        },
        {
          language: 'en',
          label: 'English',
          url: `${CDN_CONFIG.primary}/subtitles/eventos-finais-en.vtt`
        }
      ],
      chapters: [
        { time: 0, title: 'Introdução' },
        { time: 300, title: 'Sinais dos Tempos' },
        { time: 1800, title: 'Profecias de Daniel' },
        { time: 3600, title: 'Apocalipse Revelado' },
        { time: 6000, title: 'Preparação Final' }
      ]
    }
  ],
  courses: [
    {
      id: 'course_001',
      title: 'Escatologia Bíblica Avançada',
      modules: [
        {
          id: 'module_001',
          title: 'Fundamentos da Escatologia',
          lessons: [
            {
              id: 'lesson_001',
              title: 'Introdução à Escatologia',
              duration: 1800,
              sources: [
                {
                  quality: '1080p',
                  url: `${CDN_CONFIG.primary}/courses/escatologia/mod1-les1-1080p.mp4`,
                  type: 'video/mp4'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  liveStreams: [
    {
      id: 'live_001',
      title: 'Transmissão ao Vivo - Estudo Bíblico',
      description: 'Estudo semanal sobre profecias',
      isLive: true,
      viewers: 1247,
      startTime: new Date().toISOString(),
      streamUrl: `${CDN_CONFIG.primary}/live/estudo-biblico.m3u8`,
      chatEnabled: true,
      quality: '1080p'
    }
  ]
};

// Classe principal do Streaming UI Pack
export class StreamingUIPack {
  constructor() {
    this.currentVideo = null;
    this.player = null;
    this.isPlaying = false;
    this.currentTime = 0;
    this.duration = 0;
    this.volume = 1;
    this.muted = false;
    this.fullscreen = false;
    this.quality = 'auto';
    this.playbackSpeed = 1;
    this.subtitlesEnabled = false;
    this.currentSubtitle = null;
    this.loading = false;
    this.buffering = false;
    this.error = null;
    this.analytics = {
      watchTime: 0,
      completionRate: 0,
      qualityChanges: 0,
      bufferEvents: 0
    };
  }

  // Inicializar player
  async initializePlayer(videoElement, options = {}) {
    try {
      this.player = videoElement;
      this.setupEventListeners();
      this.setupKeyboardControls();
      
      // Configurar qualidade adaptativa
      if (options.adaptiveBitrate !== false) {
        this.enableAdaptiveBitrate();
      }

      // Configurar DRM se necessário
      if (options.drm) {
        await this.setupDRM(options.drm);
      }

      return { success: true };
    } catch (error) {
      this.error = error.message;
      throw error;
    }
  }

  // Carregar vídeo
  async loadVideo(videoData) {
    try {
      this.loading = true;
      this.error = null;
      this.currentVideo = videoData;

      if (!this.player) {
        throw new Error('Player não inicializado');
      }

      // Selecionar melhor qualidade baseada na conexão
      const selectedSource = this.selectOptimalQuality(videoData.sources);
      
      // Configurar source
      this.player.src = selectedSource.url;
      this.player.poster = videoData.poster;

      // Configurar legendas
      if (videoData.subtitles) {
        this.setupSubtitles(videoData.subtitles);
      }

      // Aguardar carregamento dos metadados
      await new Promise((resolve, reject) => {
        const onLoadedMetadata = () => {
          this.duration = this.player.duration;
          this.player.removeEventListener('loadedmetadata', onLoadedMetadata);
          resolve();
        };

        const onError = () => {
          this.player.removeEventListener('error', onError);
          reject(new Error('Erro ao carregar vídeo'));
        };

        this.player.addEventListener('loadedmetadata', onLoadedMetadata);
        this.player.addEventListener('error', onError);
      });

      this.loading = false;
      return { success: true, duration: this.duration };

    } catch (error) {
      this.loading = false;
      this.error = error.message;
      throw error;
    }
  }

  // Selecionar qualidade ótima
  selectOptimalQuality(sources) {
    // Detectar largura de banda (simulado)
    const bandwidth = this.estimateBandwidth();
    
    // Selecionar qualidade baseada na largura de banda
    let selectedSource = sources[0];
    
    for (const source of sources) {
      const qualityInfo = STREAMING_CONFIG.qualityLevels.find(q => q.label === source.quality);
      if (qualityInfo && qualityInfo.bitrate <= bandwidth) {
        selectedSource = source;
        break;
      }
    }

    return selectedSource;
  }

  // Estimar largura de banda (simulado)
  estimateBandwidth() {
    // Em produção, usaria APIs reais de medição de largura de banda
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    
    if (connection) {
      return connection.downlink * 1000; // Mbps para kbps
    }

    // Fallback: assumir conexão média
    return 5000; // 5 Mbps
  }

  // Configurar event listeners
  setupEventListeners() {
    if (!this.player) return;

    // Eventos de reprodução
    this.player.addEventListener('play', () => {
      this.isPlaying = true;
      this.startAnalytics();
    });

    this.player.addEventListener('pause', () => {
      this.isPlaying = false;
      this.pauseAnalytics();
    });

    this.player.addEventListener('timeupdate', () => {
      this.currentTime = this.player.currentTime;
      this.updateAnalytics();
    });

    this.player.addEventListener('volumechange', () => {
      this.volume = this.player.volume;
      this.muted = this.player.muted;
    });

    // Eventos de buffer
    this.player.addEventListener('waiting', () => {
      this.buffering = true;
      this.analytics.bufferEvents++;
    });

    this.player.addEventListener('canplay', () => {
      this.buffering = false;
    });

    // Eventos de erro
    this.player.addEventListener('error', (e) => {
      this.error = 'Erro na reprodução do vídeo';
      console.error('Player error:', e);
    });

    // Fullscreen
    document.addEventListener('fullscreenchange', () => {
      this.fullscreen = !!document.fullscreenElement;
    });
  }

  // Controles de teclado
  setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      if (!this.player || document.activeElement.tagName === 'INPUT') return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          this.togglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          this.seek(this.currentTime - 10);
          break;
        case 'ArrowRight':
          e.preventDefault();
          this.seek(this.currentTime + 10);
          break;
        case 'ArrowUp':
          e.preventDefault();
          this.setVolume(Math.min(1, this.volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          this.setVolume(Math.max(0, this.volume - 0.1));
          break;
        case 'KeyM':
          e.preventDefault();
          this.toggleMute();
          break;
        case 'KeyF':
          e.preventDefault();
          this.toggleFullscreen();
          break;
      }
    });
  }

  // Controles de reprodução
  async play() {
    if (!this.player) return;
    try {
      await this.player.play();
      this.isPlaying = true;
    } catch (error) {
      this.error = 'Erro ao reproduzir vídeo';
      throw error;
    }
  }

  pause() {
    if (!this.player) return;
    this.player.pause();
    this.isPlaying = false;
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  seek(time) {
    if (!this.player) return;
    this.player.currentTime = Math.max(0, Math.min(time, this.duration));
  }

  setVolume(volume) {
    if (!this.player) return;
    this.player.volume = Math.max(0, Math.min(1, volume));
    this.volume = this.player.volume;
  }

  toggleMute() {
    if (!this.player) return;
    this.player.muted = !this.player.muted;
    this.muted = this.player.muted;
  }

  // Fullscreen
  async toggleFullscreen() {
    try {
      if (!this.fullscreen) {
        if (this.player.requestFullscreen) {
          await this.player.requestFullscreen();
        } else if (this.player.webkitRequestFullscreen) {
          await this.player.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Erro no fullscreen:', error);
    }
  }

  // Controle de qualidade
  changeQuality(quality) {
    if (!this.currentVideo) return;

    const source = this.currentVideo.sources.find(s => s.quality === quality);
    if (!source) return;

    const currentTime = this.currentTime;
    const wasPlaying = this.isPlaying;

    this.player.src = source.url;
    this.player.currentTime = currentTime;

    if (wasPlaying) {
      this.player.play();
    }

    this.quality = quality;
    this.analytics.qualityChanges++;
  }

  // Controle de velocidade
  setPlaybackSpeed(speed) {
    if (!this.player) return;
    this.player.playbackRate = speed;
    this.playbackSpeed = speed;
  }

  // Legendas
  setupSubtitles(subtitles) {
    // Remover legendas existentes
    const existingTracks = this.player.querySelectorAll('track');
    existingTracks.forEach(track => track.remove());

    // Adicionar novas legendas
    subtitles.forEach(subtitle => {
      const track = document.createElement('track');
      track.kind = 'subtitles';
      track.src = subtitle.url;
      track.srclang = subtitle.language;
      track.label = subtitle.label;
      track.default = subtitle.default || false;
      this.player.appendChild(track);
    });
  }

  toggleSubtitles() {
    const tracks = this.player.textTracks;
    if (tracks.length === 0) return;

    if (this.subtitlesEnabled) {
      // Desabilitar legendas
      for (let i = 0; i < tracks.length; i++) {
        tracks[i].mode = 'disabled';
      }
      this.subtitlesEnabled = false;
    } else {
      // Habilitar primeira legenda
      tracks[0].mode = 'showing';
      this.subtitlesEnabled = true;
      this.currentSubtitle = tracks[0];
    }
  }

  // Picture-in-Picture
  async togglePictureInPicture() {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (this.player.requestPictureInPicture) {
        await this.player.requestPictureInPicture();
      }
    } catch (error) {
      console.error('Erro no Picture-in-Picture:', error);
    }
  }

  // Analytics
  startAnalytics() {
    this.analyticsStartTime = Date.now();
  }

  pauseAnalytics() {
    if (this.analyticsStartTime) {
      this.analytics.watchTime += Date.now() - this.analyticsStartTime;
      this.analyticsStartTime = null;
    }
  }

  updateAnalytics() {
    if (this.duration > 0) {
      this.analytics.completionRate = (this.currentTime / this.duration) * 100;
    }
  }

  getAnalytics() {
    return {
      ...this.analytics,
      currentTime: this.currentTime,
      duration: this.duration,
      quality: this.quality,
      playbackSpeed: this.playbackSpeed
    };
  }

  // Streaming ao vivo
  async connectToLiveStream(streamData) {
    try {
      this.loading = true;

      // Verificar se é HLS
      if (streamData.streamUrl.includes('.m3u8')) {
        await this.setupHLS(streamData.streamUrl);
      } else {
        this.player.src = streamData.streamUrl;
      }

      // Configurar para live
      this.player.setAttribute('playsinline', '');
      this.isLive = true;

      this.loading = false;
      return { success: true };

    } catch (error) {
      this.loading = false;
      this.error = error.message;
      throw error;
    }
  }

  // Configurar HLS
  async setupHLS(url) {
    // Em produção, usaria hls.js
    if (this.player.canPlayType('application/vnd.apple.mpegurl')) {
      this.player.src = url;
    } else {
      throw new Error('HLS não suportado neste navegador');
    }
  }

  // DRM
  async setupDRM(drmConfig) {
    // Em produção, configuraria Widevine, PlayReady, etc.
    console.log('DRM configurado:', drmConfig);
  }

  // Bitrate adaptativo
  enableAdaptiveBitrate() {
    // Em produção, implementaria ABR real
    console.log('Bitrate adaptativo habilitado');
  }

  // Playlist
  createPlaylist(videos) {
    return {
      id: `playlist_${Date.now()}`,
      videos: videos,
      currentIndex: 0,
      shuffle: false,
      repeat: false
    };
  }

  // Próximo vídeo na playlist
  nextVideo(playlist) {
    if (playlist.currentIndex < playlist.videos.length - 1) {
      playlist.currentIndex++;
      return playlist.videos[playlist.currentIndex];
    } else if (playlist.repeat) {
      playlist.currentIndex = 0;
      return playlist.videos[0];
    }
    return null;
  }

  // Vídeo anterior na playlist
  previousVideo(playlist) {
    if (playlist.currentIndex > 0) {
      playlist.currentIndex--;
      return playlist.videos[playlist.currentIndex];
    } else if (playlist.repeat) {
      playlist.currentIndex = playlist.videos.length - 1;
      return playlist.videos[playlist.currentIndex];
    }
    return null;
  }

  // Embaralhar playlist
  shufflePlaylist(playlist) {
    const shuffled = [...playlist.videos];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    playlist.videos = shuffled;
    playlist.currentIndex = 0;
    playlist.shuffle = true;
  }

  // Limpar recursos
  destroy() {
    if (this.player) {
      this.player.pause();
      this.player.src = '';
      this.player = null;
    }
    this.pauseAnalytics();
  }
}

// Instância singleton
export const streamingUIPack = new StreamingUIPack();

// Hook React para usar o Streaming UI Pack
export const useStreamingPlayer = () => {
  const [playerState, setPlayerState] = useState({
    isPlaying: streamingUIPack.isPlaying,
    currentTime: streamingUIPack.currentTime,
    duration: streamingUIPack.duration,
    volume: streamingUIPack.volume,
    muted: streamingUIPack.muted,
    fullscreen: streamingUIPack.fullscreen,
    quality: streamingUIPack.quality,
    playbackSpeed: streamingUIPack.playbackSpeed,
    loading: streamingUIPack.loading,
    buffering: streamingUIPack.buffering,
    error: streamingUIPack.error
  });

  useEffect(() => {
    const updateState = () => {
      setPlayerState({
        isPlaying: streamingUIPack.isPlaying,
        currentTime: streamingUIPack.currentTime,
        duration: streamingUIPack.duration,
        volume: streamingUIPack.volume,
        muted: streamingUIPack.muted,
        fullscreen: streamingUIPack.fullscreen,
        quality: streamingUIPack.quality,
        playbackSpeed: streamingUIPack.playbackSpeed,
        loading: streamingUIPack.loading,
        buffering: streamingUIPack.buffering,
        error: streamingUIPack.error
      });
    };

    const interval = setInterval(updateState, 100);
    return () => clearInterval(interval);
  }, []);

  return {
    ...playerState,
    sampleContent: SAMPLE_CONTENT,
    initializePlayer: streamingUIPack.initializePlayer.bind(streamingUIPack),
    loadVideo: streamingUIPack.loadVideo.bind(streamingUIPack),
    play: streamingUIPack.play.bind(streamingUIPack),
    pause: streamingUIPack.pause.bind(streamingUIPack),
    togglePlay: streamingUIPack.togglePlay.bind(streamingUIPack),
    seek: streamingUIPack.seek.bind(streamingUIPack),
    setVolume: streamingUIPack.setVolume.bind(streamingUIPack),
    toggleMute: streamingUIPack.toggleMute.bind(streamingUIPack),
    toggleFullscreen: streamingUIPack.toggleFullscreen.bind(streamingUIPack),
    changeQuality: streamingUIPack.changeQuality.bind(streamingUIPack),
    setPlaybackSpeed: streamingUIPack.setPlaybackSpeed.bind(streamingUIPack),
    toggleSubtitles: streamingUIPack.toggleSubtitles.bind(streamingUIPack),
    togglePictureInPicture: streamingUIPack.togglePictureInPicture.bind(streamingUIPack),
    connectToLiveStream: streamingUIPack.connectToLiveStream.bind(streamingUIPack),
    getAnalytics: streamingUIPack.getAnalytics.bind(streamingUIPack),
    createPlaylist: streamingUIPack.createPlaylist.bind(streamingUIPack),
    nextVideo: streamingUIPack.nextVideo.bind(streamingUIPack),
    previousVideo: streamingUIPack.previousVideo.bind(streamingUIPack),
    shufflePlaylist: streamingUIPack.shufflePlaylist.bind(streamingUIPack)
  };
};

export default streamingUIPack;

