import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../src/styles/ArticlesArchive.module.css';
import articles from '../../src/app/data/articles.json';

const formatDate = (isoDate) => {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(new Date(isoDate));
  } catch (error) {
    return isoDate;
  }
};

const ArtigosPage = () => {
  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Artigos &amp; Ensaios</h1>
          <p className={styles.heroSubtitle}>
            Um espaço para opinião e reflexão bíblica sobre geopolítica, cultura e discipulado em tempos proféticos.
          </p>
        </header>

        <div className={styles.layout}>
          {articles.map((article) => (
            <article key={article.slug} className={styles.card}>
              <div className={styles.cardMeta}>
                <span>{article.category}</span>
                <span>{formatDate(article.publishedAt)}</span>
                <span>{article.readTime}</span>
              </div>
              <h2 className={styles.cardTitle}>
                <Link href={`/artigos/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>
              <p className={styles.cardExcerpt}>{article.excerpt}</p>

              {article.tags?.length > 0 && (
                <div className={styles.tagList}>
                  {article.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}

              <Link href={`/artigos/${article.slug}`} className={styles.readMore}>
                Ler artigo
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ArtigosPage;
