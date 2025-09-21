import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Revistas.module.css';
import Link from 'next/link';

export default function Revistas() {
  return (
    <Layout title="Revistas | Apocalypse Academy">
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>Revistas</span>
      </nav>

      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} stone-text revistas-title`}>REVISTAS</h1>
          <p className={styles.description}>
            Publicações exclusivas com análises profundas sobre escatologia, geopolítica e guerra cultural.
          </p>
        </div>
      </div>
      
      <section className={styles.latestSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>ÚLTIMA EDIÇÃO</h2>
          
          <div className={styles.latestIssue}>
            <div className={styles.issueImage}></div>
            <div className={styles.issueContent}>
              <span className={styles.issueNumber}>Edição #12</span>
              <h3 className={styles.issueTitle}>REVELADO: O Plano Secreto do Grande Reset que Mudará sua Vida em 2025</h3>
              <p className={styles.issueDescription}>
                Documentos vazados expõem a agenda oculta da elite global e como ela cumpre exatamente o que a Bíblia profetizou. O que descobrimos vai chocar você e mudar sua preparação para os eventos iminentes.
              </p>
              <div className={styles.issueInfo}>
                <span>Maio 2025</span>
                <span>68 páginas</span>
                <span>PDF Interativo</span>
              </div>
              <div className={styles.issueActions}>
                <Link href="/revistas/grande-reset" className={styles.primaryButton}>
                  Ler Agora
                </Link>
                <Link href="/revistas/grande-reset/download" className={styles.secondaryButton}>
                  Download PDF
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.archiveSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>ARQUIVO DE EDIÇÕES</h2>
          
          <div className={styles.issuesGrid}>
            <div className={styles.issueCard}>
              <div className={styles.issueCardImage}></div>
              <div className={styles.issueCardContent}>
                <span className={styles.issueCardNumber}>Edição #11</span>
                <h3 className={styles.issueCardTitle}>Inteligência Artificial e Profecia</h3>
                <div className={styles.issueCardInfo}>
                  <span>Abril 2025</span>
                  <span>62 páginas</span>
                </div>
                <Link href="/revistas/ia-e-profecia" className={styles.issueCardButton}>
                  Ler Agora
                </Link>
              </div>
            </div>
            
            <div className={styles.issueCard}>
              <div className={styles.issueCardImage}></div>
              <div className={styles.issueCardContent}>
                <span className={styles.issueCardNumber}>Edição #10</span>
                <h3 className={styles.issueCardTitle}>Babilônia Digital</h3>
                <div className={styles.issueCardInfo}>
                  <span>Março 2025</span>
                  <span>58 páginas</span>
                </div>
                <Link href="/revistas/babilonia-digital" className={styles.issueCardButton}>
                  Ler Agora
                </Link>
              </div>
            </div>
            
            <div className={styles.issueCard}>
              <div className={styles.issueCardImage}></div>
              <div className={styles.issueCardContent}>
                <span className={styles.issueCardNumber}>Edição #9</span>
                <h3 className={styles.issueCardTitle}>Guerra e Paz no Oriente Médio</h3>
                <div className={styles.issueCardInfo}>
                  <span>Fevereiro 2025</span>
                  <span>64 páginas</span>
                </div>
                <Link href="/revistas/oriente-medio" className={styles.issueCardButton}>
                  Ler Agora
                </Link>
              </div>
            </div>
            
            <div className={styles.issueCard}>
              <div className={styles.issueCardImage}></div>
              <div className={styles.issueCardContent}>
                <span className={styles.issueCardNumber}>Edição #8</span>
                <h3 className={styles.issueCardTitle}>Sinais dos Tempos</h3>
                <div className={styles.issueCardInfo}>
                  <span>Janeiro 2025</span>
                  <span>60 páginas</span>
                </div>
                <Link href="/revistas/sinais-dos-tempos" className={styles.issueCardButton}>
                  Ler Agora
                </Link>
              </div>
            </div>
            
            <div className={styles.issueCard}>
              <div className={styles.issueCardImage}></div>
              <div className={styles.issueCardContent}>
                <span className={styles.issueCardNumber}>Edição #7</span>
                <h3 className={styles.issueCardTitle}>Transhumanismo e Fé</h3>
                <div className={styles.issueCardInfo}>
                  <span>Dezembro 2024</span>
                  <span>56 páginas</span>
                </div>
                <Link href="/revistas/transhumanismo" className={styles.issueCardButton}>
                  Ler Agora
                </Link>
              </div>
            </div>
            
            <div className={styles.issueCard}>
              <div className={styles.issueCardImage}></div>
              <div className={styles.issueCardContent}>
                <span className={styles.issueCardNumber}>Edição #6</span>
                <h3 className={styles.issueCardTitle}>Economia do Apocalipse</h3>
                <div className={styles.issueCardInfo}>
                  <span>Novembro 2024</span>
                  <span>58 páginas</span>
                </div>
                <Link href="/revistas/economia-apocalipse" className={styles.issueCardButton}>
                  Ler Agora
                </Link>
              </div>
            </div>
          </div>
          
          <div className={styles.paginationContainer}>
            <button className={styles.paginationButton}>1</button>
            <button className={styles.paginationButton}>2</button>
            <button className={`${styles.paginationButton} ${styles.active}`}>3</button>
            <button className={styles.paginationButton}>4</button>
          </div>
        </div>
      </section>
      
      <section className={styles.subscribeSection}>
        <div className={styles.container}>
          <div className={styles.subscribeContent}>
            <h2 className={`${styles.subscribeTitle} stone-text`}>ASSINE NOSSAS REVISTAS</h2>
            <p className={styles.subscribeDescription}>
              Tenha acesso a todas as edições passadas e futuras, além de conteúdo exclusivo para assinantes.
            </p>
            <Link href="/auth/register" className={styles.subscribeButton}>
              ASSINAR AGORA
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
