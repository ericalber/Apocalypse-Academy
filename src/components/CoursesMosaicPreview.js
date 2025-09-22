import React, { useMemo } from 'react';
import styles from '../styles/CoursesMosaicPreview.module.css';
import courses from '../app/data/courses.json';

const CoursesMosaicPreview = () => {
  const mosaic = useMemo(() => {
    const repeated = [...courses, ...courses, ...courses];
    return repeated.slice(0, 20);
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <div className={styles.grid}>
        {mosaic.map((course, index) => (
          <article key={`${course.slug}-${index}`} className={styles.card}>
            <div className={styles.cover}>
              <img src={course.image} alt="" loading="lazy" />
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{course.title}</h3>
              <span className={styles.meta}>{course.duration} • {course.lessons} aulas</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CoursesMosaicPreview;
