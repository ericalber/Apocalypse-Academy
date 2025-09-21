import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import styles from '../../styles/CoursePage.module.css';

const CoursePage = () => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const [selectedLesson, setSelectedLesson] = useState(0);

  // Dados do curso baseado no slug
  const courseData = {
    title: `Curso: ${slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
    description: "Estudo avançado sobre escatologia bíblica e sinais dos tempos.",
    instructor: "Dr. João Apocalipse",
    duration: "8h 30min",
    totalLessons: 20,
    completedLessons: 12,
    progress: 60,
    chapters: [
      {
        id: 1,
        title: "Introdução à Escatologia",
        lessons: [
          {
            id: 1,
            title: "O que é Escatologia?",
            duration: "25:30",
            completed: true,
            slug: "o-que-e-escatologia"
          },
          {
            id: 2,
            title: "História da Interpretação Profética",
            duration: "32:15",
            completed: true,
            slug: "historia-interpretacao-profetica"
          },
          {
            id: 3,
            title: "Métodos de Estudo Profético",
            duration: "28:45",
            completed: true,
            slug: "metodos-estudo-profetico"
          }
        ]
      },
      {
        id: 2,
        title: "As Profecias de Daniel",
        lessons: [
          {
            id: 4,
            title: "A Estátua de Nabucodonosor",
            duration: "35:20",
            completed: true,
            slug: "estatua-nabucodonosor"
          },
          {
            id: 5,
            title: "As Quatro Bestas",
            duration: "40:10",
            completed: true,
            slug: "quatro-bestas"
          },
          {
            id: 6,
            title: "As 70 Semanas de Daniel",
            duration: "45:30",
            completed: false,
            current: true,
            slug: "setenta-semanas-daniel"
          }
        ]
      },
      {
        id: 3,
        title: "O Apocalipse de João",
        lessons: [
          {
            id: 7,
            title: "As Sete Igrejas",
            duration: "38:15",
            completed: false,
            slug: "sete-igrejas"
          },
          {
            id: 8,
            title: "Os Sete Selos",
            duration: "42:20",
            completed: false,
            slug: "os-sete-selos-apocalipse"
          },
          {
            id: 9,
            title: "As Sete Trombetas",
            duration: "39:45",
            completed: false,
            slug: "sete-trombetas"
          }
        ]
      }
    ]
  };

  const handleLessonClick = (lesson, chapterIndex, lessonIndex) => {
    if (lesson.completed || lesson.current) {
      const targetUrl = `/cursos/${slug}/aulas/${lesson.slug}`;
      router.push(targetUrl);
    }
  };

  if (!isAuthenticated()) {
    return (
      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <div className={styles.authRequired}>
            <h1>Acesso Restrito</h1>
            <p>Você precisa estar logado para acessar este curso.</p>
            <button onClick={() => router.push('/entrar')}>
              Fazer Login
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.courseContainer}>
          
          {/* Cabeçalho do Curso */}
          <section className={styles.courseHeader}>
            <div className={styles.courseInfo}>
              <h1 className={styles.courseTitle}>{courseData.title}</h1>
              <p className={styles.courseDescription}>{courseData.description}</p>
              <div className={styles.courseMeta}>
                <span>👨‍🏫 {courseData.instructor}</span>
                <span>⏱️ {courseData.duration}</span>
                <span>📚 {courseData.completedLessons}/{courseData.totalLessons} aulas</span>
                <span>🎯 {courseData.progress}% concluído</span>
              </div>
            </div>
            <div className={styles.courseProgress}>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${courseData.progress}%` }}
                />
              </div>
              <span className={styles.progressText}>{courseData.progress}% Concluído</span>
            </div>
          </section>

          {/* Módulo de Capítulos/Aulas */}
          <section className={styles.chaptersSection}>
            <h2 className={styles.sectionTitle}>📚 Capítulos e Aulas</h2>
            
            <div className={styles.chaptersContainer}>
              {courseData.chapters.map((chapter, chapterIndex) => (
                <div key={chapter.id} className={styles.chapterCard}>
                  <h3 className={styles.chapterTitle}>
                    Capítulo {chapter.id}: {chapter.title}
                  </h3>
                  
                  <div className={styles.lessonsContainer}>
                    {chapter.lessons.map((lesson, lessonIndex) => (
                      <div 
                        key={lesson.id}
                        className={`${styles.lessonCard} ${
                          lesson.completed ? styles.completed : ''
                        } ${lesson.current ? styles.current : ''}`}
                        onClick={() => handleLessonClick(lesson, chapterIndex, lessonIndex)}
                      >
                        <div className={styles.lessonIcon}>
                          {lesson.completed && '✅'}
                          {lesson.current && '▶️'}
                          {!lesson.completed && !lesson.current && '🔒'}
                        </div>
                        
                        <div className={styles.lessonInfo}>
                          <h4 className={styles.lessonTitle}>
                            Aula {lesson.id}: {lesson.title}
                          </h4>
                          <div className={styles.lessonMeta}>
                            <span>⏱️ {lesson.duration}</span>
                            {lesson.current && <span className={styles.currentBadge}>Em Andamento</span>}
                            {lesson.completed && <span className={styles.completedBadge}>Concluída</span>}
                          </div>
                        </div>
                        
                        <div className={styles.lessonAction}>
                          {lesson.completed && (
                            <button className={styles.reviewButton}>
                              Revisar
                            </button>
                          )}
                          {lesson.current && (
                            <button className={styles.continueButton}>
                              Continuar
                            </button>
                          )}
                          {!lesson.completed && !lesson.current && (
                            <button className={styles.lockedButton} disabled>
                              Bloqueada
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default CoursePage;

