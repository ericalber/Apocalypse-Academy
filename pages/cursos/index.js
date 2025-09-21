import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Cursos.module.css';
import Link from 'next/link';

export default function Cursos() {
  return (
    <Layout title="Cursos | Apocalypse Academy">
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>Cursos</span>
      </nav>

      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} stone-text cursos-title`}>CURSOS</h1>
          <p className={styles.description}>
            Aprofunde seu conhecimento com nossos cursos exclusivos sobre escatologia, geopolítica e guerra cultural.
          </p>
        </div>
      </div>
      
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>CURSOS EM DESTAQUE</h2>
          
          <div className={styles.coursesGrid}>
            <div className={styles.courseCard}>
              <div className={styles.courseImage}></div>
              <div className={styles.courseContent}>
                <span className={styles.courseTag}>Escatologia</span>
                <h3 className={styles.courseTitle}>REVELAÇÕES FINAIS: Segredos Escatológicos que Ninguém te Contou</h3>
                <p className={styles.courseDescription}>
                  Descubra as profecias ocultas que estão se cumprindo AGORA e prepare-se para eventos iminentes que mudarão o mundo para sempre.
                </p>
                <div className={styles.courseInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Módulos</span>
                    <span className={styles.infoValue}>12</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Duração</span>
                    <span className={styles.infoValue}>36h</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Nível</span>
                    <span className={styles.infoValue}>Intermediário</span>
                  </div>
                </div>
                <Link href="/cursos/escatologia-biblica" className={styles.courseButton}>
                  Ver Curso
                </Link>
              </div>
            </div>
            
            <div className={styles.courseCard}>
              <div className={styles.courseImage}></div>
              <div className={styles.courseContent}>
                <span className={styles.courseTag}>Geopolítica</span>
                <h3 className={styles.courseTitle}>PODER GLOBAL EXPOSTO: O Mapa Secreto do Apocalipse</h3>
                <p className={styles.courseDescription}>
                  As alianças ocultas entre nações que estão preparando o cenário para o Armagedom. Descubra quais países já estão cumprindo seu papel profético.
                </p>
                <div className={styles.courseInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Módulos</span>
                    <span className={styles.infoValue}>8</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Duração</span>
                    <span className={styles.infoValue}>24h</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Nível</span>
                    <span className={styles.infoValue}>Avançado</span>
                  </div>
                </div>
                <Link href="/cursos/geopolitica-profetica" className={styles.courseButton}>
                  Ver Curso
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>CATEGORIAS</h2>
          
          <div className={styles.categoriesGrid}>
            <Link href="/cursos/categoria/escatologia" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <h3 className={styles.categoryTitle}>Escatologia</h3>
            </Link>
            
            <Link href="/cursos/categoria/geopolitica" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <h3 className={styles.categoryTitle}>Geopolítica</h3>
            </Link>
            
            <Link href="/cursos/categoria/guerra-cultural" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <h3 className={styles.categoryTitle}>Guerra Cultural</h3>
            </Link>
            
            <Link href="/cursos/categoria/profecias" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <h3 className={styles.categoryTitle}>Profecias</h3>
            </Link>
          </div>
        </div>
      </section>
      
      <section className={styles.allCoursesSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>TODOS OS CURSOS</h2>
          
          <div className={styles.coursesGrid}>
            <div className={styles.courseCard}>
              <div className={styles.courseImage}></div>
              <div className={styles.courseContent}>
                <span className={styles.courseTag}>Escatologia</span>
                <h3 className={styles.courseTitle}>Escatologia Bíblica</h3>
                <p className={styles.courseDescription}>
                  Um estudo aprofundado sobre as profecias do fim dos tempos.
                </p>
                <div className={styles.courseInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Módulos</span>
                    <span className={styles.infoValue}>12</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Duração</span>
                    <span className={styles.infoValue}>36h</span>
                  </div>
                </div>
                <Link href="/cursos/escatologia-biblica" className={styles.courseButton}>
                  Ver Curso
                </Link>
              </div>
            </div>
            
            <div className={styles.courseCard}>
              <div className={styles.courseImage}></div>
              <div className={styles.courseContent}>
                <span className={styles.courseTag}>Geopolítica</span>
                <h3 className={styles.courseTitle}>Geopolítica Profética</h3>
                <p className={styles.courseDescription}>
                  Entenda os eventos mundiais à luz das profecias bíblicas.
                </p>
                <div className={styles.courseInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Módulos</span>
                    <span className={styles.infoValue}>8</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Duração</span>
                    <span className={styles.infoValue}>24h</span>
                  </div>
                </div>
                <Link href="/cursos/geopolitica-profetica" className={styles.courseButton}>
                  Ver Curso
                </Link>
              </div>
            </div>
            
            <div className={styles.courseCard}>
              <div className={styles.courseImage}></div>
              <div className={styles.courseContent}>
                <span className={styles.courseTag}>Guerra Cultural</span>
                <h3 className={styles.courseTitle}>GUERRA INVISÍVEL: As Armas Secretas Contra os Cristãos</h3>
                <p className={styles.courseDescription}>
                  As estratégias ocultas sendo usadas contra os fiéis e as técnicas poderosas para proteger sua família e vencer a batalha espiritual dos últimos dias.
                </p>
                <div className={styles.courseInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Módulos</span>
                    <span className={styles.infoValue}>10</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Duração</span>
                    <span className={styles.infoValue}>30h</span>
                  </div>
                </div>
                <Link href="/cursos/batalha-pela-verdade" className={styles.courseButton}>
                  Ver Curso
                </Link>
              </div>
            </div>
            
            <div className={styles.courseCard}>
              <div className={styles.courseImage}></div>
              <div className={styles.courseContent}>
                <span className={styles.courseTag}>Profecias</span>
                <h3 className={styles.courseTitle}>CÓDIGOS PROFÉTICOS DECIFRADOS: O Que a Bíblia Realmente Predisse</h3>
                <p className={styles.courseDescription}>
                  As profecias bíblicas mais precisas que estão se cumprindo em 2025. A terceira revelação mudará completamente sua visão do futuro próximo.
                </p>
                <div className={styles.courseInfo}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Módulos</span>
                    <span className={styles.infoValue}>6</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>Duração</span>
                    <span className={styles.infoValue}>18h</span>
                  </div>
                </div>
                <Link href="/cursos/profecias-biblicas-reveladas" className={styles.courseButton}>
                  Ver Curso
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
