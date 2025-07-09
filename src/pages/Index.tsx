import { useState } from "react";
import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { FunnelStagesTable } from "@/components/dashboard/FunnelStagesTable";
import { FilterControls } from "@/components/dashboard/FilterControls";
import { FunnelChart } from "@/components/dashboard/FunnelChart";
import { StatusChart } from "@/components/dashboard/StatusChart";
import { LeadsList } from "@/components/dashboard/LeadsList";
import { ObservationField } from "@/components/dashboard/ObservationField";
import { ScoreDistribution } from "@/components/dashboard/ScoreDistribution";
import { dashboardMetrics, funnelStages, leads, sdrs } from "@/data/mockData";
import { Lead } from "@/types/dashboard";
import { Zap, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [selectedSdr, setSelectedSdr] = useState("all");
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [selectedScoreRange, setSelectedScoreRange] = useState("all");
  const { toast } = useToast();

  const handleResetFilters = () => {
    setSelectedSdr("all");
    setSelectedPeriod("month");
    setStartDate("");
    setEndDate("");
    setSelectedScoreRange("all");
    toast({
      title: "Filtros limpos",
      description: "Todos os filtros foram resetados com sucesso.",
    });
  };

  const handleViewLead = (leadId: string) => {
    const lead = leads.find(l => l.id === leadId);
    if (lead) {
      setSelectedLead(lead);
      toast({
        title: "Lead selecionado",
        description: `Visualizando detalhes de ${lead.name}`,
      });
    }
  };

  const handleSaveObservation = (leadId: string, observation: string, objectionType: string) => {
    // Aqui você implementaria a lógica para salvar no banco de dados
    console.log("Salvando observação:", { leadId, observation, objectionType });
    
    // Simular atualização local
    const updatedLeads = leads.map(lead => 
      lead.id === leadId 
        ? { ...lead, observations: observation }
        : lead
    );
    
    toast({
      title: "Observação salva",
      description: "Observação registrada com sucesso no sistema.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Header */}
      <div className="bg-gradient-primary text-primary-foreground shadow-strong">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sun className="h-8 w-8" />
                <Zap className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Dashboard SDR AI</h1>
                <p className="text-primary-foreground/80">Potiguar Solar - Monitoramento de Funil em Tempo Real</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">Última Atualização</div>
              <div className="font-medium">{new Date().toLocaleString('pt-BR')}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Filtros Dinâmicos */}
        <FilterControls
          sdrs={sdrs}
          selectedSdr={selectedSdr}
          onSdrChange={setSelectedSdr}
          selectedPeriod={selectedPeriod}
          onPeriodChange={setSelectedPeriod}
          startDate={startDate}
          onStartDateChange={setStartDate}
          endDate={endDate}
          onEndDateChange={setEndDate}
          selectedScoreRange={selectedScoreRange}
          onScoreRangeChange={setSelectedScoreRange}
          onResetFilters={handleResetFilters}
        />

        {/* Métricas Gerais */}
        <MetricsOverview metrics={dashboardMetrics} />

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <FunnelChart stages={funnelStages} />
          <StatusChart metrics={dashboardMetrics} />
          <ScoreDistribution metrics={dashboardMetrics} />
        </div>

        {/* Tabela Detalhada por Etapa */}
        <FunnelStagesTable stages={funnelStages} />

        {/* Lista de Leads */}
        <LeadsList leads={leads} onViewLead={handleViewLead} />

        {/* Campo de Observação */}
        <ObservationField
          leadId={selectedLead?.id}
          leadName={selectedLead?.name}
          currentObservation={selectedLead?.observations}
          onSaveObservation={handleSaveObservation}
        />
      </div>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sun className="h-5 w-5" />
            <span className="font-semibold">Potiguar Solar</span>
            <span className="opacity-60">+</span>
            <span className="font-semibold">RoboLink</span>
          </div>
          <p className="text-primary-foreground/80 text-sm">
            Dashboard AI v3.0 - Lead Scoring Inteligente + Automatização
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;