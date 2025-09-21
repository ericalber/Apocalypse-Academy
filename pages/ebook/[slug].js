import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/Header';
import styles from '../../styles/EbookDetail.module.css';

const EbookDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Carregando...</div>;
  }

  // Dados do e-book baseado no slug
  const ebookData = {
    'preparacao-ultimos-dias': {
      id: 1,
      title: 'Preparação para os Últimos Dias',
      author: 'Dr. Marcos Silva',
      category: 'Preparação',
      pages: 120,
      rating: 4.9,
      reviews: 156,
      cover: '/images/ebooks/preparacao-ultimos-dias.jpg',
      description: 'Manual prático completo para preparação espiritual, mental e física para os últimos tempos.',
      fullDescription: 'Este manual abrangente oferece orientações práticas e bíblicas para se preparar adequadamente para os eventos dos últimos tempos. Aborda preparação espiritual, mental, física e material, baseado em sólidos fundamentos escriturísticos.',
      price: 'R$ 14,95',
      originalPrice: 'R$ 29,90',
      discount: '50%',
      isNew: true,
      isFree: false,
      chapters: [
        'Introdução à Preparação Profética',
        'Fundamentos Bíblicos da Preparação',
        'Preparação Espiritual: Oração e Jejum',
        'Preparação Mental: Conhecimento e Discernimento',
        'Preparação Física: Saúde e Resistência',
        'Preparação Material: Recursos e Suprimentos',
        'Preparação Comunitária: Igreja e Família',
        'Sinais dos Tempos: Como Identificar',
        'Estratégias de Sobrevivência Espiritual',
        'Mantendo a Fé em Tempos Difíceis'
      ],
      features: [
        'Guias práticos de preparação',
        'Checklists detalhados',
        'Estudos bíblicos aprofundados',
        'Estratégias de sobrevivência',
        'Orientações para família',
        'Recursos complementares'
      ],
      publishDate: '2024',
      language: 'Português',
      format: 'PDF Digital'
    },
    'decifrando-daniel-apocalipse': {
      id: 2,
      title: 'Decifrando Daniel e Apocalipse',
      author: 'Prof. João Santos',
      category: 'Profecia',
      pages: 95,
      rating: 4.8,
      reviews: 89,
      cover: '/images/ebooks/decifrando-daniel.jpg',
      description: 'Estudo profético avançado verso a verso dos livros proféticos de Daniel e Apocalipse.',
      fullDescription: 'Uma análise detalhada e sistemática dos livros proféticos de Daniel e Apocalipse, oferecendo interpretações baseadas em hermenêutica sólida e contexto histórico-profético.',
      price: 'R$ 17,43',
      originalPrice: 'R$ 24,90',
      discount: '30%',
      isNew: false,
      isFree: false,
      chapters: [
        'Introdução à Profecia Bíblica',
        'O Livro de Daniel: Contexto Histórico',
        'As Visões de Daniel: Interpretação',
        'Os Impérios Mundiais Proféticos',
        'A Septuagésima Semana de Daniel',
        'O Apocalipse: Revelação de Jesus Cristo',
        'As Sete Igrejas do Apocalipse',
        'Os Selos, Trombetas e Taças',
        'A Grande Tribulação',
        'O Milênio e a Eternidade'
      ],
      features: [
        'Análise verso a verso',
        'Mapas proféticos',
        'Cronologia detalhada',
        'Interpretação dispensacional',
        'Contexto histórico',
        'Aplicação contemporânea'
      ],
      publishDate: '2024',
      language: 'Português',
      format: 'PDF Digital'
    }
  };

  const ebook = ebookData[slug] || ebookData['preparacao-ultimos-dias'];

  const handleReadOnline = () => {
    // Implementar lógica de leitura online
    alert('Abrindo leitor online...');
  };

  const handleDownload = () => {
    // Implementar lógica de download
    alert('Iniciando download...');
  };

  return (
    <div className={styles.ebookDetailContainer}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <div className={styles.ebookCover}>
              <img src={ebook.cover} alt={ebook.title} className={styles.coverImage} />
              {ebook.isNew && <span className={styles.newBadge}>NOVO</span>}
              {ebook.isFree && <span className={styles.freeBadge}>GRÁTIS</span>}
              {ebook.discount && !ebook.isFree && (
                <span className={styles.discountBadge}>{ebook.discount} OFF</span>
              )}
            </div>
            
            <div className={styles.ebookInfo}>
              <div className={styles.breadcrumb}>
                <span onClick={() => router.push('/biblioteca')} className={styles.breadcrumbLink}>
                  Biblioteca
                </span>
                <span className={styles.breadcrumbSeparator}>›</span>
                <span className={styles.breadcrumbCurrent}>{ebook.category}</span>
              </div>
              
              <h1 className={styles.ebookTitle}>{ebook.title}</h1>
              <p className={styles.ebookAuthor}>por {ebook.author}</p>
              
              <div className={styles.ebookMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Páginas:</span>
                  <span className={styles.metaValue}>{ebook.pages}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Avaliação:</span>
                  <span className={styles.metaValue}>⭐ {ebook.rating} ({ebook.reviews} reviews)</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Categoria:</span>
                  <span className={styles.metaValue}>{ebook.category}</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Formato:</span>
                  <span className={styles.metaValue}>{ebook.format}</span>
                </div>
              </div>
              
              <p className={styles.ebookDescription}>{ebook.description}</p>
              
              {/* Price Section */}
              <div className={styles.priceSection}>
                {ebook.isFree ? (
                  <span className={styles.freePrice}>GRÁTIS</span>
                ) : (
                  <div className={styles.priceContainer}>
                    <span className={styles.currentPrice}>{ebook.price}</span>
                    {ebook.originalPrice && (
                      <span className={styles.originalPrice}>{ebook.originalPrice}</span>
                    )}
                    {ebook.discount && (
                      <span className={styles.savings}>Economize {ebook.discount}</span>
                    )}
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className={styles.actionButtons}>
                <button className={styles.readButton} onClick={handleReadOnline}>
                  📖 Ler Online
                </button>
                <button className={styles.downloadButton} onClick={handleDownload}>
                  ⬇️ Baixar PDF
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Tabs */}
        <section className={styles.contentSection}>
          <div className={styles.contentContainer}>
            <div className={styles.tabNavigation}>
              <button 
                className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Visão Geral
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'chapters' ? styles.active : ''}`}
                onClick={() => setActiveTab('chapters')}
              >
                Capítulos
              </button>
              <button 
                className={`${styles.tabButton} ${activeTab === 'reviews' ? styles.active : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Avaliações
              </button>
            </div>

            <div className={styles.tabContent}>
              {activeTab === 'overview' && (
                <div className={styles.overviewTab}>
                  <div className={styles.overviewGrid}>
                    <div className={styles.descriptionSection}>
                      <h3>Sobre este E-book</h3>
                      <p>{ebook.fullDescription}</p>
                      
                      <h4>O que você vai aprender:</h4>
                      <ul className={styles.featuresList}>
                        {ebook.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={styles.detailsSection}>
                      <h3>Detalhes do E-book</h3>
                      <div className={styles.detailsList}>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Autor:</span>
                          <span className={styles.detailValue}>{ebook.author}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Páginas:</span>
                          <span className={styles.detailValue}>{ebook.pages}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Idioma:</span>
                          <span className={styles.detailValue}>{ebook.language}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Formato:</span>
                          <span className={styles.detailValue}>{ebook.format}</span>
                        </div>
                        <div className={styles.detailItem}>
                          <span className={styles.detailLabel}>Publicação:</span>
                          <span className={styles.detailValue}>{ebook.publishDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'chapters' && (
                <div className={styles.chaptersTab}>
                  <h3>Índice de Capítulos</h3>
                  <div className={styles.chaptersList}>
                    {ebook.chapters.map((chapter, index) => (
                      <div key={index} className={styles.chapterItem}>
                        <span className={styles.chapterNumber}>Capítulo {index + 1}</span>
                        <span className={styles.chapterTitle}>{chapter}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className={styles.reviewsTab}>
                  <div className={styles.reviewsHeader}>
                    <h3>Avaliações dos Leitores</h3>
                    <div className={styles.ratingOverview}>
                      <span className={styles.averageRating}>⭐ {ebook.rating}</span>
                      <span className={styles.reviewCount}>({ebook.reviews} avaliações)</span>
                    </div>
                  </div>
                  
                  <div className={styles.reviewsList}>
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <span className={styles.reviewerName}>Maria Silva</span>
                        <span className={styles.reviewRating}>⭐⭐⭐⭐⭐</span>
                      </div>
                      <p className={styles.reviewText}>
                        "Excelente material! Muito prático e bem fundamentado biblicamente. 
                        Recomendo para todos que querem se preparar adequadamente."
                      </p>
                    </div>
                    
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <span className={styles.reviewerName}>João Santos</span>
                        <span className={styles.reviewRating}>⭐⭐⭐⭐⭐</span>
                      </div>
                      <p className={styles.reviewText}>
                        "Conteúdo de alta qualidade. O autor demonstra profundo conhecimento 
                        das Escrituras e oferece orientações muito práticas."
                      </p>
                    </div>
                    
                    <div className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <span className={styles.reviewerName}>Ana Costa</span>
                        <span className={styles.reviewRating}>⭐⭐⭐⭐⭐</span>
                      </div>
                      <p className={styles.reviewText}>
                        "Material essencial para os tempos em que vivemos. Linguagem clara 
                        e aplicação prática. Muito recomendado!"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Back to Library */}
        <div className={styles.backSection}>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/biblioteca')}
          >
            ← Voltar à Biblioteca
          </button>
        </div>
      </main>
    </div>
  );
};

export default EbookDetail;

