import { Clock, Check, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const nextMedication = {
    name: "Losartana",
    dosage: "50mg",
    time: "14:00",
    status: "now" as const,
  };

  const nextAppointment = {
    date: "15 Out",
    time: "10:30",
    doctor: "Dr. Silva",
  };

  const educationalContent = [
    {
      title: "Como medir a pressão arterial",
      category: "Hipertensão",
      duration: "5 min",
      image: "🩺",
    },
    {
      title: "Alimentação saudável para o coração",
      category: "Nutrição",
      duration: "8 min",
      image: "🥗",
    },
    {
      title: "Exercícios leves para idosos",
      category: "Atividade Física",
      duration: "10 min",
      image: "🧘",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header userName="Maria" hasNotifications={true} />

      <main className="px-6 py-4 max-w-md mx-auto space-y-6">
        {/* Card Principal: Seu Cuidado Hoje */}
        <Card className="shadow-[var(--shadow-card)] border-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Seu Cuidado Hoje
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Próximo Medicamento */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Próximo medicamento</p>
                  <h3 className="text-xl font-bold text-foreground">{nextMedication.name}</h3>
                  <p className="text-sm text-muted-foreground">{nextMedication.dosage}</p>
                </div>
                <Badge variant="secondary" className="bg-primary/20 text-primary border-0">
                  <Clock className="h-3 w-3 mr-1" />
                  Agora
                </Badge>
              </div>
              
              <Button 
                variant="success" 
                size="lg" 
                className="w-full font-semibold"
              >
                <Check className="h-5 w-5 mr-2" />
                Marcar como tomado
              </Button>
            </div>

            {/* Próxima Consulta */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/10 border border-secondary/20">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Próxima consulta</p>
                  <p className="font-semibold">{nextAppointment.date} às {nextAppointment.time}</p>
                  <p className="text-sm text-muted-foreground">{nextAppointment.doctor}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Conteúdo Educacional */}
        <div>
          <h2 className="text-lg font-semibold mb-3 px-1">
            Aprenda mais sobre sua saúde
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
            {educationalContent.map((content, index) => (
              <Card 
                key={index}
                className="min-w-[260px] snap-start shadow-sm hover:shadow-md transition-shadow border-border/50 cursor-pointer"
              >
                <CardHeader className="pb-2">
                  <div className="text-4xl mb-2">{content.image}</div>
                  <CardTitle className="text-base line-clamp-2">{content.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {content.category} • {content.duration}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Banner Mente Ativa */}
        <Link to="/mente-ativa">
          <Card className="bg-gradient-to-r from-accent/20 to-accent/10 border-accent/30 shadow-sm hover:shadow-md transition-all cursor-pointer">
            <CardContent className="p-6 mt-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-accent" />
                    <h3 className="font-bold text-foreground">Que tal um desafio?</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Exercite sua mente com nossos jogos!
                  </p>
                  <Button variant="gradient" size="sm">
                    Começar a jogar
                  </Button>
                </div>
                <div className="text-5xl ml-4">
                  🧠
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      </main>
    </div>
  );
}
