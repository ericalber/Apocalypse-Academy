/**
 * PaymentRepository - Camada de acesso a dados para pagamentos
 * Isola os dados mockados e expõe interface consistente
 */

class PaymentRepository {
  constructor(dataSource = null) {
    // Dados mockados - serão substituídos por banco real no futuro
    this.payments = dataSource || [
      {
        id: '1',
        userId: '1',
        type: 'subscription',
        status: 'completed',
        amount: 97.90,
        currency: 'BRL',
        plan: 'premium',
        billingCycle: 'monthly',
        paymentMethod: {
          type: 'credit_card',
          brand: 'visa',
          last4: '4242',
          expiryMonth: 12,
          expiryYear: 2025
        },
        stripePaymentId: 'pi_1234567890',
        stripeCustomerId: 'cus_1234567890',
        invoice: {
          number: 'INV-2024-001',
          url: '/invoices/INV-2024-001.pdf'
        },
        metadata: {
          source: 'website',
          affiliate: null,
          coupon: null
        },
        createdAt: new Date('2024-01-15'),
        processedAt: new Date('2024-01-15'),
        nextBillingDate: new Date('2024-02-15')
      },
      {
        id: '2',
        userId: '2',
        type: 'subscription',
        status: 'completed',
        amount: 47.90,
        currency: 'BRL',
        plan: 'basic',
        billingCycle: 'monthly',
        paymentMethod: {
          type: 'pix',
          pixKey: 'user@email.com'
        },
        stripePaymentId: 'pi_0987654321',
        stripeCustomerId: 'cus_0987654321',
        invoice: {
          number: 'INV-2024-002',
          url: '/invoices/INV-2024-002.pdf'
        },
        metadata: {
          source: 'mobile_app',
          affiliate: 'AFF001',
          coupon: 'DESCONTO30'
        },
        createdAt: new Date('2024-01-20'),
        processedAt: new Date('2024-01-20'),
        nextBillingDate: new Date('2024-02-20')
      },
      {
        id: '3',
        userId: '1',
        type: 'donation',
        status: 'completed',
        amount: 50.00,
        currency: 'BRL',
        plan: null,
        billingCycle: 'one_time',
        paymentMethod: {
          type: 'credit_card',
          brand: 'mastercard',
          last4: '5555',
          expiryMonth: 8,
          expiryYear: 2026
        },
        stripePaymentId: 'pi_donation_123',
        stripeCustomerId: 'cus_1234567890',
        invoice: {
          number: 'DON-2024-001',
          url: '/invoices/DON-2024-001.pdf'
        },
        metadata: {
          source: 'website',
          affiliate: null,
          coupon: null,
          message: 'Apoiando o projeto Apocalypse Academy'
        },
        createdAt: new Date('2024-02-01'),
        processedAt: new Date('2024-02-01'),
        nextBillingDate: null
      }
    ];

    this.subscriptionPlans = [
      {
        id: 'basic',
        name: 'Plano Básico',
        description: 'Acesso a conteúdo básico',
        price: 47.90,
        currency: 'BRL',
        billingCycle: 'monthly',
        features: [
          'Acesso a cursos básicos',
          'Suporte por email',
          'Certificados digitais'
        ],
        stripePriceId: 'price_basic_monthly',
        isActive: true
      },
      {
        id: 'premium',
        name: 'Plano Premium',
        description: 'Acesso completo a todo conteúdo',
        price: 97.90,
        currency: 'BRL',
        billingCycle: 'monthly',
        features: [
          'Acesso a todos os cursos',
          'Documentários exclusivos',
          'Suporte prioritário',
          'Certificados digitais',
          'Acesso antecipado a novos conteúdos'
        ],
        stripePriceId: 'price_premium_monthly',
        isActive: true
      },
      {
        id: 'annual',
        name: 'Plano Anual',
        description: 'Plano premium com desconto anual',
        price: 997.90,
        currency: 'BRL',
        billingCycle: 'yearly',
        originalPrice: 1174.80,
        discount: 15,
        features: [
          'Todos os benefícios do Premium',
          '15% de desconto',
          'Acesso vitalício a cursos concluídos',
          'Mentoria mensal em grupo'
        ],
        stripePriceId: 'price_premium_yearly',
        isActive: true
      }
    ];

    this.coupons = [
      {
        id: 'DESCONTO30',
        code: 'DESCONTO30',
        type: 'percentage',
        value: 30,
        description: '30% de desconto na primeira mensalidade',
        isActive: true,
        usageLimit: 100,
        usageCount: 15,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2024-12-31'),
        applicablePlans: ['basic', 'premium']
      },
      {
        id: 'BEMVINDO',
        code: 'BEMVINDO',
        type: 'fixed',
        value: 20.00,
        description: 'R$ 20 de desconto para novos usuários',
        isActive: true,
        usageLimit: 500,
        usageCount: 87,
        validFrom: new Date('2024-01-01'),
        validUntil: new Date('2024-06-30'),
        applicablePlans: ['basic', 'premium', 'annual']
      }
    ];
  }

