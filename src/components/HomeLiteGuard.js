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
  secondaryHref = '/entrar'
}) => {
  const router = useRouter();

  const handleWrapperClick = () => {
    router.push(ctaHref);
  };

  return (
    <div className={styles.guardSection} onClick={handleWrapperClick} role="presentation">
      <div className={styles.dimmedContent} aria-hidden="true">
        {children}
      </div>
      <div className={styles.overlay} aria-hidden="false">
        <div className={styles.overlayContent} onClick={(event) => event.stopPropagation()} role="group">
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
