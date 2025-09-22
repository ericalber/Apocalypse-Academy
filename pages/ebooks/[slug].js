import React, { useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import PageHeader from '../../src/components/PageHeader';
import styles from '../../src/styles/EbookDetail.module.css';
import ebooks from '../../src/app/data/ebooks.json';
import Link from 'next/link';

const EbookDetail = ({ ebook }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = useMemo(() => {
    if (!ebook?.isFree) return false;
    return formData.name.trim() && formData.email.trim() && formData.phone.trim();
  }, [formData, ebook]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid) return;
    setSubmitted(true);
  };

  if (!ebook) {
    return null;
  }

  return (
    <Layout title={`${ebook.title} | eBooks`}>
      <PageHeader
        title={ebook.title}
        subtitle={ebook.description}
      />

      <div className={styles.detailWrapper}>
        <div className={styles.layout}>
          <div className={styles.coverColumn}>
            <div className={styles.coverWrapper}>
              <img src={ebook.coverImage} alt={ebook.title} />
            </div>
            <ul className={styles.metaList}>
              <li><strong>Páginas:</strong> {ebook.pages}</li>
              <li><strong>Categoria:</strong> {ebook.category}</li>
              <li><strong>Formato:</strong> PDF / EPUB</li>
            </ul>
          </div>

          <div className={styles.contentColumn}>
            <div className={styles.summaryBox}>
              <h2 className={styles.sectionTitle}>Sobre este e-book</h2>
              <p className={styles.summaryText}>{ebook.description}</p>
              {!ebook.isFree && (
                <p className={styles.pricingHint}>
                  Disponível integralmente para assinantes. Faça login com sua conta para baixar ou assine a plataforma para ter acesso imediato.
                </p>
              )}
            </div>

            {ebook.isFree ? (
              <div className={styles.leadCaptureBox}>
                <h3 className={styles.formTitle}>Baixe gratuitamente</h3>
                <p className={styles.formSubtitle}>
                  Informe seus dados para receber acesso imediato ao PDF e entrar para a lista de alertas proféticos.
                </p>

                {submitted ? (
                  <div className={styles.successBox}>
                    <p>Obrigado por se cadastrar! Clique abaixo para baixar o e-book.</p>
                    <a
                      href={ebook.downloadUrl || '#'}
                      className={styles.downloadLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Baixar PDF
                    </a>
                  </div>
                ) : (
                  <form className={styles.leadForm} onSubmit={handleSubmit}>
                    <label className={styles.formField}>
                      <span>Nome completo</span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Seu nome"
                        required
                      />
                    </label>
                    <label className={styles.formField}>
                      <span>E-mail</span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Seu melhor e-mail"
                        required
                      />
                    </label>
                    <label className={styles.formField}>
                      <span>Telefone</span>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="DDD + número"
                        required
                      />
                    </label>
                    <button type="submit" className={styles.submitButton} disabled={!isFormValid}>
                      Baixar e-book gratuito
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <div className={styles.paywallBox}>
                <h3 className={styles.formTitle}>Disponível para assinantes</h3>
                <p className={styles.formSubtitle}>
                  Este e-book faz parte da biblioteca exclusiva da Apocalypse Academy. Faça login ou assine para liberar o download imediato.
                </p>
                <div className={styles.paywallActions}>
                  <Link href="/assinar" className={styles.primaryAction}>Assinar agora</Link>
                  <Link href="/entrar" className={styles.secondaryAction}>Já sou assinante</Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths = () => {
  const paths = ebooks.map((ebook) => ({
    params: { slug: ebook.slug }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = ({ params }) => {
  const ebook = ebooks.find((item) => item.slug === params.slug) || null;

  return {
    props: {
      ebook
    }
  };
};

export default EbookDetail;
