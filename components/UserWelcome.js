import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/UserWelcome.module.css';

const UserWelcome = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.welcomeContent}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className={styles.userDetails}>
            <h3 className={styles.userName}>Bem-vindo, {user.name}!</h3>
            <p className={styles.userRole}>
              {user.role === 'admin' && '👑 Administrador'}
              {user.role === 'premium' && '⭐ Usuário Premium'}
              {user.role === 'member' && '🎓 Membro'}
            </p>
          </div>
        </div>
        
        <div className={styles.quickActions}>
          <button 
            onClick={logout}
            className={styles.logoutButton}
          >
            Sair
          </button>
        </div>
      </div>
      
      <div className={styles.userStats}>
        <div className={styles.stat}>
          <span className={styles.statNumber}>12</span>
          <span className={styles.statLabel}>Cursos Acessados</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>45</span>
          <span className={styles.statLabel}>Horas Assistidas</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statNumber}>8</span>
          <span className={styles.statLabel}>Certificados</span>
        </div>
      </div>
    </div>
  );
};

export default UserWelcome;

