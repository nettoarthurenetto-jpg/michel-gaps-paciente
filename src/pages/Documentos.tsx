import { useState } from "react";
import { FileText, Download, Share2, Search, Filter, Clock, X, Stethoscope, FlaskConical, Pill, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  category: "prescricao" | "exame" | "atestado" | "receita";
}

interface TimelineEvent {
  id: string;
  type: "consulta" | "exame" | "receita";
  date: string;
  title: string;
  doctor?: string;
  summary?: string;
  highlights?: string[];
  medication?: string;
}

export default function Documentos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [timelineOpen, setTimelineOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterTypes, setFilterTypes] = useState({
    consulta: true,
    exame: true,
    receita: true,
  });
  const [filterPeriod, setFilterPeriod] = useState("all");

  const documents: Document[] = [
    {
      id: "1",
      title: "Prescrição Médica",
      type: "PDF",
      date: "15 Set 2024",
      doctor: "Dr. Silva",
      category: "prescricao",
    },
    {
      id: "2",
      title: "Resultado de Exame - Hemograma",
      type: "PDF",
      date: "10 Set 2024",
      doctor: "Dr. Silva",
      category: "exame",
    },
    {
      id: "3",
      title: "Receita Médica Digital",
      type: "PDF",
      date: "8 Set 2024",
      doctor: "Dr. Silva",
      category: "receita",
    },
    {
      id: "4",
      title: "Atestado Médico",
      type: "PDF",
      date: "5 Set 2024",
      doctor: "Dr. Silva",
      category: "atestado",
    },
  ];

  const categories = [
    { id: "prescricao", label: "Prescrições", emoji: "📋" },
    { id: "exame", label: "Exames", emoji: "🔬" },
    { id: "receita", label: "Receitas", emoji: "💊" },
    { id: "atestado", label: "Atestados", emoji: "📄" },
  ];

  const timelineEvents: TimelineEvent[] = [
    {
      id: "1",
      type: "consulta",
      date: "15 Set 2024",
      title: "Consulta com Dr. Silva",
      doctor: "Dr. Silva",
      summary: "Conversamos sobre sua pressão arterial, que está controlada. Ajustamos a dose do medicamento Losartana e pedi um novo exame de sangue para o próximo mês.",
    },
    {
      id: "2",
      type: "exame",
      date: "10 Set 2024",
      title: "Resultados do exame de Sangue recebidos",
      highlights: ["✅ Colesterol total dentro do esperado", "⚠️ Glicose um pouco acima do recomendado"],
    },
    {
      id: "3",
      type: "receita",
      date: "8 Set 2024",
      title: "Nova receita para Losartana 50mg",
      medication: "Losartana 50mg",
    },
    {
      id: "4",
      type: "consulta",
      date: "20 Ago 2024",
      title: "Consulta com Dr. Silva",
      doctor: "Dr. Silva",
      summary: "Realizamos uma revisão completa dos seus resultados. Sua saúde cardiovascular está estável e vamos manter o tratamento atual.",
    },
    {
      id: "5",
      type: "exame",
      date: "10 Ago 2024",
      title: "Resultados do Hemograma completo",
      highlights: ["✅ Todos os valores dentro da normalidade"],
    },
  ];

  const getCategoryColor = (category: string) => {
    const colors = {
      prescricao: "bg-primary/10 text-primary border-primary/20",
      exame: "bg-secondary/10 text-secondary border-secondary/20",
      receita: "bg-accent/10 text-accent border-accent/20",
      atestado: "bg-warning/10 text-warning border-warning/20",
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "consulta":
        return <Stethoscope className="h-5 w-5" />;
      case "exame":
        return <FlaskConical className="h-5 w-5" />;
      case "receita":
        return <Pill className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "consulta":
        return "bg-primary/10 text-primary border-primary/20";
      case "exame":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "receita":
        return "bg-accent/10 text-accent border-accent/20";
      default:
        return "bg-muted";
    }
  };

  const filteredTimeline = timelineEvents.filter((event) => {
    if (!filterTypes[event.type]) return false;
    // Add period filtering logic here if needed
    return true;
  });

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Header userName="Maria" />

      <main className="px-6 py-4 max-w-md mx-auto pb-6">
        <h1 className="text-2xl font-bold mb-6">Documentos e Registros</h1>

        {/* Histórico de Saúde - Card Destaque */}
        <Card className="mb-6 shadow-[var(--shadow-card)] bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground">Histórico de Saúde</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Acesse sua linha do tempo médica completa
                </p>
                <Dialog open={timelineOpen} onOpenChange={setTimelineOpen}>
                  <DialogTrigger asChild>
                    <Button variant="default" size="sm">
                      Ver Histórico
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden flex flex-col p-0">
                    <DialogHeader className="px-6 py-4 border-b">
                      <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl">Meu Histórico de Saúde</DialogTitle>
                        <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
                          <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <Filter className="h-5 w-5" />
                            </Button>
                          </SheetTrigger>
                          <SheetContent side="bottom" className="h-[400px]">
                            <SheetHeader>
                              <SheetTitle>Filtrar Linha do Tempo</SheetTitle>
                            </SheetHeader>
                            <div className="space-y-6 mt-6">
                              <div>
                                <h4 className="font-semibold mb-3">Filtrar por tipo</h4>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="filter-consulta"
                                      checked={filterTypes.consulta}
                                      onCheckedChange={(checked) =>
                                        setFilterTypes({ ...filterTypes, consulta: checked as boolean })
                                      }
                                    />
                                    <Label htmlFor="filter-consulta" className="cursor-pointer">
                                      Consultas
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="filter-exame"
                                      checked={filterTypes.exame}
                                      onCheckedChange={(checked) =>
                                        setFilterTypes({ ...filterTypes, exame: checked as boolean })
                                      }
                                    />
                                    <Label htmlFor="filter-exame" className="cursor-pointer">
                                      Exames
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Checkbox
                                      id="filter-receita"
                                      checked={filterTypes.receita}
                                      onCheckedChange={(checked) =>
                                        setFilterTypes({ ...filterTypes, receita: checked as boolean })
                                      }
                                    />
                                    <Label htmlFor="filter-receita" className="cursor-pointer">
                                      Receitas
                                    </Label>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-3">Filtrar por período</h4>
                                <div className="space-y-2">
                                  <Button
                                    variant={filterPeriod === "6months" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setFilterPeriod("6months")}
                                  >
                                    Últimos 6 meses
                                  </Button>
                                  <Button
                                    variant={filterPeriod === "1year" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setFilterPeriod("1year")}
                                  >
                                    Último ano
                                  </Button>
                                  <Button
                                    variant={filterPeriod === "all" ? "default" : "outline"}
                                    className="w-full"
                                    onClick={() => setFilterPeriod("all")}
                                  >
                                    Todo período
                                  </Button>
                                </div>
                              </div>

                              <Button className="w-full" onClick={() => setFilterOpen(false)}>
                                Aplicar Filtros
                              </Button>
                            </div>
                          </SheetContent>
                        </Sheet>
                      </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-border" />

                        {/* Timeline events */}
                        <div className="space-y-8">
                          {filteredTimeline.map((event, index) => (
                            <div key={event.id} className="relative pl-12">
                              {/* Timeline dot */}
                              <div
                                className={`absolute left-0 w-12 h-12 rounded-full border-4 border-background flex items-center justify-center ${getEventColor(
                                  event.type
                                )}`}
                              >
                                {getEventIcon(event.type)}
                              </div>

                              {/* Event card */}
                              <Card className="shadow-sm">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-2">
                                    <h4 className="font-semibold">{event.title}</h4>
                                    <span className="text-xs text-muted-foreground">{event.date}</span>
                                  </div>

                                  {event.type === "consulta" && (
                                    <div className="space-y-2">
                                      <p className="text-sm text-muted-foreground">
                                        {event.summary}
                                      </p>
                                    </div>
                                  )}

                                  {event.type === "exame" && (
                                    <div className="space-y-2">
                                      <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                                        {event.highlights?.map((highlight, idx) => (
                                          <p key={idx} className="text-sm">
                                            {highlight}
                                          </p>
                                        ))}
                                      </div>
                                      <Button variant="outline" size="sm" className="w-full">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Ver exame completo
                                      </Button>
                                    </div>
                                  )}

                                  {event.type === "receita" && (
                                    <div className="space-y-2">
                                      <Button variant="outline" size="sm" className="w-full">
                                        <FileText className="h-4 w-4 mr-2" />
                                        Ver receita
                                      </Button>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="text-4xl ml-4">📊</div>
            </div>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar documentos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              <Filter className="h-4 w-4 mr-1" />
              Todos
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
                className="whitespace-nowrap"
              >
                <span className="mr-1">{cat.emoji}</span>
                {cat.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-3">
          {filteredDocuments.map((doc) => (
            <Card 
              key={doc.id}
              className="shadow-sm hover:shadow-md transition-shadow cursor-pointer border-border/50"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${getCategoryColor(doc.category)}`}>
                    <FileText className="h-6 w-6" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm mb-1 line-clamp-1">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span>{doc.date}</span>
                      <span>•</span>
                      <span>{doc.doctor}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {doc.type}
                    </Badge>
                  </div>

                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground">Nenhum documento encontrado</p>
          </div>
        )}
      </main>
    </div>
  );
}
