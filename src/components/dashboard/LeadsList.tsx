import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lead } from "@/types/dashboard";
import { Users, Eye, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface LeadsListProps {
  leads: Lead[];
  onViewLead: (leadId: string) => void;
}

export const LeadsList = ({ leads, onViewLead }: LeadsListProps) => {
  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'stuck':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-warning" />;
    }
  };

  const getStatusBadge = (status: Lead['status']) => {
    switch (status) {
      case 'completed':
        return 'default';
      case 'stuck':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'stuck':
        return 'text-destructive';
      default:
        return 'text-warning';
    }
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Lista Detalhada de Leads ({leads.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome / Contato</TableHead>
                <TableHead>Etapa Atual</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>SDR</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leads.map((lead) => (
                <TableRow key={lead.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium text-primary">{lead.name}</div>
                      <div className="text-xs text-muted-foreground">{lead.email}</div>
                      <div className="text-xs text-muted-foreground">{lead.phone}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">Etapa {lead.currentStage}</div>
                      <div className="text-xs text-muted-foreground">{lead.stageName}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(lead.status)}
                      <div>
                        <Badge 
                          variant={getStatusBadge(lead.status)}
                          className={getStatusColor(lead.status)}
                        >
                          {lead.status === 'completed' ? 'Concluído' : 
                           lead.status === 'stuck' ? 'Travado' : 'Ativo'}
                        </Badge>
                        <div className="text-xs text-muted-foreground mt-1">
                          {lead.statusDescription}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-info">{lead.sdr}</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(lead.lastUpdate).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Criado em {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewLead(lead.id)}
                      className="flex items-center gap-1"
                    >
                      <Eye className="h-3 w-3" />
                      Ver
                    </Button>
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