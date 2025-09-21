import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Devocionais.module.css';
import Link from 'next/link';

export default function Devocionais() {
  return (
    <Layout title="Devocionais | Apocalypse Academy">
      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} stone-text`}>DEVOCIONAIS</h1>
          <p className={styles.description}>
            Áudios proféticos e reflexões espirituais para fortalecer sua fé nos tempos finais.
          </p>
        </div>
      </div>
      
      <section className={styles.spotifySection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>INTEGRAÇÃO COM SPOTIFY</h2>
          
          <div className={styles.spotifyEmbed}>
            <div className={styles.spotifyPlaceholder}>
              <div className={styles.spotifyLogo}>
                <svg viewBox="0 0 24 24" width="80" height="80" fill="#1DB954">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
              </div>
              <p className={styles.spotifyText}>Integração com Spotify</p>
              <p className={styles.spotifyDescription}>
                Ouça nossos devocionais diretamente do Spotify. Faça login para acessar playlists exclusivas.
              </p>
              <button className={styles.spotifyButton}>
                Conectar com Spotify
              </button>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>DEVOCIONAIS EM DESTAQUE</h2>
          
          <div className={styles.devocionalGrid}>
            <div className={styles.devocionalCard}>
              <div className={styles.devocionalImage}></div>
              <div className={styles.devocionalContent}>
                <span className={styles.devocionalTag}>Série</span>
                <h3 className={styles.devocionalTitle}>Preparando-se para os Últimos Dias</h3>
                <p className={styles.devocionalDescription}>
                  Uma série de 7 devocionais sobre como se preparar espiritualmente para os eventos finais.
                </p>
                <div className={styles.devocionalInfo}>
                  <span>7 episódios</span>
                  <span>15 min cada</span>
                </div>
                <button className={styles.playButton}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Reproduzir
                </button>
              </div>
            </div>
            
            <div className={styles.devocionalCard}>
              <div className={styles.devocionalImage}></div>
              <div className={styles.devocionalContent}>
                <span className={styles.devocionalTag}>Série</span>
                <h3 className={styles.devocionalTitle}>Profecias para o Nosso Tempo</h3>
                <p className={styles.devocionalDescription}>
                  Reflexões sobre as profecias bíblicas e sua aplicação para os dias atuais.
                </p>
                <div className={styles.devocionalInfo}>
                  <span>5 episódios</span>
                  <span>20 min cada</span>
                </div>
                <button className={styles.playButton}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Reproduzir
                </button>
              </div>
            </div>
            
            <div className={styles.devocionalCard}>
              <div className={styles.devocionalImage}></div>
              <div className={styles.devocionalContent}>
                <span className={styles.devocionalTag}>Série</span>
                <h3 className={styles.devocionalTitle}>Batalha Espiritual</h3>
                <p className={styles.devocionalDescription}>
                  Como se fortalecer espiritualmente para os conflitos dos últimos tempos.
                </p>
                <div className={styles.devocionalInfo}>
                  <span>6 episódios</span>
                  <span>18 min cada</span>
                </div>
                <button className={styles.playButton}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Reproduzir
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>CATEGORIAS</h2>
          
          <div className={styles.categoriesGrid}>
            <Link href="/devocionais/categoria/profecias" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <h3 className={styles.categoryTitle}>Profecias</h3>
            </Link>
            
            <Link href="/devocionais/categoria/oracao" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <h3 className={styles.categoryTitle}>Oração</h3>
            </Link>
            
            <Link href="/devocionais/categoria/batalha-espiritual" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <h3 className={styles.categoryTitle}>Batalha Espiritual</h3>
            </Link>
            
            <Link href="/devocionais/categoria/estudos-biblicos" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <h3 className={styles.categoryTitle}>Estudos Bíblicos</h3>
            </Link>
          </div>
        </div>
      </section>
      
      <section className={styles.latestSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>ÚLTIMOS LANÇAMENTOS</h2>
          
          <div className={styles.episodesList}>
            <div className={styles.episodeItem}>
              <div className={styles.episodeNumber}>01</div>
              <div className={styles.episodeInfo}>
                <h3 className={styles.episodeTitle}>A Marca da Besta: Entendendo a Profecia</h3>
                <p className={styles.episodeDescription}>
                  Uma análise profunda sobre Apocalipse 13 e o significado da marca da besta.
                </p>
              </div>
              <div className={styles.episodeMeta}>
                <span>22 min</span>
                <span>Maio 2025</span>
              </div>
              <button className={styles.episodePlayButton}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.episodeItem}>
              <div className={styles.episodeNumber}>02</div>
              <div className={styles.episodeInfo}>
                <h3 className={styles.episodeTitle}>Preparando-se para a Tribulação</h3>
                <p className={styles.episodeDescription}>
                  Como fortalecer sua fé para os tempos difíceis que estão por vir.
                </p>
              </div>
              <div className={styles.episodeMeta}>
                <span>18 min</span>
                <span>Maio 2025</span>
              </div>
              <button className={styles.episodePlayButton}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.episodeItem}>
              <div className={styles.episodeNumber}>03</div>
              <div className={styles.episodeInfo}>
                <h3 className={styles.episodeTitle}>O Arrebatamento: Mito ou Realidade?</h3>
                <p className={styles.episodeDescription}>
                  Uma análise bíblica sobre a doutrina do arrebatamento e suas diferentes interpretações.
                </p>
              </div>
              <div className={styles.episodeMeta}>
                <span>25 min</span>
                <span>Abril 2025</span>
              </div>
              <button className={styles.episodePlayButton}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
            
            <div className={styles.episodeItem}>
              <div className={styles.episodeNumber}>04</div>
              <div className={styles.episodeInfo}>
                <h3 className={styles.episodeTitle}>Tecnologia e Profecia</h3>
                <p className={styles.episodeDescription}>
                  Como os avanços tecnológicos modernos se alinham com as profecias bíblicas.
                </p>
              </div>
              <div className={styles.episodeMeta}>
                <span>20 min</span>
                <span>Abril 2025</span>
              </div>
              <button className={styles.episodePlayButton}>
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
