import { useState } from "react";
import { HelpCircle, ChevronDown, Send, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function FloatingHelpButton() {
  const [helpOpen, setHelpOpen] = useState(false);
  const [bugReportOpen, setBugReportOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [feedbackCategory, setFeedbackCategory] = useState("");

  const handleBugReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Relatório de bug enviado");
    setBugReportOpen(false);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback enviado");
  };

  const faqItems = [
    {
      question: "Como altero o horário de um lembrete?",
      answer: "Você pode alterar o horário de um lembrete acessando a seção 'Tratamentos', selecionando o medicamento desejado e tocando em 'Editar Lembrete'."
    },
    {
      question: "Não estou recebendo as notificações. O que fazer?",
      answer: "Verifique se as notificações estão ativadas nas configurações do seu dispositivo e também nas configurações do aplicativo em 'Meu Perfil > Notificações'."
    },
    {
      question: "Como compartilho minha receita com a farmácia?",
      answer: "Acesse 'Documentos e Registros', toque na receita desejada e selecione a opção 'Compartilhar'. Você poderá enviar por WhatsApp, e-mail ou outras formas."
    }
  ];

  return (
    <>
      <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all z-50 animate-fade-in"
          >
            <HelpCircle className="h-6 w-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajuda e Feedback</DialogTitle>
          </DialogHeader>

          {/* Suporte Rápido */}
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Suporte Rápido</h3>
              
              {/* FAQ */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-muted-foreground">Perguntas Frequentes</h4>
                {faqItems.map((faq, index) => (
                  <Collapsible
                    key={index}
                    open={openFaqIndex === index}
                    onOpenChange={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                      <span className="text-sm font-medium text-left">{faq.question}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="px-3 py-2">
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              {/* Fale Conosco */}
              <div className="space-y-2 pt-4">
                <h4 className="text-sm font-medium text-muted-foreground">Fale Conosco</h4>
                <div className="grid gap-3">
                  <Sheet open={bugReportOpen} onOpenChange={setBugReportOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                        <AlertCircle className="h-5 w-5 text-destructive" />
                        <div className="text-left">
                          <div className="font-medium">Reportar um Problema Técnico</div>
                          <div className="text-xs text-muted-foreground">Encontrou um bug? Nos conte aqui</div>
                        </div>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="bottom" className="h-[85vh]">
                      <SheetHeader>
                        <SheetTitle>Reportar Problema Técnico</SheetTitle>
                      </SheetHeader>
                      <form onSubmit={handleBugReportSubmit} className="space-y-4 pt-6">
                        <div className="space-y-2">
                          <Label htmlFor="float-screen">Em qual tela o problema aconteceu?</Label>
                          <Select>
                            <SelectTrigger id="float-screen">
                              <SelectValue placeholder="Selecione a tela" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="dashboard">Dashboard</SelectItem>
                              <SelectItem value="tratamentos">Tratamentos</SelectItem>
                              <SelectItem value="documentos">Documentos</SelectItem>
                              <SelectItem value="beneficios">Benefícios</SelectItem>
                              <SelectItem value="mente-ativa">Mente Ativa</SelectItem>
                              <SelectItem value="perfil">Meu Perfil</SelectItem>
                              <SelectItem value="outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="float-bug-description">Descreva o que aconteceu</Label>
                          <Textarea
                            id="float-bug-description"
                            placeholder="Descreva detalhadamente o problema que você encontrou..."
                            className="min-h-[120px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="float-screenshot">Anexar Print (Opcional)</Label>
                          <Input id="float-screenshot" type="file" accept="image/*" />
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="text-xs text-muted-foreground">
                            ℹ️ Dados técnicos do seu dispositivo podem ser enviados para análise do problema.
                          </p>
                        </div>
                        <Button type="submit" className="w-full">
                          Enviar Relatório
                        </Button>
                      </form>
                    </SheetContent>
                  </Sheet>

                  <Button variant="outline" className="w-full justify-start gap-3 h-auto py-4">
                    <MessageSquare className="h-5 w-5 text-primary" />
                    <div className="text-left">
                      <div className="font-medium">Enviar uma Mensagem</div>
                      <div className="text-xs text-muted-foreground">Entre em contato com nossa equipe</div>
                    </div>
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Melhore o GAPS */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Melhore o GAPS</h3>
              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="float-feedback">O que podemos melhorar?</Label>
                  <Textarea
                    id="float-feedback"
                    placeholder="Compartilhe suas ideias e sugestões conosco..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Categoria (Opcional)</Label>
                  <div className="flex flex-wrap gap-2">
                    {["Nova Funcionalidade", "Melhoria de Tela", "Outros"].map((category) => (
                      <Button
                        key={category}
                        type="button"
                        variant={feedbackCategory === category ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFeedbackCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button type="submit" className="w-full gap-2">
                  <Send className="h-4 w-4" />
                  Enviar Feedback
                </Button>
              </form>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
