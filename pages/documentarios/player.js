import React, { useState, useEffect, useRef } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/VideoPlayer.module.css';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState('4K');
  const [showQualityOptions, setShowQualityOptions] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const videoRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  
  // Verificar autenticação para conteúdo premium
  useEffect(() => {
    const checkAccess = async () => {
      // Simulação: alguns vídeos são premium e requerem autenticação
      const isPremiumContent = id === 'premium-content';
      
      if (isPremiumContent && !isAuthenticated()) {
        router.push('/auth/login?redirect=' + encodeURIComponent(router.asPath));
      }
    };
    
    if (router.isReady) {
      checkAccess();
    }
  }, [id, isAuthenticated, router]);
  
  // Inicializar o vídeo quando o componente montar
  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      // Configurar listeners para o vídeo
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('loadedmetadata', handleMetadataLoaded);
      video.addEventListener('ended', handleVideoEnded);
      
      // Definir qualidade inicial (simulado)
      handleQualityChange('4K');
      
      return () => {
        // Limpar listeners quando o componente desmontar
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('loadedmetadata', handleMetadataLoaded);
        video.removeEventListener('ended', handleVideoEnded);
      };
    }
  }, []);
  
  // Mostrar/ocultar controles com base na atividade do mouse
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      // Limpar timeout anterior
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      // Configurar novo timeout para ocultar controles após 3 segundos
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 3000);
    };
    
    const playerContainer = playerContainerRef.current;
    if (playerContainer) {
      playerContainer.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        playerContainer.removeEventListener('mousemove', handleMouseMove);
        if (controlsTimeoutRef.current) {
          clearTimeout(controlsTimeoutRef.current);
        }
      };
    }
  }, [isPlaying]);
  
  // Handlers para eventos de vídeo
  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };
  
  const handleMetadataLoaded = () => {
    setDuration(videoRef.current.duration);
  };
  
  const handleVideoEnded = () => {
    setIsPlaying(false);
  };
  
  // Controles de reprodução
  const togglePlay = () => {
    const video = videoRef.current;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (newVolume) => {
    const video = videoRef.current;
    
    // Garantir que o volume esteja entre 0 e 1
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    
    video.volume = clampedVolume;
    setVolume(clampedVolume);
  };
  
  const handleProgressChange = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const toggleFullscreen = () => {
    const player = playerContainerRef.current;
    
    if (!document.fullscreenElement) {
      player.requestFullscreen().catch(err => {
        console.error(`Erro ao tentar entrar em modo de tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };
  
  const handleQualityChange = (newQuality) => {
    // Em uma implementação real, isso mudaria a fonte do vídeo
    // para uma versão de qualidade diferente
    setQuality(newQuality);
    setShowQualityOptions(false);
    
    // Simulação de mudança de qualidade
    console.log(`Qualidade alterada para ${newQuality}`);
  };
  
  // Formatação de tempo (segundos para MM:SS ou HH:MM:SS)
  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return '00:00';
    
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  };
  
  return (
    <Layout title="Player de Vídeo | Apocalypse Academy">
      <div className={styles.playerContainer}>
        <div 
          className={styles.videoWrapper} 
          ref={playerContainerRef}
        >
          {/* Placeholder para simulação - em produção, seria substituído por um vídeo real */}
          {!isPlaying ? (
            <div 
              className={styles.videoPlaceholder}
              onClick={togglePlay}
            >
              <div className={styles.playButton}>
                <svg viewBox="0 0 24 24" width="60" height="60" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className={styles.placeholderText}>Clique para iniciar o vídeo</p>
            </div>
          ) : null}
          
          {/* Vídeo real (oculto para simulação) */}
          <video 
            ref={videoRef}
            className={styles.videoElement}
            style={{ display: 'none' }} // Oculto para simulação
          >
            <source src="/videos/sample.mp4" type="video/mp4" />
            Seu navegador não suporta o elemento de vídeo.
          </video>
          
          {/* Controles de vídeo */}
          <div 
            className={`${styles.videoControls} ${showControls || !isPlaying ? styles.visible : ''}`}
          >
            <div 
              className={styles.progressBar}
              onClick={handleProgressChange}
            >
              <div 
                className={styles.progress}
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
              <div 
                className={styles.progressHandle}
                style={{ left: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            
            <div className={styles.controlsBottom}>
              <div className={styles.controlsLeft}>
                <button 
                  className={styles.controlButton}
                  onClick={togglePlay}
                >
                  {isPlaying ? (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </button>
                
                <div className={styles.volumeControl}>
                  <button className={styles.controlButton}>
                    {volume > 0 ? (
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    )}
                  </button>
                  <div 
                    className={styles.volumeSlider}
                    onClick={(e) => {
                      const slider = e.currentTarget;
                      const rect = slider.getBoundingClientRect();
                      const pos = (e.clientX - rect.left) / rect.width;
                      handleVolumeChange(pos);
                    }}
                  >
                    <div 
                      className={styles.volumeProgress}
                      style={{ width: `${volume * 100}%` }}
                    ></div>
                    <div 
                      className={styles.volumeHandle}
                      style={{ left: `${volume * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className={styles.timeDisplay}>
                  <span>{formatTime(currentTime)}</span>
                  <span> / </span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              
              <div className={styles.controlsRight}>
                <div className={styles.qualitySelector}>
                  <button 
                    className={styles.controlButton}
                    onClick={() => setShowQualityOptions(!showQualityOptions)}
                  >
                    <span>{quality}</span>
                  </button>
                  
                  {showQualityOptions && (
                    <div className={styles.qualityOptions}>
                      <div 
                        className={styles.qualityOption}
                        onClick={() => handleQualityChange('6K')}
                      >
                        6K
                      </div>
                      <div 
                        className={styles.qualityOption}
                        onClick={() => handleQualityChange('4K')}
                      >
                        4K
                      </div>
                      <div 
                        className={styles.qualityOption}
                        onClick={() => handleQualityChange('1080p')}
                      >
                        1080p
                      </div>
                      <div 
                        className={styles.qualityOption}
                        onClick={() => handleQualityChange('720p')}
                      >
                        720p
                      </div>
                      <div 
                        className={styles.qualityOption}
                        onClick={() => handleQualityChange('480p')}
                      >
                        480p
                      </div>
                      <div 
                        className={styles.qualityOption}
                        onClick={() => handleQualityChange('Auto')}
                      >
                        Auto
                      </div>
                    </div>
                  )}
                </div>
                
                <button 
                  className={styles.controlButton}
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                      <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.videoInfo}>
          <h1 className={styles.videoTitle}>A Arquitetura da Besta</h1>
          <p className={styles.videoDescription}>
            Uma análise profunda sobre as estruturas de poder global e sua relação com profecias bíblicas. Este documentário revela conexões surpreendentes entre organizações internacionais, movimentos políticos e as profecias sobre os últimos dias.
          </p>
          
          <div className={styles.videoMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Duração:</span>
              <span className={styles.metaValue}>1h 30min</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Qualidade:</span>
              <span className={styles.metaValue}>4K Ultra HD</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Lançamento:</span>
              <span className={styles.metaValue}>2025</span>
            </div>
          </div>
          
          <div className={styles.videoTags}>
            <span className={styles.tag}>Escatologia</span>
            <span className={styles.tag}>Geopolítica</span>
            <span className={styles.tag}>Profecias</span>
          </div>
        </div>
        
        <div className={styles.relatedVideos}>
          <h2 className={styles.relatedTitle}>Documentários Relacionados</h2>
          
          <div className={styles.relatedGrid}>
            <Link href="/documentarios/player?id=dossie-anticristo" className={styles.relatedCard}>
              <div className={styles.relatedImage}></div>
              <div className={styles.relatedContent}>
                <h3 className={styles.relatedVideoTitle}>O Dossiê do Anticristo</h3>
                <p className={styles.relatedVideoMeta}>1h 15min • 4K</p>
              </div>
            </Link>
            
            <Link href="/documentarios/player?id=ia-juizo-final" className={styles.relatedCard}>
              <div className={styles.relatedImage}></div>
              <div className={styles.relatedContent}>
                <h3 className={styles.relatedVideoTitle}>Inteligência Artificial e o Juízo Final</h3>
                <p className={styles.relatedVideoMeta}>1h 45min • 6K</p>
              </div>
            </Link>
            
            <Link href="/documentarios/player?id=grande-reset" className={styles.relatedCard}>
              <div className={styles.relatedImage}></div>
              <div className={styles.relatedContent}>
                <h3 className={styles.relatedVideoTitle}>O Grande Reset</h3>
                <p className={styles.relatedVideoMeta}>1h 35min • 4K</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
