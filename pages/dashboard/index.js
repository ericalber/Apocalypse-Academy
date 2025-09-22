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
  const highlightedMagazines = magazines.slice(0, 3);
  const highlightedEbooks = ebooks.slice(0, 3);

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

  return (
    <MemberLayout
      pageTitle="Painel Cinematográfico"
      pageSubtitle="Continue sua jornada profética com conteúdos liberados para membros"
    >
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

      <section className={styles.statsRow}>
        <article className={styles.statCard}>
          <span className={styles.statLabel}>Horas de estudo</span>
          <strong className={styles.statNumber}>{stats.totalHours}h</strong>
          <div className={styles.statDetail}>
            <span>Catálogo ativo</span>
            <span className={styles.trendChip}>▲ +14%</span>
          </div>
        </article>

        <article className={styles.statCard}>
          <span className={styles.statLabel}>Aulas disponíveis</span>
          <strong className={styles.statNumber}>{stats.completedLessons}</strong>
          <div className={styles.statDetail}>
            <span>Divididas em 8 coleções</span>
            <span>Nova trilha</span>
          </div>
        </article>

        <article className={styles.statCard}>
          <span className={styles.statLabel}>Documentários</span>
          <strong className={styles.statNumber}>{stats.documentariesAvailable}</strong>
          <div className={styles.statDetail}>
            <span>Atualizados semanalmente</span>
            <span>4K HDR</span>
          </div>
        </article>

        <article className={styles.statCard}>
          <span className={styles.statLabel}>Leituras premium</span>
          <strong className={styles.statNumber}>{stats.readingShelf}</strong>
          <div className={styles.statDetail}>
            <span>Biblioteca e revistas</span>
            <span>Novos PDFs</span>
          </div>
        </article>
      </section>

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
          <h3 className={styles.sectionTitle}>Novos cursos cinematográficos</h3>
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

      <section>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Sua estante digital</h3>
          <Link href="/dashboard/biblioteca" className={styles.sectionAction}>
            Abrir biblioteca →
          </Link>
        </div>
        <div className={styles.libraryRow}>
          {highlightedMagazines.map((magazine) => (
            <article key={magazine.slug} className={styles.libraryCard}>
              <div className={styles.libraryHeader}>
                <span className={styles.libraryIcon}>📰</span>
                <div>
                  <h4>{magazine.title}</h4>
                  <span className={styles.libraryBody}>Edição {magazine.release}</span>
                </div>
              </div>
              <div className={styles.libraryBody}>
                Relatórios especiais com infográficos, timelines proféticas e análises aprofundadas.
              </div>
              <div className={styles.libraryFooter}>
                <Link href={`/dashboard/revistas?issue=${magazine.slug}`} className={styles.quickLink}>
                  Ler agora
                </Link>
                <span>PDF 4K</span>
              </div>
            </article>
          ))}

          {highlightedEbooks.map((book) => (
            <article key={book.slug} className={styles.libraryCard}>
              <div className={styles.libraryHeader}>
                <span className={styles.libraryIcon}>📚</span>
                <div>
                  <h4>{book.title}</h4>
                  <span className={styles.libraryBody}>{book.category}</span>
                </div>
              </div>
              <div className={styles.libraryBody}>
                {book.description}
              </div>
              <div className={styles.libraryFooter}>
                <Link href={`/dashboard/biblioteca?ebook=${book.slug}`} className={styles.quickLink}>
                  Baixar
                </Link>
                <span>{book.pages} páginas</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </MemberLayout>
  );
};

export default DashboardHome;
