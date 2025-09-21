// COMPONENTE GALERIA DE MÍDIA - COM PREVIEW TEMPORÁRIO
// Galeria que lista arquivos e permite preview seguro

import React, { useState, useEffect } from 'react';
import MediaPreview from './MediaPreview';
import useMediaPreview from '../hooks/useMediaPreview';
import styles from '../styles/MediaGallery.module.css';

const MediaGallery = ({ userRole = 'viewer', onFileSelect = null }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    page: 1
  });
  const [stats, setStats] = useState({});

  const { 
    generatePreview, 
    getFileType, 
    hasPermission,
    getMaxExpiration 
  } = useMediaPreview(userRole);

  useEffect(() => {
    loadFiles();
  }, [filters]);

  const loadFiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('authToken') || 'mock-token';
      const queryParams = new URLSearchParams({
        search: filters.search,
        type: filters.type,
        page: filters.page,
        limit: 20,
        includePreview: 'false' // Não incluir preview na listagem inicial
      });

      const response = await fetch(`/api/media/list?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.success) {
        setFiles(data.files);
        setStats(data.stats);
      } else {
        setError(data.error || 'Erro ao carregar arquivos');
      }
    } catch (err) {
      setError('Erro de conexão');
      console.error('Erro ao carregar arquivos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1
    }));
  };

  const handleTypeFilter = (type) => {
    setFilters(prev => ({
      ...prev,
      type: type,
      page: 1
    }));
  };

  const handleFilePreview = async (file) => {
    if (!hasPermission('preview')) {
      alert('Você não tem permissão para visualizar arquivos');
      return;
    }

    setSelectedFile({
      ...file,
      fileType: getFileType(file.name)
    });
  };

  const handleFileSelect = (file) => {
    if (onFileSelect) {
      onFileSelect(file);
    } else {
      handleFilePreview(file);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileName) => {
    const type = getFileType(fileName);
    const icons = {
      'video': '🎬',
      'image': '🖼️',
      'document': '📄',
      'other': '📁'
    };
    return icons[type] || '📁';
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando arquivos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorIcon}>⚠️</div>
        <p>{error}</p>
        <button onClick={loadFiles} className={styles.retryBtn}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className={styles.mediaGallery}>
      {/* Cabeçalho com filtros */}
      <div className={styles.galleryHeader}>
        <div className={styles.searchSection}>
          <input
            type="text"
            placeholder="Buscar arquivos..."
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterSection}>
          <button
            onClick={() => handleTypeFilter('all')}
            className={`${styles.filterBtn} ${filters.type === 'all' ? styles.active : ''}`}
          >
            Todos ({stats.total || 0})
          </button>
          <button
            onClick={() => handleTypeFilter('video')}
            className={`${styles.filterBtn} ${filters.type === 'video' ? styles.active : ''}`}
          >
            🎬 Vídeos ({stats.videos || 0})
          </button>
          <button
            onClick={() => handleTypeFilter('image')}
            className={`${styles.filterBtn} ${filters.type === 'image' ? styles.active : ''}`}
          >
            🖼️ Imagens ({stats.images || 0})
          </button>
          <button
            onClick={() => handleTypeFilter('document')}
            className={`${styles.filterBtn} ${filters.type === 'document' ? styles.active : ''}`}
          >
            📄 Documentos ({stats.documents || 0})
          </button>
        </div>
      </div>

      {/* Grade de arquivos */}
      <div className={styles.filesGrid}>
        {files.map((file) => (
          <div
            key={file.name}
            className={styles.fileCard}
            onClick={() => handleFileSelect(file)}
          >
            <div className={styles.fileIcon}>
              {getFileIcon(file.name)}
            </div>
            
            <div className={styles.fileInfo}>
              <h4 className={styles.fileName}>{file.name}</h4>
              <div className={styles.fileDetails}>
                <span className={styles.fileSize}>
                  {formatFileSize(file.size)}
                </span>
                <span className={styles.fileType}>
                  {getFileType(file.name).toUpperCase()}
                </span>
              </div>
              <div className={styles.fileDate}>
                {new Date(file.created).toLocaleDateString('pt-BR')}
              </div>
            </div>

            <div className={styles.fileActions}>
              {hasPermission('preview') && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleFilePreview(file);
                  }}
                  className={styles.previewBtn}
                  title="Visualizar arquivo"
                >
                  👁️
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Mensagem quando não há arquivos */}
      {files.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>📁</div>
          <h3>Nenhum arquivo encontrado</h3>
          <p>
            {filters.search 
              ? `Nenhum arquivo corresponde à busca "${filters.search}"`
              : 'Não há arquivos para exibir'
            }
          </p>
        </div>
      )}

      {/* Modal de preview */}
      {selectedFile && (
        <MediaPreview
          fileName={selectedFile.name}
          fileType={selectedFile.fileType}
          userRole={userRole}
          onClose={() => setSelectedFile(null)}
        />
      )}

      {/* Informações de segurança */}
      <div className={styles.securityInfo}>
        <div className={styles.securityBadge}>
          🔒 Preview Seguro - URLs Temporárias
        </div>
        <div className={styles.userInfo}>
          Usuário: {userRole} | Tempo máximo: {getMaxExpiration()} min
        </div>
      </div>
    </div>
  );
};

export default MediaGallery;

