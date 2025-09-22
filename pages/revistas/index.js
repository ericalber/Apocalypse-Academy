import React from 'react';
import Layout from '../../components/Layout';
import PageHeader from '../../src/components/PageHeader';
import HomeLiteGuard from '../../src/components/HomeLiteGuard';
import MagazinesPreviewGrid from '../../src/components/MagazinesPreviewGrid';
import styles from '../../styles/Revistas.module.css';
import Link from 'next/link';

export default function Revistas() {
  return (
    <Layout title="Revistas | Apocalypse Academy">
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>Revistas</span>
      </nav>

      <PageHeader
        title="Revistas"
        subtitle="Edições mensais com análises geopolíticas, devocionais e investigações especiais alinhadas às profecias bíblicas."
      />

      <section className={styles.previewSection}>
        <HomeLiteGuard
          title="Assine para ler todas as edições"
          description="Acesso digital às últimas publicações, arquivos históricos e versões em áudio para assinantes."
          alignment="center"
          ctaHref="/assinar"
          ctaLabel="Assine para ler"
          secondaryHref="/entrar"
          secondaryLabel="Já sou assinante"
        >
          <MagazinesPreviewGrid />
        </HomeLiteGuard>
      </section>
    </Layout>
  );
}
