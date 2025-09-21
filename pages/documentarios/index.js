import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLanguage } from '../../contexts/LanguageContext';
import OptimizedImage from '../../components/OptimizedImage';
import styles from '../../styles/Documentarios.module.css';
import DocumentaryCard from '../../components/DocumentaryCard';

const DocumentariosPage = () => {
  const { t } = useLanguage();
  const router = useRouter();
  const [filters, setFilters] = useState({
    category: 'all',
    search: ''
  });
  
  // Dados simulados de documentários
  const MOCK_DOCUMENTARIES = [
    {
      id: 1,
      title: 'REVELADO: A Arquitetura Secreta da Besta Global',
      description: 'As estruturas de poder ocultas que controlam o mundo e como elas cumprem exatamente o que a Bíblia profetizou há milênios.',
      coverImage: '/images/documentaries/arquitetura-besta.jpg',
      duration: '1h 45min',
      category: 'PROFECIA',
      rating: 4.9,
      year: 2024
    },
    {
      id: 2,
      title: 'EXPOSTO: O Dossiê Proibido do Anticristo',
      description: 'Documentos confidenciais e evidências históricas chocantes revelam quem realmente é o anticristo e como ele já está entre nós.',
      coverImage: '/images/documentaries/dossie-anticristo.jpg',
      duration: '2h 10min',
      category: 'PROFECIA',
      rating: 4.8,
      year: 2024
    },
    {
      id: 3,
      title: 'ALERTA: Inteligência Artificial e o Apocalipse Iminente',
      description: 'A verdade assustadora sobre como a IA está cumprindo profecias bíblicas e preparando o caminho para o juízo final. Você não vai acreditar no que descobrimos.',
      coverImage: '/images/documentaries/ia-juizo-final.jpg',
      duration: '1h 30min',
      category: 'TECNOLOGIA',
      rating: 4.7,
      year: 2024
    },
    {
      id: 4,
      title: 'URGENTE: Os 7 Sinais do Fim que Estão Acontecendo AGORA',
      description: 'Eventos atuais que provam, sem sombra de dúvida, que estamos vivendo os últimos dias profetizados. O 5º sinal vai te chocar.',
      coverImage: '/images/documentaries/sinais-tempos.jpg',
      duration: '1h 55min',
      category: 'SINAIS',
      rating: 4.9,
      year: 2024
    },
    {
      id: 5,
      title: 'CONSPIRAÇÃO CONFIRMADA: O Grande Reset Apocalíptico',
      description: 'A elite global está implementando um plano que cumpre exatamente o que a Bíblia advertiu sobre o governo mundial do fim dos tempos.',
      coverImage: '/images/documentaries/grande-reset.jpg',
      duration: '2h 05min',
      category: 'GEOPOLITICA',
      rating: 4.8,
      year: 2024
    },
    {
      id: 6,
      title: 'DESMASCARADA: A Nova Babilônia que Controla Sua Vida',
      description: 'Como os sistemas modernos replicam a antiga Babilônia e por que isso significa que o retorno de Cristo está mais próximo do que você imagina.',
      coverImage: '/images/documentaries/babilonia-moderna.jpg',
      duration: '1h 50min',
      category: 'PROFECIA',
      rating: 4.6,
      year: 2023
    }
  ];

  const categories = [
    { key: 'all', label: 'Todos', count: MOCK_DOCUMENTARIES.length },
    { key: 'PROFECIA', label: 'Profecia', count: MOCK_DOCUMENTARIES.filter(d => d.category === 'PROFECIA').length },
    { key: 'SINAIS', label: 'Sinais dos Tempos', count: MOCK_DOCUMENTARIES.filter(d => d.category === 'SINAIS').length },
    { key: 'GEOPOLITICA', label: 'Geopolítica', count: MOCK_DOCUMENTARIES.filter(d => d.category === 'GEOPOLITICA').length },
    { key: 'TECNOLOGIA', label: 'Tecnologia', count: MOCK_DOCUMENTARIES.filter(d => d.category === 'TECNOLOGIA').length }
  ];

  const filteredDocumentaries = MOCK_DOCUMENTARIES.filter(doc => {
    const matchesCategory = filters.category === 'all' || doc.category === filters.category;
    const matchesSearch = !filters.search || 
      doc.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      doc.description.toLowerCase().includes(filters.search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>Documentários</span>
      </nav>

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className="documentarios-title">{t('documentaries.title') || 'Documentários em Destaque'}</h1>
          <p className={styles.heroDescription}>
            Conteúdo exclusivo sobre os últimos tempos, profecias bíblicas e sinais dos tempos
          </p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className={styles.filtersSection}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Buscar documentários..."
            value={filters.search}
            onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.categoryFilters}>
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setFilters(prev => ({ ...prev, category: category.key }))}
              className={`${styles.categoryBtn} ${filters.category === category.key ? styles.active : ''}`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.documentariesGrid}>
        {filteredDocumentaries.map(documentary => (
          <DocumentaryCard key={documentary.id} documentary={documentary} />
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredDocumentaries.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🎬</div>
          <h3>Nenhum documentário encontrado</h3>
          <p>
            {filters.search 
              ? `Nenhum resultado para "${filters.search}"`
              : 'Não há documentários nesta categoria'
            }
          </p>
          <button 
            onClick={() => setFilters({ category: 'all', search: '' })}
            className={styles.resetBtn}
          >
            Ver todos os documentários
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentariosPage;
