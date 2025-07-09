import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardMetrics } from "@/types/dashboard";
import { Users, Clock, CheckCircle, TrendingUp } from "lucide-react";

interface MetricsOverviewProps {
  metrics: DashboardMetrics;
}

export const MetricsOverview = ({ metrics }: MetricsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="shadow-soft hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total de Leads
          </CardTitle>
          <Users className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">{metrics.totalLeads}</div>
          <p className="text-xs text-muted-foreground">
            Leads recebidos no período
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-soft hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Em Qualificação
          </CardTitle>
          <Clock className="h-4 w-4 text-warning" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-warning">{metrics.leadsInProgress}</div>
          <p className="text-xs text-muted-foreground">
            Funil incompleto
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-soft hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Concluídos
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-success">{metrics.completedLeads}</div>
          <p className="text-xs text-muted-foreground">
            Leads qualificados
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-soft hover:shadow-medium transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Taxa de Conversão
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-info" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-info">{metrics.finalConversionRate}%</div>
          <p className="text-xs text-muted-foreground">
            Conversão final
          </p>
        </CardContent>
      </Card>
    </div>
  );
};