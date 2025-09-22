import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import MemberLayout from '../../components/MemberLayout';
import ebooks from '../../src/app/data/ebooks.json';
import styles from '../../styles/MemberCollections.module.css';

const LibraryDashboard = () => {
  const [category, setCategory] = useState('Todos');

  const categories = useMemo(() => {
    const unique = ebooks.reduce((acc, ebook) => {
      if (ebook.category && !acc.includes(ebook.category)) {
        acc.push(ebook.category);
      }
      return acc;
    }, []);
    return ['Todos', ...unique];
  }, []);

  const featured = ebooks[0];

  const filtered = useMemo(() => {
    if (category === 'Todos') {
      return ebooks;
    }
    return ebooks.filter((ebook) => ebook.category === category);
  }, [category]);

  const totals = useMemo(() => {
    const totalPages = ebooks.reduce((acc, ebook) => acc + (ebook.pages || 0), 0);
    const freeBooks = ebooks.filter((ebook) => ebook.isFree).length;
    return { totalPages, freeBooks };
  }, []);

  return (
    <MemberLayout
      pageTitle="Biblioteca cinematográfica"
      pageSubtitle="PDFs imersivos, relatórios confidenciais e materiais de estudo com arte premium"
    >
      <section className={styles.pageIntro}>
        <div className={styles.introCopy}>
          <span className={styles.introHighlight}>Leitura estratégica</span>
          <h2 className={styles.introTitle}>{featured.title}</h2>
          <p className={styles.introText}>{featured.description}</p>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Páginas</span>
              <span className={styles.infoValue}>{featured.pages}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Categoria</span>
              <span className={styles.infoValue}>{featured.category}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Materiais gratuitos</span>
              <span className={styles.infoValue}>{totals.freeBooks}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Páginas totais</span>
              <span className={styles.infoValue}>{totals.totalPages}</span>
            </div>
          </div>
        </div>
        <div className={styles.introPoster}>
          <img src={featured.coverImage} alt={featured.title} />
        </div>
      </section>

      <section className={styles.filtersBar}>
        <div className={styles.filtersGroup}>
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={
                category === item
                  ? `${styles.filterChip} ${styles.filterChipActive}`
                  : styles.filterChip
              }
            >
              {item}
            </button>
          ))}
        </div>
        <Link href="/dashboard/revistas" className={styles.playButton}>
          Revistas exclusivas
        </Link>
      </section>

      <section className={`${styles.collectionGrid} ${styles.gridWide}`}>
        {filtered.map((ebook) => (
          <article key={ebook.slug} className={styles.collectionCard}>
            <div className={styles.collectionMedia}>
              <img src={ebook.coverImage} alt={ebook.title} />
              <span className={styles.collectionMeta}>{ebook.category}</span>
            </div>
            <div className={styles.collectionBody}>
              <h3 className={styles.collectionTitle}>{ebook.title}</h3>
              <p className={styles.introText}>{ebook.description}</p>
              <div className={styles.collectionFooter}>
                <span>{ebook.pages} páginas</span>
                <span>{ebook.isFree ? 'Download livre' : ebook.memberPrice}</span>
              </div>
              <Link href={`/dashboard/biblioteca?ebook=${ebook.slug}`} className={styles.playButton}>
                {ebook.isFree ? 'Baixar agora' : 'Adicionar à estante'}
              </Link>
            </div>
          </article>
        ))}
      </section>
    </MemberLayout>
  );
};

export default LibraryDashboard;
