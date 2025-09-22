import React, { useMemo } from 'react';
import styles from '../styles/EbooksPreviewGrid.module.css';
import ebooks from '../app/data/ebooks.json';

const EbooksPreviewGrid = () => {
  const mosaic = useMemo(() => {
    const repeated = [...ebooks, ...ebooks];
    return repeated.slice(0, 12);
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.grid}>
        {mosaic.map((ebook, index) => (
          <article key={`${ebook.slug}-${index}`} className={styles.card}>
            <div className={styles.cover}>
              <img src={ebook.coverImage} alt="" loading="lazy" />
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{ebook.title}</h3>
              <span className={styles.meta}>{ebook.pages} páginas • {ebook.category}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default EbooksPreviewGrid;
