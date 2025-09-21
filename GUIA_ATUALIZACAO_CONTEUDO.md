# Guia de Atualização de Conteúdo - Apocalypse Academy

Este guia foi criado especialmente para pessoas sem conhecimentos técnicos de programação, explicando como adicionar e atualizar vídeos, textos e outros conteúdos no site da Apocalypse Academy.

## Índice

1. [Estrutura de Conteúdo](#estrutura-de-conteúdo)
2. [Como Adicionar Novos Vídeos](#como-adicionar-novos-vídeos)
   - [Documentários](#adicionar-documentários)
   - [Cursos](#adicionar-cursos)
   - [Devocionais](#adicionar-devocionais)
3. [Como Atualizar Textos](#como-atualizar-textos)
4. [Como Adicionar Revistas/PDFs](#como-adicionar-revistaspdfs)
5. [Gerenciamento de Imagens](#gerenciamento-de-imagens)
6. [Boas Práticas](#boas-práticas)
7. [Solução de Problemas Comuns](#solução-de-problemas-comuns)

## Estrutura de Conteúdo

O site da Apocalypse Academy está organizado nas seguintes seções principais:

- **Documentários**: Vídeos em alta qualidade (4K/6K) organizados em temporadas
- **Cursos**: Aulas em vídeo com materiais complementares
- **Revistas**: Conteúdo em PDF ou interativo para assinantes
- **Devocionais/Áudios Proféticos**: Integração com Spotify
- **Blog/Arquivos Secretos**: Artigos temáticos com design de "arquivo confidencial"

Cada tipo de conteúdo tem sua própria pasta e formato específico.

## Como Adicionar Novos Vídeos

### Adicionar Documentários

Os documentários são armazenados em serviços de nuvem (AWS, Google Cloud ou Azure) e referenciados no site.

#### Passo 1: Preparar o Vídeo

1. Certifique-se de que o vídeo está em formato MP4 com qualidade 4K ou superior
2. Recomendamos comprimir o vídeo para otimizar o streaming (usando ferramentas como HandBrake)
3. Nomeie o arquivo de forma descritiva: `documentario_temporada1_episodio2_titulo.mp4`

#### Passo 2: Fazer Upload para o Serviço de Nuvem

1. Acesse o painel de administração do serviço de nuvem escolhido (AWS S3, Google Cloud Storage, etc.)
2. Navegue até a pasta `videos/documentarios/`
3. Clique em "Upload" ou "Adicionar arquivo" e selecione seu vídeo
4. Aguarde o upload ser concluído (pode demorar dependendo do tamanho do arquivo)
5. Após o upload, copie o URL ou ID do vídeo

#### Passo 3: Adicionar ao Site

1. Acesse a pasta `/public/data/documentarios.json` no repositório
2. Abra o arquivo para edição
3. Adicione uma nova entrada seguindo o formato existente:

```json
{
  "id": "doc-temporada1-ep3",
  "title": "Título do Documentário",
  "description": "Descrição detalhada do documentário...",
  "duration": "45:30",
  "season": 1,
  "episode": 3,
  "thumbnail": "/images/documentarios/thumbnail-t1e3.jpg",
  "videoUrl": "https://url-do-seu-video.mp4",
  "releaseDate": "2025-08-01"
}
```

4. Salve o arquivo

#### Passo 4: Adicionar Thumbnail

1. Crie uma imagem de thumbnail (1280x720 pixels recomendado)
2. Salve a imagem em formato JPG ou PNG
3. Faça upload para a pasta `/public/images/documentarios/`
4. Certifique-se de que o caminho no arquivo JSON corresponde ao local da imagem

### Adicionar Cursos

#### Passo 1: Preparar os Vídeos das Aulas

Siga o mesmo processo de preparação dos documentários, mas organize os vídeos por curso e aula.

#### Passo 2: Fazer Upload para o Serviço de Nuvem

1. Acesse o painel de administração do serviço de nuvem
2. Navegue até a pasta `videos/cursos/nome-do-curso/`
3. Faça upload de todos os vídeos das aulas
4. Copie os URLs ou IDs dos vídeos

#### Passo 3: Criar a Estrutura do Curso

1. Acesse a pasta `/public/data/cursos.json`
2. Adicione um novo curso seguindo o formato:

```json
{
  "id": "nome-do-curso",
  "title": "Título do Curso",
  "description": "Descrição detalhada do curso...",
  "instructor": "Nome do Instrutor",
  "thumbnail": "/images/cursos/thumbnail-curso.jpg",
  "lessons": [
    {
      "id": "aula-1",
      "title": "Título da Aula 1",
      "description": "Descrição da aula...",
      "duration": "32:15",
      "videoUrl": "https://url-do-video-aula1.mp4",
      "materials": [
        {
          "title": "Material Complementar",
          "url": "/materials/nome-do-curso/material.pdf"
        }
      ]
    },
    // Adicione mais aulas aqui
  ]
}
```

#### Passo 4: Adicionar Materiais Complementares

1. Prepare os materiais complementares (PDFs, slides, etc.)
2. Faça upload para a pasta `/public/materials/nome-do-curso/`
3. Atualize os links no arquivo JSON do curso

### Adicionar Devocionais

Para áudios no Spotify:

1. Acesse a pasta `/public/data/devocionais.json`
2. Adicione uma nova entrada com o ID do Spotify:

```json
{
  "id": "devocional-123",
  "title": "Título do Devocional",
  "description": "Descrição do devocional...",
  "date": "2025-08-01",
  "spotifyId": "ID-DO-SPOTIFY",
  "thumbnail": "/images/devocionais/thumbnail-dev.jpg"
}
```

## Como Atualizar Textos

### Textos das Páginas Principais

1. Acesse a pasta `/public/locales/translations.json`
2. Este arquivo contém todos os textos do site em diferentes idiomas
3. Localize a seção que deseja atualizar e modifique o texto
4. Mantenha o formato e as chaves exatamente como estão

Exemplo:

```json
{
  "pt": {
    "home": {
      "hero": {
        "title": "Seu novo título aqui",
        "subtitle": "Seu novo subtítulo aqui"
      }
    }
  }
}
```

### Artigos do Blog

1. Acesse a pasta `/public/data/blog/`
2. Cada artigo é um arquivo markdown (.md) separado
3. Para adicionar um novo artigo, crie um arquivo com nome descritivo: `2025-08-01-titulo-do-artigo.md`
4. Use o seguinte formato no início do arquivo:

```markdown
---
title: Título do Artigo
date: 2025-08-01
author: Nome do Autor
thumbnail: /images/blog/thumbnail-artigo.jpg
tags: [tag1, tag2]
---

Conteúdo do artigo aqui...

## Subtítulo

Mais conteúdo...

![Descrição da imagem](/images/blog/imagem-artigo.jpg)
```

## Como Adicionar Revistas/PDFs

1. Prepare o arquivo PDF da revista
2. Faça upload para a pasta `/public/materials/revistas/`
3. Acesse a pasta `/public/data/revistas.json`
4. Adicione uma nova entrada:

```json
{
  "id": "revista-agosto-2025",
  "title": "Título da Revista",
  "description": "Descrição da revista...",
  "coverImage": "/images/revistas/capa-revista-ago-2025.jpg",
  "pdfUrl": "/materials/revistas/revista-agosto-2025.pdf",
  "releaseDate": "2025-08-01",
  "pages": 42
}
```

## Gerenciamento de Imagens

### Formatos e Tamanhos Recomendados

- **Thumbnails de Documentários/Cursos**: 1280x720px, formato JPG ou WebP
- **Imagens de Banner**: 1920x1080px, formato JPG ou WebP
- **Ícones**: formato SVG ou PNG com transparência
- **Fotos de Perfil**: 500x500px, formato JPG

### Como Adicionar Novas Imagens

1. Prepare a imagem no tamanho e formato recomendados
2. Faça upload para a pasta apropriada em `/public/images/`
   - Documentários: `/public/images/documentarios/`
   - Cursos: `/public/images/cursos/`
   - Blog: `/public/images/blog/`
   - Revistas: `/public/images/revistas/`
3. Referencie a imagem nos arquivos JSON ou Markdown usando o caminho relativo: `/images/categoria/nome-da-imagem.jpg`

### Otimização de Imagens

Para melhor performance do site, recomendamos:

1. Comprimir imagens antes de fazer upload (use ferramentas como TinyPNG)
2. Usar o formato WebP quando possível (melhor compressão)
3. Manter o tamanho dos arquivos abaixo de 200KB para thumbnails

## Boas Práticas

### Organização de Arquivos

- Mantenha uma nomenclatura consistente (use hífens entre palavras)
- Organize os vídeos em pastas por categoria e subcategoria
- Mantenha backups dos arquivos originais

### SEO e Acessibilidade

- Use descrições detalhadas e relevantes
- Adicione tags apropriadas aos conteúdos
- Inclua textos alternativos (alt text) para todas as imagens

### Versionamento

- Mantenha um registro de todas as atualizações feitas
- Considere usar números de versão para documentos importantes
- Faça backup antes de grandes atualizações

## Solução de Problemas Comuns

### Vídeo não aparece no site

1. Verifique se o URL do vídeo está correto no arquivo JSON
2. Confirme se o vídeo está público no serviço de nuvem
3. Verifique se o formato do vídeo é compatível (MP4 recomendado)

### Imagens não carregam

1. Confirme se o caminho está correto no arquivo JSON ou Markdown
2. Verifique se a imagem foi realmente enviada para a pasta correta
3. Certifique-se de que o nome do arquivo corresponde exatamente (incluindo maiúsculas/minúsculas)

### Textos não atualizam

1. Verifique se salvou o arquivo após as alterações
2. Confirme se manteve o formato JSON correto (sem vírgulas extras ou faltantes)
3. Limpe o cache do navegador ou use uma janela anônima para testar

### Problemas com PDFs

1. Certifique-se de que o PDF não está protegido por senha
2. Verifique se o tamanho do arquivo não é muito grande (recomendado abaixo de 10MB)
3. Confirme se o caminho está correto no arquivo JSON

## Contato para Suporte

Se encontrar problemas que não consegue resolver, entre em contato com a equipe técnica:

- Email: suporte@apocalypseacademy.com
- Telefone: (XX) XXXX-XXXX
