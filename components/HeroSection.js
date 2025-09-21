import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/components/HeroSection.module.css';

const heroSlides = [
  {
    id: 1,
    title: 'A Última Verdade Antes do Fim',
    subtitle: 'Quando o sistema falhar, restará a comunidade que discerne os sinais. Assine para assistir aos dossiês completos.',
    backgroundImage: '/poster-documentario-1.png',
    category: 'Documentário Exclusivo',
    duration: '2h15',
    rating: '4.9'
  },
  {
    id: 2,
    title: 'Preparação para os Tempos Finais',
    subtitle: 'Orientações espirituais e práticas para proteger sua família diante dos dias mais desafiadores.',
    backgroundImage: '/poster-curso-1.png',
    category: 'Guia Completo',
    duration: '120 páginas',
    rating: '5.0'
  },
  {
    id: 3,
    title: 'Decifrando os Sinais dos Tempos',
    subtitle: 'Identifique os eventos proféticos que já estão em andamento e saiba como responder com fé.',
    backgroundImage: '/poster-geopolitica.png',
    category: 'Curso Premium',
    duration: '8 módulos',
    rating: '4.8'
  }
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const currentHero = heroSlides[currentSlide];

  return (
    <section className={`${styles.heroSection} hero`}>
      {/* Background com imagem ou vídeo */}
      <div className={`${styles.heroBackground} hero-bg`}>
        <div
          className={`${styles.heroImage} hero-bg-image`}
          style={{
            backgroundImage: `url(${currentHero.backgroundImage})`
          }}
        />
        
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
                href="/assinar"
                className={styles.subscribeButton}
                aria-label="Assine para acessar o conteúdo completo"
              >
                <span className={styles.playIcon}>▶</span>
                Assinar para acessar
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
