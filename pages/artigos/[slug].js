import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../src/styles/ArticleDetail.module.css';
import articles from '../../src/app/data/articles.json';

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

const ArticleDetail = ({ article }) => {
  if (!article) {
    return null;
  }

  return (
    <Layout>
      <article className={styles.articleWrapper}>
        <nav className={styles.breadcrumb} aria-label="breadcrumb">
          <Link href="/">Início</Link>
          <span>›</span>
          <Link href="/artigos">Artigos</Link>
          <span>›</span>
          <span>{article.title}</span>
        </nav>

        <div className={styles.heroBox}>
          <div className={styles.heroMeta}>
            <span>{article.category}</span>
            <span>{formatDate(article.publishedAt)}</span>
            <span>{article.readTime}</span>
            <span>{article.author}</span>
          </div>
          <h1 className={styles.heroTitle}>{article.title}</h1>
          <p className={styles.heroExcerpt}>{article.excerpt}</p>
        </div>

        <div className={styles.content}>
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}

          <Link href="/artigos" className={styles.backLink}>
            ← Voltar para artigos
          </Link>
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  const paths = articles.map((article) => ({
    params: { slug: article.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async ({ params }) => {
  const article = articles.find((item) => item.slug === params.slug) || null;

  return {
    props: {
      article
    }
  };
};

export default ArticleDetail;
