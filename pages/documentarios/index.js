import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';
import PageHeader from '../../src/components/PageHeader';
import HomeLiteGuard from '../../src/components/HomeLiteGuard';
import DocumentariesPreview from '../../src/components/DocumentariesPreview';
import styles from '../../styles/Documentarios.module.css';

const DocumentariosPage = () => {
  return (
    <Layout title="Documentários | Apocalypse Academy">
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>Documentários</span>
      </nav>

      <PageHeader
        title="Documentários"
        subtitle="Produções cinematográficas em 4K com narrativa documental, entrevistas e análises proféticas exclusivas para membros."
      />

      <section className={styles.previewSection}>
        <HomeLiteGuard
          title="Assine para assistir ao acervo completo"
          description="Os Arquitetos do Caos • Dossiê Proibido: O Nome da Besta • Vigilância Total — Sua Vida em Dados • Sinais do Fim: O Relógio Acelera"
          alignment="center"
          ctaHref="/assinar"
          ctaLabel="Assine para assistir"
          secondaryHref="/entrar"
          secondaryLabel="Já sou assinante"
        >
          <DocumentariesPreview />
        </HomeLiteGuard>
      </section>
    </Layout>
  );
};

export default DocumentariosPage;
