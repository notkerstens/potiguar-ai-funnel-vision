import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { FunnelStage } from "@/types/dashboard";
import { TrendingDown } from "lucide-react";

interface FunnelChartProps {
  stages: FunnelStage[];
}

export const FunnelChart = ({ stages }: FunnelChartProps) => {
  const chartData = stages.map((stage) => ({
    name: stage.name.split(' ').slice(0, 2).join(' '),
    fullName: stage.name,
    Entraram: stage.leadsEntered,
    Avançaram: stage.leadsAdvanced,
    Travaram: stage.leadsStuck,
    'Taxa de Conversão': stage.conversionRate
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 rounded-lg shadow-medium border">
          <p className="font-medium text-primary">{data.fullName}</p>
          <p className="text-success">Entraram: {data.Entraram}</p>
          <p className="text-info">Avançaram: {data.Avançaram}</p>
          <p className="text-destructive">Travaram: {data.Travaram}</p>
          <p className="text-warning">Conversão: {data['Taxa de Conversão']}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-primary" />
          Gráfico de Funil - Análise de Queda por Etapa
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                fontSize={12}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="Entraram" 
                fill="hsl(var(--info))" 
                name="Leads Entraram"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="Avançaram" 
                fill="hsl(var(--success))" 
                name="Leads Avançaram"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="Travaram" 
                fill="hsl(var(--destructive))" 
                name="Leads Travaram"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};