import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';
import styles from '../styles/Apoie.module.css';

const Apoie = () => {
  const { user, isAuthenticated } = useAuth();
  const [donationType, setDonationType] = useState('single');
  const [amount, setAmount] = useState('50');
  const [customAmount, setCustomAmount] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState(user?.name || '');
  const [isProcessing, setIsProcessing] = useState(false);

  const predefinedAmounts = [
    { value: '25', label: 'R$ 25' },
    { value: '50', label: 'R$ 50' },
    { value: '100', label: 'R$ 100' },
    { value: '200', label: 'R$ 200' }
  ];

  const handleDonation = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const finalAmount = amount === 'custom' ? customAmount : amount;
      
      // Simular processamento de pagamento
      console.log('Processando doação:', {
        type: donationType,
        amount: finalAmount,
        email,
        name,
        userId: user?.id
      });

      // Aqui seria integrado com Stripe/PayPal
      setTimeout(() => {
        alert(`Obrigado pela sua doação de R$ ${finalAmount}! Um recibo foi enviado para ${email}`);
        setIsProcessing(false);
      }, 2000);

    } catch (error) {
      console.error('Erro ao processar doação:', error);
      alert('Erro ao processar doação. Tente novamente.');
      setIsProcessing(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Apoie a Missão da Apocalypse Academy
            </h1>
            <p className={styles.heroSubtitle}>
              Sua contribuição nos ajuda a continuar produzindo conteúdo profético de qualidade 
              e a expandir nossa missão de preparar uma geração consciente para os últimos tempos.
            </p>
          </div>
        </section>

        {/* Donation Form */}
        <section className={styles.donationSection}>
          <div className={styles.donationContainer}>
            <div className={styles.donationCard}>
              <h2 className={styles.cardTitle}>Faça sua Doação</h2>
              
              <form onSubmit={handleDonation} className={styles.donationForm}>
                {/* Tipo de Doação */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Tipo de Doação</label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="single"
                        checked={donationType === 'single'}
                        onChange={(e) => setDonationType(e.target.value)}
                      />
                      <span>Doação Única</span>
                    </label>
                    <label className={styles.radioLabel}>
                      <input
                        type="radio"
                        value="monthly"
                        checked={donationType === 'monthly'}
                        onChange={(e) => setDonationType(e.target.value)}
                      />
                      <span>Doação Mensal</span>
                    </label>
                  </div>
                </div>

                {/* Valor da Doação */}
                <div className={styles.formGroup}>
                  <label className={styles.label}>Valor da Doação</label>
                  <div className={styles.amountGrid}>
                    {predefinedAmounts.map((preset) => (
                      <label key={preset.value} className={styles.amountLabel}>
                        <input
                          type="radio"
                          value={preset.value}
                          checked={amount === preset.value}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <span className={styles.amountButton}>
                          {preset.label}
                        </span>
                      </label>
                    ))}
                    <label className={styles.amountLabel}>
                      <input
                        type="radio"
                        value="custom"
                        checked={amount === 'custom'}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                      <span className={styles.amountButton}>
                        Outro valor
                      </span>
                    </label>
                  </div>
                  
                  {amount === 'custom' && (
                    <input
                      type="number"
                      placeholder="Digite o valor em R$"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className={styles.customAmountInput}
                      min="5"
                      required
                    />
                  )}
                </div>

                {/* Dados do Doador */}
                {!isAuthenticated && (
                  <>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Nome Completo</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        required
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>E-mail</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                      />
                    </div>
                  </>
                )}

                {/* Botão de Doação */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className={styles.donateButton}
                >
                  {isProcessing ? 'Processando...' : 
                   `Doar R$ ${amount === 'custom' ? customAmount || '0' : amount} ${donationType === 'monthly' ? '/mês' : ''}`}
                </button>
              </form>
            </div>

            {/* Informações Adicionais */}
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Por que sua doação é importante?</h3>
              <ul className={styles.infoList}>
                <li>🎬 Produção de documentários em 4K/6K</li>
                <li>📚 Desenvolvimento de cursos exclusivos</li>
                <li>📖 Criação de revistas e eBooks</li>
                <li>🌐 Manutenção da plataforma</li>
                <li>🎯 Expansão do alcance da missão</li>
              </ul>
              
              <div className={styles.securityInfo}>
                <h4>🔒 Segurança Garantida</h4>
                <p>Todas as transações são processadas com criptografia SSL e através de provedores de pagamento certificados.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Apoie;

