import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import styles from '../../styles/Auth.module.css';
import Link from 'next/link';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated()) {
      router.push('/');
    }
  }, [isAuthenticated, router]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      router.push('/');
    } catch (error) {
      setError(error.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout title="Login | Apocalypse Academy">
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <div className={styles.authHeader}>
            <h1 className={styles.authTitle}>ENTRAR</h1>
            <p className={styles.authSubtitle}>Acesse sua conta para conteúdo exclusivo</p>
          </div>
          
          {error && <div className={styles.errorMessage}>{error}</div>}
          
          <form className={styles.authForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.formLabel}>E-mail</label>
              <input 
                type="email" 
                id="email" 
                className={styles.formInput} 
                placeholder="Seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>Senha</label>
              <input 
                type="password" 
                id="password" 
                className={styles.formInput} 
                placeholder="Sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className={styles.formOptions}>
              <div className={styles.rememberMe}>
                <input 
                  type="checkbox" 
                  id="remember" 
                  className={styles.checkbox}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Lembrar-me</label>
              </div>
              <Link href="/auth/recuperar-senha" className={styles.forgotPassword}>
                Esqueceu a senha?
              </Link>
            </div>
            
            <button 
              type="submit" 
              className={styles.authButton}
              disabled={isLoading}
            >
              {isLoading ? 'PROCESSANDO...' : 'ENTRAR'}
            </button>
          </form>
          
          <div className={styles.authDivider}>
            <span>ou</span>
          </div>
          
          <div className={styles.socialLogin}>
            <button className={`${styles.socialButton} ${styles.googleButton}`}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/>
              </svg>
              Entrar com Google
            </button>
            
            <button className={`${styles.socialButton} ${styles.facebookButton}`}>
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path d="M20.007,3H3.993C3.445,3,3,3.445,3,3.993v16.013C3,20.555,3.445,21,3.993,21h8.621v-6.971h-2.346v-2.717h2.346V9.31c0-2.325,1.42-3.591,3.494-3.591c0.993,0,1.847,0.074,2.096,0.107v2.43l-1.438,0.001c-1.128,0-1.346,0.536-1.346,1.323v1.734h2.69l-0.35,2.717h-2.34V21h4.587C20.555,21,21,20.555,21,20.007V3.993C21,3.445,20.555,3,20.007,3z"/>
              </svg>
              Entrar com Facebook
            </button>
          </div>
          
          <div className={styles.authFooter}>
            <p>Não tem uma conta? <Link href="/auth/register" className={styles.authLink}>Registre-se</Link></p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
