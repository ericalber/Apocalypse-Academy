// BILLING & PAYMENT SUITE - Sistema de Pagamentos e Assinaturas Completo
// Seguindo Guide Master - Preservando estrutura visual existente

import { useState, useEffect } from 'react';

// Configurações de pagamento
const PAYMENT_CONFIG = {
  currency: 'BRL',
  locale: 'pt-BR',
  taxRate: 0.0, // Sem impostos para produtos digitais
  processingFee: 0.0349, // 3.49% taxa do gateway
  pixDiscount: 0.05, // 5% desconto no PIX
  installmentLimit: 12,
  minInstallmentValue: 20.00
};

// Planos de assinatura
const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    name: 'Básico',
    description: 'Acesso a documentários e cursos básicos',
    price: 29.90,
    interval: 'monthly',
    features: [
      'Documentários em HD',
      'Cursos básicos',
      'Suporte por email',
      'Acesso mobile e desktop'
    ],
    popular: false,
    color: '#666666'
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Acesso completo + transmissões ao vivo',
    price: 49.90,
    interval: 'monthly',
    features: [
      'Documentários em 4K/6K',
      'Todos os cursos',
      'Transmissões ao vivo',
      'Revistas digitais',
      'Suporte prioritário',
      'Downloads offline'
    ],
    popular: true,
    color: '#E11D2E'
  },
  {
    id: 'annual_premium',
    name: 'Premium Anual',
    description: 'Premium com 2 meses grátis',
    price: 499.00,
    interval: 'yearly',
    monthlyEquivalent: 41.58,
    savings: 100.80,
    features: [
      'Todos os benefícios Premium',
      '2 meses grátis',
      'Acesso vitalício a cursos',
      'Certificados premium',
      'Mentoria exclusiva'
    ],
    popular: false,
    color: '#FFD700'
  }
];

// Produtos individuais
const INDIVIDUAL_PRODUCTS = [
  {
    id: 'course_escatologia',
    name: 'Escatologia Bíblica Avançada',
    description: 'Curso completo sobre os últimos tempos',
    price: 197.00,
    type: 'course',
    category: 'Cursos',
    image: '/images/courses/escatologia-cinematic.jpg',
    features: [
      '40 horas de conteúdo',
      'Certificado de conclusão',
      'Material em PDF',
      'Acesso vitalício'
    ]
  },
  {
    id: 'course_preparacao',
    name: 'Preparação para os Tempos Finais',
    description: 'Guia prático de preparação espiritual',
    price: 147.00,
    type: 'course',
    category: 'Cursos',
    image: '/images/courses/preparacao-final.jpg',
    features: [
      '25 horas de conteúdo',
      'Guias práticos',
      'Comunidade exclusiva',
      'Suporte do instrutor'
    ]
  },
  {
    id: 'magazine_bundle',
    name: 'Pacote Revistas Digitais',
    description: 'Todas as revistas do ano',
    price: 97.00,
    type: 'magazine',
    category: 'Revistas',
    image: '/images/magazines/bundle-2024.jpg',
    features: [
      '12 edições anuais',
      'Formato PDF e ePub',
      'Conteúdo exclusivo',
      'Atualizações automáticas'
    ]
  }
];

// Métodos de pagamento
const PAYMENT_METHODS = [
  {
    id: 'credit_card',
    name: 'Cartão de Crédito',
    icon: '💳',
    description: 'Visa, Mastercard, Elo, Amex',
    installments: true,
    processing: 'instant',
    fees: PAYMENT_CONFIG.processingFee
  },
  {
    id: 'debit_card',
    name: 'Cartão de Débito',
    icon: '💳',
    description: 'Débito à vista',
    installments: false,
    processing: 'instant',
    fees: PAYMENT_CONFIG.processingFee
  },
  {
    id: 'pix',
    name: 'PIX',
    icon: '🔄',
    description: 'Pagamento instantâneo',
    installments: false,
    processing: 'instant',
    fees: 0,
    discount: PAYMENT_CONFIG.pixDiscount
  },
  {
    id: 'boleto',
    name: 'Boleto Bancário',
    icon: '🏦',
    description: 'Vencimento em 3 dias úteis',
    installments: false,
    processing: '1-3 days',
    fees: 0
  },
  {
    id: 'paypal',
    name: 'PayPal',
    icon: '🅿️',
    description: 'Conta PayPal ou cartão',
    installments: false,
    processing: 'instant',
    fees: 0.0449
  }
];

