import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from '../components/Header';
import styles from '../styles/Dashboard.module.css';

const MeusCursos = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/entrar?redirect=/meus-cursos');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated()) {
    return <div>Carregando...</div>;
  }

  return (
    <div className={styles.dashboardContainer}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>📚 Meus Cursos</h1>
            <p className={styles.welcomeSubtitle}>
              Continue seus estudos proféticos onde parou
            </p>
          </section>

          {/* Cursos em Progresso */}
          <section className={styles.catalogSection}>
            <h2 className={styles.sectionTitle}>🎯 Em Progresso</h2>
            <div className={styles.grid}>
              {Array.from({ length: 6 }, (_, i) => (
                <div 
                  key={i} 
                  className={styles.catalogCard}
                  onClick={() => router.push(`/cursos/curso-profetico-${i + 1}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.cardImage}>
                    <span className={styles.badge}>
                      {Math.floor(Math.random() * 80 + 10)}% COMPLETO
                    </span>
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>
                      Escatologia Bíblica {i + 1}
                    </h4>
                    <p className={styles.cardDescription}>
                      Estudo profundo sobre os últimos tempos e profecias.
                    </p>
                    <div className={styles.progressBar}>
                      <div 
                        className={styles.progressFill} 
                        style={{ width: `${Math.floor(Math.random() * 80 + 10)}%` }}
                      ></div>
                    </div>
                    <div className={styles.cardMeta}>
                      <span>⏱️ {Math.floor(Math.random() * 5 + 2)}h restantes</span>
                      <span>📚 Aula {Math.floor(Math.random() * 15 + 5)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cursos Concluídos */}
          <section className={styles.catalogSection}>
            <h2 className={styles.sectionTitle}>✅ Concluídos</h2>
            <div className={styles.grid}>
              {Array.from({ length: 8 }, (_, i) => (
                <div 
                  key={i} 
                  className={styles.catalogCard}
                  onClick={() => router.push(`/cursos/profecia-cumprida-${i + 1}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.cardImage}>
                    <span className={styles.badge}>CONCLUÍDO</span>
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>
                      Profecia Cumprida {i + 1}
                    </h4>
                    <p className={styles.cardDescription}>
                      Análise das profecias já cumpridas na história.
                    </p>
                    <div className={styles.cardMeta}>
                      <span>🏆 Certificado</span>
                      <span>⭐ Avaliado</span>
                      <span>📅 Concluído</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Todos os Cursos Disponíveis */}
          <section className={styles.catalogSection}>
            <h2 className={styles.sectionTitle}>🎓 Todos os Cursos (40+)</h2>
            <div className={styles.grid}>
              {Array.from({ length: 42 }, (_, i) => (
                <div 
                  key={i} 
                  className={styles.catalogCard}
                  onClick={() => router.push(`/cursos/curso-profetico-${i + 1}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.cardImage}>
                    <span className={styles.badge}>DISPONÍVEL</span>
                  </div>
                  <div className={styles.cardContent}>
                    <h4 className={styles.cardTitle}>
                      Curso Profético {i + 1}
                    </h4>
                    <p className={styles.cardDescription}>
                      Estudo avançado sobre escatologia e sinais dos tempos.
                    </p>
                    <div className={styles.cardMeta}>
                      <span>⭐ 4.{8 + (i % 2)}</span>
                      <span>⏱️ {8 + (i % 8)} horas</span>
                      <span>📚 {12 + (i % 20)} aulas</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default MeusCursos;

