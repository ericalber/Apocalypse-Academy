import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/components/CoursesSection.module.css';

const CoursesSection = () => {
  const { isAuthenticated } = useAuth();

  const featuredCourses = [
    {
      id: 1,
      title: "Escatologia Bíblica Avançada",
      description: "Estudo completo sobre os últimos tempos, incluindo análise das profecias de Daniel e Apocalipse.",
      price: "R$ 197",
      rating: 4.9,
      duration: "12 horas",
      lessons: 24,
      level: "Avançado",
      image: "/poster-escatologia.png",
      slug: "escatologia-biblica-avancada",
      isNew: true,
      isPremium: true
    },
    {
      id: 2,
      title: "Preparação para os Tempos Finais",
      description: "Guia prático para se preparar espiritualmente, mentalmente e fisicamente para os últimos dias.",
      price: "R$ 147",
      rating: 4.8,
      duration: "8 horas",
      lessons: 16,
      level: "Intermediário",
      image: "/poster-curso-1.png",
      slug: "preparacao-tempos-finais",
      isNew: false,
      isPremium: false
    },
    {
      id: 3,
      title: "Decifrando os Sinais dos Tempos",
      description: "Aprenda a identificar e interpretar os sinais proféticos que estão se cumprindo hoje.",
      price: "R$ 97",
      rating: 4.7,
      duration: "6 horas",
      lessons: 12,
      level: "Básico",
      image: "/poster-curso-2.png",
      slug: "decifrando-sinais-tempos",
      isNew: false,
      isPremium: false
    },
    {
      id: 4,
      title: "Geopolítica e Profecia",
      description: "Como os eventos mundiais se alinham com as profecias bíblicas dos últimos tempos.",
      price: "R$ 247",
      rating: 4.9,
      duration: "15 horas",
      lessons: 30,
      level: "Avançado",
      image: "/poster-geopolitica.png",
      slug: "geopolitica-profecia",
      isNew: false,
      isPremium: true
    }
  ];

  const handleCourseClick = (course) => {
    if (!isAuthenticated) {
      // Redirecionar para login/assinatura preservando origem
      const returnUrl = encodeURIComponent(`/cursos/${course.slug}`);
      return `/entrar?redirect=${returnUrl}`;
    }
    return `/cursos/${course.slug}`;
  };

  return (
    <section id="cursos" data-section="cursos" className={`${styles.coursesSection} teaser-section`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            Cursos em Destaque
          </h2>
          <p className={styles.sectionSubtitle}>
            Aprofunde seu conhecimento com nossos cursos exclusivos sobre escatologia, geopolítica e preparação
          </p>
        </div>

        <div className={`${styles.coursesGrid} grid-3`}>
          {featuredCourses.map((course) => (
            <div key={course.id} className={`${styles.courseCard} card`}>
              <div className={styles.badgeStrip}>
                {course.isPremium && (
                  <span className={`${styles.badge} ${styles.isPremium}`}>PREMIUM</span>
                )}
                {course.isNew && (
                  <span className={styles.badge}>NOVO</span>
                )}
              </div>

              <div className={`${styles.cardImage} card-media`}>
                <img 
                  src={course.image} 
                  alt={course.title}
                  loading="lazy"
                />
                <div className={styles.levelBadge}>
                  {course.level}
                </div>
              </div>
              
              <div className={`${styles.cardContent} card-body`}>
                <h3 className={`${styles.cardTitle} card-title`}>
                  {course.title}
                </h3>
                
                <p className={`${styles.cardDescription} card-excerpt`}>
                  {course.description}
                </p>
                
                <div className={styles.courseStats}>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Avaliação</span>
                    <span className={styles.statValue}>{course.rating}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Duração</span>
                    <span className={styles.statValue}>{course.duration}</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statLabel}>Aulas</span>
                    <span className={styles.statValue}>{course.lessons}</span>
                  </div>
                </div>
                
                <div className={`${styles.cardFooter} card-footer`}>
                  <div className={styles.priceSection}>
                    <span className={styles.price}>{course.price}</span>
                    {!isAuthenticated && (
                      <span className={styles.memberDiscount}>
                        Membros: 30% OFF
                      </span>
                    )}
                  </div>
                  
                  <Link 
                    href={handleCourseClick(course)}
                    className={styles.enrollButton}
                  >
                    {isAuthenticated ? 'Acessar Curso' : 'Inscrever-se'}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.sectionFooter}>
          <Link href="/cursos" className={styles.viewAllButton}>
            Ver todos os cursos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CoursesSection;