// Classe principal do Billing & Payment Suite
export class BillingPaymentSuite {
  constructor() {
    this.cart = this.loadCart();
    this.currentOrder = null;
    this.paymentMethods = PAYMENT_METHODS;
    this.subscriptionPlans = SUBSCRIPTION_PLANS;
    this.products = INDIVIDUAL_PRODUCTS;
    this.loading = false;
  }

  // Carregar carrinho do localStorage
  loadCart() {
    try {
      const saved = localStorage.getItem('apocalypse_cart');
      return saved ? JSON.parse(saved) : { items: [], total: 0, discount: 0 };
    } catch {
      return { items: [], total: 0, discount: 0 };
    }
  }

  // Salvar carrinho no localStorage
  saveCart() {
    localStorage.setItem('apocalypse_cart', JSON.stringify(this.cart));
  }

  // Adicionar item ao carrinho
  addToCart(productId, quantity = 1, planInterval = null) {
    const product = this.findProduct(productId);
    if (!product) throw new Error('Produto não encontrado');

    const existingItem = this.cart.items.find(item => 
      item.productId === productId && item.planInterval === planInterval
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        planInterval,
        type: product.type || 'product',
        image: product.image
      });
    }

    this.calculateTotal();
    this.saveCart();
    return this.cart;
  }

  // Remover item do carrinho
  removeFromCart(productId, planInterval = null) {
    this.cart.items = this.cart.items.filter(item => 
      !(item.productId === productId && item.planInterval === planInterval)
    );
    
    this.calculateTotal();
    this.saveCart();
    return this.cart;
  }

  // Atualizar quantidade
  updateQuantity(productId, quantity, planInterval = null) {
    const item = this.cart.items.find(item => 
      item.productId === productId && item.planInterval === planInterval
    );

    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(productId, planInterval);
      }
      item.quantity = quantity;
      this.calculateTotal();
      this.saveCart();
    }

    return this.cart;
  }

  // Aplicar cupom de desconto
  applyCoupon(couponCode) {
    const coupons = {
      'APOCALYPSE10': { type: 'percentage', value: 0.10, description: '10% de desconto' },
      'PRIMEIRA20': { type: 'percentage', value: 0.20, description: '20% de desconto primeira compra' },
      'PREMIUM50': { type: 'fixed', value: 50.00, description: 'R$ 50 de desconto' },
      'BLACKFRIDAY': { type: 'percentage', value: 0.30, description: '30% Black Friday' }
    };

    const coupon = coupons[couponCode.toUpperCase()];
    if (!coupon) {
      throw new Error('Cupom inválido ou expirado');
    }

    this.cart.coupon = coupon;
    this.cart.couponCode = couponCode.toUpperCase();
    this.calculateTotal();
    this.saveCart();

    return {
      success: true,
      message: `Cupom aplicado: ${coupon.description}`,
      discount: this.cart.discount
    };
  }

  // Remover cupom
  removeCoupon() {
    delete this.cart.coupon;
    delete this.cart.couponCode;
    this.calculateTotal();
    this.saveCart();
    return this.cart;
  }

  // Calcular total do carrinho
  calculateTotal() {
    let subtotal = this.cart.items.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);

    let discount = 0;

    // Aplicar desconto do cupom
    if (this.cart.coupon) {
      if (this.cart.coupon.type === 'percentage') {
        discount = subtotal * this.cart.coupon.value;
      } else {
        discount = Math.min(this.cart.coupon.value, subtotal);
      }
    }

    this.cart.subtotal = subtotal;
    this.cart.discount = discount;
    this.cart.total = Math.max(0, subtotal - discount);

    return this.cart;
  }

  // Calcular parcelas
  calculateInstallments(amount, method = 'credit_card') {
    if (method !== 'credit_card') return [];

    const installments = [];
    const maxInstallments = Math.min(
      PAYMENT_CONFIG.installmentLimit,
      Math.floor(amount / PAYMENT_CONFIG.minInstallmentValue)
    );

    for (let i = 1; i <= maxInstallments; i++) {
      const installmentValue = amount / i;
      const totalWithInterest = i > 6 ? amount * (1 + (i - 6) * 0.02) : amount;
      const installmentWithInterest = totalWithInterest / i;

      installments.push({
        number: i,
        value: installmentValue,
        valueWithInterest: installmentWithInterest,
        total: totalWithInterest,
        hasInterest: i > 6,
        interestRate: i > 6 ? (i - 6) * 2 : 0
      });
    }

    return installments;
  }

  // Calcular desconto PIX
  calculatePixDiscount(amount) {
    const discount = amount * PAYMENT_CONFIG.pixDiscount;
    return {
      originalAmount: amount,
      discount: discount,
      finalAmount: amount - discount,
      discountPercentage: PAYMENT_CONFIG.pixDiscount * 100
    };
  }

  // Processar pagamento
  async processPayment(paymentData) {
    try {
      this.loading = true;

      // Validar dados de pagamento
      this.validatePaymentData(paymentData);

      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Gerar ID do pedido
      const orderId = `APO${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Criar pedido
      const order = {
        id: orderId,
        items: [...this.cart.items],
        subtotal: this.cart.subtotal,
        discount: this.cart.discount,
        total: this.cart.total,
        paymentMethod: paymentData.method,
        paymentData: this.sanitizePaymentData(paymentData),
        status: this.getInitialStatus(paymentData.method),
        createdAt: new Date().toISOString(),
        customer: paymentData.customer,
        affiliateCode: paymentData.affiliateCode || null
      };

      // Salvar pedido
      this.saveOrder(order);

      // Limpar carrinho
      this.clearCart();

      // Processar afiliação se houver
      if (paymentData.affiliateCode) {
        await this.processAffiliateCommission(order);
      }

      this.currentOrder = order;
      return {
        success: true,
        order: order,
        redirectUrl: this.getRedirectUrl(order)
      };

    } catch (error) {
      throw error;
    } finally {
      this.loading = false;
    }
  }

  // Validar dados de pagamento
  validatePaymentData(data) {
    if (!data.method) throw new Error('Método de pagamento obrigatório');
    if (!data.customer) throw new Error('Dados do cliente obrigatórios');
    if (!data.customer.email) throw new Error('Email obrigatório');
    if (!data.customer.name) throw new Error('Nome obrigatório');

    if (data.method === 'credit_card' || data.method === 'debit_card') {
      if (!data.card) throw new Error('Dados do cartão obrigatórios');
      if (!data.card.number) throw new Error('Número do cartão obrigatório');
      if (!data.card.cvv) throw new Error('CVV obrigatório');
      if (!data.card.expiry) throw new Error('Data de validade obrigatória');
      if (!data.card.holderName) throw new Error('Nome do portador obrigatório');
    }

    return true;
  }

  // Sanitizar dados de pagamento (remover informações sensíveis)
  sanitizePaymentData(data) {
    const sanitized = { ...data };
    
    if (sanitized.card) {
      sanitized.card = {
        ...sanitized.card,
        number: `****-****-****-${sanitized.card.number.slice(-4)}`,
        cvv: '***'
      };
    }

    return sanitized;
  }

  // Status inicial baseado no método de pagamento
  getInitialStatus(method) {
    switch (method) {
      case 'credit_card':
      case 'debit_card':
      case 'pix':
      case 'paypal':
        return 'approved';
      case 'boleto':
        return 'pending';
      default:
        return 'processing';
    }
  }

  // URL de redirecionamento após pagamento
  getRedirectUrl(order) {
    const baseUrl = '/checkout';
    
    switch (order.status) {
      case 'approved':
        return `${baseUrl}/sucesso?order=${order.id}`;
      case 'pending':
        return `${baseUrl}/pendente?order=${order.id}`;
      case 'rejected':
        return `${baseUrl}/erro?order=${order.id}`;
      default:
        return `${baseUrl}/processando?order=${order.id}`;
    }
  }

  // Salvar pedido
  saveOrder(order) {
    const orders = this.getOrders();
    orders.push(order);
    localStorage.setItem('apocalypse_orders', JSON.stringify(orders));
  }

  // Obter pedidos
  getOrders() {
    try {
      const saved = localStorage.getItem('apocalypse_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  // Obter pedido por ID
  getOrder(orderId) {
    const orders = this.getOrders();
    return orders.find(order => order.id === orderId);
  }

  // Processar comissão de afiliado
  async processAffiliateCommission(order) {
    try {
      const commissionRate = 0.30; // 30% de comissão
      const commission = order.total * commissionRate;

      const affiliateTransaction = {
        id: `AFF${Date.now()}`,
        orderId: order.id,
        affiliateCode: order.affiliateCode,
        commission: commission,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Salvar transação de afiliado
      const transactions = this.getAffiliateTransactions();
      transactions.push(affiliateTransaction);
      localStorage.setItem('apocalypse_affiliate_transactions', JSON.stringify(transactions));

      return affiliateTransaction;
    } catch (error) {
      console.error('Erro ao processar comissão de afiliado:', error);
    }
  }

  // Obter transações de afiliado
  getAffiliateTransactions() {
    try {
      const saved = localStorage.getItem('apocalypse_affiliate_transactions');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  // Limpar carrinho
  clearCart() {
    this.cart = { items: [], total: 0, discount: 0 };
    localStorage.removeItem('apocalypse_cart');
  }

  // Encontrar produto
  findProduct(productId) {
    // Procurar em planos de assinatura
    let product = this.subscriptionPlans.find(plan => plan.id === productId);
    if (product) return product;

    // Procurar em produtos individuais
    product = this.products.find(prod => prod.id === productId);
    return product;
  }

  // Gerar relatório de vendas
  generateSalesReport(startDate, endDate) {
    const orders = this.getOrders().filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(startDate) && orderDate <= new Date(endDate);
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = orders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const paymentMethodStats = {};
    orders.forEach(order => {
      const method = order.paymentMethod;
      if (!paymentMethodStats[method]) {
        paymentMethodStats[method] = { count: 0, revenue: 0 };
      }
      paymentMethodStats[method].count++;
      paymentMethodStats[method].revenue += order.total;
    });

    return {
      period: { startDate, endDate },
      totalRevenue,
      totalOrders,
      averageOrderValue,
      paymentMethodStats,
      orders
    };
  }

  // Webhook para atualização de status
  async handleWebhook(webhookData) {
    try {
      const order = this.getOrder(webhookData.orderId);
      if (!order) throw new Error('Pedido não encontrado');

      // Atualizar status do pedido
      order.status = webhookData.status;
      order.updatedAt = new Date().toISOString();

      if (webhookData.transactionId) {
        order.transactionId = webhookData.transactionId;
      }

      // Salvar atualização
      const orders = this.getOrders();
      const index = orders.findIndex(o => o.id === order.id);
      if (index !== -1) {
        orders[index] = order;
        localStorage.setItem('apocalypse_orders', JSON.stringify(orders));
      }

      // Se aprovado, processar benefícios
      if (webhookData.status === 'approved') {
        await this.grantAccess(order);
      }

      return { success: true, order };
    } catch (error) {
      console.error('Erro no webhook:', error);
      throw error;
    }
  }

  // Conceder acesso após pagamento aprovado
  async grantAccess(order) {
    try {
      // Simular concessão de acesso
      console.log(`Acesso concedido para pedido: ${order.id}`);
      
      // Em produção, atualizaria permissões do usuário
      // Enviaria emails de confirmação
      // Ativaria assinaturas
      
      return { success: true };
    } catch (error) {
      console.error('Erro ao conceder acesso:', error);
      throw error;
    }
  }
}

// Instância singleton
export const billingPaymentSuite = new BillingPaymentSuite();

// Hook React para usar o Billing & Payment Suite
export const useBillingPayment = () => {
  const [cart, setCart] = useState(billingPaymentSuite.cart);
  const [loading, setLoading] = useState(billingPaymentSuite.loading);

  useEffect(() => {
    // Listener para mudanças no carrinho
    const updateCart = () => {
      setCart({ ...billingPaymentSuite.cart });
      setLoading(billingPaymentSuite.loading);
    };

    const interval = setInterval(updateCart, 100);
    return () => clearInterval(interval);
  }, []);

  return {
    cart,
    loading,
    subscriptionPlans: billingPaymentSuite.subscriptionPlans,
    products: billingPaymentSuite.products,
    paymentMethods: billingPaymentSuite.paymentMethods,
    addToCart: billingPaymentSuite.addToCart.bind(billingPaymentSuite),
    removeFromCart: billingPaymentSuite.removeFromCart.bind(billingPaymentSuite),
    updateQuantity: billingPaymentSuite.updateQuantity.bind(billingPaymentSuite),
    applyCoupon: billingPaymentSuite.applyCoupon.bind(billingPaymentSuite),
    removeCoupon: billingPaymentSuite.removeCoupon.bind(billingPaymentSuite),
    calculateInstallments: billingPaymentSuite.calculateInstallments.bind(billingPaymentSuite),
    calculatePixDiscount: billingPaymentSuite.calculatePixDiscount.bind(billingPaymentSuite),
    processPayment: billingPaymentSuite.processPayment.bind(billingPaymentSuite),
    getOrder: billingPaymentSuite.getOrder.bind(billingPaymentSuite),
    getOrders: billingPaymentSuite.getOrders.bind(billingPaymentSuite),
    clearCart: billingPaymentSuite.clearCart.bind(billingPaymentSuite)
  };
};

export default billingPaymentSuite;

