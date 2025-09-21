import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Auth.module.css';

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        // Redirecionar para página de origem ou dashboard
        const returnUrl = router.query.redirect || router.query.returnTo || '/dashboard';
        router.push(returnUrl);
      } else {
        setError(result.message || 'Email ou senha incorretos');
      }
    } catch (err) {
      console.error('Erro no login:', err);
      setError('Erro interno do servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.authHeader}>
          <Link href="/" className={styles.logo}>
            <h1>APOCALYPSE ACADEMY</h1>
          </Link>
          <h2 className="auth-subtitle-legible">Entrar na sua conta</h2>
          <p className="auth-form-text">Acesse conteúdo exclusivo sobre os últimos tempos</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.authForm}>
          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <div className={styles.inputGroup}>
            <label htmlFor="email" className="auth-label-legible">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
              className="auth-form-input"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className="auth-label-legible">Senha</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Sua senha"
              className="auth-form-input"
            />
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span className={styles.checkmark}></span>
              Lembrar de mim
            </label>
            <Link href="/recuperar-senha" className={styles.forgotLink}>
              Esqueceu a senha?
            </Link>
          </div>

          <button 
            type="submit" 
            className="auth-form-button btn-legible"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className={styles.socialLogin}>
          <div className={styles.divider}>
            <span>ou continue com</span>
          </div>
          
          <div className={styles.socialButtons}>
            <button className="auth-social-button">
              <span className={styles.socialIcon}>🔍</span>
              Google
            </button>
            <button className="auth-social-button">
              <span className={styles.socialIcon}>📘</span>
              Facebook
            </button>
          </div>
        </div>

        <div className={styles.authFooter}>
          <p className="auth-form-text">
            Não tem uma conta?{' '}
            <Link href="/registrar" className="auth-form-link">
              Criar conta gratuita
            </Link>
          </p>
          
          <div className={styles.testCredentials}>
            <h4 className="auth-subtitle-legible">Credenciais de Teste:</h4>
            <div className="auth-form-text">
              <p><strong>Admin:</strong> admin@apocalypse.academy / admin123</p>
              <p><strong>Membro:</strong> membro@apocalypse.academy / membro123</p>
              <p><strong>Teste:</strong> teste@apocalypse.academy / teste123</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.authBackground}>
        <div className={styles.backgroundOverlay}></div>
      </div>
    </div>
  );
};

export default Login;

