import React from 'react';
import Layout from '../components/Layout';
import styles from '../styles/InstallationGuide.module.css';

export default function InstallationGuide() {
  return (
    <Layout title="Guia de Instalação | Apocalypse Academy">
      <div className={styles.guideContainer}>
        <div className={styles.guideHeader}>
          <h1 className={styles.guideTitle}>GUIA DE INSTALAÇÃO</h1>
          <p className={styles.guideDescription}>
            Instruções detalhadas para instalar e configurar o site Apocalypse Academy.
          </p>
        </div>
        
        <div className={styles.guideContent}>
          <section className={styles.guideSection}>
            <h2 className={styles.sectionTitle}>Requisitos do Sistema</h2>
            <div className={styles.requirementsList}>
              <div className={styles.requirementItem}>
                <h3 className={styles.requirementTitle}>Node.js</h3>
                <p className={styles.requirementDescription}>
                  Versão 14.x ou superior. Recomendamos a versão LTS mais recente.
                </p>
                <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer" className={styles.requirementLink}>
                  Download Node.js
                </a>
              </div>
              
              <div className={styles.requirementItem}>
                <h3 className={styles.requirementTitle}>NPM ou Yarn</h3>
                <p className={styles.requirementDescription}>
                  NPM (incluído com Node.js) ou Yarn 1.22.x ou superior.
                </p>
                <a href="https://yarnpkg.com/" target="_blank" rel="noopener noreferrer" className={styles.requirementLink}>
                  Download Yarn
                </a>
              </div>
              
              <div className={styles.requirementItem}>
                <h3 className={styles.requirementTitle}>Serviço de Hospedagem</h3>
                <p className={styles.requirementDescription}>
                  Recomendamos Vercel, Netlify ou AWS Amplify para hospedagem do site Next.js.
                </p>
                <div className={styles.hostingLinks}>
                  <a href="https://vercel.com/" target="_blank" rel="noopener noreferrer" className={styles.requirementLink}>
                    Vercel
                  </a>
                  <a href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer" className={styles.requirementLink}>
                    Netlify
                  </a>
                  <a href="https://aws.amazon.com/amplify/" target="_blank" rel="noopener noreferrer" className={styles.requirementLink}>
                    AWS Amplify
                  </a>
                </div>
              </div>
              
              <div className={styles.requirementItem}>
                <h3 className={styles.requirementTitle}>Serviço de Streaming de Vídeo</h3>
                <p className={styles.requirementDescription}>
                  Para vídeos em 4K/6K, recomendamos Amazon S3 + CloudFront, Google Cloud Storage ou Microsoft Azure Media Services.
                </p>
              </div>
            </div>
          </section>
          
          <section className={styles.guideSection}>
            <h2 className={styles.sectionTitle}>Instalação Local</h2>
            <div className={styles.installSteps}>
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>1</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Extrair o Arquivo ZIP</h3>
                  <p className={styles.stepDescription}>
                    Extraia o conteúdo do arquivo ZIP em um diretório de sua escolha.
                  </p>
                  <div className={styles.codeBlock}>
                    <code>
                      unzip apocalypse-academy.zip -d apocalypse-academy
                    </code>
                  </div>
                </div>
              </div>
              
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>2</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Instalar Dependências</h3>
                  <p className={styles.stepDescription}>
                    Navegue até o diretório do projeto e instale as dependências.
                  </p>
                  <div className={styles.codeBlock}>
                    <code>
                      cd apocalypse-academy<br />
                      npm install<br />
                      # ou<br />
                      yarn install
                    </code>
                  </div>
                </div>
              </div>
              
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>3</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Configurar Variáveis de Ambiente</h3>
                  <p className={styles.stepDescription}>
                    Crie um arquivo .env.local na raiz do projeto com as seguintes variáveis:
                  </p>
                  <div className={styles.codeBlock}>
                    <code>
                      # Autenticação (substitua com suas credenciais reais)<br />
                      AUTH_SECRET=sua_chave_secreta_aqui<br />
                      <br />
                      # Spotify API (substitua com suas credenciais reais)<br />
                      SPOTIFY_CLIENT_ID=seu_client_id_aqui<br />
                      SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui<br />
                      <br />
                      # Serviço de Vídeo (substitua com suas credenciais reais)<br />
                      VIDEO_API_KEY=sua_api_key_aqui<br />
                      VIDEO_API_ENDPOINT=https://seu-endpoint-aqui.com
                    </code>
                  </div>
                </div>
              </div>
              
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>4</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Executar em Modo de Desenvolvimento</h3>
                  <p className={styles.stepDescription}>
                    Inicie o servidor de desenvolvimento para testar o site localmente.
                  </p>
                  <div className={styles.codeBlock}>
                    <code>
                      npm run dev<br />
                      # ou<br />
                      yarn dev
                    </code>
                  </div>
                  <p className={styles.stepNote}>
                    O site estará disponível em <a href="http://localhost:3000" target="_blank" rel="noopener noreferrer">http://localhost:3000</a>
                  </p>
                </div>
              </div>
              
              <div className={styles.stepItem}>
                <div className={styles.stepNumber}>5</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>Construir para Produção</h3>
                  <p className={styles.stepDescription}>
                    Gere a versão otimizada para produção.
                  </p>
                  <div className={styles.codeBlock}>
                    <code>
                      npm run build<br />
                      # ou<br />
                      yarn build
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <section className={styles.guideSection}>
            <h2 className={styles.sectionTitle}>Implantação em Produção</h2>
            <div className={styles.deploymentOptions}>
              <div className={styles.deploymentItem}>
                <h3 className={styles.deploymentTitle}>Vercel (Recomendado)</h3>
                <p className={styles.deploymentDescription}>
                  A maneira mais simples de implantar um aplicativo Next.js.
                </p>
                <div className={styles.deploymentSteps}>
                  <ol>
                    <li>Crie uma conta em <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">vercel.com</a></li>
                    <li>Instale a CLI do Vercel: <code>npm i -g vercel</code></li>
                    <li>Execute <code>vercel</code> na raiz do projeto e siga as instruções</li>
                    <li>Configure as variáveis de ambiente no painel do Vercel</li>
                  </ol>
                </div>
              </div>
              
              <div className={styles.deploymentItem}>
                <h3 className={styles.deploymentTitle}>Netlify</h3>
                <p className={styles.deploymentDescription}>
                  Outra excelente opção para hospedar aplicativos Next.js.
                </p>
                <div className={styles.deploymentSteps}>
                  <ol>
                    <li>Crie uma conta em <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">netlify.com</a></li>
                    <li>Clique em "New site from Git" e selecione seu repositório</li>
                    <li>Configure o comando de build: <code>npm run build</code></li>
                    <li>Configure o diretório de publicação: <code>.next</code></li>
                    <li>Configure as variáveis de ambiente no painel do Netlify</li>
                  </ol>
                </div>
              </div>
              
              <div className={styles.deploymentItem}>
                <h3 className={styles.deploymentTitle}>Servidor Próprio</h3>
                <p className={styles.deploymentDescription}>
                  Para implantação em seu próprio servidor.
                </p>
                <div className={styles.deploymentSteps}>
                  <ol>
                    <li>Construa o aplicativo: <code>npm run build</code></li>
                    <li>Inicie o servidor: <code>npm start</code></li>
                    <li>Para produção, recomendamos usar PM2:
                      <div className={styles.codeBlock}>
                        <code>
                          npm install -g pm2<br />
                          pm2 start npm --name "apocalypse-academy" -- start
                        </code>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </section>
          
          <section className={styles.guideSection}>
            <h2 className={styles.sectionTitle}>Configuração de Integrações</h2>
            
            <div className={styles.integrationItem}>
              <h3 className={styles.integrationTitle}>Autenticação</h3>
              <p className={styles.integrationDescription}>
                O sistema de autenticação está configurado para funcionar com armazenamento local (localStorage). Para um ambiente de produção, recomendamos integrar com:
              </p>
              <ul className={styles.integrationOptions}>
                <li>Auth0</li>
                <li>Firebase Authentication</li>
                <li>NextAuth.js</li>
                <li>Seu próprio backend com JWT</li>
              </ul>
              <p className={styles.integrationNote}>
                Modifique o arquivo <code>contexts/AuthContext.js</code> para integrar com seu provedor de autenticação preferido.
              </p>
            </div>
            
            <div className={styles.integrationItem}>
              <h3 className={styles.integrationTitle}>Player de Vídeo 4K/6K</h3>
              <p className={styles.integrationDescription}>
                O player de vídeo está configurado para funcionar com serviços de streaming em nuvem. Para configurar:
              </p>
              <ol className={styles.integrationSteps}>
                <li>Faça upload dos seus vídeos para um serviço de armazenamento em nuvem (AWS S3, Google Cloud Storage, etc.)</li>
                <li>Configure um CDN (CloudFront, Cloud CDN, etc.) para distribuição dos vídeos</li>
                <li>Atualize as URLs dos vídeos no componente <code>CloudVideoPlayer</code> em <code>pages/documentarios/high-performance-player.js</code></li>
              </ol>
            </div>
            
            <div className={styles.integrationItem}>
              <h3 className={styles.integrationTitle}>Spotify</h3>
              <p className={styles.integrationDescription}>
                Para integrar com a API do Spotify:
              </p>
              <ol className={styles.integrationSteps}>
                <li>Crie um aplicativo no <a href="https://developer.spotify.com/dashboard/" target="_blank" rel="noopener noreferrer">Dashboard de Desenvolvedores do Spotify</a></li>
                <li>Obtenha o Client ID e Client Secret</li>
                <li>Configure as URLs de redirecionamento no dashboard do Spotify</li>
                <li>Atualize as credenciais no arquivo .env.local</li>
              </ol>
            </div>
            
            <div className={styles.integrationItem}>
              <h3 className={styles.integrationTitle}>Telegram e WhatsApp</h3>
              <p className={styles.integrationDescription}>
                Para integrar com Telegram e WhatsApp:
              </p>
              <ol className={styles.integrationSteps}>
                <li>Crie seus grupos no Telegram e WhatsApp</li>
                <li>Gere links de convite para os grupos</li>
                <li>Atualize os links no arquivo <code>pages/comunidade/messaging.js</code></li>
              </ol>
            </div>
          </section>
          
          <section className={styles.guideSection}>
            <h2 className={styles.sectionTitle}>Personalização</h2>
            <p className={styles.sectionDescription}>
              O site foi desenvolvido para ser facilmente personalizável. Aqui estão os principais arquivos para personalização:
            </p>
            
            <div className={styles.customizationItem}>
              <h3 className={styles.customizationTitle}>Estilos Globais</h3>
              <p className={styles.customizationPath}><code>styles/globals.css</code></p>
              <p className={styles.customizationDescription}>
                Contém as variáveis CSS para cores, fontes e outros estilos globais.
              </p>
            </div>
            
            <div className={styles.customizationItem}>
              <h3 className={styles.customizationTitle}>Layout Principal</h3>
              <p className={styles.customizationPath}><code>components/Layout.js</code></p>
              <p className={styles.customizationDescription}>
                Componente de layout principal que inclui o cabeçalho e rodapé.
              </p>
            </div>
            
            <div className={styles.customizationItem}>
              <h3 className={styles.customizationTitle}>Navegação</h3>
              <p className={styles.customizationPath}><code>components/Header.js</code></p>
              <p className={styles.customizationDescription}>
                Componente de navegação principal com o menu horizontal.
              </p>
            </div>
            
            <div className={styles.customizationItem}>
              <h3 className={styles.customizationTitle}>Conteúdo da Página Inicial</h3>
              <p className={styles.customizationPath}><code>pages/index.js</code></p>
              <p className={styles.customizationDescription}>
                Página inicial com banner principal e seções de destaque.
              </p>
            </div>
          </section>
          
          <section className={styles.guideSection}>
            <h2 className={styles.sectionTitle}>Suporte e Contato</h2>
            <p className={styles.supportDescription}>
              Se você tiver dúvidas ou precisar de suporte adicional, entre em contato conosco:
            </p>
            <div className={styles.supportContact}>
              <div className={styles.contactItem}>
                <h3 className={styles.contactTitle}>Email</h3>
                <p className={styles.contactValue}>suporte@apocalypseacademy.com</p>
              </div>
              <div className={styles.contactItem}>
                <h3 className={styles.contactTitle}>Website</h3>
                <p className={styles.contactValue}>www.apocalypseacademy.com</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
