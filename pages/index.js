import React from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import NewsSection from '../components/NewsSection';
import HomeLiteGuard from '../src/components/HomeLiteGuard';
import DocumentariesPreview from '../src/components/DocumentariesPreview';
import CoursesMosaicPreview from '../src/components/CoursesMosaicPreview';
import EbooksPreviewGrid from '../src/components/EbooksPreviewGrid';
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
        description="Catálogo cinematográfico com mentorias, exercícios e certificados exclusivos para membros."
        ctaHref="/assinar"
        ctaLabel="Assine para acessar"
        secondaryHref="/entrar"
        secondaryLabel="Já sou assinante"
        alignment="center"
      >
        <CoursesMosaicPreview />
      </HomeLiteGuard>

      <HomeLiteGuard
        title="Documentários exclusivos para assinantes"
        description="Os Arquitetos do Caos • Dossiê Proibido: O Nome da Besta • Vigilância Total — Sua Vida em Dados • Sinais do Fim: O Relógio Acelera"
        ctaHref="/assinar"
        ctaLabel="Assine para acessar"
        secondaryHref="/entrar"
        secondaryLabel="Já sou assinante"
        alignment="center"
      >
        <DocumentariesPreview />
      </HomeLiteGuard>
       
      {/* eBooks Exclusivos */}
      <HomeLiteGuard
        title="Biblioteca digital completa"
        description="Downloads ilimitados, atualizações mensais e materiais exclusivos para aprofundar sua jornada profética."
        ctaHref="/assinar"
        ctaLabel="Assine para acessar"
        secondaryHref="/ebooks"
        secondaryLabel="Conheça a biblioteca"
      >
        <EbooksPreviewGrid />
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
                <li><Link href="/documentarios">Documentários</Link></li>
                <li><Link href="/cursos">Cursos</Link></li>
                <li><Link href="/revistas">Revistas</Link></li>
                <li><Link href="/ebooks">eBooks</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerSection}>
              <h4>Suporte</h4>
              <ul>
                <li><Link href="/contato">Contato</Link></li>
                <li><Link href="/sobre">Sobre Nós</Link></li>
                <li><Link href="/apoie">Apoie este Projeto</Link></li>
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
