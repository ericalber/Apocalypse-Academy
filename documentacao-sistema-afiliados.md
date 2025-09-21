# Sistema de Afiliados - Apocalypse Academy

## Visão Geral

O Sistema de Afiliados da Apocalypse Academy permite que colaboradores (amigos) sejam recompensados quando usuários acessam a plataforma através de seus links ou assistem ao seu conteúdo. Este documento detalha a implementação, funcionalidades e instruções de uso do sistema.

## Funcionalidades Implementadas

### 1. Rastreamento de Afiliados
- **Links de Afiliados Personalizados**: Cada colaborador recebe um link único com seu código de afiliado
- **Rastreamento via Cookies**: Sistema armazena o código do afiliado em cookies por 30 dias
- **Atribuição de Referências**: Quando um usuário se registra, o sistema associa automaticamente ao afiliado que o referenciou

### 2. Dashboard de Afiliados
- **Visão Geral**: Estatísticas em tempo real de visitantes, registros e conversões
- **Referidos**: Lista detalhada de todos os usuários referenciados pelo afiliado
- **Ganhos**: Histórico de comissões e status de pagamentos
- **Materiais Promocionais**: Banners e recursos para divulgação

### 3. Sistema de Comissões
- **Modelo Flexível**: Comissões por registros, assinaturas e visualizações de conteúdo
- **Níveis de Afiliados**: Sistema de progressão baseado em desempenho
- **Métodos de Pagamento**: Suporte a PIX, transferência bancária e crédito na plataforma

### 4. Configurações de Afiliado
- **Informações de Pagamento**: Configuração de dados bancários e métodos de recebimento
- **Preferências de Notificação**: Controle sobre quais alertas o afiliado deseja receber

## Fluxo de Funcionamento

1. **Geração de Link**: O afiliado obtém seu link personalizado no dashboard
2. **Compartilhamento**: O afiliado compartilha o link em suas redes sociais, site ou diretamente
3. **Rastreamento**: Quando um visitante acessa o site através do link, um cookie é armazenado
4. **Conversão**: Se o visitante se registra ou assina, o afiliado é creditado
5. **Comissões**: O sistema calcula automaticamente as comissões com base nas regras definidas
6. **Pagamento**: Periodicamente, os afiliados recebem seus pagamentos conforme o método escolhido

## Guia de Uso para Administradores

### Configuração do Sistema
- O sistema está integrado ao fluxo de autenticação existente
- As comissões e níveis de afiliados podem ser ajustados no backend
- Os materiais promocionais podem ser atualizados periodicamente

### Monitoramento
- Acompanhe o desempenho dos afiliados através do painel administrativo
- Verifique conversões e comissões para identificar possíveis fraudes
- Analise quais afiliados estão trazendo mais usuários de qualidade

### Pagamentos
- Revise e aprove solicitações de pagamento
- Configure limites mínimos para saque
- Mantenha um registro de todos os pagamentos realizados

## Guia de Uso para Afiliados

### Como Começar
1. Faça login na sua conta da Apocalypse Academy
2. Acesse o menu "Afiliados" > "Dashboard"
3. Copie seu link de afiliado personalizado
4. Compartilhe o link com amigos, em redes sociais ou em seu site

### Acompanhamento de Desempenho
- Monitore suas estatísticas em tempo real no dashboard
- Verifique quais referidos se converteram em assinantes
- Acompanhe seu histórico de ganhos e pagamentos

### Recebimento de Comissões
1. Configure suas informações de pagamento em "Afiliados" > "Configurações"
2. Escolha seu método de pagamento preferido (PIX, transferência bancária ou crédito)
3. Quando atingir o valor mínimo, solicite seu pagamento
4. Acompanhe o status da solicitação no dashboard

## Considerações Técnicas

### Implementação
- O sistema utiliza cookies para rastreamento de afiliados
- A integração com o registro de usuários captura automaticamente os códigos de referência
- O dashboard é construído com componentes React e estilizado com CSS Modules

### Segurança
- Implementadas medidas anti-fraude para evitar auto-referências
- Sistema de verificação para prevenir manipulação de cookies
- Conformidade com LGPD para coleta e armazenamento de dados

### Escalabilidade
- Arquitetura projetada para suportar crescimento do número de afiliados
- Sistema de cache para otimizar consultas frequentes
- Estrutura modular que permite expansão de funcionalidades

## Próximos Passos

### Fase 1 (Curto Prazo)
- Integração com sistema de pagamentos real
- Implementação de notificações por email
- Adição de mais materiais promocionais

### Fase 2 (Médio Prazo)
- Implementação de concursos e desafios para afiliados
- Criação de um sistema de ranqueamento público
- Desenvolvimento de ferramentas avançadas de análise

### Fase 3 (Longo Prazo)
- Integração com plataformas de marketing de afiliados
- Implementação de programa de afiliados em múltiplos níveis
- Desenvolvimento de API pública para afiliados avançados

## Conclusão

O Sistema de Afiliados da Apocalypse Academy oferece uma solução completa para monetização através de colaboradores, com rastreamento preciso, dashboard intuitivo e sistema flexível de comissões. A implementação atual estabelece uma base sólida que pode ser expandida conforme o crescimento da plataforma.
