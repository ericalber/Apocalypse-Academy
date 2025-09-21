import React, { useState, useEffect, createContext, useContext } from 'react';

// Create a context for language
export const LanguageContext = createContext({
  language: 'pt',
  setLanguage: () => {},
  translations: {},
  t: (key) => key,
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('pt');
  const [translations, setTranslations] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Load translations on mount
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch('/locales/translations.json');
        const data = await response.json();
        setTranslations(data);
        
        // Check for stored language preference
        const storedLanguage = localStorage.getItem('preferredLanguage');
        if (storedLanguage && ['en', 'pt', 'es'].includes(storedLanguage)) {
          setLanguage(storedLanguage);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load translations:', error);
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  // Update language and store preference
  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  };

  // Translation function
  const t = (key) => {
    if (!translations || !translations[language]) return key;
    
    // Support for nested keys like "navigation.home"
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        return key; // Key not found
      }
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, translations, t, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
