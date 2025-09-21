import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import styles from '../styles/Biblioteca.module.css';

const Biblioteca = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Carregando...</div>;
  }

  const ebooks = [
    {
      id: 1,
      slug: 'preparacao-ultimos-dias',
      title: 'Preparação para os Últimos Dias',
      author: 'Dr. Marcos Silva',
      category: 'preparacao',
      pages: 120,
      rating: 4.9,
      cover: '/images/ebooks/preparacao-ultimos-dias.jpg',
      description: 'Manual prático completo para preparação espiritual, mental e física',
      price: 'R$ 14,95',
      originalPrice: 'R$ 29,90',
      discount: '50%',
      isNew: true,
      isFree: false
    },
    {
      id: 2,
      slug: 'decifrando-daniel-apocalipse',
      title: 'Decifrando Daniel e Apocalipse',
      author: 'Prof. João Santos',
      category: 'profecia',
      pages: 95,
      rating: 4.8,
      cover: '/images/ebooks/decifrando-daniel.jpg',
      description: 'Estudo profético avançado verso a verso dos livros proféticos',
      price: 'R$ 17,43',
      originalPrice: 'R$ 24,90',
      discount: '30%',
      isNew: false,
      isFree: false
    },
    {
      id: 3,
      slug: 'sinais-tempos-checklist',
      title: 'Sinais dos Tempos - Checklist',
      author: 'Equipe Apocalypse',
      category: 'guia',
      pages: 45,
      rating: 4.7,
      cover: '/images/ebooks/sinais-tempos.jpg',
      description: 'Lista de verificação profética para identificar os sinais dos últimos tempos',
      price: 'GRÁTIS',
      originalPrice: '',
      discount: '',
      isNew: false,
      isFree: true
    },
    {
      id: 4,
      slug: 'geopolitica-ultimos-dias',
      title: 'Geopolítica dos Últimos Dias',
      author: 'Dr. Carlos Mendes',
      category: 'geopolitica',
      pages: 88,
      rating: 4.6,
      cover: '/images/ebooks/geopolitica-ultimos-dias.jpg',
      description: 'Análise das nações e eventos mundiais no contexto profético',
      price: 'R$ 16,03',
      originalPrice: 'R$ 22,90',
      discount: '30%',
      isNew: false,
      isFree: false
    },
    {
      id: 5,
      slug: 'arsenal-espiritual',
      title: 'Arsenal Espiritual',
      author: 'Pastor Miguel Ferreira',
      category: 'espiritual',
      pages: 67,
      rating: 4.9,
      cover: '/images/ebooks/arsenal-espiritual.jpg',
      description: 'Ferramentas e estratégias para a guerra espiritual dos últimos tempos',
      price: 'GRÁTIS',
      originalPrice: '',
      discount: '',
      isNew: true,
      isFree: true
    },
    {
      id: 6,
      slug: 'cronologia-profetica',
      title: 'Cronologia Profética',
      author: 'Dr. Ana Costa',
      category: 'cronologia',
      pages: 78,
      rating: 4.8,
      cover: '/images/ebooks/cronologia-profetica.jpg',
      description: 'Timeline completa dos eventos dos últimos tempos segundo as Escrituras',
      price: 'R$ 10,95',
      originalPrice: 'R$ 21,90',
      discount: '50%',
      isNew: false,
      isFree: false
    },
    {
      id: 7,
      slug: 'marca-da-besta',
      title: 'A Marca da Besta Revelada',
      author: 'Prof. Ricardo Lima',
      category: 'profecia',
      pages: 102,
      rating: 4.7,
      cover: '/images/ebooks/marca-da-besta.jpg',
      description: 'Análise profunda sobre o sistema de controle dos últimos tempos',
      price: 'R$ 19,90',
      originalPrice: 'R$ 29,90',
      discount: '33%',
      isNew: true,
      isFree: false
    },
    {
      id: 8,
      slug: 'igreja-laodicia',
      title: 'A Igreja de Laodicéia',
      author: 'Pastor Daniel Rocha',
      category: 'espiritual',
      pages: 56,
      rating: 4.5,
      cover: '/images/ebooks/igreja-laodicia.jpg',
      description: 'Reflexões sobre a igreja dos últimos tempos',
      price: 'R$ 12,90',
      originalPrice: 'R$ 18,90',
      discount: '32%',
      isNew: false,
      isFree: false
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos os E-books', count: ebooks.length },
    { id: 'preparacao', name: 'Preparação', count: ebooks.filter(e => e.category === 'preparacao').length },
    { id: 'profecia', name: 'Profecia', count: ebooks.filter(e => e.category === 'profecia').length },
    { id: 'geopolitica', name: 'Geopolítica', count: ebooks.filter(e => e.category === 'geopolitica').length },
    { id: 'espiritual', name: 'Espiritual', count: ebooks.filter(e => e.category === 'espiritual').length },
    { id: 'guia', name: 'Guias', count: ebooks.filter(e => e.category === 'guia').length },
    { id: 'cronologia', name: 'Cronologia', count: ebooks.filter(e => e.category === 'cronologia').length }
  ];

  const filteredEbooks = selectedCategory === 'todos' 
    ? ebooks 
    : ebooks.filter(ebook => ebook.category === selectedCategory);

  return (
    <div className={styles.bibliotecaContainer}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>📖 Biblioteca Digital</h1>
            <p className={styles.heroSubtitle}>
              Acesso exclusivo a mais de 30 e-books sobre escatologia, preparação e profecias bíblicas
            </p>
            <div className={styles.heroStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>30+</span>
                <span className={styles.statLabel}>E-books</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>2000+</span>
                <span className={styles.statLabel}>Páginas</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>8</span>
                <span className={styles.statLabel}>Categorias</span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Filter */}
        <section className={styles.categoriesSection}>
          <div className={styles.categoriesContainer}>
            <h2 className={styles.categoriesTitle}>Categorias</h2>
            <div className={styles.categoriesGrid}>
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className={styles.categoryName}>{category.name}</span>
                  <span className={styles.categoryCount}>({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* E-books Grid */}
        <section className={styles.ebooksSection}>
          <div className={styles.ebooksContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                {selectedCategory === 'todos' ? 'Todos os E-books' : categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <span className={styles.resultsCount}>
                {filteredEbooks.length} {filteredEbooks.length === 1 ? 'resultado' : 'resultados'}
              </span>
            </div>

            <div className={styles.ebooksGrid}>
              {filteredEbooks.map(ebook => (
                <div key={ebook.id} className={styles.ebookCard}>
                  {/* Badges */}
                  <div className={styles.badges}>
                    {ebook.isNew && <span className={styles.badge}>NOVO</span>}
                    {ebook.isFree && <span className={styles.badgeFree}>GRÁTIS</span>}
                    {ebook.discount && !ebook.isFree && (
                      <span className={styles.badgeDiscount}>{ebook.discount} OFF</span>
                    )}
                  </div>

                  {/* Cover */}
                  <div className={styles.ebookCover}>
                    <img 
                      src={ebook.cover} 
                      alt={ebook.title}
                      className={styles.coverImage}
                    />
                    <div className={styles.coverOverlay}>
                      <button 
                        className={styles.previewButton}
                        onClick={() => router.push(`/ebook/${ebook.slug}`)}
                      >
                        👁️ Visualizar
                      </button>
                    </div>
                  </div>

                  {/* Info */}
                  <div className={styles.ebookInfo}>
                    <h3 className={styles.ebookTitle}>{ebook.title}</h3>
                    <p className={styles.ebookAuthor}>por {ebook.author}</p>
                    <p className={styles.ebookDescription}>{ebook.description}</p>
                    
                    <div className={styles.ebookMeta}>
                      <span className={styles.pages}>📄 {ebook.pages} páginas</span>
                      <span className={styles.rating}>⭐ {ebook.rating}</span>
                    </div>

                    {/* Price */}
                    <div className={styles.priceSection}>
                      {ebook.isFree ? (
                        <span className={styles.freePrice}>GRÁTIS</span>
                      ) : (
                        <div className={styles.priceContainer}>
                          <span className={styles.currentPrice}>{ebook.price}</span>
                          {ebook.originalPrice && (
                            <span className={styles.originalPrice}>{ebook.originalPrice}</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className={styles.ebookActions}>
                      <button 
                        className={styles.readButton}
                        onClick={() => router.push(`/ebook/${ebook.slug}`)}
                      >
                        📖 Ler Online
                      </button>
                      <button className={styles.downloadButton}>
                        ⬇️ Baixar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Back to Dashboard */}
        <div className={styles.backSection}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/dashboard')}
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </main>
    </div>
  );
};

export default Biblioteca;

