import { useState } from 'react';
import Link from 'next/link';

const MovieUICard = ({ 
  title, 
  description, 
  image, 
  duration, 
  rating, 
  price, 
  link, 
  type = 'documentary',
  progress = 0,
  isNew = false,
  isPremium = false 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<div key={i} className="movie-star" />);
    }
    
    if (hasHalfStar) {
      stars.push(<div key="half" className="movie-star" style={{ opacity: 0.5 }} />);
    }
    
    return stars;
  };

  return (
    <div 
      className={`movie-card-enhanced movie-fade-in ${type === 'course' ? 'course-card' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Header with Image */}
      <div className="card-image-container" style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        {image && (
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.4s ease',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
            }}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        
        {/* Overlay with badges */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          {isNew && (
            <span style={{
              background: 'linear-gradient(135deg, #E11D2E 0%, #B91C3C 100%)',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Novo
            </span>
          )}
          
          {isPremium && (
            <span style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              color: '#000',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Premium
            </span>
          )}
        </div>

        {/* Progress bar for courses */}
        {progress > 0 && (
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0.5rem'
          }}>
            <div className="movie-progress-bar">
              <div 
                className="movie-progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Play button overlay */}
        {isHovered && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}>
            <button className="movie-play-button movie-control-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div style={{ padding: '1.5rem' }}>
        {/* Title */}
        <h3 style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#FFFFFF',
          marginBottom: '0.75rem',
          lineHeight: '1.3',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
        }}>
          {title}
        </h3>

        {/* Description */}
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          marginBottom: '1rem',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {description}
        </p>

        {/* Metadata */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          {duration && (
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.8rem'
            }}>
              {typeof duration === 'number' ? formatDuration(duration) : duration}
            </span>
          )}

          {rating && (
            <div className="movie-rating-enhanced">
              <div className="movie-rating-stars">
                {renderStars(rating)}
              </div>
              <span className="movie-rating-number">{rating}</span>
            </div>
          )}
        </div>

        {/* Price and Action */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {price && (
            <span style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#E11D2E',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}>
              {price}
            </span>
          )}

          <Link href={link || '#'}>
            <button style={{
              background: 'linear-gradient(135deg, #E11D2E 0%, #B91C3C 100%)',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 12px rgba(225, 29, 46, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(225, 29, 46, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(225, 29, 46, 0.3)';
            }}>
              {type === 'course' ? 'Inscrever-se' : 'Assistir'}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieUICard;

