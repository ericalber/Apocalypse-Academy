import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import MemberLayout from '../../components/MemberLayout';
import courses from '../../src/app/data/courses.json';
import styles from '../../styles/MemberCollections.module.css';

const CourseDashboard = () => {
  const [filter, setFilter] = useState('Todos');

  const featured = courses[0];

  const totals = useMemo(() => {
    const totalLessons = courses.reduce((acc, course) => acc + (course.lessons || 0), 0);
    const totalHours = courses.reduce((acc, course) => {
      const match = (course.duration || '').match(/\d+/);
      return match ? acc + parseInt(match[0], 10) : acc;
    }, 0);
    return { totalLessons, totalHours };
  }, []);

  const filters = ['Todos', 'Trilhas Express', 'Mentorias Longas'];

  const filteredCourses = useMemo(() => {
    if (filter === 'Todos') {
      return courses;
    }

    if (filter === 'Trilhas Express') {
      return courses.filter((course) => (course.lessons || 0) <= 10);
    }

    return courses.filter((course) => (course.lessons || 0) > 10);
  }, [filter]);

  const progressPresets = [72, 54, 88, 63, 41, 95, 67, 82];

  return (
    <MemberLayout
      pageTitle="TRILHAS E MENTORIAS"
      pageSubtitle="Estudos cinematográficos com roteiros, exercícios e materiais complementares"
    >
      <section className={styles.pageIntro}>
        <div className={styles.introCopy}>
          <span className={styles.introHighlight}>Sua trilha favorita</span>
          <h2 className={styles.introTitle}>{featured.title}</h2>
          <p className={styles.introText}>
            Conecte-se com a jornada completa de escatologia cinematográfica. Cada módulo foi construído com
            roteiros inspirados em Movie UI Kit, assets de streaming premium e trilhas sonoras originais.
          </p>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Módulos</span>
              <span className={styles.infoValue}>{featured.lessons}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Duração</span>
              <span className={styles.infoValue}>{featured.duration}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Horas totais</span>
              <span className={styles.infoValue}>{totals.totalHours}h</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Aulas disponíveis</span>
              <span className={styles.infoValue}>{totals.totalLessons}</span>
            </div>
          </div>
        </div>
        <div className={styles.introPoster}>
          <img src={featured.image} alt={featured.title} />
        </div>
      </section>

      <section className={styles.filtersBar}>
        <div className={styles.filtersGroup}>
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={
                filter === item
                  ? `${styles.filterChip} ${styles.filterChipActive}`
                  : styles.filterChip
              }
            >
              {item}
            </button>
          ))}
        </div>
        <Link href="/dashboard/documentarios" className={styles.playButton}>
          Ver documentários
        </Link>
      </section>

      <section className={`${styles.collectionGrid} ${styles.gridWide}`}>
        {filteredCourses.map((course, index) => (
          <article key={course.slug} className={styles.collectionCard}>
            <div className={styles.collectionMedia}>
              <img src={course.image} alt={course.title} />
              <span className={styles.collectionMeta}>Mentoria</span>
            </div>
            <div className={styles.collectionBody}>
              <h3 className={styles.collectionTitle}>{course.title}</h3>
              <div className={styles.collectionFooter}>
                <span>{course.lessons} aulas</span>
                <span>{course.duration}</span>
              </div>
            </div>
            <div className={styles.collectionFooter}>
              <span>Progresso {progressPresets[index % progressPresets.length]}%</span>
              <Link href={`/dashboard/cursos?focus=${course.slug}`} className={styles.playButton}>
                Continuar
              </Link>
            </div>
          </article>
        ))}
      </section>
    </MemberLayout>
  );
};

export default CourseDashboard;
