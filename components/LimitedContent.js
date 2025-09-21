import React from 'react';
import Link from 'next/link';
import styles from '../styles/LimitedContent.module.css';

const LimitedContent = ({ isAuthenticated }) => {
  return (
    <div className={styles.limitedContent}>
      {/* Documentários - Apenas um destaque */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            🎬 Documentários em Destaque
          </h2>
          <p className={styles.sectionSubtitle}>
            Conteúdo cinematográfico revelando os sinais dos tempos que estão se cumprindo
          </p>
          
          <div className={styles.documentaryHighlight}>
            <div className={styles.documentaryCard}>
              <div className={styles.cardImage}>
                <img src="/images/documentaries/final-events-preview.jpg" alt="Os Eventos Finais da Profecia Bíblica" />
                <div className={styles.qualityBadge}>4K</div>
                <div className={styles.lockOverlay}>
                  <div className={styles.lockIcon}>🔒</div>
                </div>
              </div>
              <div className={styles.cardContent}>
                <h3>Os Eventos Finais da Profecia Bíblica</h3>
                <p>Uma análise profunda dos sinais dos tempos e das profecias que se cumprem diante dos nossos olhos.</p>
                <div className={styles.cardMeta}>
                  <span>⏱️ 2h 15min</span>
                  <span>⭐ 4.9</span>
                  <span>🎯 PROFECIA</span>
                </div>
                <Link href="/assinar" className={styles.ctaButton}>
                  Assinar para Assistir
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos - Faixa reduzida */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            📚 Cursos Exclusivos
          </h2>
          <p className={styles.sectionSubtitle}>
            Aprofunde seu conhecimento com nossos cursos exclusivos sobre escatologia, geopolítica e guerra cultural
          </p>
          
          <div className={styles.coursesGrid}>
            <div className={styles.courseCard}>
              <div className={styles.courseImage}>
                <img src="/images/courses/escatologia-preview.jpg" alt="Escatologia Bíblica" />
                <div className={styles.lockOverlay}>
                  <div className={styles.lockIcon}>🔒</div>
                </div>
              </div>
              <div className={styles.courseContent}>
                <h4>Escatologia Bíblica Avançada</h4>
                <p>Estudo completo sobre os últimos tempos</p>
                <div className={styles.coursePrice}>R$ 197</div>
                <Link href="/assinar" className={styles.ctaButtonSmall}>
                  Assinar para Acessar
                </Link>
              </div>
            </div>

            <div className={styles.courseCard}>
              <div className={styles.courseImage}>
                <img src="/images/courses/geopolitica-preview.jpg" alt="Geopolítica Profética" />
                <div className={styles.lockOverlay}>
                  <div className={styles.lockIcon}>🔒</div>
                </div>
              </div>
              <div className={styles.courseContent}>
                <h4>Geopolítica Profética</h4>
                <p>Análise das nações no cenário profético</p>
                <div className={styles.coursePrice}>R$ 147</div>
                <Link href="/assinar" className={styles.ctaButtonSmall}>
                  Assinar para Acessar
                </Link>
              </div>
            </div>

            <div className={styles.courseCard}>
              <div className={styles.courseImage}>
                <img src="/images/courses/guerra-cultural-preview.jpg" alt="Guerra Cultural" />
                <div className={styles.lockOverlay}>
                  <div className={styles.lockIcon}>🔒</div>
                </div>
              </div>
              <div className={styles.courseContent}>
                <h4>Guerra Cultural</h4>
                <p>Entendendo a batalha ideológica atual</p>
                <div className={styles.coursePrice}>R$ 97</div>
                <Link href="/assinar" className={styles.ctaButtonSmall}>
                  Assinar para Acessar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revistas - Seção completa com valores */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            📖 Revistas Digitais
          </h2>
          <p className={styles.sectionSubtitle}>
            Publicações exclusivas com análises proféticas e geopolíticas atuais
          </p>
          
          <div className={styles.magazinesGrid}>
            <div className={styles.magazineCard}>
              <div className={styles.magazineImage}>
                <img src="/images/magazines/sinais-tempos.jpg" alt="Sinais dos Tempos" />
                <div className={styles.newBadge}>NOVA</div>
              </div>
              <div className={styles.magazineContent}>
                <h4>Sinais dos Tempos - Ed. 12</h4>
                <p>Análise profética dos eventos atuais</p>
                <div className={styles.priceInfo}>
                  <div className={styles.publicPrice}>
                    <span className={styles.priceLabel}>Preço público:</span>
                    <span className={styles.price}>R$ 19,90</span>
                  </div>
                  <div className={styles.memberDiscount}>
                    <span className={styles.discountLabel}>Assinantes:</span>
                    <span className={styles.discountPrice}>30% OFF</span>
                  </div>
                </div>
                <div className={styles.magazineActions}>
                  <Link href="/revistas/12" className={styles.buyButton}>
                    Comprar por R$ 19,90
                  </Link>
                  <Link href="/assinar" className={styles.subscribeButton}>
                    Assinar e Economizar
                  </Link>
                </div>
              </div>
            </div>

            <div className={styles.magazineCard}>
              <div className={styles.magazineImage}>
                <img src="/images/magazines/geopolitica-profetica.jpg" alt="Geopolítica Profética" />
              </div>
              <div className={styles.magazineContent}>
                <h4>Geopolítica Profética - Ed. 11</h4>
                <p>O posicionamento das nações nos últimos dias</p>
                <div className={styles.priceInfo}>
                  <div className={styles.publicPrice}>
                    <span className={styles.priceLabel}>Preço público:</span>
                    <span className={styles.price}>R$ 19,90</span>
                  </div>
                  <div className={styles.memberDiscount}>
                    <span className={styles.discountLabel}>Assinantes:</span>
                    <span className={styles.discountPrice}>30% OFF</span>
                  </div>
                </div>
                <div className={styles.magazineActions}>
                  <Link href="/revistas/11" className={styles.buyButton}>
                    Comprar por R$ 19,90
                  </Link>
                  <Link href="/assinar" className={styles.subscribeButton}>
                    Assinar e Economizar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* eBooks - Catálogo resumido */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            📚 eBooks Exclusivos
          </h2>
          <p className={styles.sectionSubtitle}>
            Biblioteca digital com conteúdo aprofundado sobre os últimos tempos
          </p>
          
          <div className={styles.ebooksGrid}>
            <div className={styles.ebookCard}>
              <div className={styles.ebookImage}>
                <img src="/images/ebooks/preparacao-final.jpg" alt="Preparação Final" />
                <div className={styles.freeBadge}>GRÁTIS</div>
              </div>
              <div className={styles.ebookContent}>
                <h4>Preparação para os Tempos Finais</h4>
                <p>Guia prático de preparação espiritual</p>
                <div className={styles.ebookPrice}>
                  <span className={styles.exclusiveLabel}>Exclusivo para assinantes</span>
                </div>
                <Link href="/assinar" className={styles.ctaButtonSmall}>
                  Assinar para Baixar
                </Link>
              </div>
            </div>

            <div className={styles.ebookCard}>
              <div className={styles.ebookImage}>
                <img src="/images/ebooks/daniel-revelado.jpg" alt="Daniel Revelado" />
                <div className={styles.discountBadge}>50% OFF</div>
              </div>
              <div className={styles.ebookContent}>
                <h4>Daniel Revelado</h4>
                <p>Comentário completo do livro de Daniel</p>
                <div className={styles.ebookPrice}>
                  <span className={styles.memberDiscount}>Membros: 30-50% OFF</span>
                </div>
                <Link href="/assinar" className={styles.ctaButtonSmall}>
                  Ver Desconto
                </Link>
              </div>
            </div>

            <div className={styles.ebookCard}>
              <div className={styles.ebookImage}>
                <img src="/images/ebooks/apocalipse-desvendado.jpg" alt="Apocalipse Desvendado" />
                <div className={styles.discountBadge}>30% OFF</div>
              </div>
              <div className={styles.ebookContent}>
                <h4>Apocalipse Desvendado</h4>
                <p>Interpretação verso a verso do Apocalipse</p>
                <div className={styles.ebookPrice}>
                  <span className={styles.memberDiscount}>Membros: 30-50% OFF</span>
                </div>
                <Link href="/assinar" className={styles.ctaButtonSmall}>
                  Ver Desconto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LimitedContent;

