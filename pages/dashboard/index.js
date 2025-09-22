import React, { useMemo } from 'react';
import Link from 'next/link';
import MemberLayout from '../../components/MemberLayout';
import documentaries from '../../src/app/data/documentaries.json';
import courses from '../../src/app/data/courses.json';
import ebooks from '../../src/app/data/ebooks.json';
import magazines from '../../src/app/data/magazines.json';
import styles from '../../styles/MemberDashboard.module.css';

const DashboardHome = () => {
  const featuredDocumentary = documentaries[0];
  const continueWatching = courses.slice(0, 6);
  const trendingDocumentaries = documentaries.slice(0, 6);
  const cinematicCourses = courses.slice(0, 5);

  const stats = useMemo(() => {
    const completedLessons = courses.reduce((acc, course) => acc + (course.lessons || 0), 0);
    const totalHours = courses.reduce((acc, course) => {
      const match = (course.duration || '').match(/\d+/);
      return match ? acc + parseInt(match[0], 10) : acc;
    }, 0);

    return {
      completedLessons,
      totalHours,
      documentariesAvailable: documentaries.length,
      readingShelf: ebooks.length + magazines.length
    };
  }, []);

  const progressPresets = [84, 62, 47, 91, 58, 73];

  const metrics = [
    {
      label: 'Horas de estudo',
      value: `${stats.totalHours}h`,
      detail: 'Catálogo ativo',
      tag: '+14%'
    },
    {
      label: 'Aulas disponíveis',
      value: stats.completedLessons,
      detail: '8 coleções',
      tag: 'Atualizado'
    },
    {
      label: 'Documentários',
      value: stats.documentariesAvailable,
      detail: '4K HDR',
      tag: 'Semana'
    },
    {
      label: 'Leituras premium',
      value: stats.readingShelf,
      detail: 'Biblioteca + revistas',
      tag: 'Novo'
    }
  ];

  return (
    <MemberLayout
      pageTitle="VISÃO GERAL"
      pageSubtitle="SUA ÚLTIMA ACADEMIA ANTES DO FIM"
      sidebarVariant="compact"
    >
      <div className={styles.introContainer}>
        <section className={styles.heroPanel}>
          <div
            className={styles.panelBackdrop}
            style={{ backgroundImage: `url(${featuredDocumentary.coverImage})` }}
          />
          <div className={styles.panelOverlay} />

          <div className={styles.panelContent}>
            <span className={styles.panelTag}>Lançamento Exclusivo</span>
            <h2 className={styles.panelTitle}>{featuredDocumentary.title}</h2>
            <p className={styles.panelDescription}>{featuredDocumentary.description}</p>
            <div className={styles.panelMeta}>
              <span>{featuredDocumentary.duration}</span>
              <span>⭐ {featuredDocumentary.rating}</span>
              <span>{featuredDocumentary.category}</span>
            </div>
            <div className={styles.panelActions}>
              <Link href={`/dashboard/documentarios?highlight=${featuredDocumentary.slug}`} className={styles.primaryAction}>
                ▶ Assistir agora
              </Link>
              <Link href="/dashboard/documentarios" className={styles.secondaryAction}>
                Explorar catálogo
              </Link>
            </div>
          </div>

          <div className={styles.panelPoster}>
            <img src={featuredDocumentary.coverImage} alt={featuredDocumentary.title} />
          </div>
        </section>

        <section className={styles.metricsRow}>
          {metrics.map((metric) => (
            <div key={metric.label} className={styles.metricCard}>
              <span className={styles.metricLabel}>{metric.label}</span>
              <strong className={styles.metricValue}>{metric.value}</strong>
              <div className={styles.metricFooter}>
                <span>{metric.detail}</span>
                <span className={styles.metricTag}>{metric.tag}</span>
              </div>
            </div>
          ))}
        </section>
      </div>

      <section>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Continuar assistindo</h3>
          <Link href="/dashboard/cursos" className={styles.sectionAction}>
            Ver trilhas completas →
          </Link>
        </div>
        <div className={styles.cardsRow}>
          {continueWatching.map((course, index) => (
            <article key={course.slug} className={styles.contentCard}>
              <Link href={`/dashboard/cursos?focus=${course.slug}`} className={styles.cardMedia}>
                <img src={course.image} alt={course.title} />
                <span className={styles.badgeLive}>Em progresso</span>
                <div className={styles.cardGradient} />
              </Link>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>Curso cinematográfico</span>
                <h4 className={styles.cardTitle}>{course.title}</h4>
                <div className={styles.cardMeta}>
                  <span>{course.duration}</span>
                  <span>{progressPresets[index % progressPresets.length]}%</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Documentários em alta</h3>
          <Link href="/dashboard/documentarios" className={styles.sectionAction}>
            Abrir catálogo →
          </Link>
        </div>
        <div className={styles.cardsRow}>
          {trendingDocumentaries.map((doc) => (
            <article key={doc.slug} className={styles.contentCard}>
              <Link href={`/dashboard/documentarios?highlight=${doc.slug}`} className={styles.cardMedia}>
                <img src={doc.coverImage} alt={doc.title} />
                <div className={styles.cardGradient} />
              </Link>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>{doc.category}</span>
                <h4 className={styles.cardTitle}>{doc.title}</h4>
                <div className={styles.cardMeta}>
                  <span>{doc.duration}</span>
                  <span>⭐ {doc.rating}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Novos cursos</h3>
          <Link href="/dashboard/cursos" className={styles.sectionAction}>
            Todas as mentorias →
          </Link>
        </div>
        <div className={styles.cardsRow}>
          {cinematicCourses.map((course) => (
            <article key={course.slug} className={styles.contentCard}>
              <Link href={`/dashboard/cursos?focus=${course.slug}`} className={styles.cardMedia}>
                <img src={course.image} alt={course.title} />
                <div className={styles.cardGradient} />
              </Link>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>Mentoria exclusiva</span>
                <h4 className={styles.cardTitle}>{course.title}</h4>
                <div className={styles.cardMeta}>
                  <span>{course.duration}</span>
                  <span>{course.lessons} aulas</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Estante digital removida - livros permanecem na página Biblioteca */}
    </MemberLayout>
  );
};

export default DashboardHome;
