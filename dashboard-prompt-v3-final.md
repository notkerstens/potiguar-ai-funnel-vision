# 📊 DASHBOARD – SDR AI Potiguar Solar (com Lead Scoring)

## Descrição
Criar um dashboard dinâmico dentro do template HTML existente do Potiguar Solar (AI Dashboard by RoboLink), incluindo controle detalhado do funil de qualificação SDR AI + Sistema de Lead Scoring automático, para priorizar leads quentes, monitorar travas e acionar scripts de contorno.

## Requisitos
- Usar o layout HTML/CSS já existente
- Integrar com o container `<div id="root"></div>`
- Compatível com scripts de rastreamento flock.js e badge #lovable-badge
- Responsivo para desktop e mobile
- Usar sistema de design com tokens semânticos (HSL colors)

## Estrutura

### Bloco de Métricas Gerais
- Total de Leads Recebidos
- Leads Em Qualificação (Funil Incompleto)
- Leads Concluídos
- Taxa de Conversão Final (%)

### Tabela Detalhada por Etapa
**Etapas com Pontuação:**
1. Abertura do Contato — +5 pts
2. Perfil do Imóvel — +10 pts
3. Pedido da Conta de Energia (Enviou Conta) — +20 pts
4. Validação do Tomador de Decisão — +10 pts
5. Momento e Motivação — +10 pts
6. Concorrência / Conhecimento — +5 pts
7. Simulação de Pagamento (Solicitação de CPF) — +20 pts
8. Agendamento Final — +20 pts

**Para cada etapa exibir:**
- Leads Entraram
- Leads Avançaram
- Leads Travaram
- % Conversão da Etapa
- Objeção Principal (se houver)

### Módulo de Lead Scoring
- Cada etapa concluída soma a pontuação indicada
- **Objeções aplicam descontos:**
  - Recusou enviar conta: -15 pts
  - Não quer passar CPF: -20 pts
  - Só curioso: -10 pts
  - Vendo com outras empresas: -5 pts
- Resposta rápida (+5 pts) se lead interage no mesmo dia
- Resposta lenta (-5 pts) se lead demora mais de 3 dias
- Exibir score final de cada lead na Tabela de Leads Detalhada
- **Faixas de Classificação:**
  - 0–30 pts → Frio
  - 31–60 pts → Morno
  - 61–100 pts → Quente

### Filtros Dinâmicos
- Filtro por Vendedor (SDR)
- Filtro por Período (semana, mês, intervalo customizado)
- Filtro por Faixa de Scoring (Frio, Morno, Quente)

### Visualização Gráfica
- Gráfico de Funil com queda % por etapa
- Gráfico de Pizza Status Geral (Concluídos x Incompletos)
- Componente de Distribuição de Scores (barras de progresso por categoria)

### Lista de Leads Detalhada
**Campos:**
- Nome
- WhatsApp
- SDR Responsável
- Etapa Atual
- Status Dinâmico
- Lead Score Atual (com indicador visual de categoria)
- Observação/Objeção

### Campo de Observação
- Para SDR registrar fala real ou contorno aplicado
- Dados usados para treinar IA de follow-up
- Seleção de tipo de objeção para categorização

## Integração
- Compatível com Supabase ou outro banco de dados para salvar scores, status, objeções
- Mantém rastreamento ativo com flock.js
- Meta tags OG e Twitter intactas
- Estrutura de dados tipada com TypeScript

## Estilo
- Paleta institucional verde (#0D640D) usando tokens semânticos
- Tipografia clean do CSS atual
- **Ícones para status:** ✔️ Passou | ⏳ Pendente | ❌ Travado
- Gradientes e sombras usando design system
- Cores em formato HSL para consistência

## Objetivo
- Visualizar gargalos reais do funil
- Priorizar leads quentes automaticamente
- Acionar scripts de contorno certos para cada objeção
- Elevar a conversão geral com inteligência
- Facilitar tomada de decisão baseada em dados

## Componentes Implementados
- `MetricsOverview` - Métricas gerais
- `FunnelStagesTable` - Tabela detalhada por etapa
- `FilterControls` - Filtros dinâmicos
- `FunnelChart` - Gráfico de funil
- `StatusChart` - Gráfico de pizza
- `ScoreDistribution` - Distribuição de scores
- `LeadsList` - Lista detalhada de leads
- `ObservationField` - Campo de observação

## Dados Mock
- Estrutura completa de leads com scores calculados
- Métricas agregadas por etapa
- Distribuição por categorias de temperatura
- Objeções categorizadas por tipo

**Autor:** Potiguar Solar + RoboLink  
**Versão:** v3.0 Final  
**Status:** Implementado e Funcional