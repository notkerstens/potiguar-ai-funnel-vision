import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SDR } from "@/types/dashboard";
import { Filter, Calendar, User, Target } from "lucide-react";

interface FilterControlsProps {
  sdrs: SDR[];
  selectedSdr: string;
  onSdrChange: (sdr: string) => void;
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  startDate: string;
  onStartDateChange: (date: string) => void;
  endDate: string;
  onEndDateChange: (date: string) => void;
  selectedScoreRange: string;
  onScoreRangeChange: (range: string) => void;
  onResetFilters: () => void;
}

export const FilterControls = ({
  sdrs,
  selectedSdr,
  onSdrChange,
  selectedPeriod,
  onPeriodChange,
  startDate,
  onStartDateChange,
  endDate,
  onEndDateChange,
  selectedScoreRange,
  onScoreRangeChange,
  onResetFilters
}: FilterControlsProps) => {
  return (
    <Card className="shadow-soft mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-primary" />
          Filtros Dinâmicos
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <User className="h-4 w-4" />
              SDR (Vendedor)
            </Label>
            <Select value={selectedSdr} onValueChange={onSdrChange}>
              <SelectTrigger>
                <SelectValue placeholder="Todos os SDRs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os SDRs</SelectItem>
                {sdrs.map((sdr) => (
                  <SelectItem key={sdr.id} value={sdr.id}>
                    {sdr.name} ({sdr.totalLeads} leads)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Período
            </Label>
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="custom">Período Customizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedPeriod === "custom" && (
            <>
              <div className="space-y-2">
                <Label>Data Inicial</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => onStartDateChange(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Data Final</Label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => onEndDateChange(e.target.value)}
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Faixa de Score
            </Label>
            <Select value={selectedScoreRange} onValueChange={onScoreRangeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Todas as faixas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Faixas</SelectItem>
                <SelectItem value="hot">Quente (61-100 pts)</SelectItem>
                <SelectItem value="warm">Morno (31-60 pts)</SelectItem>
                <SelectItem value="cold">Frio (0-30 pts)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button 
              variant="outline" 
              onClick={onResetFilters}
              className="w-full"
            >
              Limpar Filtros
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};