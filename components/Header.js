import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/components/Header.module.css';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fechar menu ao navegar
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  // Fechar menu ao pressionar Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      // Bloquear scroll do body
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // Definir rotas internas/protegidas
  const internalRoutes = ['/dashboard', '/meus-cursos', '/biblioteca', '/admin'];
  const isInternalRoute = internalRoutes.some(route => router.pathname.startsWith(route)) || 
                         router.pathname.startsWith('/cursos/') || 
                         router.pathname.startsWith('/categoria/');

  // Lógica de exibição do cabeçalho baseada na rota
  const shouldShowLogout = isInternalRoute && isAuthenticated();

  // Menu items na ordem especificada: início • notícias • revistas • cursos • documentários • ebooks • sobre nós (contato apenas no mobile)
  const navigationItems = [
    { href: '/', label: 'Início' },
    { href: '/noticias', label: 'Notícias' },
    { href: '/artigos', label: 'Artigos' },
    { href: '/revistas', label: 'Revistas' },
    { href: '/cursos', label: 'Cursos' },
    { href: '/documentarios', label: 'Documentários' },
    { href: '/ebooks', label: 'eBooks' },
    { href: '/sobre', label: 'Sobre Nós' }
  ];

  // Menu mobile inclui contato e todos os itens aprovados
  const mobileNavigationItems = [
    ...navigationItems,
    { href: '/contato', label: 'Contato' }
  ];

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* Logo à esquerda */}
          <Link href="/" className={styles.logo} aria-label="Apocalypse Academy - Página inicial">
            <span className={styles.logoText}>APOCALYPSE ACADEMY</span>
          </Link>

          {/* Navegação centralizada - Desktop */}
          <nav className={styles.navigation} role="navigation" aria-label="Navegação principal">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${
                  router.pathname === item.href ? styles.active : ''
                }`}
                aria-current={router.pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Ações à direita */}
          <div className={styles.actionsSection}>
            {/* Ações do cabeçalho - Baseado na rota */}
            {shouldShowLogout ? (
              <>
                <button 
                  onClick={handleLogout}
                  className={styles.loginButton}
                  aria-label="Sair da sua conta"
                >
                  Sair
                </button>
                <Link 
                  href="/apoie" 
                  className={styles.supportButton}
                  aria-label="Apoie este projeto"
                >
                  Apoie este projeto
                </Link>
              </>
            ) : (
              <>
                <Link 
                  href="/entrar" 
                  className={styles.loginButton}
                  aria-label="Entrar na sua conta"
                >
                  Entrar
                </Link>
                <Link 
                  href="/apoie" 
                  className={styles.supportButton}
                  aria-label="Apoie este projeto"
                >
                  Apoie este projeto
                </Link>
              </>
            )}

            {/* Botão do menu mobile */}
            <button
              className={styles.hamburgerButton}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={isMenuOpen}
            >
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
              <span className={styles.hamburgerLine}></span>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <>
            <div 
              className={styles.mobileMenuOverlay} 
              onClick={closeMenu}
              aria-hidden="true"
            ></div>
            <div 
              id="mobile-menu"
              className={styles.mobileMenu}
              role="navigation"
              aria-label="Menu mobile"
            >
              <div className={styles.mobileMenuContent}>
                {mobileNavigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${styles.mobileNavLink} ${
                      router.pathname === item.href ? styles.active : ''
                    }`}
                    onClick={closeMenu}
                    aria-current={router.pathname === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <div className={styles.mobileActions}>
                  {/* Estado baseado na rota - Entrar/Sair + Apoie este projeto */}
                  {shouldShowLogout ? (
                    <>
                      <button 
                        onClick={() => {
                          handleLogout();
                          closeMenu();
                        }}
                        className={styles.mobileLoginButton}
                        aria-label="Sair da sua conta"
                      >
                        Sair
                      </button>
                      <Link 
                        href="/apoie" 
                        className={styles.mobileSupportButton}
                        onClick={closeMenu}
                        aria-label="Apoie este projeto"
                      >
                        Apoie este projeto
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/entrar" 
                        className={styles.mobileLoginButton}
                        onClick={closeMenu}
                        aria-label="Entrar na sua conta"
                      >
                        Entrar
                      </Link>
                      <Link 
                        href="/apoie" 
                        className={styles.mobileSupportButton}
                        onClick={closeMenu}
                        aria-label="Apoie este projeto"
                      >
                        Apoie este projeto
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
