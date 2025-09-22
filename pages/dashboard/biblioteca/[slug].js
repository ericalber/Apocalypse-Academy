import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import MemberLayout from '../../../components/MemberLayout';
import ebooksData from '../../../src/app/data/ebooks.json';
import styles from '../../../styles/MemberBookDetail.module.css';

const fallbackToc = ['Introdução', 'Capítulo 1', 'Capítulo 2', 'Capítulo 3', 'Conclusão'];

const tableOfContentsMap = {
  'preparacao-ultimos-dias': [
    'Prefácio: Por que nos preparar',
    'Capítulo 1: Fundamentos espirituais',
    'Capítulo 2: Estratégias práticas',
    'Capítulo 3: Preparação familiar',
    'Apêndice: Checklist final'
  ],
  'decifrando-daniel-apocalipse': [
    'Introdução aos livros proféticos',
    'Daniel: Estatutos e visões',
    'Apocalipse: Estrutura profética',
    'Conexões entre Daniel e Apocalipse',
    'Guia de estudo devocional'
  ],
  'sinais-tempos-checklist': [
    'Mapa dos sinais proféticos',
    'Sinais geopolíticos',
    'Sinais tecnológicos',
    'Sinais espirituais',
    'Checklist pessoal'
  ],
  'geopolitica-ultimos-dias': [
    'Panorama global',
    'Alianças estratégicas',
    'Mercados e profecia',
    'Roteiro dos eventos finais',
    'Perguntas para discussão'
  ],
  'arsenal-espiritual': [
    'Chamado para a vigília',
    'Ferramentas espirituais essenciais',
    'Disciplina e rotina',
    'Batalha e resistência',
    'Recursos complementares'
  ],
  'cronologia-profetica': [
    'Linha do tempo bíblica',
    'Eventos cumpridos',
    'O que ainda virá',
    'Cronogramas paralelos',
    'Guia de oração diária'
  ]
};

const EbookDetailPage = ({ ebook }) => {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toc = useMemo(() => tableOfContentsMap[ebook.slug] || fallbackToc, [ebook.slug]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <MemberLayout
      pageTitle="Biblioteca cinematográfica"
      pageSubtitle={`E-book exclusivo • ${ebook.title}`}
    >
      <Head>
        <title>{ebook.title} | Biblioteca Apocalypse Academy</title>
      </Head>

      <article className={styles.detailShell}>
        <div className={styles.artworkPanel}>
          <div className={styles.artworkFrame}>
            <img src={ebook.coverImage} alt={ebook.title} />
          </div>
        </div>

        <div className={styles.metaPanel}>
          <span className={styles.categoryTag}>{ebook.category}</span>
          <h1 className={styles.title}>{ebook.title}</h1>
          <p className={styles.synopsis}>{ebook.description}</p>

          <ul className={styles.metaList}>
            <li><strong>Páginas:</strong> {ebook.pages}</li>
            <li><strong>Disponibilidade:</strong> {ebook.isFree ? 'Download livre' : ebook.memberPrice}</li>
            {ebook.publicPrice && !ebook.isFree && (
              <li><strong>Preço público:</strong> {ebook.publicPrice}</li>
            )}
          </ul>

          <div className={styles.actionsRow}>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                setShowForm(true);
                setSubmitted(false);
              }}
            >
              Baixar
            </button>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.history.back();
                }
              }}
            >
              Voltar
            </button>
          </div>

          {showForm && (
            <div className={styles.formCard}>
              <h2>Receber e-book</h2>
              {submitted ? (
                <p className={styles.successMessage}>
                  Obrigado! Em breve nossa equipe enviará o arquivo para o contato informado.
                </p>
              ) : (
                <form className={styles.downloadForm} onSubmit={handleSubmit}>
                  <label>
                    Nome completo
                    <input type="text" name="name" required placeholder="Seu nome" />
                  </label>
                  <label>
                    E-mail
                    <input type="email" name="email" required placeholder="voce@email.com" />
                  </label>
                  <label>
                    Contato (WhatsApp ou telefone)
                    <input type="tel" name="phone" required placeholder="(00) 90000-0000" />
                  </label>
                  <button type="submit" className={styles.primaryButton}>
                    Enviar informações
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </article>

      <section className={styles.tocSection}>
        <h2>Índice</h2>
        <ol>
          {toc.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </MemberLayout>
  );
};

export async function getStaticPaths() {
  const paths = ebooksData.map((ebook) => ({
    params: { slug: ebook.slug }
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const ebook = ebooksData.find((item) => item.slug === params.slug);

  if (!ebook) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      ebook
    }
  };
}

export default EbookDetailPage;
