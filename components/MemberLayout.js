import React, { useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/MemberLayout.module.css';

const navItems = [
  { href: '/dashboard', label: 'Visão Geral', icon: '🏠' },
  { href: '/dashboard/documentarios', label: 'Documentários', icon: '🎬' },
  { href: '/dashboard/cursos', label: 'Cursos', icon: '🎓' },
  { href: '/dashboard/devocionais', label: 'Devocionais', icon: '🎧' },
  { href: '/dashboard/biblioteca', label: 'Biblioteca', icon: '📚' },
  { href: '/dashboard/revistas', label: 'Revistas', icon: '📰' }
];

const MemberLayout = ({ children, pageTitle = 'Área do assinante', pageSubtitle }) => {
  const router = useRouter();
  const { user, loading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      router.replace(`/entrar?redirect=${encodeURIComponent(router.asPath)}`);
    }
  }, [loading, isAuthenticated, router]);

  const initials = useMemo(() => {
    if (!user?.name) {
      return 'AA';
    }
    return user.name
      .split(' ')
      .map((part) => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }, [user?.name]);

  const activePath = router.pathname.replace(/\/$/, '');

  if (loading || !isAuthenticated()) {
    return (
      <div className={styles.bootLoading}>
        <div className={styles.loadingPulse} />
        <span>Abrindo a plataforma cinematográfica...</span>
      </div>
    );
  }

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <span className={styles.logoAccent}>⟁</span>
          <div>
            <strong className={styles.logoTitle}>Apocalypse Academy</strong>
            <span className={styles.logoSubtitle}>Experiência Cinematográfica</span>
          </div>
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) => {
            const normalizedHref = item.href.replace(/\/$/, '');
            const isActive = activePath === normalizedHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? `${styles.navItem} ${styles.navItemActive}` : styles.navItem}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.subscriptionTag}>
            <span className={styles.pulseDot} />
            {user?.subscription?.plan ? `Plano ${user.subscription.plan}` : 'Membro ativo'}
          </div>
          <p className={styles.sidebarHint}>
            Acesso completo a documentários, cursos, devocionais, biblioteca digital e revistas exclusivas.
          </p>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.header}>
          <div className={styles.heading}>
            <h1>{pageTitle}</h1>
            {pageSubtitle && <p>{pageSubtitle}</p>}
          </div>
          <div className={styles.headerActions}>
            <div className={styles.searchBox}>
              <span className={styles.searchIcon}>🔍</span>
              <input type="search" placeholder="Buscar no catálogo" aria-label="Buscar no catálogo" />
            </div>
            <button className={styles.notificationButton} aria-label="Notificações">
              🔔
            </button>
            <div className={styles.userBadge}>
              <div className={styles.userAvatar}>{initials}</div>
              <div className={styles.userInfo}>
                <strong>{user?.name || 'Membro Apocalypse'}</strong>
                <span>{user?.subscription?.status === 'active' ? 'Assinatura ativa' : 'Acesso liberado'}</span>
              </div>
              <button className={styles.logoutButton} onClick={logout} type="button">
                Sair
              </button>
            </div>
          </div>
        </header>

        <main className={styles.content}>{children}</main>
      </div>
    </div>
  );
};

export default MemberLayout;
