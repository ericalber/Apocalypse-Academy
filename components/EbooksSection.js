import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/components/EbooksSection.module.css';

const EbooksSection = () => {
  const { isAuthenticated } = useAuth();

  const featuredEbooks = [
    {
      id: 1,
      title: "Preparação para os Últimos Dias",
      description: "Manual prático completo para preparação espiritual, mental e física",
      pages: 120,
      publicPrice: "R$ 29,90",
      memberPrice: "R$ 14,95",
      discount: "50% OFF",
      isFree: false,
      isNew: true,
      image: "/images/ebooks/preparacao-ultimos-dias.jpg",
      slug: "preparacao-ultimos-dias",
      category: "PREPARAÇÃO"
    },
    {
      id: 2,
      title: "Decifrando Daniel e Apocalipse",
      description: "Estudo profético avançado verso a verso dos livros proféticos",
      pages: 95,
      publicPrice: "R$ 24,90",
      memberPrice: "R$ 17,43",
      discount: "30% OFF",
      isFree: false,
      isNew: false,
      image: "/images/ebooks/daniel-apocalipse.jpg",
      slug: "decifrando-daniel-apocalipse",
      category: "PROFECIA"
    },
    {
      id: 3,
      title: "Sinais dos Tempos - Checklist",
      description: "Lista de verificação profética para identificar os sinais dos últimos tempos",
      pages: 45,
      publicPrice: "R$ 19,90",
      memberPrice: "GRATUITO",
      discount: null,
      isFree: true,
      isNew: false,
      image: "/images/ebooks/sinais-tempos-checklist.jpg",
      slug: "sinais-tempos-checklist",
      category: "GUIA"
    },
    {
      id: 4,
      title: "Geopolítica dos Últimos Dias",
      description: "Análise das nações e eventos mundiais no contexto profético",
      pages: 88,
      publicPrice: "R$ 22,90",
      memberPrice: "R$ 16,03",
      discount: "30% OFF",
      isFree: false,
      isNew: false,
      image: "/images/ebooks/geopolitica-ultimos-dias.jpg",
      slug: "geopolitica-ultimos-dias",
      category: "GEOPOLÍTICA"
    },
    {
      id: 5,
      title: "Arsenal Espiritual",
      description: "Ferramentas e estratégias para a guerra espiritual dos últimos tempos",
      pages: 67,
      publicPrice: "R$ 18,90",
      memberPrice: "GRATUITO",
      discount: null,
      isFree: true,
      isNew: true,
      image: "/images/ebooks/arsenal-espiritual.jpg",
      slug: "arsenal-espiritual",
      category: "ESPIRITUAL"
    },
    {
      id: 6,
      title: "Cronologia Profética",
      description: "Timeline completa dos eventos dos últimos tempos segundo as Escrituras",
      pages: 78,
      publicPrice: "R$ 21,90",
      memberPrice: "R$ 10,95",
      discount: "50% OFF",
      isFree: false,
      isNew: false,
      image: "/images/ebooks/cronologia-profetica.jpg",
      slug: "cronologia-profetica",
      category: "CRONOLOGIA"
    }
  ];

  const handleEbookClick = (ebook) => {
    if (ebook.isFree) {
      return `/ebooks/${ebook.slug}`;
    }

    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(`/ebooks/${ebook.slug}`);
      return `/assinar?redirect=${returnUrl}`;
    }

    return `/ebooks/${ebook.slug}`;
  };

  const getButtonText = (ebook) => {
    if (ebook.isFree) {
      return 'Baixar e-book gratuito';
    }

    return isAuthenticated ? `Baixar por ${ebook.memberPrice}` : 'Assinar para baixar';
  };

  return (
    <section id="ebooks" data-section="ebooks" className={`${styles.ebooksSection} teaser-section`}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            eBooks Exclusivos
          </h2>
          <p className={styles.sectionSubtitle}>
            Biblioteca digital com conteúdo aprofundado sobre os últimos tempos e preparação profética
          </p>
          <p className={styles.limitedNotice}>
            Amostra de eBooks disponíveis. <strong>Faça login para ver a biblioteca completa com 30+ títulos!</strong>
          </p>
        </div>

        <div className={`${styles.ebooksGrid} grid-3`}>
          {featuredEbooks.map((ebook) => {
            const coverImage = ebook.image || '/images/ebooks/placeholder.svg';

            return (
            <div key={ebook.id} className={`${styles.ebookCard} card`}>
              <div className={styles.badgeStrip}>
                {ebook.isNew && (
                  <span className={styles.badge}>NOVO</span>
                )}
                {ebook.isFree && (
                  <span className={`${styles.badge} ${styles.isFree}`}>GRÁTIS</span>
                )}
                {ebook.discount && !ebook.isFree && (
                  <span className={`${styles.badge} ${styles.isDiscount}`}>{ebook.discount}</span>
                )}
              </div>

              <div className={`${styles.cardImage} card-media`}>
                <img
                  src={coverImage}
                  alt={ebook.title}
                  loading="lazy"
                />
              </div>

              <div className={`${styles.cardContent} card-body`}>
                <h3 className={`${styles.cardTitle} card-title`}>{ebook.title}</h3>

                <p className={`${styles.cardDescription} card-excerpt`}>{ebook.description}</p>

                <div className={styles.metaRow}>
                  <span>{ebook.pages} páginas</span>
                  <span>{ebook.category}</span>
                </div>

                <div className={`${styles.cardFooter} card-footer`}>
                  <div className={styles.priceSection}>
                    {ebook.isFree ? (
                      <div className={styles.priceLine}>
                        <span className={styles.currentPrice}>GRÁTIS</span>
                        <span className={styles.originalPrice}>para membros</span>
                      </div>
                    ) : (
                      <div className={styles.priceLine}>
                        <span className={styles.currentPrice}>
                          {isAuthenticated ? ebook.memberPrice : ebook.publicPrice}
                        </span>
                        <span className={styles.originalPrice}>
                          {isAuthenticated ? `Público ${ebook.publicPrice}` : `Membros ${ebook.memberPrice}`}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className={styles.ctaRow}>
                    <Link
                      href={handleEbookClick(ebook)}
                      className={styles.primaryButton}
                    >
                      {getButtonText(ebook)}
                    </Link>
                    <Link
                      href={`/ebooks/${ebook.slug}`}
                      className={styles.secondaryButton}
                    >
                      Ver detalhes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );})}
        </div>
        <div className={styles.sectionFooter}>
          <Link href="/ebooks" className={styles.viewAllButton}>
            Ver catálogo completo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EbooksSection;
