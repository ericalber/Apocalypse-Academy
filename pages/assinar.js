import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import styles from '../src/styles/Assinar.module.css';

const plans = [
  {
    title: 'Plano Sentinel',
    price: 'R$ 29,90/mês',
    description: 'Para quem deseja acompanhar as notícias e documentários com profundidade semanal.',
    features: [
      'Acesso a todos os documentários exclusivos em 4K',
      'Notícias e dossiês com curadoria profética',
      'Revistas digitais mensais',
      'Comunidade fechada no Telegram'
    ]
  },
  {
    title: 'Plano Remanescente',
    price: 'R$ 49,90/mês',
    description: 'Experiência completa com treinamentos, materiais complementares e encontros ao vivo.',
    features: [
      'Tudo do Plano Sentinel',
      'Cursos completos e mentorias com professores convidados',
      'Downloads ilimitados de eBooks e materiais anexos',
      'Eventos ao vivo mensais e bastidores das produções'
    ]
  }
];

const AssinarPage = () => {
  return (
    <Layout>
      <div className={styles.pageContainer}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Assine a Apocalypse Academy</h1>
          <p className={styles.heroSubtitle}>
            Desbloqueie documentários, cursos, e-books e conteúdos ao vivo com apoio cinematográfico no estilo Brasil Paralelo.
          </p>
          <Link href="/entrar" className={styles.secondaryLink}>
            Já sou assinante →
          </Link>
        </header>

        <div className={styles.planGrid}>
          {plans.map((plan) => (
            <article key={plan.title} className={styles.planCard}>
              <h2 className={styles.planTitle}>{plan.title}</h2>
              <div className={styles.planPrice}>{plan.price}</div>
              <p className={styles.planDescription}>{plan.description}</p>
              <ul className={styles.featureList}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span>✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/checkout" className={styles.primaryButton}>
                Assinar agora
              </Link>
            </article>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AssinarPage;
