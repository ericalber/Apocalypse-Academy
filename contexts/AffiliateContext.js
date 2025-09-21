import React, { useState, useEffect, createContext, useContext } from 'react';
import { useRouter } from 'next/router';

// Criando o contexto de afiliados
const AffiliateContext = createContext(null);

// Duração do cookie de afiliado em dias
const AFFILIATE_COOKIE_DURATION = 30;

// Provider que envolverá a aplicação
export const AffiliateProvider = ({ children }) => {
  const [currentAffiliate, setCurrentAffiliate] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função para definir um cookie
  const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };

  // Função para obter um cookie
  const getCookie = (name) => {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  };

  // Verificar se há um código de afiliado na URL e armazená-lo em cookie
  useEffect(() => {
    const checkAffiliateCode = () => {
      try {
        // Verificar se há um código de afiliado na URL
        const { ref } = router.query;
        
        if (ref) {
          // Armazenar o código de afiliado em um cookie
          setCookie('affiliate_code', ref, AFFILIATE_COOKIE_DURATION);
          setCurrentAffiliate(ref);
          
          // Opcional: Remover o parâmetro da URL para uma experiência mais limpa
          // Isso requer manipulação adicional para não perder outros parâmetros
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        } else {
          // Verificar se já existe um cookie de afiliado
          const affiliateCode = getCookie('affiliate_code');
          if (affiliateCode) {
            setCurrentAffiliate(affiliateCode);
          }
        }
      } catch (error) {
        console.error('Erro ao processar código de afiliado:', error);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      checkAffiliateCode();
    }
  }, [router.isReady, router.query]);

  // Função para gerar um link de afiliado
  const generateAffiliateLink = (baseUrl, affiliateCode) => {
    // Garantir que a baseUrl não tenha parâmetros de consulta
    const url = new URL(baseUrl, window.location.origin);
    
    // Adicionar o código de afiliado como parâmetro de consulta
    url.searchParams.set('ref', affiliateCode);
    
    return url.toString();
  };

  // Função para rastrear visualização de conteúdo
  const trackContentView = async (contentId, affiliateCode) => {
    try {
      // Em uma implementação real, isso seria uma chamada para o backend
      console.log(`Rastreando visualização do conteúdo ${contentId} para o afiliado ${affiliateCode}`);
      
      // Simulando uma chamada de API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: true });
        }, 300);
      });
    } catch (error) {
      console.error('Erro ao rastrear visualização de conteúdo:', error);
      return { success: false, error };
    }
  };

  // Função para obter estatísticas de afiliado
  const getAffiliateStats = async (affiliateCode) => {
    try {
      // Em uma implementação real, isso seria uma chamada para o backend
      console.log(`Obtendo estatísticas para o afiliado ${affiliateCode}`);
      
      // Simulando uma chamada de API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            success: true,
            stats: {
              visits: Math.floor(Math.random() * 1000),
              registrations: Math.floor(Math.random() * 100),
              conversions: Math.floor(Math.random() * 50),
              earnings: parseFloat((Math.random() * 1000).toFixed(2)),
              contentViews: Math.floor(Math.random() * 500)
            }
          });
        }, 500);
      });
    } catch (error) {
      console.error('Erro ao obter estatísticas de afiliado:', error);
      return { success: false, error };
    }
  };

  // Valores que serão disponibilizados pelo contexto
  const value = {
    currentAffiliate,
    loading,
    generateAffiliateLink,
    trackContentView,
    getAffiliateStats
  };

  return <AffiliateContext.Provider value={value}>{children}</AffiliateContext.Provider>;
};

// Hook personalizado para usar o contexto de afiliados
export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (!context) {
    throw new Error('useAffiliate deve ser usado dentro de um AffiliateProvider');
  }
  return context;
};
