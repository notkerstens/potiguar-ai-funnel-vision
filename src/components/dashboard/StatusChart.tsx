import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { DashboardMetrics } from "@/types/dashboard";
import { PieChart as PieIcon } from "lucide-react";

interface StatusChartProps {
  metrics: DashboardMetrics;
}

export const StatusChart = ({ metrics }: StatusChartProps) => {
  const data = [
    {
      name: "Concluídos",
      value: metrics.completedLeads,
      color: "hsl(var(--success))"
    },
    {
      name: "Em Qualificação",
      value: metrics.leadsInProgress,
      color: "hsl(var(--warning))"
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / metrics.totalLeads) * 100).toFixed(1);
      return (
        <div className="bg-card p-3 rounded-lg shadow-medium border">
          <p className="font-medium" style={{ color: data.payload.color }}>
            {data.name}: {data.value} leads
          </p>
          <p className="text-muted-foreground">
            {percentage}% do total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieIcon className="h-5 w-5 text-primary" />
          Status Geral dos Leads
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="text-2xl font-bold text-success">{metrics.completedLeads}</div>
            <div className="text-sm text-muted-foreground">Leads Concluídos</div>
          </div>
          <div className="p-3 bg-warning/10 rounded-lg">
            <div className="text-2xl font-bold text-warning">{metrics.leadsInProgress}</div>
            <div className="text-sm text-muted-foreground">Em Qualificação</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};