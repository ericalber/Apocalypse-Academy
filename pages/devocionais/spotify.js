import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/SpotifyIntegration.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function SpotifyIntegration() {
  const [isConnected, setIsConnected] = useState(false);
  const [spotifyToken, setSpotifyToken] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [error, setError] = useState('');
  
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login?redirect=' + encodeURIComponent(router.asPath));
    }
  }, [isAuthenticated, router]);
  
  // Verificar se já existe conexão com o Spotify
  useEffect(() => {
    const checkSpotifyConnection = () => {
      const token = localStorage.getItem('spotify_token');
      if (token) {
        setSpotifyToken(token);
        setIsConnected(true);
        fetchPlaylists(token);
      }
    };
    
    checkSpotifyConnection();
  }, []);
  
  // Processar callback do Spotify após autorização
  useEffect(() => {
    if (router.isReady && router.query.code) {
      // Em uma implementação real, trocaríamos o código por um token de acesso
      // através de uma chamada ao backend
      handleSpotifyCallback(router.query.code);
    }
  }, [router.isReady, router.query]);
  
  // Simular conexão com o Spotify
  const connectToSpotify = () => {
    // Em uma implementação real, redirecionaríamos para a página de autorização do Spotify
    // Aqui estamos simulando esse processo
    simulateSpotifyAuth();
  };
  
  const simulateSpotifyAuth = () => {
    // Simulação de autenticação bem-sucedida
    setTimeout(() => {
      const mockToken = 'mock_spotify_token_' + Math.random().toString(36).substring(2);
      localStorage.setItem('spotify_token', mockToken);
      setSpotifyToken(mockToken);
      setIsConnected(true);
      fetchPlaylists(mockToken);
    }, 1500);
  };
  
  const handleSpotifyCallback = (code) => {
    // Simulação de troca de código por token
    console.log('Código de autorização recebido:', code);
    const mockToken = 'mock_spotify_token_' + Math.random().toString(36).substring(2);
    localStorage.setItem('spotify_token', mockToken);
    setSpotifyToken(mockToken);
    setIsConnected(true);
    fetchPlaylists(mockToken);
    
    // Limpar o código da URL
    router.replace('/devocionais/spotify', undefined, { shallow: true });
  };
  
  const disconnectSpotify = () => {
    localStorage.removeItem('spotify_token');
    setSpotifyToken(null);
    setIsConnected(false);
    setPlaylists([]);
    setCurrentPlaylist(null);
    setTracks([]);
    setCurrentTrack(null);
  };
  
  // Simular busca de playlists
  const fetchPlaylists = (token) => {
    // Em uma implementação real, faríamos uma chamada à API do Spotify
    setTimeout(() => {
      const mockPlaylists = [
        {
          id: 'playlist1',
          name: 'Devocionais Proféticos',
          description: 'Reflexões sobre profecias bíblicas e sua aplicação para os dias atuais',
          images: [{ url: '/images/playlist1.jpg' }],
          tracks: { total: 7 }
        },
        {
          id: 'playlist2',
          name: 'Meditações Escatológicas',
          description: 'Meditações sobre os eventos finais e a volta de Cristo',
          images: [{ url: '/images/playlist2.jpg' }],
          tracks: { total: 5 }
        },
        {
          id: 'playlist3',
          name: 'Batalha Espiritual',
          description: 'Reflexões sobre a guerra espiritual nos últimos dias',
          images: [{ url: '/images/playlist3.jpg' }],
          tracks: { total: 6 }
        },
        {
          id: 'playlist4',
          name: 'Preparação para os Últimos Dias',
          description: 'Como se preparar espiritualmente para os eventos finais',
          images: [{ url: '/images/playlist4.jpg' }],
          tracks: { total: 8 }
        }
      ];
      
      setPlaylists(mockPlaylists);
    }, 1000);
  };
  
  // Simular busca de faixas de uma playlist
  const fetchTracks = (playlistId) => {
    // Em uma implementação real, faríamos uma chamada à API do Spotify
    const playlist = playlists.find(p => p.id === playlistId);
    setCurrentPlaylist(playlist);
    
    setTimeout(() => {
      const mockTracks = [
        {
          id: 'track1',
          name: 'A Grande Tribulação',
          artists: [{ name: 'Pastor João Silva' }],
          duration_ms: 900000, // 15 minutos
          album: { images: [{ url: '/images/track1.jpg' }] }
        },
        {
          id: 'track2',
          name: 'Os Sete Selos do Apocalipse',
          artists: [{ name: 'Pastor João Silva' }],
          duration_ms: 1200000, // 20 minutos
          album: { images: [{ url: '/images/track2.jpg' }] }
        },
        {
          id: 'track3',
          name: 'A Marca da Besta',
          artists: [{ name: 'Pastor João Silva' }],
          duration_ms: 1080000, // 18 minutos
          album: { images: [{ url: '/images/track3.jpg' }] }
        },
        {
          id: 'track4',
          name: 'O Arrebatamento da Igreja',
          artists: [{ name: 'Pastor João Silva' }],
          duration_ms: 960000, // 16 minutos
          album: { images: [{ url: '/images/track4.jpg' }] }
        },
        {
          id: 'track5',
          name: 'As Duas Testemunhas',
          artists: [{ name: 'Pastor João Silva' }],
          duration_ms: 1140000, // 19 minutos
          album: { images: [{ url: '/images/track5.jpg' }] }
        }
      ];
      
      setTracks(mockTracks);
    }, 800);
  };
  
  // Simular reprodução de faixa
  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };
  
  const pauseTrack = () => {
    setIsPlaying(false);
  };
  
  const resumeTrack = () => {
    setIsPlaying(true);
  };
  
  // Formatar duração em minutos e segundos
  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <Layout title="Integração com Spotify | Apocalypse Academy">
      <div className={styles.spotifyContainer}>
        <div className={styles.spotifyHeader}>
          <h1 className={styles.spotifyTitle}>DEVOCIONAIS NO SPOTIFY</h1>
          <p className={styles.spotifyDescription}>
            Conecte-se ao Spotify para acessar nossos devocionais em áudio e playlists exclusivas.
          </p>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        {!isConnected ? (
          <div className={styles.connectSection}>
            <div className={styles.spotifyLogo}>
              <svg viewBox="0 0 24 24" width="80" height="80" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
            </div>
            <p className={styles.connectText}>
              Conecte-se ao Spotify para acessar playlists exclusivas de devocionais e áudios proféticos.
            </p>
            <button 
              className={styles.connectButton}
              onClick={connectToSpotify}
            >
              Conectar com Spotify
            </button>
          </div>
        ) : (
          <div className={styles.spotifyContent}>
            <div className={styles.spotifyNav}>
              <div className={styles.navHeader}>
                <h2 className={styles.navTitle}>Playlists</h2>
                <button 
                  className={styles.disconnectButton}
                  onClick={disconnectSpotify}
                >
                  Desconectar
                </button>
              </div>
              
              <div className={styles.playlistsList}>
                {playlists.map(playlist => (
                  <div 
                    key={playlist.id}
                    className={`${styles.playlistItem} ${currentPlaylist && currentPlaylist.id === playlist.id ? styles.active : ''}`}
                    onClick={() => fetchTracks(playlist.id)}
                  >
                    <div className={styles.playlistImage}>
                      {/* Placeholder para imagem da playlist */}
                    </div>
                    <div className={styles.playlistInfo}>
                      <h3 className={styles.playlistName}>{playlist.name}</h3>
                      <p className={styles.playlistTracks}>{playlist.tracks.total} faixas</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={styles.spotifyMain}>
              {currentPlaylist ? (
                <>
                  <div className={styles.playlistHeader}>
                    <div className={styles.playlistHeaderImage}>
                      {/* Placeholder para imagem da playlist */}
                    </div>
                    <div className={styles.playlistHeaderInfo}>
                      <span className={styles.playlistType}>PLAYLIST</span>
                      <h2 className={styles.playlistHeaderName}>{currentPlaylist.name}</h2>
                      <p className={styles.playlistHeaderDescription}>{currentPlaylist.description}</p>
                      <div className={styles.playlistMeta}>
                        <span>Apocalypse Academy</span>
                        <span>•</span>
                        <span>{currentPlaylist.tracks.total} faixas</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.tracksList}>
                    <div className={styles.tracksHeader}>
                      <div className={styles.trackNumberHeader}>#</div>
                      <div className={styles.trackTitleHeader}>TÍTULO</div>
                      <div className={styles.trackDurationHeader}>DURAÇÃO</div>
                    </div>
                    
                    {tracks.map((track, index) => (
                      <div 
                        key={track.id}
                        className={`${styles.trackItem} ${currentTrack && currentTrack.id === track.id ? styles.playing : ''}`}
                        onClick={() => playTrack(track)}
                      >
                        <div className={styles.trackNumber}>
                          {currentTrack && currentTrack.id === track.id && isPlaying ? (
                            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </div>
                        <div className={styles.trackInfo}>
                          <div className={styles.trackTitle}>{track.name}</div>
                          <div className={styles.trackArtist}>{track.artists[0].name}</div>
                        </div>
                        <div className={styles.trackDuration}>{formatDuration(track.duration_ms)}</div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className={styles.noPlaylistSelected}>
                  <p>Selecione uma playlist para ver as faixas disponíveis.</p>
                </div>
              )}
            </div>
            
            {currentTrack && (
              <div className={styles.playerBar}>
                <div className={styles.playerTrackInfo}>
                  <div className={styles.playerTrackImage}>
                    {/* Placeholder para imagem da faixa */}
                  </div>
                  <div className={styles.playerTrackDetails}>
                    <div className={styles.playerTrackTitle}>{currentTrack.name}</div>
                    <div className={styles.playerTrackArtist}>{currentTrack.artists[0].name}</div>
                  </div>
                </div>
                
                <div className={styles.playerControls}>
                  <button className={styles.playerButton}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    </svg>
                  </button>
                  
                  {isPlaying ? (
                    <button 
                      className={`${styles.playerButton} ${styles.playPauseButton}`}
                      onClick={pauseTrack}
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    </button>
                  ) : (
                    <button 
                      className={`${styles.playerButton} ${styles.playPauseButton}`}
                      onClick={resumeTrack}
                    >
                      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </button>
                  )}
                  
                  <button className={styles.playerButton}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
                    </svg>
                  </button>
                </div>
                
                <div className={styles.playerVolume}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                  <div className={styles.volumeSlider}>
                    <div className={styles.volumeProgress}></div>
                    <div className={styles.volumeHandle}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
