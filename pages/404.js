import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Error404.module.css';

const Error404 = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    // Countdown para redirecionamento automático
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContainer}>
        {/* Efeito de fundo cinematográfico */}
        <div className={styles.backgroundEffect}>
          <div className={styles.glitch}></div>
          <div className={styles.scanlines}></div>
        </div>

        {/* Conteúdo principal */}
        <div className={styles.errorContent}>
          <div className={styles.errorCode}>
            <span className={styles.errorNumber}>4</span>
            <span className={styles.errorSymbol}>⚠</span>
            <span className={styles.errorNumber}>4</span>
          </div>

          <h1 className={styles.errorTitle}>ARQUIVO NÃO ENCONTRADO</h1>
          
          <div className={styles.errorMessage}>
            <p className={styles.mainMessage}>
              O arquivo que você está procurando foi <strong>CLASSIFICADO</strong> ou não existe em nossos registros.
            </p>
            <p className={styles.subMessage}>
              Esta página pode ter sido movida, removida ou você pode ter digitado o endereço incorretamente.
            </p>
          </div>

          {/* Informações de redirecionamento */}
          <div className={styles.redirectInfo}>
            <div className={styles.countdownContainer}>
              <span className={styles.countdownLabel}>Redirecionamento automático em:</span>
              <span className={styles.countdownNumber}>{countdown}s</span>
            </div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progressFill}
                style={{ width: `${((10 - countdown) / 10) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Ações disponíveis */}
          <div className={styles.errorActions}>
            <button onClick={handleGoHome} className={styles.primaryAction}>
              🏠 Voltar ao Início
            </button>
            <button onClick={handleGoBack} className={styles.secondaryAction}>
              ← Página Anterior
            </button>
          </div>

          {/* Links úteis */}
          <div className={styles.helpfulLinks}>
            <h3>Acesso Rápido:</h3>
            <div className={styles.linkGrid}>
              <Link href="/documentarios" className={styles.helpLink}>
                🎬 Documentários
              </Link>
              <Link href="/cursos" className={styles.helpLink}>
                📚 Cursos
              </Link>
              <Link href="/revistas" className={styles.helpLink}>
                📖 Revistas
              </Link>
              <Link href="/entrar" className={styles.helpLink}>
                🔐 Login
              </Link>
            </div>
          </div>

          {/* Informações de contato */}
          <div className={styles.contactInfo}>
            <p>Precisa de ajuda? Entre em contato:</p>
            <div className={styles.contactLinks}>
              <a href="mailto:suporte@apocalypseacademy.com" className={styles.contactLink}>
                📧 suporte@apocalypseacademy.com
              </a>
              <a href="https://wa.me/5511999999999" className={styles.contactLink} target="_blank" rel="noopener noreferrer">
                📱 WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className={styles.decorativeElements}>
          <div className={styles.floatingIcon}>🔍</div>
          <div className={styles.floatingIcon}>📁</div>
          <div className={styles.floatingIcon}>⚡</div>
        </div>
      </div>
    </div>
  );
};

export default Error404;

