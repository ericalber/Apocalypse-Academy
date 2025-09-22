import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import MemberLayout from '../../components/MemberLayout';
import styles from '../../styles/MemberCollections.module.css';

const DevotionalsDashboard = () => {
  const [selectedMood, setSelectedMood] = useState('Todos');

  const series = useMemo(() => (
    [
      {
        slug: 'preparacao-ultimos-dias',
        title: 'Preparando-se para os Últimos Dias',
        description: 'Meditações diárias com trilhas cinematográficas e roteiro guiado.',
        episodes: 7,
        duration: '15 min',
        cover: '/images/hero/slide-1.jpg',
        mood: 'Intenso'
      },
      {
        slug: 'profecias-tempo-real',
        title: 'Profecias em Tempo Real',
        description: 'Atualizações semanais com entrevistas e briengs proféticos.',
        episodes: 5,
        duration: '18 min',
        cover: '/poster-documentario-2.png',
        mood: 'Investigativo'
      },
      {
        slug: 'vigilia-sonora',
        title: 'Vigília Sonora',
        description: 'Ambientações para momentos de oração e guerra espiritual.',
        episodes: 10,
        duration: '12 min',
        cover: '/images/hero/slide-3.jpg',
        mood: 'Meditativo'
      },
      {
        slug: 'batalha-espiritual',
        title: 'Batalha Espiritual',
        description: 'Mantras proféticos com narrativas inspiradas em Movie UI Kit.',
        episodes: 6,
        duration: '14 min',
        cover: '/poster-curso-1.png',
        mood: 'Intenso'
      }
    ]
  ), []);

  const moods = ['Todos', 'Intenso', 'Meditativo', 'Investigativo'];

  const filteredSeries = useMemo(() => {
    if (selectedMood === 'Todos') {
      return series;
    }
    return series.filter((item) => item.mood === selectedMood);
  }, [selectedMood, series]);

  const featured = series[0];

  return (
    <MemberLayout
      pageTitle="Devocionais cinematográficos"
      pageSubtitle="Áudios imersivos com trilhas exclusivas, locução 3D e roteiros devocionais"
    >
      <section className={styles.pageIntro}>
        <div className={styles.introCopy}>
          <span className={styles.introHighlight}>Disponível em streaming</span>
          <h2 className={styles.introTitle}>{featured.title}</h2>
          <p className={styles.introText}>{featured.description}</p>
          <div className={styles.infoGrid}>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Episódios</span>
              <span className={styles.infoValue}>{featured.episodes}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Duração média</span>
              <span className={styles.infoValue}>{featured.duration}</span>
            </div>
            <div className={styles.infoCard}>
              <span className={styles.infoLabel}>Modo</span>
              <span className={styles.infoValue}>{featured.mood}</span>
            </div>
          </div>
          <Link href="/dashboard" className={styles.playButton}>
            Retornar ao painel
          </Link>
        </div>
        <div className={styles.introPoster}>
          <img src={featured.cover} alt={featured.title} />
        </div>
      </section>

      <section className={styles.filtersBar}>
        <div className={styles.filtersGroup}>
          {moods.map((mood) => (
            <button
              key={mood}
              type="button"
              onClick={() => setSelectedMood(mood)}
              className={
                selectedMood === mood
                  ? `${styles.filterChip} ${styles.filterChipActive}`
                  : styles.filterChip
              }
            >
              {mood}
            </button>
          ))}
        </div>
        <Link href="/devocionais/spotify" className={styles.playButton}>
          Conectar Spotify
        </Link>
      </section>

      <section className={styles.horizontalScroller}>
        {filteredSeries.map((item) => (
          <article key={item.slug} className={styles.collectionCard}>
            <div className={styles.collectionMedia}>
              <img src={item.cover} alt={item.title} />
              <span className={styles.collectionMeta}>{item.mood}</span>
            </div>
            <div className={styles.collectionBody}>
              <h3 className={styles.collectionTitle}>{item.title}</h3>
              <p className={styles.introText}>{item.description}</p>
              <div className={styles.collectionFooter}>
                <span>{item.episodes} episódios</span>
                <span>{item.duration}</span>
              </div>
              <Link href={`/dashboard/devocionais?play=${item.slug}`} className={styles.playButton}>
                Reproduzir série
              </Link>
            </div>
          </article>
        ))}
      </section>
    </MemberLayout>
  );
};

export default DevotionalsDashboard;
