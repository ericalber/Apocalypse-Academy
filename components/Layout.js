import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';

const Layout = ({ children }) => {
  const { isLoading } = useLanguage();

  if (isLoading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
