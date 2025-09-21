# Planilha de Custos - Google Cloud para Apocalypse Academy

## Custos de Armazenamento e Streaming de Vídeo

| Componente | Básico (500 usuários) | Intermediário (750 usuários) | Avançado (1000 usuários) |
|------------|------------------------|------------------------------|--------------------------|
| Armazenamento Standard (por mês) | $50 (2.5TB) | $75 (3.75TB) | $100 (5TB) |
| Transferência de Dados (por mês) | $60 (500GB) | $90 (750GB) | $120 (1TB) |
| CDN / Cache (por mês) | $40 | $60 | $80 |
| Computação (por mês) | $70 | $105 | $140 |
| Banco de Dados (por mês) | $30 | $45 | $60 |
| **Total Mensal** | **$250** | **$375** | **$500** |
| **Total Anual** | **$3,000** | **$4,500** | **$6,000** |

## Projeção de Crescimento (2 Anos)

| Período | Usuários Estimados | Custo Mensal | Custo Acumulado |
|---------|-------------------|--------------|-----------------|
| Mês 1 | 500 | $250 | $250 |
| Mês 6 | 600 | $300 | $1,650 |
| Mês 12 | 750 | $375 | $3,750 |
| Mês 18 | 850 | $425 | $6,300 |
| Mês 24 | 1000 | $500 | $9,300 |

## Detalhamento por Qualidade de Vídeo

| Qualidade | Tamanho Médio (1h) | Custo de Armazenamento (por mês) | Custo de Transferência (1000 visualizações) |
|-----------|-------------------|----------------------------------|-------------------------------------------|
| HD (720p) | 1GB | $0.02/GB = $0.02 | $0.12/GB = $120 |
| Full HD (1080p) | 2GB | $0.02/GB = $0.04 | $0.12/GB = $240 |
| 4K | 6GB | $0.02/GB = $0.12 | $0.12/GB = $720 |
| 6K | 12GB | $0.02/GB = $0.24 | $0.12/GB = $1,440 |

## Recomendações de Otimização

1. **Streaming Adaptativo**: Implementar streaming adaptativo para fornecer qualidade apropriada baseada na conexão do usuário
2. **Planos Escalonados**: Oferecer diferentes planos de assinatura para diferentes qualidades de vídeo
3. **Cache Regional**: Utilizar CDN para reduzir custos de transferência de dados
4. **Compressão Eficiente**: Utilizar codecs modernos (H.265/HEVC) para reduzir tamanho dos arquivos
5. **Reserva de Instâncias**: Economizar até 40% com compromissos de uso de 1-3 anos

## Comparação de Provedores

| Provedor | Custo Mensal (1000 usuários) | Vantagens | Desvantagens |
|----------|------------------------------|-----------|--------------|
| Google Cloud | $500 | Integração com YouTube, boa presença global | - |
| AWS | $520 | Maior rede global, serviços especializados | Mais complexo |
| Azure | $490 | Bom para integrações Microsoft | Menos otimizado para vídeo |
| Hospedagem Especializada | $600 | Otimizada para vídeo, suporte dedicado | Mais cara, menos flexível |

## Custos Iniciais

| Item | Custo |
|------|-------|
| Configuração inicial | $200-500 |
| Migração de conteúdo | $100-300 |
| Otimização de vídeos | $2-5 por vídeo |
| Configuração de CDN | $100-200 |
| **Total** | **$400-1000** |
