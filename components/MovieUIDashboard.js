import { useAuth } from '../contexts/AuthContext';

const MovieUIDashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return null;

  const dashboardStats = [
    {
      icon: '🎬',
      number: '24',
      label: 'Documentários Assistidos',
      color: '#E11D2E'
    },
    {
      icon: '📚',
      number: '12',
      label: 'Cursos Concluídos',
      color: '#FFD700'
    },
    {
      icon: '⏱️',
      number: '156h',
      label: 'Tempo de Estudo',
      color: '#00D4AA'
    },
    {
      icon: '🏆',
      number: '8',
      label: 'Certificados',
      color: '#FF6B6B'
    }
  ];

  const recentActivity = [
    {
      type: 'documentary',
      title: 'Os Eventos Finais da Profecia Bíblica',
      progress: 85,
      timeAgo: '2 horas atrás'
    },
    {
      type: 'course',
      title: 'Escatologia Bíblica Avançada',
      progress: 60,
      timeAgo: '1 dia atrás'
    },
    {
      type: 'magazine',
      title: 'Apocalypse Insights #01',
      progress: 100,
      timeAgo: '3 dias atrás'
    }
  ];

  return (
    <div className="movie-ui-dark" style={{ padding: '2rem 0' }}>
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        {dashboardStats.map((stat, index) => (
          <div 
            key={index} 
            className={`movie-dashboard-stat movie-fade-in-delay-${index + 1}`}
          >
            <div className="movie-stat-icon" style={{
              background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}CC 100%)`
            }}>
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
            </div>
            <div className="movie-stat-number">{stat.number}</div>
            <div className="movie-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'rgba(0, 0, 0, 0.6)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '16px',
        padding: '2rem',
        backdropFilter: 'blur(10px)'
      }}>
        <h3 style={{
          fontSize: '1.5rem',
          fontWeight: '600',
          color: '#FFFFFF',
          marginBottom: '1.5rem',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          Atividade Recente
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {recentActivity.map((activity, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(225, 29, 46, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(225, 29, 46, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #E11D2E 0%, #B91C3C 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem'
              }}>
                {activity.type === 'documentary' && '🎬'}
                {activity.type === 'course' && '📚'}
                {activity.type === 'magazine' && '📖'}
              </div>

              <div style={{ flex: 1 }}>
                <h4 style={{
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  fontWeight: '600',
                  margin: '0 0 0.25rem 0'
                }}>
                  {activity.title}
                </h4>
                <p style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '0.8rem',
                  margin: 0
                }}>
                  {activity.timeAgo}
                </p>
              </div>

              <div style={{ minWidth: '120px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.8rem'
                  }}>
                    Progresso
                  </span>
                  <span style={{
                    color: '#E11D2E',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {activity.progress}%
                  </span>
                </div>
                <div className="movie-progress-bar">
                  <div 
                    className="movie-progress-fill" 
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieUIDashboard;

