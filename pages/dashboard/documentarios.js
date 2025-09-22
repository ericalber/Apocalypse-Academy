import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import MemberLayout from '../../components/MemberLayout';
import documentaries from '../../src/app/data/documentaries.json';
import styles from '../../styles/MemberCollections.module.css';

const DocumentariesDashboard = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = useMemo(() => {
    const unique = documentaries.reduce((acc, doc) => {
      if (doc.category && !acc.includes(doc.category)) {
        acc.push(doc.category);
      }
      return acc;
    }, []);
    return ['Todos', ...unique];
  }, []);

  const featured = documentaries[0];

  const list = useMemo(() => {
    if (activeCategory === 'Todos') {
      return documentaries;
    }
    return documentaries.filter((doc) => doc.category === activeCategory);
  }, [activeCategory]);

  return (
    <MemberLayout
      pageTitle="Documentários exclusivos"
      pageSubtitle="Produções cinematográficas em 4K com narrativa investigativa e cronologia profética"
    >
      <section className={styles.pageIntro}>
        <div className={styles.introCopy}>
          <span className={styles.introHighlight}>Dossiês Classificados</span>
          <h2 className={styles.introTitle}>{featured.title}</h2>
          <p className={styles.introText}>{featured.description}</p>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Duração</span>
              <span className={styles.infoValue}>{featured.duration}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Classificação</span>
              <span className={styles.infoValue}>⭐ {featured.rating}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Categoria</span>
              <span className={styles.infoValue}>{featured.category}</span>
            </div>
          </div>
        </div>
        <div className={styles.introPoster}>
          <img src={featured.coverImage} alt={featured.title} />
        </div>
      </section>

      <section className={styles.filtersBar}>
        <div className={styles.filtersGroup}>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={
                activeCategory === category
                  ? `${styles.filterChip} ${styles.filterChipActive}`
                  : styles.filterChip
              }
            >
              {category}
            </button>
          ))}
        </div>
        <Link href="/dashboard" className={styles.playButton}>
          Voltar ao painel
        </Link>
      </section>

      <section className={styles.collectionGrid}>
        {list.map((doc) => (
          <article key={doc.slug} className={styles.collectionCard}>
            <div className={styles.collectionMedia}>
              <img src={doc.coverImage} alt={doc.title} />
            </div>
            <div className={styles.collectionBody}>
              <span className={styles.collectionMeta}>{doc.category}</span>
              <h3 className={styles.collectionTitle}>{doc.title}</h3>
              <div className={styles.collectionFooter}>
                <span>{doc.duration}</span>
                <span>⭐ {doc.rating}</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </MemberLayout>
  );
};

export default DocumentariesDashboard;
