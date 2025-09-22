import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/HomeLiteGuard.module.css';

const HomeLiteGuard = ({
  children,
  title = 'Conteúdo exclusivo para assinantes',
  description = 'Faça parte da Apocalypse Academy e desbloqueie a experiência completa.',
  ctaLabel = 'Assine para acessar',
  ctaHref = '/assinar',
  secondaryLabel = 'Já sou assinante',
  secondaryHref = '/entrar',
  alignment = 'left'
}) => {
  const router = useRouter();

  const handleWrapperClick = () => {
    router.push(ctaHref);
  };

  const overlayClassName = alignment === 'center'
    ? `${styles.overlay} ${styles.overlayCenter}`
    : styles.overlay;

  const contentClassName = alignment === 'center'
    ? `${styles.overlayContent} ${styles.overlayContentCenter}`
    : styles.overlayContent;

  return (
    <div className={styles.guardSection} onClick={handleWrapperClick} role="presentation">
      <div className={styles.dimmedContent} aria-hidden="true">
        {children}
      </div>
      <div className={overlayClassName} aria-hidden="false">
        <div className={contentClassName} onClick={(event) => event.stopPropagation()} role="group">
          <strong className={styles.title}>{title}</strong>
          <p className={styles.description}>{description}</p>
          <div className={styles.buttonRow}>
            <Link href={ctaHref} className={styles.primaryButton}>
              {ctaLabel}
            </Link>
            <Link href={secondaryHref} className={styles.secondaryButton}>
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeLiteGuard;
