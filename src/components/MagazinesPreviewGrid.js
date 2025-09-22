import React, { useMemo } from 'react';
import styles from '../styles/MagazinesPreviewGrid.module.css';
import magazines from '../app/data/magazines.json';

const MagazinesPreviewGrid = () => {
  const mosaic = useMemo(() => {
    const repeated = [...magazines, ...magazines];
    return repeated.slice(0, 12);
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.grid}>
        {mosaic.map((magazine, index) => (
          <article key={`${magazine.slug}-${index}`} className={styles.card}>
            <div className={styles.cover}>
              <img src={magazine.coverImage} alt="" loading="lazy" />
            </div>
            <div className={styles.meta}>
              <h3 className={styles.title}>{magazine.title}</h3>
              <span className={styles.release}>{magazine.release}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MagazinesPreviewGrid;
