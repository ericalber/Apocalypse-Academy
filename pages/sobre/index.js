import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import PageHeader from '../../src/components/PageHeader';
import styles from '../../styles/Sobre.module.css';

export default function Sobre() {
  return (
    <Layout title="Sobre a Missão | Apocalypse Academy">
      <PageHeader
        title="Sobre a Missão"
        subtitle="Conheça nossa visão, propósito e valores na preparação de uma geração vigilante para os últimos tempos."
      />
      
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
              <p>&ldquo;Quando o sistema falhar, aqui ainda restará verdade.&rdquo;</p>
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
      
      <section className={styles.institutionalSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>INSTITUCIONAL</h2>
          <div className={styles.institutionalGrid}>
            <div className={styles.institutionalCard}>
              <h3 className={styles.institutionalTitle}>Quem Somos</h3>
              <p className={styles.institutionalText}>
                Somos uma unidade editorial e cinematográfica conectada à CROSS Global Entertainment, formada por pesquisadores, teólogos, roteiristas e compositores dedicados a produzir narrativas proféticas com rigor e impacto emocional.
              </p>
              <div className={styles.devocionalHighlight}>
                <div className={styles.devocionalBadge}>Devocionais</div>
                <p className={styles.devocionalCopy}>
                  Playlist semanal com meditações, trilhas originais e comentários proféticos produzidos em parceria com o estúdio CROSS Sound Lab.
                </p>
                <Link href="/devocionais/spotify" className={styles.spotifyButton}>
                  <span className={styles.spotifyIcon}>♫</span>
                  Ouvir no Spotify
                </Link>
              </div>
            </div>
            <div className={styles.institutionalCard}>
              <h3 className={styles.institutionalTitle}>Como Atuamos</h3>
              <p className={styles.institutionalText}>
                Produzimos conteúdo audiovisual, estudos guiados e encontros formativos, sempre com curadoria rigorosa e linguagem acessível para toda a igreja.
              </p>
            </div>
            <div className={styles.institutionalCard}>
              <h3 className={styles.institutionalTitle}>Governança</h3>
              <p className={styles.institutionalText}>
                Mantemos processos de revisão doutrinária, compliance financeiro e prestação de contas periódica aos mantenedores e parceiros ministeriais.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Participe da Comunidade</h2>
            <p className={styles.ctaDescription}>
              Receba atualizações sobre novos conteúdos, mentorias e encontros especiais da Apocalypse Academy.
            </p>
            <a href="mailto:contato@apocalypseacademy.com" className={styles.ctaButton}>
              Falar com a equipe
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
