import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/AdminDashboard.module.css';
import mediaStyles from '../../styles/AdminMedia.module.css';

const AdminMedia = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Mock data para demonstração
  const mockFiles = [
    {
      id: '1',
      name: 'documentario_sinais_dos_tempos.mp4',
      size: '2.4 GB',
      type: 'video/mp4',
      uploadDate: '2024-08-20',
      status: 'processed',
      thumbnail: '/images/Scene_01.png',
      manifestHLS: '/vod/hls/sinais_dos_tempos/master.m3u8',
      manifestDASH: '/vod/dash/sinais_dos_tempos/manifest.mpd'
    },
    {
      id: '2',
      name: 'curso_escatologia_aula01.mp4',
      size: '1.8 GB',
      type: 'video/mp4',
      uploadDate: '2024-08-19',
      status: 'processing',
      thumbnail: '/images/Scene_02.png'
    },
    {
      id: '3',
      name: 'revista_apocalypse_insights_01.pdf',
      size: '45 MB',
      type: 'application/pdf',
      uploadDate: '2024-08-18',
      status: 'ready',
      thumbnail: '/images/Scene_03.png'
    }
  ];

  useEffect(() => {
    // Verificar autenticação admin
    const checkAuth = () => {
      const adminUser = localStorage.getItem('adminUser');
      if (!adminUser) {
        router.push('/admin/login');
        return;
      }
      setUser(JSON.parse(adminUser));
    };

    checkAuth();
    setFiles(mockFiles);
  }, [router]);

  // Drag and Drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFileUpload(droppedFiles);
  }, []);

  const handleFileUpload = async (filesToUpload) => {
    setLoading(true);
    setUploadProgress(0);

    // Simular upload para Google Cloud Storage
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      
      // Simular progresso de upload
      for (let progress = 0; progress <= 100; progress += 10) {
        setUploadProgress(progress);
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // Adicionar arquivo à lista
      const newFile = {
        id: Date.now() + i,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        uploadDate: new Date().toISOString().split('T')[0],
        status: file.type.startsWith('video/') ? 'processing' : 'ready',
        thumbnail: '/images/Scene_04.png'
      };

      setFiles(prev => [newFile, ...prev]);
    }

    setLoading(false);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateSignedUrl = async (fileId) => {
    // Simular geração de URL assinada temporária
    const mockSignedUrl = `https://storage.googleapis.com/apocalypse-academy-bucket/preview/${fileId}?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=...&X-Goog-Date=20240822T000000Z&X-Goog-Expires=3600&X-Goog-SignedHeaders=host&X-Goog-Signature=...`;
    setPreviewUrl(mockSignedUrl);
  };

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) {
    return <div className={styles.loading}>Verificando autenticação...</div>;
  }

  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <h2>APOCALYPSE ADMIN</h2>
        </div>
        
        <nav className={styles.navigation}>
          <Link href="/admin" className={styles.navItem}>
            <span className={styles.navIcon}>📊</span>
            Dashboard
          </Link>
          <Link href="/admin/catalogo" className={styles.navItem}>
            <span className={styles.navIcon}>🎬</span>
            Catálogo
          </Link>
          <Link href="/admin/midia" className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.navIcon}>☁️</span>
            Mídia
          </Link>
          <Link href="/admin/usuarios" className={styles.navItem}>
            <span className={styles.navIcon}>👥</span>
            Usuários
          </Link>
          <Link href="/admin/relatorios" className={styles.navItem}>
            <span className={styles.navIcon}>📈</span>
            Relatórios
          </Link>
        </nav>

        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {user.name?.charAt(0) || 'A'}
          </div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>{user.name || 'Admin'}</span>
            <span className={styles.userRole}>{user.role || 'Administrador'}</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Gerenciamento de Mídia</h1>
          <div className={styles.headerActions}>
            <button className={styles.notificationBtn}>🔔</button>
            <button 
              className={styles.logoutBtn}
              onClick={() => {
                localStorage.removeItem('adminUser');
                router.push('/admin/login');
              }}
            >
              Sair
            </button>
          </div>
        </header>

        {/* Upload Area */}
        <div 
          className={mediaStyles.uploadArea}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className={mediaStyles.uploadContent}>
            <div className={mediaStyles.uploadIcon}>☁️</div>
            <h3>Arraste arquivos aqui ou clique para selecionar</h3>
            <p>Suporte para vídeos (MP4, MOV), PDFs e imagens</p>
            <input
              type="file"
              multiple
              accept="video/*,application/pdf,image/*"
              onChange={(e) => handleFileUpload(Array.from(e.target.files))}
              className={mediaStyles.fileInput}
            />
            <button 
              className={mediaStyles.uploadBtn}
              onClick={() => document.querySelector(`.${mediaStyles.fileInput}`).click()}
            >
              Selecionar Arquivos
            </button>
          </div>
          
          {loading && (
            <div className={mediaStyles.uploadProgress}>
              <div className={mediaStyles.progressBar}>
                <div 
                  className={mediaStyles.progressFill}
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <span>{uploadProgress}% enviado</span>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className={mediaStyles.searchSection}>
          <div className={mediaStyles.searchBox}>
            <input
              type="text"
              placeholder="Buscar arquivos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={mediaStyles.searchInput}
            />
            <button className={mediaStyles.searchBtn}>🔍</button>
          </div>
          
          <div className={mediaStyles.filters}>
            <select className={mediaStyles.filterSelect}>
              <option value="">Todos os tipos</option>
              <option value="video">Vídeos</option>
              <option value="pdf">PDFs</option>
              <option value="image">Imagens</option>
            </select>
            
            <select className={mediaStyles.filterSelect}>
              <option value="">Todos os status</option>
              <option value="ready">Pronto</option>
              <option value="processing">Processando</option>
              <option value="processed">Processado</option>
            </select>
          </div>
        </div>

        {/* Files Grid */}
        <div className={mediaStyles.filesGrid}>
          {filteredFiles.map(file => (
            <div key={file.id} className={mediaStyles.fileCard}>
              <div className={mediaStyles.fileThumbnail}>
                <img src={file.thumbnail} alt={file.name} />
                <div className={mediaStyles.fileOverlay}>
                  <button 
                    className={mediaStyles.previewBtn}
                    onClick={() => generateSignedUrl(file.id)}
                  >
                    👁️
                  </button>
                  <button className={mediaStyles.downloadBtn}>⬇️</button>
                </div>
              </div>
              
              <div className={mediaStyles.fileInfo}>
                <h4 className={mediaStyles.fileName}>{file.name}</h4>
                <div className={mediaStyles.fileMeta}>
                  <span className={mediaStyles.fileSize}>{file.size}</span>
                  <span className={mediaStyles.fileDate}>{file.uploadDate}</span>
                </div>
                
                <div className={mediaStyles.fileStatus}>
                  <span className={`${mediaStyles.statusBadge} ${mediaStyles[file.status]}`}>
                    {file.status === 'ready' && '✅ Pronto'}
                    {file.status === 'processing' && '⏳ Processando'}
                    {file.status === 'processed' && '🎬 Processado'}
                  </span>
                </div>

                {file.manifestHLS && (
                  <div className={mediaStyles.manifests}>
                    <div className={mediaStyles.manifestItem}>
                      <span>HLS:</span>
                      <code>{file.manifestHLS}</code>
                    </div>
                    <div className={mediaStyles.manifestItem}>
                      <span>DASH:</span>
                      <code>{file.manifestDASH}</code>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Storage Stats */}
        <div className={mediaStyles.storageStats}>
          <h3>Estatísticas de Armazenamento</h3>
          <div className={mediaStyles.statsGrid}>
            <div className={mediaStyles.statItem}>
              <span className={mediaStyles.statLabel}>Total de Arquivos:</span>
              <span className={mediaStyles.statValue}>{files.length}</span>
            </div>
            <div className={mediaStyles.statItem}>
              <span className={mediaStyles.statLabel}>Espaço Usado:</span>
              <span className={mediaStyles.statValue}>847 GB</span>
            </div>
            <div className={mediaStyles.statItem}>
              <span className={mediaStyles.statLabel}>Espaço Disponível:</span>
              <span className={mediaStyles.statValue}>1.2 TB</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminMedia;

