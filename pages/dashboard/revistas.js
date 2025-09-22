import React from 'react';
import Link from 'next/link';
import MemberLayout from '../../components/MemberLayout';
import magazines from '../../src/app/data/magazines.json';
import styles from '../../styles/MemberCollections.module.css';

const MagazinesDashboard = () => {
  return (
    <MemberLayout
      pageTitle="REVISTAS PROFÉTICAS"
      pageSubtitle="Arquivos secretos, linhas do tempo e investigações visuais com acabamento de cinema"
    >
      <section className={styles.filtersBar}>
        <div className={styles.filtersGroup}>
          <span className={styles.filterChipActive}>Últimas edições</span>
          <span className={styles.filterChip}>Arquivo histórico</span>
        </div>
        <Link href="/dashboard/biblioteca" className={styles.playButton}>
          Ir para biblioteca
        </Link>
      </section>

      <section className={styles.magazinesGrid}>
        {magazines.map((magazine) => (
          <article key={magazine.slug} className={styles.collectionCard}>
            <div className={`${styles.collectionMedia} ${styles.collectionMediaMagazine}`}>
              <img src={magazine.coverImage} alt={magazine.title} />
            </div>
            <div className={styles.collectionBody}>
              <h3 className={styles.collectionTitle}>{magazine.title}</h3>
              <div className={styles.collectionFooter}>
                <span>{magazine.release}</span>
                <Link href={`/dashboard/revistas?issue=${magazine.slug}`} className={styles.playButton}>
                  Ler edição
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </MemberLayout>
  );
};

export default MagazinesDashboard;
