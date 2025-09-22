import React from 'react';
import Link from 'next/link';
import OptimizedImage from './OptimizedImage';
import styles from '../styles/components/DocumentaryCard.module.css';

const DocumentaryCard = ({ documentary }) => {
  return (
    <Link href="/assinar" className={styles.cardLink}>
      <article className={styles.card}>
        <div className={styles.imageContainer}>
          <OptimizedImage
            src={documentary.coverImage}
            alt={documentary.title}
            width={350}
            height={200}
            objectFit="cover"
          />
        </div>
        <div className={styles.content}>
          <h3>{documentary.title}</h3>
          <p>{documentary.description}</p>
          <span className={styles.meta}>{documentary.duration} • ⭐ {documentary.rating}</span>
          <span className={styles.watchButton}>Assine para assistir</span>
        </div>
      </article>
    </Link>
  );
};

export default DocumentaryCard;
