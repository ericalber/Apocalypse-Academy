import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/components/HeroSection.module.css';

const heroSlides = [
  {
    id: 1,
    title: 'DOSSIÊ SIGILOSO: O Plano para Controlar o Mundo',
    subtitle: 'Investigação cinematográfica revela documentos vazados e conexões ocultas entre Big Tech, governos e elites financeiras.',
    backgroundImage: '/images/hero/slide-1.jpg',
    category: 'Lançamento Exclusivo',
    duration: 'Estreia • 1h58',
    rating: '4.9'
  },
  {
    id: 2,
    title: 'ARMAGEDOM FINANCEIRO: O Relatório Proibido de 2025',
    subtitle: 'Economistas infiltrados denunciam o cronograma que prepara o colapso fabricado do sistema global.',
    backgroundImage: '/images/hero/slide-2.jpg',
    category: 'Dossiê Classificado',
    duration: 'Breaking News • 1h42',
    rating: '5.0'
  },
  {
    id: 3,
    title: 'SINAIS NO CÉU: O Relógio Profético Acelera',
    subtitle: 'Análise visual em 8K mostra alinhamentos astronômicos e eventos geopolíticos cumprindo profecias milenares.',
    backgroundImage: '/images/hero/slide-3.jpg',
    category: 'Especial Cinematográfico',
    duration: 'Edição Prime • 1h36',
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

            <div className={styles.heroActions}>
              <span className={styles.heroTagline}>Streaming exclusivo</span>
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
