import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../src/styles/NewsArticle.module.css';
import newsData from '../../src/app/data/news.json';

const formatDate = (isoDate) => {
  try {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    }).format(new Date(isoDate));
  } catch (error) {
    return isoDate;
  }
};

const NewsArticle = ({ article }) => {
  if (!article) {
    return null;
  }

  return (
    <Layout>
      <article className={styles.articleWrapper}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <Link href="/">Início</Link>
          <span>›</span>
          <Link href="/noticias">Notícias</Link>
          <span>›</span>
          <span>{article.title}</span>
        </nav>

        <div className={styles.heroMedia}>
          <img src={article.coverImage} alt={article.title} />
        </div>

        <div className={styles.articleBody}>
          <div className={styles.meta}>
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.readTime}</span>
            <span>{article.category}</span>
            <span>{article.author}</span>
          </div>

          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.excerpt}>{article.summary}</p>

          <div className={styles.content}>
            {article.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {article.tags?.length > 0 && (
            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          )}

          <Link href="/noticias" className={styles.backLink}>
            ← Voltar para notícias
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = newsData.map((article) => ({
    params: { slug: article.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const article = newsData.find((item) => item.slug === params.slug) || null;

  return {
    props: {
      article
    }
  };
};

export default NewsArticle;
