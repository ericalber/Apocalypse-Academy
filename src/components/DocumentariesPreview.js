import React from 'react';
import styles from '../styles/DocumentariesPreview.module.css';
import documentaries from '../app/data/documentaries.json';

const DocumentariesPreview = () => {
  const featured = documentaries.slice(0, 3);

  return (
    <section className={styles.previewSection} aria-labelledby="documentaries-preview-heading">
      <div className={styles.headerRow}>
        <div>
          <h2 id="documentaries-preview-heading" className={styles.sectionTitle}>
            🎬 Documentários em destaque
          </h2>
          <p className={styles.sectionSubtitle}>
            Narrativas cinematográficas que conectam acontecimentos atuais às profecias bíblicas
          </p>
        </div>
      </div>

      <div className={styles.grid}>
        {featured.map((doc) => (
          <article key={doc.slug} className={styles.card}>
            <div className={styles.media}>
              <span className={styles.qualityBadge}>4K</span>
              <img src={doc.coverImage} alt={doc.title} loading="lazy" />
            </div>
            <div className={styles.cardBody}>
              <span className={styles.category}>{doc.category}</span>
              <h3 className={styles.cardTitle}>{doc.title}</h3>
              <p className={styles.cardExcerpt}>{doc.description}</p>
              <div className={styles.metaRow}>
                <span>{doc.duration}</span>
                <span>⭐ {doc.rating}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default DocumentariesPreview;
