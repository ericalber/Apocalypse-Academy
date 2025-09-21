import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/components/PaywallButton.module.css';

/**
 * Smart button that handles paywall logic
 * - Guests: Redirect to login
 * - Users without subscription: Redirect to subscription page
 * - Subscribed users: Direct access
 */
const PaywallButton = ({
  children,
  targetUrl,
  requireSubscription = true,
  price = null,
  className = '',
  variant = 'primary', // 'primary', 'secondary', 'outline'
  size = 'medium', // 'small', 'medium', 'large'
  onClick = null,
  disabled = false,
  ...props
}) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    
    // Custom onClick handler
    if (onClick) {
      onClick(e);
      return;
    }

    // If disabled, do nothing
    if (disabled) {
      return;
    }

    // Check authentication status
    if (!isAuthenticated()) {
      // Redirect to login with return URL
      const loginUrl = `/entrar?redirect=${encodeURIComponent(targetUrl || router.asPath)}`;
      router.push(loginUrl);
      return;
    }

    // Check subscription requirement
    if (requireSubscription && !user?.hasActiveSubscription) {
      // Redirect to subscription page with return URL
      const subscriptionUrl = `/assinar?redirect=${encodeURIComponent(targetUrl || router.asPath)}`;
      router.push(subscriptionUrl);
      return;
    }

    // User has access - navigate to target
    if (targetUrl) {
      router.push(targetUrl);
    }
  };

  // Determine button text based on auth state
  const getButtonText = () => {
    if (typeof children === 'string') {
      return children;
    }

    if (!isAuthenticated()) {
      return price ? `Comprar por R$ ${price}` : 'Fazer Login';
    }

    if (requireSubscription && !user?.hasActiveSubscription) {
      return price ? `Comprar por R$ ${price}` : 'Assinar Agora';
    }

    return 'Acessar';
  };

  // Determine button style based on auth state
  const getButtonVariant = () => {
    if (!isAuthenticated()) {
      return 'primary'; // Login button
    }

    if (requireSubscription && !user?.hasActiveSubscription) {
      return 'subscription'; // Subscription button
    }

    return variant; // Normal access button
  };

  const buttonClasses = [
    styles.paywallButton,
    styles[getButtonVariant()],
    styles[size],
    className,
    disabled ? styles.disabled : ''
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      {typeof children === 'string' ? getButtonText() : children}
    </button>
  );
};

/**
 * Link version of PaywallButton for cases where you need an anchor tag
 */
export const PaywallLink = ({
  children,
  targetUrl,
  requireSubscription = true,
  price = null,
  className = '',
  ...props
}) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    
    if (!isAuthenticated()) {
      const loginUrl = `/entrar?redirect=${encodeURIComponent(targetUrl || router.asPath)}`;
      router.push(loginUrl);
      return;
    }

    if (requireSubscription && !user?.hasActiveSubscription) {
      const subscriptionUrl = `/assinar?redirect=${encodeURIComponent(targetUrl || router.asPath)}`;
      router.push(subscriptionUrl);
      return;
    }

    if (targetUrl) {
      router.push(targetUrl);
    }
  };

  return (
    <a
      href={targetUrl || '#'}
      className={`${styles.paywallLink} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
};

/**
 * Card wrapper that makes entire card clickable with paywall logic
 */
export const PaywallCard = ({
  children,
  targetUrl,
  requireSubscription = true,
  className = '',
  ...props
}) => {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    if (!isAuthenticated()) {
      const loginUrl = `/entrar?redirect=${encodeURIComponent(targetUrl || router.asPath)}`;
      router.push(loginUrl);
      return;
    }

    if (requireSubscription && !user?.hasActiveSubscription) {
      const subscriptionUrl = `/assinar?redirect=${encodeURIComponent(targetUrl || router.asPath)}`;
      router.push(subscriptionUrl);
      return;
    }

    if (targetUrl) {
      router.push(targetUrl);
    }
  };

  return (
    <div
      className={`${styles.paywallCard} ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export default PaywallButton;

