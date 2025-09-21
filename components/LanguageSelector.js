import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../styles/LanguageSelector.module.css';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
    
    // Preservar sessão do usuário e parâmetros de afiliação
    const currentUrl = new URL(window.location.href);
    const affiliateParams = ['ref', 'affiliate', 'utm_source', 'utm_medium', 'utm_campaign'];
    const preservedParams = {};
    
    affiliateParams.forEach(param => {
      if (currentUrl.searchParams.has(param)) {
        preservedParams[param] = currentUrl.searchParams.get(param);
      }
    });

    // Manter parâmetros na URL após mudança de idioma
    if (Object.keys(preservedParams).length > 0) {
      const newUrl = new URL(window.location.href);
      Object.entries(preservedParams).forEach(([key, value]) => {
        newUrl.searchParams.set(key, value);
      });
      window.history.replaceState({}, '', newUrl.toString());
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleLanguageKeyDown = (event, languageCode) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleLanguageChange(languageCode);
    }
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.languageSelector} ref={dropdownRef}>
      <button
        className={styles.languageButton}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('navigation.language')}
        type="button"
      >
        <span className={styles.languageFlag} aria-hidden="true">
          {currentLanguage.flag}
        </span>
        <span className={styles.languageName}>
          {currentLanguage.name}
        </span>
        <svg 
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          fill="none"
          aria-hidden="true"
        >
          <path 
            d="M3 4.5L6 7.5L9 4.5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div 
          className={styles.languageDropdown}
          role="listbox"
          aria-label={t('navigation.language')}
        >
          {languages.map((language) => (
            <button
              key={language.code}
              className={`${styles.languageOption} ${
                language.code === i18n.language ? styles.languageOptionActive : ''
              }`}
              onClick={() => handleLanguageChange(language.code)}
              onKeyDown={(e) => handleLanguageKeyDown(e, language.code)}
              role="option"
              aria-selected={language.code === i18n.language}
              type="button"
            >
              <span className={styles.languageFlag} aria-hidden="true">
                {language.flag}
              </span>
              <span className={styles.languageName}>
                {language.name}
              </span>
              {language.code === i18n.language && (
                <svg 
                  className={styles.checkIcon}
                  width="16" 
                  height="16" 
                  viewBox="0 0 16 16" 
                  fill="none"
                  aria-hidden="true"
                >
                  <path 
                    d="M13.5 4.5L6 12L2.5 8.5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;

