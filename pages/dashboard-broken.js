import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import MovieUIDashboard from '../components/MovieUIDashboard';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Boas-vindas */}
          <section className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>
              A última plataforma antes do fim
            </h1>
            <p className={styles.welcomeSubtitle}>
              Acesse todo o conteúdo exclusivo da Apocalypse Academy
            </p>
          </section>

          {/* Dashboard com widgets e catálogo completo */}
          <MovieUIDashboard />

          {/* Seção Categorias */}
          <section className={styles.categoriesSection}>
            <h2 className={styles.sectionTitle}>🗂️ CATEGORIAS</h2>
            <div className={styles.categoriesGrid}>
              <button 
                className={styles.categoryButton}
                onClick={() => router.push('/categoria/escatologia')}
              >
                <div className={styles.categoryIcon}>⛪</div>
                <h3 className={styles.categoryName}>Escatologia</h3>
                <p className={styles.categoryDescription}>Estudo dos últimos tempos e profecias bíblicas</p>
              </button>
              
              <button 
                className={styles.categoryButton}
                onClick={() => router.push('/categoria/geopolitica')}
              >
                <div className={styles.categoryIcon}>🌍</div>
                <h3 className={styles.categoryName}>Geopolítica</h3>
                <p className={styles.categoryDescription}>Análise dos eventos mundiais atuais</p>
              </button>
              
              <button 
                className={styles.categoryButton}
                onClick={() => router.push('/categoria/guerra-cultural')}
              >
                <div className={styles.categoryIcon}>⚔️</div>
                <h3 className={styles.categoryName}>Guerra Cultural</h3>
                <p className={styles.categoryDescription}>Batalha espiritual nos tempos modernos</p>
              </button>
            </div>
          </section>

          {/* Seção Atividades Recentes */}
          <section className={styles.recentActivitiesSection}>
            <h2 className={styles.sectionTitle}>📚 Atividades Recentes</h2>
            
            {/* Escatologia Bíblica Avançada */}
            <div className={styles.activityCourse}>
              <div className={styles.courseHeader}>
                <h3 className={styles.courseName}>Escatologia Bíblica Avançada</h3>
                <p className={styles.currentChapter}>📖 Capítulo 3: Os Sete Selos do Apocalipse</p>
                <div className={styles.courseMeta}>
                  <span>⏱️ 8h 30min</span>
                  <span>📚 12/20 aulas</span>
                  <span>🎯 60% concluído</span>
                </div>
              </div>
              
              <div className={styles.courseProgress}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '60%' }} />
                </div>
                <button 
                  className={styles.continueButton}
                  onClick={() => router.push('/cursos/escatologia-biblica-avancada/aulas/os-sete-selos-apocalipse?at=1245')}
                  aria-label="Continuar Escatologia Bíblica Avançada — Capítulo 3"
                >
                  Continuar Assistindo
                </button>
              </div>
              
              {/* Módulo de Capítulos */}
              <div className={styles.chaptersModuleContainer}>
                <h4 className={styles.chaptersTitle}>Capítulos</h4>
                <div className={styles.chaptersList}>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>00:00</div>
                    <div className={styles.chapterTitle}>Introdução: Os Sinais Ocultos</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>15:30</div>
                    <div className={styles.chapterTitle}>As Organizações Secretas</div>
                  </div>
                  <div className={`${styles.chapterItem} ${styles.currentChapter}`}>
                    <div className={styles.chapterTime}>32:45</div>
                    <div className={styles.chapterTitle}>O Sistema Financeiro Global</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>58:20</div>
                    <div className={styles.chapterTitle}>Conexões Proféticas</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>1:25:10</div>
                    <div className={styles.chapterTitle}>O Que Está Por Vir</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Geopolítica e Profecias Bíblicas */}
            <div className={styles.activityCourse}>
              <div className={styles.courseHeader}>
                <h3 className={styles.courseName}>Geopolítica e Profecias Bíblicas</h3>
                <p className={styles.currentChapter}>📖 Capítulo 5: O Papel de Israel nos Últimos Tempos</p>
                <div className={styles.courseMeta}>
                  <span>⏱️ 6h 45min</span>
                  <span>📚 15/18 aulas</span>
                  <span>🎯 75% concluído</span>
                </div>
              </div>
              
              <div className={styles.courseProgress}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '75%' }} />
                </div>
                <button 
                  className={styles.continueButton}
                  onClick={() => router.push('/cursos/geopolitica-profecias-biblicas/aulas/papel-israel-ultimos-tempos?at=890')}
                  aria-label="Continuar Geopolítica e Profecias Bíblicas — Capítulo 5"
                >
                  Continuar Assistindo
                </button>
              </div>
              
              {/* Módulo de Capítulos */}
              <div className={styles.chaptersModuleContainer}>
                <h4 className={styles.chaptersTitle}>Capítulos</h4>
                <div className={styles.chaptersList}>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>00:00</div>
                    <div className={styles.chapterTitle}>Introdução: Cenário Mundial</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>18:45</div>
                    <div className={styles.chapterTitle}>As Nações nos Últimos Tempos</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>35:20</div>
                    <div className={styles.chapterTitle}>Conflitos no Oriente Médio</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>52:10</div>
                    <div className={styles.chapterTitle}>A Nova Ordem Mundial</div>
                  </div>
                  <div className={`${styles.chapterItem} ${styles.currentChapter}`}>
                    <div className={styles.chapterTime}>1:08:30</div>
                    <div className={styles.chapterTitle}>O Papel de Israel nos Últimos Tempos</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guerra Espiritual Moderna */}
            <div className={styles.activityCourse}>
              <div className={styles.courseHeader}>
                <h3 className={styles.courseName}>Guerra Espiritual Moderna</h3>
                <p className={styles.currentChapter}>📖 Capítulo 2: Identificando Fortalezas Espirituais</p>
                <div className={styles.courseMeta}>
                  <span>⏱️ 4h 20min</span>
                  <span>📚 7/16 aulas</span>
                  <span>🎯 35% concluído</span>
                </div>
              </div>
              
              <div className={styles.courseProgress}>
                <div className={styles.progressBar}>
                  <div className={styles.progressFill} style={{ width: '35%' }} />
                </div>
                <button 
                  className={styles.continueButton}
                  onClick={() => router.push('/cursos/guerra-espiritual-moderna/aulas/identificando-fortalezas-espirituais?at=456')}
                  aria-label="Continuar Guerra Espiritual Moderna — Capítulo 2"
                >
                  Continuar Assistindo
                </button>
              </div>
              
              {/* Módulo de Capítulos */}
              <div className={styles.chaptersModuleContainer}>
                <h4 className={styles.chaptersTitle}>Capítulos</h4>
                <div className={styles.chaptersList}>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>00:00</div>
                    <div className={styles.chapterTitle}>Fundamentos da Guerra Espiritual</div>
                  </div>
                  <div className={`${styles.chapterItem} ${styles.currentChapter}`}>
                    <div className={styles.chapterTime}>22:15</div>
                    <div className={styles.chapterTitle}>Identificando Fortalezas Espirituais</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>45:30</div>
                    <div className={styles.chapterTitle}>Armadura de Deus</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>1:12:45</div>
                    <div className={styles.chapterTitle}>Estratégias de Combate</div>
                  </div>
                  <div className={styles.chapterItem}>
                    <div className={styles.chapterTime}>1:38:20</div>
                    <div className={styles.chapterTitle}>Vitória e Libertação</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Catálogo com Pré-visualização Limitada */}
          <section className={styles.catalogPreviewSection}>
            
            {/* Cursos Preview */}
            <div className={styles.categoryPreview}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.sectionTitle}>🎓 Cursos</h2>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => router.push('/cursos')}
                >
                  Ver tudo
                </button>
              </div>
              <div className={styles.previewGrid}>
                {Array.from({ length: 8 }, (_, i) => {
                  const posterImages = [
                    '/poster-escatologia.png',
                    '/poster-geopolitica.png', 
                    '/poster-guerra-espiritual.png',
                    '/poster-curso-1.png',
                    '/poster-curso-2.png',
                    '/poster-curso-3.png',
                    '/poster-curso-4.png',
                    '/poster-escatologia.png'
                  ];
                  const courseTitles = [
                    'Escatologia Bíblica Avançada',
                    'Geopolítica e Profecias Bíblicas',
                    'Guerra Espiritual Moderna',
                    'Sinais dos Tempos',
                    'Mistérios Revelados',
                    'Sabedoria Angelical',
                    'Conhecimento Ancestral',
                    'Profecias do Fim'
                  ];
                  return (
                    <div 
                      key={i} 
                      className={styles.moviePosterCard}
                      onClick={() => router.push(`/cursos/curso-profetico-${i + 1}`)}
                    >
                      <div className={styles.posterContainer}>
                        <img 
                          src={posterImages[i]} 
                          alt={courseTitles[i]}
                          className={styles.posterImage}
                        />
                        <div className={styles.posterOverlay}>
                          <h3 className={styles.posterTitle}>{courseTitles[i]}</h3>
                          <div className={styles.posterMeta}>
                            <span>⏱️ {8 + (i % 8)}h</span>
                            <span>📚 {12 + (i % 20)} aulas</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Documentários Preview */}
            <div className={styles.categoryPreview}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.sectionTitle}>🎬 Documentários</h2>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => router.push('/biblioteca')}
                >
                  Ver tudo
                </button>
              </div>
              <div className={styles.previewGrid}>
                {Array.from({ length: 6 }, (_, i) => {
                  const documentaryPosters = [
                    '/poster-documentario-1.png',
                    '/poster-documentario-2.png',
                    '/poster-documentario-3.png',
                    '/poster-documentario-1.png',
                    '/poster-documentario-2.png',
                    '/poster-documentario-3.png'
                  ];
                  const documentaryTitles = [
                    'Conspiração Global',
                    'Verdades Ocultas',
                    'Profecias Bíblicas',
                    'Sinais dos Tempos',
                    'Revelações Finais',
                    'Mistérios Revelados'
                  ];
                  return (
                    <div key={i} className={styles.moviePosterCard}>
                      <div className={styles.posterContainer}>
                        <img 
                          src={documentaryPosters[i]} 
                          alt={documentaryTitles[i]}
                          className={styles.posterImage}
                        />
                        <div className={styles.posterOverlay}>
                          <h3 className={styles.posterTitle}>{documentaryTitles[i]}</h3>
                          <div className={styles.posterMeta}>
                            <span>⏱️ {90 + (i % 60)}min</span>
                            <span>🎥 4K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Revistas Preview */}
            <div className={styles.categoryPreview}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.sectionTitle}>📰 Revistas</h2>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => router.push('/revistas-internas')}
                >
                  Ver tudo
                </button>
              </div>
              <div className={styles.previewGrid}>
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className={styles.catalogCard}>
                    <div className={styles.cardImage}>
                      <span className={styles.badge}>NOVA</span>
                    </div>
                    <div className={styles.cardContent}>
                      <h4 className={styles.cardTitle}>
                        Revista Apocalypse #{i + 1}
                      </h4>
                      <p className={styles.cardDescription}>
                        Análises proféticas e geopolíticas dos eventos atuais.
                      </p>
                      <div className={styles.cardMeta}>
                        <span>📄 {40 + (i % 80)} páginas</span>
                        <span>📅 {new Date().getFullYear()}</span>
                        <span>🔥 Exclusivo</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* eBooks Preview */}
            <div className={styles.categoryPreview}>
              <div className={styles.categoryHeader}>
                <h2 className={styles.sectionTitle}>📖 eBooks</h2>
                <button 
                  className={styles.viewAllButton}
                  onClick={() => router.push('/ebooks-internos')}
                >
                  Ver tudo
                </button>
              </div>
              <div className={styles.previewGrid}>
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className={styles.catalogCard}>
                    <div className={styles.cardImage}>
                      <span className={styles.badge}>
                        {i % 3 === 0 ? 'GRÁTIS' : 'PREMIUM'}
                      </span>
                    </div>
                    <div className={styles.cardContent}>
                      <h4 className={styles.cardTitle}>
                        eBook Profético {i + 1}
                      </h4>
                      <p className={styles.cardDescription}>
                        Guia completo sobre preparação para os últimos tempos.
                      </p>
                      <div className={styles.cardMeta}>
                        <span>📄 {60 + (i % 120)} páginas</span>
                        <span>⭐ 4.{6 + (i % 4)}</span>
                        <span>💎 Exclusivo</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

