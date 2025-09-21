import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Breadcrumb from '../../../components/Breadcrumb';
import styles from '../../../styles/Checkout.module.css';

const CheckoutCurso = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [affiliateId, setAffiliateId] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    document: '',
    paymentMethod: 'credit_card',
    installments: 1,
    coupon: ''
  });
  const [errors, setErrors] = useState({});

  // Mock course data
  const mockCourse = {
    id: 1,
    slug: 'escatologia-biblica-avancada',
    title: "Escatologia Bíblica Avançada",
    description: "Estudo completo sobre os últimos tempos, incluindo análise das profecias de Daniel e Apocalipse.",
    price: 197,
    originalPrice: 297,
    discount: 34,
    instructor: "Eric Alberto da Cruz",
    duration: "12 horas",
    lessons: 24,
    thumbnail: "/images/courses/escatologia-avancada.jpg",
    features: [
      "Acesso vitalício ao curso",
      "Certificado de conclusão",
      "Suporte do instrutor",
      "30 dias de garantia",
      "Acesso mobile e desktop"
    ]
  };

  useEffect(() => {
    if (slug) {
      loadCourse();
      
      // Capturar parâmetros de afiliado da URL
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get('ref');
      if (ref) {
        setAffiliateId(ref);
        // Salvar no localStorage para persistir durante o checkout
        localStorage.setItem('affiliateId', ref);
      } else {
        // Verificar se há afiliado salvo anteriormente
        const savedAffiliate = localStorage.getItem('affiliateId');
        if (savedAffiliate) {
          setAffiliateId(savedAffiliate);
        }
      }
    }
  }, [slug]);

  const loadCourse = () => {
    setLoading(true);
    
    // Simular carregamento da API
    setTimeout(() => {
      if (slug === mockCourse.slug) {
        setCourse(mockCourse);
      }
      setLoading(false);
    }, 500);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro do campo quando usuário digita
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.phone) {
      newErrors.phone = 'Telefone é obrigatório';
    }

    if (!formData.document) {
      newErrors.document = 'CPF é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setProcessing(true);

    try {
      // Simular processamento do pagamento
      const paymentData = {
        course: course,
        customer: formData,
        affiliateId: affiliateId,
        amount: course.price,
        paymentMethod: formData.paymentMethod,
        installments: formData.installments
      };

      console.log('Processando pagamento:', paymentData);

      // Simular delay do processamento
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simular sucesso (90% de chance)
      const success = Math.random() > 0.1;

      if (success) {
        // Limpar afiliado do localStorage após compra bem-sucedida
        localStorage.removeItem('affiliateId');
        
        // Redirecionar para página de sucesso
        router.push(`/checkout/sucesso?curso=${course.slug}&ref=${affiliateId || ''}`);
      } else {
        // Redirecionar para página de erro
        router.push(`/checkout/erro?curso=${course.slug}&ref=${affiliateId || ''}`);
      }

    } catch (error) {
      console.error('Erro no checkout:', error);
      router.push(`/checkout/erro?curso=${course.slug}&ref=${affiliateId || ''}`);
    } finally {
      setProcessing(false);
    }
  };

  const calculateInstallmentValue = () => {
    return (course.price / formData.installments).toFixed(2);
  };

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Carregando checkout...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className={styles.notFound}>
        <h1>Curso não encontrado</h1>
        <p>O curso que você está tentando comprar não foi encontrado.</p>
        <Link href="/cursos" className={styles.backBtn}>
          Voltar aos cursos
        </Link>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Cursos', href: '/cursos' },
    { label: course.title, href: `/cursos/${course.slug}` },
    { label: 'Checkout', href: '#', isLast: true }
  ];

  return (
    <div className={styles.checkoutPage}>
      <Breadcrumb customItems={breadcrumbItems} />

      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutLayout}>
          {/* Resumo do Pedido */}
          <div className={styles.orderSummary}>
            <h2>Resumo do Pedido</h2>
            
            <div className={styles.courseCard}>
              <img src={course.thumbnail} alt={course.title} className={styles.courseThumbnail} />
              <div className={styles.courseInfo}>
                <h3>{course.title}</h3>
                <p>Por: {course.instructor}</p>
                <div className={styles.courseDetails}>
                  <span>🕒 {course.duration}</span>
                  <span>📹 {course.lessons} aulas</span>
                </div>
              </div>
            </div>

            <div className={styles.priceBreakdown}>
              <div className={styles.priceRow}>
                <span>Preço original:</span>
                <span className={styles.originalPrice}>R$ {course.originalPrice}</span>
              </div>
              <div className={styles.priceRow}>
                <span>Desconto ({course.discount}%):</span>
                <span className={styles.discount}>-R$ {course.originalPrice - course.price}</span>
              </div>
              <div className={styles.priceRow + ' ' + styles.total}>
                <span>Total:</span>
                <span className={styles.finalPrice}>R$ {course.price}</span>
              </div>
            </div>

            <div className={styles.features}>
              <h4>Incluído no curso:</h4>
              <ul>
                {course.features.map((feature, index) => (
                  <li key={index}>✓ {feature}</li>
                ))}
              </ul>
            </div>

            {affiliateId && (
              <div className={styles.affiliateInfo}>
                <span className={styles.affiliateBadge}>
                  🤝 Compra via afiliado: {affiliateId}
                </span>
              </div>
            )}
          </div>

          {/* Formulário de Checkout */}
          <div className={styles.checkoutForm}>
            <h2>Finalizar Compra</h2>

            <form onSubmit={handleSubmit}>
              {/* Dados Pessoais */}
              <div className={styles.formSection}>
                <h3>Dados Pessoais</h3>
                
                <div className={styles.inputGroup}>
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? styles.error : ''}
                    placeholder="seu@email.com"
                  />
                  {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="name">Nome Completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? styles.error : ''}
                    placeholder="Seu nome completo"
                  />
                  {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
                </div>

                <div className={styles.inputRow}>
                  <div className={styles.inputGroup}>
                    <label htmlFor="phone">Telefone *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? styles.error : ''}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label htmlFor="document">CPF *</label>
                    <input
                      type="text"
                      id="document"
                      name="document"
                      value={formData.document}
                      onChange={handleInputChange}
                      className={errors.document ? styles.error : ''}
                      placeholder="000.000.000-00"
                    />
                    {errors.document && <span className={styles.errorMessage}>{errors.document}</span>}
                  </div>
                </div>
              </div>

              {/* Forma de Pagamento */}
              <div className={styles.formSection}>
                <h3>Forma de Pagamento</h3>
                
                <div className={styles.paymentMethods}>
                  <label className={styles.paymentOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="credit_card"
                      checked={formData.paymentMethod === 'credit_card'}
                      onChange={handleInputChange}
                    />
                    <span>💳 Cartão de Crédito</span>
                  </label>

                  <label className={styles.paymentOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="pix"
                      checked={formData.paymentMethod === 'pix'}
                      onChange={handleInputChange}
                    />
                    <span>📱 PIX (5% desconto)</span>
                  </label>

                  <label className={styles.paymentOption}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="boleto"
                      checked={formData.paymentMethod === 'boleto'}
                      onChange={handleInputChange}
                    />
                    <span>🧾 Boleto Bancário</span>
                  </label>
                </div>

                {formData.paymentMethod === 'credit_card' && (
                  <div className={styles.installments}>
                    <label htmlFor="installments">Parcelas</label>
                    <select
                      id="installments"
                      name="installments"
                      value={formData.installments}
                      onChange={handleInputChange}
                    >
                      <option value={1}>1x de R$ {course.price} (à vista)</option>
                      <option value={2}>2x de R$ {calculateInstallmentValue()}</option>
                      <option value={3}>3x de R$ {calculateInstallmentValue()}</option>
                      <option value={6}>6x de R$ {calculateInstallmentValue()}</option>
                      <option value={12}>12x de R$ {calculateInstallmentValue()}</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Cupom de Desconto */}
              <div className={styles.formSection}>
                <h3>Cupom de Desconto</h3>
                <div className={styles.couponGroup}>
                  <input
                    type="text"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleInputChange}
                    placeholder="Digite seu cupom"
                  />
                  <button type="button" className={styles.couponBtn}>
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Botão de Finalizar */}
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={processing}
              >
                {processing ? (
                  <>
                    <div className={styles.spinner}></div>
                    Processando...
                  </>
                ) : (
                  `Finalizar Compra - R$ ${course.price}`
                )}
              </button>

              <div className={styles.security}>
                <span>🔒 Compra 100% segura e protegida</span>
                <span>✓ 30 dias de garantia</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCurso;

