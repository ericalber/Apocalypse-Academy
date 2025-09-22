import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import PageHeader from '../../src/components/PageHeader';
import styles from '../../src/styles/NewsArchive.module.css';
import newsData from '../../src/app/data/news.json';

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

const getCategories = (items) => {
  const tally = items.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  return [
    { label: 'Todas', value: 'all', count: items.length },
    ...Object.entries(tally).map(([label, count]) => ({
      label,
      value: label,
      count
    }))
  ];
};

const NoticiasPage = () => {
  const [category, setCategory] = useState('all');
  const categories = useMemo(() => getCategories(newsData), []);

  const filtered = useMemo(() => {
    if (category === 'all') {
      return newsData;
    }
    return newsData.filter((item) => item.category === category);
  }, [category]);

  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <PageHeader
          title="Notícias"
          subtitle="Cobertura diária dos fatos que se conectam com as profecias bíblicas e impactam a igreja no Brasil e no mundo."
        />

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <span className={styles.sidebarTitle}>Categorias</span>
            <div className={styles.categoryList}>
              {categories.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setCategory(item.value)}
                  className={`${styles.categoryButton} ${category === item.value ? styles.categoryButtonActive : ''}`}
                >
                  <span>{item.label}</span>
                  <span className={styles.categoryBadge}>{item.count}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className={styles.list}>
            {filtered.map((article) => (
              <article key={article.slug} className={styles.card}>
                <div className={styles.cardMedia}>
                  <img src={article.coverImage} alt={article.title} loading="lazy" />
                  <span className={styles.cardCategory}>{article.category}</span>
                </div>
                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>
                    <Link href={`/noticias/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className={styles.cardExcerpt}>{article.summary}</p>
                  <div className={styles.cardFooter}>
                    <span>
                      {formatDate(article.publishedAt)} · {article.readTime}
                    </span>
                    <Link href={`/noticias/${article.slug}`} className={styles.readMore}>
                      Ler matéria
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NoticiasPage;
