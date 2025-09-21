import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Sobre.module.css';
import Link from 'next/link';

export default function Sobre() {
  return (
    <Layout title="Sobre a Missão | Apocalypse Academy">
      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} stone-text`}>SOBRE A MISSÃO</h1>
          <p className={styles.description}>
            Conheça nossa visão, propósito e a missão por trás da Apocalypse Academy.
          </p>
        </div>
      </div>
      
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.missionContent}>
            <h2 className={styles.sectionTitle}>NOSSA VISÃO</h2>
            <p className={styles.missionText}>
              A Apocalypse Academy nasceu com o propósito de ser a última academia antes do fim, um farol de verdade em tempos de crescente escuridão e desinformação. Acreditamos que estamos vivendo nos tempos finais profetizados nas escrituras, e nossa missão é preparar as pessoas para os eventos que estão por vir através de conhecimento, discernimento e preparação espiritual.
            </p>
            <p className={styles.missionText}>
              Em um mundo onde a verdade é cada vez mais distorcida e suprimida, nos comprometemos a fornecer conteúdo autêntico, baseado em pesquisa séria e análise profunda das profecias bíblicas em relação aos acontecimentos atuais. Não somos movidos por sensacionalismo, mas pelo compromisso com a verdade, por mais desconfortável que ela possa ser.
            </p>
            <div className={styles.missionQuote}>
              <p>"Quando o sistema falhar, aqui ainda restará verdade."</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>NOSSOS VALORES</h2>
          
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Verdade</h3>
              <p className={styles.valueDescription}>
                Comprometimento inabalável com a verdade, mesmo quando ela é impopular ou contrária às narrativas dominantes.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Discernimento</h3>
              <p className={styles.valueDescription}>
                Capacidade de distinguir entre verdade e engano, analisando eventos à luz das profecias bíblicas.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Conhecimento</h3>
              <p className={styles.valueDescription}>
                Busca constante por conhecimento profundo e compreensão das escrituras, história e eventos atuais.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/>
                </svg>
              </div>
              <h3 className={styles.valueTitle}>Integridade</h3>
              <p className={styles.valueDescription}>
                Manutenção de altos padrões éticos e morais em tudo o que fazemos, sem comprometer nossos princípios.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>NOSSO CONTEÚDO</h2>
          
          <div className={styles.contentGrid}>
            <div className={styles.contentCard}>
              <h3 className={styles.contentTitle}>Documentários</h3>
              <p className={styles.contentDescription}>
                Produções cinematográficas em alta definição (4K/6K) que investigam temas proféticos, geopolíticos e escatológicos com profundidade e rigor.
              </p>
              <Link href="/documentarios" className={styles.contentLink}>
                Ver Documentários
              </Link>
            </div>
            
            <div className={styles.contentCard}>
              <h3 className={styles.contentTitle}>Cursos</h3>
              <p className={styles.contentDescription}>
                Programas educacionais estruturados que oferecem conhecimento aprofundado sobre escatologia, profecias bíblicas e sua aplicação nos dias atuais.
              </p>
              <Link href="/cursos" className={styles.contentLink}>
                Ver Cursos
              </Link>
            </div>
            
            <div className={styles.contentCard}>
              <h3 className={styles.contentTitle}>Revistas</h3>
              <p className={styles.contentDescription}>
                Publicações periódicas com análises detalhadas sobre eventos globais e sua relação com as profecias bíblicas.
              </p>
              <Link href="/revistas" className={styles.contentLink}>
                Ver Revistas
              </Link>
            </div>
            
            <div className={styles.contentCard}>
              <h3 className={styles.contentTitle}>Devocionais</h3>
              <p className={styles.contentDescription}>
                Reflexões espirituais em formato de áudio para fortalecer sua fé e preparação para os tempos finais.
              </p>
              <Link href="/devocionais" className={styles.contentLink}>
                Ver Devocionais
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={`${styles.ctaTitle} stone-text`}>JUNTE-SE À NOSSA MISSÃO</h2>
            <p className={styles.ctaDescription}>
              Faça parte da Apocalypse Academy e tenha acesso a conteúdo exclusivo que o preparará para os tempos que estão por vir.
            </p>
            <Link href="/auth/register" className={styles.ctaButton}>
              COMEÇAR AGORA
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
