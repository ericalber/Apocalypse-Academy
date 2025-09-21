# Guia de Instalação - Apocalypse Academy

Este documento contém instruções detalhadas para instalar e configurar o site Apocalypse Academy desenvolvido com React.js e Next.js.

## Requisitos do Sistema

- **Node.js**: Versão 14.x ou superior (recomendamos a versão LTS mais recente)
- **NPM ou Yarn**: NPM (incluído com Node.js) ou Yarn 1.22.x ou superior
- **Serviço de Hospedagem**: Recomendamos Vercel, Netlify ou AWS Amplify para hospedagem
- **Serviço de Streaming de Vídeo**: Para vídeos em 4K/6K, recomendamos Amazon S3 + CloudFront, Google Cloud Storage ou Microsoft Azure Media Services

## Instalação Local

### 1. Extrair o Arquivo ZIP

Extraia o conteúdo do arquivo ZIP em um diretório de sua escolha:

```
unzip apocalypse-academy.zip -d apocalypse-academy
```

### 2. Instalar Dependências

Navegue até o diretório do projeto e instale as dependências:

```
cd apocalypse-academy
npm install
# ou
yarn install
```

### 3. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```
# Autenticação (substitua com suas credenciais reais)
AUTH_SECRET=sua_chave_secreta_aqui

# Spotify API (substitua com suas credenciais reais)
SPOTIFY_CLIENT_ID=seu_client_id_aqui
SPOTIFY_CLIENT_SECRET=seu_client_secret_aqui

# Serviço de Vídeo (substitua com suas credenciais reais)
VIDEO_API_KEY=sua_api_key_aqui
VIDEO_API_ENDPOINT=https://seu-endpoint-aqui.com
```

### 4. Executar em Modo de Desenvolvimento

Inicie o servidor de desenvolvimento para testar o site localmente:

```
npm run dev
# ou
yarn dev
```

O site estará disponível em http://localhost:3000

### 5. Construir para Produção

Gere a versão otimizada para produção:

```
npm run build
# ou
yarn build
```

## Implantação em Produção

### Vercel (Recomendado)

A maneira mais simples de implantar um aplicativo Next.js:

1. Crie uma conta em [vercel.com](https://vercel.com)
2. Instale a CLI do Vercel: `npm i -g vercel`
3. Execute `vercel` na raiz do projeto e siga as instruções
4. Configure as variáveis de ambiente no painel do Vercel

### Netlify

Outra excelente opção para hospedar aplicativos Next.js:

1. Crie uma conta em [netlify.com](https://netlify.com)
2. Clique em "New site from Git" e selecione seu repositório
3. Configure o comando de build: `npm run build`
4. Configure o diretório de publicação: `.next`
5. Configure as variáveis de ambiente no painel do Netlify

### Servidor Próprio

Para implantação em seu próprio servidor:

1. Construa o aplicativo: `npm run build`
2. Inicie o servidor: `npm start`
3. Para produção, recomendamos usar PM2:
   ```
   npm install -g pm2
   pm2 start npm --name "apocalypse-academy" -- start
   ```

## Configuração de Integrações

### Autenticação

O sistema de autenticação está configurado para funcionar com armazenamento local (localStorage). Para um ambiente de produção, recomendamos integrar com:

- Auth0
- Firebase Authentication
- NextAuth.js
- Seu próprio backend com JWT

Modifique o arquivo `contexts/AuthContext.js` para integrar com seu provedor de autenticação preferido.

### Player de Vídeo 4K/6K

O player de vídeo está configurado para funcionar com serviços de streaming em nuvem. Para configurar:

1. Faça upload dos seus vídeos para um serviço de armazenamento em nuvem (AWS S3, Google Cloud Storage, etc.)
2. Configure um CDN (CloudFront, Cloud CDN, etc.) para distribuição dos vídeos
3. Atualize as URLs dos vídeos no componente `CloudVideoPlayer` em `pages/documentarios/high-performance-player.js`

### Spotify

Para integrar com a API do Spotify:

1. Crie um aplicativo no [Dashboard de Desenvolvedores do Spotify](https://developer.spotify.com/dashboard/)
2. Obtenha o Client ID e Client Secret
3. Configure as URLs de redirecionamento no dashboard do Spotify
4. Atualize as credenciais no arquivo .env.local

### Telegram e WhatsApp

Para integrar com Telegram e WhatsApp:

1. Crie seus grupos no Telegram e WhatsApp
2. Gere links de convite para os grupos
3. Atualize os links no arquivo `pages/comunidade/messaging.js`

## Personalização

O site foi desenvolvido para ser facilmente personalizável. Aqui estão os principais arquivos para personalização:

- **Estilos Globais**: `styles/globals.css` - Contém as variáveis CSS para cores, fontes e outros estilos globais.
- **Layout Principal**: `components/Layout.js` - Componente de layout principal que inclui o cabeçalho e rodapé.
- **Navegação**: `components/Header.js` - Componente de navegação principal com o menu horizontal.
- **Conteúdo da Página Inicial**: `pages/index.js` - Página inicial com banner principal e seções de destaque.

## Estrutura de Arquivos

```
apocalypse-academy/
├── components/           # Componentes reutilizáveis
│   ├── Header.js         # Menu de navegação
│   ├── Footer.js         # Rodapé do site
│   └── Layout.js         # Layout principal
├── contexts/             # Contextos React
│   └── AuthContext.js    # Contexto de autenticação
├── pages/                # Páginas do Next.js
│   ├── _app.js           # Componente App personalizado
│   ├── index.js          # Página inicial
│   ├── documentarios/    # Páginas de documentários
│   ├── cursos/           # Páginas de cursos
│   ├── revistas/         # Páginas de revistas
│   ├── devocionais/      # Páginas de devocionais
│   ├── comunidade/       # Páginas de comunidade
│   ├── blog/             # Páginas de blog
│   ├── sobre/            # Página sobre
│   └── auth/             # Páginas de autenticação
├── public/               # Arquivos estáticos
│   ├── images/           # Imagens
│   └── videos/           # Vídeos (apenas para desenvolvimento)
├── styles/               # Estilos CSS
│   ├── globals.css       # Estilos globais
│   └── components/       # Estilos de componentes
├── .env.local            # Variáveis de ambiente (criar manualmente)
├── next.config.js        # Configuração do Next.js
└── package.json          # Dependências e scripts
```

## Suporte e Contato

Se você tiver dúvidas ou precisar de suporte adicional, entre em contato conosco:

- **Email**: suporte@apocalypseacademy.com
- **Website**: www.apocalypseacademy.com
