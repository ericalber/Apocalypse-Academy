# Vercel Deployment Guide for Apocalypse Academy

Este documento contém instruções detalhadas para implantar o site Apocalypse Academy no Vercel.

## Pré-requisitos

- Conta no Vercel (gratuita ou paga)
- Arquivos estáticos do site (pasta 'out/')
- Domínio personalizado (opcional)

## Passos para Implantação

### 1. Criar uma conta no Vercel

Se você ainda não tem uma conta no Vercel:
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up"
3. Escolha o método de registro (GitHub, GitLab, Bitbucket ou email)
4. Siga as instruções para completar o registro

### 2. Implantar o Site

#### Opção 1: Usando o Vercel CLI (Recomendado)

1. Instale a CLI do Vercel:
   ```
   npm install -g vercel
   ```

2. Navegue até o diretório do projeto:
   ```
   cd apocalypse-academy-final
   ```

3. Execute o comando de implantação:
   ```
   vercel deploy ./out
   ```

4. Siga as instruções interativas:
   - Faça login na sua conta Vercel quando solicitado
   - Confirme o nome do projeto como "apocalypse-academy"
   - Escolha o escopo (pessoal ou equipe)
   - Confirme as configurações

#### Opção 2: Usando o Dashboard do Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em "Add New" > "Project"
3. Escolha "Upload" para fazer upload manual
4. Arraste e solte a pasta 'out/' ou use o seletor de arquivos
5. Configure o nome do projeto como "apocalypse-academy"
6. Clique em "Deploy"

### 3. Configurar Variáveis de Ambiente

Após a implantação, configure as variáveis de ambiente necessárias:

1. Acesse o dashboard do seu projeto no Vercel
2. Navegue até "Settings" > "Environment Variables"
3. Adicione as variáveis listadas no arquivo `.env.example`:
   - `NEXT_PUBLIC_AUTH_DOMAIN`
   - `AUTH_SECRET`
   - `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REDIRECT_URI`
   - `NEXT_PUBLIC_VIDEO_API_ENDPOINT`
   - `VIDEO_API_KEY`
   - `NEXT_PUBLIC_SITE_URL`
4. Clique em "Save" para aplicar as alterações

### 4. Configurar Domínio Personalizado

Para configurar seu domínio personalizado:

1. Acesse o dashboard do seu projeto no Vercel
2. Navegue até "Settings" > "Domains"
3. Clique em "Add Domain"
4. Digite seu domínio personalizado
5. Siga as instruções para configurar os registros DNS:
   - Para domínios apex (exemplo.com): Configure registros A e CNAME
   - Para subdomínios (www.exemplo.com): Configure registro CNAME
6. Aguarde a propagação DNS (pode levar até 48 horas)

### 5. Verificar Implantação

Após a implantação:

1. Acesse a URL fornecida pelo Vercel (formato: apocalypse-academy.vercel.app)
2. Verifique se todas as páginas estão funcionando corretamente
3. Teste a navegação e os elementos interativos
4. Verifique a responsividade em diferentes dispositivos

## Benefícios do Vercel

- **Hospedagem Gratuita**: Plano gratuito generoso para projetos pessoais
- **CDN Global**: Distribuição de conteúdo rápida em todo o mundo
- **SSL Automático**: Certificados SSL/TLS gratuitos e automáticos
- **CI/CD Integrado**: Implantações automáticas a partir de repositórios Git
- **Previews**: URLs de preview para cada commit ou pull request
- **Analytics**: Análises de desempenho e uso do site
- **Escalabilidade**: Escala automaticamente conforme o tráfego aumenta

## Suporte

Se você encontrar problemas durante a implantação:

- Consulte a [documentação do Vercel](https://vercel.com/docs)
- Acesse o [fórum da comunidade Vercel](https://github.com/vercel/vercel/discussions)
- Entre em contato com o suporte em suporte@apocalypseacademy.com
