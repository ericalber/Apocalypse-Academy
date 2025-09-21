import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import styles from '../../styles/AdminDashboard.module.css';

const AdminDashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeSubscriptions: 892,
    totalVideos: 156,
    totalRevenue: 'R$ 89.450'
  });

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
  }, [router]);

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
          <Link href="/admin" className={`${styles.navItem} ${styles.active}`}>
            <span className={styles.navIcon}>📊</span>
            Dashboard
          </Link>
          <Link href="/admin/catalogo" className={styles.navItem}>
            <span className={styles.navIcon}>🎬</span>
            Catálogo
          </Link>
          <Link href="/admin/midia" className={styles.navItem}>
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
          <h1>Dashboard Administrativo</h1>
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

        {/* Stats Cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>👥</div>
            <div className={styles.statContent}>
              <h3>Total de Usuários</h3>
              <p className={styles.statNumber}>{stats.totalUsers}</p>
              <span className={styles.statChange}>+12% este mês</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>💳</div>
            <div className={styles.statContent}>
              <h3>Assinaturas Ativas</h3>
              <p className={styles.statNumber}>{stats.activeSubscriptions}</p>
              <span className={styles.statChange}>+8% este mês</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>🎬</div>
            <div className={styles.statContent}>
              <h3>Total de Vídeos</h3>
              <p className={styles.statNumber}>{stats.totalVideos}</p>
              <span className={styles.statChange}>+15 esta semana</span>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon}>💰</div>
            <div className={styles.statContent}>
              <h3>Receita Total</h3>
              <p className={styles.statNumber}>{stats.totalRevenue}</p>
              <span className={styles.statChange}>+23% este mês</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className={styles.recentActivity}>
          <h2>Atividade Recente</h2>
          <div className={styles.activityList}>
            <div className={styles.activityItem}>
              <span className={styles.activityIcon}>🎬</span>
              <div className={styles.activityContent}>
                <p><strong>Novo documentário publicado:</strong> "Sinais dos Tempos"</p>
                <span className={styles.activityTime}>2 horas atrás</span>
              </div>
            </div>
            
            <div className={styles.activityItem}>
              <span className={styles.activityIcon}>👤</span>
              <div className={styles.activityContent}>
                <p><strong>Novo usuário registrado:</strong> João Silva</p>
                <span className={styles.activityTime}>4 horas atrás</span>
              </div>
            </div>
            
            <div className={styles.activityItem}>
              <span className={styles.activityIcon}>📚</span>
              <div className={styles.activityContent}>
                <p><strong>Curso atualizado:</strong> "Escatologia Bíblica"</p>
                <span className={styles.activityTime}>1 dia atrás</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className={styles.quickActions}>
          <h2>Ações Rápidas</h2>
          <div className={styles.actionButtons}>
            <Link href="/admin/catalogo/novo" className={styles.actionBtn}>
              <span className={styles.actionIcon}>➕</span>
              Adicionar Conteúdo
            </Link>
            <Link href="/admin/midia/upload" className={styles.actionBtn}>
              <span className={styles.actionIcon}>☁️</span>
              Upload de Mídia
            </Link>
            <Link href="/admin/usuarios" className={styles.actionBtn}>
              <span className={styles.actionIcon}>👥</span>
              Gerenciar Usuários
            </Link>
            <Link href="/admin/relatorios" className={styles.actionBtn}>
              <span className={styles.actionIcon}>📊</span>
              Ver Relatórios
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

