import { useState, useRef, useEffect } from 'react';
import styles from '../styles/components/Carousel.module.css';

const Carousel = ({ 
  title, 
  items, 
  renderItem, 
  sectionId,
  showArrows = true,
  itemsPerView = { desktop: 4, tablet: 3, mobile: 1.2 }
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  
  const carouselRef = useRef(null);
  const containerRef = useRef(null);

  // Update scroll buttons state
  const updateScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Handle scroll events
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons(); // Initial check
      
      return () => carousel.removeEventListener('scroll', updateScrollButtons);
    }
  }, [items]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      updateScrollButtons();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to specific position
  const scrollToPosition = (position) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: position,
        behavior: 'smooth'
      });
    }
  };

  // Navigate left
  const scrollToPrevious = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0]?.offsetWidth || 0;
      const gap = 20; // CSS gap value
      const scrollAmount = itemWidth + gap;
      const newPosition = carouselRef.current.scrollLeft - scrollAmount;
      
      scrollToPosition(Math.max(0, newPosition));
    }
  };

  // Navigate right
  const scrollToNext = () => {
    if (carouselRef.current) {
      const itemWidth = carouselRef.current.children[0]?.offsetWidth || 0;
      const gap = 20; // CSS gap value
      const scrollAmount = itemWidth + gap;
      const newPosition = carouselRef.current.scrollLeft + scrollAmount;
      
      scrollToPosition(newPosition);
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    carouselRef.current.style.cursor = 'grab';
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleTouchMove = (e) => {
    const x = e.touches[0].clientX;
    const walk = startX - x;
    carouselRef.current.scrollLeft = scrollLeft + walk;
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      scrollToPrevious();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      scrollToNext();
    }
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className={styles.carouselSection} id={sectionId}>
      <div className={styles.carouselHeader}>
        <h2 className={styles.carouselTitle}>{title}</h2>
      </div>
      
      <div className={styles.carouselContainer} ref={containerRef}>
        {/* Left Arrow */}
        {showArrows && canScrollLeft && (
          <button
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            onClick={scrollToPrevious}
            aria-label={`Anterior da seção ${title}`}
            tabIndex={0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}

        {/* Carousel Items */}
        <div
          ref={carouselRef}
          className={styles.carousel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="region"
          aria-label={`Carrossel de ${title}`}
        >
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={styles.carouselItem}
              style={{ '--item-index': index }}
            >
              {renderItem(item, index)}
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {showArrows && canScrollRight && (
          <button
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            onClick={scrollToNext}
            aria-label={`Próxima da seção ${title}`}
            tabIndex={0}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Mobile pagination dots */}
      <div className={styles.carouselDots}>
        {Array.from({ length: Math.ceil(items.length / itemsPerView.mobile) }).map((_, index) => (
          <button
            key={index}
            className={`${styles.carouselDot} ${
              Math.floor(currentIndex / itemsPerView.mobile) === index ? styles.active : ''
            }`}
            onClick={() => {
              const targetIndex = index * itemsPerView.mobile;
              const itemWidth = carouselRef.current?.children[0]?.offsetWidth || 0;
              const gap = 20;
              const scrollAmount = targetIndex * (itemWidth + gap);
              scrollToPosition(scrollAmount);
            }}
            aria-label={`Ir para página ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Carousel;

