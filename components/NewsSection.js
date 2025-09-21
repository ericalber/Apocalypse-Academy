import React from 'react';
import Link from 'next/link';
import styles from '../styles/components/NewsSection.module.css';
import newsData from '../src/app/data/news.json';

const formatDate = (isoDate) => {
  try {
    const formatter = new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    return formatter.format(new Date(isoDate));
  } catch (error) {
    return isoDate;
  }
};

const NewsSection = () => {
  const featuredNews = newsData.slice(0, 3);

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
            <article key={article.slug} className={`${styles.newsCard} card`}>
              <div className={`${styles.cardImage} card-media`}>
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  loading="lazy"
                />
                <div className={styles.categoryBadge}>
                  {article.category}
                </div>
              </div>
              
              <div className={`${styles.cardContent} card-body`}>
                <h3 className={`${styles.cardTitle} card-title`}>
                  <Link href={`/noticias/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>
                
                <p className={`${styles.cardSummary} card-excerpt`}>
                  {article.excerpt}
                </p>
                
                <div className={`${styles.cardMeta} card-footer`}>
                  <span className={styles.cardDate}>
                    {formatDate(article.publishedAt)} · {article.readTime}
                  </span>
                  <Link href={`/noticias/${article.slug}`} className={styles.readMore}>
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
