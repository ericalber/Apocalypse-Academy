import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import OptimizedImage from './OptimizedImage';
import styles from '../styles/components/DocumentaryCard.module.css';

const DocumentaryCard = ({ documentary }) => {
  const { t } = useLanguage();
  
  return (
    <div className={styles.card}>
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
        <button className={styles.watchButton}>
          {t('documentaries.watch')}
        </button>
      </div>
    </div>
  );
};

export default DocumentaryCard;
