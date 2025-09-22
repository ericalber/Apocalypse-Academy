import React from 'react';
import styles from '../styles/PageHeader.module.css';

const PageHeader = ({ title, subtitle }) => {
  return (
    <header className={styles.pageHeader}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
    </header>
  );
};

export default PageHeader;
