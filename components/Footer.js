import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';
import styles from '../styles/components/Footer.module.css';

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3>Apocalypse Academy</h3>
            <p>{t('footer.tagline')}</p>
            <div className={styles.languageSwitcher}>
              <button 
                className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('en')}
              >
                EN
              </button>
              <button 
                className={`${styles.langButton} ${language === 'pt' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('pt')}
              >
                PT
              </button>
              <button 
                className={`${styles.langButton} ${language === 'es' ? styles.active : ''}`}
                onClick={() => handleLanguageChange('es')}
              >
                ES
              </button>
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h3>{t('footer.quickLinks')}</h3>
            <ul>
              <li><Link href="/">{t('navigation.home')}</Link></li>
              <li><Link href="/documentarios">{t('navigation.documentaries')}</Link></li>
              <li><Link href="/cursos">{t('navigation.courses')}</Link></li>
              <li><Link href="/revistas">{t('navigation.magazines')}</Link></li>
              <li><Link href="/ebooks">{t('navigation.ebooks')}</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>{t('footer.resources')}</h3>
            <ul>
              <li><Link href="/devocionais">{t('navigation.devotionals')}</Link></li>
              <li><Link href="/comunidade">{t('navigation.community')}</Link></li>
              <li><Link href="/blog">{t('navigation.blog')}</Link></li>
              <li><Link href="/sobre">{t('navigation.about')}</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3>{t('footer.legal')}</h3>
            <ul>
              <li><Link href="/termos">{t('footer.termsOfUse')}</Link></li>
              <li><Link href="/privacidade">{t('footer.privacyPolicy')}</Link></li>
              <li><Link href="/contato">{t('footer.contact')}</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <p>&copy; {new Date().getFullYear()} Apocalypse Academy. {t('footer.allRightsReserved')}</p>
          <p className={styles.poweredBy}>{t('footer.poweredBy')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
