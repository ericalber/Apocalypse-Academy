import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../../styles/RevistaDetalhes.module.css';

const RevistaDetalhes = () => {
  const router = useRouter();
  const { id } = router.query;
  const [magazine, setMagazine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);
  const [relatedMagazines, setRelatedMagazines] = useState([]);

  // Mock data - substituir por API real
  const allMagazines = {
    1: {
      id: 1,
      title: "Apocalypse Insights #01",
      subtitle: "Os Sinais dos Tempos em Nossa Geração",
      description: "Os sinais dos tempos e as profecias que se cumprem em nossa geração.",
      fullDescription: "Esta primeira edição da Apocalypse Insights oferece uma análise profunda dos sinais proféticos que estão se manifestando em nossa época. Através de estudos bíblicos fundamentados e análises contemporâneas, exploramos como os eventos atuais se alinham com as profecias dos últimos tempos.",
      pages: "36 páginas",
      category: "PROFECIA",
      coverImage: "/images/magazines/apocalypse-insights-01.jpg",
      publishDate: "2024-01-15",
      featured: true,
      premium: true,
      downloadUrl: "/downloads/apocalypse-insights-01.pdf",
      previewUrl: "/preview/apocalypse-insights-01.pdf",
      author: "Eric Alberto da Cruz",
      edition: "#01",
      contents: [
        "Editorial: Vivendo os Últimos Dias",
        "Os 7 Sinais Proféticos Atuais",
        "Geopolítica e Profecia Bíblica",
        "Tecnologia e o Anticristo",
        "Preparação Espiritual",
        "Cronologia dos Eventos Finais"
      ],
      highlights: [
        "Análise exclusiva dos eventos de 2024",
        "Mapas proféticos atualizados",
        "Cronologia detalhada dos últimos tempos",
        "Guia prático de preparação"
      ]
    },
    2: {
      id: 2,
      title: "Prophecy Today #02",
      subtitle: "Daniel e Apocalipse Revelados",
      description: "Daniel e Apocalipse: Profecias para os últimos dias decodificadas.",
      fullDescription: "Uma análise verso a verso dos livros proféticos mais importantes da Bíblia. Esta edição decodifica os símbolos e profecias de Daniel e Apocalipse, revelando seu cumprimento em nossa época.",
      pages: "42 páginas",
      category: "ESTUDO",
      coverImage: "/images/magazines/prophecy-today-02.jpg",
      publishDate: "2024-02-01",
      featured: true,
      premium: true,
      downloadUrl: "/downloads/prophecy-today-02.pdf",
      previewUrl: "/preview/prophecy-today-02.pdf",
      author: "Eric Alberto da Cruz",
      edition: "#02",
      contents: [
        "Daniel 2: A Estátua Profética",
        "Daniel 7: As Quatro Bestas",
        "Daniel 9: As 70 Semanas",
        "Apocalipse 13: A Besta do Mar",
        "Apocalipse 17: A Grande Babilônia",
        "Cronologia Profética Unificada"
      ],
      highlights: [
        "Interpretação verso a verso",
        "Gráficos e diagramas explicativos",
        "Conexões proféticas reveladas",
        "Aplicações para hoje"
      ]
    }
  };

  useEffect(() => {
    if (id) {
      loadMagazine();
    }
  }, [id]);

  const loadMagazine = () => {
    setLoading(true);
    
    // Simular carregamento da API
    setTimeout(() => {
      const mag = allMagazines[id];
      if (mag) {
        setMagazine(mag);
        loadRelatedMagazines(mag.category, mag.id);
        
        // Verificar acesso (mock)
        const userSubscribed = localStorage.getItem('userSubscribed') === 'true';
        const hasPurchased = localStorage.getItem(`magazine_${id}`) === 'purchased';
        setHasAccess(!mag.premium || userSubscribed || hasPurchased);
      }
      setLoading(false);
    }, 500);
  };

  const loadRelatedMagazines = (category, currentId) => {
    // Simular revistas relacionadas
    const related = Object.values(allMagazines)
      .filter(mag => mag.category === category && mag.id !== parseInt(currentId))
      .slice(0, 3);
    setRelatedMagazines(related);
  };

  const handleRead = () => {
    if (hasAccess) {
      // Abrir revista em nova aba
      window.open(magazine.downloadUrl, '_blank');
    } else {
      // Redirecionar para assinatura ou compra
      router.push(`/assinatura?ref=magazine_${id}`);
    }
  };

  const handlePreview = () => {
    if (magazine.previewUrl) {
      window.open(magazine.previewUrl, '_blank');
    }
  };

  const handleDownload = () => {
    if (hasAccess) {
      // Iniciar download
      const link = document.createElement('a');
      link.href = magazine.downloadUrl;
      link.download = `${magazine.title}.pdf`;
      link.click();
    } else {
      alert('Você precisa de uma assinatura para fazer download.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando revista...</p>
      </div>
    );
  }

  if (!magazine) {
    return (
      <div className={styles.notFound}>
        <h1>Revista não encontrada</h1>
        <p>A revista que você está procurando não existe ou foi removida.</p>
        <Link href="/revistas" className={styles.backBtn}>
          Voltar às revistas
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.magazinePage}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <Link href="/revistas" className={styles.breadcrumbLink}>Revistas</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbCurrent}>{magazine.title}</span>
      </nav>

      <div className={styles.magazineLayout}>
        {/* Capa da Revista */}
        <div className={styles.coverSection}>
          <div className={styles.coverContainer}>
            <img 
              src={magazine.coverImage} 
              alt={magazine.title}
              className={styles.coverImage}
            />
            {magazine.premium && !hasAccess && (
              <div className={styles.premiumOverlay}>
                <span className={styles.premiumBadge}>PREMIUM</span>
              </div>
            )}
          </div>

          <div className={styles.coverActions}>
            {hasAccess ? (
              <>
                <button onClick={handleRead} className={styles.readBtn}>
                  📖 Ler Revista
                </button>
                <button onClick={handleDownload} className={styles.downloadBtn}>
                  📥 Download PDF
                </button>
              </>
            ) : (
              <>
                {magazine.previewUrl && (
                  <button onClick={handlePreview} className={styles.previewBtn}>
                    👁️ Preview Grátis
                  </button>
                )}
                <button onClick={handleRead} className={styles.subscribeBtn}>
                  🔓 Assinar para Ler
                </button>
              </>
            )}
          </div>
        </div>

        {/* Informações da Revista */}
        <div className={styles.magazineInfo}>
          <div className={styles.magazineHeader}>
            <div className={styles.editionBadge}>{magazine.edition}</div>
            <div className={styles.categoryTag}>{magazine.category}</div>
          </div>

          <h1 className={styles.magazineTitle}>{magazine.title}</h1>
          <h2 className={styles.magazineSubtitle}>{magazine.subtitle}</h2>

          <div className={styles.magazineMeta}>
            <span>📅 {formatDate(magazine.publishDate)}</span>
            <span>📄 {magazine.pages}</span>
            <span>✍️ {magazine.author}</span>
          </div>

          <p className={styles.magazineDescription}>{magazine.fullDescription}</p>

          {/* Sumário */}
          <div className={styles.contentsSection}>
            <h3>Sumário</h3>
            <ul className={styles.contentsList}>
              {magazine.contents.map((item, index) => (
                <li key={index} className={styles.contentItem}>
                  <span className={styles.contentNumber}>{index + 1}</span>
                  <span className={styles.contentTitle}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Destaques */}
          <div className={styles.highlightsSection}>
            <h3>Destaques desta Edição</h3>
            <ul className={styles.highlightsList}>
              {magazine.highlights.map((highlight, index) => (
                <li key={index} className={styles.highlightItem}>
                  ✨ {highlight}
                </li>
              ))}
            </ul>
          </div>

          {/* Acesso Premium */}
          {magazine.premium && !hasAccess && (
            <div className={styles.premiumSection}>
              <h3>🔒 Conteúdo Premium</h3>
              <p>
                Esta revista faz parte do nosso conteúdo premium. 
                Assine agora para ter acesso completo a todas as edições.
              </p>
              <div className={styles.premiumFeatures}>
                <span>✓ Acesso a todas as revistas premium</span>
                <span>✓ Download em PDF</span>
                <span>✓ Conteúdo exclusivo mensal</span>
                <span>✓ Sem anúncios</span>
              </div>
              <Link href="/assinatura" className={styles.premiumBtn}>
                Assinar Agora
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Revistas Relacionadas */}
      {relatedMagazines.length > 0 && (
        <div className={styles.relatedSection}>
          <h3>Outras Edições da Categoria {magazine.category}</h3>
          <div className={styles.relatedGrid}>
            {relatedMagazines.map(mag => (
              <Link key={mag.id} href={`/revistas/${mag.id}`} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <img src={mag.coverImage} alt={mag.title} />
                  {mag.premium && <div className={styles.relatedPremium}>PREMIUM</div>}
                </div>
                <div className={styles.relatedInfo}>
                  <h4>{mag.title}</h4>
                  <p>{mag.description}</p>
                  <div className={styles.relatedMeta}>
                    <span>{mag.pages}</span>
                    <span>{formatDate(mag.publishDate)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RevistaDetalhes;

