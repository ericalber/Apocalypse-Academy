import { PaywallCard } from './PaywallButton';
import styles from '../styles/components/BookCard.module.css';

const BookCard = ({ book }) => {
  if (!book) return null;

  return (
    <PaywallCard
      targetUrl={`/livros/${book.id}`}
      requireSubscription={false}
      className={styles.bookCard}
    >
      <div className={styles.imageContainer}>
        <img 
          src={book.image || '/images/placeholder-book.jpg'} 
          alt={book.title}
          className={styles.bookImage}
          loading="lazy"
        />
        {book.badge && (
          <div className={`${styles.badge} ${styles[book.badge.toLowerCase()]}`}>
            {book.badge}
          </div>
        )}
      </div>
      
      <div className={styles.content}>
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>por {book.author}</p>
        
        <div className={styles.metadata}>
          <div className={styles.stat}>
            <span className={styles.icon}>📄</span>
            <span>{book.pages} páginas</span>
          </div>
        </div>
        
        <div className={styles.footer}>
          <div className={styles.price}>
            R$ {book.price.toFixed(2)}
          </div>
        </div>
      </div>
    </PaywallCard>
  );
};

export default BookCard;

