import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import OptimizedImage from '../../components/OptimizedImage';
import styles from '../../styles/Ebooks.module.css';
import Link from 'next/link';

const EbooksPage = () => {
  const { t } = useLanguage();
  
  // Dados simulados de eBooks
  const MOCK_EBOOKS = [
    {
      id: 1,
      title: 'Profecias do Fim dos Tempos',
      author: 'Apocalypse Academy',
      shortDescription: 'Uma análise profunda das profecias bíblicas sobre os últimos dias e sua relevância atual.',
      coverImage: '/images/ebooks/profecias-fim-tempos.jpg',
      price: 29.90,
      amazonAsin: 'B09ABCDEF1',
      category: 'Profecias'
    },
    {
      id: 2,
      title: 'Códigos Bíblicos Revelados',
      author: 'Apocalypse Academy',
      shortDescription: 'Descubra os códigos ocultos nas escrituras e seu significado para os tempos atuais.',
      coverImage: '/images/ebooks/codigos-biblicos.jpg',
      price: 34.90,
      amazonAsin: 'B09ABCDEF2',
      category: 'Estudos Bíblicos'
    },
    {
      id: 3,
      title: 'A Arquitetura da Besta',
      author: 'Apocalypse Academy',
      shortDescription: 'Um estudo detalhado sobre as estruturas de poder global e sua relação com profecias bíblicas.',
      coverImage: '/images/ebooks/arquitetura-besta.jpg',
      price: 39.90,
      amazonAsin: 'B09ABCDEF3',
      category: 'Geopolítica'
    },
    {
      id: 4,
      title: 'Sinais dos Céus',
      author: 'Apocalypse Academy',
      shortDescription: 'Fenômenos astronômicos e sua correlação com eventos proféticos descritos na Bíblia.',
      coverImage: '/images/ebooks/sinais-ceus.jpg',
      price: 27.90,
      amazonAsin: 'B09ABCDEF4',
      category: 'Astronomia Bíblica'
    },
    {
      id: 5,
      title: 'Guerra Espiritual Avançada',
      author: 'Apocalypse Academy',
      shortDescription: 'Estratégias e táticas para combater as forças espirituais nos últimos dias.',
      coverImage: '/images/ebooks/guerra-espiritual.jpg',
      price: 32.90,
      amazonAsin: 'B09ABCDEF5',
      category: 'Guerra Espiritual'
    }
  ];

  // Componente de Card de eBook
  const EbookCard = ({ ebook }) => {
    // Função para gerar link de afiliado da Amazon
    const generateAmazonLink = (asin) => {
      const baseUrl = 'https://www.amazon.com.br/dp/';
      const affiliateTag = 'apocalypseacademy-20'; // ID de afiliado simulado
      
      return `${baseUrl}${asin}?tag=${affiliateTag}`;
    };

    return (
      <div className={styles.ebookCard}>
        <div className={styles.ebookCover}>
          <OptimizedImage 
            src={ebook.coverImage} 
            alt={ebook.title}
            width={200}
            height={300}
            objectFit="cover"
          />
        </div>
        <div className={styles.ebookInfo}>
          <h3>{ebook.title}</h3>
          <p className={styles.author}>{t('ebooks.by')} {ebook.author}</p>
          <p className={styles.description}>{ebook.shortDescription}</p>
          <p className={styles.price}>R$ {ebook.price.toFixed(2)}</p>
          <div className={styles.purchaseOptions}>
            <Link href={`/ebooks/${ebook.id}`} className={styles.directPurchaseBtn}>
              {t('ebooks.buyDirect')}
            </Link>
            <a 
              href={generateAmazonLink(ebook.amazonAsin)} 
              className={styles.amazonBtn}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('ebooks.buyOnAmazon')}
            </a>
          </div>
          <Link href={`/ebooks/${ebook.id}`} className={styles.detailsLink}>
            {t('ebooks.viewDetails')}
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>{t('ebooks.title')}</h1>
          <p>{t('ebooks.subtitle')}</p>
        </div>
      </div>
      
      <div className={styles.ebooksContainer}>
        <div className={styles.filterSection}>
          <h2>{t('ebooks.filterByCategory')}</h2>
          <div className={styles.categoryFilters}>
            <button className={`${styles.categoryBtn} ${styles.active}`}>
              {t('ebooks.all')}
            </button>
            {/* Category buttons would be mapped here */}
          </div>
        </div>
        
        <div className={styles.ebooksGrid}>
          {MOCK_EBOOKS.map(ebook => (
            <EbookCard 
              key={ebook.id}
              ebook={ebook}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EbooksPage;
