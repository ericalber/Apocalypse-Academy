import React from 'react';
import Link from 'next/link';
import MemberLayout from '../../components/MemberLayout';
import magazines from '../../src/app/data/magazines.json';
import styles from '../../styles/MemberCollections.module.css';

const MagazinesDashboard = () => {
  const featured = magazines[0];

  return (
    <MemberLayout
      pageTitle="Revistas proféticas"
      pageSubtitle="Arquivos secretos, linhas do tempo e investigações visuais com acabamento de cinema"
    >
      <section className={styles.pageIntro}>
        <div className={styles.introCopy}>
          <span className={styles.introHighlight}>Arquivo confidencial</span>
          <h2 className={styles.introTitle}>{featured.title}</h2>
          <p className={styles.introText}>
            Cada edição combina layout de Movie UI Kits com infográficos, QR codes interativos e trilhas
            recomendadas. Perfeito para grupos de estudo, mentorias e apresentações dentro da plataforma.
          </p>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Edição destaque</span>
              <span className={styles.infoValue}>{featured.release}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Revistas ativas</span>
              <span className={styles.infoValue}>{magazines.length}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Formato</span>
              <span className={styles.infoValue}>PDF 4K</span>
            </div>
          </div>
        </div>
        <div className={styles.introPoster}>
          <img src={featured.coverImage} alt={featured.title} />
        </div>
      </section>

      <section className={styles.filtersBar}>
        <div className={styles.filtersGroup}>
          <span className={styles.filterChipActive}>Novas edições</span>
        </div>
        <Link href="/dashboard/biblioteca" className={styles.playButton}>
          Ir para biblioteca
        </Link>
      </section>

      <section className={styles.horizontalScroller}>
        {magazines.map((magazine) => (
          <article key={magazine.slug} className={styles.magazineCard}>
            <div className={styles.collectionMedia}>
              <img src={magazine.coverImage} alt={magazine.title} />
            </div>
            <div className={styles.magazineBody}>
              <h3 className={styles.collectionTitle}>{magazine.title}</h3>
              <div className={styles.magazineFooter}>
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
