/**
 * PaymentService - Camada de lógica de negócio para pagamentos
 * Coordena repositórios e implementa regras de negócio
 */

import PaymentRepository from '../repositories/PaymentRepository.js';
import UserRepository from '../repositories/UserRepository.js';

class PaymentService {
  constructor(paymentRepository = null, userRepository = null) {
    this.paymentRepository = paymentRepository || new PaymentRepository();
    this.userRepository = userRepository || new UserRepository();
  }

  /**
   * Processar nova assinatura
   */
  async processSubscription(userId, planId, paymentMethodData, couponCode = null) {
    try {
      // Validar usuário
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Validar plano
      const plan = await this.paymentRepository.findPlanById(planId);
      if (!plan) {
        throw new Error('Plano não encontrado');
      }

      // Verificar se já tem assinatura ativa
      const activeSubscription = await this.paymentRepository.findActiveSubscription(userId);
      if (activeSubscription) {
        throw new Error('Usuário já possui assinatura ativa');
      }

      // Calcular preço com desconto
      const pricing = await this.paymentRepository.calculatePrice(planId, couponCode);

      // Validar método de pagamento
      const paymentValidation = this.validatePaymentMethod(paymentMethodData);
      if (!paymentValidation.valid) {
        throw new Error(paymentValidation.message);
      }

      // Criar registro de pagamento
      const paymentData = {
        userId,
        type: 'subscription',
        status: 'pending',
        amount: pricing.finalPrice,
        currency: pricing.currency,
        plan: planId,
        billingCycle: plan.billingCycle,
        paymentMethod: paymentMethodData,
        stripePaymentId: `pi_mock_${Date.now()}`, // Em produção, usar Stripe real
        stripeCustomerId: `cus_mock_${userId}`,
        invoice: {
          number: this.generateInvoiceNumber(),
          url: `/invoices/${this.generateInvoiceNumber()}.pdf`
        },
        metadata: {
          source: 'website',
          affiliate: null,
          coupon: couponCode
        },
        nextBillingDate: this.calculateNextBillingDate(plan.billingCycle)
      };

      // Simular processamento do pagamento
      const processResult = await this.simulatePaymentProcessing(paymentData);
      
      if (processResult.success) {
        // Criar pagamento
        const payment = await this.paymentRepository.create({
          ...paymentData,
          status: 'completed',
          processedAt: new Date()
        });

        // Aplicar cupom se usado
        if (couponCode && pricing.couponApplied) {
          await this.paymentRepository.applyCoupon(couponCode);
        }

        // Atualizar assinatura do usuário
        await this.userRepository.update(userId, {
          subscription: {
            status: 'active',
            plan: planId,
            expiresAt: payment.nextBillingDate
          }
        });

        return {
          success: true,
          payment,
          message: 'Assinatura ativada com sucesso'
        };
      } else {
        // Pagamento falhou
        const failedPayment = await this.paymentRepository.create({
          ...paymentData,
          status: 'failed'
        });

        return {
          success: false,
          payment: failedPayment,
          message: processResult.message || 'Falha no processamento do pagamento'
        };
      }
    } catch (error) {
      return {
        success: false,
        payment: null,
        message: error.message
      };
    }
  }

  /**
   * Processar doação
   */
  async processDonation(userId, amount, paymentMethodData, message = null) {
    try {
      // Validar usuário (opcional para doações)
      if (userId) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
          throw new Error('Usuário não encontrado');
        }
      }

      // Validar valor mínimo
      if (amount < 5.00) {
        throw new Error('Valor mínimo para doação é R$ 5,00');
      }

      // Validar método de pagamento
      const paymentValidation = this.validatePaymentMethod(paymentMethodData);
      if (!paymentValidation.valid) {
        throw new Error(paymentValidation.message);
      }

