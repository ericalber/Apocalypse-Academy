import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import Header from '../../components/Header';
import styles from '../../styles/Afiliados.module.css';

const AfiliadosPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    clicks: 0,
    conversions: 0,
    commission: 0,
    tier: 'Bronze',
    nextTier: 'Silver',
    progress: 0
  });

  useEffect(() => {
    // Simular dados de afiliado para demonstração
    if (isAuthenticated) {
      setStats({
        clicks: 1247,
        conversions: 89,
        commission: 2847.50,
        tier: 'Gold',
        nextTier: 'Platinum',
        progress: 75
      });
    }
  }, [isAuthenticated]);

  const generateAffiliateLink = (product) => {
    if (!isAuthenticated) return '#';
    if (typeof window === 'undefined') return '#'; // SSR fix
    const baseUrl = window.location.origin;
    const affiliateId = user?.id || 'demo';
    return `${baseUrl}/${product}?ref=${affiliateId}&utm_source=affiliate&utm_medium=referral&utm_campaign=${product}`;
  };

  return (
    <>
      <Head>
        <title>Programa de Afiliados - Apocalypse Academy</title>
        <meta name="description" content="Ganhe comissões promovendo os cursos da Apocalypse Academy. Sistema de afiliados com até 50% de comissão." />
      </Head>

      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              💎 Programa de Afiliados
            </h1>
            <p className={styles.subtitle}>
              Ganhe até 50% de comissão promovendo conhecimento sobre os últimos tempos
            </p>
            
            {!isAuthenticated && (
              <div className={styles.cta}>
                <Link href="/entrar" className={styles.ctaButton}>
                  Começar Agora
                </Link>
                <p className={styles.ctaText}>
                  Faça login para acessar seu painel de afiliado
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Dashboard do Afiliado */}
        {isAuthenticated && (
          <section className={styles.dashboard}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>
                Bem-vindo, {user?.name || user?.email}!
              </h2>
              
              {/* Estatísticas */}
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>👆</div>
                  <div className={styles.statValue}>{stats.clicks.toLocaleString()}</div>
                  <div className={styles.statLabel}>Cliques</div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>💰</div>
                  <div className={styles.statValue}>{stats.conversions}</div>
                  <div className={styles.statLabel}>Conversões</div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>💎</div>
                  <div className={styles.statValue}>R$ {stats.commission.toFixed(2)}</div>
                  <div className={styles.statLabel}>Comissões</div>
                </div>
                
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>🏆</div>
                  <div className={styles.statValue}>{stats.tier}</div>
                  <div className={styles.statLabel}>Nível Atual</div>
                </div>
              </div>

              {/* Progresso para próximo nível */}
              <div className={styles.tierProgress}>
                <h3>Progresso para {stats.nextTier}</h3>
                <div className={styles.progressBar}>
                  <div 
                    className={styles.progressFill}
                    style={{ width: `${stats.progress}%` }}
                  ></div>
                </div>
                <p>{stats.progress}% completo</p>
              </div>
            </div>
          </section>
        )}

        {/* Sistema de Comissões */}
        <section className={styles.commissions}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Sistema de Comissões</h2>
            
            <div className={styles.tiersGrid}>
              <div className={styles.tierCard}>
                <div className={styles.tierBadge}>🥉 Bronze</div>
                <div className={styles.tierCommission}>30%</div>
                <div className={styles.tierRequirement}>0+ vendas</div>
              </div>
              
              <div className={styles.tierCard}>
                <div className={styles.tierBadge}>🥈 Silver</div>
                <div className={styles.tierCommission}>35%</div>
                <div className={styles.tierRequirement}>10+ vendas</div>
              </div>
              
              <div className={styles.tierCard}>
                <div className={styles.tierBadge}>🥇 Gold</div>
                <div className={styles.tierCommission}>40%</div>
                <div className={styles.tierRequirement}>50+ vendas</div>
              </div>
              
              <div className={styles.tierCard}>
                <div className={styles.tierBadge}>💎 Platinum</div>
                <div className={styles.tierCommission}>45%</div>
                <div className={styles.tierRequirement}>100+ vendas</div>
              </div>
              
              <div className={styles.tierCard}>
                <div className={styles.tierBadge}>💎 Diamond</div>
                <div className={styles.tierCommission}>50%</div>
                <div className={styles.tierRequirement}>250+ vendas</div>
              </div>
            </div>
          </div>
        </section>

        {/* Links de Afiliado */}
        {isAuthenticated && (
          <section className={styles.links}>
            <div className={styles.container}>
              <h2 className={styles.sectionTitle}>Seus Links de Afiliado</h2>
              
              <div className={styles.linksGrid}>
                <div className={styles.linkCard}>
                  <h3>Escatologia Bíblica Avançada</h3>
                  <p>R$ 197 - Comissão: R$ 78,80</p>
                  <input 
                    type="text" 
                    value={generateAffiliateLink('cursos/escatologia-biblica')}
                    readOnly
                    className={styles.linkInput}
                  />
                  <button className={styles.copyButton}>Copiar Link</button>
                </div>
                
                <div className={styles.linkCard}>
                  <h3>Preparação para os Tempos Finais</h3>
                  <p>R$ 147 - Comissão: R$ 58,80</p>
                  <input 
                    type="text" 
                    value={generateAffiliateLink('cursos/preparacao-tempos-finais')}
                    readOnly
                    className={styles.linkInput}
                  />
                  <button className={styles.copyButton}>Copiar Link</button>
                </div>
                
                <div className={styles.linkCard}>
                  <h3>Decifrando os Sinais dos Tempos</h3>
                  <p>R$ 97 - Comissão: R$ 38,80</p>
                  <input 
                    type="text" 
                    value={generateAffiliateLink('cursos/sinais-dos-tempos')}
                    readOnly
                    className={styles.linkInput}
                  />
                  <button className={styles.copyButton}>Copiar Link</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Como Funciona */}
        <section className={styles.howItWorks}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Como Funciona</h2>
            
            <div className={styles.stepsGrid}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <h3>Cadastre-se</h3>
                <p>Faça login na sua conta da Apocalypse Academy</p>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <h3>Compartilhe</h3>
                <p>Use seus links personalizados para promover os cursos</p>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <h3>Ganhe</h3>
                <p>Receba comissões de 30% a 50% por cada venda</p>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>4</div>
                <h3>Saque</h3>
                <p>Receba seus pagamentos via PIX semanalmente</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AfiliadosPage;

