import React from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Comunidade.module.css';
import Link from 'next/link';

export default function Comunidade() {
  return (
    <Layout title="Comunidade | Apocalypse Academy">
      <div className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} stone-text`}>COMUNIDADE</h1>
          <p className={styles.description}>
            Conecte-se com outros membros da Academia e participe de discussões sobre os tempos finais.
          </p>
        </div>
      </div>
      
      <section className={styles.telegramSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>GRUPOS DO TELEGRAM</h2>
          
          <div className={styles.groupsGrid}>
            <div className={styles.groupCard}>
              <div className={styles.groupIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="#0088cc">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248c-.14.636-.42 2.855-.588 3.786-.168.93-.336 1.174-.56 1.174-.224 0-.42-.244-.784-.57-.56-.494-1.092-.8-1.372-.93-.7-.336-1.624-.336-2.324 0-.28.13-.812.436-1.372.93-.364.326-.56.57-.784.57-.224 0-.392-.244-.56-1.174-.168-.93-.448-3.15-.588-3.786-.14-.636.084-.87.588-1.12.504-.252 2.856-1.204 3.416-1.344.56-.14.98-.14 1.54 0 .56.14 2.912 1.092 3.416 1.344.504.25.728.484.588 1.12z"/>
                </svg>
              </div>
              <div className={styles.groupContent}>
                <h3 className={styles.groupTitle}>Apocalypse Academy - Geral</h3>
                <p className={styles.groupDescription}>
                  Grupo principal para discussões gerais sobre escatologia, profecias e eventos atuais.
                </p>
                <div className={styles.groupInfo}>
                  <span>3.500+ membros</span>
                  <span>Ativo</span>
                </div>
                <a href="https://t.me/apocalypseacademy" target="_blank" rel="noopener noreferrer" className={styles.groupButton}>
                  Entrar no Grupo
                </a>
              </div>
            </div>
            
            <div className={styles.groupCard}>
              <div className={styles.groupIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="#0088cc">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248c-.14.636-.42 2.855-.588 3.786-.168.93-.336 1.174-.56 1.174-.224 0-.42-.244-.784-.57-.56-.494-1.092-.8-1.372-.93-.7-.336-1.624-.336-2.324 0-.28.13-.812.436-1.372.93-.364.326-.56.57-.784.57-.224 0-.392-.244-.56-1.174-.168-.93-.448-3.15-.588-3.786-.14-.636.084-.87.588-1.12.504-.252 2.856-1.204 3.416-1.344.56-.14.98-.14 1.54 0 .56.14 2.912 1.092 3.416 1.344.504.25.728.484.588 1.12z"/>
                </svg>
              </div>
              <div className={styles.groupContent}>
                <h3 className={styles.groupTitle}>Estudos Proféticos</h3>
                <p className={styles.groupDescription}>
                  Grupo dedicado ao estudo aprofundado das profecias bíblicas e sua interpretação.
                </p>
                <div className={styles.groupInfo}>
                  <span>1.800+ membros</span>
                  <span>Ativo</span>
                </div>
                <a href="https://t.me/estudosprofeticos" target="_blank" rel="noopener noreferrer" className={styles.groupButton}>
                  Entrar no Grupo
                </a>
              </div>
            </div>
            
            <div className={styles.groupCard}>
              <div className={styles.groupIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="#0088cc">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248c-.14.636-.42 2.855-.588 3.786-.168.93-.336 1.174-.56 1.174-.224 0-.42-.244-.784-.57-.56-.494-1.092-.8-1.372-.93-.7-.336-1.624-.336-2.324 0-.28.13-.812.436-1.372.93-.364.326-.56.57-.784.57-.224 0-.392-.244-.56-1.174-.168-.93-.448-3.15-.588-3.786-.14-.636.084-.87.588-1.12.504-.252 2.856-1.204 3.416-1.344.56-.14.98-.14 1.54 0 .56.14 2.912 1.092 3.416 1.344.504.25.728.484.588 1.12z"/>
                </svg>
              </div>
              <div className={styles.groupContent}>
                <h3 className={styles.groupTitle}>Geopolítica e Profecias</h3>
                <p className={styles.groupDescription}>
                  Análises sobre eventos geopolíticos atuais à luz das profecias bíblicas.
                </p>
                <div className={styles.groupInfo}>
                  <span>2.200+ membros</span>
                  <span>Ativo</span>
                </div>
                <a href="https://t.me/geopoliticaprofecias" target="_blank" rel="noopener noreferrer" className={styles.groupButton}>
                  Entrar no Grupo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.whatsappSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>GRUPOS DO WHATSAPP</h2>
          
          <div className={styles.groupsGrid}>
            <div className={styles.groupCard}>
              <div className={styles.groupIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="#25D366">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                </svg>
              </div>
              <div className={styles.groupContent}>
                <h3 className={styles.groupTitle}>Apocalypse Academy - Oficial</h3>
                <p className={styles.groupDescription}>
                  Grupo oficial para membros da Academia, com atualizações sobre novos conteúdos.
                </p>
                <div className={styles.groupInfo}>
                  <span>250+ membros</span>
                  <span>Ativo</span>
                </div>
                <a href="https://chat.whatsapp.com/apocalypseacademy" target="_blank" rel="noopener noreferrer" className={styles.groupButton}>
                  Entrar no Grupo
                </a>
              </div>
            </div>
            
            <div className={styles.groupCard}>
              <div className={styles.groupIcon}>
                <svg viewBox="0 0 24 24" width="40" height="40" fill="#25D366">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.433-.101.824z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                </svg>
              </div>
              <div className={styles.groupContent}>
                <h3 className={styles.groupTitle}>Preparação e Sobrevivência</h3>
                <p className={styles.groupDescription}>
                  Dicas práticas de preparação para tempos difíceis e estratégias de sobrevivência.
                </p>
                <div className={styles.groupInfo}>
                  <span>180+ membros</span>
                  <span>Ativo</span>
                </div>
                <a href="https://chat.whatsapp.com/preparacaosobrevivencia" target="_blank" rel="noopener noreferrer" className={styles.groupButton}>
                  Entrar no Grupo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className={styles.forumSection}>
        <div className={styles.container}>
          <h2 className={`${styles.sectionTitle} cinematic-text`}>FÓRUM DE DISCUSSÃO</h2>
          
          <div className={styles.forumPreview}>
            <div className={styles.forumHeader}>
              <h3 className={styles.forumTitle}>Tópicos Recentes</h3>
              <Link href="/comunidade/forum" className={styles.forumLink}>
                Ver Todos
              </Link>
            </div>
            
            <div className={styles.topicsList}>
              <div className={styles.topicItem}>
                <div className={styles.topicInfo}>
                  <h4 className={styles.topicTitle}>A Grande Tribulação: Quando Começará?</h4>
                  <p className={styles.topicMeta}>
                    <span>Iniciado por João Silva</span>
                    <span>32 respostas</span>
                    <span>Atualizado há 2 horas</span>
                  </p>
                </div>
                <Link href="/comunidade/forum/tribulacao" className={styles.topicButton}>
                  Ver Tópico
                </Link>
              </div>
              
              <div className={styles.topicItem}>
                <div className={styles.topicInfo}>
                  <h4 className={styles.topicTitle}>Análise: Eventos Recentes no Oriente Médio</h4>
                  <p className={styles.topicMeta}>
                    <span>Iniciado por Maria Oliveira</span>
                    <span>47 respostas</span>
                    <span>Atualizado há 5 horas</span>
                  </p>
                </div>
                <Link href="/comunidade/forum/oriente-medio" className={styles.topicButton}>
                  Ver Tópico
                </Link>
              </div>
              
              <div className={styles.topicItem}>
                <div className={styles.topicInfo}>
                  <h4 className={styles.topicTitle}>Tecnologia e a Marca da Besta</h4>
                  <p className={styles.topicMeta}>
                    <span>Iniciado por Carlos Santos</span>
                    <span>28 respostas</span>
                    <span>Atualizado há 1 dia</span>
                  </p>
                </div>
                <Link href="/comunidade/forum/tecnologia-marca" className={styles.topicButton}>
                  Ver Tópico
                </Link>
              </div>
            </div>
            
            <div className={styles.forumCta}>
              <p>Participe das discussões e compartilhe seus conhecimentos.</p>
              <Link href="/comunidade/forum/novo" className={styles.newTopicButton}>
                Criar Novo Tópico
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
