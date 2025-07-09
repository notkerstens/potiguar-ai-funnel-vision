import { FunnelStage, Lead, DashboardMetrics, SDR } from '@/types/dashboard';

export const funnelStages: FunnelStage[] = [
  {
    id: 1,
    name: "Abertura do Contato",
    description: "Primeiro contato e qualificação inicial",
    leadsEntered: 120,
    leadsAdvanced: 95,
    leadsStuck: 25,
    conversionRate: 79.2,
    mainObjection: "Não tem tempo agora"
  },
  {
    id: 2,
    name: "Perfil do Imóvel",
    description: "Coleta de informações sobre o imóvel",
    leadsEntered: 95,
    leadsAdvanced: 78,
    leadsStuck: 17,
    conversionRate: 82.1,
    mainObjection: "Imóvel é alugado"
  },
  {
    id: 3,
    name: "Pedido da Conta de Energia",
    description: "Solicitação da conta de energia elétrica",
    leadsEntered: 78,
    leadsAdvanced: 65,
    leadsStuck: 13,
    conversionRate: 83.3,
    mainObjection: "Não tem conta em mãos"
  },
  {
    id: 4,
    name: "Validação do Tomador de Decisão",
    description: "Identificação do decisor de compra",
    leadsEntered: 65,
    leadsAdvanced: 52,
    leadsStuck: 13,
    conversionRate: 80.0,
    mainObjection: "Precisa consultar cônjuge"
  },
  {
    id: 5,
    name: "Momento e Motivação",
    description: "Entendimento da urgência e motivação",
    leadsEntered: 52,
    leadsAdvanced: 45,
    leadsStuck: 7,
    conversionRate: 86.5,
    mainObjection: "Não é prioridade agora"
  },
  {
    id: 6,
    name: "Concorrência / Conhecimento",
    description: "Avaliação do conhecimento sobre energia solar",
    leadsEntered: 45,
    leadsAdvanced: 38,
    leadsStuck: 7,
    conversionRate: 84.4,
    mainObjection: "Já cotou com outras empresas"
  },
  {
    id: 7,
    name: "Simulação de Pagamento (Solicitação de CPF)",
    description: "Apresentação das condições financeiras e solicitação de documentos",
    leadsEntered: 38,
    leadsAdvanced: 32,
    leadsStuck: 6,
    conversionRate: 84.2,
    mainObjection: "Resistência ao fornecimento do CPF"
  },
  {
    id: 8,
    name: "Agendamento Final",
    description: "Agendamento da visita técnica",
    leadsEntered: 32,
    leadsAdvanced: 28,
    leadsStuck: 4,
    conversionRate: 87.5,
    mainObjection: "Disponibilidade de agenda"
  }
];

export const leads: Lead[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@email.com",
    phone: "(84) 99999-1111",
    currentStage: 3,
    stageName: "Pedido da Conta de Energia",
    status: "active",
    statusDescription: "Aguardando Conta de Energia",
    sdr: "AI Bot 1",
    createdAt: "2024-01-15",
    lastUpdate: "2024-01-16",
    observations: "Cliente interessado, precisa buscar conta em casa"
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@email.com",
    phone: "(84) 98888-2222",
    currentStage: 8,
    stageName: "Agendamento Final",
    status: "completed",
    statusDescription: "Agendamento Confirmado",
    sdr: "AI Bot 2",
    createdAt: "2024-01-10",
    lastUpdate: "2024-01-16",
    observations: "Lead qualificado, visita agendada para quinta-feira"
  },
  {
    id: "3",
    name: "Carlos Oliveira",
    email: "carlos@email.com",
    phone: "(84) 97777-3333",
    currentStage: 4,
    stageName: "Validação do Tomador de Decisão",
    status: "stuck",
    statusDescription: "Aguardando Decisão do Cônjuge",
    sdr: "AI Bot 1",
    createdAt: "2024-01-12",
    lastUpdate: "2024-01-15",
    observations: "Precisa conversar com esposa antes de prosseguir"
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana@email.com",
    phone: "(84) 96666-4444",
    currentStage: 6,
    stageName: "Concorrência / Conhecimento",
    status: "active",
    statusDescription: "Analisando Propostas",
    sdr: "AI Bot 2",
    createdAt: "2024-01-14",
    lastUpdate: "2024-01-16",
    observations: "Comparando com 2 outras empresas"
  },
  {
    id: "5",
    name: "Pedro Almeida",
    email: "pedro@email.com",
    phone: "(84) 95555-5555",
    currentStage: 7,
    stageName: "Simulação de Pagamento (Solicitação de CPF)",
    status: "stuck",
    statusDescription: "Aguardando CPF",
    sdr: "AI Bot 1",
    createdAt: "2024-01-11",
    lastUpdate: "2024-01-16",
    observations: "Cliente resistente ao fornecimento do CPF, alegando questões de segurança"
  },
  {
    id: "6",
    name: "Lucia Ferreira",
    email: "lucia@email.com",
    phone: "(84) 94444-6666",
    currentStage: 5,
    stageName: "Momento e Motivação",
    status: "stuck",
    statusDescription: "Travado por Concorrência",
    sdr: "AI Bot 2",
    createdAt: "2024-01-13",
    lastUpdate: "2024-01-16",
    observations: "Recebeu proposta mais barata de concorrente, negociando condições"
  }
];

export const sdrs: SDR[] = [
  {
    id: "ai-bot-1",
    name: "AI Bot 1",
    totalLeads: 65,
    completedLeads: 18
  },
  {
    id: "ai-bot-2",
    name: "AI Bot 2",
    totalLeads: 55,
    completedLeads: 10
  }
];

export const dashboardMetrics: DashboardMetrics = {
  totalLeads: 120,
  leadsInProgress: 92,
  completedLeads: 28,
  finalConversionRate: 23.3
};