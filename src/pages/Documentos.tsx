import { useState } from "react";
import { FileText, Download, Share2, Search, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

interface Document {
  id: string;
  title: string;
  type: string;
  date: string;
  doctor: string;
  category: "prescricao" | "exame" | "atestado" | "receita";
}

export default function Documentos() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  const getCategoryColor = (category: string) => {
    const colors = {
      prescricao: "bg-primary/10 text-primary border-primary/20",
      exame: "bg-secondary/10 text-secondary border-secondary/20",
      receita: "bg-accent/10 text-accent border-accent/20",
      atestado: "bg-warning/10 text-warning border-warning/20",
    };
    return colors[category as keyof typeof colors] || "bg-muted";
  };

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
                <Button variant="default" size="sm">
                  Ver Histórico
                </Button>
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
