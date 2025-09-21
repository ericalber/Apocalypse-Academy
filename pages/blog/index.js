import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Blog.module.css';
import Link from 'next/link';

export default function Blog() {
  return (
    <Layout title="Arquivos Secretos | Apocalypse Academy">
      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.confidentialStamp}>CONFIDENCIAL</div>
          <h1 className={`${styles.title} stone-text`}>ARQUIVOS SECRETOS</h1>
          <p className={styles.description}>
            Documentos e análises confidenciais sobre eventos globais, profecias e revelações dos últimos tempos.
          </p>
        </div>
      </div>
      
      <section className={styles.featuredSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>ARQUIVO EM DESTAQUE</h2>
          
          <div className={styles.featuredArticle}>
            <div className={styles.articleImage}></div>
            <div className={styles.articleContent}>
              <div className={styles.articleMeta}>
                <span className={styles.articleTag}>Geopolítica</span>
                <span className={styles.articleDate}>15 de Maio, 2025</span>
              </div>
              <h3 className={styles.articleTitle}>O Plano Secreto para uma Nova Ordem Mundial: Documentos Vazados Revelam Cronograma</h3>
              <p className={styles.articleExcerpt}>
                Uma análise detalhada de documentos recentemente vazados que revelam um cronograma específico para a implementação de uma nova ordem econômica e social global. Como esses planos se alinham com as profecias bíblicas sobre os últimos dias?
              </p>
              <Link href="/blog/nova-ordem-mundial" className={styles.readMoreButton}>
                Ler Arquivo Completo
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.latestSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>ÚLTIMOS ARQUIVOS</h2>
          
          <div className={styles.articlesGrid}>
            <div className={styles.articleCard}>
              <div className={styles.articleCardImage}></div>
              <div className={styles.articleCardContent}>
                <div className={styles.articleCardMeta}>
                  <span className={styles.articleCardTag}>Tecnologia</span>
                  <span className={styles.articleCardDate}>10 de Maio, 2025</span>
                </div>
                <h3 className={styles.articleCardTitle}>Inteligência Artificial e o Controle da Humanidade</h3>
                <p className={styles.articleCardExcerpt}>
                  Como os sistemas de IA estão sendo desenvolvidos para monitorar e influenciar o comportamento humano em escala global.
                </p>
                <Link href="/blog/ia-controle" className={styles.articleCardButton}>
                  Ler Arquivo
                </Link>
              </div>
            </div>
            
            <div className={styles.articleCard}>
              <div className={styles.articleCardImage}></div>
              <div className={styles.articleCardContent}>
                <div className={styles.articleCardMeta}>
                  <span className={styles.articleCardTag}>Profecia</span>
                  <span className={styles.articleCardDate}>5 de Maio, 2025</span>
                </div>
                <h3 className={styles.articleCardTitle}>Os Sete Selos do Apocalipse: Cronologia Atualizada</h3>
                <p className={styles.articleCardExcerpt}>
                  Uma análise detalhada dos sete selos descritos no livro do Apocalipse e como eventos recentes indicam sua abertura iminente.
                </p>
                <Link href="/blog/sete-selos" className={styles.articleCardButton}>
                  Ler Arquivo
                </Link>
              </div>
            </div>
            
            <div className={styles.articleCard}>
              <div className={styles.articleCardImage}></div>
              <div className={styles.articleCardContent}>
                <div className={styles.articleCardMeta}>
                  <span className={styles.articleCardTag}>Economia</span>
                  <span className={styles.articleCardDate}>1 de Maio, 2025</span>
                </div>
                <h3 className={styles.articleCardTitle}>Moeda Digital Global: O Fim do Dinheiro Físico</h3>
                <p className={styles.articleCardExcerpt}>
                  Como a transição para uma moeda digital global está sendo acelerada e suas implicações para a profecia da marca da besta.
                </p>
                <Link href="/blog/moeda-digital" className={styles.articleCardButton}>
                  Ler Arquivo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.categoriesSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>CATEGORIAS DE ARQUIVOS</h2>
          
          <div className={styles.categoriesGrid}>
            <Link href="/blog/categoria/geopolitica" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Geopolítica</h3>
                <span className={styles.categoryCount}>24 arquivos</span>
              </div>
            </Link>
            
            <Link href="/blog/categoria/tecnologia" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Tecnologia</h3>
                <span className={styles.categoryCount}>18 arquivos</span>
              </div>
            </Link>
            
            <Link href="/blog/categoria/profecia" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Profecia</h3>
                <span className={styles.categoryCount}>32 arquivos</span>
              </div>
            </Link>
            
            <Link href="/blog/categoria/economia" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Economia</h3>
                <span className={styles.categoryCount}>15 arquivos</span>
              </div>
            </Link>
            
            <Link href="/blog/categoria/religiao" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Religião</h3>
                <span className={styles.categoryCount}>20 arquivos</span>
              </div>
            </Link>
            
            <Link href="/blog/categoria/conspiracao" className={styles.categoryCard}>
              <div className={styles.categoryOverlay}></div>
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Conspiração</h3>
                <span className={styles.categoryCount}>27 arquivos</span>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      <section className={styles.searchSection}>
        <div className={styles.container}>
          <div className={styles.searchContainer}>
            <h2 className={styles.searchTitle}>BUSCAR NOS ARQUIVOS SECRETOS</h2>
            <p className={styles.searchDescription}>
              Utilize nossa ferramenta de busca para encontrar informações específicas em nossa base de dados confidencial.
            </p>
            <div className={styles.searchForm}>
              <input type="text" className={styles.searchInput} placeholder="Digite sua busca..." />
              <button className={styles.searchButton}>Buscar</button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
