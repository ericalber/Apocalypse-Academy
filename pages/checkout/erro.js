import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumb from '../../components/Breadcrumb';
import styles from '../../styles/CheckoutError.module.css';

const CheckoutErro = () => {
  const router = useRouter();
  const { curso, ref, erro } = router.query;
  const [retryCount, setRetryCount] = useState(0);
  const [supportTicket, setSupportTicket] = useState(null);

  useEffect(() => {
    // Registrar erro para análise
    if (erro) {
      logCheckoutError(erro, curso, ref);
    }
  }, [erro, curso, ref]);

  const logCheckoutError = (errorType, courseSlug, affiliateId) => {
    console.log('Erro no checkout:', { errorType, courseSlug, affiliateId });
    
    // Aqui você enviaria os dados para seu sistema de logs
    // fetch('/api/checkout/error-log', {
    //   method: 'POST',
    //   body: JSON.stringify({ errorType, courseSlug, affiliateId, timestamp: new Date() })
    // });
  };

  const handleRetryPayment = () => {
    setRetryCount(prev => prev + 1);
    
    // Preservar parâmetros de afiliado no retry
    const checkoutUrl = `/checkout/curso/${curso}${ref ? `?ref=${ref}` : ''}`;
    router.push(checkoutUrl);
  };

  const handleContactSupport = () => {
    // Gerar ticket de suporte
    const ticket = 'SUP' + Date.now();
    setSupportTicket(ticket);
    
    // Aqui você abriria um chat ou formulário de suporte
    alert(`Ticket de suporte gerado: ${ticket}\nNossa equipe entrará em contato em breve.`);
  };

  const handleTryDifferentPayment = () => {
    // Redirecionar para checkout com método de pagamento diferente
    const checkoutUrl = `/checkout/curso/${curso}${ref ? `?ref=${ref}` : ''}#payment`;
    router.push(checkoutUrl);
  };

  const getErrorMessage = () => {
    switch (erro) {
      case 'payment_declined':
        return {
          title: 'Pagamento Recusado',
          message: 'Seu cartão foi recusado. Verifique os dados ou tente outro cartão.',
          icon: '💳'
        };
      case 'insufficient_funds':
        return {
          title: 'Saldo Insuficiente',
          message: 'Não há saldo suficiente no cartão. Tente outro cartão ou PIX.',
          icon: '💰'
        };
      case 'expired_card':
        return {
          title: 'Cartão Vencido',
          message: 'Seu cartão está vencido. Use um cartão válido.',
          icon: '📅'
        };
      case 'network_error':
        return {
          title: 'Erro de Conexão',
          message: 'Problema na conexão. Tente novamente em alguns minutos.',
          icon: '🌐'
        };
      case 'system_error':
        return {
          title: 'Erro do Sistema',
          message: 'Erro temporário em nosso sistema. Tente novamente.',
          icon: '⚙️'
        };
      default:
        return {
          title: 'Erro no Pagamento',
          message: 'Ocorreu um erro inesperado. Nossa equipe foi notificada.',
          icon: '❌'
        };
    }
  };

  const errorInfo = getErrorMessage();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Checkout', href: '#' },
    { label: 'Erro', href: '#', isLast: true }
  ];

  return (
    <div className={styles.errorPage}>
      <Breadcrumb customItems={breadcrumbItems} />

      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          {/* Ícone de Erro */}
          <div className={styles.errorIcon}>
            <span className={styles.errorSymbol}>{errorInfo.icon}</span>
          </div>

          {/* Mensagem Principal */}
          <h1 className={styles.errorTitle}>
            {errorInfo.title}
          </h1>

          <p className={styles.errorMessage}>
            {errorInfo.message}
          </p>

          {/* Detalhes do Erro */}
          <div className={styles.errorDetails}>
            <h2>Detalhes do Problema</h2>
            
            <div className={styles.errorInfo}>
              {curso && (
                <div className={styles.errorRow}>
                  <span className={styles.errorLabel}>Curso:</span>
                  <span className={styles.errorValue}>{curso}</span>
                </div>
              )}
              
              <div className={styles.errorRow}>
                <span className={styles.errorLabel}>Código do Erro:</span>
                <span className={styles.errorValue}>{erro || 'UNKNOWN'}</span>
              </div>
              
              <div className={styles.errorRow}>
                <span className={styles.errorLabel}>Horário:</span>
                <span className={styles.errorValue}>
                  {new Date().toLocaleString('pt-BR')}
                </span>
              </div>

              {retryCount > 0 && (
                <div className={styles.errorRow}>
                  <span className={styles.errorLabel}>Tentativas:</span>
                  <span className={styles.errorValue}>{retryCount}</span>
                </div>
              )}

              {supportTicket && (
                <div className={styles.errorRow}>
                  <span className={styles.errorLabel}>Ticket de Suporte:</span>
                  <span className={styles.errorValue}>{supportTicket}</span>
                </div>
              )}
            </div>
          </div>

          {/* Soluções Sugeridas */}
          <div className={styles.solutions}>
            <h2>O que você pode fazer:</h2>
            
            <div className={styles.solutionsList}>
              <div className={styles.solution}>
                <div className={styles.solutionIcon}>🔄</div>
                <div className={styles.solutionContent}>
                  <h3>Tentar Novamente</h3>
                  <p>O problema pode ter sido temporário. Tente fazer o pagamento novamente.</p>
                  <button onClick={handleRetryPayment} className={styles.solutionBtn}>
                    Tentar Novamente
                  </button>
                </div>
              </div>
              
              <div className={styles.solution}>
                <div className={styles.solutionIcon}>💳</div>
                <div className={styles.solutionContent}>
                  <h3>Método de Pagamento</h3>
                  <p>Tente usar um cartão diferente ou escolha PIX para pagamento instantâneo.</p>
                  <button onClick={handleTryDifferentPayment} className={styles.solutionBtn}>
                    Alterar Pagamento
                  </button>
                </div>
              </div>
              
              <div className={styles.solution}>
                <div className={styles.solutionIcon}>🆘</div>
                <div className={styles.solutionContent}>
                  <h3>Falar com Suporte</h3>
                  <p>Nossa equipe está pronta para ajudar você a resolver este problema.</p>
                  <button onClick={handleContactSupport} className={styles.solutionBtn}>
                    Contatar Suporte
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Informações de Contato */}
          <div className={styles.contactInfo}>
            <h3>Precisa de Ajuda Imediata?</h3>
            <div className={styles.contactOptions}>
              <a href="https://wa.me/5511999999999" className={styles.contactBtn + ' ' + styles.whatsapp} target="_blank" rel="noopener noreferrer">
                📱 WhatsApp
              </a>
              <a href="mailto:suporte@apocalypseacademy.com" className={styles.contactBtn + ' ' + styles.email}>
                📧 Email
              </a>
              <a href="tel:+5511999999999" className={styles.contactBtn + ' ' + styles.phone}>
                📞 Telefone
              </a>
            </div>
          </div>

          {/* Garantias */}
          <div className={styles.guarantees}>
            <h3>Suas Garantias</h3>
            <div className={styles.guaranteesList}>
              <div className={styles.guarantee}>
                <span className={styles.guaranteeIcon}>🔒</span>
                <span>Seus dados estão seguros</span>
              </div>
              <div className={styles.guarantee}>
                <span className={styles.guaranteeIcon}>💰</span>
                <span>Nenhuma cobrança foi feita</span>
              </div>
              <div className={styles.guarantee}>
                <span className={styles.guaranteeIcon}>🛡️</span>
                <span>30 dias de garantia</span>
              </div>
              <div className={styles.guarantee}>
                <span className={styles.guaranteeIcon}>⚡</span>
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>

          {/* Links Úteis */}
          <div className={styles.helpfulLinks}>
            <h3>Outras Opções</h3>
            <div className={styles.linkGrid}>
              <Link href="/cursos" className={styles.helpLink}>
                📚 Ver Outros Cursos
              </Link>
              <Link href="/faq" className={styles.helpLink}>
                ❓ Perguntas Frequentes
              </Link>
              <Link href="/politica-pagamento" className={styles.helpLink}>
                💳 Política de Pagamento
              </Link>
              <Link href="/" className={styles.helpLink}>
                🏠 Página Inicial
              </Link>
            </div>
          </div>

          {/* Preservar Afiliado */}
          {ref && (
            <div className={styles.affiliateNote}>
              <p>
                <strong>Nota:</strong> Sua indicação via afiliado ({ref}) será preservada 
                quando você tentar novamente.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutErro;

