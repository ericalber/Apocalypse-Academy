import React, { useEffect, useRef, useState } from 'react';

interface ShakaPlayerCoreProps {
  src: string;
  type: 'dash' | 'hls';
  poster?: string;
  title?: string;
  captions?: Array<{
    lang: string;
    label: string;
    url: string;
  }>;
  chapters?: string;
  watermark?: string;
  autoplay?: boolean;
  controls?: boolean;
  onProgress?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
  onError?: (error: any) => void;
  fallback?: React.ReactNode;
}

const ShakaPlayerCore: React.FC<ShakaPlayerCoreProps> = ({
  src,
  type,
  poster,
  title,
  captions = [],
  chapters,
  watermark,
  autoplay = false,
  controls = true,
  onProgress,
  onEnded,
  onError,
  fallback
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shakaLoaded, setShakaLoaded] = useState(false);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Carregar Shaka Player dinamicamente
  useEffect(() => {
    const loadShaka = async () => {
      try {
        // Verificar se já está carregado
        if (typeof window !== 'undefined' && (window as any).shaka) {
          setShakaLoaded(true);
          return;
        }

        // Carregar Shaka Player via CDN
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/shaka-player/4.7.0/shaka-player.compiled.js';
        script.async = true;
        
        script.onload = () => {
          setShakaLoaded(true);
        };
        
        script.onerror = () => {
          console.warn('Falha ao carregar Shaka Player, usando fallback');
          setError('Shaka Player não disponível');
        };
        
        document.head.appendChild(script);
      } catch (err) {
        console.warn('Erro ao carregar Shaka Player:', err);
        setError('Erro ao carregar player');
      }
    };

    loadShaka();
  }, []);

  // Inicializar player quando Shaka estiver carregado
  useEffect(() => {
    if (!shakaLoaded || !videoRef.current) return;

    const initPlayer = async () => {
      try {
        const shaka = (window as any).shaka;
        
        // Verificar suporte
        if (!shaka.Player.isBrowserSupported()) {
          throw new Error('Navegador não suportado');
        }

        // Criar player
        const player = new shaka.Player(videoRef.current);
        playerRef.current = player;

        // Configurar player
        player.configure({
          streaming: {
            bufferingGoal: 30,
            rebufferingGoal: 5,
            bufferBehind: 30
          },
          drm: {
            retryParameters: {
              maxAttempts: 3,
              baseDelay: 1000,
              backoffFactor: 2
            }
          }
        });

        // Event listeners
        player.addEventListener('error', (event: any) => {
          console.error('Shaka Player error:', event.detail);
          setError(`Erro no player: ${event.detail.message || 'Erro desconhecido'}`);
          onError?.(event.detail);
        });

        // Carregar manifest
        await player.load(src);

        // Adicionar legendas
        if (captions.length > 0) {
          captions.forEach((caption, index) => {
            player.addTextTrack(caption.url, caption.lang, 'subtitle', caption.label);
          });
        }

        // Adicionar capítulos
        if (chapters) {
          player.addTextTrack(chapters, 'pt-BR', 'chapters', 'Capítulos');
        }

        setIsLoading(false);

        // Configurar eventos de progresso
        if (videoRef.current) {
          videoRef.current.addEventListener('timeupdate', () => {
            if (videoRef.current) {
              onProgress?.(videoRef.current.currentTime, videoRef.current.duration);
            }
          });

          videoRef.current.addEventListener('ended', () => {
            onEnded?.();
          });
        }

      } catch (err: any) {
        console.warn('Erro ao inicializar Shaka Player:', err);
        setError(err.message || 'Erro ao inicializar player');
        onError?.(err);
      }
    };

    initPlayer();

    // Cleanup
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [shakaLoaded, src, captions, chapters, onProgress, onEnded, onError]);

  // Watermark animation
  useEffect(() => {
    if (!watermark || !watermarkRef.current) return;

    const moveWatermark = () => {
      if (!watermarkRef.current) return;
      
      const container = watermarkRef.current.parentElement;
      if (!container) return;

      const maxX = container.clientWidth - watermarkRef.current.clientWidth;
      const maxY = container.clientHeight - watermarkRef.current.clientHeight;
      
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      
      watermarkRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    // Mover watermark a cada 30 segundos
    const interval = setInterval(moveWatermark, 30000);
    moveWatermark(); // Posição inicial

    return () => clearInterval(interval);
  }, [watermark]);

  // Se houver erro e fallback disponível, usar fallback
  if (error && fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="shaka-player-container">
      <video
        ref={videoRef}
        poster={poster}
        controls={controls}
        autoPlay={autoplay}
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          borderRadius: '8px'
        }}
      />
      
      {/* Loading overlay */}
      {isLoading && (
        <div className="shaka-loading-overlay">
          <div className="loading-spinner"></div>
          <p>Carregando vídeo...</p>
        </div>
      )}
      
      {/* Error overlay */}
      {error && !fallback && (
        <div className="shaka-error-overlay">
          <div className="error-content">
            <h3>Erro no Player</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              Recarregar
            </button>
          </div>
        </div>
      )}
      
      {/* Watermark */}
      {watermark && (
        <div 
          ref={watermarkRef}
          className="shaka-watermark"
        >
          {watermark}
        </div>
      )}
      
      <style jsx>{`
        .shaka-player-container {
          position: relative;
          width: 100%;
          height: 100%;
          background: #000;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .shaka-loading-overlay,
        .shaka-error-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 10;
        }
        
        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid #E11D2E;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 1rem;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .error-content {
          text-align: center;
          max-width: 300px;
        }
        
        .error-content h3 {
          margin-bottom: 1rem;
          color: #E11D2E;
        }
        
        .error-content p {
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }
        
        .retry-button {
          background: #E11D2E;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          transition: background 0.3s ease;
        }
        
        .retry-button:hover {
          background: #C41E3A;
        }
        
        .shaka-watermark {
          position: absolute;
          top: 20px;
          right: 20px;
          background: rgba(0, 0, 0, 0.7);
          color: rgba(255, 255, 255, 0.6);
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-family: monospace;
          pointer-events: none;
          z-index: 5;
          transition: transform 2s ease;
        }
      `}</style>
    </div>
  );
};

export default ShakaPlayerCore;