  /**
   * Buscar pagamento por ID
   */
  async findById(id) {
    try {
      const payment = this.payments.find(p => p.id === id);
      return payment ? { ...payment } : null;
    } catch (error) {
      throw new Error(`Erro ao buscar pagamento por ID: ${error.message}`);
    }
  }

  /**
   * Buscar pagamentos por usuário
   */
  async findByUserId(userId, filters = {}) {
    try {
      let userPayments = this.payments.filter(p => p.userId === userId);

      // Filtro por tipo
      if (filters.type) {
        userPayments = userPayments.filter(p => p.type === filters.type);
      }

      // Filtro por status
      if (filters.status) {
        userPayments = userPayments.filter(p => p.status === filters.status);
      }

      // Ordenação por data (mais recente primeiro)
      userPayments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Paginação
      if (filters.page && filters.limit) {
        const start = (filters.page - 1) * filters.limit;
        const end = start + filters.limit;
        userPayments = userPayments.slice(start, end);
      }

      return userPayments.map(payment => ({ ...payment }));
    } catch (error) {
      throw new Error(`Erro ao buscar pagamentos do usuário: ${error.message}`);
    }
  }

  /**
   * Buscar pagamento ativo (assinatura)
   */
  async findActiveSubscription(userId) {
    try {
      const activePayment = this.payments.find(p => 
        p.userId === userId && 
        p.type === 'subscription' && 
        p.status === 'completed' &&
        p.nextBillingDate && 
        new Date(p.nextBillingDate) > new Date()
      );

      return activePayment ? { ...activePayment } : null;
    } catch (error) {
      throw new Error(`Erro ao buscar assinatura ativa: ${error.message}`);
    }
  }

  /**
   * Criar novo pagamento
   */
  async create(paymentData) {
    try {
      const newPayment = {
        id: Date.now().toString(),
        ...paymentData,
        createdAt: new Date(),
        processedAt: paymentData.status === 'completed' ? new Date() : null
      };

      this.payments.push(newPayment);
      return { ...newPayment };
    } catch (error) {
      throw new Error(`Erro ao criar pagamento: ${error.message}`);
    }
  }

  /**
   * Atualizar status do pagamento
   */
  async updateStatus(id, status, metadata = {}) {
    try {
      const paymentIndex = this.payments.findIndex(p => p.id === id);
      if (paymentIndex === -1) {
        throw new Error('Pagamento não encontrado');
      }

      const updatedPayment = {
        ...this.payments[paymentIndex],
        status,
        processedAt: status === 'completed' ? new Date() : this.payments[paymentIndex].processedAt,
        metadata: {
          ...this.payments[paymentIndex].metadata,
          ...metadata
        }
      };

      this.payments[paymentIndex] = updatedPayment;
      return { ...updatedPayment };
    } catch (error) {
      throw new Error(`Erro ao atualizar status do pagamento: ${error.message}`);
    }
  }

  /**
   * Buscar planos de assinatura
   */
  async getSubscriptionPlans() {
    try {
      return this.subscriptionPlans
        .filter(plan => plan.isActive)
        .map(plan => ({ ...plan }));
    } catch (error) {
      throw new Error(`Erro ao buscar planos: ${error.message}`);
    }
  }

  /**
   * Buscar plano por ID
   */
  async findPlanById(planId) {
    try {
      const plan = this.subscriptionPlans.find(p => p.id === planId);
      return plan ? { ...plan } : null;
    } catch (error) {
      throw new Error(`Erro ao buscar plano: ${error.message}`);
    }
  }

