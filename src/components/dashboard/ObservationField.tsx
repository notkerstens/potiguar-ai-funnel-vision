import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Save, Bot } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ObservationFieldProps {
  leadId?: string;
  leadName?: string;
  currentObservation?: string;
  onSaveObservation: (leadId: string, observation: string, objectionType: string) => void;
}

const commonObjections = [
  { value: "no_time", label: "Não tem tempo agora" },
  { value: "rental_property", label: "Imóvel é alugado" },
  { value: "no_documents", label: "Não tem documentos em mãos" },
  { value: "spouse_decision", label: "Precisa consultar cônjuge" },
  { value: "not_priority", label: "Não é prioridade agora" },
  { value: "competition", label: "Já cotou com outras empresas" },
  { value: "high_price", label: "Valor muito alto" },
  { value: "schedule_availability", label: "Disponibilidade de agenda" },
  { value: "custom", label: "Objeção personalizada" }
];

export const ObservationField = ({ 
  leadId, 
  leadName, 
  currentObservation = "", 
  onSaveObservation 
}: ObservationFieldProps) => {
  const [observation, setObservation] = useState(currentObservation);
  const [objectionType, setObjectionType] = useState("");
  const [isGeneratingFollowUp, setIsGeneratingFollowUp] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!leadId) {
      toast({
        title: "Erro",
        description: "Nenhum lead selecionado para salvar a observação.",
        variant: "destructive"
      });
      return;
    }

    if (!observation.trim()) {
      toast({
        title: "Atenção",
        description: "Por favor, adicione uma observação antes de salvar.",
        variant: "destructive"
      });
      return;
    }

    onSaveObservation(leadId, observation, objectionType);
    toast({
      title: "Observação salva",
      description: `Observação registrada para ${leadName || 'o lead'} com sucesso.`,
    });
  };

  const generateAutomaticFollowUp = async () => {
    if (!objectionType || objectionType === "custom") {
      toast({
        title: "Objeção necessária",
        description: "Selecione um tipo de objeção para gerar follow-up automático.",
        variant: "destructive"
      });
      return;
    }

    setIsGeneratingFollowUp(true);
    
    // Simular geração de follow-up baseado na objeção
    const followUpTemplates: { [key: string]: string } = {
      "no_time": "Entendo que o tempo é precioso. Que tal agendarmos uma conversa rápida de 10 minutos no horário que for mais conveniente para você?",
      "rental_property": "Mesmo em imóvel alugado, existe a possibilidade de instalação com autorização do proprietário. Posso explicar como funciona?",
      "no_documents": "Sem problemas! Posso te ajudar a localizar os documentos necessários. Quando você tiver um tempinho, podemos continuar nossa conversa.",
      "spouse_decision": "Que ótimo que vocês tomam decisões em conjunto! Que tal incluirmos seu(ua) cônjuge numa próxima conversa para esclarecer todas as dúvidas?",
      "not_priority": "Entendo. A energia solar é um investimento que pode esperar o momento certo. Posso te enviar algumas informações para quando for conveniente?",
      "competition": "É ótimo que você esteja pesquisando! Posso te mostrar alguns diferenciais da Potiguar Solar que talvez outras empresas não tenham apresentado.",
      "high_price": "Vamos conversar sobre as formas de pagamento e o retorno do investimento. Pode ser que tenhamos uma solução que caiba no seu orçamento.",
      "schedule_availability": "Entendo a dificuldade de agenda. Temos horários flexíveis, incluindo finais de semana. Qual seria o melhor período para você?"
    };

    setTimeout(() => {
      const template = followUpTemplates[objectionType] || "";
      setObservation(prev => prev ? `${prev}\n\nFollow-up sugerido: ${template}` : `Follow-up sugerido: ${template}`);
      setIsGeneratingFollowUp(false);
      toast({
        title: "Follow-up gerado",
        description: "Sugestão de follow-up adicionada à observação.",
      });
    }, 2000);
  };

  return (
    <Card className="shadow-soft">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Campo de Observação {leadName && `- ${leadName}`}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Tipo de Objeção</Label>
          <Select value={objectionType} onValueChange={setObjectionType}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de objeção" />
            </SelectTrigger>
            <SelectContent>
              {commonObjections.map((objection) => (
                <SelectItem key={objection.value} value={objection.value}>
                  {objection.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Observação / Comentário</Label>
            <Button
              variant="outline"
              size="sm"
              onClick={generateAutomaticFollowUp}
              disabled={isGeneratingFollowUp || !objectionType || objectionType === "custom"}
              className="flex items-center gap-1"
            >
              <Bot className="h-3 w-3" />
              {isGeneratingFollowUp ? "Gerando..." : "Gerar Follow-up"}
            </Button>
          </div>
          <Textarea
            placeholder="Registre aqui a objeção real, comentários do lead ou observações importantes para o follow-up..."
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex justify-end">
          <Button 
            onClick={handleSave}
            disabled={!leadId || !observation.trim()}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Salvar Observação
          </Button>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
          <strong>💡 Dica:</strong> As observações registradas aqui alimentam o banco de dados de objeções 
          do SDR AI, melhorando a qualidade dos follow-ups automáticos futuros.
        </div>
      </CardContent>
    </Card>
  );
};