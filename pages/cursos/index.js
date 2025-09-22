import React from 'react';
import Layout from '../../components/Layout';
import PageHeader from '../../src/components/PageHeader';
import HomeLiteGuard from '../../src/components/HomeLiteGuard';
import CoursesMosaicPreview from '../../src/components/CoursesMosaicPreview';
import styles from '../../styles/Cursos.module.css';
import Link from 'next/link';

export default function Cursos() {
  return (
    <Layout title="Cursos | Apocalypse Academy">
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>Cursos</span>
      </nav>

      <PageHeader
        title="Cursos"
        subtitle="Programas imersivos com mentorias, recursos cinematográficos e certificação exclusiva para membros."
      />

      <section className={styles.previewSection}>
        <HomeLiteGuard
          title="Assine para liberar todos os cursos"
          description="Acesso imediato a aulas, materiais complementares e encontros ao vivo com professores convidados."
          alignment="center"
          ctaHref="/assinar"
          ctaLabel="Assine para acessar"
          secondaryHref="/entrar"
          secondaryLabel="Já sou assinante"
        >
          <CoursesMosaicPreview />
        </HomeLiteGuard>
      </section>
    </Layout>
  );
}
