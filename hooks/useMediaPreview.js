// HOOK REACT - GERENCIAMENTO DE PREVIEW DE MÍDIA
// Custom hook para facilitar o uso de URLs temporárias

import { useState, useCallback } from 'react';

const useMediaPreview = (userRole = 'viewer') => {
  const [previewData, setPreviewData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Gerar URL de preview para um arquivo
  const generatePreview = useCallback(async (fileName, expirationMinutes = 15) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken') || 'mock-token';
      
      const response = await fetch(
        `/api/media/preview?fileName=${encodeURIComponent(fileName)}&expiration=${expirationMinutes}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        setPreviewData({
          fileName: fileName,
          url: data.url,
          expiresAt: new Date(data.expiresAt),
          userRole: data.userRole,
          securityLevel: data.securityLevel
        });
        return data;
      } else {
        setError(data.error || 'Erro ao gerar preview');
        return null;
      }
    } catch (err) {
      const errorMessage = 'Erro de conexão ao gerar preview';
      setError(errorMessage);
      console.error('Erro no hook useMediaPreview:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Gerar múltiplas URLs de preview
  const generateBatchPreview = useCallback(async (fileNames, expirationMinutes = 15) => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken') || 'mock-token';
      
      const response = await fetch('/api/media/preview', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fileNames: fileNames,
          expiration: expirationMinutes
        })
      });

      const data = await response.json();

      if (data.success) {
        return data.results;
      } else {
        setError(data.error || 'Erro ao gerar previews em lote');
        return null;
      }
    } catch (err) {
      const errorMessage = 'Erro de conexão ao gerar previews';
      setError(errorMessage);
      console.error('Erro no batch preview:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Verificar se URL ainda é válida
  const isPreviewValid = useCallback(() => {
    if (!previewData || !previewData.expiresAt) return false;
    return new Date() < previewData.expiresAt;
  }, [previewData]);

  // Obter tempo restante em minutos
  const getTimeRemaining = useCallback(() => {
    if (!previewData || !previewData.expiresAt) return 0;
    
    const now = new Date();
    const remaining = previewData.expiresAt - now;
    
    return Math.max(0, Math.floor(remaining / 60000)); // em minutos
  }, [previewData]);

  // Renovar preview automaticamente
  const renewPreview = useCallback(async () => {
    if (!previewData || !previewData.fileName) return null;
    
    return await generatePreview(previewData.fileName);
  }, [previewData, generatePreview]);

  // Limpar dados de preview
  const clearPreview = useCallback(() => {
    setPreviewData(null);
    setError(null);
  }, []);

  // Determinar tipo de arquivo baseado na extensão
  const getFileType = useCallback((fileName) => {
    const extension = fileName.toLowerCase().split('.').pop();
    
    const videoExtensions = ['mp4', 'webm', 'mov', 'avi', 'm3u8', 'mpd'];
    const imageExtensions = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
    const documentExtensions = ['pdf', 'txt', 'vtt'];
    
    if (videoExtensions.includes(extension)) return 'video';
    if (imageExtensions.includes(extension)) return 'image';
    if (documentExtensions.includes(extension)) return 'document';
    
    return 'other';
  }, []);

  // Verificar permissões baseadas no role
  const hasPermission = useCallback((action) => {
    const permissions = {
      'admin': ['preview', 'batch_preview', 'long_expiration'],
      'editor': ['preview', 'batch_preview'],
      'viewer': ['preview']
    };
    
    return permissions[userRole]?.includes(action) || false;
  }, [userRole]);

  // Obter tempo máximo de expiração baseado no role
  const getMaxExpiration = useCallback(() => {
    const maxExpirations = {
      'admin': 120,   // 2 horas
      'editor': 60,   // 1 hora
      'viewer': 30    // 30 minutos
    };
    
    return maxExpirations[userRole] || 15;
  }, [userRole]);

  return {
    // Estado
    previewData,
    loading,
    error,
    
    // Ações principais
    generatePreview,
    generateBatchPreview,
    renewPreview,
    clearPreview,
    
    // Utilitários
    isPreviewValid,
    getTimeRemaining,
    getFileType,
    hasPermission,
    getMaxExpiration,
    
    // Informações do usuário
    userRole
  };
};

export default useMediaPreview;

