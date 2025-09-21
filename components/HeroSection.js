import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/components/HeroSection.module.css';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isAuthenticated } = useAuth();

  const heroSlides = [
    {
      id: 1,
      title: "A Última Verdade Antes do Fim",
      subtitle: "Quando o sistema falhar, aqui ainda restará verdade. Acesse conhecimento exclusivo que as elites não querem que você saiba.",
      backgroundImage: "/doc-thumb-1.webp",
      videoUrl: null, // Pode ser adicionado posteriormente
      category: "DOCUMENTÁRIO EXCLUSIVO",
      duration: "2h 15min",
      rating: "4.9"
    },
    {
      id: 2,
      title: "Preparação para os Tempos Finais",
      subtitle: "Guia prático para se preparar espiritualmente, mentalmente e fisicamente para os últimos dias.",
      backgroundImage: "/doc-thumb-3.webp",
      videoUrl: null,
      category: "GUIA COMPLETO",
      duration: "120 páginas",
      rating: "4.9"
    },
    {
      id: 3,
      title: "Decifrando os Sinais dos Tempos",
      subtitle: "Aprenda a identificar e interpretar os sinais proféticos que estão se cumprindo em nossa geração.",
      backgroundImage: "/doc-thumb-2.webp",
      videoUrl: null,
      category: "CURSO PREMIUM",
      duration: "8 módulos",
      rating: "4.8"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 8000); // Troca a cada 8 segundos

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const handleWatchNow = () => {
    if (!isAuthenticated) {
      // Redireciona para login mantendo a página de origem
      window.location.href = '/entrar?redirect=' + encodeURIComponent(window.location.pathname);
    } else {
      // Usuário logado - pode assistir
      window.location.href = '/documentarios';
    }
  };

  const handleMoreInfo = () => {
    if (!isAuthenticated) {
      // Redireciona para assinatura mantendo a página de origem
      window.location.href = '/assinar?redirect=' + encodeURIComponent(window.location.pathname);
    } else {
      // Usuário logado - mostra mais informações
      window.location.href = '/sobre';
    }
  };

  const currentHero = heroSlides[currentSlide];

  return (
    <section className={`${styles.heroSection} hero`}>
      {/* Background com imagem ou vídeo */}
      <div className={`${styles.heroBackground} hero-bg`}>
        {currentHero.videoUrl ? (
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={currentHero.videoUrl} type="video/mp4" />
          </video>
        ) : (
          <div
            className={`${styles.heroImage} hero-bg-image`}
            style={{
              backgroundImage: `url(${currentHero.backgroundImage})`
            }}
          />
        )}
        
        {/* Overlay gradiente */}
        <div className={`${styles.heroOverlay} hero-overlay`} />
      </div>

      {/* Conteúdo principal */}
      <div className={`${styles.heroContent} hero-content`}>
        <div className={`${styles.heroContainer} hero-overlay`}>
          {/* Informações do conteúdo */}
          <div className={`${styles.heroInfo} hero-overlay`}>
            <div className={styles.heroMeta}>
              <span className={styles.heroCategory}>{currentHero.category}</span>
              <div className={`${styles.heroDetails} hero-details`}>
                <span className={styles.heroDuration}>{currentHero.duration}</span>
                <span className={styles.heroRating}>
                  <span className={styles.star}>★</span>
                  {currentHero.rating}
                </span>
              </div>
            </div>

            <h1 className={`${styles.heroTitle} hero-title`}>{currentHero.title}</h1>
            <p className={`${styles.heroSubtitle} hero-subtitle`}>{currentHero.subtitle}</p>

            {/* Botão de ação único */}
            <div className={styles.heroActions}>
              <Link
                href={isAuthenticated ? "/dashboard" : "/assinar"}
                className={styles.subscribeButton}
                aria-label={isAuthenticated ? "Acessar conteúdo" : "Assinar"}
              >
                <span className={styles.playIcon}>▶</span>
                {isAuthenticated ? "Acessar Conteúdo" : "Assinar"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Controles de navegação */}
      <div className={`${styles.heroControls} hero-controls`}>
        <button
          onClick={prevSlide}
          className={`${styles.navButton} hero-nav-button`}
          aria-label="Slide anterior"
        >
          ‹
        </button>
        
        <button
          onClick={nextSlide}
          className={`${styles.navButton} hero-nav-button`}
          aria-label="Próximo slide"
        >
          ›
        </button>
      </div>

      {/* Indicadores */}
      <div className={`${styles.heroIndicators} hero-indicators`}>
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`${styles.indicator} ${
              index === currentSlide ? styles.active : ''
            }`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;

