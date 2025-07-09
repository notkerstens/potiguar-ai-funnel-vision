import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FunnelStage } from "@/types/dashboard";
import { ArrowRight, TrendingDown, AlertCircle } from "lucide-react";

interface FunnelStagesTableProps {
  stages: FunnelStage[];
}

export const FunnelStagesTable = ({ stages }: FunnelStagesTableProps) => {
  const getConversionColor = (rate: number) => {
    if (rate >= 85) return "text-success";
    if (rate >= 75) return "text-warning";
    return "text-destructive";
  };

  const getConversionBadgeVariant = (rate: number) => {
    if (rate >= 85) return "default";
    if (rate >= 75) return "secondary";
    return "destructive";
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-primary" />
          Detalhamento por Etapa do Funil
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Etapa</TableHead>
                <TableHead className="text-center">Pontos</TableHead>
                <TableHead className="text-center">Entraram</TableHead>
                <TableHead className="text-center">Avançaram</TableHead>
                <TableHead className="text-center">Travaram</TableHead>
                <TableHead className="text-center">% Conversão</TableHead>
                <TableHead>Objeção Principal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stages.map((stage) => (
                <TableRow key={stage.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-primary">{stage.name}</div>
                      <div className="text-xs text-muted-foreground">{stage.description}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg font-bold text-primary">+{stage.points}</span>
                      <span className="text-xs text-muted-foreground">pts</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {stage.leadsEntered}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="text-success font-medium">{stage.leadsAdvanced}</span>
                  </TableCell>
                  <TableCell className="text-center">
                    {stage.leadsStuck > 0 && (
                      <span className="text-destructive font-medium flex items-center justify-center gap-1">
                        <TrendingDown className="h-3 w-3" />
                        {stage.leadsStuck}
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant={getConversionBadgeVariant(stage.conversionRate)}
                      className={getConversionColor(stage.conversionRate)}
                    >
                      {stage.conversionRate}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {stage.mainObjection && (
                      <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-3 w-3 text-warning" />
                        <span className="text-muted-foreground">{stage.mainObjection}</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};