  /**
   * Validar cupom
   */
  async validateCoupon(code, planId = null) {
    try {
      const coupon = this.coupons.find(c => 
        c.code.toLowerCase() === code.toLowerCase() && c.isActive
      );

      if (!coupon) {
        return { valid: false, message: 'Cupom não encontrado' };
      }

      // Verificar data de validade
      const now = new Date();
      if (now < new Date(coupon.validFrom) || now > new Date(coupon.validUntil)) {
        return { valid: false, message: 'Cupom expirado' };
      }

      // Verificar limite de uso
      if (coupon.usageCount >= coupon.usageLimit) {
        return { valid: false, message: 'Cupom esgotado' };
      }

      // Verificar se é aplicável ao plano
      if (planId && !coupon.applicablePlans.includes(planId)) {
        return { valid: false, message: 'Cupom não aplicável a este plano' };
      }

      return { 
        valid: true, 
        coupon: { ...coupon },
        message: 'Cupom válido'
      };
    } catch (error) {
      throw new Error(`Erro ao validar cupom: ${error.message}`);
    }
  }

  /**
   * Aplicar cupom (incrementar uso)
   */
  async applyCoupon(code) {
    try {
      const couponIndex = this.coupons.findIndex(c => 
        c.code.toLowerCase() === code.toLowerCase()
      );

      if (couponIndex === -1) {
        throw new Error('Cupom não encontrado');
      }

      this.coupons[couponIndex].usageCount += 1;
      return { ...this.coupons[couponIndex] };
    } catch (error) {
      throw new Error(`Erro ao aplicar cupom: ${error.message}`);
    }
  }

  /**
   * Calcular preço com desconto
   */
  async calculatePrice(planId, couponCode = null) {
    try {
      const plan = await this.findPlanById(planId);
      if (!plan) {
        throw new Error('Plano não encontrado');
      }

      let finalPrice = plan.price;
      let discount = 0;
      let couponApplied = null;

      if (couponCode) {
        const couponValidation = await this.validateCoupon(couponCode, planId);
        if (couponValidation.valid) {
          const coupon = couponValidation.coupon;
          
          if (coupon.type === 'percentage') {
            discount = (plan.price * coupon.value) / 100;
          } else if (coupon.type === 'fixed') {
            discount = Math.min(coupon.value, plan.price);
          }

          finalPrice = plan.price - discount;
          couponApplied = coupon;
        }
      }

      return {
        originalPrice: plan.price,
        discount,
        finalPrice,
        couponApplied,
        currency: plan.currency
      };
    } catch (error) {
      throw new Error(`Erro ao calcular preço: ${error.message}`);
    }
  }

  /**
   * Buscar estatísticas de pagamentos
   */
  async getPaymentStats(filters = {}) {
    try {
      let payments = [...this.payments];

      // Filtro por período
      if (filters.startDate) {
        payments = payments.filter(p => new Date(p.createdAt) >= new Date(filters.startDate));
      }
      if (filters.endDate) {
        payments = payments.filter(p => new Date(p.createdAt) <= new Date(filters.endDate));
      }

      const totalRevenue = payments
        .filter(p => p.status === 'completed')
        .reduce((sum, p) => sum + p.amount, 0);

      const totalTransactions = payments.length;
      const completedTransactions = payments.filter(p => p.status === 'completed').length;
      const failedTransactions = payments.filter(p => p.status === 'failed').length;
      const pendingTransactions = payments.filter(p => p.status === 'pending').length;

      const subscriptions = payments.filter(p => p.type === 'subscription' && p.status === 'completed');
      const donations = payments.filter(p => p.type === 'donation' && p.status === 'completed');

      return {
        totalRevenue,
        totalTransactions,
        completedTransactions,
        failedTransactions,
        pendingTransactions,
        subscriptionRevenue: subscriptions.reduce((sum, p) => sum + p.amount, 0),
        donationRevenue: donations.reduce((sum, p) => sum + p.amount, 0),
        averageTransactionValue: totalRevenue / completedTransactions || 0
      };
    } catch (error) {
      throw new Error(`Erro ao buscar estatísticas: ${error.message}`);
    }
  }

  /**
   * Listar todos os pagamentos (admin)
   */
  async findAll(filters = {}) {
    try {
      let allPayments = [...this.payments];

      // Filtros
      if (filters.status) {
        allPayments = allPayments.filter(p => p.status === filters.status);
      }
      if (filters.type) {
        allPayments = allPayments.filter(p => p.type === filters.type);
      }
      if (filters.userId) {
        allPayments = allPayments.filter(p => p.userId === filters.userId);
      }

      // Ordenação
      allPayments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Paginação
      if (filters.page && filters.limit) {
        const start = (filters.page - 1) * filters.limit;
        const end = start + filters.limit;
        allPayments = allPayments.slice(start, end);
      }

      return allPayments.map(payment => ({ ...payment }));
    } catch (error) {
      throw new Error(`Erro ao listar pagamentos: ${error.message}`);
    }
  }
}

export default PaymentRepository;

