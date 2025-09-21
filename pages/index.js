import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import NewsSection from '../components/NewsSection';
import CoursesSection from '../components/CoursesSection';
import EbooksSection from '../components/EbooksSection';
import HomeLiteGuard from '../src/components/HomeLiteGuard';
import DocumentariesPreview from '../src/components/DocumentariesPreview';
import styles from '../styles/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Header />
      
      {/* Hero Section - Film & Movie Streaming Style */}
      <HeroSection />
       
      {/* Matérias/Notícias em Destaque */}
      <NewsSection />
       
      {/* Cursos em Destaque */}
      <HomeLiteGuard
        title="Assine para liberar os cursos completos"
        description="Acesso imediato a mentorias, dossiês e aulas cinematográficas da Apocalypse Academy."
      >
        <CoursesSection />
      </HomeLiteGuard>

      <HomeLiteGuard
        title="Documentários exclusivos para assinantes"
        description="Produções no estilo Brasil Paralelo com imagens, trilhas e análises que não estão nas plataformas abertas."
      >
        <DocumentariesPreview />
      </HomeLiteGuard>
       
      {/* eBooks Exclusivos */}
      <HomeLiteGuard
        title="Biblioteca digital completa"
        description="Baixe e-books, revistas e guias de preparação espiritual com descontos especiais para membros."
      >
        <EbooksSection />
      </HomeLiteGuard>
       
      {/* Rodapé padrão aprovado */}
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerContent}>
            <div className={styles.footerSection}>
              <h3>Apocalypse Academy</h3>
              <p>Preparando uma geração para os últimos tempos através do conhecimento profético e da verdade bíblica.</p>
            </div>
            
            <div className={styles.footerSection}>
              <h4>Links Rápidos</h4>
              <ul>
                <li><a href="/documentarios">Documentários</a></li>
                <li><a href="/cursos">Cursos</a></li>
                <li><a href="/revistas">Revistas</a></li>
                <li><a href="/ebooks">eBooks</a></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4>Suporte</h4>
              <ul>
                <li><a href="/contato">Contato</a></li>
                <li><a href="/sobre">Sobre Nós</a></li>
                <li><a href="/apoie">Apoie este Projeto</a></li>
              </ul>
            </div>
          </div>
          
          <div className={styles.footerBottom}>
            <p>&copy; 2024 Apocalypse Academy. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
