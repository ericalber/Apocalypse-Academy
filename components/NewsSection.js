import React from 'react';
import Link from 'next/link';
import styles from '../styles/components/NewsSection.module.css';

const NewsSection = () => {
  const featuredNews = [
    {
      id: 1,
      title: "Sinais Proféticos se Intensificam no Oriente Médio",
      summary: "Análise dos eventos recentes que apontam para o cumprimento das profecias bíblicas sobre os últimos tempos.",
      category: "PROFECIA",
      date: "2 dias atrás",
      image: "/images/news/middle-east-prophecy.jpg",
      link: "/noticias/sinais-profeticos-oriente-medio"
    },
    {
      id: 2,
      title: "Nova Ordem Mundial: Agenda 2030 em Foco",
      summary: "Como as políticas globais se alinham com as profecias sobre o governo mundial dos últimos dias.",
      category: "GEOPOLÍTICA",
      date: "4 dias atrás",
      image: "/images/news/new-world-order.jpg",
      link: "/noticias/nova-ordem-mundial-agenda-2030"
    },
    {
      id: 3,
      title: "Tecnologia e Controle: O Caminho para a Marca da Besta",
      summary: "Análise das tecnologias emergentes e seu papel profético no sistema de controle global.",
      category: "TECNOLOGIA",
      date: "1 semana atrás",
      image: "/images/news/technology-control.jpg",
      link: "/noticias/tecnologia-controle-marca-besta"
    }
  ];

  return (
    <section id="noticias" data-section="noticias" className={styles.newsSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={`${styles.sectionTitle} section-title`}>
            📰 Notícias
          </h2>
          <p className={styles.sectionSubtitle}>
            Análises atuais dos eventos que se alinham com as profecias bíblicas
          </p>
        </div>

        <div className={`${styles.newsGrid} grid-3`}>
          {featuredNews.map((article) => (
            <article key={article.id} className={`${styles.newsCard} card`}>
              <div className={`${styles.cardImage} card-media`}>
                <img 
                  src={article.image} 
                  alt={article.title}
                  loading="lazy"
                />
                <div className={styles.categoryBadge}>
                  {article.category}
                </div>
              </div>
              
              <div className={`${styles.cardContent} card-body`}>
                <h3 className={`${styles.cardTitle} card-title`}>
                  <Link href={article.link}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className={`${styles.cardSummary} card-excerpt`}>
                  {article.summary}
                </p>
                
                <div className={`${styles.cardMeta} card-footer`}>
                  <span className={styles.cardDate}>
                    {article.date}
                  </span>
                  <Link href={article.link} className={styles.readMore}>
                    Ler mais →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.sectionFooter}>
          <Link href="/noticias" className={styles.viewAllButton}>
            Ver todas as notícias
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;