      // Criar registro de doação
      const donationData = {
        userId: userId || null,
        type: 'donation',
        status: 'pending',
        amount,
        currency: 'BRL',
        plan: null,
        billingCycle: 'one_time',
        paymentMethod: paymentMethodData,
        stripePaymentId: `pi_donation_${Date.now()}`,
        stripeCustomerId: userId ? `cus_mock_${userId}` : null,
        invoice: {
          number: this.generateDonationNumber(),
          url: `/invoices/${this.generateDonationNumber()}.pdf`
        },
        metadata: {
          source: 'website',
          affiliate: null,
          coupon: null,
          message: message
        },
        nextBillingDate: null
      };

      // Simular processamento
      const processResult = await this.simulatePaymentProcessing(donationData);

      if (processResult.success) {
        const donation = await this.paymentRepository.create({
          ...donationData,
          status: 'completed',
          processedAt: new Date()
        });

        return {
          success: true,
          donation,
          message: 'Doação processada com sucesso'
        };
      } else {
        const failedDonation = await this.paymentRepository.create({
          ...donationData,
          status: 'failed'
        });

        return {
          success: false,
          donation: failedDonation,
          message: processResult.message || 'Falha no processamento da doação'
        };
      }
    } catch (error) {
      return {
        success: false,
        donation: null,
        message: error.message
      };
    }
  }

  /**
   * Cancelar assinatura
   */
  async cancelSubscription(userId, reason = null) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const activeSubscription = await this.paymentRepository.findActiveSubscription(userId);
      if (!activeSubscription) {
        throw new Error('Nenhuma assinatura ativa encontrada');
      }

      // Atualizar status da assinatura para cancelada
      await this.userRepository.update(userId, {
        subscription: {
          ...user.subscription,
          status: 'cancelled',
          cancelledAt: new Date(),
          cancelReason: reason
        }
      });

      // Em produção, cancelar no Stripe também
      // await stripe.subscriptions.del(activeSubscription.stripeSubscriptionId);

      return {
        success: true,
        message: 'Assinatura cancelada com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Renovar assinatura
   */
  async renewSubscription(userId) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const subscription = user.subscription;
      if (subscription.status === 'active' && new Date(subscription.expiresAt) > new Date()) {
        throw new Error('Assinatura ainda está ativa');
      }

      // Buscar último pagamento para obter dados do plano
      const lastPayment = await this.paymentRepository.findByUserId(userId, { 
        type: 'subscription', 
        limit: 1 
      });

      if (!lastPayment.length) {
        throw new Error('Nenhum histórico de pagamento encontrado');
      }

      const lastPlan = lastPayment[0].plan;
      const plan = await this.paymentRepository.findPlanById(lastPlan);

      // Processar renovação como nova assinatura
      return await this.processSubscription(userId, lastPlan, lastPayment[0].paymentMethod);
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Buscar histórico de pagamentos do usuário
   */
  async getUserPaymentHistory(userId, filters = {}) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const payments = await this.paymentRepository.findByUserId(userId, filters);

      return {
        success: true,
        payments,
        total: payments.length
      };
    } catch (error) {
      return {
        success: false,
        payments: [],
        message: error.message
      };
    }
  }

  /**
   * Validar cupom
   */
  async validateCoupon(code, planId = null) {
    try {
      const validation = await this.paymentRepository.validateCoupon(code, planId);
      
      return {
        success: validation.valid,
        coupon: validation.coupon || null,
        message: validation.message
      };
    } catch (error) {
      return {
        success: false,
        coupon: null,
        message: error.message
      };
    }
  }

  /**
   * Buscar planos disponíveis
   */
  async getAvailablePlans() {
    try {
      const plans = await this.paymentRepository.getSubscriptionPlans();

      return {
        success: true,
        plans
      };
    } catch (error) {
      return {
        success: false,
        plans: [],
        message: error.message
      };
    }
  }

  /**
   * Buscar estatísticas de pagamentos (admin)
   */
  async getPaymentStats(requestingUserId, filters = {}) {
    try {
      // Verificar permissão de admin
      const user = await this.userRepository.findById(requestingUserId);
      if (!user || user.role !== 'admin') {
        throw new Error('Acesso negado');
      }

      const stats = await this.paymentRepository.getPaymentStats(filters);

      return {
        success: true,
        stats
      };
    } catch (error) {
      return {
        success: false,
        stats: null,
        message: error.message
      };
    }
  }

  /**
   * Listar todos os pagamentos (admin)
   */
  async listAllPayments(requestingUserId, filters = {}) {
    try {
      // Verificar permissão de admin
      const user = await this.userRepository.findById(requestingUserId);
      if (!user || user.role !== 'admin') {
        throw new Error('Acesso negado');
      }

      const payments = await this.paymentRepository.findAll(filters);

      return {
        success: true,
        payments,
        total: payments.length
      };
    } catch (error) {
      return {
        success: false,
        payments: [],
        message: error.message
      };
    }
  }

  /**
   * Processar webhook do Stripe
   */
  async processWebhook(eventType, eventData) {
    try {
      switch (eventType) {
        case 'payment_intent.succeeded':
          return await this.handlePaymentSuccess(eventData);
        
        case 'payment_intent.payment_failed':
          return await this.handlePaymentFailure(eventData);
        
        case 'customer.subscription.deleted':
          return await this.handleSubscriptionCancellation(eventData);
        
        default:
          return {
            success: true,
            message: `Evento ${eventType} ignorado`
          };
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  // Métodos privados

  /**
   * Validar método de pagamento
   */
  validatePaymentMethod(paymentMethod) {
    if (!paymentMethod || !paymentMethod.type) {
      return { valid: false, message: 'Método de pagamento é obrigatório' };
    }

    if (paymentMethod.type === 'credit_card') {
      if (!paymentMethod.brand || !paymentMethod.last4) {
        return { valid: false, message: 'Dados do cartão incompletos' };
      }
    }

    if (paymentMethod.type === 'pix') {
      if (!paymentMethod.pixKey) {
        return { valid: false, message: 'Chave PIX é obrigatória' };
      }
    }

    return { valid: true };
  }

  /**
   * Simular processamento de pagamento
   */
  async simulatePaymentProcessing(paymentData) {
    // Simular delay de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simular falha em 5% dos casos
    const shouldFail = Math.random() < 0.05;

    if (shouldFail) {
      return {
        success: false,
        message: 'Cartão recusado pelo banco'
      };
    }

    return {
      success: true,
      transactionId: `txn_${Date.now()}`
    };
  }

  /**
   * Calcular próxima data de cobrança
   */
  calculateNextBillingDate(billingCycle) {
    const now = new Date();
    
    switch (billingCycle) {
      case 'monthly':
        return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
      
      case 'yearly':
        return new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
      
      default:
        return null;
    }
  }

  /**
   * Gerar número da fatura
   */
  generateInvoiceNumber() {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `INV-${year}${month}-${random}`;
  }

  /**
   * Gerar número da doação
   */
  generateDonationNumber() {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, '0');
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `DON-${year}${month}-${random}`;
  }

  /**
   * Lidar com sucesso do pagamento (webhook)
   */
  async handlePaymentSuccess(eventData) {
    try {
      const paymentId = eventData.payment_intent_id;
      await this.paymentRepository.updateStatus(paymentId, 'completed');

      return {
        success: true,
        message: 'Pagamento confirmado'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Lidar com falha do pagamento (webhook)
   */
  async handlePaymentFailure(eventData) {
    try {
      const paymentId = eventData.payment_intent_id;
      await this.paymentRepository.updateStatus(paymentId, 'failed', {
        failureReason: eventData.failure_reason
      });

      return {
        success: true,
        message: 'Falha de pagamento registrada'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }

  /**
   * Lidar com cancelamento de assinatura (webhook)
   */
  async handleSubscriptionCancellation(eventData) {
    try {
      const customerId = eventData.customer_id;
      // Encontrar usuário pelo customer_id e cancelar assinatura
      // Implementação específica dependeria da estrutura de dados

      return {
        success: true,
        message: 'Cancelamento processado'
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  }
}

export default PaymentService;

