import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../contexts/AuthContext';
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
  const { user, loading } = useAuth();

  const hasAccess = useMemo(() => {
    if (!user) {
      return false;
    }

    const subscriptionStatus = user?.subscription?.status?.toLowerCase();
    if (!subscriptionStatus) {
      return true;
    }

    return ['active', 'trial', 'lifetime', 'complimentary'].includes(subscriptionStatus);
  }, [user]);

  const showOverlay = !loading && !hasAccess;

  const handleWrapperClick = () => {
    if (showOverlay) {
      router.push(ctaHref);
    }
  };

  const overlayClassName = alignment === 'center'
    ? `${styles.overlay} ${styles.overlayCenter}`
    : styles.overlay;

  const contentClassName = alignment === 'center'
    ? `${styles.overlayContent} ${styles.overlayContentCenter}`
    : styles.overlayContent;

  return (
    <div
      className={styles.guardSection}
      onClick={showOverlay ? handleWrapperClick : undefined}
      role="presentation"
    >
      <div
        className={showOverlay ? styles.dimmedContent : styles.revealedContent}
        aria-hidden={showOverlay}
      >
        {children}
      </div>
      {showOverlay && (
        <div className={overlayClassName} aria-hidden="false">
          <div
            className={contentClassName}
            onClick={(event) => event.stopPropagation()}
            role="group"
          >
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
      )}
    </div>
  );
};

export default HomeLiteGuard;
