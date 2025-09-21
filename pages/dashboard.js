import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
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
        <div className={styles.heroSection}>
          <h1>Dashboard - Apocalypse Academy</h1>
          <p>Bem-vindo à sua área exclusiva</p>
        </div>

        {/* Seção de Cursos */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📚 Meus Cursos</h2>
            <button 
              className={styles.viewAllButton}
              onClick={() => router.push('/cursos')}
            >
              Ver Tudo
            </button>
          </div>
          
          <div className={styles.posterGrid}>
            {/* Curso 1 */}
            <div className={styles.posterCard}>
              <div className={styles.posterImage}>
                <img src="/images/posters/escatologia-avancada.jpg" alt="Escatologia Bíblica Avançada" />
              </div>
              <div className={styles.posterOverlay}>
                <h3 className={styles.posterTitle}>Escatologia Bíblica Avançada</h3>
                <div className={styles.posterMeta}>
                  <span>⏱️ 12h</span>
                  <span>📚 24 aulas</span>
                </div>
              </div>
            </div>

            {/* Curso 2 */}
            <div className={styles.posterCard}>
              <div className={styles.posterImage}>
                <img src="/images/posters/guerra-espiritual.jpg" alt="Guerra Espiritual Moderna" />
              </div>
              <div className={styles.posterOverlay}>
                <h3 className={styles.posterTitle}>Guerra Espiritual Moderna</h3>
                <div className={styles.posterMeta}>
                  <span>⏱️ 10h</span>
                  <span>📚 14 aulas</span>
                </div>
              </div>
            </div>

            {/* Curso 3 */}
            <div className={styles.posterCard}>
              <div className={styles.posterImage}>
                <img src="/images/posters/geopolitica-profecia.jpg" alt="Geopolítica e Profecias Bíblicas" />
              </div>
              <div className={styles.posterOverlay}>
                <h3 className={styles.posterTitle}>Geopolítica e Profecias Bíblicas</h3>
                <div className={styles.posterMeta}>
                  <span>⏱️ 8h</span>
                  <span>📚 13 aulas</span>
                </div>
              </div>
            </div>

            {/* Curso 4 */}
            <div className={styles.posterCard}>
              <div className={styles.posterImage}>
                <img src="/images/posters/preparacao-tempos-finais.jpg" alt="Preparação para os Tempos Finais" />
              </div>
              <div className={styles.posterOverlay}>
                <h3 className={styles.posterTitle}>Preparação para os Tempos Finais</h3>
                <div className={styles.posterMeta}>
                  <span>⏱️ 6h</span>
                  <span>📚 12 aulas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de Documentários */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>🎬 Documentários Exclusivos</h2>
          </div>
          
          <div className={styles.posterGrid}>
            {/* Documentário 1 */}
            <div className={styles.posterCard}>
              <div className={styles.posterImage}>
                <img src="/images/posters/verdades-ocultas.jpg" alt="Verdades Ocultas" />
              </div>
              <div className={styles.posterOverlay}>
                <h3 className={styles.posterTitle}>Verdades Ocultas</h3>
                <div className={styles.posterMeta}>
                  <span>⏱️ 82min</span>
                  <span>🎬 4K</span>
                </div>
              </div>
            </div>

            {/* Documentário 2 */}
            <div className={styles.posterCard}>
              <div className={styles.posterImage}>
                <img src="/images/posters/revelacoes-finais.jpg" alt="Revelações Finais" />
              </div>
              <div className={styles.posterOverlay}>
                <h3 className={styles.posterTitle}>Revelações Finais</h3>
                <div className={styles.posterMeta}>
                  <span>⏱️ 94min</span>
                  <span>🎬 4K</span>
                </div>
              </div>
            </div>

            {/* Documentário 3 */}
            <div className={styles.posterCard}>
              <div className={styles.posterImage}>
                <img src="/images/posters/conspiracao-global.jpg" alt="Conspiração Global" />
              </div>
              <div className={styles.posterOverlay}>
                <h3 className={styles.posterTitle}>Conspiração Global</h3>
                <div className={styles.posterMeta}>
                  <span>⏱️ 76min</span>
                  <span>🎬 4K</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção de E-books */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2>📖 Biblioteca Digital</h2>
            <button 
              className={styles.viewAllButton}
              onClick={() => router.push('/biblioteca')}
            >
              Ver Biblioteca
            </button>
          </div>
          
          <div className={styles.ebookGrid}>
            {/* E-book 1 */}
            <div className={styles.ebookCard}>
              <div className={styles.ebookCover}>
                <img src="/images/ebooks/preparacao-ultimos-dias.jpg" alt="Preparação para os Últimos Dias" />
              </div>
              <div className={styles.ebookInfo}>
                <h4>Preparação para os Últimos Dias</h4>
                <p>Manual prático completo</p>
                <div className={styles.ebookActions}>
                  <button className={styles.readButton}>📖 Ler Online</button>
                  <button className={styles.downloadButton}>⬇️ Baixar</button>
                </div>
              </div>
            </div>

            {/* E-book 2 */}
            <div className={styles.ebookCard}>
              <div className={styles.ebookCover}>
                <img src="/images/ebooks/decifrando-daniel.jpg" alt="Decifrando Daniel e Apocalipse" />
              </div>
              <div className={styles.ebookInfo}>
                <h4>Decifrando Daniel e Apocalipse</h4>
                <p>Estudo profético avançado</p>
                <div className={styles.ebookActions}>
                  <button className={styles.readButton}>📖 Ler Online</button>
                  <button className={styles.downloadButton}>⬇️ Baixar</button>
                </div>
              </div>
            </div>

            {/* E-book 3 */}
            <div className={styles.ebookCard}>
              <div className={styles.ebookCover}>
                <img src="/images/ebooks/sinais-tempos.jpg" alt="Sinais dos Tempos" />
              </div>
              <div className={styles.ebookInfo}>
                <h4>Sinais dos Tempos</h4>
                <p>Checklist profético</p>
                <div className={styles.ebookActions}>
                  <button className={styles.readButton}>📖 Ler Online</button>
                  <button className={styles.downloadButton}>⬇️ Baixar</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Botão de Logout */}
        <div className={styles.logoutSection}>
          <button 
            className={styles.logoutButton}
            onClick={() => {
              localStorage.removeItem('auth_token');
              localStorage.removeItem('user_data');
              router.push('/');
            }}
          >
            Sair
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

