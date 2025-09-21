# Guia de Instalação - Sistema de Afiliados Apocalypse Academy

Este guia fornece instruções detalhadas para instalar e configurar o Sistema de Afiliados da Apocalypse Academy.

## Requisitos

- Node.js 14.x ou superior
- NPM 6.x ou superior
- Next.js 12.x ou superior

## Passos para Instalação

### 1. Configuração do Projeto

1. Descompacte o arquivo zip em seu ambiente de desenvolvimento
2. Navegue até a pasta do projeto:

```bash
cd apocalypse-academy-final
```

3. Instale as dependências:

```bash
npm install
```

### 2. Configuração do Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto baseado no modelo `.env.example`:

```bash
cp .env.example .env.local
```

2. Edite o arquivo `.env.local` e configure as variáveis de ambiente necessárias:

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_AFFILIATE_COOKIE_DURATION=30
```

### 3. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:3000`.

## Estrutura do Sistema de Afiliados

### Arquivos Principais

- `/contexts/AffiliateContext.js` - Contexto para gerenciamento de afiliados
- `/pages/afiliados/dashboard.js` - Dashboard para afiliados
- `/pages/afiliados/configuracoes.js` - Configurações de afiliado
- `/styles/Dashboard.module.css` - Estilos para o dashboard de afiliados

### Integração com o Sistema Existente

O Sistema de Afiliados está integrado com o sistema de autenticação existente:

1. O arquivo `_app.js` foi atualizado para incluir o `AffiliateProvider`
2. O fluxo de registro (`/pages/auth/register.js`) foi modificado para capturar códigos de afiliados
3. O contexto de autenticação (`/contexts/AuthContext.js`) foi atualizado para suportar referências de afiliados

## Personalização

### Ajuste de Comissões

Para ajustar as taxas de comissão e regras de pagamento, edite o arquivo `/contexts/AffiliateContext.js`:

```javascript
// Exemplo: Alterar a duração do cookie de afiliado
const AFFILIATE_COOKIE_DURATION = 60; // 60 dias em vez de 30
```

### Materiais Promocionais

Os materiais promocionais podem ser atualizados adicionando novos arquivos na pasta `/public/images/affiliate-materials/`.

## Implantação em Produção

### Construção para Produção

```bash
npm run build
```

### Iniciar em Modo de Produção

```bash
npm start
```

### Implantação na Vercel

Este projeto está configurado para fácil implantação na Vercel:

1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente necessárias
3. Implante o projeto

## Solução de Problemas

### Cookies não estão sendo armazenados

- Verifique se o domínio está configurado corretamente em `NEXT_PUBLIC_SITE_URL`
- Certifique-se de que o navegador não está bloqueando cookies

### Códigos de afiliado não estão sendo rastreados

- Verifique se o `AffiliateProvider` está corretamente configurado em `_app.js`
- Confirme que o parâmetro `ref` está sendo passado corretamente nos links

## Suporte

Para suporte adicional, entre em contato com a equipe de desenvolvimento em suporte@apocalypseacademy.com.
