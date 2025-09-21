import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/MessagingIntegration.module.css';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function MessagingIntegration() {
  const [activeTab, setActiveTab] = useState('telegram');
  const [telegramGroups, setTelegramGroups] = useState([]);
  const [whatsappGroups, setWhatsappGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Verificar autenticação
  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login?redirect=' + encodeURIComponent(router.asPath));
    }
  }, [isAuthenticated, router]);
  
  // Carregar dados dos grupos
  useEffect(() => {
    const fetchGroups = async () => {
      setIsLoading(true);
      try {
        // Simulação de carregamento de dados
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados simulados para grupos do Telegram
        const mockTelegramGroups = [
          {
            id: 'tg1',
            name: 'Apocalypse Academy - Geral',
            description: 'Grupo principal para discussões gerais sobre escatologia, profecias e eventos atuais.',
            members: 3500,
            status: 'active',
            link: 'https://t.me/apocalypseacademy',
            image: '/images/telegram-group1.jpg'
          },
          {
            id: 'tg2',
            name: 'Estudos Proféticos',
            description: 'Grupo dedicado ao estudo aprofundado das profecias bíblicas e sua interpretação.',
            members: 1800,
            status: 'active',
            link: 'https://t.me/estudosprofeticos',
            image: '/images/telegram-group2.jpg'
          },
          {
            id: 'tg3',
            name: 'Geopolítica e Profecias',
            description: 'Análises sobre eventos geopolíticos atuais à luz das profecias bíblicas.',
            members: 2200,
            status: 'active',
            link: 'https://t.me/geopoliticaprofecias',
            image: '/images/telegram-group3.jpg'
          },
          {
            id: 'tg4',
            name: 'Preparação para os Últimos Dias',
            description: 'Dicas práticas e discussões sobre como se preparar para os tempos finais.',
            members: 1500,
            status: 'active',
            link: 'https://t.me/preparacaoultimostempos',
            image: '/images/telegram-group4.jpg'
          }
        ];
        
        // Dados simulados para grupos do WhatsApp
        const mockWhatsappGroups = [
          {
            id: 'wa1',
            name: 'Apocalypse Academy - Oficial',
            description: 'Grupo oficial para membros da Academia, com atualizações sobre novos conteúdos.',
            members: 250,
            status: 'active',
            link: 'https://chat.whatsapp.com/apocalypseacademy',
            image: '/images/whatsapp-group1.jpg'
          },
          {
            id: 'wa2',
            name: 'Preparação e Sobrevivência',
            description: 'Dicas práticas de preparação para tempos difíceis e estratégias de sobrevivência.',
            members: 180,
            status: 'active',
            link: 'https://chat.whatsapp.com/preparacaosobrevivencia',
            image: '/images/whatsapp-group2.jpg'
          },
          {
            id: 'wa3',
            name: 'Estudos Bíblicos Avançados',
            description: 'Grupo para estudos bíblicos aprofundados relacionados à escatologia.',
            members: 120,
            status: 'active',
            link: 'https://chat.whatsapp.com/estudosbiblicos',
            image: '/images/whatsapp-group3.jpg'
          }
        ];
        
        setTelegramGroups(mockTelegramGroups);
        setWhatsappGroups(mockWhatsappGroups);
      } catch (err) {
        setError('Erro ao carregar os grupos. Por favor, tente novamente mais tarde.');
        console.error('Erro ao carregar grupos:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGroups();
  }, []);
  
  // Função para formatar número de membros
  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count;
  };
  
  return (
    <Layout title="Comunidade | Apocalypse Academy">
      <div className={styles.messagingContainer}>
        <div className={styles.messagingHeader}>
          <h1 className={styles.messagingTitle}>COMUNIDADE</h1>
          <p className={styles.messagingDescription}>
            Conecte-se com outros membros da Apocalypse Academy através de nossos grupos no Telegram e WhatsApp.
          </p>
        </div>
        
        {error && <div className={styles.errorMessage}>{error}</div>}
        
        <div className={styles.tabsContainer}>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'telegram' ? styles.active : ''}`}
              onClick={() => setActiveTab('telegram')}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#0088cc">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248c-.14.636-.42 2.855-.588 3.786-.168.93-.336 1.174-.56 1.174-.224 0-.42-.244-.784-.57-.56-.494-1.092-.8-1.372-.93-.7-.336-1.624-.336-2.324 0-.28.13-.812.436-1.372.93-.364.326-.56.57-.784.57-.224 0-.392-.244-.56-1.174-.168-.93-.448-3.15-.588-3.786-.14-.636.084-.87.588-1.12.504-.252 2.856-1.204 3.416-1.344.56-.14.98-.14 1.54 0 .56.14 2.912 1.092 3.416 1.344.504.25.728.484.588 1.12z"/>
              </svg>
              Telegram
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'whatsapp' ? styles.active : ''}`}
              onClick={() => setActiveTab('whatsapp')}
            >
              <svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
              </svg>
              WhatsApp
            </button>
          </div>
          
          <div className={styles.tabContent}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <div className={styles.loadingSpinner}></div>
                <p>Carregando grupos...</p>
              </div>
            ) : (
              <>
                {activeTab === 'telegram' && (
                  <div className={styles.groupsGrid}>
                    {telegramGroups.map(group => (
                      <div key={group.id} className={styles.groupCard}>
                        <div className={styles.groupIcon}>
                          <svg viewBox="0 0 24 24" width="40" height="40" fill="#0088cc">
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248c-.14.636-.42 2.855-.588 3.786-.168.93-.336 1.174-.56 1.174-.224 0-.42-.244-.784-.57-.56-.494-1.092-.8-1.372-.93-.7-.336-1.624-.336-2.324 0-.28.13-.812.436-1.372.93-.364.326-.56.57-.784.57-.224 0-.392-.244-.56-1.174-.168-.93-.448-3.15-.588-3.786-.14-.636.084-.87.588-1.12.504-.252 2.856-1.204 3.416-1.344.56-.14.98-.14 1.54 0 .56.14 2.912 1.092 3.416 1.344.504.25.728.484.588 1.12z"/>
                          </svg>
                        </div>
                        <div className={styles.groupContent}>
                          <h3 className={styles.groupTitle}>{group.name}</h3>
                          <p className={styles.groupDescription}>{group.description}</p>
                          <div className={styles.groupInfo}>
                            <span>{formatMemberCount(group.members)}+ membros</span>
                            <span className={styles.statusBadge}>Ativo</span>
                          </div>
                          <a 
                            href={group.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.groupButton}
                          >
                            Entrar no Grupo
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {activeTab === 'whatsapp' && (
                  <div className={styles.groupsGrid}>
                    {whatsappGroups.map(group => (
                      <div key={group.id} className={styles.groupCard}>
                        <div className={styles.groupIcon}>
                          <svg viewBox="0 0 24 24" width="40" height="40" fill="#25D366">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z"/>
                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                          </svg>
                        </div>
                        <div className={styles.groupContent}>
                          <h3 className={styles.groupTitle}>{group.name}</h3>
                          <p className={styles.groupDescription}>{group.description}</p>
                          <div className={styles.groupInfo}>
                            <span>{formatMemberCount(group.members)}+ membros</span>
                            <span className={styles.statusBadge}>Ativo</span>
                          </div>
                          <a 
                            href={group.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={`${styles.groupButton} ${styles.whatsappButton}`}
                          >
                            Entrar no Grupo
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className={styles.guidelinesSection}>
          <div className={styles.guidelinesCard}>
            <h2 className={styles.guidelinesTitle}>Diretrizes da Comunidade</h2>
            <div className={styles.guidelinesList}>
              <div className={styles.guidelineItem}>
                <div className={styles.guidelineIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className={styles.guidelineContent}>
                  <h3 className={styles.guidelineTitle}>Respeito Mútuo</h3>
                  <p className={styles.guidelineDescription}>
                    Trate todos os membros com respeito e cortesia, mesmo em caso de discordância.
                  </p>
                </div>
              </div>
              
              <div className={styles.guidelineItem}>
                <div className={styles.guidelineIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className={styles.guidelineContent}>
                  <h3 className={styles.guidelineTitle}>Foco no Tema</h3>
                  <p className={styles.guidelineDescription}>
                    Mantenha as discussões relacionadas aos temas do grupo: escatologia, profecias e eventos atuais.
                  </p>
                </div>
              </div>
              
              <div className={styles.guidelineItem}>
                <div className={styles.guidelineIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className={styles.guidelineContent}>
                  <h3 className={styles.guidelineTitle}>Sem Spam ou Promoção</h3>
                  <p className={styles.guidelineDescription}>
                    Não compartilhe conteúdo promocional não relacionado ou spam nos grupos.
                  </p>
                </div>
              </div>
              
              <div className={styles.guidelineItem}>
                <div className={styles.guidelineIcon}>
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <div className={styles.guidelineContent}>
                  <h3 className={styles.guidelineTitle}>Verificação de Fontes</h3>
                  <p className={styles.guidelineDescription}>
                    Ao compartilhar informações, procure verificar a fonte e a credibilidade do conteúdo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.ctaSection}>
          <h2 className={styles.ctaTitle}>Não encontrou o que procurava?</h2>
          <p className={styles.ctaDescription}>
            Se você tem interesse em um tema específico que não está coberto pelos nossos grupos atuais, entre em contato conosco.
          </p>
          <Link href="/contato" className={styles.ctaButton}>
            Entrar em Contato
          </Link>
        </div>
      </div>
    </Layout>
  );
}
