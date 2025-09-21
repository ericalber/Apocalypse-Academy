import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumb from '../../components/Breadcrumb';
import styles from '../../styles/CheckoutSuccess.module.css';

const CheckoutSucesso = () => {
  const router = useRouter();
  const { curso, ref } = router.query;
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (curso) {
      loadOrderData();
      
      // Registrar conversão para afiliado se houver
      if (ref) {
        trackAffiliateConversion(ref, curso);
      }
    }
  }, [curso, ref]);

  const loadOrderData = () => {
    // Simular carregamento dos dados do pedido
    setTimeout(() => {
      setOrderData({
        orderId: 'AA' + Date.now(),
        course: {
          title: 'Escatologia Bíblica Avançada',
          price: 197,
          instructor: 'Eric Alberto da Cruz'
        },
        customer: {
          email: 'cliente@email.com',
          name: 'Cliente Exemplo'
        },
        paymentMethod: 'credit_card',
        purchaseDate: new Date().toISOString()
      });
      setLoading(false);
    }, 1000);
  };

  const trackAffiliateConversion = (affiliateId, courseSlug) => {
    // Registrar conversão do afiliado
    console.log('Conversão registrada:', { affiliateId, courseSlug });
    
    // Aqui você enviaria os dados para seu sistema de afiliados
    // fetch('/api/affiliates/conversion', {
    //   method: 'POST',
    //   body: JSON.stringify({ affiliateId, courseSlug, orderId: orderData?.orderId })
    // });
  };

  const handleAccessCourse = () => {
    // Redirecionar para o curso
    router.push(`/cursos/${curso}`);
  };

  const handleDownloadReceipt = () => {
    // Gerar e baixar comprovante
    alert('Comprovante será enviado por email em alguns minutos.');
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Processando seu pedido...</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Checkout', href: '#' },
    { label: 'Sucesso', href: '#', isLast: true }
  ];

  return (
    <div className={styles.successPage}>
      <Breadcrumb customItems={breadcrumbItems} />

      <div className={styles.successContainer}>
        <div className={styles.successContent}>
          {/* Ícone de Sucesso */}
          <div className={styles.successIcon}>
            <div className={styles.checkmark}>
              <div className={styles.checkmarkCircle}></div>
              <div className={styles.checkmarkStem}></div>
              <div className={styles.checkmarkKick}></div>
            </div>
          </div>

          {/* Mensagem Principal */}
          <h1 className={styles.successTitle}>
            🎉 Compra Realizada com Sucesso!
          </h1>

          <p className={styles.successMessage}>
            Parabéns! Sua matrícula no curso foi confirmada. 
            Você já pode começar a estudar agora mesmo.
          </p>

          {/* Detalhes do Pedido */}
          {orderData && (
            <div className={styles.orderDetails}>
              <h2>Detalhes do Pedido</h2>
              
              <div className={styles.orderInfo}>
                <div className={styles.orderRow}>
                  <span className={styles.orderLabel}>Número do Pedido:</span>
                  <span className={styles.orderValue}>{orderData.orderId}</span>
                </div>
                
                <div className={styles.orderRow}>
                  <span className={styles.orderLabel}>Curso:</span>
                  <span className={styles.orderValue}>{orderData.course.title}</span>
                </div>
                
                <div className={styles.orderRow}>
                  <span className={styles.orderLabel}>Instrutor:</span>
                  <span className={styles.orderValue}>{orderData.course.instructor}</span>
                </div>
                
                <div className={styles.orderRow}>
                  <span className={styles.orderLabel}>Valor Pago:</span>
                  <span className={styles.orderValue}>R$ {orderData.course.price}</span>
                </div>
                
                <div className={styles.orderRow}>
                  <span className={styles.orderLabel}>Data da Compra:</span>
                  <span className={styles.orderValue}>
                    {new Date(orderData.purchaseDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>

                {ref && (
                  <div className={styles.orderRow}>
                    <span className={styles.orderLabel}>Afiliado:</span>
                    <span className={styles.orderValue}>{ref}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Próximos Passos */}
          <div className={styles.nextSteps}>
            <h2>Próximos Passos</h2>
            
            <div className={styles.stepsList}>
              <div className={styles.step}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3>Acesse seu curso</h3>
                  <p>Clique no botão abaixo para começar a estudar imediatamente.</p>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3>Verifique seu email</h3>
                  <p>Enviamos um email de confirmação com todos os detalhes.</p>
                </div>
              </div>
              
              <div className={styles.step}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3>Baixe o aplicativo</h3>
                  <p>Estude também pelo celular com nosso app mobile.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className={styles.actions}>
            <button onClick={handleAccessCourse} className={styles.primaryAction}>
              🎓 Acessar Meu Curso
            </button>
            
            <button onClick={handleDownloadReceipt} className={styles.secondaryAction}>
              📄 Baixar Comprovante
            </button>
          </div>

          {/* Links Úteis */}
          <div className={styles.helpfulLinks}>
            <h3>Links Úteis</h3>
            <div className={styles.linkGrid}>
              <Link href="/cursos" className={styles.helpLink}>
                📚 Outros Cursos
              </Link>
              <Link href="/perfil" className={styles.helpLink}>
                👤 Meu Perfil
              </Link>
              <Link href="/suporte" className={styles.helpLink}>
                🆘 Suporte
              </Link>
              <Link href="/" className={styles.helpLink}>
                🏠 Página Inicial
              </Link>
            </div>
          </div>

          {/* Garantia */}
          <div className={styles.guarantee}>
            <div className={styles.guaranteeIcon}>🛡️</div>
            <div className={styles.guaranteeText}>
              <h4>Garantia de 30 dias</h4>
              <p>
                Se não ficar satisfeito com o curso, devolvemos 100% do seu dinheiro 
                em até 30 dias após a compra.
              </p>
            </div>
          </div>

          {/* Compartilhamento */}
          <div className={styles.sharing}>
            <h3>Compartilhe sua conquista!</h3>
            <p>Conte para seus amigos sobre seu novo curso:</p>
            <div className={styles.shareButtons}>
              <button className={styles.shareBtn + ' ' + styles.whatsapp}>
                📱 WhatsApp
              </button>
              <button className={styles.shareBtn + ' ' + styles.facebook}>
                📘 Facebook
              </button>
              <button className={styles.shareBtn + ' ' + styles.twitter}>
                🐦 Twitter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSucesso;

