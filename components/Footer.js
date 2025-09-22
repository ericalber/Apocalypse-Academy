import React from 'react';
import Link from 'next/link';
import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Apocalypse Academy</h3>
            <p>
              Plataforma editorial e cinematográfica dedicada a conteúdos proféticos, produzida pela CROSS Global Entertainment.
              Estratégia, pesquisa e narrativa convergindo para preparar uma audiência global.
            </p>
          </div>

          <div className={styles.footerSection}>
            <h3>Links Rápidos</h3>
            <ul>
              <li><Link href="/">Início</Link></li>
              <li><Link href="/documentarios">Documentários</Link></li>
              <li><Link href="/cursos">Cursos</Link></li>
              <li><Link href="/revistas">Revistas</Link></li>
              <li><Link href="/ebooks">eBooks</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Recursos</h3>
            <ul>
              <li><Link href="/devocionais">Devocionais</Link></li>
              <li><Link href="/comunidade">Comunidade</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/sobre">Sobre Nós</Link></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3>Suporte</h3>
            <ul>
              <li><Link href="/termos">Termos de Uso</Link></li>
              <li><Link href="/privacidade">Política de Privacidade</Link></li>
              <li><Link href="/contato">Contato Comercial</Link></li>
            </ul>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} Apocalypse Academy. Todos os direitos reservados.</p>
          <p className={styles.poweredBy}>Desenvolvido por CROSS Global Entertainment.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
