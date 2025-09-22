import React, { useMemo } from 'react';
import Layout from '../../components/Layout';
import PageHeader from '../../src/components/PageHeader';
import HomeLiteGuard from '../../src/components/HomeLiteGuard';
import styles from '../../styles/Ebooks.module.css';
import ebooks from '../../src/app/data/ebooks.json';

const EbooksPage = () => {
  const mosaic = useMemo(() => {
    const repeated = [...ebooks, ...ebooks, ...ebooks];
    return repeated.slice(0, 18);
  }, []);

  const freebies = useMemo(() => ebooks.filter((item) => item.isFree), []);
  const sampleFreebie = freebies[0];

  return (
    <Layout title="eBooks | Apocalypse Academy">
      <PageHeader
        title="eBooks"
        subtitle="Catálogo premium com estudos, guias e materiais de preparação profética produzidos pela Apocalypse Academy."
      />

      <section className={styles.previewSection}>
        <HomeLiteGuard
          title="Assine para acessar a biblioteca completa"
          description="Membros têm acesso imediato a downloads, atualizações mensais e conteúdos inéditos em formatos PDF e interativo."
          ctaHref="/assinar"
          ctaLabel="Assine para acessar"
          secondaryHref={sampleFreebie ? `/ebooks/${sampleFreebie.slug}` : '/entrar'}
          secondaryLabel={sampleFreebie ? 'Ver amostra gratuita' : 'Já sou assinante'}
          alignment="center"
        >
          <div className={styles.grid} aria-hidden="true">
            {mosaic.map((ebook, index) => {
              const coverImage = ebook.coverImage || '/images/ebooks/placeholder.svg';
              return (
                <article key={`${ebook.slug}-${index}`} className={styles.card}>
                  <div className={styles.cover}>
                    <img src={coverImage} alt="" loading="lazy" />
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.category}>{ebook.category}</span>
                    <h3 className={styles.title}>{ebook.title}</h3>
                    <span className={styles.details}>{ebook.pages} páginas</span>
                  </div>
                </article>
              );
            })}
          </div>
        </HomeLiteGuard>
      </section>

      {freebies.length > 0 && (
        <section className={styles.freebieSection}>
          <div className={styles.freebieWrapper}>
            <h2 className={styles.freebieHeading}>Amostras gratuitas</h2>
            <div className={styles.freebieGrid}>
              {freebies.map((ebook) => {
                const coverImage = ebook.coverImage || '/images/ebooks/placeholder.svg';
                return (
                  <article key={ebook.slug} className={styles.freebieCard}>
                    <div className={styles.freebieCover}>
                      <img src={coverImage} alt={ebook.title} loading="lazy" />
                    </div>
                    <div className={styles.freebieInfo}>
                      <h3>{ebook.title}</h3>
                      <p>{ebook.description}</p>
                      <div className={styles.freebieMeta}>
                        <span>{ebook.pages} páginas</span>
                        <span>{ebook.category}</span>
                      </div>
                      <a href={`/ebooks/${ebook.slug}`} className={styles.freebieButton}>
                        Baixar e-book gratuito
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default EbooksPage;
