import { useState } from "react";
import { User, Bell, LogOut, UserCircle, Camera, ChevronRight, Shield, CreditCard, BellRing, Palette, HelpCircle, FileText, Lock, ChevronDown, Send, MessageSquare, AlertCircle, Brain, Wallet } from "lucide-react";
import DigitalCard from "./DigitalCard";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
  hasNotifications?: boolean;
}

export default function Header({ 
  userName = "Maria", 
  userAvatar,
  hasNotifications = true 
}: HeaderProps) {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [fullProfileOpen, setFullProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [bugReportOpen, setBugReportOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [feedbackCategory, setFeedbackCategory] = useState("");
  const [digitalCardOpen, setDigitalCardOpen] = useState(false);

  const handleLogout = () => {
    // Implementar lógica de logout aqui
    console.log("Logout");
    setProfileOpen(false);
  };

  const handleProfile = () => {
    setProfileOpen(false);
    setFullProfileOpen(true);
  };

  const handleEditAvatar = () => {
    console.log("Editar avatar");
  };

  const handleHelpAndFeedback = () => {
    setFullProfileOpen(false);
    setHelpOpen(true);
  };

  const handleBugReport = () => {
    setBugReportOpen(true);
  };

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback enviado");
  };

  const handleBugReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Relatório de bug enviado");
    setBugReportOpen(false);
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

  const menuItems = [
    {
      section: "Minha Conta",
      items: [
        { icon: UserCircle, label: "Dados Pessoais", action: () => console.log("Dados Pessoais") },
        { icon: CreditCard, label: "Informações de Convênio", action: () => console.log("Convênio") },
        { icon: Shield, label: "Segurança", action: () => console.log("Segurança") },
      ]
    },
    {
      section: "Configurações do App",
      items: [
        { icon: BellRing, label: "Notificações", action: () => console.log("Notificações") },
        { icon: Palette, label: "Aparência", action: () => console.log("Aparência") },
      ]
    },
    {
      section: "Ajuda e Informações",
      items: [
        { icon: HelpCircle, label: "Ajuda e Feedback", action: handleHelpAndFeedback },
        { icon: FileText, label: "Termos de Serviço", action: () => console.log("Termos") },
        { icon: Lock, label: "Política de Privacidade", action: () => console.log("Privacidade") },
      ]
    }
  ];

  return (
    <header className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent py-6 px-6">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Olá, {userName}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Como você está hoje?
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="relative p-2 hover:bg-muted rounded-full transition-colors">
            <Bell className="h-5 w-5 text-foreground" />
            {hasNotifications && (
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-[10px]">
                3
              </Badge>
            )}
          </button>
          
          <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
            <DialogTrigger asChild>
              <button className="rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary/20 cursor-pointer hover:border-primary/40 transition-colors">
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Minha Conta</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3 py-4">
                <Button 
                  variant="default" 
                  className="w-full justify-start gap-3 h-14 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-md"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate('/mente-ativa');
                  }}
                >
                  <Brain className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">Mente Ativa</div>
                    <div className="text-xs opacity-90">Exercite sua mente</div>
                  </div>
                </Button>
                <Button 
                  variant="gradient" 
                  className="w-full justify-start gap-3 h-14 shadow-md"
                  onClick={() => {
                    setProfileOpen(false);
                    setDigitalCardOpen(true);
                  }}
                >
                  <Wallet className="h-6 w-6" />
                  <div className="text-left">
                    <div className="font-semibold">Minha Carteirinha GAPS</div>
                    <div className="text-xs opacity-90">Identificação digital</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12"
                  onClick={handleProfile}
                >
                  <UserCircle className="h-5 w-5" />
                  Meu Perfil
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Sair do App
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={fullProfileOpen} onOpenChange={setFullProfileOpen}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Meu Perfil</DialogTitle>
              </DialogHeader>
              
              {/* Header do Perfil */}
              <div className="flex flex-col items-center gap-4 py-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-primary/20">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                      {userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleEditAvatar}
                    className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 hover:bg-primary/90 transition-colors shadow-md"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold">{userName} Silva</h3>
                  <p className="text-sm text-muted-foreground">maria.silva@email.com</p>
                </div>
              </div>

              <Separator />

              {/* Seções do Menu */}
              <div className="space-y-6 py-4">
                {menuItems.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    <h4 className="text-sm font-semibold text-muted-foreground px-2">
                      {section.section}
                    </h4>
                    <div className="space-y-1">
                      {section.items.map((item, itemIdx) => (
                        <button
                          key={itemIdx}
                          onClick={item.action}
                          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <item.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground" />
                            <span className="text-sm font-medium">{item.label}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Botão Sair */}
              <div className="py-4">
                <Button
                  variant="destructive"
                  className="w-full h-12 gap-2"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  Sair do Aplicativo
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Dialog Ajuda e Feedback */}
          <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
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
                              <Label htmlFor="screen">Em qual tela o problema aconteceu?</Label>
                              <Select>
                                <SelectTrigger id="screen">
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
                              <Label htmlFor="bug-description">Descreva o que aconteceu</Label>
                              <Textarea
                                id="bug-description"
                                placeholder="Descreva detalhadamente o problema que você encontrou..."
                                className="min-h-[120px]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="screenshot">Anexar Print (Opcional)</Label>
                              <Input id="screenshot" type="file" accept="image/*" />
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
                      <Label htmlFor="feedback">O que podemos melhorar?</Label>
                      <Textarea
                        id="feedback"
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

          {/* Carteirinha Digital */}
          <DigitalCard
            open={digitalCardOpen}
            onOpenChange={setDigitalCardOpen}
            userName={userName}
            userAvatar={userAvatar}
          />
        </div>
      </div>
    </header>
  );
}
