import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import styles from '../../styles/EbookDetail.module.css';

// Dados simulados de eBooks
const MOCK_EBOOKS = [
  {
    id: 1,
    title: 'Profecias do Fim dos Tempos',
    author: 'Apocalypse Academy',
    shortDescription: 'Uma análise profunda das profecias bíblicas sobre os últimos dias e sua relevância atual.',
    fullDescription: 'Este eBook apresenta uma análise detalhada e profunda das profecias bíblicas relacionadas aos últimos dias. Exploramos textos do Antigo e Novo Testamento, correlacionando-os com eventos contemporâneos e oferecendo uma perspectiva escatológica fundamentada. Ideal para estudiosos da Bíblia e pessoas interessadas em compreender os sinais proféticos dos tempos atuais.',
    coverImage: '/images/ebooks/profecias-fim-tempos.jpg',
    price: 29.90,
    amazonAsin: 'B09ABCDEF1',
    category: 'Profecias',
    pages: 245,
    releaseDate: '2024-12-15',
    format: 'PDF',
    language: 'Português',
    tableOfContents: [
      'Introdução às Profecias Bíblicas',
      'Profecias do Antigo Testamento',
      'Profecias de Daniel',
      'Profecias de Ezequiel',
      'O Apocalipse de João',
      'Sinais dos Últimos Tempos',
      'A Grande Tribulação',
      'O Anticristo',
      'O Arrebatamento',
      'A Segunda Vinda de Cristo',
      'O Milênio',
      'O Juízo Final',
      'Aplicações Práticas'
    ]
  },
  {
    id: 2,
    title: 'Códigos Bíblicos Revelados',
    author: 'Apocalypse Academy',
    shortDescription: 'Descubra os códigos ocultos nas escrituras e seu significado para os tempos atuais.',
    fullDescription: 'Este eBook revela padrões e códigos encontrados nas escrituras sagradas, explorando seu significado e relevância para os tempos atuais. Através de uma análise meticulosa dos textos originais em hebraico e grego, apresentamos descobertas fascinantes sobre mensagens ocultas que podem ter implicações proféticas. Uma obra essencial para quem busca um entendimento mais profundo das escrituras.',
    coverImage: '/images/ebooks/codigos-biblicos.jpg',
    price: 34.90,
    amazonAsin: 'B09ABCDEF2',
    category: 'Estudos Bíblicos',
    pages: 312,
    releaseDate: '2025-01-20',
    format: 'PDF',
    language: 'Português',
    tableOfContents: [
      'Fundamentos dos Códigos Bíblicos',
      'A Língua Hebraica e seus Mistérios',
      'Gematria e Numerologia Bíblica',
      'Códigos Equidistantes de Letras',
      'Padrões Matemáticos na Bíblia',
      'Profecias Codificadas',
      'Nomes Divinos Ocultos',
      'Códigos Messiânicos',
      'Eventos Contemporâneos nos Códigos',
      'Análise Crítica e Limitações',
      'Aplicações Práticas dos Códigos'
    ]
  },
  {
    id: 3,
    title: 'A Arquitetura da Besta',
    author: 'Apocalypse Academy',
    shortDescription: 'Um estudo detalhado sobre as estruturas de poder global e sua relação com profecias bíblicas.',
    fullDescription: 'Este eBook apresenta uma análise aprofundada das estruturas de poder global contemporâneas e sua possível relação com as profecias bíblicas sobre o sistema da Besta. Investigamos organizações internacionais, sistemas econômicos e tendências geopolíticas à luz das escrituras proféticas, oferecendo uma perspectiva única sobre os eventos mundiais atuais e seu possível significado escatológico.',
    coverImage: '/images/ebooks/arquitetura-besta.jpg',
    price: 39.90,
    amazonAsin: 'B09ABCDEF3',
    category: 'Geopolítica',
    pages: 378,
    releaseDate: '2025-02-10',
    format: 'PDF',
    language: 'Português',
    tableOfContents: [
      'A Besta no Apocalipse',
      'Sistemas Globais de Governo',
      'Organizações Internacionais',
      'O Sistema Financeiro Global',
      'Tecnologias de Controle',
      'A Marca da Besta',
      'Identificação Biométrica',
      'Moedas Digitais',
      'Vigilância Global',
      'Censura e Controle de Informação',
      'Resistência Espiritual',
      'Preparação para os Tempos Finais'
    ]
  },
  {
    id: 4,
    title: 'Sinais dos Céus',
    author: 'Apocalypse Academy',
    shortDescription: 'Fenômenos astronômicos e sua correlação com eventos proféticos descritos na Bíblia.',
    fullDescription: 'Este eBook explora a fascinante conexão entre fenômenos astronômicos e eventos proféticos descritos na Bíblia. Analisamos eclipses, conjunções planetárias, cometas e outros sinais celestes, correlacionando-os com profecias bíblicas e eventos históricos. Uma obra que une astronomia e teologia para oferecer uma perspectiva única sobre os sinais dos céus mencionados nas escrituras.',
    coverImage: '/images/ebooks/sinais-ceus.jpg',
    price: 27.90,
    amazonAsin: 'B09ABCDEF4',
    category: 'Astronomia Bíblica',
    pages: 215,
    releaseDate: '2025-03-05',
    format: 'PDF',
    language: 'Português',
    tableOfContents: [
      'Astronomia na Bíblia',
      'O Sol, a Lua e as Estrelas',
      'Eclipses nas Escrituras',
      'A Estrela de Belém',
      'Conjunções Planetárias',
      'Cometas e Meteoros',
      'As Luas de Sangue',
      'Constelações Bíblicas',
      'O Calendário Hebraico',
      'Festas Bíblicas e Ciclos Astronômicos',
      'Sinais Celestes dos Últimos Tempos',
      'Interpretando os Sinais'
    ]
  },
  {
    id: 5,
    title: 'Guerra Espiritual Avançada',
    author: 'Apocalypse Academy',
    shortDescription: 'Estratégias e táticas para combater as forças espirituais nos últimos dias.',
    fullDescription: 'Este eBook apresenta estratégias avançadas de guerra espiritual para os tempos finais. Baseado em princípios bíblicos sólidos, oferecemos um guia prático para identificar, resistir e vencer as batalhas espirituais intensificadas dos últimos dias. Abordamos temas como autoridade espiritual, intercessão estratégica, libertação e proteção contra influências demoníacas, equipando o leitor para permanecer firme em tempos de adversidade espiritual.',
    coverImage: '/images/ebooks/guerra-espiritual.jpg',
    price: 32.90,
    amazonAsin: 'B09ABCDEF5',
    category: 'Guerra Espiritual',
    pages: 287,
    releaseDate: '2025-04-18',
    format: 'PDF',
    language: 'Português',
    tableOfContents: [
      'Fundamentos da Guerra Espiritual',
      'A Armadura de Deus',
      'Identificando Fortalezas Espirituais',
      'Autoridade em Cristo',
      'Intercessão Estratégica',
      'Jejum como Arma Espiritual',
      'Libertação de Opressão Demoníaca',
      'Proteção do Lar e da Família',
      'Batalhas Mentais',
      'Guerreiros de Oração',
      'Estratégias para os Últimos Dias',
      'Vitória Final em Cristo'
    ]
  }
];

const EbookDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ebook, setEbook] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simular carregamento de dados
      const ebookData = MOCK_EBOOKS.find(e => e.id === parseInt(id));
      
      if (ebookData) {
        setEbook(ebookData);
      } else {
        // Redirecionar para página 404 ou de eBooks se não encontrar
        router.push('/ebooks');
      }
      
      setLoading(false);
      
      // Verificar autenticação (simulado)
      const checkAuth = () => {
        // Em um cenário real, verificaria o token de autenticação
        const token = localStorage.getItem('authToken');
        setIsAuthenticated(!!token);
      };
      
      checkAuth();
    }
  }, [id, router]);

  // Função para gerar link de afiliado da Amazon
  const generateAmazonLink = (asin) => {
    const baseUrl = 'https://www.amazon.com.br/dp/';
    const affiliateTag = 'apocalypseacademy-20'; // ID de afiliado simulado
    
    return `${baseUrl}${asin}?tag=${affiliateTag}`;
  };

  const handleDirectPurchase = () => {
    if (!isAuthenticated) {
      // Redirecionar para login se não estiver autenticado
      router.push(`/auth/login?redirect=/ebooks/purchase/${id}`);
      return;
    }
    
    // Se autenticado, redirecionar para página de compra
    router.push(`/ebooks/purchase/${id}`);
  };

  if (loading) {
    return (
      <Layout>
        <div className={styles.loadingContainer}>
          <div className={styles.loader}></div>
          <p>Carregando detalhes do eBook...</p>
        </div>
      </Layout>
    );
  }

  if (!ebook) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <h2>eBook não encontrado</h2>
          <p>O eBook que você está procurando não está disponível.</p>
          <button 
            className={styles.backButton}
            onClick={() => router.push('/ebooks')}
          >
            Voltar para eBooks
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.ebookDetailContainer}>
        <div className={styles.ebookHeader}>
          <div className={styles.ebookCover}>
            <img src={ebook.coverImage} alt={ebook.title} />
          </div>
          
          <div className={styles.ebookInfo}>
            <h1>{ebook.title}</h1>
            <p className={styles.author}>por {ebook.author}</p>
            
            <div className={styles.ebookMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Páginas:</span>
                <span className={styles.metaValue}>{ebook.pages}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Formato:</span>
                <span className={styles.metaValue}>{ebook.format}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Idioma:</span>
                <span className={styles.metaValue}>{ebook.language}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Lançamento:</span>
                <span className={styles.metaValue}>
                  {new Date(ebook.releaseDate).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Categoria:</span>
                <span className={styles.metaValue}>{ebook.category}</span>
              </div>
            </div>
            
            <div className={styles.priceSection}>
              <p className={styles.price}>R$ {ebook.price.toFixed(2)}</p>
              <div className={styles.purchaseOptions}>
                <button 
                  className={styles.directPurchaseBtn}
                  onClick={handleDirectPurchase}
                >
                  Comprar Direto
                </button>
                <a 
                  href={generateAmazonLink(ebook.amazonAsin)} 
                  className={styles.amazonBtn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Comprar na Amazon
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.ebookContent}>
          <div className={styles.descriptionSection}>
            <h2>Descrição</h2>
            <p>{ebook.fullDescription}</p>
          </div>
          
          <div className={styles.tocSection}>
            <h2>Conteúdo</h2>
            <ul className={styles.tableOfContents}>
              {ebook.tableOfContents.map((chapter, index) => (
                <li key={index} className={styles.tocItem}>
                  <span className={styles.tocNumber}>{index + 1}.</span>
                  <span className={styles.tocTitle}>{chapter}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.protectionInfo}>
            <h2>Proteção de Conteúdo</h2>
            <p>Nossos eBooks são protegidos por tecnologia de marca d'água digital e criptografia para garantir a proteção dos direitos autorais. Cada cópia é única e vinculada ao comprador.</p>
            <p>Ao adquirir este eBook, você concorda com nossos termos de uso, que proíbem a redistribuição não autorizada do conteúdo.</p>
          </div>
        </div>
        
        <div className={styles.relatedBooks}>
          <h2>Você também pode gostar</h2>
          <div className={styles.relatedGrid}>
            {MOCK_EBOOKS.filter(e => e.id !== parseInt(id))
              .slice(0, 3)
              .map(relatedBook => (
                <div key={relatedBook.id} className={styles.relatedCard}>
                  <img src={relatedBook.coverImage} alt={relatedBook.title} />
                  <h3>{relatedBook.title}</h3>
                  <p className={styles.relatedPrice}>
                    R$ {relatedBook.price.toFixed(2)}
                  </p>
                  <button 
                    className={styles.viewDetailsBtn}
                    onClick={() => router.push(`/ebooks/${relatedBook.id}`)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EbookDetailPage;
