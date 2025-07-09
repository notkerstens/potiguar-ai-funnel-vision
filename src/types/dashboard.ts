export interface FunnelStage {
  id: number;
  name: string;
  description: string;
  leadsEntered: number;
  leadsAdvanced: number;
  leadsStuck: number;
  conversionRate: number;
  mainObjection?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  currentStage: number;
  stageName: string;
  status: 'active' | 'completed' | 'stuck';
  statusDescription: string;
  sdr: string;
  createdAt: string;
  lastUpdate: string;
  observations?: string;
}

export interface DashboardMetrics {
  totalLeads: number;
  leadsInProgress: number;
  completedLeads: number;
  finalConversionRate: number;
}

export interface SDR {
  id: string;
  name: string;
  totalLeads: number;
  completedLeads: number;
}