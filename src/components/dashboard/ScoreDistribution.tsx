import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DashboardMetrics } from "@/types/dashboard";
import { Target, TrendingUp, Thermometer } from "lucide-react";

interface ScoreDistributionProps {
  metrics: DashboardMetrics;
}

export const ScoreDistribution = ({ metrics }: ScoreDistributionProps) => {
  const total = metrics.hotLeads + metrics.warmLeads + metrics.coldLeads;
  
  const hotPercentage = total > 0 ? (metrics.hotLeads / total) * 100 : 0;
  const warmPercentage = total > 0 ? (metrics.warmLeads / total) * 100 : 0;
  const coldPercentage = total > 0 ? (metrics.coldLeads / total) * 100 : 0;

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Distribuição de Lead Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Média Geral */}
        <div className="text-center p-4 bg-primary/5 rounded-lg">
          <div className="text-2xl font-bold text-primary">{metrics.averageScore}</div>
          <div className="text-sm text-muted-foreground">Score Médio Geral</div>
        </div>

        {/* Distribuição por Categoria */}
        <div className="space-y-4">
          {/* Leads Quentes */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-destructive" />
                <span className="font-medium text-destructive">Leads Quentes (61-100 pts)</span>
              </div>
              <span className="text-sm font-medium">{metrics.hotLeads} leads</span>
            </div>
            <Progress value={hotPercentage} className="h-3" />
            <div className="text-xs text-muted-foreground text-right">{hotPercentage.toFixed(1)}%</div>
          </div>

          {/* Leads Mornos */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-warning" />
                <span className="font-medium text-warning">Leads Mornos (31-60 pts)</span>
              </div>
              <span className="text-sm font-medium">{metrics.warmLeads} leads</span>
            </div>
            <Progress value={warmPercentage} className="h-3" />
            <div className="text-xs text-muted-foreground text-right">{warmPercentage.toFixed(1)}%</div>
          </div>

          {/* Leads Frios */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full border-2 border-muted-foreground"></div>
                <span className="font-medium text-muted-foreground">Leads Frios (0-30 pts)</span>
              </div>
              <span className="text-sm font-medium">{metrics.coldLeads} leads</span>
            </div>
            <Progress value={coldPercentage} className="h-3" />
            <div className="text-xs text-muted-foreground text-right">{coldPercentage.toFixed(1)}%</div>
          </div>
        </div>

        {/* Resumo */}
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            Priorize os <span className="font-medium text-destructive">{metrics.hotLeads} leads quentes</span> para maximizar conversões
          </div>
        </div>
      </CardContent>
    </Card>
  );
};