import React, { useMemo } from 'react';
import styles from '../styles/DocumentariesPreview.module.css';
import documentaries from '../app/data/documentaries.json';

const DocumentariesPreview = () => {
  const mosaic = useMemo(() => {
    const repeated = [...documentaries, ...documentaries, ...documentaries];
    return repeated.slice(0, 20);
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.grid}>
        {mosaic.map((doc, index) => (
          <div key={`${doc.slug}-${index}`} className={styles.tile}>
            <img src={doc.coverImage} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentariesPreview;
