// COMPONENTE REACT - PREVIEW DE MÍDIA COM URLs TEMPORÁRIAS
// Exibe preview seguro de arquivos usando URLs assinadas do GCS

import React, { useState, useEffect } from 'react';
import styles from '../styles/MediaPreview.module.css';

const MediaPreview = ({ fileName, fileType, onClose, userRole = 'viewer' }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    generatePreviewUrl();
  }, [fileName]);

  useEffect(() => {
    if (expiresAt) {
      const interval = setInterval(updateTimeRemaining, 1000);
      return () => clearInterval(interval);
    }
  }, [expiresAt]);

  const generatePreviewUrl = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken') || 'mock-token';
      
      const response = await fetch(`/api/media/preview?fileName=${encodeURIComponent(fileName)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setPreviewUrl(data.url);
        setExpiresAt(new Date(data.expiresAt));
      } else {
        setError(data.error || 'Erro ao gerar preview');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error('Erro ao gerar preview:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateTimeRemaining = () => {
    if (!expiresAt) return;

    const now = new Date();
    const remaining = expiresAt - now;

    if (remaining <= 0) {
      setTimeRemaining('Expirado');
      setPreviewUrl(null);
      setError('URL de preview expirou');
    } else {
      const minutes = Math.floor(remaining / 60000);
      const seconds = Math.floor((remaining % 60000) / 1000);
      setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
    }
  };

  const refreshPreview = () => {
    generatePreviewUrl();
  };

  const renderPreviewContent = () => {
    if (loading) {
      return (
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Gerando preview seguro...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.error}>
          <div className={styles.errorIcon}>⚠️</div>
          <p>{error}</p>
          <button onClick={refreshPreview} className={styles.retryBtn}>
            Tentar novamente
          </button>
        </div>
      );
    }

    if (!previewUrl) {
      return (
        <div className={styles.noPreview}>
          <p>Preview não disponível</p>
        </div>
      );
    }

    // Renderizar baseado no tipo de arquivo
    switch (fileType) {
      case 'video':
        return (
          <video 
            src={previewUrl} 
            controls 
            className={styles.videoPreview}
            onError={() => setError('Erro ao carregar vídeo')}
          >
            Seu navegador não suporta vídeo HTML5.
          </video>
        );

      case 'image':
        return (
          <img 
            src={previewUrl} 
            alt={fileName}
            className={styles.imagePreview}
            onError={() => setError('Erro ao carregar imagem')}
          />
        );

      case 'document':
        if (fileName.toLowerCase().endsWith('.pdf')) {
          return (
            <iframe 
              src={previewUrl}
              className={styles.documentPreview}
              title={fileName}
              onError={() => setError('Erro ao carregar documento')}
            />
          );
        } else {
          return (
            <div className={styles.documentLink}>
              <div className={styles.documentIcon}>📄</div>
              <p>{fileName}</p>
              <a 
                href={previewUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.openBtn}
              >
                Abrir documento
              </a>
            </div>
          );
        }

      default:
        return (
          <div className={styles.genericPreview}>
            <div className={styles.fileIcon}>📁</div>
            <p>{fileName}</p>
            <a 
              href={previewUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.downloadBtn}
            >
              Visualizar arquivo
            </a>
          </div>
        );
    }
  };

  return (
    <div className={styles.previewOverlay} onClick={onClose}>
      <div className={styles.previewModal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.previewHeader}>
          <div className={styles.fileInfo}>
            <h3>{fileName}</h3>
            <div className={styles.securityInfo}>
              <span className={styles.securityBadge}>🔒 Preview Temporário</span>
              {timeRemaining && (
                <span className={styles.timeRemaining}>
                  Expira em: {timeRemaining}
                </span>
              )}
            </div>
          </div>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        <div className={styles.previewContent}>
          {renderPreviewContent()}
        </div>

        <div className={styles.previewFooter}>
          <div className={styles.securityNotice}>
            <span>🛡️ URL temporária - Apenas para visualização</span>
          </div>
          <div className={styles.actions}>
            <button onClick={refreshPreview} className={styles.refreshBtn}>
              🔄 Renovar Preview
            </button>
            <button onClick={onClose} className={styles.cancelBtn}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediaPreview;

